#!/usr/bin/env node
// „Naujienų anatomija“ — 19 TVS epizodų (epizodai.js). Bendri ekranai: sąrašas, forma, svetainės įrašas, šoninis padalijimas.
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const CR = 'Naujienų modulis';
const NEWS = [['Pirmokų šventė sporto salėje', 'Renginiai', '2026-09-01 12:00'], ['Kvietimas į tėvų susirinkimą', 'Pranešimai', '2026-08-28 09:00'], ['Rugsėjo 1-osios tvarkaraštis', 'Pranešimai', '2026-08-26 15:30'], ['Vasaros stovykla „Žalia“', 'Renginiai', '2026-07-10 10:00']];
const nrow = ([n, k, d], o = {}) => `<div class="tvs-row ${o.cls || ''}"${o.t ? ` data-t="${o.t}"` : ''}><div class="tvs-check${o.chk ? ' chk' : ''}"${o.ct ? ` data-t="${o.ct}"` : ''}></div><div>${n}</div><div>${k}</div><div>${d}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange"${o.et ? ` data-t="${o.et}"` : ''}>${S.edit}Redaguoti</span></div></div>`;
const ntable = (rows, foot = '') => `<div class="tvs-table n-table" data-t="ntab"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span>Kategorija</span><span>Publikavimo data/laikas</span><span></span></div>${rows}${foot}</div>`;
const list = (cls, rows, o = {}) => E.win({ cls, crumb: `${CR}  /  Naujienos`, sideOn: 4, sub: ['Naujienos', 'Kategorijos', 'Nustatymai'], body: `
          <div>${E.btn('Sukurti', { icon: S.plus })}</div>
          <div class="tvs-tabs"><div class="tvs-tab is-on">Visi</div><div class="tvs-tab">Šiukšlės</div></div>
          ${ntable(rows, o.foot || '')}` });
const fld = (lbl, inner, t = '', help = '') => `<div class="tvs-field"${t ? ` data-t="${t}"` : ''}><div class="tvs-label">${lbl}</div>${help ? `<div class="tvs-help">${help}</div>` : ''}${inner}</div>`;
const inp = (v, cls = '') => `<div class="tvs-input ${cls}">${v}</div>`;
const sw = (yes, cls = '') => yes ? `<span class="tvs-switch is-yes ${cls}"><span>Yes</span><span></span></span>` : `<span class="tvs-switch is-no ${cls}"><span></span><span>No</span></span>`;
const swSlot = (from, t = 'sw') => `<div class="sw-slot" data-t="${t}">${sw(from, 'sa')}${sw(!from, 'sb')}</div>`;
const form = (cls, fields, o = {}) => E.win({ cls, crumb: `${CR}  /  Naujienos  /  Redaguoti`, sideOn: 4, sub: ['Naujienos', 'Kategorijos', 'Nustatymai'], body: `${o.pre || ''}
          ${o.tabs === false ? '' : E.tabs(o.tabs || ['Bendri', 'Turinys', 'Nuotraukos', 'Nustatymas'], o.tabOn || 0, o.tabT || {})}<div class="tvs-form is-dense">${fields}</div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save })}</div>`, extra: o.over || '' });
const art = (o = {}) => `${o.img === false ? '' : (o.video ? `<div class="tvs-svid tvs-art-img${o.imgCls ? ' ' + o.imgCls : ''}"><span class="tvs-svid-play"></span></div>` : `<div class="tvs-photo tvs-art-img ${o.imgCls || ''}"></div>`)}
            <div class="tvs-art-t">Pirmokų šventė sporto salėje</div><div class="tvs-art-m">Paskelbta: 2026-09-01 · Kategorija: <b>Renginiai</b></div>${o.intro || ''}
            <div class="tvs-art-p">Rugsėjo 1-ąją pirmokai susirinko sporto salėje. Šventę vedė vyresniųjų klasių mokiniai.</div>${o.mid || ''}
            <div class="tvs-art-p">Po šventės pirmokai su mokytojomis apžiūrėjo savo klases.</div>${o.after || ''}`;
const CSS = `
  .n-table .tvs-th, .n-table .tvs-row { grid-template-columns: 30px 1fr 200px 260px 180px; }
  .sw-slot { position: relative; height: 42px; } .sw-slot .tvs-switch { position: absolute; left: 0; top: 0; } .sb { opacity: 0; }
  .tvs-split2 .tvs-form { padding: 0 18px; } .tvs-split2 .tvs-field { padding: 10px 0; }
  .btns { display: flex; gap: 8px; margin-bottom: 6px; }
  .tvs-split2-r .tvs-art-img { height: 200px; }`;
