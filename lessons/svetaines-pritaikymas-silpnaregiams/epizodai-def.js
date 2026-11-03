#!/usr/bin/env node
// „Svetainės pritaikymas silpnaregiams“ — svetainės epizodai (epizodai.js): kontrastas, teksto dydis, ryškios nuorodos.
const E = require('../../epizodai');
const page = (cls, o = {}) => E.scr(`${cls} tvs-sweb ${o.contrast ? 'is-contrast' : ''}`, `
        <div class="tvs-a11y"><span data-t="${o.t1 || ''}">Kontrastas</span><span data-t="${o.t2 || ''}">Teksto didinimas</span><span data-t="${o.t3 || ''}">Nuorodų ryškinimas</span></div>
        <div class="tvs-sweb-h"><div class="tvs-sweb-crest"></div><div class="tvs-sweb-name">Demo mokykla<small>Demo miestas</small></div></div>
        <div class="tvs-sweb-nav"><span class="is-on">Apie mokyklą</span><span>Mokiniams</span><span>Tėvams</span><span>Kontaktai</span></div>
        <div class="tvs-sweb-b"><div class="tvs-sweb-t">Apie mokyklą</div><div class="tvs-sweb-p txt" data-t="txt">Mokykla įkurta 1921 metais. Šiandien joje mokosi 640 mokinių. Daugiau apie mūsų <span class="tvs-slink lk">istoriją</span> ir <span class="tvs-slink lk">mokytojus</span> rasite atskiruose puslapiuose. Mokyklos <span class="tvs-slink lk">nuostatai</span> skelbiami dokumentų skiltyje.</div>${o.extra || ''}</div>`);
const CSS = `.txt { font-size: 21px; max-width: 1200px; }`;
E.build(__dirname, {
  '03-kontrasto-rezimas': {
    note: 'K3 — „Kontrasto režimas“ (ep_1624_03_1)', origin: '80% 10%', css: CSS,
    screens: [page('scr1', { t1: 'bk' }), page('scr2', { contrast: true })],
    steps: [{ t: 'b1', spot: 'bk', pad: 6 }, { t: 'b1+0.2', cur: 'bk' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, dur: 0.4 }, { t: 'b2', spot: 'txt', pad: 10 }, { t: 'g2', flash: '.scr2 .txt' }],
  },
  '03-teksto-dydis': {
    note: 'K4 — „Teksto dydis“ (ep_1624_03_2)', origin: '70% 25%', css: CSS + ` .mnu { right: 70px; top: 50px; } .scr1 .txt { transform-origin: 0 0; }`,
    screens: [page('scr1', { t2: 'bt', extra: '<div class="tvs-a11y-m mnu"><span data-t="s1">Dydis +1</span><span data-t="s2">Dydis +2</span><span data-t="s0">Normalus</span></div>' })],
    steps: [{ t: 'b1', spot: 'bt', pad: 6 }, { t: 'b1+0.2', cur: 'bt' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.mnu', dur: 0.15 },
      { t: 'b2', cur: 's1', dur: 0.4 }, { t: 'b2+0.6', click: true }, { t: 'g2-0.3', cur: 's2', dur: 0.3 }, { t: 'g2', click: true }, { t: 'g2+0.3', spot: { ref: 'txt', dh: 90 }, pad: 10 },
      { t: 'b3', cur: 's0', dur: 0.4 }, { t: 'b3+0.6', click: true }, { t: 'b3+0.6', spot: 'txt', pad: 10 }, { t: 'b3+0.8', hide: '.mnu', dur: 0.2 }],
    anim: (T) => [['.scr1 .txt', `didinti ${(T('b3+0.6') - T('b2+0.6')).toFixed(2)}s linear ${T('b2+0.6')}s both`]],
    keyframes: (T) => { const a = T('b2+0.6'), b = T('g2'), c = T('b3+0.6'); const p = (t) => (((t - a) / (c - a)) * 100).toFixed(1);
      return `  @keyframes didinti { 0% { font-size: 21px; } 0.5% { font-size: 25px; } ${p(b - 0.01)}% { font-size: 25px; } ${p(b)}% { font-size: 30px; } 99.9% { font-size: 30px; } 100% { font-size: 21px; } }`; },
  },
  '03-ryskios-nuorodos': {
    note: 'K5 — „Ryškios nuorodos“ (ep_1624_03_3)', origin: '80% 10%', css: CSS,
    screens: [page('scr1', { t3: 'bl' })],
    steps: [{ t: 'b1', spot: 'bl', pad: 6 }, { t: 'b1+0.2', cur: 'bl' }, { t: 'g1', click: true }, { t: 'b2', spot: 'txt', pad: 10 }, { t: 'g2', flash: '.txt' }],
    anim: (T) => [['.lk', `ryskinti 0.01s step-end ${T('g1+0.1')}s both`]],
    keyframes: () => '  @keyframes ryskinti { from { } to { background: #ff0; color: #000; font-weight: 700; padding: 0 3px; } }',
  },
});
