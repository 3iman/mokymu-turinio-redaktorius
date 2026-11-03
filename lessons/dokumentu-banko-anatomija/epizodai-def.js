#!/usr/bin/env node
// „Dokumentų banko anatomija“ — 16 TVS epizodų (epizodai.js). Bendri ekranai — žemiau esantys pagalbininkai.
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const CR = 'Dokumentų banko modulis';
const sub = (on = 0) => ({ sub: ['Dokumentai', '<span data-t="subcat">Kategorijos</span>'], subOn: on });
const DOCS = ['Gimnazijos nuostatai', 'Mokinių pasiekimų ir pažangos vertinimo tvarkos aprašas', 'Darbo tvarkos taisyklės', 'Mokinių elgesio taisyklės', 'Ugdymo planas 2025–2026 m. m.'];
const filter = (o = {}) => `<div class="tvs-filter"><div class="tvs-input f-s"${o.ts ? ` data-t="${o.ts}"` : ''}>${o.search || '<span class="ph0">Paieška</span>'}</div><div class="tvs-select f-c"${o.tc ? ` data-t="${o.tc}"` : ''}><span class="c-ph">Kategorijos</span>${o.cat ? `<span class="c-v">${o.cat}</span>` : ''}</div>${E.btn('Filtruoti', { icon: I.filter, t: o.tf || '' })}${E.btn('Valyti', { cls: 'is-grey', t: o.tv || '' })}</div>`;
const list = (cls, rows, o = {}) => E.win({ cls, crumb: `${CR}  /  Dokumentai`, sideOn: 3, ...sub(0), body: `
          <div>${E.btn('Sukurti', { icon: S.plus })}</div>
          ${filter(o)}
          ${o.extra || ''}<div class="lw" data-t="list">${E.docTable(rows.map((n, i) => E.docRow(n, { t: o.rowT ? o.rowT(i) : '', cls: o.rowC ? o.rowC(i) : '' })).join(''))}</div>`, extra: o.over || '' });
const F = { ttl: (v, t = 'fttl') => `<div class="tvs-field" data-t="${t}"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-value">${v}</div></div>`,
  url: (t = 'furl') => `<div class="tvs-field" data-t="${t}"><div class="tvs-label">URL</div><div class="tvs-help">Įkėlimas naudojant url</div><div class="tvs-input"></div></div>`,
  desc: (v, t = 'fdesc') => `<div class="tvs-field" data-t="${t}"><div class="tvs-label">Aprašymas</div><div class="tvs-input is-value">${v}</div></div>`,
  file: (rows = '') => `<div class="tvs-field" data-t="ffile"><div class="tvs-label">Failas</div><div class="btns">${E.btn('Select File', { cls: 'is-tiny is-info', t: 'sel' })}${E.btn('Upload', { cls: 'is-tiny', t: 'upl' })}</div>${rows}</div>`,
  tags: (inner, t = 'ftags') => `<div class="tvs-field" data-t="${t}"><div class="tvs-label">Kategorijos</div><div class="tvs-tags">${inner}</div></div>`,
  date: (v, t = 'fdate') => `<div class="tvs-field" data-t="${t}"><div class="tvs-label">Patikrinimo data</div><div class="tvs-date"><span class="tvs-date-x">${I.x}</span><span class="tvs-date-v">${v}</span><span class="tvs-date-tz">Europe/Vilnius</span></div></div>`,
  com: (v, t = 'fcom') => `<div class="tvs-field" data-t="${t}"><div class="tvs-label">Patikrinimo komentaras</div><div class="tvs-input">${v}</div></div>` };
const chip = (n, cls = '') => `<span class="tvs-chip ${cls}">${n}<span class="tvs-chip-x">×</span></span>`;
const frow = (cls = '') => `<div class="tvs-frow ${cls}"><span class="tvs-fico">${I.file}</span><div class="tvs-fmeta"><span class="tvs-fname">gimnazijos-nuostatai.pdf</span><span class="tvs-fpath">local://dokumentubankas/gimnazijos-nuostatai.pdf</span></div><span class="fsz">884.95 KB</span><span class="fsz">application/pdf</span></div>`;
const form = (cls, fields, o = {}) => E.win({ cls, crumb: `${CR}  /  Dokumentai  /  ${o.crumb || 'Redaguoti'}`, sideOn: 3, ...sub(0), body: `${o.pre || ''}
          <div class="tvs-form is-dense">${fields}</div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save })}</div>`, extra: o.over || '' });
