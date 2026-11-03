#!/usr/bin/env node
// „Realios situacijos ir jų sprendimai“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const VGK = 'Vaiko gerovės komisija', PLAN = 'Planavimo dokumentai';
const DOC = 'Vaiko gerovės komisijos veiklos planas 2026 m.';
const ALL = ['Ugdymo planas 2025–2026 m. m.', 'Mokinių priėmimo tvarkos aprašas', DOC, 'Darbo tvarkos taisyklės', 'Vaiko gerovės komisijos darbo reglamentas', 'Pailgintos dienos grupės tvarka', 'Pagalbos mokiniui teikimo tvarka'];
const VGKD = [DOC, 'Vaiko gerovės komisijos darbo reglamentas', 'Pagalbos mokiniui teikimo tvarka'];

const filter = (val) => `<div class="tvs-filter">
            <div class="tvs-input f-search">Paieška</div>
            <div class="tvs-select f-cat" data-t="cat"><span class="ph-cat">Kategorijos</span>${val ? `<span class="v-cat">${VGK}</span>` : ''}</div>
            ${E.btn('Filtruoti', { icon: I.filter, t: 'filtr' })}${E.btn('Valyti', { cls: 'is-grey' })}
          </div>`;
const crumb = 'Dokumentų banko modulis  /  Dokumentai';
const list1 = E.win({ cls: 'scr1', crumb, sideOn: 3, body: `
          <div>${E.btn('Sukurti', { icon: S.plus })}</div>
          ${filter(true)}
          <div class="dd-wrap"><div class="tvs-select-list cat-dd" data-t="dd"><div class="tvs-select-opt">Kategorijos</div><div class="tvs-select-opt">Ugdymo planai</div><div class="tvs-select-opt is-hl" data-t="optvgk">${VGK}</div><div class="tvs-select-opt">${PLAN}</div><div class="tvs-select-opt">Tvarkos</div></div></div>
          ${E.docTable(ALL.map(n => E.docRow(n)).join(''))}` });
const list2 = E.win({ cls: 'scr2', crumb, sideOn: 3, body: `
          <div>${E.btn('Sukurti', { icon: S.plus })}</div>
          ${filter(true).replace(' data-t="cat"', '').replace(" data-t=\"filtr\"", '')}
          <div data-t="flist">${E.docTable(VGKD.map(n => E.docRow(n)).join(''))}</div>` });

const form = E.win({ cls: 'scr1', crumb: `${crumb}  /  Redaguoti`, sideOn: 3, body: `
          <div class="tvs-alert saved">Dokumentas išsaugotas.</div>
          <div class="tvs-form is-dense d-form">
            <div class="tvs-field" data-t="ftitle"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-value"><span>Vaiko gerovės komisijos veiklos <mark class="plan" data-t="plan">planas</mark> 2026 m.</span></div></div>
            <div class="tvs-field" data-t="ftags"><div class="tvs-label">Kategorijos</div>
              <div class="tvs-tags"><span class="tvs-chip">${VGK}<span class="tvs-chip-x">×</span></span><span class="chip-slot"><span class="tvs-chip chip2">${PLAN}<span class="tvs-chip-x">×</span></span><span class="tag-in">${E.typed('tag', PLAN)}</span></span></div>
              <div class="tvs-help">Separate values with a comma or by pressing "Enter".</div></div>
            <div class="tvs-field" data-t="fdate"><div class="tvs-label">Patikrinimo data</div><div class="tvs-date"><span class="tvs-date-x">${I.x}</span><span class="tvs-date-v">${E.typed('date', '2027-01-15 09:00', { caret: false })}</span><span class="tvs-date-tz">Europe/Vilnius</span></div></div>
            <div class="tvs-field"><div class="tvs-label">Komentaras</div><div class="tvs-input is-value com">Atnaujinti kitų metų planą</div></div>
          </div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save' })}<span class="tvs-sp"></span>${E.btn('Atšaukti', { cls: 'is-tiny is-grey' })}</div>` });
const row = (n, d, z, c) => [n, d, z, c];
const site = E.site('scr2', `
          <div class="two-sets">
            ${E.sdocs(VGK, [row(DOC, '2026-11-03 10:12:05', '412.30 KB', 'is-hit'), row('Vaiko gerovės komisijos darbo reglamentas', '2025-09-01 08:30:11', '226.72 KB'), row('Pagalbos mokiniui teikimo tvarka', '2025-09-01 08:31:40', '198.04 KB')], { t: 'set1' })}
            ${E.sdocs(PLAN, [row('Ugdymo planas 2025–2026 m. m.', '2025-08-29 14:02:10', '1.67 MB'), row(DOC, '2026-11-03 10:12:05', '412.30 KB', 'is-hit'), row('Strateginis planas 2025–2027 m.', '2025-01-20 09:15:00', '880.12 KB')], { t: 'set2' })}
          </div>`, { title: 'Dokumentai', on: 0, nav: ['Apie mokyklą', 'Dokumentai', 'Mokiniams', 'Tėvams', 'Kontaktai'] });

