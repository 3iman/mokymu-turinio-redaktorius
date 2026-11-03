#!/usr/bin/env node
// „Nesimato finansinės ataskaitos dokumentas“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const FA = 'Finansinės ataskaitos';
const DOC = '2023 m. finansinių ataskaitų rinkinys';
const row = (n, k, t) => `<div class="tvs-row"${t ? ` data-t="${t}"` : ''}><div class="tvs-handle">${I.handle}</div><div class="tvs-check"></div><div class="tvs-title"${t ? ' data-t="dname"' : ''}>${n}</div><div class="kat"${t ? ' data-t="dkat"' : ''}>${k}</div><div class="tvs-actions"><span class="tvs-btn is-small is-orange">${S.edit}Redaguoti</span></div></div>`;
const list = E.win({ cls: 'scr1', crumb: 'Dokumentų banko modulis  /  Dokumentai', sideOn: 3, body: `
          <div class="tvs-table k-table" data-t="ktab"><div class="tvs-th"><span></span><div class="tvs-check"></div><span>Pavadinimas</span><span data-t="hkat">Kategorijos</span><span></span></div>
            ${row('2024 m. finansinių ataskaitų rinkinys', `${FA} >> 2024 m.`)}${row(DOC, `${FA}, ${FA} >> 2022 m.`, 'r')}${row('2022 m. finansinių ataskaitų rinkinys', `${FA} >> 2022 m.`)}${row('Biudžeto vykdymo ataskaita 2025 m.', 'Biudžeto vykdymo ataskaitos')}
          </div>` });
const chip = (n, cls = '', t = '') => `<span class="tvs-chip ${cls}"${t ? ` data-t="${t}"` : ''}>${n}<span class="tvs-chip-x"${t ? ` data-t="${t}x"` : ''}>×</span></span>`;
const form = (cls, chips, extra = '') => E.win({ cls, crumb: 'Dokumentų banko modulis  /  Dokumentai  /  Redaguoti', sideOn: 3, body: `${extra}
          <div class="tvs-form is-dense">
            <div class="tvs-field"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input is-value">${DOC}</div></div>
            <div class="tvs-field" data-t="ftags"><div class="tvs-label">Kategorijos</div><div class="tvs-tags">${chips}</div><div class="tvs-help">Separate values with a comma or by pressing "Enter".</div></div>
            <div class="tvs-field"><div class="tvs-label">Failas</div><div class="tvs-frow"><span class="tvs-fico">${I.file}</span><div class="tvs-fmeta"><span class="tvs-fname">finansiniu-ataskaitu-rinkinys-2023.pdf</span><span class="tvs-fpath">local://dokumentubankas/finansiniu-ataskaitu-rinkinys-2023.pdf</span></div></div></div>
          </div>
          <div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save })}</div>` });
const r = (n, d, z, c, t) => [n, d, z, c, t];
const table = (dup) => E.sdocs(FA, [
  ...(dup ? [r(DOC, '2024-02-27 10:05:11', '2.31 MB', 'top', 'rtop')] : []),
  r('2024 m.', '', '', 'is-group'), r('2024 m. finansinių ataskaitų rinkinys', '2025-02-26 09:40:02', '2.10 MB'),
  r('2023 m.', '', '', 'is-group', 'g23'), r(DOC, '2024-02-27 10:05:11', '2.31 MB', 'y23', 'ry23'),
  r('2022 m.', '', '', 'is-group'), r('2022 m. finansinių ataskaitų rinkinys', '2023-02-24 11:12:30', '1.98 MB')], { t: 'tbl' });
