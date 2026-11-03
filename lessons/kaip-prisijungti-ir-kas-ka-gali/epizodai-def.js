#!/usr/bin/env node
// „Kaip prisijungti ir kas ką gali“ — TVS epizodai (epizodai.js). Faktai: nuorodos/*.md (skeleton admin 2026-10-18).
const E = require('../../epizodai');
const S = E.SVG;
const SITE = '<span class="is-dim">https://</span>demomokykla.lt';
const browser = (cls, url, inner, t) => E.scr(`${cls} br`, `        ${E.chrome(url, t)}\n        <div class="br-in">${inner}</div>`);

// ---------- K1: /admin → prisijungimas → darbalaukis ----------
const site = `<div class="tvs-sweb br-site"><div class="tvs-sweb-h"><div class="tvs-sweb-crest"></div><div class="tvs-sweb-name">Demo mokykla<small>Demo miestas</small></div></div>
          <div class="tvs-sweb-nav"><span class="is-on">Apie mokyklą</span><span>Mokiniams</span><span>Tėvams</span><span>Naujienos</span><span>Kontaktai</span></div>
          <div class="tvs-sweb-b"><div class="tvs-sweb-t">Sveiki atvykę</div><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div></div></div>`;
const login = `<div class="tvs-login"><div class="tvs-login-box">
          <div class="tvs-login-h"><div class="tvs-logo"><i></i></div>Prisijungimas</div>
          <div class="tvs-field" data-t="email"><div class="tvs-label">El. paštas arba vartotojo vardas</div><div class="tvs-input is-focus">${E.typed('email', 'v.kudirka@mokykla.lt')}</div></div>
          <div class="tvs-field" data-t="pass"><div class="tvs-label">Slaptažodis</div><div class="tvs-input tvs-pass">${E.typed('pass', '••••••••••')}</div></div>
          <div class="tvs-login-chk"><span class="tvs-check"></span>Prisiminti mane</div>
          <div class="tvs-login-foot">${E.btn('Prisijungti', { t: 'login' })}<a>Pamiršote slaptažodį?</a></div>
        </div></div>`;
const dashWin = E.win({ cls: 'in-win', crumb: 'Darbalaukis', sideOn: 0, sub: ['Darbalaukis', 'Papildiniai'], body: `          ${E.dash(E.DASH)}` });

// ---------- K2: Vartotojai → forma → nauja eilutė ----------
const USERS = [['Vincas Kudirka', 'vkudirka', 'v.kudirka@mokykla.lt'], ['Žemaitė', 'zemaite', 'j.zymantiene@mokykla.lt'], ['Jonas Basanavičius', 'jbasanavicius', 'j.basanavicius@mokykla.lt']];
const urow = ([n, u, e], cls = '') => `<div class="tvs-row ${cls}"><div class="tvs-check"></div><div>${n}</div><div>${u}</div><div>${e}</div><div><span class="tvs-state">Aktyvus</span></div><div class="tvs-actions">${E.btn('Redaguoti', { cls: 'is-tiny is-orange', icon: S.edit })}${E.btn('Leidimai', { cls: 'is-tiny is-info' })}</div></div>`;
const table = (extra = '') => `<div class="tvs-table u-table">
            <div class="tvs-th"><div class="tvs-check"></div><span>Rodomas vardas</span><span>Vartotojo vardas</span><span>El. paštas</span><span>Statusas</span><span></span></div>
            ${extra}${USERS.map(r => urow(r)).join('')}
          </div>`;
const usersList = E.win({ cls: 'scr1', crumb: 'Vartotojai', sideOn: 5, sub: ['Vartotojai', 'Rolės'], body: `          <div>${E.btn('Pridėti vartotoją', { icon: S.plus, t: 'add' })}</div>\n          ${table()}` });
const userForm = E.win({ cls: 'scr2', crumb: 'Vartotojai  /  Pridėti vartotoją', sideOn: 5, sub: ['Vartotojai', 'Rolės'], body: `
          <div class="tvs-form is-dense u-form">
            <div class="u-two"><div class="tvs-field" data-t="fvardas"><div class="tvs-label">Vardas</div><div class="tvs-input is-focus">${E.typed('vardas', 'Marija')}</div></div>
              <div class="tvs-field" data-t="fpavarde"><div class="tvs-label">Pavardė</div><div class="tvs-input">${E.typed('pavarde', 'Pečkauskaitė')}</div></div></div>
            <div class="u-two"><div class="tvs-field"><div class="tvs-label">Rodomas vardas<span class="tvs-req">*</span></div><div class="tvs-input is-value fill">Marija Pečkauskaitė</div></div>
              <div class="tvs-field"><div class="tvs-label">Vartotojo vardas<span class="tvs-req">*</span></div><div class="tvs-input is-value fill">mpeckauskaite</div></div></div>
            <div class="tvs-field" data-t="femail"><div class="tvs-label">El.paštas<span class="tvs-req">*</span></div><div class="tvs-input">${E.typed('uemail', 'm.peckauskaite@mokykla.lt')}</div></div>
            <div class="tvs-field" data-t="roles"><div class="tvs-label">Rolės<span class="tvs-req">*</span></div>
              <div class="tvs-chk-row"><span class="tvs-check"></span>Manager <span class="tvs-help">— mokyklos administratorius</span></div>
              <div class="tvs-chk-row" data-t="redakcija"><span class="tvs-check chk"><span class="tvs-check is-on chk-on"></span></span>Redakcija <span class="tvs-help">— turinio redaktorius</span></div></div>
          </div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save, t: 'save' })}${E.btn('Atšaukti', { cls: 'is-tiny is-grey' })}</div>` });
