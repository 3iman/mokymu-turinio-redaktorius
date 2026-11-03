#!/usr/bin/env node
// „Pranešimų juostelės valdymas“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const MSG = 'Rugsėjo 1-osios šventė – 10 val.';
const bar = (cls = '') => `<div class="tvs-note-bar ${cls}" data-t="bar"><svg viewBox="0 0 28 16" fill="none" stroke="#fff" stroke-width="1.6"><path d="M0 8h26M19 1l7 7-7 7"/></svg>${MSG}<svg class="tvs-note-x" data-t="nx" viewBox="0 0 26 26" fill="none" stroke="#fff" stroke-width="1.4"><circle cx="13" cy="13" r="11.5"/><path d="M9 9l8 8M17 9l-8 8"/></svg></div>`;
const sitePg = (cls, withBar, barCls = '') => E.scr(`${cls} tvs-sweb`, `${withBar ? bar(barCls) : ''}
        <div class="tvs-sweb-h"><div class="tvs-sweb-crest"></div><div class="tvs-sweb-name">Demo mokykla<small>Demo miestas</small></div></div>
        <div class="tvs-sweb-nav"><span class="is-on">Apie mokyklą</span><span>Mokiniams</span><span>Tėvams</span><span>Naujienos</span><span>Kontaktai</span></div>
        <div class="tvs-sweb-b"><div class="tvs-sweb-t">Sveiki atvykę</div><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div></div>`);
const fld = (l, inner, t) => `<div class="tvs-field"${t ? ` data-t="${t}"` : ''}><div class="tvs-label">${l}</div>${inner}</div>`;
const date = (v, id) => `<div class="tvs-date"><span class="tvs-date-x">${I.x}</span><span class="tvs-date-v">${E.typed(id, v, { caret: false })}</span><span class="tvs-date-tz">Europe/Vilnius</span></div>`;
E.build(__dirname, {
  '01-juosteles-uzdarymas': {
    note: 'K1 — „Juostelės uždarymas“ (ep_702_01_1)', origin: '80% 10%', css: `.closebar { overflow: hidden; }`,
    screens: [sitePg('scr1', true, 'closebar')],
    steps: [{ t: 0.3, spot: 'bar', pad: 4 }, { t: 'b1', cur: 'nx' }, { t: 'g1', click: true }, { t: 'g1+0.1', spot: null }, { t: 'b2', cur: [1300, 700], dur: 0.8 }],
    anim: (T) => [['.closebar', `uzdaryti 0.4s cubic-bezier(.45,0,.2,1) ${T('g1+0.1')}s both`], ['.stage > .scr', `perkrauti 0.6s ease ${T('b2+0.4')}s both`]],
    keyframes: () => '  @keyframes uzdaryti { from { height: 72px; opacity: 1; } to { height: 0; opacity: 0; } }\n  @keyframes perkrauti { 0% { opacity: 1; } 40% { opacity: .2; } 100% { opacity: 1; } }',
  },
  '04-nauja-zinute': {
    note: 'K3 — „Nauja žinutė“ (ep_702_04_1)', origin: '40% 40%', css: `.two { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; } .two .tvs-field + .tvs-field { border-top: 0; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Pranešimų juostelė', sideOn: 1, sub: ['Pranešimai'], body: `<div>${E.btn('Pridėti pranešimą', { icon: S.plus, t: 'add' })}</div><div class="tvs-table"><div class="tvs-th"><div class="tvs-check"></div><span>Tekstas</span></div><div class="tvs-row"><div class="tvs-check"></div><div>Mokslo metų pabaigos šventė</div></div></div>` }),
      E.win({ cls: 'scr2', crumb: 'Pranešimų juostelė  /  Pridėti pranešimą', sideOn: 1, sub: ['Pranešimai'], body: `<div class="tvs-form is-dense">
            ${fld('Tekstas<span class="tvs-req">*</span>', `<div class="tvs-input is-focus">${E.typed('t', MSG)}</div>`, 'ftx')}
            <div class="two">${fld('Rodyti nuo', date('2026-08-25 08:00', 'd1'), 'fd1')}${fld('Rodyti iki', date('2026-09-01 12:00', 'd2'), 'fd2')}</div>
            ${fld('Įjungta', '<span class="tvs-switch is-yes"><span>Yes</span><span></span></span>', 'fon')}
            ${fld('URL', `<div class="tvs-input">${E.typed('u', '/renginiai')}</div>`, 'furl')}</div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` }),
      sitePg('scr3', true)],
    steps: [{ t: 'b1', spot: 'add', pad: 10 }, { t: 'b1', cur: 'add' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'ftx', pad: 6 }, { t: 'b2', cur: 'ftx', ax: 0.3, ay: 0.8 }, { t: 'g2', type: 't', dt: 0.04 },
      { t: 'b3', spot: ['fd1', 'fd2'], pad: 6 }, { t: 'b3', cur: 'fd1', ax: 0.4, ay: 0.8 }, { t: 'g3', click: true }, { t: 'g3+0.1', type: 'd1', dt: 0.03 }, { t: 'g3+0.7', type: 'd2', dt: 0.03 },
      { t: 'b4', spot: 'furl', pad: 6 }, { t: 'b4', cur: 'furl', ax: 0.3, ay: 0.8 }, { t: 'b4+0.4', type: 'u', dt: 0.07 }, { t: 'b4+1.2', cur: 'save', dur: 0.4 }, { t: 'g4-0.4', click: true },
      { t: 'g4', scr: 3, slide: 'up' }, { t: 'g4', spot: 'bar', pad: 4 }, { t: 'g4+0.3', flash: '.tvs-note-bar' }, { t: 'g4+0.2', cur: [1300, 700], dur: 0.8 }],
  },
});
