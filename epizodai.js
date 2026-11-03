#!/usr/bin/env node
/**
 * TVS epizodų variklis (platformos `epizodas` vienetai, 2026-11-03). Ištrauktas iš „Navigacijų valdymo“
 * (sablonai.js + matuoti.js + animacijos.js), kad kiekvienai pamokai nereikėtų trijų skriptų.
 *
 * Pamoka aprašo epizodus faile lessons/{slug}/epizodai-def.js:
 *
 *   const E = require('../../epizodai');
 *   E.build(__dirname, {
 *     '03-ikeliate-faila': {
 *       note: 'Kadras 3 — …',                       // komentaras šablone
 *       origin: '40% 60%',                           // kameros transform-origin
 *       css: '.x { … }',                             // tik šio kadro CSS (kuo mažiau — rinkinys tokens/tvs.css)
 *       screens: [E.win({...}), E.win({...})],       // ekranai (sluoksniai, perjungiami opacity)
 *       steps: [                                     // laikas: skaičius arba balso / garso žyma: 'b2', 'g1+0.3'
 *         { t: 'b1', spot: 'save' },                 // prožektorius ant data-t="save" (ar ['a','b'] — sąjunga; null — nuimti)
 *         { t: 'b1+0.2', cur: 'save' },              // kursorius atvyksta per 0,6 s
 *         { t: 'g1', click: true },                  // ratilas ten, kur kursorius
 *         { t: 'g1+0.1', scr: 2 },                   // ekranas 2 (0,3 s)
 *         { t: 'b2', type: 'pav', dt: 0.1 },         // E.typed('pav', 'Tekstas') raidės po vieną
 *         { t: 'b2', show: '.dd' }, { t: 'b3', hide: '.dd' },
 *         { t: 'b2', zoom: 1.3 }, { t: 'b3', zoom: 1 },
 *         { t: 'b3', flash: '.row-new' },            // žalias blyksnis (išsaugota)
 *       ],
 *     },
 *   });
 *
 *   node lessons/{slug}/epizodai-def.js
 *
 * Variklis: rašo templates/{failas}.html, content/lt.json skiltį, paleidžia generate.js (PNG = galutinė būsena),
 * išmatuoja data-t vietas (puppeteer) ir įrašo klipo CSS į video/animacijos.json (generate-video-clips.js jį ima pirmą).
 * Žymų laikai imami iš platformos kortelės (`explaineris.laiko_zymos`), todėl laikai-telpa.py pastūmus žymas
 * užtenka paleisti def failą iš naujo — animacija pati prisitaiko.
 * Principai: ANIMATION_PRINCIPLES.md § „UI žingsnių filmukai“; viena vieta vienu metu; ekranai per opacity;
 * bazinė CSS būsena = galutinė; vienam selektoriui viena `animation` deklaracija.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const MOVE = 'cubic-bezier(.2,.7,.3,1)';
const SOFT = 'cubic-bezier(.45,0,.2,1)';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- SVG ----------
const SVG = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"><path d="M12 4v16M4 12h16"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M3 17.3V21h3.7L17.8 9.9l-3.7-3.7zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.7z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  pick: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><circle cx="10" cy="10" r="6"/><path d="M15 15l6 6" stroke-linecap="round"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"><path d="M4 4h13l3 3v13H4z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/></svg>',
  remove: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6"><circle cx="12" cy="12" r="8.5"/><path d="M6 18L18 6"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M6 10l6-6 6 6M4 20h16"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>',
  lupa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="7"/><path d="M16 16l5 5"/></svg>',
  ext: '<svg class="tvs-ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7M21 3l-9 9"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
  cursor: '<div class="cursor-wrap"><div class="tvs-cursor"><svg viewBox="0 0 44 56"><path d="M4 3v40l10.5-9.5 7 16 7.5-3.3-7-15.7H36z" fill="#1d1d1f" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg></div></div>',
};

// ---------- ekrano dalys ----------
const SIDE_ICONS = ['dash', 'pages', 'bars', 'docs', 'news', 'users'];
/** Viršutinė juosta su paieška; search: tekstas placeholderiui arba HTML (pvz. E.typed) */
const top = (search = 'Type to search...') => `<div class="tvs-top"><div class="tvs-logo"><i></i></div><div class="tvs-burger"></div><div class="tvs-searchbar is-text${/<span/.test(search) ? '' : ' is-placeholder'}" data-t="search">${search}</div></div>`;
/** Šoninė juosta: on — kuri ikona aktyvi (0–5) */
const side = (on = 2) => `<div class="tvs-side">${SIDE_ICONS.map((k, i) => `<i class="${[k === 'bars' ? 'is-bars' : '', i === on ? 'is-on' : ''].filter(Boolean).join(' ')}"></i>`).join('')}</div>`;
const subnav = (items = [], on = 0) => items.length ? `<div class="tvs-subnav">${items.map((s, i) => `<span${i === on ? ' class="is-on"' : ''}>${s}</span>`).join('')}</div>` : '';
/**
 * TVS langas. cls — papildoma klasė (scr1 …), crumb — kelias, body — tvs-main turinys, extra — virš lango (modalai).
 */
