#!/usr/bin/env node
// „Puslapių rinkinys: komunikacija“ — TVS epizodai (epizodai.js): 1,2 % GPM skaičiai ir ataskaita.
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const ROWS = [['2proc::metai', '2024', 'r1'], ['2proc::terminas', '2026-05-02'], ['2proc::5', '1,2 %']];
const vt = E.win({ cls: 'scr1', crumb: 'Vertimai', sideOn: 1, sub: ['Vertimai'], body: `<div class="tvs-filter"><div class="tvs-input f-s">Paieška</div><div class="tvs-select f-c">2proc</div>${E.btn('Filtruoti', { icon: I.filter })}</div>
          <div class="tvs-table v-table"><div class="tvs-th"><div class="tvs-check"></div><span>Key</span><span>Value</span><span></span></div>${ROWS.map(([k, v, t]) => `<div class="tvs-row"${t ? ` data-t="${t}"` : ''}><div class="tvs-check"></div><div><code>${k}</code></div><div>${v}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange"${t ? ' data-t="ed"' : ''}>${S.edit}Redaguoti</span></div></div>`).join('')}</div>` });
const vf = E.win({ cls: 'scr2', crumb: 'Vertimai  /  2proc::metai', sideOn: 1, sub: ['Vertimai'], body: `<div class="tvs-form"><div class="tvs-field"><div class="tvs-label">Key</div><div class="tvs-input is-value"><code>2proc::metai</code></div></div>
            <div class="tvs-field" data-t="fv"><div class="tvs-label">Value (LT)</div><div class="tvs-input is-focus"><span class="old">2024</span>${E.typed('v', '2025')}</div></div></div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` });
const site = E.site('scr3', `<div class="tvs-sweb-p" data-t="gp">Skirkite <b>1,2 %</b> gyventojų pajamų mokesčio mūsų mokyklai. Prašymą už <b class="yr">2025</b> m. pateikite iki <b>2026-05-02</b>.</div>`, { title: 'Parama', on: 1, nav: ['Apie mokyklą', 'Parama', 'Mokiniams', 'Tėvams', 'Kontaktai'] });
const r = (n, d, z, c, t) => [n, d, z, c, t];
E.build(__dirname, {
  '02-gpm-skaiciai': {
    note: 'K2 — „GPM skaičiai“ (ep_686_02_1)', origin: '40% 35%',
    css: `.v-table .tvs-th, .v-table .tvs-row { grid-template-columns: 30px 1fr 1fr 200px; } .v-table code { font-family: 'SF Mono', Menlo, monospace; font-size: 18px; } .f-s { width: 300px; } .f-c { width: 260px; }
  .old { display: inline-block; max-width: 0; overflow: hidden; vertical-align: top; } .yr { background: #fff3b0; padding: 0 3px; }`,
    screens: [vt, vf, site],
    steps: [{ t: 'b1', spot: 'r1', pad: 4 }, { t: 'b1+0.2', cur: 'ed' }, { t: 'b1+0.9', click: true }, { t: 'b1+1.0', scr: 2, slide: 'right' }, { t: 'b1+1.1', spot: 'fv', pad: 6 }, { t: 'b1+1.1', cur: 'fv', ax: 0.3, ay: 0.8 }, { t: 'g1', type: 'v', dt: 0.12 },
      { t: 'b2', spot: 'fv', pad: 8 }, { t: 'b2+0.8', cur: 'save', dur: 0.4 }, { t: 'b2+1.3', click: true }, { t: 'b3-0.3', scr: 3, slide: 'up' }, { t: 'b3', spot: 'gp', pad: 10 }, { t: 'b3', cur: [1400, 820], dur: 0.8 }, { t: 'g2', flash: '.yr' }],
    anim: (T) => [['.old', `istrinti 0.3s steps(4, end) ${T('g1-0.4')}s both`]],
    keyframes: () => '  @keyframes istrinti { from { max-width: 3em; } to { max-width: 0; } }',
  },
  '02-gpm-ataskaita': {
    note: 'K3 — „GPM ataskaita“ (ep_686_02_2). Ataskaitos vieta — prielaida (dokumentų banko sintaksė puslapio turinyje)', origin: '50% 50%',
    css: `.tvs-split-bot .tvs-cke-body { min-height: 110px; } .tvs-split-top .tvs-sweb-b { padding: 12px 40px; } .tvs-split-top .tvs-sdocs { font-size: 15px; }`,
    screens: [E.split('scr1', { siteTitle: 'Parama', siteBody: E.sdocs('Paramos panaudojimo ataskaitos', [r('2025 m. paramos panaudojimo ataskaita', '2026-03-02 10:00:00', '210.40 KB', 'nw', 'nw'), r('2024 m. paramos panaudojimo ataskaita', '2025-03-03 09:12:00', '198.20 KB'), r('2023 m. paramos panaudojimo ataskaita', '2024-03-01 08:40:00', '187.65 KB')]),
      editor: E.cke(`<p>Paramos panaudojimo ataskaitos:</p><p data-t="code">${E.typed('s', '{{dokumentubankas_file(812)}}')}</p><p>{{dokumentubankas_file(745)}}</p><p>{{dokumentubankas_file(611)}}</p>`), foot: E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' }) })],
    steps: [{ t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 's', dt: 0.05 },
      { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd', dur: 0.5 }, { t: 'g2', click: true }, { t: 'b3', show: '.nw', rise: 10 }, { t: 'b3', spot: 'nw', pad: 6 }, { t: 'b3+0.2', cur: [1500, 400], dur: 0.8 }, { t: 'b3+0.4', flash: '.nw' }],
  },
});
