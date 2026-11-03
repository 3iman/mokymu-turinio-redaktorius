#!/usr/bin/env node
// „Metraštis“ — TVS epizodai (epizodai.js). Ekranai pagal eskizai-lt.md; laikai — kortelės žymos (b = balsas, g = garsas).
const E = require('../../epizodai');
const S = E.SVG;
const thumb = '<span class="tvs-thumb is-wide"></span>';

const list = E.win({ cls: 'scr1', crumb: 'Metraščio modulis  /  Timeline', sideOn: 4, sub: ['Timeline'], body: `
          <div>${E.btn('Pridėti', { icon: S.plus, t: 'add' })}</div>
          <div class="tvs-table tl-table">
            <div class="tvs-th"><div class="tvs-check"></div><span>Nuotraukos</span><span>Pavadinimas</span><span>Data</span><span>Autorius</span><span></span></div>
            ${[['2015', '2015-09-01'], ['2014', '2014-06-20'], ['2013', '2013-09-02']].map(([p, d]) => `<div class="tvs-row"><div class="tvs-check"></div><div>${thumb}</div><div>${p}</div><div>${d}</div><div>Administratorius</div><div class="tvs-actions">${E.btn('Redaguoti', { cls: 'is-tiny is-orange', icon: S.edit })}</div></div>`).join('')}
          </div>` });

const form = E.win({ cls: 'scr2', crumb: 'Metraščio modulis  /  Timeline  /  Pridėti', sideOn: 4, sub: ['Timeline'], body: `
          <div class="tvs-form is-dense tl-form">
            <div class="tvs-field" data-t="fpav"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-focus">${E.typed('pav', '2016')}</div></div>
            <div class="tvs-field"><div class="tvs-label">Laida</div><div class="tvs-input"></div></div>
            <div class="tvs-field" data-t="fdata"><div class="tvs-label">Data<span class="tvs-req">*</span></div><div class="tvs-date"><span class="tvs-date-x"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg></span><span class="tvs-date-v">${E.typed('data', '2016-07-05', { caret: false })}</span><span class="tvs-date-tz">Europe/Vilnius</span></div></div>
            <div class="tvs-field" data-t="fintro"><div class="tvs-label">Intro</div><div class="tvs-input is-area intro">${E.typed('intro', 'Savivaldybės tarybos sprendimu prie mokyklos prijungta kaimyninė mokykla. Mokykla pervadinta.', { caret: false })}</div></div>
            <div class="tvs-field" data-t="fnuot"><div class="tvs-label">Nuotraukos</div><div class="btns">${E.btn('Select File', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny' })}</div>
              <div class="tvs-frow up-row">${thumb}<div class="tvs-fmeta"><span class="tvs-fname">mokykla-2016.jpg</span><span class="tvs-fpath">local://metrastis/mokykla-2016.jpg</span><span class="tvs-badge">1600 x 1067</span></div></div></div>
          </div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}${E.btn('Atšaukti', { cls: 'is-tiny is-grey' })}</div>` });

const site = E.scr('scr3 tvs-sweb', `
        <div class="tvs-sweb-h"><div class="tvs-sweb-crest"></div><div class="tvs-sweb-name">Demo mokykla<small>Demo miestas</small></div></div>
        <div class="tvs-sweb-nav"><span class="is-on">Apie mokyklą</span><span>Mokiniams</span><span>Tėvams</span><span>Naujienos</span><span>Kontaktai</span></div>
        <div class="tvs-sweb-b">
          <div class="tvs-sweb-t">Apie mokyklą</div>
          <div class="tvs-sweb-sec">Metraštis</div>
          <div class="tvs-tline">
            <div class="tvs-tline-y" data-t="years"><span class="is-on y-new">2016</span><span>2015</span><span>2014</span><span>2013</span></div>
            <div class="tvs-scard tl-card" data-t="card"><div class="tvs-scard-img"></div><div class="tvs-scard-b"><div class="tvs-scard-t">2016</div><div class="tvs-scard-d">2016-07-05</div><div class="tvs-scard-p">Savivaldybės tarybos sprendimu prie mokyklos prijungta kaimyninė mokykla. Mokykla pervadinta.</div></div></div>
          </div>
        </div>`);

E.build(__dirname, {
  '03-metrascio-irasas': {
    note: 'Kadras 1 — „Sukuriate metraščio įrašą“ (ep_908_03_1): sąrašas → forma → svetainės metraštis',
    origin: '40% 40%',
    screens: [list, form, site],
    css: `
  .tl-table .tvs-th, .tl-table .tvs-row { grid-template-columns: 30px 120px 1fr 200px 240px 150px; }
  .tl-table .tvs-thumb.is-wide { width: 84px; height: 56px; }
  .tl-form .intro { height: 80px; white-space: normal; align-items: flex-start; padding-top: 10px; line-height: 1.45; }
  .tl-form .intro .tvs-typed { white-space: normal; }
  .tl-form .btns { display: flex; gap: 8px; margin-bottom: 8px; }
  .tl-form .tvs-thumb.is-wide { width: 72px; height: 48px; }
  .scr3 { inset: 20px 40px; width: auto; height: auto; }
  .tl-card { max-width: 620px; }`,
    steps: [
      { t: 'b1', spot: 'add', pad: 10 }, { t: 'b1+0.3', cur: 'add' },
      { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'fpav' }, { t: 'b2', cur: 'fpav', ax: 0.3, ay: 0.75 }, { t: 'b2+0.7', type: 'pav', dt: 0.15 },
      { t: 'g2-0.4', spot: 'fdata' }, { t: 'g2-0.4', cur: 'fdata', ax: 0.45, ay: 0.75 }, { t: 'g2', type: 'data', dt: 0.08 },
      { t: 'b3', spot: 'fintro' }, { t: 'b3', type: 'intro', dt: 0.012 },
      { t: 'b3+1.1', spot: 'fnuot' }, { t: 'b3+1.1', show: '.up-row', rise: 10 },
      { t: 'g3-0.5', spot: 'save', pad: 10 }, { t: 'g3-0.7', cur: 'save' }, { t: 'g3', click: true },
      { t: 'g3+0.4', scr: 3, slide: 'up', dur: 0.4 }, { t: 'g3+0.4', spot: null }, { t: 'g3+0.6', cur: [1380, 820], dur: 0.8 },
      { t: 'b4', spot: ['years', 'card'], pad: 12 }, { t: 'b4', show: ['.y-new', '.tl-card'], rise: 14 },
      { t: 'g4', flash: '.tl-card' },
    ],
  },
});
