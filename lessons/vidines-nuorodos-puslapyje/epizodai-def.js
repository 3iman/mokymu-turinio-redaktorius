#!/usr/bin/env node
// „Vidinės nuorodos puslapyje“ — TVS epizodai (epizodai.js): CKEditor inkaras ir nuoroda į jį.
const E = require('../../epizodai');
const S = E.SVG;
const crumb = 'Puslapiai  /  Priėmimas į mokyklą  /  Redaguoti';
const foot = `<div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save })}</div>`;
const page = (cls, body, extra = '') => E.win({ cls, crumb, sideOn: 1, extra, body: `
          <div>${E.tabs(['Turinys', 'Nustatymai', 'SEO', 'Sintaksė'], 0)}<div class="tvs-form pg-form">${body}</div></div>
          ${foot}` });

// K1: inkaras prie antraštės „Dokumentai“
const body1 = `<h3>Terminai</h3><p>Prašymai priimami nuo kovo 1 d. iki birželio 30 d.</p>
<h3 class="h-doc" data-t="hdoc"><span class="tvs-anchor anc"></span><span class="ck-caret"></span>Dokumentai</h3><p>Prašymo forma, gimimo liudijimo kopija, sveikatos pažyma.</p>
<h3>Kontaktai</h3><p>Raštinė, tel. 8 600 00000.</p>`;
const dlg1 = E.ckd('Anchor Properties', `<div>Anchor Name</div><div class="tvs-ckd-in" data-t="aname">${E.typed('aname', 'dokumentai')}</div>`, { cls: 'dlg1' });
// K2: nuoroda į inkarą
const body2 = `<ul class="toc"><li>Terminai</li><li><span class="sel-doc" data-t="lidoc">Dokumentai</span></li><li>Kontaktai</li></ul>
<h3>Terminai</h3><p>Prašymai priimami nuo kovo 1 d. iki birželio 30 d.</p>
<h3><span class="tvs-anchor"></span>Dokumentai</h3><p>Prašymo forma, gimimo liudijimo kopija, sveikatos pažyma.</p>`;
const dlg2 = E.ckd('Link', `<div>Link Type</div><div class="tvs-ckd-in is-select lt" data-t="ltype"><span class="lt-url">URL</span><span class="lt-anc">Link to anchor in the text</span></div>
  <div class="url-part"><div>URL</div><div class="tvs-ckd-in"></div></div>
  <div class="anc-part"><div>By Anchor Name</div><div class="tvs-ckd-in is-select" data-t="byname"><span class="bn-v">dokumentai</span></div></div>`, { cls: 'dlg2', tabs: ['Link Info', 'Target', 'Advanced'], ok: 'ok2' });
const site = E.site('scr2', `
          <div class="scroll"><ul class="s-toc"><li>Terminai</li><li class="s-link">Dokumentai</li><li>Kontaktai</li></ul>
          <div class="tvs-sweb-sec">Terminai</div><div class="tvs-sweb-p">Prašymai priimami nuo kovo 1 d. iki birželio 30 d. Pirmumo tvarka taikoma pagal savivaldybės nustatytus kriterijus.</div>
          <div class="tvs-sweb-p gap"></div>
          <div class="tvs-sweb-sec s-doc" data-t="sdoc">Dokumentai</div><div class="tvs-sweb-p">Prašymo forma, gimimo liudijimo kopija, sveikatos pažyma.</div>
          <div class="tvs-sweb-sec">Kontaktai</div><div class="tvs-sweb-p">Raštinė, tel. 8 600 00000.</div></div>`, { title: 'Priėmimas į mokyklą', on: 1, nav: ['Apie mokyklą', 'Priėmimas', 'Mokiniams', 'Tėvams', 'Kontaktai'] });

const CSS = `
  .pg-form { padding-top: 10px; padding-bottom: 10px; }
  .tvs-cke-body { min-height: 330px; }
  .tvs-cke-body h3 { margin: 10px 0 4px; }
  .ck-caret { display: inline-block; width: 2px; height: 1.1em; background: #222; vertical-align: -3px; margin-right: 1px; opacity: 0; }
  .dlg1 { left: 560px; top: 300px; } .dlg2 { left: 520px; top: 200px; width: 720px; }
  .tvs-ckd.dlg2 .tvs-ckd-b { min-height: 250px; }
  .lt { position: relative; } .lt span { position: absolute; left: 10px; }
  .url-part { display: none; }
  .toc { margin: 0 0 6px 24px; } .sel-doc { padding: 0 2px; }
  .s-toc { margin: 0 0 20px 26px; font-size: 20px; line-height: 1.7; color: #444; }
  .s-link { color: var(--tvs-site-link); text-decoration: underline; }
  .gap { height: 340px; }
  .tvs-sweb-b { overflow: hidden; height: 640px; }`;

