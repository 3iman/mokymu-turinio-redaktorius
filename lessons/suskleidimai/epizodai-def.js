#!/usr/bin/env node
// „Suskleidimai“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const IB = 'Tarptautinis bakalaureatas';
const sub = (on) => ['Suskleidimai', '<span data-t="subcat">Kategorijos</span>'];
const CATS = [['Priėmimas', "{{ suskleidimai('', {'category_id': 1}) }}"], [IB, "{{ suskleidimai('', {'category_id': 2}) }}", 'new']];
const catRows = (withNew) => CATS.filter(c => withNew || !c[2]).map(([n, c, t]) => `<div class="tvs-row${t ? ' is-new newcat' : ''}"${t ? ' data-t="newcat"' : ''}><div class="tvs-check"></div><div>${n}</div><div><code class="syn">${E.esc(c)}</code></div><div class="tvs-actions"><span class="tvs-btn is-small is-violet"${t ? ' data-t="copy"' : ''}>${S.copy.replace('currentColor', '#fff')}</span></div></div>`).join('');
const catTable = (withNew) => `<div class="tvs-table c-table"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span data-t="hplug">Plugin</span><span></span></div>${catRows(withNew)}</div>`;
const W = (cls, crumb, body, subOn = 1, extra = '') => E.win({ cls, crumb, sideOn: 4, sub: sub(), subOn, body, extra });
const accItems = (list) => `<div class="tvs-acc">${list.map(([n, c]) => `<div class="tvs-acc-i ${c || ''}">${n}</div>`).join('')}</div>`;
const Q = ['Kas yra IB diplomo programa?', 'Kaip stoti į IB klases?', 'Kiek kainuoja mokslas?'];
const NEWQ = 'Tarptautinio bakalaureato programa – apie ką ji?';
const accCss = `.tvs-acc { max-width: 1100px; } .acc-new { }`;

