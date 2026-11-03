#!/usr/bin/env node
// „Kaip publikuoti vaizdo įrašus be YouTube“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const CR = 'Naujienų modulis  /  Naujienos  /  Redaguoti';
const VIDS = ['sventes-eisena.mp4', 'sventes-koncertas.mp4'];
const gal = (o = {}) => `<div class="tvs-field" data-t="fgal"><div class="tvs-label">Nuotraukų galerija</div><div class="btns">${E.btn('Select File', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny' })}</div>
              ${['IMG_0412.jpg', 'IMG_0415.jpg'].map(n => `<div class="tvs-frow"><span class="tvs-thumb is-wide"></span><div class="tvs-fmeta"><span class="tvs-fname">${n}</span></div><span class="tvs-btn is-tiny is-pink">${S.remove}Šalinti</span></div>`).join('')}
              ${(o.vids === false ? [] : VIDS).map((n, i) => `<div class="tvs-frow vrow v${i}"${o.t ? ` data-t="v${i}"` : ''}><span class="tvs-fico">${E.VID_ICO}</span><div class="tvs-fmeta"><span class="tvs-fname">${n}</span><span class="tvs-fpath">local://naujienos/${n}</span></div><span class="tvs-btn is-tiny is-info"${i === 0 ? ' data-t="view"' : ''}>${I.eye}Peržiūrėti</span><span class="tvs-btn is-tiny is-pink"${o.t ? ` data-t="rm${i}"` : ''}>${S.remove}Šalinti</span></div>`).join('')}</div>`;
const edit = (cls, body, o = {}) => E.win({ cls, crumb: CR, sideOn: 4, sub: ['Naujienos'], body: `${E.tabs(['Bendri', 'Turinys', 'Nuotraukos', 'Video', 'Sintaksė'], o.tab || 2, { 3: 'tabv', 4: 'tabs' })}<div class="tvs-form is-dense">${body}</div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save })}</div>`, extra: o.extra || '' });
const CSS = `.btns { display: flex; gap: 8px; margin-bottom: 6px; } .upw { position: absolute; left: 330px; top: 140px; width: 1150px; z-index: 10; } .up-sub { padding: 0 22px 8px; } .tvs-frow .tvs-btn { margin-left: 8px; } .tvs-frow .tvs-fmeta { flex: 1; }
  .brw { position: absolute; inset: 0; background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #dfe3ea; } .brw .pl { position: absolute; inset: 60px 0 0; background: #111; display: flex; align-items: center; justify-content: center; } .brw .pl video, .brw .pl .tvs-svid { width: 900px; height: 500px; }
  .mk { border-radius: 3px; padding: 0 2px; }`;
