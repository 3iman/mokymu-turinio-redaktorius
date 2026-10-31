# -*- coding: utf-8 -*-
"""Klaidų scena → „kaip svetainė genda“ + padauginimo išvada; piloto atsakymas; „Ne šablonas“. EN ir LT."""
import io, json, re, os
EN = os.path.dirname(os.path.abspath(__file__)) + '/'
LT = EN + '../../cleverphant-infrastruktura-lt/v8/'
rd = lambda p: io.open(p, encoding='utf-8').read()
def sub(p, pairs):
    s = rd(p)
    for a, b in pairs:
        assert s.count(a) == 1, (p, a[:80], s.count(a)); s = s.replace(a, b)
    io.open(p, 'w', encoding='utf-8').write(s)

# ---------- EN šablonas ----------
sub(EN + 'template.html', [
 ('    <div class="h" id="c2h">',
  '    <div class="h" id="c2t">You offer <em>a template</em>?</div>\n'
  '    <div class="h" id="c2u">A unique design ages <em>from day one</em>.</div>\n'
  '    <div class="h" id="c2e">Everyone adds <em>a little</em>.</div>\n'
  '    <div class="h" id="c2n">Everyone\'s website, <em>and no one\'s</em>.</div>\n'
  '    <div id="c2decay"></div><div id="c2actors"></div>\n'
  '    <div class="h" id="c2h">'),
 ('    <div class="h" id="c2b">Now <em>multiply</em> it.</div>',
  '    <div class="h" id="c2b">Now <em>multiply</em> it.</div>\n'
  '    <div class="h" id="c2l">Mistakes travel <em>too</em>.</div>\n'
  '    <div class="h" id="c2s">That\'s how <em>the whole system</em> looks.</div>'),
 ('  scene(2);\n', '  scene(2);\n' + rd(EN + 'decay_en.js')),
 ('    const at = w(2, "Here are") + 0.1 + i * 0.28;', '    const at = w(2, "twelve mistakes") + 0.1 + i * 0.28;'),
 ('  head("#c2h", w(2, "Here are") - 0.1,', '  head("#c2h", w(2, "twelve mistakes") - 0.1,'),
 ('  grid($("#c2grid")).forEach((g) => tl.fromTo(g.tile, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: E }, w(2, "hundred") + 0.1 + g.d * 0.075));\n'
  '  head("#c2b", w(2, "hundred") - 0.4);\n'
  '  counter("#c2count", [["× 100", w(2, "hundred")], ["× 200", w(2, "Two hundred")], ["× 500", w(2, "Five hundred")], ["× 500 … and more", w(2, "and more")]], "#ef4444");',
  '  const G2 = grid($("#c2grid"));\n'
  '  G2.forEach((g) => tl.fromTo(g.tile, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: E }, w(2, "hundred") + 0.1 + g.d * 0.075));\n'
  '  head("#c2b", w(2, "hundred") - 0.4, w(2, "learn from") - 0.6);\n'
  '  counter("#c2count", [["× 100", w(2, "hundred")], ["× 500", w(2, "Five hundred")], ["× 500 … and more", w(2, "and more")], ["The same mistakes × thousands", w(2, "thousands")]], "#ef4444");\n'
  '  // mokyklos mokosi viena iš kitos — ir klaida keliauja nuo langelio prie langelio\n'
  '  head("#c2l", w(2, "learn from") - 0.1, w(2, "whole system") - 0.6);\n'
  '  const SX = 960 - 25 * 66 / 2 + 8 * 66, SY = 620 - 12 * 52 / 2 + 4 * 52;\n'
  '  G2.forEach((g) => { const x = parseFloat(g.tile.style.left) + 25, y = parseFloat(g.tile.style.top) + 16, dd = Math.hypot((x - SX) / 66, (y - SY) / 52), at = w(2, "learn from") + 0.3 + dd * 0.09;\n'
  '    const b2 = el("i", "", "top:19px;width:18px;background:#f97316;transform:scaleX(0);transform-origin:0 50%", g.tile);\n'
  '    tl.to(b2, { scaleX: 1, duration: 0.2 }, at);\n'
  '    tl.to(g.tile, { scale: 1.2, duration: 0.18, yoyo: true, repeat: 1 }, at); });\n'
  '  tl.to(G2.map((g) => g.tile), { boxShadow: "0 0 0 4px rgba(239,68,68,.55)", duration: 0.25, yoyo: true, repeat: 1, stagger: { each: 0.003 } }, w(2, "thousands"));\n'
  '  tl.to("#c2grid", { scale: 0.8, duration: 1.4, ease: EIO, transformOrigin: "960px 620px" }, w(2, "whole system"));\n'
  '  head("#c2s", w(2, "whole system") - 0.1);'),
 # pilotas: mokosi viena iš kitos — tik tai, kas patikrinta
 ('    <div class="h" id="c9b">Pilot: slow. Standard: <em>everyone, at once.</em></div>',
  '    <div class="h" id="c9b">Pilot: slow. Standard: <em>everyone, at once.</em></div>\n'
  '    <div class="h" id="c9c">Learning from each other. <em>Only what\'s tested.</em></div>'),
 ('  head("#c9b", w(9, "at once") - 0.1);',
  '  head("#c9b", w(9, "at once") - 0.1, w(9, "learn from each other") - 0.6);\n'
  '  head("#c9c", w(9, "learn from each other") - 0.1);\n'
  '  // tos pačios rodyklės kaip klaidų scenoje — tik dabar keliauja patikrinta varnelė\n'
  '  N4.nodes.forEach((n) => { const ck = el("div", "abs", `left:${n.x + 14}px;top:${n.y - 34}px;width:30px;height:30px;border-radius:50%;background:#22b573;color:#fff;font:800 20px/30px Inter, sans-serif;text-align:center;opacity:0`, $("#c9nodes"), "✓");\n'
  '    tl.fromTo(ck, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, w(9, "been tested") + Math.hypot(n.x - sp.x, n.y - sp.y) / 1300 * 2.0); });'),
 # vienodai geros: ne šablonas
 ('    <div class="h" id="c11b">Not identical. <em>Equally good.</em></div>',
  '    <div class="h" id="c11t">Not a template. <em>A model, with your content.</em></div>\n'
  '    <div class="h" id="c11b">Not identical. <em>Equally good.</em></div>'),
 ('  head("#c11a", t(11, 0.3), w(11, "Not identical") - 0.6);',
  '  head("#c11a", t(11, 0.3), w(11, "Not a template") - 0.6);\n'
  '  head("#c11t", w(11, "Not a template") - 0.1, w(11, "Not identical") - 0.6);'),
])

