#!/usr/bin/env node
// „Informacija lengvai suprantama kalba“ — TVS epizodai (epizodai.js).
const E = require('../../epizodai');
const S = E.SVG;
const addB = (t) => `<div class="tvs-node-acts"><span class="tvs-btn is-tiny"${t ? ` data-t="${t}"` : ''}>${S.plus}Pridėti subpuslapį</span></div>`;
const tree = (cls, o = {}) => E.win({ cls, crumb: 'Puslapiai', sideOn: 1, sub: ['Puslapiai'], body: `<div class="tvs-tree pt">
            <div class="tvs-node"><div class="tvs-node-handle"></div>Apie mokyklą</div>
            <div class="tvs-node is-l2" data-t="nlsk"><div class="tvs-node-handle"></div>Informacija lengvai suprantama kalba${addB('addsub')}</div>
            <div class="tvs-node is-l2" style="margin-left:80px" data-t="nex"><div class="tvs-node-handle"></div>Kviečiame susipažinti su Demo mokykla</div>
            <div class="tvs-node is-l2"><div class="tvs-node-handle"></div>Informacija gestų kalba</div>
            <div class="tvs-node"><div class="tvs-node-handle"></div>Mokiniams</div></div>`, extra: o.extra || '' });
const typeModal = `\n        <div class="tvs-modal tm"><div class="tvs-modal-h"><span>Pasirinkite puslapio tipą</span><span class="tvs-x">×</span></div><div class="tvs-modal-b"><div class="tvs-opt">Default</div><div class="tvs-opt is-hover" data-t="optl">Lengvai suprantama kalba layout</div><div class="tvs-opt">Kontaktai</div></div></div>`;
const newForm = (cls, rep = '') => E.win({ cls, crumb: 'Puslapiai  /  Pridėti', sideOn: 1, sub: ['Puslapiai'], body: `<div class="tvs-form is-dense">
            <div class="tvs-field" data-t="fp"><div class="tvs-label">Pavadinimas<span class="tvs-req">*</span></div><div class="tvs-input"></div></div>
            <div class="tvs-field" data-t="fs"><div class="tvs-label">Slug<span class="tvs-req">*</span></div><div class="tvs-input"></div></div>${rep}</div>` });
const rep = `<div class="tvs-field" data-t="fl"><div class="tvs-label">Lengvai suprantama kalba</div>
              <div class="tvs-rep blk" data-t="blk"><div class="tvs-rep-bar"><span class="tvs-check"></span>Blokas 1</div><div class="tvs-rep-body">
                <div class="tvs-field"><div class="tvs-label">Bloko pavadinimas</div><div class="tvs-input"></div></div>
                <div class="tvs-field"><div class="tvs-label">Tekstas lengvai sk</div><div class="tvs-input is-area"></div></div>
                <div class="tvs-field"><div class="tvs-label">Nuotrauka lengvai sk</div><div class="btns">${E.btn('Select Image', { cls: 'is-tiny is-info' })}${E.btn('Upload', { cls: 'is-tiny' })}</div></div></div></div>
              <div class="ld">Loading...</div><div>${E.btn('Add Row', { cls: 'is-tiny', icon: S.plus, t: 'addrow' })}</div></div>`;
const ez = [['🏫', 'Demo mokykla yra mokykla vaikams nuo 7 iki 18 metų.'], ['👩‍🏫', 'Mokyklos direktorė yra Marija Pečkauskaitė.'], ['🕗', 'Pamokos prasideda 8 valandą.'], ['🍽️', 'Mokykloje yra valgykla.']];
const site = E.site('scr2', `<div class="clip"><div class="scroll">${ez.map(([i, t]) => `<div class="tvs-ez"><i>${i}</i><div>${t}</div></div>`).join('')}<div class="foot" data-t="foot"><b>Tekstas puslapio apačioje</b><br>Autoriai: Demo mokyklos bendruomenė. Iliustracijų šaltiniai: piktogramų rinkinys.</div></div></div>`, { title: 'Kviečiame susipažinti su Demo mokykla', on: 0 });
const CSS = `.pt { background: #fff; padding: 12px; } .tm { position: absolute; left: 560px; top: 250px; width: 560px; z-index: 10; } .btns { display: flex; gap: 8px; } .ld { font-size: 18px; color: var(--tvs-text-muted); margin: 8px 0; }
  .clip { height: 600px; overflow: hidden; } .foot { margin-top: 20px; padding: 16px; background: #f4f4f4; font: 18px/1.5 var(--tvs-site-font); color: #333; }`;
E.build(__dirname, {
  '06-naujas-subpuslapis': {
    note: 'K6 — „Naujas subpuslapis“ (ep_1621_06_1)', origin: '40% 30%', css: CSS,
    screens: [tree('scr1', { extra: typeModal }), newForm('scr2')],
    steps: [{ t: 'b1', spot: 'nlsk', pad: 6 }, { t: 'b1', zoom: 1.25 }, { t: 'b1+0.2', cur: 'addsub' }, { t: 'g1', click: true }, { t: 'g1+0.1', zoom: 1 }, { t: 'g1+0.2', show: '.tm', rise: 14 }, { t: 'g1+0.2', spot: null },
      { t: 'b2', cur: 'optl', dur: 0.5 }, { t: 'g2', click: true }, { t: 'g2+0.2', scr: 2, slide: 'right' }, { t: 'b3', spot: ['fp', 'fs'], pad: 8 }, { t: 'b3', cur: [1400, 820], dur: 0.8 }],
    css2: '',
  },
  '06-lengvos-kalbos-blokas': {
    note: 'K7 — „Lengvos kalbos blokas“ (ep_1621_06_2)', origin: '40% 40%', css: CSS,
    screens: [newForm('scr1', rep)],
    steps: [{ t: 'b1', spot: 'fl', pad: 6 }, { t: 'b2', spot: 'addrow', pad: 8 }, { t: 'b2', cur: 'addrow' }, { t: 'g1', click: true }, { t: 'g1+0.1', show: '.ld', dur: 0.1 }, { t: 'g1+0.8', hide: '.ld', dur: 0.1 },
      { t: 'b3', show: '.blk', rise: 14 }, { t: 'b3', spot: 'blk', pad: 6 }, { t: 'g2', flash: '.blk' }],
  },
  '06-esamas-pavyzdys': {
    note: 'K8 — „Esamas pavyzdys“ (ep_1621_06_3)', origin: '40% 30%', css: CSS,
    screens: [tree('scr1'), site],
    steps: [{ t: 'b1', spot: 'nex', pad: 6 }, { t: 'b1+0.2', cur: 'nex', ax: 0.4 }, { t: 'g1', click: true }, { t: 'g1+0.2', scr: 2, slide: 'right' }, { t: 'g1+0.2', spot: null }, { t: 'g1+0.4', cur: [1500, 820], dur: 0.8 },
      { t: 'b4+0.6', spot: { ref: 'foot', dy: -280 }, pad: 8 }],
    anim: (T) => [['.scroll', `slinkti 6s cubic-bezier(.45,0,.2,1) ${T('b2')}s both`]],
    keyframes: () => '  @keyframes slinkti { from { transform: none; } to { transform: translateY(-280px); } }',
  },
});
