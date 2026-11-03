#!/usr/bin/env node
// „Informacija gestų kalba“ — TVS epizodas (epizodai.js). Vaizdo įrašo laukas — standartinis failo laukas (kl_1622_1 dar atviras).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const tree = E.win({ cls: 'scr1', crumb: 'Puslapiai', sideOn: 1, sub: ['Puslapiai'], body: `<div class="tvs-tree pt">
            <div class="tvs-node"><div class="tvs-node-handle"></div>Apie mokyklą</div><div class="tvs-node is-l2"><div class="tvs-node-handle"></div>Istorija</div>
            <div class="tvs-node is-l2" data-t="ngk"><div class="tvs-node-handle"></div>Informacija gestų kalba</div><div class="tvs-node is-l2"><div class="tvs-node-handle"></div>Informacija lengvai suprantama kalba</div>
            <div class="tvs-node"><div class="tvs-node-handle"></div>Mokiniams</div></div>` });
const form = E.win({ cls: 'scr2', crumb: 'Puslapiai  /  Informacija gestų kalba  /  Redaguoti', sideOn: 1, sub: ['Puslapiai'], body: `<div class="tvs-form is-dense">
            <div class="tvs-field"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-value">Informacija gestų kalba</div></div>
            <div class="tvs-field" data-t="fv"><div class="tvs-label">Vaizdo įrašas</div><div class="btns">${E.btn('Select File', { cls: 'is-tiny is-info', t: 'sel' })}${E.btn('Upload', { cls: 'is-tiny', t: 'upl' })}</div>
              <div class="tvs-frow vrow"><span class="tvs-fico">${I.file}</span><div class="tvs-fmeta"><span class="tvs-fname">gestu-kalba-2026.mp4</span><span class="tvs-fpath">local://puslapiai/gestu-kalba-2026.mp4</span></div><span class="fsz">18.4 MB</span></div></div></div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>` });
const site = E.site('scr3', `<div class="tvs-sweb-p">Informacija apie mokyklą lietuvių gestų kalba.</div><div class="tvs-svid vp" data-t="vp" style="height:380px;margin-top:16px"><span class="tvs-svid-t">Vertėjo įrašas</span><span class="tvs-svid-play"></span><span class="tvs-svid-bar"><i></i></span></div>`, { title: 'Informacija gestų kalba', on: 0 });
E.build(__dirname, {
  '05-gestu-video-i-puslapi': {
    note: 'K6 — „Gestų kalbos vaizdo įrašas į puslapį“ (ep_1622_05_1)', origin: '40% 40%',
    css: `.pt { background: #fff; padding: 12px; } .btns { display: flex; gap: 8px; margin-bottom: 6px; } .fsz { font-size: 17px; color: var(--tvs-text-muted); margin-left: 24px; }`,
    screens: [tree, form, site],
    steps: [{ t: 'b1', spot: 'ngk', pad: 6 }, { t: 'b1+0.2', cur: 'ngk', ax: 0.4 }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null },
      { t: 'b2', spot: 'fv', pad: 6 }, { t: 'b2', cur: 'sel' }, { t: 'g2-0.6', click: true }, { t: 'g2-0.2', cur: 'upl', dur: 0.3 }, { t: 'g2', click: true }, { t: 'g2+0.2', show: '.vrow', rise: 10 },
      { t: 'b3', cur: 'save', dur: 0.5 }, { t: 'g3', click: true }, { t: 'g3+0.15', scr: 3, slide: 'up' }, { t: 'g3+0.2', spot: 'vp', pad: 8 }, { t: 'g4', flash: '.vp' }, { t: 'g3+0.3', cur: [1400, 820], dur: 0.8 }],
  },
});
