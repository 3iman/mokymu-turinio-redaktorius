#!/usr/bin/env node
// „Teisingas turinio publikavimas: iš PDF į JPG, o tada į straipsnį“ — epizodai (epizodai.js).
// Konvertavimo įrankis piešiamas schematiškai, be prekės ženklo (KATALOGAS: „iLovePDF puslapis (schema)“).
const E = require('../../epizodai');
const URL = '<span class="is-dim">https://</span>pdf-i-jpg.demo';
const br = (cls, inner, t = 'omni') => E.scr(`${cls} br`, `        ${E.chrome(URL, t)}\n        ${inner}`);
const BR = `
  .br { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #dfe3ea; box-shadow: 0 24px 60px rgba(30,40,70,.12); }
  .br .tvs-chrome { position: relative; z-index: 2; }`;
const thumb = '<div class="tvs-xthumb"><i></i><i></i><i></i><i></i><i></i><i></i></div>';
const filePick = `<div class="tvs-os pick" data-t="pick"><div class="tvs-os-h">Atidaryti</div><div class="tvs-os-b"><div class="tvs-fi"><b></b>Dokumentai</div><div class="tvs-fi is-sel" data-t="pdf"><b class="is-img" style="background:linear-gradient(150deg,#f3c9c7,#e5322d)"></b>Mokyklos veiklos planas.pdf</div></div>
  <div style="display:flex;justify-content:flex-end;gap:10px;padding:0 22px 18px"><span class="tvs-osbtn" data-t="open">Atidaryti</span><span class="tvs-osbtn is-sec">Atšaukti</span></div></div>`;
const save = `<div class="tvs-os savew" data-t="savew"><div class="tvs-os-h">Išsaugoti kaip</div><div class="tvs-os-b" style="flex-direction:column;gap:12px"><div>Failo vardas: <b>veiklos-planas-jpg.zip</b></div><div style="display:flex;justify-content:flex-end;gap:10px"><span class="tvs-osbtn">Išsaugoti</span></div></div></div>`;

