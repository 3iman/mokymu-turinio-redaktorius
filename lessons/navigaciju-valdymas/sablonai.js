#!/usr/bin/env node
/**
 * „Navigacijų valdymas“ — šablonai kadrams 1–4 ir 8–13 iš bendrų TVS rinkinio dalių (tokens/tvs.css).
 * Vienas šaltinis dešimčiai failų: langas, grupių sąrašas, nuorodų medis, formos, modaliniai langai
 * kartojasi — kad nereikėtų dešimties ranka perrašytų kopijų. Rašo:
 *   templates/{Failas}.html   — pagal eskizai-lt.md ekranus (bazinė CSS būsena = galutinė, §14)
 *   content/lt.json           — skiltys {Failas be brūkšnių}; 05_* (kadrai 5–7, ranka rašyti) nekeičiami
 * Veikiamos vietos žymimos data-t — jas išmatuoja matuoti.js, animacijas rašo animacijos.js.
 *
 *   node lessons/navigaciju-valdymas/sablonai.js
 */
const fs = require('fs');
const path = require('path');

const T = path.join(__dirname, 'templates');
const CONTENT = path.join(__dirname, 'content', 'lt.json');

// ---- SVG ikonos (tokios pat kaip kadruose 5–7) ----
const SVG = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"><path d="M12 4v16M4 12h16"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M3 17.3V21h3.7L17.8 9.9l-3.7-3.7zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.7z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  pick: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><circle cx="10" cy="10" r="6"/><path d="M15 15l6 6" stroke-linecap="round"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"><path d="M4 4h13l3 3v13H4z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/></svg>',
  remove: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6"><circle cx="12" cy="12" r="8.5"/><path d="M6 18L18 6"/></svg>',
  ext: (dt) => `<svg class="tvs-ext"${dt ? ` data-t="${dt}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7M21 3l-9 9"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>`,
  cursor: '<div class="cursor-wrap"><div class="tvs-cursor"><svg viewBox="0 0 44 56"><path d="M4 3v40l10.5-9.5 7 16 7.5-3.3-7-15.7H36z" fill="#1d1d1f" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg></div></div>',
  lupa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="7"/><path d="M16 16l5 5"/></svg>',
  flag: '<svg class="tvs-fa-flag" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2h2v20H4zM7 3h12l-3 5 3 5H7z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>',
};
// Fontawesome „list“ šeima (schematiškai, 40×40): list, list-ol, list-ul, list-alt, th-list, tasks
const FA = {
  list: (w = 3) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round"><path d="M4 6h2M10 6h10M4 12h2M10 12h10M4 18h2M10 18h10"/></svg>`,
  listOl: (w = 2.2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6h11M10 12h11M10 18h11"/><path d="M3 4.5l1.5-1v4.5M3 10.5c0-1 2.5-1.3 2.5 0 0 .9-2.5 1.8-2.5 3h2.6M3 15.8c1.6-.6 2.8.4 1.8 1.5 1.3 1 0 2.6-1.9 1.7"/></svg>`,
  listUl: (w = 3) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round"><path d="M10 6h10M10 12h10M10 18h10"/><circle cx="5" cy="6" r="1.3" fill="currentColor"/><circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="5" cy="18" r="1.3" fill="currentColor"/></svg>`,
  listAlt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 12h8M8 15h8"/></svg>',
  thList: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9.3h18M3 14.6h18M9 4v16"/></svg>',
  tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l1.5 1.5L7 5M10 6h11M3 12l1.5 1.5L7 11M10 12h11M3 18l1.5 1.5L7 17M10 18h11"/></svg>',
  // kitos (prieš paiešką): paprastos formos
  misc: [
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-9.3-9.3C1.4 8.3 3.6 5 7 5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.6 3.3 4.3 6.7C19.5 16.4 12 21 12 21z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a6 6 0 0 0-6 6v4l-2 4h16l-2-4V8a6 6 0 0 0-6-6zm0 20a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18a5 5 0 0 1-.9-9.9A6 6 0 0 1 17.8 9 4.5 4.5 0 0 1 17 18z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 3v12.3A3.5 3.5 0 1 0 11 18V7h7V3z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  ],
};

// ---- Bendros dalys ----
const head = (comment, css) => `<!DOCTYPE html>
<html lang="{{lang}}">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./tokens/tokens.css">
<link rel="stylesheet" href="./tokens/base.css">
<link rel="stylesheet" href="./tokens/tvs.css">
<style>
  /* ${comment}
     Generuoja sablonai.js — ranka neredaguoti. Bazinė būsena = galutinė (PNG rodo rezultatą). */
  .stage { position: relative; width: 1680px; height: 904px; transform-origin: 0 0; }
  .scr { position: absolute; inset: 0; width: 100%; height: 100%; }
  .caret { opacity: 0; }
  .spot { position: absolute; left: 0; top: 0; width: 120px; height: 60px; border: 2.5px solid var(--tvs-info); border-radius: 6px;
          box-shadow: 0 0 0 4000px rgba(0,0,0,.55); opacity: 0; z-index: 60; pointer-events: none; }
  .rp { opacity: 0; z-index: 65; }
  .cursor-wrap { position: absolute; left: 0; top: 0; width: 44px; height: 56px; z-index: 70; pointer-events: none;
                 transform: translate(1250px, 780px); }
  .cursor-wrap .tvs-cursor { left: 0; top: 0; }
${css}
</style>
</head>
<body>
  <div class="card">
    <div class="stage">
`;
const tail = (ripples) => `
      <div class="spot"></div>
${Array.from({ length: ripples }, (_, i) => `      <div class="tvs-ripple rp rp${i + 1}"></div>`).join('\n')}
      ${SVG.cursor}
    </div>
    <div class="brand-bar">
      <img class="brand-logo brand-logo-light" src="{{brand_logo_path}}" alt="Cleverphant" />
      <img class="brand-logo brand-logo-dark" src="{{brand_logo_dark_path}}" alt="Cleverphant" />
    </div>
  </div>
</body>
</html>
`;
const top = () => `<div class="tvs-top"><div class="tvs-logo"><i></i></div><div class="tvs-burger"></div><div class="tvs-searchbar is-text is-placeholder">{{search_ph}}</div></div>`;
const side = (dash = false) => dash
  ? `<div class="tvs-side"><i class="is-on"></i><i></i><i class="is-bars"></i><i></i><i></i><i></i></div>`
  : `<div class="tvs-side"><i></i><i></i><i class="is-bars is-on"></i><i></i><i></i><i></i></div>`;
