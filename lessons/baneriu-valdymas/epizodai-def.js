#!/usr/bin/env node
// „Banerių valdymas“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const ZONES = ['Home', 'Sidebar', 'Footer'];
const PL = [['Banner', 'Sidebar', 'rban'], ['Pamokų laikas', 'Home'], ['Facebook fanbox', 'Sidebar'], ['Quick link', 'Sidebar']];
const zl = E.win({ cls: 'scr2', crumb: 'Papildiniai  /  Zonos', sideOn: 4, sub: ['Zonos', '<span data-t="subpl">Papildiniai</span>'], body: `<div class="tvs-table z-table"><div class="tvs-th"><div class="tvs-check"></div><span>Zona</span><span>Papildinių</span></div>${ZONES.map((z, i) => `<div class="tvs-row"><div class="tvs-check"></div><div>${z}</div><div>${[6, 5, 3][i]}</div></div>`).join('')}</div>` });
const pl = E.win({ cls: 'scr3', crumb: 'Papildiniai  /  Papildiniai', sideOn: 4, sub: ['Zonos', 'Papildiniai'], subOn: 1, body: `<div class="tvs-table p-table"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span>Zona</span><span></span></div>${PL.map(([n, z, t]) => `<div class="tvs-row"${t ? ` data-t="${t}"` : ''}><div class="tvs-check"></div><div>${n}</div><div>${z}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange"${t ? ' data-t="ebn"' : ''}>${S.edit}Redaguoti</span></div></div>`).join('')}</div>` });
const form = (cls, order) => E.win({ cls, crumb: 'Papildiniai  /  Banner  /  Redaguoti', sideOn: 4, sub: ['Zonos', 'Papildiniai'], subOn: 1, body: `<div class="tvs-alert saved">Papildinys atnaujintas.</div>
          <div class="tvs-form is-dense">
            <div class="tvs-field"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-value">Banner</div></div>
            <div class="tvs-field"><div class="tvs-label">Banerių grupė</div><div class="tvs-select is-value">Sidebar</div></div>
            <div class="tvs-field" data-t="ford"><div class="tvs-label">Order</div><div class="tvs-select" data-t="ord"><span class="o-r">Random</span><span class="o-m">Manual</span></div><div class="dd-wrap"><div class="tvs-select-list odd"><div class="tvs-select-opt">Random</div><div class="tvs-select-opt is-hl" data-t="optm">Manual</div></div></div></div>
          </div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save })}</div>` });
const CSS = `.z-table .tvs-th, .z-table .tvs-row { grid-template-columns: 30px 1fr 200px; } .p-table .tvs-th, .p-table .tvs-row { grid-template-columns: 30px 1fr 300px 200px; }
  .tvs-select { position: relative; } .o-m { position: absolute; left: 18px; opacity: 0; } .odd { opacity: 0; } .dd-wrap { position: relative; height: 0; z-index: 5; } .odd { position: absolute; left: 0; top: -2px; width: 100%; }
  .dd2 { position: absolute; left: 146px; top: 70px; width: 380px; z-index: 10; }`;
E.build(__dirname, {
  '03-baneriu-papildinys': {
    note: 'K2 — „Banerių papildinys“ (ep_707_03_1)', origin: '30% 30%', css: CSS,
    screens: [E.win({ cls: 'scr1', crumb: 'Darbalaukis', sideOn: 0, sub: ['Darbalaukis', 'Papildiniai'], search: E.typed('q', 'papi', { ph: 'Type to search...' }), body: E.dash(E.DASH),
      extra: '\n        <div class="tvs-dropdown dd2"><div class="tvs-dd-h">Moduliai</div><div class="tvs-dd-i is-active" data-t="ddpl">Papildiniai</div></div>' }), zl, pl, form('scr4', 'Random')],
    steps: [{ t: 'b1', spot: 'search', pad: 6 }, { t: 'b1', cur: 'search', ax: 0.3 }, { t: 'b1+0.2', type: 'q', dt: 0.12 }, { t: 'b1+0.8', show: '.dd2', rise: 8 }, { t: 'b1+0.9', spot: 'ddpl', pad: 6 }, { t: 'b1+0.9', cur: 'ddpl', ax: 0.3, dur: 0.4 },
      { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'b2', spot: 'subpl', pad: 10 }, { t: 'b2', cur: 'subpl' }, { t: 'g2', click: true }, { t: 'g2+0.1', scr: 3, dur: 0.2 },
      { t: 'b3', spot: 'rban', pad: 4 }, { t: 'b3', cur: 'ebn' }, { t: 'g3', click: true }, { t: 'g3+0.1', scr: 4, slide: 'right' }, { t: 'g3+0.1', spot: null }],
  },
  '03-atsitiktine-tvarka-off': {
    note: 'K3 — „Atsitiktinė tvarka — off“ (ep_707_03_2)', origin: '40% 45%', css: CSS,
    screens: [form('scr1', 'Random')],
    steps: [{ t: 'b1', spot: 'ford', pad: 6 }, { t: 'b1', zoom: 1.25 }, { t: 'b1+0.2', cur: 'ord', ax: 0.8 }, { t: 'g1', click: true }, { t: 'g1+0.05', show: '.odd', dur: 0.1 }, { t: 'g1+0.1', cur: 'optm', dur: 0.4 },
      { t: 'g2', click: true }, { t: 'g2+0.05', hide: ['.odd', '.o-r'], dur: 0.1 }, { t: 'g2+0.05', show: '.o-m', dur: 0.05 },
      { t: 'b2', zoom: 1 }, { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd', dur: 0.5 }, { t: 'g3', click: true }, { t: 'g3+0.2', show: '.saved', dur: 0.2 }, { t: 'g3+0.2', spot: 'ford', pad: 6 }, { t: 'g4', flash: '.saved' }],
  },
});
