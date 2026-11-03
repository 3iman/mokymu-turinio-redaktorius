#!/usr/bin/env node
// „Nuotraukų tipo sintaksės“ — TVS epizodai (epizodai.js): padalytas kadras.
const E = require('../../epizodai');
const S = E.SVG;
const upd = E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' });
const ph = (cls = '', st = '') => `<div class="tvs-photo ${cls}"${st ? ` style="${st}"` : ''}></div>`;
const CSS = `
  .tvs-split-bot .tvs-cke-body { min-height: 100px; }
  .tvs-split-top .tvs-sweb-b { padding: 12px 40px; }
  .grid { display: grid; gap: 8px; margin-top: 6px; }
  .g4 { grid-template-columns: repeat(4, 1fr); } .g4 .tvs-photo { height: 92px; }
  .g2 { grid-template-columns: 1fr 1fr; } .g2 .tvs-photo { height: 120px; }
  .g3 { grid-template-columns: repeat(3, 1fr); } .g3 .tvs-photo { height: 150px; }
  .g6 { grid-template-columns: repeat(6, 1fr); } .g6 .tvs-photo { height: 160px; }
  .wide .tvs-photo { height: 230px; } .dim { opacity: .35; }
  .num { display: inline-block; max-width: 1em; overflow: hidden; vertical-align: top; }
  .h { font-size: 18px; font-weight: 700; color: #222; margin-top: 6px; }`;
