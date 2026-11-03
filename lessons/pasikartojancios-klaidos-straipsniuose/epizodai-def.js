#!/usr/bin/env node
// „Pasikartojančios klaidos straipsniuose“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const page = (cls, body, marks) => E.win({ cls, crumb: 'Naujienų modulis  /  Naujienos  /  Redaguoti', sideOn: 4, sub: ['Naujienos'], body: `<div class="tvs-form" style="padding:10px 0">${E.cke(body, { marks })}</div>` });
E.build(__dirname, {
  '03-sarasas-redaktoriaus-funkcija': {
    note: 'K4 — „Sąrašas redaktoriaus funkcija“ (ep_694_03_1)', origin: '30% 35%',
    css: `.tvs-cke-body { min-height: 300px; font-size: 20px; } .lst { position: relative; } .star, .ul { line-height: 1.7; } .ul { position: absolute; left: 0; top: 0; margin: 0; padding-left: 26px; } .sel { padding: 0 2px; }`,
    screens: [page('scr1', `<p>Rugsėjo renginiai:</p><div class="lst" data-t="lst"><div class="star sel"><div>* Šventė</div><div>* Tėvų susirinkimas</div><div>* Ekskursija</div></div><ul class="ul"><li>Šventė</li><li>Tėvų susirinkimas</li><li>Ekskursija</li></ul></div>`, { bulletedlist: 'bul' })],
    steps: [{ t: 'b1', spot: 'lst', pad: 8 }, { t: 'b1+0.2', cur: 'lst', ax: 0, ay: 0.05 }, { t: 'g1', cur: 'lst', ax: 0.4, ay: 0.95, dur: 0.7 },
      { t: 'b2-0.3', zoom: 1.4 }, { t: 'b2', spot: 'bul', pad: 6 }, { t: 'b2', cur: 'bul' }, { t: 'g2', click: true }, { t: 'g2+0.1', hide: '.star', dur: 0.15 }, { t: 'g2+0.1', show: '.ul', dur: 0.15 },
      { t: 'g2+0.4', zoom: 1 }, { t: 'g3', spot: 'lst', pad: 8 }, { t: 'g3', flash: '.lst' }],
    anim: (T) => [['.star', `pazymeti 0.7s linear ${T('g1')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { background: linear-gradient(180deg, #b3d4fc 0 0%, transparent 0); } to { background: linear-gradient(180deg, #b3d4fc 0 100%, transparent 0); } }',
  },
  '04-pastraipos-su-enter': {
    note: 'K6 — „Pastraipos su Enter“ (ep_694_04_1)', origin: '30% 35%',
    css: `.tvs-cke-body { min-height: 300px; font-size: 20px; } .p2 { margin-top: 14px; } .key { position: absolute; left: 900px; top: 520px; z-index: 6; padding: 14px 26px; border: 2px solid #333; border-radius: 8px; background: #fff; font: 700 24px var(--tvs-font); box-shadow: 0 4px 0 #333; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Naujienų modulis  /  Naujienos  /  Redaguoti', sideOn: 4, sub: ['Naujienos'], body: `<div class="tvs-form" style="padding:10px 0">${E.cke(`<p data-t="p1">Pirmokai šventę pradėjo dainomis.<span class="ck-end" data-t="end"></span></p><p class="p2" data-t="p2">${E.typed('p', 'Vėliau visi kartu apžiūrėjo naujas klases.')}</p>`)}</div>`, extra: '\n        <div class="key">Enter ↵</div>' })],
    steps: [{ t: 'b1', spot: 'p1', pad: 8 }, { t: 'b1+0.2', cur: 'end', ay: 0.8 }, { t: 'g1', click: true }, { t: 'g1+0.2', show: '.key', rise: 6 }, { t: 'g1+1.2', hide: '.key', dur: 0.3 },
      { t: 'b2', spot: ['p1', 'p2'], pad: 8 }, { t: 'b2+0.5', show: '.p2', dur: 0.05 }, { t: 'g2-1.6', type: 'p', dt: 0.04 }],
  },
});
