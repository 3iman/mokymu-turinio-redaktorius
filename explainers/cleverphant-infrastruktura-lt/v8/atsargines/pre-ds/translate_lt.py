# -*- coding: utf-8 -*-
"""EN šablonas → LT. Keičiami TIK matomi užrašai; laiko raktai w(i, "…") lieka angliški (juos žino voice.py per scenes.json kw)."""
import re, sys
src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8').read()
miss = []
def R(a, b, cnt=1):
    global s
    if a not in s: miss.append(a[:80]); return
    s = s.replace(a, b) if cnt == 0 else s.replace(a, b, cnt)
R('<html lang="en"', '<html lang="lt"')
R('Cleverphant explainer v8 (EN)', 'Cleverphant explainer v8 (LT)')
H = {  # antraščių ir etikečių vidus pagal id
 'c0a': '<em>Įspėjame iš anksto.</em>', 'c0m': 'Dramblį parduoti <em>užtrunka</em>.', 'c0b': 'Beveik <em>7 minutės</em>.',
 'c0r': 'Dramblio <em>nepaskubinsi</em>.', 'c0w': '<em>Verta.</em>', 'c0lab': 'kraunamas dramblys…',
 'c0min': '<i style="background:var(--teal)"></i>≈ 7 min',
 'c1a': 'Kiekviena atrodo kaip <em>smulkmena</em>.', 'c1g': 'Kartu jos gerą mokyklą parodo <em>prastesnę, nei ji yra</em>.', 'c1b': 'O dabar <em>padauginkite</em>.',
 'c2a': 'Lietuvoje svetainė <em>privaloma</em>.', 'c2m': 'Vienintelis kanalas, kurį mokykla <em>valdo pati</em>.', 'c2b': 'Ne įvaizdis. <em>Aktualumas.</em>',
 'c2yours': '<i style="background:var(--blue)"></i>jūsų', 'c2fresh': '<i style="background:#22b573"></i>aktuali',
 'c3e': 'Dramblys <em>kambaryje</em>.', 'c3a': 'Tos pačios pareigos. Kiekviena mokykla – <em>viena</em>.', 'c3b': 'Kokybė tampa <em>atsitiktinumu</em>.',
 'c3foot': 'savas biudžetas · savas rangovas · savas rezultatas',
 'c4a': 'Nauja svetainė kas <em>kelerius metus</em>?', 'c4b': 'Ne keisti. <em>Auginti.</em>',
 'c5a': 'Bendra skaitmeninė mokyklų <em>infrastruktūra</em>.', 'c5b': 'Svetainė – tik <em>paviršius</em>.', 'c5dsl': 'VIENA DIZAINO SISTEMA', 'c5shared': 'bendra visoms mokykloms',
 'c6a': 'Platforma su <em>žmogaus prisilietimu</em>.', 'c6b': 'Ne nuo tuščio lapo. <em>Perkeliame ir sutvarkome.</em>',
 'c6ol': 'senoji svetainė', 'c6nl': 'naujoji svetainė', 'c6live': '<i style="background:var(--teal)"></i>Veikia',
 'c7a': 'Ta pati nauda. Ta pati <em>klaida</em>.', 'c7hap': 'pasitaiko', 'c7k': 'Žinios keliauja <em>taip pat</em>.', 'c7b': 'Pastebi viena mokykla. Pataisoma <em>visoms</em>.',
 'c8a': 'Idėjos keliauja <em>taip pat</em>.', 'c8b': 'Pilotas – lėtai. Standartas – <em>visiems iš karto.</em>',
 'c9a': 'Paskelbiama <em>vieną kartą</em>.', 'c9b': 'Pasiekia <em>visas mokyklas</em>.', 'c9pill': '<i style="background:var(--blue)"></i>Savivaldybė / ministerija',
 'c9doc': 'Nauja taisyklė', 'c9c': 'Didelis tinklas gali sau leisti <em>dideles idėjas</em>.', 'c9bigl': 'didelė idėja',
 'c10a': 'Kokybė neturi priklausyti nuo <em>dydžio</em>.', 'c10b': 'Ne vienodos. <em>Vienodai geros.</em>', 'c10lab': 'viena dizaino sistema · savos spalvos',
 'c11a': 'Pokyčiai prasideda nuo <em>smulkmenų</em>.', 'c11m': 'Po <em>kąsnelį</em>.', 'c11b': 'Kiekvienas žingsnis pasiekia <em>visas mokyklas</em>.',
 'c11capA': 'MŪSŲ MOKYKLOS ISTORIJA', 'c11capB': 'Mūsų mokyklos istorija',
 'c11jA': 'Mokykla įkurta prieš šimtą metų ir augo kartu su savo bendruomene.', 'c11jB': 'Mokykla įkurta prieš šimtą metų ir augo kartu su savo bendruomene.',
 'c11troj': '<i style="background:var(--teal)"></i>Trojos dramblys · gerąja prasme',
 'c12a': '<em>O kas, jeigu…</em>?', 'c12b': 'Viena mokykla išbando. <em>Visos mokyklos gauna.</em>', 'c12bl': 'tas pats pamatas',
 'c13a': 'O <em>dirbtinis intelektas</em>?', 'c13b': 'Dirbtinis intelektas mėgsta <em>tvarką</em>.',
 'c14a': 'Kas veikia vienoje mokykloje, veikia <em>visur</em>.', 'c14b': 'Ne pažadas, kad bus pigu. <em>Mastelio</em> logika.', 'c14cl1': 'mokyklos', 'c14cl2': 'kaštai',
 'c15a': '15 metų. Pirmieji dešimt? <em>Lėti.</em>', 'c15m': 'Lėtąją dalį galite <em>praleisti</em>.', 'c15g': 'Tikslas – grąžinti mokytoją <em>pas vaikus</em>.',
 'c15b': 'Sukurta <em>Lietuvoje</em> – kartu su jumis.', 'c15ylab': '15 metų · 15 rievių', 'c15cnt': 'beveik 300 įstaigų · klientų turime 85 proc. savivaldybių',
 'c15e': 'Tos pačios taisyklės visoje ES. Sukurta vienai, <em>tinka visoms</em>.', 'c15tag': 'Bendra skaitmeninė mokyklų infrastruktūra.',
 'c15cta': 'Kviečiame į produkto pristatymą',
}
for i, v in H.items():
    m = re.search(r'(<(div|span|b|p|small|em)\b[^>]*\bid="%s"[^>]*>)((?:(?!<div|</div>).)*?)(</\2>)' % re.escape(i), s)
    if not m: miss.append('id ' + i); continue
    s = s[:m.start()] + m.group(1) + v + m.group(4) + s[m.end():]