# ---------- EN balsas, raktai, garsai ----------
VO_EN = ("We often hear: you're offering a template. The alternative is a unique design. But nothing is entirely unique, and a design starts to age from day one. "
 "In the mock-up, made-up content looks great. Real content is added by the school itself. One colleague prepared a text, another pasted it as it came. "
 "The head got an email and asked to change the menu. Parents missed a document, so it was moved “higher”. Nobody means any harm. "
 "The website simply becomes everyone's, and no one's. That's how the twelve mistakes that catch the eye the most are born. Each mistake looks like a detail. "
 "Together, they make a good school look worse than it is. Now multiply it by a hundred schools. Five hundred… and more. "
 "Schools learn from each other. Sadly, mistakes travel that way too. The same mistakes, thousands of times. That's how the whole system looks.")
S = json.loads(rd(EN + 'scenes.json'))
T = {x['title']: x for x in S}
T['Details']['voice'] = VO_EN
v = T['Pilot → standard']['voice']; a = 'and every school has it at once.'; assert a in v
T['Pilot → standard']['voice'] = v.replace(a, a + ' Schools learn from each other anyway. Here, they adopt what has been tested.')
v = T['Equally good']['voice']; a = "the face stays the school's own."; assert a in v
T['Equally good']['voice'] = v.replace(a, a + ' Not a template: a model on working infrastructure, with your content.')
io.open(EN + 'scenes.json', 'w', encoding='utf-8').write(json.dumps(S, ensure_ascii=False, indent=1))
sub(EN + 'voice.py', [
 ("    'Details': ['Here are', 'Each mistake', 'Together', 'hundred', 'Two hundred', 'Five hundred', 'and more'],",
  "    'Details': ['template', 'unique design', 'day one', 'made-up', 'Real content', 'One colleague', 'another pasted', 'The head', 'Parents', 'no one', 'twelve mistakes',\n"
  "                'Each mistake', 'Together', 'hundred', 'Five hundred', 'and more', 'learn from', 'travel', 'thousands', 'whole system'],"),
 ("'data shows', 'at once'],", "'data shows', 'at once', 'learn from each other', 'been tested'],"),
 ("    'Equally good': ['village', 'large city', 'design system', 'face', 'Not identical'],",
  "    'Equally good': ['village', 'large city', 'design system', 'face', 'Not a template', 'Not identical'],")])
