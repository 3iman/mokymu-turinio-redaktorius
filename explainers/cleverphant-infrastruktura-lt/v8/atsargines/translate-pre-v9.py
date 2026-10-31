# -*- coding: utf-8 -*-
"""EN šablonas → LT (v2, 2026-10-13: dizaino sistemos scena, ledkalnis, sakinio forma, 15 metų skydelis).
Keičiami TIK matomi užrašai; laiko raktai w(i, "…") lieka angliški (laiką duoda scenes.json → kw).
Naudojimas: cp ../../cleverphant-infrastruktura/v8/template.html template-en.html && python3 translate_lt.py template-en.html template.html"""
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

H = {  # antraščių ir etikečių vidus pagal id — sakinio forma, pirmas žodis didžiąja
 'c0a': '<em>Įspėjame iš anksto.</em>', 'c0m': 'Dramblį parduoti <em>užtrunka</em>.', 'c0b': '<em>7½ minutės</em>.',
 'c0r': 'Dramblio <em>nepaskubinsi</em>.', 'c0w': '<em>Verta.</em>', 'c0lab': 'Kraunamas dramblys…',
 'c0min': '<i style="background:var(--teal)"></i>≈ 7½ min',
 'c1a': 'Kiekviena atrodo kaip <em>smulkmena</em>.', 'c1g': 'Kartu jos gerą mokyklą parodo <em>prastesnę, nei ji yra</em>.', 'c1b': 'O dabar <em>padauginkite</em>.',
 'c2a': 'Lietuvoje svetainė <em>privaloma</em>.', 'c2m': 'Vienintelis kanalas, kurį mokykla <em>valdo pati</em>.', 'c2b': 'Ne įvaizdis. <em>Aktualumas.</em>',
 'c2yours': '<i style="background:var(--blue)"></i>Jūsų', 'c2fresh': '<i style="background:#22b573"></i>Aktuali',
 'c3e': 'Dramblys <em>kambaryje</em>.', 'c3a': 'Tos pačios pareigos. Kiekviena mokykla – <em>viena</em>.', 'c3b': 'Kokybė tampa <em>atsitiktinumu</em>.',
 'c3foot': 'Savas biudžetas · savas rangovas · savas rezultatas',
 'c4a': 'Nauja svetainė kas <em>kelerius metus</em>?', 'c4b': 'Ne keisti. <em>Auginti.</em>',
 'c5a': 'Bendra skaitmeninė mokyklų <em>infrastruktūra</em>.', 'c5b': 'Svetainė – tik <em>paviršius</em>.', 'c5shared': 'Bendra visoms mokykloms',
 'c6a': 'Kas yra <em>dizaino sistema</em>?', 'c6b': 'Kiekvienas puslapis – iš <em>tų pačių detalių</em>.', 'c6c': 'Patobulink vieną detalę. <em>Patobulėja visi puslapiai.</em>',
 'c7a': 'Platforma su <em>žmogaus prisilietimu</em>.', 'c7b': 'Ne nuo tuščio lapo. <em>Perkeliame ir sutvarkome.</em>',
 'c7ol': 'Senoji svetainė', 'c7nl': 'Naujoji svetainė', 'c7live': '<i style="background:var(--teal)"></i>Veikia',
 'c8a': 'Ta pati nauda. Ta pati <em>klaida</em>.', 'c8hap': 'Pasitaiko', 'c8k': 'Žinios keliauja <em>taip pat</em>.', 'c8b': 'Pastebi viena mokykla. Pataisoma <em>visoms</em>.',
 'c9a': 'Idėjos keliauja <em>taip pat</em>.', 'c9b': 'Pilotas – lėtai. Standartas – <em>visiems iš karto.</em>',
 'c10a': 'Paskelbiama <em>vieną kartą</em>.', 'c10b': 'Pasiekia <em>visas mokyklas</em>.', 'c10pill': '<i style="background:var(--blue)"></i>Savivaldybė / ministerija',
 'c10doc': 'Nauja taisyklė', 'c10c': 'Didelis tinklas gali sau leisti <em>dideles idėjas</em>.', 'c10bigl': 'Didelė idėja',
 'c11a': 'Kokybė neturi priklausyti nuo <em>dydžio</em>.', 'c11b': 'Ne vienodos. <em>Vienodai geros.</em>', 'c11lab': 'Viena dizaino sistema · savos spalvos',
 'c12a': 'Pokyčiai prasideda nuo <em>smulkmenų</em>.', 'c12m': 'Po <em>kąsnelį</em>.', 'c12b': 'Kiekvienas žingsnis pasiekia <em>visas mokyklas</em>.',
 'c12n': 'Nė vienas kąsnelis – <em>ne reforma</em>.', 'c12y': 'Po metų mokykla – <em>jau kita</em>.',
 'c12capA': 'MŪSŲ MOKYKLOS ISTORIJA', 'c12capB': 'Mūsų mokyklos istorija',
 'c12jA': 'Mokykla įkurta prieš šimtą metų ir augo kartu su savo bendruomene.', 'c12jB': 'Mokykla įkurta prieš šimtą metų ir augo kartu su savo bendruomene.',
 'c12troj': '<i style="background:var(--teal)"></i>Trojos dramblys · gerąja prasme',
 'c13a': '<em>O kas, jeigu…</em>?', 'c13b': 'Viena mokykla išbando. <em>Visos mokyklos gauna.</em>', 'c13bl': 'Tas pats pamatas',
 'c14a': 'O <em>dirbtinis intelektas</em>?', 'c14b': 'Dirbtinis intelektas mėgsta <em>tvarką</em>.',
 'c15a': 'Kas veikia vienoje mokykloje, veikia <em>visur</em>.', 'c15b': 'Ne pažadas, kad bus pigu. <em>Mastelio</em> logika.', 'c15cl1': 'Mokyklos', 'c15cl2': 'Kaštai',
 'c16a': '15 metų. Pirmieji dešimt? <em>Lėti.</em>', 'c16m': 'Lėtąją dalį galite <em>praleisti</em>.', 'c16g': 'Tikslas – grąžinti mokytoją <em>pas vaikus</em>.',
 'c16b': 'Sukurta <em>Lietuvoje</em> – kartu su jumis.', 'c16ylab': '15 metų · 15 rievių',
 'c16k1': 'Metų', 'c16k2': 'Įstaigų, vienas standartas', 'c16d3': '85 %', 'c16k3': 'Savivaldybių turi mūsų klientų',
 'c16e': 'Tos pačios taisyklės visoje ES. Sukurta vienai, <em>tinka visoms</em>.', 'c16tag': 'Bendra skaitmeninė mokyklų infrastruktūra.',
 'c16cta': 'Kviečiame į produkto pristatymą',
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
 ('"× 500 … and more"', '"× 500 … ir daugiau"', 1),
 ('["Fixed × 100"', '["Pataisyta × 100"', 1), ('["Fixed × 200"', '["Pataisyta × 200"', 1), ('["Fixed × 500"', '["Pataisyta × 500"', 1), ('["Fixed × 500 … and more"', '["Pataisyta × 500 … ir daugiau"', 1),
 # kanalas
 ('"The algorithm decides"', '"Sprendžia algoritmas"', 1),
 ('[["Search", "SEO", "Search engines", 360], ["AI answers", "GEO", "AI answers", 510], ["Agents", "MCP", "Agents", 660]]',
  '[["Paieška", "SEO", "Search engines", 360], ["DI atsakymai", "GEO", "AI answers", 510], ["Agentai", "MCP", "Agents", 660]]', 1),
 # pareigos
 ('["Accessibility", "var(--blue)"', '["Prieinamumas", "var(--blue)"', 1), ('["Data protection", "var(--teal)"', '["Duomenų apsauga", "var(--teal)"', 1),
 ('["Security", "var(--lav)"', '["Saugumas", "var(--lav)"', 1), ('["Changing rules", "var(--pink)"', '["Kintančios taisyklės", "var(--pink)"', 1),
 # kelmai
 ('"New tender · new website"', '"Naujas konkursas · nauja svetainė"', 1), ('"Continuity lost"', '"Prarastas tęstinumas"', 1),
 ('["New accessibility law", "New data rules", "New standard"]', '["Naujas prieinamumo įstatymas", "Naujos duomenų taisyklės", "Naujas standartas"]', 1),
 # ledkalnis ir dizaino sistema
 ('const LAY = [["Design system", "design system", 494], ["Modules and compliance", "compliance", 662], ["Training and support", "support", 822]];',
  'const LAY = [["Dizaino sistema", "design system", 494], ["Moduliai ir atitiktis", "compliance", 662], ["Mokymai ir pagalba", "support", 822]];', 1),
 ('dbtn(d1, 26, 270, 210, 64, 0, "Button");', 'dbtn(d1, 26, 270, 210, 64, 0, "Mygtukas");', 1),
 ('["Parts", "Blocks", "Sections", "Pages"].forEach', '["Detalės", "Blokai", "Skiltys", "Puslapiai"].forEach', 1),
 ('["Contrast", "Headings", "Keyboard"].forEach', '["Kontrastas", "Antraštės", "Klaviatūra"].forEach', 1),
 # be tuščio lapo
 ('[["Agency", "agency", 680], ["Website builder", "website builder", 1220]]', '[["Agentūra", "agency", 660], ["Svetainių konstruktorius", "website builder", 1220]]', 1),
 ('[["Pages", "pages", "OUR HISTORY — READ MORE!!!", "Our history"], ["Documents", "documents", "scan_0012.pdf (not searchable)", "Documents · searchable"],',
  '[["Puslapiai", "pages", "MŪSŲ ISTORIJA — SKAITYKITE!!!", "Mūsų istorija"], ["Dokumentai", "documents", "skenas_0012.pdf (neieškomas)", "Dokumentai · ieškomi"],', 1),
 ('["Staff profiles", "staff profiles", "Mrs. Teacher · left in 2019", "Staff · up to date"]', '["Darbuotojai", "staff profiles", "Mokytoja Ona · išėjo 2019 m.", "Darbuotojai · aktualūs"]', 1),
 # žinios
 ('[["Lesson", "lesson", 700], ["Video", "video", 960], ["Newsletter", "newsletter", 1220]]', '[["Pamoka", "lesson", 680], ["Filmukas", "video", 960], ["Naujienlaiškis", "newsletter", 1250]]', 1),
 # pilotas
 ('"Slow… very slow…"', '"Lėtai… labai lėtai…"', 1), ('></i>Pilot`', '></i>Pilotas`', 1), ('UI, "Data");', 'UI, "Duomenys");', 1),
 # paskelbk kartą
 ('m, "Anti-bullying week");', 'm, "Savaitė be patyčių");', 1), ('DOC.textContent = "New rule";', 'DOC.textContent = "Nauja taisyklė";', 1),
 ('[["Safer Internet Week", "safer internet"], ["Anti-bullying week", "anti-bullying"]]', '[["Saugesnio interneto savaitė", "safer internet"], ["Savaitė be patyčių", "anti-bullying"]]', 1),
 ('tl.set(DOC, { textContent: "New rule" }', 'tl.set(DOC, { textContent: "Nauja taisyklė" }', 1),
 ('<div id="c11lab" class="abs" style="left:1290px;top:884px;', '<div id="c11lab" class="abs" style="left:1230px;top:884px;', 1),
 ('<div id="c10doc" class="abs" style="left:820px;top:300px;width:280px;', '<div id="c10doc" class="abs" style="left:750px;top:300px;width:420px;', 1),
 ('[["No emails", "No emails", 610], ["No reminders", "No reminders", 930], ["No school left behind", "left behind", 1300]]',
  '[["Jokių laiškų", "No emails", 560], ["Jokių priminimų", "No reminders", 880], ["Nė viena mokykla nelieka nuošalyje", "left behind", 1310]]', 1),
 # Trojos dramblys
 ('[["Slow…", "Elephants"], ["Very slow…", "Very slow"], ["So slow…", "So slow"]]', '[["Lėti…", "Elephants"], ["Labai lėti…", "Very slow"], ["Tokie lėti…", "So slow"]]', 1),
 ('BN = ["Headings", "Cookie banner", "Document names"]', 'BN = ["Antraštės", "Slapukų juosta", "Dokumentų pavadinimai"]', 1),
 ('[["Digital hygiene", "every next step"], ["Live tables", "live tables"], ["Whistleblower channel", "whistleblower"], ["Consultation booking", "consultation"],',
  '[["Skaitmeninė higiena", "every next step"], ["Gyvos lentelės", "live tables"], ["Pranešėjų kanalas", "whistleblower"], ["Registracija į konsultacijas", "consultation"],', 1),
 ('["Surveys", "surveys"], ["Event calendar", "event calendars"], ["Weekly update digest", "weekly update digests"]]',
  '["Apklausos", "surveys"], ["Renginių kalendorius", "event calendars"], ["Savaitinė santrauka", "weekly update digests"]]', 1),
 # o kas, jeigu
 ('["Word file → finished article", "The author just clicks Approve",', '["Word failas → baigtas straipsnis", "Autoriui lieka paspausti „Tvirtinti“",', 1),
 ('["Documents name and file themselves", "Title, date and category from the file",', '["Dokumentai susidėlioja patys", "Pavadinimas, data ir kategorija – iš failo",', 1),
 ('["A fix ready before you notice", "Safe fixes done, the rest for approval",', '["Pataisyta, kol nepastebėjote", "Saugūs pataisymai atlikti, kiti – tvirtinti",', 1),
 ('>In development</em>', '>Kuriama</em>', 1),
 # mastelis
 ('[["School", 0,', '[["Mokykla", 0,', 1), ('["Municipality", 100,', '["Savivaldybė", 100,', 1), ('["Region", 190,', '["Regionas", 190,', 1), ('["Country", 280,', '["Šalis", 280,', 1),
 # 15 metų
 ('"Your region"', '"Jūsų savivaldybė"', 1),
 ('[["Content audit", "Audits", 660], ["Onboarding", "onboarding", 960], ["Training platform", "training", 1260]]',
  '[["Turinio auditas", "Audits", 640], ["Įdiegimas", "onboarding", 960], ["Mokymų platforma", "training", 1280]]', 1),
 ('"An elephant never forgets"', '"Dramblys niekada nepamiršta"', 1),
 ('[["Web Accessibility Directive", "web accessibility", 520], ["GDPR", "data protection", 960], ["Whistleblower Directive", "whistleblower protection", 1400]]',
  '[["Prieinamumo direktyva", "web accessibility", 560], ["BDAR", "data protection", 960], ["Pranešėjų direktyva", "whistleblower protection", 1360]]', 1),
]
for a, b, c in T: R(a, b, c)

