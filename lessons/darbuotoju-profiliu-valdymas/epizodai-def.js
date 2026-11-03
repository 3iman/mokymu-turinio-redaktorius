#!/usr/bin/env node
// „Darbuotojų profilių valdymas“ — epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const prof = (n, p) => `<div class="tvs-sprof"><div class="tvs-sprof-photo"></div><div class="tvs-sprof-b"><div class="tvs-sprof-name">${n}</div><div class="tvs-sprof-pos">${p}</div>
            <div class="tvs-sprof-sec"><span class="tvs-sprof-doc">CV</span><span class="tvs-sprof-doc">Pareigybės aprašas</span></div><div class="tvs-sprof-h">Darbo laikas</div>
            <div class="tvs-sprof-tab"><div class="tvs-sprof-tr is-th"><span>Savaitės dienos</span><span>Darbo laikas</span><span>Pietūs</span><span>Priėmimo valandos</span></div><div class="tvs-sprof-tr"><span>Pirmadienis</span><span>8.00–16.30</span><span>12.00–12.30</span><span>9.00–12.00</span></div></div>
            <div class="tvs-sprof-sec tvs-sprof-muted">Kontaktai: tel. (8 37) 00 00 00 · el. p. info@demo.lt</div></div></div>`;
const ST = [['Vincas Kudirka', 'Direktorius', 'r6'], ['Marija Pečkauskaitė', 'Pavaduotoja ugdymui'], ['Jonas Biliūnas', 'Informatikos mokytojas']];
const list = E.win({ cls: 'scr1', crumb: 'Darbuotojai', sideOn: 5, sub: ['Darbuotojai', 'Kategorijos'], body: `<div class="tvs-table s-table"><div class="tvs-th"><div class="tvs-check"></div><span>Full name</span><span>Position</span><span></span></div>${ST.map(([n, p, t]) => `<div class="tvs-row"${t ? ` data-t="${t}"` : ''}><div class="tvs-check"></div><div>${n}</div><div>${p}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange"${t ? ' data-t="ed"' : ''}>${S.edit}Redaguoti</span></div></div>`).join('')}</div>` });
const fld = (l, v, t, inner) => `<div class="tvs-field"${t ? ` data-t="${t}"` : ''}><div class="tvs-label">${l}</div>${inner || `<div class="tvs-input is-value">${v}</div>`}</div>`;
const files = (l, t) => fld(l, '', t, `<div class="btns">${E.btn('Select File', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny' })}</div>`);
const formTop = `${fld('First Name', 'Vincas', 'f1')}${fld('Last Name', 'Kudirka', 'f2')}${fld('Position', 'Direktorius', 'f3')}${fld('Description', 'Vadovauja mokyklai nuo 2015 m.', 'f4')}${fld('Hours', 'I–V 8.00–16.30', 'f5')}${fld('Category', 'Administracija', 'f6')}`;
const formBot = `${fld('Phone', '(8 37) 00 00 00', 'b1')}${fld('Email', 'v.kudirka@mokykla.lt', 'b2')}${files('Image', 'b3')}${files('Cv', 'b4')}${files('Pareigos', 'b5')}${fld('Dokumentas #1', '', 'b6', `<div class="two"><div class="tvs-input">Pavadinimas</div><div class="btns">${E.btn('Select File', { cls: 'is-tiny is-info' })}</div></div>`)}${fld('Enabled', '', 'b7', '<span class="tvs-switch is-yes"><span>Yes</span><span></span></span>')}`;
const form = (cls, url) => E.scr(`${cls} brw`, `${E.chrome(`<span class="is-dim">https://demomokykla.lt/admin/darbuotojai/edit/</span><span class="idm" data-t="id">6</span>`, url)}<div class="br-in"><div class="clip"><div class="scroll">${E.win({ cls: 'in', crumb: 'Darbuotojai  /  Redaguoti', sideOn: 5, sub: ['Darbuotojai', 'Kategorijos'], body: `<div class="tvs-form is-dense">${formTop}${formBot}</div>` })}</div></div></div>`);
const CSS = `.s-table .tvs-th, .s-table .tvs-row { grid-template-columns: 30px 1fr 1fr 200px; } .btns { display: flex; gap: 8px; } .two { display: grid; grid-template-columns: 1fr 200px; gap: 12px; }
  .brw { position: absolute; inset: 0; } .br-in { position: absolute; inset: 60px 0 0; overflow: hidden; } .clip { height: 100%; overflow: hidden; } .scroll .scr { position: relative; height: auto; min-height: 844px; } .idm { border-radius: 3px; padding: 0 2px; }`;
E.build(__dirname, {
  '04-darbuotoju-sarasas': {
    note: 'K2 — „Darbuotojų sąrašas“ (ep_706_04_1)', origin: '50% 50%',
    css: `.clip { height: 640px; overflow: hidden; } .pf { display: flex; flex-direction: column; gap: 20px; } .menu-dd { position: absolute; left: 290px; top: 128px; z-index: 6; }`,
    screens: [E.site('scr1', `<div class="clip"><div class="scroll pf">${prof('Vincas Kudirka', 'Direktorius')}${prof('Marija Pečkauskaitė', 'Direktoriaus pavaduotoja ugdymui')}</div></div>
        <div class="tvs-a11y-m menu-dd"><span>Mokytojai</span><span class="is-hl" data-t="adm">Administracija</span><span>Pagalbos specialistai</span></div>`, { title: 'Administracija', on: 1, nav: ['Apie mokyklą', 'Struktūra ir kontaktai', 'Mokiniams', 'Tėvams'] })],
    steps: [{ t: 0.2, show: '.menu-dd', dur: 0.2 }, { t: 'b1', cur: 'adm' }, { t: 'g1', click: true }, { t: 'g1+0.1', hide: '.menu-dd', dur: 0.2 }, { t: 'g1+0.3', cur: [1500, 820], dur: 0.8 }],
    anim: (T) => [['.scroll', `slinkti 6s cubic-bezier(.45,0,.2,1) ${T('b2')}s both`]],
    keyframes: () => '  @keyframes slinkti { from { transform: none; } to { transform: translateY(-420px); } }',
  },
  '06-profilio-id': {
    note: 'K3 — „Profilio ID“ (ep_706_06_1)', origin: '30% 6%', css: CSS,
    screens: [list, form('scr2', 'omni')],
    steps: [{ t: 'b1', spot: 'r6', pad: 4 }, { t: 'b1', cur: 'ed' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', zoom: 1.6 }, { t: 'b2', spot: 'id', pad: 8 }, { t: 'b2+0.4', flash: '.idm' }, { t: 'b3', flash: '.idm' }],
  },
  '08-profilio-virsus': {
    note: 'K4 — „Profilio viršus“ (ep_706_08_1)', origin: '40% 30%', css: CSS,
    screens: [list, form('scr2', 'omni')],
    steps: [{ t: 'b1', spot: 'r6', pad: 4 }, { t: 'b1', cur: 'ed' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: ['f1', 'f3'], pad: 6 }, { t: 'b3', spot: ['f4', 'f6'], pad: 6 }],
  },
  '08-profilio-apacia': {
    note: 'K5 — „Profilio apačia“ (ep_706_08_2)', origin: '40% 50%', css: CSS,
    screens: [form('scr1', 'omni')],
    steps: [{ t: 'b1', spot: { ref: 'b1', dy: -480, dh: (R) => R.b2.y + R.b2.h - R.b1.y - R.b1.h }, pad: 6 }, { t: 'b2', spot: { ref: 'b3', dy: -480, dh: (R) => R.b5.y + R.b5.h - R.b3.y - R.b3.h }, pad: 6 }, { t: 'b3', spot: { ref: 'b6', dy: -480 }, pad: 6 }, { t: 'b3+1.6', spot: { ref: 'b7', dy: -480 }, pad: 6 }, { t: 'b3+1.8', flash: '[data-t="b7"] .tvs-switch' }],
    anim: (T) => [['.scroll', `slinkti 1.2s cubic-bezier(.45,0,.2,1) 0.1s both`]],
    keyframes: () => '  @keyframes slinkti { from { transform: translateY(-200px); } to { transform: translateY(-480px); } }',
  },
});