const CATS = [['Nuostatai', 13], ['Tvarkų aprašai', 14], ['Finansinių ataskaitų rinkiniai', 18], ['Prašymai', 21, 'rpras']];
const catList = (cls, o = {}) => E.win({ cls, crumb: `${CR}  /  Kategorijos`, sideOn: 3, ...sub(1), body: `
          <div>${E.btn('Sukurti', { icon: S.plus, t: 'cadd' })}</div>
          <div class="tvs-table c-table"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span>ID</span><span></span></div>
            ${(o.rows || CATS).map(([n, id, t, c]) => `<div class="tvs-row ${c || ''}"${t ? ` data-t="${t}"` : ''}><div class="tvs-check"></div><div>${n}</div><div>${id}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange">${S.edit}Redaguoti</span></div></div>`).join('')}
          </div>` });
const catForm = (cls, fields) => E.win({ cls, crumb: `${CR}  /  Kategorijos  /  Prašymai`, sideOn: 3, ...sub(1), body: `
          <div class="tvs-form is-dense">${fields}</div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}</div>` });
const sw = (yes, cls = '') => yes ? `<span class="tvs-switch is-yes ${cls}"><span>Yes</span><span></span></span>` : `<span class="tvs-switch is-no ${cls}"><span></span><span>No</span></span>`;
const r = (n, d, z, c, t) => [n, d, z, c, t];
const site = (cls, body, title = 'Dokumentai') => E.site(cls, body, { title, on: 1, nav: ['Apie mokyklą', 'Dokumentai', 'Mokiniams', 'Tėvams', 'Kontaktai'] });
const CSS = `
  .f-s { width: 300px; position: relative; } .f-c { width: 380px; position: relative; } .c-v { position: absolute; left: 18px; color: var(--tvs-text); }
  .btns { display: flex; gap: 8px; margin-bottom: 6px; } .fsz { font-size: 17px; color: var(--tvs-text-muted); margin-left: 24px; }
  .c-table .tvs-th, .c-table .tvs-row { grid-template-columns: 30px 1fr 120px 200px; }
  .sw-slot { position: relative; height: 42px; } .sw-slot .tvs-switch { position: absolute; left: 0; top: 0; }
  .tvs-sweb .tvs-sdocs { font-size: 16px; }`;

const docsTable = (o = {}) => E.sdocs('Finansinių ataskaitų rinkiniai', [r('2023 m. III ketvirčio finansinė ataskaita', '2023-10-25 09:12:40', '612.30 KB', '', 'r1'), r('2023 m. II ketvirčio finansinė ataskaita', '2023-07-24 10:02:11', '598.10 KB'), r('2023 m. I ketvirčio finansinė ataskaita', '2023-04-25 08:45:03', '580.44 KB')], { t: 'stab' });

E.build(__dirname, {
  '01-paieska-virsuje': {
    note: 'K1 — „Paieška viršuje“ (ep_679_01_1)', origin: '25% 20%', css: CSS + ` .dd2 { position: absolute; left: 146px; top: 70px; width: 380px; z-index: 10; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Darbalaukis', sideOn: 0, sub: ['Darbalaukis', 'Papildiniai'], search: E.typed('q', 'dokum', { ph: 'Type to search...' }), body: E.dash(E.DASH),
      extra: '\n        <div class="tvs-dropdown dd2"><div class="tvs-dd-h">Moduliai</div><div class="tvs-dd-i is-active" data-t="dddb">Dokumentų bankas</div><div class="tvs-dd-i">Dokumentų priminimai</div></div>' }),
      list('scr2', DOCS)],
    steps: [{ t: 'b1', spot: 'search', pad: 6 }, { t: 'b1', zoom: 1.3 }, { t: 'b1+0.2', cur: 'search', ax: 0.3 }, { t: 'g1', type: 'q', dt: 0.15 }, { t: 'g1+0.9', show: '.dd2', rise: 8 }, { t: 'g1+1.0', spot: 'dddb', pad: 6 },
      { t: 'b2', cur: 'dddb', ax: 0.3 }, { t: 'g2', click: true }, { t: 'g2+0.1', scr: 2, slide: 'right' }, { t: 'g2+0.1', spot: null }, { t: 'g2+0.2', zoom: 1 }],
  },
  '01-darbalaukio-skyrius': {
    note: 'K2 — „Darbalaukio skyrius“ (ep_679_01_2)', origin: '40% 35%', css: CSS,
    screens: [E.win({ cls: 'scr1', crumb: 'Darbalaukis', sideOn: 0, sub: ['Darbalaukis', 'Papildiniai'], body: E.dash([['Puslapiai'], ['Naujienos'], ['Pranešimų juostelė'], ['Dokumentų bankas', 'dashdb'], ['Vartotojai'], ['Autoriai'], ['Navigacijos'], ['Baneriai']]) }), list('scr2', DOCS)],
    steps: [{ t: 'b1', spot: 'dashdb', pad: 6 }, { t: 'b1+0.2', cur: 'dashdb', ax: 0.3 }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.1', spot: null }],
  },
  '02-redagavimo-piestukas': {
    note: 'K3 — „Redagavimo pieštukas“ (ep_679_02_1)', origin: '30% 35%', css: CSS + ` .pen-hit { position: absolute; }`,
    screens: [site('scr1', `<div class="tw">${docsTable()}</div>`, 'Finansinių ataskaitų rinkiniai'),
      form('scr2', F.ttl('2023 m. III ketvirčio finansinė ataskaita') + F.tags(chip('Finansinių ataskaitų rinkiniai')) + F.file(frow()))],
    steps: [{ t: 'b1', spot: 'r1', pad: 4 }, { t: 'b1+0.2', cur: 'r1', ax: 0.06 }, { t: 'g1', click: true }, { t: 'g1+0.2', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null }, { t: 'b2', spot: 'fttl', pad: 6 }],
  },
  '03-dokumentu-puslapis': {
    note: 'K4 — „Dokumentų puslapis“ (ep_679_03_1)', origin: '50% 50%', css: CSS,
    screens: [site('scr1', `<div class="tvs-sdp"><div><div class="tvs-sdp-s" data-t="ssearch"><span class="ph-s">Ieškoti dokumentų</span>${E.typed('q', 'nuosta')}</div>
      <div class="all" data-t="all">${E.sdocs('Visi failai', [r('Gimnazijos nuostatai', '2025-09-01 08:30:11', '884.95 KB', '', 'hit'), r('Darbo tvarkos taisyklės', '2025-08-29 14:02:10', '226.72 KB', 'oth'), r('Mokinių elgesio taisyklės', '2025-08-29 14:05:51', '198.04 KB', 'oth'), r('Ugdymo planas 2025–2026 m. m.', '2025-08-28 10:00:00', '1.67 MB', 'oth')])}</div></div>
      <div class="tvs-sdp-c" data-t="cats"><span class="is-on">VISI FAILAI</span><span>NUOSTATAI</span><span>TVARKOS</span><span>PLANAI</span><span>ATASKAITOS</span></div></div>`)],
    steps: [{ t: 'b1', spot: 'all', pad: 8 }, { t: 'b2', spot: 'cats', pad: 8 }, { t: 'b3', spot: 'ssearch', pad: 6 }, { t: 'b3', cur: 'ssearch', ax: 0.3 }, { t: 'g1-0.05', hide: '.ph-s', dur: 0.05 }, { t: 'g1', type: 'q', dt: 0.14 },
      { t: 'b4', hide: '.oth', dur: 0.4 }, { t: 'b4+0.2', spot: 'hit', pad: 6 }, { t: 'b4+0.5', flash: '.hit' }],
  },
  '06-pavadinimas-aprasymas-url': {
    note: 'K5 — „Pavadinimas, aprašymas, URL“ (ep_679_06_1)', origin: '45% 35%', css: CSS + ` .xdb { display: inline-block; margin-left: 12px; font-size: 16px; color: #fff; background: var(--tvs-info); padding: 2px 10px; border-radius: 3px; }`,
    screens: [form('scr1', F.ttl(E.typed('ttl', 'Mokinių pasiekimų ir pažangos vertinimo tvarkos aprašas')) + F.url() + F.desc(E.typed('dsc', 'Pažangos vertinimo tvarka')) + F.file(frow()), { crumb: 'Sukurti' })],
    steps: [{ t: 'b1', spot: 'fttl', pad: 6 }, { t: 'b1', cur: 'fttl', ax: 0.3, ay: 0.75 }, { t: 'g1', type: 'ttl', dt: 0.04 },
      { t: 'b2', spot: 'fdesc', pad: 6 }, { t: 'b2', cur: 'fdesc', ax: 0.3, ay: 0.75 }, { t: 'b2+0.8', type: 'dsc', dt: 0.06 }, { t: 'b3', spot: ['fttl', 'fdesc'], pad: 8 },
      { t: 'b4', spot: 'furl', pad: 6 }, { t: 'b4+0.4', flash: '[data-t="furl"] .tvs-input' }],
  },
  '07-failo-ikelimas': {
    note: 'K6 — „Failo įkėlimas“ (ep_679_07_1)', origin: '40% 45%', css: CSS + ` .pick { left: 600px; top: 300px; width: 560px; }`,
    screens: [form('scr1', F.ttl('Gimnazijos nuostatai') + F.file(frow('up-row')), { crumb: 'Sukurti', over: `\n        <div class="tvs-os pick"><div class="tvs-os-h">Atidaryti</div><div class="tvs-os-b"><div class="tvs-fi is-sel"><b class="is-img" style="background:linear-gradient(150deg,#f3c9c7,#e5322d)"></b>gimnazijos-nuostatai.pdf</div></div></div>` })],
    steps: [{ t: 'b1', spot: 'ffile', pad: 6 }, { t: 'b1+0.2', cur: 'sel' }, { t: 'g1', click: true }, { t: 'g1+0.2', show: '.pick', rise: 14 }, { t: 'g1+1.6', hide: '.pick', dur: 0.2 },
      { t: 'b2', cur: 'upl', dur: 0.4 }, { t: 'b2+0.6', click: true }, { t: 'g2', show: '.up-row', rise: 12 }, { t: 'b3', flash: '.up-row' }],
  },
  '07-kategorijos-priskyrimas': {
    note: 'K7 — „Kategorijos priskyrimas“ (ep_679_07_2)', origin: '45% 40%', css: CSS + ` .slot { position: relative; display: inline-flex; } .slot .sug { left: 0; top: 46px; } .slot .tin { position: absolute; left: 6px; top: 50%; transform: translateY(-50%); white-space: nowrap; font-size: 21px; }
  .sug { position: absolute; z-index: 5; background: #fff; border: 1px solid #ddd; box-shadow: 0 6px 18px rgba(0,0,0,.12); width: 360px; }
  .sug div { padding: 10px 18px; font-size: 19px; } .sug div.is-hl { background: var(--tvs-info); color: #fff; }`,
    screens: [form('scr1', F.ttl('Gimnazijos nuostatai') + F.tags(`<span class="slot">${chip('Nuostatai', 'ch1')}<span class="tin t1">${E.typed('t1', 'Nuo')}</span><div class="sug sug1"><div class="is-hl" data-t="s1">Nuostatai</div><div>Nuostatų pakeitimai</div></div></span><span class="slot">${chip('Tvarkų aprašai', 'ch2')}<span class="tin t2">${E.typed('t2', 'Tvar')}</span><div class="sug sug2"><div class="is-hl" data-t="s2">Tvarkų aprašai</div></div></span>`) + F.file(frow()))],
    steps: [{ t: 'b1', spot: 'ftags', pad: 6 }, { t: 'b1+0.2', cur: 'ftags', ax: 0.08, ay: 0.55 }, { t: 'g1', type: 't1', dt: 0.15 }, { t: 'g1+0.6', show: '.sug1', rise: 6 },
      { t: 'b2', cur: 's1', dur: 0.4 }, { t: 'g2', click: true }, { t: 'g2+0.05', hide: ['.sug1', '.t1'], dur: 0.1 }, { t: 'g2+0.05', show: '.ch1', dur: 0.2 },
      { t: 'g2+0.6', type: 't2', dt: 0.12 }, { t: 'b3', show: '.sug2', rise: 6 }, { t: 'b3+0.5', cur: 's2', dur: 0.4 }, { t: 'b3+1.1', click: true }, { t: 'b3+1.15', hide: ['.sug2', '.t2'], dur: 0.1 }, { t: 'b3+1.15', show: '.ch2', dur: 0.2 }, { t: 'b3+1.6', flash: '.tvs-tags' }],
    keyframes: () => '', anim: () => [],
  },
  '08-nauja-kategorija': {
    note: 'K8 — „Nauja kategorija“ (ep_679_08_1)', origin: '40% 35%', css: CSS,
    screens: [catList('scr1'), E.win({ cls: 'scr2', crumb: `${CR}  /  Kategorijos  /  Sukurti`, sideOn: 3, ...sub(1), body: `<div class="tvs-form is-dense">
            <div class="tvs-field" data-t="cpav"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-focus">${E.typed('cp', 'Biudžeto vykdymo ataskaitų rinkiniai')}</div></div>
            <div class="tvs-field" data-t="cslug"><div class="tvs-label">Slug<span class="tvs-req">*</span></div><div class="tvs-input is-value">${E.typed('cs', 'biudzeto-vykdymo-ataskaitu-rinkiniai', { caret: false })}</div></div></div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` }),
      catList('scr3', { rows: [...CATS, ['Biudžeto vykdymo ataskaitų rinkiniai', 22, 'rnew', 'is-new newc']] })],
    steps: [{ t: 'b1', spot: 'cadd', pad: 10 }, { t: 'b1+0.2', cur: 'cadd' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'cpav', pad: 6 }, { t: 'b2', cur: 'cpav', ax: 0.3, ay: 0.75 }, { t: 'g2', type: 'cp', dt: 0.035 }, { t: 'g2', type: 'cs', dt: 0.033 }, { t: 'g2+0.6', spot: ['cpav', 'cslug'], pad: 6 },
      { t: 'b3-0.6', cur: 'save', dur: 0.4 }, { t: 'b3-0.1', click: true }, { t: 'b3', scr: 3 }, { t: 'b3+0.2', spot: 'rnew', pad: 4 }, { t: 'b3+0.4', flash: '.newc' }, { t: 'b3+0.3', cur: [1400, 820], dur: 0.8 }],
  },
  '09-kategorijos-uzrakinimas': {
    note: 'K9 — „Kategorijos užrakinimas“ (ep_679_09_1)', origin: '45% 40%', css: CSS,
    screens: [catForm('scr1', `<div class="tvs-field"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-value">Prašymai</div></div>
            <div class="tvs-field" data-t="fpw"><div class="tvs-label">Password</div><div class="tvs-input">${E.typed('pw', 'bananas')}</div></div>
            <div class="tvs-field"><div class="tvs-label">Slėpti kategoriją</div><div>${sw(false)}</div></div>`),
      site('scr2', `<div class="tw">${E.sdocs('Prašymai', [['Prašymas priimti į mokyklą', '2025-03-01 09:00:00', '120.40 KB', 'lk'], ['Prašymas dėl ugdymo namuose', '2025-03-01 09:02:10', '98.12 KB', 'lk']], { t: 'stab' })}</div>`)],
    steps: [{ t: 'b1', spot: 'fpw', pad: 6 }, { t: 'b1', zoom: 1.2 }, { t: 'b1+0.2', cur: 'fpw', ax: 0.3, ay: 0.75 }, { t: 'g1', type: 'pw', dt: 0.12 },
      { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', zoom: 1 }, { t: 'b2', cur: 'upd', dur: 0.4 }, { t: 'b2+0.5', click: true },
      { t: 'b3-0.3', scr: 2, slide: 'up' }, { t: 'b3', spot: 'stab', pad: 8 }, { t: 'b3', cur: [1400, 820], dur: 0.8 }, { t: 'b3+0.4', flash: '.tw .tvs-sdocs' }],
    keyframes: () => '', anim: () => [],
  },
  '09-kategorijos-slepimas': {
    note: 'K10 — „Kategorijos slėpimas“ (ep_679_09_2)', origin: '45% 40%', css: CSS + ` .why { opacity: 0; }`,
    screens: [catForm('scr1', `<div class="tvs-field"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-value">Prašymai</div></div>
            <div class="tvs-field"><div class="tvs-label">Password</div><div class="tvs-input"></div></div>
            <div class="tvs-field" data-t="fhide"><div class="tvs-label">Slėpti kategoriją</div><div class="sw-slot" data-t="sw">${sw(false, 'sa')}${sw(true, 'sb')}</div><div class="tvs-help why">Paslėpta kategorija nebus rodoma bendrame kategorijų sąraše.</div></div>`),
      catList('scr2', { rows: CATS.slice(0, 3) })],
    steps: [{ t: 'b1', spot: 'fhide', pad: 6 }, { t: 'b1', cur: 'sw', ax: 0.75 }, { t: 'g1', click: true }, { t: 'g1+0.05', hide: '.sa', dur: 0.15 }, { t: 'g1+0.05', show: '.sb', dur: 0.15 }, { t: 'g1+0.3', show: '.why', dur: 0.3 },
      { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd', dur: 0.4 }, { t: 'g2-0.2', click: true }, { t: 'g2', scr: 2 }, { t: 'b3', spot: 'cadd', pad: 0 }, { t: 'b3+0.1', spot: null }],
  },
  '10-uzrakintos-atrakinimas': {
    note: 'K11 — „Užrakintos atrakinimas“ (ep_679_10_1)', origin: '40% 40%', css: CSS + ` .lk .is-ico:first-child { visibility: hidden; } .lkk { position: absolute; margin-left: -48px; }`,
    screens: [site('scr1', `<div class="tw">${E.sdocs('Nuostatai', [r('Gimnazijos nuostatai', '2025-09-01 08:30:11', '884.95 KB', 'r1', 'row1'), r('Nuostatų pakeitimai 2024', '2024-06-12 11:00:00', '120.00 KB')], { t: 'stab' })}
      <div class="tvs-unlock un" data-t="un"><div class="tvs-sdp-s">${E.typed('pw', '•••••••')}</div><b data-t="unb">ATRAKINTI</b></div></div>`)],
    css2: '',
    steps: [{ t: 'b1', spot: 'stab', pad: 8 }, { t: 'b2', spot: 'row1', pad: 4 }, { t: 'b2+0.4', cur: 'row1', ax: 0.03 }, { t: 'b2+1.4', click: true }, { t: 'b2+1.5', show: '.un', rise: 8 },
      { t: 'b3', spot: 'un', pad: 6 }, { t: 'b3', cur: 'un', ax: 0.3 }, { t: 'b3+0.1', type: 'pw', dt: 0.08 }, { t: 'g1-0.4', cur: 'unb', dur: 0.3 }, { t: 'g1-0.1', click: true },
      { t: 'g1+0.1', hide: '.un', dur: 0.2 }, { t: 'g1+0.2', spot: 'stab', pad: 8 }, { t: 'g1+0.3', flash: '.tw .tvs-sdocs' }],
    anim: (T) => [['.tw .tvs-sdocs-tr:not(.is-group) .is-ico:first-child', `spyna 0.01s step-end ${T('g1+0.15')}s both`]],
    keyframes: () => '  @keyframes spyna { from { background: #fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23666\' stroke-width=\'2\'%3E%3Crect x=\'5\' y=\'11\' width=\'14\' height=\'10\' rx=\'2\'/%3E%3Cpath d=\'M8 11V7a4 4 0 0 1 8 0v4\'/%3E%3C/svg%3E") center/18px no-repeat; color: transparent; } to { background: transparent; color: inherit; } }',
  },
  '11-paieska-ir-filtras': {
    note: 'K12 — „Paieška ir filtras“ (ep_679_11_1)', origin: '40% 30%', css: CSS + ` .scr2 .ph0 { display: none; }`,
    screens: [list('scr1', DOCS, { ts: 'fs', tc: 'fc', tf: 'ff', search: `<span class="ph0 ph-q">Paieška</span>${E.typed('q', 'tvarka')}`, cat: 'Tvarkų aprašai' }),
      list('scr2', ['Mokinių pasiekimų ir pažangos vertinimo tvarkos aprašas', 'Darbo tvarkos taisyklės'], { search: 'tvarka', cat: 'Tvarkų aprašai', tv: 'fv' }), list('scr3', DOCS)],
    steps: [{ t: 'b1', spot: 'fs', pad: 6 }, { t: 'b1', cur: 'fs', ax: 0.5 }, { t: 'g1-0.05', hide: '.ph-q', dur: 0.05 }, { t: 'g1', type: 'q', dt: 0.12 },
      { t: 'b2', spot: 'fc', pad: 6 }, { t: 'b2', cur: 'fc', ax: 0.8 }, { t: 'b2+0.8', click: true }, { t: 'b2+1.0', hide: '.scr1 .c-ph', dur: 0.05 }, { t: 'b2+1.0', show: '.scr1 .c-v', dur: 0.05 },
      { t: 'b3', spot: 'ff', pad: 8 }, { t: 'b3', cur: 'ff', dur: 0.5 }, { t: 'g2', click: true }, { t: 'g2+0.1', scr: 2 }, { t: 'g2+0.2', spot: 'list', pad: 6 },
      { t: 'b4', spot: 'fv', pad: 8 }, { t: 'b4', cur: 'fv', dur: 0.5 }, { t: 'b4+0.8', click: true }, { t: 'b4+0.9', scr: 3 }, { t: 'b4+1.0', spot: 'list', pad: 6 }],
  },
  '12-dokumento-id': {
    note: 'K13 — „Dokumento ID“ (ep_679_12_1)', origin: '30% 10%', css: CSS + ` .brw { position: absolute; inset: 0; } .brw .br-in { position: absolute; inset: 60px 0 0; } .brw .br-in > .scr { position: absolute; inset: 0; } .idm { border-radius: 3px; padding: 0 2px; }
  .cats { position: absolute; right: 60px; top: 150px; width: 380px; z-index: 6; } .cats .tvs-node { font-size: 18px; }`,
    screens: [E.scr('scr1 brw', `${E.chrome('<span class="is-dim">https://demomokykla.lt/admin/dokumentubankas/edit/</span><span class="idm" data-t="id">746</span>', 'omni')}<div class="br-in">${form('in', F.ttl('Gimnazijos nuostatai') + F.tags(chip('Nuostatai')) + F.file(frow()))}</div>
        <div class="tvs-tree cats" data-t="cats" style="background:#fff;padding:10px;box-shadow:0 8px 24px rgba(0,0,0,.15)"><div class="tvs-node"><div class="tvs-node-handle"></div>Nuostatai<span class="tvs-id">(#13)</span></div><div class="tvs-node"><div class="tvs-node-handle"></div>Tvarkų aprašai<span class="tvs-id">(#14)</span></div><div class="tvs-node"><div class="tvs-node-handle"></div>Prašymai<span class="tvs-id">(#21)</span></div></div>`)],
    steps: [{ t: 'b1', spot: 'fttl', pad: 6 }, { t: 'b2', spot: 'id', pad: 8 }, { t: 'b2', zoom: 1.6 }, { t: 'b2+0.2', cur: 'id', ax: 0 }, { t: 'g1', click: true }, { t: 'g1', cur: 'id', ax: 1, dur: 0.5 },
      { t: 'b3', zoom: 1 }, { t: 'b3', show: '.cats', rise: 10 }, { t: 'b3+0.2', spot: 'cats', pad: 8 }, { t: 'b3+0.4', cur: [1300, 820], dur: 0.8 }],
    anim: (T) => [['.idm', `pazymeti 0.5s linear ${T('g1')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { background: linear-gradient(90deg, #b3d4fc 0 0%, transparent 0); } to { background: linear-gradient(90deg, #b3d4fc 0 100%, transparent 0); } }',
  },
  '13-patikrinimo-data': {
    note: 'K14 — „Patikrinimo data“ (ep_679_13_1)', origin: '45% 45%', css: CSS,
    screens: [form('scr1', F.ttl('Mokinių priėmimo tvarkos aprašas') + F.file(frow()) + F.date(E.typed('d', '2027-04-20 12:00', { caret: false })) + F.com(E.typed('c', 'Pakeisti prieš naujus mokslo metus'))),
      E.win({ cls: 'scr2', crumb: 'Darbalaukis', sideOn: 0, sub: ['Darbalaukis', 'Papildiniai'], body: `<div class="tvs-remind" data-t="rem"><div class="tvs-remind-h">Dokumentų priminimai</div>
          <div class="tvs-remind-r is-due due"><span>Mokinių priėmimo tvarkos aprašas</span><span>2027-04-20 12:00</span><span>Pakeisti prieš naujus mokslo metus</span></div>
          <div class="tvs-remind-r"><span>Darbo tvarkos taisyklės</span><span>2027-09-01 09:00</span><span>Peržiūrėti su profsąjunga</span></div></div>` })],
    steps: [{ t: 'b1', spot: 'fdate', pad: 6 }, { t: 'b1', cur: 'fdate', ax: 0.4, ay: 0.75 }, { t: 'g1', click: true }, { t: 'g1+0.2', type: 'd', dt: 0.06 },
      { t: 'b2', spot: 'fcom', pad: 6 }, { t: 'b2', cur: 'fcom', ax: 0.3, ay: 0.75 }, { t: 'g2', type: 'c', dt: 0.04 },
      { t: 'b3-0.8', cur: 'upd', dur: 0.4 }, { t: 'b3-0.3', click: true }, { t: 'b3', scr: 2, slide: 'right' }, { t: 'b3+0.2', spot: 'rem', pad: 8 }, { t: 'b3+0.8', flash: '.due' }, { t: 'b3+0.3', cur: [1400, 820], dur: 0.8 }],
  },
  '14-dokumentu-rikiavimas': {
    note: 'K15 — „Dokumentų rikiavimas“ (ep_679_14_1)', origin: '40% 35%', css: CSS + ` .scr1 .tvs-handle { visibility: hidden; }`,
    screens: [list('scr1', ['Mokinių elgesio taisyklės', 'Darbo tvarkos taisyklės', 'Mokinio uniformos dėvėjimo taisyklės', 'Gimnazijos nuostatai', 'Ugdymo planas 2025–2026 m. m.'], { tc: 'fc', tf: 'ff', cat: 'Nuostatai >> Taisyklės' }),
      list('scr2', ['Mokinių elgesio taisyklės', 'Darbo tvarkos taisyklės', 'Mokinio uniformos dėvėjimo taisyklės'], { cat: 'Nuostatai >> Taisyklės', rowT: (i) => ['d1', 'd2', 'd3'][i], rowC: (i) => ['', 'mv2', 'mv3'][i],
        extra: '' })],
    steps: [{ t: 'b1', spot: 'fc', pad: 6 }, { t: 'b1', cur: 'fc', ax: 0.8 }, { t: 'b1+0.6', click: true }, { t: 'b1+0.8', hide: '.scr1 .c-ph', dur: 0.05 }, { t: 'b1+0.8', show: '.scr1 .c-v', dur: 0.05 },
      { t: 'g1-0.5', cur: 'ff', dur: 0.4 }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2 },
      { t: 'b2', spot: 'list', pad: 6 }, { t: 'b2+1.0', spot: { ref: 'd1', dw: (R) => -(R.d1.w - 50) }, pad: 4 },
      { t: 'b3', spot: 'd3', pad: 4 }, { t: 'b3+0.2', cur: 'd3', ax: 0.02 }, { t: 'g2', cur: { ref: 'd3', ax: 0.02, dy: (R) => -(R.d3.y - R.d2.y) }, dur: 1.0 }, { t: 'g2', spot: { ref: 'd3', dy: (R) => -(R.d3.y - R.d2.y) }, pad: 4 },
      { t: 'b4', spot: 'list', pad: 6 }, { t: 'g4-0.5', cur: { ref: 'list', ax: 0.1, ay: 1, dy: 34 }, dur: 0.4 }, { t: 'g4', click: true }, { t: 'g4', flash: '.lw .tvs-table' }],
    anim: (T) => [['.mv3', `pakelti 1.0s cubic-bezier(.45,0,.2,1) ${T('g2')}s both`], ['.mv2', `nuleisti 1.0s cubic-bezier(.45,0,.2,1) ${T('g2')}s both`]],
    keyframes: (T, D, R) => `  @keyframes pakelti { from { transform: none; } 15% { box-shadow: 0 8px 22px rgba(0,0,0,.18); } to { transform: translateY(-${R.d3.y - R.d2.y}px); box-shadow: 0 8px 22px rgba(0,0,0,.18); } }
  @keyframes nuleisti { from { transform: none; } to { transform: translateY(${R.d3.y - R.d2.y}px); } }`,
  },
  '15-sintakses-kopijavimas': {
    note: 'K16 — „Sintaksės kopijavimas“ (ep_679_15_1)', origin: '50% 35%', css: CSS + ` .s-table .tvs-th, .s-table .tvs-row { grid-template-columns: 30px 1fr 380px 340px; } .syn { font-family: 'SF Mono', Menlo, monospace; font-size: 15px; display: flex; align-items: center; gap: 8px; }
  .toast { left: 1150px; top: 186px; }`,
    screens: [E.win({ cls: 'scr1', crumb: `${CR}  /  Dokumentai`, sideOn: 3, ...sub(0), body: `<div class="tvs-table s-table" data-t="stab"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span>Failas</span><span>Kategorijos</span></div>
            ${[['Gimnazijos nuostatai', 704, 'Nuostatai', 13, 't'], ['Darbo tvarkos taisyklės', 705, 'Tvarkų aprašai', 14], ['Mokinių elgesio taisyklės', 706, 'Tvarkų aprašai', 14]].map(([n, id, c, cid, t]) => `<div class="tvs-row"><div class="tvs-check"></div><div>${n}</div><div class="syn"><span class="tvs-btn is-tiny is-violet"${t ? ' data-t="copy"' : ''}>${S.copy.replace('currentColor', '#fff')}</span>{{dokumentubankas_file(${id})}}</div><div class="syn"><span class="tvs-btn is-tiny is-violet">${S.copy.replace('currentColor', '#fff')}</span>{{dokumentubankas_category(${cid})}}</div></div>`).join('')}
          </div>`, extra: '\n        <div class="tvs-toast toast">Nukopijuota</div>' })],
    steps: [{ t: 'b1', spot: 'stab', pad: 6 }, { t: 'b1+0.3', cur: 'copy' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.toast', rise: 6 }, { t: 'b2', spot: 'copy', pad: 8 }, { t: 'b2+0.3', flash: '[data-t="copy"]' }],
  },
});
