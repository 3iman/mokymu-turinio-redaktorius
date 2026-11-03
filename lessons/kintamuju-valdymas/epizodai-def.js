#!/usr/bin/env node
// „Kintamųjų valdymas“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const ROWS = [['bendra::el_pastas', 'info@demomokykla.lt', 'bendra'], ['bendra::telefonas', '8 600 00000', 'bendra']];
const table = (extra = '') => `<div class="tvs-table v-table" data-t="vt"><div class="tvs-th"><div class="tvs-check"></div><span>Key</span><span>Value</span><span>Category</span></div>${extra}${ROWS.map(([k, v, c]) => `<div class="tvs-row"><div class="tvs-check"></div><div><code>${k}</code></div><div>${v}</div><div>${c}</div></div>`).join('')}</div>`;
const filt = (v) => `<div class="tvs-filter"><div class="tvs-input f-s">Paieška</div><div class="tvs-select f-c" data-t="cf">${v}</div>${E.btn('Filtruoti')}</div>`;
E.build(__dirname, {
  '01-kintamojo-kurimas': {
    note: 'K1 — „Kintamojo kūrimas“ (ep_1473_01_1)', origin: '40% 35%',
    css: `.v-table .tvs-th, .v-table .tvs-row { grid-template-columns: 30px 1fr 1fr 220px; } .v-table code { font-family: 'SF Mono', Menlo, monospace; font-size: 18px; } .f-s { width: 300px; } .f-c { width: 260px; } .cat { border-radius: 3px; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Vertimai', sideOn: 1, sub: ['Vertimai'], body: `<div>${E.btn('Sukurti', { icon: S.plus, t: 'add' })}</div>${filt('Category')}${table()}` }),
      E.win({ cls: 'scr2', crumb: 'Vertimai  /  Sukurti', sideOn: 1, sub: ['Vertimai'], body: `<div class="tvs-form">
            <div class="tvs-field" data-t="fk"><div class="tvs-label">Key<span class="tvs-req">*</span></div><div class="tvs-input is-focus"><span class="cat" data-t="cat">${E.typed('k1', 'mokykla', { caret: false })}</span>${E.typed('k2', '::pavadinimas')}</div></div>
            <div class="tvs-field" data-t="fv"><div class="tvs-label">Value (LT)</div><div class="tvs-input">${E.typed('v', 'Demo progimnazija')}</div></div></div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` }),
      E.win({ cls: 'scr3', crumb: 'Vertimai', sideOn: 1, sub: ['Vertimai'], body: `<div>${E.btn('Sukurti', { icon: S.plus })}</div>${filt('mokykla')}${table('<div class="tvs-row is-new nr" data-t="nr"><div class="tvs-check"></div><div><code>mokykla::pavadinimas</code></div><div>Demo progimnazija</div><div>mokykla</div></div>')}` })],
    steps: [{ t: 'b1', spot: 'add', pad: 10 }, { t: 'b1', cur: 'add' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'fk', pad: 6 }, { t: 'b2', cur: 'fk', ax: 0.3, ay: 0.8 }, { t: 'g2', type: 'k1', dt: 0.08 }, { t: 'g2+0.6', type: 'k2', dt: 0.06 }, { t: 'g2+0.7', flash: '[data-t="cat"]' },
      { t: 'b3', spot: 'fv', pad: 6 }, { t: 'b3', cur: 'fv', ax: 0.3, ay: 0.8 }, { t: 'b3+0.2', type: 'v', dt: 0.04 }, { t: 'g3-0.6', cur: 'save', dur: 0.4 }, { t: 'g3-0.15', click: true },
      { t: 'g3', scr: 3 }, { t: 'g3+0.1', spot: ['nr', 'cf'], pad: 6 }, { t: 'g3+0.3', flash: '.nr' }, { t: 'g3+0.2', cur: [1400, 820], dur: 0.8 }],
  },
});
