# -*- coding: utf-8 -*-
"""
Google Sheets pradžiamokslis — scenų generatorius.

Vienas šaltinis visai pamokai: iš jo gimsta
  templates/*.html          — šablonai su {{kintamaisiais}}
  content/lt.json           — visi ekrano tekstai (kalbos failas)
  video/scenarijus-lt.md    — kadrai, suplanuotas balsas ir laiko žymos
  generate-video-clips.js   — animacijos (blokas tarp žymų GS-PRADZIAMOKSLIS)

Koordinatės skaičiuojamos iš GEO, ne spėjamos. Pagrindinis stilius = galutinė būsena,
animacija veda iki jos (ANIMATION_PRINCIPLES §14). Balsas tik suplanuotas —
Dariaus balsas negeneruojamas be Eimanto žinios (2026-09-17).

Paleidimas: python3 build_scenes.py
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ILL = os.path.abspath(os.path.join(HERE, '..', '..'))
CPS = 12.6  # išmatuota 2026-09-19 iš 86 tikrų įrašų (buvo spėta 16,0 — todėl kadrai nesutapo)

CUR = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cursor_svgs.json'), encoding='utf-8'))

# ---------------------------------------------------------------- geometrija
WIN_W, WIN_H = 1680, 744
ROWS_TOP, ROW_H, RH_W = 246, 34, 62
COLS = [('A', 170), ('B', 100), ('C', 470), ('D', 470), ('E', 408)]
TABBAR_TOP = WIN_H - 56
TAB_START = 104
STAGE_H = 780
WIN_TOP_IN_STAGE = 18


def col_x(col):
    x = RH_W
    for c, w in COLS:
        if c == col:
            return x, w
        x += w
    raise KeyError(col)


def cell(col, r):
    x, w = col_x(col)
    return x + w / 2, ROWS_TOP + (r - 1) * ROW_H + ROW_H / 2


def cell_box(col, r):
    x, w = col_x(col)
    return x, ROWS_TOP + (r - 1) * ROW_H, w, ROW_H


# ---------------------------------------------------------------- tekstai
CONTENT = {"lang": "lt", "_intro": {"title": "Google Sheets pradžiamokslis: kaip tvarkyti mokyklos lenteles"}}


class Scene:
    def __init__(self, file, trans, h1, D):
        self.file, self.trans, self.D = file, trans, D
        self.key = file.replace('-', '_')
        CONTENT[self.key] = {}
        self.n = 0
        self.css = []
        self.base = []   # galutinė būsena PNG kadrui (§14)
        self.cues = []  # (t, 'balsas'|'garsas', value)
        self.h1 = self.t('title', h1)
        self.ekrane = ''
        self.komentaras = ''

    def t(self, name, text):
        CONTENT[self.key][name] = text
        return '{{%s}}' % name

    def auto(self, text):
        self.n += 1
        return self.t('x%02d' % self.n, text)

    def voice(self, t, text):
        self.cues.append((t, 'balsas', text))

    def sound(self, t, name):
        self.cues.append((t, 'garsas', name))

    def pct(self, t):
        return '%.3f%%' % max(0, min(100, t / self.D * 100))

    # --- judesio pagalbininkai
    def appear(self, sel, t, kind='fadeUpLight', dur=0.4):
        self.css.append(f"{sel} {{ animation: {kind} {dur}s var(--ease-spring) {t}s both; }}")

    def visible(self, sel, on, off=None, name=None):
        """Matomas nuo on iki off (off=None — iki galo). Pagrindinė būsena atitinka pabaigą."""
        name = name or 'v_%s_%d' % (self.key, len(self.css))
        fr = [f"0%, {self.pct(on - 0.001)} {{ opacity: 0; }}", f"{self.pct(on + 0.25)} {{ opacity: 1; }}"]
        if off is not None:
            fr += [f"{self.pct(off)} {{ opacity: 1; }}", f"{self.pct(off + 0.2)}, 100% {{ opacity: 0; }}"]
            self.base.append(f"{sel} {{ opacity: 0; }}")
        else:
            fr += ["100% { opacity: 1; }"]
        self.css.append(f"{sel} {{ animation: {name} {self.D}s linear 0s both; }}")
        self.css.append(f"@keyframes {name} {{ {' '.join(fr)} }}")

    def cursor_path(self, sel, pts, grab=None):
        """pts: [(t, x, y)] lango/scenos koordinatėmis. Pagrindinė vieta = paskutinis taškas.
        grab: [(nuo, iki)] — kada rodoma suspausta ranka vietoj rodyklės."""
        x_end, y_end = pts[-1][1], pts[-1][2]
        name = 'k_%s' % self.key
        fr = []
        for i, (t, x, y) in enumerate(pts):
            fr.append(f"{self.pct(t)} {{ transform: translate({x - x_end:.0f}px, {y - y_end:.0f}px); "
                      f"animation-timing-function: cubic-bezier(.35,.05,.25,1); }}")
        fr.insert(0, f"0% {{ transform: translate({pts[0][1] - x_end:.0f}px, {pts[0][2] - y_end:.0f}px); }}")
        fr.append(f"100% {{ transform: translate(0, 0); }}")
        self.css.append(f"{sel} {{ animation: {name} {self.D}s linear 0s both; }}")
        self.css.append(f"@keyframes {name} {{ {' '.join(fr)} }}")
        icons = f'<div class="tvs-cursor c-arrow">{CUR["arrow"]}</div>'
        if grab:
            icons += f'<div class="tvs-cursor c-grab">{CUR["grab"]}</div>'
            fa, fg = [], []
            for on, off in grab:
                fa += [f"{self.pct(on)} {{ opacity: 0; }}", f"{self.pct(off)} {{ opacity: 1; }}"]
                fg += [f"{self.pct(on)} {{ opacity: 1; }}", f"{self.pct(off)} {{ opacity: 0; }}"]
            self.base.append(f"{sel} .c-grab {{ opacity: 0; }}")
            self.css.append(f"{sel} .c-arrow {{ animation: ka_{self.key} {self.D}s steps(1,end) 0s both; }}")
            self.css.append(f"@keyframes ka_{self.key} {{ 0% {{ opacity: 1; }} {' '.join(fa)} 100% {{ opacity: 1; }} }}")
            self.css.append(f"{sel} .c-grab {{ animation: kg_{self.key} {self.D}s steps(1,end) 0s both; }}")
            self.css.append(f"@keyframes kg_{self.key} {{ 0% {{ opacity: 0; }} {' '.join(fg)} 100% {{ opacity: 0; }} }}")
        return f'<div class="cursor-wrap" style="left:{x_end - 4:.0f}px; top:{y_end - 3:.0f}px">{icons}</div>'

    def click(self, x, y, t, sound=True):
        i = len(self.css)
        cls = 'rip%d' % i
        self.css.append(f".{cls} {{ animation: ratilasGS 0.6s ease-out {t}s forwards; }}")
        if sound:
            self.sound(t, 'spustelejimas')
        return f'<div class="tvs-ripple {cls}" style="left:{x:.0f}px; top:{y:.0f}px"></div>'

    def typing(self, text, t0, step=0.09, cls='typed'):
        spans = []
        for i, ch in enumerate(text):
            c = '%s-%d' % (cls, i)
            spans.append(f'<span class="{c}">{ch if ch != " " else "&nbsp;"}</span>')
            self.css.append(f".{c} {{ animation: raideGS 0.01s steps(1,end) {t0 + i * step:.2f}s both; }}")
        return ''.join(spans)

    def zoom(self, origin, t_in, t_out, scale=1.3):
        name = 'z_%s' % self.key
        fr = [f"0%, {self.pct(t_in)} {{ transform: scale(1); }}",
              f"{self.pct(t_in + 1.1)} {{ transform: scale({scale}); }}"]
        if t_out is not None:
            fr += [f"{self.pct(t_out)} {{ transform: scale({scale}); }}", f"{self.pct(t_out + 1.1)}, 100% {{ transform: scale(1); }}"]
        else:
            fr += [f"100% {{ transform: scale({scale}); }}"]
        self.css.append(f".stage {{ transform-origin: {origin}; animation: {name} {self.D}s cubic-bezier(.45,0,.2,1) 0s both; }}")
        self.css.append(f"@keyframes {name} {{ {' '.join(fr)} }}")


# ---------------------------------------------------------------- lango dalys
MENU = ['Failas', 'Redaguoti', 'Peržiūrėti', 'Įterpti', 'Formatas', 'Duomenys', 'Įrankiai', 'Plėtiniai', 'Pagalba']


def top(s, filename='Miesto gimnazija – TABLE', saved=None):
    m = ''.join(f'<span>{s.t("menu_%d" % i, w)}</span>' for i, w in enumerate(MENU))
    sv = f'<div class="gs-saved">{saved}</div>' if saved else ''
    return (f'<div class="gs-top"><div class="gs-logo"></div>'
            f'<div class="gs-filename">{s.t("filename", filename)}</div>{sv}'
            f'<div class="gs-menu">{m}</div>'
            f'<div class="gs-share">{s.t("share", "Bendrinti")}</div><div class="gs-avatar">R</div></div>'
            f'<div class="gs-toolbar"><i></i><i></i><i></i><i></i><i class="w"></i><i></i><i></i><i class="w"></i><i></i><i></i><i></i></div>')


def formula(s, name='A1', value=''):
    return (f'<div class="gs-formula"><div class="nm">{name}</div><div class="fx">fx</div>'
            f'<div class="val">{value}</div></div>')


def colhead(cols=None):
    spans = f'<span style="width:{RH_W}px"></span>' + ''.join(f'<span style="width:{w}px">{c}</span>' for c, w in (cols or COLS))
    return f'<div class="gs-colhead">{spans}</div>'


def row_html(s, r, kind, vals=None, band=False, chip=None, extra_cls='', cols=None, th_only=None):
    """kind: h2|h3|th|data; vals: dict col->text (jau {{kintamieji}})."""
    vals = vals or {}
    cls = ['gs-row', kind]
    if band:
        cls.append('band')
    if extra_cls:
        cls.append(extra_cls)
    cells = [f'<span class="rh" style="width:{RH_W}px">{r}</span>']
    for c, w in (cols or COLS):
        inner = vals.get(c, '')
        cc = []
        if c == 'A':
            cc.append('a')
            if chip:
                inner = f'<span class="gs-chip">{chip}</span>'
        if kind == 'th' and c != 'A' and (th_only is None or c in th_only):
            cc.append('th')
            if c == 'B':
                cc.append('b')
        if kind == 'h2' and c == 'B':
            cc.append('big')
        if kind == 'h3' and c == 'C':
            cc.append('sub')
        cells.append(f'<span class="{" ".join(cc)}" style="width:{w}px">{inner}</span>')
    return f'<div class="{" ".join(cls)}" data-r="{r}">{"".join(cells)}</div>'


def teachers_rows(s, prefix='', broken_band=False, inserted_at=None):
    T = lambda n, v: s.t(prefix + n, v)
    names = ['Vincas Kudirka', 'Marija Pečkauskaitė', 'Jonas Basanavičius', 'Julija Žymantienė', 'Kazys Grinius', '', '', '']
    roles = ['Pradinio ugdymo mokytojas', 'Pradinio ugdymo mokytoja', 'Pradinio ugdymo mokytojas', 'Pradinio ugdymo mokytoja',
             'Pradinio ugdymo mokytojas', '', '', '']
    cats = ['Mokytojas metodininkas', 'Vyresnioji mokytoja', 'Vyresnysis mokytojas', 'Mokytoja metodininkė', 'Mokytojas', '', '', '']
    rows = [row_html(s, 1, 'h2', {'B': T('t_h2', 'Mokytojų sąrašas 2025–2026 m. m.')}, chip='H2'),
            row_html(s, 2, 'h3', {'C': T('t_h3a', 'Pradinio ugdymo mokytojai')}, chip='H3', band=broken_band),
            row_html(s, 3, 'th', {'B': T('t_nr', 'Eil. nr.'), 'C': T('t_name', 'Vardas, pavardė'),
                                   'D': T('t_role', 'Pareigos įstaigoje'), 'E': T('t_cat', 'Kvalifikacinė kategorija')}, chip='TH')]
    r = 4
    for i in range(8):
        v = {'B': f'{i + 1}.'}
        if names[i]:
            v.update({'C': T('n%d' % i, names[i]), 'D': T('p%d' % i, roles[i]), 'E': T('c%d' % i, cats[i])})
        band = (i % 2 == 1)
        if broken_band and i >= 3:
            band = (i % 2 == 0)  # po įterpimo juostos pasislinko
        rows.append(row_html(s, r, 'data', v, band=band))
        r += 1
    rows.append(row_html(s, 12, 'h3', {'C': T('t_h3b', 'Lietuvių kalbos ir literatūros mokytojai')}, chip='H3'))
    rows.append(row_html(s, 13, 'th', {'B': T('t_nr2', 'Eil. nr.'), 'C': T('t_name2', 'Vardas, pavardė'),
                                        'D': T('t_role2', 'Pareigos'), 'E': T('t_cat2', 'Kvalifikacinė kategorija')}, chip='TH'))
    return rows


TABS = [('Gimnazijos taryba', 250), ('Mokinių taryba', 220), ('Darbuotojai', 200), ('Mokytojų sąrašas', 260),
        ('Dienos ritmas', 210), ('Atostogos', 180), ('Pamokų laikas', 210)]


def tab_left(i, shift=0):
    return TAB_START + sum(w for _, w in TABS[shift:i])


def tab_center(i, shift=0):
    return tab_left(i, shift) + TABS[i][1] / 2 - 10, TABBAR_TOP + 28


def tab_arrow(i, shift=0):
    return tab_left(i, shift) + TABS[i][1] - 22, TABBAR_TOP + 30


def tabbar(s, active, names=None, extra='', strip_cls=''):
    names = names or {}
    tabs = ''
    for i, (n, w) in enumerate(TABS):
        label = names.get(i, s.t('tab%d' % i, n))
        tabs += f'<div class="gs-tab tab-{i}{" on" if i == active else ""}" style="width:{w}px">{label}</div>'
    return (f'<div class="gs-tabbar"><div class="ic">+</div><div class="ic list"><b></b><b></b><b></b></div>'
            f'<div class="tabs {strip_cls}" style="display:flex">{tabs}</div>{extra}'
            f'<div class="gs-tabnav">‹ ›</div></div>')


def window(s, inner_grid, active=3, extra='', tab_names=None, formula_name='A1', formula_value='', saved=None, tabbar_html=None):
    return (f'<div class="gs-window">{top(s, saved=saved)}{formula(s, formula_name, formula_value)}'
            f'<div class="gs-grid">{colhead()}{"".join(inner_grid)}</div>'
            f'{tabbar_html if tabbar_html is not None else tabbar(s, active, tab_names)}{extra}</div>')


def page(s, body, own_css=''):
    return f'''<!DOCTYPE html>
<html lang="{{{{lang}}}}">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./tokens/tokens.css">
<link rel="stylesheet" href="./tokens/base.css">
<link rel="stylesheet" href="./tokens/tvs.css">
<link rel="stylesheet" href="./tokens/sheets.css">
<style>
  .title {{ font-size: 44px; margin-bottom: 26px; }}
  .stage {{ position: relative; width: 1680px; height: {STAGE_H}px; margin: 0 auto; }}
  .stage > .gs-window {{ position: absolute; left: 0; top: {WIN_TOP_IN_STAGE}px; }}
  .cursor-wrap {{ position: absolute; width: 44px; height: 56px; z-index: 30; pointer-events: none; }}
  .cursor-wrap .tvs-cursor {{ left: 0; top: 0; }}
  /* Skaitomumas telefone (Eimantas 2026-09-19): lentelės tekstas šioje pamokoje didesnis nei
     bendrame sheets.css — kadrai žiūrimi ir mažame ekrane. Galioja tik šiai pamokai. */
  .gs-row > span {{ font-size: 21px; }}
  .gs-row.th > span.th {{ font-size: 21px; }}
  .gs-row > span.rh {{ font-size: 17px; }}
  .gs-colhead span {{ font-size: 18px; }}
  .gs-tab {{ font-size: 22px; }}
  .gs-menu {{ font-size: 22px; }}
  .gs-chip {{ font-size: 17px; }}
{own_css}
/*BASE*/
</style>
</head>
<body>
  <div class="card">
    <div class="title">{s.h1}</div>
    <div class="stage">
{body}
    </div>
    <div class="brand-bar">
      <img class="brand-logo brand-logo-light" src="{{{{brand_logo_path}}}}" alt="Cleverphant" />
      <img class="brand-logo brand-logo-dark" src="{{{{brand_logo_dark_path}}}}" alt="Cleverphant" />
    </div>
  </div>
</body>
</html>
'''


SCENES = []


def spotlight(s, steps, release=None):
    """Fokusas (Eimantas 2026-09-17): viskas pritemsta, šviesi lieka tik rodoma vieta; vienu metu — viena vieta.
    steps: [(t, x, y, w, h)] lango koordinatėmis. Šviesa slenka iš vietos į vietą. release: kada tamsa nuimama."""
    ease = 'animation-timing-function: cubic-bezier(.4,0,.2,1);'
    def r(x, y, w, h):
        return f"left: {x}px; top: {y}px; width: {w}px; height: {h}px;"
    t0, *first = steps[0]
    fr = [f"0%, {s.pct(t0 - 0.001)} {{ opacity: 0; {r(*first)} {ease} }}", f"{s.pct(t0 + 0.4)} {{ opacity: 1; {r(*first)} {ease} }}"]
    for (tp, *rp), (tn, *rn) in zip(steps, steps[1:]):
        fr.append(f"{s.pct(tn)} {{ opacity: 1; {r(*rp)} {ease} }}")
        fr.append(f"{s.pct(tn + 0.55)} {{ opacity: 1; {r(*rn)} {ease} }}")
    last = steps[-1][1:]
    if release is not None:
        fr.append(f"{s.pct(release)} {{ opacity: 1; {r(*last)} }}")
        fr.append(f"{s.pct(release + 0.5)}, 100% {{ opacity: 0; {r(*last)} }}")
        s.base.append(".spot { opacity: 0; }")
    else:
        fr.append(f"100% {{ opacity: 1; {r(*last)} }}")
    name = 'spot_%s' % s.key
    s.css.append(f".spot {{ animation: {name} {s.D}s linear 0s both; }}")
    s.css.append(f"@keyframes {name} {{ {' '.join(fr)} }}")
    return (f'<div class="spot-clip" style="position:absolute; inset:0; overflow:hidden; border-radius:14px; z-index:13; pointer-events:none">'
            f'<div class="spot" style="position:absolute; {r(*last)} border-radius:12px; border:3px solid var(--c-blue-solid, #2563eb); '
            f'box-shadow: 0 0 0 4000px rgba(24,30,46,.62);"></div></div>')


def dim_states(s, sel, states):
    """states: [(t, opacity)] — elemento ryškumas laike, perėjimai 0,3 s. Pagrindinė būsena = paskutinė."""
    fr = [f"0% {{ opacity: {states[0][1]}; }}"]
    prev = states[0][1]
    for tt, op in states[1:]:
        fr.append(f"{s.pct(tt)} {{ opacity: {prev}; }}")
        fr.append(f"{s.pct(tt + 0.3)} {{ opacity: {op}; }}")
        prev = op
    fr.append(f"100% {{ opacity: {prev}; }}")
    name = 'dim_%s_%d' % (s.key, len(s.css))
    s.css.append(f"{sel} {{ animation: {name} {s.D}s linear 0s both; }}")
    s.css.append(f"@keyframes {name} {{ {' '.join(fr)} }}")


def add(s, html):
    SCENES.append((s, html))


# ================================================================ 1. Kas yra Google Sheets
s = Scene('00-kas-yra-sheets', 'Kas yra Google Sheets', 'Svetainės lentelės gyvena Google Sheets failuose', 18)
ring = spotlight(s, [(6.0, 4, TABBAR_TOP + 2, WIN_W - 8, 52)])
note = f'<div class="gs-note n-tabs" style="left:1160px; top:{TABBAR_TOP - 86}px">{s.t("note_tabs", "Kiekvienas lapas – atskira lentelė svetainėje")}</div>'
note += f'<div class="gs-note n-files" style="left:1010px; top:{TABBAR_TOP - 86}px">{s.t("note_files", "Failų gali būti keli – kiekvienas tvarko savo")}</div>'
add(s, page(s, window(s, teachers_rows(s), extra=ring + note)))
s.appear('.stage > .gs-window', 0.3, 'fadeUpMedium', 0.6)
s.visible('.n-tabs', 6.6, 10.6)
s.visible('.n-files', 10.9)
for i in range(7):
    s.css.append(f".gs-tab.tab-{i} {{ animation: tabPulseGS 0.5s ease-in-out {6.8 + i * 0.28:.2f}s both; }}")
s.voice(1.0, 'Google Sheets – tai lentelių failas, kuris atsidaro tiesiog naršyklėje.')
s.voice(6.4, 'Kiekvienas lapas apačioje yra atskira lentelė jūsų svetainėje.')
s.voice(11.6, 'Failų gali būti keli, kad kiekvienas atsakingas žmogus tvarkytų savo lenteles.')
s.ekrane = 'Google Sheets langas su mokytojų sąrašu. Viskas pritemsta, šviesi lieka lapų juosta, lapai vienas po kito sumirksi, užrašas „Kiekvienas lapas – atskira lentelė svetainėje“. Vėliau jį pakeičia „Failų gali būti keli – kiekvienas tvarko savo“.'
s.komentaras = 'Eimantas 2026-09-17: mokymuose komunikuojame, kad atsakomybes galima ir reikia pasidalinti — tam naudojami keli failai. Todėl ne „vienas failas – visos lentelės“.'

# ================================================================ 2. Prieiga
s = Scene('01-prieiga', 'Pirmiausia – prieiga', 'Prieigą suteikiame mes – toliau dalijatės patys', 32)
css2 = """
  .req, .grant { position: absolute; background: #fff; border-radius: 18px; border: 1px solid #dfe3ea; box-shadow: 0 24px 60px rgba(30,40,70,.12);
                 font-family: var(--gs-font); box-sizing: border-box; }
  .req { left: 120px; top: 60px; width: 700px; height: 520px; padding: 60px 56px; }
  .req .lock { width: 70px; height: 70px; border-radius: 50%; background: #e8f0fe; margin-bottom: 30px; position: relative; }
  .req .lock::after { content: ""; position: absolute; left: 24px; top: 30px; width: 22px; height: 18px; border-radius: 4px; background: #0b57d0; }
  .req .lock::before { content: ""; position: absolute; left: 27px; top: 19px; width: 10px; height: 12px; border: 3px solid #0b57d0; border-bottom: 0; border-radius: 8px 8px 0 0; }
  .req .h { font-size: 38px; color: #1f1f1f; margin-bottom: 20px; }
  .req .p { font-size: 24px; color: #444746; line-height: 1.45; }
  .req .btn { position: absolute; left: 56px; top: 400px; height: 58px; padding: 0 36px; border-radius: 29px; background: #0b57d0; color: #fff;
              font-size: 23px; font-weight: 500; display: flex; align-items: center; }
  .grant { left: 900px; top: 160px; width: 660px; height: 330px; padding: 44px 50px; }
  .grant .from { display: flex; align-items: center; gap: 18px; font-size: 24px; color: #1f1f1f; }
  .grant .from b { width: 56px; height: 56px; border-radius: 50%; background: #fff; border: 1px solid #dadce0; display: flex; align-items: center; justify-content: center; }
  .grant .from b img { width: 42px; height: auto; display: block; }
  .grant .msg { font-size: 27px; margin: 30px 0 26px; color: #1f1f1f; }
  .grant .file { display: inline-flex; align-items: center; gap: 16px; border: 1px solid #dadce0; border-radius: 10px; padding: 14px 22px; font-size: 24px; }
  .grant .file i { width: 26px; height: 32px; border-radius: 4px; background: #0f9d58; display: block; }
  .shwrap { position: absolute; left: 0; top: 0; right: 0; bottom: 0; }
  .shdlg { position: absolute; left: 430px; top: 150px; width: 820px; background: #fff; border-radius: 28px; box-shadow: 0 30px 80px rgba(30,40,70,.22);
           font-family: var(--gs-font); padding: 40px 44px; z-index: 9; box-sizing: border-box; }
  .shdlg .h { font-size: 32px; color: #1f1f1f; margin-bottom: 28px; }
  .shdlg .fld { position: relative; height: 74px; border: 1px solid #c4c7c5; border-radius: 12px; display: flex; align-items: center;
                justify-content: flex-start; padding: 0 22px; font-size: 24px; color: #1f1f1f; }
  .shdlg .fld .ph { position: absolute; left: 22px; color: #80868b; }
  .shdlg .row { display: flex; align-items: center; justify-content: space-between; margin-top: 26px; }
  .shdlg .who { display: flex; align-items: center; gap: 16px; font-size: 24px; color: #1f1f1f; }
  .shdlg .who i { width: 48px; height: 48px; border-radius: 50%; background: #d7e3f7; color: #0b57d0; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 700; }
  .shdlg .role { border: 1px solid #c4c7c5; border-radius: 10px; padding: 10px 20px; font-size: 22px; color: #444746; }
  .shdlg .acts { display: flex; justify-content: flex-end; gap: 20px; margin-top: 34px; }
  .shdlg .ghost { padding: 14px 28px; border-radius: 26px; font-size: 22px; color: #0b57d0; }
  .shdlg .send { padding: 14px 34px; border-radius: 26px; font-size: 22px; background: #0b57d0; color: #fff; }
"""
cx, cy = 120 + 56 + 130, 60 + 400 + 29
body = (f'<div class="req"><div class="lock"></div><div class="h">{s.t("req_h", "Jums reikia prieigos")}</div>'
        f'<div class="p">{s.t("req_p", "Paprašykite prieigos arba perjunkite į paskyrą, kuri turi prieigą.")}</div>'
        f'<div class="btn">{s.t("req_btn", "Prašyti prieigos")}</div></div>'
        f'<div class="grant"><div class="from"><b><img src="./assets/cleverphant-simbolis-spalvotas.svg" alt=""></b>{s.t("from", "Cleverphant")}</div>'
        f'<div class="msg">{s.t("msg", "suteikė jums prieigą prie skaičiuoklės")}</div>'
        f'<div class="file"><i></i>{s.t("file", "Miesto gimnazija – TABLE")}</div></div>')
# --- antra dalis: kaip prieiga perduodama kolegai
win = f'<div class="gs-window">{top(s)}{formula(s)}<div class="gs-grid">{colhead()}{"".join(teachers_rows(s))}</div>{tabbar(s, 3)}</div>'
dlg = (f'<div class="shdlg"><div class="h">{s.t("sh_h", "Bendrinti „Miesto gimnazija – TABLE“")}</div>'
       f'<div class="fld"><span class="ph typed-off">{s.t("sh_ph", "Pridėti žmonių ir grupių")}</span>'
       + s.typing('mokytoja@gmail.com', 17.4, 0.06, 'em') + '</div>'
       f'<div class="row"><div class="who"><i>M</i>{s.t("sh_who", "mokytoja@gmail.com")}</div>'
       f'<div class="role">{s.t("sh_role", "Redaktorius")}</div></div>'
       f'<div class="acts"><span class="ghost">{s.t("sh_cancel", "Atšaukti")}</span>'
       f'<span class="send">{s.t("sh_send", "Siųsti")}</span></div></div>')
SHARE_X, SHARE_Y = 1640, 78     # mygtukas „Bendrinti“ lango viršuje
body += f'<div class="shwrap">{win}{dlg}</div>'
body += s.click(cx, cy, 8.4) + s.click(SHARE_X, SHARE_Y, 15.6) + s.click(1180, 490, 23.6)
body += s.cursor_path('.cursor-wrap', [(0, 1500, 700), (6.4, 1500, 700), (8.1, cx, cy), (13.6, cx, cy),
                                       (15.3, SHARE_X, SHARE_Y), (16.6, SHARE_X, SHARE_Y),
                                       (17.2, 700, 300), (23.0, 700, 300), (23.4, 1180, 490), (31, 1180, 490)])
add(s, page(s, body, css2))
s.appear('.req', 0.5, 'fadeUpMedium', 0.6)
s.css.append(f".req .btn {{ animation: mygtukasGS {s.D}s linear 0s both; }}")
s.css.append(f"@keyframes mygtukasGS {{ 0%, {s.pct(8.35)} {{ filter: brightness(1); transform: scale(1); }} {s.pct(8.45)} {{ filter: brightness(.85); transform: scale(.96); }} {s.pct(8.7)}, 100% {{ filter: brightness(1); transform: scale(1); }} }}")
s.appear('.grant', 10.0, 'slinktisIsDesines', 0.6)
s.sound(10.0, 'patvirtinimas')
s.visible('.req', 0.5, 14.0)
s.visible('.grant', 10.0, 14.0)
s.visible('.shwrap', 14.2)
s.appear('.shdlg', 16.4, 'fadeUpMedium', 0.5)
s.visible('.shdlg .row', 21.0)
s.visible('.shdlg .fld .ph', 14.2, 17.4)
s.sound(17.4, 'rasymas')
s.css.append(f".shdlg .send {{ animation: siusti_{s.key} {s.D}s linear 0s both; }}")
s.css.append(f"@keyframes siusti_{s.key} {{ 0%, {s.pct(23.55)} {{ filter: brightness(1); }} {s.pct(23.65)} {{ filter: brightness(.85); }} {s.pct(23.9)}, 100% {{ filter: brightness(1); }} }}")
s.voice(1.0, 'Lenteles su svetaine mes jau sujungėme, jums reikia tik paprašyti prieigos.')
s.voice(6.8, 'Atidarote nuorodą ir, jei reikia, spaudžiate Prašyti prieigos.')
s.voice(12, 'Kai prieigą suteiksime, gausite laišką.')
s.voice(15.2, 'Prieiga dalijamasi ir tarpusavyje: viršuje dešinėje spaudžiate Bendrinti.')
s.voice(21.3, 'Įrašote kolegos Gmail adresą ir spaudžiate Siųsti.')
s.voice(26.2, 'Nuo tada lentelę tvarkote dviese – atsakomybę galima pasidalyti.')
s.ekrane = ('Kairėje Google langas „Jums reikia prieigos“ su mygtuku „Prašyti prieigos“ — kursorius jį paspaudžia. Dešinėje atkeliauja laiškas '
            '„Cleverphant suteikė jums prieigą prie skaičiuoklės“. Tada matomas pats failas: viršuje dešinėje spaudžiama „Bendrinti“, '
            'atsiveria langas „Bendrinti „Miesto gimnazija – TABLE““, į lauką „Pridėti žmonių ir grupių“ įrašoma „mokytoja@gmail.com“, '
            'teisės „Redaktorius“, spaudžiama „Siųsti“.')
s.komentaras = ('Eiga — Eimantas 2026-09-17: integraciją padaro Cleverphant, mokytojai tik prašo prieigos. Bendrinimo dalis — Eimantas 2026-09-19: '
                'rodyti visą eigą, kaip realiai perduodama prieiga (mygtukas „Bendrinti“, Gmail adresas). '
                '⛔ PATIKRINTI lietuviškus Google užrašus: „Jums reikia prieigos“, „Prašyti prieigos“, „Pridėti žmonių ir grupių“, '
                '„Redaktorius“, „Siųsti“ — visi versti iš anglų, tikro lietuviško lango nemačiau.')

# ================================================================ 3. Paskyra
s = Scene('02-paskyra', 'Kokia paskyra geriausia', 'Rekomenduojame Gmail paskyrą', 20)
css3 = """
  .acc { position: absolute; top: 40px; width: 780px; height: 520px; border-radius: 24px; padding: 46px; box-sizing: border-box; }
  .acc.g { left: 20px; background: var(--c-blue-bg); border: 2px solid var(--c-blue-border); }
  .acc.o { left: 880px; background: var(--c-amber-bg); border: 2px solid var(--c-amber-border); }
  .acc .h { font-size: 34px; font-weight: 700; color: var(--c-text); margin-bottom: 16px; }
  .acc .badge { display: inline-block; font-size: 21px; font-weight: 700; color: #fff; background: var(--c-blue-solid); padding: 7px 18px; border-radius: 20px; margin-bottom: 30px; }
  .acc .badge.o2 { background: transparent; }
  .acc .pt { font-size: 25px; color: var(--c-text); background: #fff; border-radius: 14px; padding: 18px 22px; display: flex; gap: 16px; align-items: center; margin-bottom: 14px; line-height: 1.3; }
  .acc .pt i { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; display: block; }
  .acc.g .pt i { background: var(--c-green-solid); }
  .acc.o .pt i { background: var(--c-amber-solid); }
  .ws { position: absolute; left: 20px; top: 600px; width: 1640px; height: 110px; border-radius: 20px; background: var(--c-green-bg); border: 2px solid var(--c-green-border);
        display: flex; align-items: center; justify-content: center; font-size: 27px; color: var(--c-text); gap: 12px; }
"""
body = (f'<div class="acc g"><div class="h">{s.t("g_h", "Gmail paskyra")}</div><div class="badge">{s.t("g_badge", "Rekomenduojama")}</div>'
        f'<div class="pt"><i></i>{s.t("g_pt1", "Failą rasite savo „Google“ diske")}</div>'
        f'<div class="pt"><i></i>{s.t("g_pt2", "Veikia visos funkcijos")}</div></div>'
        f'<div class="acc o"><div class="h">{s.t("o_h", "Kitas el. pašto adresas")}</div><div class="badge o2">&nbsp;</div>'
        f'<div class="pt"><i></i>{s.t("o_pt1", "Kaskart jungiatės per laiško nuorodą ir PIN kodą")}</div>'
        f'<div class="pt"><i></i>{s.t("o_pt2", "Failo savo „Google“ diske nerasite")}</div></div>'
        f'<div class="ws">{s.t("ws", "Jei mokyklos el. paštas veikia per „Google Workspace“ – apribojimų nėra")}</div>')
add(s, page(s, body, css3))
s.appear('.acc.g', 1.0, 'slinktisIsKaires', 0.6)
s.css.append(".acc.g .badge { animation: iconPulse 0.6s ease-in-out 3.0s both; }")
s.appear('.acc.o', 6.4, 'slinktisIsDesines', 0.6)
s.visible('.ws', 12.9)
s.voice(1.0, 'Geriausia prie failo jungtis su Gmail paskyra – failą rasite savo Google diske.')
s.voice(7.6, 'Su kitu el. pašto adresu irgi veiks, tik kaskart jungsitės per laiške gautą nuorodą ir PIN kodą.')
s.voice(15.3, 'Apribojimų nėra, jei mokyklos paštas veikia per Google.')
s.ekrane = 'Mėlyna kortelė „Gmail paskyra – Rekomenduojama“: failą rasite savo „Google“ diske, veikia visos funkcijos. Geltona „Kitas el. pašto adresas“: kaskart jungiatės per laiško nuorodą ir PIN kodą, failo diske nerasite. Apačioje žalia juosta apie „Google Workspace“.'
s.komentaras = 'Apribojimai — Eimantas 2026-09-17. Iš sąrašo paliktos tik mokytojai aktualios (PIN, failo nėra diske, Workspace išimtis); Apps Script, priedai, Gemini ir pan. nevardijami.'

# ================================================================ 4. Langas
s = Scene('03-langas', 'Pažinkime langą', 'Keturios vietos, kurių prireiks', 17)
rings = [
    ('r1', 66, 6, 520, 48, 1.3, (600, 14), 'Failo pavadinimas'),
    ('r2', 66, 54, 1000, 44, 3.2, (1080, 58), 'Meniu'),
    ('r3', 64, ROWS_TOP + 2, 1612, 13 * ROW_H - 4, 7.2, (1120, 330), 'Langeliai'),
    ('r4', 4, TABBAR_TOP + 2, WIN_W - 8, 52, 10.8, (1180, TABBAR_TOP - 90), 'Lapų juosta'),
]
extra = spotlight(s, [(tt, x, y, w, h) for key, x, y, w, h, tt, _n, _l in rings])
for key, x, y, w, h, tt, (nx, ny), label in rings:
    extra += f'<div class="gs-note n{key}" style="left:{nx}px; top:{ny}px">{s.t("lbl_" + key, label)}</div>'
add(s, page(s, window(s, teachers_rows(s), extra=extra)))
s.appear('.stage > .gs-window', 0.2, 'fadeUpMedium', 0.5)
for n, (key, *_rest) in enumerate(rings):
    tt = _rest[4]
    off = rings[n + 1][5] - 0.05 if n + 1 < len(rings) else None
    s.visible('.n%s' % key, tt + 0.35, off)
s.voice(1.0, 'Viršuje – failo pavadinimas, po juo – meniu.')
s.voice(5.3, 'Meniu prireiks retai.')
s.voice(7.9, 'Per vidurį – langeliai, kuriuose rašote.')
s.voice(11.3, 'O apačioje – lapų juosta: čia persijungiate tarp lentelių.')
s.ekrane = 'Visas Google Sheets langas. Viskas pritemsta, šviesa paeiliui slenka per keturias vietas: failo pavadinimas, meniu, langeliai, lapų juosta. Vienu metu matomas tik vienas užrašas.'

# ================================================================ 5. Lapai
s = Scene('04-lapai', 'Vaikščiojimas per lapus', 'Spaudžiate lapo pavadinimą apačioje', 17)
staff = [row_html(s, 1, 'h2', {'B': s.t('s_h2', 'Darbuotojai')}, chip='H2'),
         row_html(s, 2, 'th', {'B': s.t('s_nr', 'Eil. nr.'), 'C': s.t('s_name', 'Vardas, pavardė'), 'D': s.t('s_role', 'Pareigos'),
                               'E': s.t('s_mail', 'El. paštas')}, chip='TH')]
staff_people = [('Steponas Kairys', 'Direktorius', 'direktorius@mokykla.lt'), ('Aleksandras Stulginskis', 'Direktoriaus pavaduotojas', 'pavaduotojas@mokykla.lt'),
                ('Gabrielė Petkevičaitė-Bitė', 'Raštinės vedėja', 'rastine@mokykla.lt'), ('Marija Gimbutienė', 'Socialinė pedagogė', 'socpedagoge@mokykla.lt'),
                ('Juozas Naujalis', 'IT specialistas', 'it@mokykla.lt')]
for i, (n, p, m) in enumerate(staff_people):
    staff.append(row_html(s, 3 + i, 'data', {'B': f'{i + 1}.', 'C': s.t('sn%d' % i, n), 'D': s.t('sp%d' % i, p), 'E': s.t('sm%d' % i, m)}, band=(i % 2 == 1)))
for r in range(8, 14):
    staff.append(row_html(s, r, 'data', {}, band=False))
grid_a = f'<div class="grid-a">{"".join(teachers_rows(s))}</div>'
grid_b = f'<div class="grid-b" style="position:absolute; left:0; right:0; top:34px; background:#fff">{"".join(staff)}</div>'
tx, ty = tab_center(2)
ax, ay = 1680 - 36, TABBAR_TOP + 28
extra = s.click(tx, ty, 4.6) + s.click(ax, ay, 10.0)
extra += s.cursor_path('.cursor-wrap', [(0, 1200, 400), (2.8, 1200, 400), (4.3, tx, ty), (8.6, tx, ty), (9.7, ax, ay), (15, ax, ay)])
tb = tabbar(s, 2, strip_cls='strip')
win = (f'<div class="gs-window">{top(s)}{formula(s)}<div class="gs-grid">{colhead()}{grid_a}{grid_b}</div>{tb}{extra}</div>')
own = '''
  .gs-tab.tab-3.on-start { }
'''
add(s, page(s, win, own))
s.visible('.grid-b', 4.75)
s.css.append(f".gs-tab.tab-3 {{ animation: tabOnOffGS_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes tabOnOffGS_{s.key} {{ 0% {{ background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; }} {s.pct(4.7)}, 100% {{ background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; }} }}")
s.css.append(f".gs-tab.tab-2 {{ animation: tabOnGS_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes tabOnGS_{s.key} {{ 0% {{ background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; }} {s.pct(4.7)}, 100% {{ background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; }} }}")
s.css.append(f".strip {{ animation: juostaSlenkaGS {s.D}s cubic-bezier(.3,0,.2,1) 0s both; }}")
s.css.append(f"@keyframes juostaSlenkaGS {{ 0%, {s.pct(10.05)} {{ transform: translateX(0); }} {s.pct(10.7)}, 100% {{ transform: translateX(-250px); }} }}")
s.zoom('0% 100%', 2.4, 12.4, 1.28)
s.voice(1.0, 'Norėdami atidaryti kitą lentelę, spaudžiate jos pavadinimą apačioje.')
s.voice(7.0, 'Jei visi lapai netelpa, rodyklėmis dešinėje paslenkate juostą.')
s.voice(12.4, 'Atidarytas lapas apačioje lieka pažymėtas.')
s.ekrane = 'Kamera priartėja prie lapų juostos. Kursorius paspaudžia „Darbuotojai“ — lapas tampa aktyvus, lentelė pasikeičia į darbuotojų sąrašą. Tada paspaudžiama rodyklė ›, ir lapų juosta paslenka.'

# ================================================================ 6. Visi lapai
s = Scene('05-visi-lapai', 'Visų lapų sąrašas', 'Visi lapai – viename sąraše', 14)
lx, ly = 78, TABBAR_TOP + 28
items = ['Gimnazijos taryba', 'Mokinių taryba', 'Darbuotojai', 'Mokytojų sąrašas', 'Dienos ritmas', 'Atostogos', 'Pamokų laikas', 'Formatavimas']
pop_h = len(items) * 44 + 16
pop_top = TABBAR_TOP - pop_h - 6
pop = f'<div class="gs-pop list-pop" style="left:56px; top:{pop_top}px; width:340px">'
for i, n in enumerate(items):
    pop += f'<div class="it li-{i}{" hl" if i == 3 else ""}">{s.t("li%d" % i, n)}</div>'
pop += '</div>'
pick_y = pop_top + 8 + 4 * 44 + 22
pick_x = 56 + 120
# tikro šablono sandara (gviz CSV, 2026-09-17): A žyma, B laikas, C veikla — tuščių stulpelių nėra
RCOLS = [('A', 170), ('B', 220), ('C', 760), ('D', 240), ('E', 228)]
rhythm = [row_html(s, 1, 'h2', {'B': s.t('d_h2', 'Dienos ritmas')}, chip='H2', cols=RCOLS),
          row_html(s, 2, 'th', {'B': s.t('d_t', 'Laikas'), 'C': s.t('d_v', 'Veikla')}, chip='TH', cols=RCOLS, th_only='BC')]
for i, (tm, act) in enumerate([('7.00–8.30', 'Labas rytas!'), ('8.30–9.30', 'Pasiruošimas pusryčiams. Pusryčiai.'),
                               ('9.30–10.30', 'Ugdomoji veikla grupėje, ryto ratas, veikla salėje.'), ('10.30–11.30', 'Linksmybės lauke.'),
                               ('11.45–12.45', 'Pasiruošimas pietums. Pietūs.'), ('13.00–15.00', 'Pasakų, poilsio ir ramybės laikas.')]):
    rhythm.append(row_html(s, 3 + i, 'data', {'B': s.t('dt%d' % i, tm), 'C': s.t('da%d' % i, act)}, band=(i % 2 == 1), cols=RCOLS))
for r in range(9, 14):
    rhythm.append(row_html(s, r, 'data', {}, cols=RCOLS))
grid_a = f'<div class="grid-a">{"".join(teachers_rows(s))}</div>'
grid_c = f'<div class="grid-c" style="position:absolute; left:0; right:0; top:0; background:#fff">{colhead(RCOLS)}{"".join(rhythm)}</div>'
extra = pop + s.click(lx, ly, 2.8) + s.click(pick_x, pick_y, 7.4)
extra += s.cursor_path('.cursor-wrap', [(0, 900, 300), (1.2, 900, 300), (2.5, lx, ly), (5.6, lx, ly), (7.1, pick_x, pick_y), (13, pick_x, pick_y)])
win = f'<div class="gs-window">{top(s)}{formula(s)}<div class="gs-grid">{colhead()}{grid_a}{grid_c}</div>{tabbar(s, 4)}{extra}</div>'
add(s, page(s, win))
s.visible('.list-pop', 2.95, 7.5)
s.css.append(f".list-pop .li-4 {{ animation: hlGS_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes hlGS_{s.key} {{ 0%, {s.pct(6.6)} {{ background: transparent; }} {s.pct(6.6)}, 100% {{ background: #e8eaed; }} }}")
s.visible('.grid-c', 7.6)
s.css.append(f".gs-tab.tab-3 {{ animation: t3GS_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes t3GS_{s.key} {{ 0% {{ background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; }} {s.pct(7.6)}, 100% {{ background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; }} }}")
s.css.append(f".gs-tab.tab-4 {{ animation: t4GS_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes t4GS_{s.key} {{ 0% {{ background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; }} {s.pct(7.6)}, 100% {{ background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; }} }}")
s.zoom('0% 100%', 1.6, 10.2, 1.3)
s.voice(1.0, 'Greičiausias kelias – mygtukas su trimis brūkšneliais.')
s.voice(5.2, 'Jis parodo visus lapus, ir iš sąrašo pasirenkate reikiamą.')
s.voice(10.1, 'Sąraše lapai išdėstyti ta pačia tvarka.')
s.ekrane = 'Kursorius paspaudžia mygtuką su trimis brūkšneliais — iškyla visų lapų sąrašas, dabartinis lapas pažymėtas. Pasirenkamas „Dienos ritmas“, sąrašas užsidaro, atsidaro dienos ritmo lentelė.'

# ================================================================ 7. Lapo meniu
s = Scene('06-lapo-meniu', 'Lapo meniu', 'Rodyklė prie pavadinimo atveria lapo veiksmus', 17)
mx, my = tab_arrow(3)
menu_items = [('Ištrinti', 'tag-warn', 'del'), ('Dubliuoti', '', 'dup'), ('Pervardyti', 'tag-ok', 'ren'), ('Pakeisti spalvą', 'tag-ok arrowed', 'col'),
              ('Slėpti lapą', 'tag-ok', 'hide'), ('Peržiūrėti komentarus', 'dis', 'com'), (None, 'sep', 'sep'), ('Perkelti į dešinę', '', 'mr'), ('Perkelti į kairę', '', 'ml')]
menu_h = 8 * 44 + 17 + 16
menu_left = tab_left(3) + 40
menu_top = TABBAR_TOP - menu_h - 4
pop = f'<div class="gs-pop tab-menu" style="left:{menu_left}px; top:{menu_top}px; width:360px">'
y = menu_top + 8
ypos = {}
for label, cls, key in menu_items:
    if label is None:
        pop += '<div class="sep"></div>'
        y += 17
        continue
    arr = '<span class="arr">▶</span>' if 'arrowed' in cls else ''
    pop += f'<div class="it m-{key} {cls.replace("arrowed", "")}">{s.t("m_" + key, label)}{arr}</div>'
    ypos[key] = y + 22
    y += 44
pop += '</div>'
extra = pop + s.click(mx, my, 3.4)
hx = menu_left + 150
extra += s.cursor_path('.cursor-wrap', [(0, 1200, 300), (1.8, 1200, 300), (3.1, mx, my), (6.3, mx, my), (6.9, hx, ypos['ren']),
                                        (7.8, hx, ypos['ren']), (8.1, hx, ypos['col']), (8.8, hx, ypos['col']), (9.1, hx, ypos['hide']), (10.2, hx, ypos['hide']), (10.8, hx, ypos['del']), (15, hx, ypos['del'])])
add(s, page(s, window(s, teachers_rows(s), extra=extra)))
s.visible('.tab-menu', 3.55)
for key, t_on, t_off in [('ren', 6.9, 8.0), ('col', 8.1, 9.0), ('hide', 9.1, 10.7), ('del', 10.8, None)]:
    name = 'hl_%s_%s' % (s.key, key)
    fr = f"0%, {s.pct(t_on)} {{ background: transparent; }} {s.pct(t_on + 0.01)} {{ background: #e8eaed; }}"
    fr += (f" {s.pct(t_off)} {{ background: #e8eaed; }} {s.pct(t_off + 0.01)}, 100% {{ background: transparent; }}" if t_off else " 100% { background: #e8eaed; }")
    s.css.append(f".tab-menu .m-{key} {{ animation: {name} {s.D}s steps(1,end) 0s both; }}")
    s.css.append(f"@keyframes {name} {{ {fr} }}")
s.zoom('10% 100%', 2.0, None, 1.22)
s.voice(1.0, 'Paspaudę mažą rodyklę prie lapo pavadinimo, matote visus jo veiksmus.')
s.voice(6.4, 'Pervardyti, pakeisti spalvą ar paslėpti lapą galite drąsiai.')
s.voice(11.9, 'Ištrinti taip pat galite – apie tai dar pakalbėsime.')
s.ekrane = 'Paspaudžiama rodyklė ▾ prie „Mokytojų sąrašas“ — atsidaro tikras lapo meniu: Ištrinti, Dubliuoti, Pervardyti, Pakeisti spalvą, Slėpti lapą, Peržiūrėti komentarus, Perkelti į dešinę, Perkelti į kairę. Žalias taškas prie „Pervardyti“, „Pakeisti spalvą“ ir „Slėpti lapą“, oranžinis — prie „Ištrinti“.'
s.komentaras = 'Meniu punktai nusiskaityti iš tikro redaktoriaus (hl=lt). Prisijungusiam vartotojui meniu gali būti ilgesnis (pvz. „Kopijuoti į“). Paslėptas lapas svetainėje veikia toliau — Eimantas 2026-09-17.'

# ================================================================ 8. Pervardyti
s = Scene('07-pervardyti', 'Pervardyti lapą', 'Dukart spustelėjate pavadinimą ir rašote', 14)
nx_, ny_ = tab_center(3)
new_name = 'Mokytojai 2025–2026'
typed = s.typing(new_name, 5.2, 0.1, 'rn')
edit_box = f'<span class="edit-box"><span class="old-sel">{s.t("old", "Mokytojų sąrašas")}</span><span class="new-txt">{typed}</span></span>'
names = {3: edit_box}
tb = tabbar(s, 3, names=names)
extra = s.click(nx_, ny_, 3.0) + s.click(nx_, ny_, 3.28, sound=True)
extra += s.cursor_path('.cursor-wrap', [(0, 1100, 250), (1.2, 1100, 250), (2.7, nx_, ny_ - 60), (3.0, nx_ - 30, ny_), (14, nx_ - 30, ny_)])
own = '''
  .edit-box { display: inline-flex; border: 2px solid var(--gs-select); background: #fff; padding: 2px 8px; color: var(--gs-text); font-weight: 500; }
  .old-sel { background: #c3dafe; display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; vertical-align: bottom; }
'''
win = f'<div class="gs-window">{top(s)}{formula(s)}<div class="gs-grid">{colhead()}{"".join(teachers_rows(s))}</div>{tb}{extra}</div>'
add(s, page(s, win, own))
# pradžia: įprastas pavadinimas; 3.35 — redagavimo laukelis su pažymėtu senu tekstu; 5.2 — senas dingsta, rašomas naujas; 8.0 Enter
s.css.append(f".edit-box {{ animation: laukelisGS_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes laukelisGS_{s.key} {{ 0% {{ border-color: transparent; background: transparent; }} {s.pct(3.35)} {{ border-color: var(--gs-select); background: #fff; }} {s.pct(8.0)}, 100% {{ border-color: transparent; background: transparent; }} }}")
s.css.append(f".old-sel {{ animation: senasGS_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes senasGS_{s.key} {{ 0% {{ max-width: 400px; background: transparent; }} {s.pct(3.35)} {{ max-width: 400px; background: #c3dafe; }} {s.pct(5.15)}, 100% {{ max-width: 0; background: #c3dafe; }} }}")
s.sound(5.2, 'rasymas')
s.sound(8.0, 'spustelejimas')
s.zoom('20% 100%', 1.6, None, 1.35)
s.voice(1.0, 'Lapą pervardyti paprasčiausia dukart spustelėjus jo pavadinimą.')
s.voice(5.9, 'Įrašote naują pavadinimą ir spaudžiate Enter.')
s.voice(9.7, 'Lentelė svetainėje dėl to nesikeičia.')
s.ekrane = 'Priartinta lapų juosta. Dvigubas spustelėjimas ant „Mokytojų sąrašas“ — pavadinimas tampa redaguojamu laukeliu su pažymėtu tekstu. Raidė po raidės įrašoma „Mokytojai 2025–2026“, Enter.'

# ================================================================ 9. Du dalykai
s = Scene('08-atsargiai', 'Pirmas lapas ir trynimas', 'Pirmas lapas lieka pirmas, nereikalingus galite ištrinti', 38)
css9 = '''
  .box { position: absolute; top: 40px; width: 800px; height: 470px; border-radius: 24px; padding: 40px; box-sizing: border-box; background: #fff;
         border: 1.5px solid #dfe3ea; box-shadow: 0 20px 50px rgba(30,40,70,.10); }
  .box.a { left: 20px; } .box.b { left: 860px; }
  .box .h { font-size: 32px; font-weight: 700; color: var(--c-text); margin-bottom: 40px; }
  .mini-tabs { display: flex; font-family: var(--gs-font); background: var(--gs-tabbar); border-top: 1px solid var(--gs-tabbar-line); height: 72px; align-items: stretch; }
  .mini-tabs div { display: flex; align-items: center; padding: 0 22px; font-size: 24px; color: var(--gs-muted); font-weight: 500; }
  .mini-tabs div.first { background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; gap: 12px; }
  .lock { width: 22px; height: 18px; border-radius: 4px; background: var(--gs-blue); position: relative; display: inline-block; }
  .lock::before { content: ""; position: absolute; left: 4px; top: -10px; width: 10px; height: 12px; border: 3px solid var(--gs-blue); border-bottom: 0; border-radius: 8px 8px 0 0; }
  .why { margin-top: 36px; font-size: 24px; color: var(--c-text-muted); }
  .del-item { font-family: var(--gs-font); font-size: 28px; background: #fff; border: 1px solid #dadce0; border-radius: 8px; padding: 22px 30px; display: inline-flex; gap: 18px; align-items: center; position: relative; }
  .ren { margin-top: 26px; font-size: 24px; color: var(--c-text); display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
  .ren b { font-family: var(--gs-font); font-weight: 500; background: var(--c-green-bg); border: 1.5px solid var(--c-green-border); border-radius: 10px; padding: 8px 16px; }
  .warn { margin-top: 26px; font-size: 24px; line-height: 1.4; color: var(--c-text); background: var(--c-amber-bg); border: 1.5px solid #fde68a; border-radius: 14px; padding: 16px 22px; }
  .undo { position: absolute; left: 20px; top: 560px; width: 1640px; height: 150px; flex-wrap: wrap; align-content: center; border-radius: 24px; background: var(--c-green-bg);
          border: 2px solid var(--c-green-border); display: flex; align-items: center; justify-content: center; gap: 26px; font-size: 30px; color: var(--c-text); }
  .key { font-family: var(--gs-font); font-weight: 700; background: #fff; border: 2px solid #c4c7c5; border-bottom-width: 5px; border-radius: 10px; padding: 8px 18px; font-size: 28px; }
  .sm { color: var(--c-text-muted); font-size: 24px; }
  .sm.later { flex-basis: 100%; text-align: center; margin-top: 6px; }
'''
body = (f'<div class="box a"><div class="h">{s.t("a_h", "Pirmas lapas lieka pirmas")}</div>'
        f'<div class="mini-tabs"><div class="first"><span class="lock"></span>{s.t("a_t1", "Gimnazijos taryba")}</div><div>{s.t("a_t2", "Mokinių taryba")}</div><div>{s.t("a_t3", "Darbuotojai")}</div></div>'
        f'<div class="why">{s.t("a_why", "Svetainė jį atpažįsta pagal vietą")}</div>'
        f'<div class="ren">{s.t("a_ren", "Pervadinti galite:")} <b>{s.t("a_ren1", "Mokyklos taryba")}</b> <b>{s.t("a_ren2", "Lopšelio-darželio taryba")}</b></div></div>'
        f'<div class="box b"><div class="h">{s.t("b_h", "Nereikalingą lapą galite ištrinti")}</div>'
        f'<div class="del-item">{s.t("b_del", "Ištrinti")}</div>'
        f'<div class="why">{s.t("b_why", "Kartu dingsta ir lentelė svetainėje")}</div>'
        f'<div class="warn">{s.t("b_warn", "Tik neskubėkite – „nepildysime“ dažnai galioja iki pirmo audito")}</div></div>'
        f'<div class="undo">{s.t("u_txt", "Suklydote?")} <span class="key">Ctrl</span> + <span class="key">Z</span> <span class="sm">{s.t("u_mac", "arba „Mac“ kompiuteryje")}</span> <span class="key">⌘</span> + <span class="key">Z</span>'
        f'<span class="sm later">{s.t("u_later", "Atšaukti nebepavyksta? Padės versijų istorija")}</span></div>')
add(s, page(s, body, css9))
s.appear('.box.a', 4.0, 'slinktisIsKaires', 0.6)
s.visible('.box.a .ren', 8.8)
s.appear('.box.b', 14.2, 'slinktisIsDesines', 0.6)
s.css.append(".box.a .lock { animation: iconPulse 0.6s ease-in-out 5.6s both; }")
s.visible('.box.b .warn', 19.4)
s.visible('.undo', 25.2)
s.visible('.undo .later', 28.6)
s.voice(1.0, 'Dar du dalykai apie lapus.')
s.voice(4.0, 'Pirmas lapas visada lieka pirmas, nes svetainė jį atpažįsta pagal vietą.')
s.voice(9.7, 'Pervadinti jį galite – pavyzdžiui, Mokyklos taryba ar Lopšelio-darželio taryba.')
s.voice(16.3, 'Tikrai nereikalingą lapą galite ištrinti – kartu dingsta ir lentelė svetainėje.')
s.voice(22.2, 'Tik neskubėkite: „nepildysime“ dažnai galioja tik iki pirmo audito.')
s.voice(27.4, 'O jei ištrynėte netyčia, spaudžiate Control ir Z.')
s.voice(31.9, 'O jei atšaukti nebepavyksta, padės versijų istorija.')
s.ekrane = 'Dvi kortelės: „Pirmas lapas lieka pirmas“ su užrakintu pirmu lapu ir žaliais pavyzdžiais „Pervadinti galite: Mokyklos taryba, Lopšelio-darželio taryba“, „Nereikalingą lapą galite ištrinti“ su mygtuku „Ištrinti“, užrašu „Kartu dingsta ir lentelė svetainėje“ ir gelsva pastaba „Tik neskubėkite – „nepildysime“ dažnai galioja iki pirmo audito“. Apačioje žalia juosta „Suklydote? Ctrl + Z, „Mac“ kompiuteryje ⌘ + Z“.'
s.komentaras = 'Eimantas 2026-09-17: mokyklos klausė, ar gali trinti nereikalingus lapus — taip, jei tikrai nereikalingi; neskubėti su darbo užmokesčio lentele („galimai iki pirmo audito nepildysite :)“). Ctrl+Z atšaukia ištrintą lapą, kol neuždarytas langas ir neperkrautas puslapis; po kelių veiksmų gali tekti spausti kelis kartus (Eimantas 2026-09-17). Versijų istorijos mokytojams nerodome — atkūrimą daro Cleverphant. Pirmo lapo taisyklė — iš ankstesnės pamokos (gID 0).'

# ================================================================ 10. A stulpelis
s = Scene('09-zymos', 'Pirmo stulpelio žymos', 'A stulpelis pasako, kaip eilutė atrodys svetainėje', 20)
css10 = '''
  .mini { position: absolute; left: 0; top: 30px; width: 900px; background: #fff; border-radius: 16px; border: 1.5px solid #dfe3ea;
          box-shadow: 0 20px 50px rgba(30,40,70,.10); overflow: hidden; font-family: var(--gs-font); }
  .mrow { display: flex; height: 78px; border-bottom: 1px solid var(--gs-grid); align-items: center; font-size: 26px; color: var(--gs-cell-text); position: relative; }
  .mrow .ca { width: 190px; padding-left: 22px; border-right: 1px solid var(--gs-grid); height: 100%; display: flex; align-items: center; }
  .mrow .cb { padding-left: 22px; flex: 1; display: flex; align-items: center; height: 100%; }
  .mrow .gs-chip { font-size: 22px; height: 34px; min-width: 130px; border-radius: 17px; }
  .mrow.th .cb { background: var(--gs-green-th); color: #fff; font-weight: 700; }
  .mrow.h2 .cb { font-size: 32px; color: #000; }
  .mrow.h3 .cb { font-weight: 700; }
  .site { position: absolute; left: 1000px; top: 30px; width: 680px; min-height: 600px; background: #fff; border-radius: 16px; border: 1.5px solid #dfe3ea;
          box-shadow: 0 20px 50px rgba(30,40,70,.10); padding: 34px 40px; box-sizing: border-box; font-family: Inter, sans-serif; }
  .site .lbl { font-size: 18px; text-transform: uppercase; letter-spacing: .8px; color: var(--c-text-faint); margin-bottom: 18px; }
  .site .s-h2 { font-size: 38px; font-weight: 700; color: var(--c-text); margin-bottom: 18px; }
  .site .s-h3 { font-size: 28px; font-weight: 700; color: var(--c-text); margin-bottom: 16px; }
  .site .s-th { display: flex; background: #eef2f7; font-weight: 700; font-size: 22px; padding: 14px 18px; gap: 40px; color: var(--c-text); }
  .site .s-td { display: flex; font-size: 22px; padding: 14px 18px; gap: 72px; border-bottom: 1px solid #e5e7eb; color: var(--c-text); }
  .site .s-ign { margin-top: 26px; font-size: 20px; color: var(--c-red-text); }
  .hl { position: absolute; border: 4px solid var(--c-blue-solid); border-radius: 10px; pointer-events: none; }
'''
mrows = [('h2', 'H2', s.t('m_h2', 'Mokytojų sąrašas')), ('h3', 'H3', s.t('m_h3', 'Pradinio ugdymo mokytojai')),
         ('th', 'TH', s.t('m_th', 'Eil. nr. · Vardas, pavardė')), ('data', '', s.t('m_td', '1. · Vincas Kudirka')),
         ('ign', 'ignore', s.t('m_ig', 'Pastaba sau: patikslinti iki rugsėjo'))]
mini = '<div class="mini">'
for k, chip, txt in mrows:
    ch = f'<span class="gs-chip">{chip}</span>' if chip else ''
    mini += f'<div class="mrow {k}"><div class="ca">{ch}</div><div class="cb">{txt}</div></div>'
mini += '</div>'
site = (f'<div class="site"><div class="lbl">{s.t("s_lbl", "Svetainėje")}</div>'
        f'<div class="s-h2">{s.t("s_h2", "Mokytojų sąrašas")}</div><div class="s-h3">{s.t("s_h3", "Pradinio ugdymo mokytojai")}</div>'
        f'<div class="s-th"><span>{s.t("s_nr", "Eil. nr.")}</span><span>{s.t("s_nm", "Vardas, pavardė")}</span></div>'
        f'<div class="s-td"><span>1.</span><span>{s.t("s_n1", "Vincas Kudirka")}</span></div>'
        f'<div class="s-ign">{s.t("s_ign", "Eilutė su „ignore“ svetainėje nerodoma")}</div></div>')
hls = ''
events = [(4.8, 0), (6.2, 1), (7.6, 2), (9.8, 3), (13.2, 4)]
for t, i in events:
    hls += f'<div class="hl hl{i}" style="left:-6px; top:{30 + i * 79 - 4}px; width:912px; height:86px"></div>'
add(s, page(s, mini + site + hls, css10))
s.appear('.mini', 0.4, 'slinktisIsKaires', 0.6)
s.appear('.site', 1.2, 'slinktisIsDesines', 0.6)
RELEASE = 16.0
for n, (tt, i) in enumerate(events):
    off = events[n + 1][0] - 0.05 if n + 1 < len(events) else RELEASE
    s.visible('.hl%d' % i, tt, off)
# fokusas: aktyvi eilutė ir jos atitikmuo svetainėje ryškūs, kiti pritemsta; pabaigoje vėl viskas
site_of = ['.site .s-h2', '.site .s-h3', '.site .s-th', '.site .s-td', None]
for i, (k, _c, _x) in enumerate(mrows):
    st = [(0, 1)]
    for tt, j in events:
        st.append((tt, 1 if j == i else 0.28))
    st.append((RELEASE, 1))
    dim_states(s, '.mini .mrow.%s' % k, st)
    if site_of[i]:
        dim_states(s, site_of[i], st)
s.visible('.site .s-ign', 13.4)
s.voice(1.0, 'Pirmo stulpelio žyma pasako, kas yra eilutė.')
s.voice(5, 'H2 – pavadinimas, H3 – skyrius, TH – lentelės stulpelių antraštės.')
s.voice(12.2, 'Eilutė be žymos – įprasta lentelės eilutė,')
s.voice(15.8, 'o su žyma ignore svetainėje nerodoma.')
s.ekrane = 'Kairėje penkios lentelės eilutės su žymomis H2, H3, TH, be žymos ir ignore; dešinėje — kaip tai atrodo svetainėje. Balso metu paeiliui ryški tik viena eilutė ir jos atitikmuo svetainėje, kiti pritemsta; pabaigoje vėl matosi viskas.'
s.komentaras = 'Žymos ir jų reikšmės — iš šablono lapo „Formatavimas“. ⛔ Balsui reikės tarimo žodyno: „H2“, „H3“, „TH“, „ignore“.'

# ================================================================ 11. Rašymas
s = Scene('10-rasymas', 'Rašymas langelyje', 'Spustelėjate langelį, rašote ir spaudžiate Enter', 14)
cx, cy = cell('C', 9)
bx, by, bw, bh = cell_box('C', 9)
name = 'Antanas Baranauskas'
typed = s.typing(name, 4.4, 0.09, 'tp')
sel = f'<div class="gs-sel sel1" style="left:{bx}px; top:{by}px; width:{bw}px; height:{bh + 1}px"></div>'
bx2, by2, _, _ = cell_box('C', 10)
sel2 = f'<div class="gs-sel sel2" style="left:{bx2}px; top:{by2}px; width:{bw}px; height:{bh + 1}px"></div>'
txt = f'<div class="typed-cell" style="position:absolute; left:{bx + 10}px; top:{by + 6}px; font-size:18px; color:#5f5f5f; z-index:7">{typed}</div>'
extra = sel + sel2 + txt + s.click(cx, cy, 2.4)
extra += s.cursor_path('.cursor-wrap', [(0, 1300, 150), (1.0, 1300, 150), (2.2, cx + 60, cy + 4), (15, cx + 60, cy + 4)])
win = (f'<div class="gs-window">{top(s, saved=s.t("saving", "Išsaugoma…"))}{formula(s, "C9", "")}'
       f'<div class="gs-grid">{colhead()}{"".join(teachers_rows(s))}</div>{tabbar(s, 3)}{extra}</div>')
own = f'.gs-saved {{ left: 400px; }}'
add(s, page(s, win, own))
s.visible('.sel1', 2.55, 7.4)
s.visible('.sel2', 7.45)
s.visible('.gs-saved', 7.6, 10.0)
s.sound(4.4, 'rasymas')
s.sound(7.4, 'spustelejimas')
s.zoom('30% 55%', 1.2, 9.8, 1.3)
s.voice(1.0, 'Spustelėjate langelį ir rašote.')
s.voice(4.5, 'Baigę spaudžiate Enter – pakeitimas išsisaugo pats.')
s.voice(9.3, 'Taip užpildote visą lentelę – langelis po langelio.')
s.ekrane = 'Priartinama prie tuščio langelio C9. Spustelėjus jis apvedamas mėlynai, raidė po raidės įrašoma „Antanas Baranauskas“. Enter — žymeklis nusileidžia į C10, viršuje trumpam „Išsaugoma…“.'
s.komentaras = 'Kada pakeitimas atsiranda svetainėje — kita scena (Eimantas 2026-09-17: akimirksniu).'

# ================================================================ 10b. Akimirksniu
s = Scene('11-akimirksniu', 'Svetainėje – akimirksniu', 'Ką matote lentelėje, tą mato ir lankytojas', 18)
CW = [290, 330, 180]
RH, TOP = 64, 40
css_a = """
  .tb { position: absolute; top: 40px; background: #fff; border-radius: 16px; border: 1.5px solid #dfe3ea;
        box-shadow: 0 20px 50px rgba(30,40,70,.10); overflow: hidden; }
  .tb.sh { left: 0; width: 800px; font-family: var(--gs-font); } .tb.st { left: 880px; width: 800px; font-family: Inter, sans-serif; }
  .lb { position: absolute; top: 2px; font-size: 18px; text-transform: uppercase; letter-spacing: .8px; color: var(--c-text-faint); }
  .tb .r { display: flex; height: 64px; border-bottom: 1px solid var(--gs-grid); font-size: 23px; color: var(--gs-cell-text); position: relative; }
  .tb .r > div { display: flex; align-items: center; padding: 0 20px; box-sizing: border-box; border-right: 1px solid var(--gs-grid); overflow: hidden; white-space: nowrap; position: relative; }
  .tb .r > div:last-child { border-right: 0; }
  .tb.sh .r.h > div { background: var(--gs-green-th); color: #fff; font-weight: 700; }
  .tb.st .r.h > div { background: #eef2f7; color: var(--c-text); font-weight: 700; }
  .tb.st .r > div { color: var(--c-text); }
  .tb.st .r > div.c3 { padding: 0; }
  .tb.st .r > div.c3 > span { padding: 0 20px; }
  .ov { position: absolute; inset: 0; display: flex; align-items: center; padding: 0 20px; background: inherit; }
  .fl { position: absolute; inset: 6px; background: #fde68a; border-radius: 6px; z-index: 0; }
  .fl + span { position: relative; z-index: 1; }
  .rg { position: absolute; border: 4px solid var(--c-blue-solid); border-radius: 10px; z-index: 12; pointer-events: none; }
"""
# lentelė: 1 eilutė antraštė, 2 Kudirka, 3 tuščia, 4 Grinius
sh = '<div class="tb sh">'
sh += (f'<div class="r h"><div style="width:{CW[0]}px">{s.auto("Vardas, pavardė")}</div><div style="width:{CW[1]}px">{s.auto("Pareigos")}</div>'
       f'<div style="width:{CW[2]}px"><span class="hd">{s.typing("Kabinetas", 12.6, 0.08, "hd")}</span></div></div>')
sh += (f'<div class="r"><div style="width:{CW[0]}px">{s.auto("Vincas Kudirka")}</div><div style="width:{CW[1]}px">{s.auto("Mokytojas metodininkas")}</div>'
       f'<div style="width:{CW[2]}px">{s.typing("12", 14.1, 0.15, "k1")}</div></div>')
sh += f'<div class="r e"><div style="width:{CW[0]}px"></div><div style="width:{CW[1]}px"></div><div style="width:{CW[2]}px"></div></div>'
sh += (f'<div class="r"><div style="width:{CW[0]}px">{s.auto("Kazys Grinius")}</div>'
       f'<div style="width:{CW[1]}px"><span class="old1">{s.auto("Mokytojas")}</span><span class="new1 ov">{s.typing("Direktorius", 2.2, 0.08, "n1")}</span></div>'
       f'<div style="width:{CW[2]}px">{s.typing("14", 15.1, 0.15, "k2")}</div></div>')
sh += '</div>'
st = '<div class="tb st">'
C3 = lambda inner, cls='': f'<div class="c3 {cls}" style="width:{CW[2]}px">{inner}</div>'
FL = '<i class="fl f3"></i>'
st += f'<div class="r h"><div style="width:{CW[0]}px">{s.auto("Vardas, pavardė")}</div><div style="width:{CW[1]}px">{s.auto("Pareigos")}</div>{C3(FL + "<span>" + s.auto("Kabinetas") + "</span>")}</div>'
st += f'<div class="r"><div style="width:{CW[0]}px">{s.auto("Vincas Kudirka")}</div><div style="width:{CW[1]}px">{s.auto("Mokytojas metodininkas")}</div>{C3(FL + "<span>12</span>")}</div>'
st += f'<div class="r e"><div style="width:{CW[0]}px"></div><div style="width:{CW[1]}px"></div>{C3("")}</div>'
st += (f'<div class="r"><div style="width:{CW[0]}px">{s.auto("Kazys Grinius")}</div>'
       f'<div style="width:{CW[1]}px"><i class="fl f1"></i><span class="old1s">{s.auto("Mokytojas")}</span><span class="new1s ov" style="background:transparent">{s.auto("Direktorius")}</span></div>'
       f'{C3(FL + "<span>14</span>")}</div>')
st += '</div>'
lbls = f'<div class="lb" style="left:4px">{s.t("lb_sh", "Lentelė")}</div><div class="lb" style="left:884px">{s.t("lb_st", "Svetainėje")}</div>'
x2, x3 = CW[0], CW[0] + CW[1]
Y = lambda r: TOP + r * (RH + 1)
sels = (f'<div class="gs-sel s1" style="left:{x2}px; top:{Y(3)}px; width:{CW[1]}px; height:{RH}px"></div>'
        f'<div class="gs-sel sh3" style="left:{x3}px; top:{Y(0)}px; width:{CW[2]}px; height:{RH}px"></div>'
        f'<div class="gs-sel sk1" style="left:{x3}px; top:{Y(1)}px; width:{CW[2]}px; height:{RH}px"></div>'
        f'<div class="gs-sel sk2" style="left:{x3}px; top:{Y(3)}px; width:{CW[2]}px; height:{RH}px"></div>')
enter = f'<div class="gs-note en1" style="left:{x2 + 60}px; top:{Y(4) + 14}px"><b>Enter</b></div>'
rings = ''
for side, x in (('a', 0), ('b', 880)):
    rings += f'<div class="rg re{side}" style="left:{x - 4}px; top:{Y(2) - 4}px; width:808px; height:{RH + 8}px"></div>'
    rings += f'<div class="rg rc{side}" style="left:{x + x3 - 4}px; top:{TOP - 4}px; width:{CW[2] + 8}px; height:{4 * (RH + 1) + 8}px"></div>'
body = lbls + sh + st + sels + enter + rings
p_n1, p_h3, p_k1, p_k2 = (x2 + 120, Y(3) + 32), (x3 + 90, Y(0) + 32), (x3 + 90, Y(1) + 32), (x3 + 90, Y(3) + 32)
body += s.click(*p_n1, 1.6) + s.click(*p_h3, 12.2) + s.click(*p_k1, 13.8) + s.click(*p_k2, 14.8)
body += s.cursor_path('.cursor-wrap', [(0, 700, 560), (0.8, 700, 560), (1.5, *p_n1), (4.0, p_n1[0] + 40, p_n1[1] + 70), (11.4, p_n1[0] + 40, p_n1[1] + 70),
                                       (12.1, *p_h3), (13.5, *p_h3), (13.7, *p_k1), (14.6, *p_k1), (14.7, *p_k2), (20, p_k2[0] + 40, p_k2[1] + 60)])
add(s, page(s, body, css_a))
s.appear('.tb.sh', 0.2, 'slinktisIsKaires', 0.5)
s.appear('.tb.st', 0.4, 'slinktisIsDesines', 0.5)
# 1. pakeitimas akimirksniu
s.visible('.s1', 1.65, 3.5)
s.visible('.old1', 0, 2.1)
s.visible('.new1', 2.15)
s.visible('.en1', 3.0, 4.6)
s.sound(3.5, 'spustelejimas')
s.visible('.old1s', 0, 3.6)
s.visible('.new1s', 3.65)
s.visible('.f1', 3.65, 5.0)
s.sound(3.7, 'patvirtinimas')
# 2. tuščia eilutė — kitos pritemsta
for side in 'ab':
    s.visible('.re' + side, 8.8, 11.6)
dim_states(s, '.tb .r:not(.e):not(.h)', [(0, 1), (8.8, 0.3), (11.6, 1)])
# 3. naujas stulpelis
s.visible('.sh3', 12.25, 13.8)
s.visible('.sk1', 13.85, 14.8)
s.visible('.sk2', 14.85, 15.6)
s.sound(12.6, 'rasymas')
s.sound(15.6, 'spustelejimas')
s.css.append(f".tb.st .c3 {{ animation: c3_{s.key} {s.D}s cubic-bezier(.4,0,.2,1) 0s both; }}")
s.css.append(f"@keyframes c3_{s.key} {{ 0%, {s.pct(15.7)} {{ width: 0; }} {s.pct(16.4)}, 100% {{ width: {CW[2]}px; }} }}")
s.visible('.f3', 16.2, 17.4)
s.sound(16.0, 'patvirtinimas')
for side in 'ab':
    s.visible('.rc' + side, 17.0)
s.voice(1.0, 'Vos išėjus iš langelio, pakeitimas jau matyti svetainėje.')
s.voice(5.6, 'Ką matote lentelėje, tą mato ir lankytojas:')
s.voice(9.5, 'tuščia eilutė svetainėje irgi tuščia,')
s.voice(12.7, 'o užpildytas naujas stulpelis atsiranda ir svetainėje.')
s.ekrane = 'Kairėje lentelė, dešinėje svetainė. 1) „Kazys Grinius“ pareigos pakeičiamos į „Direktorius“, Enter — tą pačią akimirką pasikeičia ir svetainėje (sumirksi). 2) Abiejose pusėse apvedama tuščia eilutė, kitos pritemsta. 3) Lentelėje tuščiame trečiame stulpelyje įrašoma antraštė „Kabinetas“ ir reikšmės „12“, „14“ — svetainėje stulpelis „Kabinetas“ išsiplečia ir atsiranda; apvedamas abiejose pusėse.'
s.komentaras = 'Eimantas 2026-09-17: pakeitimas atsiranda akimirksniu; tuščia eilutė rodoma tuščia; naujas stulpelis su turiniu nusipiešia svetainėje. Perstatyta, kad būtų matyti, kaip stulpelis atsiranda, ne tik apvestas.'

# ================================================================ 11b. Viena eilutė
s = Scene('12-viena-eilute', 'Vienas langelis – viena eilutė', 'Langelyje rašote vieną eilutę', 20)
css_v = """
  .vs { position: absolute; left: 0; top: 20px; width: 860px; background: #fff; border-radius: 16px; border: 1.5px solid #dfe3ea;
        box-shadow: 0 20px 50px rgba(30,40,70,.10); overflow: hidden; font-family: var(--gs-font); }
  .vs .r { display: flex; border-bottom: 1px solid var(--gs-grid); font-size: 23px; color: var(--gs-cell-text); }
  .vs .r > div { padding: 16px 20px; border-right: 1px solid var(--gs-grid); }
  .vs .r > div:first-child { width: 330px; } .vs .r > div:last-child { flex: 1; border-right: 0; }
  .vs .r.th > div { background: var(--gs-green-th); color: #fff; font-weight: 700; }
  .vs .r.bad > div:last-child { line-height: 1.45; }
  .ring-bad { position: absolute; left: 330px; top: 20px; width: 530px; border: 4px solid var(--c-red-solid); border-radius: 10px; pointer-events: none; }
  .site { position: absolute; left: 960px; top: 20px; width: 720px; background: #fff; border-radius: 16px; border: 1.5px solid #dfe3ea;
          box-shadow: 0 20px 50px rgba(30,40,70,.10); padding: 30px 34px; box-sizing: border-box; font-family: Inter, sans-serif; }
  .site .lbl { font-size: 18px; text-transform: uppercase; letter-spacing: .8px; color: var(--c-text-faint); margin-bottom: 16px; }
  .site .tr { display: flex; gap: 30px; padding: 14px 16px; font-size: 22px; color: var(--c-text); border-bottom: 1px solid #e5e7eb; }
  .site .tr.h { background: #eef2f7; font-weight: 700; }
  .site .tr span:first-child { width: 250px; }
  .site .lost { margin-top: 18px; font-size: 21px; color: var(--c-red-text); }
  .ok { position: absolute; left: 0; top: 470px; width: 1680px; height: 120px; border-radius: 20px; background: var(--c-green-bg); border: 2px solid var(--c-green-border);
        display: flex; align-items: center; justify-content: center; gap: 18px; font-size: 27px; color: var(--c-text); }
  .ok b { font-family: var(--gs-font); font-weight: 500; background: #fff; border: 1px solid var(--gs-grid); padding: 10px 18px; border-radius: 8px; }
  .db { position: absolute; left: 0; right: 0; top: 630px; text-align: center; font-size: 30px; font-weight: 700; color: var(--c-text); }
"""
body = (f'<div class="vs"><div class="r th"><div>{s.auto("Vardas, pavardė")}</div><div>{s.auto("Pareigos")}</div></div>'
        f'<div class="r"><div>{s.auto("Vincas Kudirka")}</div><div>{s.auto("Mokytojas metodininkas")}</div></div>'
        f'<div class="r bad"><div>{s.auto("Marija Pečkauskaitė")}</div><div>{s.auto("Lietuvių kalbos mokytoja")}<br>{s.auto("klasės vadovė")}</div></div></div>'
        f'<div class="ring-bad" style="top:{20 + 62 + 62 - 4}px; height:{104}px"></div>'
        f'<div class="site"><div class="lbl">{s.t("s_lbl", "Svetainėje")}</div>'
        f'<div class="tr h"><span>{s.auto("Vardas, pavardė")}</span><span>{s.auto("Pareigos")}</span></div>'
        f'<div class="tr"><span>{s.auto("Vincas Kudirka")}</span><span>{s.auto("Mokytojas metodininkas")}</span></div>'
        f'<div class="tr"><span>{s.auto("Marija Pečkauskaitė")}</span><span>{s.auto("Lietuvių kalbos mokytoja")}</span></div>'
        f'<div class="lost">{s.t("lost", "„klasės vadovė“ dingo – svetainė gauna tik pirmąją eilutę")}</div></div>'
        f'<div class="ok">{s.t("ok_q", "Rašote vienoje eilutėje:")} <b>{s.t("ok_v", "Lietuvių kalbos mokytoja, klasės vadovė")}</b></div>'
        f'<div class="db">{s.t("db", "Google Sheets – duomenų bazė, ne laisvas redaktorius")}</div>')
add(s, page(s, body, css_v))
s.appear('.vs', 0.4, 'slinktisIsKaires', 0.6)
s.visible('.ring-bad', 4.2)
s.appear('.site', 5.0, 'slinktisIsDesines', 0.6)
s.visible('.site .lost', 7.0)
s.visible('.ok', 9.6)
s.visible('.db', 11.9)
s.voice(1.0, 'Langelyje visada rašote vieną eilutę.')
s.voice(4.6, 'Jei tekstą perkeliate į naują eilutę, svetainė gauna tik pirmąją, ir lentelė lūžta.')
s.voice(11.3, 'Vietoj to rašote per kablelį.')
s.voice(14.2, 'Google Sheets čia – duomenų bazė, ne teksto redaktorius.')
s.ekrane = 'Kairėje lentelė, kurioje Marijos Pečkauskaitės pareigos parašytos dviem eilutėmis viename langelyje (apvesta raudonai). Dešinėje svetainė rodo tik pirmąją eilutę, užrašas „Klasės vadovė dingo“. Apačioje žalia juosta su teisingu užrašymu per kablelį ir antraštė „Google Sheets – duomenų bazė, ne laisvas redaktorius“.'
s.komentaras = 'Eimantas 2026-09-17: lentelės lūžta, kai langelyje naudojamas eilutės perkėlimas — API grąžina tik vieną eilutę. Klavišų kombinacijos sąmoningai nerodome, kad jos neišmoktų.'

# ================================================================ 11c. Iš Word
s = Scene('13-is-word', 'Tekstas iš Word', 'Įklijavote iš Word? Sutraukiate į vieną eilutę', 21)
css_w = """
  .fbar { position: absolute; left: 150px; top: 166px; width: 1500px; background: #fff; border: 1px solid #c7c7c7; border-radius: 8px;
          box-shadow: 0 12px 32px rgba(30,40,70,.18); z-index: 12; padding: 10px 24px; box-sizing: border-box; font-family: var(--gs-font);
          font-size: 22px; line-height: 38px; color: var(--gs-text); }
  .fbar .st { position: absolute; left: 24px; top: 10px; white-space: nowrap; }
  .fbar { height: 96px; }
  .caret { display: inline-block; width: 2px; height: 26px; background: #0b57d0; vertical-align: -5px; margin: 0 1px; }
  .keycap { position: absolute; z-index: 16; }
  .keycap small { font-size: 16px; color: var(--c-text-faint); margin-left: 10px; font-weight: 400; }
  .d5 { position: absolute; z-index: 6; font-size: 18px; color: var(--gs-cell-text); background: #fff; white-space: nowrap; }
"""
L1, L2 = 'Lietuvių kalbos mokytoja', 'klasės vadovė'
rows_w = teachers_rows(s)
dx, dy, dw, dh = cell_box('D', 5)
bar = (f'<div class="fbar">'
       f'<div class="st sA">{L1}<br>{L2}</div>'
       f'<div class="st sB">{L1}<br><span class="caret"></span>{L2}</div>'
       f'<div class="st sC">{L1}<span class="caret"></span>{L2}</div>'
       f'<div class="st sD">{L1}, <span class="caret"></span>{L2}</div></div>')
cells = (f'<div class="d5 d5a" style="left:{dx + 1}px; top:{dy + 1}px; width:{dw - 2}px; height:{dh - 2}px; padding:7px 10px; box-sizing:border-box">{L1}</div>'
         f'<div class="d5 d5b" style="left:{dx + 1}px; top:{dy + 1}px; width:{dw - 2}px; height:{dh - 2}px; padding:7px 10px; box-sizing:border-box">{L1}, {L2}</div>')
sel = f'<div class="gs-sel" style="left:{dx}px; top:{dy}px; width:{dw}px; height:{dh + 1}px"></div>'
keys = (f'<div class="gs-note keycap kb" style="left:980px; top:290px"><b>Backspace</b><small>{s.t("mac_bs", "Mac: delete")}</small></div>'
        f'<div class="gs-note keycap ke" style="left:980px; top:290px"><b>Enter</b></div>'
        '')
line2_x, line2_y = 150 + 24 + 4, 166 + 10 + 38 + 19
extra = sel + cells + bar + keys + s.click(line2_x, line2_y, 7.0)
extra += s.cursor_path('.cursor-wrap', [(0, 1200, 500), (5.6, 1200, 500), (6.8, line2_x, line2_y + 4), (13.0, line2_x, line2_y + 4), (14.2, 1250, 520), (17, 1250, 520)])
win = (f'<div class="gs-window">{top(s)}{formula(s, "D5", L1 + ", " + L2)}'
       f'<div class="gs-grid">{colhead()}{"".join(rows_w)}</div>{tabbar(s, 3)}{extra}</div>')
add(s, page(s, win, css_w))
s.visible('.fbar', 1.8, 13.4)
s.visible('.sA', 1.8, 7.05)
s.visible('.sB', 7.1, 9.55)
s.visible('.sC', 9.6, 11.15)
s.visible('.sD', 11.2)
s.visible('.kb', 8.4, 10.4)
s.sound(9.6, 'spustelejimas')
s.sound(11.2, 'rasymas')
s.visible('.ke', 12.6, 13.8)
s.sound(13.3, 'spustelejimas')
s.visible('.d5a', 0, 13.4)
s.visible('.d5b', 13.5)
s.sound(13.8, 'patvirtinimas')
s.zoom('0% 10%', 1.2, 14.6, 1.3)
s.voice(1.0, 'Iš Word ar PDF tekstas dažnai atkeliauja su paslėptu eilutės perkėlimu.')
s.voice(7.2, 'Viršutinėje juostoje spustelėjate antros eilutės pradžią ir spaudžiate Backspace.')
s.voice(14.2, 'Įrašote kablelį ir spaudžiate Enter.')
s.voice(18.1, 'Dabar tai viena eilutė.')
s.ekrane = 'Pažymėtas langelis D5. Viršuje išsiskleidžia formulės juosta su dviem eilutėmis: „Lietuvių kalbos mokytoja“ / „klasės vadovė“. Kursorius spusteli antros eilutės pradžioje, klavišas „Backspace (Mac: delete)“ — eilutės susijungia, įrašomas kablelis, „Enter“. Juosta susiskleidžia, langelyje „Lietuvių kalbos mokytoja, klasės vadovė“.'
s.komentaras = 'Eimantas 2026-09-17: eilutės perkėlimą taisome viršutinėje langelio juostoje. ⛔ Išsiskleidžiančios formulės juostos vaizdas supaprastintas — tikrame Sheets ji plečiasi rodykle dešinėje; lietuviško „Mac: delete“ užrašo nėra, tai mūsų paaiškinimas.'

# ================================================================ 11c. Numeriai
s = Scene('14-numeriai', 'Eilės numeriai', 'Numerius kopijuojate iš kitos lentelės', 14)
rows_n = [row_html(s, 1, 'h2', {'B': s.t('h2', 'Mokytojų sąrašas 2025–2026 m. m.')}, chip='H2'),
          row_html(s, 2, 'h3', {'C': s.t('h3a', 'Pradinio ugdymo mokytojai')}, chip='H3'),
          row_html(s, 3, 'th', {'B': s.t('nr', 'Eil. nr.'), 'C': s.t('nm', 'Vardas, pavardė'), 'D': s.t('pr', 'Pareigos įstaigoje'), 'E': s.t('ct', 'Kvalifikacinė kategorija')}, chip='TH')]
for i, (n, pr) in enumerate([('Vincas Kudirka', 'Pradinio ugdymo mokytojas'), ('Marija Pečkauskaitė', 'Pradinio ugdymo mokytoja'), ('Jonas Basanavičius', 'Pradinio ugdymo mokytojas')]):
    rows_n.append(row_html(s, 4 + i, 'data', {'B': f'{i + 1}.', 'C': s.t('a%d' % i, n), 'D': s.t('ap%d' % i, pr)}, band=(i % 2 == 1)))
rows_n.append(row_html(s, 7, 'h3', {'C': s.t('h3b', 'Užsienio kalbų mokytojai')}, chip='H3'))
rows_n.append(row_html(s, 8, 'th', {'B': s.t('nr2', 'Eil. nr.'), 'C': s.t('nm2', 'Vardas, pavardė'), 'D': s.t('pr2', 'Pareigos'), 'E': s.t('ct2', 'Kvalifikacinė kategorija')}, chip='TH'))
for i, (n, pr) in enumerate([('Jonas Mačiulis', 'Anglų kalbos mokytojas'), ('Juozas Tumas', 'Vokiečių kalbos mokytojas'), ('Jonas Biliūnas', 'Prancūzų kalbos mokytojas')]):
    rows_n.append(row_html(s, 9 + i, 'data', {'C': s.t('b%d' % i, n), 'D': s.t('bp%d' % i, pr)}, band=(i % 2 == 1)))
for r in (12, 13):
    rows_n.append(row_html(s, r, 'data', {}))
b4x, b4y, bw, bh = cell_box('B', 4)
b9x, b9y, _, _ = cell_box('B', 9)
copy_box = f'<div class="copybox" style="position:absolute; left:{b4x}px; top:{b4y}px; width:{bw}px; height:{3 * ROW_H + 1}px; border:3px dashed var(--gs-select); box-sizing:border-box; z-index:6"></div>'
sel_a = f'<div class="gs-sel sela" style="left:{b4x}px; top:{b4y}px; width:{bw}px; height:{3 * ROW_H + 1}px"></div>'
sel_b = f'<div class="gs-sel selb" style="left:{b9x}px; top:{b9y}px; width:{bw}px; height:{3 * ROW_H + 1}px"></div>'
pasted = f'<div class="pasted" style="position:absolute; left:{b9x}px; top:{b9y}px; width:{bw}px; z-index:5">' + \
    ''.join(f'<div style="height:{ROW_H}px; display:flex; align-items:center; padding:0 10px; font-size:18px; color:var(--gs-cell-text)">{k}.</div>' for k in (1, 2, 3)) + '</div>'
dnx = cell_box('D', 4)[0] + 330
formula_try = f'<div class="gs-note ftry" style="left:{dnx}px; top:{b9y + ROW_H - 6}px"><s>=B9+1</s>&nbsp; {s.t("ftry", "neveikia su „1.“")}</div>'
keys_c = f'<div class="gs-note kc" style="left:{dnx}px; top:{b4y + 20}px"><b>Ctrl + C</b></div>'
keys_v = f'<div class="gs-note kv" style="left:{dnx}px; top:{b9y + 20}px"><b>Ctrl + V</b></div>'
p_a1 = cell('B', 4); p_a2 = cell('B', 6); p_b = cell('B', 9)
extra = copy_box + sel_a + sel_b + pasted + formula_try + keys_c + keys_v
extra += s.click(*p_a1, 6.2) + s.click(*p_b, 10.0)
extra += s.cursor_path('.cursor-wrap', [(0, 1100, 250), (5.0, 1100, 250), (6.0, *p_a1), (6.3, *p_a1), (7.0, *p_a2), (9.2, *p_a2), (9.9, *p_b), (14, p_b[0] + 20, p_b[1] + 10)])
win = f'<div class="gs-window">{top(s)}{formula(s)}<div class="gs-grid">{colhead()}{"".join(rows_n)}</div>{tabbar(s, 3)}{extra}</div>'
add(s, page(s, win))
s.visible('.ftry', 1.6, 5.2)
s.visible('.sela', 6.25, 10.0)
s.visible('.kc', 7.4, 9.4)
s.visible('.copybox', 7.4, 11.0)
s.visible('.selb', 10.05)
s.visible('.kv', 10.5, 12.2)
s.visible('.pasted', 10.7)
s.sound(7.4, 'spustelejimas')
s.sound(10.5, 'spustelejimas')
s.zoom('0% 45%', 0.6, 12.2, 1.25)
s.voice(1.0, 'Eilės numerių formulėmis nesuskaičiuosite – numeriai rašomi su tašku.')
s.voice(6.8, 'Paprasčiausia nukopijuoti numerius iš kitos lentelės')
s.voice(10.6, 'ir įklijuoti ten, kur jų trūksta.')
s.ekrane = 'Antroje grupėje trūksta eilės numerių; prie jų trumpam užrašas „=B9+1 neveikia su „1.““. Pažymimi pirmos grupės numeriai 1.–3., „Ctrl + C“ (punktyrinis rėmelis), spustelimas B9, „Ctrl + V“ — numeriai atsiranda.'
s.komentaras = 'Eimantas 2026-09-17: mokytoja bandė numeruoti formulėmis; su numeriais „1.“ įprastas veikimas neveikia. Paprasčiausia kopijuoti iš kitos sunumeruotos lentelės.'

# ================================================================ 12. Nauja eilutė
s = Scene('15-nauja-eilute', 'Nauja ir išimta eilutė', 'Įterpiate ar išimate žmogų – sąrašas lieka iš eilės', 51)
# pradinis sąrašas: 5 žmonės su numeriais, tuščios eilutės BE numerių (Eimantas 2026-09-17)
PEOPLE0 = [('Vincas Kudirka', 'Pradinio ugdymo mokytojas', 'Mokytojas metodininkas'), ('Marija Pečkauskaitė', 'Pradinio ugdymo mokytoja', 'Vyresnioji mokytoja'),
           ('Jonas Basanavičius', 'Pradinio ugdymo mokytojas', 'Vyresnysis mokytojas'), ('Julija Žymantienė', 'Pradinio ugdymo mokytoja', 'Mokytoja metodininkė'),
           ('Kazys Grinius', 'Pradinio ugdymo mokytojas', 'Mokytojas')]
rows = [row_html(s, 1, 'h2', {'B': s.t('t_h2', 'Mokytojų sąrašas 2025–2026 m. m.')}, chip='H2'),
        row_html(s, 2, 'h3', {'C': s.t('t_h3a', 'Pradinio ugdymo mokytojai')}, chip='H3'),
        row_html(s, 3, 'th', {'B': s.t('t_nr', 'Eil. nr.'), 'C': s.t('t_name', 'Vardas, pavardė'), 'D': s.t('t_role', 'Pareigos įstaigoje'), 'E': s.t('t_cat', 'Kvalifikacinė kategorija')}, chip='TH')]
for i, (n, pr, ct) in enumerate(PEOPLE0):
    rows.append(row_html(s, 4 + i, 'data', {'B': f'{i + 1}.', 'C': s.t('n%d' % i, n), 'D': s.t('p%d' % i, pr), 'E': s.t('c%d' % i, ct)}, band=(i % 2 == 1)))
for r in (9, 10, 11):
    rows.append(row_html(s, r, 'data', {}, band=(r % 2 == 1)))
rows.append(row_html(s, 12, 'h3', {'C': s.t('t_h3b', 'Lietuvių kalbos ir literatūros mokytojai')}, chip='H3'))
# ---- 1. įterpimas po 6 eilute
rx, ry = 31, ROWS_TOP + 5 * ROW_H + 17
ctx_items = ['Iškirpti', 'Kopijuoti', 'Įklijuoti', None, 'Įterpti 1 eilutę aukščiau', 'Įterpti 1 eilutę žemiau', 'Ištrinti eilutę', 'Išvalyti eilutę', 'Slėpti eilutę']
ctx_left = 40
ctx_h = 8 * 44 + 17 + 16
ctx_y = TABBAR_TOP - ctx_h - 4
pop = f'<div class="gs-pop ctx" style="left:{ctx_left}px; top:{ctx_y}px; width:380px">'
yy = ctx_y + 8
below_y = None
for i, it in enumerate(ctx_items):
    if it is None:
        pop += '<div class="sep"></div>'
        yy += 17
        continue
    key = 'ctx%d' % i
    pop += f'<div class="it {key}">{s.t(key, it)}</div>'
    if it == 'Įterpti 1 eilutę žemiau':
        below_y = yy + 22
    yy += 44
pop += '</div>'
bx_, by_ = ctx_left + 180, below_y
new_rows = rows[:6] + [row_html(s, 7, 'data', {}, extra_cls='ins')] + \
    [re.sub(r'data-r="(\d+)"', lambda m: 'data-r="%d"' % (int(m.group(1)) + 1), r) for r in rows[6:12]]
rh_fix = f'<div class="rh-fix" style="position:absolute; left:0; top:{ROWS_TOP}px; width:{RH_W}px; z-index:4">' + \
    ''.join(f'<div style="height:{ROW_H}px; box-sizing:border-box; border-bottom:1px solid var(--gs-grid); border-right:1px solid var(--gs-grid); background:#fff; display:flex; align-items:center; justify-content:center; font-size:16px; color:var(--gs-head-text)">{n}</div>' for n in range(1, 14)) + '</div>'
# ---- 2. naujas žmogus 7 eilutėje
c7x, c7y, c7w, _ = cell_box('C', 7)
d7x, d7y, d7w, _ = cell_box('D', 7)
e7x, e7y, e7w, _ = cell_box('E', 7)
newt = (f'<div class="newt" style="position:absolute; left:{c7x + 10}px; top:{c7y + 7}px; font-size:18px; color:var(--gs-cell-text); z-index:5; white-space:nowrap">' + s.typing('Kristijonas Donelaitis', 11.0, 0.07, 'nm') + '</div>'
        f'<div class="newt" style="position:absolute; left:{d7x + 10}px; top:{d7y + 7}px; font-size:18px; color:var(--gs-cell-text); z-index:5; white-space:nowrap">' + s.typing('Pradinio ugdymo mokytojas', 13.3, 0.05, 'pr') + '</div>'
        f'<div class="newt" style="position:absolute; left:{e7x + 10}px; top:{e7y + 7}px; font-size:18px; color:var(--gs-cell-text); z-index:5; white-space:nowrap">' + s.typing('Mokytojas', 15.2, 0.05, 'kt') + '</div>'
        f'<div class="gs-sel sele7" style="left:{e7x}px; top:{e7y}px; width:{e7w}px; height:{ROW_H + 1}px"></div>'
        f'<div class="gs-sel selc7" style="left:{c7x}px; top:{c7y}px; width:{c7w}px; height:{ROW_H + 1}px"></div>'
        f'<div class="gs-sel seld7" style="left:{d7x}px; top:{d7y}px; width:{d7w}px; height:{ROW_H + 1}px"></div>')
pc7, pd7 = cell('C', 7), cell('D', 7)
# ---- 3. numeriai B8:B9 → B7:B8, B9 įrašoma „6.“
b7x, b7y, bw, bh = cell_box('B', 7)
b8x, b8y, _, _ = cell_box('B', 8)
b9x, b9y, _, _ = cell_box('B', 9)
numcol = f'<div class="numcol" style="position:absolute; left:{b7x}px; top:{b7y}px; width:{bw}px; z-index:5">' + \
    ''.join(f'<div style="height:{ROW_H}px; display:flex; align-items:center; padding:0 10px; font-size:18px; color:var(--gs-cell-text)">{k}.</div>' for k in (4, 5)) + '</div>'
last = f'<div class="lastnr" style="position:absolute; left:{b9x + 10}px; top:{b9y + 7}px; font-size:18px; color:var(--gs-cell-text); z-index:5">' + s.typing('6.', 27.2, 0.15, 'ln') + '</div>'
selbox = f'<div class="gs-sel selm" style="left:{b7x}px; top:{b7y}px; width:{bw}px; height:{2 * ROW_H + 1}px"></div>'
gap_ring = f'<div class="gs-ring gap" style="left:{b7x - 4}px; top:{b7y - 4}px; width:{bw + 8}px; height:{ROW_H + 8}px; border-color: var(--c-amber-solid)"></div>'
p1, p2 = cell('B', 8), cell('B', 9)
edge = (b8x + bw / 2, b8y + 2)
edge_up = (edge[0], edge[1] - ROW_H)
p_last = cell('B', 9)
# ---- 4. išimamas Jonas Basanavičius: C7:E9 iš karto nutempiama ant 6 eilutės
c6x, c6y, _, _ = cell_box('C', 6)
e6x, _, e6w, _ = cell_box('E', 6)
wCE = e6x + e6w - c6x
people = [('Kristijonas Donelaitis', 'Pradinio ugdymo mokytojas', 'Mokytojas'), ('Julija Žymantienė', 'Pradinio ugdymo mokytoja', 'Mokytoja metodininkė'),
          ('Kazys Grinius', 'Pradinio ugdymo mokytojas', 'Mokytojas')]
cw = [w for c, w in COLS if c in 'CDE']
blkh = f'<div class="pblk" style="position:absolute; left:{c6x}px; top:{c6y + ROW_H}px; width:{wCE}px; height:{3 * ROW_H}px; z-index:5">'
for i, row in enumerate(people):
    blkh += f'<div style="display:flex; height:{ROW_H}px">' + ''.join(
        f'<span style="width:{cw[k]}px; box-sizing:border-box; padding:0 10px; display:flex; align-items:center; font-size:18px; color:var(--gs-cell-text); white-space:nowrap">{s.t("pb%d_%d" % (i, k), v) if v else ""}</span>'
        for k, v in enumerate(row)) + '</div>'
blkh += '</div>' + f'<div class="gs-sel selblk" style="left:{c6x}px; top:{c6y + ROW_H}px; width:{wCE}px; height:{3 * ROW_H + 1}px"></div>'
p_c7 = (c6x + 120, c6y + ROW_H + 17)
p_e9 = (e6x + 200, c6y + 3 * ROW_H + 17)
edge_p = (c6x + 300, c6y + ROW_H + 2)
edge_p_up = (edge_p[0], edge_p[1] - ROW_H)
# ---- 5. likęs „6.“ ištrinamas
selb9 = f'<div class="gs-sel selb9" style="left:{b9x}px; top:{b9y}px; width:{bw}px; height:{ROW_H + 1}px"></div>'
kdel = f'<div class="gs-note kdel" style="left:{b9x + 140}px; top:{b9y + 44}px"><b>Delete</b></div>'
extra = pop + newt + numcol + last + selbox + gap_ring + blkh + selb9 + kdel
extra += s.click(rx, ry, 4.0) + s.click(bx_, by_, 8.0) + s.click(*pc7, 10.6) + s.click(*pd7, 12.9) + s.click(*p1, 20.0) + s.click(*p_last, 26.6)
extra += s.click(*p_c7, 31.6) + s.click(*p_last, 37.4)
extra += s.cursor_path('.cursor-wrap', [(0, 900, 150), (2.4, 900, 150), (3.7, rx, ry), (6.2, rx, ry), (7.0, bx_, by_), (8.6, bx_, by_),
                                        (9.8, pc7[0] + 150, pc7[1]), (10.5, pc7[0] + 150, pc7[1]), (12.4, pc7[0] + 150, pc7[1]), (12.8, pd7[0] + 150, pd7[1]), (18.9, pd7[0] + 150, pd7[1]),
                                        (19.9, *p1), (20.1, *p1), (21.1, *p2), (21.6, *p2), (22.4, *edge), (23.4, *edge), (24.3, *edge_up), (25.6, *edge_up),
                                        (26.5, *p_last), (29.8, p_last[0] + 20, p_last[1] + 10),
                                        (31.5, *p_c7), (31.7, *p_c7), (32.5, *p_e9), (32.7, *p_e9), (33.3, *edge_p), (33.6, *edge_p), (34.5, *edge_p_up),
                                        (36.4, *edge_p_up), (37.3, *p_last), (42, p_last[0] + 30, p_last[1] + 20)],
                         grab=[(22.6, 24.4), (33.5, 34.7)])
win = f'<div class="gs-window">{top(s)}{formula(s)}<div class="gs-grid">{colhead()}{"".join(new_rows)}</div>{rh_fix}{tabbar(s, 3)}{extra}</div>'
add(s, page(s, win))
# 1
s.visible('.ctx', 4.15, 8.1)
name = 'hl_%s' % s.key
s.css.append(f".ctx .ctx5 {{ animation: {name} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes {name} {{ 0%, {s.pct(7.0)} {{ background: transparent; }} {s.pct(7.01)}, {s.pct(8.1)} {{ background: #e8eaed; }} {s.pct(8.11)}, 100% {{ background: transparent; }} }}")
s.visible('.gs-row.ins', 8.25)
for r in range(8, 14):
    s.css.append(f'.gs-row[data-r="{r}"] {{ animation: eilSlenkaGS_{s.key} {s.D}s cubic-bezier(.3,0,.2,1) 0s both; }}')
s.css.append(f"@keyframes eilSlenkaGS_{s.key} {{ 0%, {s.pct(8.2)} {{ transform: translateY(-34px); }} {s.pct(8.6)}, 100% {{ transform: translateY(0); }} }}")
# 2
s.visible('.selc7', 10.65, 12.9)
s.visible('.seld7', 12.95, 15.0)
s.visible('.sele7', 15.05, 16.2)
s.sound(11.0, 'rasymas')
s.sound(13.3, 'rasymas')
s.sound(15.2, 'rasymas')
# 3
s.visible('.gap', 16.2, 19.6)
B = lambda r: f'.gs-row[data-r="{r}"] > span:nth-child(3)'
s.css.append(f'{B(8)}, {B(9)} {{ animation: bSlepti_{s.key} {s.D}s steps(1,end) 0s both; }}')
s.css.append(f"@keyframes bSlepti_{s.key} {{ 0%, {s.pct(19.99)} {{ color: var(--gs-cell-text); }} {s.pct(20.0)}, 100% {{ color: transparent; }} }}")
s.css.append(f".numcol {{ animation: numSlenka_{s.key} {s.D}s cubic-bezier(.4,0,.2,1) 0s both; }}")
s.css.append(f"@keyframes numSlenka_{s.key} {{ 0%, {s.pct(19.99)} {{ opacity: 0; transform: translateY({ROW_H}px); }} {s.pct(20.0)}, {s.pct(23.4)} {{ opacity: 1; transform: translateY({ROW_H}px); }} {s.pct(24.3)}, 100% {{ opacity: 1; transform: translateY(0); }} }}")
s.css.append(f".selm {{ animation: selm_{s.key} {s.D}s cubic-bezier(.4,0,.2,1) 0s both; }}")
s.css.append(f"@keyframes selm_{s.key} {{ 0%, {s.pct(20.05)} {{ opacity: 0; transform: translateY({ROW_H}px); height: {ROW_H + 1}px; }} "
             f"{s.pct(20.1)} {{ opacity: 1; transform: translateY({ROW_H}px); height: {ROW_H + 1}px; }} {s.pct(21.1)} {{ opacity: 1; transform: translateY({ROW_H}px); height: {2 * ROW_H + 1}px; }} "
             f"{s.pct(23.4)} {{ opacity: 1; transform: translateY({ROW_H}px); height: {2 * ROW_H + 1}px; }} {s.pct(24.3)} {{ opacity: 1; transform: translateY(0); height: {2 * ROW_H + 1}px; }} "
             f"{s.pct(26.5)} {{ opacity: 1; transform: translateY(0); }} {s.pct(26.55)}, 100% {{ opacity: 0; transform: translateY(0); }} }}")
s.sound(22.6, 'paemimas')
s.sound(24.3, 'numetimas')
s.sound(27.2, 'rasymas')
# 4
CE = lambda r: ', '.join(f'.gs-row[data-r="{r}"] > span:nth-child({n})' for n in (4, 5, 6))
s.css.append(f"{CE(6)} {{ animation: perrasyti_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes perrasyti_{s.key} {{ 0%, {s.pct(34.49)} {{ opacity: 1; }} {s.pct(34.5)}, 100% {{ opacity: 0; }} }}")
s.css.append(f"{CE(8)}, {CE(9)}, .newt {{ animation: perimti_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes perimti_{s.key} {{ 0%, {s.pct(31.59)} {{ opacity: 1; }} {s.pct(31.6)}, 100% {{ opacity: 0; }} }}")
s.css.append(f".pblk {{ animation: pblk_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes pblk_{s.key} {{ 0%, {s.pct(31.59)} {{ opacity: 0; transform: translateY(0); }} {s.pct(31.6)}, {s.pct(34.49)} {{ opacity: 1; transform: translateY(0); }} {s.pct(34.5)}, 100% {{ opacity: 1; transform: translateY(-{ROW_H}px); }} }}")
# tempiant juda tik pažymėjimo rėmelis; duomenys persikelia paleidus
s.base.append('.selblk { opacity: 0; }')
s.css.append(f".selblk {{ animation: selblk_{s.key} {s.D}s cubic-bezier(.4,0,.2,1) 0s both; }}")
s.css.append(f"@keyframes selblk_{s.key} {{ 0%, {s.pct(31.64)} {{ opacity: 0; transform: translateY(0); }} {s.pct(31.65)}, {s.pct(33.6)} {{ opacity: 1; transform: translateY(0); }} {s.pct(34.5)}, {s.pct(36.8)} {{ opacity: 1; transform: translateY(-{ROW_H}px); }} {s.pct(36.85)}, 100% {{ opacity: 0; transform: translateY(-{ROW_H}px); }} }}")
s.sound(33.6, 'paemimas')
s.sound(34.5, 'numetimas')
# 5
s.visible('.selb9', 37.45, 40.0)
s.visible('.kdel', 38.0, 39.6)
s.css.append(f".lastnr {{ animation: lastnr_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes lastnr_{s.key} {{ 0%, {s.pct(38.39)} {{ opacity: 1; }} {s.pct(38.4)}, 100% {{ opacity: 0; }} }}")
s.sound(38.4, 'spustelejimas')
# galutinė būsena PNG kadrui
s.base += [f'{B(8)}, {B(9)} {{ color: transparent; }}', '.selm { opacity: 0; }',
           f'{CE(6)}, {CE(8)}, {CE(9)}, .newt, .lastnr {{ opacity: 0; }}', f'.pblk {{ transform: translateY(-{ROW_H}px); }}']
s.zoom('0% 55%', 2.0, 40.6, 1.25)
s.voice(1.0, 'Jei sąraše trūksta vietos, dešiniuoju pelės mygtuku spaudžiate eilutės numerį kairėje.')
s.voice(7.7, 'Pasirenkate Įterpti 1 eilutę žemiau, ir atsiranda tuščia eilutė.')
s.voice(14, 'Įrašote naują mokytoją.')
s.voice(16.9, 'Pareigas ir kategoriją įrašote iš karto.')
s.voice(20.9, 'Tik eilės numeriai pasislenka žemyn.')
s.voice(24.3, 'Pažymite numerius žemiau naujos eilutės ir, paėmę už krašto, nutempiate vienu langeliu aukščiau.')
s.voice(32.8, 'Paskutinį numerį įrašote ranka.')
s.voice(36.5, 'O jei mokytojo sąraše nebeliko, žemiau esančius žmones su pareigomis nutempiate tiesiai ant jo eilutės.')
s.voice(44.8, 'Likusį paskutinį numerį ištrinate.')
s.voice(48, 'Sąrašas vėl iš eilės.')
s.ekrane = 'Sąrašas su penkiais mokytojais (1.–5.), tuščios eilutės be numerių. Dešinysis spustelėjimas ant 6 eilutės numerio — „Įterpti 1 eilutę žemiau“; atsiranda tuščia 7 eilutė, į ją įrašoma „Kristijonas Donelaitis“, „Pradinio ugdymo mokytojas“, „Mokytojas“. Numerių langelis apvedamas; numeriai B8:B9 paimami už krašto ir nutempiami aukštyn, B9 įrašoma „6.“. Tada C7:E9 (trys žmonės su pareigomis) paimami ir nutempiami tiesiai ant Jono Basanavičiaus eilutės. Likęs „6.“ pažymimas ir ištrinamas — sąrašas 1.–5. iš eilės.'
s.komentaras = 'Eimantas 2026-09-17: įterpus eilutę numeriai pasislenka; išimant žmogų — perstumdyti žmones su pareigomis iš karto, be atskiro eilutės išvalymo; tuščios eilutės be numerių. ⛔ PATIKRINTI: ar Google Sheets, tempiant ant užpildytų langelių, klausia „pakeisti duomenis?“.'

# ================================================================ 16b. Paruošta sandara
s = Scene('16-paruostukai', 'Paruošti pavyzdžiai', 'Paruošti pavyzdžiai jau veikia su svetaine', 17)
css_p = """
  .pc { position: absolute; top: 60px; width: 520px; height: 460px; background: #fff; border-radius: 20px; border: 1.5px solid #dfe3ea;
        box-shadow: 0 20px 50px rgba(30,40,70,.10); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 34px;
        text-align: center; padding: 0 40px; box-sizing: border-box; }
  .pc .ic { position: relative; height: 150px; width: 260px; display: flex; align-items: center; justify-content: center; }
  .pc .tx { font-size: 32px; font-weight: 700; color: var(--c-text); line-height: 1.25; }
  .pc .sub { font-size: 23px; color: var(--c-text-muted); line-height: 1.35; margin-top: -18px; }
  .x { position: absolute; right: 6px; top: 0; width: 54px; height: 54px; border-radius: 50%; background: #94a3b8; color: #fff;
       font-size: 34px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
  .cells { display: flex; border: 2px solid #9aa0a6; border-radius: 6px; overflow: hidden; }
  .cells i { width: 90px; height: 60px; border-right: 2px dashed #9aa0a6; display: block; background: #f1f3f4; }
  .cells i:last-child { border-right: 0; }
  .sortp { font-family: var(--gs-font); font-size: 44px; font-weight: 700; color: #5f6368; border: 2px solid #9aa0a6; border-radius: 12px; padding: 18px 28px; }
  .qm { width: 110px; height: 110px; border-radius: 50%; background: var(--c-amber-bg, #fffbeb); border: 3px solid var(--c-amber-solid);
        color: var(--c-amber-solid); font-size: 64px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
"""
body = (f'<div class="pc p1" style="left:0"><div class="ic"><div class="cells"><i></i><i></i></div><div class="x">×</div></div>'
        f'<div class="tx">{s.t("p1", "Langelius geriau palikti atskirus")}</div></div>'
        f'<div class="pc p2" style="left:580px"><div class="ic"><div class="sortp">A → Z</div><div class="x">×</div></div>'
        f'<div class="tx">{s.t("p2", "Rikiavimo geriau nekeisti")}</div></div>'
        f'<div class="pc p3" style="left:1160px"><div class="ic"><div class="qm">?</div></div>'
        f'<div class="tx">{s.t("p3", "Išbandyti galite drąsiai")}</div><div class="sub">{s.t("p3s", "tik rezultatas ne visada bus toks, kokio tikitės")}</div></div>')
add(s, page(s, body, css_p))
s.appear('.p1', 5.8, 'fadeUpMedium', 0.5)
s.appear('.p2', 7.6, 'fadeUpMedium', 0.5)
s.appear('.p3', 9.8, 'fadeUpMedium', 0.5)
s.voice(1.0, 'Paruošti pavyzdžiai jau veikia kartu su svetaine.')
s.voice(5.8, 'Todėl langelių geriau nejungti ir eilučių nerikiuoti.')
s.voice(10.7, 'Išbandyti galite drąsiai, tik rezultatas ne visada bus toks, kokio tikitės.')
s.ekrane = 'Trys kortelės iš eilės: du langeliai su pilku × — „Langelius geriau palikti atskirus“; „A → Z“ su pilku × — „Rikiavimo geriau nekeisti“; geltonas klaustukas — „Išbandyti galite drąsiai, tik rezultatas ne visada bus toks, kokio tikitės“. Tonas švelnus (Eimantas: „jie jautrūs“).'
s.komentaras = 'Eimantas 2026-09-17: „Negalima jungti langelių“, „rikiavimo taip pat nenaudojome. Naudojame paruoštukus ir nemodifikuojame jų, jei tiksliai nežinome kaip. Eksperimentuoti aišku nedraudžiama. Bet rezultatas nebūtinai bus geras.“'

# ================================================================ 13. Šablono spalva
s = Scene('17-spalvos', 'Kai liko šablono spalva', 'Svetainėje spalvos nematyti – bet galite sutvarkyti', 17)
bad_rows = teachers_rows(s, prefix='b_')
for idx in (3, 4):  # 4 ir 5 eilutės — likusi žalia šablono antraštės spalva
    bad_rows[idx] = bad_rows[idx].replace('class="gs-row data', 'class="gs-row data leftover', 1)
good_rows = teachers_rows(s, prefix='f_')
grid_bad = f'<div class="grid-bad" style="position:absolute; left:0; right:0; top:34px; background:#fff">{"".join(bad_rows)}</div>'
grid_good = f'<div class="grid-good">{"".join(good_rows)}</div>'
fmt_items = ['Tema', None, 'Skaičius', 'Tekstas', 'Lygiuotė', 'Sujungimas', 'Pasukimas', 'Išmanieji fragmentai', None,
             'Šrifto dydis', '~Sujungti langelius', None, 'Konvertuoti į lentelę', 'Sąlyginis formatavimas', 'Besikeičiančios spalvos', None, 'Išvalyti formatavimą']
fpop_left, fpop_top = 470, 100
pop = f'<div class="gs-pop fmt compact" style="left:{fpop_left}px; top:{fpop_top}px; width:430px">'
yy = fpop_top + 8
clear_y = None
for i, it in enumerate(fmt_items):
    if it is None:
        pop += '<div class="sep"></div>'
        yy += 17
        continue
    dis = it.startswith('~')
    label = it.lstrip('~')
    kbd = '<span class="arr">⌘\\</span>' if label == 'Išvalyti formatavimą' else ''
    pop += f'<div class="it f{i}{" dis" if dis else ""}">{s.t("f%d" % i, label)}{kbd}</div>'
    if label == 'Išvalyti formatavimą':
        clear_y = yy + 17
    yy += 34
pop += '</div>'
bx0, by0, _, _ = cell_box('B', 4)
ex0, _, ew, _ = cell_box('E', 4)
ring_left = f'<div class="gs-ring left1" style="left:{bx0 - 4}px; top:{by0 - 4}px; width:{ex0 + ew - bx0 + 8}px; height:{2 * ROW_H + 8}px; border-color: var(--c-amber-solid)"></div>'
selbox = f'<div class="gs-sel selbox" style="left:{bx0}px; top:{by0}px; width:{ex0 + ew - bx0}px; height:{2 * ROW_H + 1}px"></div>'
p1 = cell('B', 4)
p2 = (ex0 + ew - 30, by0 + 2 * ROW_H - 12)
menu_fmt = (fpop_left + 30, 60 + 16)
clr = (fpop_left + 200, clear_y)
extra = pop + ring_left + selbox + s.click(*p1, 7.8) + s.click(*menu_fmt, 10.6) + s.click(*clr, 12.8)
extra += s.cursor_path('.cursor-wrap', [(0, 1000, 560), (6.6, 1000, 560), (7.6, *p1), (7.9, *p1), (9.0, *p2), (9.6, *p2),
                                        (10.4, *menu_fmt), (11.4, *menu_fmt), (12.3, *clr), (16, *clr)])
win = f'<div class="gs-window">{top(s)}{formula(s)}<div class="gs-grid">{colhead()}{grid_good}{grid_bad}</div>{tabbar(s, 3)}{extra}</div>'
own = """
  .gs-row.leftover > span:not(.rh):not(.a) { background: var(--gs-green-th); color: #fff; font-weight: 700; }
  .gs-pop.compact .it { height: 34px; font-size: 18px; }
  .gs-pop.compact .sep { margin: 8px 0; }
"""
add(s, page(s, win, own))
s.visible('.left1', 1.6, 7.6)
s.visible('.selbox', 7.85, 13.0)
s.css.append(f".selbox {{ transform-origin: top left; }}")
s.visible('.fmt', 10.75, 12.9)
name = 'hl_%s' % s.key
s.css.append(f".fmt .f16 {{ animation: {name} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes {name} {{ 0%, {s.pct(12.3)} {{ background: transparent; }} {s.pct(12.31)}, 100% {{ background: #e8eaed; }} }}")
s.visible('.grid-bad', 0, 13.0)
s.zoom('35% 40%', 0.8, 6.8, 1.18)
s.voice(1.0, 'Kartais perkeltame sąraše eilutė lieka su žalia šablono spalva.')
s.voice(6.2, 'Svetainėje to nematyti, bet norėdami tvarkos pažymite tuos langelius')
s.voice(11.5, 'ir meniu Formatas pasirenkate Išvalyti formatavimą.')
s.ekrane = 'Mokytojų sąrašas, kuriame dvi įprastos eilutės („Vincas Kudirka“, „Marija Pečkauskaitė“) liko su žalia antraštės spalva ir baltu tekstu — apvedamos oranžiškai. Pažymimi langeliai B4:E5, atidaromas meniu „Formatas“, pasirenkama „Išvalyti formatavimą“ — eilutės tampa įprastos.'
s.komentaras = 'Priežastis — Eimantas 2026-09-17: keliant sąrašą per API, TH spalva lieka eilutėse, kurios tapo įprastomis; beveik visada mokytojų sąrašuose. Meniu „Formatas“ punktai ir ⌘\\ — iš tikro redaktoriaus.'

# ================================================================ 13b. Antraštė be spalvos
s = Scene('18-th-spalva', 'Kai antraštė liko be spalvos', 'Antraštė be spalvos? Nuspalvinate ir nukopijuojate', 22)
rows_t = teachers_rows(s)
rows_t[12] = rows_t[12].replace('class="gs-row th', 'class="gs-row th nocolor', 1)
TB = lambda idx: 42 + sum((88 if k in (4, 7) else 44) for k in range(idx))   # įrankių juostos mygtuko x
TB_Y = 108 + 16
ROLL_X, BUCK_X = TB(3), TB(9)
def tbtn(cls, x, svg):
    return (f'<div class="{cls}" style="position:absolute; left:{x - 6}px; top:{TB_Y - 6}px; width:38px; height:34px; border-radius:8px; '
            f'background:var(--gs-toolbar); z-index:6; display:flex; align-items:center; justify-content:center">{svg}</div>')
roller = tbtn('roller', ROLL_X, '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z" fill="#444746"/></svg>')
bucket = tbtn('bucket', BUCK_X, '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15a1.49 1.49 0 0 0 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10 10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z" fill="#444746"/><rect x="2" y="20" width="20" height="4" fill="#188038"/></svg>')
SW = ['#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#ffffff',
      '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff',
      '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3',
      '#a61c00', '#cc0000', '#e69138', '#f1c232', '#188038', '#45818e', '#3c78d8', '#3d85c6']
PAL_L, PAL_T = BUCK_X - 20, 170
pal = f'<div class="gs-pop pal" style="left:{PAL_L}px; top:{PAL_T}px; width:{8 * 30 + 24}px; padding:12px; box-sizing:border-box; display:grid; grid-template-columns:repeat(8, 24px); gap:6px">'
for i, c in enumerate(SW):
    ring = 'outline:3px solid #0b57d0; outline-offset:2px;' if c == '#188038' else ''
    pal += f'<i class="sw{i}" style="display:block; width:24px; height:24px; border-radius:50%; background:{c}; border:1px solid #dadce0; box-sizing:border-box; {ring}"></i>'
pal += '</div>'
gi = SW.index('#188038')
p_green = (PAL_L + 12 + (gi % 8) * 30 + 12, PAL_T + 12 + (gi // 8) * 30 + 12)
b13x, b13y, b13w, _ = cell_box('B', 13)
c13x, _, _, _ = cell_box('C', 13)
e13x, _, e13w, _ = cell_box('E', 13)
ring13 = f'<div class="gs-ring r13" style="left:{b13x - 4}px; top:{b13y - 4}px; width:{e13x + e13w - b13x + 8}px; height:{ROW_H + 8}px; border-color: var(--c-amber-solid)"></div>'
selb = f'<div class="gs-sel selb" style="left:{b13x}px; top:{b13y}px; width:{b13w}px; height:{ROW_H + 1}px"></div>'
antb = f'<div class="antb" style="position:absolute; left:{b13x}px; top:{b13y}px; width:{b13w}px; height:{ROW_H + 1}px; border:3px dashed var(--gs-select); box-sizing:border-box; z-index:6"></div>'
selce = f'<div class="gs-sel selce" style="left:{c13x}px; top:{b13y}px; width:{e13x + e13w - c13x}px; height:{ROW_H + 1}px"></div>'
p_b13, p_c13, p_e13 = cell('B', 13), cell('C', 13), cell('E', 13)
p_buck, p_roll = (BUCK_X + 13, TB_Y + 11), (ROLL_X + 13, TB_Y + 11)
extra = roller + bucket + pal + ring13 + selb + antb + selce
extra += s.click(*p_b13, 5.2) + s.click(*p_buck, 6.6) + s.click(*p_green, 7.8) + s.click(*p_roll, 10.2) + s.click(*p_c13, 11.4, sound=False)
extra += s.cursor_path('.cursor-wrap', [(0, 1100, 560), (4.3, 1100, 560), (5.1, *p_b13), (5.6, *p_b13), (6.5, *p_buck), (6.9, *p_buck), (7.7, *p_green),
                                        (8.4, *p_green), (10.1, *p_roll), (10.5, *p_roll), (11.3, *p_c13), (11.5, *p_c13), (12.8, *p_e13), (17, p_e13[0] + 30, p_e13[1] + 60)])
win = f'<div class="gs-window">{top(s)}{formula(s)}<div class="gs-grid">{colhead()}{"".join(rows_t)}</div>{tabbar(s, 3)}{extra}</div>'
add(s, page(s, win))
PLAIN = "background: #fff; color: var(--gs-cell-text); font-weight: 400;"
s.css.append(f".gs-row.th.nocolor > span:nth-child(3) {{ animation: thB_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes thB_{s.key} {{ 0%, {s.pct(8.3)} {{ {PLAIN} }} {s.pct(8.31)}, 100% {{ background: var(--gs-green-th-b); color: #fff; font-weight: 700; }} }}")
for n in (4, 5, 6):
    s.css.append(f".gs-row.th.nocolor > span:nth-child({n}) {{ animation: thCE_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes thCE_{s.key} {{ 0%, {s.pct(13.0)} {{ {PLAIN} }} {s.pct(13.01)}, 100% {{ background: var(--gs-green-th); color: #fff; font-weight: 700; }} }}")
s.visible('.r13', 1.2, 4.6)
s.visible('.selb', 5.25, 10.2)
s.visible('.pal', 6.75, 8.3)
s.css.append(f".bucket {{ animation: bk_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes bk_{s.key} {{ 0%, {s.pct(6.6)} {{ background: var(--gs-toolbar); }} {s.pct(6.61)}, {s.pct(8.3)} {{ background: #c2e7ff; }} {s.pct(8.31)}, 100% {{ background: var(--gs-toolbar); }} }}")
s.visible('.antb', 10.25, 13.0)
s.css.append(f".roller {{ animation: rolGS_{s.key} {s.D}s steps(1,end) 0s both; }}")
s.css.append(f"@keyframes rolGS_{s.key} {{ 0%, {s.pct(10.2)} {{ background: var(--gs-toolbar); }} {s.pct(10.21)}, {s.pct(13.0)} {{ background: #c2e7ff; }} {s.pct(13.01)}, 100% {{ background: var(--gs-toolbar); }} }}")
s.visible('.selce', 11.45, 13.0)
s.sound(8.3, 'spustelejimas')
s.sound(13.0, 'patvirtinimas')
s.zoom('0% 45%', 0.6, 14.0, 1.12)
s.voice(1.0, 'Būna ir atvirkščiai: antraštės eilutė liko be spalvos.')
s.voice(6.2, 'Pažymite pirmą langelį ir kibirėlio ženklu nuspalvinate jį žaliai.')
s.voice(12.1, 'Tada spaudžiate volelio ženklą ir perbraukiate kitus antraštės langelius.')
s.voice(18.3, 'Visa eilutė vienodos spalvos.')
s.ekrane = 'Mokytojų sąraše antrosios grupės antraštės eilutė (13) balta — apvedama oranžiškai. Pažymimas langelis B13, įrankių juostoje spaudžiamas kibirėlis, iš spalvų paletės pasirenkama žalia — B13 tampa žalias. Tada spaudžiamas volelis (B13 apvedamas punktyru) ir perbraukiama C13:E13 — visa eilutė žalia.'
s.komentaras = 'Eimantas 2026-09-17: „TH žmonės nesupras“ — balse ir antraštėje sakoma „antraštė“; rodyti, kad nuspalvinamas vienas langelis, o kiti nukopijuojami. ⛔ PATIKRINTI: lietuviški kibirėlio ir volelio mygtukų pavadinimai ir tiksli vieta įrankių juostoje; spalvų paletė supaprastinta.'

# ================================================================ 14. Pabaiga
# ================================================================ 14b. Versijų istorija
s = Scene('19-versijos', 'Versijų istorija', 'Vakarykštę lentelę galite susigrąžinti', 40)
rows_v = teachers_rows(s)
grid_v = f'<div class="gs-grid">{colhead()}{"".join(rows_v)}</div>'
PANEL_W = 560
PANEL_X = WIN_W - PANEL_W
# Tikra sąsaja (Eimanto ekrano nuotraukos 2026-09-19): istorija atveriama LAIKRODŽIO ženklu
# viršuje dešinėje (ne per meniu „Failas“); atsivėrus viršų pakeičia ← + versijos vardas +
# mėlynas „Atkurti šią versiją“, o dešinėje – skydelis su versijomis, sugrupuotomis pagal dienas.
LAIKRODIS = ('<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#444746" stroke-width="2" '
             'stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>')
ikona = (f'<div class="vclock" style="position:absolute; right:320px; top:26px; width:52px; height:52px; '
         f'border-radius:50%; display:flex; align-items:center; justify-content:center; z-index:9">{LAIKRODIS}</div>')
versijos = [('grp', 'Šiandien', None),
            ('it', '17.31', 'Marija Pečkauskaitė'),
            ('grp', 'Vakar', None),
            ('pick', '13.41', 'Marija Pečkauskaitė'),
            ('it', '10.07', 'Vincas Kudirka'),
            ('grp', 'Ketvirtadienį', None),
            ('it', '22.29', 'Marija Pečkauskaitė'),
            ('it', '15.25', 'Vincas Kudirka')]
items = ''
for vi, (rus, pav, kas) in enumerate(versijos):
    if rus == 'grp':
        items += f'<div class="vgrp">{s.t("vg%d" % vi, pav)}</div>'
        continue
    zyma = '<span class="vdots">⋮</span>' if rus == 'pick' else ''
    items += (f'<div class="vit {rus}"><div class="vt">{s.t("vt%d" % vi, pav)}{zyma}</div>'
              f'<div class="vn"><i></i>{s.t("vn%d" % vi, kas)}</div></div>')
panel = (f'<div class="vpanel" style="position:absolute; right:0; top:0; width:{PANEL_W}px; bottom:0">'
         f'<div class="vhead">{s.t("vh", "Versijų istorija")}</div>'
         f'<div class="vsel">{s.t("vsel", "Visos versijos")}<span class="ar">▾</span></div>'
         f'<div class="vlist">{items}</div>'
         f'<div class="vfoot"><span class="cb on"></span>{s.t("vf1", "Rodyti pakeitimus")}</div></div>')
virsus = (f'<div class="vbar" style="position:absolute; left:0; right:{PANEL_W}px; top:0; height:104px">'
          f'<span class="back">←</span>'
          f'<span class="vname">{s.t("vname", "Rugsėjo 18 d., 13.41")}</span>'
          f'<span class="vbtn">{s.t("vb", "Atkurti šią versiją")}</span>'
          f'<span class="vtot">{s.t("vtot", "Iš viso: 2 pakeitimai")}</span></div>')
saugu = (f'<div class="vsafe">{s.t("vs", "Atkūrus dabartinė versija lieka istorijoje – neprarandate nieko")}'
         f'<span class="vcell">{s.t("vc", "Vieno langelio istorija: dešinysis pelės mygtukas → „Rodyti redagavimo istoriją“")}</span></div>')
pick_y = 104 + 58 + 64 + 52 + 96           # pažymėtos versijos eilutė skydelyje
extra = (ikona + panel + virsus + saugu
         + s.click(WIN_W - 320 - 26, 52, 6.0) + s.click(PANEL_X + 240, pick_y, 19.0)
         + s.click(560, 52, 25.2))
extra += s.cursor_path('.cursor-wrap', [(0, 900, 560), (5.2, 900, 560), (5.9, WIN_W - 346, 52), (6.6, WIN_W - 346, 52),
                                        (18.2, PANEL_X + 240, pick_y), (19.2, PANEL_X + 240, pick_y),
                                        (24.4, 560, 52), (25.4, 560, 52), (38, 560, 52)])
win = f'<div class="gs-window">{top(s)}{formula(s)}{grid_v}{tabbar(s, 3)}{extra}</div>'
own_v = """
  .vpanel { background:#fff; border-left:1.5px solid #dfe3ea; box-shadow:-12px 0 34px rgba(30,40,70,.08); z-index:8; overflow:hidden; }
  .vhead { padding:26px 28px 8px; font-size:30px; color:var(--c-text); }
  .vsel { margin:6px 28px 10px; padding:12px 18px; border:1.5px solid #c4c7c5; border-radius:10px; font-size:21px;
          color:var(--c-text); display:flex; align-items:center; justify-content:space-between; }
  .vlist { padding:6px 0; }
  .vgrp { padding:16px 28px 4px; font-size:19px; color:var(--c-text-muted); }
  .vit { padding:10px 28px; }
  .vit .vt { font-size:23px; font-weight:600; color:var(--c-text); display:flex; align-items:center; justify-content:space-between; }
  .vit .vn { font-size:19px; color:var(--c-text-muted); margin-top:4px; display:flex; align-items:center; gap:10px; }
  .vit .vn i { width:10px; height:10px; border-radius:50%; background:#8e6fd8; display:block; }
  .vit:nth-child(6) .vn i, .vit:nth-child(9) .vn i { background:#12a4a4; }
  .vit.pick { margin:4px 18px; padding:10px 18px; border:2px solid var(--c-blue-text-vivid, #0b57d0); border-radius:10px; background:#f6f9ff; }
  .vdots { color:var(--c-text-muted); font-size:22px; }
  .vfoot { position:absolute; left:0; right:0; bottom:0; padding:18px 28px; border-top:1.5px solid #eef1f5;
           font-size:20px; color:var(--c-text); display:flex; align-items:center; gap:12px; }
  .cb { width:22px; height:22px; border-radius:5px; background:#0b57d0; display:inline-block; position:relative; }
  .cb::after { content:"✓"; position:absolute; left:4px; top:-2px; color:#fff; font-size:17px; }
  .vbar { background:#fff; z-index:9; }
  .vbar .back { position:absolute; left:34px; top:34px; font-size:32px; color:var(--c-text-muted); }
  .vbar .vname { position:absolute; left:92px; top:38px; font-size:26px; color:var(--c-text); }
  .vbar .vbtn { position:absolute; left:440px; top:28px; background:#0b57d0; color:#fff; font-size:22px;
                font-weight:600; padding:14px 28px; border-radius:26px; }
  .vbar .vtot { position:absolute; right:40px; top:40px; font-size:20px; color:var(--c-text-muted); }
  .vsafe { position:absolute; left:64px; bottom:84px; width:940px; background:#fff; border:1.5px solid #dfe3ea; border-radius:16px;
           padding:22px 28px; font-size:26px; color:var(--c-text); box-shadow:0 16px 40px rgba(30,40,70,.10); z-index:8; }
  .vcell { display:block; margin-top:12px; font-size:21px; color:var(--c-text-muted); }
"""
add(s, page(s, win, own_v))
s.visible('.vclock', 0, 6.4)
s.visible('.vpanel', 6.6)
s.visible('.vbar', 6.6)
s.visible('.vsafe', 29.0)
s.visible('.vsafe .vcell', 33.6)
s.css.append(".vit.pick { animation: iconPulse 0.6s ease-in-out 19.0s both; }")
s.sound(6.0, 'spustelejimas')
s.sound(19.0, 'spustelejimas')
s.voice(1.0, 'Jei atšaukti nebepavyksta, lieka versijų istorija.')
s.voice(6.0, 'Viršuje dešinėje spaudžiate laikrodžio ženklą.')
s.voice(10.4, 'Dešinėje atsiveria versijų sąrašas: dienos, laikai ir žmonės, kurie keitė lentelę.')
s.voice(17.4, 'Paspaudę versiją matote, kaip lentelė atrodė tuo metu.')
s.voice(23.0, 'Radę gerą versiją, viršuje kairėje spaudžiate Atkurti šią versiją.')
s.voice(29.0, 'Dabartinė versija irgi lieka istorijoje – neprarandate nieko.')
s.voice(34.5, 'Vieno langelio istoriją matote dešiniuoju pelės mygtuku.')
s.ekrane = ('Mokytojų sąrašas; viršuje dešinėje sumirksi laikrodžio ženklas. Jį paspaudus viršų pakeičia juosta su ← , '
            'versijos vardu „Rugsėjo 18 d., 13.41“ ir mėlynu mygtuku „Atkurti šią versiją“, o dešinėje atsiveria skydelis '
            '„Versijų istorija“ su sąrašu „Visos versijos“: Šiandien 17.31 Marija Pečkauskaitė, Vakar 13.41 (pažymėta) ir '
            '10.07 Vincas Kudirka, Ketvirtadienį 22.29 ir 15.25. Apačioje – žyma „Rodyti pakeitimus“.')
s.komentaras = ('Eimantas 2026-09-19: istorija iškviečiama LAIKRODŽIO ženklu viršuje dešinėje, ne per „Failas“; skydelio '
                'sandara pataisyta pagal tikras ekrano nuotraukas (grupės pagal dienas, vardai su spalvotu tašku, '
                '„Visos versijos“, „Rodyti pakeitimus“, ⋮ ties pažymėta versija). '
                '⛔ PATIKRINTI lietuviškus užrašus: Eimanto sąsaja anglų kalba („Version history“, „Restore this version“, '
                '„All versions“, „Highlight changes“), lietuviški vertimai — mūsų.')

s = Scene('20-nebijokite', 'Klysti nebaisu', 'Beveik viską galima atšaukti', 12)
css14 = '''
  .keys { position: absolute; left: 0; right: 0; top: 120px; display: flex; justify-content: center; align-items: center; gap: 30px; font-size: 44px; color: var(--c-text-muted); }
  .key { font-family: var(--gs-font); font-weight: 700; color: var(--c-text); background: #fff; border: 3px solid #c4c7c5; border-bottom-width: 8px;
         border-radius: 16px; padding: 18px 34px; font-size: 48px; }
  .or { font-size: 30px; margin: 0 20px; }
  .helpbox { position: absolute; left: 380px; top: 400px; width: 920px; height: 150px; border-radius: 24px; background: #fff; border: 1.5px solid #dfe3ea;
             box-shadow: 0 20px 50px rgba(30,40,70,.10); display: flex; align-items: center; justify-content: center; gap: 22px; font-size: 32px; color: var(--c-text); }
  .helpbox b { color: var(--c-blue-text-vivid); white-space: nowrap; }
'''
body = (f'<div class="keys"><span class="key">Ctrl</span>+<span class="key">Z</span><span class="or">{s.t("or", "arba")}</span>'
        f'<span class="key">⌘</span>+<span class="key">Z</span></div>'
        f'<div class="helpbox">{s.t("q", "Pakeitimai išsisaugo patys – galite ramiai bandyti")}</div>')
add(s, page(s, body, css14))
s.appear('.keys', 1.0, 'fadeUpMedium', 0.6)
s.visible('.helpbox', 5.8)
s.voice(1.0, 'Klysti nebaisu – beveik kiekvieną veiksmą galima atšaukti.')
s.voice(6, 'Pakeitimai išsisaugo patys, tad galite ramiai bandyti.')
s.ekrane = 'Dideli klavišai „Ctrl + Z arba ⌘ + Z“, po jais kortelė „Pakeitimai išsaugomi patys – galite ramiai bandyti“. Į pagalbą kviečiame tik kai kas nors nepavyksta (Eimantas 2026-09-17).'


# ---------------------------------------------------------------- rašymas
def main():
    tdir = os.path.join(HERE, 'templates')
    for f in os.listdir(tdir):
        if f.endswith('.html'):
            os.remove(os.path.join(tdir, f))
    for s, html in SCENES:
        open(os.path.join(tdir, s.file + '.html'), 'w', encoding='utf-8').write(html.replace('/*BASE*/', '\n'.join(s.base)))
    json.dump(CONTENT, open(os.path.join(HERE, 'content', 'lt.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

    # animacijos
    shared = '''
    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
'''
    block = "  // >>> GS-PRADZIAMOKSLIS (generuoja lessons/google-sheets-pradziamokslis/build_scenes.py — ranka neredaguoti)\n"
    for s, _ in SCENES:
        cssx = shared + '\n'.join('    ' + c for c in s.css)
        block += f"  '{s.file}': `\n    .card > .title {{ opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }}\n{cssx}\n  `,\n"
    block += "  // <<< GS-PRADZIAMOKSLIS\n"
    p = os.path.join(ILL, 'generate-video-clips.js')
    js = open(p, encoding='utf-8').read()
    if '// >>> GS-PRADZIAMOKSLIS' in js:
        js = re.sub(r"  // >>> GS-PRADZIAMOKSLIS.*?  // <<< GS-PRADZIAMOKSLIS\n", lambda m: block, js, flags=re.S)
    else:
        js = js.replace("const TEMPLATE_ANIMATIONS = {\n", "const TEMPLATE_ANIMATIONS = {\n" + block, 1)
    open(p, 'w', encoding='utf-8').write(js)

    # scenarijus
    total = sum(s.D for s, _ in SCENES)
    full = total + 10 + int((len(SCENES) - 1) * 3.2)
    md = [f"# Video scenarijus: Google Sheets pradžiamokslis: kaip tvarkyti mokyklos lenteles", "",
          "**Formatas:** „kur spausti“ filmukas, balsas sakiniais su laiko žymomis, garsai, foninė muzika",
          "**Balsas:** ElevenLabs `eleven_v3_dpo_20260217`, balsas `eqJHjeWMPGJFD6VBf1J2`, greitis 0.9",
          "⛔ **Balsas SUPLANUOTAS, NESUGENERUOTAS.** Dariaus balso be Eimanto žinios nenaudojame (2026-09-17).",
          f"**Trukmė:** {total} sek. be intro, outro ir skirtukų (~{full // 60}:{full % 60:02d} su jais)",
          "**Šaltinis:** `build_scenes.py` — scenarijų, šablonus, tekstus ir animacijas generuoja jis; ranka neredaguoti.",
          "**Faktai ir atviri klausimai:** `TYRIMAS.md`", "", "---", "",
          "| Kadras | Trukmė | Failas | Balsas |", "|---|---|---|---|", "| 0 Intro | 5 sek. | intro | — |"]
    for i, (s, _) in enumerate(SCENES, 1):
        v = ' '.join(c[2] for c in s.cues if c[1] == 'balsas')
        md.append(f"| {i} {s.trans} | {s.D} sek. | {s.file} | {v} |")
    md.append(f"| {len(SCENES) + 1} Outro | 5 sek. | autro | — |")
    md += ["", "---", "", "## Kadrai"]
    # Jei balsas jau sugeneruotas, rizika vertinama pagal TIKRAS trukmes, ne pagal CPS spėjimą.
    tikros = {}
    mpath = os.path.join(HERE, 'video', 'balsas-lt', 'manifest.json')
    if os.path.exists(mpath):
        for it in json.load(open(mpath, encoding='utf-8'))['items']:
            tikros.setdefault(int(it['file'].split('-')[0][1:]), []).append(it['duration'])
    problems = []
    for i, (s, _) in enumerate(SCENES, 1):
        md += ["", f"### KADRAS {i}: {s.trans} ({s.D} sek.)", f"**Failas:** `{s.file}.png`",
               f"**Antraštė kadre:** {CONTENT[s.key]['title']}", f"**Ekrane:** {s.ekrane}"]
        if s.komentaras:
            md.append(f"**Komentaras:** {s.komentaras}")
        md += ["", "**Laiko žymos:**", "", "| Laikas | Kas | Tekstas arba garsas |", "|---|---|---|"]
        cues = sorted(s.cues, key=lambda c: c[0])
        vc = [c for c in cues if c[1] == 'balsas']
        for c in cues:
            md.append(f"| {c[0]:.1f} | {c[1]} | {c[2]} |")
        for j, c in enumerate(vc):
            est = tikros[i][j] if i in tikros and j < len(tikros[i]) else len(c[2]) / CPS
            end = vc[j + 1][0] - 0.15 if j + 1 < len(vc) else s.D - 0.5
            if c[0] + est > end:
                problems.append(f"K{i}.{j + 1}: ~{est:.1f}s, langas {end - c[0]:.1f}s")
    open(os.path.join(HERE, 'video', 'scenarijus-lt.md'), 'w', encoding='utf-8').write('\n'.join(md) + '\n')
    # skaitomas balso tekstas — Eimantui peržiūrėti be lentelių
    vo = ['# Google Sheets pradžiamokslis – balso tekstas (lt)', '',
          '⛔ Suplanuotas, nesugeneruotas. Laikas – nuo kadro pradžios.', '']
    for i, (s, _) in enumerate(SCENES, 1):
        vo.append(f'## {i:02d}. {s.trans} – {s.D} s')
        vo.append(f'*Antraštė:* {CONTENT[s.key]["title"]}')
        vo.append('')
        for tt, kind, val in sorted(s.cues):
            if kind == 'balsas':
                vo.append(f'- `{tt:4.1f}` {val}')
        vo.append('')
    open(os.path.join(HERE, 'video', 'balso-tekstas-lt.md'), 'w', encoding='utf-8').write('\n'.join(vo))
    json.dump([{'file': s.file, 'title': s.trans, 'h1': CONTENT[s.key]['title'], 'D': s.D, 'ekrane': s.ekrane,
                'komentaras': s.komentaras, 'cues': sorted(s.cues)} for s, _ in SCENES],
              open(os.path.join(HERE, 'video', 'kadravimas-lt.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    # ⛔ Kalbos patikra paleidžiama PATI (Eimantas 2026-09-19: „ar naudoji agentą tik kai pasakau“).
    # Nepamiršti neįmanoma tik tada, kai to nereikia prisiminti.
    r = os.path.expanduser('~/.claude/skills/redaktorius/scripts/redaktorius.py')
    if os.path.exists(r):
        import subprocess
        p = subprocess.run(['python3', r, os.path.join(HERE, 'content'),
                            os.path.join(HERE, 'video', 'balso-tekstas-lt.md')], capture_output=True, text=True)
        eilute = [l for l in p.stdout.split('\n') if 'Iš viso' in l]
        if eilute:
            print('redaktorius: ' + re.sub(r'\x1b\[[0-9;]*m', '', eilute[0]).replace('Iš viso:', '').strip())

    print(f"scenos: {len(SCENES)} | trukmė {total}s (~{full // 60}:{full % 60:02d}) | balso rizikos: {problems or 'nėra'}")


if __name__ == '__main__':
    main()
