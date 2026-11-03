#!/usr/bin/env node
// „Nuorodų valdymas“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const cell = (cls = '', name = '', t = '') => `<div class="tvs-logo-c"${t ? ` data-t="${t}"` : ''}>${cls === 'ico' ? '<i>✎</i>' : `<b class="${cls}"></b>`}<span>${name}</span></div>`;
const site1 = E.site('scr1', `
          <div class="scroll">
          <div class="tvs-sweb-p">Svetainės, kuriose rasite daugiau informacijos apie mokymąsi ir pagalbą.</div><br>
          <div class="tvs-logos" data-t="logos">
            <div class="row3" data-t="row1">${cell('', 'Švietimo portalas', 'c1')}${cell('is-2', 'Savivaldybė')}${cell('is-3', 'Biblioteka', 'c3')}</div>
            <div class="row3">${cell('is-3', 'Muziejus')}${cell('', 'Sporto centras')}${cell('is-2', 'Jaunimo centras')}</div>
            <div class="row3" data-t="row3">${cell('is-2', 'Karjeros centras')}${cell('ico', 'El. dienynas', 'c8')}${cell('', 'Mokinių taryba')}</div>
          </div></div>`, { title: 'Naudingos nuorodos', on: 1, nav: ['Apie mokyklą', 'Nuorodos', 'Mokiniams', 'Tėvams', 'Kontaktai'] });

const crumb = 'Nuorodų modulis  /  Nuorodos  /  Pridėti';
const form = E.win({ cls: 'scr1', crumb, sideOn: 3, sub: ['Nuorodos', 'Kategorijos'], body: `
          <div class="tvs-form is-dense">
            <div class="tvs-field"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-value">Demo partneris</div></div>
            <div class="tvs-field" data-t="flogo"><div class="tvs-label">Logotipas</div><div class="btns">${E.btn('Select Image', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny', t: 'upl' })}</div>
              <div class="tvs-frow up-row"><span class="logo-thumb"></span><div class="tvs-fmeta"><span class="tvs-fname">demo-partneris.png</span><span class="tvs-fpath">local://nuorodos/demo-partneris.png</span><span class="tvs-badge">400 x 160</span></div></div></div>
            <div class="tvs-field" data-t="fcat"><div class="tvs-label">Kategorija</div><div class="tvs-select" data-t="cat"><span class="c-ph">Choose an entry...</span><span class="c-v">Naudingos nuorodos</span></div>
              <div class="dd-wrap"><div class="tvs-select-list cat-dd"><div class="tvs-select-opt">Choose an entry...</div><div class="tvs-select-opt is-hl" data-t="opt">Naudingos nuorodos</div><div class="tvs-select-opt">Partneriai</div></div></div></div>
            <div class="tvs-field"><div class="tvs-label">Nuoroda</div><div class="tvs-input is-value">https://demo-partneris.lt</div></div>
            <div class="tvs-field" data-t="ftarget"><div class="tvs-label">Target</div><div class="tvs-input">${E.typed('tg', '_blank')}</div></div>
          </div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}${E.btn('Atšaukti', { cls: 'is-tiny is-grey' })}</div>`,
  extra: `\n        <div class="newwin" data-t="newwin">${E.chrome('<span class="is-dim">https://</span>demo-partneris.lt', 'omnin')}<div class="nw-b"><b></b><span></span><span></span></div></div>` });

