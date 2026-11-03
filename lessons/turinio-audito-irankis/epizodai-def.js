#!/usr/bin/env node
// „Turinio audito įrankis“ — TVS epizodas (epizodai.js).
const E = require('../../epizodai');
const ST = ['Visi', 'Administracijai', 'Komunikacija', 'Dokumentai', 'Darbuotojai', 'Komisijos ir tarybos', 'Kitos paslaugos', 'Ugdymas', 'Specialistai', 'Prieš paleidimą', 'Atidėtas', 'Atmesta', 'Įvykdyta'];
const ROWS = [[51, 'Struktūros schema', 'Atnaujinti iki rugsėjo'], [52, 'Laisvos darbo vietos', '—'], [53, 'Darbo užmokestis', 'Trūksta ketvirčio duomenų', 'r53'], [54, 'Viešieji pirkimai', 'Nuoroda į CVPP']];
E.build(__dirname, {
  '11-audito-numeris': {
    note: 'K11 — „Audito numeris“ (ep_688_11_1)', origin: '25% 45%',
    css: `.a-table .tvs-th, .a-table .tvs-row { grid-template-columns: 140px 1fr 1fr; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Turinio auditas', sideOn: 1, sub: ['Turinio auditas'], body: `<div class="tvs-audbar" data-t="ab">${ST.map((s, i) => `<span${i === 0 ? ' data-t="visi"' : ''}>${s}</span>`).join('')}</div>
          <div class="tvs-table a-table tab" data-t="tab"><div class="tvs-th"><span data-t="hnr">Audito nr.</span><span>Svetainės dalis</span><span>Komentarai</span></div>${ROWS.map(([n, p, c, t]) => `<div class="tvs-row"${t ? ` data-t="${t}"` : ''}><div><b>${n}</b></div><div>${p}</div><div>${c}</div></div>`).join('')}</div>` })],
    steps: [{ t: 'b1', spot: 'ab', pad: 6 }, { t: 'b1+0.3', spot: 'visi', pad: 6 }, { t: 'b1+0.3', cur: 'visi' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.tab', rise: 14 },
      { t: 'b2', spot: 'tab', pad: 6 }, { t: 'b3', zoom: 1.35 }, { t: 'b3', spot: 'hnr', pad: 6 }, { t: 'b3+1.2', spot: 'r53', pad: 4 }, { t: 'b3+1.4', flash: '[data-t="r53"]' }],
    anim: (T) => [['[data-t="visi"]', `ijungti 0.01s step-end ${T('g1')}s both`]],
    keyframes: () => '  @keyframes ijungti { from { } to { background: var(--tvs-info); color: #fff; } }',
  },
});
