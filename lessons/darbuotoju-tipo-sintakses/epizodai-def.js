#!/usr/bin/env node
// „Darbuotojų tipo sintaksės“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG, I = E.ICO;
const upd = E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' });
const STAFF = [['Vincas Kudirka', '{{ staff_single(6) }}', 'Direktorius', 'k'], ['Marija Pečkauskaitė', '{{ staff_single(7) }}', 'Direktoriaus pavaduotoja ugdymui'], ['Jonas Basanavičius', '{{ staff_single(8) }}', 'Istorijos mokytojas'], ['Žemaitė', '{{ staff_single(9) }}', 'Lietuvių kalbos mokytoja']];
const list = E.win({ cls: 'scr1', crumb: 'Darbuotojai', sideOn: 5, sub: ['Darbuotojai', 'Kategorijos'], body: `
          <div class="tvs-table st-table"><div class="tvs-th"><div class="tvs-check"></div><span>Image</span><span>Full name</span><span data-t="hsyn">Sintaksė</span><span>Position</span></div>
            ${STAFF.map(([n, c, p, t]) => `<div class="tvs-row"${t ? ' data-t="rowk"' : ''}><div class="tvs-check"></div><div><span class="tvs-thumb"></span></div><div>${n}</div><div><code class="syn"${t ? ' data-t="synk"' : ''}>${E.esc(c)}</code></div><div>${p}</div></div>`).join('')}
          </div>`, extra: '\n        <div class="tvs-toast toast">Nukopijuota</div>' });
const CATS = [['Administracija', "{{ staff('administracija') }}"], ['Mokytojai', "{{ staff('mokytojai') }}"], ['Pagalbos specialistai', "{{ staff('pagalbos-specialistai') }}"], ['Būrelių vadovai', "{{ staff('bureliu-vadovai') }}", 'new']];
const catsList = (cls, on) => E.win({ cls, crumb: on ? 'Darbuotojai  /  Kategorijos' : 'Darbuotojai', sideOn: 5, sub: ['Darbuotojai', '<span data-t="subcat">Kategorijos</span>'], subOn: on, body: on ? `
          <div class="tvs-table ct-table" data-t="ctab"><div class="tvs-th"><div class="tvs-check"></div><span>Title</span><span data-t="hsyn2">Sintaksė</span></div>
            ${CATS.map(([n, c, t]) => `<div class="tvs-row${t ? ' is-new newcat' : ''}"${t ? ' data-t="newcat"' : ''}><div class="tvs-check"></div><div>${n}</div><div><code class="syn">${E.esc(c)}</code></div></div>`).join('')}
          </div>` : `
          <div class="tvs-table st-table"><div class="tvs-th"><div class="tvs-check"></div><span>Image</span><span>Full name</span><span>Sintaksė</span><span>Position</span></div>
            ${STAFF.map(([n, c, p]) => `<div class="tvs-row"><div class="tvs-check"></div><div><span class="tvs-thumb"></span></div><div>${n}</div><div><code class="syn">${E.esc(c)}</code></div><div>${p}</div></div>`).join('')}
          </div>` });
const prof = (name, pos, desc) => `<div class="tvs-sprof sp"><div class="tvs-sprof-photo"></div><div class="tvs-sprof-b">
            <div class="tvs-sprof-name">${name}</div><div class="tvs-sprof-pos">${pos}</div>
            ${desc ? `<div class="tvs-sprof-sec desc" data-t="desc">Kuruoja pradinį ugdymą, neformalųjį švietimą ir mokinių pažangos stebėseną. Koordinuoja mokytojų metodinių grupių veiklą.</div>` : ''}
            <div class="tvs-sprof-sec tvs-sprof-muted">m.peckauskaite@mokykla.lt · tel. 8 600 00007</div></div></div>`;
const CSS = `
  .tvs-split-bot .tvs-cke-body { min-height: 100px; }
  .tvs-split-top .tvs-sweb-b { padding: 14px 40px; }
  .syn { font-family: 'SF Mono', Menlo, monospace; font-size: 17px; padding: 2px 4px; border-radius: 3px; }
  .sp { transform: scale(.8); transform-origin: 0 0; width: 125%; }
  .profs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 8px; }
  .pc { display: grid; grid-template-columns: 70px 1fr; gap: 12px; align-items: center; border: 1px solid #e6e6e6; padding: 10px; border-radius: 4px; font-size: 16px; }
  .pc i { height: 80px; border-radius: 3px; background: linear-gradient(160deg, #e3e8f3, #cfd8ea); } .pc b { display: block; font-size: 17px; } .pc span { color: #777; font-size: 14px; }
  .q { border-radius: 3px; }`;
