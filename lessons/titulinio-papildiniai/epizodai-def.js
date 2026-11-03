#!/usr/bin/env node
// „Titulinio papildiniai“ — TVS epizodai (epizodai.js): zona „Home“, jungiklis, perrikiavimas, greitoji nuoroda.
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const sw = (yes, cls = '') => yes ? `<span class="tvs-switch is-yes ${cls}"><span>Yes</span><span></span></span>` : `<span class="tvs-switch is-no ${cls}"><span></span><span>No</span></span>`;
const crumb = 'Papildiniai  /  Home';
const row = (n, yes, { t = '', cls = '', edit = '' } = {}) => `<div class="tvs-row ${cls}"${t ? ` data-t="${t}"` : ''}><div class="tvs-handle"${t ? ` data-t="${t}h"` : ''}>${I.handle}</div><div class="tvs-check"></div><div class="tvs-title">${n}</div><div>${sw(yes)}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange"${edit ? ` data-t="${edit}"` : ''}>${S.edit}Redaguoti</span></div></div>`;
const table = (rows) => `<div class="tvs-table pz-table"><div class="tvs-th"><span></span><div class="tvs-check"></div><span>Pavadinimas</span><span>Įjungtas</span><span></span></div>${rows}<div class="tvs-foot">${E.btn('Perrikiuoti', { cls: 'is-small', t: 'reorder', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M5 4v16M2 17l3 3 3-3M11 6h10M11 11h7M11 16h4"/></svg>' })}</div></div>`;
const zoneWin = (cls, rows, extra = '') => E.win({ cls, crumb, sideOn: 4, sub: ['Home', 'Sidebar', 'Footer'], body: `${extra}\n          ${table(rows)}` });
const form = (cls, title, fields, yes = true) => E.win({ cls, crumb: `${crumb}  /  ${title}  /  Redaguoti`, sideOn: 4, sub: ['Home', 'Sidebar', 'Footer'], body: `
          <div class="tvs-form is-dense">
            <div class="tvs-field"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-value">${title}</div></div>
            <div class="tvs-field"><div class="tvs-label">View</div><div class="tvs-select">default</div></div>
            <div class="tvs-field" data-t="fsw"><div class="tvs-label">Įjungtas/Išjungtas</div><div class="sw-slot" data-t="sw">${sw(yes, 'sw-a')}${sw(!yes, 'sw-b')}</div></div>
            ${fields}
          </div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}${E.btn('Atšaukti', { cls: 'is-tiny is-grey' })}</div>` });

const ROWS1 = [['Pamokų laikas', true], ['Google translate', true, { t: 'rgt', edit: 'egt' }], ['Nav Black', true], ['Facebook fanbox', true], ['Quick link', true, { t: 'rql', edit: 'eql' }]];
const ROWS2 = [['Pamokų laikas', true, { t: 'r1' }], ['Google translate', false, { t: 'r2' }], ['Nav Black', true, { t: 'r3' }], ['Facebook fanbox', true, { t: 'r4' }], ['Quick link', true, { t: 'rql', cls: 'ql-row' }]];
const site = (cls, side) => E.site(cls, `
          <div class="pz-site"><div><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div></div>
          <div class="tvs-sside" data-t="side">${side}</div></div>`, { title: 'Naujienos' });
const hours = '<div class="tvs-sside-b"><div class="tvs-sside-h">Pamokų laikas</div><div class="tvs-sside-row"><span>1 pamoka</span><span>8.00–8.45</span></div><div class="tvs-sside-row"><span>2 pamoka</span><span>8.55–9.40</span></div></div>';
const ql = (cls = '') => `<div class="tvs-sside-img ${cls}" data-t="qlimg">Priėmimas 2027</div>`;
const fb = '<div class="tvs-sside-b"><div class="tvs-sside-h">Facebook</div><div class="tvs-spage-card" style="height:90px"><i style="height:90px"></i></div></div>';

const PZ_CSS = `
  .pz-table .tvs-th, .pz-table .tvs-row { grid-template-columns: 44px 36px 1fr 160px 200px; }
  .sw-slot { position: relative; height: 42px; } .sw-slot .tvs-switch { position: absolute; left: 0; top: 0; } .sw-b { opacity: 0; }
  .pz-site { display: grid; grid-template-columns: 1fr 420px; gap: 34px; }
  .pz-site .tvs-spage-cards { grid-template-columns: 1fr 1fr; }`;