# --- LT judesys: lietuviškas balsas ilgesnis, todėl ilgi sustingę ruožai suskaidomi prasmingu judesiu (≤15 % filmo)
M = [
 ('  head("#c1g", w(1, "Together") - 0.1, w(1, "hundred") - 0.5);',
  '  head("#c1g", w(1, "Together") - 0.1, w(1, "hundred") - 0.5);\n  // gera mokykla atrodo prasčiau: kortelės pilkėja\n  icards.forEach((k, i) => tl.to(k.c, { filter: "grayscale(1)", opacity: 0.7, scale: 0.97, duration: 1.2, ease: "power1.inOut" }, w(1, "Together") + 0.6 + i * 0.15));'),
 ('  N4.nodes.forEach((n) => tl.fromTo(n.nd, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t(9, 0.5)));',
  '  N4.nodes.forEach((n, k) => tl.fromTo(n.nd, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: E }, t(9, 0.5) + k * 0.06));'),
 ('  tl.to(sp.nd, { borderColor: "#3363ab", duration: 0.4 }, w(9, "innovative"));',
  '  tl.to(sp.nd, { borderColor: "#3363ab", duration: 0.4 }, w(9, "innovative"));\n  const halo4 = svgEl("circle", { cx: sp.x, cy: sp.y, r: 46, fill: "none", stroke: "#3363ab", "stroke-width": 6, opacity: 0 }, N4.NET);\n  tl.fromTo(halo4, { opacity: 0.6, attr: { r: 46 } }, { opacity: 0, attr: { r: 240 }, duration: 1.4, ease: "power1.out", repeat: 2, immediateRender: false }, w(9, "innovative") + 0.6);'),
 ('  tl.set(DOC, { textContent: "Nauja taisyklė" }, w(10, "publishes") - 0.05);',
  '  tl.set(DOC, { textContent: "Nauja taisyklė" }, w(10, "publishes") - 0.05);\n  // kiekvienas pavyzdys — svetainės „pasiruošia“ banga\n  ["new rule", "safer internet", "anti-bullying"].forEach((k) => minis.forEach((m) => tl.to(m.m, { y: -12, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(10, k) + 0.2 + m.d / 700 * 0.6)));'),
 ('    tl.to(d, { opacity: 0.9, duration: 0.25 }, w(16, "grow by itself") + 0.2 + k * 0.012); }',
  '    tl.to(d, { opacity: 0.9, duration: 0.25 }, w(16, "grow by itself") + 0.2 + k * 0.012);\n    // tinklas gyvas: taškai mirga, kol skamba skaičiai\n    if (k % 3 === 0) tl.to(d, { opacity: 0.3, duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut" }, w(16, "three hundred") + (k % 9) * 0.22); }'),
 ('  head("#c2m", w(2, "only channel") - 0.1, w(2, "looks") - 0.6);',
  '  head("#c2m", w(2, "only channel") - 0.1, w(2, "looks") - 0.6);\n  // „valdo pati“: jūsų svetainė iškyla prieš kitus\n  tl.to("#c2site", { scale: 1.06, duration: 0.9, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(2, "only channel") + 0.9);'),
 ('  pulse(N3, w(8, "newsletter") + 0.3, "#3363ab", "#3363ab", "#ffffff");',
  '  pulse(N3, w(8, "lesson") + 0.2, "#3ab0b0", "#3ab0b0", "#ffffff");\n  pulse(N3, w(8, "newsletter") + 0.3, "#3363ab", "#3363ab", "#ffffff");'),
 ('  // skydelis dešinėje:',
  '  // tinklas kvėpuoja, kol skamba skaičiai\n  tl.to("#c16time", { scale: 1.05, transformOrigin: "560px 560px", duration: 1.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, w(16, "three hundred") + 0.5);\n  // skydelis dešinėje:'),
 # pabaiga: „Dar ne mūsų klientas? … Ateisime pasiruošę.“ + kontaktai
 ('<div class="cta" id="c16cta" style="top:760px">',
  '<div id="c16q" class="lbl" style="left:960px;top:690px;font-size:40px;font-weight:700;color:#1e293b">Dar ne mūsų klientas?</div>\n    <div id="c16note" class="lbl" style="left:960px;top:878px;font-size:30px;font-weight:600;color:var(--teal)">Ateisime pasiruošę.</div>\n    <div class="cta" id="c16cta" style="top:760px">'),
 ('<div id="c16contact" class="lbl" style="left:960px;top:890px;', '<div id="c16contact" class="lbl" style="left:960px;top:940px;'),
 ('  tl.fromTo("#c16cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, w(16, "talk") + 2.6);',
  '  tl.fromTo("#c16cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, w(16, "talk") + 2.6);\n  tl.set(["#c16q", "#c16note"], { xPercent: -50 }, 0);\n  pop("#c16q", w(16, "talk") + 2.2);\n  pop("#c16note", w(16, "prepared"));'),
 ('  pop("#c16contact", w(16, "talk") + 3.0);', '  pop("#c16contact", w(16, "prepared") + 0.6);'),
 ('  tl.fromTo("#c12site", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, t(12, 0.4));',
  '  tl.fromTo("#c12site", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, t(12, 0.4));\n  // smulkmenos: kiekviena klaida paeiliui paryškinama\n  ["#c12capA", "#c12jA", "#c12imgA"].forEach((id, i) => tl.to(id, { boxShadow: "0 0 0 8px rgba(239,68,68,.35)", duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, t(12, 1.2) + i * 1.3));'),
 ('  tl.to(tp, { boxShadow: "0 0 0 5px rgba(58,176,176,.45), 0 8px 24px rgba(30,40,80,.08)", duration: 0.4 }, w(16, "never forgets"));',
  '  tl.to(tp, { boxShadow: "0 0 0 5px rgba(58,176,176,.45), 0 8px 24px rgba(30,40,80,.08)", duration: 0.4 }, w(16, "never forgets"));\n  // dramblys nepamiršta: abu žiedai atsiliepia\n  tl.to("#c16time", { scale: 1.04, transformOrigin: "960px 560px", duration: 1.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(16, "never forgets") + 0.6);'),
 ('  [...$("#c16flags").children].forEach((e) => { if (NONEU.includes(e.textContent)) tl.to(e, { opacity: 0.25, duration: 0.5 }, w(16, "European Union")); });',
  '  [...$("#c16flags").children].forEach((e) => { if (NONEU.includes(e.textContent)) tl.to(e, { opacity: 0.25, duration: 0.5 }, w(16, "European Union")); });\n  // ES: banga per ES šalių vėliavas\n  [...$("#c16flags").children].forEach((e, k) => { if (!NONEU.includes(e.textContent)) tl.to(e, { scale: 1.3, duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(16, "European Union") + 1.0 + k * 0.08); });'),
 ('  pop("#c16note", w(16, "prepared"));', '  pop("#c16note", w(16, "prepared"));\n  tl.to("#c16cta", { scale: 1.05, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, w(16, "prepared") + 1.2);')
]
for a, b in M: R(a, b)
open(dst, 'w', encoding='utf-8').write(s)
print('trūksta:', miss if miss else 'nieko')
