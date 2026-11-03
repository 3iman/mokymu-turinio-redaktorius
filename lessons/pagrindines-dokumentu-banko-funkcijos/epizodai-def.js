#!/usr/bin/env node
// „Pagrindinės dokumentų banko funkcijos“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const CR = 'Dokumentų banko modulis';
const sub = (on) => ({ sub: ['Dokumentai', 'Kategorijos'], subOn: on });
const acts = (t = '') => `<div class="cacts"><span class="tvs-btn is-tiny"${t ? ` data-t="${t}sub"` : ''}>${S.plus}Sukurti subkategoriją</span><span class="tvs-btn is-tiny is-info">${I.eye}Peržiūrėti</span><span class="tvs-btn is-tiny"${t ? ` data-t="${t}up"` : ''}>${S.upload}Įkelti</span><span class="tvs-btn is-tiny is-pink">${S.trash}Ištrinti</span></div>`;
const cats = (cls, o = {}) => E.win({ cls, crumb: `${CR}  /  Kategorijos`, sideOn: 3, ...sub(1), body: `<div class="tvs-tree ct">
            <div class="tvs-node crow" data-t="cn"><div class="tvs-node-handle"></div><span data-t="cname">${o.cat || 'Nuostatai'}</span>${acts('c')}</div>${o.child || ''}
            <div class="tvs-node"><div class="tvs-node-handle"></div>Planavimo dokumentai</div><div class="tvs-node"><div class="tvs-node-handle"></div>Tvarkos</div></div>`, extra: o.extra || '' });
const DOCS = ['Strateginis planas 2006–2010', '2023 m. III ketvirčio finansinė ataskaita', 'Metinis veiklos planas 2026 m.', 'Darbo tvarkos taisyklės'];
const list = (cls, o = {}) => E.win({ cls, crumb: `${CR}  /  Dokumentai`, sideOn: 3, ...sub(0), body: `<div class="tvs-table is-compact" data-t="dl"><div class="tvs-th"><span></span><div class="tvs-check"></div><span>Pavadinimas</span><span>Failas</span><span></span></div>
            ${DOCS.map((n, i) => `<div class="tvs-row ${(o.rowCls || [])[i] || ''}"><div class="tvs-handle">${I.handle}</div><div class="tvs-check${(o.checked || []).includes(i) ? ' chk' + i : ''}"${(o.checked || []).includes(i) ? ` data-t="ck${i}"` : ''}></div><div class="tvs-title">${n}</div><div class="tvs-file">${I.file}</div><div class="tvs-actions"><span class="tvs-btn is-small is-info">${I.eye}</span></div></div>`).join('')}
            <div class="tvs-foot bf">${E.btn('Perrikiuoti', { cls: 'is-small' })}${E.btn('Ištrinti', { cls: 'is-small is-pink', icon: S.trash, t: 'del' })}${E.btn('Redaguoti', { cls: 'is-small is-orange', icon: S.edit, t: 'edb' })}</div></div>` });
const form = (cls, title, t = '') => E.win({ cls, crumb: `${CR}  /  Dokumentai  /  Redaguoti`, sideOn: 3, ...sub(0), body: `<div class="tvs-form is-dense"><div class="tvs-field" data-t="fttl"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-focus">${title}</div></div>
            <div class="tvs-field"><div class="tvs-label">Failas</div><div class="tvs-frow"><span class="tvs-fico">${I.file}</span><div class="tvs-fmeta"><span class="tvs-fname">${t || '03251-siga.docx'}</span></div></div></div></div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save })}${E.btn('Išsaugoti ir redaguoti sekantį', { cls: 'is-tiny', icon: S.save, t: 'next' })}</div>` });
const CSS = `.ct { background: #fff; padding: 12px; } .cacts { margin-left: auto; display: flex; gap: 6px; opacity: 0; } .bf { opacity: 0; } .bf .tvs-btn { margin-right: 8px; }
  .chk0, .chk1 { } .gone { overflow: hidden; } .upw { position: absolute; left: 380px; top: 120px; width: 1100px; z-index: 10; } .up-sub { padding: 0 22px 8px; }
  .drop { position: absolute; z-index: 30; display: flex; gap: 8px; left: 760px; top: 30px; } .drop span { background: #fff; border: 1px solid #ccc; padding: 8px 12px; border-radius: 6px; box-shadow: 0 6px 16px rgba(0,0,0,.2); font-size: 16px; }
  .old { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; vertical-align: top; }`;