const usersNew = E.win({ cls: 'scr3', crumb: 'Vartotojai', sideOn: 5, sub: ['Vartotojai', 'Rolės'], body: `          <div class="tvs-alert">Vartotojas sukurtas.</div>\n          ${table(urow(['Marija Pečkauskaitė', 'mpeckauskaite', 'm.peckauskaite@mokykla.lt'], 'is-new new-row'))}` });

const BR_CSS = `
  .br { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #dfe3ea; box-shadow: 0 24px 60px rgba(30,40,70,.12); }
  .br .tvs-chrome { position: relative; z-index: 2; }
  .br-in { position: absolute; inset: 60px 0 0; overflow: hidden; }
  .br-in > .scr { position: absolute; inset: 0; }
  .br-site { position: absolute; inset: 0; border-radius: 0; border: 0; box-shadow: none; }
  .br .tvs-login { inset: 0; }`;

E.build(__dirname, {
  '01-prisijungimas': {
    note: 'Kadras 1 — „Prisijungiate“ (ep_906_01_1): adreso juosta /admin → prisijungimas → darbalaukis',
    origin: '30% 20%',
    screens: [browser('scr1', `${SITE}${E.typed('admin', '/admin')}`, site), browser('scr2', `${SITE}<span class="is-dim">/admin/login</span>`, login, 'omni2'),
              browser('scr3', `${SITE}<span class="is-dim">/admin</span>`, dashWin, 'omni3')],
    css: BR_CSS + `
  .br-in .tvs-dash { width: 900px; }`,
    steps: [
      { t: 'b1', spot: 'omni', pad: 6 }, { t: 'b1', zoom: 1.35 }, { t: 'b1+0.2', cur: 'omni', ax: 0.32, ay: 0.85 },
      { t: 'g1', type: 'admin', dt: 0.12 },
      { t: 'g1+1.1', scr: 2 }, { t: 'g1+1.1', spot: null }, { t: 'g1+1.1', zoom: 1 },
      { t: 'b2', spot: 'email' }, { t: 'b2', cur: 'email', ax: 0.75, ay: 0.75 }, { t: 'b2+0.4', type: 'email', dt: 0.05 },
      { t: 'g2-0.2', spot: 'pass' }, { t: 'g2', type: 'pass', dt: 0.07 },
      { t: 'b3', spot: 'login', pad: 10 }, { t: 'b3', cur: 'login' }, { t: 'g3', click: true },
      { t: 'g3+0.3', scr: 3, slide: 'up' }, { t: 'g3+0.3', spot: null }, { t: 'g3+0.5', cur: [1350, 800], dur: 0.8 },
      { t: 'g4', flash: '.br-in .tvs-dash' },
    ],
    keyframes: () => '', 
  },
  '05-pridedate-kolega': {
    note: 'Kadras 2 — „Pridedate kolegą“ (ep_906_05_1): Vartotojai → forma (rolė „Redakcija“) → nauja eilutė „Aktyvus“',
    origin: '40% 30%',
    screens: [usersList, userForm, usersNew],
    css: `
  .u-table .tvs-th, .u-table .tvs-row { grid-template-columns: 30px 1.1fr 0.9fr 1.3fr 130px 260px; }
  .u-two { display: grid; grid-template-columns: 1fr 1fr; gap: 0 30px; }
  .u-two + .u-two, .u-two + .tvs-field { border-top: 1px solid var(--tvs-line); }
  .u-two .tvs-field + .tvs-field { border-top: 0; }
  .chk { position: relative; display: inline-block; }
  .chk-on { position: absolute; left: -2px; top: -2px; }`,
    steps: [
      { t: 'b1', spot: 'add', pad: 10 }, { t: 'b1+0.3', cur: 'add' }, { t: 'g1', click: true },
      { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: ['fvardas', 'fpavarde'] }, { t: 'b2', cur: 'fvardas', ax: 0.4, ay: 0.75 },
      { t: 'b2+0.3', type: 'vardas', dt: 0.06 }, { t: 'b2+0.8', type: 'pavarde', dt: 0.05 }, { t: 'b2+1.4', show: '.fill' },
      { t: 'g2-0.2', spot: 'femail' }, { t: 'g2', type: 'uemail', dt: 0.035 },
      { t: 'b3', spot: 'roles' }, { t: 'b3', cur: 'redakcija', ax: 0, dx: 12, ay: 0.5 },
      { t: 'g3', click: true }, { t: 'g3', show: '.chk-on', dur: 0.1 },
      { t: 'g3+0.1', spot: 'save', pad: 10 }, { t: 'g3+0.05', cur: 'save', dur: 0.45 }, { t: 'g4', click: true },
      { t: 'g4+0.3', scr: 3 }, { t: 'g4+0.3', spot: null }, { t: 'g4+0.5', cur: [1350, 800], dur: 0.8 },
      { t: 'g5', flash: '.new-row' },
    ],
  },
});
