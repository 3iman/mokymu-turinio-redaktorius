#!/usr/bin/env node
// „Ką atsakyti, kai paklausia apie slapukus“ (platformos epizodai) — epizodai.js. Katalogas *-platforma: YouTube pamoka liko nepaliesta.
const E = require('../../epizodai');
const SITE = '<span class="is-dim">https://</span>demomokykla.lt';
const page = (body) => `<div class="tvs-sweb pg"><div class="tvs-sweb-h"><div class="tvs-sweb-crest"></div><div class="tvs-sweb-name">Demo mokykla<small>Demo miestas</small></div></div>
          <div class="tvs-sweb-nav"><span class="is-on">Apie mokyklą</span><span>Mokiniams</span><span>Tėvams</span><span>Kontaktai</span></div><div class="tvs-sweb-b">${body}</div></div>`;
const home = page('<div class="tvs-sweb-t">Sveiki atvykę</div><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div>');
const consent = page(`<div class="tvs-sweb-t">Slapukų valdymas</div><div class="tvs-cookie-q">Ar sutinkate, kad Google analytics rinktų nuasmenintą informaciją apie jūsų apsilankymus šioje interneto svetainėje?</div><div class="tvs-radio" data-t="r1">Sutinku</div><div class="tvs-radio" data-t="r2">Nesutinku</div>`);
const bar = (cls = '') => `<div class="tvs-cookiebar ${cls}" data-t="cbar"><span>Ši svetainė naudoja slapukus. Pasirinkite, ką leidžiate.</span><div class="tvs-cookie-btns"><span class="tvs-cookie-btn is-outline" data-t="nust">NUSTATYMAI</span><span class="tvs-cookie-btn" data-t="nes">NESUTINKU</span><span class="tvs-cookie-btn" data-t="sut">SUTINKU</span></div></div>`;
const br = (cls, url, inner, o = {}) => E.scr(`${cls} br`, `        ${E.chrome(url, o.t || 'omni').replace('class="tvs-chrome"', `class="tvs-chrome${o.inc ? ' is-incognito' : ''}"`)}${o.dots ? '<span class="dots" data-t="dots">⋮</span>' : ''}\n        <div class="br-in">${inner}</div>${o.extra || ''}`);
const CSS = `.br { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #dfe3ea; box-shadow: 0 24px 60px rgba(30,40,70,.12); } .br .tvs-chrome { position: relative; z-index: 2; }
  .br-in { position: absolute; inset: 60px 0 0; overflow: hidden; } .pg { position: absolute; inset: 0; border: 0; border-radius: 0; box-shadow: none; } .dots { position: absolute; right: 22px; top: 12px; z-index: 3; font: 700 26px Arial; color: #555; }
  .tvs-sfoot { margin-top: 30px; } .clip { height: 760px; overflow: hidden; } .bm { opacity: 0; } .eq { position: absolute; border: 3px dashed #16a34a; border-radius: 4px; z-index: 6; opacity: 0; }`;
