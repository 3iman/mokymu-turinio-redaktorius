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


/* ============================================================================================
 * Pagalbinės likusiems kadrams
 * ========================================================================================== */
/** stačiakampis, apimantis kelis išmatuotus */
const union = (...rs) => { const x = Math.min(...rs.map(r => r.x)), y = Math.min(...rs.map(r => r.y));
  return { x, y, w: Math.max(...rs.map(r => r.x + r.w)) - x, h: Math.max(...rs.map(r => r.y + r.h)) - y }; };
/** raidės po vieną: .{cls}{i} nuo t0 kas dt s (max-width 0 → 1.2em, žr. tvs.css „Rašymas po raidę“) */
const raides = (name, cls, n, t0, dt) => `    @keyframes ${name} { from { max-width: 0; } to { max-width: 1.2em; } }\n` +
  Array.from({ length: n }, (_, i) => `    .${cls}${i + 1} { animation: ${name} 0.01s step-end ${(t0 + i * dt).toFixed(2)}s both; }`).join('\n');
const BLYKSNIS = `    @keyframes blyksnis { 0% { box-shadow: 0 0 0 0 rgba(71,209,101,0); } 30% { box-shadow: 0 0 0 5px rgba(71,209,101,.9); } 100% { box-shadow: 0 0 0 0 rgba(71,209,101,0); } }`;
const SC = (s) => `transform: scale(${s});`;
const REST = cur(1250, 780);

