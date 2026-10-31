# -*- coding: utf-8 -*-
"""2026-10-13: šriftų skalė (6 dydžiai + storiai), sakinio forma visur, 15 metų skydelis dešinėje, kontaktai galiniame kadre. EN."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
s = open('template.html', encoding='utf-8').read()
def R(a, b, n=1):
    global s
    assert a in s, a[:90]
    s = s.replace(a, b) if n == 0 else s.replace(a, b, n)

# --- A/B. storiai ir klasės: Skaičius 200/200 · Antraštė 60/700 · Kvietimas 40/700 · Žyma 30/600 · Užrašas 26/500 · Smulkus 22/500
R('family=Inter:wght@400;500;600;700;800', 'family=Inter:wght@200;300;400;500;600;700;800')
R('.lbl { position:absolute; font-size:28px; font-weight:600;', '.lbl { position:absolute; font-size:26px; font-weight:500;')
R('.lbl { position:absolute; font-size:26px; font-weight:500; color:var(--text2); white-space:nowrap; opacity:0; }',
  '.lbl { position:absolute; font-size:26px; font-weight:500; color:var(--text2); white-space:nowrap; opacity:0; }\n'
  '  .disp { position:absolute; font-size:200px; font-weight:200; line-height:1; letter-spacing:-8px; color:var(--teal); white-space:nowrap; opacity:0; }')
s = re.sub(r'(\.cta \{[^}]*?)font-size:38px', r'\1font-size:40px', s, 1)
s = re.sub(r'(\.card \.tx \{ )font-size:32px', r'\1font-size:30px', s, 1)
s = re.sub(r'(\.card \.tx small \{ display:block; )font-size:20px', r'\1font-size:22px', s, 1)
s = re.sub(r'(\.mod \{[^}]*?)font-size:21px', r'\1font-size:22px', s, 1)
# --- C. vienodi dydžiai filmo tekstui (maketų turinys nekeičiamas)
for i, old, new in [('c8hap', 28, 26), ('c10bigl', 28, 26), ('c16ylab', 30, 26), ('c10pill', 32, 30), ('c0min', 28, 30)]:
    s = re.sub(r'(id="%s" class="[a-z]+" style="[^"]*?)font-size:%dpx' % (i, old), r'\g<1>font-size:%dpx' % new, s, 1)
CHIP = {22: 26, 28: 30, 46: 40}
s = re.sub(r'(el\("div", "chip", `[^`]*?)font-size:(\d+)px', lambda m: m.group(1) + f'font-size:{CHIP.get(int(m.group(2)), int(m.group(2)))}px', s)
s = re.sub(r'(el\("div", "lbl", `[^`]*?)font-size:24px', r'\1font-size:26px', s)
R('font:800 56px Inter, sans-serif;color:${color};letter-spacing:-1px', 'font:700 60px Inter, sans-serif;color:${color};letter-spacing:-1px')
R('font:700 30px/1.2 Inter, sans-serif;color:#1e293b;white-space:nowrap;opacity:0`, $("#c6cols")', 'font:600 30px/1.2 Inter, sans-serif;color:#1e293b;white-space:nowrap;opacity:0`, $("#c6cols")')
R('font:700 30px/1.2 Inter, sans-serif;color:var(--blue);white-space:nowrap;opacity:0`, $("#c5layers")', 'font:600 30px/1.2 Inter, sans-serif;color:var(--blue);white-space:nowrap;opacity:0`, $("#c5layers")')
R('font-size:42px;font-weight:500;color:var(--text2)">Shared digital infrastructure', 'font-size:40px;font-weight:500;color:var(--text2)">Shared digital infrastructure')

# --- D. sakinio forma: pirmas žodis didžiąja (blogų svetainių pavyzdžiai — tyčia kaip yra)
CAP = [('>loading the elephant…<', '>Loading the elephant…<'), ('></i>yours<', '></i>Yours<'), ('></i>up to date<', '></i>Up to date<'),
 ('>own budget · own contractor · own result<', '>Own budget · own contractor · own result<'), ('>old website<', '>Old website<'), ('>new website<', '>New website<'),
 ('>it happens<', '>It happens<'), ('>big idea<', '>Big idea<'), ('>one design system · own colours<', '>One design system · own colours<'),
 ('>the same foundation<', '>The same foundation<'), ('>schools<', '>Schools<'), ('>costs<', '>Costs<'),
 ('"the algorithm decides"', '"The algorithm decides"'), ('"new tender · new website"', '"New tender · new website"'), ('"continuity lost"', '"Continuity lost"'),
 ('"slow… very slow…"', '"Slow… very slow…"'), ('UI, "data");', 'UI, "Data");'),
 ('[["slow…", "Elephants"], ["very slow…", "Very slow"], ["so slow…", "So slow"]]', '[["Slow…", "Elephants"], ["Very slow…", "Very slow"], ["So slow…", "So slow"]]'),
 ('"an elephant never forgets"', '"An elephant never forgets"'), ('>in development</em>', '>In development</em>'),
 ('"the author just clicks Approve"', '"The author just clicks Approve"'), ('"title, date and category from the file"', '"Title, date and category from the file"'),
 ('"safe fixes done, the rest for approval"', '"Safe fixes done, the rest for approval"'),
 ('BN = ["headings", "cookie banner", "document names"]', 'BN = ["Headings", "Cookie banner", "Document names"]'),
 ('["fixed × 100"', '["Fixed × 100"'), ('["fixed × 200"', '["Fixed × 200"'), ('["fixed × 500"', '["Fixed × 500"'), ('["fixed × 500 … and more"', '["Fixed × 500 … and more"')]
for a, b in CAP: R(a, b)

# --- E. 15 metų: dešinėje didelis plonas skaičius, kol kairėje auga rievės; po jo — jūsų žiedas
R('    <div id="c16cnt" class="lbl" style="left:560px;top:914px;font-size:30px;color:var(--teal)">almost 300 institutions · clients in 85% of municipalities</div>',
  '    <div id="c16d1" class="disp" style="left:1360px;top:300px">15</div><div id="c16k1" class="lbl" style="left:1360px;top:522px;font-size:30px;font-weight:600">Years</div>\n'
  '    <div id="c16d2" class="disp" style="left:1360px;top:300px">≈300</div><div id="c16k2" class="lbl" style="left:1360px;top:522px;font-size:30px;font-weight:600">Institutions, one standard</div>\n'
  '    <div id="c16d3" class="disp" style="left:1360px;top:300px">85%</div><div id="c16k3" class="lbl" style="left:1360px;top:522px;font-size:30px;font-weight:600">Of municipalities have our clients</div>')
R('''  tl.set("#c16cnt", { xPercent: -50 }, 0);
  tl.fromTo("#c16cnt", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, w(16, "three hundred") - 0.1);
  tl.to("#c16cnt", { opacity: 0, duration: 0.4 }, w(16, "slow part") - 0.4);''',
'''  // skydelis dešinėje: 15 metų → ≈300 įstaigų → 85 % savivaldybių, tada vieta atiduodama jūsų žiedui
  [["fifteen", "three hundred"], ["three hundred", "eighty-five"], ["eighty-five", "slow part"]].forEach(([k0, k1], i) => {
    const d = $(`#c16d${i + 1}`), c = $(`#c16k${i + 1}`);
    tl.set([d, c], { xPercent: -50 }, 0);
    tl.fromTo(d, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, w(16, k0) - 0.1);
    tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.5 }, w(16, k0) + 0.3);
    tl.to([d, c], { opacity: 0, y: -16, duration: 0.45, ease: "power1.in" }, w(16, k1) - 0.5); });''')
# --- F. kontaktai galiniame kadre
R("""<div class="cta" id="c16cta" style="top:760px">Let's talk about your region</div>""",
  """<div class="cta" id="c16cta" style="top:760px">Let's talk about your region</div>\n    <div id="c16contact" class="lbl" style="left:960px;top:890px;font-size:30px;font-weight:600;color:var(--blue)">labas@cleverphant.lt · www.cleverphant.lt</div>""")
R('  tl.fromTo("#c16cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, w(16, "talk") + 2.6);',
  '  tl.fromTo("#c16cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, w(16, "talk") + 2.6);\n  tl.set("#c16contact", { xPercent: -50 }, 0);\n  pop("#c16contact", w(16, "talk") + 3.0);')
open('template.html', 'w', encoding='utf-8').write(s)

v = open('voice.py', encoding='utf-8').read()
a = "'grow by itself', 'three hundred',"; assert a in v
open('voice.py', 'w', encoding='utf-8').write(v.replace(a, "'grow by itself', 'three hundred', 'eighty-five',", 1))
print('ok')