const subnav = (links) => `<div class="tvs-subnav"><span${links ? '' : ' class="is-on"'}>{{sub_menu}}</span><span${links ? ' class="is-on"' : ''}>{{sub_links}}</span></div>`;
const win = (cls, links, crumb, body, extra = '') => `
      <div class="scr ${cls} tvs-window">
        ${top()}
        ${side()}
        ${subnav(links)}
        <div class="tvs-main">
          <div class="tvs-crumb">${crumb}</div>
${body}
        </div>${extra}
      </div>`;
const btnNew = (key, dt) => `          <div><span class="tvs-btn is-small"${dt ? ` data-t="${dt}"` : ''}>${SVG.plus}{{${key}}}</span></div>`;
const filter = () => `          <div class="tvs-filter"><div class="tvs-input is-placeholder">{{search}}</div><span class="tvs-btn is-small">{{btn_filter}}</span><span class="tvs-btn is-small is-grey">{{btn_clear}}</span></div>`;
const skirt = () => `          <div class="tvs-skirt"><span>{{tab_all}}</span><span>{{tab_trash}}</span></div>`;
/** grupių lentelė; rows = [{g, d, dt, ldt, cls}] (g/d — turinio raktai) */
const groups = (rows, thdt = '') => `          <div class="tvs-table is-menu">
            <div class="tvs-th"><div class="tvs-check"></div><span${thdt ? ` data-t="${thdt}name"` : ''}>{{th_name}}</span><span${thdt ? ` data-t="${thdt}desc"` : ''}>{{th_desc}}</span><span></span></div>
${rows.map(r => `            <div class="tvs-row${r.cls ? ' ' + r.cls : ''}"${r.dt ? ` data-t="${r.dt}"` : ''}><div class="tvs-check"></div><div${r.ndt ? ` data-t="${r.ndt}"` : ''}>{{${r.g}}}</div><div class="tvs-desc"${r.ddt ? ` data-t="${r.ddt}"` : ''}>{{${r.d}}}</div><div class="tvs-actions"><span class="tvs-btn is-tiny is-orange">${SVG.edit}{{btn_edit}}</span><span class="tvs-btn is-tiny is-info"${r.ldt ? ` data-t="${r.ldt}"` : ''}>${SVG.link}{{btn_links}}</span></div></div>`).join('\n')}
          </div>`;
