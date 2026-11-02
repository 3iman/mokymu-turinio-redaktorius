#!/usr/bin/env node
/**
 * „Navigacijų valdymas“ — TEMPLATE_ANIMATIONS įrašai iš laiko lentelių (eskizai-lt.md) ir išmatuotų
 * koordinačių (matavimai.json, žr. matuoti.js). Rašo į generate-video-clips.js tarp žymų
 * `>>> NAVIGACIJU-VALDYMAS` … `<<< NAVIGACIJU-VALDYMAS` — ranka ten neredaguoti.
 *
 * Principai (ANIMATION_PRINCIPLES.md § „UI žingsnių filmukai“, § „Fokusas“):
 *   - vienu metu viena vieta: prožektorius .spot (box-shadow) slenka iš vietos į vietą ~0,5 s;
 *   - kursorius juda lenkta trajektorija (cubic-bezier), spustelėjimas — ratilas ties garsu „spustelejimas“;
 *   - kamera (.stage scale) priartėja ten, kur elementai smulkūs; viena transform-origin kadrui;
 *   - ekranai keičiami per opacity, ne display (EIMANTO_PASTABOS 2026-10-30); bazinė CSS būsena = galutinė (§14);
 *   - laikai sutampa su scenarijaus laiko žymomis (balsas / garsas) — žr. komentarus prie kiekvieno įrašo.
 *
 *   node lessons/navigaciju-valdymas/animacijos.js
 */
const fs = require('fs');
const path = require('path');

const M = JSON.parse(fs.readFileSync(path.join(__dirname, 'matavimai.json'), 'utf-8'));
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const MOVE = 'cubic-bezier(.2,.7,.3,1)';
const SOFT = 'cubic-bezier(.45,0,.2,1)';

const pct = (t, D) => +((t / D) * 100).toFixed(3);
/** @keyframes iš [laikas, css, easing?] eilučių; vienodos gretimos eilutės = laikymas */
function kf(name, D, stops) {
  return `@keyframes ${name} {\n` + stops.map(([t, css, ease]) =>
    `      ${pct(t, D)}% { ${css}${ease ? ` animation-timing-function: ${ease};` : ''} }`).join('\n') + '\n    }';
}
/** prožektoriaus skylė aplink išmatuotą elementą */
function hole(r, pad = 8) {
  return `left: ${(r.x - pad).toFixed(1)}px; top: ${(r.y - pad).toFixed(1)}px; width: ${(r.w + 2 * pad).toFixed(1)}px; height: ${(r.h + 2 * pad).toFixed(1)}px;`;
}
const c = (r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });
/** kursoriaus smaigalys taške (x, y) */
const cur = (x, y) => `transform: translate(${(x - 4).toFixed(1)}px, ${(y - 3).toFixed(1)}px);`;
const ripple = (cls, x, y, t) =>
  `    .${cls} { left: ${x.toFixed(1)}px; top: ${y.toFixed(1)}px; animation: ratilas 0.6s ease-out ${t}s forwards; }`;   // forwards, ne both: su both „from“ būsena matytųsi prieš spustelėjimą
const RATILAS = `    @keyframes ratilas { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }`;
const fade = (sel, from, to, t0, t1, D, name) => `    ${sel} { animation: ${name} ${D}s linear 0s both; }\n    ` +
  kf(name, D, [[0, `opacity: ${from};`], [t0, `opacity: ${from};`], [t1, `opacity: ${to};`], [D, `opacity: ${to};`]]);

const entries = {};

