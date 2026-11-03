#!/usr/bin/env node
// „Puslapių anatomija“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const acts = (t = '', cls = '') => `<div class="tvs-node-acts ${cls}"><span class="tvs-btn is-tiny"${t ? ` data-t="${t}sub"` : ''}>${S.plus}Pridėti subpuslapį</span><span class="tvs-btn is-tiny is-info">${I.eye}Peržiūrėti</span><span class="tvs-btn is-tiny is-pink">${S.trash}Ištrinti</span></div>`;
const PAGES = [['Apie mokyklą', 0], ['Veiklos sritys', 0, 'vs'], ['Paslaugos', 0], ['Mokiniams', 0], ['Tėvams', 0]];
const tree = (cls, o = {}) => E.win({ cls, crumb: 'Puslapiai', sideOn: 1, sub: ['Puslapiai'], body: `<div>${E.btn('Pridėti puslapį', { icon: S.plus, t: 'addp' })}</div><div class="tvs-tree pt" data-t="tree">
            ${(o.pages || PAGES).map(([n, l, t, c]) => `<div class="tvs-node ${l ? 'is-l2' : ''} ${c || ''}"${t ? ` data-t="${t}"` : ''}><div class="tvs-node-handle"${t ? ` data-t="${t}h"` : ''}></div><span${t ? ` data-t="${t}n"` : ''}>${n}</span><span class="tvs-tag">Default</span>${t === 'vs' && o.acts ? acts('vs', 'pa') : ''}</div>`).join('')}</div>`, extra: o.extra || '' });
const typeModal = (t) => `\n        <div class="tvs-modal tm"><div class="tvs-modal-h"><span>Kokio tipo puslapį kuriate?</span><span class="tvs-x">×</span></div><div class="tvs-modal-b"><div class="tvs-opt is-hover" data-t="${t}">Default</div><div class="tvs-opt">Lengvai suprantama kalba layout</div><div class="tvs-opt">Kontaktai</div></div></div>`;
const fld = (l, inner, t) => `<div class="tvs-field"${t ? ` data-t="${t}"` : ''}><div class="tvs-label">${l}</div>${inner}</div>`;
const pform = (cls, fields, o = {}) => E.win({ cls, crumb: `Puslapiai  /  ${o.crumb || 'Pridėti'}`, sideOn: 1, sub: ['Puslapiai'], body: `${o.tabs ? E.tabs(o.tabs, o.tabOn || 0, o.tabT || {}) : ''}<div class="tvs-form is-dense">${fields}</div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save2' })}</div>`, extra: o.extra || '' });
const CSS = `.pt { background: #fff; padding: 12px; } .tm { position: absolute; left: 560px; top: 230px; width: 560px; z-index: 10; } .pa { opacity: 0; } .btns { display: flex; gap: 8px; }
  .upw { position: absolute; left: 330px; top: 140px; width: 1150px; z-index: 10; } .up-sub { padding: 0 22px 8px; } .drop { position: absolute; z-index: 30; display: flex; gap: 8px; left: 760px; top: 30px; } .drop span { background: #fff; border: 1px solid #ccc; padding: 8px 12px; border-radius: 6px; box-shadow: 0 6px 16px rgba(0,0,0,.2); font-size: 16px; }
  .sw-slot { position: relative; height: 42px; } .sw-slot .tvs-switch { position: absolute; left: 0; top: 0; } .sb { opacity: 0; } .tvs-cke-body { min-height: 200px; } .pre { color: var(--tvs-text-muted); }`;
