#!/usr/bin/env node
// „Nuorodų tipo sintaksės“ — TVS epizodai (epizodai.js): padalytas kadras (svetainė viršuje, „Turinys“ apačioje).
const E = require('../../epizodai');
const S = E.SVG;
const upd = E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' });
const cell = (cls = '', name = '', t = '') => `<div class="tvs-logo-c"${t ? ` data-t="${t}"` : ''}><b class="${cls}"></b><span>${name}</span></div>`;
const logos = `<div class="tvs-logos lg" data-t="logos">${cell('', 'Švietimo portalas', 'c1')}${cell('is-2', 'Savivaldybė')}${cell('is-3', 'Biblioteka', 'c3')}${cell('is-3', 'Muziejus')}${cell('', 'Sporto centras')}${cell('is-2', 'Jaunimo centras')}</div>`;
const intro = '<p>Ugdymo karjerai informacija.</p>';
const SPLIT_CSS = `
  .tvs-split-bot .tvs-cke-body { min-height: 100px; }
  .lg .tvs-logo-c { height: 96px; } .lg .tvs-logo-c b { height: 40px; }
  .linkp { font-size: 19px; color: #444; margin-top: 8px; }
  .pg2 { position: absolute; inset: 58px 0 0; background: #fff; padding: 20px 40px; }
  .pg2 .tvs-sweb-t { font-size: 28px; }`;
const editor = (code) => E.cke(`${intro}<p data-t="code">${code}</p>`, { t: 'cke' });
const page2 = `<div class="pg2"><div class="tvs-sweb-t">Būrelių tvarkaraštis</div><div class="tvs-sweb-p">Pirmadienis – robotika, 14.30. Antradienis – choras, 15.00. Trečiadienis – krepšinis, 15.30.</div></div>`;

E.build(__dirname, {
  '01-naudingos-nuorodos-puslapyje': {
    note: 'Kadras 1 — „Naudingos nuorodos puslapyje“ (ep_664_01_2): {{nuorodos(1)}} → „Atnaujinti“ → logotipų plytelės po tris',
    origin: '50% 70%',
    screens: [E.split('scr1', { siteTitle: 'Ugdymas karjerai', siteBody: `<div class="tvs-sweb-p">Ugdymo karjerai informacija.</div>${logos}`, editor: editor(E.typed('syn', '{{nuorodos(1)}}')), foot: upd })],
    css: SPLIT_CSS,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'syn', dt: 0.07 },
      { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd' }, { t: 'g2', click: true },
      { t: 'b3', spot: 'stop', pad: 4 }, { t: 'b3', show: '.lg', rise: 16, dur: 0.5 }, { t: 'b3+0.2', cur: [1500, 380], dur: 0.8 },
      { t: 'b4', spot: ['c1', 'c3'], pad: 6 }, { t: 'g3', flash: '.lg' },
    ],
  },
  '02-nuoroda-pagal-id': {
    note: 'Kadras 2 — „Nuoroda pagal ID“ (ep_664_02_1): {{page_url(181)}} → nuoroda puslapio pavadinimu → atsidaro tame pačiame lange',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Būreliai', siteBody: `<div class="tvs-sweb-p">Būrelių sąrašas atnaujintas rugsėjo 1 d.</div><div class="linkp lk">Plačiau: <span class="tvs-slink" data-t="link">Būrelių tvarkaraštis</span></div>${page2}`,
      editor: editor(`<span class="code">${E.typed('syn', '{{page_url(181)}}')}</span>`), foot: upd })],
    css: SPLIT_CSS + `
  .num { border-radius: 3px; }`,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'syn', dt: 0.08 },
      { t: 'b2', spot: 'code', pad: 8 },
      { t: 'b3', spot: 'stop', pad: 4 }, { t: 'b3', show: '.lk', rise: 10 }, { t: 'b3+0.3', spot: 'link', pad: 8 },
      { t: 'b4', cur: 'link', ax: 0.6 }, { t: 'g2', click: true }, { t: 'g2+0.05', show: '.pg2', dur: 0.3 }, { t: 'g2+0.2', spot: 'stop', pad: 4 },
      { t: 'g3', flash: '.tvs-split-top' }, { t: 'g3+0.2', cur: [1500, 380], dur: 0.8 },
    ],
  },
  '03-nuoroda-pagal-sluga': {
    note: 'Kadras 3 — „Nuoroda pagal SLUG“ (ep_664_03_1): {{page_url(\'…\')}} kabutėse; naršyklės juostoje domenas pilkas',
    origin: '50% 30%',
    screens: [E.split('scr1', { siteTitle: 'Būreliai', siteBody: `<div class="tvs-sweb-p">Būrelių sąrašas atnaujintas rugsėjo 1 d.</div><div class="linkp lk">Plačiau: <span class="tvs-slink" data-t="link">Būrelių tvarkaraštis</span></div>${page2}
        <div class="omni-ov">${E.chrome('<span class="is-dim dom" data-t="dom">https://demomokykla.lt/</span><span class="is-mark">tvarkarasciai/bureliu-tvarkarastis</span>', 'omni')}</div>`,
      editor: editor(E.typed('syn', "{{page_url('tvarkarasciai/bureliu-tvarkarastis')}}")), foot: upd })],
    css: SPLIT_CSS + `
  .omni-ov { position: absolute; left: 0; right: 0; top: 0; z-index: 4; box-shadow: 0 6px 20px rgba(0,0,0,.12); }`,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'syn', dt: 0.035 },
      { t: 'b2', show: '.omni-ov', rise: -10 }, { t: 'b2+0.2', spot: 'omni', pad: 6 },
      { t: 'b3', spot: 'dom', pad: 6 }, { t: 'b4-0.6', hide: '.omni-ov' },
      { t: 'b4-0.5', show: '.lk', rise: 10 }, { t: 'b4-0.4', spot: 'link', pad: 8 }, { t: 'b4-0.4', cur: 'link', ax: 0.6 },
      { t: 'g2', click: true }, { t: 'g2+0.05', show: '.pg2', dur: 0.3 }, { t: 'g2+0.2', spot: 'stop', pad: 4 },
      { t: 'g3', flash: '.tvs-split-top' }, { t: 'g3+0.2', cur: [1500, 380], dur: 0.8 },
    ],
  },
});
