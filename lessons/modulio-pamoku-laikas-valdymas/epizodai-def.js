#!/usr/bin/env node
// „Pamokų laiko modulio valdymas“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const clock = (t, rows, cls = '', open = false, dt = '') => `<div class="tvs-sside-b clk ${cls}"${dt ? ` data-t="${dt}"` : ''}><div class="tvs-sside-h">${t}</div>${open ? rows.map(([n, v, c]) => `<div class="tvs-sside-row ${c || ''}"><span>${n}</span><span>${v}</span></div>`).join('') : ''}</div>`;
const R1 = [['1.', '08.10 – 08.45', 'nr'], ['2.', '08.55 – 09.40'], ['3.', '09.50 – 10.35']];
const side = (o = {}) => `<div class="pz-site"><div><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div></div>
          <div class="tvs-sside" data-t="side"><span class="lbl" data-t="lbl1">${clock('1 klasių pamokų laikas', R1, 'c1', o.open, 'clk1')}</span>${clock('2–4 klasių pamokų laikas', [])}${clock('5–12 klasių pamokų laikas', [])}</div></div>`;
const PL = [['1 klasių pamokų laikas', 'Pamokų laikas', 'pl1'], ['2–4 klasių pamokų laikas', 'Pamokų laikas'], ['5–12 klasių pamokų laikas', 'Pamokų laikas']];
const zonesWin = E.win({ cls: 'scr2', crumb: 'Papildiniai  /  Zonos', sideOn: 4, sub: ['Zonos', 'Papildiniai'], body: `<div class="tvs-table z-table"><div class="tvs-th"><div class="tvs-check"></div><span>Zona</span><span></span></div>${['Home', 'Sidebar', 'Footer'].map((z, i) => `<div class="tvs-row"${i === 0 ? ' data-t="zh"' : ''}><div class="tvs-check"></div><div>${z}</div><div class="tvs-actions"><span class="tvs-btn is-small is-violet"${i === 0 ? ' data-t="zp"' : ''}>Papildiniai</span></div></div>`).join('')}</div>` });
const plWin = (cls, extra = '') => E.win({ cls, crumb: 'Papildiniai  /  Home', sideOn: 4, sub: ['Zonos', 'Papildiniai'], subOn: 1, body: `<div>${E.btn('Pridėti papildinį', { icon: S.plus, t: 'addpl' })}</div><div class="tvs-table p-table" data-t="pt"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span>Tipas</span></div>${PL.map(([n, t, d]) => `<div class="tvs-row"${d ? ` data-t="${d}"` : ''}><div class="tvs-check"></div><div>${n}</div><div>${t}</div></div>`).join('')}${extra}</div>` });
const CSS = `.pz-site { display: grid; grid-template-columns: 1fr 420px; gap: 34px; } .pz-site .tvs-spage-cards { grid-template-columns: 1fr 1fr; } .lbl { display: block; }
  .z-table .tvs-th, .z-table .tvs-row { grid-template-columns: 30px 1fr 220px; } .p-table .tvs-th, .p-table .tvs-row { grid-template-columns: 30px 1fr 300px; } .dd2 { position: absolute; left: 146px; top: 70px; width: 380px; z-index: 10; }
  .tm { position: absolute; left: 560px; top: 220px; width: 560px; z-index: 10; } .tvs-select { position: relative; } .c-v { position: absolute; left: 18px; color: var(--tvs-text); } .dd-wrap { position: relative; height: 0; z-index: 5; } .cat-dd { position: absolute; left: 0; top: -2px; width: 100%; } .two { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; } .two .tvs-field + .tvs-field { border-top: 0; }`;