const foot = `<div class="tvs-sfoot"><div class="tvs-sfoot-cols"><div class="tvs-sfoot-col"><div class="tvs-sfoot-h">Demo mokykla</div>Mokyklos g. 1</div><div class="tvs-sfoot-col">info@demo.lt</div><div class="tvs-sfoot-col"><span class="ck" data-t="ck">Slapukų valdymas</span></div><div class="tvs-sfoot-col">Prieinamumo pareiškimas</div></div></div>`;
E.build(__dirname, {
  '03-slapuku-valdymo-nuoroda': {
    note: 'K3 — „Slapukų valdymo nuoroda“ (ep_1765_03_1)', origin: '30% 6%', css: CSS,
    screens: [br('scr1', `${SITE}${E.typed('p', '/slapuku-valdymas')}`, home), br('scr2', `${SITE}/slapuku-valdymas`, consent, { t: 'omni2' })],
    steps: [{ t: 'b1', spot: 'omni', pad: 6 }, { t: 'b1', zoom: 1.5 }, { t: 'b1+0.2', cur: 'omni', ax: 0.3, ay: 0.8 }, { t: 'g1', type: 'p', dt: 0.08 }, { t: 'g1+1.6', scr: 2 }, { t: 'g1+1.6', zoom: 1 }, { t: 'b2', spot: 'omni2', pad: 6 }, { t: 'g2', flash: '[data-t="omni2"]' }],
  },
  '04-privatus-langas': {
    note: 'K4 — „Privatus langas“ (ep_1765_04_1)', origin: '80% 10%', css: CSS,
    screens: [br('scr1', SITE, home, { dots: true, extra: '<div class="tvs-bmenu bm"><div>Naujas skirtukas</div><div>Naujas langas</div><div class="is-hl" data-t="inc">Naujas inkognito langas</div><hr><div>Istorija</div></div>' }),
      br('scr2', E.typed('u', 'demomokykla.lt'), `${home}${bar('cb')}`, { inc: true, t: 'omni2' })],
    steps: [{ t: 'b1', spot: 'dots', pad: 6 }, { t: 'b1', cur: 'dots' }, { t: 'g1', click: true }, { t: 'g1+0.05', show: '.bm', dur: 0.15 }, { t: 'g1+0.2', cur: 'inc', dur: 0.4 }, { t: 'g1+0.9', click: true }, { t: 'g1+1.0', scr: 2, dur: 0.3 },
      { t: 'b2', spot: 'omni2', pad: 6 }, { t: 'b2', cur: 'omni2', ax: 0.2, ay: 0.8 }, { t: 'g2', type: 'u', dt: 0.08 }, { t: 'b3', show: '.cb', rise: 30 }, { t: 'b3', spot: 'cbar', pad: 4 }, { t: 'b3', cur: [1300, 400], dur: 0.8 }, { t: 'g3', flash: '.cb' }],
  },
  '04-vienodi-mygtukai': {
    note: 'K5 — „Vienodi mygtukai“ (ep_1765_04_2)', origin: '70% 90%', css: CSS + ` .eq1, .eq2 { }`,
    screens: [br('scr1', SITE, `${home}${bar()}`)],
    steps: [{ t: 'b1', spot: 'cbar', pad: 4 }, { t: 'b1', zoom: 1.5 }, { t: 'b2', spot: ['nes', 'sut'], pad: 8 }, { t: 'b2+0.2', flash: '[data-t="nes"]' }, { t: 'g1', flash: '[data-t="sut"]' }],
  },
  '04-nustatymai-nepazymeta': {
    note: 'K6 — „Nustatymai — nepažymėta“ (ep_1765_04_3)', origin: '50% 50%', css: CSS,
    screens: [br('scr1', SITE, `${home}${bar()}`), br('scr2', `${SITE}/slapuku-valdymas`, consent, { t: 'omni2' })],
    steps: [{ t: 'b1', spot: 'nust', pad: 6 }, { t: 'b1', cur: 'nust' }, { t: 'g1', click: true }, { t: 'g1+0.2', scr: 2, slide: 'right' }, { t: 'b2', spot: ['r1', 'r2'], pad: 10 }, { t: 'b2', cur: [1300, 700], dur: 0.8 }, { t: 'g2', flash: '.tvs-radio' }],
  },
  '04-nuoroda-porasteje': {
    note: 'K7 — „Nuoroda poraštėje“ (ep_1765_04_4)', origin: '50% 70%', css: CSS + ` .ck { text-decoration: underline; color: var(--tvs-site-link); }`,
    screens: [br('scr1', SITE, page(`<div class="clip"><div class="scroll"><div class="tvs-sweb-t">Sveiki atvykę</div><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div>${foot}</div></div>`)),
      br('scr2', `${SITE}/slapuku-valdymas`, consent, { t: 'omni2' })],
    steps: [{ t: 'b2', spot: { ref: 'ck', dy: -300 }, pad: 8 }, { t: 'b2+0.2', cur: { ref: 'ck', dy: -300 } }, { t: 'g1', click: true }, { t: 'g1+0.2', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: 'omni2', pad: 6 }],
    anim: (T) => [['.scroll', `slinkti 2.6s cubic-bezier(.45,0,.2,1) ${T('b1+0.2')}s both`]],
    keyframes: () => '  @keyframes slinkti { from { transform: none; } to { transform: translateY(-300px); } }',
  },
});