T = [  # (EN, LT, kiek kartų; 0 = visus)
 ('&nbsp;school.edu', '&nbsp;mokykla.lt', 0), ('WELCOME TO OUR SCHOOL!!!', 'SVEIKI ATVYKĘ!!!', 1),
 ('font-size:30px;font-weight:700;color:#1e293b">Welcome<', 'font-size:30px;font-weight:700;color:#1e293b">Sveiki atvykę<', 1),
 ('>OPEN DAY<', '>ATVIRŲ DURŲ DIENA<', 1), ('Sept 1 · 9:00 · yard', 'Rugsėjo 1 d. · 9.00 · kieme', 1), ('>Open day<', '>Atvirų durų diena<', 1),
 ('September 1, 9:00, in the school yard', 'Rugsėjo 1 d., 9.00, mokyklos kieme', 1), ('This website uses cookies', 'Ši svetainė naudoja slapukus', 1),
 ('>SETTINGS<', '>NUSTATYMAI<', 1), ('>DECLINE<', '>ATMESTI<', 1), ('>ACCEPT<', '>SUTINKU<', 1),
 # klaidų kortelės
 ('"All-caps headings"', '"Antraštės didžiosiomis"', 1), ('>SCHOOL NEWS<', '>NAUJIENOS<', 1),
 ('"Walls of text, no headings"', '"Teksto paklodės be antraščių"', 1),
 ('"Posters screen readers can\'t read"', '"Plakatai, nematomi skaitytuvams"', 1), ('>OPEN DAY</b>', '>ATVIRŲ DURŲ</b>', 1),
 ('>Sept 1 · 9:00</span>', '>Rugsėjo 1 d. · 9.00</span>', 1), ('🔊 “image”', '🔊 „paveikslėlis“', 1),
 ('["Naked links", "Naked links",', '["Naked links", "Nuogos nuorodos",', 1),
 ('https://www.school.lt/wp-content/uploads/2019/03/scan_final_v2_NEW.pdf', 'https://www.mokykla.lt/wp-content/uploads/2019/03/skenas_galutinis_v2_NAUJAS.pdf', 1),
 ('"Random fonts and colours"', '"Margi šriftai ir spalvos"', 1), ('color:#c2410c">Welcome</span>', 'color:#c2410c">Sveiki</span>', 1),
 ('color:#7c3aed">to our</span>', 'color:#7c3aed">atvykę į</span>', 1), ('padding:0 6px">SCHOOL</span>', 'padding:0 6px">MŪSŲ</span>', 1),
 ('text-decoration:underline">website!!!</span>', 'text-decoration:underline">mokyklą!!!</span>', 1),
 ('"Staff who left years ago"', '"Seniai išėję darbuotojai"', 1), ('font:700 22px Inter, sans-serif">Mrs. Teacher<', 'font:700 22px Inter, sans-serif">Mokytoja Ona<', 1),
 ('color:#94a3b8">left in 2019<', 'color:#94a3b8">išėjo 2019 m.<', 1),
 ('"× 1 000 and counting"', '"× 500 … ir daugiau"', 1),
 ('["fixed × 100"', '["pataisyta × 100"', 1), ('["fixed × 200"', '["pataisyta × 200"', 1), ('["fixed × 500"', '["pataisyta × 500"', 1), ('["fixed × 1 000"', '["pataisyta × 500 … ir daugiau"', 1),
 # kanalas
 ('"the algorithm decides"', '"sprendžia algoritmas"', 1),
 ('[["Search", "SEO", "Search engines", 360], ["AI answers", "GEO", "AI answers", 510], ["Agents", "MCP", "Agents", 660]]',
  '[["Paieška", "SEO", "Search engines", 360], ["DI atsakymai", "GEO", "AI answers", 510], ["Agentai", "MCP", "Agents", 660]]', 1),
 # pareigos
 ('["Accessibility", "var(--blue)"', '["Prieinamumas", "var(--blue)"', 1), ('["Data protection", "var(--teal)"', '["Duomenų apsauga", "var(--teal)"', 1),
 ('["Security", "var(--lav)"', '["Saugumas", "var(--lav)"', 1), ('["Changing rules", "var(--pink)"', '["Kintančios taisyklės", "var(--pink)"', 1),
 # kelmai
 ('"new tender · new website"', '"naujas konkursas · nauja svetainė"', 1), ('"continuity lost"', '"prarastas tęstinumas"', 1),
 ('["New accessibility law", "New data rules", "New standard"]', '["Naujas prieinamumo įstatymas", "Naujos duomenų taisyklės", "Naujas standartas"]', 1),
 # be tuščio lapo
 ('[["Agency", "agency", 680], ["Website builder", "website builder", 1220]]', '[["Agentūra", "agency", 660], ["Svetainių konstruktorius", "website builder", 1220]]', 1),
 ('[["Pages", "pages", "OUR HISTORY — READ MORE!!!", "Our history"], ["Documents", "documents", "scan_0012.pdf (not searchable)", "Documents · searchable"],',
  '[["Puslapiai", "pages", "MŪSŲ ISTORIJA — SKAITYKITE!!!", "Mūsų istorija"], ["Dokumentai", "documents", "skenas_0012.pdf (neieškomas)", "Dokumentai · ieškomi"],', 1),
 ('["Staff profiles", "staff profiles", "Mrs. Teacher · left in 2019", "Staff · up to date"]', '["Darbuotojai", "staff profiles", "Mokytoja Ona · išėjo 2019 m.", "Darbuotojai · aktualūs"]', 1),
 # žinios
 ('[["Lesson", "lesson", 700], ["Video", "video", 960], ["Newsletter", "newsletter", 1220]]', '[["Pamoka", "lesson", 680], ["Filmukas", "video", 960], ["Naujienlaiškis", "newsletter", 1250]]', 1),
 # pilotas
 ('"slow… very slow…"', '"lėtai… labai lėtai…"', 1), ('></i>Pilot`', '></i>Pilotas`', 1), ('UI, "data");', 'UI, "duomenys");', 1),
 # paskelbk kartą
 ('m, "Anti-bullying week");', 'm, "Savaitė be patyčių");', 1), ('DOC.textContent = "New rule";', 'DOC.textContent = "Nauja taisyklė";', 1),
 ('[["Safer Internet Week", "safer internet"], ["Anti-bullying week", "anti-bullying"]]', '[["Saugesnio interneto savaitė", "safer internet"], ["Savaitė be patyčių", "anti-bullying"]]', 1),
 ('tl.set(DOC, { textContent: "New rule" }', 'tl.set(DOC, { textContent: "Nauja taisyklė" }', 1),
 ('<div id="c9doc" class="abs" style="left:820px;top:300px;width:280px;', '<div id="c9doc" class="abs" style="left:750px;top:300px;width:420px;', 1),
 ('[["No emails", "No emails", 610], ["No reminders", "No reminders", 930], ["No school left behind", "left behind", 1300]]',
  '[["Jokių laiškų", "No emails", 560], ["Jokių priminimų", "No reminders", 880], ["Nė viena mokykla nelieka nuošalyje", "left behind", 1310]]', 1),
 # Trojos dramblys
 ('[["slow…", "Elephants"], ["very slow…", "Very slow"], ["so slow…", "So slow"]]', '[["lėti…", "Elephants"], ["labai lėti…", "Very slow"], ["tokie lėti…", "So slow"]]', 1),
 ('[["Digital hygiene", "every next step"], ["Live tables", "live tables"], ["Whistleblower channel", "whistleblower"], ["Consultation booking", "consultation"],',
  '[["Skaitmeninė higiena", "every next step"], ["Gyvos lentelės", "live tables"], ["Pranešėjų kanalas", "whistleblower"], ["Registracija į konsultacijas", "consultation"],', 1),
 ('["Surveys", "surveys"], ["Event calendar", "event calendars"], ["Weekly update digest", "weekly update digests"]]',
  '["Apklausos", "surveys"], ["Renginių kalendorius", "event calendars"], ["Savaitinė santrauka", "weekly update digests"]]', 1),
 # o kas, jeigu
 ('["Word file → finished article", "the author just clicks Approve",', '["Word failas → baigtas straipsnis", "autoriui lieka paspausti „Tvirtinti“",', 1),
 ('["Documents name and file themselves", "title, date and category from the file",', '["Dokumentai susidėlioja patys", "pavadinimas, data ir kategorija – iš failo",', 1),
 ('["A fix ready before you notice", "safe fixes done, the rest for approval",', '["Pataisyta, kol nepastebėjote", "saugūs pataisymai atlikti, kiti – tvirtinti",', 1),
 ('>in development</em>', '>kuriama</em>', 1),
 # mastelis
 ('[["School", 0,', '[["Mokykla", 0,', 1), ('["Municipality", 100,', '["Savivaldybė", 100,', 1), ('["Region", 190,', '["Regionas", 190,', 1), ('["Country", 280,', '["Šalis", 280,', 1),
 # 15 metų
 ('"Your region"', '"jūsų savivaldybė"', 1),
 ('[["Content audit", "Audits", 660], ["Onboarding", "onboarding", 960], ["Training platform", "training", 1260]]',
  '[["Turinio auditas", "Audits", 640], ["Įdiegimas", "onboarding", 960], ["Mokymų platforma", "training", 1280]]', 1),
 ('"an elephant never forgets"', '"dramblys niekada nepamiršta"', 1),
 ('[["Web Accessibility Directive", "web accessibility", 520], ["GDPR", "data protection", 960], ["Whistleblower Directive", "whistleblower protection", 1400]]',
  '[["Prieinamumo direktyva", "web accessibility", 560], ["BDAR", "data protection", 960], ["Pranešėjų direktyva", "whistleblower protection", 1360]]', 1),
]
for a, b, c in T: R(a, b, c)
# moduliai (Only the surface)
MODS = {'Pages': 'Puslapiai', 'News': 'Naujienos', 'News calendar': 'Naujienų kalendorius', 'Document bank': 'Dokumentų bankas', 'Staff profiles': 'Darbuotojų profiliai',
 'Lesson times': 'Pamokų laikas', 'Live tables': 'Gyvos lentelės', 'Carousel': 'Karuselė', 'Banners': 'Baneriai', 'Partners': 'Partneriai', 'Accordions': 'Suskleidimai',
 'Tags': 'Žymos', 'Search': 'Paieška', 'Maps': 'Žemėlapiai', 'Facebook feed': '„Facebook“ srautas', 'Birthdays': 'Gimtadieniai', 'Quotes': 'Citatos', 'Countdown': 'Atgalinis laikmatis',
 'Notice bar': 'Pranešimų juosta', 'Cookie consent': 'Slapukų sutikimas', 'Low-vision mode': 'Silpnaregių režimas', 'Screen readers': 'Ekrano skaitytuvai', 'Easy-to-read': 'Lengvai suprantama kalba',
 'Sign language': 'Gestų kalba', 'Translations': 'Vertimai', 'News subscription': 'Naujienų prenumerata', 'EU project publicity': 'ES projektų viešinimas', 'Data protection': 'Duomenų apsauga',
 'Activity log': 'Veiksmų žurnalas', 'API': 'API', 'Training platform': 'Mokymų platforma', 'Video lessons': 'Vaizdo pamokos', 'Content audit': 'Turinio auditas', 'Onboarding': 'Įdiegimas',
 'Help centre': 'Pagalbos centras', 'Newsletter': 'Naujienlaiškis', 'Whistleblower channel': 'Pranešėjų kanalas'}