const G6 = [{ g: 'g_1', d: 'd_1' }, { g: 'g_2', d: 'd_2' }, { g: 'g_3', d: 'd_3' }, { g: 'g_4', d: 'd_4' }, { g: 'g_5', d: 'd_5' }, { g: 'g_6', d: 'd_6' }];
const GROUP_TXT = {
  sub_menu: 'Meniu', sub_links: 'Linkai', crumb_menu: 'Navigacijų modulis  /  Meniu', btn_new_menu: 'Naujas meniu',
  search: 'Paieška', btn_filter: 'Filtruoti', btn_clear: 'Valyti', tab_all: 'Visi', tab_trash: 'Šiukšlės',
  th_name: 'Vardas', th_desc: 'Aprašymas', btn_edit: 'Redaguoti', btn_links: 'Linkai',
  g_1: '4 ikonos', d_1: 'Navigacijos ant titulinės nuotraukos',
  g_2: 'Black', d_2: 'Navigacijos su ikonėlėmis, šone po pagrindine nuotrauka ir jos navigacija',
  g_3: 'Footer 1', d_3: 'Pirmoji navigacija apačioje iš kairės',
  g_4: 'Footer 2', d_4: 'Antroji navigacija apačioje iš kairės',
  g_5: 'Main', d_5: 'Pagrindinė navigacija spalvotoje juostoje su subnavigacijomis',
  g_6: 'Mobile', d_6: 'Atskirai kuriama navigacija mobiliame telefone esančioje „hamburger“ tipo navigacijoje',
};
/** medžio eilutė */
const node = (key, tag, o = {}) => `            <div class="tvs-node${o.l2 ? ' is-l2' : ''}${o.cls ? ' ' + o.cls : ''}"${o.dt ? ` data-t="${o.dt}"` : ''}><div class="tvs-node-handle"></div>{{${key}}}<span class="tvs-tag"${o.tdt ? ` data-t="${o.tdt}"` : ''}>{{${tag}}}</span>${o.ext ? SVG.ext(o.edt) : ''}</div>`;
const tree = (nodes) => `          <div class="tvs-tree">\n${nodes.join('\n')}\n          </div>`;
/** formos laukas */
const field = (label, req, help, input, dt) => `            <div class="tvs-field"${dt ? ` data-t="${dt}"` : ''}><div class="tvs-label">{{${label}}}${req ? '<span class="tvs-req">*</span>' : ''}</div>${help ? `<div class="tvs-help">{{${help}}}</div>` : ''}${input}</div>`;
const tabs = (opts, dt) => `          <div class="tvs-tabs"><div class="tvs-tab${opts ? '' : ' is-on'}">{{tab_main}}</div><div class="tvs-tab${opts ? ' is-on' : ''}"${dt ? ` data-t="${dt}"` : ''}>{{tab_opts}}</div></div>`;
const footCreate = (dt) => `          <div class="tvs-form-foot"><span class="tvs-btn is-tiny"${dt ? ` data-t="${dt}"` : ''}>${SVG.save}{{btn_save}}</span><span class="tvs-btn is-tiny">${SVG.save}{{btn_save_new}}</span><span class="tvs-sp"></span><span class="tvs-btn is-tiny is-grey-dark">{{btn_cancel}}</span></div>`;
const footUpdate = (dt) => `          <div class="tvs-form-foot"><span class="tvs-btn is-tiny"${dt ? ` data-t="${dt}"` : ''}>${SVG.save}{{btn_update}}</span><span class="tvs-btn is-tiny">${SVG.save}{{btn_save_exit}}</span><span class="tvs-sp"></span><span class="tvs-btn is-tiny is-grey-dark">{{btn_cancel}}</span></div>`;
const FORM_TXT = {
  tab_main: 'Pagrindinis', tab_opts: 'Parinktys', f_title: 'Title', f_title_help: 'Enter the link title.',
  f_url: 'URL', f_url_help: 'Enter a URL. If you enter a URI path, the site domain will be prepended automatically.',
  f_page: 'Page', f_page_help: 'Choose the page this link should point to.', btn_pick: 'Pažymėti', btn_remove: 'Šalinti',
  f_desc: 'Description', f_desc_help: 'The description can be used for extra link text.',
  btn_save: 'Išsaugoti', btn_save_new: 'Išsaugoti ir kurti kitą', btn_update: 'Atnaujinti', btn_save_exit: 'Išsaugoti ir išeiti', btn_cancel: 'Atšaukti',
};
/** raidės po vieną: {{k_1}}…{{k_n}} */
const letters = (k, n, cls = 'l') => Array.from({ length: n }, (_, i) => `<span class="${cls} ${cls}${i + 1}">{{${k}_${i + 1}}}</span>`).join('');
const COMMON = { search_ph: 'Type to search...' };

const files = {};
const content = {};

/* =============================================================================================
 * KADRAS 1 — 01-navigaciju-grupes (13 s): grupių sąrašas; fokusas eina per vardus, tada aprašymai
 * ============================================================================================= */
files['01-navigaciju-grupes'] = head('Kadras 1 — „Grupės jau sukurtos“: vienas ekranas, prožektorius eina stulpeliu „Vardas“, tada praplatėja į „Aprašymas“.',
`  .stage { transform-origin: 30% 55%; }
  .row-main { background: #f7f9fa; }   /* galutinė: kursorius užėjęs ant „Main“ */
  .tvs-desc { opacity: 1; }`) +
  win('scr1', false, '{{crumb_menu}}',
    btnNew('btn_new_menu') + '\n' + filter() + '\n' + skirt() + '\n' +
    groups([{ g: 'g_1', d: 'd_1', ndt: 'n1', ddt: 'desc1' }, { g: 'g_2', d: 'd_2', ndt: 'n2' }, { g: 'g_3', d: 'd_3', ndt: 'n3' },
      { g: 'g_4', d: 'd_4' }, { g: 'g_5', d: 'd_5', ndt: 'n4', dt: 'rowmain', cls: 'row-main' }, { g: 'g_6', d: 'd_6', ddt: 'desc6', dt: 'rowlast' }], 'th')) +
  tail(0);
content['01_navigaciju_grupes'] = { ...COMMON, ...GROUP_TXT };

/* =============================================================================================
 * KADRAS 2 — 02-nauja-grupe (14 s): sąrašas → „Naujas meniu“ → forma (Vardas, Slug) → sąrašas su nauja eilute
 * ============================================================================================= */