const fld = (l, inner, t) => `<div class="tvs-field"${t ? ` data-t="${t}"` : ''}><div class="tvs-label">${l}</div>${inner}</div>`;
const catSel = (opt) => `<div class="tvs-select" data-t="cat"><span class="c-ph">Choose an entry...</span><span class="c-v">1 klasė</span></div><div class="dd-wrap"><div class="tvs-select-list cat-dd"><div class="tvs-select-opt is-hl" data-t="opt">1 klasė</div><div class="tvs-select-opt">2–4 klasės</div><div class="tvs-select-opt">5–12 klasės</div></div></div>`;
E.build(__dirname, {
  '01-pamoku-laikas-svetaineje': {
    note: 'K1 — „Pamokų laikas svetainėje“ (ep_710_01_1)', origin: '80% 40%', css: CSS + ` .lnk { position: absolute; z-index: 30; border-top: 3px dashed #e5322d; }`,
    screens: [E.site('scr1', side(), { title: 'Naujienos' })],
    steps: [{ t: 'b1', spot: 'side', pad: 10 }, { t: 'b1+0.6', zoom: 1.3 }, { t: 'b2', spot: 'clk1', pad: 8 }, { t: 'b2+0.4', flash: '.c1 .tvs-sside-h' }, { t: 'b3', spot: 'clk1', pad: 8 }],
  },
  '03-laiko-irasas': {
    note: 'K2 — „Laiko įrašas“ (ep_710_03_1)', origin: '40% 40%', css: CSS + ` .nr { background: #fff6dd; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Pamokų laikas  /  Pridėti', sideOn: 1, sub: ['Pamokų laikas'], body: `<div class="tvs-form is-dense"><div class="two">${fld('Nuo', `<div class="tvs-input is-focus">${E.typed('a', '08.10')}</div>`, 'fa')}${fld('Iki', `<div class="tvs-input">${E.typed('b', '08.45')}</div>`, 'fb')}</div>${fld('Kategorija', catSel(), 'fcat')}</div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` }),
      E.site('scr2', side({ open: true }), { title: 'Naujienos' })],
    steps: [{ t: 'b1', spot: 'fa', pad: 6 }, { t: 'b1', zoom: 1.2 }, { t: 'b1+0.2', cur: 'fa', ax: 0.3, ay: 0.8 }, { t: 'g1', type: 'a', dt: 0.12 }, { t: 'b2', spot: 'fb', pad: 6 }, { t: 'b2', cur: 'fb', ax: 0.3, ay: 0.8 }, { t: 'g2', type: 'b', dt: 0.12 },
      { t: 'b3', zoom: 1 }, { t: 'b3', spot: 'fcat', pad: 6 }, { t: 'b3', cur: 'cat', ax: 0.8 }, { t: 'g3', click: true }, { t: 'g3+0.05', show: '.cat-dd', dur: 0.1 }, { t: 'g3+0.1', cur: 'opt', dur: 0.4 }, { t: 'g4', click: true },
      { t: 'g4+0.05', hide: ['.cat-dd', '.c-ph'], dur: 0.1 }, { t: 'g4+0.05', show: '.c-v', dur: 0.05 }, { t: 'g4+0.2', cur: 'save', dur: 0.5 }, { t: 'b4-0.3', click: true },
      { t: 'b4', scr: 2, slide: 'up' }, { t: 'b4', spot: 'clk1', pad: 8 }, { t: 'g6', flash: '.nr' }, { t: 'b4+0.2', cur: [1400, 820], dur: 0.8 }],
  },
  '05-nauja-papildinio-zona': {
    note: 'K4 — „Nauja papildinio zona“ (ep_710_05_1)', origin: '35% 35%', css: CSS,
    screens: [E.win({ cls: 'scr1', crumb: 'Darbalaukis', sideOn: 0, sub: ['Darbalaukis', 'Papildiniai'], search: E.typed('q', 'papil', { ph: 'Type to search...' }), body: E.dash(E.DASH), extra: '\n        <div class="tvs-dropdown dd2"><div class="tvs-dd-h">Moduliai</div><div class="tvs-dd-i is-active" data-t="ddpl">Papildiniai</div></div>' }), zonesWin, plWin('scr3')],
    steps: [{ t: 'b1', spot: 'search', pad: 6 }, { t: 'b1', cur: 'search', ax: 0.3 }, { t: 'g1', type: 'q', dt: 0.08 }, { t: 'g1+0.3', show: '.dd2', rise: 8 }, { t: 'g1+0.4', cur: 'ddpl', ax: 0.3, dur: 0.3 }, { t: 'g2', click: true }, { t: 'g2+0.1', scr: 2, slide: 'right' },
      { t: 'b2', spot: 'zh', pad: 4 }, { t: 'b2', cur: 'zp' }, { t: 'g3', click: true }, { t: 'g3+0.1', scr: 3, slide: 'right' }, { t: 'b3', spot: 'addpl', pad: 10 }, { t: 'b3', cur: 'addpl' }, { t: 'g4', click: true }],
  },
  '05-papildinio-tipas': {
    note: 'K5 — „Papildinio tipas“ (ep_710_05_2)', origin: '40% 40%', css: CSS,
    screens: [E.win({ cls: 'scr1', crumb: 'Papildiniai  /  Home', sideOn: 4, sub: ['Zonos', 'Papildiniai'], subOn: 1, body: '<div class="tvs-table"><div class="tvs-th"><span>Pavadinimas</span></div></div>', extra: `\n        <div class="tvs-modal tm" data-t="ttm"><div class="tvs-modal-h"><span>Kokio tipo plėtinys?</span><span class="tvs-x">×</span></div><div class="tvs-modal-b"><div class="tvs-opt">Banner</div><div class="tvs-opt">Facebook fanbox</div><div class="tvs-opt">Quick link</div><div class="tvs-opt is-hover" data-t="optpl">Pamokų laikas</div></div></div>` }), E.win({ cls: 'scr2', crumb: 'Papildiniai  /  Home  /  Pamokų laikas', sideOn: 4, sub: ['Zonos', 'Papildiniai'], subOn: 1, body: `<div class="tvs-form is-dense">${fld('Pavadinimas<span class="tvs-req">*</span>', `<div class="tvs-input is-focus">${E.typed('n', '1 klasių pamokų laikas')}</div>`, 'fn')}${fld('Kategorija', catSel(), 'fcat')}</div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` }),
      plWin('scr3', '<div class="tvs-row is-new nw" data-t="nw"><div class="tvs-check"></div><div>1 klasių pamokų laikas</div><div>Pamokų laikas</div></div>')],
    steps: [{ t: 0.3, show: '.tm', dur: 0.2 }, { t: 'b1', spot: 'ttm', pad: 6 }, { t: 'b1', cur: 'optpl' }, { t: 'g1', click: true }, { t: 'g1+0.1', hide: '.tm', dur: 0.15 }, { t: 'g1+0.2', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'fn', pad: 6 }, { t: 'b2', cur: 'fn', ax: 0.3, ay: 0.8 }, { t: 'g2', type: 'n', dt: 0.04 }, { t: 'g3-0.3', cur: 'cat', ax: 0.8, dur: 0.3 }, { t: 'g3', click: true }, { t: 'g3+0.05', show: '.cat-dd', dur: 0.1 }, { t: 'g3+0.1', cur: 'opt', dur: 0.3 }, { t: 'g4', click: true },
      { t: 'g4+0.05', hide: ['.cat-dd', '.c-ph'], dur: 0.1 }, { t: 'g4+0.05', show: '.c-v', dur: 0.05 }, { t: 'g4+0.1', cur: 'save', dur: 0.4 }, { t: 'g5', click: true }, { t: 'g5+0.1', scr: 3 }, { t: 'g6', spot: 'nw', pad: 4 }, { t: 'g6', flash: '.nw' }],
  },
});
