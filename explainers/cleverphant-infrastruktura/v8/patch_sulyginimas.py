# -*- coding: utf-8 -*-
"""2026-10-13: maketo pataisos abiem versijoms + EN sulyginimas su LT. Vienkartinis."""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
LT = os.path.join(HERE, '..', '..', 'cleverphant-infrastruktura-lt', 'v8')

def patch(path, pairs):
    s = open(path, encoding='utf-8').read()
    for a, b in pairs:
        assert a in s, (os.path.basename(path), a[:80]); s = s.replace(a, b, 1)
    open(path, 'w', encoding='utf-8').write(s)

# ---- 1. maketas: abiejuose šablonuose (EN template.html ir LT template-en.html)
LAYOUT = [
 # žiedai, kurie turi atsirasti tik savo metu (fromTo be immediateRender:false rodė juos nuo scenos pradžios)
 ('{ opacity: 0, attr: { r: 560 }, duration: 1.8, ease: "power1.out" }', '{ opacity: 0, attr: { r: 560 }, duration: 1.8, ease: "power1.out", immediateRender: false }'),
 ('{ opacity: 0, attr: { r: 1300 }, duration: 2.6, ease: "power1.out" }', '{ opacity: 0, attr: { r: 1300 }, duration: 2.6, ease: "power1.out", immediateRender: false }'),
 # „up to date“ žyma nebelipa ant svetainės
 ('<div id="c2fresh" class="chip" style="left:960px;top:270px;', '<div id="c2fresh" class="chip" style="left:960px;top:244px;'),
 # piloto juosta ir „slow… very slow…“ po žyma, ne ant tinklo; duomenų stulpeliai žemiau
 ('`left:${ux + 130}px;top:${uy + 26}px;width:240px', '`left:${ux}px;top:${uy + 76}px;width:240px'),
 ('`left:${ux + 130}px;top:${uy + 50}px;font-size:22px`', '`left:${ux}px;top:${uy + 100}px;font-size:22px`'),
 ('top:${uy + 230 - h}px;width:30px', 'top:${uy + 296 - h}px;width:30px'),
 ('`left:${ux + 62}px;top:${uy + 242}px;font-size:24px`', '`left:${ux + 62}px;top:${uy + 308}px;font-size:24px`'),
]
patch(os.path.join(HERE, 'template.html'), LAYOUT)
patch(os.path.join(LT, 'template-en.html'), LAYOUT)
# LT vertimo skripte: senas piloto poslinkis nebereikalingas, halo — be immediateRender
s = open(os.path.join(LT, 'translate_lt.py'), encoding='utf-8').read()
a = s.index("T += [('`left:${ux + 130}px;top:${uy + 26}px;width:240px'"); b = s.index('\n', s.index("('`left:${ux + 130}px;top:${uy + 50}px", a)) + 1
s = s[:a] + s[b:]
s = s.replace('duration: 1.4, ease: "power1.out", repeat: 2 }', 'duration: 1.4, ease: "power1.out", repeat: 2, immediateRender: false }', 1)
open(os.path.join(LT, 'translate_lt.py'), 'w', encoding='utf-8').write(s)

# ---- 2. EN turinys
sc = json.load(open(os.path.join(HERE, 'scenes.json'))); T = {x['title']: x for x in sc}
def rv(t, a, b):
    assert a in T[t]['voice'], (t, a); T[t]['voice'] = T[t]['voice'].replace(a, b, 1)
rv('Details', 'Five hundred. A thousand, and counting.', 'Five hundred… and more.')
rv('Pilot → standard', 'A curious school leader', 'An innovative school leader')
rv('Trojan elephant', 'One bite at a time. And every',
   'One bite at a time. Today the headings. Tomorrow the cookie banner. The day after, document names. '
   'No single bite looks like a reform. A year later, the school is different. And every')
rv('Walked this road', "Today: almost three hundred institutions, in fifty-one of Lithuania's sixty municipalities, all on one standard.",
   "Today: almost three hundred institutions on one standard, with at least one client in eighty-five percent of Lithuania's municipalities.")
json.dump(sc, open(os.path.join(HERE, 'scenes.json'), 'w'), ensure_ascii=False, indent=1)

patch(os.path.join(HERE, 'voice.py'), [
 ("'Five hundred', 'thousand']", "'Five hundred', 'and more']"),
 ("'Pilot → standard': ['curious',", "'Pilot → standard': ['innovative',"),
 ("'eat an elephant', 'One bite',", "'eat an elephant', 'One bite', 'Today the', 'Tomorrow', 'The day after', 'reform', 'A year later',"),
 ("SRC = {'Fair warning': 'sintro',", "SRC = {'Fair warning': 'sintro', 'Pilot → standard': 'spilot',"),
])
patch(os.path.join(HERE, 'build.py'), [("'Five hundred', 'thousand']", "'Five hundred', 'and more']")])

BITES = open(os.path.join(HERE, 'bites_en.js'), encoding='utf-8').read().rstrip()
patch(os.path.join(HERE, 'template.html'), [
 ('["× 1 000 and counting", w(1, "thousand")]', '["× 500 … and more", w(1, "and more")]'),
 ('["fixed × 1 000",', '["fixed × 500 … and more",'),
 ('w(8, "curious")', 'w(8, "innovative")'), ('w(8, "curious")', 'w(8, "innovative")'),
 ('>almost 300 institutions · 51 of 60 municipalities<', '>almost 300 institutions · clients in 85% of municipalities<'),
 ('<div class="h" id="c11b">',
  '<div class="h" id="c11n">No single bite is <em>a reform</em>.</div>\n    <div class="h" id="c11y">A year later, <em>a different school</em>.</div>\n    <div id="c11bites"></div>\n    <div class="h" id="c11b">'),
 ('transform:scale(0)"></div></div>',
  'transform:scale(0)"></div><div class="bite" style="position:absolute;left:226px;top:196px;width:84px;height:84px;border-radius:50%;background:#f3f5fa;transform:scale(0)"></div></div>'),
 ('  head("#c11m", w(11, "eat an elephant") - 0.1, w(11, "every next step") - 0.5);',
  '  head("#c11m", w(11, "eat an elephant") - 0.1, w(11, "reform") - 0.6);\n  head("#c11n", w(11, "reform") - 0.1, w(11, "A year later") - 0.6);\n  head("#c11y", w(11, "A year later") - 0.1, w(11, "every next step") - 0.5);'),
 ('  document.querySelectorAll("#c11eat .bite").forEach((b, k) => tl.to(b, { scale: 1, duration: 0.25, ease: "back.out(2)" }, w(11, "One bite") + k * 0.45));', BITES),
])
print('ok')
