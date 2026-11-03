#!/usr/bin/env node
// „Bendrieji principai“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const SYN = [['{{structure(19)}}', 'Subpuslapių navigacija', 'sr'], ['{{ staff_single(9) }}', 'Darbuotojo profilio kortelė'], ['{{ docs(12) }}', 'Dokumentų rinkinys pagal kategoriją'], ['{{ gallery() }}', 'Nuotraukų galerija']];
const synList = (t = 'copy') => `<div class="tvs-syn" data-t="syn">${SYN.map(([c, d, r]) => `<div class="tvs-syn-r"${r ? ` data-t="${r}"` : ''}><span class="tvs-btn is-tiny is-violet"${r ? ` data-t="${t}"` : ''}>${S.copy.replace('currentColor', '#fff')}Kopijuoti</span><code>${E.esc(c)}</code><span class="tvs-help">${d}</span></div>`).join('')}</div>`;
const page = (cls, tabOn, body, o = {}) => E.win({ cls, crumb: `Puslapiai  /  ${o.p || 'Struktūra ir kontaktai'}  /  Redaguoti`, sideOn: 1, body: `${E.tabs(['Bendri', 'Turinys', 'Sintaksė', 'Auditas'], tabOn, { 2: 'tabsyn', 3: 'tabaud' })}<div class="tvs-form ${o.dense ? 'is-dense' : ''}" style="padding:10px 18px">${body}</div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save' })}<span class="tvs-sp"></span>${E.btn('Peržiūrėti', { cls: 'is-tiny is-info', icon: I.eye, t: 'prev' })}</div>`, extra: o.extra || '' });
const key = (txt, cls = 'k') => `\n        <div class="kbd ${cls}">${txt}</div>`;
const CSS = `.tvs-cke-body { min-height: 220px; } .kbd { position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); z-index: 40; padding: 14px 28px; border: 2px solid #333; border-radius: 8px; background: #fff; font: 700 26px var(--tvs-font); box-shadow: 0 4px 0 #333; opacity: 0; }
  .pt { background: #fff; padding: 12px; } .pa { opacity: 0; } .tvs-select { position: relative; } .c-v { position: absolute; left: 18px; color: var(--tvs-text); } .dd-wrap { position: relative; height: 0; z-index: 5; } .cat-dd { position: absolute; left: 0; top: -2px; width: 100%; }
  .dd2 { position: absolute; left: 146px; top: 70px; width: 380px; z-index: 10; } .word { position: absolute; left: 80px; top: 120px; width: 620px; z-index: 6; background: #fff; border: 1px solid #c9c9c9; box-shadow: 0 16px 40px rgba(0,0,0,.2); }
  .word-h { height: 40px; background: #2b579a; color: #fff; display: flex; align-items: center; padding: 0 14px; font: 15px Arial; } .word-b { padding: 24px 28px; font: 20px/1.6 Calibri, Arial; } .sel { background: #b3d4fc; }
  .w-red { color: #d00; font-family: 'Comic Sans MS', cursive; } .w-big { font-size: 26px; font-family: Georgia; }`;
