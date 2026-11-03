#!/usr/bin/env node
// „Partnerių ir draugų modulio valdymas“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const logos = (cls = '') => `<div class="part ${cls}" data-t="part"><div class="tvs-sweb-sec">Partneriai ir draugai</div><div class="prow">${['', 'is-2', 'is-3', '', 'is-2'].map(c => `<div class="tvs-logo-c"><b class="${c}"></b></div>`).join('')}</div></div>`;
const home = (cls, withP, extraCls = '') => E.site(cls, `<div class="clip"><div class="scroll"><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div>
          <div class="tvs-sweb-sec" style="margin-top:26px" data-t="tv">Tvarkaraščiai</div><div class="tvs-sweb-p">Pamokų, būrelių ir konsultacijų tvarkaraščiai.</div>${withP ? logos(extraCls) : ''}<div class="foot">Demo gimnazija · Mokyklos g. 1 · info@demo.lt</div></div></div>`, { title: 'Sveiki atvykę' });
const sw = (yes, cls = '') => yes ? `<span class="tvs-switch is-yes ${cls}"><span>Yes</span><span></span></span>` : `<span class="tvs-switch is-no ${cls}"><span></span><span>No</span></span>`;
const PART = ['Demo partneris', 'Savivaldybė', 'Biblioteka', 'Sporto centras', 'Jaunimo centras'];
const CSS = `.clip { height: 640px; overflow: hidden; } .prow { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; border: 1px solid #eee; } .prow .tvs-logo-c { height: 110px; } .foot { margin-top: 26px; padding: 18px; background: #e4e3e3; color: #666; font: 16px var(--tvs-site-font); }
  .p-table .tvs-th, .p-table .tvs-row { grid-template-columns: 30px 1fr 160px; } .sw-slot { position: relative; height: 42px; } .sw-slot .tvs-switch { position: absolute; left: 0; top: 0; } .sb { opacity: 0; }`;
E.build(__dirname, {
  '02-partneriai-tituliniame': {
    note: 'K1 — „Partneriai tituliniame“ (ep_708_02_1)', origin: '50% 60%', css: CSS,
    screens: [home('scr1', true)],
    steps: [{ t: 'b2', spot: { ref: 'part', dy: -300 }, pad: 10 }, { t: 'b3', flash: '.prow' }],
    anim: (T) => [['.scroll', `slinkti 3s cubic-bezier(.45,0,.2,1) ${T('b1+0.3')}s both`]],
    keyframes: () => '  @keyframes slinkti { from { transform: none; } to { transform: translateY(-300px); } }',
  },
  '04-partnerio-nuoroda': {
    note: 'K3 — „Partnerio nuoroda“ (ep_708_04_1)', origin: '40% 45%', css: CSS,
    screens: [E.win({ cls: 'scr1', crumb: 'Partneriai ir draugai  /  Demo partneris', sideOn: 1, sub: ['Partneriai'], body: `<div class="tvs-form is-dense">
            <div class="tvs-field"><div class="tvs-label">Pavadinimas</div><div class="tvs-input is-value">Demo partneris</div></div>
            <div class="tvs-field" data-t="fu"><div class="tvs-label">Url</div><div class="tvs-input is-focus">${E.typed('u', 'https://demo-partneris.lt/')}</div></div>
            <div class="tvs-field" data-t="ft"><div class="tvs-label">Target</div><div class="tvs-input">${E.typed('t', '_blank')}</div></div></div>
          <div class="tvs-alert saved">Įrašas išsaugotas.</div><div class="tvs-form-foot">${E.btn('Išsaugoti', { cls: 'is-tiny', icon: S.save })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` })],
    steps: [{ t: 'b1', spot: 'fu', pad: 6 }, { t: 'b1', zoom: 1.2 }, { t: 'b1+0.2', cur: 'fu', ax: 0.3, ay: 0.8 }, { t: 'g1', type: 'u', dt: 0.05 }, { t: 'b2', spot: 'ft', pad: 6 }, { t: 'b2', cur: 'ft', ax: 0.3, ay: 0.8 }, { t: 'g2', type: 't', dt: 0.1 },
      { t: 'b3', zoom: 1 }, { t: 'b3', spot: 'save', pad: 10 }, { t: 'b3', cur: 'save', dur: 0.4 }, { t: 'g3', click: true }, { t: 'g4', show: '.saved', dur: 0.2 }, { t: 'g4', flash: '.saved' }],
  },
  '05-logotipu-isjungimas': {
    note: 'K4 — „Logotipų išjungimas“ (ep_708_05_1)', origin: '75% 35%', css: CSS,
    screens: [E.win({ cls: 'scr1', crumb: 'Partneriai ir draugai', sideOn: 1, sub: ['Partneriai'], body: `<div class="tvs-table p-table"><div class="tvs-th"><div class="tvs-check"></div><span>Pavadinimas</span><span data-t="hen">Enabled</span></div>${PART.map((n, i) => `<div class="tvs-row"><div class="tvs-check"></div><div>${n}</div><div><div class="sw-slot" data-t="s${i}"><span class="sa${i}">${sw(true)}</span><span class="sb${i}">${sw(false)}</span></div></div></div>`).join('')}</div>` })],
    steps: [{ t: 'b1', spot: 'hen', pad: 8 }, { t: 'b1', zoom: 1.3 },
      ...[0, 1, 2, 3, 4].flatMap(i => [{ t: `g${i + 1}-0.25`, cur: `s${i}`, ax: 0.7, dur: 0.2 }, { t: `g${i + 1}`, click: true }, { t: `g${i + 1}+0.02`, hide: `.sa${i}`, dur: 0.1 }, { t: `g${i + 1}+0.02`, show: `.sb${i}`, dur: 0.1 }]),
      { t: 'b2', spot: ['s0', 's4'], pad: 8 }],
  },
  '05-sekcija-dingsta': {
    note: 'K5 — „Sekcija dingsta“ (ep_708_05_2)', origin: '50% 60%', css: CSS + ` .scroll { transform: translateY(-300px); }`,
    screens: [home('scr1', true), home('scr2', false)],
    steps: [{ t: 0.4, spot: { ref: 'part', dy: -300 }, pad: 10 }, { t: 'b1', spot: null }, { t: 'b1+0.4', scr: 2, dur: 0.6 }, { t: 'b2', spot: { ref: 'tv', dy: -300 }, pad: 10 }],
  },
});
