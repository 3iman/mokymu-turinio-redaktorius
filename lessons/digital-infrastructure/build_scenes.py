# -*- coding: utf-8 -*-
"""
„Digital infrastructure in action" — LinkedIn filmukas anglų kalba.

Scenos generuojamos ta pačia grandine kaip pamokos, bet BE intro, BE skirtukų kortelių
ir BE vinjetės: scenarijuje stovi jungikliai `**Intro:** ne`, `**Skirtukai:** ne`,
`**Vinjetė:** ne`. Priežastis — 75 s filmukui tie trys elementai suvalgytų trečdalį laiko,
o paskutinis kadras pats yra CTA.

Vizualika iš design.webas.lt/clvweb (ta pati, kaip „Vaiduoklis po numeriu"):
pynė per simbolį, 255 plytelių tinklelis, brand paletė.
⛔ Vienintelė išimtis — RAUDONA 2 kadro kairėje pusėje: ji žymi ne kliento, o alternatyvaus
modelio kainą. Mokyklų filmuke raudonos nenaudojame, čia ji yra palyginimo ašis.

Paleidimas: python3 build_scenes.py
"""
import json, math, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ILL = os.path.abspath(os.path.join(HERE, '..', '..'))

CONTENT = {"lang": "en"}
ANIMS = {}

SITES = 255
PLACES = 341

BRAND = dict(navy='#3464ad', teal='#3ab0b0', pink='#f3a8c4', lav='#c6b8db',
             ink='#1a1a1a', gray='#646b77', dark='#0f172a', red='#dc2626',
             noise='#ccd6e0', noise2='#bcc8d4')


def kf(name, D, steps, prop_fn):
    rows = ['0%% { %s }' % prop_fn(steps[0][1])]
    for t, v in steps:
        rows.append('%.3f%% { %s }' % (100.0 * t / D, prop_fn(v)))
    rows.append('100%% { %s }' % prop_fn(steps[-1][1]))
    return '@keyframes %s { %s }' % (name, ' '.join(rows))


def timeline(a, prefix, D, sel, prop, steps):
    nm = prefix + '_' + re.sub(r'[^a-z0-9]', '', (sel + prop).lower())
    a.append('%s { animation: %s %ss linear 0s both; }' % (sel, nm, D))
    a.append(kf(nm, D, steps, lambda v: '%s: %s;' % (prop, v)))


def page(css, body, dark=False):
    cls = 'card dark' if dark else 'card'
    return ('<!DOCTYPE html>\n<html lang="{{lang}}">\n<head>\n<meta charset="UTF-8">\n'
            '<link rel="stylesheet" href="./tokens/tokens.css">\n'
            '<link rel="stylesheet" href="./tokens/base.css">\n'
            '<style>%s</style>\n</head>\n<body>\n  <div class="%s">\n%s\n  </div>\n</body>\n</html>\n'
            % (css, cls, body))


def write_template(name, html):
    os.makedirs(os.path.join(HERE, 'templates'), exist_ok=True)
    open(os.path.join(HERE, 'templates', name + '.html'), 'w', encoding='utf-8').write(html)


BASE = """
  .card { padding: 60px 110px; }
  .card.dark { background: %s; }
  .card.dark .title { color: #fff; }
""" % BRAND['dark']

CHECK = ('<svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" '
         'stroke-linejoin="round"><path d="M4 12.5l5.5 5.5L20 6.5"/></svg>')


# ---------------------------------------------------------------- pynė (iš brand hero)
def smoothstep(a, b, x):
    t = max(0.0, min(1.0, (x - a) / float(b - a)))
    return t * t * (3 - 2 * t)


