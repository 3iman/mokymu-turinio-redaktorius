#!/usr/bin/env node
// „Lentelių redagavimas WYSIWYG redaktoriuje“ (platformos epizodai) — epizodai.js. YouTube pamoka — lessons/lenteliu-redagavimas-wysiwyg-redaktoriuje-youtube.
const E = require('../../epizodai');
const S = E.SVG;
const ROWS = [['1', '8.00–8.45'], ['2', '8.55–9.40'], ['3', '9.55–10.40']];
const table = (o = {}) => `<table class="tvs-cktab tb" data-t="tb">${o.head ? '<tr><th>Pamoka</th><th>Laikas</th></tr>' : `<tr class="r0"><td>Pamoka</td><td>Laikas</td></tr>`}${ROWS.map(([a, b], i) => `<tr><td${i === 0 ? ' data-t="c1"' : ''}>${a}</td><td>${b}</td></tr>`).join('')}${o.newRow ? '<tr class="nr"><td>&nbsp;</td><td>&nbsp;</td></tr>' : ''}</table>`;
const ed = (cls, body, o = {}) => E.win({ cls, crumb: 'Puslapiai  /  Pamokų laikas  /  Redaguoti', sideOn: 1, body: `<div class="tvs-form" style="padding:10px 0">${E.cke(body, { marks: o.marks || {} })}</div><div class="tvs-form-foot">${E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' })}</div>`, extra: o.extra || '' });
const ctx = (items, cls = 'm1', t = {}) => `\n        <div class="tvs-ckm ${cls}">${items.map(x => x === '-' ? '<hr>' : `<div class="${x.endsWith('›') ? 'is-sub' : ''}"${t[x] ? ` data-t="${t[x]}"` : ''}>${x.replace(' ›', '')}</div>`).join('')}</div>`;
const CSS = `.tvs-cke-body { min-height: 300px; } .m1 { left: 520px; top: 360px; opacity: 0; } .m2 { left: 752px; top: 400px; opacity: 0; } .dlg { left: 560px; top: 220px; width: 640px; opacity: 0; }
  .sel-v { position: relative; } .sv-a, .sv-b { position: absolute; left: 10px; } .sv-b { opacity: 0; } .nr { } .wide { width: 1400px; } .kbd { position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); z-index: 40; padding: 14px 28px; border: 2px solid #333; border-radius: 8px; background: #fff; font: 700 26px var(--tvs-font); box-shadow: 0 4px 0 #333; opacity: 0; }`;
