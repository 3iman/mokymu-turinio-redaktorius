#!/usr/bin/env node
/**
 * Koncepcijos filmai (platformos `koncepcija` vienetai) — šablonas, turinys ir animacija iš kortelės.
 *
 *   node koncepcijos.js --lesson {slug} [--platforma ~/Workspace/Mokymu-platforma] [--only 00-a,03-b]
 *
 * Įvestis:
 *   lessons/{slug}/epizodai.json             — kadras → epizodo id, rūšis, failas (atneša platformos turinys/explaineriai/{slug}/)
 *   {platforma}/turinys/adaptuota/kursai/*.json › vizualai[id] — `laukai` (tekstai), `explaineris.laiko_zymos`, `trukme_s`
 * Rezultatas:
 *   lessons/{slug}/templates/{failas}.html   — maketas iš tokens/koncepcijos.css (vienkartinio CSS nėra)
 *   lessons/{slug}/content/lt.json           — sekcija {failas su _}: HTML-escape'inti tekstai (2026-11-03 pamoka)
 *   lessons/{slug}/video/animacijos.json     — klipo CSS; generate-video-clips.js jį ima pirmiau už bendrą žodyną
 *   lessons/{slug}/video/koncepcijos-ataskaita.md — kuris maketas parinktas, kas praleista
 *
 * Maketas parenkamas pagal laukų rinkinį (ADAPTAVIMO-TAISYKLES §7.4: laukų vardai = šablono struktūra).
 * Tekstai — tik iš kortelės `laukai`, NEKEIČIAMI. Laukas „[…]“ (vietos rezervas, pavyzdžio tekste nėra) nerodomas.
 * Animacija: elementų grupės (beats) paskirstomos per balso žymas; einamoji grupė paryškinama,
 * paskutinę sekundę viskas ramu. Bazinė būsena = galutinė (PNG ir viršelis rodo rezultatą).
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(`--${n}`); return i !== -1 ? args[i + 1] : d; };
const slug = arg('lesson');
if (!slug) { console.error('--lesson {slug}'); process.exit(1); }
const PLAT = arg('platforma', path.join(os.homedir(), 'Workspace', 'Mokymu-platforma'));
const only = arg('only') ? arg('only').split(',') : null;
const LDIR = path.join(__dirname, 'lessons', slug);

// ---------- duomenys ----------
const ep = JSON.parse(fs.readFileSync(path.join(LDIR, 'epizodai.json'), 'utf-8'));
const cards = {};
for (const f of fs.readdirSync(path.join(PLAT, 'turinys', 'adaptuota', 'kursai')).filter(f => f.endsWith('.json'))) {
  const d = JSON.parse(fs.readFileSync(path.join(PLAT, 'turinys', 'adaptuota', 'kursai', f), 'utf-8'));
  for (const v of d.vizualai || []) cards[v.id] = v;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const isPh = (s) => /^\s*\[.*\]\s*$/.test(String(s || ''));

// ---------- SVG ----------
const SVG = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  cross: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="11" x2="12" y2="17"/><circle cx="12" cy="7.5" r=".6" fill="currentColor"/></svg>',
  doc: '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/></svg>',
  okc: '<svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="16.5 9 10.5 15 7.5 12"/></svg>',
  person: '<svg viewBox="0 0 230 250"><circle cx="115" cy="82" r="56" fill="#9fb0d0"/><path d="M10 250c0-66 47-104 105-104s105 38 105 104z" fill="#9fb0d0"/></svg>',
  crossArrow: '<svg viewBox="0 0 120 40" width="120" height="40"><line x1="6" y1="20" x2="104" y2="20" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="10 8"/><polyline points="96 10 112 20 96 30" fill="none" stroke="#cbd5e1" stroke-width="4"/><line x1="44" y1="4" x2="76" y2="36" stroke="#dc2626" stroke-width="5" stroke-linecap="round"/><line x1="76" y1="4" x2="44" y2="36" stroke="#dc2626" stroke-width="5" stroke-linecap="round"/></svg>',
};

// ---------- pagalbinės ----------
const num = (k) => { const m = String(k).match(/(\d+)/); return m ? parseInt(m[1], 10) : 0; };
const keysLike = (L, re) => Object.keys(L).filter(k => re.test(k) && !isPh(L[k])).sort((a, b) => num(a) - num(b));
const fsFor = (vals, base = 34) => {
  const n = vals.length, mx = Math.max(0, ...vals.map(v => String(v).length));
  // mažai punktų — stambiau (video žiūrimas mažame lange); daug ar ilgi — smulkiau
  let f;
  if (n >= 7 || mx > 80) f = base - 5;
  else if (n >= 5 || mx > 55) f = base - 3;
  else if (n <= 2) f = base + 8;
  else if (n === 3) f = base + 5;
  else f = base + 2;
  if (mx > 110) f = Math.min(f, base - 7);
  return f;
};
const pair = (k) => `{{${k}}}`;
const rowText = (k, v) => {
  // „A → B“ — kairė paryškinta, dešinė pilka (jei_tai poros)
  if (/→/.test(v)) {
    const [a, b] = v.split('→').map(s => s.trim());
    return { html: `<div class="k-pair"><b>{{${k}_a}}</b><i>→</i><span>{{${k}_b}}</span></div>`, extra: { [`${k}_a`]: a, [`${k}_b`]: b } };
  }
  return { html: `<div>${pair(k)}</div>`, extra: {} };
};
const sumBlock = (L, beats, ctx) => {
  const out = [];
  for (const [k, note] of [['summary', false], ['note', true]]) {
    if (L[k] && !isPh(L[k])) {
      out.push(`<div class="k-sum${note ? ' is-note' : ''} b-${k}">${note ? SVG.info : SVG.bulb}<span>${pair(k)}</span></div>`);
      beats.push({ sel: `.b-${k}`, kind: 'medium', last: true });
      ctx.used.add(k);
    }
  }
  return out.join('');
};

// ---------- maketai ----------
const LAYOUTS = [
  { name: 'palyginimas', test: L => 'old_title' in L || 'new_title' in L, build(L, ctx) {
    const beats = [];
    const col = (side, cls, icon) => {
      const steps = keysLike(L, new RegExp(`^${side}_step_\\d+$`));
      steps.forEach(k => ctx.used.add(k)); ctx.used.add(`${side}_title`);
      return `<div class="k-col is-${cls} b-${side}"><div class="k-col-h"><div class="k-col-i">${icon}</div><div class="k-col-t">${pair(`${side}_title`)}</div></div>
        <div class="k-steps${steps.length === 1 ? ' is-one' : ''}">${steps.map((k, i) => `<div class="k-step"><span class="k-sn">${i + 1}</span><span>${pair(k)}</span></div>`).join('')}</div></div>`;
    };
    const vals = keysLike(L, /_step_\d+$/).map(k => L[k]);
    const body = `<div class="k-cmp" style="--k-fs:${fsFor(vals, 32)}px">${col('old', 'old', SVG.cross)}<div class="k-arrow b-arrow"><div>${SVG.arrow}</div></div>${col('new', 'new', SVG.check)}</div>`;
    beats.push({ sel: '.b-old', kind: 'medium', hl: true }, { sel: '.b-arrow, .b-new', kind: 'medium', hl: '.b-new' });
    return { body: body + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'taisyklingai_netaisyklingai', test: L => 'do_title' in L || 'dont_title' in L, build(L, ctx) {
    const beats = [];
    const col = (side, cls, icon, mark) => {
      const it = keysLike(L, new RegExp(`^${side}_\\d+$`));
      it.forEach(k => ctx.used.add(k)); ctx.used.add(`${side}_title`);
      return `<div class="k-col is-${cls} b-${side}"><div class="k-col-h"><div class="k-col-i">${icon}</div><div class="k-col-t">${pair(`${side}_title`)}</div></div>
        <div class="k-steps">${it.map(k => `<div class="k-step"><span class="k-sn">${mark}</span><span>${pair(k)}</span></div>`).join('')}</div></div>`;
    };
    const vals = keysLike(L, /^(do|dont)_\d+$/).map(k => L[k]);
    const body = `<div class="k-cmp" style="--k-fs:${fsFor(vals, 32)}px">${col('do', 'do', SVG.check, '✓')}${col('dont', 'dont', SVG.cross, '✗')}</div>`;
    beats.push({ sel: '.b-do', kind: 'medium', hl: true }, { sel: '.b-dont', kind: 'medium', hl: true });
    return { body: body + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'srautas', test: L => 'step1_label' in L && 'step1_desc' in L && 'arrow_label_1' in L, build(L, ctx) {
    const beats = [];
    const steps = keysLike(L, /^step\d+_label$/);
    let h = '<div class="k-flow">';
    steps.forEach((k, i) => {
      const n = num(k);
      if (i > 0) {
        const al = `arrow_label_${n - 1}`;
        h += `<div class="k-link b-l${n - 1}"><div class="k-link-t">${L[al] && !isPh(L[al]) ? pair(al) : ''}</div><div class="k-link-line"></div></div>`;
        ctx.used.add(al);
      }
      const d = `step${n}_desc`;
      h += `<div class="k-node is-${Math.min(4, i + 1)} b-n${n}"><div class="k-node-i">${n}</div><div class="k-node-l">${pair(k)}</div>${L[d] && !isPh(L[d]) ? `<div class="k-node-d">${pair(d)}</div>` : ''}</div>`;
      ctx.used.add(k); ctx.used.add(d);
      beats.push({ sel: i > 0 ? `.b-l${n - 1}, .b-n${n}` : `.b-n${n}`, kind: 'medium', hl: `.b-n${n}` });
    });
    h += '</div>';
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'zingsniai', test: L => 'step1_num' in L, build(L, ctx) {
    const beats = [];
    const steps = keysLike(L, /^step\d+_label$/);
    let h = '<div class="k-zs">';
    for (const k of steps) {
      const n = num(k); ctx.used.add(k); ctx.used.add(`step${n}_num`);
      let d = '';
      const pre = `step${n}_desc_prefix`, code = `step${n}_desc_code`, suf = `step${n}_desc_suffix`, plain = `step${n}_desc`, note = `step${n}_note`;
      if (L[plain] && !isPh(L[plain])) { d = pair(plain); ctx.used.add(plain); }
      else if (L[pre] || L[code] || L[suf]) {
        d = `${L[pre] ? pair(pre) + ' ' : ''}${L[code] ? `<code>${pair(code)}</code>` : ''}${L[suf] ? ' ' + pair(suf) : ''}`;
        [pre, code, suf].forEach(x => ctx.used.add(x));
      }
      if (L[note] && !isPh(L[note])) { d += `${d ? '<br>' : ''}<em>${pair(note)}</em>`; ctx.used.add(note); }
      h += `<div class="k-z b-z${n}"><div class="k-num">${pair(`step${n}_num`)}</div><div><div class="k-z-l">${pair(k)}</div>${d ? `<div class="k-z-d">${d}</div>` : ''}</div></div>`;
      beats.push({ sel: `.b-z${n}`, kind: 'light', hl: true });
    }
    h += '</div>';
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'dokumentu_sarasas', test: L => 'doc1_label' in L, build(L, ctx) {
    const beats = [];
    const docs = keysLike(L, /^doc\d+_label$/);
    let h = '<div class="k-panel" style="max-width:1380px;margin:0 auto;width:100%">';
    for (const k of docs) {
      const n = num(k), d = `doc${n}_desc`, t = `doc${n}_tag`;
      [k, d, t].forEach(x => ctx.used.add(x));
      h += `<div class="k-doc b-d${n}"><div class="k-doc-i">${/@/.test(L[k]) ? SVG.mail : SVG.doc}</div><div class="k-doc-b"><div class="k-doc-l">${pair(k)}</div>${L[d] && !isPh(L[d]) ? `<div class="k-doc-d">${pair(d)}</div>` : ''}</div>${L[t] && !isPh(L[t]) ? `<span class="k-tag">${pair(t)}</span>` : ''}</div>`;
      beats.push({ sel: `.b-d${n}`, kind: 'light', hl: true });
    }
    h += '</div>';
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'personos_kortele', test: L => 'amzius' in L, build(L, ctx) {
    const beats = [];
    const F = [['amzius', 'Amžius'], ['issilavinimas', 'Išsilavinimas'], ['darbas', 'Darbas', true], ['komunikacija', 'Komunikacija', true]];
    let h = `<div class="k-persona"><div class="k-sil b-sil">${SVG.person}</div><div class="k-facts">`;
    beats.push({ sel: '.b-sil', kind: 'medium' });
    F.forEach(([k, lbl, wide], i) => {
      if (!L[k] || isPh(L[k])) return;
      ctx.used.add(k);
      h += `<div class="k-fact${wide ? ' is-wide' : ''} b-f${i}"><div class="k-fact-l">${lbl}</div><div class="k-fact-v">${pair(k)}</div></div>`;
      beats.push({ sel: `.b-f${i}`, kind: 'light', hl: true });
    });
    h += '</div></div>';
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'kategorijos_kortele', test: L => 'kam' in L, build(L, ctx) {
    // Naujienos kortelė su kategorijos žyma; pabaigoje šalia išnyra kitos srauto kortelės (eskizas: „atsistoja į naujienų srauto eilę“)
    const beats = [];
    ctx.used.add('kam'); ctx.used.add('taisykle');
    const ghost = (c) => `<div class="k-news is-ghost ${c}"><div class="k-news-img"></div><div class="k-news-b"><span class="k-news-l" style="width:80%"></span><span class="k-news-l" style="width:60%"></span><span class="k-news-l" style="width:70%"></span></div></div>`;
    let h = `<div class="k-stream">${ghost('b-g1')}<div class="k-news b-card"><div class="k-news-img"><span class="k-cat-tag">${pair('title')}</span></div>
      <div class="k-news-b"><div class="k-cat-t b-kam">${pair('kam')}</div></div></div>${ghost('b-g2')}</div>`;
    beats.push({ sel: '.b-card', kind: 'heavy' }, { sel: '.b-kam', kind: 'light', hl: '.b-card' });
    if (L.taisykle && !isPh(L.taisykle)) { h += `<div class="k-cat-r b-tais">${SVG.okc}<span>${pair('taisykle')}</span></div>`; beats.push({ sel: '.b-tais', kind: 'light', hl: true }); }
    beats.push({ sel: '.b-g1, .b-g2', kind: 'medium', last: true });
    ctx.titleInCard = true;
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'apibrezimas', test: L => 'term' in L, build(L, ctx) {
    const beats = [];
    ctx.used.add('term');
    let h = `<div class="k-def"><div class="k-def-term b-term">${pair('term')}</div>`;
    beats.push({ sel: '.b-term', kind: 'heavy' });
    for (const k of ['definition', 'alt_terms']) if (L[k] && !isPh(L[k])) { h += `<div class="k-def-d b-${k}">${pair(k)}</div>`; ctx.used.add(k); beats.push({ sel: `.b-${k}`, kind: 'light' }); }
    const chips = keysLike(L, /^(scope|item)_\d+$/);
    if (chips.length) {
      h += `<div class="k-chips">${chips.map(k => `<span class="k-chip b-${k}">${pair(k)}</span>`).join('')}</div>`;
      chips.forEach(k => { ctx.used.add(k); beats.push({ sel: `.b-${k}`, kind: 'light', hl: true }); });
    }
    h += '</div>';
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'dvi_zonos', test: L => 'cms_label' in L && 'site_label' in L, build(L, ctx) {
    const beats = [];
    ['cms_label', 'cms_note', 'site_label', 'site_note'].forEach(k => ctx.used.add(k));
    const h = `<div class="k-zones"><div class="k-zone b-cms"><div class="k-panel"><div class="k-zone-h">${pair('cms_label')}</div><div class="k-zone-v">${pair('cms_note')}</div></div></div>
      <div class="k-arrow b-x" style="width:140px">${SVG.crossArrow}</div>
      <div class="k-zone is-off b-site"><div class="k-panel"><div class="k-zone-h">${pair('site_label')}</div><div class="k-zone-v">${pair('site_note')}</div></div></div></div>`;
    beats.push({ sel: '.b-cms', kind: 'medium', hl: '.b-cms .k-panel' }, { sel: '.b-x, .b-site', kind: 'medium', hl: '.b-site .k-panel' });
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'laiko_juosta', test: L => keysLike(L, /^step\d+_label$/).length >= 5 && !('step1_desc' in L), build(L, ctx) {
    const beats = [];
    const steps = keysLike(L, /^step\d+_label$/);
    let h = `<div class="k-tl" style="--k-n:${steps.length}">`;
    steps.forEach((k, i) => { ctx.used.add(k); h += `<div class="k-tl-s b-t${i}"><div class="k-tl-l"><span class="k-tl-n">${i + 1}</span>${pair(k)}</div><div class="k-tl-d"></div></div>`; beats.push({ sel: `.b-t${i}`, kind: 'light' }); });
    h += '</div>';
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'centras_aplinka', test: L => 'center' in L || 'source_label' in L, build(L, ctx) {
    const beats = [];
    const c = 'center' in L ? 'center' : 'source_label';
    ctx.used.add(c); ctx.used.add('source_desc');
    const items = keysLike(L, /^(item|target)_\d+$/);
    const cols = items.length > 6 ? 4 : 3;
    let h = `<div class="k-hub"><div class="k-hub-c b-c">${pair(c)}${L.source_desc && !isPh(L.source_desc) ? `<small>${pair('source_desc')}</small>` : ''}</div>
      <div class="k-hub-g" style="--k-cols:${cols};--k-fs:${fsFor(items.map(k => L[k]), 32)}px">`;
    beats.push({ sel: '.b-c', kind: 'heavy' });
    items.forEach(k => { ctx.used.add(k); h += `<div class="k-hub-i b-${k}">${SVG.okc}<span>${pair(k)}</span></div>`; beats.push({ sel: `.b-${k}`, kind: 'light', hl: true }); });
    h += '</div></div>';
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'puslapio_maketas', test: L => 'eu_banner_text' in L || 'page_title' in L, build(L, ctx) {
    const beats = [];
    ['eu_banner_text', 'page_title', 'project_intro', 'project_period'].forEach(k => ctx.used.add(k));
    let h = `<div class="k-page"><div class="k-page-bar"><i></i><i></i><i></i></div><div class="k-page-b">`;
    if (L.eu_banner_text) { h += `<div class="k-eu b-eu"><div class="k-eu-f">★★★</div><span>${pair('eu_banner_text')}</span></div>`; beats.push({ sel: '.b-eu', kind: 'medium', hl: true }); }
    if (L.page_title) { h += `<div class="k-page-t b-pt">${pair('page_title')}</div>`; beats.push({ sel: '.b-pt', kind: 'light' }); }
    if (L.project_intro) { h += `<div class="k-page-p b-pi">${pair('project_intro')}</div>`; beats.push({ sel: '.b-pi', kind: 'light', hl: true }); }
    if (L.project_period) { h += `<div class="k-page-m b-pp">${pair('project_period')}</div>`; beats.push({ sel: '.b-pp', kind: 'light' }); }
    h += '</div></div>';
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'anatomija', test: L => 'url_base' in L, build(L, ctx) {
    const beats = [];
    ['url_label', 'url_base', 'url_file_id', 'url_gid', 'gid_explain'].forEach(k => ctx.used.add(k));
    let h = '';
    if (L.url_label) h += `<div class="k-panel-h b-ul" style="text-align:center;margin:0 0 18px">${pair('url_label')}</div>`;
    h += `<div class="k-url"><span class="is-a b-ua">${pair('url_base')}</span><span class="is-b b-ub">${pair('url_file_id')}</span><span class="is-c b-uc">${pair('url_gid')}</span></div>`;
    beats.push({ sel: '.b-ul, .b-ua', kind: 'medium' }, { sel: '.b-ub', kind: 'light', hl: true }, { sel: '.b-uc', kind: 'light', hl: true });
    if (L.gid_explain) { h += `<div class="k-sum is-note b-ge">${SVG.info}<span>${pair('gid_explain')}</span></div>`; beats.push({ sel: '.b-ge', kind: 'medium' }); }
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
  { name: 'kortele_su_sarasu', test: () => true, build(L, ctx) {
    // Visi likę laukai — punktai (item_*, tipas_*, source_*, tag_*, benefit_* ir t. t.), kortelės tvarka
    const beats = [];
    const listKeys = Object.keys(L).filter(k => !['title', 'summary', 'note'].includes(k) && !ctx.used.has(k) && !isPh(L[k]));
    const main = listKeys.filter(k => !/^benefit_\d+$/.test(k));
    const ben = keysLike(L, /^benefit_\d+$/);
    const numbered = main.every(k => /_\d+$/.test(k)) && main.length > 1;
    const grid = main.length > 5 && !ben.length;
    const fsz = fsFor(main.map(k => L[k]), grid ? 31 : 34);
    const rows = (keys, cls) => keys.map((k, i) => {
      const r = rowText(k, L[k]); Object.assign(ctx.extra, r.extra); ctx.used.add(k);
      beats.push({ sel: `.b-${k}`, kind: 'light', hl: true });
      return `<div class="k-row${numbered ? '' : ' is-plain'} b-${k}"><span class="k-num">${i + 1}</span>${r.html}</div>`;
    }).join('');
    let h;
    if (!main.length && !ben.length) {
      // tik pastaba / santrauka — ji ir yra žinutė, rodoma stambiai
      const r = sumBlock(L, beats, ctx).replace(/class="k-sum/g, 'class="k-sum is-big');
      return { body: r, beats };
    }
    if (ben.length) {
      h = `<div class="k-two"><div class="k-panel" style="--k-fs:${fsz}px"><div class="k-list">${rows(main)}</div></div>
           <div class="k-panel is-green" style="--k-fs:${fsFor(ben.map(k => L[k]), 31)}px"><div class="k-list">${rows(ben)}</div></div></div>`;
    } else {
      h = `<div class="k-panel" style="--k-fs:${fsz}px;max-width:${grid ? 1680 : 1320}px;margin:0 auto;width:100%"><div class="k-list${grid ? ' is-grid' : ''}">${rows(main)}</div></div>`;
    }
    return { body: h + sumBlock(L, beats, ctx), beats };
  } },
];

// ---------- laikas ----------
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';
function timeline(beats, cues, D, pref) {
  // grupės → žymos: tolygiai; paskutinės („last“: santrauka) — prie paskutinės žymos
  const k = Math.max(1, cues.length);
  const body = beats.filter(b => !b.last), tail = beats.filter(b => b.last);
  const m = body.length;
  // balsas pasakoja eilės tvarka: kai grupių ne daugiau nei žymų — po vieną į pirmas žymas; daugiau — tolygiai
  const assign = body.map((b, j) => (m <= k ? Math.min(j, k - 1) : Math.floor(j * k / m)));
  if (tail.length && k > 1) {
    // santrauka — su paskutine žyma; jei paskutinė žyma jau užimta turinio, santrauka eina su ja
    tail.forEach(b => assign.push(k - 1));
  } else tail.forEach(() => assign.push(Math.max(0, k - 1)));
  const all = [...body, ...tail];
  const groups = {};
  all.forEach((b, i) => (groups[assign[i]] = groups[assign[i]] || []).push(b));
  const css = [];
  const calmFrom = D - 1.0;
  Object.entries(groups).forEach(([ci, bs]) => {
    ci = +ci;
    const t0 = cues.length ? cues[ci] : 1.0;
    const t1 = ci + 1 < cues.length ? cues[ci + 1] : calmFrom;
    const win = Math.max(0.6, t1 - t0);
    const step = Math.min(0.55, (win * 0.55) / Math.max(1, bs.length));
    bs.forEach((b, i) => {
      b.at = +(t0 + 0.1 + i * step).toFixed(2);
      b.hlFrom = b.at; b.hlTo = +Math.min(calmFrom, t1).toFixed(2);
    });
  });
  // pirmoji grupė pasirodo ne vėliau nei 1,2 s (žiūrovas nemato tuščio kadro)
  if (all.length && all[0].at > 1.4) { const d = all[0].at - 1.2; all.filter(b => b.at === all[0].at).forEach(b => (b.at = 1.2)); void d; }
  const dur = { heavy: 0.7, medium: 0.55, light: 0.45 };
  const dy = { heavy: 26, medium: 20, light: 14 };
  css.push(`  .k-title { animation: ${pref}T 0.7s ${SPRING} 0.15s both; }`);
  css.push(`  @keyframes ${pref}T { from { opacity: 0; transform: translateY(24px) scale(.98); } to { opacity: 1; transform: none; } }`);
  // Vienam selektoriui — viena `animation` deklaracija (kitaip vėlesnė tyliai nustumia ankstesnę; EIMANTO_PASTABOS 2026-10-30)
  const per = new Map();
  const add = (sel, a) => { for (const x of sel.split(',').map(t => t.trim()).filter(Boolean)) { if (!per.has(x)) per.set(x, []); per.get(x).push(a); } };
  all.forEach((b, i) => {
    const kf = `${pref}r${i}`;
    css.push(`  @keyframes ${kf} { from { opacity: 0; transform: translateY(${dy[b.kind]}px) scale(.985); } to { opacity: 1; transform: none; } }`);
    add(b.sel, `${kf} ${dur[b.kind]}s ${SPRING} ${b.at}s both`);
    if (b.hl) {
      const hk = `${pref}h${i}`, p = (t) => Math.max(0, Math.min(100, (t / D) * 100)).toFixed(2);
      const a = b.hlFrom + 0.35, z = b.hlTo;
      if (z - a > 0.4) {
        css.push(`  @keyframes ${hk} { 0%, ${p(a - 0.01)}% { box-shadow: 0 0 0 0 rgba(51,99,171,0); } ${p(a + 0.3)}%, ${p(z - 0.3)}% { box-shadow: 0 0 0 5px rgba(51,99,171,.30); } ${p(z)}%, 100% { box-shadow: 0 0 0 0 rgba(51,99,171,0); } }`);
        add(b.hl === true ? b.sel : b.hl, `${hk} ${D}s linear 0s both`);
      }
    }
  });
  for (const [sel, list] of per) css.push(`  ${sel} { animation: ${list.join(', ')}; }`);
  return css.join('\n');
}

// ---------- šablonas ----------
const page = (body, titleCls) => `<!DOCTYPE html>
<html lang="{{lang}}">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./tokens/tokens.css">
<link rel="stylesheet" href="./tokens/base.css">
<link rel="stylesheet" href="./tokens/koncepcijos.css">
<!-- Generuoja koncepcijos.js iš platformos kortelės — ranka neredaguoti. -->
</head>
<body>
  <div class="card">
    ${titleCls === null ? '' : `<div class="k-title${titleCls}">{{title}}</div>`}
    ${body}
    <div class="brand-bar">
      <img class="brand-logo brand-logo-light" src="{{brand_logo_path}}" alt="Cleverphant" />
      <img class="brand-logo brand-logo-dark" src="{{brand_logo_dark_path}}" alt="Cleverphant" />
    </div>
  </div>
</body>
</html>
`;

// ---------- eiga ----------
const contentPath = path.join(LDIR, 'content', 'lt.json');
const content = fs.existsSync(contentPath) ? JSON.parse(fs.readFileSync(contentPath, 'utf-8')) : { lang: 'lt' };
const animPath = path.join(LDIR, 'video', 'animacijos.json');
const anims = fs.existsSync(animPath) ? JSON.parse(fs.readFileSync(animPath, 'utf-8')) : {};
fs.mkdirSync(path.join(LDIR, 'templates'), { recursive: true });
fs.mkdirSync(path.join(LDIR, 'video'), { recursive: true });
fs.mkdirSync(path.join(LDIR, 'content'), { recursive: true });
const report = [`# Koncepcijos filmai — ${slug}`, '', 'Generuoja `koncepcijos.js`. Tekstai — iš kortelės `laukai`, nekeisti.', '', '| Kadras | Failas | Maketas | Grupės / žymos | Pastabos |', '|---|---|---|---|---|'];
let n = 0;
for (const k of ep.kadrai) {
  if (k.rusis !== 'koncepcija') continue;
  if (only && !only.includes(k.failas)) continue;
  const v = cards[k.epizodas];
  if (!v) { report.push(`| ${k.kadras} | ${k.failas} | — | — | ⛔ kortelė ${k.epizodas} nerasta |`); continue; }
  const L = { ...(v.laukai || {}) };
  const notes = [];
  for (const key of Object.keys(L)) if (isPh(L[key])) notes.push(`\`${key}\` — vietos rezervas „${L[key]}“, nerodomas`);
  if (!L.title) L.title = (v.explaineris && v.explaineris.antraste && v.explaineris.antraste.lt) || k.failas;
  const lay = LAYOUTS.find(l => l.test(L));
  const ctx = { used: new Set(['title']), extra: {}, titleInCard: false };
  const { body, beats } = lay.build(L, ctx);
  const leftover = Object.keys(L).filter(x => !ctx.used.has(x) && !isPh(L[x]) && !['summary', 'note'].includes(x));
  if (leftover.length) notes.push(`nepanaudoti laukai: ${leftover.join(', ')}`);
  const e = v.explaineris || {};
  const D = e.trukme_s || v.trukme_s || k.trukme_s || 12;
  const cues = (e.laiko_zymos || []).filter(z => z.kas === 'balsas').map(z => +z.laikas).sort((a, b) => a - b);
  const titleLen = String(L.title).length;
  const html = page(body, ctx.titleInCard ? null : (titleLen > 48 || beats.length > 7 ? ' is-small' : ''));
  fs.writeFileSync(path.join(LDIR, 'templates', `${k.failas}.html`), html);
  const sec = {};
  for (const [key, val] of Object.entries({ ...L, ...ctx.extra })) if (!isPh(val)) sec[key] = esc(val);
  content[k.failas.replace(/-/g, '_')] = sec;
  const pref = 'k' + String(k.kadras).padStart(2, '0');
  anims[k.failas] = `\n  /* ${k.failas} — ${lay.name}; žymos ${cues.join(' / ')} s; ${D} s (koncepcijos.js) */\n` + timeline(beats, cues, D, pref) + '\n';
  report.push(`| ${k.kadras} | ${k.failas} | ${lay.name} | ${beats.length} / ${cues.length} | ${notes.join('; ') || '—'} |`);
  n++;
}
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2) + '\n');
fs.writeFileSync(animPath, JSON.stringify(anims, null, 2) + '\n');
fs.writeFileSync(path.join(LDIR, 'video', 'koncepcijos-ataskaita.md'), report.join('\n') + '\n');
console.log(`${slug}: ${n} koncepcijos filmai → templates/, content/lt.json, video/animacijos.json`);
console.log(report.slice(4).join('\n'));