const VARDAS = 'Pagalba mokiniams', SLUG = 'pagalba-mokiniams';
files['02-nauja-grupe'] = head('Kadras 2 — „Sukuriate naują grupę“: trys ekranai sluoksniais; galutinė — sąrašas su nauja eilute.',
`  .stage { transform-origin: 30% 40%; }
  .scr1, .scr2 { opacity: 0; }
  .tvs-table.is-menu .tvs-th, .tvs-table.is-menu .tvs-row { grid-template-columns: 30px 250px 1fr 250px; }   /* „Pagalba mokiniams“ telpa į vieną eilutę */
  .tvs-input.is-focus .tvs-typed, .slug-in .tvs-typed { color: var(--tvs-text); }`) +
  win('scr1', false, '{{crumb_menu}}',
    btnNew('btn_new_menu', 'newmenu') + '\n' + filter() + '\n' + skirt() + '\n' + groups(G6)) +
  win('scr2', false, '{{crumb_create}}',
    btnNew('btn_new_menu') + `
          <div class="tvs-form">
${field('f_name', true, '', `<div class="tvs-input is-focus" data-t="vardas"><span class="tvs-typed typed">${letters('v', VARDAS.length)}</span><span class="tvs-caret caret"></span></div>`, 'fname')}
${field('f_slug', true, '', `<div class="tvs-input slug-in" data-t="slug"><span class="tvs-typed slugt">${letters('s', SLUG.length, 's')}</span></div>`, 'fslug')}
${field('f_desc_lt', false, '', `<div class="tvs-input is-area"></div>`)}
          </div>
` + footCreate('save')) +
  win('scr3', false, '{{crumb_menu}}',
    btnNew('btn_new_menu') + '\n' + filter() + '\n' + skirt() + '\n' +
    groups([...G6.slice(0, 5), { g: 'g_new', d: 'd_new', cls: 'is-new row-new', dt: 'newrow' }])) +
  tail(2);
content['02_nauja_grupe'] = { ...COMMON, ...GROUP_TXT, ...FORM_TXT, crumb_create: 'Navigacijų modulis  /  Meniu  /  Sukurti',
  f_name: 'Vardas', f_slug: 'Slug', f_desc_lt: 'Aprašymas', v: [...VARDAS], s: [...SLUG], g_new: VARDAS, d_new: '' };

/* =============================================================================================
 * KADRAS 3 — 03-isorine-nuoroda (11 s): nuorodų medis, „Youtube kanalas · URL“ su rožine strėlyte
 * ============================================================================================= */
files['03-isorine-nuoroda'] = head('Kadras 3 — „Atpažįstate išorinę nuorodą“: vienas ekranas, kamera priartėja prie „Youtube kanalas“, strėlytė sumirksi.',
`  .stage { transform-origin: 24% 56%; }
  .tvs-ext { transform-origin: 50% 50%; }`) +
  win('scr1', true, '{{crumb_links}}',
    btnNew('btn_new_link') + '\n' + tree([
      node('n_1', 't_page'), node('n_2', 't_url'), node('n_3', 't_url'), node('n_4', 't_page'),
      node('n_5', 't_url', { dt: 'ytrow', tdt: 'yttag', ext: true, edt: 'ytext' }), node('n_6', 't_page')])) +
  tail(0);
content['03_isorine_nuoroda'] = { ...COMMON, sub_menu: 'Meniu', sub_links: 'Linkai', crumb_links: 'Navigacijų modulis  /  Linkai', btn_new_link: 'Naujas linkas',
  n_1: 'Projektinė veikla', n_2: 'El. paštas', n_3: 'Dokumentai', n_4: 'Biblioteka', n_5: 'Youtube kanalas', n_6: 'Turinio auditas', t_page: 'Page', t_url: 'URL' };

/* =============================================================================================
 * KADRAS 4 — 04-nuorodos-tipas (12 s): langas „Page / URL“ virš medžio → „URL“ → forma „URL“
 * ============================================================================================= */
files['04-nuorodos-tipas'] = head('Kadras 4 — „Pasirenkate nuorodos tipą“: langas su „Page“ / „URL“ virš pritemusio medžio; po spustelėjimo — forma „URL“.',
`  .scr1 { opacity: 0; }
  .modal-type { left: 490px; top: 150px; width: 700px; }`) +
  win('scr1', true, '{{crumb_links}}',
    btnNew('btn_new_link') + '\n' + tree([
      node('n_1', 't_page'), node('n_2', 't_url'), node('n_3', 't_url'), node('n_4', 't_page'),
      node('n_5', 't_url', { ext: true }), node('n_6', 't_page')]),
    `
        <div class="tvs-overlay ov ov1"></div>
        <div class="tvs-modal modal-type">
          <div class="tvs-modal-h"><span data-t="modalh">{{modal_h}}</span><span class="tvs-x">×</span></div>
          <div class="tvs-modal-b"><div class="tvs-input is-placeholder">{{modal_search}}</div>
            <div class="tvs-opt" data-t="optpage">{{opt_page}}</div><div class="tvs-opt" data-t="opturl">{{opt_url}}</div></div>
        </div>`) +
  win('scr2', true, '{{crumb_create}}',
    btnNew('btn_new_link') + `
          <div class="tvs-form">
${field('f_title', true, 'f_title_help', '<div class="tvs-input is-focus"><span class="tvs-caret caret2"></span></div>')}
${field('f_url', true, 'f_url_help', '<div class="tvs-input"></div>')}
${field('f_desc', false, 'f_desc_help', '<div class="tvs-input is-area"></div>')}
          </div>
` + footCreate()) +
  tail(1);
content['04_nuorodos_tipas'] = { ...COMMON, ...FORM_TXT, sub_menu: 'Meniu', sub_links: 'Linkai', crumb_links: 'Navigacijų modulis  /  Linkai',
  crumb_create: 'Navigacijų modulis  /  Linkai  /  Sukurti', btn_new_link: 'Naujas linkas',
  n_1: 'Projektinė veikla', n_2: 'El. paštas', n_3: 'Dokumentai', n_4: 'Biblioteka', n_5: 'Youtube kanalas', n_6: 'Turinio auditas', t_page: 'Page', t_url: 'URL',
  modal_h: 'Kokio tipo linką norite sukurti?', modal_search: 'Paieška...', opt_page: 'Page', opt_url: 'URL' };