const win = ({ cls = '', crumb = '', body = '', sideOn = 2, sub = [], subOn = 0, search, extra = '' } = {}) => `
      <div class="scr ${cls} tvs-window${sub.length ? '' : ' is-nosubnav'}">
        ${top(search)}
        ${side(sideOn)}
        ${subnav(sub, subOn)}
        <div class="tvs-main">
${crumb ? `          <div class="tvs-crumb">${crumb}</div>\n` : ''}${body}
        </div>${extra}
      </div>`;
/** Laisvas ekranas (svetainė, naršyklė, kita) */
const scr = (cls, body, attrs = '') => `\n      <div class="scr ${cls}"${attrs}>\n${body}\n      </div>`;
/** Tekstas, rašomas po raidę: id → animuojama { type: id } */
const typed = (id, text, { caret = true, ph = '' } = {}) => {
  // Žodis — nelaužomas blokas, tarpas — atskira raidė su &nbsp; (kitaip daugiaeilutis tekstas praranda tarpus
  // arba lūžta per žodžio vidurį; metraštis 2026-11-03)
  let n = 0;
  const L = String(text).split(/( |\n)/).filter(w => w !== '').map(w => w === '\n' ? '<br>' : w === ' '
    ? `<span class="l l${++n}">&nbsp;</span>`
    : `<span class="w">${[...w].map(ch => `<span class="l l${++n}">${esc(ch)}</span>`).join('')}</span>`).join('');
  return `${ph ? `<span class="tvs-ph ph-${id}">${esc(ph)}</span>` : ''}<span class="tvs-typed ty-${id}" data-ty="${id}">${L}</span>${caret ? `<span class="tvs-caret caret-${id}"></span>` : ''}`;
};
/** Naršyklės adreso juosta (tvs-chrome); url — HTML (gali būti E.typed) */
const chrome = (url, t = 'omni') => `<div class="tvs-chrome"><svg class="is-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 12H5M11 5l-7 7 7 7"/></svg><svg class="is-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 12h15M13 5l7 7-7 7"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 3.5v5h-5" stroke-linejoin="round"/></svg><div class="tvs-omni" data-t="${t}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V7.5a5 5 0 0 1 10 0V10h1.5v12h-13V10zm2.5 0h5V7.5a2.5 2.5 0 0 0-5 0z"/></svg><span>${url}</span></div></div>`;
/** Darbalaukis: modulių plytelės [pavadinimas, data-t?] */
const dash = (items, h = 'Įrankiai', sub = 'Dažniausiai naudojami moduliai') => `<div class="tvs-dash"><div class="tvs-dash-h">${h}</div><div class="tvs-dash-sub">${sub}</div><div class="tvs-dash-grid">${items.map(([n, t]) => `<div class="tvs-dash-i"${t ? ` data-t="${t}"` : ''}><i></i>${n}</div>`).join('')}</div></div>`;
const DASH = [['Puslapiai'], ['Naujienos'], ['Pranešimų juostelė'], ['Dokumentų bankas'], ['Vartotojai'], ['Autoriai'], ['Navigacijos'], ['Baneriai']];
const ICO = {
  handle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5l3.6 3.6h-2.4v5.7h5.7V8.4l3.6 3.6-3.6 3.6v-2.4h-5.7v5.7h2.4L12 22.5l-3.6-3.6h2.4v-5.7H5.1v2.4L1.5 12l3.6-3.6v2.4h5.7V5.1H8.4z"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M2 3h20l-8 9.5V20l-4 2v-9.5z"/></svg>',
  dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v11M7.5 10l4.5 4.5 4.5-4.5M3.5 15v5.5h17V15"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 20l1-4.5L16 4.5l3.5 3.5-11 11z"/><path d="M14 7l3 3"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>',
};
/** Dokumentų banko sąrašo eilutė (lenta 00): rankenėlė, langelis, pavadinimas, failas, peržiūra, „Redaguoti“ */
const docRow = (title, { cls = '', t = '' } = {}) => `<div class="tvs-row ${cls}"${t ? ` data-t="${t}"` : ''}><div class="tvs-handle">${ICO.handle}</div><div class="tvs-check"></div><div class="tvs-title">${title}</div><div class="tvs-file">${ICO.file}</div><div class="tvs-actions"><span class="tvs-btn is-small is-info">${ICO.eye}</span><span class="tvs-btn is-small is-orange">${SVG.edit}Redaguoti</span></div></div>`;
const docTable = (rows, extra = '') => `<div class="tvs-table is-compact"><div class="tvs-th"><span></span><div class="tvs-check"></div><span>Pavadinimas</span><span>Failas</span><span></span></div>${rows}${extra}</div>`;
/** Svetainės dokumentų lentelė (lenta 09): [pavadinimas, data, dydis, cls?] */
const sdocs = (head, rows, { t = '', cls = '' } = {}) => `<div class="tvs-sdocs ${cls}"${t ? ` data-t="${t}"` : ''}><div class="tvs-sdocs-th"><span>${head}</span><span>Atnaujinta</span><span>Dydis</span></div>${rows.map(([n, d, z, c, t]) => /is-group/.test(c || '')
    ? `<div class="tvs-sdocs-tr ${c}"${t ? ` data-t="${t}"` : ''}><span>${n}</span><span></span><span></span></div>`
    : `<div class="tvs-sdocs-tr ${c || ''}"${t ? ` data-t="${t}"` : ''}><span class="is-ico">${ICO.dl}</span><span class="is-ico">${ICO.pen}</span><span>${n}</span><span class="is-date">${d}</span><span class="is-size">${z}</span></div>`).join('')}</div>`;
