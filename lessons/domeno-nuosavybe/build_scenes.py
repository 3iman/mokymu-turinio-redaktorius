# -*- coding: utf-8 -*-
"""
Domeno nuosavybės explaineris — kadrai, animacijos, scenarijus iš vieno šaltinio.

  python3 build_scenes.py

Rašo:
  templates/*.html          — kadrų šablonai
  content/lt.json           — visi ekrano tekstai
  generate-video-clips.js   — animacijos (blokas tarp žymų DOMENAS)
  video/scenarijus-lt.md    — kadrai, suplanuotas balsas ir laiko žymos
  video/balso-tekstas-lt.md — skaitomas balso tekstas
  video/kadravimas-lt.json  — duomenys kadravimo puslapiui

⛔ Balsas SUPLANUOTAS, NESUGENERUOTAS (Eimantas 2026-09-18: „Tik negarsink“).
⛔ Nejudantis kadras rodo galutinę būseną (ANIMATION_PRINCIPLES §14).
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ILL = os.path.abspath(os.path.join(HERE, '..', '..'))
CPS = 16.0          # Dariaus balso sparta, simbolių per sekundę
STAGE_H = 780
WIN_TOP_IN_STAGE = 18

CONTENT = {'lang': 'lt', '_intro': {'title': 'Ar mokyklos domenas priklauso įstaigai: kaip pasitikrinti'}}
SCENES = []
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

    def typing(self, text, t0, step=0.09, cls='typed'):
        spans = []
        for i, ch in enumerate(text):
            c = '%s-%d' % (cls, i)
            spans.append(f'<span class="{c}">{ch if ch != " " else "&nbsp;"}</span>')
            self.css.append(f".{c} {{ animation: raideGS 0.01s steps(1,end) {t0 + i * step:.2f}s both; }}")
        return ''.join(spans)

    def click(self, x, y, t, sound=True):
        i = len(self.css)
        cls = 'rip%d' % i
        self.css.append(f".{cls} {{ animation: ratilasGS 0.6s ease-out {t}s forwards; }}")
        if sound:
            self.sound(t, 'spustelejimas')
        return f'<div class="tvs-ripple {cls}" style="left:{x:.0f}px; top:{y:.0f}px"></div>'


def page(s, body, own_css=''):
    return f'''<!DOCTYPE html>
<html lang="{{{{lang}}}}">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./tokens/tokens.css">
<link rel="stylesheet" href="./tokens/base.css">
<link rel="stylesheet" href="./tokens/tvs.css">
<style>
  .title {{ font-size: 44px; margin-bottom: 26px; }}
  .stage {{ position: relative; width: 1680px; height: {STAGE_H}px; margin: 0 auto; }}
  .cursor-wrap {{ position: absolute; width: 44px; height: 56px; z-index: 30; pointer-events: none; }}
  .cursor-wrap .tvs-cursor {{ left: 0; top: 0; }}
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



# ================================================================ bendri komponentai
CSS_BASE = """
  .cap { position: absolute; left: 0; right: 0; text-align: center; font-size: 27px; color: var(--c-text-muted); }
  .cardbox { position: absolute; background: var(--c-surface); border: 1.5px solid #dfe3ea; border-radius: 20px;
             box-shadow: 0 20px 50px rgba(30,40,70,.10); box-sizing: border-box; }
  .lbl { font-size: 18px; text-transform: uppercase; letter-spacing: .8px; color: var(--c-text-faint); }
  .big { font-size: 34px; font-weight: 700; color: var(--c-text); }
  .mid { font-size: 26px; color: var(--c-text); }
  .mono { font-family: ui-monospace, Menlo, monospace; }
  .pill { display: inline-flex; align-items: center; gap: 10px; border-radius: 999px; padding: 10px 20px; font-size: 22px; font-weight: 700; }
  .pill.g { background: var(--c-green-bg); border: 1.5px solid var(--c-green-border); color: var(--c-green-text); }
  .pill.r { background: var(--c-red-bg); border: 1.5px solid var(--c-red-border); color: var(--c-red-text); }
  .pill.a { background: var(--c-amber-bg); border: 1.5px solid #fde68a; color: #92400e; }
  .wsec { background: #f6f8fb; border: 1px solid #e3e7ee; border-radius: 10px; padding: 10px 18px; font-family: ui-monospace, Menlo, monospace;
          font-size: 19px; color: var(--c-text-muted); margin: 0 0 14px; }
  .wrow { display: flex; gap: 26px; margin-bottom: 10px; font-size: 22px; }
  .wrow .k { width: 330px; text-align: right; font-weight: 700; color: var(--c-text); }
  .wrow .v { flex: 1; color: var(--c-text); }
"""


def browser(top, left, w, h, url_html, inner='', cls=''):
    return (f'<div class="brw {cls}" style="position:absolute; left:{left}px; top:{top}px; width:{w}px; height:{h}px; background:#fff; '
            f'border:1.5px solid #dfe3ea; border-radius:16px; box-shadow:0 20px 50px rgba(30,40,70,.10); overflow:hidden">'
            f'<div style="height:60px; background:#f1f3f7; display:flex; align-items:center; gap:14px; padding:0 20px; border-bottom:1px solid #e3e7ee">'
            f'<span style="width:12px;height:12px;border-radius:50%;background:#e06b5e"></span>'
            f'<span style="width:12px;height:12px;border-radius:50%;background:#e8be55"></span>'
            f'<span style="width:12px;height:12px;border-radius:50%;background:#63b86a"></span>'
            f'<div class="urlbar" style="flex:1; height:36px; background:#fff; border:1px solid #dadce0; border-radius:18px; display:flex; '
            f'align-items:center; padding:0 18px; font-size:19px; color:var(--c-text); font-family:ui-monospace,Menlo,monospace">{url_html}</div></div>'
            f'<div style="position:relative; height:{h - 60}px">{inner}</div></div>')


def whois(s, pre, domenas, ikurtas, turetojas, extra_cls='', tech=None, tone=None, hide=()):
    """Tikro domreg.lt WHOIS lango sandara (patikrinta 2026-09-18 ekrano nuotraukose)."""
    def sec(t):
        return f'<div class="wsec">{t}</div>'
    def rows(items, cls=''):
        return ''.join(f'<div class="wrow {cls}"><div class="k">{k}</div><div class="v">{v}</div></div>' for k, v in items)
    h = f'<div style="position:absolute; inset:0; padding:26px 34px; overflow:hidden">'
    h += sec(s.t(pre + '_s1', 'Domeno informacija'))
    h += rows([(s.t(pre + '_k1', 'Domeno vardas'), f'<span class="mono">{s.t(pre + "_v1", domenas)}</span>'),
               (s.t(pre + '_k2', 'Būsena'), s.t(pre + '_v2', 'Registruotas')),
               (s.t(pre + '_k3', 'Įkurtas'), f'<span class="ikurta">{s.t(pre + "_v3", ikurtas)}</span>')])
    h += sec(s.t(pre + '_s2', 'Domeno turėtojas'))
    col = {'g': 'var(--c-green-text)', 'r': 'var(--c-red-text)', 'a': '#92400e'}.get(tone, 'var(--c-text)')
    h += f'<div class="wrow tur"><div class="k">{s.t(pre + "_k4", "Juridinio asmens pavadinimas")}</div><div class="v" style="font-weight:700; color:{col}">{s.t(pre + "_v4", turetojas[0])}</div></div>'
    h += rows([(s.t(pre + '_k%d' % (5 + i), k), s.t(pre + '_v%d' % (5 + i), v)) for i, (k, v) in enumerate(turetojas[1])])
    if tech:
        h += sec(s.t(pre + '_s3', 'Techninis kontaktas'))
        h += rows([(s.t(pre + '_k9', 'Juridinio asmens pavadinimas'), s.t(pre + '_v9', tech))])
    h += '</div>'
    return h


# ================================================================ 1. Skaitmeninis turtas
s = Scene('00-turtas', 'Domenas yra turtas', 'Domenas yra įstaigos skaitmeninis turtas', 17)
items = [('Svetainė', 'visa, ką mokykla paskelbė'), ('El. paštas', 'darbuotojų adresai @mokykla.lt'),
         ('Nuorodos', 'savivaldybės, dokumentų, tėvų'), ('Google', 'sukaupta paieškos istorija')]
body = (f'<div class="cardbox dom" style="left:590px; top:40px; width:500px; height:150px; display:flex; align-items:center; justify-content:center">'
        f'<span class="mono" style="font-size:40px; font-weight:700">{s.t("d", "mokykla.lt")}</span></div>')
for i, (h, p) in enumerate(items):
    x = 60 + i * 400
    body += (f'<div class="cardbox it{i}" style="left:{x}px; top:330px; width:360px; height:230px; padding:32px 28px">'
             f'<div class="big" style="font-size:30px">{s.t("h%d" % i, h)}</div>'
             f'<div class="mid" style="margin-top:14px; color:var(--c-text-muted); line-height:1.35">{s.t("p%d" % i, p)}</div></div>')
    body += (f'<div class="ln l{i}" style="position:absolute; left:{x + 180}px; top:190px; width:2px; height:140px; background:#c9d3e0"></div>')
body += f'<div class="cap cz" style="top:620px; font-size:30px; color:var(--c-text)">{s.t("cz", "Prarandamas ne puslapis, o viskas, kas prie jo prikabinta")}</div>'
add(s, page(s, body, CSS_BASE))
s.appear('.dom', 0.3, 'fadeUpMedium', 0.5)
for i in range(4):
    s.appear(f'.it{i}', 2.0 + i * 1.3, 'fadeUpLight', 0.4)
    s.appear(f'.l{i}', 1.9 + i * 1.3, 'fadeUpLight', 0.3)
s.visible('.cz', 9.0)
s.voice(1.0, 'Domenas nėra svetainės dalis. Tai įstaigos skaitmeninis turtas.')
s.voice(5.0, 'Prie jo prikabinta svetainė, darbuotojų paštas, nuorodos ir paieškos istorija.')
s.voice(10.4, 'Prarandamas ne puslapis, o visa tai iš karto.')
s.ekrane = 'Viršuje domenas mokykla.lt, nuo jo linijos į keturias korteles: svetainė, el. paštas, nuorodos, Google. Apačioje „Prarandamas ne puslapis, o viskas, kas prie jo prikabinta“.'

# ================================================================ 2. Kaip atrodo tvarkingas įrašas
s = Scene('01-tvarkingas', 'Kaip atrodo tvarkingas įrašas', 'Turėtoju įrašyta pati įstaiga', 18)
inner = whois(s, 'a', 'mokyklosdomenas.lt', '2012-05-16', ('Miesto gimnazija',
              [('Adresas', 'Mokyklos g. 4, Miestas'), ('El. paštas', 'info@mokyklosdomenas.lt')]),
              tech='UAB „Tiekėjas“', tone='g')
body = browser(30, 120, 1120, 560, f'<span class="mono">{s.t("url", "domreg.lt/paslaugos/whois/")}</span>', inner)
body += (f'<div class="cardbox ok" style="left:1300px; top:120px; width:320px; height:380px; padding:34px 30px">'
         f'<span class="pill g">{s.t("okp", "Taip turi būti")}</span>'
         f'<div class="mid" style="margin-top:24px; line-height:1.4; color:var(--c-text-muted)">'
         f'{s.t("okt", "Turėtojas – įstaiga. Tiekėjas įrašytas kaip techninis kontaktas. Tai normalu.")}</div></div>')
body += f'<div class="cap cw" style="top:700px">{s.t("cw", "Svarbiausia eilutė – „Domeno turėtojas“")}</div>'
add(s, page(s, body, CSS_BASE))
s.appear('.brw', 0.3, 'fadeUpMedium', 0.5)
s.visible('.cw', 4.2)
s.appear('.ok', 8.0, 'slinktisIsDesines', 0.5)
s.voice(1.0, 'Registro įraše svarbiausia viena dalis – domeno turėtojas.')
s.voice(5.0, 'Ten turi būti įstaigos pavadinimas: mokykla, gimnazija, lopšelis-darželis.')
s.voice(9.6, 'Tiekėjas gali būti įrašytas kaip techninis kontaktas. Tai normalu.')
s.ekrane = 'Naršyklėje domreg.lt WHOIS įrašas: domeno informacija, „Domeno turėtojas“ – gimnazijos pavadinimas žaliai, žemiau techninis kontaktas – tiekėjas. Dešinėje žalia žyma „Taip turi būti“.'
s.komentaras = 'Sandara pagal tikrą domreg.lt langą (Eimanto ekrano nuotraukos 2026-09-18). Pavadinimai pakeisti.'

# ================================================================ 3. Trys nerimo atvejai
s = Scene('02-trys-atvejai', 'Trys atvejai, dėl kurių verta sunerimti', 'Trys atvejai, kai domenas ne įstaigos', 20)
cases = [('b', 'Kita įmonė', 'UAB „Tiekėjas“', 'Turėtoju įrašyta tiekėjo įmonė', 'r'),
         ('c', 'Pavadinimas įstaigos, duomenys – ne', 'Lopšelis-darželis „Rugelis“', 'Adresas, telefonas ir paštas – tiekėjo. Perregistruota ne iki galo', 'a'),
         ('d', 'Fizinis asmuo', 'Fizinis asmuo (duomenys neskelbiami)', 'Adresas priklauso nuo vieno žmogaus', 'r')]
body = ''
for i, (k, h, who, note, tone) in enumerate(cases):
    x = 40 + i * 540
    col = {'r': 'var(--c-red-text)', 'a': '#92400e'}[tone]
    body += (f'<div class="cardbox c{i}" style="left:{x}px; top:60px; width:500px; height:480px; padding:34px 30px">'
             f'<div class="lbl">{s.t(k + "l", "Domeno turėtojas")}</div>'
             f'<div class="big" style="margin:16px 0 20px; font-size:30px; color:{col}">{s.t(k + "w", who)}</div>'
             f'<div class="mid" style="color:var(--c-text-muted); line-height:1.4">{s.t(k + "n", note)}</div>'
             f'<div style="position:absolute; left:30px; bottom:30px"><span class="pill {tone}">{s.t(k + "p", h)}</span></div></div>')
body += f'<div class="cap cz" style="top:600px; font-size:30px; color:var(--c-text)">{s.t("cz", "Visais trimis atvejais įstaigos adresas priklauso nuo kito")}</div>'
add(s, page(s, body, CSS_BASE))
for i in range(3):
    s.appear(f'.c{i}', 0.5 + i * 3.4, 'fadeUpMedium', 0.5)
s.visible('.cz', 12.2)
s.voice(1.0, 'Trys atvejai, kai domenas įstaigai nepriklauso.')
s.voice(4.0, 'Pirmas: turėtoju įrašyta tiekėjo įmonė.')
s.voice(7.4, 'Antras: pavadinimas įstaigos, bet adresas, telefonas ir paštas – tiekėjo. Perregistruota ne iki galo.')
s.voice(13.6, 'Trečias: fizinis asmuo. Adresas priklauso nuo vieno žmogaus.')
s.ekrane = 'Trys kortelės: „UAB „Tiekėjas““ (raudona), „Lopšelis-darželis „Rugelis““ su gelsva žyma, kad duomenys tiekėjo, ir „Fizinis asmuo (duomenys neskelbiami)“ (raudona). Apačioje „Visais trimis atvejais įstaigos adresas priklauso nuo kito“.'
s.komentaras = 'Keturi tikri atvejai iš Eimanto ekrano nuotraukų 2026-09-18: tvarkingas, kita įmonė, pusiau perregistruotas, fizinis asmuo.'

# ================================================================ Kieno paštas
s = Scene('03-pastas', 'Kieno paštas įrašytas', 'Pranešimai eina tam, kieno paštas įrašytas', 20)
body = (f'<div class="cardbox w" style="left:80px; top:50px; width:720px; height:330px; padding:34px 30px">'
        f'<div class="lbl">{s.t("wl", "Registro įrašas")}</div>'
        f'<div class="wrow" style="margin-top:22px"><div class="k" style="width:190px">{s.t("k1", "El. paštas")}</div>'
        f'<div class="v mono" style="font-size:26px; font-weight:700; color:var(--c-red-text)">{s.t("v1", "pagalba@tiekejas.lt")}</div></div>'
        f'<div class="mid" style="margin-top:20px; color:var(--c-text-muted); line-height:1.4">{s.t("wn", "Įrašyta „dėl patogumo“ – ir taip lieka metų metams")}</div></div>')
mails = ['Artėja domeno galiojimo pabaiga', 'Patvirtinkite domeno duomenis', 'Prašymas perduoti domeną']
for i, m in enumerate(mails):
    body += (f'<div class="cardbox m{i}" style="left:900px; top:{50 + i * 118}px; width:700px; height:96px; padding:0 30px; display:flex; align-items:center; gap:18px">'
             f'<span style="width:12px; height:12px; border-radius:50%; background:var(--c-blue-solid)"></span>'
             f'<span class="mid">{s.t("m%d" % i, m)}</span></div>')
body += (f'<div class="cardbox lock" style="left:80px; top:440px; width:1520px; height:200px; padding:36px 40px; text-align:center; '
         f'background:var(--c-amber-bg); border-color:#fde68a">'
         f'<div class="big">{s.t("lh", "Įstaiga apie savo domeną nesužino nieko")}</div>'
         f'<div class="mid" style="margin-top:14px; color:#92400e">{s.t("ln", "Kol viskas veikia, tai nematoma. Bet taip gimsta priklausomybė nuo vieno tiekėjo.")}</div></div>')
add(s, page(s, body, CSS_BASE))
s.appear('.w', 0.4, 'slinktisIsKaires', 0.5)
for i in range(3):
    s.appear(f'.m{i}', 4.2 + i * 1.6, 'slinktisIsDesines', 0.45)
s.appear('.lock', 11.0, 'fadeUpMedium', 0.5)
s.voice(1.0, 'Antras dalykas registre – koks el. paštas įrašytas prie turėtojo.')
s.voice(5.2, 'Jei ten tiekėjo adresas, visi pranešimai eina jam: apie galiojimą, apie duomenų patvirtinimą, apie perdavimą.')
s.voice(11.6, 'Įstaiga apie savo domeną nesužino nieko. Taip tyliai gimsta priklausomybė.')
s.ekrane = 'Kairėje registro įrašas su tiekėjo el. paštu (raudonai). Dešinėje trys laiškai: galiojimo pabaiga, duomenų patvirtinimas, prašymas perduoti. Apačioje gelsva juosta „Įstaiga apie savo domeną nesužino nieko“.'
s.komentaras = 'Eimantas 2026-09-19: tiekėjas „dėl patogumo“ įrašo savo paštą; visi pranešimai eina jam, ir taip susidaro lock-in.'


# ================================================================ 4. Įkūrimo data
s = Scene('04-ikurta', 'Įkūrimo data', 'Perregistravus data pradedama skaičiuoti iš naujo', 20)
body = (f'<div class="cardbox w1" style="left:80px; top:60px; width:700px; height:300px; padding:34px 30px">'
        f'<div class="lbl">{s.t("w1l", "Registro įrašas")}</div>'
        f'<div class="wrow" style="margin-top:20px"><div class="k" style="width:200px">{s.t("w1k", "Įkurtas")}</div>'
        f'<div class="v mono" style="font-size:30px; font-weight:700">{s.t("w1v", "2026-01-24")}</div></div>'
        f'<div class="mid" style="margin-top:18px; color:var(--c-text-muted)">{s.t("w1n", "Atrodo, kad domenas visai naujas")}</div></div>')
body += (f'<div class="cardbox w2" style="left:900px; top:60px; width:700px; height:300px; padding:34px 30px">'
         f'<div class="lbl">{s.t("w2l", "Interneto archyvas")}</div>'
         f'<div class="wrow" style="margin-top:20px"><div class="k" style="width:200px">{s.t("w2k", "Svetainė")}</div>'
         f'<div class="v mono" style="font-size:30px; font-weight:700">{s.t("w2v", "nuo 2019")}</div></div>'
         f'<div class="mid" style="margin-top:18px; color:var(--c-text-muted)">{s.t("w2n", "Tuo pačiu adresu, su įstaigos turiniu")}</div></div>')
body += (f'<div class="cardbox z" style="left:300px; top:430px; width:1080px; height:230px; padding:36px 40px; text-align:center; '
         f'background:var(--c-amber-bg); border-color:#fde68a">'
         f'<div class="big">{s.t("zh", "Perregistravus domeną naujam turėtojui, įkūrimo data prasideda iš naujo")}</div>'
         f'<div class="mid" style="margin-top:14px; color:#92400e">{s.t("zn", "Jei svetainė senesnė už tą datą – domenas anksčiau buvo kažkieno kito")}</div></div>')
add(s, page(s, body, CSS_BASE))
s.appear('.w1', 0.4, 'slinktisIsKaires', 0.5)
s.appear('.w2', 4.6, 'slinktisIsDesines', 0.5)
s.appear('.z', 9.4, 'fadeUpMedium', 0.5)
s.voice(1.0, 'Registre yra eilutė „Įkurtas“. Ji rodo ne domeno amžių.')
s.voice(5.0, 'Perregistravus domeną naujam turėtojui, ta data pradedama skaičiuoti iš naujo.')
s.voice(10.4, 'Jei interneto archyve ta pati svetainė matoma anksčiau, domenas buvo kažkieno kito. Greičiausiai – įstaigos.')
s.ekrane = 'Kairėje registro įrašas „Įkurtas 2026-01-24“ su pastaba, kad atrodo naujas. Dešinėje archyvas: svetainė tuo pačiu adresu nuo 2019. Apačioje gelsva kortelė, kad perregistravus data prasideda iš naujo.'
s.komentaras = 'Eimantas 2026-09-18: įkūrimo data po perregistravimo skaičiuojama nuo nulio; archyvas (web.archive.org) rodo, kad adresas naudotas anksčiau.'

# ================================================================ 5. Kol veikia
s = Scene('05-kol-veikia', 'Kodėl to nepastebime', 'Kol viskas veikia, niekas netikrina', 15)
years = [('2016', 'svetainė padaryta'), ('2019', 'sąskaita už domeną'), ('2022', 'naujas dizainas'), ('2026', 'viskas veikia')]
body = '<div style="position:absolute; left:60px; right:60px; top:200px; height:6px; background:#e3e8f0; border-radius:3px"></div>'
for i, (y, t) in enumerate(years):
    x = 60 + i * 380
    body += (f'<div class="yr y{i}" style="position:absolute; left:{x}px; top:120px; width:340px; text-align:center">'
             f'<div class="big">{s.t("y%d" % i, y)}</div>'
             f'<div style="margin:64px 0 0; font-size:24px; color:var(--c-text-muted)">{s.t("t%d" % i, t)}</div></div>'
             f'<div class="dot d{i}" style="position:absolute; left:{x + 164}px; top:192px; width:22px; height:22px; border-radius:50%; background:var(--c-blue-solid)"></div>')
body += (f'<div class="cardbox note" style="left:300px; top:430px; width:1080px; height:180px; padding:40px 44px; text-align:center">'
         f'<div class="big">{s.t("nb", "Niekas neturi priežasties tikrinti")}</div>'
         f'<div class="mid" style="margin-top:16px; color:var(--c-text-muted)">{s.t("nn", "Veikianti svetainė nėra įrodymas, kad domenas jūsų")}</div></div>')
add(s, page(s, body, CSS_BASE))
for i in range(4):
    s.appear(f'.y{i}', 0.4 + i * 1.1, 'fadeUpLight', 0.4)
    s.appear(f'.d{i}', 0.5 + i * 1.1, 'fadeUpLight', 0.4)
s.appear('.note', 7.4, 'fadeUpMedium', 0.5)
s.voice(1.0, 'Metai bėga, svetainė veikia, sąskaitos apmokamos.')
s.voice(5.0, 'Niekas neturi priežasties tikrinti, kam domenas registruotas.')
s.voice(9.0, 'Bet veikianti svetainė nėra įrodymas, kad domenas jūsų.')
s.ekrane = 'Laiko juosta: 2016 svetainė padaryta, 2019 sąskaita už domeną, 2022 naujas dizainas, 2026 viskas veikia. Apačioje kortelė „Niekas neturi priežasties tikrinti“.'

# ================================================================ 6. Testas
s = Scene('06-testas', 'Kada paaiškėja', 'Paaiškėja tada, kai norite ką nors keisti', 19)
body = (f'<div class="cardbox req" style="left:60px; top:90px; width:640px; height:260px; padding:40px 38px">'
        f'<div class="lbl">{s.t("rl", "Mokyklos laiškas")}</div>'
        f'<div class="big" style="margin-top:18px; line-height:1.3">{s.t("rt", "Prašome perduoti domeną naujam tiekėjui")}</div></div>')
ans = [('Palaukite, peržiūrėsime', 4.6), ('Domeno perdavimas – 400 €', 6.6), ('Reikia papildomų sąlygų', 8.6)]
for i, (a, t) in enumerate(ans):
    body += (f'<div class="cardbox a{i}" style="left:860px; top:{60 + i * 150}px; width:760px; height:120px; padding:0 34px; display:flex; align-items:center; gap:18px">'
             f'<span style="width:14px; height:14px; border-radius:50%; background:var(--c-red-solid)"></span>'
             f'<span class="mid" style="font-weight:700">{s.t("a%d" % i, a)}</span></div>')
body += (f'<div class="cap cc" style="top:560px; font-size:30px; color:var(--c-text)">'
         f'{s.t("cc", "Tada ir paaiškėja, kad adresą kontroliuoja ne įstaiga")}</div>')
add(s, page(s, body, CSS_BASE))
s.appear('.req', 0.4, 'slinktisIsKaires', 0.5)
for i, (_, t) in enumerate(ans):
    s.appear(f'.a{i}', t, 'slinktisIsDesines', 0.45)
s.visible('.cc', 11.6)
s.voice(1.0, 'Klausimas iškyla vieną kartą – kai įstaiga nori keisti tiekėją.')
s.voice(5.4, 'Atsakymai būna įvairūs: palaukite, sumokėkite, pasirašykite.')
s.voice(10.0, 'Keturi šimtai eurų už nuosavą adresą – tikras pavyzdys.')
s.voice(13.8, 'Iki tol viskas atrodė tvarkoje.')
s.ekrane = 'Kairėje laiškas „Prašome perduoti domeną naujam tiekėjui“, dešinėje trys atsakymai, tarp jų „Domeno perdavimas – 400 €“.'
s.komentaras = 'Eimantas 2026-09-18: 400 € — tikras atvejis, pasekmės iliustracija. Pavadinimų nevardijame.'

# ================================================================ 7. Įrodymas
s = Scene('07-irodymas', 'Kieno pusėje įrodymai', 'Perdavimą įrodo tas, kas domeną laiko', 21)
left = (f'<div class="cardbox li" style="left:60px; top:70px; width:740px; height:420px; padding:38px 36px">'
        f'<div class="lbl">{s.t("ll", "Įstaiga")}</div><div class="big" style="margin:14px 0 24px">{s.t("lh", "Ką turite jūs")}</div>'
        + ''.join(f'<div class="mid" style="margin-bottom:14px">✓ {s.t("li%d" % i, t)}</div>' for i, t in enumerate(
            ['Registro istoriją, kad adresas buvo jūsų', 'Pareiškimą, kad domeno niekam neperleidote', 'Sutartis, sąskaitas, susirašinėjimą'])) + '</div>')
right = (f'<div class="cardbox ri" style="left:880px; top:70px; width:740px; height:420px; padding:38px 36px">'
         f'<div class="lbl">{s.t("rl", "Tas, kas laiko domeną")}</div><div class="big" style="margin:14px 0 24px">{s.t("rh", "Ką turi jis")}</div>'
         f'<div class="mid" style="color:var(--c-text-muted)">{s.t("rn", "Turi parodyti, kada ir kokiu pagrindu jūs domeną jam perdavėte.")}</div>'
         f'<div style="position:absolute; left:36px; bottom:36px"><span class="pill r">{s.t("rv", "Jei neperdavėte – dokumento nėra")}</span></div></div>')
body = left + right + f'<div class="cap ce" style="top:560px; font-size:30px; color:var(--c-text)">{s.t("ce", "Jums nereikia įrodinėti, kad domenas jūsų. Užtenka pasakyti, kad niekada jo neperdavėte.")}</div>'
add(s, page(s, body, CSS_BASE))
s.appear('.li', 0.4, 'slinktisIsKaires', 0.5)
s.appear('.ri', 4.2, 'slinktisIsDesines', 0.5)
s.visible('.ce', 10.4)
s.voice(1.0, 'Registras remiasi savo istorija – ji viešai nematoma, bet saugoma.')
s.voice(5.0, 'Jei jūsų įstaiga joje kada nors buvo turėtoja, užtenka pareiškimo, kad domeno niekam neperleidote.')
s.voice(9.6, 'Perleidimą turi pagrįsti tas, kas domeną laiko dabar. Jei perdavimo nebuvo, dokumento jis neturi.')
s.ekrane = 'Kairėje „Ką turi įstaiga“: registro ar archyvo pėdsakas, sutartys ir sąskaitos, susirašinėjimas. Dešinėje „Ką turi jis“ su žyma „Jei neperdavėte – dokumento nėra“.'
s.komentaras = 'Eimanto patirtis: įrodinėjimo našta tenka dabartiniam turėtojui.'

# ================================================================ Kai istorijoje įstaigos nėra
s = Scene('08-nera-istorijoje', 'Jei istorijoje įstaigos nėra', 'Jei registre įstaigos niekada nebuvo', 24)
body = (f'<div class="cardbox a" style="left:60px; top:50px; width:760px; height:330px; padding:36px 34px">'
        f'<div class="lbl">{s.t("al", "Pirmas atvejis")}</div>'
        f'<div class="big" style="margin:14px 0 18px; color:var(--c-green-text)">{s.t("ah", "Įstaiga registre kadaise buvo")}</div>'
        f'<div class="mid" style="color:var(--c-text-muted); line-height:1.4">{s.t("ap", "Užtenka pareiškimo, kad domeno niekam neperleidote. Registras remiasi savo istorija.")}</div></div>')
body += (f'<div class="cardbox b" style="left:860px; top:50px; width:760px; height:330px; padding:36px 34px">'
         f'<div class="lbl">{s.t("bl", "Antras atvejis")}</div>'
         f'<div class="big" style="margin:14px 0 18px; color:#92400e">{s.t("bh", "Įstaigos registre niekada nebuvo")}</div>'
         f'<div class="mid" style="color:var(--c-text-muted); line-height:1.4">{s.t("bp", "Nuo pat pradžių domenas buvo registruotas ne jūsų vardu. Ginčui pagrindo nėra.")}</div></div>')
opts = [('Deratės dėl perleidimo', 'kartais pakanka paprašyti raštu'),
        ('Registruojate naują domeną', 'ir persikeliate – papildomas darbas, bet aiški pabaiga')]
for i, (h, p) in enumerate(opts):
    body += (f'<div class="cardbox o{i}" style="left:{60 + i * 800}px; top:430px; width:760px; height:210px; padding:32px 34px">'
             f'<div class="big" style="font-size:30px">{s.t("oh%d" % i, h)}</div>'
             f'<div class="mid" style="margin-top:12px; color:var(--c-text-muted)">{s.t("op%d" % i, p)}</div></div>')
add(s, page(s, body, CSS_BASE))
s.appear('.a', 0.4, 'slinktisIsKaires', 0.5)
s.appear('.b', 4.4, 'slinktisIsDesines', 0.5)
for i in range(2):
    s.appear(f'.o{i}', 10.6 + i * 2.0, 'fadeUpMedium', 0.45)
s.voice(1.0, 'Viskas priklauso nuo vieno dalyko: ar įstaiga registre kada nors buvo turėtoja.')
s.voice(6.0, 'Jei buvo – užtenka pasakyti, kad domeno niekam neperleidote.')
s.voice(10.2, 'Jei nebuvo – ginčui pagrindo nėra: domenas nuo pradžių registruotas ne jūsų vardu.')
s.voice(15.6, 'Tada lieka du keliai: derėtis arba registruoti naują domeną ir persikelti.')
s.ekrane = 'Dvi kortelės: „Įstaiga registre kadaise buvo“ (žalia) ir „Įstaigos registre niekada nebuvo“ (gelsva). Apačioje du keliai: derėtis dėl perleidimo arba registruoti naują domeną ir persikelti.'
s.komentaras = 'Eimantas 2026-09-19: registras remiasi savo WHOIS istorija, kurios viešai nesimato; jei įstaigos joje nebuvo — nenagrinėja. Tada praktikoje registruojamas naujas domenas.'


# ================================================================ 8. Ką daryti
s = Scene('09-ka-daryti', 'Ką daryti', 'Keturi žingsniai, jei domenas ne įstaigos', 28)
steps = [('Pasitikrinate registre', 'domreg.lt – matote, kas įrašytas turėtoju', ''),
         ('Paprašote perrašyti įstaigos vardu', 'raštu, net jei dokumentų iš anų laikų nebėra', ''),
         ('Kreipiatės į registrą', 'domreg.lt – kelių laiškų dažnai pakanka', ''),
         ('Jei nepavyksta – renkatės naują domeną', 'teisinis kelias praktikoje ilgas, todėl dažnai persikeliama', 'a')]
body = ''
for i, (h, p, tone) in enumerate(steps):
    y = 20 + i * 155
    bg = 'background:var(--c-amber-bg); border-color:#fde68a;' if tone == 'a' else ''
    body += (f'<div class="cardbox st{i}" style="left:120px; top:{y}px; width:1440px; height:130px; padding:0 40px; display:flex; align-items:center; gap:30px; {bg}">'
             f'<div style="width:60px; height:60px; border-radius:50%; background:var(--c-blue-solid); color:#fff; font-size:28px; font-weight:700; display:flex; align-items:center; justify-content:center">{i + 1}</div>'
             f'<div><div class="big" style="font-size:29px">{s.t("h%d" % i, h)}</div>'
             f'<div class="mid" style="color:var(--c-text-muted); margin-top:6px">{s.t("p%d" % i, p)}</div></div></div>')
body += f'<div class="cap cd" style="top:660px; font-size:30px; color:var(--c-text)">{s.t("cd", "Dažniausiai to tiesiog nedaroma, nes nežinoma, kad galima")}</div>'
add(s, page(s, body, CSS_BASE))
for i in range(4):
    s.appear(f'.st{i}', 0.6 + i * 3.6, 'fadeUpMedium', 0.5)
s.visible('.cd', 16.4)
s.voice(1.0, 'Jei pasitikrinę radote svetimą pavadinimą, kelias yra.')
s.voice(4.6, 'Pirmiausia pasitikrinate registre, kas įrašytas turėtoju.')
s.voice(8.0, 'Tada raštu paprašote perrašyti domeną įstaigos vardu – net jei senų dokumentų nebėra.')
s.voice(13.6, 'Jei nepavyksta, rašote registrui. Dažnai pakanka kelių laiškų.')
s.voice(17.8, 'Jei ir tai nepadeda, praktikoje dažniau renkamasi naują domeną, nes teisinis kelias ilgas.')
s.ekrane = 'Keturi žingsniai: pasitikrinate registre, paprašote perrašyti įstaigos vardu, kreipiatės į registrą, jei nepavyksta – naujas domenas (gelsva kortelė).'
s.komentaras = 'Eimantas 2026-09-19: kai dokumentų nėra — prašyti perrašyti įstaigos vardu; teisininkai dažniausiai sako, kad bylinėtis neverta, todėl praktikoje registruojamas naujas domenas. ⛔ Rezultato nežadame.'

# ================================================================ 9. Google
s = Scene('10-google', 'Kas su paieška', 'Pakeitus adresą paieška grįžta ne iš karto', 18)
body = (f'<div class="cardbox g1" style="left:120px; top:70px; width:660px; height:420px; padding:38px 34px">'
        f'<div class="big">{s.t("g1h", "Ko nežadame")}</div>'
        f'<div class="mid" style="margin-top:20px; color:var(--c-text-muted); line-height:1.45">{s.t("g1p", "Kad svetainė nauju adresu atsiras paieškoje per dieną. Terminai būna labai skirtingi.")}</div></div>')
body += (f'<div class="cardbox g2" style="left:900px; top:70px; width:660px; height:420px; padding:38px 34px">'
         f'<div class="big">{s.t("g2h", "Ką darome")}</div>'
         + ''.join(f'<div class="mid" style="margin-top:16px">✓ {s.t("g2i%d" % i, t)}</div>' for i, t in enumerate(
             ['nukreipimai iš senų adresų', 'svetainės žemėlapis paieškos sistemai', 'nuorodų atnaujinimas'])) + '</div>')
body += f'<div class="cap cg" style="top:560px; font-size:30px; color:var(--c-text)">{s.t("cg", "Su visu priemonių paketu paieška anksčiau ar vėliau susitvarko")}</div>'
add(s, page(s, body, CSS_BASE))
s.appear('.g1', 0.4, 'slinktisIsKaires', 0.5)
s.appear('.g2', 5.0, 'slinktisIsDesines', 0.5)
s.visible('.cg', 11.0)
s.voice(1.0, 'Dažnas klausimas: kaip greitai svetainė vėl bus randama paieškoje.')
s.voice(5.4, 'Garantijų nėra – terminai būna labai skirtingi.')
s.voice(9.0, 'Bet su nukreipimais, svetainės žemėlapiu ir atnaujintomis nuorodomis paieška vienaip ar kitaip susitvarko.')
s.ekrane = 'Dvi kortelės: „Ko nežadame“ – kad paieška atsistatys per dieną; „Ką darome“ – nukreipimai, svetainės žemėlapis, nuorodų atnaujinimas.'
s.komentaras = 'Eimantas 2026-09-18: jokių garantijų dėl greičio; su visu priemonių paketu grįžta.'

# ================================================================ Prevencija
s = Scene('11-pries-starta', 'Prieš startą', 'Domeno klausimas iškyla prieš pat startą', 26)
body = (f'<div class="cardbox t" style="left:80px; top:40px; width:1520px; height:180px; padding:34px 40px; text-align:center">'
        f'<div class="big">{s.t("th", "Įstaiga laukia naujos svetainės")}</div>'
        f'<div class="mid" style="margin-top:12px; color:var(--c-text-muted)">{s.t("tp", "Domeno klausimas iškyla paskutinę savaitę, tarp kitų darbų")}</div></div>')
two = [('Profesionalus tiekėjas', 'paaiškina, kad domenas registruojamas įstaigos vardu', 'g'),
       ('Kitas', 'pasiūlo „viskuo pasirūpinti“ ir įrašo save', 'r')]
for i, (h, p, tone) in enumerate(two):
    body += (f'<div class="cardbox p{i}" style="left:{80 + i * 800}px; top:270px; width:720px; height:230px; padding:32px 34px">'
             f'<div class="big" style="font-size:30px">{s.t("ph%d" % i, h)}</div>'
             f'<div class="mid" style="margin-top:12px; color:var(--c-text-muted); line-height:1.4">{s.t("pp%d" % i, p)}</div>'
             f'<div style="position:absolute; right:30px; bottom:26px"><span class="pill {tone}">{s.t("pv%d" % i, "Taip turi būti" if tone == "g" else "Taip nutinka")}</span></div></div>')
body += (f'<div class="cardbox r" style="left:80px; top:540px; width:1520px; height:200px; padding:34px 40px; display:flex; align-items:center; gap:28px">'
         f'<img src="./assets/cleverphant-simbolis-spalvotas.svg" alt="" style="width:60px; height:auto">'
         f'<div><div class="big" style="font-size:30px">{s.t("rh", "Mūsų taisyklė: domenas registruojamas įstaigos vardu")}</div>'
         f'<div class="mid" style="margin-top:10px; color:var(--c-text-muted)">{s.t("rp", "Sąskaitą už domeną gauna įstaiga. Ta sąskaita ir yra jūsų saugiklis.")}</div></div></div>')
add(s, page(s, body, CSS_BASE))
s.appear('.t', 0.3, 'fadeUpMedium', 0.5)
s.appear('.p0', 5.0, 'slinktisIsKaires', 0.5)
s.appear('.p1', 8.4, 'slinktisIsDesines', 0.5)
s.appear('.r', 13.6, 'fadeUpMedium', 0.5)
s.voice(1.0, 'Klaida dažniausiai padaroma ne dėl aplaidumo, o dėl nežinojimo.')
s.voice(4.8, 'Įstaiga laukia naujos svetainės, o domeno klausimas iškyla paskutinę savaitę.')
s.voice(9.4, 'Profesionalus tiekėjas tada paaiškina. Kitas pasiūlo viskuo pasirūpinti ir įrašo save.')
s.voice(15.0, 'Mes domeną registruojame įstaigos vardu, o sąskaitą už jį gauna pati įstaiga. Ta sąskaita ir yra saugiklis.')
s.ekrane = 'Viršuje „Įstaiga laukia naujos svetainės“. Po juo dvi kortelės: profesionalus tiekėjas paaiškina; kitas pasiūlo „viskuo pasirūpinti“ ir įrašo save. Apačioje mūsų taisyklė su Cleverphant simboliu: domenas registruojamas įstaigos vardu, sąskaitą gauna įstaiga.'
s.komentaras = 'Eimantas 2026-09-19: sutartyse punkto neturime — turime nerašytą taisyklę; sąskaita įstaigai yra saugiklis. Nežadame sutarties punkto.'

# ================================================================ 10. Penki klausimai
s = Scene('12-penki-klausimai', 'Penkių minučių patikra', 'Penki klausimai, kuriuos verta užduoti šiandien', 26)
qs = ['Kam registruotas mūsų domenas?', 'Ar turėtojo duomenys – įstaigos, ne tiekėjo?', 'Kada domenas įkurtas registre?',
      'Ar rytoj galėtume pakeisti tiekėją be jo leidimo?', 'Ar sutartyje parašyta, kam priklauso domenas?']
body = ''
for i, q in enumerate(qs):
    body += (f'<div class="cardbox q{i}" style="left:180px; top:{30 + i * 118}px; width:1320px; height:98px; padding:0 34px; display:flex; align-items:center; gap:26px">'
             f'<div style="width:46px; height:46px; border-radius:50%; background:#eef2f7; color:var(--c-text-muted); font-size:22px; font-weight:700; display:flex; align-items:center; justify-content:center">{i + 1}</div>'
             f'<span class="mid" style="font-size:28px">{s.t("q%d" % i, q)}</span></div>')
body += (f'<div class="cardbox fin" style="left:180px; top:630px; width:1320px; height:120px; padding:0 34px; display:flex; align-items:center; justify-content:center; '
         f'background:var(--c-amber-bg); border-color:#fde68a">'
         f'<span class="mid" style="font-size:28px; text-align:center">{s.t("fin", "Jei bent į vieną atsakymas „nežinome“ – verta pasitikrinti šiandien")}</span></div>')
add(s, page(s, body, CSS_BASE))
for i in range(5):
    s.appear(f'.q{i}', 0.6 + i * 2.6, 'fadeUpLight', 0.4)
s.appear('.fin', 15.0, 'fadeUpMedium', 0.5)
s.voice(1.0, 'Penki klausimai, kuriuos verta užduoti šiandien.')
s.voice(3.6, 'Kam registruotas mūsų domenas.')
s.voice(6.2, 'Ar turėtojo duomenys – įstaigos, ne tiekėjo.')
s.voice(9.0, 'Kada domenas įkurtas registre.')
s.voice(11.6, 'Ar rytoj galėtume pakeisti tiekėją be jo leidimo.')
s.voice(14.4, 'Ar sutartyje parašyta, kam priklauso domenas.')
s.voice(17.2, 'Jei bent į vieną atsakymas – nežinome, verta pasitikrinti.')
s.ekrane = 'Penki sunumeruoti klausimai, apačioje gelsva juosta „Jei bent į vieną atsakymas „nežinome“ – verta pasitikrinti šiandien“.'

# ================================================================ 11. Kaip pas mus
s = Scene('13-kaip-pas-mus', 'Kaip yra pas mus', 'Registruojame įstaigos vardu', 15)
body = (f'<div class="cardbox w" style="left:180px; top:70px; width:1320px; height:250px; padding:40px 44px">'
        f'<div class="lbl">{s.t("wl", "Registro įrašas")}</div>'
        f'<div style="display:flex; gap:40px; margin-top:22px; align-items:center">'
        f'<div style="width:330px; color:var(--c-text-muted); font-size:24px">{s.t("wk", "Domeno turėtojas")}</div>'
        f'<div class="big" style="color:var(--c-green-text)">{s.t("wv", "Įstaiga")}</div></div>'
        f'<div class="mid" style="margin-top:26px; color:var(--c-text-muted)">{s.t("wn", "Taip matyti viešai – bet kada, be mūsų")}</div></div>')
body += (f'<div class="cardbox c" style="left:180px; top:380px; width:1320px; height:230px; padding:40px 44px; display:flex; align-items:center; gap:28px">'
         f'<img src="./assets/cleverphant-simbolis-spalvotas.svg" alt="" style="width:64px; height:auto">'
         f'<div><div class="big">{s.t("ch", "Administruojame, bet nesavinamės")}</div>'
         f'<div class="mid" style="margin-top:10px; color:var(--c-text-muted)">{s.t("cp", "Domeną registruojame įstaigos vardu. Tiekėjas keičiasi – adresas lieka jūsų.")}</div></div></div>')
add(s, page(s, body, CSS_BASE))
s.appear('.w', 0.4, 'fadeUpMedium', 0.5)
s.appear('.c', 5.2, 'fadeUpMedium', 0.5)
s.voice(1.0, 'Mūsų klientų domenai registruoti įstaigos vardu.')
s.voice(4.6, 'Tai matyti viešai, bet kada, be mūsų.')
s.voice(7.6, 'Administruoti – paslauga. Turėti adresą turi pati įstaiga.')
s.ekrane = 'Kortelė su registro įrašu: domeno turėtojas – įstaiga (žaliai). Žemiau kortelė su Cleverphant simboliu: „Administruojame, bet nesavinamės“.'



# ================================================================ 15. Disclaimeris
s = Scene('14-disclaimeris', 'Kas tai yra ir kas ne', 'Tai ne teisinė konsultacija', 16)
body = (f'<div class="cardbox d" style="left:260px; top:110px; width:1160px; height:420px; padding:54px 60px">'
        f'<div class="big" style="font-size:32px; line-height:1.3">{s.t("dh", "Tai ne teisinė konsultacija")}</div>'
        f'<div class="mid" style="margin-top:26px; line-height:1.5; color:var(--c-text-muted)">'
        f'{s.t("dp", "Filmukas remiasi mūsų pačių praktika ir viešai prieinamais registro duomenimis nuo 2011 m. iki 2026 m. rugsėjo 1 d.")}</div>'
        f'<div class="mid" style="margin-top:20px; line-height:1.5; color:var(--c-text-muted)">'
        f'{s.t("dp2", "Kiekvienas atvejis skiriasi. Dėl savo situacijos tarkitės su registru arba teisininku.")}</div></div>')
add(s, page(s, body, CSS_BASE))
s.appear('.d', 0.4, 'fadeUpMedium', 0.6)
s.voice(1.0, 'Tai ne teisinė konsultacija.')
s.voice(3.4, 'Remiamės savo praktika ir viešai prieinamais registro duomenimis nuo dviejų tūkstančių vienuoliktųjų iki šių metų rugsėjo.')
s.voice(11.0, 'Kiekvienas atvejis skiriasi.')
s.ekrane = 'Kortelė su užrašu „Tai ne teisinė konsultacija“ ir paaiškinimu, kad remiamasi mūsų praktika bei viešais registro duomenimis nuo 2011 m. iki 2026 m. rugsėjo 1 d.'
s.komentaras = 'Eimantas 2026-09-19: gale reikia disclaimerio — analitinis vertinimas, ne teisiniai patarimai.'


def sutvarkyti_balsa():
    """Balso sakiniai neturi lipti vienas ant kito: kiekvienam paliekamas jo ilgis + 0,7 s,
    o kadras pailginamas, kad paskutinis tilptų (VIDEO_GAMYBA §2)."""
    for s, _ in SCENES:
        voices = sorted([c for c in s.cues if c[1] == 'balsas'])
        kiti = [c for c in s.cues if c[1] != 'balsas']
        nauji, pabaiga = [], 0.0
        for t, _k, txt in voices:
            t = max(t, pabaiga)
            nauji.append((round(t, 1), 'balsas', txt))
            pabaiga = t + len(txt) / CPS + 0.7
        s.cues = kiti + nauji
        if pabaiga + 0.6 > s.D:
            print(f'⛔ {s.file}: balsas netelpa, reikia D={int(pabaiga + 1.0 + 0.999)} (dabar {s.D})')


def main():
    sutvarkyti_balsa()
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
    block = "  // >>> DOMENAS (generuoja lessons/domeno-nuosavybe/build_scenes.py — ranka neredaguoti)\n"
    for s, _ in SCENES:
        cssx = shared + '\n'.join('    ' + c for c in s.css)
        block += f"  '{s.file}': `\n    .card > .title {{ opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }}\n{cssx}\n  `,\n"
    block += "  // <<< DOMENAS\n"
    p = os.path.join(ILL, 'generate-video-clips.js')
    js = open(p, encoding='utf-8').read()
    if '// >>> DOMENAS' in js:
        js = re.sub(r"  // >>> DOMENAS.*?  // <<< DOMENAS\n", lambda m: block, js, flags=re.S)
    else:
        js = js.replace("const TEMPLATE_ANIMATIONS = {\n", "const TEMPLATE_ANIMATIONS = {\n" + block, 1)
    open(p, 'w', encoding='utf-8').write(js)

    # scenarijus
    total = sum(s.D for s, _ in SCENES)
    full = total + 10 + int((len(SCENES) - 1) * 3.2)
    md = [f"# Video scenarijus: Domeno nuosavybė: kaip tvarkyti mokyklos lenteles", "",
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
            est = len(c[2]) / CPS
            end = vc[j + 1][0] - 0.15 if j + 1 < len(vc) else s.D - 0.5
            if c[0] + est > end:
                problems.append(f"K{i}.{j + 1}: ~{est:.1f}s, langas {end - c[0]:.1f}s")
    open(os.path.join(HERE, 'video', 'scenarijus-lt.md'), 'w', encoding='utf-8').write('\n'.join(md) + '\n')
    # skaitomas balso tekstas — Eimantui peržiūrėti be lentelių
    vo = ['# Domeno nuosavybė – balso tekstas (lt)', '',
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
    print(f"scenos: {len(SCENES)} | trukmė {total}s (~{full // 60}:{full % 60:02d}) | balso rizikos: {problems or 'nėra'}")


if __name__ == '__main__':
    main()