/* =============================================================================================
 * KADRAS 8 — 06-skirtingi-pavadinimai (13 s): redagavimo forma „Projektai“ / „Projektinė veikla“
 * ============================================================================================= */
files['06-skirtingi-pavadinimai'] = head('Kadras 8 — „Meniu vardas gali skirtis“: viena forma, kamera priartėja prie „Title“ ir priskirto puslapio eilutės.',
`  .stage { transform-origin: 30% 48%; }
  .blink { opacity: 1; }`) +
  win('scr1', true, '{{crumb_edit}}',
    btnNew('btn_new_link') + '\n' + tabs(false) + `
          <div class="tvs-form">
${field('f_title', false, 'f_title_help', '<div class="tvs-input is-value" data-t="titlein"><span class="blink blink1">{{v_title}}</span></div>')}
${field('f_page', true, 'f_page_help', `<div><span class="tvs-btn is-tiny">${SVG.pick}{{btn_pick}}</span></div>
              <div class="tvs-picked" data-t="picked"><span class="blink blink2">{{v_page}}</span><span class="tvs-path">{{v_path}}</span><span class="tvs-btn is-tiny is-pink">${SVG.remove}{{btn_remove}}</span></div>`)}
${field('f_desc', false, 'f_desc_help', '<div class="tvs-input is-area"></div>')}
          </div>
` + footUpdate()) +
  tail(0);
content['06_skirtingi_pavadinimai'] = { ...COMMON, ...FORM_TXT, sub_menu: 'Meniu', sub_links: 'Linkai',
  crumb_edit: 'Navigacijų modulis  /  Linkai  /  Black  /  Redaguoti', btn_new_link: 'Naujas linkas',
  v_title: 'Projektai', v_page: 'Projektinė veikla', v_path: '/projektine-veikla' };

/* =============================================================================================
 * KADRAS 9 — 07-juodojo-meniu-parinktys (14 s): sąrašas → „Black“ medis → forma → skirtukas „Parinktys“
 * ============================================================================================= */
const optsForm = (cls, crumb, classInput, tabdt, upddt) => win(cls, true, crumb,
  btnNew('btn_new_link') + '\n' + tabs(true, tabdt) + `
          <div class="tvs-form">
${field('f_target', true, 'f_target_help', '<div class="tvs-input is-value">{{v_target}}</div>')}
${field('f_class', false, 'f_class_help', classInput, 'fclass')}
${field('f_roles', false, 'f_roles_help', '<div class="tvs-input"></div>')}
          </div>
` + footUpdate(upddt));
const BLACK_TREE = tree([node('b_1', 't_url', { dt: 'node1' }), node('b_2', 't_page'), node('b_3', 't_page'), node('b_4', 't_url'), node('b_5', 't_url')]);
files['07-juodojo-meniu-parinktys'] = head('Kadras 9 — „Atidarote nuorodos parinktis“: keturi ekranai sluoksniais; galutinė — skirtukas „Parinktys“, laukas „Class“ tuščias.',
`  .stage { transform-origin: 30% 45%; }
  .scr1, .scr2, .scr3 { opacity: 0; }`) +
  win('scr1', false, '{{crumb_menu}}', btnNew('btn_new_menu') + '\n' + filter() + '\n' + skirt() + '\n' +
    groups([{ g: 'g_1', d: 'd_1' }, { g: 'g_2', d: 'd_2', dt: 'rowblack', ldt: 'linksblack' }, { g: 'g_3', d: 'd_3' }, { g: 'g_4', d: 'd_4' }, { g: 'g_5', d: 'd_5' }, { g: 'g_6', d: 'd_6' }])) +
  win('scr2', true, '{{crumb_black}}', btnNew('btn_new_link') + '\n' + BLACK_TREE) +
  win('scr3', true, '{{crumb_edit}}', btnNew('btn_new_link') + '\n' + tabs(false, 'tabopts') + `
          <div class="tvs-form">
${field('f_title', true, 'f_title_help', '<div class="tvs-input is-value is-focus">{{v_title}}</div>')}
${field('f_url', true, 'f_url_help', '<div class="tvs-input is-value">{{v_url}}</div>')}
${field('f_desc', false, 'f_desc_help', '<div class="tvs-input is-area"></div>')}
          </div>
` + footUpdate()) +
  optsForm('scr4', '{{crumb_edit}}', '<div class="tvs-input is-focus" data-t="classin"><span class="tvs-caret caret"></span></div>') +
  tail(3);
const OPTS_TXT = { f_target: 'Target', f_target_help: 'Kaip šis linkas turėtų atsidaryti?', v_target: 'Atidaryti dabartiniame lange.',
  f_class: 'Class', f_class_help: 'Nurodykite papildomas class, kurias nurodė programuotojas', f_roles: 'Leidžiamos rolės', f_roles_help: 'Nurodykite kurie vartotojai gali matyti šį linką.' };
const BLACK_TXT = { b_1: 'Pamokų laikas', b_2: 'Projektinė veikla', b_3: 'Biblioteka', b_4: 'Dokumentai', b_5: 'Mėnesio veiklos planas', t_page: 'Page', t_url: 'URL',
  crumb_black: 'Navigacijų modulis  /  Linkai  /  Black', crumb_edit: 'Navigacijų modulis  /  Linkai  /  Black  /  Redaguoti', btn_new_link: 'Naujas linkas',
  v_title: 'Pamokų laikas', v_url: 'https://tvarkarastis.demo.lt/' };