E.build(__dirname, {
  '01-kopijuoti-sintakse': {
    note: 'K1 — „Kopijuoti sintaksę“ (ep_658_01_1)', origin: '45% 35%', css: CSS,
    screens: [page('scr1', 2, synList()), page('scr2', 1, E.cke(`<p>Struktūra ir kontaktai</p><p data-t="code">${E.typed('s', '{{structure(19)}}')}</p>`))],
    steps: [{ t: 'b1', spot: 'sr', pad: 4 }, { t: 'b1', cur: 'copy' }, { t: 'g1', click: true }, { t: 'g1+0.1', flash: '[data-t="sr"]' }, { t: 'b2-0.3', scr: 2, slide: 'right' }, { t: 'b2', spot: 'cke', pad: 6 }, { t: 'b2', cur: 'code', ax: 0.02, ay: 1.8 },
      { t: 'g2', type: 's', dt: 0.02 }, { t: 'b3', spot: 'code', pad: 8 }, { t: 'g3', flash: '[data-t="code"]' }],
  },
  '06-skirtukas-sintakse': {
    note: 'K7 — „Skirtukas „Sintaksė““ (ep_658_06_1)', origin: '45% 35%', css: CSS,
    screens: [page('scr1', 0, `<div class="tvs-field"><div class="tvs-label">Pavadinimas</div><div class="tvs-input is-value">Struktūra ir kontaktai</div></div><div class="tvs-field"><div class="tvs-label">Slug</div><div class="tvs-input is-value">struktura-ir-kontaktai</div></div>`), page('scr2', 2, synList())],
    steps: [{ t: 'b1', spot: 'tabsyn', pad: 4 }, { t: 'b1', cur: 'tabsyn' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, dur: 0.2 }, { t: 'b2', spot: 'syn', pad: 6 }, { t: 'b3', spot: 'sr', pad: 4 }],
  },
  '06-modulis-sintakses': {
    note: 'K8 — „Modulis „Sintaksės““ (ep_658_06_2)', origin: '25% 20%', css: CSS + ` .m-table .tvs-th, .m-table .tvs-row { grid-template-columns: 30px 360px 1fr; } .m-table code { font-family: 'SF Mono', Menlo, monospace; font-size: 17px; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Darbalaukis', sideOn: 0, sub: ['Darbalaukis', 'Papildiniai'], search: E.typed('q', 'sint', { ph: 'Type to search...' }), body: E.dash(E.DASH), extra: '\n        <div class="tvs-dropdown dd2"><div class="tvs-dd-h">Moduliai</div><div class="tvs-dd-i">Dokumentų bankas</div><div class="tvs-dd-i is-active" data-t="ddsyn">Sintaksės</div><div class="tvs-dd-i">Baneriai</div></div>' }),
      E.win({ cls: 'scr2', crumb: 'Sintaksės', sideOn: 1, sub: ['Sintaksės'], body: `<div>${E.btn('Sukurti', { icon: S.plus, t: 'add' })}</div><div class="tvs-table m-table" data-t="mt"><div class="tvs-th"><div class="tvs-check"></div><span>Sintaksė</span><span>Aprašymas</span></div>${SYN.map(([c, d]) => `<div class="tvs-row"><div class="tvs-check"></div><div><code>${E.esc(c)}</code></div><div>${d}</div></div>`).join('')}</div>` })],
    steps: [{ t: 'b1', spot: 'search', pad: 6 }, { t: 'b1', zoom: 1.3 }, { t: 'b1+0.2', cur: 'search', ax: 0.3 }, { t: 'g1', click: true }, { t: 'g1+0.2', type: 'q', dt: 0.12 }, { t: 'g1+0.8', show: '.dd2', rise: 8 },
      { t: 'b2', spot: 'ddsyn', pad: 6 }, { t: 'b2', cur: 'ddsyn', ax: 0.3 }, { t: 'g2', click: true }, { t: 'g2+0.1', scr: 2, slide: 'right' }, { t: 'g2+0.1', zoom: 1 }, { t: 'g2+0.2', spot: 'mt', pad: 6 }, { t: 'b3', spot: 'add', pad: 8 }],
  },
  '02-ctrl-shift-v': {
    note: 'K25 — „Ctrl+Shift+V“ (ep_700_02_1)', origin: '45% 40%', css: CSS + ` .pasted { opacity: 0; }`,
    screens: [page('scr1', 1, E.cke(`<p>Naujienos</p><p class="pasted" data-t="ps">Demo mokyklos mokiniai laimėjo regioninę matematikos olimpiadą. Sveikiname!</p><p data-t="tgt">&nbsp;</p>`), { p: 'Naujienos', extra: `\n        <div class="word wd"><div class="word-h">Word — naujiena.docx</div><div class="word-b"><span class="sel">Demo mokyklos mokiniai <span class="w-red">laimėjo</span> <span class="w-big">regioninę</span> matematikos olimpiadą. Sveikiname!</span></div></div>${key('Ctrl + Shift + V')}` })],
    steps: [{ t: 0.3, spot: null }, { t: 'b1-0.8', hide: '.wd', dur: 0.4 }, { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1', cur: 'tgt', ax: 0.1 }, { t: 'g1', click: true },
      { t: 'b2', show: '.k', rise: 10 }, { t: 'g2', show: '.pasted', dur: 0.2 }, { t: 'g2+0.8', hide: '.k', dur: 0.3 }, { t: 'b3', spot: 'ps', pad: 8 }, { t: 'g3', flash: '.pasted' }],
  },
  '03-isvalote-formatavima': {
    note: 'K26 — „Išvalote formatavimą“ (ep_700_03_1)', origin: '45% 35%', css: CSS + ` .messy { } .clean { position: absolute; left: 0; top: 0; opacity: 0; } .wrapm { position: relative; } .sa2 { }`,
    screens: [page('scr1', 1, E.cke(`<div class="wrapm" data-t="txt"><p class="messy">Demo mokyklos <span class="w-red">puslapio</span> <span class="w-big">tekstas</span> su svetimu formatavimu.</p><p class="clean">Demo mokyklos puslapio tekstas su svetimu formatavimu.</p></div>`, { marks: { removeformat: 'tx' } }), { p: 'Apie mokyklą', extra: key('Ctrl + A') })],
    steps: [{ t: 'b1', spot: 'txt', pad: 8 }, { t: 'b2', show: '.k', rise: 10 }, { t: 'g1', flash: '.wrapm' }, { t: 'g1+0.8', hide: '.k', dur: 0.3 },
      { t: 'b3-0.4', zoom: 1.35 }, { t: 'b3', spot: 'tx', pad: 6 }, { t: 'b3', cur: 'tx' }, { t: 'b3+0.6', click: true }, { t: 'b3+0.7', hide: '.messy', dur: 0.2 }, { t: 'b3+0.7', show: '.clean', dur: 0.2 }, { t: 'g2', zoom: 1 }, { t: 'g2', spot: 'txt', pad: 8 }],
    anim: (T) => [['.wrapm', `zymeti 0.3s linear ${T('g1')}s both`]],
    keyframes: () => '  @keyframes zymeti { from { background: transparent; } to { background: #b3d4fc; } }',
  },
  '04-dubliuojate-puslapi': {
    note: 'K27 — „Dubliuojate puslapį“ (ep_700_04_1)', origin: '45% 35%', css: CSS,
    screens: [E.win({ cls: 'scr1', crumb: 'Puslapiai', sideOn: 1, sub: ['Puslapiai'], body: `<div class="tvs-tree pt" data-t="tree"><div class="tvs-node"><div class="tvs-node-handle"></div>Apie mokyklą</div>
            <div class="tvs-node" data-t="pr"><div class="tvs-node-handle"></div><span data-t="prn">Priėmimas į mokyklą</span><div class="tvs-node-acts pa"><span class="tvs-btn is-tiny" data-t="dup">Dubliuoti</span><span class="tvs-btn is-tiny is-info">${I.eye}Peržiūrėti</span><span class="tvs-btn is-tiny is-pink">${S.trash}Ištrinti</span></div></div>
            <div class="tvs-node is-new cp" data-t="cp"><div class="tvs-node-handle"></div>Priėmimas į mokyklą</div><div class="tvs-node"><div class="tvs-node-handle"></div>Mokiniams</div></div>` })],
    steps: [{ t: 'b1', spot: 'tree', pad: 6 }, { t: 'b2', spot: 'pr', pad: 4 }, { t: 'b2', cur: 'prn', ax: 0.5 }, { t: 'g1', show: '.pa', dur: 0.3 },
      { t: 'b3', spot: 'dup', pad: 8 }, { t: 'b3', cur: 'dup' }, { t: 'b3+0.6', click: true }, { t: 'g2', spot: 'cp', pad: 4 }, { t: 'g2', flash: '.cp' }],
    anim: (T) => [['.cp', `iskleisti 0.4s cubic-bezier(.16,1,.3,1) ${T('b3+0.7')}s both`]],
    keyframes: () => '  @keyframes iskleisti { from { max-height: 0; opacity: 0; } to { max-height: 80px; opacity: 1; } }',
  },
  '08-priminimas-perziureti': {
    note: 'K28 — „Priminimas peržiūrėti“ (ep_700_08_1)', origin: '45% 40%', css: CSS + ` .sv { opacity: 0; }`,
    screens: [page('scr1', 3, `<div class="tvs-field" data-t="fd"><div class="tvs-label">Patikrinimo data</div><div class="tvs-date"><span class="tvs-date-x">${I.x}</span><span class="tvs-date-v">${E.typed('d', '2027-03-01 09:00', { caret: false })}</span><span class="tvs-date-tz">Europe/Vilnius</span></div></div>
              <div class="tvs-field" data-t="fst"><div class="tvs-label">Statusas</div><div class="tvs-select" data-t="st"><span class="c-ph">Choose an entry...</span><span class="c-v">Peržiūrėti</span></div><div class="dd-wrap"><div class="tvs-select-list cat-dd"><div class="tvs-select-opt">Tvarkinga</div><div class="tvs-select-opt is-hl" data-t="optp">Peržiūrėti</div><div class="tvs-select-opt">Atidėtas</div></div></div></div>`, { p: 'Priėmimas į mokyklą', dense: true })],
    steps: [{ t: 'b1', spot: 'tabaud', pad: 4 }, { t: 'b1', cur: 'tabaud' }, { t: 'g1', click: true }, { t: 'b2', spot: 'fd', pad: 6 }, { t: 'b2', cur: 'fd', ax: 0.4, ay: 0.75 }, { t: 'g2', click: true }, { t: 'g2+0.2', type: 'd', dt: 0.05 },
      { t: 'b3', spot: 'fst', pad: 6 }, { t: 'b3', cur: 'st', ax: 0.8 }, { t: 'b3+0.5', click: true }, { t: 'b3+0.55', show: '.cat-dd', dur: 0.1 }, { t: 'b3+0.6', cur: 'optp', dur: 0.3 }, { t: 'b3+1.0', click: true },
      { t: 'b3+1.05', hide: ['.cat-dd', '.c-ph'], dur: 0.1 }, { t: 'b3+1.05', show: '.c-v', dur: 0.05 }, { t: 'b3+1.2', cur: 'save', dur: 0.4 }, { t: 'g3-0.2', click: true }, { t: 'g3', flash: '.tvs-form-foot' }],
  },
  '09-uzkoduota-nuoroda': {
    note: 'K29 — „Užkoduota nuoroda“ (ep_700_09_1)', origin: '30% 6%', css: CSS + ` .brw { position: absolute; inset: 0; background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #dfe3ea; } .brw .tvs-sweb { position: absolute; inset: 60px 0 0; border: 0; border-radius: 0; box-shadow: none; } .mk { border-radius: 3px; padding: 0 2px; }`,
    screens: [page('scr1', 0, `<div class="tvs-field"><div class="tvs-label">Pavadinimas</div><div class="tvs-input is-value">Priėmimas į mokyklą</div></div>`, { p: 'Priėmimas į mokyklą' }),
      E.scr('scr2 brw', `${E.chrome('<span class="is-dim">https://demo.svetainesmokykloms.lt</span><span class="mk" data-t="mk">/pages/preview/8f3k2m</span>', 'omni')}${E.site('in', '<div class="tvs-sweb-p">Prašymai priimami nuo kovo 1 d. iki birželio 30 d.</div>', { title: 'Priėmimas į mokyklą' })}`)],
    steps: [{ t: 'b1', spot: 'prev', pad: 8 }, { t: 'b1', cur: 'prev' }, { t: 'g1', click: true }, { t: 'g1+0.2', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', zoom: 1.6 }, { t: 'b2', spot: 'mk', pad: 6 }, { t: 'b2+0.2', cur: 'mk', ax: 0 }, { t: 'b3', cur: 'mk', ax: 1, dur: 0.8 }, { t: 'g2', flash: '.mk' }],
    anim: (T) => [['.mk', `pazymeti 0.8s linear ${T('b3')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { background: linear-gradient(90deg, #b3d4fc 0 0%, transparent 0); } to { background: linear-gradient(90deg, #b3d4fc 0 100%, transparent 0); } }',
  },
});