const sw = (yes, cls = '') => yes ? `<span class="tvs-switch is-yes ${cls}"><span>Yes</span><span></span></span>` : `<span class="tvs-switch is-no ${cls}"><span></span><span>No</span></span>`;
E.build(__dirname, {
  '01-naujas-puslapis': {
    note: 'K1 — „Naujas puslapis“ (ep_701_01_1)', origin: '40% 35%', css: CSS,
    screens: [tree('scr1', { extra: typeModal('optd') }), pform('scr2', fld('Pavadinimas<span class="tvs-req">*</span>', `<div class="tvs-input is-focus">${E.typed('p', 'Logopedas')}</div>`, 'fp') + fld('Slug<span class="tvs-req">*</span>', `<div class="tvs-input is-value">${E.typed('s', 'logopedas', { caret: false })}</div>`, 'fs')),
      tree('scr3', { pages: [...PAGES, ['Logopedas', 0, 'np', 'is-new npn']] })],
    steps: [{ t: 'b1', spot: 'addp', pad: 8 }, { t: 'b1', cur: 'addp' }, { t: 'g1', click: true }, { t: 'g1+0.2', show: '.tm', rise: 14 }, { t: 'g1+0.2', spot: null },
      { t: 'b2', cur: 'optd', dur: 0.5 }, { t: 'g2', click: true }, { t: 'g2+0.2', scr: 2, slide: 'right' }, { t: 'g2+0.3', spot: 'fp', pad: 6 }, { t: 'g2+0.4', cur: 'fp', ax: 0.3, ay: 0.8 },
      { t: 'b3', type: 'p', dt: 0.08 }, { t: 'b3', type: 's', dt: 0.08 }, { t: 'b3+0.9', cur: 'save', dur: 0.4 }, { t: 'b3+1.4', click: true }, { t: 'g3-0.4', scr: 3 }, { t: 'g3', spot: 'np', pad: 4 }, { t: 'g3', flash: '.npn' }],
  },
  '01-tempiate-medyje': {
    note: 'K2 — „Tempiate medyje“ (ep_701_01_2)', origin: '40% 35%', css: CSS,
    screens: [tree('scr1', { pages: [['Apie mokyklą', 0, 'p0'], ['Veiklos sritys', 0, 'p1'], ['Paslaugos', 0, 'p2'], ['Mokiniams', 0, 'p3'], ['Logopedas', 0, 'p4', 'mv']] })],
    steps: [{ t: 'b1', spot: 'p4', pad: 4 }, { t: 'b1', cur: 'p4h' }, { t: 'g1', click: true },
      { t: 'b2-0.6', cur: { ref: 'p4h', dy: (R) => -(R.p4.y - R.p2.y) }, dur: 2.0 }, { t: 'b2-0.6', spot: { ref: 'p4', dy: (R) => -(R.p4.y - R.p2.y) }, pad: 4 }, { t: 'g2', spot: 'tree', pad: 6 }],
    anim: (T) => [['.mv', `pakelti 2.0s cubic-bezier(.45,0,.2,1) ${T('b2-0.6')}s both`], ['[data-t="p2"], [data-t="p3"]', `nuleisti 2.0s cubic-bezier(.45,0,.2,1) ${T('b2-0.6')}s both`]],
    keyframes: (T, D, R) => `  @keyframes pakelti { from { transform: none; } 10% { box-shadow: 0 8px 22px rgba(0,0,0,.18); } to { transform: translateY(-${R.p4.y - R.p2.y}px); box-shadow: 0 8px 22px rgba(0,0,0,.18); } }
  @keyframes nuleisti { from { transform: none; } to { transform: translateY(${R.p3.y - R.p2.y}px); } }`,
  },
  '03-subpuslapis': {
    note: 'K4 — „Subpuslapis“ (ep_701_03_1)', origin: '40% 35%', css: CSS,
    screens: [tree('scr1', { acts: true }), pform('scr2', fld('Pavadinimas<span class="tvs-req">*</span>', `<div class="tvs-input is-focus">${E.typed('p', 'Logopedas')}</div>`, 'fp') + fld('Slug<span class="tvs-req">*</span>', `<div class="tvs-input is-value"><span class="pre" data-t="pre">veiklos-sritys/</span>${E.typed('s', 'logopedas', { caret: false })}</div>`, 'fs'), { crumb: 'Veiklos sritys  /  Pridėti subpuslapį' })],
    steps: [{ t: 'b1', spot: 'vs', pad: 4 }, { t: 'b1+0.2', cur: 'vsn', ax: 0.5 }, { t: 'b1+0.8', show: '.pa', dur: 0.3 },
      { t: 'b2', spot: 'vssub', pad: 8 }, { t: 'b2', cur: 'vssub' }, { t: 'g1', click: true }, { t: 'g1+0.2', scr: 2, slide: 'right' }, { t: 'g1+0.3', spot: 'fs', pad: 6 },
      { t: 'b3', spot: 'pre', pad: 6 }, { t: 'b3+0.3', cur: 'fp', ax: 0.3, ay: 0.8 }, { t: 'b3+0.5', type: 'p', dt: 0.08 }, { t: 'b3+0.5', type: 's', dt: 0.08 }, { t: 'g2', flash: '[data-t="fs"] .tvs-input' }],
  },
  '04-pavadinimas-ir-slug': {
    note: 'K5 — „Pavadinimas ir Slug“ (ep_701_04_1)', origin: '45% 35%', css: CSS + ` .add2 { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; vertical-align: top; }`,
    screens: [pform('scr1', fld('Pavadinimas<span class="tvs-req">*</span>', `<div class="tvs-input is-focus">${E.typed('p', 'Logopedas')}${E.typed('p2', ' ir specialusis pedagogas', { caret: false })}</div>`, 'fp') + fld('Slug<span class="tvs-req">*</span>', `<div class="tvs-input is-value">${E.typed('s', 'logopedas', { caret: false })}</div>`, 'fs'))],
    steps: [{ t: 'b1', spot: 'fp', pad: 6 }, { t: 'b1', cur: 'fp', ax: 0.3, ay: 0.8 }, { t: 'g1', type: 'p', dt: 0.1 }, { t: 'g1', type: 's', dt: 0.1 }, { t: 'b2', spot: 'fs', pad: 6 },
      { t: 'b3', spot: 'fp', pad: 6 }, { t: 'b3+0.2', type: 'p2', dt: 0.05 }, { t: 'g2', spot: 'fs', pad: 6 }, { t: 'g2', flash: '[data-t="fs"] .tvs-input' }],
  },
  '06-sintaksiu-pavyzdziai': {
    note: 'K7 — „Sintaksių pavyzdžiai“ (ep_701_06_1)', origin: '45% 35%', css: CSS + ` .syn .tvs-syn-r { grid-template-columns: 150px 380px 1fr; } .num { border-radius: 3px; } .old9 { display: inline-block; max-width: 0; overflow: hidden; vertical-align: top; }`,
    screens: [pform('scr1', `<div class="tvs-syn syn">${[['{{structure(19)}}', 'Subpuslapių navigacija', 'sr'], ['{{ docs(12) }}', 'Dokumentų rinkinys'], ['{{ gallery() }}', 'Nuotraukų galerija']].map(([c, d, t]) => `<div class="tvs-syn-r"${t ? ` data-t="${t}"` : ''}><span class="tvs-btn is-tiny is-violet"${t ? ' data-t="copy"' : ''}>${S.copy.replace('currentColor', '#fff')}Kopijuoti</span><code>${E.esc(c)}</code><span class="tvs-help">${d}</span></div>`).join('')}</div>`, { crumb: 'Veiklos sritys  /  Redaguoti', tabs: ['Bendri', 'Turinys', 'Sintaksė'], tabOn: 2 }),
      pform('scr2', E.cke(`<p>Veiklos sritys</p><p data-t="code">${E.typed('s', '{{structure(', { caret: false })}<span class="num" data-t="num"><span class="old9">19</span>${E.typed('n', '6')}</span>)}}</p>`), { crumb: 'Veiklos sritys  /  Redaguoti', tabs: ['Bendri', 'Turinys', 'Sintaksė'], tabOn: 1 })],
    steps: [{ t: 'b1', spot: 'sr', pad: 4 }, { t: 'b1', cur: 'copy' }, { t: 'g1', click: true }, { t: 'b2', flash: '[data-t="sr"]' }, { t: 'g2-0.3', scr: 2, slide: 'right' }, { t: 'g2', spot: 'cke', pad: 6 }, { t: 'g2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g2', type: 's', dt: 0.02 },
      { t: 'b3', spot: 'num', pad: 6 }, { t: 'g3', type: 'n', dt: 0.1 }, { t: 'g3+0.3', flash: '.num' }],
    anim: (T) => [['.old9', `rodyti19 ${(T('g3') - T('g2')).toFixed(2)}s steps(1, end) ${T('g2+0.3')}s both`]],
    keyframes: () => '  @keyframes rodyti19 { from { max-width: 2em; } to { max-width: 0; } }',
  },
  '08-paveiksleliu-galerija': {
    note: 'K8 — „Paveikslėlių galerija“ (ep_701_08_1)', origin: '45% 40%', css: CSS + ` .uprow { opacity: 0; }`,
    screens: [pform('scr1', fld('Paveikslėlių galerija', `<div class="btns">${E.btn('Select File', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny', t: 'upl' })}</div>`, 'fg'), { crumb: 'Veiklos sritys  /  Redaguoti',
      extra: `\n        <div class="upw">${E.upload('Images', [1, 2, 3, 4].map(i => [`Rugsejo-pirmoji (${i}).jpg`, '2.4 MB', 'image/jpeg', 'Puslapiai', 'uprow', i === 1 ? 'add1' : ''] ), { cls: 'up' })}</div><div class="drop"><span>🖼 Rugsejo-pirmoji (1).jpg</span><span>🖼 +3</span></div>` })],
    steps: [{ t: 'b1', spot: 'fg', pad: 6 }, { t: 'b1', cur: 'upl' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.upw', rise: 16 }, { t: 'g1+0.1', spot: null },
      { t: 'b2', show: '.drop', dur: 0.2 }, { t: 'b2', cur: [800, 60], dur: 0.2 }, { t: 'b2+0.2', cur: 'dz', dur: 1.0 }, { t: 'g2', hide: '.drop', dur: 0.2 }, { t: 'g2+0.1', show: '.uprow', rise: 10 }, { t: 'b3', spot: 'upx', pad: 0 }, { t: 'b3', spot: null }, { t: 'b3+0.4', cur: 'add1', dur: 0.5 }, { t: 'g3', click: true }],
    anim: (T, D, R) => [['.drop', `vilkti 1.0s cubic-bezier(.45,0,.2,1) ${T('b2+0.2')}s both`]],
    keyframes: (T, D, R) => `  @keyframes vilkti { from { transform: none; } to { transform: translate(${(R.dz.x + 80 - 760).toFixed(0)}px, ${(R.dz.y + 40 - 30).toFixed(0)}px); } }`,
  },
  '11-atnaujinimo-data': {
    note: 'K11 — „Atnaujinimo data“ (ep_701_11_1)', origin: '45% 40%', css: CSS + ` .upd-d { opacity: 0; font-size: 16px; color: #888; margin-top: 20px; }`,
    screens: [pform('scr1', fld('Tags', '<div class="tvs-tags"><span class="tvs-chip">priemimas<span class="tvs-chip-x">×</span></span></div>') + fld('Show updated', `<div class="sw-slot" data-t="sw">${sw(false, 'sa')}${sw(true, 'sb')}</div>`, 'fsw'), { crumb: 'Priėmimas į mokyklą  /  Redaguoti' }),
      E.site('scr2', `<div class="tvs-sweb-p">Prašymai priimami nuo kovo 1 d. iki birželio 30 d.</div><div class="upd-d ud" data-t="ud">Atnaujinta: 2026-11-03</div>`, { title: 'Priėmimas į mokyklą', on: 0 })],
    steps: [{ t: 'b1', spot: 'fsw', pad: 6 }, { t: 'b1', cur: 'sw', ax: 0.75 }, { t: 'g1', click: true }, { t: 'g1+0.05', hide: '.sa', dur: 0.15 }, { t: 'g1+0.05', show: '.sb', dur: 0.15 },
      { t: 'b2', spot: 'save2', pad: 8 }, { t: 'b2', cur: 'save2' }, { t: 'g2', click: true }, { t: 'g2+0.2', scr: 2, slide: 'up' }, { t: 'b3', show: '.ud', rise: 6 }, { t: 'b3', spot: 'ud', pad: 8 }, { t: 'b3', cur: [1400, 820], dur: 0.8 }, { t: 'b3+0.3', flash: '.ud' }],
  },
  '12-turinys': {
    note: 'K12 — „Turinys“ (ep_701_12_1)', origin: '50% 50%', css: CSS + ` .tvs-split-bot .tvs-cke-body { min-height: 110px; } .gl { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 8px 0; } .gl .tvs-photo { height: 90px; } .bold1 { }`,
    screens: [E.split('scr1', { siteTitle: 'Apie mokyklą', siteBody: `<div class="tvs-sweb-p">Čia rašome tekstą, <b>formatuojame jį</b>.</div><div class="gl" data-t="gl">${'<div class="tvs-photo"></div>'.repeat(4)}</div><div class="tvs-sweb-p">Kita pastraipa.</div>`,
      editor: E.cke(`<p>Čia rašome tekstą, <span class="b1" data-t="b1">formatuojame jį</span>.</p><p data-t="code">${E.typed('s', '{{ gallery() }}')}</p><p>Kita pastraipa.</p>`, { marks: { bold: 'bbold' } }), foot: E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' }) })],
    steps: [{ t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'b1', ax: 0 }, { t: 'b1+0.6', cur: 'b1', ax: 1, dur: 0.5 }, { t: 'g1-0.4', cur: 'bbold', dur: 0.3 }, { t: 'g1', click: true },
      { t: 'b2', spot: 'code', pad: 6 }, { t: 'b2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g2', type: 's', dt: 0.07 }, { t: 'b3', show: '.gl', rise: 10 }, { t: 'b3', spot: 'gl', pad: 8 }, { t: 'b3+0.3', flash: '.gl' }],
    anim: (T) => [['.b1', `paryskinti 0.5s linear ${T('b1+0.6')}s both`]],
    keyframes: (T) => `  @keyframes paryskinti { 0% { background: linear-gradient(90deg, #b3d4fc 0 0%, transparent 0); } 99% { background: linear-gradient(90deg, #b3d4fc 0 100%, transparent 0); } 100% { background: linear-gradient(90deg, #b3d4fc 0 100%, transparent 0); font-weight: 700; } }`,
  },
});