const cats = E.win({ cls: 'scr2', crumb: 'Nuorodų modulis  /  Kategorijos', sideOn: 3, sub: ['Nuorodos', 'Kategorijos'], subOn: 1, body: `
          <div class="tvs-table c-table"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span>Nuorodų</span><span></span></div>
            ${[['Naudingos nuorodos', 9, 'rcat'], ['Partneriai', 4], ['Projektai', 3]].map(([n, k, t]) => `<div class="tvs-row"${t ? ` data-t="${t}"` : ''}><div class="tvs-check"></div><div>${n}</div><div>${k}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange">${S.edit}Redaguoti</span><span class="tvs-btn is-small is-violet"${t ? ' data-t="copy"' : ''}>${S.copy.replace('currentColor', '#fff')}</span></div></div>`).join('')}
          </div>`, extra: '\n        <div class="tvs-toast toast">{{nuorodos(1)}} nukopijuota</div>' });
const list = E.win({ cls: 'scr1', crumb: 'Nuorodų modulis  /  Nuorodos', sideOn: 3, sub: ['Nuorodos', '<span data-t="subcat">Kategorijos</span>'], body: `
          <div>${E.btn('Pridėti', { icon: S.plus })}</div>
          <div class="tvs-table c-table"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span>Kategorija</span><span></span></div>
            ${[['Švietimo portalas', 'Naudingos nuorodos'], ['Savivaldybė', 'Naudingos nuorodos'], ['Demo partneris', 'Partneriai']].map(([n, k]) => `<div class="tvs-row"><div class="tvs-check"></div><div>${n}</div><div>${k}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange">${S.edit}Redaguoti</span></div></div>`).join('')}
          </div>` });

E.build(__dirname, {
  '02-nuorodos-svetaineje': {
    note: 'Kadras 1 — „Nuorodos svetainėje“ (ep_709_02_1): lentelė, eilutėje trys logotipai, ikonėlė vietoje logotipo',
    origin: '50% 62%',
    screens: [site1],
    css: `
  .row3 { display: contents; }
  .tvs-logos { position: relative; }
  .tvs-sweb-b { height: 700px; overflow: hidden; }`,
    steps: [
      { t: 'b1', spot: 'logos', pad: 10 },
      { t: 'b2', spot: ['c1', 'c3'], pad: 6 }, { t: 'b2', zoom: 1.12 },
      { t: 'b3', spot: 'c8', pad: 6 },
    ],
  },
  '05-nuorodos-irasas': {
    note: 'Kadras 2 — „Nuorodos įrašas“ (ep_709_05_1): logotipas → kategorija → Target „_blank“ → išsaugota, atsiveria naujame lange',
    origin: '40% 45%',
    screens: [form],
    css: `
  .btns { display: flex; gap: 8px; margin-bottom: 6px; }
  .logo-thumb { width: 100px; height: 40px; border-radius: 6px; background: linear-gradient(135deg, #cfd8e3, #aebccd); }
  .tvs-select { position: relative; } .c-v { position: absolute; left: 18px; color: var(--tvs-text); }
  .dd-wrap { position: relative; height: 0; z-index: 5; } .cat-dd { position: absolute; left: 0; top: -2px; width: 100%; }
  .newwin { position: absolute; right: 60px; top: 120px; width: 760px; height: 520px; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.3); z-index: 40; }
  .nw-b { padding: 30px; display: flex; flex-direction: column; gap: 16px; } .nw-b b { height: 160px; border-radius: 8px; background: linear-gradient(135deg, #cfd8e3, #aebccd); }
  .nw-b span { height: 18px; border-radius: 9px; background: #eceff3; }`,
    steps: [
      { t: 'b1', spot: 'flogo', pad: 6 }, { t: 'b1+0.2', cur: 'upl' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.up-row', rise: 10 },
      { t: 'b2', spot: 'fcat', pad: 6 }, { t: 'b2+0.2', cur: 'cat', ax: 0.8 }, { t: 'g2', click: true }, { t: 'g2+0.1', show: '.cat-dd', dur: 0.15 },
      { t: 'g2+0.15', cur: 'opt', dur: 0.4 }, { t: 'g3', click: true }, { t: 'g3+0.1', hide: '.cat-dd', dur: 0.15 }, { t: 'g3+0.1', hide: '.c-ph', dur: 0.05 }, { t: 'g3+0.1', show: '.c-v', dur: 0.05 },
      { t: 'b3', spot: 'ftarget', pad: 6 }, { t: 'b3', cur: 'ftarget', ax: 0.3, ay: 0.75 }, { t: 'g4', type: 'tg', dt: 0.1 },
      { t: 'b4', spot: 'save', pad: 10 }, { t: 'b4', cur: 'save', dur: 0.5 }, { t: 'g5', click: true }, { t: 'g5+0.2', spot: null },
      { t: 'g6', show: '.newwin', rise: 30, dur: 0.45 }, { t: 'g6+0.2', cur: [1380, 820], dur: 0.8 },
    ],
  },
  '06-nuorodu-sintakse': {
    note: 'Kadras 3 — „Nuorodų sintaksė“ (ep_709_06_1): „Kategorijos“ → violetinis „Kopijuoti“',
    origin: '40% 30%',
    screens: [list, cats],
    css: `
  .c-table .tvs-th, .c-table .tvs-row { grid-template-columns: 30px 1fr 300px 240px; }
  .toast { left: 900px; top: 236px; }`,
    steps: [
      { t: 'b1', spot: 'subcat', pad: 10 }, { t: 'b1', cur: 'subcat' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, dur: 0.2 },
      { t: 'b2', spot: 'rcat', pad: 4 }, { t: 'b2', cur: 'copy', dur: 0.5 }, { t: 'g2', click: true },
      { t: 'g3', show: '.toast', rise: 8 }, { t: 'g3', flash: '[data-t="rcat"]' },
    ],
  },
});