/* ---------------------------------------------------------------------------------------------
 * KADRAS 1 — „Grupės jau sukurtos“ (13 s, ep_705_01_1)
 *   1.2 balsas Navigacijų sąraše grupės jau sukurtos.        → fokusas eina vardais „4 ikonos“ → „Black“ → „Footer 1“ → „Main“
 *   4.4 balsas Prie kiekvienos matote aprašymą…               → fokusas praplatėja į stulpelį „Aprašymas“, aprašymai šviesėja eilė po eilės
 *   9.2 balsas Jums belieka pasirinkti reikiamą.              → kursorius užeina ant „Main“ (nespaudžia)
 * ------------------------------------------------------------------------------------------- */
{
  const D = 13, m = M['01-navigaciju-grupes'];
  const descCol = { x: m.thdesc.x - 12, y: m.desc1.y - 16, w: m.thdesc.w + 24, h: m.desc6.y + m.desc6.h + 16 - (m.desc1.y - 16) };
  const rm = c(m.rowmain);
  entries['01-navigaciju-grupes'] = `
    .stage { animation: k1kamera ${D}s linear 0s both; }
    ${kf('k1kamera', D, [[0, SC(1)], [0.8, SC(1), SOFT], [1.4, SC(1.15)], [9.8, SC(1.15), SOFT], [10.6, SC(1)], [D, SC(1)]])}
    .spot { animation: k1spot ${D}s linear 0s both; }
    ${kf('k1spot', D, [
      [0, hole(m.thname, 10) + ' opacity: 0;'], [0.4, hole(m.thname, 10) + ' opacity: 1;'],
      [1.2, hole(m.thname, 10) + ' opacity: 1;', SPRING], [1.6, hole(m.n1, 10) + ' opacity: 1;'],
      [1.8, hole(m.n1, 10) + ' opacity: 1;', SPRING], [2.2, hole(m.n2, 10) + ' opacity: 1;'],
      [2.4, hole(m.n2, 10) + ' opacity: 1;', SPRING], [2.8, hole(m.n3, 10) + ' opacity: 1;'],
      [3.0, hole(m.n3, 10) + ' opacity: 1;', SPRING], [3.4, hole(m.n4, 10) + ' opacity: 1;'],
      [4.4, hole(m.n4, 10) + ' opacity: 1;', SPRING], [4.9, hole(descCol, 0) + ' opacity: 1;'],
      [9.2, hole(descCol, 0) + ' opacity: 1;', SPRING], [9.7, hole(m.rowmain, 6) + ' opacity: 1;'],
      [10.4, hole(m.rowmain, 6) + ' opacity: 1;'], [10.9, hole(m.rowmain, 6) + ' opacity: 0;'], [D, hole(m.rowmain, 6) + ' opacity: 0;']])}
    /* Aprašymai šviesėja iš viršaus po vieną */
    @keyframes k1desc { from { opacity: .3; } to { opacity: 1; } }
${[2, 3, 4, 5, 6, 7].map((n, i) => `    .tvs-row:nth-child(${n}) .tvs-desc { animation: k1desc 0.4s linear ${(4.6 + i * 0.3).toFixed(1)}s both; }`).join('\n')}
    /* Kursorius užeina ant „Main“ — eilutė pašviesėja */
    @keyframes k1hover { from { background: #fff; } to { background: #f7f9fa; } }
    .row-main { animation: k1hover 0.3s linear 9.6s both; }
    .cursor-wrap { animation: k1kursorius ${D}s linear 0s both; }
    ${kf('k1kursorius', D, [[0, cur(1500, 870)], [9.2, cur(1500, 870), MOVE], [9.8, cur(900, rm.y + 8)], [D, cur(900, rm.y + 8)]])}
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 2 — „Sukuriate naują grupę“ (14 s, ep_705_02_1)
 *   1.4 balsas Naują grupę pradedate mygtuku „Naujas meniu“. → kursorius prie mygtuko;  2.6 spustelejimas → forma
 *   5.1 balsas Lauke „Vardas“ įrašote grupės pavadinimą.    → kamera prie laukų, fokusas „Vardas“
 *   6.5 rasymas → „Pagalba mokiniams“ po raidę, „Slug“ pildosi kartu
 *   8.5 balsas Laukas „Slug“ užsipildo pats – patikrinate ir išsaugote. → fokusas „Slug“ → „Išsaugoti“
 *  10.9 spustelejimas → sąrašas su nauja eilute;  11.4 patvirtinimas → žalias blyksnis
 * ------------------------------------------------------------------------------------------- */
{
  const D = 14, m = M['02-nauja-grupe'];
  const nm = c(m.newmenu), sv = c(m.save), vd = { x: m.vardas.x + 420, y: c(m.vardas).y };
  const N = 'Pagalba mokiniams'.length;
  entries['02-nauja-grupe'] = `
    .stage { animation: k2kamera ${D}s linear 0s both; }
    ${kf('k2kamera', D, [[0, SC(1)], [4.7, SC(1), SOFT], [5.3, SC(1.25)], [9.4, SC(1.25), SOFT], [10.2, SC(1)], [D, SC(1)]])}
    .spot { animation: k2spot ${D}s linear 0s both; }
    ${kf('k2spot', D, [
      [0, hole(m.newmenu, 8) + ' opacity: 0;'], [0.3, hole(m.newmenu, 8) + ' opacity: 0;'], [0.7, hole(m.newmenu, 8) + ' opacity: 1;'],
      [2.6, hole(m.newmenu, 8) + ' opacity: 1;'], [2.9, hole(m.newmenu, 8) + ' opacity: 0;'],
      [5.1, hole(m.vardas, 8) + ' opacity: 0;'], [5.5, hole(m.vardas, 8) + ' opacity: 1;'],
      [8.5, hole(m.vardas, 8) + ' opacity: 1;', SPRING], [8.9, hole(m.slug, 8) + ' opacity: 1;'],
      [9.6, hole(m.slug, 8) + ' opacity: 1;', SPRING], [10.1, hole(m.save, 8) + ' opacity: 1;'],
      [10.9, hole(m.save, 8) + ' opacity: 1;'], [11.2, hole(m.save, 8) + ' opacity: 0;'], [D, hole(m.save, 8) + ' opacity: 0;']])}
    .cursor-wrap { animation: k2kursorius ${D}s linear 0s both; }
    ${kf('k2kursorius', D, [
      [0, REST], [1.4, REST, MOVE], [2.0, cur(nm.x, nm.y)],
      [3.2, cur(nm.x, nm.y), MOVE], [3.8, cur(vd.x, vd.y)],
      [9.0, cur(vd.x, vd.y), MOVE], [9.6, cur(sv.x, sv.y)],
      [11.6, cur(sv.x, sv.y), MOVE], [12.4, cur(1250, 870)], [D, cur(1250, 870)]])}
${ripple('rp1', nm.x, nm.y, 2.6)}
${ripple('rp2', sv.x, sv.y, 10.9)}
${RATILAS}
    /* Ekranai: sąrašas → forma (įslenka) → sąrašas su nauja eilute */
${fade('.scr1', 1, 0, 2.7, 3.0, D, 'k2sarasas')}
    .scr2 { animation: k2forma ${D}s linear 0s both; }
    ${kf('k2forma', D, [[0, 'opacity: 0; transform: translateX(60px);'], [2.7, 'opacity: 0; transform: translateX(60px);', SPRING], [3.1, 'opacity: 1; transform: translateX(0);'],
      [11.0, 'opacity: 1; transform: translateX(0);'], [11.3, 'opacity: 0; transform: translateX(0);'], [D, 'opacity: 0; transform: translateX(0);']])}
${fade('.scr3', 0, 1, 11.0, 11.3, D, 'k2naujas')}
    .row-new { animation: fadeUpLight 0.4s ${SPRING} 11.2s both, blyksnis 0.7s ease-out 11.4s both; }
${BLYKSNIS}
    /* Rašymas: „Vardas“ po raidę, „Slug“ pildosi kartu */
    .caret { animation: k2caret ${D}s linear 0s both; }
    ${kf('k2caret', D, [[0, 'opacity: 0;'], [5.2, 'opacity: 0;'], [5.25, 'opacity: 1;'], [10.8, 'opacity: 1;'], [10.85, 'opacity: 0;'], [D, 'opacity: 0;']])}
${raides('k2raide', 'l', N, 6.5, 0.1)}
${raides('k2slug', 's', N, 6.55, 0.1)}
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 3 — „Atpažįstate išorinę nuorodą“ (11 s, ep_705_03_1)
 *   1.2 balsas Prie nuorodos matote raudoną strėlytę.   → kamera 1,6 prie „Youtube kanalas“, fokusas ant eilutės
 *   3.0–3.6 strėlytė du kartus sumirksi (1 → 1,25 → 1)
 *   4.6 balsas Ji reiškia išorinę nuorodą.              → fokusas susiaurėja iki „URL“ ir strėlytės
 *   7.0 balsas Lankytoją ji išves už svetainės ribų.    → kamera atsitraukia, fokusas nuimamas
 * ------------------------------------------------------------------------------------------- */
{
  const D = 11, m = M['03-isorine-nuoroda'];
  const mark = union(m.yttag, m.ytext);
  entries['03-isorine-nuoroda'] = `
    .stage { animation: k3kamera ${D}s linear 0s both; }
    ${kf('k3kamera', D, [[0, SC(1)], [1.0, SC(1), SOFT], [1.9, SC(1.6)], [7.0, SC(1.6), SOFT], [7.9, SC(1)], [D, SC(1)]])}
    .spot { animation: k3spot ${D}s linear 0s both; }
    ${kf('k3spot', D, [
      [0, hole(m.ytrow, 6) + ' opacity: 0;'], [1.2, hole(m.ytrow, 6) + ' opacity: 0;'], [1.6, hole(m.ytrow, 6) + ' opacity: 1;'],
      [4.6, hole(m.ytrow, 6) + ' opacity: 1;', SPRING], [5.1, hole(mark, 10) + ' opacity: 1;'],
      [7.0, hole(mark, 10) + ' opacity: 1;'], [7.5, hole(mark, 10) + ' opacity: 0;'], [D, hole(mark, 10) + ' opacity: 0;']])}
    /* Strėlytė sumirksi du kartus */
    @keyframes k3pulse { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }
    .tvs-ext { animation: k3pulse 0.5s ease-in-out 3.0s 2; }
    .cursor-wrap { animation: k3kursorius ${D}s linear 0s both; }
    ${kf('k3kursorius', D, [[0, cur(1250, 820)], [D, cur(1250, 820)]])}
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 4 — „Pasirenkate nuorodos tipą“ (12 s, ep_705_04_1)
 *   1.2 balsas Kurdami nuorodą pirmiausia pasirenkate jos tipą.   → fokusas ant lango antraštės
 *   5.2 balsas „Page“ priskiria puslapį iš svetainės medžio.      → fokusas ir kursorius ant „Page“
 *   8.9 balsas „URL“ veda į išorinę nuorodą.                       → fokusas ir kursorius ant „URL“
 *  10.3 spustelejimas → langas užsidaro, forma „URL“
 * ------------------------------------------------------------------------------------------- */
{
  const D = 12, m = M['04-nuorodos-tipas'];
  const op = { x: m.optpage.x + 120, y: c(m.optpage).y + 6 }, ou = { x: m.opturl.x + 120, y: c(m.opturl).y + 6 };
  entries['04-nuorodos-tipas'] = `
    .spot { animation: k4spot ${D}s linear 0s both; }
    ${kf('k4spot', D, [
      [0, hole(m.modalh, 12) + ' opacity: 0;'], [1.2, hole(m.modalh, 12) + ' opacity: 0;'], [1.6, hole(m.modalh, 12) + ' opacity: 1;'],
      [5.2, hole(m.modalh, 12) + ' opacity: 1;', SPRING], [5.7, hole(m.optpage, 6) + ' opacity: 1;'],
      [8.9, hole(m.optpage, 6) + ' opacity: 1;', SPRING], [9.4, hole(m.opturl, 6) + ' opacity: 1;'],
      [10.3, hole(m.opturl, 6) + ' opacity: 1;'], [10.6, hole(m.opturl, 6) + ' opacity: 0;'], [D, hole(m.opturl, 6) + ' opacity: 0;']])}
    .cursor-wrap { animation: k4kursorius ${D}s linear 0s both; }
    ${kf('k4kursorius', D, [
      [0, REST], [5.2, REST, MOVE], [5.8, cur(op.x, op.y)],
      [8.9, cur(op.x, op.y), MOVE], [9.4, cur(ou.x, ou.y)],
      [10.8, cur(ou.x, ou.y), MOVE], [11.4, cur(1250, 820)], [D, cur(1250, 820)]])}
${ripple('rp1', ou.x, ou.y, 10.3)}
${RATILAS}
    /* Langas virš medžio — iki spustelėjimo; tada forma „URL“ */
${fade('.scr1', 1, 0, 10.4, 10.7, D, 'k4medis')}
${fade('.scr2', 0, 1, 10.4, 10.7, D, 'k4forma')}
    .caret2 { animation: k4caret ${D}s linear 0s both; }
    ${kf('k4caret', D, [[0, 'opacity: 0;'], [10.7, 'opacity: 0;'], [10.75, 'opacity: 1;'], [D, 'opacity: 1;']])}
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 8 — „Meniu vardas gali skirtis“ (13 s, ep_705_06_1)
 *   1.2 balsas Lauke „Title“ įrašote, kaip nuoroda vadinsis meniu.  → kamera 1,3; fokusas ant „Title“ („Projektai“)
 *   5.4 balsas Priskirtas puslapis gali vadintis kitaip.           → fokusas ant eilutės „Projektinė veikla“
 *   8.8 balsas Meniu lieka trumpas pavadinimas.                     → fokusas apima abu, abu užrašai sumirksi
 * ------------------------------------------------------------------------------------------- */
{
  const D = 13, m = M['06-skirtingi-pavadinimai'];
  const both = union(m.titlein, m.picked);
  entries['06-skirtingi-pavadinimai'] = `
    .stage { animation: k8kamera ${D}s linear 0s both; }
    ${kf('k8kamera', D, [[0, SC(1)], [1.0, SC(1), SOFT], [1.7, SC(1.3)], [10.4, SC(1.3), SOFT], [11.2, SC(1)], [D, SC(1)]])}
    .spot { animation: k8spot ${D}s linear 0s both; }
    ${kf('k8spot', D, [
      [0, hole(m.titlein, 8) + ' opacity: 0;'], [1.2, hole(m.titlein, 8) + ' opacity: 0;'], [1.6, hole(m.titlein, 8) + ' opacity: 1;'],
      [5.4, hole(m.titlein, 8) + ' opacity: 1;', SPRING], [5.9, hole(m.picked, 8) + ' opacity: 1;'],
      [8.8, hole(m.picked, 8) + ' opacity: 1;', SPRING], [9.3, hole(both, 10) + ' opacity: 1;'],
      [10.4, hole(both, 10) + ' opacity: 1;'], [10.9, hole(both, 10) + ' opacity: 0;'], [D, hole(both, 10) + ' opacity: 0;']])}
    @keyframes k8blink { 0% { opacity: 1; } 50% { opacity: .3; } 100% { opacity: 1; } }
    .blink { animation: k8blink 0.55s ease-in-out 9.2s 2; }
    .cursor-wrap { animation: k8kursorius ${D}s linear 0s both; }
    ${kf('k8kursorius', D, [[0, cur(1250, 840)], [D, cur(1250, 840)]])}
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 9 — „Atidarote nuorodos parinktis“ (14 s, ep_705_07_1)
 *   1.4 balsas Prie grupės „Black“ spaudžiate „Linkai“.   2.6 spustelejimas → „Black“ medis
 *   4.7 balsas Atidarote nuorodą, kuriai norite ikonėlės.  5.9 spustelejimas „Pamokų laikas“ → forma
 *   8.2 balsas Skirtuke „Parinktys“ laukas „Class“ kol kas tuščias.   9.0 spustelejimas → „Parinktys“, fokusas ant „Class“
 * ------------------------------------------------------------------------------------------- */
{
  const D = 14, m = M['07-juodojo-meniu-parinktys'];
  const lb = c(m.linksblack), n1 = { x: m.node1.x + 220, y: c(m.node1).y }, tb = c(m.tabopts), ci = { x: m.classin.x + 520, y: c(m.classin).y + 4 };
  entries['07-juodojo-meniu-parinktys'] = `
    .stage { animation: k9kamera ${D}s linear 0s both; }
    ${kf('k9kamera', D, [[0, SC(1)], [0.8, SC(1), SOFT], [1.4, SC(1.15)], [2.8, SC(1.15), SOFT], [3.6, SC(1)],
      [8.0, SC(1), SOFT], [8.6, SC(1.25)], [11.6, SC(1.25), SOFT], [12.4, SC(1)], [D, SC(1)]])}
    .spot { animation: k9spot ${D}s linear 0s both; }
    ${kf('k9spot', D, [
      [0, hole(m.rowblack, 6) + ' opacity: 0;'], [0.3, hole(m.rowblack, 6) + ' opacity: 0;'], [0.7, hole(m.rowblack, 6) + ' opacity: 1;'],
      [1.4, hole(m.rowblack, 6) + ' opacity: 1;', SPRING], [1.8, hole(m.linksblack, 8) + ' opacity: 1;'],
      [2.6, hole(m.linksblack, 8) + ' opacity: 1;'], [2.9, hole(m.linksblack, 8) + ' opacity: 0;'],
      [3.3, hole(m.node1, 6) + ' opacity: 0;'], [3.7, hole(m.node1, 6) + ' opacity: 1;'],
      [5.9, hole(m.node1, 6) + ' opacity: 1;'], [6.2, hole(m.node1, 6) + ' opacity: 0;'],
      [8.2, hole(m.tabopts, 6) + ' opacity: 0;'], [8.6, hole(m.tabopts, 6) + ' opacity: 1;'],
      [9.3, hole(m.tabopts, 6) + ' opacity: 1;', SPRING], [9.7, hole(m.classin, 8) + ' opacity: 1;'],
      [11.6, hole(m.classin, 8) + ' opacity: 1;'], [12.1, hole(m.classin, 8) + ' opacity: 0;'], [D, hole(m.classin, 8) + ' opacity: 0;']])}
    .cursor-wrap { animation: k9kursorius ${D}s linear 0s both; }
    ${kf('k9kursorius', D, [
      [0, REST], [1.4, REST, MOVE], [2.0, cur(lb.x, lb.y)],
      [3.6, cur(lb.x, lb.y), MOVE], [4.4, cur(n1.x, n1.y)],
      [6.6, cur(n1.x, n1.y), MOVE], [7.4, cur(tb.x, tb.y)],
      [9.6, cur(tb.x, tb.y), MOVE], [10.2, cur(ci.x, ci.y)],
      [11.8, cur(ci.x, ci.y), MOVE], [12.6, cur(1250, 840)], [D, cur(1250, 840)]])}
${ripple('rp1', lb.x, lb.y, 2.6)}
${ripple('rp2', n1.x, n1.y, 5.9)}
${ripple('rp3', tb.x, tb.y, 9.0)}
${RATILAS}
    /* Ekranai: sąrašas → medis → forma „Pagrindinis“ → „Parinktys“ */
${fade('.scr1', 1, 0, 2.7, 3.0, D, 'k9sarasas')}
    .scr2 { animation: k9medis ${D}s linear 0s both; }
    ${kf('k9medis', D, [[0, 'opacity: 0;'], [2.7, 'opacity: 0;'], [3.0, 'opacity: 1;'], [6.0, 'opacity: 1;'], [6.3, 'opacity: 0;'], [D, 'opacity: 0;']])}
    .scr3 { animation: k9forma ${D}s linear 0s both; }
    ${kf('k9forma', D, [[0, 'opacity: 0;'], [6.0, 'opacity: 0;'], [6.3, 'opacity: 1;'], [9.1, 'opacity: 1;'], [9.3, 'opacity: 0;'], [D, 'opacity: 0;']])}
${fade('.scr4', 0, 1, 9.1, 9.3, D, 'k9parinktys')}
    .caret { animation: k9caret ${D}s linear 0s both; }
    ${kf('k9caret', D, [[0, 'opacity: 0;'], [9.4, 'opacity: 0;'], [9.45, 'opacity: 1;'], [D, 'opacity: 1;']])}
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 10 — „Nukopijuojate ikonėlės kodą“ (15 s, ep_705_07_2)
 *   1.4 balsas Fontawesome paieškoje įrašote ikonos vardą.   2.8 rasymas „list“ → tinklelis persitvarko
 *   5.0 balsas Pasirenkate tinkamą ikoną.                     6.2 spustelejimas „list-ol“ → ikonos langas
 *   8.4 balsas Stilių renkatės „Light“ ir nukopijuojate HTML kodą.  → „Light“ pasižymi, fokusas slenka į kodo bloką
 *  10.6 kursorius ant kopijavimo mygtuko;  11.0 patvirtinimas → kodo blokas pašviesėja
 * ------------------------------------------------------------------------------------------- */
{
  const D = 15, m = M['07-fontawesome-kodas'];
  const se = { x: m.fasearch.x + 420, y: c(m.fasearch).y }, cl = c(m.cardlistol), ch = c(m.chiplight), cp = c(m.copybtn);
  entries['07-fontawesome-kodas'] = `
    .spot { animation: k10spot ${D}s linear 0s both; }
    ${kf('k10spot', D, [
      [0, hole(m.fasearch, 10) + ' opacity: 0;'], [1.4, hole(m.fasearch, 10) + ' opacity: 0;'], [1.8, hole(m.fasearch, 10) + ' opacity: 1;'],
      [5.0, hole(m.fasearch, 10) + ' opacity: 1;', SPRING], [5.5, hole(m.cardlistol, 8) + ' opacity: 1;'],
      [6.2, hole(m.cardlistol, 8) + ' opacity: 1;'], [6.5, hole(m.cardlistol, 8) + ' opacity: 0;'],
      [8.4, hole(m.chiplight, 8) + ' opacity: 0;'], [8.8, hole(m.chiplight, 8) + ' opacity: 1;'],
      [9.6, hole(m.chiplight, 8) + ' opacity: 1;', SPRING], [10.1, hole(m.codeblock, 10) + ' opacity: 1;'],
      [11.6, hole(m.codeblock, 10) + ' opacity: 1;'], [12.1, hole(m.codeblock, 10) + ' opacity: 0;'], [D, hole(m.codeblock, 10) + ' opacity: 0;']])}
    .cursor-wrap { animation: k10kursorius ${D}s linear 0s both; }
    ${kf('k10kursorius', D, [
      [0, cur(1250, 820)], [1.4, cur(1250, 820), MOVE], [2.0, cur(se.x, se.y)],
      [4.6, cur(se.x, se.y), MOVE], [5.2, cur(cl.x, cl.y)],
      [8.4, cur(cl.x, cl.y), MOVE], [8.9, cur(ch.x, ch.y)],
      [10.0, cur(ch.x, ch.y), MOVE], [10.6, cur(cp.x, cp.y)], [D, cur(cp.x, cp.y)]])}
${ripple('rp1', cl.x, cl.y, 6.2)}
${RATILAS}
    /* Paieška: žymeklis, placeholderis dingsta, „list“ po raidę, tinklelis persitvarko */
    .caret { animation: k10caret ${D}s linear 0s both; }
    ${kf('k10caret', D, [[0, 'opacity: 0;'], [1.6, 'opacity: 0;'], [1.65, 'opacity: 1;'], [6.2, 'opacity: 1;'], [6.25, 'opacity: 0;'], [D, 'opacity: 0;']])}
    .ph { animation: k10ph ${D}s linear 0s both; }
    ${kf('k10ph', D, [[0, 'opacity: 1;'], [2.75, 'opacity: 1;'], [2.8, 'opacity: 0;'], [D, 'opacity: 0;']])}
${raides('k10raide', 'l', 4, 2.8, 0.2)}
${fade('.grid-all', 1, 0, 3.5, 3.8, D, 'k10visi')}
${fade('.grid-list', 0, 1, 3.6, 3.95, D, 'k10list')}
    /* Ikonos langas; „Light“ pasižymi; kodo blokas pašviesėja ties „patvirtinimas“ */
${fade('.ov1', 0, 1, 6.3, 6.6, D, 'k10ov')}
    .fa-modal { animation: k10modal ${D}s linear 0s both; }
    ${kf('k10modal', D, [[0, 'opacity: 0; transform: scale(.94);'], [6.3, 'opacity: 0; transform: scale(.94);', SPRING], [6.7, 'opacity: 1; transform: scale(1);'], [D, 'opacity: 1; transform: scale(1);']])}
    .chip-light { font-weight: 500; animation: k10chip ${D}s linear 0s both; }
    ${kf('k10chip', D, [[0, 'background: #eef1f6; border-color: transparent;'], [8.95, 'background: #eef1f6; border-color: transparent;'], [9.15, 'background: #fff; border-color: #183153;'], [D, 'background: #fff; border-color: #183153;']])}
    @keyframes k10flash { 0% { background: #2c3e5c; } 40% { background: #4f6a9a; } 100% { background: #2c3e5c; } }
    .code-box { animation: k10flash 0.7s ease-out 10.9s both; }
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 11 — „Įklijuojate ikonėlės klasę“ (16 s, ep_705_07_3)
 *   1.4 balsas Lauke „Class“ įklijuojate nukopijuotą kodą.   2.6 rasymas → visas kodas iš karto
 *   5.0 balsas Paliekate tik klasę – HTML dalis ištrinate.   → „<i class="“ ir „"></i>“ pasižymi;  7.2 rasymas → dingsta
 *   9.1 balsas Spaudžiate „Atnaujinti“ ir ikonėlė atsiranda meniu.   10.5 spustelejimas → svetainės meniu
 *  12.3 patvirtinimas → ikonėlė prie „PAMOKŲ LAIKAS“, žalias blyksnis
 * ------------------------------------------------------------------------------------------- */
{
  const D = 16, m = M['07-ikonos-klase'];
  const ci = { x: m.classin.x + 560, y: c(m.classin).y + 4 }, up = c(m.update);
  const SEL = (mw, bg) => `max-width: ${mw}; background: ${bg};`;
  entries['07-ikonos-klase'] = `
    .stage { animation: k11kamera ${D}s linear 0s both; }
    ${kf('k11kamera', D, [[0, SC(1)], [1.0, SC(1), SOFT], [1.6, SC(1.3)], [8.6, SC(1.3), SOFT], [9.4, SC(1)], [D, SC(1)]])}
    .spot { animation: k11spot ${D}s linear 0s both; }
    ${kf('k11spot', D, [
      [0, hole(m.classin, 8) + ' opacity: 0;'], [0.3, hole(m.classin, 8) + ' opacity: 0;'], [0.7, hole(m.classin, 8) + ' opacity: 1;'],
      [9.0, hole(m.classin, 8) + ' opacity: 1;', SPRING], [9.5, hole(m.update, 8) + ' opacity: 1;'],
      [10.5, hole(m.update, 8) + ' opacity: 1;'], [10.8, hole(m.update, 8) + ' opacity: 0;'],
      [12.0, hole(m.menu1, 6) + ' opacity: 0;'], [12.4, hole(m.menu1, 6) + ' opacity: 1;'],
      [13.4, hole(m.menu1, 6) + ' opacity: 1;'], [13.9, hole(m.menu1, 6) + ' opacity: 0;'], [D, hole(m.menu1, 6) + ' opacity: 0;']])}
    .cursor-wrap { animation: k11kursorius ${D}s linear 0s both; }
    ${kf('k11kursorius', D, [
      [0, REST], [1.4, REST, MOVE], [2.0, cur(ci.x, ci.y)],
      [9.1, cur(ci.x, ci.y), MOVE], [9.7, cur(up.x, up.y)],
      [11.6, cur(up.x, up.y), MOVE], [12.4, cur(1000, 820)], [D, cur(1000, 820)]])}
${ripple('rp1', up.x, up.y, 10.5)}
${RATILAS}
    /* Laukas „Class“: įklijuojama iš karto, HTML dalys pasižymi mėlynai ir dingsta, lieka „fal fa-list-ol“ */
    .caret { animation: k11caret ${D}s linear 0s both; }
    ${kf('k11caret', D, [[0, 'opacity: 0;'], [1.6, 'opacity: 0;'], [1.65, 'opacity: 1;'], [10.4, 'opacity: 1;'], [10.45, 'opacity: 0;'], [D, 'opacity: 0;']])}
    .code .keep { animation: k11keep ${D}s linear 0s both; }
    ${kf('k11keep', D, [[0, 'max-width: 0;'], [2.6, 'max-width: 0;'], [2.61, 'max-width: 20em;'], [D, 'max-width: 20em;']])}
    .code .sel { animation: k11sel ${D}s linear 0s both; }
    ${kf('k11sel', D, [[0, SEL('0', 'transparent')], [2.6, SEL('0', 'transparent')], [2.61, SEL('12em', 'transparent')],
      [5.0, SEL('12em', 'transparent')], [5.3, SEL('12em', '#b4d7ff')], [7.2, SEL('12em', '#b4d7ff')], [7.21, SEL('0', '#b4d7ff')], [D, SEL('0', '#b4d7ff')]])}
    /* Po „Atnaujinti“ — kryžminis perėjimas į svetainę; ikonėlė išnyra ties „patvirtinimas“ */
${fade('.scr1', 1, 0, 10.6, 11.0, D, 'k11tvs')}
${fade('.scr2', 0, 1, 10.6, 11.0, D, 'k11svetaine')}
    .ico-new { animation: fadeUpLight 0.4s ${SPRING} 12.2s both; }
    .menu-new { animation: blyksnis 0.7s ease-out 12.4s both; }
${BLYKSNIS}
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 12 — „Atidarote keturių ikonų nuorodas“ (15 s, ep_705_08_1)
 *   1.2 balsas Paieškoje pasirenkate „Navigacijos“.   1.8 rasymas „navi“ → sąrašas;  3.0 spustelejimas → grupių sąrašas
 *   4.6 balsas Prie grupės „4 ikonos“ spaudžiate „Linkai“.   5.8 spustelejimas → medis, keturios eilutės po vieną
 *   8.7 balsas Matote keturias titulinio puslapio nuorodas.  → fokusas apima visas keturias
 * ------------------------------------------------------------------------------------------- */
{
  const D = 15, m = M['08-keturios-ikonos'];
  const search = { x: m.search.x + 250, y: c(m.search).y }, dd = { x: m.ddnav.x + 60, y: c(m.ddnav).y }, l4 = c(m.links4);
  const searchHole = { x: m.search.x - 10, y: m.search.y - 12, w: 330, h: 50 };
  const ddHole = { x: m.search.x - 10, y: m.search.y - 12, w: 360, h: m.ddnav.y + m.ddnav.h + 44 - (m.search.y - 12) };
  const four = union(m.k1, m.k2, m.k3, m.k4);
  entries['08-keturios-ikonos'] = `
    .stage { animation: k12kamera ${D}s linear 0s both; }
    ${kf('k12kamera', D, [[0, SC(1)], [0.8, SC(1), SOFT], [1.4, SC(1.3)], [3.2, SC(1.3), SOFT], [4.0, SC(1)], [D, SC(1)]])}
    .spot { animation: k12spot ${D}s linear 0s both; }
    ${kf('k12spot', D, [
      [0, hole(searchHole, 0) + ' opacity: 0;'], [1.2, hole(searchHole, 0) + ' opacity: 0;'], [1.6, hole(searchHole, 0) + ' opacity: 1;'],
      [2.6, hole(searchHole, 0) + ' opacity: 1;', SPRING], [2.9, hole(ddHole, 0) + ' opacity: 1;'],
      [3.0, hole(ddHole, 0) + ' opacity: 1;'], [3.3, hole(ddHole, 0) + ' opacity: 0;'],
      [3.7, hole(m.row4, 6) + ' opacity: 0;'], [4.1, hole(m.row4, 6) + ' opacity: 1;'],
      [4.6, hole(m.row4, 6) + ' opacity: 1;', SPRING], [5.0, hole(m.links4, 8) + ' opacity: 1;'],
      [5.8, hole(m.links4, 8) + ' opacity: 1;'], [6.1, hole(m.links4, 8) + ' opacity: 0;'],
      [8.7, hole(four, 10) + ' opacity: 0;'], [9.1, hole(four, 10) + ' opacity: 1;'],
      [11.0, hole(four, 10) + ' opacity: 1;'], [11.5, hole(four, 10) + ' opacity: 0;'], [D, hole(four, 10) + ' opacity: 0;']])}
    .cursor-wrap { animation: k12kursorius ${D}s linear 0s both; }
    ${kf('k12kursorius', D, [
      [0, REST], [1.0, REST, MOVE], [1.6, cur(search.x, search.y)],
      [2.5, cur(search.x, search.y), MOVE], [2.9, cur(dd.x, dd.y)],
      [4.2, cur(dd.x, dd.y), MOVE], [4.9, cur(l4.x, l4.y)],
      [6.6, cur(l4.x, l4.y), MOVE], [7.4, cur(1250, 700)], [D, cur(1250, 700)]])}
${ripple('rp1', dd.x, dd.y, 3.0)}
${ripple('rp2', l4.x, l4.y, 5.8)}
${RATILAS}
    /* Paieška „navi“ ir išskleidžiamas sąrašas */
    .caret { animation: k12caret ${D}s linear 0s both; }
    ${kf('k12caret', D, [[0, 'opacity: 0;'], [1.3, 'opacity: 0;'], [1.35, 'opacity: 1;'], [3.0, 'opacity: 1;'], [3.05, 'opacity: 0;'], [D, 'opacity: 0;']])}
    .ph { animation: k12ph 0.05s linear 1.75s both; }
    @keyframes k12ph { from { opacity: 1; } to { opacity: 0; } }
${raides('k12raide', 'l', 4, 1.8, 0.2)}
    .dd { animation: k12dd ${D}s linear 0s both; }
    ${kf('k12dd', D, [[0, 'opacity: 0; transform: translateY(8px);'], [2.5, 'opacity: 0; transform: translateY(8px);', SPRING], [2.8, 'opacity: 1; transform: translateY(0);'],
      [3.0, 'opacity: 1; transform: translateY(0);'], [3.3, 'opacity: 0; transform: translateY(0);'], [D, 'opacity: 0; transform: translateY(0);']])}
    /* Ekranai: darbalaukis → grupių sąrašas (įslenka) → medis „4 ikonos“ */
${fade('.scr1', 1, 0, 3.1, 3.5, D, 'k12dash')}
    .scr2 { animation: k12sarasas ${D}s linear 0s both; }
    ${kf('k12sarasas', D, [[0, 'opacity: 0; transform: translateX(60px);'], [3.1, 'opacity: 0; transform: translateX(60px);', SPRING], [3.6, 'opacity: 1; transform: translateX(0);'],
      [5.9, 'opacity: 1; transform: translateX(0);'], [6.2, 'opacity: 0; transform: translateX(0);'], [D, 'opacity: 0; transform: translateX(0);']])}
${fade('.scr3', 0, 1, 5.9, 6.2, D, 'k12medis')}
${[1, 2, 3, 4].map(i => `    .scr3 .tvs-node:nth-child(${i}) { animation: fadeUpLight 0.35s ${SPRING} ${(6.0 + (i - 1) * 0.15).toFixed(2)}s both; }`).join('\n')}
  `;
}

/* ---------------------------------------------------------------------------------------------
 * KADRAS 13 — „Pakeičiate el. dienyno adresą“ (14 s, ep_705_08_2)
 *   1.2 balsas Sąraše spaudžiate „Elektroninis dienynas“.   2.4 spustelejimas → forma
 *   4.7 balsas Lauke „URL“ įrašote naują dienyno adresą.    → kamera 1,3; senas adresas pasižymi mėlynai
 *   6.1 rasymas → senas dingsta, naujas po raidę
 *   8.8 balsas Spaudžiate „Atnaujinti“ – nuoroda išsaugota.  9.8 spustelejimas;  10.2 patvirtinimas (žymos paslinktos 2026-11-02: 2 sakinys netilpo 0,27 s) → laukas žaliai sužimba
 * ------------------------------------------------------------------------------------------- */
{
  const D = 14, m = M['08-dienyno-adresas'];
  const k1 = { x: m.k1.x + 300, y: c(m.k1).y }, ur = { x: m.urlin.x + 1000, y: c(m.urlin).y + 4 }, up = c(m.update);
  const N = 'https://dienynas.demo.lt/'.length;
  const OLD = (mw, bg) => `max-width: ${mw}; background: ${bg};`;
  entries['08-dienyno-adresas'] = `
    .stage { animation: k13kamera ${D}s linear 0s both; }
    ${kf('k13kamera', D, [[0, SC(1)], [4.3, SC(1), SOFT], [4.9, SC(1.3)], [8.2, SC(1.3), SOFT], [8.8, SC(1)], [D, SC(1)]])}
    .spot { animation: k13spot ${D}s linear 0s both; }
    ${kf('k13spot', D, [
      [0, hole(m.k1, 6) + ' opacity: 0;'], [0.3, hole(m.k1, 6) + ' opacity: 0;'], [0.7, hole(m.k1, 6) + ' opacity: 1;'],
      [2.4, hole(m.k1, 6) + ' opacity: 1;'], [2.7, hole(m.k1, 6) + ' opacity: 0;'],
      [4.7, hole(m.urlin, 8) + ' opacity: 0;'], [5.1, hole(m.urlin, 8) + ' opacity: 1;'],
      [8.8, hole(m.urlin, 8) + ' opacity: 1;', SPRING], [9.3, hole(m.update, 8) + ' opacity: 1;'],
      [9.8, hole(m.update, 8) + ' opacity: 1;'], [10.1, hole(m.update, 8) + ' opacity: 0;'], [D, hole(m.update, 8) + ' opacity: 0;']])}
    .cursor-wrap { animation: k13kursorius ${D}s linear 0s both; }
    ${kf('k13kursorius', D, [
      [0, REST], [1.2, REST, MOVE], [1.8, cur(k1.x, k1.y)],
      [3.4, cur(k1.x, k1.y), MOVE], [4.0, cur(ur.x, ur.y)],
      [8.4, cur(ur.x, ur.y), MOVE], [9.0, cur(up.x, up.y)],
      [11.0, cur(up.x, up.y), MOVE], [11.8, cur(1250, 840)], [D, cur(1250, 840)]])}
${ripple('rp1', k1.x, k1.y, 2.4)}
${ripple('rp2', up.x, up.y, 9.8)}
${RATILAS}
${fade('.scr1', 1, 0, 2.5, 2.8, D, 'k13medis')}
${fade('.scr2', 0, 1, 2.5, 2.8, D, 'k13forma')}
    /* „URL“: senas adresas pasižymi, dingsta, naujas po raidę; po „Atnaujinti“ — žalias blyksnis */
    .caret { animation: k13caret ${D}s linear 0s both; }
    ${kf('k13caret', D, [[0, 'opacity: 0;'], [4.9, 'opacity: 0;'], [4.95, 'opacity: 1;'], [9.8, 'opacity: 1;'], [9.85, 'opacity: 0;'], [D, 'opacity: 0;']])}
    .old { animation: k13senas ${D}s linear 0s both; }
    ${kf('k13senas', D, [[0, OLD('30em', 'transparent')], [4.9, OLD('30em', 'transparent')], [5.2, OLD('30em', '#b4d7ff')],
      [6.1, OLD('30em', '#b4d7ff')], [6.11, OLD('0', '#b4d7ff')], [D, OLD('0', '#b4d7ff')]])}
${raides('k13raide', 'l', N, 6.1, 0.07)}
    .url-in { animation: blyksnis 0.7s ease-out 10.2s both; }
${BLYKSNIS}
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