for p in [EN + 'build.py', LT + 'build.py']:
    sub(p, [("[(w(2, 'Here are') + 0.45 + i * 0.66, 'spustelejimas') for i in range(6)]",
             "[(w(2, 'twelve mistakes') + 0.45 + i * 0.66, 'spustelejimas') for i in range(6)]"
             " + [(w(2, k), 'spustelejimas') for k in ['One colleague', 'another pasted', 'The head', 'Parents']] + [(w(2, 'no one') + 0.2, 'numetimas')]"),
            ("for k in ['hundred', 'Two hundred', 'Five hundred', 'and more']]", "for k in ['hundred', 'Five hundred', 'and more', 'thousands']]")])

# ---------- LT ----------
VO_LT = ("Dažnai išgirstame: jūs siūlote šabloną. Alternatyva – unikalus dizainas. Tik visiško unikalumo nebūna, o dizainas pradeda senti nuo pirmos dienos. "
 "Makete gražiai atrodo išgalvotas turinys. Tikrą turinį sudeda patys. Vienas kolega paruošė tekstą, kitas įdėjo, kaip gavo. "
 "Vadovas gavo laišką ir liepė pakeisti meniu. Tėvai pasigedo dokumento, ir jį iškėlė „aukščiau“. Niekas nenori blogo. "
 "Tiesiog svetainė tampa visų ir niekieno. Taip gimsta dvylika klaidų, kurios labiausiai krenta į akį. Kiekviena klaida atrodo kaip smulkmena. "
 "Kartu jos gerą mokyklą parodo prastesnę, nei ji yra. O dabar padauginkite iš šimto mokyklų. Penkių šimtų… ir daugiau. "
 "Mokyklos mokosi viena iš kitos. Deja, taip keliauja ir klaidos. Tos pačios klaidos, tūkstančius kartų. Taip atrodo visa sistema.")
S = json.loads(rd(LT + 'scenes.json'))
T = {x['title']: x for x in S}
d = T['Details']; d['voice'] = VO_LT
d['kw'] = {'template': 'šabloną', 'unique design': 'unikalus dizainas', 'day one': 'nuo pirmos dienos', 'made-up': 'išgalvotas turinys',
 'Real content': 'Tikrą turinį', 'One colleague': 'Vienas kolega', 'another pasted': 'kitas įdėjo', 'The head': 'Vadovas gavo', 'Parents': 'Tėvai pasigedo',
 'no one': 'visų ir niekieno', 'twelve mistakes': 'dvylika klaidų', 'Each mistake': 'Kiekviena klaida', 'Together': 'Kartu jos', 'hundred': 'šimto mokyklų',
 'Five hundred': 'Penkių šimtų', 'and more': 'ir daugiau', 'learn from': 'mokosi viena iš kitos', 'travel': 'taip keliauja', 'thousands': 'tūkstančius kartų', 'whole system': 'visa sistema'}