content['07_juodojo_meniu_parinktys'] = { ...COMMON, ...GROUP_TXT, ...FORM_TXT, ...OPTS_TXT, ...BLACK_TXT };

/* =============================================================================================
 * KADRAS 10 — 07-fontawesome-kodas (15 s): Fontawesome schema: paieška „list“ → tinklelis → langas „list-ol“
 * ============================================================================================= */
const faCard = (svg, key, dt, cls = '') => `            <div class="tvs-fa-card${cls}"${dt ? ` data-t="${dt}"` : ''}>${svg}<span>{{${key}}}</span></div>`;
files['07-fontawesome-kodas'] = head('Kadras 10 — „Nukopijuojate ikonėlės kodą“: Fontawesome schema (ne svetainės kopija); galutinė — ikonos langas su kodu.',
`  .grid-all { opacity: 0; }
  .ph { opacity: 0; }   /* galutinė: įrašyta „list“, placeholderio nėra */
  .grid-list { position: absolute; left: 0; top: 0; right: 0; }
  .grid-wrap { position: relative; }
  .fa-modal { left: 300px; top: 150px; }
  .chip-light { }   /* galutinė: pažymėtas „Light“ */`) + `
      <div class="scr scr1 tvs-fa">
        <div class="tvs-fa-top">${SVG.flag}<span>{{fa_start}}</span><span class="is-on">{{fa_icons}}</span><span>{{fa_docs}}</span><span>{{fa_plans}}</span></div>
        <div class="tvs-fa-search" data-t="fasearch">${SVG.lupa}<span class="tvs-ph ph">{{fa_ph}}</span><span class="tvs-typed typed">${letters('q', 4)}</span><span class="tvs-caret caret"></span></div>
        <div class="tvs-fa-body">
          <div class="tvs-fa-side"><div class="is-h">{{fa_style}}</div><div><i></i>{{st_duotone}}</div><div><i></i>{{st_light}}</div><div><i></i>{{st_regular}}</div><div><i></i>{{st_solid}}</div></div>
          <div class="grid-wrap">
            <div class="tvs-fa-grid grid-all">
${FA.misc.map((s, i) => faCard(s, `m_${i + 1}`)).join('\n')}
            </div>
            <div class="tvs-fa-grid grid-list">
${faCard(FA.list(), 'i_1')}
${faCard(FA.listOl(), 'i_2', 'cardlistol', ' is-sel card-listol')}
${faCard(FA.listUl(), 'i_3')}
${faCard(FA.listAlt, 'i_4')}
${faCard(FA.thList, 'i_5')}
${faCard(FA.tasks, 'i_6')}
${faCard(FA.list(2), 'i_7')}
${faCard(FA.listOl(1.6), 'i_8')}
${faCard(FA.listUl(2), 'i_9')}
${faCard(FA.list(1.4), 'i_10')}
${faCard(FA.listOl(1.2), 'i_11')}
${faCard(FA.listUl(1.4), 'i_12')}
            </div>
          </div>
        </div>
        <div class="tvs-overlay ov ov1"></div>
        <div class="tvs-fa-modal fa-modal">
          <div class="tvs-fa-styles"><span class="tvs-fa-chip">${FA.listOl(3)}{{st_solid}}</span><span class="tvs-fa-chip">${FA.listOl(2.2)}{{st_regular}}</span><span class="tvs-fa-chip is-on chip-light" data-t="chiplight">${FA.listOl(1.5)}{{st_light}}</span><span class="tvs-fa-chip">${FA.listOl(1)}{{st_thin}}</span></div>
          <div class="tvs-fa-name">{{i_2}}</div>
          <div class="tvs-fa-row">
            <div class="tvs-fa-big">${FA.listOl(1.5)}</div>
            <div class="tvs-fa-code code-box" data-t="codeblock"><div class="is-tabs"><span class="is-on">{{code_html}}</span><span>{{code_react}}</span><span>{{code_vue}}</span></div><code>{{code_line}}</code><span class="tvs-fa-copy" data-t="copybtn">${SVG.copy}</span></div>
          </div>
        </div>
      </div>` + tail(1);
content['07_fontawesome_kodas'] = { fa_start: 'Start', fa_icons: 'Icons', fa_docs: 'Docs', fa_plans: 'Plans', fa_ph: 'Search icons...', q: ['l', 'i', 's', 't'],
  fa_style: 'Style', st_duotone: 'Duotone', st_light: 'Light', st_regular: 'Regular', st_solid: 'Solid', st_thin: 'Thin',
  m_1: 'star', m_2: 'heart', m_3: 'bell', m_4: 'envelope', m_5: 'camera', m_6: 'map-marker', m_7: 'cloud', m_8: 'check', m_9: 'bolt', m_10: 'music', m_11: 'cog', m_12: 'file-alt',
  i_1: 'list', i_2: 'list-ol', i_3: 'list-ul', i_4: 'list-alt', i_5: 'th-list', i_6: 'tasks', i_7: 'list', i_8: 'list-ol', i_9: 'list-ul', i_10: 'list', i_11: 'list-ol', i_12: 'list-ul',
  code_html: 'HTML', code_react: 'React', code_vue: 'Vue', code_line: '&lt;i class="fal fa-list-ol"&gt;&lt;/i&gt;' };   // ekranuota

