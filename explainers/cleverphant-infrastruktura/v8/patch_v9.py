# -*- coding: utf-8 -*-
"""2026-10-14 (Eimantas): 12 klaidų, medis (vėjas, lietus, saulė), „agentūra / konstruktorius“, mokyklos indėlis, „Publish once“ be steigėjų. EN."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
s = open('template.html', encoding='utf-8').read()
def R(a, b):
    global s
    assert a in s, a[:100]; s = s.replace(a, b, 1)

# --- 1. Details: 12 klaidų
a = s.index('  const ISS = ['); b = s.index('  head("#c1g"')
s = s[:a] + open('iss12_en.js', encoding='utf-8').read().replace('NEWS_NODATE', 'No date · no category') + s[b:]
R('icards.forEach((k, i) => tl.to(k.c, { scale: 0.1, opacity: 0, x: 960 - (k.x + 250), y: 620 - (k.y + 135),',
  'icards.forEach((k, i) => tl.to(k.c, { scale: 0.1, opacity: 0, x: 960 - (k.x + 200), y: 620 - (k.y + 114),')
R('<div class="h" id="c1a">Each one looks like a <em>detail</em>.</div>',
  '<div class="h" id="c1h">Twelve mistakes that catch the eye <em>most</em>.</div>\n    <div class="h" id="c1a">Each mistake looks like a <em>detail</em>.</div>')

# --- 2. Medis
R('TR, "New tender · new website");', 'TR, "New tender");')
a = s.index('  // mūsų medis — nekertamas'); b = s.index('  head("#c4b", w(4, "Ours") - 0.1);') + len('  head("#c4b", w(4, "Ours") - 0.1);')
s = s[:a] + open('tree_en.js', encoding='utf-8').read().rstrip('\n').replace('RULES.forEach', '["New accessibility law", "New data rules", "New standard"].forEach') + s[b:]

# --- 3. Platforma su žmogaus prisilietimu + mokyklos indėlis
R('<div class="h" id="c7a">Not an agency. Not a builder. <em>Software with a human touch.</em></div>',
  '<div class="h" id="c7a">Not an agency. Not a builder. <em>A platform with a human touch.</em></div>')
R('<div id="c7live" class="chip" style="left:1460px;top:940px"><i style="background:var(--teal)"></i>Live</div>',
  '<div id="c7live" class="chip" style="left:1460px;top:940px"><i style="background:var(--teal)"></i>Live</div>\n'
  '    <div id="c7ask" class="chip" style="left:1130px;top:246px;font-size:40px;font-weight:800;padding:6px 26px;color:var(--blue)">?</div>\n'
  '    <div id="c7fill" class="chip" style="left:1460px;top:770px;font-size:26px;padding:10px 22px"><i style="background:var(--pink)"></i>Fill in what\'s missing</div>')
R('  tl.fromTo(ok6, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, w(7, "checks"));',
  '  // mokyklos indėlis: keli tikslinamieji klausimai ir papildymai\n  tl.set("#c7fill", { xPercent: -50 }, 0);\n  pop("#c7ask", w(7, "questions") - 0.1);\n  pop("#c7fill", w(7, "fill in") - 0.1);\n'
  '  tl.to(["#c7ask", "#c7fill"], { opacity: 0, duration: 0.4 }, w(7, "checks") - 0.3);\n'
  '  tl.fromTo(ok6, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, w(7, "checks"));')

# --- 4. Publish once → bendri dalykai atnaujinami vieną kartą (steigėjų kol kas nėra)
a = s.index('  scene(10);'); b = s.index('  scene(11);')
blk = s[a:b]
for old, new in [('"municipality"', '"from the top"'), ('"publishes"', '"common to"'), ('"every school"', '"every school website"'),
                 ('"safer internet"', '"update subscriptions"'), ('"anti-bullying"', '"cookies"'), ('"left behind"', '"None left out"')]:
    blk = blk.replace(old, new)
for old, new in [('DOC.textContent = "New rule";', 'DOC.textContent = "Accessibility";'),
                 ('[["Safer Internet Week", "update subscriptions"], ["Anti-bullying week", "cookies"]]', '[["Update subscription", "update subscriptions"], ["Cookies", "cookies"]]'),
                 ('tl.set(DOC, { textContent: "New rule" }', 'tl.set(DOC, { textContent: "Accessibility" }'),
                 ('m, "Anti-bullying week");', 'm, "Cookies");'),
                 ('["No school left behind", "None left out", 1300]', '["None left out", "None left out", 1300]')]:
    assert old in blk, old; blk = blk.replace(old, new, 1)
s = s[:a] + blk + s[b:]
R('<div class="h" id="c10a">Publish <em>once</em>.</div>', '<div class="h" id="c10a">Update <em>once</em>.</div>')
R('></i>Municipality / Ministry</div>', '></i>One update</div>')
s = re.sub(r'(<div id="c10doc"[^>]*>)Safer Internet Week(</div>)', r'\1Accessibility\2', s, 1)
# komentarų numeriai = scene(N)
s = re.sub(r'/\* ===== \d+ ([^=]+?) ===== \*/\n  scene\((\d+)\);', lambda m: f'/* ===== {m.group(2)} {m.group(1)} ===== */\n  scene({m.group(2)});', s)
open('template.html', 'w', encoding='utf-8').write(s)

# --- scenos
sc = json.load(open('scenes.json')); T = {x['title']: x for x in sc}
T['Details']['voice'] = ("Here are twelve mistakes that catch the eye the most. Each mistake looks like a detail. Together, they make a good school look worse than it is. "
                         "Now multiply it by a hundred schools. Two hundred. Five hundred… and more.")
v = T['Stumps']['voice']; a = 'Ours is never cut down.'; assert a in v
T['Stumps']['voice'] = v[:v.index(a)] + "Ours is never cut down. Wind bent it, rain soaked it: every new rule, every change. It only grew stronger. And now nobody argues that it was worth it."
T['No blank page']['voice'] = ("Some see us as an agency. Others, as yet another do-it-yourself website builder. We are neither: we are a platform with a human touch. "
  "Nobody starts from a blank page: we move the old website for the school, its pages, documents and staff profiles, cleaned up on the way. "
  "We ask the school a few clarifying questions and to fill in what is missing. Not much work, but the school's part matters. The school checks, and the new website goes live.")
v = T['Publish once']['voice']; a = 'Distribution is already solved.'; assert a in v
T['Publish once']['voice'] = ("And it can work from the top, too. What is common to every school is updated once: accessibility, update subscriptions, cookies. "
  "It appears on every school website at the same time. No emails. No reminders. None left out. ") + v[v.index(a):]
json.dump(sc, open('scenes.json', 'w'), ensure_ascii=False, indent=1)

V = open('voice.py', encoding='utf-8').read()
def setw(title, keys):
    global V
    m = re.search(r"    '%s': \[[^\]]*\],\n" % re.escape(title), V); assert m, title
    V = V[:m.start()] + f"    '{title}': {keys!r},\n" + V[m.end():]
setw('Details', ['Here are', 'Each mistake', 'Together', 'hundred', 'Two hundred', 'Five hundred', 'and more'])
setw('Stumps', ['new tender', 'stump', 'And again', 'continuity', 'Ours', 'Wind', 'rain', 'every new rule', 'stronger', 'nobody argues'])
setw('No blank page', ['agency', 'website builder', 'human touch', 'blank page', 'old website', 'pages', 'documents', 'staff profiles', 'cleaned up', 'questions', 'fill in', 'checks', 'goes live'])
setw('Publish once', ['from the top', 'common to', 'updated once', 'accessibility', 'update subscriptions', 'cookies', 'every school website', 'No emails', 'No reminders', 'None left out', 'Distribution', 'big ideas', 'no single school', 'shared by all'])
open('voice.py', 'w', encoding='utf-8').write(V)

B = open('build.py', encoding='utf-8').read()
B = re.sub(r"\[\(w\(1, k\) \+ 0\.45, 'spustelejimas'\) for k in \[[^\]]*\]\]", "[(w(1, 'Here are') + 0.45 + i * 0.66, 'spustelejimas') for i in range(6)]", B, 1)
for old, new in [("(w(4, 'stronger') + 0.5, 'patvirtinimas'),", "(w(4, 'stronger') + 0.5, 'patvirtinimas'), (w(4, 'nobody argues'), 'patvirtinimas'),"),
                 ("(w(7, 'goes live') + 0.1, 'patvirtinimas'),", "(w(7, 'questions'), 'spustelejimas'), (w(7, 'fill in'), 'spustelejimas'), (w(7, 'goes live') + 0.1, 'patvirtinimas'),"),
                 ("(w(10, 'every school') + 0.4, 'numetimas')", "(w(10, 'every school website') + 0.4, 'numetimas')"),
                 ("(w(10, 'left behind'), 'spustelejimas')", "(w(10, 'None left out'), 'spustelejimas')")]:
    assert old in B, old; B = B.replace(old, new, 1)
open('build.py', 'w', encoding='utf-8').write(B)
print('ok')