const dlg = (title, body, ok = 'ok') => '\n        ' + E.ckd(title, body, { cls: 'dlg', ok });
E.build(__dirname, {
  '02-nauja-eilute': {
    note: 'K2 — „Nauja eilutė“ (ep_1585_02_1)', origin: '35% 45%', css: CSS + ` .nr { opacity: 0; }`,
    screens: [ed('scr1', `<p>Pamokų laikas</p>${table({ head: true, newRow: true })}`, { extra: ctx(['Cell ›', 'Row ›', 'Column ›', '-', 'Delete Table', 'Table Properties'], 'm1', { 'Row ›': 'row' }) + ctx(['Insert Row Before', 'Insert Row After', 'Delete Rows'], 'm2', { 'Insert Row After': 'ira' }) })],
    zoom0: 1.3, steps: [{ t: 0.1, zoom: 1.3 }, { t: 'b1', spot: 'tb', pad: 8 }, { t: 'b1+0.2', cur: 'c1', ax: 0.5 }, { t: 'g1', click: true }, { t: 'g1+0.05', show: '.m1', dur: 0.1 }, { t: 'b2', cur: 'row', dur: 0.4 }, { t: 'b2+0.4', show: '.m2', dur: 0.1 }, { t: 'b2+0.6', cur: 'ira', dur: 0.4 },
      { t: 'g2', click: true }, { t: 'g2+0.05', hide: ['.m1', '.m2'], dur: 0.1 }, { t: 'g2+0.1', show: '.nr', dur: 0.2 }, { t: 'g3', flash: '.tb' }],
  },
  '03-pirma-eilute-antraste': {
    note: 'K3 — „Pirma eilutė — antraštė“ (ep_1585_03_1)', origin: '35% 45%', css: CSS + ` .hrow { background: #ddd; font-weight: 700; }`,
    screens: [ed('scr1', `<p>Gimnazijos taryba</p>${table()}`, { extra: ctx(['Cell ›', 'Row ›', 'Column ›', '-', 'Delete Table', 'Table Properties'], 'm1', { 'Table Properties': 'tp' }) + dlg('Table Properties', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div>Rows<div class="tvs-ckd-in">4</div></div><div>Columns<div class="tvs-ckd-in">2</div></div><div>Width<div class="tvs-ckd-in">500</div></div><div>Headers<div class="tvs-ckd-in is-select sel-v" data-t="hd"><span class="sv-a">None</span><span class="sv-b">First Row</span></div></div></div>`) })],
    zoom0: 1.3, steps: [{ t: 0.1, zoom: 1.3 }, { t: 'b1', spot: 'tb', pad: 8 }, { t: 'b1+0.2', cur: 'c1', ax: 0.5 }, { t: 'g1', click: true }, { t: 'g1+0.05', show: '.m1', dur: 0.1 }, { t: 'g1+0.2', cur: 'tp', dur: 0.5 }, { t: 'g2', click: true }, { t: 'g2+0.05', hide: '.m1', dur: 0.1 }, { t: 'g2+0.1', show: '.dlg', dur: 0.2 }, { t: 'g2+0.1', spot: null },
      { t: 'b2', spot: 'hd', pad: 8 }, { t: 'b2', cur: 'hd', ax: 0.9 }, { t: 'g3', click: true }, { t: 'g4', hide: '.sv-a', dur: 0.05 }, { t: 'g4', show: '.sv-b', dur: 0.05 },
      { t: 'b3', spot: 'ok', pad: 8 }, { t: 'b3', cur: 'ok' }, { t: 'g5', click: true }, { t: 'g5+0.05', hide: '.dlg', dur: 0.2 }, { t: 'g5+0.2', spot: 'tb', pad: 8 }, { t: 'g6', flash: '.tb' }],
    anim: (T) => [['.r0 td', `antraste 0.01s step-end ${T('g5+0.1')}s both`]],
    keyframes: () => '  @keyframes antraste { from { } to { background: #ddd; font-weight: 700; } }',
  },
  '03-cele-antraste': {
    note: 'K4 — „Celė — antraštė“ (ep_1585_03_2)', origin: '35% 45%', css: CSS,
    screens: [ed('scr1', `<p>Mokytojai ir tėvai</p>${table({ head: true })}`, { extra: ctx(['Cell ›', 'Row ›', 'Column ›', '-', 'Table Properties'], 'm1', { 'Cell ›': 'cell' }) + ctx(['Insert Cell Before', 'Delete Cells', 'Merge Cells', 'Cell Properties'], 'm2', { 'Cell Properties': 'cp' }) + dlg('Cell Properties', `<div>Cell Type</div><div class="tvs-ckd-in is-select sel-v" data-t="ct"><span class="sv-a">Data</span><span class="sv-b">Header</span></div>`) })],
    zoom0: 1.3, steps: [{ t: 0.1, zoom: 1.3 }, { t: 'b1', spot: 'tb', pad: 8 }, { t: 'b1+0.2', cur: 'c1', ax: 0.5 }, { t: 'g1', click: true }, { t: 'g1+0.05', show: '.m1', dur: 0.1 }, { t: 'b2', cur: 'cell', dur: 0.3 }, { t: 'b2+0.3', show: '.m2', dur: 0.1 }, { t: 'b2+0.5', cur: 'cp', dur: 0.4 }, { t: 'g2', click: true },
      { t: 'g2+0.05', hide: ['.m1', '.m2'], dur: 0.1 }, { t: 'g2+0.1', show: '.dlg', dur: 0.2 }, { t: 'g2+0.1', spot: null }, { t: 'b3', spot: 'ct', pad: 8 }, { t: 'b3', cur: 'ct', ax: 0.9 }, { t: 'g3', click: true }, { t: 'g4', hide: '.sv-a', dur: 0.05 }, { t: 'g4', show: '.sv-b', dur: 0.05 },
      { t: 'g5-0.3', cur: 'ok', dur: 0.3 }, { t: 'g5', click: true }, { t: 'g5+0.05', hide: '.dlg', dur: 0.2 }, { t: 'b4', spot: 'tb', pad: 8 }, { t: 'g6', flash: '.tb' }],
    anim: (T) => [['[data-t="c1"]', `antraste 0.01s step-end ${T('g5+0.1')}s both`]],
    keyframes: () => '  @keyframes antraste { from { } to { background: #ddd; font-weight: 700; } }',
  },
  '04-isvalote-formatavima': {
    note: 'K5 — „Išvalote formatavimą“ (ep_1585_04_1)', origin: '40% 40%', css: CSS + ` .dirty td { background: #fff7e0; font-family: Calibri, Arial; color: #a01; } .clean { opacity: 0; position: absolute; left: 0; top: 0; } .wrap { position: relative; }`,
    screens: [ed('scr1', `<p>Darbo užmokestis</p><div class="wrap" data-t="wrap"><div class="dirty">${table({ head: true })}</div><div class="clean">${table({ head: true }).replace(' data-t="tb"', '').replace(' data-t="c1"', '')}</div></div>`, { marks: { removeformat: 'tx' }, extra: '\n        <div class="kbd k">CTRL + A</div>' })],
    steps: [{ t: 'b1', spot: 'wrap', pad: 8 }, { t: 'b1', show: '.k', rise: 10 }, { t: 'g1', flash: '.wrap' }, { t: 'g1+0.8', hide: '.k', dur: 0.3 },
      { t: 'b2-0.3', zoom: 1.35 }, { t: 'b2', spot: 'tx', pad: 6 }, { t: 'b2', cur: 'tx', dur: 0.3 }, { t: 'g2', click: true }, { t: 'g2+0.1', hide: '.dirty', dur: 0.2 }, { t: 'g2+0.1', show: '.clean', dur: 0.2 }, { t: 'b3', zoom: 1 }, { t: 'b3', spot: 'wrap', pad: 8 }],
  },
  '05-plotis-100': {
    note: 'K6 — „Plotis 100 %“ (ep_1585_05_1)', origin: '35% 45%', css: CSS + ` .tb.wide { width: 1700px; }`,
    screens: [ed('scr1', `<p>Pamokų tvarkaraštis</p>${table({ head: true }).replace('class="tvs-cktab tb"', 'class="tvs-cktab tb wide"')}`, { extra: ctx(['Cell ›', 'Row ›', 'Column ›', '-', 'Table Properties'], 'm1', { 'Table Properties': 'tp' }) + dlg('Table Properties', `<div>Width</div><div class="tvs-ckd-in" data-t="wd"><span class="w0">1700</span>${E.typed('w', '100%', { caret: false })}</div>`) })],
    zoom0: 1.3, steps: [{ t: 0.1, zoom: 1.3 }, { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'c1', ax: 0.5 }, { t: 'g1', click: true }, { t: 'g1+0.05', show: '.m1', dur: 0.1 }, { t: 'g1+0.1', cur: 'tp', dur: 0.4 }, { t: 'g2', click: true }, { t: 'g2+0.05', hide: '.m1', dur: 0.1 }, { t: 'g2+0.1', show: '.dlg', dur: 0.2 }, { t: 'g2+0.1', spot: null },
      { t: 'b2', spot: 'wd', pad: 8 }, { t: 'b2', cur: 'wd', ax: 0.5 }, { t: 'g3-0.2', hide: '.w0', dur: 0.05 }, { t: 'g3', type: 'w', dt: 0.1 }, { t: 'g4-0.3', cur: 'ok', dur: 0.3 }, { t: 'g4', click: true }, { t: 'g4+0.05', hide: '.dlg', dur: 0.2 }, { t: 'g4+0.1', spot: 'cke', pad: 6 }, { t: 'g5', flash: '.tb' }],
    anim: (T) => [['.tb.wide', `siaurinti 0.6s cubic-bezier(.45,0,.2,1) ${T('g4+0.1')}s both`]],
    keyframes: () => '  @keyframes siaurinti { from { width: 1700px; } to { width: 100%; } }',
  },
  '05-perspejimo-sintakse': {
    note: 'K7 — „Perspėjimo sintaksė“ (ep_1585_05_3)', origin: '50% 50%', css: `.tvs-split-bot .tvs-cke-body { min-height: 110px; } .warn { background: #fff4d6; border-left: 4px solid #e39d24; padding: 10px 14px; font: 17px var(--tvs-site-font); margin-bottom: 10px; } .stab { overflow: hidden; } .stab table { width: 1800px; }`,
    screens: [E.split('scr1', { siteTitle: 'Pamokų tvarkaraštis', siteBody: `<div class="warn wn" data-t="wn">Nematote visos lentelės? Slinkite ją į šoną →</div><div class="stab">${table({ head: true }).replace(' data-t="tb"', '').replace(' data-t="c1"', '')}</div>`,
      editor: E.cke(`<p data-t="code">${E.typed('s', "{{t('table_ux_accessibility')}}")}</p><p>[lentelė]</p>`), foot: E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' }) })],
    steps: [{ t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 's', dt: 0.05 }, { t: 'b2', show: '.wn', rise: 10 }, { t: 'b2', spot: 'wn', pad: 8 }, { t: 'b2+0.2', cur: [1500, 400], dur: 0.8 }, { t: 'b3', flash: '.wn' }],
  },
});