E.build(__dirname, {
  '03-jungiklis-ir-tvarka': {
    note: 'Kadras 1 — „Jungiklis ir tvarka“ (ep_907_03_1): „Google translate“ → „No“ → „Quick link“ aukštyn → „Perrikiuoti“ → svetainė',
    origin: '45% 40%',
    screens: [zoneWin('scr1', ROWS1.map(([n, y, o]) => row(n, y, o)).join('')), form('scr2', 'Google translate', ''), zoneWin('scr3', ROWS2.map(([n, y, o]) => row(n, y, o)).join(''), '<div class="tvs-alert saved">Papildinys išsaugotas.</div>'),
              site('scr4', `${ql('ql-up')}${hours}${fb}`)],
    css: PZ_CSS,
    steps: [
      { t: 'b1', spot: 'rgt', pad: 4 }, { t: 'b1+0.3', cur: 'egt' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'fsw', pad: 6 }, { t: 'b2', cur: 'sw', ax: 0.75 }, { t: 'b2+1.0', click: true }, { t: 'b2+1.05', hide: '.scr2 .sw-a', dur: 0.15 }, { t: 'b2+1.05', show: '.scr2 .sw-b', dur: 0.15 },
      { t: 'g2-0.6', spot: 'save', pad: 10 }, { t: 'g2-0.7', cur: 'save' }, { t: 'g2', click: true },
      { t: 'g2+0.2', scr: 3 }, { t: 'g2+0.2', spot: null },
      { t: 'b3', spot: 'rqlh', pad: 6 }, { t: 'b3+0.2', cur: 'rqlh' },
      { t: 'g3', cur: { ref: 'rqlh', dy: (R) => -(R.rql.y - R.r2.y) }, dur: 0.7 }, { t: 'g3', spot: { ref: 'rql', dy: (R) => -(R.rql.y - R.r2.y) }, pad: 4 },
      { t: 'g5-0.35', spot: 'reorder', pad: 8 }, { t: 'g5-0.35', cur: 'reorder', dur: 0.3 }, { t: 'g5', click: true },
      { t: 'b4-0.4', scr: 4, slide: 'up' }, { t: 'b4-0.4', spot: null }, { t: 'b4', cur: [1380, 820], dur: 0.8 }, { t: 'b4+0.2', spot: 'side', pad: 10 }, { t: 'g6', flash: '.ql-up' },
    ],
    anim: (T, D, R) => {
      const h = R.r2.y - R.r1.y;   // eilutės aukštis
      return [['.ql-row', `pakelti 0.7s cubic-bezier(.45,0,.2,1) ${T('g3')}s both`], ['.scr3 .tvs-row[data-t="r2"], .scr3 .tvs-row[data-t="r3"], .scr3 .tvs-row[data-t="r4"]', `nuleisti 0.7s cubic-bezier(.45,0,.2,1) ${T('g3')}s both`],
        ['.scr3 .saved', `dingti 0.3s linear ${T('b3-0.5')}s both`]];
    },
    keyframes: (T, D, R) => {
      const h = R.r2.y - R.r1.y, up = R.rql.y - R.r2.y;
      return `  @keyframes pakelti { from { transform: none; box-shadow: none; } 15% { box-shadow: 0 8px 22px rgba(0,0,0,.18); } to { transform: translateY(-${up}px); box-shadow: 0 8px 22px rgba(0,0,0,.18); } }
  @keyframes nuleisti { from { transform: none; } to { transform: translateY(${h}px); } }
  @keyframes dingti { from { opacity: 1; } to { opacity: 0; } }`;
    },
  },
  '05-greitoji-nuoroda': {
    note: 'Kadras 2 — „Greitoji nuoroda“ (ep_907_05_1): „Quick link“ → „link“ /priemimas → „Image“ įkėlimas → svetainės šoninė juosta',
    origin: '45% 45%',
    screens: [zoneWin('scr1', ROWS1.map(([n, y, o]) => row(n, y, o)).join('')),
      form('scr2', 'Quick link', `
            <div class="tvs-field" data-t="flink"><div class="tvs-label">link</div><div class="tvs-input is-focus">${E.typed('link', '/priemimas')}</div></div>
            <div class="tvs-field" data-t="fimg"><div class="tvs-label">Image</div><div class="btns">${E.btn('Select Image', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny', t: 'upl' })}</div>
              <div class="tvs-frow up-row"><span class="tvs-thumb is-wide"></span><div class="tvs-fmeta"><span class="tvs-fname">priemimas-2027.jpg</span><span class="tvs-fpath">local://papildiniai/priemimas-2027.jpg</span><span class="tvs-badge">800 x 400</span></div></div></div>`),
      site('scr3', `${hours}${ql('ql-new')}${fb}`)],
    css: PZ_CSS + `
  .btns { display: flex; gap: 8px; margin-bottom: 6px; }
  .up-row .tvs-thumb.is-wide { width: 72px; height: 40px; }`,
    steps: [
      { t: 'b1', spot: 'rql', pad: 4 }, { t: 'b1+0.3', cur: 'eql' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'flink', pad: 6 }, { t: 'b2', cur: 'flink', ax: 0.3, ay: 0.75 }, { t: 'g2', type: 'link', dt: 0.1 },
      { t: 'b3', spot: 'fimg', pad: 6 }, { t: 'b3+0.2', cur: 'upl' }, { t: 'g3', click: true }, { t: 'g3+0.1', show: '.up-row', rise: 10 },
      { t: 'g4-0.45', cur: 'save', dur: 0.4 }, { t: 'g4-0.4', spot: 'save', pad: 10 }, { t: 'g4', click: true },
      { t: 'b4-0.4', scr: 3, slide: 'up' }, { t: 'b4-0.4', spot: null }, { t: 'b4', cur: [1380, 820], dur: 0.8 }, { t: 'b4+0.2', spot: 'qlimg', pad: 10 }, { t: 'b4+0.2', show: '.ql-new', rise: 14 }, { t: 'g5', flash: '.ql-new' },
    ],
  },
});