p = T['Pilot → standard']; a = 'ir iš karto tai turi visos mokyklos.'; assert a in p['voice']
p['voice'] = p['voice'].replace(a, a + ' Mokyklos ir taip mokosi viena iš kitos. Čia jos perima tai, kas patikrinta.')
p['kw'].update({'learn from each other': 'ir taip mokosi', 'been tested': 'kas patikrinta'})
e = T['Equally good']; a = 'o veidas lieka mokyklos.'; assert a in e['voice']
e['voice'] = e['voice'].replace(a, a + ' Ne šablonas, o modelis veikiančioje infrastruktūroje – su jūsų turiniu.')
e['kw']['Not a template'] = 'Ne šablonas'
for x in (d, p, e):
    for k, ph in x['kw'].items(): assert ph in x['voice'], (x['title'], k, ph)
io.open(LT + 'scenes.json', 'w', encoding='utf-8').write(json.dumps(S, ensure_ascii=False, indent=1))

H_NEW = {'c2t': 'Siūlote <em>šabloną</em>?', 'c2u': 'Unikalus dizainas sensta <em>nuo pirmos dienos</em>.', 'c2e': 'Kiekvienas prideda <em>po truputį</em>.',
 'c2n': 'Visų svetainė – <em>ir niekieno</em>.', 'c2l': 'Keliauja ir <em>klaidos</em>.', 'c2s': 'Taip atrodo <em>visa sistema</em>.',
 'c9c': 'Mokosi viena iš kitos. <em>Tik tai, kas patikrinta.</em>', 'c11t': 'Ne šablonas. <em>Modelis su jūsų turiniu.</em>'}
T_NEW = [('["Home", "About us", "Students", "Parents", "Contacts"]', '["Pradžia", "Apie mus", "Mokiniams", "Tėvams", "Kontaktai"]'),
 ('["Projects", "Erasmus+", "Gallery 2019", "Important!!!", "Archive", "News (old)"]', '["Projektai", "Erasmus+", "Galerija 2019", "Svarbu!!!", "Archyvas", "Naujienos (senos)"]'),
 ('`IMPORTANT!!! <span', '`SVARBU!!! <span'), ('"Welcome to our school")', '"Sveiki atvykę į mūsų mokyklą")'),
 ('"WELCOME TO OUR SCHOOL WEBSITE")', '"SVEIKI ATVYKĘ Į MŪSŲ SVETAINĘ")'),
 ('["News", "Events", "Documents"]', '["Naujienos", "Renginiai", "Dokumentai"]'),
 ('[["A colleague", "One colleague", "#3ab0b0"], ["Another colleague", "another pasted", "#c9b8db"], ["The head", "The head", "#3363ab"], ["Parents", "Parents", "#f3a8c4"]]',
  '[["Kolega", "One colleague", "#3ab0b0"], ["Kitas kolega", "another pasted", "#c9b8db"], ["Vadovas", "The head", "#3363ab"], ["Tėvai", "Parents", "#f3a8c4"]]'),
 ('"The same mistakes × thousands"', '"Tos pačios klaidos × tūkstančiai"')]
s = rd(LT + 'translate_lt.py')
a = "'c2h': "; assert s.count(a) == 1
s = s.replace(a, ''.join(f"{k!r}: {v!r}, " for k, v in H_NEW.items()) + a)
a = "('&nbsp;school.edu', '&nbsp;mokykla.lt', 0),"; assert s.count(a) == 1
s = s.replace(a, a + '\n' + '\n'.join(f" ({x!r}, {y!r}, 1)," for x, y in T_NEW))
io.open(LT + 'translate_lt.py', 'w', encoding='utf-8').write(s)
print('ok')