/* ---------------------------------------------------------------------------------------------
 * KADRAS 5 — „Kur rasti „Navigacijos““ (13 s, ep_705_05_4)
 *   1.0 balsas „Navigacijos“ rasite darbalaukyje.   → fokusas ant darbalaukio „Navigacijos“
 *   3.9 balsas Arba kairiajame meniu.               → fokusas ant „≡“ ikonos, kursorius prie „☰“
 *   4.7 garsas spustelejimas                        → meniu išsiskleidžia, fokusas ant „Navigacijos“ su užrašu
 *   6.3 balsas Greičiausia – paieškoje įrašyti „navi“. → fokusas ant paieškos; meniu susiskleidžia
 *   7.9 garsas rasymas                              → „navi“ po raidę, 8.8 sąrašas „Navigation“
 *   9.6 balsas Ir pasirenkate „Navigacijos“.        → fokusas ant sąrašo punkto
 *  10.6 garsas spustelejimas                        → grupių sąrašas įslenka iš dešinės, kamera atsitraukia
 * ------------------------------------------------------------------------------------------- */
{
  const D = 13, m = M['05-kur-rasti-navigacijas'];
  const burger = c(m.burger), dd = { x: m.ddnav.x + 60, y: c(m.ddnav).y };
  const search = { x: m.search.x + 250, y: c(m.search).y };   // už placeholderio, kad kursorius neuždengtų „navi“
  const searchHole = { x: m.search.x - 10, y: m.search.y - 12, w: 330, h: 50 };
  const ddHole = { x: m.search.x - 10, y: m.search.y - 12, w: 360, h: m.ddnav.y + m.ddnav.h + 44 - (m.search.y - 12) };   // paieška + išskleistas sąrašas
  const sideHole = { x: m.sidebars.x - 14, y: m.sidebars.y - 14, w: m.sidebars.w + 28, h: m.sidebars.h + 28 };
  entries['05-kur-rasti-navigacijas'] = `
    /* Kamera: darbalaukis visas → priartėja prie viršutinio kairio kampo (meniu, paieška) → atsitraukia prie sąrašo */
    .stage { animation: k5kamera ${D}s linear 0s both; }
    ${kf('k5kamera', D, [[0, 'transform: scale(1);'], [3.4, 'transform: scale(1);', SOFT], [4.0, 'transform: scale(1.3);'],
      [10.6, 'transform: scale(1.3);', SOFT], [11.4, 'transform: scale(1);'], [D, 'transform: scale(1);']])}
    /* Prožektorius slenka: darbalaukis → „≡“ → „Navigacijos“ meniu → paieška → sąrašo punktas */
    .spot { animation: k5spot ${D}s linear 0s both; }
    ${kf('k5spot', D, [
      [0, hole(m.dashnav) + ' opacity: 0;'], [1.0, hole(m.dashnav) + ' opacity: 0;'], [1.4, hole(m.dashnav) + ' opacity: 1;'],
      [3.9, hole(m.dashnav) + ' opacity: 1;', SPRING], [4.4, hole(sideHole, 0) + ' opacity: 1;'],
      [5.0, hole(sideHole, 0) + ' opacity: 1;', SPRING], [5.4, hole(m.sidenav, 4) + ' opacity: 1;'],
      [6.3, hole(m.sidenav, 4) + ' opacity: 1;', SPRING], [6.8, hole(searchHole, 0) + ' opacity: 1;'],
      [8.8, hole(searchHole, 0) + ' opacity: 1;', SPRING], [9.1, hole(ddHole, 0) + ' opacity: 1;'],
      [9.6, hole(ddHole, 0) + ' opacity: 1;', SPRING], [10.1, hole(m.ddnav) + ' opacity: 1;'],
      [10.6, hole(m.ddnav) + ' opacity: 1;'], [11.0, hole(m.ddnav) + ' opacity: 0;'], [D, hole(m.ddnav) + ' opacity: 0;']])}
    /* Kursorius: ramybė → „☰“ → paieška → sąrašo punktas → ramybė */
    .cursor-wrap { animation: k5kursorius ${D}s linear 0s both; }
    ${kf('k5kursorius', D, [
      [0, cur(1350, 640)], [3.9, cur(1350, 640), MOVE], [4.5, cur(burger.x, burger.y)],
      [6.3, cur(burger.x, burger.y), MOVE], [6.9, cur(search.x, search.y)],
      [9.6, cur(search.x, search.y), MOVE], [10.2, cur(dd.x, dd.y)],
      [10.9, cur(dd.x, dd.y), MOVE], [11.8, cur(1204, 703)], [D, cur(1204, 703)]])}
${ripple('rp1', burger.x, burger.y, 4.7)}
${ripple('rp2', dd.x, dd.y, 10.6)}
${RATILAS}
    /* „☰“ išskleidžia meniu (ikona su užrašu), susiskleidžia perėjus į paiešką */
    .side-x { animation: k5meniu ${D}s linear 0s both; }
    ${kf('k5meniu', D, [[0, 'clip-path: inset(0 100% 0 0);'], [4.7, 'clip-path: inset(0 100% 0 0);', SOFT], [5.1, 'clip-path: inset(0 0 0 0);'],
      [6.3, 'clip-path: inset(0 0 0 0);', SOFT], [6.6, 'clip-path: inset(0 100% 0 0);'], [D, 'clip-path: inset(0 100% 0 0);']])}
    /* Paieška: žymeklis, placeholder dingsta, „navi“ po raidę, išskleidžiamas sąrašas */
    .caret { animation: k5caret ${D}s linear 0s both; }
    ${kf('k5caret', D, [[0, 'opacity: 0;'], [6.85, 'opacity: 0;'], [6.9, 'opacity: 1;'], [10.6, 'opacity: 1;'], [10.65, 'opacity: 0;'], [D, 'opacity: 0;']])}
    .ph { animation: k5ph 0.05s linear 7.85s both; }
    @keyframes k5ph { from { opacity: 1; } to { opacity: 0; } }
    @keyframes k5raide { from { max-width: 0; } to { max-width: 1.2em; } }
    .typed .l1 { animation: k5raide 0.01s step-end 7.9s both; }
    .typed .l2 { animation: k5raide 0.01s step-end 8.1s both; }
    .typed .l3 { animation: k5raide 0.01s step-end 8.3s both; }
    .typed .l4 { animation: k5raide 0.01s step-end 8.5s both; }
    .dd { animation: k5dd ${D}s linear 0s both; }
    ${kf('k5dd', D, [[0, 'opacity: 0; transform: translateY(8px);'], [8.8, 'opacity: 0; transform: translateY(8px);', SPRING], [9.1, 'opacity: 1; transform: translateY(0);'],
      [10.6, 'opacity: 1; transform: translateY(0);'], [10.9, 'opacity: 0; transform: translateY(0);'], [D, 'opacity: 0; transform: translateY(0);']])}
    /* Grupių sąrašas įslenka iš dešinės po spustelėjimo */
    .scr2 { animation: k5sarasas ${D}s linear 0s both; }
    ${kf('k5sarasas', D, [[0, 'opacity: 0; transform: translateX(60px);'], [10.7, 'opacity: 0; transform: translateX(60px);', SPRING],
      [11.2, 'opacity: 1; transform: translateX(0);'], [D, 'opacity: 1; transform: translateX(0);']])}
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 6 — „Atidarote nuorodų medį“ (9 s, ep_705_05_1)
 *   0.3 fokusas ant eilutės „Main“ (tęstinumas iš kadro 5)
 *   1.0 balsas Prie grupės „Main“ spaudžiate „Linkai“.   → kursorius prie „Linkai“, kamera priartėja
 *   2.6 garsas spustelejimas                              → medis įslenka, eilutės po vieną (0,15 s)
 *   4.4 balsas Atsiveria pagrindinės navigacijos medis.  → fokusas nuimamas, matosi visas medis
 * ------------------------------------------------------------------------------------------- */
{
  const D = 9, m = M['05-nuorodu-medis'];
  const links = c(m.linksmain);
  const treeHole = { x: m.rowmain.x - 6, y: 222, w: m.rowmain.w + 12, h: 540 };
  entries['05-nuorodu-medis'] = `
    .stage { animation: k6kamera ${D}s linear 0s both; }
    ${kf('k6kamera', D, [[0, 'transform: scale(1);'], [0.8, 'transform: scale(1);', SOFT], [1.4, 'transform: scale(1.25);'],
      [2.6, 'transform: scale(1.25);', SOFT], [3.4, 'transform: scale(1);'], [D, 'transform: scale(1);']])}
    .spot { animation: k6spot ${D}s linear 0s both; }
    ${kf('k6spot', D, [
      [0, hole(m.rowmain, 6) + ' opacity: 0;'], [0.3, hole(m.rowmain, 6) + ' opacity: 0;'], [0.7, hole(m.rowmain, 6) + ' opacity: 1;'],
      [1.0, hole(m.rowmain, 6) + ' opacity: 1;', SPRING], [1.4, hole(m.linksmain, 8) + ' opacity: 1;'],
      [2.6, hole(m.linksmain, 8) + ' opacity: 1;', SPRING], [3.0, hole(treeHole, 0) + ' opacity: 1;'],
      [4.4, hole(treeHole, 0) + ' opacity: 1;'], [4.9, hole(treeHole, 0) + ' opacity: 0;'], [D, hole(treeHole, 0) + ' opacity: 0;']])}
    .cursor-wrap { animation: k6kursorius ${D}s linear 0s both; }
    ${kf('k6kursorius', D, [
      [0, cur(1150, 700)], [1.0, cur(1150, 700), MOVE], [1.6, cur(links.x, links.y)],
      [2.9, cur(links.x, links.y), MOVE], [3.6, cur(1304, 763)], [D, cur(1304, 763)]])}
${ripple('rp1', links.x, links.y, 2.6)}
${RATILAS}
    /* Medis: ekranas pasikeičia po spustelėjimo, eilutės iš viršaus žemyn po vieną */
${fade('.scr2', 0, 1, 2.7, 3.0, D, 'k6medis')}
    .nd { animation: fadeUpLight 0.35s ${SPRING} 2.8s both; }
    .nd:nth-child(2) { animation-delay: 2.95s; } .nd:nth-child(3) { animation-delay: 3.10s; }
    .nd:nth-child(4) { animation-delay: 3.25s; } .nd:nth-child(5) { animation-delay: 3.40s; }
    .nd:nth-child(6) { animation-delay: 3.55s; } .nd:nth-child(7) { animation-delay: 3.70s; }
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 7 — „Puslapį pridedate į meniu“ (17 s, ep_705_05_2)
 *   1.6 balsas Nuorodų medyje spaudžiate „Naujas linkas“ ir pasirenkate „Page“.
 *   2.8 spustelejimas → langas „Page / URL“;  4.4 spustelejimas „Page“ → forma;  5.0–5.8 kamera prie „Page“
 *   6.8 balsas Lauke „Page“ susirandate puslapį „Logopedas“.
 *   7.2 spustelejimas „Pažymėti“ → „Choose an entry.“;  7.9 rasymas „logo“ → lieka „Logopedas“;  9.1 spustelejimas „Pažymėti“
 *   9.5–10.7 kamera atsitraukia, fokusas ant „Išsaugoti“
 *  10.9 balsas Spaudžiate „Išsaugoti“ – nuoroda atsiranda medžio apačioje.
 *  12.3 spustelejimas → medis su nauja eilute;  13.7 patvirtinimas → žalias blyksnis
 * ------------------------------------------------------------------------------------------- */
{
  const D = 17, m = M['05-nauja-nuoroda'];
  const nl = c(m.newlink), op = { x: m.optpage.x + 120, y: c(m.optpage).y + 6 }, pb = c(m.pickbtn), pr = c(m.pickrow), sv = c(m.save);
  entries['05-nauja-nuoroda'] = `
    .stage { animation: k7kamera ${D}s linear 0s both; }
    ${kf('k7kamera', D, [[0, 'transform: scale(1);'], [5.0, 'transform: scale(1);', SOFT], [5.8, 'transform: scale(1.3);'],
      [9.5, 'transform: scale(1.3);', SOFT], [10.7, 'transform: scale(1);'], [D, 'transform: scale(1);']])}
    .spot { animation: k7spot ${D}s linear 0s both; }
    ${kf('k7spot', D, [
      [0, hole(m.newlink) + ' opacity: 0;'], [0.4, hole(m.newlink) + ' opacity: 0;'], [0.8, hole(m.newlink) + ' opacity: 1;'],
      [3.2, hole(m.newlink) + ' opacity: 1;', SPRING], [3.6, hole(m.optpage, 6) + ' opacity: 1;'],
      [4.4, hole(m.optpage, 6) + ' opacity: 1;', SPRING], [4.9, hole(m.pickbtn) + ' opacity: 1;'],
      [7.4, hole(m.pickbtn) + ' opacity: 1;', SPRING], [7.8, hole(m.msearch) + ' opacity: 1;'],
      [8.8, hole(m.msearch) + ' opacity: 1;', SPRING], [9.1, hole(m.pickrow) + ' opacity: 1;'],
      [9.6, hole(m.pickrow) + ' opacity: 1;', SPRING], [10.1, hole(m.save) + ' opacity: 1;'],
      [12.4, hole(m.save) + ' opacity: 1;'], [12.8, hole(m.save) + ' opacity: 0;'], [D, hole(m.save) + ' opacity: 0;']])}
    .cursor-wrap { animation: k7kursorius ${D}s linear 0s both; }
    ${kf('k7kursorius', D, [
      [0, cur(1150, 720)], [1.6, cur(1150, 720), MOVE], [2.2, cur(nl.x, nl.y)],
      [3.4, cur(nl.x, nl.y), MOVE], [4.0, cur(op.x, op.y)],
      [6.2, cur(op.x, op.y), MOVE], [6.8, cur(pb.x, pb.y)],
      [8.5, cur(pb.x, pb.y), MOVE], [9.0, cur(pr.x, pr.y)],
      [10.4, cur(pr.x, pr.y), MOVE], [11.2, cur(sv.x, sv.y)],
      [12.8, cur(sv.x, sv.y), MOVE], [13.6, cur(1254, 783)], [D, cur(1254, 783)]])}
${ripple('rp1', nl.x, nl.y, 2.8)}
${ripple('rp2', op.x, op.y, 4.4)}
${ripple('rp3', pb.x, pb.y, 7.2)}
${ripple('rp4', pr.x, pr.y, 9.1)}
${ripple('rp5', sv.x, sv.y, 12.3)}
${RATILAS}
    /* Langas „Kokio tipo linką norite sukurti?“ — išsiskleidžia, dingsta pasirinkus „Page“ */
    .ov1 { animation: k7ov1 ${D}s linear 0s both; }
    ${kf('k7ov1', D, [[0, 'opacity: 0;'], [2.9, 'opacity: 0;'], [3.2, 'opacity: 1;'], [4.45, 'opacity: 1;'], [4.6, 'opacity: 0;'], [D, 'opacity: 0;']])}
    .modal-type { animation: k7modal1 ${D}s linear 0s both; }
    ${kf('k7modal1', D, [[0, 'opacity: 0; transform: scale(.94);'], [2.9, 'opacity: 0; transform: scale(.94);', SPRING], [3.25, 'opacity: 1; transform: scale(1);'],
      [4.45, 'opacity: 1; transform: scale(1);'], [4.6, 'opacity: 0; transform: scale(1);'], [D, 'opacity: 0; transform: scale(1);']])}
    /* Forma */
${fade('.scr2', 0, 1, 4.5, 4.8, D, 'k7forma')}
    /* Langas „Choose an entry.“: paieška „logo“, sąrašas susitraukia iki „Logopedas“ */
    .ov2 { animation: k7ov2 ${D}s linear 0s both; }
    ${kf('k7ov2', D, [[0, 'opacity: 0;'], [7.3, 'opacity: 0;'], [7.6, 'opacity: 1;'], [9.15, 'opacity: 1;'], [9.35, 'opacity: 0;'], [D, 'opacity: 0;']])}
    .modal-pick { animation: k7modal2 ${D}s linear 0s both; }
    ${kf('k7modal2', D, [[0, 'opacity: 0; transform: scale(.94);'], [7.3, 'opacity: 0; transform: scale(.94);', SPRING], [7.65, 'opacity: 1; transform: scale(1);'],
      [9.15, 'opacity: 1; transform: scale(1);'], [9.35, 'opacity: 0; transform: scale(1);'], [D, 'opacity: 0; transform: scale(1);']])}
    .caret { animation: k7caret ${D}s linear 0s both; }
    ${kf('k7caret', D, [[0, 'opacity: 0;'], [7.6, 'opacity: 0;'], [7.65, 'opacity: 1;'], [9.1, 'opacity: 1;'], [9.15, 'opacity: 0;'], [D, 'opacity: 0;']])}
    .ph2 { animation: k7ph 0.05s linear 7.85s both; }
    @keyframes k7ph { from { opacity: 1; } to { opacity: 0; } }
    @keyframes k7raide { from { max-width: 0; } to { max-width: 1.2em; } }
    .typed .l1 { animation: k7raide 0.01s step-end 7.9s both; }
    .typed .l2 { animation: k7raide 0.01s step-end 8.1s both; }
    .typed .l3 { animation: k7raide 0.01s step-end 8.3s both; }
    .typed .l4 { animation: k7raide 0.01s step-end 8.5s both; }
${fade('.list-all', 1, 0, 8.7, 8.85, D, 'k7visi')}
${fade('.list-one', 0, 1, 8.75, 8.95, D, 'k7vienas')}
    /* Pasirinktas puslapis atsiranda lauke „Page“ */
    .picked-row { animation: fadeUpLight 0.35s ${SPRING} 9.3s both; }
    /* Po „Išsaugoti“ — medis su nauja eilute apačioje, žalias blyksnis ties garsu „patvirtinimas“ */
${fade('.scr3', 0, 1, 12.4, 12.7, D, 'k7medis')}
    .node-new { animation: fadeUpLight 0.4s ${SPRING} 12.6s both, blyksnis 0.7s ease-out 13.7s both; }
    @keyframes blyksnis { 0% { box-shadow: 0 0 0 0 rgba(71,209,101,0); } 30% { box-shadow: 0 0 0 5px rgba(71,209,101,.9); } 100% { box-shadow: 0 0 0 0 rgba(71,209,101,0); } }
  `;
}

// ---- Įrašyti į generate-video-clips.js tarp žymų ----
const ZYMA_A = '  // >>> NAVIGACIJU-VALDYMAS (generuoja lessons/navigaciju-valdymas/animacijos.js — ranka neredaguoti)';
const ZYMA_B = '  // <<< NAVIGACIJU-VALDYMAS';
const blokas = ZYMA_A + '\n' + Object.entries(entries).map(([k, v]) => `  '${k}': \`${v}\`,`).join('\n') + '\n' + ZYMA_B;
const gv = path.join(__dirname, '..', '..', 'generate-video-clips.js');
let src = fs.readFileSync(gv, 'utf-8');
if (src.includes(ZYMA_A)) {
  src = src.slice(0, src.indexOf(ZYMA_A)) + blokas + src.slice(src.indexOf(ZYMA_B) + ZYMA_B.length);
} else {
  // prieš TEMPLATE_ANIMATIONS uždarymą: paskutinis `};` prieš `const FALLBACK_CSS`
  const fb = src.indexOf('const FALLBACK_CSS');
  const close = src.lastIndexOf('\n};', fb);
  if (close < 0) throw new Error('nerasta TEMPLATE_ANIMATIONS pabaiga');
  src = src.slice(0, close) + '\n' + blokas + src.slice(close);
}
fs.writeFileSync(gv, src);
console.log(`Įrašyta: ${Object.keys(entries).join(', ')} → generate-video-clips.js`);