/** Svetainės langas su antrašte ir meniu (tvs-sweb) */
const site = (cls, body, { nav = ['Apie mokyklą', 'Mokiniams', 'Tėvams', 'Naujienos', 'Kontaktai'], on = 0, title = '' } = {}) => scr(`${cls} tvs-sweb`, `
        <div class="tvs-sweb-h"><div class="tvs-sweb-crest"></div><div class="tvs-sweb-name">Demo mokykla<small>Demo miestas</small></div></div>
        <div class="tvs-sweb-nav">${nav.map((n, i) => `<span${i === on ? ' class="is-on"' : ''}>${n}</span>`).join('')}</div>
        <div class="tvs-sweb-b">${title ? `<div class="tvs-sweb-t">${title}</div>` : ''}
${body}
        </div>`);
const CKE_TOP = "<div class=\"tvs-cke-top\">\n            <div class=\"tvs-cke-row\"><div class=\"tvs-cke-g\"><span class=\"tvs-cke-b is-label\"><i class=\"tvs-cke-i is-source\"></i>Source</span></div>\n              <div class=\"tvs-cke-g\"><span class=\"tvs-cke-b is-off\"><i class=\"tvs-cke-i is-cut\"></i></span><span class=\"tvs-cke-b is-off\"><i class=\"tvs-cke-i is-copy\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-paste\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-pastetext\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-pasteword\"></i></span><span class=\"tvs-cke-sep\"></span><span class=\"tvs-cke-b is-off\"><i class=\"tvs-cke-i is-undo\"></i></span><span class=\"tvs-cke-b is-off\"><i class=\"tvs-cke-i is-redo\"></i></span></div>\n              <div class=\"tvs-cke-g\"><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-replace\"></i></span><span class=\"tvs-cke-sep\"></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-selectall\"></i></span></div>\n              <div class=\"tvs-cke-g\"><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-bold\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-italic\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-underline\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-strike\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-subscript\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-superscript\"></i></span><span class=\"tvs-cke-sep\"></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-copyformatting\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-removeformat\"></i></span></div></div>\n            <div class=\"tvs-cke-row\"><div class=\"tvs-cke-g\"><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-numberedlist\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-bulletedlist\"></i></span><span class=\"tvs-cke-sep\"></span><span class=\"tvs-cke-b is-off\"><i class=\"tvs-cke-i is-outdent\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-indent\"></i></span><span class=\"tvs-cke-sep\"></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-blockquote\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-creatediv\"></i></span><span class=\"tvs-cke-sep\"></span><span class=\"tvs-cke-b is-on\"><i class=\"tvs-cke-i is-justifyleft\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-justifycenter\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-justifyright\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-justifyblock\"></i></span></div>\n              <div class=\"tvs-cke-g\"><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-link\"></i></span><span class=\"tvs-cke-b is-off\"><i class=\"tvs-cke-i is-unlink\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-anchor\"></i></span></div>\n              <div class=\"tvs-cke-g\"><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-table\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-horizontalrule\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-specialchar\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-pagebreak\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-iframe\"></i></span></div></div>\n            <div class=\"tvs-cke-row\"><span class=\"tvs-cke-combo\">Styles</span><span class=\"tvs-cke-combo\">Normal</span><span class=\"tvs-cke-combo\">Font</span><span class=\"tvs-cke-combo is-short\">Size</span><div class=\"tvs-cke-g\"><span class=\"tvs-cke-b is-arrow\"><i class=\"tvs-cke-i is-textcolor\"></i></span><span class=\"tvs-cke-b is-arrow\"><i class=\"tvs-cke-i is-bgcolor\"></i></span></div>\n              <div class=\"tvs-cke-g\"><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-maximize\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-showblocks\"></i></span></div>\n              <div class=\"tvs-cke-g\"><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-casechange\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-lowercase\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-uppercase\"></i></span><span class=\"tvs-cke-b\"><i class=\"tvs-cke-i is-capitalize\"></i></span></div></div>\n          </div>";
/**
 * Turinio redaktorius (lenta 04). body — HTML; marks — { anchor: 'tAnchor', link: 'tLink' } prideda data-t prie mygtukų;
 * on — mygtukai, rodomi įjungti (is-on).
 */
