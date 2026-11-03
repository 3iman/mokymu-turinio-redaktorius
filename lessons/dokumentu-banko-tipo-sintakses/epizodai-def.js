#!/usr/bin/env node
// „Dokumentų banko tipo sintaksės“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const upd = E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' });
const CSS = `
  .tvs-split-bot .tvs-cke-body { min-height: 100px; }
  .tvs-split-top .tvs-sweb-b { padding: 14px 40px; }
  .onedoc { display: inline-flex; align-items: center; gap: 12px; margin-top: 10px; font-size: 20px; color: var(--tvs-site-link); border: 2px solid var(--tvs-site-link); padding: 12px 18px; border-radius: 4px; }
  .onedoc svg { width: 24px; height: 24px; }
  .tvs-split-top .tvs-sdocs { font-size: 15px; } .tvs-split-top .tvs-sdocs-tr { padding: 4px 0; }`;
const tree = E.win({ cls: 'scr2', crumb: 'Dokumentų banko modulis  /  Kategorijos', sideOn: 3, sub: ['Dokumentai', 'Kategorijos'], subOn: 1, body: `
          <div class="tvs-tree cat-tree">
            <div class="tvs-node"><div class="tvs-node-handle"></div>Ugdymo planai<span class="tvs-id">(#4)</span></div>
            <div class="tvs-node" data-t="n13"><div class="tvs-node-handle"></div>Planavimo dokumentai<span class="tvs-id id13" data-t="id13">(#13)</span></div>
            <div class="tvs-node is-l2"><div class="tvs-node-handle"></div>Strateginiai planai<span class="tvs-id">(#14)</span></div>
            <div class="tvs-node is-l2"><div class="tvs-node-handle"></div>Metiniai veiklos planai<span class="tvs-id">(#15)</span></div>
            <div class="tvs-node is-l2"><div class="tvs-node-handle"></div>Biudžeto vykdymo ataskaitų rinkiniai<span class="tvs-id">(#21)</span></div>
            <div class="tvs-node"><div class="tvs-node-handle"></div>Tvarkos<span class="tvs-id">(#6)</span></div>
          </div>` });
const docs = E.win({ cls: 'scr1', crumb: 'Dokumentų banko modulis  /  Dokumentai', sideOn: 3, sub: ['Dokumentai', '<span data-t="subcat">Kategorijos</span>'], body: `
          <div>${E.btn('Sukurti', { icon: S.plus })}</div>
          <div data-t="dlist">${E.docTable(['Strateginis planas 2025–2027 m.', 'Metinis veiklos planas 2026 m.', 'Biudžeto vykdymo ataskaita 2025 m.', 'Darbo tvarkos taisyklės'].map(n => E.docRow(n)).join(''))}</div>` });
const r = (n, d, z, c) => [n, d, z, c];
E.build(__dirname, {
  '01-vienas-dokumentas-puslapyje': {
    note: 'Kadras 1 — „Vienas dokumentas puslapyje“ (ep_667_01_2): {{dokumentubankas_file(129)}} → viena ryški nuoroda',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Gimnazistų taryba', siteBody: `<div class="tvs-sweb-p">Gimnazistų tarybą sudaro kiekvienos klasės atstovai.</div><div class="onedoc od" data-t="od">${I.dl}Gimnazistų tarybos nuostatai</div>`,
      editor: E.cke(`<h3>Gimnazistų taryba</h3><p data-t="code">${E.typed('syn', '{{dokumentubankas_file(129)}}')}</p>`), foot: upd })],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'syn', dt: 0.06 },
      { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd' }, { t: 'g2', click: true },
      { t: 'b3', show: '.od', rise: 12 }, { t: 'b3', spot: 'od', pad: 10 }, { t: 'b3+0.2', cur: [1500, 400], dur: 0.8 }, { t: 'g3', flash: '.od' },
    ],
  },
  '02-tevines-kategorijos-id': {
    note: 'Kadras 2 — „Tėvinės kategorijos ID“ (ep_667_02_1): „Kategorijos“ → medyje numeris prie pavadinimo',
    origin: '40% 35%',
    screens: [docs, tree],
    css: `.cat-tree { background: #fff; padding: 14px; } .id13 { border-radius: 4px; padding: 0 4px; }`,
    steps: [
      { t: 'b1', spot: 'dlist', pad: 6 }, { t: 'b2', spot: 'subcat', pad: 10 },
      { t: 'b3', cur: 'subcat' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.3', spot: 'n13', pad: 6 },
      { t: 'g1+0.4', cur: 'n13', ax: 0.3 }, { t: 'g1+1.2', spot: 'id13', pad: 8 }, { t: 'g1+1.3', zoom: 1.2 }, { t: 'g1+1.4', flash: '.id13' },
    ],
  },
  '02-kategorijos-lentele': {
    note: 'Kadras 3 — „Kategorijos lentelė“ (ep_667_02_2): {{dokumentubankas_category(13)}} → lentelė su datomis ir dydžiais',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Planavimo dokumentai', siteBody: `<div class="tbl">${E.sdocs('Planavimo dokumentai', [r('2026 m.', '', '', 'is-group'), r('Metinis veiklos planas 2026 m.', '2026-01-15 09:12:40', '612.30 KB'), r('2025 m.', '', '', 'is-group'), r('Strateginis planas 2025–2027 m.', '2025-01-20 09:15:00', '880.12 KB')], { t: 'tbl' })}</div>`,
      editor: E.cke(`<h3>Planavimo dokumentai</h3><p data-t="code">${E.typed('syn', '{{dokumentubankas_category(13)}}')}</p>`), foot: upd })],
    css: CSS + `.tbl { margin-top: 6px; }`,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'syn', dt: 0.05 },
      { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd' }, { t: 'g2', click: true },
      { t: 'b3', show: '.tbl', rise: 12 }, { t: 'b3', spot: 'tbl', pad: 8 }, { t: 'b3+0.2', cur: [1500, 400], dur: 0.8 }, { t: 'g3', flash: '.tbl .tvs-sdocs' },
    ],
  },
});
