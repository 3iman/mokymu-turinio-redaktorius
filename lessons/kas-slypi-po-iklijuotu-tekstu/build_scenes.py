# -*- coding: utf-8 -*-
"""
„Kas slypi po įklijuotu tekstu“ — scenų generatorius.

Vienas šaltinis visai pamokai: iš jo gimsta
  templates/*.html          — šablonai su {{kintamaisiais}}
  content/lt.json           — visi ekrano tekstai
  generate-video-clips.js   — animacijos (blokas tarp žymų IKLIJUOTAS-TEKSTAS)

Svetainės imitacija piešiama pagal tikrą temą, išmatuotą skeletone 2026-10-11:
  puslapio tekstas Roboto #5f5f5f, antraštė #373737,
  „Baltai ant juodo“ režime fonas ir tekstas #373737 / #fff,
  kontrasto skydelis — kairėje, fiksuotas.
Antraštė, meniu juosta ir skydelis — TIKROS TEMOS NUOTRAUKOS (capture_header.js → illustrations/assets/iklijuotas-*):
Eimantas 2026-10-11 — antraštė yra dizaino sistemos išskirtinumas, ją rodome tiksliai. Mokykla — „Miesto gimnazija“,
skydas be simbolių. Meniu juosta pilka, ne žalia (žalia ne visose svetainėse — navigacijos filmuko taisyklė).

Pagrindinis stilius = galutinė būsena, animacija veda iki jos (ANIMATION_PRINCIPLES §14).

Paleidimas: python3 build_scenes.py
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ILL = os.path.abspath(os.path.join(HERE, '..', '..'))
CUR = json.load(open(os.path.join(HERE, '..', 'google-sheets-pradziamokslis', 'cursor_svgs.json'), encoding='utf-8'))
HEAD_META = json.load(open(os.path.join(ILL, 'assets', 'iklijuotas-antraste.json'), encoding='utf-8'))

# ---------------------------------------------------------------- spalvos (išmatuota skeletone)
SITE_TEXT, SITE_H = '#5f5f5f', '#373737'
DARK = '#373737'
PAGE_BG = '#f2f2f2'
WORD_NAVY = '#1F3864'

# ---------------------------------------------------------------- geometrija (naršyklės lango koordinatės)
BW_W, BW_H = 1500, 800
BAR_H = 52
SCALE = BW_W / HEAD_META['vw']      # svetainė nufotografuota 1280 px pločio → ×1,17
HEAD = {k: HEAD_META[k] * SCALE for k in ('normalus', 'dydis-1', 'dydis-2')}
# išdėstymas — iš tikros temos (capture_header.js matuoja tuo pačiu pločiu kaip antraštę)
LEFT, CARD_W = HEAD_META['card'][0] * SCALE, HEAD_META['card'][2] * SCALE
SIDE_L, SIDE_W = HEAD_META['side'][0] * SCALE, HEAD_META['side'][2] * SCALE
ACC_TOP, ACC_W = round(343 * SCALE), round(53 * SCALE)    # skydelis: tikroje temoje y 343, plotis 53
ACC_PITCH = 161 / 3 * SCALE                               # trys mygtukai = 161 css
BTN_CONTRAST = (ACC_W / 2, ACC_TOP + ACC_PITCH / 2)       # .site koordinatės; kursoriui + BAR_H
BTN_SIZE = (ACC_W / 2, ACC_TOP + ACC_PITCH * 1.5)
P_PX, H1_PX = 22, 36                # svetainės pastraipa ir antraštė įprastu dydžiu (tikra: 15 ir 30 px × 1,17)
SIZE_K = {'normalus': 1, 'dydis-1': 32 / 30, 'dydis-2': 35 / 30}   # išmatuota: 30 → 32 → 35 px
CARD_TOP = 84                       # kortelės viršus nuo puslapio (po meniu juosta) pradžios
MARK = (LEFT + 50 - 18, CARD_TOP + 44 + 35 + 22 - 16, CARD_W - 100 + 36, 214)   # Word pastraipa + lentelė (.s-page koord.); redaktoriaus pastraipa — 1 eilutė

CONTENT = {"lang": "lt", "_intro": {"title": "Kas slypi po įklijuotu tekstu"}}
ANIMS = {}


def kf(name, D, steps, prop_fn):
    """Laiko žymos → @keyframes su procentais. steps: [(t, reikšmė), …]; prieš pirmą žymą — pirmoji reikšmė."""
    rows = [f'0% {{ {prop_fn(steps[0][1])} }}']
    for t, v in steps:
        rows.append(f'{100 * t / D:.3f}% {{ {prop_fn(v)} }}')
    rows.append(f'100% {{ {prop_fn(steps[-1][1])} }}')
    return f'@keyframes {name} {{ ' + ' '.join(rows) + ' }'


# ---------------------------------------------------------------- svetainės imitacija
SITE_CSS = f"""
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  .card {{ padding: 40px 120px 56px; }}
  .title {{ margin-bottom: 30px; }}
  .bw-wrap {{ position: relative; width: {BW_W}px; margin: 0 auto; }}
  .bw {{ position: relative; width: {BW_W}px; height: {BW_H}px; border-radius: 18px;
         overflow: hidden; background: #fff; box-shadow: var(--c-shadow-card), 0 0 0 1.5px var(--c-border); }}
  .bw-bar {{ height: {BAR_H}px; background: #eef1f6; display: flex; align-items: center; gap: 10px; padding: 0 20px;
             border-bottom: 1.5px solid var(--c-border); }}
  .bw-bar i {{ width: 14px; height: 14px; border-radius: 50%; background: #cbd5e1; }}
  .bw-url {{ margin-left: 16px; flex: 1; height: 32px; border-radius: 8px; background: #fff; font-size: 20px;
             color: var(--c-text-muted); display: flex; align-items: center; padding: 0 16px; }}

  .site {{ position: absolute; left: 0; top: {BAR_H}px; width: {BW_W}px; height: {BW_H - BAR_H}px; overflow: hidden;
           font-family: 'Roboto', sans-serif; background: {PAGE_BG}; }}
  .s-scroll {{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; }}
  .s-head {{ position: absolute; left: 0; top: 0; width: 100%; }}
  .s-head img {{ position: absolute; left: 0; top: 0; width: 100%; height: auto; opacity: 0; }}
  .s-page {{ position: absolute; left: 0; top: {HEAD['normalus']}px; width: 100%; height: 1000px; background: {PAGE_BG}; }}
  .s-h1 {{ position: absolute; left: {LEFT}px; top: 24px; font-size: {H1_PX}px; font-weight: 700; color: {SITE_H}; }}
  .s-card {{ position: absolute; left: {LEFT}px; top: {CARD_TOP}px; width: {CARD_W}px; height: 700px; background: #fff;
             padding: 44px 50px; border: 1px solid #ddd; }}
  .s-p {{ position: relative; font-size: {P_PX}px; line-height: 1.6; color: {SITE_TEXT}; margin-bottom: 22px; }}
  .s-side {{ position: absolute; left: {SIDE_L}px; top: {CARD_TOP}px; width: {SIDE_W}px; }}
  .s-side div {{ height: 62px; background: {SITE_H}; border-bottom: 1px solid #555; display: flex; align-items: center;
                 gap: 16px; padding-left: 18px; }}
  .s-side div::before {{ content: ''; width: 26px; height: 26px; border: 2.5px solid #fff; border-radius: 4px; }}
  .s-side div::after {{ content: ''; width: 120px; height: 10px; border-radius: 5px; background: #fff; opacity: .8; }}

  /* Įklijuota iš Word — stiliai „įsiūti“ į pačius elementus, todėl režimas ir dydis jų nepakeičia */
  .w-p {{ position: relative; font-family: Calibri, 'Times New Roman', serif; font-size: 22px; line-height: 1.35; margin-bottom: 26px; }}
  .w-t {{ position: relative; border-collapse: collapse; font-family: Calibri, 'Times New Roman', serif; font-size: 21px; }}
  .w-t td {{ border: 1px solid #000; padding: 8px 18px; color: #000; }}
  .w-t tr:first-child td {{ background: #D9E2F3; font-weight: 700; }}
  .w-target {{ z-index: 7; }}

  /* Skydelis */
  .acc {{ position: absolute; left: 0; top: {ACC_TOP}px; width: {ACC_W}px; z-index: 4; }}
  .acc img {{ position: absolute; left: 0; top: 0; width: {ACC_W}px; opacity: 0; }}
  .tip {{ position: absolute; left: {ACC_W + 12}px; z-index: 8; background: #222; color: #fff; opacity: 0;
          font-family: 'Roboto', sans-serif; font-size: 22px; padding: 9px 16px; border-radius: 6px; white-space: nowrap; }}
  .tip::before {{ content: ''; position: absolute; left: -8px; top: 50%; margin-top: -8px;
                  border: 8px solid transparent; border-left: 0; border-right-color: #222; }}

  .dim {{ position: absolute; inset: 0; background: rgba(12, 16, 26, .62); z-index: 5; }}
  .mark {{ position: absolute; z-index: 6; border: 4px solid var(--c-red-solid); border-radius: 10px; background: {DARK}; }}
  .say {{ position: absolute; z-index: 9; background: var(--c-surface); color: var(--c-red-text);
          font-family: 'Inter', sans-serif; font-size: 26px; font-weight: 700; padding: 12px 20px; border-radius: 12px;
          box-shadow: var(--c-shadow-card); white-space: nowrap; }}

  .cursor-wrap {{ position: absolute; left: 0; top: 0; z-index: 9; width: 44px; height: 56px; pointer-events: none; }}
  .cursor-wrap svg {{ width: 44px; height: 56px; }}
  .rip {{ position: absolute; z-index: 8; width: 64px; height: 64px; margin: -32px 0 0 -32px; border-radius: 50%;
          background: rgba(66, 133, 244, .45); opacity: 0; }}
"""

HEAD_IMGS = (('h-n', 'antraste-normalus'), ('h-b', 'antraste-juodai-ant-balto'), ('h-d', 'antraste-baltai-ant-juodo'),
             ('h-s1', 'antraste-dydis-1'), ('h-s2', 'antraste-dydis-2'))
ACC_IMGS = (('a-n', 'kontrastas-normalus'), ('a-b', 'kontrastas-juodai-ant-balto'), ('a-d', 'kontrastas-baltai-ant-juodo'),
            ('a-s1', 'kontrastas-dydis-1'), ('a-s2', 'kontrastas-dydis-2'))


DEFAULT_CARD = f"""
            <p class="s-p">{{{{p_editor}}}}</p>
            <p class="w-p w-target" style="color:#000000"><span style="color:{WORD_NAVY}; font-weight:700">{{{{w_lead}}}}</span> {{{{w_text}}}}</p>
            <table class="w-t w-target">
              <tr><td>{{{{t_h1}}}}</td><td>{{{{t_h2}}}}</td></tr>
              <tr><td>{{{{t_r1a}}}}</td><td>{{{{t_r1b}}}}</td></tr>
              <tr><td>{{{{t_r2a}}}}</td><td>{{{{t_r2b}}}}</td></tr>
            </table>"""


def site_html(extra='', card=None):
    heads = ''.join(f'<img class="{c}" src="assets/iklijuotas-{f}.png">' for c, f in HEAD_IMGS)
    accs = ''.join(f'<img class="{c}" src="assets/iklijuotas-{f}.png">' for c, f in ACC_IMGS)
    return f"""
    <div class="bw">
      <div class="bw-bar"><i></i><i></i><i></i><div class="bw-url">{{{{url}}}}</div></div>
      <div class="site">
        <div class="s-scroll">
        <div class="s-head">{heads}</div>
        <div class="s-page">
          <div class="s-h1">{{{{h1}}}}</div>
          <div class="s-card">{card or DEFAULT_CARD}
          </div>
          <div class="s-side"><div></div><div></div><div></div><div></div></div>
        </div>
        </div>
        <div class="acc">{accs}</div>
        {extra}
      </div>
    </div>"""


SITE_TEXTS = {
    "url": "mokykla.lt/rudens-atostogos",
    "h1": "Rudens atostogos",
    "p_editor": "Atostogų metu mokyklos biblioteka dirba, o mokiniai gali pasiimti knygų skaitymui namuose.",
    "w_lead": "Svarbu:",
    "w_text": "per atostogas biblioteka dirba trumpiau.",
    # ⛔ ne darbo grafikas: jiems leidžiamas <strong> vietoje <th> (Eimantas 2026-10-11), todėl jo „taisymas“ būtų klaidingas pavyzdys
    "t_h1": "Data", "t_h2": "Renginys",
    "t_r1a": "Spalio 28 d.", "t_r1b": "Knygų mainų mugė",
    "t_r2a": "Spalio 30 d.", "t_r2b": "Garsiųjų skaitymų popietė",
}

# galutinės būsenos (statinis kadras = paskutinė animacijos būsena)
STATE_NORMAL = '  .s-head .h-n, .acc .a-n { opacity: 1; }\n'
STATE_DARK = (f'  .s-head .h-d, .acc .a-d {{ opacity: 1; }}\n'
              f'  .site, .s-page, .s-card {{ background-color: {DARK}; }}\n'
              f'  .s-card {{ border-color: #555; }}\n'
              f'  .s-side div {{ background-color: {DARK}; }}\n'
              f'  .s-h1, .s-p {{ color: #fff; }}\n')


def page(css, body):
    return f"""<!DOCTYPE html>
<html lang="{{{{lang}}}}">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./tokens/tokens.css">
<link rel="stylesheet" href="./tokens/base.css">
<style>{css}</style>
</head>
<body>
  <div class="card">
{body}
  </div>
</body>
</html>
"""


def scene_body(extra='', over='', card=None):
    return (f'    <div class="title">{{{{title}}}}</div>\n'
            f'    <div class="bw-wrap">{site_html(extra, card)}<div class="cursor-wrap">{CUR["arrow"]}</div>{over}</div>')


def intro_anims(a):
    a.append('.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }')
    a.append('.bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }')


def cursor_anim(a, nm, D, path):
    a.append(f'.cursor-wrap {{ animation: {nm} {D}s linear 0s both; }}')
    a.append(kf(nm, D, path, lambda p: f'transform: translate({p[0]}px, {p[1]}px); animation-timing-function: cubic-bezier(.35,.05,.25,1);'))


def timeline(a, prefix, D, sel, prop, steps):
    nm = prefix + '_' + re.sub(r'[^a-z0-9]', '', sel + prop)
    a.append(f'{sel} {{ animation: {nm} {D}s linear 0s both; }}')
    a.append(kf(nm, D, steps, lambda v: f'{prop}: {v};'))


# ---------------------------------------------------------------- 01 Atrodo tvarkingai
def scene_01():
    name, D = '01-atrodo-tvarkingai', 14
    CONTENT[name.replace('-', '_')] = dict(SITE_TEXTS, title="Iš pirmo žvilgsnio – tvarkinga")
    css = SITE_CSS + STATE_NORMAL + '  .cursor-wrap { transform: translate(1040px, 660px); }\n'
    write_template(name, page(css, scene_body()))
    a = []
    intro_anims(a)
    # kursorius ramiai „skaito“: redaktoriaus pastraipa → Word pastraipa → lentelė; jokių žymų
    y0 = BAR_H + HEAD['normalus'] + CARD_TOP + 44
    cursor_anim(a, 'k01', D, [(0, (1040, 700)), (2.0, (1040, 700)), (3.4, (720, y0 + 30)), (5.6, (900, y0 + 52)),
                              (7.0, (640, y0 + 124)), (9.0, (560, y0 + 230)), (10.6, (1040, 660))])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 02 Baltai ant juodo
def scene_02():
    name, D = '02-baltai-ant-juodo', 15
    CONTENT[name.replace('-', '_')] = dict(SITE_TEXTS, title="Įjungus kontrastą",
                                           tip_1="Juodai ant balto", tip_2="Baltai ant juodo",
                                           say="Įklijuotas tekstas nepaklūsta")
    cx, cy = BTN_CONTRAST
    mark_box = (MARK[0], HEAD['normalus'] + MARK[1], MARK[2], MARK[3])   # .site koordinatės
    tip_top = ACC_TOP + ACC_PITCH / 2 - 22
    extra = (f'<div class="dim"></div>'
             f'<div class="tip tip-1" style="top:{tip_top}px">{{{{tip_1}}}}</div><div class="tip tip-2" style="top:{tip_top}px">{{{{tip_2}}}}</div>'
             f'<div class="rip r1" style="left:{cx}px; top:{cy}px"></div><div class="rip r2" style="left:{cx}px; top:{cy}px"></div>'
             f'<div class="mark" style="left:{mark_box[0]}px; top:{mark_box[1]}px; width:{mark_box[2]}px; height:{mark_box[3]}px"></div>'
             f'<div class="say" style="right:{BW_W - (mark_box[0] + mark_box[2]) + 24}px; top:{mark_box[1] + 24}px">{{{{say}}}}</div>')
    css = SITE_CSS + STATE_DARK + '  .cursor-wrap { transform: translate(1180px, 700px); }\n'
    write_template(name, page(css, scene_body(extra)))

    T1, T2, T_SPOT = 3.4, 5.0, 7.4
    a = []
    intro_anims(a)
    cursor_anim(a, 'k02', D, [(0, (760, 620)), (1.8, (760, 620)), (2.9, (cx - 6, cy + BAR_H - 4)),
                              (5.8, (cx - 6, cy + BAR_H - 4)), (6.8, (1180, 700))])
    a.append(f'.r1 {{ animation: ratilasIK 0.6s ease-out {T1}s forwards; }}')
    a.append(f'.r2 {{ animation: ratilasIK 0.6s ease-out {T2}s forwards; }}')
    a.append('@keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }')
    # užuominos rodo, ką padarys KITAS paspaudimas (kaip tikroje temoje)
    timeline(a, 'm02', D, '.tip-1', 'opacity', [(2.9, 0), (3.1, 1), (T1, 1), (T1 + 0.15, 0)])
    timeline(a, 'm02', D, '.tip-2', 'opacity', [(T1 + 0.3, 0), (T1 + 0.5, 1), (T2, 1), (T2 + 0.15, 0)])

    def mode(sel, normal, black, dark, prop):
        timeline(a, 'm02', D, sel, prop, [(T1, normal), (T1 + 0.3, black), (T2, black), (T2 + 0.5, dark)])
    mode('.site', PAGE_BG, '#ffffff', DARK, 'background-color')
    for sel, ons in (('.h-n', (1, 0, 0)), ('.h-b', (0, 1, 0)), ('.h-d', (0, 0, 1)),
                     ('.a-n', (1, 0, 0)), ('.a-b', (0, 1, 0)), ('.a-d', (0, 0, 1))):
        mode(sel, ons[0], ons[1], ons[2], 'opacity')
    mode('.s-page', PAGE_BG, '#ffffff', DARK, 'background-color')
    mode('.s-card', '#ffffff', '#ffffff', DARK, 'background-color')
    mode('.s-side div', SITE_H, '#000000', DARK, 'background-color')
    mode('.s-h1', SITE_H, '#000000', '#ffffff', 'color')
    mode('.s-p', SITE_TEXT, '#000000', '#ffffff', 'color')
    # dėmesys: pritemsta viskas, išskyrus įklijuotą tekstą
    timeline(a, 'm02', D, '.dim', 'opacity', [(T_SPOT, 0), (T_SPOT + 0.5, 1)])
    timeline(a, 'm02', D, '.mark', 'opacity', [(T_SPOT, 0), (T_SPOT + 0.5, 1)])
    a.append(f'.say {{ opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) {T_SPOT + 0.7}s forwards; }}')
    ox, oy = mark_box[0] + mark_box[2] / 2, BAR_H + mark_box[1] + mark_box[3] / 2
    a.append(f'.bw-wrap {{ transform-origin: {ox}px {oy}px; animation: zoom02 {D}s linear 0s both; }}')
    a.append(kf('zoom02', D, [(T_SPOT, 1), (T_SPOT + 0.8, 1.05)],
                lambda v: f'transform: scale({v}); animation-timing-function: cubic-bezier(.4,0,.2,1);'))
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 03 Padidinus raides
def scene_03():
    name, D = '03-didinimas', 13
    CONTENT[name.replace('-', '_')] = dict(SITE_TEXTS, title="Padidinus raides",
                                           tip_1="Dydis 1", tip_2="Dydis 2",
                                           lg_grow="Svetainės tekstas didėja", lg_stay="Įklijuotas lieka toks pat")
    cx, cy = BTN_SIZE
    tip_top = ACC_TOP + ACC_PITCH * 1.5 - 22
    SCROLL = 0                          # 1280 px plotyje antraštė auga mažiau — lentelė telpa ir be slinkimo
    extra = (f'<div class="tip tip-1" style="top:{tip_top}px">{{{{tip_1}}}}</div><div class="tip tip-2" style="top:{tip_top}px">{{{{tip_2}}}}</div>'
             f'<div class="rip r1" style="left:{cx}px; top:{cy}px"></div><div class="rip r2" style="left:{cx}px; top:{cy}px"></div>')
    extra += (f'<div class="legend"><span class="lg lg-grow"><i></i>{{{{lg_grow}}}}</span>'
              f'<span class="lg lg-stay"><i></i>{{{{lg_stay}}}}</span></div>')
    over = ''
    k2 = SIZE_K['dydis-2']
    css = SITE_CSS + f"""
  .s-head .h-s2, .acc .a-s2 {{ opacity: 1; }}
  .s-page {{ top: {HEAD['dydis-2']}px; }}
  .s-scroll {{ transform: translateY(-{SCROLL}px); }}
  .s-p {{ font-size: {P_PX * k2:.2f}px; }}
  .s-h1 {{ font-size: {H1_PX * k2:.2f}px; }}
  /* žymos kairėje: žalia — prisitaiko, raudona — ne */
  .s-p::before, .w-p::before, .w-t::before {{ content: ''; position: absolute; left: -28px; top: 4px; bottom: 4px;
      width: 8px; border-radius: 4px; }}
  .s-p::before {{ background: var(--c-green-solid); }}
  .w-p::before, .w-t::before {{ background: var(--c-red-solid); }}
  .legend {{ position: absolute; left: {SIDE_L}px; top: {HEAD['dydis-2'] - SCROLL + CARD_TOP + 248 + 16}px; z-index: 9;
             display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }}
  .lg {{ display: inline-flex; align-items: center; gap: 14px; background: var(--c-surface); border-radius: 12px;
         box-shadow: var(--c-shadow-card); padding: 10px 18px; font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 700; white-space: nowrap; }}
  .lg i {{ width: 8px; height: 30px; border-radius: 4px; }}
  .lg-grow {{ color: var(--c-green-text); }} .lg-grow i {{ background: var(--c-green-solid); }}
  .lg-stay {{ color: var(--c-red-text); }} .lg-stay i {{ background: var(--c-red-solid); }}
  .cursor-wrap {{ transform: translate(1000px, 700px); }}
"""
    write_template(name, page(css, scene_body(extra, over)))

    T1, T2, T_SCROLL, T_MARK = 3.0, 4.6, 5.6, 6.6
    k1 = SIZE_K['dydis-1']
    a = []
    intro_anims(a)
    cursor_anim(a, 'k03', D, [(0, (900, 640)), (1.6, (900, 640)), (2.6, (cx - 6, cy + BAR_H - 4)),
                              (5.2, (cx - 6, cy + BAR_H - 4)), (6.2, (1000, 700))])
    a.append(f'.r1 {{ animation: ratilasIK 0.6s ease-out {T1}s forwards; }}')
    a.append(f'.r2 {{ animation: ratilasIK 0.6s ease-out {T2}s forwards; }}')
    a.append('@keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }')
    timeline(a, 'm03', D, '.tip-1', 'opacity', [(2.5, 0), (2.7, 1), (T1, 1), (T1 + 0.15, 0)])
    timeline(a, 'm03', D, '.tip-2', 'opacity', [(T1 + 0.3, 0), (T1 + 0.5, 1), (T2, 1), (T2 + 0.15, 0)])

    def size(sel, prop, v0, v1, v2, unit='px'):
        timeline(a, 'm03', D, sel, prop, [(T1, f'{v0:.2f}{unit}'), (T1 + 0.35, f'{v1:.2f}{unit}'),
                                          (T2, f'{v1:.2f}{unit}'), (T2 + 0.35, f'{v2:.2f}{unit}')])
    for sel, ons in (('.h-n', (1, 0, 0)), ('.h-s1', (0, 1, 0)), ('.h-s2', (0, 0, 1)),
                     ('.a-n', (1, 0, 0)), ('.a-s1', (0, 1, 0)), ('.a-s2', (0, 0, 1))):
        timeline(a, 'm03', D, sel, 'opacity', [(T1, ons[0]), (T1 + 0.2, ons[1]), (T2, ons[1]), (T2 + 0.2, ons[2])])
    size('.s-page', 'top', HEAD['normalus'], HEAD['dydis-1'], HEAD['dydis-2'])
    size('.s-p', 'font-size', P_PX, P_PX * k1, P_PX * k2)
    size('.s-h1', 'font-size', H1_PX, H1_PX * k1, H1_PX * k2)
    timeline(a, 'm03', D, '.s-scroll', 'transform', [(T_SCROLL, 'translateY(0px)'), (T_SCROLL + 0.7, f'translateY(-{SCROLL}px)')])
    timeline(a, 'm03', D, '.s-p::before', 'opacity', [(T_MARK, 0), (T_MARK + 0.4, 1)])
    timeline(a, 'm03', D, '.w-p::before, .w-t::before', 'opacity', [(T_MARK + 0.5, 0), (T_MARK + 0.9, 1)])
    a.append(f'.lg-grow {{ opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) {T_MARK + 0.3}s forwards; }}')
    a.append(f'.lg-stay {{ opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) {T_MARK + 0.8}s forwards; }}')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 04 Tekstas atkeliauja su apdaru
# Kodas — kaip TVS redaktoriaus „Source“ vaizde atrodo iš Word įklijuotas sakinys (šiek tiek sutrumpinta:
# &quot; ir „sans-serif“ nuimti, kad tilptų; žymų skaičius ir tvarka — kaip tikrame įklijavime).
CODE_04 = [
    (0, '<p>', ''),
    (1, '<strong>', ''),
    (2, '<span style="', 'c', 'color:#1f3864', '">'),
    (3, '<span style="', 's', 'font-size:11.0pt', '">'),
    (4, '<span style="', 'f', 'font-family:Calibri', '">'),
    (5, 'Svarbu:', 'txt'),
    (4, '</span>', ''), (3, '</span>', ''), (2, '</span>', ''),
    (1, '</strong>', ''),
    (1, '<span style="', 's', 'font-size:11.0pt', '">'),
    (2, '<span style="', 'f', 'font-family:Calibri', '">'),
    (3, 'per atostogas biblioteka dirba trumpiau.', 'txt'),
    (2, '</span>', ''), (1, '</span>', ''),
    (0, '</p>', ''),
]


def code_line(row):
    ind = '&nbsp;' * (2 * row[0])
    if len(row) == 5:
        _, a, k, v, b = row
        return f'{ind}<span class="tg">{a.replace("<", "&lt;")}</span><span class="hl hl-{k}">{v}</span><span class="tg">{b}</span>'
    _, t, k = row
    if k == 'txt':
        return f'{ind}<span class="tx">{t}</span>'
    return f'{ind}<span class="tg">{t.replace("<", "&lt;")}</span>'


def scene_04():
    name, D = '04-ko-nesimato', 15
    CONTENT[name.replace('-', '_')] = dict(title="Tekstas atkeliauja su apdaru", l_lbl="Ką matote", r_lbl="Ką gauna svetainė",
                                           w_lead="Svarbu:", w_text="per atostogas biblioteka dirba trumpiau.",
                                           c_f="šriftas", c_s="dydis", c_c="spalva")
    lines = ''.join(f'<div class="ln ln{i}">{code_line(r)}</div>' for i, r in enumerate(CODE_04))
    body = f"""    <div class="title">{{{{title}}}}</div>
    <div class="pair">
      <div class="pan pan-l"><div class="lbl">{{{{l_lbl}}}}</div>
        <div class="see"><p class="w-see"><b style="color:{WORD_NAVY}">{{{{w_lead}}}}</b> {{{{w_text}}}}</p></div></div>
      <div class="pan pan-r"><div class="lbl">{{{{r_lbl}}}}</div>
        <div class="code">{lines}</div>
        <div class="chips"><span class="ch ch-f">{{{{c_f}}}}</span><span class="ch ch-s">{{{{c_s}}}}</span><span class="ch ch-c">{{{{c_c}}}}</span></div></div>
    </div>"""
    css = """
  .card { padding: 40px 120px 56px; }
  .title { margin-bottom: 40px; }
  .pair { display: grid; grid-template-columns: 640px 1fr; gap: 40px; align-items: stretch; }
  .pan { border-radius: 20px; padding: 30px 36px; box-shadow: var(--c-shadow-card); }
  .pan-l { background: var(--c-surface); border: 1.5px solid var(--c-border); display: flex; flex-direction: column; }
  .pan-r { background: #1e293b; }
  .lbl { font-size: 26px; font-weight: 700; color: var(--c-text-secondary); margin-bottom: 24px; }
  .pan-r .lbl { color: #cbd5e1; }
  .see { flex: 1; display: flex; align-items: center; }
  .w-see { font-family: Calibri, 'Times New Roman', serif; font-size: 34px; line-height: 1.4; color: #000; }
  .code { font-family: 'SF Mono', Menlo, monospace; font-size: 22px; line-height: 1.5; color: #e2e8f0; }
  .tg { color: #93c5fd; } .tx { color: #f8fafc; font-weight: 600; }
  .hl { border-radius: 4px; padding: 0 4px; color: #fde68a; }
  .hl-f { background: rgba(167, 139, 250, .35); } .hl-s { background: rgba(52, 211, 153, .32); } .hl-c { background: rgba(251, 146, 60, .38); }
  .chips { display: flex; gap: 16px; margin-top: 26px; }
  .ch { font-size: 26px; font-weight: 700; padding: 8px 18px; border-radius: 10px; color: #0f172a; }
  .ch-f { background: #c4b5fd; } .ch-s { background: #6ee7b7; } .ch-c { background: #fdba74; }
"""
    write_template(name, page(css, body))
    a = ['.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }',
         '.pan-l { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.6s forwards; }',
         '.pan-r { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 1.6s forwards; }']
    for i in range(len(CODE_04)):   # kodas išsiskleidžia eilutė po eilutės — žiūrovas jaučia kiekį
        a.append(f'.ln{i} {{ opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) {2.4 + i * 0.28:.2f}s forwards; }}')
    t0 = 2.4 + len(CODE_04) * 0.28 + 0.6
    for j, k in enumerate(('f', 's', 'c')):   # tada nurodymai paryškinami ir įvardijami
        a.append(f'.hl-{k} {{ animation: hl04{k} {D}s linear 0s both; }}')
        a.append(kf(f'hl04{k}', D, [(t0 + j * 0.9, 'transparent'), (t0 + j * 0.9 + 0.3, 'var(--x)')],
                    lambda v: f'background: {v};').replace('var(--x)', {'f': 'rgba(167,139,250,.35)', 's': 'rgba(52,211,153,.32)', 'c': 'rgba(251,146,60,.38)'}[k]))
        a.append(f'.ch-{k} {{ opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) {t0 + j * 0.9:.2f}s forwards; }}')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 05 Iš kur atkeliauja apdaras
SOURCES_05 = (('word', 'Word'), ('mail', 'El. laiškas'), ('fb', 'Facebook įrašas'), ('pdf', 'PDF'), ('web', 'Kita svetainė'))
ICONS_05 = {
    'word': '<svg viewBox="0 0 40 40"><rect x="7" y="3" width="26" height="34" rx="3" fill="#dbeafe" stroke="#2563eb" stroke-width="2.4"/><path d="M12 13h16M12 19h16M12 25h11" stroke="#2563eb" stroke-width="2.4" stroke-linecap="round"/></svg>',
    'mail': '<svg viewBox="0 0 40 40"><rect x="4" y="9" width="32" height="23" rx="3" fill="#fef3c7" stroke="#b45309" stroke-width="2.4"/><path d="M5 11l15 11 15-11" fill="none" stroke="#b45309" stroke-width="2.4"/></svg>',
    'fb': '<svg viewBox="0 0 40 40"><rect x="4" y="5" width="32" height="30" rx="5" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2.4"/><circle cx="12" cy="13" r="3" fill="#4f46e5"/><path d="M18 12h12M10 21h20M10 27h14" stroke="#4f46e5" stroke-width="2.4" stroke-linecap="round"/></svg>',
    'pdf': '<svg viewBox="0 0 40 40"><path d="M9 3h16l7 7v27H9z" fill="#fee2e2" stroke="#dc2626" stroke-width="2.4" stroke-linejoin="round"/><path d="M25 3v7h7" fill="none" stroke="#dc2626" stroke-width="2.4"/><path d="M14 22h12M14 28h8" stroke="#dc2626" stroke-width="2.4" stroke-linecap="round"/></svg>',
    'web': '<svg viewBox="0 0 40 40"><rect x="3" y="6" width="34" height="28" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="2.4"/><path d="M3 13h34" stroke="#16a34a" stroke-width="2.4"/><circle cx="8" cy="9.5" r="1.4" fill="#16a34a"/><circle cx="12.5" cy="9.5" r="1.4" fill="#16a34a"/></svg>',
}
BAG = '<svg viewBox="0 0 64 56"><rect x="22" y="3" width="20" height="10" rx="3" fill="none" stroke="#7c2d12" stroke-width="3.2"/><rect x="4" y="12" width="56" height="40" rx="7" fill="#f59e0b" stroke="#7c2d12" stroke-width="3.2"/><path d="M4 28h56" stroke="#7c2d12" stroke-width="3.2"/><rect x="27" y="23" width="10" height="10" rx="2" fill="#7c2d12"/></svg>'


def scene_05():
    name, D = '05-apdara-atnesa-visi', 11
    CONTENT[name.replace('-', '_')] = dict(title="Iš kur atkeliauja apdaras", site="Jūsų svetainė",
                                           **{f's_{k}': v for k, v in SOURCES_05})
    SY, SH, SX, SW = 40, 104, 60, 420           # šaltinių kortelės (stage koordinatės)
    TX, TY, TW, TH = 980, 120, 700, 520          # svetainės kortelė
    srcs = ''.join(f'<div class="src src{i}" style="top:{SY + i * (SH + 20)}px">{ICONS_05[k]}<span>{{{{s_{k}}}}}</span></div>'
                   for i, (k, _) in enumerate(SOURCES_05))
    bags = ''.join(f'<div class="bag bag{i}">{BAG}</div>' for i in range(5))
    body = f"""    <div class="title">{{{{title}}}}</div>
    <div class="stage">
      {srcs}
      <div class="tgt" style="left:{TX}px; top:{TY}px; width:{TW}px; height:{TH}px">
        <div class="tgt-bar"><i></i><i></i><i></i></div>
        <div class="tgt-name">{{{{site}}}}</div>
        <div class="tgt-lines"><i></i><i></i><i></i><i></i></div>
      </div>
      {bags}
    </div>"""
    ends = [(TX + 70 + i * 120, TY + TH - 120) for i in range(5)]
    starts = [(SX + SW + 20, SY + i * (SH + 20) + 24) for i in range(5)]
    css = f"""
  .card {{ padding: 40px 120px 56px; }}
  .stage {{ position: relative; width: 1680px; height: 700px; margin: 0 auto; }}
  .src {{ position: absolute; left: {SX}px; width: {SW}px; height: {SH}px; background: var(--c-surface); border-radius: 18px;
          border: 1.5px solid var(--c-border); box-shadow: var(--c-shadow-card); display: flex; align-items: center; gap: 22px;
          padding: 0 28px; font-size: 32px; font-weight: 700; color: var(--c-text); }}
  .src svg {{ width: 56px; height: 56px; flex: none; }}
  .tgt {{ position: absolute; background: var(--c-surface); border-radius: 22px; border: 1.5px solid var(--c-border);
          box-shadow: var(--c-shadow-card); overflow: hidden; }}
  .tgt-bar {{ height: 52px; background: #eef1f6; display: flex; gap: 10px; align-items: center; padding: 0 20px; border-bottom: 1.5px solid var(--c-border); }}
  .tgt-bar i {{ width: 14px; height: 14px; border-radius: 50%; background: #cbd5e1; }}
  .tgt-name {{ font-size: 40px; font-weight: 700; color: var(--c-text); padding: 34px 40px 20px; }}
  .tgt-lines {{ padding: 0 40px; display: grid; gap: 16px; }}
  .tgt-lines i {{ height: 16px; border-radius: 8px; background: #e2e8f0; }}
  .tgt-lines i:nth-child(2) {{ width: 86%; }} .tgt-lines i:nth-child(4) {{ width: 62%; }}
  .bag {{ position: absolute; left: 0; top: 0; width: 96px; height: 84px; }}
  .bag svg {{ width: 96px; height: 84px; }}
""" + ''.join(f'  .bag{i} {{ transform: translate({ends[i][0]}px, {ends[i][1]}px) rotate({(-6, 4, -2, 7, -4)[i]}deg); }}\n' for i in range(5))
    write_template(name, page(css, body))
    a = ['.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }',
         '.tgt { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.5s forwards; }']
    for i in range(5):
        t = 1.0 + i * 0.9
        a.append(f'.src{i} {{ opacity: 0; animation: slinktisIsKaires 0.5s var(--ease-spring) {t:.2f}s forwards; }}')
        sx, sy = starts[i]; ex, ey = ends[i]; rot = (-6, 4, -2, 7, -4)[i]
        a.append(f'.bag{i} {{ animation: bag05_{i} {D}s linear 0s both; }}')
        a.append(f'@keyframes bag05_{i} {{ 0%, {100 * (t + 0.4) / D:.3f}% {{ opacity: 0; transform: translate({sx}px, {sy}px) rotate(0deg); }} '
                 f'{100 * (t + 0.6) / D:.3f}% {{ opacity: 1; transform: translate({sx}px, {sy}px) rotate(0deg); animation-timing-function: cubic-bezier(.35,.05,.25,1); }} '
                 f'{100 * (t + 1.7) / D:.3f}% {{ opacity: 1; transform: translate({ex}px, {ey}px) rotate({rot}deg); }} '
                 f'100% {{ opacity: 1; transform: translate({ex}px, {ey}px) rotate({rot}deg); }} }}')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 06–07 Neregys klauso
SR_CSS = f"""
  .blackout {{ position: absolute; inset: 0; background: rgba(5, 7, 12, .9); z-index: 5; }}
  .focus {{ position: absolute; z-index: 6; border: 4px solid var(--fc); border-radius: 8px;
            box-shadow: 0 0 0 4px rgba(0,0,0,.4), 0 0 26px var(--fc); }}
  .w-empty {{ height: 30px; margin-bottom: 12px; }}
  .w-dash {{ font-family: Calibri, 'Times New Roman', serif; font-size: 22px; line-height: 30px; margin-bottom: 12px; color: #000; }}
  .s-ul {{ margin: 0 0 22px 30px; font-size: {P_PX}px; line-height: 1.6; color: {SITE_TEXT}; }}
  .sr {{ position: absolute; left: {(BW_W - 1180) / 2}px; bottom: 34px; z-index: 9; width: 1180px; min-height: 120px;
         background: #0f172a; border: 1.5px solid #334155; border-radius: 18px; display: flex; align-items: center; gap: 26px; padding: 18px 30px; }}
  .sr-ico {{ flex: none; width: 70px; height: 70px; border-radius: 50%; background: #1e293b; display: flex; align-items: center; justify-content: center; }}
  .sr-ico svg {{ width: 38px; height: 38px; }}
  .sr-body {{ flex: 1; position: relative; height: 84px; }}
  .sr-lbl {{ font-family: 'Inter', sans-serif; font-size: 20px; color: #94a3b8; }}
  .sr-say {{ position: absolute; left: 0; top: 30px; font-family: 'Inter', sans-serif; font-size: 34px; font-weight: 600; color: #f8fafc;
             white-space: nowrap; opacity: 0; }}
  .wave {{ flex: none; display: flex; gap: 6px; align-items: center; height: 60px; }}
  .wave i {{ width: 7px; height: 14px; border-radius: 4px; background: #38bdf8; }}
"""
SPEAKER = '<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>'


def sr_scene(name, D, card, title, utter, focus_steps, color, t_black=1.0):
    """utter: [(t_nuo, t_iki, tekstas)], focus_steps: [(t, (y, h))] — y .s-page koordinatėmis nuo kortelės turinio viršaus."""
    key = name.replace('-', '_')
    ak = 'u' + key                                    # CSS animacijos vardas negali prasidėti skaitmeniu
    CONTENT[key] = dict(SITE_TEXTS, title=title, sr_lbl="Ekrano skaitytuvas",
                        **{f'u{i}': u[2] for i, u in enumerate(utter)})
    says = ''.join(f'<div class="sr-say say{i}">{{{{u{i}}}}}</div>' for i in range(len(utter)))
    extra = f'<div class="blackout"></div><div class="focus" style="--fc:{color}"></div>'
    over = (f'<div class="sr"><div class="sr-ico">{SPEAKER}</div><div class="sr-body"><div class="sr-lbl">{{{{sr_lbl}}}}</div>{says}</div>'
            f'<div class="wave">' + '<i></i>' * 9 + '</div></div>')
    top0 = HEAD['normalus'] + CARD_TOP + 44 + 1        # kortelės turinio viršus .site koordinatėmis
    fx, fw = LEFT + 50 - 12, CARD_W - 100 + 24
    last = focus_steps[-1][1]
    css = SITE_CSS + STATE_NORMAL + SR_CSS + (
        f'  .focus {{ left: {fx}px; width: {fw}px; top: {top0 + last[0] - 6}px; height: {last[1] + 12}px; }}\n'
        f'  .say{len(utter) - 1} {{ opacity: 1; }}\n  .cursor-wrap {{ display: none; }}\n')
    write_template(name, page(css, scene_body(extra, over, card)))
    a = []
    intro_anims(a)
    a.append(f'.sr {{ opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) {t_black + 0.4}s forwards; }}')
    timeline(a, ak, D, '.blackout', 'opacity', [(t_black, 0), (t_black + 0.8, 1)])
    fs = [(focus_steps[0][0] - 0.01, None)] + focus_steps
    steps = [(focus_steps[0][0] - 0.3, ('0', focus_steps[0][1]))] + [(t, ('1', yh)) for t, yh in focus_steps]
    rows = []
    for t, (op, (y, h)) in steps:
        rows.append(f'{100 * t / D:.3f}% {{ opacity: {op}; top: {top0 + y - 6}px; height: {h + 12}px; animation-timing-function: steps(1, end); }}')
    a.append(f'.focus {{ animation: fc_{key} {D}s linear 0s both; }}')
    a.append(f'@keyframes fc_{key} {{ 0% {{ opacity: 0; top: {top0 + focus_steps[0][1][0] - 6}px; height: {focus_steps[0][1][1] + 12}px; }} ' + ' '.join(rows) + ' }')
    for i, (t1, t2, _) in enumerate(utter):
        last_u = i == len(utter) - 1
        st = [(t1 - 0.05, 0), (t1, 1)] + ([] if last_u else [(t2, 1), (t2 + 0.05, 0)])
        timeline(a, ak, D, f'.say{i}', 'opacity', st)
    # banga juda tik kai skaitytuvas kalba
    a.append('@keyframes bangaIK { 0%, 100% { height: 14px; } 50% { height: 52px; } }')
    on, off = utter[0][0], utter[-1][1]
    for j in range(9):
        a.append(f'.wave i:nth-child({j + 1}) {{ animation: bangaIK {0.42 + (j % 4) * 0.09:.2f}s ease-in-out {on + j * 0.05:.2f}s {int((off - on) / 0.5)}; }}')
    ANIMS[name] = '\n    '.join(a)


def scene_06():
    # Word įklijavimas: tuščios eilutės tarpams ir sąrašas iš brūkšnelių
    card = f"""
            <p class="s-p">{{{{p_editor}}}}</p>
            <p class="w-empty">&nbsp;</p><p class="w-empty">&nbsp;</p><p class="w-empty">&nbsp;</p>
            <p class="w-p" style="color:#000000"><span style="color:{WORD_NAVY}; font-weight:700">{{{{w_lead}}}}</span> {{{{w_text}}}}</p>
            <p class="w-dash">{{{{d1}}}}</p><p class="w-dash">{{{{d2}}}}</p>"""
    ye = [57 + i * 42 for i in range(3)]            # tuščios eilutės: 30 + 12
    yw = 57 + 3 * 42                                  # „Svarbu…“
    utter = [(8.6, 9.5, 'tuščia'), (9.7, 10.6, 'tuščia'), (10.8, 11.7, 'tuščia'),
             (11.9, 16, 'Svarbu: per atostogas biblioteka dirba trumpiau.')]
    focus = [(8.6, (ye[0], 30)), (9.7, (ye[1], 30)), (10.8, (ye[2], 30)), (11.9, (yw, 30))]
    sr_scene('06-neregys-klauso', 16, card, "Kaip puslapį girdi neregys", utter, focus, '#f87171')
    CONTENT['06_neregys_klauso'].update(d1="– spalio 28 d. – knygų mainų mugė;", d2="– spalio 30 d. – garsiųjų skaitymų popietė.")


def scene_07():
    card = """
            <p class="s-p">{{p_editor}}</p>
            <p class="s-p">{{w_lead}} {{w_text}}</p>
            <ul class="s-ul"><li>{{l1}}</li><li>{{l2}}</li></ul>"""
    ys = 57                                           # „Svarbu…“ — svetainės pastraipa (35 + 22)
    yl = 57 + 57                                      # sąrašas: 2 × 35
    utter = [(5.4, 8.2, 'Svarbu: per atostogas biblioteka dirba trumpiau.'),
             (8.4, 10.0, 'sąrašas, du elementai'),
             (10.2, 13, 'spalio 28 d. – knygų mainų mugė')]
    focus = [(5.4, (ys, 35)), (8.4, (yl, 70)), (10.2, (yl, 35))]
    sr_scene('07-svariai', 13, card, "Tas pats tekstas, įklijuotas švariai", utter, focus, '#4ade80')
    CONTENT['07_svariai'].update(l1="spalio 28 d. – knygų mainų mugė;", l2="spalio 30 d. – garsiųjų skaitymų popietė.")


# ---------------------------------------------------------------- 08 Lopas ant lopo
NEW_FONT = "'Inter', sans-serif"     # imituotas dizaino atnaujinimas: kitas šriftas ir spalvos


def scene_08():
    name, D = '08-lopas', 14
    key = name.replace('-', '_')
    CONTENT[key] = dict(SITE_TEXTS, title="Po dizaino atnaujinimo", upd="Dizainas atnaujintas", tag="lopas")
    card = DEFAULT_CARD.replace('<p class="w-p w-target"', '<p class="w-p w-target" data-tag="{{tag}}"') \
                       .replace('<table class="w-t w-target">', '<table class="w-t w-target" data-tag="{{tag}}">')
    extra = '<div class="upd">{{upd}}</div>'
    css = SITE_CSS + STATE_NORMAL + f"""
  /* galutinė būsena — atnaujintas dizainas; įklijuoti elementai liko seni */
  .s-p, .s-h1 {{ font-family: {NEW_FONT}; }}
  .s-p {{ color: #334155; }}
  .s-h1 {{ color: #1e3a5f; }}
  .s-card {{ border-radius: 16px; border-color: #e2e8f0; box-shadow: 0 8px 28px rgba(15,23,42,.08); }}
  .s-side div {{ background-color: #1e3a5f; }}
  .w-p::after, .w-t::after {{ content: attr(data-tag); position: absolute; left: calc(100% + 18px); top: 50%; transform: translateY(-50%);
      font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700; color: var(--c-amber-text); background: var(--c-amber-bg);
      border: 2px solid var(--c-amber-solid); border-radius: 8px; padding: 4px 12px; white-space: nowrap; }}
  .w-p::before, .w-t::before {{ content: ''; position: absolute; inset: -8px -12px; border: 3px dashed var(--c-amber-solid); border-radius: 8px; }}
  .w-p {{ display: inline-block; }}
  .upd {{ position: absolute; right: 30px; top: {HEAD['normalus'] + 20}px; z-index: 6; font-family: 'Inter', sans-serif; font-size: 24px;
          font-weight: 700; color: #1e3a5f; background: #dbeafe; border-radius: 10px; padding: 10px 18px; }}
  .cursor-wrap {{ display: none; }}
"""
    write_template(name, page(css, scene_body(extra, '', card)))
    T_UPD, T_MARK = 3.4, 7.2
    a = []
    intro_anims(a)
    a.append(f'.upd {{ opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) {T_UPD - 0.6}s forwards; }}')
    # šriftas keičiasi diskrečiai per trumpą „mirktelėjimą“
    for sel, f0, c0, c1 in (('.s-p', "'Roboto', sans-serif", SITE_TEXT, '#334155'), ('.s-h1', "'Roboto', sans-serif", SITE_H, '#1e3a5f')):
        nm = 'u08' + re.sub(r'[^a-z0-9]', '', sel)
        a.append(f'{sel} {{ animation: {nm} {D}s linear 0s both; }}')
        a.append(f'@keyframes {nm} {{ 0%, {100 * T_UPD / D:.3f}% {{ font-family: {f0}; color: {c0}; opacity: 1; }} '
                 f'{100 * (T_UPD + 0.25) / D:.3f}% {{ font-family: {f0}; color: {c0}; opacity: .15; }} '
                 f'{100 * (T_UPD + 0.26) / D:.3f}% {{ font-family: {NEW_FONT}; color: {c1}; opacity: .15; }} '
                 f'{100 * (T_UPD + 0.6) / D:.3f}%, 100% {{ font-family: {NEW_FONT}; color: {c1}; opacity: 1; }} }}')
    timeline(a, 'u08', D, '.s-side div', 'background-color', [(T_UPD, SITE_H), (T_UPD + 0.5, '#1e3a5f')])
    timeline(a, 'u08', D, '.s-card', 'border-radius', [(T_UPD, '0px'), (T_UPD + 0.5, '16px')])
    timeline(a, 'u08', D, '.w-p::before, .w-t::before', 'opacity', [(T_MARK, 0), (T_MARK + 0.4, 1)])
    timeline(a, 'u08', D, '.w-p::after, .w-t::after', 'opacity', [(T_MARK + 0.4, 0), (T_MARK + 0.8, 1)])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 09 Ar čia kas nors prižiūri?
READER = ('<svg viewBox="0 0 120 120"><circle cx="60" cy="38" r="20" fill="none" stroke="#475569" stroke-width="5"/>'
          '<path d="M22 108c0-22 17-38 38-38s38 16 38 38" fill="none" stroke="#475569" stroke-width="5" stroke-linecap="round"/></svg>')


def scene_09():
    name, D = '09-ar-kas-priziuri', 13
    key = name.replace('-', '_')
    CONTENT[key] = dict(SITE_TEXTS, title="Ar čia kas nors prižiūri?",
                        e_text="Knygas grąžinkite iki lapkričio 3 d.", fb_text="Gero poilsio visiems 🍂📚",
                        sig="Bibliotekos vedėja", q="?")
    # tas pats puslapis, tik įklijuota iš daugelio vietų — keturi šriftai, trys dydžiai, žymeklis, centravimas
    card = f"""
            <p class="s-p pz pz0">{{{{p_editor}}}}</p>
            <p class="w-p pz pz1" style="color:#000000"><span style="color:{WORD_NAVY}; font-weight:700">{{{{w_lead}}}}</span> {{{{w_text}}}}</p>
            <p class="pz pz2" style="font-family:Arial, sans-serif; font-size:19px; margin-bottom:18px"><span style="background-color:#ffff00">{{{{e_text}}}}</span></p>
            <p class="pz pz3" style="font-family:Helvetica, sans-serif; font-size:27px; color:#050505; margin-bottom:18px">{{{{fb_text}}}}</p>
            <p class="pz pz4" style="font-family:Georgia, serif; font-style:italic; font-size:24px; color:#7f7f7f; text-align:center">{{{{sig}}}}</p>"""
    over = f'<div class="reader">{READER}<span class="rq">{{{{q}}}}</span></div>'
    css = SITE_CSS + STATE_NORMAL + """
  .reader { position: absolute; right: 40px; bottom: 40px; z-index: 9; width: 210px; height: 210px; border-radius: 50%;
            background: var(--c-surface); box-shadow: var(--c-shadow-card); display: flex; align-items: center; justify-content: center; }
  .reader svg { width: 120px; height: 120px; }
  .rq { position: absolute; right: 18px; top: 10px; width: 66px; height: 66px; border-radius: 50%; background: var(--c-amber-solid);
        color: #fff; font-family: 'Inter', sans-serif; font-size: 46px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
  .cursor-wrap { display: none; }
"""
    write_template(name, page(css, scene_body('', over, card)))
    a = []
    intro_anims(a)
    for i in range(5):   # „lopai“ sugula po vieną — kaip skirtingi žmonės skirtingu metu
        a.append(f'.pz{i} {{ opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) {1.2 + i * 0.7:.2f}s forwards; }}')
    a.append('.reader { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 6.0s forwards; }')
    a.append('.rq { opacity: 0; animation: fadeIn 0.25s linear 6.8s forwards, iconPulse 0.6s var(--ease-soft) 7.0s; }')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 10–13 TVS redaktorius
# ⛔ Redaktorius — TIKRAS (Eimantas 2026-10-11: „svarbu jį parodyti taip kaip yra“). Įrankių juosta, apatinė juosta ir
# lauko pavadinimas su užuomina iškirpti iš tikros TVS nuotraukos (formatavimo-pradziamokslis/tyrimas/tvs-redaktorius-tikras.webp):
# juosta 1936×150, mygtukų koordinatės — tos nuotraukos pikseliais. Turinio laukas — HTML (tekstas turi keistis).
TB_W, TB_H = 1936, 150
TB_BTN = {'tx': (791, 29), 'paste': (253, 29), 'fmt': (206, 118), 'num': (32, 74), 'bul': (71, 74), 'link': (446, 74),
          'font': (338, 118), 'size': (450, 118), 'col': (523, 118), 'bg': (573, 118), 'just': (397, 74)}
ZYME_W, ZYME_H = 380, 90

ED_CSS = """
  .card { padding: 40px 120px 56px; }
  .title { margin-bottom: 34px; }
  .panel { width: fit-content; margin: 0 auto; background: #fff; border-radius: 18px; padding: 26px 30px; box-shadow: var(--c-shadow-card); }
  .ed-wrap { position: relative; margin: 0 auto; }
  .ed-zyme { display: block; margin-bottom: 8px; }
  .ed { position: relative; background: #fff; }
  .ed img { display: block; }
  .ed-body { border-left: 1px solid #b7b7b7; border-right: 1px solid #b7b7b7; background: #fff; padding: 22px 26px;
             font-family: 'Times New Roman', Times, serif; font-size: 28px; line-height: 1.45; color: #000; overflow: hidden; }
  .ed-body p { margin: 0 0 14px; }
  .kbd { display: inline-flex; align-items: center; justify-content: center; min-width: 74px; height: 64px; padding: 0 18px;
         background: var(--c-surface); border: 2px solid #cbd5e1; border-bottom-width: 6px; border-radius: 12px;
         font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 700; color: var(--c-text); }
  .plus { font-family: 'Inter', sans-serif; font-size: 30px; font-weight: 700; color: var(--c-text-faint); margin: 0 12px; }
  .keys { display: flex; align-items: center; }
  .spot { position: absolute; z-index: 6; border: 4px solid var(--c-blue-solid); border-radius: 10px;
          box-shadow: 0 0 0 9999px rgba(15, 23, 42, .5); pointer-events: none; }
  .ring { position: absolute; z-index: 7; border: 4px solid var(--c-blue-solid); border-radius: 10px; pointer-events: none; }
  .cur { position: absolute; left: 0; top: 0; z-index: 9; width: 44px; height: 56px; }
  .cur svg { width: 44px; height: 56px; }
  .rip { position: absolute; z-index: 8; width: 64px; height: 64px; margin: -32px 0 0 -32px; border-radius: 50%;
         background: rgba(66, 133, 244, .45); opacity: 0; }
  .sel { background-color: rgba(59, 130, 246, .28); }
"""


def editor(width, body_html, body_h, label=False):
    k = width / TB_W
    zyme = (f'<img class="ed-zyme" src="assets/iklijuotas-redaktorius-zyme.png" style="width:{ZYME_W * k:.0f}px">' if label else '')
    return (f'{zyme}<div class="ed" style="width:{width}px">'
            f'<img src="assets/iklijuotas-redaktorius-juosta.png" style="width:{width}px">'
            f'<div class="ed-body" style="height:{body_h}px">{body_html}</div>'
            f'<img src="assets/iklijuotas-redaktorius-apacia.png" style="width:{width}px"></div>'), k


def btn_xy(name, k, y0):
    x, y = TB_BTN[name]
    return x * k, y0 + y * k


def keys_html(cls, keys):
    out = []
    for i, kk in enumerate(keys):
        if i: out.append(f'<span class="plus {cls}-p{i}">+</span>')
        out.append(f'<span class="kbd {cls}-k{i}">{kk}</span>')
    return f'<div class="keys {cls}">' + ''.join(out) + '</div>'


def keys_anim(a, cls, t0, n, step=0.4, hl=None):
    for i in range(n):
        t = t0 + i * step
        a.append(f'.{cls}-k{i} {{ opacity: 0; animation: fadeUpMedium 0.35s var(--ease-spring) {t:.2f}s forwards; }}')
        if i:
            a.append(f'.{cls}-p{i} {{ opacity: 0; animation: fadeIn 0.2s linear {t - 0.1:.2f}s forwards; }}')
    if hl is not None:
        a.append(f'.{cls}-k{hl} {{ border-color: var(--c-green-solid); color: var(--c-green-text); background: var(--c-green-bg); }}')


def scene_10():
    name, D = '10-vienas-klavisas', 12
    key = name.replace('-', '_')
    CONTENT[key] = dict(title="Įklijuojate be apdaro", k1="Ctrl", k2="Shift", k3="V",
                        pasted="Svarbu: per atostogas biblioteka dirba trumpiau.",
                        bad="Ctrl + V – žodžiai su apdaru", good="Ctrl + Shift + V – tik žodžiai")
    W = 1500
    ed, k = editor(W, '<p class="pasted">{{pasted}}</p>', 200, label=True)
    zh = ZYME_H * k
    body = f"""    <div class="title">{{{{title}}}}</div>
    <div class="panel"><div class="ed-wrap" style="width:{W}px">{ed}
      <div class="ring hint" style="left:-8px; top:-6px; width:{ZYME_W * k + 16:.0f}px; height:{zh + 4:.0f}px"></div>
      <div class="row">{keys_html('kk', ['{{k1}}', '{{k2}}', '{{k3}}'])}
        <div class="cmp"><div class="c-bad"><b>✕</b>{{{{bad}}}}</div><div class="c-good"><b>✓</b>{{{{good}}}}</div></div></div>
    </div></div>"""
    css = ED_CSS + """
  .row { display: flex; align-items: center; justify-content: space-between; margin-top: 34px; }
  .cmp { display: grid; gap: 12px; }
  .cmp div { display: flex; align-items: center; gap: 14px; font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 600;
             padding: 10px 20px; border-radius: 12px; }
  .cmp b { font-size: 28px; }
  .c-bad { background: var(--c-red-bg); color: var(--c-red-text); }
  .c-good { background: var(--c-green-bg); color: var(--c-green-text); }
  .ring.hint { opacity: 0; }
"""
    write_template(name, page(css, body))
    a = ['.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }',
         '.panel { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }']
    timeline(a, 'u10', D, '.ring.hint', 'opacity', [(1.2, 0), (1.5, 1), (3.4, 1), (3.7, 0)])
    keys_anim(a, 'kk', 3.9, 3, 0.45, hl=1)
    a.append('.pasted { opacity: 0; animation: fadeIn 0.3s linear 5.4s forwards; }')
    a.append('.c-bad { opacity: 0; animation: slinktisIsDesines 0.5s var(--ease-spring) 6.8s forwards; }')
    a.append('.c-good { opacity: 0; animation: slinktisIsDesines 0.5s var(--ease-spring) 7.4s forwards; }')
    ANIMS[name] = '\n    '.join(a)


# Įklijuoto teksto apdaras gyvena TIK animacijoje (iki „Tx“ paspaudimo): bazinė taisyklė — jau išvalytas tekstas.
# ⛔ Ne inline stiliai ir ne !important — abu užgožtų animaciją.
MESSY = """<p class="m m0"><span class="m-a">Svarbu:</span><span class="m-b"> per atostogas biblioteka dirba trumpiau.</span></p>
<p class="m m1"><span class="m-c">Knygas grąžinkite iki lapkričio 3 d.</span></p>
<p class="m m2"><span class="m-d">Bibliotekos vedėja</span></p>"""


def scene_11():
    name, D = '11-jei-jau-iklijavote', 13
    key = name.replace('-', '_')
    CONTENT[key] = dict(title="Išvalote vienu mygtuku", k1="Ctrl", k2="A")
    W = 1500
    ed, k = editor(W, MESSY, 240)
    bx, by = btn_xy('tx', k, 0)
    body = f"""    <div class="title">{{{{title}}}}</div>
    <div class="panel"><div class="ed-wrap zoom" style="width:{W}px">{ed}
      <div class="rip r1" style="left:{bx:.0f}px; top:{by:.0f}px"></div>
      <div class="cur">{CUR['arrow']}</div>
    </div></div>
    <div class="row">{keys_html('ka', ['{{k1}}', '{{k2}}'])}</div>"""
    css = ED_CSS + f"""
  .row {{ display: flex; justify-content: center; margin-top: 34px; }}
  /* galutinė būsena: „Tx“ nuėmė šriftus, dydžius, spalvas, žymeklį ir paryškinimą */
  .m span {{ font-family: 'Times New Roman', Times, serif; font-size: 28px; color: #000;
             background-color: transparent; font-weight: 400; font-style: normal; }}
  .cur {{ transform: translate(1100px, 380px); }}
"""
    write_template(name, page(css, body))
    T_SEL, T_CLICK = 3.2, 5.6
    a = ['.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }',
         '.panel { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }']
    keys_anim(a, 'ka', 2.4, 2, 0.45)
    # įklijuoto teksto apdaras — iki paspaudimo; po jo — redaktoriaus numatytasis
    orig = {'m-a': (f"Calibri, 'Times New Roman', serif", '24px', WORD_NAVY, 'transparent', 700, 'normal'),
            'm-b': (f"Calibri, 'Times New Roman', serif", '24px', '#000', 'transparent', 400, 'normal'),
            'm-c': ('Arial, sans-serif', '21px', '#000', '#ffff00', 400, 'normal'),
            'm-d': ('Georgia, serif', '25px', '#7f7f7f', 'transparent', 400, 'italic')}
    for c, (ff, fs, col, bg, fw, fst) in orig.items():
        nm = 'u11' + c.replace('-', '')
        sel_bg = 'rgba(59,130,246,.28)'
        a.append(f'.m .{c} {{ animation: {nm} {D}s linear 0s both; }}')
        a.append(f'@keyframes {nm} {{ 0%, {100 * T_SEL / D:.3f}% {{ font-family: {ff}; font-size: {fs}; color: {col}; background-color: {bg}; font-weight: {fw}; font-style: {fst}; }} '
                 f'{100 * (T_SEL + 0.2) / D:.3f}%, {100 * (T_CLICK + 0.2) / D:.3f}% {{ font-family: {ff}; font-size: {fs}; color: {col}; background-color: {sel_bg}; font-weight: {fw}; font-style: {fst}; }} '
                 f'{100 * (T_CLICK + 0.21) / D:.3f}%, {100 * (T_CLICK + 2.6) / D:.3f}% {{ font-family: \'Times New Roman\', serif; font-size: 28px; color: #000; background-color: {sel_bg}; font-weight: 400; font-style: normal; }} '
                 f'{100 * (T_CLICK + 3.0) / D:.3f}%, 100% {{ font-family: \'Times New Roman\', serif; font-size: 28px; color: #000; background-color: transparent; font-weight: 400; font-style: normal; }} }}')
    cursor_anim(a, 'k11', D, [(0, (1100, 380)), (3.8, (1100, 380)), (4.9, (bx - 6, by - 4)), (6.6, (bx - 6, by - 4)), (7.6, (1100, 380))])
    a[-2] = a[-2].replace('.cursor-wrap', '.cur')
    a.append(f'.r1 {{ animation: ratilasIK 0.6s ease-out {T_CLICK}s forwards; }}')
    a.append('@keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }')
    a.append(f'.zoom {{ transform-origin: {bx:.0f}px {by:.0f}px; animation: zoom11 {D}s linear 0s both; }}')
    a.append(kf('zoom11', D, [(4.2, 1), (5.0, 1.18), (7.0, 1.18), (7.8, 1)],
                lambda v: f'transform: scale({v}); animation-timing-function: cubic-bezier(.4,0,.2,1);'))
    ANIMS[name] = '\n    '.join(a)


SHEETS_ICON = ('<svg viewBox="0 0 48 64"><path d="M4 2h28l12 12v46a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#0f9d58"/>'
               '<path d="M32 2v12h12z" fill="#87ceac"/><rect x="11" y="28" width="26" height="22" rx="1" fill="#fff"/>'
               '<path d="M11 35.5h26M11 43h26M22 28v22" stroke="#0f9d58" stroke-width="2"/></svg>')


def scene_12():
    name, D = '12-lentele-isimtis', 17
    key = name.replace('-', '_')
    CONTENT[key] = dict(title="Lentelės: ilga – Google Sheets, trumpa – išvalote", long="Ilga, dažnai atnaujinama",
                        gs="Google Sheets", short="Trumpa", k1="Ctrl", k2="A",
                        **{k: SITE_TEXTS[k] for k in ('t_h1', 't_h2', 't_r1a', 't_r1b', 't_r2a', 't_r2b')})
    W = 1500
    tbl = ('<table class="st"><tr><td>{{t_h1}}</td><td>{{t_h2}}</td></tr>'
           '<tr><td>{{t_r1a}}</td><td>{{t_r1b}}</td></tr><tr><td>{{t_r2a}}</td><td>{{t_r2b}}</td></tr></table>')
    ed, k = editor(W, tbl, 200)
    bx, by = btn_xy('tx', k, 0)
    rows = ''.join('<i></i>' for _ in range(9))
    body = f"""    <div class="title">{{{{title}}}}</div>
    <div class="top">
      <div class="lng"><div class="lt">{rows}</div><span>{{{{long}}}}</span></div>
      <svg class="arr" viewBox="0 0 160 40"><path d="M4 20h140M128 6l16 14-16 14" fill="none" stroke="#0f9d58" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="gs">{SHEETS_ICON}<span>{{{{gs}}}}</span></div>
    </div>
    <div class="panel"><div class="ed-wrap zoom" style="width:{W}px">{ed}
      <div class="rip r1" style="left:{bx:.0f}px; top:{by:.0f}px"></div>
      <div class="cur">{CUR['arrow']}</div>
    </div></div>
    <div class="row">{keys_html('kt', ['{{k1}}', '{{k2}}'])}</div>"""
    css = ED_CSS + """
  .card { padding: 34px 120px 40px; }
  .title { margin-bottom: 26px; font-size: 48px; }
  .top { display: flex; align-items: center; justify-content: center; gap: 36px; margin-bottom: 26px; }
  .lng { display: flex; align-items: center; gap: 22px; background: var(--c-surface); border-radius: 16px; padding: 16px 24px;
         box-shadow: var(--c-shadow-card); font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 700; color: var(--c-text); }
  .lt { display: grid; gap: 5px; width: 120px; }
  .lt i { height: 8px; border-radius: 4px; background: #cbd5e1; } .lt i:first-child { background: #94a3b8; }
  .arr { width: 160px; height: 40px; }
  .gs { display: flex; align-items: center; gap: 16px; font-family: 'Inter', sans-serif; font-size: 30px; font-weight: 700; color: #0f5132; }
  .gs svg { width: 54px; height: 72px; }
  .row { display: flex; justify-content: center; margin-top: 22px; }
  .st { border-collapse: collapse; font-size: 26px; }
  .st td { border: 1px solid #000; padding: 6px 16px; }
  .cur { transform: translate(1100px, 300px); }
"""
    write_template(name, page(css, body))
    T_PASTE, T_SEL, T_CLICK = 5.6, 8.2, 10.6
    a = ['.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }',
         '.lng { opacity: 0; animation: slinktisIsKaires 0.5s var(--ease-spring) 0.8s forwards; }',
         '.arr { opacity: 0; animation: fadeIn 0.4s linear 1.8s forwards; }',
         '.gs { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 2.3s forwards; }',
         '.panel { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 4.4s forwards; }',
         f'.st {{ opacity: 0; animation: fadeIn 0.3s linear {T_PASTE}s forwards; }}']
    keys_anim(a, 'kt', 7.4, 2, 0.45)
    # įklijuota lentelė su Word spalvomis → po „Tx“ spalvos dingsta, langeliai lieka
    sel = 'rgba(59,130,246,.28)'
    for selr, c0 in (('.st tr:first-child td', '#D9E2F3'), ('.st tr:not(:first-child) td', '#ffffff')):
        nm = 'u12' + ('h' if 'first' in selr and 'not' not in selr else 'b')
        fw0 = 700 if nm.endswith('h') else 400
        a.append(f'{selr} {{ animation: {nm} {D}s linear 0s both; }}')
        a.append(f'@keyframes {nm} {{ 0%, {100 * T_SEL / D:.3f}% {{ background-color: {c0}; font-family: Calibri, serif; font-weight: {fw0}; color: {WORD_NAVY if fw0 == 700 else "#000"}; }} '
                 f'{100 * (T_SEL + 0.2) / D:.3f}%, {100 * (T_CLICK + 0.2) / D:.3f}% {{ background-color: {sel}; font-family: Calibri, serif; font-weight: {fw0}; color: {WORD_NAVY if fw0 == 700 else "#000"}; }} '
                 f'{100 * (T_CLICK + 0.21) / D:.3f}%, {100 * (T_CLICK + 2.4) / D:.3f}% {{ background-color: {sel}; font-family: \'Times New Roman\', serif; font-weight: 400; color: #000; }} '
                 f'{100 * (T_CLICK + 2.8) / D:.3f}%, 100% {{ background-color: transparent; font-family: \'Times New Roman\', serif; font-weight: 400; color: #000; }} }}')
    cursor_anim(a, 'k12', D, [(0, (1100, 300)), (9.0, (1100, 300)), (10.0, (bx - 6, by - 4)), (11.6, (bx - 6, by - 4)), (12.6, (1100, 300))])
    a[-2] = a[-2].replace('.cursor-wrap', '.cur')
    a.append(f'.r1 {{ animation: ratilasIK 0.6s ease-out {T_CLICK}s forwards; }}')
    a.append('@keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }')
    a.append(f'.zoom {{ transform-origin: {bx:.0f}px {by:.0f}px; animation: zoom12 {D}s linear 0s both; }}')
    a.append(kf('zoom12', D, [(9.2, 1), (10.0, 1.18), (12.0, 1.18), (12.8, 1)],
                lambda v: f'transform: scale({v}); animation-timing-function: cubic-bezier(.4,0,.2,1);'))
    ANIMS[name] = '\n    '.join(a)


def scene_13():
    name, D = '13-redaktoriaus-mygtukai', 15
    key = name.replace('-', '_')
    CONTENT[key] = dict(title="Formatuojate redaktoriaus mygtukais", c_f="Antraštė", c_l="Sąrašas", c_a="Nuoroda", c_x="Uždeda apdarą",
                        h2="Renginiai per atostogas", l1="spalio 28 d. – knygų mainų mugė;", l2="spalio 30 d. – garsiųjų skaitymų popietė.",
                        lnk="Bibliotekos katalogas (ibiblioteka.lt)")
    W = 1600
    content = ('<h2 class="x-h">{{h2}}</h2><ul class="x-l"><li>{{l1}}</li><li>{{l2}}</li></ul>'
               '<p class="x-a"><a>{{lnk}}</a></p>')
    ed, k = editor(W, content, 300)
    # mygtukų sritys (k mastu)
    fx, fy = TB_BTN['fmt']; nx, ny = TB_BTN['num']; lx, ly = TB_BTN['link']
    boxes = {'f': (fx - 62, fy - 20, 124, 40), 'l': (nx - 22, ny - 18, 84, 36), 'a': (lx - 22, ly - 18, 44, 36),
             'x': (276, 98, 324, 40),   # „Font“, „Size“, teksto ir fono spalvos — Eimantas 2026-10-11: „Įdėk“
             'u': (575, 11, 36, 36)}    # „U“ pabraukimas — atrodo kaip nuoroda (Eimantas 2026-10-11)
    rings = ''.join(f'<div class="ring rg-{c}" style="left:{x * k:.0f}px; top:{y * k:.0f}px; width:{w * k:.0f}px; height:{h * k:.0f}px"></div>'
                    for c, (x, y, w, h) in boxes.items())
    chips = ''.join(f'<span class="cp cp-{c}" style="left:{(boxes[c][0] + boxes[c][2] / 2) * k:.0f}px; top:-62px">{{{{c_{c}}}}}</span>'
                    for c in ('f', 'l', 'a', 'x'))
    body = f"""    <div class="title">{{{{title}}}}</div>
    <div class="panel"><div class="ed-wrap" style="width:{W}px">{ed}{rings}{chips}</div></div>"""
    css = ED_CSS + f"""
  .title {{ margin-bottom: 88px; }}
  .x-h {{ font-size: 40px; font-weight: 700; margin: 6px 0 12px; }}
  .x-l {{ margin: 0 0 14px 40px; }}
  .x-a a {{ color: #0645ad; text-decoration: underline; }}
  .x-h, .x-l, .x-a {{ border-radius: 6px; }}
  .ring {{ opacity: 0; }}
  .cp {{ position: absolute; z-index: 8; transform: translateX(-50%); font-family: 'Inter', sans-serif; font-size: 26px; font-weight: 700;
         color: #fff; background: var(--c-blue-solid); border-radius: 10px; padding: 6px 16px; white-space: nowrap; opacity: 0; }}
  .rg-x, .rg-u {{ border-color: var(--c-red-solid); }}
  .cp-x {{ background: var(--c-red-solid); }}
"""
    write_template(name, page(css, body))
    a = ['.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }',
         '.panel { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }']
    # dėmesys slenka: antraštė → sąrašas → nuoroda; kartu ryškėja atitinkama vieta tekste
    for i, (c, tgt) in enumerate((('f', '.x-h'), ('l', '.x-l'), ('a', '.x-a'))):
        t1, t2 = 1.6 + i * 2.6, 1.6 + i * 2.6 + 2.4
        last = False
        st = [(t1, 0), (t1 + 0.3, 1)] + ([] if last else [(t2, 1), (t2 + 0.3, 0)])
        timeline(a, 'u13', D, f'.rg-{c}', 'opacity', st)
        timeline(a, 'u13', D, f'.cp-{c}', 'opacity', st)
        timeline(a, 'u13', D, tgt, 'background-color', [(t1, 'rgba(66,133,244,0)'), (t1 + 0.3, 'rgba(66,133,244,.16)')] +
                 ([] if last else [(t2, 'rgba(66,133,244,.16)'), (t2 + 0.3, 'rgba(66,133,244,0)')]))
    # pabaigoje — mygtukai, kurie uždeda tą patį apdarą kaip Word
    timeline(a, 'u13', D, '.rg-x', 'opacity', [(9.6, 0), (9.9, 1)])
    timeline(a, 'u13', D, '.rg-u', 'opacity', [(10.2, 0), (10.5, 1)])
    timeline(a, 'u13', D, '.cp-x', 'opacity', [(9.6, 0), (9.9, 1)])
    ANIMS[name] = '\n    '.join(a)


def scene_14():
    name, D = '14-pasitikrinkite', 13
    CONTENT[name.replace('-', '_')] = dict(SITE_TEXTS, title="Pasitikrinkite savo svetainėje",
                                           tip_1="Juodai ant balto", tip_2="Baltai ant juodo", n1="1", n2="2")
    cx, cy = BTN_CONTRAST
    tip_top = ACC_TOP + ACC_PITCH / 2 - 22
    extra = (f'<div class="tip tip-1" style="top:{tip_top}px">{{{{tip_1}}}}</div><div class="tip tip-2" style="top:{tip_top}px">{{{{tip_2}}}}</div>'
             f'<div class="rip r1" style="left:{cx}px; top:{cy}px"></div><div class="rip r2" style="left:{cx}px; top:{cy}px"></div>'
             f'<div class="pulse" style="left:{cx - 40}px; top:{cy - 40}px"></div>')
    css = SITE_CSS + STATE_DARK + """
  .pulse { position: absolute; z-index: 7; width: 80px; height: 80px; border-radius: 50%; border: 4px solid var(--c-amber-solid); opacity: 0; }
  .cursor-wrap { transform: translate(1100px, 640px); }
"""
    write_template(name, page(css, scene_body(extra)))
    T1, T2 = 4.2, 5.8
    a = []
    intro_anims(a)
    a.append('@keyframes pulsIK { 0% { opacity: 0; transform: scale(.7); } 40% { opacity: 1; } 100% { opacity: 0; transform: scale(1.3); } }')
    a.append('.pulse { animation: pulsIK 1s ease-out 1.4s 2; }')   # pirma parodoma, kur ieškoti
    cursor_anim(a, 'k14', D, [(0, (1100, 640)), (2.6, (1100, 640)), (3.7, (cx - 6, cy + BAR_H - 4)),
                              (6.6, (cx - 6, cy + BAR_H - 4)), (7.6, (1100, 640))])
    a.append(f'.r1 {{ animation: ratilasIK 0.6s ease-out {T1}s forwards; }}')
    a.append(f'.r2 {{ animation: ratilasIK 0.6s ease-out {T2}s forwards; }}')
    a.append('@keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }')
    timeline(a, 'm14', D, '.tip-1', 'opacity', [(3.7, 0), (3.9, 1), (T1, 1), (T1 + 0.15, 0)])
    timeline(a, 'm14', D, '.tip-2', 'opacity', [(T1 + 0.3, 0), (T1 + 0.5, 1), (T2, 1), (T2 + 0.15, 0)])

    def mode(sel, normal, black, dark, prop):
        timeline(a, 'm14', D, sel, prop, [(T1, normal), (T1 + 0.3, black), (T2, black), (T2 + 0.5, dark)])
    mode('.site', PAGE_BG, '#ffffff', DARK, 'background-color')
    for sel, ons in (('.h-n', (1, 0, 0)), ('.h-b', (0, 1, 0)), ('.h-d', (0, 0, 1)),
                     ('.a-n', (1, 0, 0)), ('.a-b', (0, 1, 0)), ('.a-d', (0, 0, 1))):
        mode(sel, ons[0], ons[1], ons[2], 'opacity')
    mode('.s-page', PAGE_BG, '#ffffff', DARK, 'background-color')
    mode('.s-card', '#ffffff', '#ffffff', DARK, 'background-color')
    mode('.s-side div', SITE_H, '#000000', DARK, 'background-color')
    mode('.s-h1', SITE_H, '#000000', '#ffffff', 'color')
    mode('.s-p', SITE_TEXT, '#000000', '#ffffff', 'color')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 07b Telefone
# Telefono juosta — tikra mobilioji tema (capture_header.js, 390 px); turinys — piešiamas.
PH_W, PH_H, PH_K = 470, 860, 470 / 390     # telefono ekranas: 390 css → 470 px


def phone(cls, inner):
    return (f'<div class="ph {cls}"><div class="ph-scr">'
            f'<img class="ph-head" src="assets/iklijuotas-mobili-antraste.png">'
            f'<div class="ph-page"><div class="ph-h1">{{{{h1}}}}</div><div class="ph-card">{inner}</div></div>'
            f'</div></div>')


def scene_07b():
    name, D = '07b-telefone', 15
    CONTENT[name.replace('-', '_')] = dict(SITE_TEXTS, title="Telefone matyti dar aiškiau", l_lbl="Įklijuota iš Word", r_lbl="Švariai",
        p_long="Atostogų metu mokyklos biblioteka dirba, o mokiniai gali pasiimti knygų skaitymui namuose ir dalyvauti renginiuose.",
        d1="– spalio 28 d. bibliotekoje vyksta knygų mainų mugė visiems mokiniams;",
        d2="– spalio 30 d. – garsiųjų skaitymų popietė.",
        l1="spalio 28 d. bibliotekoje vyksta knygų mainų mugė visiems mokiniams;",
        l2="spalio 30 d. – garsiųjų skaitymų popietė.",
        c_gap="Skylės tarp žodžių", c_dash="Brūkšnelis – ne sąrašas", c_ok="Eilutės lygios")
    bad = ('<p class="pb pb-just">{{p_long}}</p>'
           '<p class="pb pb-d">{{d1}}</p><p class="pb pb-d">{{d2}}</p>')
    good = ('<p class="pg">{{p_long}}</p><ul class="pg-ul"><li>{{l1}}</li><li>{{l2}}</li></ul>')
    body = f"""    <div class="title">{{{{title}}}}</div>
    <div class="phones">
      <div class="col"><div class="lbl lbl-bad">{{{{l_lbl}}}}</div>{phone('ph-bad', bad)}
        <span class="call call-gap">{{{{c_gap}}}}</span><span class="call call-dash">{{{{c_dash}}}}</span></div>
      <div class="col"><div class="lbl lbl-good">{{{{r_lbl}}}}</div>{phone('ph-good', good)}
        <span class="call call-ok">{{{{c_ok}}}}</span></div>
    </div>"""
    css = f"""
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  .card {{ padding: 30px 120px 30px; }}
  .title {{ margin-bottom: 18px; }}
  .phones {{ display: flex; justify-content: center; gap: 140px; }}
  .col {{ position: relative; display: flex; flex-direction: column; align-items: center; }}
  .lbl {{ font-size: 28px; font-weight: 700; margin-bottom: 14px; }}
  .lbl-bad {{ color: var(--c-red-text); }} .lbl-good {{ color: var(--c-green-text); }}
  .ph {{ width: {PH_W + 28}px; height: {PH_H - 40}px; border-radius: 52px; background: #111827; padding: 14px; box-shadow: var(--c-shadow-card); }}
  .ph-scr {{ width: 100%; height: 100%; border-radius: 40px; overflow: hidden; background: {PAGE_BG}; font-family: 'Roboto', sans-serif; }}
  .ph-head {{ display: block; width: {PH_W}px; }}
  .ph-page {{ padding: {20 * PH_K:.0f}px {20 * PH_K:.0f}px; }}
  .ph-h1 {{ font-size: {22 * PH_K:.0f}px; font-weight: 700; color: {SITE_H}; margin: 4px 0 {14 * PH_K:.0f}px; }}
  .ph-card {{ background: #fff; padding: {20 * PH_K:.0f}px; }}
  /* Word: lygiavimas per abu kraštus, pirmos eilutės atitraukimas, ranka sudėti brūkšneliai */
  .pb {{ font-family: Calibri, 'Times New Roman', serif; font-size: 24px; line-height: 1.35; color: #000; margin: 0 0 12px; }}
  .pb-just {{ text-align: justify; text-indent: 40px; }}
  .pg {{ font-size: 23px; line-height: 1.6; color: {SITE_TEXT}; margin: 0 0 14px; }}
  .pg-ul {{ margin: 0 0 0 28px; padding: 0; font-size: 23px; line-height: 1.6; color: {SITE_TEXT}; }}
  .pg-ul li {{ margin-bottom: 6px; }}
  .call {{ position: absolute; font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 700; padding: 8px 16px; border-radius: 10px;
           white-space: nowrap; box-shadow: var(--c-shadow-card); }}
  .call-gap, .call-dash {{ background: var(--c-red-bg); color: var(--c-red-text); border: 2px solid var(--c-red-solid); right: calc(100% + 22px); }}
  .call-gap {{ top: 270px; }} .call-dash {{ top: 440px; }}
  .call-ok {{ background: var(--c-green-bg); color: var(--c-green-text); border: 2px solid var(--c-green-solid); left: calc(100% + 22px); top: 440px; }}
"""
    write_template(name, page(css, body))
    a = ['.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }',
         '.col:nth-child(1) { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.6s forwards; }',
         '.col:nth-child(2) { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 1.6s forwards; }',
         '.call-gap { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 4.4s forwards; }',
         '.call-dash { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 6.4s forwards; }',
         '.call-ok { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 8.6s forwards; }']
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 13b Pabraukta – vadinasi, nuoroda?
LINK_C = '#2b5d8a'


def scene_13b():
    name, D = '13b-pabraukimas', 12
    CONTENT[name.replace('-', '_')] = dict(SITE_TEXTS, title="Pabraukta – vadinasi, nuoroda?",
        u_a="Atostogų metu", u_b="nemokamas", u_c="maitinimas neteikiamas.",
        lk="Valgiaraštis (mokykla.lt)", no="Ne nuoroda", yes="Nuoroda")
    card = (f'<p class="s-p">{{{{p_editor}}}}</p>'
            f'<p class="s-p up">{{{{u_a}}}} <u class="uw">{{{{u_b}}}}</u> {{{{u_c}}}}</p>'
            f'<p class="s-p"><a class="lk">{{{{lk}}}}</a></p>')
    top0 = HEAD['normalus'] + CARD_TOP + 44
    uy = top0 + 57 + 18                 # pabrauktas žodis (.site koordinatės)
    ly = top0 + 114 + 18                # tikra nuoroda
    ux = LEFT + 50 + 170
    lx = LEFT + 50 + 120
    extra = (f'<div class="rip r1" style="left:{ux}px; top:{uy}px"></div>'
             f'<span class="tag tag-no" style="left:{LEFT + 50 + 600}px; top:{uy - 22}px">{{{{no}}}}</span>'
             f'<span class="tag tag-yes" style="left:{LEFT + 50 + 600}px; top:{ly - 22}px">{{{{yes}}}}</span>')
    css = SITE_CSS + STATE_NORMAL + f"""
  .uw {{ text-decoration: underline; text-underline-offset: 3px; }}
  .lk {{ color: {LINK_C}; text-decoration: underline; text-underline-offset: 3px; }}
  .tag {{ position: absolute; z-index: 8; font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 700; padding: 6px 14px; border-radius: 10px; white-space: nowrap; }}
  .tag-no {{ background: var(--c-red-bg); color: var(--c-red-text); border: 2px solid var(--c-red-solid); }}
  .tag-yes {{ background: var(--c-green-bg); color: var(--c-green-text); border: 2px solid var(--c-green-solid); }}
  .cursor-wrap {{ transform: translate({lx}px, {ly + BAR_H}px); }}
"""
    write_template(name, page(css, scene_body(extra, '', card)))
    T_CLICK = 3.6
    a = []
    intro_anims(a)
    cursor_anim(a, 'k13b', D, [(0, (900, 700)), (1.6, (900, 700)), (2.8, (ux, uy + BAR_H - 6)),
                               (5.6, (ux, uy + BAR_H - 6)), (7.4, (lx, ly + BAR_H - 6))])
    a.append(f'.r1 {{ animation: ratilasIK 0.6s ease-out {T_CLICK}s forwards; }}')
    a.append('@keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }')
    # spustelėjus — nieko neįvyksta: žodis tik trumpai „krūptelėja“
    a.append('@keyframes kruptelejaIK { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }')
    a.append(f'.uw {{ display: inline-block; animation: kruptelejaIK 0.3s ease-in-out {T_CLICK + 0.2}s 2; }}')
    a.append(f'.tag-no {{ opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) {T_CLICK + 0.9}s forwards; }}')
    a.append('.tag-yes { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 7.8s forwards; }')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- rašymas
def write_template(name, html):
    os.makedirs(os.path.join(HERE, 'templates'), exist_ok=True)
    open(os.path.join(HERE, 'templates', name + '.html'), 'w', encoding='utf-8').write(html)


def write_content():
    os.makedirs(os.path.join(HERE, 'content'), exist_ok=True)
    json.dump(CONTENT, open(os.path.join(HERE, 'content', 'lt.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)


def write_anims():
    p = os.path.join(ILL, 'generate-video-clips.js')
    js = open(p, encoding='utf-8').read()
    start = '  // >>> IKLIJUOTAS-TEKSTAS (generuoja lessons/kas-slypi-po-iklijuotu-tekstu/build_scenes.py — ranka neredaguoti)\n'
    end = '  // <<< IKLIJUOTAS-TEKSTAS\n'
    block = start + ''.join(f"  '{n}': `\n    {css}\n  `,\n" for n, css in ANIMS.items()) + end
    if start in js:
        js = js[:js.index(start)] + block + js[js.index(end) + len(end):]
    else:
        anchor = 'const TEMPLATE_ANIMATIONS = {\n'
        js = js.replace(anchor, anchor + block, 1)
    open(p, 'w', encoding='utf-8').write(js)


if __name__ == '__main__':
    scene_01()
    scene_02()
    scene_03()
    scene_04()
    scene_05()
    scene_06()
    scene_07()
    scene_07b()
    scene_08()
    scene_09()
    scene_10()
    scene_11()
    scene_12()
    scene_13()
    scene_13b()
    scene_14()
    write_content()
    write_anims()
    print('Scenos:', ', '.join(ANIMS))