const cke = (body, { marks = {}, label = 'Turinys', t = 'cke', bot = ['body', 'p'] } = {}) => {
  let top = CKE_TOP;
  for (const [ic, dt] of Object.entries(marks)) top = top.replace(`<span class="tvs-cke-b"><i class="tvs-cke-i is-${ic}"></i></span>`, `<span class="tvs-cke-b ck-${ic}" data-t="${dt}"><i class="tvs-cke-i is-${ic}"></i></span>`);
  return `<div class="tvs-field cke-field"><div class="tvs-label">${label}</div><div class="tvs-cke" data-t="${t}">${top}<div class="tvs-cke-body">${body}</div><div class="tvs-cke-bot">${bot.map(x => `<span>${x}</span>`).join('')}</div></div></div>`;
};
/** CKEditor dialogas (moono-lisa): title, body (HTML), OK data-t */
const ckd = (title, body, { cls = '', ok = 'ok', tabs = [] } = {}) => `<div class="tvs-ckd ${cls}"><div class="tvs-ckd-h"><span>${title}</span><span class="tvs-x">×</span></div>${tabs.length ? `<div class="tvs-ckd-tabs">${tabs.map((x, i) => `<span${i === 0 ? ' class="is-on"' : ''}>${x}</span>`).join('')}</div>` : ''}<div class="tvs-ckd-b">${body}</div><div class="tvs-ckd-f"><span class="tvs-ckd-btn is-ok" data-t="${ok}">OK</span><span class="tvs-ckd-btn">Cancel</span></div></div>`;
/** Formos skirtukai */
const tabs = (items, on = 0, ts = {}) => `<div class="tvs-tabs">${items.map((x, i) => `<div class="tvs-tab${i === on ? ' is-on' : ''}"${ts[i] ? ` data-t="${ts[i]}"` : ''}>${x}</div>`).join('')}</div>`;
/** Padalytas kadras: viršuje svetainės fragmentas (title + body), apačioje TVS laukas „Turinys“ (E.cke) ir mygtukai */
const split = (cls, { siteTitle = '', siteBody = '', editor = '', foot = '', tTop = 'stop', tBot = 'sbot' }) => scr(`${cls} tvs-split`, `
        <div class="tvs-split-top" data-t="${tTop}"><span class="tvs-split-tag">Svetainė</span><div class="tvs-sweb-nav"><span class="is-on">${siteTitle}</span></div><div class="tvs-sweb-b">${siteBody}</div></div>
        <div class="tvs-split-bot" data-t="${tBot}"><span class="tvs-split-tag">TVS</span>${editor}${foot ? `<div class="tvs-form-foot">${foot}</div>` : ''}</div>`);
/** Šoninis padalijimas: kairėje TVS dalis (forma), dešinėje svetainė */
const split2 = (cls, { left = '', right = '', siteTitle = '', tL = 'sleft', tR = 'sright' }) => scr(`${cls} tvs-split2`, `
        <div class="tvs-split2-l" data-t="${tL}"><span class="tvs-split-tag">TVS</span>${left}</div>
        <div class="tvs-split2-r" data-t="${tR}"><span class="tvs-split-tag">Svetainė</span><div class="tvs-sweb-nav"><span class="is-on">${siteTitle}</span></div><div class="tvs-sweb-b">${right}</div></div>`);
const VID_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 9h18M3 15h18M7 5v4M7 15v4M17 5v4M17 15v4"/><path d="M10.5 10.3v3.4l3-1.7z" fill="#fff"/></svg>';
/** Įkėlimo langas (lenta 07): title, rows [[vardas, dydis, mime, katalogas, cls?, t?]] */
const upload = (title, rows = [], { cls = '', dz = 'dz' } = {}) => `<div class="tvs-modal is-static ${cls}"><div class="tvs-modal-h"><span>${title}</span><span class="tvs-x is-dark"${cls ? ` data-t="${cls}x"` : ''}>×</span></div>
          <div class="up-sub"><span class="tvs-badge">Max: 100 MB</span></div>
          <div class="tvs-modal-b"><div class="tvs-dz" data-t="${dz}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l6 6h-4v7h-4V8H6zM3 17h4v2h10v-2h4v5H3z"/></svg>Click or drop files here to upload.</div></div>
          ${rows.length ? `<div><div class="tvs-up-th"><span>Peržiūra</span><span>Vardas</span><span>Dydis</span><span>MIME tipas</span><span>Katalogas</span><span></span></div>${rows.map(([n, z, m, k, c, t]) => `<div class="tvs-up-row ${c || ''}"><span class="tvs-fico">${/video/.test(m) ? VID_ICO : ICO.file}</span><div class="tvs-fmeta"><span class="tvs-fname">${n}</span><span class="tvs-fpath">local://${k.toLowerCase()}/${n}</span></div><span>${z}</span><span>${m}</span><span>${k}</span><span class="tvs-btn is-tiny"${t ? ` data-t="${t}"` : ''}>${SVG.plus}Pridėti</span></div>`).join('')}</div>` : ''}</div>`;
const btn = (label, { cls = '', icon = '', t = '' } = {}) => `<span class="tvs-btn ${cls}"${t ? ` data-t="${t}"` : ''}>${icon}${label}</span>`;

// ---------- laikas ----------
function cues(card) {
  const z = ((card && card.explaineris && card.explaineris.laiko_zymos) || []).slice().sort((a, b) => a.laikas - b.laikas);
  return { b: z.filter(x => x.kas === 'balsas').map(x => +x.laikas), g: z.filter(x => x.kas === 'garsas').map(x => +x.laikas) };
}
function T(v, C) {
  if (typeof v === 'number') return v;
  const m = String(v).match(/^([bg])(\d+)((?:\s*[+-]\s*[\d.]+)*)$/);
  if (!m) throw new Error(`blogas laikas: ${v}`);
  const arr = C[m[1]];
  const base = arr[parseInt(m[2], 10) - 1];
  if (base === undefined) throw new Error(`nėra žymos ${m[1]}${m[2]} (yra b:${C.b.length}, g:${C.g.length})`);
  const off = (m[3] || '').replace(/\s/g, '').match(/[+-][\d.]+/g) || [];
  return +(base + off.reduce((a, x) => a + parseFloat(x), 0)).toFixed(2);
}

