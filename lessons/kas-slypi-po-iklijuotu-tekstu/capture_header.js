// Tikros temos antraštės ir prieinamumo skydelio nuotraukos visoms kontrasto ir raidžių dydžio būsenoms.
// Skeletonas tik skaitomas: pakeitimai daromi šios naršyklės kopijoje (pavadinimas, herbas,
// meniu juostos spalva), svetainėje niekas nekeičiama.
//
// ⛔ Meniu juostą („⋮“) tema išdėsto užkrovimo metu. Pakeitus lango plotį ar raidžių dydį be perkrovimo,
// punktai persilaužia į antrą eilę, nors tikram lankytojui taip nebūna. Todėl po kiekvieno dydžio
// pakeitimo puslapis perkraunamas (būsena išlieka slapuke).
//
// Paleidimas: node lessons/kas-slypi-po-iklijuotu-tekstu/capture_header.js
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const URL = 'https://skeleton.svetainesmokykloms.lt/prieinamumo-paraiska';
const OUT = path.join(__dirname, '..', '..', 'assets');   // generate.js kopijuoja tik bendrus assets
const P = 'iklijuotas-';
const VW = 1280;            // ≥1280 px meniu juosta nepersilaužia ir padidinus raides (Eimantas 2026-10-11)
const PANEL_VW = 1440;      // skydelis matomas tik platesniame lange
const NAV_GREY = '#3d4148'; // žalia ne visose svetainėse — navigacijos filmuko taisyklė

// ⛔ Skydas tuščias: jokių simbolių (Eimantas 2026-10-11 — penkiakampė žvaigždė yra sovietinis simbolis).
const SHIELD = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 70"><path d="M4 4h52v30c0 18-12 28-26 33C16 62 4 52 4 34z" fill="#8a94a6"/></svg>');

const wait = ms => new Promise(r => setTimeout(r, ms));

async function prep(page) {
  await page.evaluateHandle('document.fonts.ready');
  await page.evaluate((SHIELD, NAV_GREY) => {
    document.querySelectorAll('.cookie, [class*=cookie], .warning.callout').forEach(e => e.style.display = 'none');
    const name = document.querySelector('.slogan span');
    if (name) name.textContent = 'Miesto gimnazija';
    const logo = [...document.querySelectorAll('img')].find(i => { const b = i.getBoundingClientRect(); return b.top < 120 && b.width > 30; });
    if (logo) {   // tas pats dydis — antraštė nepailgėja
      const r = logo.getBoundingClientRect();
      logo.src = SHIELD; logo.srcset = '';
      logo.style.width = r.width + 'px'; logo.style.height = r.height + 'px'; logo.style.objectFit = 'contain';
    }
    const st = document.createElement('style');
    st.textContent = `body:not([class*=acc-contrast]) .bg-green { background-color: ${NAV_GREY} !important; }
      body:not([class*=acc-contrast]) .slogan span { color: ${NAV_GREY} !important; }
      body:not([class*=acc-contrast]) .slogan span::after { background-color: ${NAV_GREY} !important; }`;
    document.head.appendChild(st);
    window.scrollTo(0, 0);
  }, SHIELD, NAV_GREY);
  await wait(400);
}

async function load(page, vw) {
  await page.setViewport({ width: vw, height: 900, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await prep(page);
}

const click = (page, sel) => page.evaluate(s => document.querySelector(s).click(), sel);
const navBottom = page => page.evaluate(() => Math.ceil(document.querySelector('.bg-green').getBoundingClientRect().bottom));

async function shootHead(page, name, h) {
  await page.screenshot({ path: path.join(OUT, `${P}antraste-${name}.png`), clip: { x: 0, y: 0, width: VW, height: h } });
}
async function shootPanel(page, name, onlyThree) {
  const b = await page.evaluate(three => {
    const h = document.querySelector('.accessibility-holder'), r = h.getBoundingClientRect();
    const lis = h.querySelectorAll(':scope > ul > li');
    const bottom = three ? lis[2].getBoundingClientRect().bottom : r.bottom;   // įprastai „×“ nėra
    return [r.left, r.top, r.width, bottom - r.top];
  }, onlyThree);
  await page.screenshot({ path: path.join(OUT, `${P}kontrastas-${name}.png`), clip: { x: b[0], y: b[1], width: b[2], height: b[3] } });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const meta = { vw: VW };

  // 1. Įprasta būsena + išdėstymas
  await load(page, VW);
  const HEAD_CSS = (await navBottom(page)) + 3;   // +3: kontrasto režimuose juosta turi 1 px liniją viršuje ir apačioje
  meta.normalus = HEAD_CSS;
  Object.assign(meta, await page.evaluate(() => {
    const r = s => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)]; };
    const h1 = [...document.querySelectorAll('h1')].find(e => /Prieinamumo/.test(e.textContent)).getBoundingClientRect();
    return { h1: [Math.round(h1.left), Math.round(h1.top)], card: r('.content-school'), side: r('.side-nav'), nav: r('.bg-green') };
  }));
  await shootHead(page, 'normalus', HEAD_CSS);

  // 2. Kontrastas: „Juodai ant balto“, „Baltai ant juodo“ (išdėstymo nekeičia)
  for (const n of ['juodai-ant-balto', 'baltai-ant-juodo']) {
    await click(page, '.acc-contrast'); await wait(600);
    await shootHead(page, n, HEAD_CSS);
  }
  await click(page, '.acc-contrast'); await wait(400);   // → „Normalus“

  // 3. Raidžių dydis: po kiekvieno paspaudimo — perkrovimas, kad tema išdėstytų meniu iš naujo
  for (const n of ['dydis-1', 'dydis-2']) {
    await click(page, '.acc-size'); await wait(400);
    await page.reload({ waitUntil: 'networkidle0' }); await prep(page);
    const h = (await navBottom(page)) + 3;
    meta[n] = h;
    await shootHead(page, n, h);
  }
  await click(page, '.acc-size'); await wait(400);       // → normalus dydis

  // 4. Skydelis (platesniame lange): visos būsenos
  await load(page, PANEL_VW);
  await shootPanel(page, 'normalus', true);
  for (const n of ['juodai-ant-balto', 'baltai-ant-juodo']) { await click(page, '.acc-contrast'); await wait(600); await shootPanel(page, n, false); }
  await click(page, '.acc-contrast'); await wait(400);
  for (const n of ['dydis-1', 'dydis-2']) { await click(page, '.acc-size'); await wait(600); await shootPanel(page, n, false); }
  await click(page, '.acc-size');

  // 5. Telefonas (390 px): viršutinė juosta — skydas, „+“, laikrodis, paieška, meniu
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(URL, { waitUntil: 'networkidle0' }); await prep(page);
  meta.mob_h = 62;   // juostos aukštis (išmatuota ekrano nuotraukoje: 124 px @2x)
  await page.screenshot({ path: path.join(OUT, `${P}mobili-antraste.png`), clip: { x: 0, y: 0, width: 390, height: meta.mob_h } });

  fs.writeFileSync(path.join(OUT, `${P}antraste.json`), JSON.stringify(meta));
  console.log('meta', JSON.stringify(meta));
  await browser.close();
})();