const ed = (code, extra = '') => E.cke(`<p>Ugdymo aplinka</p><p data-t="code">${code}</p>${extra}`);
const base = (t) => [{ t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: t, dt: 0.08 }];
const save = (at) => [{ t: `${at}-0.6`, spot: 'upd', pad: 10 }, { t: `${at}-0.7`, cur: 'upd', dur: 0.5 }, { t: at, click: true }];
const show = (sel, at, ref) => [{ t: at, show: sel, rise: 14 }, { t: at, spot: ref || 'stop', pad: ref ? 8 : 4 }, { t: `${at}+0.2`, cur: [1500, 420], dur: 0.8 }];
const site = (body, title = 'Ugdymo aplinka') => ({ siteTitle: title, siteBody: body });
E.build(__dirname, {
  '01-visa-galerija': {
    note: 'Kadras 1 — „Visa galerija“ (ep_661_01_1): {{images()}} → visa galerija tinkleliu',
    origin: '50% 50%', css: CSS,
    screens: [E.split('scr1', { ...site(`<div class="tvs-sweb-p">Mokyklos erdvės ir klasės.</div><div class="grid g4 gal" data-t="gal">${Array.from({ length: 8 }, () => ph()).join('')}</div>`), editor: ed(E.typed('s', '{{images()}}')), foot: upd })],
    steps: [...base('s'), ...save('g2'), ...show('.gal', 'b3', 'gal'), { t: 'b4', spot: 'stop', pad: 4 }, { t: 'g3', flash: '.gal' }],
  },
  '02-viena-plati-nuotrauka': {
    note: 'Kadras 2 — „Viena plati nuotrauka“ (ep_661_02_1): {{images(1)}} → viena nuotrauka per visą plotį, žemesnė nei originalas',
    origin: '50% 50%', css: CSS + ` .orig { position: absolute; left: 40px; right: 40px; top: 70px; height: 330px; border: 3px dashed #e5322d; border-radius: 4px; }`,
    screens: [E.split('scr1', { ...site(`<div class="h">Antra antraštė apie naujieną</div><div class="wide w1" data-t="w1">${ph()}</div><div class="orig"></div>`), editor: ed(E.typed('s', '{{images(1)}}')), foot: upd })],
    steps: [...base('s'), ...save('g2'), ...show('.w1', 'b2', 'w1'), { t: 'b3', show: '.orig', dur: 0.3 }, { t: 'g3+0.9', hide: '.orig', dur: 0.4 }, { t: 'g3', flash: '.w1 .tvs-photo' }],
  },
  '03-dvi-nuotraukos-salia': {
    note: 'Kadras 3 — „Dvi nuotraukos šalia“ (ep_661_03_1): {{images(2)}} → dvi šalia; antra eilutė — dar dvi',
    origin: '50% 50%', css: CSS,
    screens: [E.split('scr1', { ...site(`<div class="h">Trečia antraštė apie naujieną</div><div class="grid g2 p1" data-t="p1">${ph()}${ph()}</div><div class="grid g2 p2" data-t="p2">${ph()}${ph()}</div>`),
      editor: ed(E.typed('s', '{{images(2)}}'), `<p data-t="code2">${E.typed('s2', '{{images(2)}}')}</p>`), foot: upd })],
    steps: [...base('s'), { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd', dur: 0.5 }, { t: 'g2', click: true }, ...show('.p1', 'g2+0.3', 'p1'),
      { t: 'b3', spot: 'code2', pad: 6 }, { t: 'b3', cur: 'code2', ax: 0.02, ay: 1.8 }, { t: 'b3+0.2', type: 's2', dt: 0.06 }, { t: 'g3-0.2', show: '.p2', rise: 12 }, { t: 'g3', spot: ['p1', 'p2'], pad: 8 }, { t: 'g3', flash: '.p2' }],
  },
  '04-trys-nuotraukos-eiluteje': {
    note: 'Kadras 4 — „Trys nuotraukos eilutėje“ (ep_661_04_1): {{images(3)}} → trys eilute, likusios nerodomos',
    origin: '50% 50%', css: CSS,
    screens: [E.split('scr1', { ...site(`<div class="h">Antra antraštė apie naujieną</div><div class="grid g3 r3" data-t="r3">${ph()}${ph()}${ph()}</div><div class="grid g3 dim rest">${ph()}${ph()}${ph()}</div>`), editor: ed(E.typed('s', '{{images(3)}}')), foot: upd })],
    steps: [...base('s'), { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd', dur: 0.5 }, { t: 'g2', click: true }, ...show('.r3', 'b3', 'r3'), { t: 'b4-0.3', show: '.rest', dur: 0.3 }, { t: 'b4+0.6', hide: '.rest', dur: 0.6 }, { t: 'g3', flash: '.r3' }],
  },
  '05-nuotrauka-per-visa-ploti': {
    note: 'Kadras 5 — „Nuotrauka per visą plotį“ (ep_661_05_1): {{plakatas()}} → visa nuotrauka per visą plotį, nenukirpta',
    origin: '50% 50%', css: CSS + ` .pl { position: relative; } .pl .tvs-photo { height: 290px; } .lim { position: absolute; inset: -4px; border: 3px dashed #16a34a; border-radius: 4px; }`,
    screens: [E.split('scr1', { ...site(`<div class="pl" data-t="pl">${ph()}<div class="lim"></div></div>`), editor: ed(E.typed('s', '{{plakatas()}}')), foot: upd })],
    steps: [...base('s'), { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd', dur: 0.5 }, { t: 'g2', click: true }, ...show('.pl', 'b3', 'pl'),
      { t: 'b4', show: '.lim', dur: 0.2 }, { t: 'g3+0.8', hide: '.lim', dur: 0.3 }, { t: 'g3', flash: '.pl .tvs-photo' }],
    anim: (T) => [['.pl .tvs-photo', `mazinti 0.8s cubic-bezier(.16,1,.3,1) ${T('b3')}s both`]],
    keyframes: () => '  @keyframes mazinti { from { transform: scale(1.35); } to { transform: none; } }',
  },
  '06-nuotraukos-plotis': {
    note: 'Kadras 6 — „Nuotraukos plotis“ (ep_661_06_1): {{plakatas({\'width\': \'300\'})}} → nuotrauka 300 px pločio',
    origin: '50% 50%', css: CSS + ` .w300 { position: relative; width: 300px; } .w300 .tvs-photo { height: 200px; } .dimv { position: absolute; left: 0; right: 0; top: -26px; text-align: center; font: 700 16px var(--tvs-font); color: #e5322d; }
  .dimv::before { content: ''; position: absolute; left: 0; right: 0; top: 18px; border-top: 2px solid #e5322d; } .num { border-radius: 3px; }`,
    screens: [E.split('scr1', { ...site(`<br><div class="w300" data-t="w300">${ph()}<div class="dimv">300 px</div></div>`),
      editor: ed(`${E.typed('s', "{{plakatas({'width': '", { caret: false })}<span class="num" data-t="num">${E.typed('n', '300')}</span>${E.typed('s3', "'})}}", { caret: false })}`), foot: upd })],
    steps: [{ t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 's', dt: 0.04 }, { t: 'g1+0.9', type: 'n', dt: 0.05 }, { t: 'g1+1.1', type: 's3', dt: 0.04 },
      { t: 'b2', spot: 'num', pad: 6 }, { t: 'g2', flash: '.num' },
      ...show('.w300', 'b3', 'w300'), { t: 'b4', spot: 'code', pad: 8 }, { t: 'g3', flash: '.w300 .tvs-photo' }],
  },
  '07-vertikalios-nuotraukos': {
    note: 'Kadras 7 — „Vertikalios nuotraukos“ (ep_661_07_1): {{images(3)}} — horizontalios tvarkingai, vertikalios apkarpomos',
    origin: '50% 50%', css: CSS + ` .lab { font: 700 15px var(--tvs-font); color: #555; margin: 4px 0 2px; } .vv .tvs-photo { height: 150px; } .q { position: absolute; right: 10px; top: 8px; width: 34px; height: 34px; border-radius: 50%; background: #e5322d; color: #fff; font: 700 22px/34px var(--tvs-font); text-align: center; } .vv > div { position: relative; }`,
    screens: [E.split('scr1', { ...site(`<div class="lab">Horizontalios</div><div class="grid g3 hh" data-t="hh">${ph()}${ph()}${ph()}</div><div class="lab">Vertikalios</div><div class="grid g3 vv" data-t="vv">${[1, 2, 3].map(() => `<div>${ph('is-v', 'height:150px')}<span class="q">?</span></div>`).join('')}</div>`, 'Diplomai'), editor: ed('{{images(3)}}'), foot: upd })],
    steps: [{ t: 'b1', spot: 'stop', pad: 4 }, { t: 'b1+0.2', cur: [1500, 420], dur: 0.8 }, { t: 'b2', show: '.hh', rise: 12 }, { t: 'b2', spot: 'hh', pad: 8 }, { t: 'g1', flash: '.hh' },
      { t: 'b3', show: '.vv', rise: 12 }, { t: 'b3', spot: 'vv', pad: 8 }, { t: 'b3+1.0', show: '.q', dur: 0.3 }],
  },
  '08-kiek-vertikaliu-nuotrauku': {
    note: 'Kadras 8 — „Kiek vertikalių nuotraukų“ (ep_661_08_1): {{diplomai(6)}} → šešios; be skaičiaus — visos',
    origin: '50% 50%', css: CSS + ` .num { border-radius: 3px; } .g6 .tvs-photo { height: 120px; } .more .tvs-photo { height: 120px; }`,
    screens: [E.split('scr1', { ...site(`<div class="h">Penkta antraštė apie diplomus</div><div class="grid g6 six" data-t="six">${Array.from({ length: 6 }, () => ph('is-v')).join('')}</div><div class="grid g6 more" data-t="more">${Array.from({ length: 6 }, () => ph('is-v')).join('')}</div>`, 'Diplomai'),
      editor: ed(`{{diplomai(<span class="num" data-t="num">${E.typed('n', '6', { caret: false })}</span>)}}`), foot: upd })],
    steps: [{ t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'n', dt: 0.1 }, { t: 'g1+0.2', spot: 'num', pad: 6 },
      ...show('.six', 'b2', 'six'), { t: 'g2', flash: '.six' }, { t: 'b3', spot: 'stop', pad: 4 },
      { t: 'b4', spot: 'num', pad: 6 }, { t: 'b4+0.6', show: '.more', rise: 12 }, { t: 'b4+0.6', spot: 'stop', pad: 4 }],
    anim: (T) => [['.num', `isimti 0.3s steps(2, end) ${T('b4+0.4')}s both`]],
    keyframes: () => '  @keyframes isimti { from { max-width: 1em; } to { max-width: 0; } }',
  },
});
