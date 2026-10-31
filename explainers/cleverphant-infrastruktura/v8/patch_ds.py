# -*- coding: utf-8 -*-
"""2026-10-13: dizaino sistemos scena (Frostas paprastais žodžiais) + ledkalnis „paviršiaus“ scenoje. EN. Vienkartinis."""
import json, os, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
subprocess.run(['python3', 'renumber.py', 'template.html', 'build.py', '6'], check=True)

def patch(path, pairs):
    s = open(path, encoding='utf-8').read()
    for a, b in pairs:
        assert a in s, (path, a[:90]); s = s.replace(a, b, 1)
    open(path, 'w', encoding='utf-8').write(s)

EN = {'ICE_DS': 'Design system', 'ICE_MOD': 'Modules and compliance', 'ICE_SUP': 'Training and support', 'DS_BUTTON': 'Button',
      'DS_PARTS': 'Parts', 'DS_BLOCKS': 'Blocks', 'DS_SECTIONS': 'Sections', 'DS_PAGES': 'Pages',
      'DS_CONTRAST': 'Contrast', 'DS_HEADINGS': 'Headings', 'DS_KEYBOARD': 'Keyboard'}
def loc(js):
    for k, v in EN.items(): js = js.replace(f'"{k}"', f'"{v}"')
    return js

s = open('template.html', encoding='utf-8').read()
# --- scena 5: ledkalnis vietoj modulių sienos
a = s.index('    <div id="c5band"'); b = s.index('    <div id="c5shared"')
s = s[:a] + '    <svg id="c5ice" class="abs" width="1920" height="1080" style="left:0;top:0;opacity:0"></svg>\n    <div id="c5layers"></div>\n' + s[b:]
s = s.replace('<div id="c5shared" class="lbl" style="left:960px;top:936px;font-size:26px;color:var(--blue)">shared by every school</div>',
              '<div id="c5shared" class="lbl" style="left:960px;top:944px;font-size:26px;color:var(--blue)">Shared by every school</div>', 1)
a = s.index('  tl.fromTo("#c5band"'); b = s.index('  // nauja mokykla tiesiog prisijungia')
s = s[:a] + loc(open('ds_ice.js', encoding='utf-8').read()) + s[b:]
s = s.replace('''  tl.to("#c5band", { borderColor: "rgba(58,176,176,.9)", duration: 0.3 }, w(5, "plugs") + 0.6);
  tl.to("#c5band", { borderColor: "rgba(51,99,171,.18)", duration: 0.8 }, w(5, "plugs") + 1.0);''',
'''  tl.to(berg, { attr: { stroke: "rgba(58,176,176,.9)" }, duration: 0.3 }, w(5, "plugs") + 0.6);
  tl.to(berg, { attr: { stroke: "rgba(51,99,171,.25)" }, duration: 0.8 }, w(5, "plugs") + 1.0);''', 1)
assert 'c5band' not in s and 'c5mods' not in s, 'liko senų elementų'
# --- nauja scena 6
s = s.replace('  <section id="c7" ', '''  <section id="c6" class="scene clip" data-start="__S6__" data-duration="__D6__" data-track-index="1">
    <div class="h" id="c6a">What is a <em>design system</em>?</div>
    <div class="h" id="c6b">Every page, from the <em>same parts</em>.</div>
    <div class="h" id="c6c">Improve one part. <em>Every page improves.</em></div>
    <svg id="c6arr" class="abs" width="1920" height="1080" style="left:0;top:0"></svg>
    <div id="c6cols"></div>
    <div id="c6acc"></div>
    <div id="c6strip"></div>
  </section>

  <section id="c7" ''', 1)
s = s.replace('  /* ===== 6 No blank page ===== */', loc(open('ds_scene.js', encoding='utf-8').read()) + '  /* ===== 6 No blank page ===== */', 1)
open('template.html', 'w', encoding='utf-8').write(s)

# --- scenos ir balsas
sc = json.load(open('scenes.json'))
i = [x['title'] for x in sc].index('Only the surface') + 1
sc.insert(i, {'n': 0, 'title': 'Design system',
  'voice': "What is a design system? A set of ready-made parts. Colours, fonts and buttons make blocks: a search field, a staff card. "
           "Blocks make sections, sections make pages. Every page of every school is built from the same parts, and every part already meets "
           "accessibility rules: contrast, headings, keyboard. Improve one part once, and it improves everywhere.",
  'screen': "What is a design system? → Parts → Blocks → Sections → Pages → Every page, from the same parts. (Contrast · Headings · Keyboard) → Improve one part. Every page improves."})
for k, x in enumerate(sc): x['n'] = k + 1
json.dump(sc, open('scenes.json', 'w'), ensure_ascii=False, indent=1)
patch('voice.py', [
 ("    'Only the surface': ['website', 'Underneath', 'design system', 'compliance', 'shared by', 'plugs'],",
  "    'Only the surface': ['website', 'Underneath', 'design system', 'compliance', 'support', 'shared by', 'plugs'],\n"
  "    'Design system': ['What is', 'ready-made parts', 'Colours', 'blocks', 'search field', 'staff card', 'Blocks make sections', 'pages', 'same parts', 'accessibility', 'Improve one part', 'everywhere'],"),
 ("SRC = {'Fair warning': 'sintro',", "SRC = {'Fair warning': 'sintro', 'Design system': 'sdesign',"),
])
patch('build.py', [("(w(5, 'plugs') + 0.5, 'numetimas'),",
  "(w(5, 'plugs') + 0.5, 'numetimas'),\n        (w(6, 'ready-made parts'), 'spustelejimas'), (w(6, 'blocks'), 'spustelejimas'), (w(6, 'Blocks make sections'), 'spustelejimas'), (w(6, 'pages'), 'spustelejimas'),\n"
  "        (w(6, 'same parts') + 0.3, 'numetimas'), (w(6, 'Improve one part') + 0.4, 'patvirtinimas'),")])
print('ok')