const pct = (t, D) => +Math.max(0, Math.min(100, (t / D) * 100)).toFixed(3);
function kf(name, D, stops) {
  // stops: [t, css, ease?] — t didėja; vienodi gretimi = laikymas
  stops = stops.slice().sort((a, b) => a[0] - b[0]);
  if (stops[0][0] > 0) stops.unshift([0, stops[0][1]]);
  if (stops[stops.length - 1][0] < D) stops.push([D, stops[stops.length - 1][1]]);
  return `  @keyframes ${name} {\n` + stops.map(([t, css, ease]) => `    ${pct(t, D)}% { ${css}${ease ? ` animation-timing-function: ${ease};` : ''} }`).join('\n') + '\n  }';
}
const hole = (r, pad = 8) => `left: ${(r.x - pad).toFixed(1)}px; top: ${(r.y - pad).toFixed(1)}px; width: ${(r.w + 2 * pad).toFixed(1)}px; height: ${(r.h + 2 * pad).toFixed(1)}px;`;
const center = (r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });
const curCss = (x, y) => `transform: translate(${(x - 4).toFixed(1)}px, ${(y - 3).toFixed(1)}px);`;
const union = (rs) => { const x = Math.min(...rs.map(r => r.x)), y = Math.min(...rs.map(r => r.y));
  return { x, y, w: Math.max(...rs.map(r => r.x + r.w)) - x, h: Math.max(...rs.map(r => r.y + r.h)) - y }; };