E.build(__dirname, {
  '01-profilio-sintakse-sarase': {
    note: 'Kadras 1 — „Profilio sintaksė sąraše“ (ep_665_01_1): stulpelis „Sintaksė“ → {{ staff_single(6) }} pažymima ir nukopijuojama',
    origin: '50% 35%',
    screens: [list],
    css: `.st-table .tvs-th, .st-table .tvs-row { grid-template-columns: 30px 90px 1fr 300px 1fr; } .st-table .tvs-thumb { width: 54px; height: 54px; }
  .syn { font-family: 'SF Mono', Menlo, monospace; font-size: 17px; padding: 2px 4px; border-radius: 3px; } .toast { left: 900px; top: 190px; }`,
    steps: [
      { t: 'b1', spot: 'hsyn', pad: 8 }, { t: 'b2', spot: 'rowk', pad: 4 }, { t: 'b2+0.3', cur: 'synk', ax: 0 },
      { t: 'b3', spot: 'synk', pad: 8 }, { t: 'b3', cur: 'synk', ax: 1, dur: 0.6 }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.toast', rise: 8 },
    ],
    anim: (T) => [['[data-t="synk"]', `pazymeti 0.6s linear ${T('b3')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { background: linear-gradient(90deg, #b3d4fc 0 0%, transparent 0); } to { background: linear-gradient(90deg, #b3d4fc 0 100%, transparent 0); } }',
  },
  '01-kategorijos-sintakse': {
    note: 'Kadras 2 — „Kategorijos sintaksė“ (ep_665_01_2): „Kategorijos“ → stulpelis „Sintaksė“ su {{ staff(\'slug\') }}',
    origin: '50% 35%',
    screens: [catsList('scr1', 0), catsList('scr2', 1)],
    css: `.st-table .tvs-th, .st-table .tvs-row { grid-template-columns: 30px 90px 1fr 300px 1fr; } .st-table .tvs-thumb { width: 54px; height: 54px; }
  .ct-table .tvs-th, .ct-table .tvs-row { grid-template-columns: 30px 1fr 1fr; } .syn { font-family: 'SF Mono', Menlo, monospace; font-size: 17px; }`,
    steps: [
      { t: 'b1', spot: 'subcat', pad: 10 }, { t: 'b1', cur: 'subcat' }, { t: 'g1', click: true }, { t: 'g1+0.1', scr: 2, dur: 0.2 },
      { t: 'b2', spot: 'hsyn2', pad: 8 }, { t: 'b2+0.3', spot: 'ctab', pad: 4 },
      { t: 'b3', spot: 'newcat', pad: 4 }, { t: 'b3', show: '.newcat', rise: 10 }, { t: 'b3+0.4', flash: '.newcat' }, { t: 'b3+0.2', cur: [1400, 820], dur: 0.8 },
    ],
  },
  '02-profilis-be-aprasymo': {
    note: 'Kadras 3 — „Profilis be aprašymo“ (ep_665_02_1): {\'show_description\': false} → aprašymas dingsta',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Administracija', siteBody: `<div class="pw" data-t="pw">${prof('Marija Pečkauskaitė', 'Direktoriaus pavaduotoja ugdymui', true)}</div>`,
      editor: E.cke(`<p>Administracija</p><p data-t="code">{{ staff_single(7${E.typed('opt', ", {'show_description': false}")}) }}</p>`), foot: upd })],
    css: CSS + ` .tvs-split-top { overflow: hidden; } .desc { overflow: hidden; }`,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'opt', dt: 0.05 },
      { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd' }, { t: 'g2', click: true },
      { t: 'b3-0.2', spot: 'stop', pad: 4 }, { t: 'b3', hide: '.desc', dur: 0.5 }, { t: 'b3+0.2', cur: [1500, 400], dur: 0.8 }, { t: 'g3', flash: '.sp' },
    ],
    anim: (T) => [['.desc', `suskleisti 0.6s cubic-bezier(.45,0,.2,1) ${T('b3')}s both`]],
    keyframes: () => '  @keyframes suskleisti { from { max-height: 120px; margin-top: 12px; } to { max-height: 0; margin-top: 0; padding: 0; } }',
  },
  '03-kategorijos-sarasas-pagal-sluga': {
    note: 'Kadras 4 — „Kategorijos sąrašas pagal SLUG“ (ep_665_03_1): {{ staff(\'administracija\') }} → visi kategorijos profiliai',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Administracija', siteBody: `<div class="profs" data-t="profs">${[['Vincas Kudirka', 'Direktorius'], ['Marija Pečkauskaitė', 'Pavaduotoja ugdymui'], ['Jonas Basanavičius', 'Pavaduotojas ūkiui']].map(([n, p]) => `<div class="pc"><i></i><div><b>${n}</b><span>${p}</span></div></div>`).join('')}</div>`,
      editor: E.cke(`<p>Administracija</p><p data-t="code">{{ staff(${E.typed('sl', "'administracija'", { caret: false })}) }}</p>`), foot: upd })],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'sl', dt: 0.08 },
      { t: 'b2', spot: 'code', pad: 8 },
      { t: 'b3', show: '.profs', rise: 14 }, { t: 'b3', spot: 'profs', pad: 8 }, { t: 'b3+0.2', cur: [1500, 400], dur: 0.8 },
      { t: 'b4', spot: 'code', pad: 8 }, { t: 'g2', flash: '.profs' },
    ],
  },
});
