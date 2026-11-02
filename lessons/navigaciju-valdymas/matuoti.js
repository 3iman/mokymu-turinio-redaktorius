#!/usr/bin/env node
/**
 * Išmatuoja, kur kadre stovi veikiami elementai (atributas data-t), kad animacijos (prožektorius,
 * kursorius, ratilai) gautų tikslias koordinates, o ne spėtas. Koordinatės — .stage erdvėje (px),
 * kai .stage dar netransformuotas (kamera scale 1).
 *
 * Paleidimas (po `node generate.js --png --lang lt --lesson navigaciju-valdymas`):
 *   node lessons/navigaciju-valdymas/matuoti.js   → lessons/navigaciju-valdymas/matavimai.json
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(__dirname, 'output', 'lt');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  const result = {};
  for (const f of fs.readdirSync(OUT).filter(f => f.endsWith('.html')).sort()) {
    await page.goto('file://' + path.join(OUT, f), { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    result[path.basename(f, '.html')] = await page.evaluate(() => {
      // matuojama be opacity/clip-path kliūčių: visi sluoksniai lieka savo vietoje, tik nematomi
      const st = document.querySelector('.stage').getBoundingClientRect();
      const out = {};
      for (const el of document.querySelectorAll('[data-t]')) {
        const r = el.getBoundingClientRect();
        out[el.dataset.t] = { x: +(r.left - st.left).toFixed(1), y: +(r.top - st.top).toFixed(1),
                              w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
      }
      return out;
    });
  }
  await browser.close();
  fs.writeFileSync(path.join(__dirname, 'matavimai.json'), JSON.stringify(result, null, 1) + '\n');
  console.log(JSON.stringify(result, null, 1));
})();