/* =============================================================================================
 * KADRAS 11 — 07-ikonos-klase (16 s): „Parinktys“, laukas „Class“: įklijuojama → HTML dalys pažymimos ir dingsta → „Atnaujinti“ → svetainės meniu
 * ============================================================================================= */
files['07-ikonos-klase'] = head('Kadras 11 — „Įklijuojate ikonėlės klasę“: TVS „Parinktys“ → svetainės titulinis su juoduoju meniu; galutinė — meniu su ikonėle.',
`  .stage { transform-origin: 30% 42%; }
  .scr1 { opacity: 0; }
  .code .sel { display: inline-block; max-width: 0; overflow: hidden; white-space: pre; vertical-align: top; }   /* galutinė: HTML dalys ištrintos */
  .code .keep { display: inline-block; max-width: 20em; overflow: hidden; white-space: pre; vertical-align: top; }
  .code .sel span { padding: 2px 0; }
  .ico-new { opacity: 1; }`) +
  optsForm('scr1', '{{crumb_edit}}',
    `<div class="tvs-input is-value is-focus" data-t="classin"><span class="code"><span class="sel sel1"><span>{{c_open}}</span></span><span class="keep">{{c_keep}}</span><span class="sel sel2"><span>{{c_close}}</span></span></span><span class="tvs-caret caret"></span></div>`,
    '', 'update') + `
      <div class="scr scr2 tvs-spage">
        <div class="tvs-spage-band"></div>
        <div class="tvs-spage-body">
          <div><div class="tvs-spage-h">{{site_news}}</div><div class="tvs-spage-cards"><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div><div class="tvs-spage-card"><i></i><b></b><s></s></div></div></div>
          <div class="tvs-site-menu">
            <div class="is-head menu-new" data-t="menu1"><span class="ico-new">${FA.listOl(2.4)}</span>{{s_1}}</div>
            <div><i></i>{{s_2}}</div>
            <div><i></i>{{s_3}}</div>
            <div><i></i>{{s_4}}</div>
            <div><i></i>{{s_5}}</div>
          </div>
        </div>
      </div>` + tail(1);
content['07_ikonos_klase'] = { ...COMMON, ...FORM_TXT, ...OPTS_TXT, sub_menu: 'Meniu', sub_links: 'Linkai', btn_new_link: 'Naujas linkas',
  crumb_edit: 'Navigacijų modulis  /  Linkai  /  Black  /  Redaguoti',
  c_open: '&lt;i class="', c_keep: 'fal fa-list-ol', c_close: '"&gt;&lt;/i&gt;',   // ekranuota: {{…}} įterpiama kaip HTML
  site_news: 'Naujienos', s_1: 'Pamokų laikas', s_2: 'Projektinė veikla', s_3: 'Biblioteka', s_4: 'Dokumentai', s_5: 'Mėnesio veiklos planas' };

/* =============================================================================================
 * KADRAS 12 — 08-keturios-ikonos (15 s): darbalaukis + paieška „navi“ → sąrašas → „4 ikonos“ medis
 * ============================================================================================= */
const FOUR_TREE = (dt) => tree([node('k_1', 't_url', { dt: dt ? 'k1' : '', ext: true }), node('k_2', 't_url', { dt: dt ? 'k2' : '' }), node('k_3', 't_url', { dt: dt ? 'k3' : '' }), node('k_4', 't_url', { dt: dt ? 'k4' : '' })]);
files['08-keturios-ikonos'] = head('Kadras 12 — „Atidarote keturių ikonų nuorodas“: darbalaukis su paieška (kaip kadre 5) → grupių sąrašas → medis „4 ikonos“.',
`  .scr1, .scr2 { opacity: 0; }
  .tvs-dash { width: 820px; }
  .dd { left: 146px; top: 70px; opacity: 0; }`) + `
      <div class="scr scr1 tvs-window">
        <div class="tvs-top">
          <div class="tvs-logo"><i></i></div>
          <div class="tvs-burger"></div>
          <div class="tvs-searchbar is-text" data-t="search"><span class="tvs-ph ph">{{search_ph}}</span><span class="tvs-typed typed">${letters('typed', 4)}</span><span class="tvs-caret caret"></span></div>
        </div>
        ${side(true)}
        <div class="tvs-subnav"><span class="is-on">{{sub_dash}}</span><span>{{sub_addons}}</span></div>
        <div class="tvs-main">
          <div class="tvs-crumb">{{crumb}}</div>
          <div class="tvs-dash">
            <div class="tvs-dash-h">{{dash_h}}</div>
            <div class="tvs-dash-sub">{{dash_sub}}</div>
            <div class="tvs-dash-grid">
              <div class="tvs-dash-i"><i></i>{{m_pages}}</div><div class="tvs-dash-i"><i></i>{{m_news}}</div>
              <div class="tvs-dash-i"><i></i>{{m_bar}}</div><div class="tvs-dash-i"><i></i>{{m_docs}}</div>
              <div class="tvs-dash-i"><i></i>{{m_admin}}</div><div class="tvs-dash-i"><i></i>{{m_authors}}</div>
              <div class="tvs-dash-i"><i class="tvs-ico-bars"></i>{{m_nav}}</div><div class="tvs-dash-i"><i></i>{{m_banners}}</div>
            </div>
          </div>
        </div>
        <div class="tvs-dropdown dd">
          <div class="tvs-dd-h">{{dd_group}}</div>
          <div class="tvs-dd-i is-active" data-t="ddnav">{{m_nav}}</div>
          <div class="tvs-dd-h">{{dd_links}}</div>
        </div>
      </div>` +
  win('scr2', false, '{{crumb_menu}}', btnNew('btn_new_menu') + '\n' + filter() + '\n' +
    groups([{ g: 'g_1', d: 'd_1', dt: 'row4', ldt: 'links4' }, { g: 'g_2', d: 'd_2' }, { g: 'g_3', d: 'd_3' }, { g: 'g_5', d: 'd_5' }, { g: 'g_6', d: 'd_6' }])) +
  win('scr3', true, '{{crumb_four}}', btnNew('btn_new_link') + '\n' + FOUR_TREE(true)) +
  tail(2);