const lstSteps = [{ t: 'b1', spot: 'ntab', pad: 6 }];
const updAt = (at) => [{ t: `${at}-0.6`, spot: 'upd', pad: 10 }, { t: `${at}-0.7`, cur: 'upd', dur: 0.5 }, { t: at, click: true }];

E.build(__dirname, {
  '01-i-naujienos-valdyma': {
    note: 'K1 — „Į naujienos valdymą“ (ep_695_01_1)', origin: '50% 35%', css: CSS,
    screens: [list('scr1', NEWS.map((n, i) => nrow(n, i === 0 ? { t: 'r0', et: 'e0' } : {})).join('')), form('scr2', fld('Pavadinimas<span class="tvs-req">*</span>', inp(NEWS[0][0], 'is-value')) + fld('Slug<span class="tvs-req">*</span>', inp('pirmoku-svente-sporto-saleje', 'is-value')) + fld('Kategorija', `<div class="tvs-select">Renginiai</div>`))],
    steps: [...lstSteps, { t: 'b1+0.3', spot: 'r0', pad: 4 }, { t: 'b2', cur: 'e0' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.1', spot: null }],
  },
  '01-irasa-istrinate': {
    note: 'K2 — „Įrašą ištrinate“ (ep_695_01_2)', origin: '50% 35%', css: CSS + ` .delf { opacity: 0; } .gone { overflow: hidden; }`,
    screens: [list('scr1', NEWS.map((n, i) => nrow(n, i === 1 ? { t: 'r1', ct: 'c1', cls: 'gone', chk: true } : {})).join(''), { foot: `<div class="tvs-foot delf">${E.btn('Ištrinti', { cls: 'is-small is-pink', icon: S.trash, t: 'del' })}</div>` })],
    steps: [{ t: 'b1', spot: 'r1', pad: 4 }, { t: 'b1+0.2', cur: 'c1' }, { t: 'b1+1.0', click: true }, { t: 'b1+1.05', show: '.delf', dur: 0.2 },
      { t: 'b2', spot: 'del', pad: 8 }, { t: 'b2', cur: 'del', dur: 0.5 }, { t: 'g1', click: true }, { t: 'g1+0.2', spot: 'ntab', pad: 6 }],
    anim: (T) => [['.chk', `pazymeti 0.01s step-end ${T('b1+1.0')}s both`], ['.gone', `isnyksta 0.4s ease ${T('g1+0.1')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { } to { background: var(--tvs-info); border-color: var(--tvs-info); } }\n  @keyframes isnyksta { from { max-height: 80px; opacity: 1; } to { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; } }',
  },
  '02-unikalus-slug': {
    note: 'K3 — „Unikalus Slug“ (ep_695_02_1)', origin: '45% 35%', css: CSS + ` .old { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; vertical-align: top; }`,
    screens: [form('scr1', fld('Pavadinimas<span class="tvs-req">*</span>', inp('Pirmokų šventė', 'is-value')) + fld('Slug<span class="tvs-req">*</span>', inp(`<span class="old">pirmoku-svente</span>${E.typed('sl', 'pirmoku-svente-2026')}`, 'is-focus'), 'fslug', 'Naudojamas kaip naujienos adresas') + fld('Kategorija', '<div class="tvs-select">Renginiai</div>'))],
    steps: [{ t: 'b1', spot: 'fslug', pad: 6 }, { t: 'b1+0.2', cur: 'fslug', ax: 0.3, ay: 0.8 }, { t: 'g1', type: 'sl', dt: 0.06 }, { t: 'b2', spot: 'fslug', pad: 8 }, ...updAt('g2'), { t: 'g2+0.2', flash: '[data-t="fslug"] .tvs-input' }],
    anim: (T) => [['.old', `istrinti 0.3s steps(6, end) ${T('g1-0.4')}s both`]],
    keyframes: () => '  @keyframes istrinti { from { max-width: 20em; } to { max-width: 0; } }',
  },
  '03-publikavimo-ir-slepimo-datos': {
    note: 'K4 — „Publikavimo ir slėpimo datos“ (ep_695_03_1)', origin: '45% 40%', css: CSS,
    screens: [form('scr1', fld('Pavadinimas<span class="tvs-req">*</span>', inp(NEWS[0][0], 'is-value')) +
      fld('Publikavimo data/laikas', `<div class="tvs-date"><span class="tvs-date-x">${I.x}</span><span class="tvs-date-v">${E.typed('d1', '2026-09-01 12:00', { caret: false })}</span><span class="tvs-date-tz">Europe/Vilnius</span></div>`, 'fpub') +
      fld('Slėpimo data/laikas', `<div class="tvs-date"><span class="tvs-date-x">${I.x}</span><span class="tvs-date-v">${E.typed('d2', '2026-09-30 12:00', { caret: false })}</span><span class="tvs-date-tz">Europe/Vilnius</span></div>`, 'fhide'))],
    steps: [{ t: 'b1', spot: 'fpub', pad: 6 }, { t: 'b1+0.2', cur: 'fpub', ax: 0.4, ay: 0.75 }, { t: 'b1+1.2', type: 'd1', dt: 0.05 },
      { t: 'g1', spot: 'fhide', pad: 6 }, { t: 'g1', cur: 'fhide', ax: 0.4, ay: 0.75, dur: 0.5 }, { t: 'b2+0.4', type: 'd2', dt: 0.05 }, { t: 'g2', flash: '[data-t="fhide"] .tvs-date' }],
  },
  '04-autorius-is-saraso': {
    note: 'K5 — „Autorius iš sąrašo“ (ep_695_04_1)', origin: '45% 40%', css: CSS + ` .pick { left: 420px; top: 180px; width: 900px; } .auth-v { opacity: 0; }`,
    screens: [form('scr1', fld('Pavadinimas<span class="tvs-req">*</span>', inp(NEWS[0][0], 'is-value')) + fld('Autoriai', `<div>${E.btn('Pažymėti', { cls: 'is-tiny', icon: S.pick, t: 'pick' })}</div><div class="tvs-picked auth-v"><span>Marija Pečkauskaitė</span><span class="tvs-btn is-tiny is-pink">${S.remove}Šalinti</span></div>`, 'fauth'),
      { over: `\n        <div class="tvs-modal pick"><div class="tvs-modal-h"><span>Choose an entry.</span><span class="tvs-x">×</span></div><div class="tvs-modal-b"><div class="tvs-input is-value">${E.typed('q', 'Pečk')}</div>
          <div class="tvs-table"><div class="tvs-th"><span>Full Name</span><span>Position</span><span></span></div><div class="tvs-row"><div>Marija Pečkauskaitė</div><div>Direktoriaus pavaduotoja ugdymui</div><div class="tvs-actions"><span class="tvs-btn is-tiny" data-t="add">${S.plus}Pridėti</span></div></div></div></div></div>` })],
    steps: [{ t: 'b1', spot: 'fauth', pad: 6 }, { t: 'b1+0.2', cur: 'pick' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.pick', rise: 16 }, { t: 'g1+0.1', spot: null }, { t: 'g1+0.4', type: 'q', dt: 0.12 },
      { t: 'b2', cur: 'add', dur: 0.5 }, { t: 'g2', click: true }, { t: 'g2+0.1', hide: '.pick', dur: 0.2 }, { t: 'g2+0.3', show: '.auth-v', rise: 8 }, { t: 'g3', spot: 'fauth', pad: 6 }, { t: 'g3', flash: '.auth-v' }],
  },
  '04-visi-autoriaus-irasai': {
    note: 'K6 — „Visi autoriaus įrašai“ (ep_695_04_2)', origin: '50% 50%', css: CSS + ` .ag { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; } .ag .tvs-scard-img { height: 120px; }`,
    screens: [E.site('scr1', `<div class="tvs-art-m">Paskelbta: 2026-09-01 · Kategorija: <b>Renginiai</b></div><div class="tvs-art-p">Rugsėjo 1-ąją pirmokai susirinko sporto salėje. Šventę vedė vyresniųjų klasių mokiniai.</div>
          <div class="tvs-art-by"><span class="tvs-edit-pen">✎</span><span class="tvs-slink" data-t="by">Marija Pečkauskaitė</span></div>`, { title: 'Pirmokų šventė sporto salėje', on: 3 }),
      E.site('scr2', `<div class="ag" data-t="ag">${['Pirmokų šventė sporto salėje', 'Projektų savaitė', 'Mokytojų diena'].map(n => `<div class="tvs-scard"><div class="tvs-scard-img"></div><div class="tvs-scard-b"><div class="tvs-scard-t">${n}</div><div class="tvs-scard-d">Plačiau ›</div></div></div>`).join('')}</div>`, { title: 'Marija Pečkauskaitė', on: 3 })],
    steps: [{ t: 'b1', spot: 'by', pad: 8 }, { t: 'b1+0.2', cur: 'by', ax: 0.6 }, { t: 'g1', click: true }, { t: 'g1+0.2', scr: 2, slide: 'right' }, { t: 'b2', spot: 'ag', pad: 10 }, { t: 'b2', cur: [1400, 820], dur: 0.8 }],
  },
  '05-nuotrauku-autorius': {
    note: 'K7 — „Nuotraukų autorius“ (ep_695_05_1)', origin: '50% 50%', css: CSS + ` .ph-by { opacity: 0; }`,
    screens: [E.split2('scr1', { siteTitle: 'Naujienos', left: `<div class="tvs-form">${fld('Kategorija', '<div class="tvs-select">Renginiai</div>')}${fld('Nuotraukų autorius', inp(E.typed('ph', 'Jonas Biliūnas'), 'is-focus'), 'fph')}${fld('Intro', inp('Pirmokai šventę pradėjo dainomis.', 'is-value'))}</div>`,
      right: art({ after: '<div class="tvs-art-by ph-by" data-t="phby">📷 Nuotraukos: Jonas Biliūnas</div>' }) })],
    steps: [{ t: 'b1', spot: 'fph', pad: 6 }, { t: 'b1+0.2', cur: 'fph', ax: 0.3, ay: 0.8 }, { t: 'g1', type: 'ph', dt: 0.08 }, { t: 'g1+1.4', show: '.ph-by', rise: 8 }, { t: 'g1+1.4', spot: 'phby', pad: 8 }, { t: 'b2', spot: ['fph', 'phby'], pad: 8 }],
  },
  '06-kategorija-irasui': {
    note: 'K8 — „Kategorija įrašui“ (ep_695_06_1)', origin: '45% 40%', css: CSS + ` .tvs-select { position: relative; } .c-v { position: absolute; left: 18px; color: var(--tvs-text); }
  .dd-wrap { position: relative; height: 0; z-index: 5; } .cat-dd { position: absolute; left: 0; top: -2px; width: 100%; }`,
    screens: [form('scr1', fld('Pavadinimas<span class="tvs-req">*</span>', inp(NEWS[0][0], 'is-value')) + fld('Kategorija', `<div class="tvs-select" data-t="cat"><span class="c-ph">Choose an entry...</span><span class="c-v">Renginiai</span></div><div class="dd-wrap"><div class="tvs-select-list cat-dd"><div class="tvs-select-opt">Pranešimai</div><div class="tvs-select-opt is-hl" data-t="opt">Renginiai</div><div class="tvs-select-opt">Didžiuojamės</div><div class="tvs-select-opt">Projektinė veikla</div></div></div>`, 'fcat', 'Parinkite kategoriją kuriai priklauso įrašas.') + fld('Intro', inp('Pirmokai šventę pradėjo dainomis.', 'is-value')))],
    steps: [{ t: 'b1', spot: 'fcat', pad: 6 }, { t: 'b1+0.2', cur: 'cat', ax: 0.8 }, { t: 'g1', click: true }, { t: 'g1+0.05', show: '.cat-dd', dur: 0.1 }, { t: 'g1+0.2', cur: 'opt', dur: 0.4 }, { t: 'g1+1.0', click: true },
      { t: 'g1+1.05', hide: ['.cat-dd', '.c-ph'], dur: 0.1 }, { t: 'g1+1.05', show: '.c-v', dur: 0.05 }, { t: 'b2', spot: 'fcat', pad: 8 }, ...updAt('g2')],
  },
  '07-zyma-irasui': {
    note: 'K9 — „Žyma įrašui“ (ep_695_07_1)', origin: '45% 45%', css: CSS + ` .slot { position: relative; display: inline-flex; } .slot .tin { position: absolute; left: 6px; top: 50%; transform: translateY(-50%); white-space: nowrap; font-size: 21px; }`,
    screens: [form('scr1', fld('Tags', `<div class="tvs-tags" data-t="tg"><span class="slot"><span class="tvs-chip ch">priesmokyklinis<span class="tvs-chip-x">×</span></span><span class="tin">${E.typed('t', 'priesmokyklinis')}</span></span></div>`, 'ftags', 'Separate values with a comma or by pressing "Enter".') + fld('Audios', `<div class="btns">${E.btn('Select File', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny' })}</div>`), { tabOn: 3 })],
    steps: [{ t: 'b1', spot: 'ftags', pad: 6 }, { t: 'b1+0.2', cur: 'tg', ax: 0.1 }, { t: 'b1+0.4', type: 't', dt: 0.1 }, { t: 'g1', hide: '.tin', dur: 0.05 }, { t: 'g1', show: '.ch', dur: 0.2 }, { t: 'g1+0.2', flash: '.ch' }],
  },
  '08-pagrindine-nuotrauka-nerodoma': {
    note: 'K10 — „Pagrindinė nuotrauka nerodoma“ (ep_695_08_1)', origin: '50% 50%', css: CSS + ` .collapse { overflow: hidden; }`,
    screens: [E.split2('scr1', { siteTitle: 'Naujienos', left: `<div class="tvs-form">${fld('Pagrindinė nuotrauka', '<span class="tvs-thumb"></span>')}${fld('Rodyti pagrindinę nuotrauką', swSlot(true), 'fsw')}</div><div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}</div>`,
      right: art({ imgCls: 'collapse' }) })],
    steps: [{ t: 'b1', spot: 'fsw', pad: 6 }, { t: 'b1+0.2', cur: 'sw', ax: 0.75 }, { t: 'g1', click: true }, { t: 'g1+0.05', hide: '.sa', dur: 0.15 }, { t: 'g1+0.05', show: '.sb', dur: 0.15 },
      { t: 'g1+0.6', cur: 'upd', dur: 0.5 }, { t: 'g1+1.3', click: true }, { t: 'b2', spot: 'sright', pad: 4 }, { t: 'g2', flash: '.tvs-split2-r .tvs-art-t' }],
    anim: (T) => [['.collapse', `suskleisti 0.6s cubic-bezier(.45,0,.2,1) ${T('b2')}s both`]],
    keyframes: () => '  @keyframes suskleisti { from { height: 200px; margin-bottom: 12px; opacity: 1; } to { height: 0; margin-bottom: 0; opacity: 0; } }',
  },
  '09-nuotraukos-kadravimas': {
    note: 'K11 — „Nuotraukos kadravimas“ (ep_695_09_1)', origin: '45% 45%', css: CSS + ` .crop-wrap { position: relative; width: 640px; overflow: hidden; } .crop-wrap .tvs-photo { height: 360px; } .cropbox { position: absolute; left: 60px; top: 80px; width: 520px; height: 200px; border: 3px dashed #fff; box-shadow: 0 0 0 2000px rgba(0,0,0,.45); }
  .card2 { display: grid; grid-template-columns: 240px 1fr; gap: 16px; background: #fff; border: 1px solid #e6e6e6; padding: 10px; } .card2 .tvs-photo { height: 130px; }`,
    screens: [form('scr1', fld('Pagrindinė nuotrauka', `<div class="btns">${E.btn('Crop', { cls: 'is-tiny is-info', t: 'crop' })}${E.btn('Rodyti apkarpytą', { cls: 'is-tiny is-grey' })}</div><div class="crop-wrap" data-t="cw"><div class="tvs-photo"></div><div class="cropbox" data-t="cb"></div></div>`, 'fimg'), { tabOn: 2 }),
      E.win({ cls: 'scr2', crumb: `${CR}  /  Naujienos`, sideOn: 4, sub: ['Naujienos', 'Kategorijos', 'Nustatymai'], body: `<div class="card2" data-t="c2"><div class="tvs-photo" style="background-position:center 30%"></div><div><b>Pirmokų šventė sporto salėje</b><div class="tvs-help">Sąrašo kortelė svetainėje</div></div></div>` })],
    steps: [{ t: 'b1', spot: 'cw', pad: 6 }, { t: 'g1-0.5', cur: 'crop' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.cropbox', dur: 0.3 },
      { t: 'b2', spot: 'cw', pad: 6 }, { t: 'b2+0.3', cur: 'cb', ax: 0.95, ay: 0.95 }, { t: 'g2', cur: 'cb', ax: 0.75, ay: 0.85, dur: 1.0 },
      { t: 'b3-0.5', cur: 'upd', dur: 0.4 }, { t: 'b3-0.1', click: true }, { t: 'b3', scr: 2 }, { t: 'b3+0.2', spot: 'c2', pad: 8 }, { t: 'g3', flash: '.card2' }],
    anim: (T) => [['.cropbox', `apkarpyti 1.0s cubic-bezier(.45,0,.2,1) ${T('g2')}s both`]],
    keyframes: () => '  @keyframes apkarpyti { from { width: 520px; height: 200px; } to { width: 400px; height: 170px; } }',
  },
  '10-izanga-irase': {
    note: 'K12 — „Įžanga įraše“ (ep_695_10_1)', origin: '50% 50%', css: CSS + ` .intro-s { font-size: 17px; color: #444; font-style: italic; margin-bottom: 10px; }`,
    screens: [E.split2('scr1', { siteTitle: 'Naujienos', left: E.cke(`<p data-t="iline">${E.typed('i', 'Pirmokai šventę pradėjo dainomis.')}</p>`, { label: 'Intro', t: 'fint' }), right: art({ img: false, intro: '<div class="intro-s is2" data-t="is2">Pirmokai šventę pradėjo dainomis.</div>' }) })],
    steps: [{ t: 'b1', spot: 'fint', pad: 6 }, { t: 'b1+0.2', cur: 'iline', ax: 0.02, ay: 1.6 }, { t: 'g1', type: 'i', dt: 0.05 }, { t: 'b2', show: '.is2', rise: 8 }, { t: 'b2', spot: 'is2', pad: 8 }, { t: 'b2+0.4', flash: '.is2' }],
  },
  '12-nuotraukos-tarp-pastraipu': {
    note: 'K13 — „Nuotraukos tarp pastraipų“ (ep_695_12_1)', origin: '50% 50%', css: CSS + ` .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; } .two .tvs-photo { height: 100px; } .gal { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; } .gal .tvs-photo { height: 60px; }`,
    screens: [E.split2('scr1', { siteTitle: 'Naujienos', left: E.cke(`<p>Rugsėjo 1-ąją pirmokai susirinko sporto salėje.</p><p data-t="iline">${E.typed('s', '{{images(2)}}')}</p><p>Po šventės pirmokai apžiūrėjo klases.</p>`, { label: 'Turinys', t: 'fcke' }) + `<div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}</div>`,
      right: art({ img: false, mid: '<div class="two" data-t="two"><div class="tvs-photo"></div><div class="tvs-photo"></div></div>', after: '<div class="tvs-art-m">Nuotraukų galerija</div><div class="gal" data-t="gal">' + '<div class="tvs-photo"></div>'.repeat(4) + '</div>' }) })],
    steps: [{ t: 'b1', spot: 'gal', pad: 8 }, { t: 'b2', spot: 'fcke', pad: 6 }, { t: 'b2+0.2', cur: 'iline', ax: 0.02, ay: 1.6 }, { t: 'g1', type: 's', dt: 0.07 },
      { t: 'b3', cur: 'upd', dur: 0.5 }, { t: 'b3+0.7', click: true }, { t: 'b3+0.9', show: '.two', rise: 10 }, { t: 'b3+0.9', spot: 'two', pad: 8 }, { t: 'g2', flash: '.two' }],
  },
  '13-uzrakinta-galerija': {
    note: 'K14 — „Užrakinta galerija“ (ep_695_13_1)', origin: '50% 50%', css: CSS + ` .gal { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; } .gal .tvs-photo { height: 60px; } .lockg { opacity: 0; } .set { position: absolute; left: 30px; bottom: 30px; width: 520px; z-index: 6; }`,
    screens: [E.split2('scr1', { siteTitle: 'Naujienos', left: `<div class="tvs-form">${fld('Apsaugotos nuotraukos', swSlot(false), 'fsw')}</div><div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}</div>
        <div class="tvs-form set"><div class="tvs-field"><div class="tvs-label">Mokyklos nustatymai › Galerijų slaptažodis</div><div class="tvs-input is-value">demo2026</div></div></div>`,
      right: art({ img: false, after: '<div class="tvs-art-m">Nuotraukų galerija</div><div class="gal galv">' + '<div class="tvs-photo"></div>'.repeat(4) + '</div><div class="tvs-unlock lockg" data-t="lockg"><div class="tvs-sdp-s">Slaptažodis</div><b>ATRAKINTI</b></div>' }) })],
    steps: [{ t: 'b1', spot: 'fsw', pad: 6 }, { t: 'b1+0.2', cur: 'sw', ax: 0.75 }, { t: 'g1', click: true }, { t: 'g1+0.05', hide: '.sa', dur: 0.15 }, { t: 'g1+0.05', show: '.sb', dur: 0.15 },
      { t: 'b2', hide: '.galv', dur: 0.3 }, { t: 'b2+0.2', show: '.lockg', rise: 8 }, { t: 'b2+0.2', spot: 'lockg', pad: 8 },
      { t: 'b3', show: '.set', rise: 10 }, { t: 'b3', spot: 'sleft', pad: 4 }, { t: 'g2', flash: '.set' }],
  },
  '14-vaizdo-irasas-virsuje': {
    note: 'K15 — „Vaizdo įrašas viršuje“ (ep_695_14_1)', origin: '50% 50%', css: CSS + ` .prev { height: 150px; } .vtop { position: relative; } .vtop .tvs-svid { position: absolute; inset: 0; } .vtop .tvs-photo { position: absolute; inset: 0; } .vtop { height: 200px; margin-bottom: 12px; }
  .phu { color: #9aa0a6; position: absolute; left: 18px; } .vin { position: relative; }`,
    screens: [E.split2('scr1', { siteTitle: 'Naujienos', left: `<div class="tvs-form">${fld('Video', inp(`<span class="phu">http://</span>${E.typed('u', 'https://youtu.be/demo-svente')}`, 'vin'), 'fvid')}<div class="tvs-svid prev pv" data-t="pv"><span class="tvs-svid-play"></span></div></div>`,
      right: `<div class="vtop" data-t="vtop"><div class="tvs-photo"></div><div class="tvs-svid vv"><span class="tvs-svid-play"></span></div></div>` + art({ img: false }) })],
    steps: [{ t: 'b1', spot: 'fvid', pad: 6 }, { t: 'b1+0.2', cur: 'fvid', ax: 0.3, ay: 0.8 }, { t: 'g1-0.05', hide: '.phu', dur: 0.05 }, { t: 'g1', type: 'u', dt: 0.04 },
      { t: 'b2', show: '.pv', rise: 10 }, { t: 'b2', spot: 'pv', pad: 8 }, { t: 'b3', show: '.vv', dur: 0.4 }, { t: 'b3', spot: 'vtop', pad: 8 }, { t: 'g2', flash: '.vtop' }],
  },
  '15-irasa-prisegate': {
    note: 'K16 — „Įrašą prisegate“ (ep_695_15_1)', origin: '50% 50%', css: CSS + ` .nl .tvs-snews-i { padding: 6px; } .pinned { position: relative; } .pinned::after { content: '📌'; position: absolute; right: 10px; top: 8px; }`,
    screens: [E.split2('scr1', { siteTitle: 'Naujienos', left: `${E.tabs(['Bendri', 'Turinys', 'Nuotraukos', 'Nustatymas'], 3)}<div class="tvs-form">${fld('Pin', swSlot(false), 'fsw')}</div><div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}</div>`,
      right: `<div class="tvs-snews nl" data-t="nl">${['Pirmokų šventė sporto salėje', 'Rugsėjo 1-osios tvarkaraštis', 'Priėmimas į pirmą klasę'].map((n, i) => `<div class="tvs-snews-i ${i === 2 ? 'pin pinned' : `o${i}`}"><i></i><div><div class="tvs-snews-t">${n}</div><div class="tvs-snews-m">2026-0${8 - i}-1${i} · <b>Pranešimai</b></div></div></div>`).join('')}</div>` })],
    steps: [{ t: 'b1', spot: 'fsw', pad: 6 }, { t: 'b1+0.2', cur: 'sw', ax: 0.75 }, { t: 'g1', click: true }, { t: 'g1+0.05', hide: '.sa', dur: 0.15 }, { t: 'g1+0.05', show: '.sb', dur: 0.15 },
      { t: 'g1+0.5', cur: 'upd', dur: 0.5 }, { t: 'g1+1.2', click: true }, { t: 'b2', spot: 'nl', pad: 8 }, { t: 'g2', flash: '.pin' }],
    anim: (T, D, R) => [['.pin', `pakelti 0.7s cubic-bezier(.45,0,.2,1) ${T('b2')}s both`], ['.o0, .o1', `nuleisti 0.7s cubic-bezier(.45,0,.2,1) ${T('b2')}s both`]],
    keyframes: () => '  @keyframes pakelti { from { transform: translateY(0); } to { transform: translateY(calc(-200% - 20px)); } }\n  @keyframes nuleisti { from { transform: none; } to { transform: translateY(calc(100% + 10px)); } }',
  },
  '16-garso-failas': {
    note: 'K17 — „Garso failas“ (ep_695_16_1)', origin: '45% 45%', css: CSS + ` .upw { left: 420px; top: 170px; width: 900px; } .arow { opacity: 0; } .dragf { position: absolute; left: 1350px; top: 650px; z-index: 30; display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid #ccc; padding: 10px 14px; border-radius: 6px; box-shadow: 0 8px 20px rgba(0,0,0,.2); font-size: 18px; }`,
    screens: [form('scr1', fld('Audios', `<div class="btns">${E.btn('Select File', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny', t: 'upl' })}</div><div class="tvs-frow arow"><span class="tvs-fico">${I.file}</span><div class="tvs-fmeta"><span class="tvs-fname">demo-mokyklos-himnas.mp3</span><span class="tvs-fpath">local://naujienos/demo-mokyklos-himnas.mp3</span></div></div>`, 'faud'), { tabOn: 3,
      over: `\n        <div class="tvs-modal upw"><div class="tvs-modal-h"><span>Naujienos <span class="tvs-badge">Max: 100 MB</span></span><span class="tvs-x">×</span></div><div class="tvs-modal-b"><div class="tvs-dz" data-t="dz">Click or drop files here to upload.</div></div></div>
        <div class="dragf">♪ demo-mokyklos-himnas.mp3</div>` })],
    steps: [{ t: 'b1', spot: 'faud', pad: 6 }, { t: 'b1+0.2', cur: 'upl' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.upw', rise: 16 }, { t: 'g1+0.1', spot: null },
      { t: 'b2', show: '.dragf', dur: 0.2 }, { t: 'b2', cur: [1360, 660], dur: 0.2 }, { t: 'b2+0.2', cur: 'dz', dur: 1.0 }, { t: 'g2', hide: ['.dragf', '.upw'], dur: 0.25 }, { t: 'g2+0.2', show: '.arow', rise: 8 }, { t: 'g3', spot: 'faud', pad: 6 }, { t: 'g3', flash: '.arow' }],
    anim: (T) => [['.dragf', `vilkti 1.0s cubic-bezier(.45,0,.2,1) ${T('b2+0.2')}s both`]],
    keyframes: (T, D, R) => `  @keyframes vilkti { from { transform: none; } to { transform: translate(${(R.dz.x + R.dz.w / 2 - 1360).toFixed(0)}px, ${(R.dz.y + R.dz.h / 2 - 660).toFixed(0)}px); } }`,
  },
  '16-garso-sintakse': {
    note: 'K18 — „Garso sintaksė“ (ep_695_16_2)', origin: '50% 50%', css: CSS + ` .aud { opacity: 0; margin-bottom: 10px; } .syn-r { display: flex; align-items: center; gap: 12px; padding: 10px 0; font-size: 18px; } .syn-r code { font-family: 'SF Mono', Menlo, monospace; }`,
    screens: [E.split2('scr1', { siteTitle: 'Naujienos', left: `${E.tabs(['Bendri', 'Turinys', 'Sintaksė'], 2)}<div class="tvs-form"><div class="syn-r" data-t="srow"><span class="tvs-btn is-tiny is-violet" data-t="copy">${S.copy.replace('currentColor', '#fff')}Kopijuoti</span><code>{{audio()}}</code><span class="tvs-help">Garso grotuvas</span></div></div>` + E.cke(`<p data-t="iline">${E.typed('a', '{{audio()}}')}</p><p>Rugsėjo 1-ąją pirmokai susirinko sporto salėje.</p>`, { label: 'Turinys', t: 'fcke' }),
      right: art({ img: false, intro: '<div class="tvs-audio aud" data-t="aud"><i></i><span>0:00 / 2:41</span><s></s></div>' }) })],
    steps: [{ t: 'b1', spot: 'srow', pad: 6 }, { t: 'b1+0.2', cur: 'copy' }, { t: 'g1', click: true }, { t: 'b2', spot: 'fcke', pad: 6 }, { t: 'b2', cur: 'iline', ax: 0.02, ay: 1.6 }, { t: 'g2', type: 'a', dt: 0.06 },
      { t: 'g3', show: '.aud', rise: 8 }, { t: 'g3', spot: 'aud', pad: 8 }, { t: 'g3+0.3', flash: '.aud' }],
  },
  '17-irasu-skaicius': {
    note: 'K19 — „Įrašų skaičius“ (ep_695_17_1)', origin: '50% 50%', css: CSS + ` .hn { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; } .hn .tvs-scard-img { height: 70px; } .hn .tvs-scard-b { padding: 8px 10px; } .hn .tvs-scard-t { font-size: 14px; }
  .old { display: inline-block; max-width: 0; overflow: hidden; vertical-align: top; } .ex { overflow: hidden; }`,
    screens: [E.split2('scr1', { siteTitle: 'Titulinis', left: `<div class="tvs-form">${fld('Limitas', inp(`<span class="old o1">20</span>${E.typed('l1', '12')}`, 'is-focus'), 'flim')}${fld('Namų puslapio limitas', inp(`<span class="old o2">9</span>${E.typed('l2', '6')}`), 'fhome')}</div><div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}</div>`,
      right: `<div class="hn" data-t="hn">${Array.from({ length: 9 }, (_, i) => `<div class="tvs-scard${i >= 6 ? ' ex' : ''}"><div class="tvs-scard-img"></div><div class="tvs-scard-b"><div class="tvs-scard-t">Naujiena ${i + 1}</div></div></div>`).join('')}</div>` })],
    steps: [{ t: 'b1', spot: 'flim', pad: 6 }, { t: 'b1+0.2', cur: 'flim', ax: 0.3, ay: 0.8 }, { t: 'g1', type: 'l1', dt: 0.12 },
      { t: 'b2', spot: 'fhome', pad: 6 }, { t: 'b2', cur: 'fhome', ax: 0.3, ay: 0.8 }, { t: 'b2+0.6', type: 'l2', dt: 0.12 },
      { t: 'g2-0.7', cur: 'upd', dur: 0.4 }, { t: 'g2-0.2', click: true }, { t: 'g2', hide: '.ex', dur: 0.4 }, { t: 'g2+0.1', spot: 'hn', pad: 8 }, { t: 'g2+0.4', flash: '.hn' }],
    anim: (T) => [['.o1', `istrinti 0.2s steps(3, end) ${T('g1-0.3')}s both`], ['.o2', `istrinti 0.2s steps(3, end) ${T('b2+0.3')}s both`]],
    keyframes: () => '  @keyframes istrinti { from { max-width: 3em; } to { max-width: 0; } }',
  },
});
