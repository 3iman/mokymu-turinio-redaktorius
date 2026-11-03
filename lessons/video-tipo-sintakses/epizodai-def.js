#!/usr/bin/env node
// „Video tipo sintaksės“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const upd = E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' });
const CSS = `
  .tvs-split-bot .tvs-cke-body { min-height: 100px; }
  .tvs-split-top .tvs-sweb-b { padding: 14px 40px; }
  .v1 { height: 300px; margin-top: 6px; }
  .vg { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 6px; } .vg .tvs-svid { height: 150px; }`;
const vid = (t, cls = '', h = '') => `<div class="tvs-svid ${cls}"${h}><span class="tvs-svid-t">${t}</span><span class="tvs-svid-play"></span><span class="tvs-svid-bar"><i></i></span></div>`;
const ed = (code) => E.cke(`<p>Renginių vaizdo įrašai.</p><p data-t="code">${code}</p>`);

// K2: puslapio redagavimas → skirtukas „Video“ → „Add Row“ → nuoroda → peržiūra
const TABS = ['Turinys', 'Nustatymai', 'Video', 'SEO'];
const rep = (n, title, url, cls = '', t = '') => `<div class="tvs-rep ${cls}"${t ? ` data-t="${t}"` : ''}><div class="tvs-rep-bar"><span class="tvs-check"></span>Video ${n}</div><div class="tvs-rep-body vrow">
  <div class="tvs-field"><div class="tvs-label">Antraštė</div><div class="tvs-input is-value">${title}</div></div>
  <div class="tvs-field"><div class="tvs-label">Video</div><div class="tvs-input${url ? ' is-value' : ''}"${t ? ` data-t="${t}url"` : ''}>${url}</div></div>
  <div class="prev">${vid(title || '')}</div></div></div>`;
const edit = E.win({ cls: 'scr1', crumb: 'Puslapiai  /  Renginiai  /  Redaguoti', sideOn: 1, body: `
          <div>${E.tabs(TABS, 0, { 2: 'tabv' })}<div class="tvs-form pg-form">${E.cke('<h3>Renginiai</h3><p>Mokyklos renginių akimirkos.</p>')}</div></div>` });
const vtab = E.win({ cls: 'scr2', crumb: 'Puslapiai  /  Renginiai  /  Redaguoti', sideOn: 1, body: `
          <div>${E.tabs(TABS, 2)}<div class="tvs-form pg-form vlist">
            ${rep(1, 'Kalėdinis koncertas', 'https://www.youtube.com/watch?v=k4L3dEmo')}
            ${rep(2, 'Rudens koncertas', `<span class="ph-u">http://</span>${E.typed('u', 'https://youtu.be/rudens-koncertas')}`, 'newrow', 'r2')}
            <div class="vfoot">${E.btn('Add Row', { cls: 'is-tiny', icon: S.plus, t: 'addrow' })}${E.btn('Select All', { cls: 'is-tiny is-grey' })}</div>
          </div></div>` });

E.build(__dirname, {
  '01-vienas-video': {
    note: 'Kadras 1 — „Vienas video“ (ep_662_01_1): {{videos({\'limit\': \'1\'})}} → vienas grotuvas per visą plotį, paleidžiamas',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Renginiai', siteBody: `<div class="one" data-t="one">${vid('Kalėdinis koncertas', 'v1', ' data-t="play"')}</div>`, editor: ed(E.typed('syn', "{{videos({'limit': '1'})}}")), foot: upd })],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'stop', pad: 4 },
      { t: 'b2', spot: 'cke', pad: 6 }, { t: 'b2+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'syn', dt: 0.05 },
      { t: 'b3', show: '.one', rise: 14 }, { t: 'b3', spot: 'stop', pad: 4 },
      { t: 'b4', cur: 'play' }, { t: 'b4+0.7', click: true }, { t: 'g2', flash: '.v1' },
    ],
    anim: (T) => [['.v1 .tvs-svid-play', `slepti 0.2s linear ${T('b4+0.75')}s both`], ['.v1 .tvs-svid-bar i', `eiga 3s linear ${T('b4+0.8')}s both`]],
    keyframes: () => '  @keyframes slepti { from { opacity: 1; } to { opacity: 0; } }\n  @keyframes eiga { from { width: 0; } to { width: 22%; } }',
  },
  '02-video-galerijos-formavimas': {
    note: 'Kadras 2 — „Video galerijos formavimas“ (ep_662_02_1): skirtukas „Video“ → „Add Row“ → nuoroda → peržiūra',
    origin: '50% 50%',
    screens: [edit, vtab],
    css: `
  .pg-form { padding-top: 10px; padding-bottom: 10px; } .tvs-cke-body { min-height: 260px; }
  .vlist { display: flex; flex-direction: column; gap: 14px; padding: 14px 20px; }
  .vrow { display: grid; grid-template-columns: 1fr 1.4fr 260px; gap: 18px; align-items: end; padding: 12px 16px; }
  .vrow .tvs-field { padding: 0; } .prev .tvs-svid { height: 120px; }
  .vfoot { display: flex; gap: 8px; } .ph-u { color: #9aa0a6; position: absolute; left: 18px; } .newrow [data-t="r2url"] { position: relative; }
  .newrow .prev { opacity: 0; }`,
    steps: [
      { t: 'b1', spot: 'tabv', pad: 4 }, { t: 'b1+0.2', cur: 'tabv' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, dur: 0.2 }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'addrow', pad: 8 }, { t: 'b2+0.2', cur: 'addrow' }, { t: 'g2', click: true }, { t: 'g2+0.1', show: '.newrow', rise: 14 },
      { t: 'b3', spot: 'r2url', pad: 8 }, { t: 'b3+0.2', cur: 'r2url', ax: 0.3, ay: 0.75 }, { t: 'g3-0.05', hide: '.ph-u', dur: 0.05 }, { t: 'g3', type: 'u', dt: 0.035 },
      { t: 'b4', show: '.newrow .prev', rise: 10 }, { t: 'b4', spot: 'r2', pad: 6 }, { t: 'g4', flash: '.newrow .prev' }, { t: 'b4+0.3', cur: [1400, 820], dur: 0.8 },
    ],
  },
  '03-video-galerija': {
    note: 'Kadras 3 — „Video galerija“ (ep_662_03_1): {{videos()}} → įrašai po du',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Renginiai', siteBody: `<div class="vg" data-t="vg">${vid('Kalėdinis koncertas', 'g1')}${vid('Rudens koncertas', 'g2')}</div>`, editor: ed(E.typed('syn', '{{videos()}}')), foot: upd })],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'syn', dt: 0.08 },
      { t: 'b2', show: '.g1', rise: 14 }, { t: 'b2', spot: 'stop', pad: 4 }, { t: 'b2+0.3', cur: [1500, 400], dur: 0.8 },
      { t: 'b3', show: '.g2', rise: 14 }, { t: 'b3+0.2', spot: 'vg', pad: 8 }, { t: 'g2', flash: '.vg' },
    ],
  },
});