def braid(n=13, x0=36, x1=800, cy=300, xg=460, step=12, spread=168, lane=104):
    out = []
    lanes = [(-1 + 2.0 * i / (n - 1)) * lane for i in range(n)]
    for i in range(n):
        sp = (-1 + 2.0 * i / (n - 1)) * spread
        amp = 24 + ((i * 37) % 44)
        lam = 150 + ((i * 83) % 170)
        ph = (i * 1.37) % (2 * math.pi)
        pts, L, px, py = [], 0.0, None, None
        x = x0
        while x <= x1:
            u = smoothstep(xg - 180, xg + 80, x)
            y = cy + (1 - u) * (sp + amp * math.sin(2 * math.pi * x / lam + ph)) + u * lanes[i]
            if px is not None:
                L += math.hypot(x - px, y - py)
            pts.append('%.1f %.1f' % (x, y))
            px, py = x, y
            x += step
        out.append(('M' + ' L'.join(pts), L * 1.06))
    return out


# ---------------------------------------------------------------- 255 plytelių tinklelis
GC, GW, GH, GG = 17, 70, 30, 6
GRID_W = GC * (GW + GG) - GG
GRID_H = ((SITES + GC - 1) // GC) * (GH + GG) - GG


def grid_html():
    out = []
    for i in range(SITES):
        row, col = divmod(i, GC)
        out.append('<div class="tl t%d" style="left:%dpx; top:%dpx"></div>'
                   % (i, col * (GW + GG), row * (GH + GG)))
    return ''.join(out)


GRID_CSS = """
  .grid { position: relative; width: %dpx; height: %dpx; margin: 0 auto; }
  .tl { position: absolute; width: %dpx; height: %dpx; border-radius: 5px; background: var(--c-green-bg);
        border: 1.5px solid var(--c-green-border); overflow: hidden; }
  .tl::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 7px;
                background: var(--c-green-solid); }
""" % (GRID_W, GRID_H, GW, GH)


# ---------------------------------------------------------------- 1 Hook
def scene_01():
    name, D = '01-hook', 12
    CONTENT[name.replace('-', '_')] = dict(
        title="One snippet. Two hundred and fifty websites.",
        big=str(SITES), k1="1 hidden code ghost", k2=str(SITES) + " website network",
        k3=str(PLACES) + " code locations", foot="Public and educational sector")
    body = """    <div class="hook">
      <div class="big">{{big}}</div>
      <div class="keys"><span class="kk a1">{{k1}}</span><span class="dot d1">·</span>
        <span class="kk a2">{{k2}}</span><span class="dot d2">·</span>
        <span class="kk a3">{{k3}}</span></div>
      <div class="foot">{{foot}}</div>
    </div>
    <div class="flash"></div>"""
    css = BASE + """
  .card { display: flex; align-items: center; justify-content: center; }
  .hook { text-align: center; position: relative; z-index: 2; }
  .big { font-size: 280px; font-weight: 800; line-height: 1; letter-spacing: -8px; color: #fff; }
  .keys { display: flex; align-items: center; justify-content: center; gap: 22px; margin-top: 40px; }
  .kk { font-size: 34px; font-weight: 600; color: #cbd5e1; }
  .kk.a1 { color: var(--c-amber-solid); }
  .dot { font-size: 34px; color: #475569; }
  .foot { margin-top: 44px; font-size: 26px; letter-spacing: .18em; text-transform: uppercase; color: #64748b; }
  .flash { position: absolute; inset: 0; background: var(--c-amber-solid); opacity: 0; z-index: 1; }
"""
    write_template(name, page(css, body, dark=True))
    a = []
    a.append('.big { opacity: 0; animation: fadeUpHeavy 0.7s var(--ease-spring) 0.3s forwards; }')
    for i, t in ((1, 2.6), (2, 3.4), (3, 4.2)):
        a.append('.a%d { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) %.2fs forwards; }' % (i, t))
    for i, t in ((1, 3.2), (2, 4.0)):
        a.append('.d%d { opacity: 0; animation: fadeIn 0.3s linear %.2fs forwards; }' % (i, t))
    timeline(a, 'm1', D, '.flash', 'opacity', [(5.4, '0'), (5.55, '.22'), (5.9, '0'), (11.4, '0')])
    timeline(a, 'm1', D, '.foot', 'opacity', [(6.6, '0'), (7.4, '1'), (11.4, '1')])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 2 Contrast
def scene_02():
    name, D = '02-contrast', 13
    CONTENT[name.replace('-', '_')] = dict(
        title="Two ways to fix the same line",
        l_h="Traditional agency model", l_s=str(SITES) + " emails · weeks of manual work",
        r_h="Centralized infrastructure", r_s="One pass through one standard")
    mails = ''.join('<span class="ml m%d" style="left:%dpx; top:%dpx; transform:rotate(%ddeg)"></span>'
                    % (i, (i * 97) % 700 + 22, (i * 53) % 480 + 40, (i * 37) % 40 - 20)
                    for i in range(22))
    paths = braid()
    svg = ''.join('<path class="st s%d" d="%s" stroke="%s" stroke-width="%s" style="--dash:%.0f" />'
                  % (i, d, (BRAND['navy'] if i == 3 else BRAND['teal'] if i == 6 else
                            BRAND['lav'] if i == 9 else (BRAND['noise'] if i % 2 else BRAND['noise2'])),
                     '5.5' if i in (3, 6, 9) else '3.0', L)
                  for i, (d, L) in enumerate(paths))
    body = """    <div class="title">{{title}}</div>
    <div class="split">
      <div class="side left">
        <div class="s-h">{{l_h}}</div>
        <div class="stage">%s<span class="bang b1">!</span><span class="bang b2">!</span><span class="bang b3">!</span></div>
        <div class="s-s">{{l_s}}</div>
      </div>
      <div class="side right">
        <div class="s-h">{{r_h}}</div>
        <div class="stage">
          <svg class="braid" viewBox="0 0 840 600">%s</svg>
          <img class="sym" src="assets/cleverphant-simbolis-spalvotas.svg" alt="">
        </div>
        <div class="s-s">{{r_s}}</div>
      </div>
    </div>""" % (mails, svg)
    css = BASE + """
  .card { padding: 46px 70px 50px; }
  .title { margin-bottom: 34px; }
  .split { display: flex; gap: 46px; justify-content: center; }
  .side { width: 840px; }
  .s-h { font-size: 28px; font-weight: 700; color: var(--c-text); margin-bottom: 18px; }
  .s-s { font-size: 25px; color: """ + BRAND['gray'] + """; margin-top: 18px; }
  .stage { position: relative; height: 600px; border-radius: 26px; overflow: hidden;
           background: var(--c-surface); border: 1.5px solid var(--c-border); }
  .left .stage { background: #fdf2f2; border-color: #f3d2d2; }
  .ml { position: absolute; width: 74px; height: 50px; border-radius: 7px; background: #fff;
        border: 2px solid #e3b9b9; box-shadow: 0 6px 16px rgba(220,38,38,.10); }
  .ml::after { content: ''; position: absolute; left: 8px; right: 8px; top: 10px; height: 2px;
               background: #e3b9b9; box-shadow: 0 8px 0 #eccfcf, 0 16px 0 #f2dede; }
  .bang { position: absolute; font-size: 54px; font-weight: 800; color: """ + BRAND['red'] + """; }
  .b1 { left: 160px; top: 110px; } .b2 { left: 450px; top: 330px; } .b3 { left: 690px; top: 180px; }
  .braid { position: absolute; left: 0; top: 0; width: 840px; height: 600px; fill: none; }
  .braid .st { stroke-linecap: round; stroke-dasharray: var(--dash); stroke-dashoffset: 0; }
  .sym { position: absolute; left: 460px; top: 300px; width: 112px; height: 112px;
         transform: translate(-50%, -50%); filter: drop-shadow(0 10px 26px rgba(26,26,26,.16)); }
"""
    write_template(name, page(css, body))
    a = []
    a.append('.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }')
    a.append('.left { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.5s forwards; }')
    a.append('.right { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 1.1s forwards; }')
    for i in range(22):
        a.append('.m%d { opacity: 0; animation: fadeIn 0.25s linear %.2fs forwards; }' % (i, 1.6 + i * 0.09))
    for i, t in ((1, 3.3), (2, 3.7), (3, 4.1)):
        a.append('.b%d { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) %.2fs forwards; }' % (i, t))
    for i in range(len(paths)):
        a.append('.s%d { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) %.2fs forwards; }'
                 % (i, 5.4 + (i % 5) * 0.12))
    a.append('@keyframes draw { from { stroke-dashoffset: var(--dash); } to { stroke-dashoffset: 0; } }')
    timeline(a, 'm2', D, '.sym', 'opacity', [(6.4, '0'), (7.2, '1'), (12.4, '1')])
    a.append('.sym { animation: iconPulse 1.6s var(--ease-soft) 7.4s 2; }')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 3 Solution
def scene_03():
    """Tinklas, ne lentelė (Eimantas 2026-10-30: „03 kadras labai silpnai atrodo").
    Brief'as sako „pulses ripple through the network" — todėl centre stovi Cleverphant
    simbolis, aplink jį 255 mazgai žiedais, o impulsas sklinda nuo centro į kraštą ir
    paeiliui nudažo žiedus žaliai. Bazė — galutinė (žalia) būsena."""
    name, D = '03-solution', 17
    CX, CY = 960, 586
    RINGS = (122, 168, 214, 260, 306, 352)
    counts, total = [], 0
    for r in RINGS:
        c = max(8, int(round(2 * math.pi * r / 34.0)))
        counts.append(c)
        total += c
    counts[-1] += SITES - total                      # tiksliai 255 mazgai
    CONTENT[name.replace('-', '_')] = dict(
        title="One pulse across the whole network",
        chip="AI and MCP automation",
        cap="255 websites · " + str(PLACES) + " locations · one deployment")
    nodes, lines, idx = [], [], 0
    for k, r in enumerate(RINGS):
        for j in range(counts[k]):
            ang = 2 * math.pi * j / counts[k] + k * 0.26
            x, y = CX + r * math.cos(ang), CY + r * math.sin(ang)
            nodes.append('<circle class="nd g%d" cx="%.1f" cy="%.1f" r="6" />' % (k, x, y))
            if idx % 7 == 0:
                lines.append('<line class="ln" x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" />'
                             % (CX + 86 * math.cos(ang), CY + 86 * math.sin(ang), x, y))
            idx += 1
    rings = ''.join('<circle class="rp p%d" cx="%d" cy="%d" r="90" />' % (i, CX, CY) for i in range(3))
    body = """    <div class="title">{{title}}</div>
    <svg class="net" viewBox="0 0 1920 1080">
      <circle class="hubbg" cx="%d" cy="%d" r="104" fill="#fff" />
      <g class="lines">%s</g>
      %s
      %s
    </svg>
    <img class="hub" src="assets/cleverphant-simbolis-spalvotas.svg" alt="">
    <div class="chip">{{chip}}</div>
    <div class="cap">{{cap}}</div>""" % (CX, CY, ''.join(lines), rings, ''.join(nodes))
    css = BASE + """
  .card { padding: 46px 0 0; position: relative; overflow: hidden; justify-content: flex-start; }
  .title { position: relative; z-index: 3; }
  .net { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; }
  .lines line { stroke: #d7dee7; stroke-width: 1.6; }
  .nd { fill: var(--c-green-solid); }
  .rp { fill: none; stroke: """ + BRAND['teal'] + """; stroke-width: 3; opacity: 0; }
  .hub { position: absolute; left: """ + str(CX) + """px; top: """ + str(CY) + """px;
         width: 150px; height: 150px;
         transform: translate(-50%, -50%); filter: drop-shadow(0 16px 40px rgba(26,26,26,.20)); }
  .chip { position: absolute; left: 50%; bottom: 112px; transform: translateX(-50%);
          background: var(--c-purple-bg); border: 2px solid var(--c-purple-border);
          color: var(--c-purple-text); font-size: 29px; font-weight: 800; padding: 10px 32px;
          border-radius: 999px; white-space: nowrap; }
  .cap { position: absolute; left: 0; right: 0; bottom: 56px; text-align: center; font-size: 26px;
         color: """ + BRAND['gray'] + """; }
"""
    write_template(name, page(css, body))
    a = []
    a.append('.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }')
    a.append('.lines { opacity: 0; animation: fadeIn 0.8s linear 1.4s forwards; }')
    timeline(a, 'm3', D, '.hub', 'opacity', [(0.6, '0'), (1.4, '1'), (16.4, '1')])
    a.append('.hub { animation: iconPulse 1.8s var(--ease-soft) 3.2s 3; }')
    for k in range(len(RINGS)):
        t0 = 0.9 + k * 0.22
        timeline(a, 'm3', D, '.g%d' % k, 'opacity', [(t0, '0'), (t0 + 0.35, '1'), (16.4, '1')])
        tg = 4.1 + k * 0.72
        timeline(a, 'm3', D, '.g%d' % k, 'fill',
                 [(tg, '#c9d3dd'), (tg + 0.3, 'var(--c-green-solid)'), (16.4, 'var(--c-green-solid)')])
    for i in range(3):
        s0 = 3.4 + i * 1.5
        timeline(a, 'm3', D, '.p%d' % i, 'r', [(s0, '90'), (s0 + 2.1, '430'), (16.4, '430')])
        timeline(a, 'm3', D, '.p%d' % i, 'opacity', [(s0, '0'), (s0 + 0.2, '.55'), (s0 + 2.1, '0'), (16.4, '0')])
    timeline(a, 'm3', D, '.chip', 'opacity', [(9.8, '0'), (10.6, '1'), (16.4, '1')])
    timeline(a, 'm3', D, '.cap', 'opacity', [(11.8, '0'), (12.6, '1'), (16.4, '1')])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 4 Lifecycle
def scene_04():
    name, D = '04-lifecycle', 16
    STEPS = ("Issue identified", "Execution plan formulated",
             "Centralized update deployed", "Clients informed and educated")
    CONTENT[name.replace('-', '_')] = dict(
        title="From code inspection to client education", cap="Automation is the tool. Governance is the value.")
    rows = ''.join('<div class="st r%d"><span class="n">%d</span><span class="i">%s</span>'
                   '<span class="t">%s</span></div>' % (i, i + 1, CHECK, t) for i, t in enumerate(STEPS))
    body = """    <div class="title">{{title}}</div>
    <div class="steps">%s</div>
    <div class="cap">{{cap}}</div>""" % rows
    css = BASE + """
  .card { padding: 56px 110px 56px; }
  .title { margin-bottom: 46px; }
  .steps { width: 1200px; margin: 0 auto; }
  .st { display: flex; align-items: center; gap: 26px; background: var(--c-green-bg);
        border: 1.5px solid var(--c-green-border); border-radius: 18px; padding: 22px 32px; margin-bottom: 18px; }
  .st .n { width: 50px; height: 50px; flex: none; border-radius: 50%; background: #fff;
           border: 1.5px solid var(--c-green-border); color: var(--c-green-text); font-size: 25px;
           font-weight: 800; display: flex; align-items: center; justify-content: center; }
  .st .i svg { width: 30px; height: 30px; display: block; }
  .st .t { font-size: 33px; color: var(--c-text); }
  .cap { text-align: center; font-size: 29px; font-weight: 700; color: """ + BRAND['navy'] + """; margin-top: 40px; }
"""
    write_template(name, page(css, body))
    a = []
    a.append('.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }')
    for i in range(4):
        a.append('.r%d { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) %.2fs forwards; }'
                 % (i, 1.6 + i * 2.1))
        timeline(a, 'm4', D, '.r%d .i' % i, 'opacity', [(2.3 + i * 2.1, '0'), (2.8 + i * 2.1, '1'), (15.4, '1')])
    timeline(a, 'm4', D, '.cap', 'opacity', [(11.4, '0'), (12.3, '1'), (15.4, '1')])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 5 CTA
def scene_05():
    name, D = '05-cta', 19
    CONTENT[name.replace('-', '_')] = dict(
        lead="Today a legacy phone link. Tomorrow an accessibility mandate or a security standard.",
        tag="Digital infrastructure for the public and educational sector",
        btn="cleverphant.com/partners", sub="Become a Master Partner")
    body = """    <div class="cta">
      <img class="logo" src="assets/cleverphant-baltas.png" alt="Cleverphant">
      <div class="lead">{{lead}}</div>
      <div class="tag">{{tag}}</div>
      <div class="btn">{{btn}}</div>
      <div class="sub">{{sub}}</div>
    </div>"""
    css = BASE + """
  .card { display: flex; align-items: center; justify-content: center; }
  .cta { text-align: center; width: 1300px; }
  .logo { height: 86px; display: block; margin: 0 auto 54px; }
  .lead { font-size: 40px; line-height: 1.4; color: #cbd5e1; }
  .tag { font-size: 29px; letter-spacing: .14em; text-transform: uppercase; color: #64748b; margin-top: 40px; }
  .btn { display: inline-block; margin-top: 46px; background: #fff; color: """ + BRAND['dark'] + """;
         font-size: 34px; font-weight: 700; padding: 20px 46px; border-radius: 12px; }
  .sub { font-size: 30px; font-weight: 700; color: """ + BRAND['teal'] + """; margin-top: 30px; }
"""
    write_template(name, page(css, body, dark=True))
    a = []
    a.append('.logo { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }')
    timeline(a, 'm5', D, '.lead', 'opacity', [(1.6, '0'), (2.4, '1'), (18.4, '1')])
    timeline(a, 'm5', D, '.tag', 'opacity', [(8.4, '0'), (9.2, '1'), (18.4, '1')])
    timeline(a, 'm5', D, '.btn', 'opacity', [(11.8, '0'), (12.6, '1'), (18.4, '1')])
    a.append('.btn { animation: attentionPulse 1.8s var(--ease-soft) 13.0s 2; }')
    timeline(a, 'm5', D, '.sub', 'opacity', [(14.8, '0'), (15.6, '1'), (18.4, '1')])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- rašymas
def write_content():
    os.makedirs(os.path.join(HERE, 'content'), exist_ok=True)
    json.dump(CONTENT, open(os.path.join(HERE, 'content', 'en.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=2)


def write_anims():
    p = os.path.join(ILL, 'generate-video-clips.js')
    js = open(p, encoding='utf-8').read()
    start = '  // >>> DIGITAL-INFRA (generuoja lessons/digital-infrastructure/build_scenes.py — ranka neredaguoti)\n'
    end = '  // <<< DIGITAL-INFRA\n'
    block = start + ''.join("  '%s': `\n    %s\n  `,\n" % (n, css) for n, css in ANIMS.items()) + end
    if start in js:
        js = js[:js.index(start)] + block + js[js.index(end) + len(end):]
    else:
        anchor = 'const TEMPLATE_ANIMATIONS = {\n'
        js = js.replace(anchor, anchor + block, 1)
    open(p, 'w', encoding='utf-8').write(js)


if __name__ == '__main__':
    for fn in (scene_01, scene_02, scene_03, scene_04, scene_05):
        fn()
    write_content()
    write_anims()
    print('Scenos:', ', '.join(ANIMS))