const site = (cls, dup) => E.site(cls, `<div class="tw">${table(dup)}</div>`, { title: FA, on: 1, nav: ['Apie mokyklą', 'Dokumentai', 'Mokiniams', 'Tėvams', 'Kontaktai'] });
const siteCss = `.tw .tvs-sdocs-tr.top, .tw .tvs-sdocs-tr.y23 { position: relative; }`;
E.build(__dirname, {
  '01-ne-tos-kategorijos': {
    note: 'Kadras 1 — „Ne tos kategorijos“ (ep_690_01_1): stulpelis „Kategorijos“ → forma su dviem žymomis',
    origin: '55% 35%',
    screens: [list, form('scr2', chip(FA, 'c1', 'c1') + chip(`${FA} >> 2022 m.`, 'c2', 'c2'))],
    css: `.k-table .tvs-th, .k-table .tvs-row { grid-template-columns: 44px 36px 1fr 520px 200px; } .kat { font-size: 18px; color: var(--tvs-text-muted); }
  .c1, .c2 { box-shadow: 0 0 0 3px rgba(229,50,45,0); }`,
    steps: [
      { t: 'b1', spot: 'hkat', pad: 8 }, { t: 'b1+0.6', zoom: 1.2 }, { t: 'b1+1.4', spot: 'dkat', pad: 8 },
      { t: 'b2', spot: 'dname', pad: 8 }, { t: 'b2', cur: 'dname', ax: 0.4 }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, slide: 'right' }, { t: 'g1+0.1', zoom: 1 },
      { t: 'g1+0.4', spot: 'ftags', pad: 6 }, { t: 'b3', spot: 'c1', pad: 6 }, { t: 'b3+1.6', spot: 'c2', pad: 6 }, { t: 'b3+0.2', flash: '.c1' }, { t: 'b3+1.8', flash: '.c2' },
    ],
  },
  '03-du-kartus-lenteleje': {
    note: 'Kadras 2 — „Du kartus lentelėje“ (ep_690_03_2): tas pats dokumentas viršuje ir prie 2023 m.',
    origin: '45% 40%',
    screens: [site('scr1', true)],
    css: siteCss,
    steps: [
      { t: 'b1', spot: 'rtop', pad: 6 },
      { t: 'b2', spot: ['g23', 'ry23'], pad: 6 },
      { t: 'b3', spot: ['rtop', 'ry23'], pad: 8 }, { t: 'b3+0.3', flash: '.tw .top' }, { t: 'b3+0.3', flash: '.tw .y23' },
    ],
  },
  '03-isimate-tevine': {
    note: 'Kadras 3 — „Išimate tėvinę“ (ep_690_03_3): × prie tėvinės žymos → „Atnaujinti“ → dokumentas tik prie 2023 m.',
    origin: '40% 40%',
    screens: [form('scr1', chip(FA, 'c1 gone', 'c1') + chip(`${FA} >> 2022 m.`, 'c2', 'c2'), '<div class="tvs-alert saved">Dokumentas atnaujintas.</div>'), site('scr2', false)],
    css: siteCss + ` .saved { opacity: 0; }`,
    steps: [
      { t: 'b1', spot: 'ftags', pad: 6 }, { t: 'b1', zoom: 1.3 }, { t: 'b1+0.2', cur: 'c1x' }, { t: 'g1', click: true },
      { t: 'b2-0.6', zoom: 1 }, { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd', dur: 0.4 }, { t: 'g2', click: true }, { t: 'g3', show: '.saved', dur: 0.2 }, { t: 'g3', spot: null },
      { t: 'b3-0.3', scr: 2, slide: 'up' }, { t: 'b3', spot: 'tbl', pad: 8 }, { t: 'b3', cur: [1380, 820], dur: 0.8 }, { t: 'b3+0.4', flash: '.tw .y23' },
    ],
    anim: (T) => [['.gone', `isnyksta 0.35s cubic-bezier(.45,0,.2,1) ${T('g1+0.05')}s both`]],
    keyframes: () => '  @keyframes isnyksta { from { max-width: 600px; opacity: 1; } to { max-width: 0; opacity: 0; padding: 0; margin: 0; } }',
  },
});
