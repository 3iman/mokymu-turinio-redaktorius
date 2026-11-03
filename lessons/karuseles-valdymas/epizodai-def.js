#!/usr/bin/env node
// „Karuselės valdymas“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const fld = (l, inner, t) => `<div class="tvs-field"${t ? ` data-t="${t}"` : ''}><div class="tvs-label">${l}</div>${inner}</div>`;
const sel = (v) => `<div class="tvs-select is-value">${v}</div>`;
const base = (extra = '') => `${fld('Title', '<div class="tvs-input is-value">Mokykla, kurioje kiekvienas atranda savo kelią</div>')}`;
const form = (cls, fields, o = {}) => E.win({ cls, crumb: 'Karuselė  /  Slides  /  Redaguoti', sideOn: 1, sub: ['Slides'], body: `${o.pre || ''}<div class="tvs-form is-dense">${fields}</div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save })}</div>`, extra: o.over || '' });
E.build(__dirname, {
  '04-srifto-dydziai': {
    note: 'K2 — „Šrifto dydžiai“ (ep_711_04_1)', origin: '40% 45%',
    css: `.ph { position: absolute; right: 70px; top: 140px; z-index: 6; } .three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; } .three .tvs-field + .tvs-field { border-top: 0; }`,
    screens: [form('scr1', base() + `<div class="three">${fld('Title Font Size', sel('48px'), 'f1')}${fld('Mobile Title Font Size', sel('28px'), 'f2')}${fld('Description Font Size', sel('20px'), 'f3')}</div>` + fld('Description', '<div class="tvs-input is-value">Ugdome smalsius ir atsakingus žmones.</div>'),
      { over: `\n        <div class="tvs-phone ph" data-t="ph"><div class="tvs-car"><div class="tvs-car-t">Mokykla, kurioje kiekvienas atranda savo kelią</div><div class="tvs-car-d">Ugdome smalsius ir atsakingus žmones.</div></div></div>` })],
    steps: [{ t: 'b1', spot: 'f1', pad: 6 }, { t: 'b2', spot: 'f2', pad: 6 }, { t: 'b3', spot: 'f3', pad: 6 }, { t: 'b4', show: '.ph', rise: 20 }, { t: 'b4', spot: 'ph', pad: 10 }],
  },
  '05-teksto-spalva': {
    note: 'K3 — „Teksto spalva“ (ep_711_05_1)', origin: '40% 50%',
    css: `.pal { position: absolute; z-index: 6; } .sw-new { position: absolute; left: 0; } .sw-wrap { position: relative; display: inline-block; width: 30px; height: 30px; vertical-align: middle; margin-right: 10px; } .sw-wrap .tvs-swatch { position: absolute; left: 0; top: 0; margin: 0; }
  .car2 { height: 520px; } .v2 { margin-left: -4.6em; } .car2 .tvs-car-t { color: #fff; } .ct2 { color: #1d2b3a !important; }`,
    screens: [form('scr1', base() + fld('Text Color', `<div class="tvs-input is-value" data-t="tc"><span class="sw-wrap"><span class="tvs-swatch" style="background:#ffffff"></span><span class="tvs-swatch sw-new" style="background:#1d2b3a"></span></span><span class="v1">#ffffff</span><span class="v2">#1d2b3a</span></div>
              <div style="position:relative;height:0"><div class="tvs-palette pal" data-t="pal"><i style="background:#ffffff;border:1px solid #ddd"></i><i style="background:#f3e3b3"></i><i style="background:#e5322d"></i><i style="background:#3363ab"></i><i style="background:#16a34a"></i><i style="background:#1d2b3a" data-t="pick"></i></div></div>`, 'ftc'), { pre: '<div class="tvs-alert saved">Įrašas atnaujintas.</div>' }),
      E.site('scr2', `<div class="tvs-car car2" data-t="car"><div class="tvs-car-t ct2">Mokykla, kurioje kiekvienas atranda savo kelią</div><div class="tvs-car-d ct2">Ugdome smalsius ir atsakingus žmones.</div></div>`, { title: '' })],
    steps: [{ t: 'b1', spot: 'ftc', pad: 6 }, { t: 'b1+0.2', cur: 'tc', ax: 0.1 }, { t: 'g1', click: true }, { t: 'g1+0.05', show: '.pal', dur: 0.15 }, { t: 'g1+0.2', cur: 'pick', dur: 0.5 }, { t: 'g1+0.9', click: true },
      { t: 'g1+0.95', hide: ['.pal', '.v1'], dur: 0.1 }, { t: 'g1+0.95', show: ['.sw-new', '.v2'], dur: 0.1 },
      { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd', dur: 0.5 }, { t: 'g2', click: true }, { t: 'g3', show: '.saved', dur: 0.2 },
      { t: 'b3-0.3', scr: 2, slide: 'up' }, { t: 'b3-0.3', spot: null }, { t: 'b3', spot: 'car', pad: 8 }, { t: 'b3', cur: [1400, 820], dur: 0.8 }],
  },
});