E.build(__dirname, {
  '02-pridedate-failus': {
    note: 'K2 — „Pridedate failus“ (ep_691_02_2)', origin: '45% 40%', css: CSS + ` .vrow { opacity: 0; } .gone { overflow: hidden; }`,
    screens: [edit('scr1', gal(), { extra: `\n        <div class="upw" data-t="upw">${E.upload('Naujienos', VIDS.map((n, i) => [n, ['14.2 MB', '22.8 MB'][i], 'video/mp4', 'Naujienos', `gone ur${i}`, `add${i}`]), { cls: 'up' })}</div>` })],
    steps: [{ t: 'b1', spot: 'upw', pad: 4 }, { t: 'b1+0.2', cur: 'add0' }, { t: 'g1', click: true }, { t: 'g1+0.3', cur: 'add1', dur: 0.4 }, { t: 'g2', click: true },
      { t: 'b2', cur: 'upx', dur: 0.4 }, { t: 'g3', click: true }, { t: 'g3+0.05', hide: '.upw', dur: 0.2 }, { t: 'g3+0.1', spot: 'fgal', pad: 6 }, { t: 'g3+0.2', show: '.vrow', rise: 10 }, { t: 'g4', flash: '.vrow' }],
    anim: (T) => [['.ur0', `isnyksta 0.35s ease ${T('g1+0.05')}s both`], ['.ur1', `isnyksta 0.35s ease ${T('g2+0.05')}s both`]],
    keyframes: () => '  @keyframes isnyksta { from { max-height: 90px; opacity: 1; } to { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; } }',
  },
  '02-kopijuojate-kelia': {
    note: 'K3 — „Kopijuojate kelią“ (ep_691_02_3)', origin: '30% 6%', css: CSS,
    screens: [edit('scr1', gal({ t: true })), E.scr('scr2 brw', `${E.chrome('<span class="is-dim">https://demomokykla.lt</span><span class="mk" data-t="mk">/files/naujienos/sventes-eisena.mp4</span>', 'omni')}<div class="pl"><div class="tvs-svid"><span class="tvs-svid-play"></span><span class="tvs-svid-bar"><i></i></span></div></div>`)],
    steps: [{ t: 'b1', spot: 'v0', pad: 4 }, { t: 'b1', cur: 'view' }, { t: 'g1', click: true }, { t: 'g1+0.2', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null }, { t: 'b2', cur: [1300, 700], dur: 0.6 },
      { t: 'b3-0.3', zoom: 1.6 }, { t: 'b3', spot: 'mk', pad: 6 }, { t: 'b3', cur: 'mk', ax: 0, dur: 0.4 }, { t: 'b3+0.5', cur: 'mk', ax: 1, dur: 0.7 }, { t: 'g2', flash: '.mk' }],
    anim: (T) => [['.mk', `pazymeti 0.7s linear ${T('b3+0.5')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { background: linear-gradient(90deg, #b3d4fc 0 0%, transparent 0); } to { background: linear-gradient(90deg, #b3d4fc 0 100%, transparent 0); } }',
  },
  '03-kelias-i-video-lauka': {
    note: 'K4 — „Kelias į video lauką“ (ep_691_03_1)', origin: '45% 40%', css: CSS + ` .vb { opacity: 0; } .vrow2 { display: grid; grid-template-columns: 1fr 1.4fr 260px; gap: 18px; align-items: end; padding: 12px 16px; } .vrow2 .tvs-field { padding: 0; } .vrow2 .tvs-svid { height: 120px; } .pv { opacity: 0; }`,
    screens: [edit('scr1', `<div class="tvs-rep vb" data-t="vb"><div class="tvs-rep-bar"><span class="tvs-check"></span>Video 1</div><div class="tvs-rep-body vrow2"><div class="tvs-field"><div class="tvs-label">Antraštė</div><div class="tvs-input is-value">Šventės eisena</div></div>
        <div class="tvs-field" data-t="fv"><div class="tvs-label">Video</div><div class="tvs-input">${E.typed('u', '/files/naujienos/sventes-eisena.mp4')}</div></div><div class="tvs-svid pv"><span class="tvs-svid-play"></span></div></div></div><div>${E.btn('Add Row', { cls: 'is-tiny', icon: S.plus, t: 'addrow' })}</div>`, { tab: 3 })],
    steps: [{ t: 'b1', spot: 'tabv', pad: 4 }, { t: 'b1', cur: 'tabv' }, { t: 'g1', click: true }, { t: 'g1+0.3', cur: 'addrow', dur: 0.4 }, { t: 'g1+0.3', spot: 'addrow', pad: 8 }, { t: 'g2', click: true }, { t: 'g2+0.1', show: '.vb', rise: 10 },
      { t: 'b2', spot: 'vb', pad: 6 }, { t: 'b2', cur: 'fv', ax: 0.3, ay: 0.8 }, { t: 'g3', type: 'u', dt: 0.02 }, { t: 'g4-0.3', show: '.pv', rise: 8 }, { t: 'g4', flash: '.pv' }],
  },
  '03-kopijuojate-video-sintakse': {
    note: 'K5 — „Kopijuojate video sintaksę“ (ep_691_03_2)', origin: '45% 35%', css: CSS + ` .syn .tvs-syn-r { grid-template-columns: 150px 380px 1fr; } .toast { left: 1000px; top: 290px; }`,
    screens: [edit('scr1', `<div class="tvs-syn syn">${[["{{ videos({'limit': '1'}) }}", 'Vienas vaizdo įrašas per visą plotį', 'vr'], ['{{ videos() }}', 'Visi vaizdo įrašai po du'], ['{{ images(2) }}', 'Dvi nuotraukos']].map(([c, d, t]) => `<div class="tvs-syn-r"${t ? ` data-t="${t}"` : ''}><span class="tvs-btn is-tiny is-violet"${t ? ' data-t="copy"' : ''}>${S.copy.replace('currentColor', '#fff')}Kopijuoti</span><code>${E.esc(c)}</code><span class="tvs-help">${d}</span></div>`).join('')}</div>`, { tab: 4, extra: '\n        <div class="tvs-toast toast">Nukopijuota</div>' })],
    steps: [{ t: 'b1', spot: 'tabs', pad: 4 }, { t: 'b1', cur: 'tabs' }, { t: 'g1', click: true }, { t: 'b2', spot: 'vr', pad: 4 }, { t: 'b2', cur: 'copy' }, { t: 'g2', click: true }, { t: 'g3', show: '.toast', rise: 6 }, { t: 'g3', flash: '[data-t="vr"]' }],
  },
  '04-grotuvai-svetaineje': {
    note: 'K6 — „Grotuvai svetainėje“ (ep_691_04_2)', origin: '50% 50%', css: CSS + ` .vp { height: 220px; margin: 10px 0 14px; max-width: 760px; }`,
    screens: [edit('scr1', E.cke('<p>Šventės eisena prasidėjo prie mokyklos.</p><p>{{ videos({\'limit\': \'1\'}) }}</p><p>Vėliau vyko koncertas.</p><p>{{ videos() }}</p>'), { tab: 1 }),
      E.site('scr2', `<div class="tvs-art-p">Šventės eisena prasidėjo prie mokyklos.</div><div class="tvs-svid vp" data-t="vp1"><span class="tvs-svid-play"></span></div><div class="tvs-art-p">Vėliau vyko koncertas.</div><div class="tvs-svid vp" data-t="vp2" style="height:160px"><span class="tvs-svid-play"></span></div>`, { title: 'Rugsėjo 1-oji', on: 3 })],
    steps: [{ t: 'b1', spot: 'upd', pad: 10 }, { t: 'b1', cur: 'upd' }, { t: 'g1', click: true }, { t: 'g1+0.2', scr: 2, slide: 'up' }, { t: 'b2', spot: ['vp1', 'vp2'], pad: 8 }, { t: 'b2', cur: [1400, 820], dur: 0.8 }, { t: 'g2', flash: '.vp' }],
  },
  '05-salinate-mp4': {
    note: 'K7 — „Šalinate mp4“ (ep_691_05_1)', origin: '45% 45%', css: CSS + ` .vrow { overflow: hidden; }`,
    screens: [edit('scr1', gal({ t: true }))],
    steps: [{ t: 'b1', spot: 'fgal', pad: 6 }, { t: 'b1+0.2', cur: 'rm0' }, { t: 'g1', click: true }, { t: 'g1+0.3', cur: 'rm1', dur: 0.5 }, { t: 'g2', click: true },
      { t: 'b2', spot: 'fgal', pad: 6 }, { t: 'b3', spot: 'upd', pad: 10 }, { t: 'b3', cur: 'upd' }, { t: 'g3', click: true }, { t: 'g4', flash: '[data-t="fgal"]' }],
    anim: (T) => [['.v0', `isnyksta 0.35s ease ${T('g1+0.05')}s both`], ['.v1', `isnyksta 0.35s ease ${T('g2+0.05')}s both`]],
    keyframes: () => '  @keyframes isnyksta { from { max-height: 90px; opacity: 1; } to { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; margin: 0; } }',
  },
});
