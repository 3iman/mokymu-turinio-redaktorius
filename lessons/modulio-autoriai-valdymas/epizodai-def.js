#!/usr/bin/env node
// „Autorių modulio valdymas“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const AU = [['Žemaitė', 'Lietuvių kalbos mokytoja'], ['Jonas Basanavičius', 'Istorijos mokytojas']];
const list = (cls, extra = '', alert = '') => E.win({ cls, crumb: 'Autoriai', sideOn: 5, sub: ['Autoriai'], body: `${alert}<div>${E.btn('Pridėti autorių', { icon: S.plus, t: 'add' })}</div>
          <div class="tvs-table a-table" data-t="atab"><div class="tvs-th"><div class="tvs-check"></div><span>Full Name</span><span>Position</span></div>${extra}${AU.map(([n, p]) => `<div class="tvs-row"><div class="tvs-check"></div><div>${n}</div><div>${p}</div></div>`).join('')}</div>` });
const fld = (l, inner, t) => `<div class="tvs-field"${t ? ` data-t="${t}"` : ''}><div class="tvs-label">${l}</div>${inner}</div>`;
const form = (cls, fields, save = 'Išsaugoti') => E.win({ cls, crumb: 'Autoriai  /  Pridėti autorių', sideOn: 5, sub: ['Autoriai'], body: `<div class="tvs-form is-dense">${fields}</div>
          <div class="tvs-form-foot">${E.btn(save, { cls: 'is-tiny', icon: S.save, t: 'save' })}${E.btn('Išsaugoti ir baigti', { cls: 'is-tiny', icon: S.save, t: 'save2' })}</div>` });
const CSS = `.a-table .tvs-th, .a-table .tvs-row { grid-template-columns: 30px 1fr 1fr; } .btns { display: flex; gap: 8px; margin-bottom: 8px; }
  .crop-wrap { position: relative; width: 300px; overflow: hidden; } .crop-wrap .tvs-thumb { width: 300px; height: 400px; display: block; } .cropbox { position: absolute; left: 40px; top: 40px; width: 220px; height: 300px; border: 3px dashed #fff; box-shadow: 0 0 0 2000px rgba(0,0,0,.45); opacity: 0; }
  .area { height: 120px; align-items: flex-start; padding-top: 10px; white-space: pre-line; line-height: 1.5; } .area .tvs-typed { white-space: pre-line; }`;
E.build(__dirname, {
  '01-nuotraukos-apkirpimas': {
    note: 'K1 — „Nuotraukos apkirpimas“ (ep_704_01_1)', origin: '35% 50%', css: CSS,
    screens: [form('scr1', fld('Full Name<span class="tvs-req">*</span>', '<div class="tvs-input is-value">Vincas Kudirka</div>') + fld('Nuotrauka', `<div class="btns">${E.btn('Select Image', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny' })}${E.btn('Crop', { cls: 'is-tiny is-orange', t: 'crop' })}</div><div class="crop-wrap" data-t="cw"><span class="tvs-thumb"></span><div class="cropbox" data-t="cb"></div></div>`, 'fimg'))],
    steps: [{ t: 'b1', spot: 'fimg', pad: 6 }, { t: 'b1+0.2', cur: 'crop' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.cropbox', dur: 0.3 },
      { t: 'b2', spot: 'cw', pad: 8 }, { t: 'b2+0.2', cur: 'cb', ax: 0.95, ay: 0.95 }, { t: 'g2', cur: 'cb', ax: 0.8, ay: 0.7, dur: 0.8 },
      { t: 'b3', cur: 'save2', dur: 0.5 }, { t: 'b3', spot: 'save2', pad: 8 }, { t: 'g4', click: true }, { t: 'g5', flash: '.crop-wrap' }],
    anim: (T) => [['.cropbox', `apkarpyti 0.8s cubic-bezier(.45,0,.2,1) ${T('g2')}s both`]],
    keyframes: () => '  @keyframes apkarpyti { from { width: 220px; height: 300px; } to { width: 180px; height: 220px; } }',
  },
  '04-naujas-autorius': {
    note: 'K3 — „Naujas autorius“ (ep_704_04_1)', origin: '40% 35%', css: CSS,
    screens: [list('scr1'), form('scr2', fld('Full Name<span class="tvs-req">*</span>', `<div class="tvs-input is-focus">${E.typed('n', 'Vincas Kudirka')}</div>`, 'fn') + fld('Position<span class="tvs-req">*</span>', `<div class="tvs-input">${E.typed('p', 'Direktorius')}</div>`, 'fp') + fld('Qualification', '<div class="tvs-input"></div>') + fld('Email', '<div class="tvs-input"></div>'))],
    steps: [{ t: 'b1', spot: 'add', pad: 10 }, { t: 'b1', cur: 'add' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'fn', pad: 6 }, { t: 'b2', cur: 'fn', ax: 0.3, ay: 0.8 }, { t: 'g2', type: 'n', dt: 0.07 }, { t: 'b3', spot: 'fp', pad: 6 }, { t: 'b3', cur: 'fp', ax: 0.3, ay: 0.8 }, { t: 'g3', type: 'p', dt: 0.08 }],
  },
  '04-keli-autoriai': {
    note: 'K4 — „Keli autoriai“ (ep_704_04_2)', origin: '40% 40%', css: CSS,
    screens: [form('scr1', fld('Full Name<span class="tvs-req">*</span>', `<div class="tvs-input is-focus area">${E.typed('n', 'Vincas Kudirka\nMarija Pečkauskaitė\nJonas Biliūnas')}</div>`, 'fn') + fld('Position<span class="tvs-req">*</span>', `<div class="tvs-input area">${E.typed('p', 'Direktorius\nPavaduotoja\nInformatikos mokytojas')}</div>`, 'fp')),
      list('scr2', [['Vincas Kudirka', 'Direktorius'], ['Marija Pečkauskaitė', 'Pavaduotoja'], ['Jonas Biliūnas', 'Informatikos mokytojas']].map(([n, p]) => `<div class="tvs-row is-new nw"><div class="tvs-check"></div><div>${n}</div><div>${p}</div></div>`).join(''), '<div class="tvs-alert">Autoriai sukurtas sėkmingai.</div>')],
    steps: [{ t: 'b1', spot: 'fn', pad: 6 }, { t: 'b1', cur: 'fn', ax: 0.3, ay: 0.3 }, { t: 'g1', type: 'n', dt: 0.05 }, { t: 'b2', spot: 'fp', pad: 6 }, { t: 'b2', cur: 'fp', ax: 0.3, ay: 0.3 }, { t: 'g2', type: 'p', dt: 0.04 },
      { t: 'b3-0.6', cur: 'save', dur: 0.4 }, { t: 'g3', click: true }, { t: 'g3+0.15', scr: 2 }, { t: 'g4', spot: 'atab', pad: 6 }, { t: 'g4', flash: '.nw' }, { t: 'g4', cur: [1400, 820], dur: 0.8 }],
  },
});