E.build(__dirname, {
  '01-kategorijos-filtravimas': {
    note: 'Kadras 1 — „Filtruojate pagal kategoriją“ (ep_677_01_1): kategorijų sąrašas → „Filtruoti“ → lieka trys eilutės',
    origin: '45% 25%',
    screens: [list1, list2],
    css: `
  .f-search { width: 260px; } .f-cat { width: 420px; position: relative; }
  .f-cat .v-cat { color: var(--tvs-text); }
  .dd-wrap { position: relative; height: 0; z-index: 5; }
  .cat-dd { position: absolute; left: 272px; top: -22px; width: 420px; box-shadow: 0 8px 24px rgba(0,0,0,.12); }
  .scr2 .ph-cat { display: none; }`,
    steps: [
      { t: 'b1', spot: 'cat', pad: 8 }, { t: 'b1', cur: 'cat', ax: 0.8 }, { t: 'b1', zoom: 1.25 },
      { t: 'g1', click: true }, { t: 'g1+0.1', show: '.cat-dd', dur: 0.15 }, { t: 'g1+0.1', spot: ['cat', 'dd'] },
      { t: 'g1+0.5', cur: 'optvgk', ax: 0.5, dur: 0.5 }, { t: 'g1+1.2', click: true },
      { t: 'g1+1.3', hide: '.cat-dd', dur: 0.15 }, { t: 'g1+1.3', hide: '.scr1 .ph-cat', dur: 0.05 }, { t: 'g1+1.3', show: '.scr1 .v-cat', dur: 0.05 }, { t: 'g1+1.35', spot: 'cat' },
      { t: 'b2', spot: 'filtr', pad: 8 }, { t: 'b2', cur: 'filtr' }, { t: 'b2+1.3', click: true },
      { t: 'b2+1.5', scr: 2 }, { t: 'b2+1.5', spot: null }, { t: 'b2+1.6', zoom: 1 },
      { t: 'b3', spot: 'flist', pad: 6 }, { t: 'b3+0.2', cur: [1380, 820], dur: 0.8 },
    ],
  },
  '01-antra-kategorija-ir-priminimas': {
    note: 'Kadras 2 — „Antra kategorija ir priminimas“ (ep_677_01_3): žyma jau yra → „Planavimo dokumentai“ → data → svetainėje du rinkiniai',
    origin: '45% 35%',
    screens: [form, site],
    css: `
  .plan { background: transparent; color: inherit; padding: 0 2px; border-radius: 3px; }
  .d-form .tvs-tags { min-height: 58px; }
  .chip-slot { position: relative; display: inline-flex; }
  .tag-in { position: absolute; left: 0; top: 0; bottom: 0; display: inline-flex; align-items: center; padding-left: 6px; font-size: 21px; white-space: nowrap; }
  .two-sets .tvs-sdocs-tr.is-hit { background: #fff6dd; }
  .saved { opacity: 0; }`,
    steps: [
      { t: 'b1', spot: 'ftags' }, { t: 'b1+0.2', cur: 'ftags', ax: 0.55, ay: 0.45 },
      { t: 'b2', spot: 'ftitle' },
      { t: 'g1-0.4', spot: 'ftags' }, { t: 'g1', type: 'tag', dt: 0.07 }, { t: 'g1+1.7', hide: '.tag-in', dur: 0.1 }, { t: 'g1+1.7', show: '.chip2', dur: 0.2 },
      { t: 'b3', spot: 'fdate' }, { t: 'b3', cur: 'fdate', ax: 0.4, ay: 0.75 }, { t: 'b3+0.2', type: 'date', dt: 0.05 },
      { t: 'b3+1.0', spot: 'save', pad: 10 }, { t: 'b3+0.9', cur: 'save', dur: 0.4 }, { t: 'g2-0.2', click: true },
      { t: 'g2', show: '.saved', dur: 0.2 }, { t: 'g2', spot: null },
      { t: 'b4-0.3', scr: 2, slide: 'up' }, { t: 'b4', spot: ['set1', 'set2'], pad: 12 }, { t: 'b4', cur: [1380, 820], dur: 0.8 },
      { t: 'b4+1.0', flash: '.two-sets .is-hit' },
    ],
    anim: (T) => [['.plan', `planhl 0.4s ease-out ${T('b2+1.0')}s both`]],
    keyframes: () => '  @keyframes planhl { from { background: transparent; } to { background: #ffe58a; } }',
  },
});
