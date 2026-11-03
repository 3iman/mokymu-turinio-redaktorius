#!/usr/bin/env node
// „Laikmatis“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const count = (cls = '', t = 'cnt') => `<div class="tvs-count ${cls}" data-t="${t}"><div class="tvs-count-h">Iki naujų mokslo metų liko:</div><div class="tvs-count-g"><div>34<small>d.</small></div><div>11<small>val.</small></div><div>27<small>min.</small></div><div>05<small>sek.</small></div></div></div>`;
const menu = '<div class="tvs-site-menu" data-t="bm"><div class="is-head">PAMOKŲ LAIKAS</div><div><i></i>PROJEKTINĖ VEIKLA</div><div><i></i>BIBLIOTEKA</div><div><i></i>DOKUMENTAI</div></div>';
const fld = (l, v, t) => `<div class="tvs-field"${t ? ` data-t="${t}"` : ''}><div class="tvs-label">${l}</div><div class="tvs-input is-value">${v}</div></div>`;
E.build(__dirname, {
  '01-kur-laikmatis': {
    note: 'K1 — „Kur laikmatis“ (ep_703_01_1)', origin: '78% 55%',
    css: `.pg { display: grid; grid-template-columns: 1fr 420px; gap: 34px; } .pg .tvs-spage-cards { grid-template-columns: 1fr 1fr; } .side { display: flex; flex-direction: column; gap: 18px; } .tvs-site-menu { width: 100%; }`,
    screens: [E.site('scr1', `<div class="pg"><div><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div></div><div class="side" data-t="side">${menu}${count()}</div></div>`, { title: 'Naujienos' })],
    steps: [{ t: 'b1', spot: 'side', pad: 10 }, { t: 'b1+0.5', zoom: 1.35 }, { t: 'b2', spot: 'bm', pad: 6 }, { t: 'b2+1.2', spot: 'cnt', pad: 8 }, { t: 'b3', spot: { ref: 'cnt', dh: (R) => -(R.cnt.h - 40) }, pad: 6 }, { t: 'b3+0.4', flash: '.tvs-count-h' }],
  },
  '03-laikmacio-laukai': {
    note: 'K3 — „Laikmačio laukai“ (ep_703_03_1)', origin: '40% 45%',
    css: `.two { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; } .two .tvs-field + .tvs-field { border-top: 0; } .mini { position: absolute; right: 50px; top: 200px; width: 380px; z-index: 6; } .mini .tvs-count-g div { width: 56px; font-size: 20px; } .clock { position: absolute; right: 120px; top: 260px; z-index: 6; font-size: 80px; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Laikmatis  /  Redaguoti', sideOn: 1, sub: ['Laikmačiai'], body: `<div class="tvs-form is-dense">
            ${fld('Antraštė', 'Iki naujų mokslo metų liko:', 'f1')}${fld('Pabaigos data', '2027-09-01 08:00', 'f2')}
            <div class="two">${fld('Rodyti nuo', '2027-07-01 00:00', 'f3')}${fld('Rodyti iki', '2027-09-01 10:00', 'f4')}</div>${fld('Tekstas pasibaigus', 'Sveiki sugrįžę į mokyklą!', 'f5')}</div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save })}</div>`, extra: `\n        <div class="clock">⏰</div><div class="mini">${count('', 'mcnt')}</div>` })],
    steps: [{ t: 'b1', spot: 'f1', pad: 6 }, { t: 'b2', spot: 'f2', pad: 6 }, { t: 'b2+0.5', show: '.clock', rise: 10 }, { t: 'b3-0.3', hide: '.clock', dur: 0.2 },
      { t: 'b3', spot: ['f3', 'f4'], pad: 6 }, { t: 'b3+0.4', show: '.mini', rise: 10 }, { t: 'b4-0.3', hide: '.mini', dur: 0.3 }, { t: 'b4', spot: 'f5', pad: 6 }],
    css2: '',
  },
});
