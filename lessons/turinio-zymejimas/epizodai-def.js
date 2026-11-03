#!/usr/bin/env node
// „Turinio žymėjimas“ — TVS epizodas (epizodai.js). Papildinio pavadinimas kortelėje atviras (kl_1472_2) — rašoma neutraliai „Žymų juosta“.
const E = require('../../epizodai');
const S = E.SVG;
const sw = (yes, cls = '') => yes ? `<span class="tvs-switch is-yes ${cls}"><span>Yes</span><span></span></span>` : `<span class="tvs-switch is-no ${cls}"><span></span><span>No</span></span>`;
const PL = [['Pamokų laikas', true], ['Žymų juosta', false, 'rz'], ['Facebook fanbox', true]];
E.build(__dirname, {
  '06-zymu-juosta': {
    note: 'K6 — „Žymų juosta“ (ep_1472_06_1)', origin: '40% 35%',
    css: `.p-table .tvs-th, .p-table .tvs-row { grid-template-columns: 30px 1fr 200px; } .sw-slot { position: relative; height: 42px; } .sw-slot .tvs-switch { position: absolute; left: 0; top: 0; } .sb { opacity: 0; } .dd2 { position: absolute; left: 146px; top: 70px; width: 380px; z-index: 10; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Darbalaukis', sideOn: 0, sub: ['Darbalaukis', '<span data-t="subpl">Papildiniai</span>'], body: E.dash(E.DASH) }),
      E.win({ cls: 'scr2', crumb: 'Papildiniai', sideOn: 4, sub: ['Zonos', 'Papildiniai'], subOn: 1, body: `<div class="tvs-table p-table"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span>Įjungtas</span></div>${PL.map(([n, y, t]) => `<div class="tvs-row"${t ? ` data-t="${t}"` : ''}><div class="tvs-check"></div><div>${n}</div><div>${t ? `<div class="sw-slot" data-t="sw">${sw(false, 'sa')}${sw(true, 'sb')}</div>` : sw(y)}</div></div>`).join('')}</div>` }),
      E.site('scr3', `<div class="tvs-art-m">Paskelbta: 2026-05-12 · Kategorija: <b>Pranešimai</b></div><div class="tvs-art-p">Brandos egzaminų tvarkaraštis ir pasiruošimo patarimai.</div><div class="tvs-stags zt" data-t="zt"><span>#egzaminai</span><span>#abiturientai</span><span>#tvarkaraštis</span></div>`, { title: 'Brandos egzaminai', on: 3 })],
    steps: [{ t: 'b1', spot: 'subpl', pad: 10 }, { t: 'b1', cur: 'subpl' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' },
      { t: 'b2', spot: 'rz', pad: 4 }, { t: 'b2', cur: 'sw', ax: 0.75 }, { t: 'g2', click: true }, { t: 'g2+0.05', hide: '.sa', dur: 0.15 }, { t: 'g2+0.05', show: '.sb', dur: 0.15 },
      { t: 'b3-0.3', scr: 3, slide: 'up' }, { t: 'b3', show: '.zt', rise: 10 }, { t: 'b3', spot: 'zt', pad: 8 }, { t: 'b3', cur: [1400, 820], dur: 0.8 }, { t: 'g3', flash: '.zt' }],
  },
});