E.build(__dirname, {
  '01-ikeliate-pdf': {
    note: 'Kadras 1 — „Įkeliate PDF“ (ep_692_01_1): įrankis „PDF to JPG“ → „Select PDF file“ → failų langas → miniatiūra',
    origin: '50% 45%',
    screens: [br('scr1', `<div class="tvs-xsite"><div class="tvs-xsite-h">PDF to JPG</div><div class="tvs-xsite-p">Kiekvieną PDF puslapį paverčia JPG paveikslėliu.</div><span class="tvs-xbtn" data-t="sel">Select PDF file</span></div>${filePick}`),
              br('scr2', `<div class="tvs-xsite"><div class="tvs-xsite-h">PDF to JPG</div><div class="th" data-t="th">${thumb}<div class="tvs-xsite-p" style="text-align:center;margin-top:10px">Mokyklos veiklos planas.pdf</div></div></div>`, 'omni2')],
    css: BR + `.pick { left: 520px; top: 260px; width: 640px; }`,
    steps: [
      { t: 'b1', spot: 'omni', pad: 6 }, { t: 'b2', spot: 'sel', pad: 10 }, { t: 'b2', cur: 'sel' }, { t: 'g1', click: true },
      { t: 'g1+0.2', show: '.pick', rise: 20 }, { t: 'g1+0.2', spot: null },
      { t: 'b3', spot: 'pdf', pad: 6 }, { t: 'b3', cur: 'pdf' }, { t: 'b3+0.6', click: true }, { t: 'b3+0.8', cur: 'open', dur: 0.4 }, { t: 'g2-0.2', click: true },
      { t: 'g2', scr: 2 }, { t: 'g2', spot: 'th', pad: 12 }, { t: 'g2+0.2', cur: [1380, 820], dur: 0.8 }, { t: 'g2+0.3', flash: '.th .tvs-xthumb' },
    ],
  },
  '01-atsisiunciate-jpg': {
    note: 'Kadras 2 — „Atsisiunčiate JPG“ (ep_692_01_2): „PAGE TO JPG“ → „Convert to JPG“ → „Download JPG images“ → ZIP',
    origin: '70% 45%',
    screens: [br('scr1', `<div class="tvs-xsite" style="right:420px">${thumb}</div><div class="tvs-xside"><div class="tvs-xopt is-on">PAGE TO JPG</div><div class="tvs-xopt">EXTRACT IMAGES</div><span class="tvs-xbtn" data-t="conv" style="text-align:center;margin-top:auto">Convert to JPG</span></div>`),
              br('scr2', `<div class="tvs-xsite"><div class="tvs-xsite-h">PDF puslapiai paversti JPG</div><span class="tvs-xbtn" data-t="dl">Download JPG images</span></div>${save}`, 'omni2')],
    css: BR + `.savew { left: 560px; top: 420px; width: 560px; }`,
    steps: [
      { t: 'b1', spot: 'conv', pad: 10 }, { t: 'b1', cur: 'conv' }, { t: 'g1', click: true }, { t: 'g1+1.0', scr: 2 }, { t: 'g1+1.0', spot: null },
      { t: 'b2', spot: 'dl', pad: 10 }, { t: 'b2', cur: 'dl' }, { t: 'g2', click: true }, { t: 'g2+0.3', show: '.savew', rise: 20 }, { t: 'b3', spot: 'savew', pad: 8 },
      { t: 'g3', flash: '.savew' }, { t: 'b3+0.2', cur: [1380, 820], dur: 0.8 },
    ],
  },
  '02-ispakuojate-zip': {
    note: 'Kadras 3 — „Išpakuojate ZIP“ (ep_692_02_1): dešinys spustelėjimas → „Išskleisti viską…“ → aplankas → „Išskleisti“',
    origin: '40% 40%',
    screens: [E.scr('scr1', `<div class="tvs-os folder" data-t="folder"><div class="tvs-os-h">Atsisiuntimai</div><div class="tvs-os-b"><div class="tvs-fi"><b></b>Dokumentai</div><div class="tvs-fi is-sel" data-t="zip"><b class="is-zip"></b>veiklos-planas-jpg.zip</div></div></div>
        <div class="tvs-ctx ctx" data-t="ctx"><div>Atidaryti</div><div class="is-hl" data-t="ext">Išskleisti viską…</div><hr><div>Kopijuoti</div><div>Pervadinti</div></div>
        <div class="tvs-os dlg" data-t="dlg"><div class="tvs-os-h">Išskleisti suglaudintus (ZIP) aplankus</div><div class="tvs-os-b" style="flex-direction:column;gap:12px"><div>Failai bus išskleisti į šį aplanką:</div><div class="tvs-input is-value" style="height:44px">C:\\Demo mokykla\\Naujienos</div><div style="display:flex;justify-content:flex-end;gap:10px"><span class="tvs-osbtn" data-t="go">Išskleisti</span><span class="tvs-osbtn is-sec">Atšaukti</span></div></div></div>
        <div class="tvs-os res" data-t="res"><div class="tvs-os-h">Demo mokykla › Naujienos</div><div class="tvs-os-b"><div class="tvs-fi"><b class="is-img"></b>planas-1.jpg</div><div class="tvs-fi"><b class="is-img"></b>planas-2.jpg</div><div class="tvs-fi"><b class="is-img"></b>planas-3.jpg</div></div></div>`)],
    css: `.folder { left: 140px; top: 120px; width: 900px; height: 520px; } .ctx { left: 520px; top: 300px; } .dlg { left: 560px; top: 330px; width: 720px; } .res { left: 760px; top: 220px; width: 760px; height: 300px; }`,
    steps: [
      { t: 'b1', spot: 'zip', pad: 6 }, { t: 'b1', cur: 'zip' }, { t: 'b1+0.6', click: true }, { t: 'b1+0.7', show: '.ctx', dur: 0.15 },
      { t: 'b1+0.9', cur: 'ext', dur: 0.4 }, { t: 'b1+0.9', spot: 'ctx', pad: 4 }, { t: 'g1', click: true }, { t: 'g1+0.1', hide: '.ctx', dur: 0.1 }, { t: 'g1+0.2', show: '.dlg', rise: 16 },
      { t: 'b2', spot: 'dlg', pad: 6 }, { t: 'b2+0.3', cur: 'go' }, { t: 'g2', click: true }, { t: 'g2+0.1', hide: '.dlg', dur: 0.2 }, { t: 'g2+0.3', show: '.res', rise: 20 }, { t: 'g2+0.3', spot: 'res', pad: 8 },
      { t: 'g3', flash: '.res' }, { t: 'g2+0.4', cur: [1400, 820], dur: 0.8 },
    ],
  },
  '04-rezultatas-svetaineje': {
    note: 'Kadras 4 — „Rezultatas svetainėje“ (ep_692_04_3): naujiena su PDF puslapiais kaip paveikslėliais, apačioje nuoroda',
    origin: '50% 50%',
    screens: [E.site('scr1', `<div class="clip"><div class="scroll"><div class="tvs-sweb-p">Skelbiame mokslo metų pradžios tvarkaraštį.</div>
          <div class="pages">${[1, 2, 3].map(() => `<div class="pg">${thumb}</div>`).join('')}</div>
          <div class="pdfl" data-t="pdfl">Parsisiųskite pdf formatu</div></div></div>`, { title: 'Mokslo metų pradžios tvarkaraštis', on: 3 })],
    css: `.clip { height: 560px; overflow: hidden; } .pages { display: flex; flex-direction: column; align-items: center; gap: 18px; margin-top: 16px; }
  .pg .tvs-xthumb { width: 520px; height: 300px; } .pdfl { display: inline-block; margin: 24px 0; font-size: 21px; color: var(--tvs-site-link); text-decoration: underline; }`,
    steps: [
      { t: 'b3', spot: { ref: 'pdfl', dy: -560 }, pad: 10 }, { t: 'b3+0.5', flash: '.pdfl' },
    ],
    anim: (T) => [['.scroll', `slinkti 6.5s cubic-bezier(.45,0,.2,1) ${T('b1+0.6')}s both`]],
    keyframes: () => '  @keyframes slinkti { from { transform: none; } to { transform: translateY(-560px); } }',
  },
});