E.build(__dirname, {
  '03-nauja-subkategorija': {
    note: 'K2 — „Nauja subkategorija“ (ep_678_03_1)', origin: '45% 30%', css: CSS,
    screens: [cats('scr1', { child: '<div class="tvs-node is-l2 is-new nc" data-t="nc"><div class="tvs-node-handle"></div>Tvarkų aprašai</div>' }),
      E.win({ cls: 'scr2', crumb: `${CR}  /  Kategorijos  /  Sukurti subkategoriją`, sideOn: 3, ...sub(1), body: `<div class="tvs-form"><div class="tvs-field" data-t="fp"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-focus">${E.typed('p', 'Tvarkų aprašai')}</div></div><div class="tvs-field"><div class="tvs-label">Tėvinė kategorija</div><div class="tvs-select is-value">Nuostatai</div></div></div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` }), cats('scr3', { child: '<div class="tvs-node is-l2 is-new nc2" data-t="nc2"><div class="tvs-node-handle"></div>Tvarkų aprašai</div>' })],
    steps: [{ t: 'b1', spot: 'cn', pad: 4 }, { t: 'b1+0.2', cur: 'cname', ax: 0.5 }, { t: 'b2', show: '.scr1 .cacts', dur: 0.3 }, { t: 'b2', spot: 'cn', pad: 4 },
      { t: 'b3', spot: 'csub', pad: 8 }, { t: 'b3', cur: 'csub' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: 'fp', pad: 6 }, { t: 'g1+0.3', cur: 'fp', ax: 0.3, ay: 0.8 },
      { t: 'b4', type: 'p', dt: 0.07 }, { t: 'g2+0.6', cur: 'save', dur: 0.4 }, { t: 'g2+1.1', click: true }, { t: 'g2+1.2', scr: 3 }, { t: 'g2+1.3', spot: 'nc2', pad: 4 }, { t: 'g2+1.5', flash: '.nc2' }],
  },
  '05-dokumentu-trynimas': {
    note: 'K3 — „Dokumentų trynimas“ (ep_678_05_1)', origin: '40% 40%', css: CSS,
    screens: [list('scr1', { checked: [0, 3], rowCls: ['gone', '', '', 'gone'] })],
    steps: [{ t: 'b1', spot: 'dl', pad: 6 }, { t: 'b1+0.2', cur: 'ck0' }, { t: 'g1-0.4', click: true }, { t: 'g1-0.2', cur: 'ck3', dur: 0.2 }, { t: 'g1', click: true },
      { t: 'b2', show: '.bf', rise: 8 }, { t: 'b2', spot: 'dl', pad: 6 }, { t: 'b3', spot: 'del', pad: 8 }, { t: 'b3', cur: 'del' }, { t: 'b3+0.6', click: true }, { t: 'b3+0.9', spot: 'dl', pad: 6 }, { t: 'b3+0.9', cur: [1400, 820], dur: 0.8 }],
    anim: (T) => [['.chk0', `pazymeti 0.01s step-end ${T('g1-0.4')}s both`], ['.chk3', `pazymeti 0.01s step-end ${T('g1')}s both`], ['.gone', `isnyksta 0.4s ease ${T('g1+5.8')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { } to { background: var(--tvs-info); border-color: var(--tvs-info); } }\n  @keyframes isnyksta { from { max-height: 80px; opacity: 1; } to { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; } }',
  },
  '05-redagavimo-mygtukas': {
    note: 'K4 — „Redagavimo mygtukas“ (ep_678_05_2)', origin: '40% 40%', css: CSS,
    screens: [list('scr1', { checked: [1, 2] }), form('scr2', '2023 m. III ketvirčio finansinė ataskaita', 'finansine-ataskaita-2023-3.pdf')],
    steps: [{ t: 'b1', spot: 'dl', pad: 6 }, { t: 'b1+0.2', cur: 'ck1' }, { t: 'g1-0.4', click: true }, { t: 'g1-0.2', cur: 'ck2', dur: 0.2 }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.bf', rise: 8 },
      { t: 'b2', spot: 'edb', pad: 8 }, { t: 'b2', cur: 'edb' }, { t: 'b2+1.0', click: true }, { t: 'b2+1.2', scr: 2, slide: 'right' }, { t: 'b3', spot: 'fttl', pad: 6 }],
    anim: (T) => [['.chk1', `pazymeti 0.01s step-end ${T('g1-0.4')}s both`], ['.chk2', `pazymeti 0.01s step-end ${T('g1')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { } to { background: var(--tvs-info); border-color: var(--tvs-info); } }',
  },
  '06-keliu-failu-ikelimas': {
    note: 'K5 — „Kelių failų įkėlimas“ (ep_678_06_1)', origin: '45% 35%', css: CSS + ` .uprow { opacity: 0; }`,
    screens: [cats('scr1', { cat: 'Finansinių ataskaitų rinkiniai', extra: `\n        <div class="upw">${E.upload('Finansinių ataskaitų rinkiniai', ['2023-I-ketvirtis.pdf', '2023-II-ketvirtis.pdf', '2023-III-ketvirtis.pdf', '2023-IV-ketvirtis.pdf'].map(n => [n, '612 KB', 'application/pdf', 'Dokumentubankas', 'uprow']))}</div><div class="drop"><span>📄 2023-I-ketvirtis.pdf</span><span>📄 2023-II…</span><span>📄 +2</span></div>` })],
    steps: [{ t: 'b1', spot: 'cn', pad: 4 }, { t: 'b1+0.2', cur: 'cname', ax: 0.5 }, { t: 'b1+1.0', show: '.cacts', dur: 0.3 }, { t: 'b2', spot: 'cup', pad: 8 }, { t: 'b2', cur: 'cup' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.upw', rise: 16 }, { t: 'g1+0.1', spot: null },
      { t: 'b3', show: '.drop', dur: 0.2 }, { t: 'b3', cur: [800, 60], dur: 0.2 }, { t: 'b3+0.2', cur: 'dz', dur: 0.9 }, { t: 'g2', hide: '.drop', dur: 0.2 }, { t: 'g2+0.1', show: '.uprow', rise: 10 }],
    anim: (T, D, R) => [['.drop', `vilkti 0.9s cubic-bezier(.45,0,.2,1) ${T('b3+0.2')}s both`]],
    keyframes: (T, D, R) => `  @keyframes vilkti { from { transform: none; } to { transform: translate(${(R.dz.x + 80 - 760).toFixed(0)}px, ${(R.dz.y + 40 - 30).toFixed(0)}px); } }`,
  },
  '06-pavadinimu-taisymas': {
    note: 'K6 — „Pavadinimų taisymas“ (ep_678_06_2)', origin: '40% 40%', css: CSS,
    screens: [form('scr1', `<span class="old">03251-siga.docx</span>${E.typed('t', '2023 m. III ketvirčio finansinė ataskaita')}`), form('scr2', 'f-iv-ketv-2023 (1).pdf', 'f-iv-ketv-2023 (1).pdf')],
    steps: [{ t: 'b1', spot: 'fttl', pad: 6 }, { t: 'b1+0.2', cur: 'fttl', ax: 0.4, ay: 0.8 }, { t: 'g1', type: 't', dt: 0.04 },
      { t: 'b2', spot: 'next', pad: 8 }, { t: 'b2', cur: 'next' }, { t: 'g2', click: true }, { t: 'g2+0.2', scr: 2, slide: 'right' }, { t: 'b3', spot: 'fttl', pad: 6 }, { t: 'b3+0.4', flash: '[data-t="fttl"] .tvs-input' }],
    anim: (T) => [['.old', `istrinti 0.3s steps(6, end) ${T('g1-0.4')}s both`]],
    keyframes: () => '  @keyframes istrinti { from { max-width: 20em; } to { max-width: 0; } }',
  },
});