a = s.index('const MODS = ['); b = s.index(']];', a) + 3; blk = s[a:b]
for en, lt in MODS.items():
    if f'["{en}", ' not in blk: miss.append('MOD ' + en)
    blk = blk.replace(f'["{en}", ', f'["{lt}", ')
s = s[:a] + blk + s[b:]

# --- LT judesys: lietuviškas balsas ilgesnis, todėl ilgi sustingę ruožai suskaidomi prasmingu judesiu (≤15 % filmo)
M = [
 ('  head("#c1g", w(1, "Together") - 0.1, w(1, "hundred") - 0.5);',
  '  head("#c1g", w(1, "Together") - 0.1, w(1, "hundred") - 0.5);\n  // gera mokykla atrodo prasčiau: kortelės pilkėja\n  icards.forEach((k, i) => tl.to(k.c, { filter: "grayscale(1)", opacity: 0.7, scale: 0.97, duration: 1.2, ease: "power1.inOut" }, w(1, "Together") + 0.6 + i * 0.15));'),
 ('  N4.nodes.forEach((n) => tl.fromTo(n.nd, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t(8, 0.5)));',
  '  N4.nodes.forEach((n, k) => tl.fromTo(n.nd, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, t(8, 0.5) + k * 0.06));'),
 ('  tl.to(sp.nd, { borderColor: "#3363ab", duration: 0.4 }, w(8, "curious"));',
  '  tl.to(sp.nd, { borderColor: "#3363ab", duration: 0.4 }, w(8, "curious"));\n  const halo4 = svgEl("circle", { cx: sp.x, cy: sp.y, r: 46, fill: "none", stroke: "#3363ab", "stroke-width": 4, opacity: 0 }, N4.NET);\n  tl.fromTo(halo4, { opacity: 0.6, attr: { r: 46 } }, { opacity: 0, attr: { r: 130 }, duration: 1.4, ease: "power1.out", repeat: 2, immediateRender: false }, w(8, "curious") + 0.6);'),
 ('  tl.set(DOC, { textContent: "Nauja taisyklė" }, w(9, "publishes") - 0.05);',
  '  tl.set(DOC, { textContent: "Nauja taisyklė" }, w(9, "publishes") - 0.05);\n  // kiekvienas pavyzdys — svetainės „pasiruošia“ banga\n  ["new rule", "safer internet", "anti-bullying"].forEach((k) => minis.forEach((m) => tl.to(m.m, { y: -12, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(9, k) + 0.2 + m.d / 700 * 0.6)));'),
 ('    tl.to(d, { opacity: 0.9, duration: 0.25 }, w(15, "grow by itself") + 0.2 + k * 0.012); }',
  '    tl.to(d, { opacity: 0.9, duration: 0.25 }, w(15, "grow by itself") + 0.2 + k * 0.012);\n    // tinklas gyvas: taškai mirga, kol skamba skaičiai\n    if (k % 3 === 0) tl.to(d, { opacity: 0.3, duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut" }, w(15, "three hundred") + (k % 9) * 0.22); }'),
('  head("#c2m", w(2, "only channel") - 0.1, w(2, "looks") - 0.6);',
  '  head("#c2m", w(2, "only channel") - 0.1, w(2, "looks") - 0.6);\n  // „valdo pati“: jūsų svetainė iškyla prieš kitus\n  tl.to("#c2site", { scale: 1.06, duration: 0.9, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(2, "only channel") + 0.9);'),
 ('  pulse(N3, w(7, "newsletter") + 0.3, "#3363ab", "#3363ab", "#ffffff");',
  '  pulse(N3, w(7, "lesson") + 0.2, "#3ab0b0", "#3ab0b0", "#ffffff");\n  pulse(N3, w(7, "newsletter") + 0.3, "#3363ab", "#3363ab", "#ffffff");'),
 ('  tl.to("#c15cnt", { opacity: 0, duration: 0.4 }, w(15, "slow part") - 0.4);',
  '  tl.to("#c15cnt", { opacity: 0, duration: 0.4 }, w(15, "slow part") - 0.4);\n  // tinklas kvėpuoja, kol skamba skaičiai\n  tl.to("#c15time", { scale: 1.05, transformOrigin: "560px 560px", duration: 1.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, w(15, "three hundred") + 0.5);'),
 ('<div class="h" id="c11b">',
  '<div class="h" id="c11n">Nė vienas kąsnelis – <em>ne reforma</em>.</div>\n    <div class="h" id="c11y">Po metų mokykla – <em>jau kita</em>.</div>\n    <div id="c11bites"></div>\n    <div class="h" id="c11b">'),
 ('transform:scale(0)"></div></div>',
  'transform:scale(0)"></div><div class="bite" style="position:absolute;left:226px;top:196px;width:84px;height:84px;border-radius:50%;background:#f3f5fa;transform:scale(0)"></div></div>'),
 ('  head("#c11m", w(11, "eat an elephant") - 0.1, w(11, "every next step") - 0.5);',
  '  head("#c11m", w(11, "eat an elephant") - 0.1, w(11, "no reform") - 0.6);\n  head("#c11n", w(11, "no reform") - 0.1, w(11, "a year") - 0.6);\n  head("#c11y", w(11, "a year") - 0.1, w(11, "every next step") - 0.5);'),
 ('  document.querySelectorAll("#c11eat .bite").forEach((b, k) => tl.to(b, { scale: 1, duration: 0.25, ease: "back.out(2)" }, w(11, "One bite") + k * 0.45));',
  '  // po kąsnelį: kiekvienas kąsnis — viena sutvarkyta smulkmena; po metų dramblys suvalgytas\n'
  '  const BK = ["bite1", "bite2", "bite3"], BN = ["antraštės", "slapukų juosta", "dokumentų pavadinimai"];\n'
  '  document.querySelectorAll("#c11eat .bite").forEach((b, k) => tl.to(b, { scale: 1, duration: 0.25, ease: "back.out(2)" }, w(11, BK[k]) - 0.05));\n'
  '  BN.forEach((nm, k) => { const c = el("div", "chip", `left:1200px;top:${400 + k * 96}px;font-size:28px;padding:14px 26px`, $("#c11bites"), `<i style="background:var(--teal)"></i>${nm}`);\n'
  '    tl.fromTo(c, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, w(11, BK[k])); });\n'
  '  tl.to("#c11eat", { scale: 0.5, opacity: 0, rotation: -8, duration: 1.0, ease: "power2.in" }, w(11, "a year"));\n'
  '  tl.to("#c11bites", { x: -240, duration: 1.0, ease: EIO }, w(11, "a year") + 0.2);\n'
  '  tl.to("#c11bites", { opacity: 0, duration: 0.5 }, w(11, "every next step") - 0.5);'),
 ('<div class="cta" id="c15cta" style="top:760px">',
  '<div id="c15q" class="lbl" style="left:960px;top:690px;font-size:36px;font-weight:700;color:#1e293b">Dar ne mūsų klientas?</div>\n    <div id="c15note" class="lbl" style="left:960px;top:894px;font-size:28px;color:var(--teal)">Ateisime pasiruošę.</div>\n    <div id="c15mail" class="lbl" style="left:960px;top:950px;font-size:32px;font-weight:700;color:var(--blue)">labas@cleverphant.lt</div>\n    <div class="cta" id="c15cta" style="top:760px">'),
 ('  tl.fromTo("#c15cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, w(15, "talk") + 2.6);',
  '  tl.fromTo("#c15cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, w(15, "talk") + 2.6);\n  tl.set(["#c15q", "#c15note"], { xPercent: -50 }, 0);\n  pop("#c15q", w(15, "talk") + 2.2);\n  pop("#c15note", w(15, "prepared"));\n  tl.set("#c15mail", { xPercent: -50 }, 0);\n  pop("#c15mail", w(15, "prepared") + 0.6);'),
]
for a, b in M: R(a, b)
open(dst, 'w', encoding='utf-8').write(s)
print('trūksta:', miss if miss else 'nieko')