E.build(__dirname, {
  '03-kategorija-ir-sintakse': {
    note: 'Kadras 1 — „Kategorija ir sintaksė“ (ep_905_03_1): „Sukurti“ → pavadinimas → „Plugin“ sintaksė → įklijuojama puslapyje',
    origin: '45% 35%',
    screens: [
      W('scr1', 'Suskleidimai  /  Kategorijos', `<div>${E.btn('Sukurti', { icon: S.plus, t: 'add' })}</div>${catTable(false)}`),
      W('scr2', 'Suskleidimai  /  Kategorijos  /  Sukurti', `<div class="tvs-form"><div class="tvs-field" data-t="fpav"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-focus">${E.typed('pav', IB)}</div></div></div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save1' })}</div>`),
      W('scr3', 'Suskleidimai  /  Kategorijos', `<div class="tvs-alert">Kategorija sukurta.</div>${catTable(true)}`, 1, '\n        <div class="tvs-toast toast">Nukopijuota</div>'),
      E.win({ cls: 'scr4', crumb: `Puslapiai  /  ${IB}  /  Redaguoti`, sideOn: 1, body: `<div>${E.tabs(['Turinys', 'Nustatymai', 'SEO'], 0)}<div class="tvs-form pg-form">${E.cke(`<h3>${IB}</h3><p>IB diplomo programa – dvejų metų tarptautinė programa 11–12 klasių mokiniams.</p><p data-t="code">${E.typed('paste', "{{ suskleidimai('', {'category_id': 2}) }}")}</p>`)}</div></div>
          <div class="tvs-alert saved2">Puslapis atnaujintas.</div><div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}</div>` }),
    ],
    css: `.c-table .tvs-th, .c-table .tvs-row { grid-template-columns: 30px 300px 1fr 90px; } .syn { font-family: 'SF Mono', Menlo, monospace; font-size: 17px; }
  .toast { left: 1100px; top: 250px; } .pg-form { padding: 10px 0; } .tvs-cke-body { min-height: 200px; }`,
    steps: [
      { t: 'b1', spot: 'add', pad: 10 }, { t: 'b1', cur: 'add' }, { t: 'b1+0.6', click: true }, { t: 'b1+0.7', scr: 2, slide: 'right' }, { t: 'b1+0.8', spot: 'fpav', pad: 6 },
      { t: 'b1+0.9', cur: 'fpav', ax: 0.3, ay: 0.75 }, { t: 'g1', type: 'pav', dt: 0.05 },
      { t: 'b2-0.9', cur: 'save1', dur: 0.4 }, { t: 'b2-0.4', click: true }, { t: 'b2-0.3', scr: 3 },
      { t: 'b2', spot: 'newcat', pad: 4 }, { t: 'b2+0.3', cur: 'copy', dur: 0.5 }, { t: 'g2', click: true }, { t: 'g2+0.1', show: '.toast', rise: 8 },
      { t: 'b3-0.3', scr: 4, slide: 'up' }, { t: 'b3-0.3', spot: null }, { t: 'b3', spot: 'code', pad: 8 }, { t: 'b3', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'b3+0.3', type: 'paste', dt: 0.02 },
      { t: 'g3-0.6', spot: 'upd', pad: 10 }, { t: 'g3-0.6', cur: 'upd', dur: 0.5 }, { t: 'g3', click: true }, { t: 'g3+0.2', show: '.saved2', dur: 0.2 }, { t: 'g4', flash: '.saved2' },
    ],
  },
  '04-irasas': {
    note: 'Kadras 2 — „Įrašas“ (ep_905_04_1): pavadinimas, „Atsakymas“, kategorija, „Išsaugoti“ → svetainėje nauja juosta',
    origin: '45% 40%',
    screens: [
      W('scr1', 'Suskleidimai  /  Sukurti', `<div class="tvs-form is-dense">
            <div class="tvs-field" data-t="fpav"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-focus">${E.typed('pav', NEWQ)}</div></div>
            ${E.cke(`<p data-t="ans">${E.typed('ans', 'Tai dvejų metų programa 11–12 klasėms. Mokomasi šešių dalykų grupių, rašomas tiriamasis darbas.', { caret: false })}</p>`, { label: 'Atsakymas', t: 'fans' })}
            <div class="two"><div class="tvs-field"><div class="tvs-label">Kalba</div><div class="tvs-select is-value">LT</div></div>
            <div class="tvs-field" data-t="fcat"><div class="tvs-label">Kategorija</div><div class="tvs-select" data-t="cat"><span class="c-ph">Choose an entry...</span><span class="c-v">${IB}</span></div>
              <div class="dd-wrap"><div class="tvs-select-list cat-dd"><div class="tvs-select-opt">Priėmimas</div><div class="tvs-select-opt is-hl" data-t="opt">${IB}</div></div></div></div>
            <div class="tvs-field"><div class="tvs-label">Enabled</div><div><span class="tvs-switch is-yes"><span>Yes</span><span></span></span></div></div></div>
          </div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}${E.btn('Išsaugoti ir kurti kitą', { cls: 'is-tiny', icon: S.save })}</div>`, 0),
      E.site('scr2', `<div class="tvs-sweb-p">Dažniausi klausimai apie IB programą.</div><br><div data-t="acc">${accItems([...Q.map(q => [q]), [NEWQ, 'acc-new']])}</div>`, { title: IB, on: 1, nav: ['Apie mokyklą', 'IB programa', 'Mokiniams', 'Tėvams', 'Kontaktai'] }),
    ],
    css: `.two { display: grid; grid-template-columns: 160px 1fr 200px; gap: 24px; } .two .tvs-field + .tvs-field { border-top: 0; }
  .cke-field .tvs-cke-body { min-height: 90px; } .cke-field .tvs-cke-top .tvs-cke-row:nth-child(n+2) { display: none; }
  .tvs-select { position: relative; } .c-v { position: absolute; left: 18px; color: var(--tvs-text); }
  .dd-wrap { position: relative; height: 0; z-index: 5; } .cat-dd { position: absolute; left: 0; top: -2px; width: 100%; } ${accCss}`,
    steps: [
      { t: 'b1', spot: 'fpav', pad: 6 }, { t: 'b1', cur: 'fpav', ax: 0.3, ay: 0.75 }, { t: 'g1', type: 'pav', dt: 0.035 },
      { t: 'b2', spot: 'fans', pad: 6 }, { t: 'b2+0.2', cur: 'ans', ax: 0.02, ay: 1.4 }, { t: 'g2', type: 'ans', dt: 0.018 },
      { t: 'b3', spot: 'fcat', pad: 6 }, { t: 'b3', cur: 'cat', ax: 0.8, dur: 0.5 }, { t: 'g3', click: true }, { t: 'g3+0.05', show: '.cat-dd', dur: 0.1 },
      { t: 'g3+0.1', cur: 'opt', dur: 0.35 }, { t: 'g4', click: true }, { t: 'g4+0.05', hide: '.cat-dd', dur: 0.1 }, { t: 'g4+0.05', hide: '.c-ph', dur: 0.05 }, { t: 'g4+0.05', show: '.c-v', dur: 0.05 },
      { t: 'g4+0.1', cur: 'save', dur: 0.45 }, { t: 'g4+0.1', spot: 'save', pad: 10 }, { t: 'g5', click: true },
      { t: 'b4-0.3', scr: 2, slide: 'up' }, { t: 'b4-0.3', spot: null }, { t: 'b4', show: '.acc-new', rise: 12 }, { t: 'b4', cur: [1380, 820], dur: 0.8 }, { t: 'b4+0.2', spot: 'acc', pad: 10 }, { t: 'g6', flash: '.acc-new' },
    ],
  },
  '05-perrikiavimas': {
    note: 'Kadras 3 — „Perrikiavimas“ (ep_905_05_1): filtras „Kategorija“ → tempimas už rodyklių → „Perrikiuoti“ → svetainėje nauja tvarka',
    origin: '45% 40%',
    screens: [
      W('scr1', 'Suskleidimai', `<div class="tvs-filter"><div class="tvs-input f-s">Paieška</div><div class="tvs-select f-c" data-t="cat"><span class="c-ph">Kategorija</span><span class="c-v">${IB}</span></div>${E.btn('Filtruoti', { icon: I.filter, t: 'filtr' })}</div>
          <div class="tvs-table s-table"><div class="tvs-th"><span></span><div class="tvs-check"></div><span>Pavadinimas</span><span></span></div>
            ${['Kaip registruotis į renginį?', 'Kur rasti tvarkaraštį?', 'Kas yra IB diplomo programa?', 'Kaip stoti į IB klases?', 'Kiek kainuoja mokslas?'].map(n => `<div class="tvs-row"><div class="tvs-handle">${I.handle}</div><div class="tvs-check"></div><div class="tvs-title">${n}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange">${S.edit}Redaguoti</span></div></div>`).join('')}
          </div>`, 0),
      W('scr2', 'Suskleidimai', `<div class="tvs-filter"><div class="tvs-input f-s">Paieška</div><div class="tvs-select f-c"><span class="c-v2">${IB}</span></div>${E.btn('Filtruoti', { icon: I.filter })}</div>
          <div class="tvs-table s-table"><div class="tvs-th"><span></span><div class="tvs-check"></div><span>Pavadinimas</span><span></span></div>
            ${[[Q[0], 'q1'], [Q[1], 'q2'], [Q[2], 'q3']].map(([n, t]) => `<div class="tvs-row r-${t}" data-t="${t}"><div class="tvs-handle" data-t="${t}h">${I.handle}</div><div class="tvs-check"></div><div class="tvs-title">${n}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange">${S.edit}Redaguoti</span></div></div>`).join('')}
            <div class="tvs-foot">${E.btn('Perrikiuoti', { cls: 'is-small', t: 'reorder' })}</div>
          </div>`, 0),
      E.site('scr3', `<div class="tvs-sweb-p">Dažniausi klausimai apie IB programą.</div><br><div data-t="acc">${accItems([[Q[0]], [Q[2]], [Q[1]]])}</div>`, { title: IB, on: 1, nav: ['Apie mokyklą', 'IB programa', 'Mokiniams', 'Tėvams', 'Kontaktai'] }),
    ],
    css: `.s-table .tvs-th, .s-table .tvs-row { grid-template-columns: 44px 36px 1fr 200px; } .f-s { width: 260px; } .f-c { width: 420px; position: relative; }
  .c-v { position: absolute; left: 18px; color: var(--tvs-text); } .c-v2 { color: var(--tvs-text); } ${accCss}`,
    steps: [
      { t: 'b1', spot: 'cat', pad: 8 }, { t: 'b1', cur: 'cat', ax: 0.8 }, { t: 'b1+0.6', click: true }, { t: 'b1+0.9', hide: '.scr1 .c-ph', dur: 0.05 }, { t: 'b1+0.9', show: '.scr1 .c-v', dur: 0.05 },
      { t: 'b1+1.2', cur: 'filtr', dur: 0.5 }, { t: 'b1+1.2', spot: 'filtr', pad: 8 }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2 }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'q3h', pad: 6 }, { t: 'b2+0.2', cur: 'q3h' },
      { t: 'g2', cur: { ref: 'q3h', dy: (R) => -(R.q3.y - R.q2.y) }, dur: 0.8 }, { t: 'g2', spot: { ref: 'q3', dy: (R) => -(R.q3.y - R.q2.y) }, pad: 4 },
      { t: 'b3', spot: 'reorder', pad: 8 }, { t: 'b3+0.2', cur: 'reorder' }, { t: 'g4', click: true },
      { t: 'g5-0.4', scr: 3, slide: 'up' }, { t: 'g5-0.4', spot: null }, { t: 'g5', spot: 'acc', pad: 10 }, { t: 'g5', cur: [1380, 820], dur: 0.8 }, { t: 'g5+0.2', flash: '.tvs-acc' },
    ],
    anim: (T) => [['.r-q3', `pakelti 0.8s cubic-bezier(.45,0,.2,1) ${T('g2')}s both`], ['.r-q2', `nuleisti 0.8s cubic-bezier(.45,0,.2,1) ${T('g2')}s both`]],
    keyframes: (T, D, R) => `  @keyframes pakelti { from { transform: none; } 15% { box-shadow: 0 8px 22px rgba(0,0,0,.18); } to { transform: translateY(-${R.q3.y - R.q2.y}px); box-shadow: 0 8px 22px rgba(0,0,0,.18); } }
  @keyframes nuleisti { from { transform: none; } to { transform: translateY(${R.q3.y - R.q2.y}px); } }`,
  },
});