E.build(__dirname, {
  '02-inkaras': {
    note: 'Kadras 1 — „Inkaras skilties antraštėje“ (ep_909_02_1): žymeklis antraštėje → „Anchor“ → „Anchor Name“ → vėliavėlė',
    origin: '35% 32%',
    screens: [page('scr1', E.cke(body1, { marks: { anchor: 'banchor' } }), dlg1)],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'hdoc', pad: 8 }, { t: 'b1+0.2', cur: 'hdoc', ax: 0, dx: -6, ay: 0.5 }, { t: 'g1', click: true }, { t: 'g1', show: '.ck-caret', dur: 0.05 },
      { t: 'b2-0.3', zoom: 1.4 }, { t: 'b2', spot: 'banchor', pad: 6 }, { t: 'b2+0.2', cur: 'banchor' }, { t: 'g2', click: true },
      { t: 'g2+0.2', show: '.dlg1', dur: 0.2 }, { t: 'g2+0.2', zoom: 1 }, { t: 'g2+0.1', spot: null },
      { t: 'b3', spot: 'aname', pad: 8 }, { t: 'b3+0.2', cur: 'aname', ax: 0.7 }, { t: 'g3', type: 'aname', dt: 0.08 },
      { t: 'g4-0.6', spot: 'ok', pad: 8 }, { t: 'g4-0.6', cur: 'ok' }, { t: 'g4', click: true },
      { t: 'g4+0.15', hide: '.dlg1', dur: 0.2 }, { t: 'g4+0.15', hide: '.ck-caret', dur: 0.05 }, { t: 'g4+0.3', show: '.anc', dur: 0.3 }, { t: 'g4+0.3', spot: 'hdoc', pad: 8 },
      { t: 'g4+0.8', cur: [1380, 820], dur: 0.8 }, { t: 'g4+0.6', flash: '.h-doc' },
    ],
  },
  '03-nuoroda-i-inkara': {
    note: 'Kadras 2 — „Nuoroda į inkarą“ (ep_909_03_1): pažymėta eilutė → „Link“ → „Link to anchor in the text“ → „dokumentai“ → svetainėje nušoka prie skilties',
    origin: '35% 32%',
    screens: [page('scr1', E.cke(body2, { marks: { link: 'blink' } }), dlg2), site],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'lidoc', pad: 8 }, { t: 'b1', cur: 'lidoc', ax: 1 }, { t: 'b1+0.5', show: '.sel-bg', dur: 0.1 },
      { t: 'b1+1.0', zoom: 1.4 }, { t: 'b1+1.0', spot: 'blink', pad: 6 }, { t: 'b1+1.0', cur: 'blink' }, { t: 'g1', click: true },
      { t: 'g1+0.2', show: '.dlg2', dur: 0.2 }, { t: 'g1+0.2', zoom: 1 }, { t: 'g1+0.1', spot: null },
      { t: 'b2', spot: 'ltype', pad: 8 }, { t: 'b2+0.2', cur: 'ltype', ax: 0.9 }, { t: 'g2', click: true },
      { t: 'g2+0.2', hide: '.lt-url', dur: 0.15 }, { t: 'g2+0.2', show: '.lt-anc', dur: 0.2 }, { t: 'g2+0.3', show: '.anc-part', dur: 0.3 },
      { t: 'b3', spot: 'byname', pad: 8 }, { t: 'b3+0.2', cur: 'byname', ax: 0.9 }, { t: 'b3+0.8', show: '.bn-v', dur: 0.1 },
      { t: 'g3-0.5', spot: 'ok2', pad: 8 }, { t: 'g3-0.6', cur: 'ok2' }, { t: 'g3', click: true }, { t: 'g3+0.15', hide: '.dlg2', dur: 0.2 }, { t: 'g3+0.15', spot: null },
      { t: 'b4-0.4', scr: 2, slide: 'up' }, { t: 'b4', cur: [1380, 820], dur: 0.8 }, { t: 'g4', spot: { ref: 'sdoc', dy: -470 }, pad: 10 }, { t: 'g4', flash: '.s-doc' },
    ],
    anim: (T) => [['.scroll', `nusoka 0.7s cubic-bezier(.45,0,.2,1) ${T('b4+0.4')}s both`], ['.sel-doc', `zymejimas 0.1s linear ${T('b1+0.5')}s both`]],
    keyframes: () => '  @keyframes nusoka { from { transform: none; } to { transform: translateY(-470px); } }\n  @keyframes zymejimas { from { background: transparent; } to { background: #b3d4fc; } }',
  },
});
