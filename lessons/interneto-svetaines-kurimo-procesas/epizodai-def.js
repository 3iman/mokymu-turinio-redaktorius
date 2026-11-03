#!/usr/bin/env node
// „Interneto svetainės kūrimo procesas“ — TVS epizodas (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const MSG = 'Interneto svetainės turinys dar kuriamas. Atsiprašome už galimus laikinus neatitikimus';
const sw = (yes, cls = '') => yes ? `<span class="tvs-switch is-yes ${cls}"><span>Yes</span><span></span></span>` : `<span class="tvs-switch is-no ${cls}"><span></span><span>No</span></span>`;
const site = (cls, bar) => E.scr(`${cls} tvs-sweb`, `${bar ? `<div class="tvs-note-bar"><svg viewBox="0 0 28 16" fill="none" stroke="#fff" stroke-width="1.6"><path d="M0 8h26M19 1l7 7-7 7"/></svg>${MSG}</div>` : ''}
        <div class="tvs-sweb-h" data-t="top"><div class="tvs-sweb-crest"></div><div class="tvs-sweb-name">Demo mokykla<small>Demo miestas</small></div></div>
        <div class="tvs-sweb-nav"><span class="is-on">Apie mokyklą</span><span>Mokiniams</span><span>Tėvams</span><span>Naujienos</span><span>Kontaktai</span></div>
        <div class="tvs-sweb-b"><div class="tvs-sweb-t">Sveiki atvykę</div><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div></div>`);
E.build(__dirname, {
  '08-juosteles-isjungimas': {
    note: 'K8 — „Juostelės išjungimas“ (ep_684_08_1)', origin: '40% 40%',
    css: `.sw-slot { position: relative; height: 42px; } .sw-slot .tvs-switch { position: absolute; left: 0; top: 0; } .sb { opacity: 0; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Pranešimų juostelė', sideOn: 1, sub: ['Pranešimai'], body: `<div class="tvs-table"><div class="tvs-th"><div class="tvs-check"></div><span>Tekstas</span></div><div class="tvs-row" data-t="row"><div class="tvs-check"></div><div>${MSG}</div></div></div>` }),
      E.win({ cls: 'scr2', crumb: 'Pranešimų juostelė  /  Redaguoti', sideOn: 1, sub: ['Pranešimai'], body: `<div class="tvs-form is-dense"><div class="tvs-field"><div class="tvs-label">Tekstas</div><div class="tvs-input is-value">${MSG}</div></div>
            <div class="tvs-field" data-t="fon"><div class="tvs-label">Įjungta</div><div class="sw-slot" data-t="sw">${sw(true, 'sa')}${sw(false, 'sb')}</div></div></div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` }), site('scr3', false)],
    steps: [{ t: 'b1', spot: 'row', pad: 4 }, { t: 'b1+0.2', cur: 'row', ax: 0.3 }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'fon', pad: 6 }, { t: 'b2', cur: 'sw', ax: 0.75 }, { t: 'b2+0.6', click: true }, { t: 'b2+0.65', hide: '.sa', dur: 0.15 }, { t: 'b2+0.65', show: '.sb', dur: 0.15 },
      { t: 'g2-0.4', cur: 'save', dur: 0.35 }, { t: 'g2', click: true }, { t: 'g2+0.2', scr: 3, slide: 'up' }, { t: 'b3', spot: 'top', pad: 6 }, { t: 'b3', cur: [1300, 700], dur: 0.8 }, { t: 'g3', flash: '.scr3 .tvs-sweb-h' }],
  },
});