const DASH_TXT = { sub_dash: 'Darbalaukiai', sub_addons: 'Papildiniai', crumb: 'Darbalaukio modulis  /  Darbalaukiai', dash_h: 'Įrankiai', dash_sub: 'Visi turinio valdymo įrankiai vienoje vietoje.',
  m_pages: 'Puslapiai', m_news: 'Naujienos', m_bar: 'Pranešimo juostelė', m_docs: 'Dokumentų bankas', m_admin: 'Administracija', m_authors: 'Autoriai', m_nav: 'Navigacijos', m_banners: 'Baneriai',
  dd_group: 'Navigation', dd_links: 'Links', typed: ['n', 'a', 'v', 'i'] };
const FOUR_TXT = { crumb_four: 'Navigacijų modulis  /  Linkai  /  4 ikonos', btn_new_link: 'Naujas linkas', k_1: 'Elektroninis dienynas', k_2: 'Tėvams', k_3: 'Mokiniams', k_4: 'Mokytojams', t_page: 'Page', t_url: 'URL' };
content['08_keturios_ikonos'] = { ...COMMON, ...GROUP_TXT, ...DASH_TXT, ...FOUR_TXT };

/* =============================================================================================
 * KADRAS 13 — 08-dienyno-adresas (14 s): medis „4 ikonos“ → forma; „URL“ senas adresas pažymimas, rašomas naujas → „Atnaujinti“
 * ============================================================================================= */
const NEW_URL = 'https://dienynas.demo.lt/';
files['08-dienyno-adresas'] = head('Kadras 13 — „Pakeičiate el. dienyno adresą“: medis → forma; lauke „URL“ senas adresas pažymimas ir pakeičiamas nauju; galutinė — forma su nauju adresu.',
`  .stage { transform-origin: 30% 50%; }
  .scr1 { opacity: 0; }
  .old { display: inline-block; max-width: 0; overflow: hidden; white-space: pre; vertical-align: top; line-height: 1.2; }   /* galutinė: senas adresas ištrintas */
  .old span { padding: 2px 0; }
  .url-in { position: relative; }`) +
  win('scr1', true, '{{crumb_four}}', btnNew('btn_new_link') + '\n' + FOUR_TREE(true)) +
  win('scr2', true, '{{crumb_edit}}', btnNew('btn_new_link') + '\n' + tabs(false) + `
          <div class="tvs-form">
${field('f_title', true, 'f_title_help', '<div class="tvs-input is-value">{{v_title}}</div>')}
${field('f_url', true, 'f_url_help', `<div class="tvs-input is-value is-focus url-in" data-t="urlin"><span class="old"><span>{{v_url_old}}</span></span><span class="tvs-typed typed">${letters('u', NEW_URL.length)}</span><span class="tvs-caret caret"></span></div>`, 'furl')}
${field('f_desc', false, 'f_desc_help', '<div class="tvs-input is-area"></div>')}
          </div>
` + footUpdate('update')) +
  tail(2);
content['08_dienyno_adresas'] = { ...COMMON, ...FORM_TXT, ...FOUR_TXT, sub_menu: 'Meniu', sub_links: 'Linkai',
  crumb_edit: 'Navigacijų modulis  /  Linkai  /  4 ikonos  /  Redaguoti', v_title: 'Elektroninis dienynas', v_url_old: 'https://senas.dienynas.demo.lt/', u: [...NEW_URL] };

// ---- Rašymas ----
for (const [name, html] of Object.entries(files)) fs.writeFileSync(path.join(T, name + '.html'), html);
const lt = JSON.parse(fs.readFileSync(CONTENT, 'utf-8'));
const out = { lang: lt.lang, _intro: lt._intro };
const order = ['01_navigaciju_grupes', '02_nauja_grupe', '03_isorine_nuoroda', '04_nuorodos_tipas', '05_kur_rasti_navigacijas', '05_nuorodu_medis', '05_nauja_nuoroda',
  '06_skirtingi_pavadinimai', '07_juodojo_meniu_parinktys', '07_fontawesome_kodas', '07_ikonos_klase', '08_keturios_ikonos', '08_dienyno_adresas'];
for (const k of order) out[k] = content[k] || lt[k];
fs.writeFileSync(CONTENT, JSON.stringify(out, null, 2) + '\n');
console.log(`Įrašyta ${Object.keys(files).length} šablonų → templates/, turinys → content/lt.json (${order.length} skiltys)`);
