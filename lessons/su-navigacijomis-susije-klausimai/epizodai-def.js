#!/usr/bin/env node
// „Su navigacijomis susiję klausimai“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const crumb = 'Puslapiai  /  Ugdymas  /  Redaguoti';
const TABS = ['Turinys', 'Nustatymai', 'SEO', 'Sintaksė'];
const SYN = [['{{structure(19)}}', 'Subpuslapių navigacija (šio puslapio vaikai)', 'synnav'], ['{{ docs(12) }}', 'Dokumentų rinkinys pagal kategoriją'], ['{{ staff_single(9) }}', 'Darbuotojo profilio kortelė'], ['{{ gallery() }}', 'Puslapio nuotraukų galerija']];
const synList = `<div class="tvs-syn">${SYN.map(([c, d, t]) => `<div class="tvs-syn-r"${t ? ` data-t="${t}"` : ''}><span class="tvs-btn is-tiny is-violet"${t ? ' data-t="copy"' : ''}>${S.copy.replace('currentColor', '#fff')}Kopijuoti</span><code>${E.esc(c)}</code><span class="tvs-help">${d}</span></div>`).join('')}</div>`;
const turinys = E.cke(`<h3>Ugdymas</h3><p>Mokykla vykdo pradinio, pagrindinio ir vidurinio ugdymo programas.</p><p class="syn-line">{{structure(19)}}</p>`);
const foot = E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' }) + E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save }) + '<span class="tvs-sp"></span>' + E.btn('Peržiūrėti', { cls: 'is-tiny is-info', icon: I.eye });
const edit = (cls, on, body, extra = '') => E.win({ cls, crumb, sideOn: 1, body: `${extra}
          <div>${E.tabs(TABS, on, { 3: 'tabsyn' })}<div class="tvs-form pg-form">${body}</div></div>
          <div class="tvs-form-foot">${foot}</div>` });

const SUBS = ['Ugdymo planas', 'Neformalusis švietimas', 'Projektinė veikla', 'Pagalba mokiniui', 'Olimpiados ir konkursai'];
const site = E.site('scr2', `
          <div class="tvs-sweb-p">Mokykla vykdo pradinio, pagrindinio ir vidurinio ugdymo programas.</div>
          <div class="subs" data-t="subs">${SUBS.map(s => `<div class="subs-i"><span>›</span>${s}</div>`).join('')}</div>`, { title: 'Ugdymas', on: 1, nav: ['Apie mokyklą', 'Ugdymas', 'Mokiniams', 'Tėvams', 'Kontaktai'] });

E.build(__dirname, {
  '04-kopijuojate-sintakse': {
    note: 'Kadras 1 — „Kopijuojate sintaksę“ (ep_693_04_2): skirtukas „Sintaksė“ → „Kopijuoti“ prie {{structure(19)}}',
    origin: '40% 30%',
    screens: [edit('scr1', 0, turinys), edit('scr2', 3, synList, '<div class="tvs-toast toast">Nukopijuota</div>')],
    css: `
  .scr1 .tvs-cke-body { min-height: 260px; }
  .pg-form { padding-top: 10px; padding-bottom: 10px; }
  .toast { left: 1180px; top: 192px; }`,
    steps: [
      { t: 'b1', spot: 'tabsyn', pad: 4 }, { t: 'b1+0.2', cur: 'tabsyn' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, dur: 0.2 },
      { t: 'b2', spot: 'synnav', pad: 6 }, { t: 'b2+0.2', cur: 'copy' }, { t: 'g2', click: true },
      { t: 'g3', show: '.toast', rise: 8 }, { t: 'g3', flash: '[data-t="synnav"]' },
    ],
  },
  '04-subpuslapiu-navigacija': {
    note: 'Kadras 2 — „Subpuslapių navigacija“ (ep_693_04_4): „Atnaujinti“ → žalia juosta → svetainėje subpuslapių sąrašas',
    origin: '40% 60%',
    screens: [edit('scr1', 0, turinys, '<div class="tvs-alert saved">Puslapis atnaujintas.</div>'), site],
    css: `
  .scr1 .tvs-cke-body { min-height: 220px; }
  .syn-line { background: #fff6dd; display: inline-block; padding: 2px 6px; }
  .subs { margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px 30px; max-width: 900px; }
  .subs-i { font-size: 21px; color: var(--tvs-site-th); padding: 14px 18px; background: #f4f6f5; border-left: 4px solid var(--tvs-site-th); display: flex; gap: 12px; }
  .subs-i span { font-weight: 700; }`,
    steps: [
      { t: 0.4, spot: 'cke', pad: 6 }, { t: 'b1', spot: 'upd', pad: 10 }, { t: 'b1', cur: 'upd' }, { t: 'g1', click: true },
      { t: 'g1+0.2', show: '.saved', dur: 0.25 }, { t: 'g1+0.2', spot: null },
      { t: 'b2-0.2', scr: 2, slide: 'up' }, { t: 'b2+0.4', spot: 'subs', pad: 12 }, { t: 'b2', cur: [1380, 820], dur: 0.8 },
      { t: 'g2', flash: '.subs' },
    ],
  },
});
