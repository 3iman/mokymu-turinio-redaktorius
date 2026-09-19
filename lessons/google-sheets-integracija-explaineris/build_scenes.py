# -*- coding: utf-8 -*-
"""
„Google Sheets“ integracija — explainerio scenų generatorius.

Šaltinis: publikuota pamoka mokymai.cleverphant.lt/kursai/lenteliu-kurimas-ir-redagavimas/
google-sheets-integracija-lenteliu-atvaizdavimui/ (WP kursai/1654, meta_box.le_list).

⛔ Eiga aiškinama, ne užduodama (Eimantas 2026-09-19): rodome mechanizmą ir atskirai —
kas ką daro. Seną eigą („pasidubliuokite šabloną, prijunkite failą patys“) nebemokome,
nes integraciją daro Cleverphant.

Paleidimas: python3 build_scenes.py
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ILL = os.path.abspath(os.path.join(HERE, '..', '..'))
CPS = 16.0  # Dariaus balso sparta (simbolių per sekundę, greitis 0.9)

CUR = json.load(open(os.path.join(HERE, 'cursor_svgs.json'), encoding='utf-8'))

# ---------------------------------------------------------------- tekstai
STAGE_H = 780
CONTENT = {"lang": "lt", "_intro": {"title": "„Google Sheets“ integracija: kaip lentelė atsiranda svetainėje"}}


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

# ---------------------------------------------------------------- bendras puslapis
BENDRA_CSS = """
  .title { font-size: 44px; margin-bottom: 26px; }
  .stage { position: relative; width: 1680px; height: %(H)dpx; margin: 0 auto; font-family: var(--font-ui, inherit); }
  .cursor-wrap { position: absolute; width: 44px; height: 56px; z-index: 30; pointer-events: none; }
  .cursor-wrap .tvs-cursor { left: 0; top: 0; }

  .kort { position: absolute; background: #fff; border: 1.5px solid #dfe3ea; border-radius: 22px;
          box-shadow: 0 20px 50px rgba(30,40,70,.10); box-sizing: border-box; }
  .kort .h { font-size: 30px; font-weight: 700; color: var(--c-text); }
  .kort .p { font-size: 25px; color: var(--c-text-muted); line-height: 1.45; }
  .zyme { font-size: 21px; font-weight: 600; color: var(--c-text-muted); text-transform: uppercase; letter-spacing: .06em; }

  .failas { position: absolute; border-radius: 20px; background: #eaf5ec; border: 2.5px solid var(--gs-green-th, #1c8d1f); overflow: hidden; }
  .failas .vidus { height: 100%%; display: flex; align-items: center; justify-content: center; font-size: 26px; color: #1b5e20; }
  .lapai { position: absolute; left: 0; right: 0; bottom: 0; display: flex; }
  .lapai span { flex: 1; text-align: center; padding: 16px 0; font-size: 23px; font-weight: 600; color: #fff; background: var(--gs-green-th, #1c8d1f); }
  .lapai span:nth-child(2) { background: #197a1c; }
  .lapai span:nth-child(3) { background: #14691a; }

  .kodas { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 26px; }
  .pill { display: inline-flex; align-items: center; border-radius: 10px; padding: 6px 14px; }
  .kodas .pill { padding: 2px 9px; }
  .pill.f { background: #fdf3d8; color: #a15c00; font-weight: 700; }
  .pill.g { background: #ece7fb; color: #5b3bb5; font-weight: 700; }
  .rodykle { position: absolute; height: 3px; background: #c7ced9; }
  .rodykle::after { content: ""; position: absolute; right: -2px; top: -7px; border: 8px solid transparent; border-left-color: #c7ced9; }
  .varnele { color: var(--gs-green-th, #1c8d1f); font-weight: 700; }
""" % {'H': STAGE_H}


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
{BENDRA_CSS}
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


# ================================================================ 1. Kodėl tai naudinga
s = Scene('00-kodel', 'Kodėl tai naudinga', 'Visos lentelės – vienoje vietoje', 23)
nauda = [('Nereikia jungtis prie TVS', 'lenteles tvarkote naršyklėje'),
         ('Šablonai jau paruošti', 'užpildote tik duomenis'),
         ('Prieigą gali turėti keli žmonės', 'atsakomybes galima pasidalyti'),
         ('Suintegruota vieną kartą', 'toliau keičiate tik duomenis')]
body = (f'<div class="failas" style="left:120px; top:40px; width:620px; height:300px">'
        f'<div class="vidus">{s.t("f_l", "Mokyklos lentelės")}</div>'
        f'<div class="lapai"><span>{s.t("l0", "Taryba")}</span><span>{s.t("l1", "Mokytojai")}</span>'
        f'<span>{s.t("l2", "Atlyginimai")}</span></div></div>')
for i, (h, p) in enumerate(nauda):
    body += (f'<div class="kort n{i}" style="left:820px; top:{20 + i * 118}px; width:740px; padding:20px 26px">'
             f'<div class="h" style="font-size:26px">{s.t("nh%d" % i, h)}</div>'
             f'<div class="p" style="font-size:22px">{s.t("np%d" % i, p)}</div></div>')
add(s, page(s, body))
s.appear('.failas', 0.6, 'fadeUpMedium', 0.6)
for i in range(4):
    s.appear('.n%d' % i, 5.0 + i * 3.6, 'slinktisIsDesines', 0.5)
s.voice(1.0, 'Mokyklos lentelės gali gyventi ne svetainėje, o „Google Sheets“ failuose.')
s.voice(6.1, 'Lentelei pakeisti nebereikia jungtis prie turinio valdymo sistemos.')
s.voice(10.6, 'Šablonai jau paruošti – užpildote tik duomenis.')
s.voice(14.5, 'Prieigą gali turėti keli darbuotojai, tad atsakomybes galima pasidalyti.')
s.voice(20.1, 'O suintegruojama vieną kartą.')
s.ekrane = ('Kairėje – žalias „Google Sheets“ failas su trimis lapais („Taryba“, „Mokytojai“, „Atlyginimai“). '
            'Dešinėje viena po kitos atslenka keturios naudos kortelės.')
s.komentaras = 'Turinys iš publikuotos pamokos § „Kodėl tai naudinga“.'

# ================================================================ 2. Kaip tai veikia
s = Scene('01-kaip-veikia', 'Kaip tai veikia', 'Failas, turinio valdymo sistema ir puslapis', 27)
grand = [('„Google Sheets“ failas', 'čia gyvena duomenys', '#eaf5ec', '#1c8d1f'),
         ('Turinio valdymo sistema', 'modulis „Google Sheets Lentelės“', '#e8f0fe', '#0b57d0'),
         ('Svetainės puslapis', 'lentelė matoma lankytojui', '#f3eefb', '#5b3bb5')]
body = ''
for i, (h, p, bg, br) in enumerate(grand):
    body += (f'<div class="kort g{i}" style="left:{60 + i * 540}px; top:120px; width:460px; height:230px; padding:28px 30px; background:{bg}; border-color:{br}">'
             f'<div class="h" style="color:{br}">{s.t("gh%d" % i, h)}</div>'
             f'<div class="p" style="margin-top:14px">{s.t("gp%d" % i, p)}</div></div>')
for i in range(2):
    body += f'<div class="rodykle r{i}" style="left:{530 + i * 540}px; top:232px; width:60px"></div>'
body += (f'<div class="kort id" style="left:60px; top:430px; width:1540px; padding:26px 32px">'
         f'<div class="p">{s.t("idp", "Prijungtam failui sistema suteikia savo ID, o kiekvienas lapas turi savo gID. Puslapis pagal juos žino, kurią lentelę imti.")}</div></div>')
add(s, page(s, body))
for i in range(3):
    s.appear('.g%d' % i, 1.0 + i * 5.4, 'fadeUpMedium', 0.5)
for i in range(2):
    s.appear('.r%d' % i, 5.6 + i * 5.4, 'fadeUpLight', 0.4)
s.visible('.id', 17.0)
s.voice(1.0, 'Duomenys gyvena „Google Sheets“ faile.')
s.voice(5.0, 'Failas prijungiamas prie turinio valdymo sistemos – ten tam yra modulis „Google Sheets Lentelės“.')
s.voice(11.6, 'O svetainės puslapis lentelę tiesiog parodo lankytojui.')
s.voice(17.0, 'Prijungtam failui sistema suteikia savo numerį, o kiekvienas lapas turi savo gID.')
s.voice(22.6, 'Pagal juos puslapis ir žino, kurią lentelę imti.')
s.ekrane = 'Trys kortelės iš kairės į dešinę su rodyklėmis: failas → turinio valdymo sistema → svetainės puslapis. Apačioje – paaiškinimas apie ID ir gID.'
s.komentaras = 'Publikuota pamoka § „Kaip tai veikia“. Sintaksė rodoma atskirame kadre.'

# ================================================================ 3. URL anatomija
s = Scene('02-url', 'Failo ir lapo numeriai', 'Abu numerius matote adreso juostoje', 24)
url = (f'<div class="kort urlbar" style="left:90px; top:110px; width:1500px; padding:30px 34px; text-align:center">'
       f'<span class="kodas" style="color:var(--c-text-muted)">docs.google.com/spreadsheets/d/</span>'
       f'<span class="pill f kodas u_f">{s.t("u_f", "FAILO_ID")}</span>'
       f'<span class="kodas" style="color:var(--c-text-muted)">/edit#gid=</span>'
       f'<span class="pill g kodas u_g">{s.t("u_g", "gID")}</span></div>')
kor = [('FAILO_ID', 'pats failas – visoms jo lentelėms vienodas', 'f'),
       ('gID', 'konkretus lapas; nesikeičia net pervadinus', 'g')]
body = url
for i, (h, p, cls) in enumerate(kor):
    body += (f'<div class="kort u{i}" style="left:{140 + i * 780}px; top:300px; width:660px; padding:26px 30px">'
             f'<div class="h kodas"><span class="pill {cls}">{s.t("uh%d" % i, h)}</span></div>'
             f'<div class="p" style="margin-top:16px">{s.t("up%d" % i, p)}</div></div>')
body += (f'<div class="kort" style="left:140px; top:520px; width:1300px; padding:24px 30px">'
         f'<div class="p">{s.t("uz", "Pirmasis lapas visada turi gID 0. Tai numatytasis lapas – jo vietos keisti negalima.")}</div></div>')
add(s, page(s, body))
s.appear('.urlbar', 0.8, 'fadeUpMedium', 0.5)
s.css.append(f".u_f {{ animation: iconPulse 0.7s ease-in-out 5.2s both; }}")
s.css.append(f".u_g {{ animation: iconPulse 0.7s ease-in-out 11.0s both; }}")
s.appear('.u0', 5.4, 'fadeUpLight', 0.5)
s.appear('.u1', 11.2, 'fadeUpLight', 0.5)
s.voice(1.0, 'Abu numerius matote to paties failo adrese.')
s.voice(5.2, 'Failo numeris rodo patį failą – visoms jo lentelėms jis vienodas.')
s.voice(11.0, 'O gID rodo konkretų lapą. Jis nesikeičia net tada, kai lapą pervadinate.')
s.voice(17.4, 'Pirmasis lapas visada turi gID nulis – tai numatytasis lapas.')
s.ekrane = 'Adreso juosta su geltonai pažymėtu FAILO_ID ir violetiniu gID; po ja dvi kortelės ir pastaba apie pirmąjį lapą.'
s.komentaras = 'Publikuota pamoka § „Failo struktūra ir URL anatomija“ ir § „Apie lapų tvarką ir gID reikšmes“.'


# ================================================================ 4. Kas ką daro
s = Scene('03-kas-ka-daro', 'Kas ką daro', 'Prijungiame mes – pildote jūs', 22)
mes = ['sukuriame ir prijungiame failą', 'publikuojame jį skaitymui', 'įterpiame lentelę į puslapį']
jus = ['pildote ir tvarkote duomenis', 'dalijatės prieiga su kolegomis', 'prašote pagalbos, jei kas nepavyko']
body = ''
for j, (pav, sar, bg, br) in enumerate([('Cleverphant', mes, '#e8f0fe', '#0b57d0'), ('Mokykla', jus, '#eaf5ec', '#1c8d1f')]):
    body += (f'<div class="kort k{j}" style="left:{110 + j * 800}px; top:60px; width:660px; height:420px; padding:34px 38px; background:{bg}; border-color:{br}">'
             f'<div class="h" style="color:{br}">{s.t("kh%d" % j, pav)}</div>')
    for i, x in enumerate(sar):
        body += f'<div class="p k{j}i{i}" style="margin-top:26px"><span class="varnele">✓</span> {s.t("k%di%d" % (j, i), x)}</div>'
    body += '</div>'
body += (f'<div class="kort" style="left:110px; top:530px; width:1460px; padding:24px 32px">'
         f'<div class="p">{s.t("kz", "Senoji eiga, kai mokykla pati kopijuoja šabloną ir prijungia failą, nebetaikoma.")}</div></div>')
add(s, page(s, body))
s.appear('.k0', 0.8, 'slinktisIsKaires', 0.5)
s.appear('.k1', 8.6, 'slinktisIsDesines', 0.5)
for j in range(2):
    for i in range(3):
        s.visible('.k%di%d' % (j, i), (2.0 if j == 0 else 9.6) + i * 2.1)
s.voice(1.0, 'Prijungimą, publikavimą ir lentelės įdėjimą į puslapį padarome mes.')
s.voice(7.0, 'Jums lieka svarbiausia dalis: duomenys.')
s.voice(10.3, 'Jūs pildote lenteles, dalijatės prieiga su kolegomis')
s.voice(15.0, 'ir parašote mums tada, kai kas nors nepavyksta.')
s.voice(18.7, 'Šablono kopijuoti patiems nebereikia.')
s.ekrane = 'Dvi kortelės: mėlyna „Cleverphant“ su trimis darbais ir žalia „Mokykla“ su trimis. Apačioje – pastaba apie seną eigą.'
s.komentaras = 'Eimantas 2026-09-17: senoji eiga (mokykla kopijuoja šabloną) nesuveikė, integraciją daro Cleverphant. Kadras pridėtas 2026-09-19 pagal Eimanto sprendimą „mišrus variantas“.'

# ================================================================ 5. Publikavimas
s = Scene('04-publikavimas', 'Publikavimas', 'Kad svetainė galėtų perskaityti duomenis', 22)
dlg = (f'<div class="kort dlg" style="left:400px; top:70px; width:880px; padding:36px 40px">'
       f'<div class="h">{s.t("d_h", "Bendrinti failą")}</div>'
       f'<div class="zyme" style="margin-top:30px">{s.t("d_z", "Bendroji prieiga")}</div>'
       f'<div class="p sel" style="margin-top:14px; padding:18px 22px; border:2px solid #0b57d0; border-radius:12px; color:var(--c-text)">'
       f'{s.t("d_v", "Visi, turintys nuorodą")}</div>'
       f'<div class="p rol" style="margin-top:22px; padding:18px 22px; background:#eaf5ec; border-radius:12px; color:#1b5e20">'
       f'{s.t("d_r", "Rolė: „Žiūrintysis“ – to pakanka")}</div></div>')
body = dlg + (f'<div class="kort" style="left:400px; top:470px; width:880px; padding:24px 30px">'
              f'<div class="p">{s.t("pz", "Neatidarius failo skaitymui, svetainė lentelės duomenų nepasiekia.")}</div></div>')
add(s, page(s, body))
s.appear('.dlg', 0.8, 'fadeUpMedium', 0.5)
s.visible('.sel', 6.0)
s.visible('.rol', 12.0)
s.voice(1.0, 'Kad svetainė galėtų perskaityti lentelę, failas turi būti atidarytas skaitymui.')
s.voice(6.6, 'Bendrojoje prieigoje pasirenkama „Visi, turintys nuorodą“.')
s.voice(12.0, 'Rolės „Žiūrintysis“ visiškai pakanka – redaguoti svetainei nereikia.')
s.voice(18.0, 'Tai padarome prijungdami failą.')
s.ekrane = 'Bendrinimo lango kortelė: „Bendroji prieiga“ → „Visi, turintys nuorodą“, žemiau žalia juosta „Rolė: Žiūrintysis – to pakanka“.'
s.komentaras = ('Publikuota pamoka § „Kaip publikuoti Google Sheets failą“. ⛔ PATIKRINTI lietuviškus užrašus: '
                '„Bendroji prieiga“, „Visi, turintys nuorodą“, „Žiūrintysis“ — versti iš anglų (Share, General access, Anyone with the link, Viewer).')

# ================================================================ 6. Kodas puslapyje
s = Scene('05-kodas', 'Lentelė puslapyje', 'Puslapyje – viena eilutė, svetainėje – lentelė', 25)
kodas = (f'<div class="kort kod" style="left:120px; top:90px; width:740px; padding:30px 34px">'
         f'<div class="zyme">{s.t("k_z", "Puslapio turinyje")}</div>'
         f'<div class="kodas" style="margin-top:20px; font-size:24px">'
         f'{{{{google_sheet(<span class="pill f">{s.t("k_id", "1")}</span>, {{\'tab\':\'<span class="pill g">{s.t("k_gid", "0")}</span>\'}})}}}}</div></div>')
lent = (f'<div class="kort res" style="left:920px; top:90px; width:640px; padding:26px 30px">'
        f'<div class="zyme">{s.t("r_z", "Svetainėje")}</div>'
        f'<table style="width:100%; margin-top:18px; border-collapse:collapse; font-size:22px">'
        f'<tr style="background:var(--gs-green-th,#1c8d1f); color:#fff"><th style="padding:12px 14px; text-align:left">{s.t("r_c1", "Vardas, pavardė")}</th>'
        f'<th style="padding:12px 14px; text-align:left">{s.t("r_c2", "Pareigos")}</th></tr>'
        f'<tr><td style="padding:12px 14px">{s.t("r_n1", "Vincas Kudirka")}</td><td style="padding:12px 14px">{s.t("r_p1", "Pirmininkas")}</td></tr>'
        f'<tr style="background:#f6f8fa"><td style="padding:12px 14px">{s.t("r_n2", "Marija Pečkauskaitė")}</td><td style="padding:12px 14px">{s.t("r_p2", "Narė")}</td></tr>'
        f'</table></div>')
body = kodas + lent + f'<div class="rodykle" style="left:872px; top:210px; width:36px"></div>'
body += (f'<div class="kort" style="left:120px; top:420px; width:1440px; padding:24px 32px">'
         f'<div class="p">{s.t("kk", "Pirmas skaičius – failo numeris sistemoje, antras – lapo gID. Išsaugojus puslapį lentelė atsiranda iš karto.")}</div></div>')
add(s, page(s, body))
s.appear('.kod', 1.0, 'fadeUpMedium', 0.5)
s.appear('.res', 9.0, 'slinktisIsDesines', 0.6)
s.voice(1.0, 'Puslapyje lentelė įrašoma viena eilute.')
s.voice(5.0, 'Pirmas skaičius – failo numeris sistemoje, antras – lapo gID.')
s.voice(10.6, 'Išsaugojus puslapį, lankytojas mato jau sutvarkytą lentelę.')
s.voice(16.0, 'Jums šios eilutės rašyti nereikia – ją įdedame prijungdami lentelę.')
s.voice(20.9, 'Vėliau keičiasi tik duomenys faile.')
s.ekrane = 'Kairėje kortelė su kodu {{google_sheet(1, {\'tab\':\'0\'})}}, dešinėje – kaip ta pati lentelė atrodo svetainėje.'
s.komentaras = 'Publikuota pamoka § „Kaip įterpti lentelę į puslapį“. Sintaksė rodoma kaip paaiškinimas, ne kaip užduotis (Eimantas 2026-09-19).'


# ================================================================ 7. TVS modulis
s = Scene('06-tvs-modulis', 'Modulis sistemoje', 'Prijungti failai turi savo sąrašą', 24)
eil = [('1', 'Administracija – TABLE', True), ('2', 'Ugdymas – TABLE', True), ('3', 'Archyvas – TABLE', False)]
lenta = (f'<div class="kort mod" style="left:150px; top:70px; width:1380px; padding:30px 34px">'
         f'<div class="h">{s.t("m_h", "„Google Sheets“ lentelės")}</div>'
         f'<table style="width:100%; margin-top:24px; border-collapse:collapse; font-size:24px">'
         f'<tr style="color:var(--c-text-muted); font-size:21px; text-align:left">'
         f'<th style="padding:10px 14px; width:110px">{s.t("m_c1", "ID")}</th>'
         f'<th style="padding:10px 14px">{s.t("m_c2", "Pavadinimas")}</th>'
         f'<th style="padding:10px 14px; width:220px">{s.t("m_c3", "Enabled")}</th></tr>')
for i, (idv, pav, on) in enumerate(eil):
    zyma = f'<span class="varnele">✓</span>' if on else '<span style="color:#b0b7c3">—</span>'
    lenta += (f'<tr class="me{i}" style="background:{"#f6f8fa" if i % 2 else "#fff"}">'
              f'<td style="padding:14px"><span class="pill f kodas">{s.t("mi%d" % i, idv)}</span></td>'
              f'<td style="padding:14px">{s.t("mp%d" % i, pav)}</td><td style="padding:14px">{zyma}</td></tr>')
lenta += '</table></div>'
body = lenta + (f'<div class="kort" style="left:150px; top:430px; width:1380px; padding:26px 34px">'
                f'<div class="p">{s.t("mz", "ID sistema priskiria pati – būtent jį puslapis naudoja lentelei rasti. „Enabled“ rodo, ar failas veikia.")}</div></div>')
add(s, page(s, body))
s.appear('.mod', 0.8, 'fadeUpMedium', 0.5)
for i in range(3):
    s.visible('.me%d' % i, 4.0 + i * 2.2)
s.visible('.kort:last-child', 13.0)
s.voice(1.0, 'Turinio valdymo sistemoje prijungti failai turi savo sąrašą.')
s.voice(5.7, 'Kiekvienas atpažįstamas pagal pavadinimą, kurį suteikiame patys.')
s.voice(10.6, 'Numerį sistema priskiria pati – būtent jį puslapis naudoja lentelei rasti.')
s.voice(16.4, 'O žyma „Enabled“ rodo, ar failas veikia.')
s.voice(19.9, 'Išjungto failo lentelės nematyti.')
s.ekrane = 'Modulio lentelė su trimis prijungtais failais: ID, pavadinimas ir „Enabled“ varnelė; trečias išjungtas.'
s.komentaras = 'Publikuota pamoka § „Kaip atrodo lentelių modulis TVS“.'

# ================================================================ 8. Atsinaujinimas
s = Scene('07-atsinaujinimas', 'Kaip greitai atsinaujina', 'Pakeitimas svetainėje – per kelias sekundes', 20)
body = (f'<div class="kort a0" style="left:150px; top:80px; width:560px; height:220px; padding:30px 34px">'
        f'<div class="zyme">{s.t("a_z1", "Lentelėje")}</div>'
        f'<div class="h" style="margin-top:18px">{s.t("a_t1", "Pataisote langelį")}</div></div>'
        f'<div class="rodykle" style="left:730px; top:180px; width:180px"></div>'
        f'<div class="kort a1" style="left:940px; top:80px; width:560px; height:220px; padding:30px 34px">'
        f'<div class="zyme">{s.t("a_z2", "Svetainėje")}</div>'
        f'<div class="h" style="margin-top:18px; color:var(--gs-green-th,#1c8d1f)">{s.t("a_t2", "Matyti po kelių sekundžių")}</div></div>')
tikr = [('Ar ta pati lentelė?', 'gal redaguojate kitą failą ar lapą'),
        ('Ar išėjote iš langelio?', 'atnaujinimas išsiunčiamas baigus redaguoti')]
for i, (h, p) in enumerate(tikr):
    body += (f'<div class="kort t{i}" style="left:{150 + i * 700}px; top:380px; width:640px; padding:26px 30px">'
             f'<div class="h" style="font-size:26px">{s.t("th%d" % i, h)}</div>'
             f'<div class="p" style="margin-top:12px; font-size:23px">{s.t("tp%d" % i, p)}</div></div>')
add(s, page(s, body))
s.appear('.a0', 0.8, 'slinktisIsKaires', 0.5)
s.appear('.a1', 4.4, 'slinktisIsDesines', 0.5)
s.appear('.t0', 10.0, 'fadeUpLight', 0.5)
s.appear('.t1', 14.2, 'fadeUpLight', 0.5)
s.voice(1.0, 'Pataisius langelį, svetainė atsinaujina pati.')
s.voice(5.0, 'Dažniausiai tai trunka kelias sekundes.')
s.voice(9.0, 'Jei pakeitimo nematyti, tikrinkite du dalykus.')
s.voice(12.9, 'Ar redaguojate tą pačią prijungtą lentelę.')
s.voice(16.5, 'Ir ar tikrai išėjote iš langelio.')
s.ekrane = 'Dvi kortelės su rodykle: „Pataisote langelį“ → „Matyti po kelių sekundžių“. Žemiau dvi patikros.'
s.komentaras = 'Publikuota pamoka § „Kaip greitai veikia duomenų atsinaujinimas“.'

# ================================================================ 9. Taisyklės lapui
s = Scene('08-duomenu-baze', 'Lentelė yra duomenų bazė', 'Svarbu tvarka, ne stilius', 29)
ne = ['perkėlimo į naują eilutę langelyje', 'formulių', 'sujungtų langelių']
taip = ['A stulpelio žymos', 'vienas formatas vienai eilutei', 'paruošta stulpelių struktūra']
body = ''
for j, (pav, sar, bg, br, zn) in enumerate([('Netinka', ne, '#fdecec', '#b3261e', '✕'), ('Tinka', taip, '#eaf5ec', '#1c8d1f', '✓')]):
    body += (f'<div class="kort d{j}" style="left:{140 + j * 800}px; top:60px; width:640px; height:380px; padding:32px 36px; background:{bg}; border-color:{br}">'
             f'<div class="h" style="color:{br}">{s.t("dh%d" % j, pav)}</div>')
    for i, x in enumerate(sar):
        body += (f'<div class="p d{j}i{i}" style="margin-top:24px; color:var(--c-text)">'
                 f'<span style="color:{br}; font-weight:700">{zn}</span> {s.t("d%di%d" % (j, i), x)}</div>')
    body += '</div>'
body += (f'<div class="kort" style="left:140px; top:490px; width:1440px; padding:26px 34px">'
         f'<div class="p">{s.t("dz", "Lentelė čia veikia kaip duomenų bazė: sudėtingesnis formatavimas svetainėje tiesiog nesimato.")}</div></div>')
add(s, page(s, body))
s.appear('.d0', 0.8, 'slinktisIsKaires', 0.5)
s.appear('.d1', 11.0, 'slinktisIsDesines', 0.5)
for j in range(2):
    for i in range(3):
        s.visible('.d%di%d' % (j, i), (2.4 if j == 0 else 12.4) + i * 2.4)
s.voice(1.0, 'Lentelė čia veikia kaip duomenų bazė – svarbiausia tvarka, ne stilius.')
s.voice(6.4, 'Langelyje neturi būti nei perkėlimo į naują eilutę, nei formulių, nei sujungtų langelių.')
s.voice(13.5, 'Tinka tai, kas paruošta: A stulpelio žymos ir vienas formatas vienai eilutei.')
s.voice(20.3, 'Sudėtingesnis formatavimas svetainėje nesimato.')
s.voice(24.2, 'Todėl šabloną verta palikti tokį, koks yra.')
s.ekrane = 'Dvi kortelės: raudona „Netinka“ su trimis draudimais ir žalia „Tinka“ su trimis leidžiamais dalykais.'
s.komentaras = 'Publikuota pamoka § „Google Sheets lapų redagavimas“. Formuluotės sušvelnintos (Eimantas 2026-09-17: „nekeiskite“ skamba per griežtai).'


# ================================================================ 10. Lapų tvarka
s = Scene('09-lapu-tvarka', 'Lapų tvarka', 'Pirmas lapas lieka pirmas', 21)
lapai = [('Gimnazijos taryba', 'gID = 0', True), ('Mokytojų sąrašas', 'gID = 1890969320', False),
         ('Darbo užmokestis', 'gID = 1753601957', False)]
body = ''
for i, (pav, gid, pirmas) in enumerate(lapai):
    br = '#1c8d1f' if pirmas else '#dfe3ea'
    body += (f'<div class="kort lp{i}" style="left:{130 + i * 490}px; top:120px; width:440px; padding:28px 30px; border-color:{br}; border-width:{3 if pirmas else 1.5}px">'
             f'<div class="h" style="font-size:26px">{s.t("lh%d" % i, pav)}</div>'
             f'<div class="kodas pill g" style="margin-top:18px">{s.t("lg%d" % i, gid)}</div>'
             + (f'<div class="p" style="margin-top:18px; color:#1b5e20; font-size:22px">{s.t("lz", "numatytasis – vietos nekeisti")}</div>' if pirmas else '')
             + '</div>')
body += (f'<div class="kort" style="left:130px; top:400px; width:1420px; padding:26px 34px">'
         f'<div class="p">{s.t("lk", "Kitus lapus galima perkelti, pervadinti ar išdėlioti kitaip – sistema juos atpažįsta pagal gID, ne pagal vietą.")}</div></div>')
add(s, page(s, body))
for i in range(3):
    s.appear('.lp%d' % i, 1.0 + i * 3.2, 'fadeUpMedium', 0.5)
s.visible('.kort:last-child', 12.0)
s.voice(1.0, 'Pirmas lapas visada turi gID nulis.')
s.voice(5, 'Jo vietos keisti nereikėtų – svetainė jį atpažįsta būtent pagal šį numerį.')
s.voice(11, 'Kitus lapus galima perkelti ar pervadinti laisvai.')
s.voice(15.0, 'Sistema juos atpažįsta pagal gID, ne pagal vietą.')
s.ekrane = 'Trys lapų kortelės su gID reikšmėmis; pirmoji apvesta žaliai su prierašu „numatytasis – vietos nekeisti“.'
s.komentaras = 'Publikuota pamoka § „Apie lapų tvarką ir gID reikšmes“.'

# ================================================================ 11. Kaip organizuoti failus
s = Scene('10-organizavimas', 'Keli failai pagal atsakomybes', 'Ne vienas didelis, o keli aiškūs', 23)
fail = [('Administracija', ['gimnazijos taryba', 'komisijos', 'darbo užmokestis'], '#e8f0fe', '#0b57d0'),
        ('Ugdymas', ['klasių komplektai', 'pamokų tvarkaraštis', 'mokytojų sąrašas'], '#eaf5ec', '#1c8d1f')]
body = ''
for j, (pav, sar, bg, br) in enumerate(fail):
    body += (f'<div class="kort f{j}" style="left:{150 + j * 780}px; top:70px; width:640px; height:330px; padding:32px 36px; background:{bg}; border-color:{br}">'
             f'<div class="h" style="color:{br}">{s.t("fh%d" % j, pav)}</div>')
    for i, x in enumerate(sar):
        body += f'<div class="p" style="margin-top:20px">{s.t("f%di%d" % (j, i), x)}</div>'
    body += '</div>'
prie = [('Aiškumas', 'matosi, kuris failas kam priklauso'), ('Saugumas', 'klaida paliečia tik vieną failą'),
        ('Bendradarbiavimas', 'skirtingi žmonės dirba netrukdydami')]
for i, (h, p) in enumerate(prie):
    body += (f'<div class="kort p{i}" style="left:{150 + i * 480}px; top:450px; width:440px; padding:24px 28px">'
             f'<div class="h" style="font-size:25px">{s.t("ph%d" % i, h)}</div>'
             f'<div class="p" style="margin-top:10px; font-size:22px">{s.t("pp%d" % i, p)}</div></div>')
add(s, page(s, body))
s.appear('.f0', 0.8, 'slinktisIsKaires', 0.5)
s.appear('.f1', 4.6, 'slinktisIsDesines', 0.5)
for i in range(3):
    s.appear('.p%d' % i, 10.0 + i * 3.0, 'fadeUpLight', 0.5)
s.voice(1.0, 'Visas lenteles galima sudėti į vieną failą, bet patogiau skaidyti pagal atsakomybes.')
s.voice(7.4, 'Pavyzdžiui, administracijos ir ugdymo lentelės gyvena atskirai.')
s.voice(12.6, 'Taip aišku, kuris failas kam priklauso,')
s.voice(15.8, 'klaida paliečia tik vieną failą,')
s.voice(18.3, 'o skirtingi žmonės dirba vienas kitam netrukdydami.')
s.ekrane = 'Du failai – „Administracija“ ir „Ugdymas“ – su savo lentelių sąrašais; apačioje trys privalumai.'
s.komentaras = 'Publikuota pamoka § „Kaip organizuoti failus“. Sutampa su pradžiamokslio žinute, kad atsakomybėmis galima dalytis.'

# ================================================================ 12. Ką matote šablone
s = Scene('11-sablonas', 'Ką matote atidarę', 'Darbas jau pradėtas – lieka duomenys', 21)
body = (f'<div class="failas" style="left:170px; top:60px; width:660px; height:340px">'
        f'<div class="vidus">{s.t("s_l", "Paruoštas failas")}</div>'
        f'<div class="lapai"><span>{s.t("s0", "Taryba")}</span><span>{s.t("s1", "Komisijos")}</span>'
        f'<span>{s.t("s2", "Užmokestis")}</span></div></div>')
pr = [('Lapai dažniausioms lentelėms', 'taryba, komisijos, darbo užmokestis'),
      ('Antraštės ir stulpeliai', 'struktūra jau sudėliota'),
      ('Minimalus formatavimas', 'pritaikytas svetainei')]
for i, (h, p) in enumerate(pr):
    body += (f'<div class="kort r{i}" style="left:900px; top:{50 + i * 130}px; width:660px; padding:22px 28px">'
             f'<div class="h" style="font-size:25px">{s.t("rh%d" % i, h)}</div>'
             f'<div class="p" style="margin-top:8px; font-size:22px">{s.t("rp%d" % i, p)}</div></div>')
body += (f'<div class="kort" style="left:170px; top:470px; width:1390px; padding:24px 32px">'
         f'<div class="p">{s.t("sz", "Jei kurios nors lentelės nereikia – tiesiog jos nepildote.")}</div></div>')
add(s, page(s, body))
s.appear('.failas', 0.8, 'fadeUpMedium', 0.6)
for i in range(3):
    s.appear('.r%d' % i, 4.6 + i * 3.4, 'slinktisIsDesines', 0.5)
s.visible('.kort:last-child', 15.0)
s.voice(1.0, 'Atidarę failą matote, kad darbas jau pradėtas.')
s.voice(5.0, 'Lapai paruošti dažniausioms lentelėms: taryba, komisijos, darbo užmokestis.')
s.voice(11.0, 'Antraštės ir stulpeliai jau sudėlioti – lieka duomenys.')
s.voice(15.7, 'O jei kurios nors lentelės nereikia, tiesiog jos nepildote.')
s.ekrane = 'Paruoštas failas su trimis lapais; dešinėje trys kortelės apie tai, kas jau padaryta.'
s.komentaras = 'Publikuota pamoka § „Ką matote atidarę šabloną“.'

# ================================================================ 13. Kur toliau
s = Scene('12-kur-toliau', 'Kur toliau', 'Dar dvi pamokos ta pačia tema', 16)
kort = [('Google Sheets pradžiamokslis', 'kaip tvarkyti lenteles: lapai, eilutės, spalvos'),
        ('Lentelių kūrimo principai', 'kaip lentelė turi atrodyti, kad būtų suprantama')]
body = ''
for i, (h, p) in enumerate(kort):
    body += (f'<div class="kort v{i}" style="left:{160 + i * 720}px; top:120px; width:640px; padding:34px 38px">'
             f'<div class="zyme">{s.t("vz%d" % i, "Pamoka")}</div>'
             f'<div class="h" style="margin-top:16px">{s.t("vh%d" % i, h)}</div>'
             f'<div class="p" style="margin-top:16px">{s.t("vp%d" % i, p)}</div></div>')
body += (f'<div class="kort" style="left:160px; top:420px; width:1360px; padding:26px 34px; text-align:center">'
         f'<div class="p">{s.t("vk", "Jei dar nežiūrėjote – būtinai peržiūrėkite ir jas.")}</div></div>')
add(s, page(s, body))
s.appear('.v0', 1.0, 'slinktisIsKaires', 0.5)
s.appear('.v1', 5.0, 'slinktisIsDesines', 0.5)
s.visible('.kort:last-child', 9.4)
s.voice(1.0, 'Ta pačia tema turime dar dvi pamokas.')
s.voice(4.6, 'Pradžiamokslis parodo, kaip tvarkyti pačias lenteles.')
s.voice(9.4, 'O lentelių kūrimo principai – kaip lentelė turi atrodyti, kad būtų suprantama.')
s.ekrane = 'Dvi pamokų kortelės ir kvietimas jas peržiūrėti.'
s.komentaras = 'Eimantas 2026-09-19: kiekvieno filmuko gale siūlyti kitus — „Būtinai pažiūrėkite ir tokį ir tokį video, jei dar nežiūrėjote“.'

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
    block = "  // >>> GS-INTEGRACIJA (generuoja lessons/google-sheets-integracija-explaineris/build_scenes.py — ranka neredaguoti)\n"
    for s, _ in SCENES:
        cssx = shared + '\n'.join('    ' + c for c in s.css)
        block += f"  '{s.file}': `\n    .card > .title {{ opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }}\n{cssx}\n  `,\n"
    block += "  // <<< GS-INTEGRACIJA\n"
    p = os.path.join(ILL, 'generate-video-clips.js')
    js = open(p, encoding='utf-8').read()
    if '// >>> GS-INTEGRACIJA' in js:
        js = re.sub(r"  // >>> GS-INTEGRACIJA.*?  // <<< GS-INTEGRACIJA\n", lambda m: block, js, flags=re.S)
    else:
        js = js.replace("const TEMPLATE_ANIMATIONS = {\n", "const TEMPLATE_ANIMATIONS = {\n" + block, 1)
    open(p, 'w', encoding='utf-8').write(js)

    # scenarijus
    total = sum(s.D for s, _ in SCENES)
    full = total + 10 + int((len(SCENES) - 1) * 3.2)
    md = [f"# Video scenarijus: „Google Sheets“ integracija: kaip lentelė atsiranda svetainėje", "",
          "**Formatas:** „kur spausti“ filmukas, balsas sakiniais su laiko žymomis, garsai, foninė muzika",
          "**Balsas:** ElevenLabs `eleven_v3_dpo_20260217`, balsas `eqJHjeWMPGJFD6VBf1J2`, greitis 0.9",
          "⛔ **Balsas SUPLANUOTAS, NESUGENERUOTAS.** Dariaus balso be Eimanto žinios nenaudojame (2026-09-17).",
          f"**Trukmė:** {total} sek. be intro, outro ir skirtukų (~{full // 60}:{full % 60:02d} su jais)",
          "**Šaltinis:** `build_scenes.py` — scenarijų, šablonus, tekstus ir animacijas generuoja jis; ranka neredaguoti.",
          "**Šaltinis:** publikuota pamoka (WP `kursai/1654`)", "", "---", "",
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
    vo = ['# „Google Sheets“ integracija – balso tekstas (lt)', '',
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
        kelias = [os.path.join(HERE, 'content'), os.path.join(HERE, 'video', 'balso-tekstas-lt.md')]
        p = subprocess.run(['python3', r] + kelias, capture_output=True, text=True)
        eilute = [l for l in p.stdout.split('\n') if 'Iš viso' in l]
        if eilute:
            print('redaktorius: ' + re.sub(r'\x1b\[[0-9;]*m', '', eilute[0]).replace('Iš viso:', '').strip())
        if p.returncode == 1 and '--tyliai' not in sys.argv:
            print('  (detaliau: python3 $R ' + os.path.relpath(HERE, ILL) + ')')

    print(f"scenos: {len(SCENES)} | trukmė {total}s (~{full // 60}:{full % 60:02d}) | balso rizikos: {problems or 'nėra'}")


if __name__ == '__main__':
    main()