// ---------- šablonas ----------
function page(id, def, nClicks) {
  return `<!DOCTYPE html>
<html lang="{{lang}}">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./tokens/tokens.css">
<link rel="stylesheet" href="./tokens/base.css">
<link rel="stylesheet" href="./tokens/tvs.css">
<style>
  /* ${def.note || id}
     Generuoja epizodai-def.js per epizodai.js — ranka neredaguoti. Bazinė būsena = galutinė (PNG rodo rezultatą). */
  .stage { position: relative; width: 1680px; height: 904px; transform-origin: ${def.origin || '50% 50%'}; }
  .scr { position: absolute; inset: 0; width: 100%; height: 100%; }
  .spot { position: absolute; left: 0; top: 0; width: 120px; height: 60px; border: 2.5px solid var(--tvs-info); border-radius: 6px;
          box-shadow: 0 0 0 4000px rgba(0,0,0,.55); opacity: 0; z-index: 60; pointer-events: none; }
  .rp { opacity: 0; z-index: 65; }
  .cursor-wrap { position: absolute; left: 0; top: 0; width: 44px; height: 56px; z-index: 70; pointer-events: none; }
  .cursor-wrap .tvs-cursor { left: 0; top: 0; }
  [class*="caret-"] { opacity: 0; }
${def.css || ''}
  /* galutinė būsena (epizodai.js) — po pamokos CSS, kad visada laimėtų */
${def.baseCss || ''}
</style>
</head>
<body>
  <div class="card">
    <div class="stage">
${def.screens.join('\n')}
      <div class="spot"></div>
${Array.from({ length: nClicks }, (_, i) => `      <div class="tvs-ripple rp rp${i + 1}"></div>`).join('\n')}
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
}

// ---------- matavimas ----------
async function measure(htmlFiles) {
  const puppeteer = require(path.join(ROOT, 'node_modules', 'puppeteer'));
  const browser = await puppeteer.launch({ headless: true });
  const pg = await browser.newPage();
  await pg.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  const out = {};
  for (const f of htmlFiles) {
    await pg.goto('file://' + f, { waitUntil: 'networkidle0' });
    await pg.evaluateHandle('document.fonts.ready');
    out[path.basename(f, '.html')] = await pg.evaluate(() => {
      const st = document.querySelector('.stage').getBoundingClientRect();
      const o = {};
      const scrs = Array.from(document.querySelectorAll('.stage > .scr'));
      for (const el of document.querySelectorAll('[data-t]')) {
        const r = el.getBoundingClientRect(), sc = el.closest('.stage > .scr');
        o[el.dataset.t] = { x: +(r.left - st.left).toFixed(1), y: +(r.top - st.top).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), s: sc ? scrs.indexOf(sc) + 1 : 0 };
      }
      const ty = {};
      for (const el of document.querySelectorAll('[data-ty]')) ty[el.dataset.ty] = el.querySelectorAll('.l').length;
      return { rects: o, typed: ty };
    });
  }
  await browser.close();
  return out;
}

// ---------- animacija ----------
function animate(id, def, M, C, D, pref) {
  const R = (n) => {
    if (n && typeof n === 'object' && n.ref) { const r = R(n.ref), v = (k) => typeof n[k] === 'function' ? n[k](M.rects) : (n[k] || 0); return { x: r.x + v('dx'), y: r.y + v('dy'), w: r.w + v('dw'), h: r.h + v('dh') }; }
    if (n && typeof n === 'object' && !Array.isArray(n)) return n;
    if (Array.isArray(n)) return union(n.map(R));
    const r = M.rects[n];
    if (!r) throw new Error(`${id}: nėra data-t="${n}"`);
    return r;
  };
  const steps = (def.steps || []).map(s => ({ ...s, at: T(s.t, C) })).sort((a, b) => a.at - b.at);
  const per = new Map();               // selektorius → animacijų sąrašas
  const css = [];
  const add = (sel, a) => { if (!per.has(sel)) per.set(sel, []); per.get(sel).push(a); };
  const nScr = def.screens.length;

  // Kamera
  const zooms = steps.filter(s => s.zoom !== undefined);
  if (zooms.length) {
    const st = [[0, `transform: scale(${def.zoom0 || 1});`]];
    let cur = def.zoom0 || 1;
    for (const z of zooms) { st.push([z.at, `transform: scale(${cur});`, SOFT]); st.push([z.at + (z.dur || 0.7), `transform: scale(${z.zoom});`]); cur = z.zoom; }
    css.push(kf(`${pref}cam`, D, st)); add('.stage', `${pref}cam ${D}s linear 0s both`);
  }

  // Ekranai: pradinis 1; scr žingsniai perjungia
  const scrSteps = steps.filter(s => s.scr);
  let finalScr = scrSteps.length ? scrSteps[scrSteps.length - 1].scr : (def.startScr || 1);
  for (let n = 1; n <= nScr; n++) {
    const stops = []; let vis = (def.startScr || 1) === n ? 1 : 0; stops.push([0, `opacity: ${vis};`]);
    const slide = [];
    for (const s of scrSteps) {
      const nv = s.scr === n ? 1 : 0;
      if (nv !== vis) {
        const d = s.dur || 0.3;
        stops.push([s.at, `opacity: ${vis};`]); stops.push([s.at + d, `opacity: ${nv};`]);
        if (nv === 1 && s.slide) slide.push(s);
        vis = nv;
      }
    }
    if (stops.length > 1) {
      let st = stops;
      if (slide.length) {
        // įslenkantis ekranas: translateX kartu su opacity (vienas keyframe takelis)
        const s = slide[0], dx = s.slide === 'left' ? -60 : s.slide === 'up' ? 0 : 60, dy = s.slide === 'up' ? 40 : 0;
        st = stops.map(([t, c]) => [t, c + (t <= s.at ? ` transform: translate(${dx}px, ${dy}px);` : ' transform: none;'), t === s.at ? SPRING : undefined]);
      }
      css.push(kf(`${pref}s${n}`, D, st)); add(`.stage > .scr:nth-of-type(${n})`, `${pref}s${n} ${D}s linear 0s both`);
    }
  }
  def.baseCss = (def.baseCss || '') + Array.from({ length: nScr }, (_, i) => `  .stage > .scr:nth-of-type(${i + 1}) { opacity: ${i + 1 === finalScr ? 1 : 0}; }`).join('\n') + '\n';

  // Prožektorius
  const spots = steps.filter(s => s.spot !== undefined);
  // Prožektorius, likęs ant seno ekrano: jei pažymėti elementai ne naujame ekrane — užgesinamas su ekrano keitimu
  const scrOf = (n) => {
    if (n && typeof n === 'object' && n.ref) return scrOf(n.ref);
    if (Array.isArray(n)) { const v = n.map(scrOf); return v.every(x => x === v[0]) ? v[0] : 0; }
    if (typeof n === 'string' && M.rects[n]) return M.rects[n].s || 0;
    return 0;
  };
  for (const sc of scrSteps) {
    const before = spots.filter(s => s.at <= sc.at + 0.05), after = spots.find(s => s.at > sc.at + 0.05);
    const last = before[before.length - 1];
    if (!last || last.spot === null || (after && after.at <= sc.at + 0.6)) continue;
    const ls = scrOf(last.spot);
    if (ls && ls !== sc.scr) { spots.push({ spot: null, at: sc.at, auto: true }); spots.sort((a, b) => a.at - b.at); }
  }
  if (spots.length) {
    const st = []; let prev = null, on = false;
    for (const s of spots) {
      if (s.spot === null) { if (on) { st.push([s.at, hole(prev.r, prev.pad) + ' opacity: 1;']); st.push([s.at + 0.4, hole(prev.r, prev.pad) + ' opacity: 0;']); } on = false; continue; }
      const r = R(s.spot), pad = s.pad === undefined ? 8 : s.pad;
      if (!on) {
        if (!prev) st.push([0, hole(r, pad) + ' opacity: 0;']);
        st.push([s.at, hole(r, pad) + ' opacity: 0;']); st.push([s.at + 0.4, hole(r, pad) + ' opacity: 1;']);
      } else {
        st.push([s.at, hole(prev.r, prev.pad) + ' opacity: 1;', SPRING]); st.push([s.at + 0.45, hole(r, pad) + ' opacity: 1;']);
      }
      prev = { r, pad }; on = true;
    }
    if (on) { const e = Math.max(prev ? 0 : 0, D - 1.2); const last = st[st.length - 1][0]; const off = Math.max(last + 0.3, def.spotOff ? T(def.spotOff, C) : e);
      st.push([off, hole(prev.r, prev.pad) + ' opacity: 1;']); st.push([off + 0.4, hole(prev.r, prev.pad) + ' opacity: 0;']); }
    css.push(kf(`${pref}spot`, D, st)); add('.spot', `${pref}spot ${D}s linear 0s both`);
  }

  // Kursorius ir spustelėjimai
  const rest = def.cursor0 || [1250, 780];
  const cs = steps.filter(s => s.cur !== undefined);
  let pos = { x: rest[0], y: rest[1] };
  const cst = [[0, curCss(pos.x, pos.y)]];
  const clicks = [];
  const evs = steps.filter(s => s.cur !== undefined || s.click);
  for (const s of evs) {
    if (s.cur !== undefined) {
      let p;
      if (Array.isArray(s.cur) && typeof s.cur[0] === 'number') p = { x: s.cur[0], y: s.cur[1] };
      else { const r = R(s.cur); p = { x: r.x + r.w * (s.ax === undefined ? 0.5 : s.ax) + (s.dx || 0), y: r.y + r.h * (s.ay === undefined ? 0.5 : s.ay) + (s.dy || 0) }; }
      const d = s.dur || 0.6;
      cst.push([s.at, curCss(pos.x, pos.y), MOVE]); cst.push([s.at + d, curCss(p.x, p.y)]);
      pos = p;
    }
    if (s.click) clicks.push({ at: s.at, x: pos.x, y: pos.y });
  }
  if (cs.length) { css.push(kf(`${pref}cur`, D, cst)); add('.cursor-wrap', `${pref}cur ${D}s linear 0s both`); }
  def.baseCss += `  .cursor-wrap { transform: translate(${(pos.x - 4).toFixed(1)}px, ${(pos.y - 3).toFixed(1)}px); }\n`;
  if (clicks.length) css.push('  @keyframes ratilas { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }');
  clicks.forEach((c, i) => css.push(`  .rp${i + 1} { left: ${c.x.toFixed(1)}px; top: ${c.y.toFixed(1)}px; animation: ratilas 0.6s ease-out ${c.at}s forwards; }`));

  // Rašymas po raidę
  for (const s of steps.filter(s => s.type)) {
    const n = M.typed[s.type] || 0, dt = s.dt || 0.11;
    css.push(`  @keyframes ${pref}raide { from { max-width: 0; } to { max-width: 1.2em; } }`);
    for (let i = 1; i <= n; i++) add(`.ty-${s.type} .l${i}`, `${pref}raide 0.01s step-end ${(s.at + (i - 1) * dt).toFixed(2)}s both`);
    add(`.ph-${s.type}`, `${pref}ph0 0.05s linear ${(s.at - 0.02).toFixed(2)}s both`);
    css.push(`  @keyframes ${pref}ph0 { from { opacity: 1; } to { opacity: 0; } }`);
    s._end = s.at + n * dt;
  }
  // žymeklis: matomas nuo rašymo pradžios (ar caret žingsnio) iki kito ekrano / caretOff
  for (const s of steps.filter(s => s.type || s.caret)) {
    const id = s.type || s.caret;
    const from = s.at - (s.type ? 0.3 : 0), to = s.caretOff !== undefined ? T(s.caretOff, C) : D;
    css.push(kf(`${pref}c_${id}`.replace(/[^a-zA-Z0-9_]/g, '_'), D, [[0, 'opacity: 0;'], [from, 'opacity: 0;'], [from + 0.05, 'opacity: 1;'], [to, 'opacity: 1;'], [to + 0.05, 'opacity: 0;']]));
    add(`.caret-${id}`, `${`${pref}c_${id}`.replace(/[^a-zA-Z0-9_]/g, '_')} ${D}s linear 0s both`);
    if (to >= D) def.baseCss += `  .caret-${id} { opacity: 1; }\n`;
  }

  // Rodyti / slėpti (opacity), blyksnis
  const sh = new Map();
  for (const s of steps) {
    for (const k of ['show', 'hide']) if (s[k]) for (const sel of [].concat(s[k])) { if (!sh.has(sel)) sh.set(sel, []); sh.get(sel).push({ at: s.at, v: k === 'show' ? 1 : 0, d: s.dur || 0.3, y: s.rise }); }
  }
  let k = 0;
  for (const [sel, ev] of sh) {
    const st = []; let v = ev[0].v ? 0 : 1; st.push([0, `opacity: ${v};${ev[0].y ? ` transform: translateY(${ev[0].y}px);` : ''}`]);
    for (const e of ev) { st.push([e.at, `opacity: ${v};${e.y && e.v ? ` transform: translateY(${e.y}px);` : ''}`, SPRING]); st.push([e.at + e.d, `opacity: ${e.v};${e.y ? ' transform: none;' : ''}`]); v = e.v; }
    css.push(kf(`${pref}v${k}`, D, st)); add(sel, `${pref}v${k} ${D}s linear 0s both`);
    def.baseCss += `  ${sel} { opacity: ${v}; }\n`;
    k++;
  }
  let f = 0;
  for (const s of steps.filter(s => s.flash)) {
    css.push(`  @keyframes ${pref}bl${f} { 0% { box-shadow: 0 0 0 0 rgba(71,209,101,0); } 30% { box-shadow: 0 0 0 5px rgba(71,209,101,.9); } 100% { box-shadow: 0 0 0 0 rgba(71,209,101,0); } }`);
    add(s.flash, `${pref}bl${f} 1.2s ease-out ${s.at}s both`); f++;
  }
  // Laisvas CSS su žymų laikais: def.anim(T) → [[selektorius, 'animacija'], …], def.keyframes(T) → '…'
  const TT = (v) => T(v, C);
  if (def.anim) for (const [sel, a] of def.anim(TT, D, M.rects)) add(sel, a);
  if (def.keyframes) css.push(def.keyframes(TT, D, M.rects));

  for (const [sel, list] of per) css.push(`  ${sel} { animation: ${list.join(', ')}; }`);
  return `\n  /* ${id} — epizodai.js; žymos b ${C.b.join(' / ')} · g ${C.g.join(' / ')}; ${D} s */\n` + css.join('\n') + '\n';
}

// ---------- eiga ----------
async function build(lessonDir, defs, opts = {}) {
  const slug = path.basename(lessonDir);
  const PLAT = opts.platforma || process.env.PLATFORMA || path.join(os.homedir(), 'Workspace', 'Mokymu-platforma');
  const ep = JSON.parse(fs.readFileSync(path.join(lessonDir, 'epizodai.json'), 'utf-8'));
  const cards = {};
  for (const f of fs.readdirSync(path.join(PLAT, 'turinys', 'adaptuota', 'kursai')).filter(f => f.endsWith('.json'))) {
    for (const v of JSON.parse(fs.readFileSync(path.join(PLAT, 'turinys', 'adaptuota', 'kursai', f), 'utf-8')).vizualai || []) cards[v.id] = v;
  }
  const byFile = Object.fromEntries(ep.kadrai.map(k => [k.failas, k]));
  const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null;
  const ids = Object.keys(defs).filter(id => !only || only.includes(id));
  const contentPath = path.join(lessonDir, 'content', 'lt.json');
  fs.mkdirSync(path.dirname(contentPath), { recursive: true });
  fs.mkdirSync(path.join(lessonDir, 'templates'), { recursive: true });
  fs.mkdirSync(path.join(lessonDir, 'video'), { recursive: true });
  const content = fs.existsSync(contentPath) ? JSON.parse(fs.readFileSync(contentPath, 'utf-8')) : { lang: 'lt' };
  const meta = {};
  for (const id of ids) {
    const k = byFile[id];
    if (!k) throw new Error(`${id}: nėra epizodai.json kadrų sąraše`);
    const card = cards[k.epizodas];
    const C = cues(card);
    const D = (card && card.explaineris && card.explaineris.trukme_s) || k.trukme_s;
    const def = defs[id];
    const nClicks = (def.steps || []).filter(s => s.click).length;
    meta[id] = { k, C, D, nClicks };
    def.baseCss = '';
    fs.writeFileSync(path.join(lessonDir, 'templates', `${id}.html`), page(id, def, nClicks));
    content[id.replace(/-/g, '_')] = { _epizodas: k.epizodas };
  }
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2) + '\n');
  // 1) PNG ir išvesties HTML (matavimui)
  execFileSync('node', [path.join(ROOT, 'generate.js'), '--png', '--lang', 'lt', '--lesson', slug], { cwd: ROOT, stdio: 'pipe' });
  const M = await measure(ids.map(id => path.join(lessonDir, 'output', 'lt', `${id}.html`)));
  // 2) animacijos; bazinė būsena (galutinis ekranas, kursoriaus vieta) įrašoma į šabloną ir PNG perpiešiamas
  const animPath = path.join(lessonDir, 'video', 'animacijos.json');
  const anims = fs.existsSync(animPath) ? JSON.parse(fs.readFileSync(animPath, 'utf-8')) : {};
  for (const id of ids) {
    const { k, C, D, nClicks } = meta[id];
    const def = defs[id];
    def.baseCss = '';
    anims[id] = animate(id, def, M[id], C, D, 'e' + String(k.kadras).padStart(2, '0'));
    fs.writeFileSync(path.join(lessonDir, 'templates', `${id}.html`), page(id, def, nClicks));
  }
  fs.writeFileSync(animPath, JSON.stringify(anims, null, 2) + '\n');
  fs.writeFileSync(path.join(lessonDir, 'matavimai.json'), JSON.stringify(M, null, 1) + '\n');
  execFileSync('node', [path.join(ROOT, 'generate.js'), '--png', '--lang', 'lt', '--lesson', slug], { cwd: ROOT, stdio: 'pipe' });
  console.log(`${slug}: ${ids.length} epizodai → templates/, video/animacijos.json, matavimai.json`);
  for (const id of ids) console.log(`  K${meta[id].k.kadras} ${id} · ${meta[id].D} s · b ${meta[id].C.b.join('/')} · g ${meta[id].C.g.join('/')}`);
}

module.exports = { upload, VID_ICO, split, split2, cke, ckd, tabs, SVG, ICO, top, side, subnav, win, scr, site, typed, btn, chrome, dash, DASH, docRow, docTable, sdocs, esc, build };
