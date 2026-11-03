#!/usr/bin/env node
// „Naujienų tipo sintaksės“ — TVS epizodai (epizodai.js): padalytas kadras.
const E = require('../../epizodai');
const S = E.SVG;
const upd = E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' });
const CSS = `
  .tvs-split-bot .tvs-cke-body { min-height: 100px; }
  .tvs-split-top .tvs-sweb-b { padding: 14px 40px; }
  .news { margin-top: 8px; } .news .tvs-snews-i { padding: 6px; } .news .tvs-snews-i i { height: 52px; }
  .hl { border-radius: 3px; }`;
const item = (t, d, k, cls = '') => `<div class="tvs-snews-i ${cls}"><i></i><div><div class="tvs-snews-t">${t}</div><div class="tvs-snews-m">${d} · <b>${k}</b></div></div></div>`;
const ed = (code) => E.cke(`<p>Projektų naujienos.</p><p data-t="code">${code}</p>`);

E.build(__dirname, {
  '01-straipsniai-pagal-zymas': {
    note: 'Kadras 1 — „Straipsniai pagal žymas“ (ep_663_01_1): dvi žymos laužtiniuose skliaustuose → tik pažymėti straipsniai',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Pranešimai ir straipsniai', siteBody: `<div class="news" data-t="news">${item('Erasmus+ mainai Ispanijoje', '2026-10-21', 'Projektai')}${item('Projekto „Kartu“ baigiamasis renginys', '2026-10-08', 'Projektai')}${item('Erasmus+ partnerių vizitas', '2026-09-29', 'Pranešimai')}</div>`,
      editor: ed(`{{naujienos({'view':'flow', 'hashtags': [${E.typed('t1', "'erasmus'", { caret: false })}${E.typed('t2', ", 'projektai'")}]})}}`), foot: upd })],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 't1', dt: 0.09 }, { t: 'g1+1.0', type: 't2', dt: 0.08 },
      { t: 'b2', spot: 'code', pad: 8 },
      { t: 'b3', show: '.news', rise: 14 }, { t: 'b3', spot: 'news', pad: 8 }, { t: 'b3+0.3', cur: [1500, 400], dur: 0.8 },
      { t: 'b4', spot: 'stop', pad: 4 }, { t: 'g2', flash: '.news' },
    ],
  },
  '02-straipsnis-pagal-id': {
    note: 'Kadras 2 — „Straipsnis pagal ID“ (ep_663_02_1): dvi {{news_item(ID)}} eilutės → tie patys du straipsniai ta tvarka',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Egzaminai', siteBody: `<div class="news"><div class="n1" data-t="n1">${item('Prieš egzaminus', '2025-05-12', 'Pranešimai')}</div><div class="n2" data-t="n2">${item('Brandos egzaminų tvarkaraštis', '2025-04-30', 'Pranešimai')}</div></div>`,
      editor: E.cke(`<p>Informacija apie egzaminus.</p><p data-t="code">${E.typed('l1', '{{news_item(36)}}')}</p><p data-t="code2">${E.typed('l2', '{{news_item(31)}}')}</p>`), foot: upd })],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'l1', dt: 0.07 },
      { t: 'b2', spot: 'code2', pad: 6 }, { t: 'b2+0.3', type: 'l2', dt: 0.07 },
      { t: 'b3', show: '.n1', rise: 12 }, { t: 'b3+0.5', show: '.n2', rise: 12 }, { t: 'b3', spot: 'stop', pad: 4 }, { t: 'b3+0.3', cur: [1500, 400], dur: 0.8 },
      { t: 'b4', spot: ['n1', 'n2'], pad: 6 }, { t: 'g2', flash: '.news' },
    ],
  },
  '03-straipsniai-pagal-kategorija': {
    note: 'Kadras 3 — „Straipsniai pagal kategoriją“ (ep_663_03_1): category_id → visi kategorijos straipsniai, naujausi viršuje',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Projektų straipsniai', siteBody: `<div class="news" data-t="news"><div class="nn" data-t="nn">${item('Naujas projektas „Žalioji mokykla“', '2026-11-02', 'Projektai', '')}</div>${item('Erasmus+ mainai Ispanijoje', '2026-10-21', 'Projektai')}${item('Projekto „Kartu“ baigiamasis renginys', '2026-10-08', 'Projektai')}</div>`,
      editor: ed(`{{naujienos({'view':'flow', ${E.typed('c', "'category_id': 7")}})}}`), foot: upd })],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'c', dt: 0.08 },
      { t: 'b2', show: '.news', rise: 14 }, { t: 'b2', spot: 'news', pad: 8 }, { t: 'b2+0.3', cur: [1500, 400], dur: 0.8 },
      { t: 'b3', spot: 'nn', pad: 6 },
      { t: 'b4', spot: 'stop', pad: 4 }, { t: 'g2', flash: '.news' },
    ],
  },
});
