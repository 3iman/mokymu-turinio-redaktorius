#!/usr/bin/env node
// „Navigacijų tipo sintaksės“ — TVS epizodai (epizodai.js): padalytas kadras + navigacijų modulio „Slug“.
const E = require('../../epizodai');
const S = E.SVG;
const upd = E.btn('Atnaujinti', { cls: 'is-tiny', icon: S.save, t: 'upd' });
const CSS = `
  .tvs-split-bot .tvs-cke-body { min-height: 100px; }
  .subs { margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; max-width: 900px; }
  .subs-i { font-size: 18px; color: var(--tvs-site-th); padding: 10px 14px; background: #f4f6f5; border-left: 4px solid var(--tvs-site-th); }
  .blocks { margin-top: 10px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .blocks .tvs-scard-img { height: 90px; } .blocks .tvs-scard-b { padding: 10px 12px; } .blocks .tvs-scard-t { font-size: 17px; }
  .more { font-size: 15px; color: var(--tvs-site-link); margin-top: 6px; }
  .navl { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; font-size: 18px; }
  .navl span { color: var(--tvs-site-link); }
  .omni-ov { position: absolute; left: 0; right: 0; top: 0; z-index: 4; box-shadow: 0 6px 20px rgba(0,0,0,.12); }
  .numhl { border-radius: 3px; }`;
const ed = (code) => E.cke(`<p>Mokyklos administracija ir kontaktai.</p><p data-t="code">${code}</p>`);
const SUBS = ['Administracija', 'Mokytojai', 'Pagalbos specialistai', 'Kontaktai'];

// K4: navigacijų modulis → „Kiti kontaktai“ → „Slug“
const GROUPS = [['Main', 'Pagrindinė navigacija'], ['Black', 'Juodasis meniu su ikonėlėmis'], ['4 ikonos', 'Titulinio keturios ikonos'], ['Kiti kontaktai', 'Kontaktų puslapio nuorodos', 'gkk']];
const menu = E.win({ cls: 'scr1', crumb: 'Navigacijų modulis  /  Meniu', sideOn: 2, sub: ['<span data-t="smenu">Meniu</span>', 'Linkai'], body: `
          <div class="tvs-table is-menu"><div class="tvs-th"><div class="tvs-check"></div><span>Vardas</span><span>Aprašymas</span><span></span></div>
            ${GROUPS.map(([n, d, t]) => `<div class="tvs-row"${t ? ` data-t="${t}"` : ''}><div class="tvs-check"></div><div>${n}</div><div class="tvs-desc">${d}</div><div class="tvs-actions"><span class="tvs-btn is-tiny is-orange"${t ? ' data-t="edit"' : ''}>${S.edit}Redaguoti</span><span class="tvs-btn is-tiny is-info">${S.link}Linkai</span></div></div>`).join('')}
          </div>` });
const form = E.win({ cls: 'scr2', crumb: 'Navigacijų modulis  /  Meniu  /  Kiti kontaktai', sideOn: 2, sub: ['Meniu', 'Linkai'], body: `
          <div class="tvs-form">
            <div class="tvs-field"><div class="tvs-label">Vardas<span class="tvs-req">*</span></div><div class="tvs-input is-value">Kiti kontaktai</div></div>
            <div class="tvs-field" data-t="fslug"><div class="tvs-label">Slug<span class="tvs-req">*</span></div><div class="tvs-input is-value"><span class="slugv" data-t="slugv">kiti_kontaktai</span></div></div>
            <div class="tvs-field"><div class="tvs-label">Aprašymas</div><div class="tvs-input is-value">Kontaktų puslapio nuorodos</div></div>
          </div>`, extra: '\n        <div class="tvs-toast toast">Nukopijuota</div>' });

E.build(__dirname, {
  '01-subpuslapiu-navigacija': {
    note: 'Kadras 1 — „Subpuslapių navigacija“ (ep_666_01_1): {{structure(6)}}, numeris iš adreso juostos, „Atnaujinti“',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Struktūra ir kontaktai', siteBody: `<div class="tvs-sweb-p">Mokyklos administracija ir kontaktai.</div><div class="subs" data-t="subs">${SUBS.map(x => `<div class="subs-i">› ${x}</div>`).join('')}</div>
        <div class="omni-ov">${E.chrome('<span class="is-dim">https://demomokykla.lt/admin/pages/edit/</span><span class="is-mark" data-t="pid">6</span>', 'omni')}</div>`,
      editor: ed(`{{structure(<span class="numhl">${E.typed('n', '6', { caret: false })}</span>)}}`.replace('{{structure(', E.typed('syn', '{{structure(', { caret: false }))), foot: upd })],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'syn', dt: 0.06 },
      { t: 'b2', spot: 'code', pad: 8 }, { t: 'b2+1.4', show: '.omni-ov', rise: -10 }, { t: 'b2+1.6', spot: 'pid', pad: 8 },
      { t: 'b3+0.6', hide: '.omni-ov' }, { t: 'b3+0.8', type: 'n', dt: 0.1 }, { t: 'b3+0.8', spot: 'code', pad: 8 },
      { t: 'g2-0.6', spot: 'upd', pad: 10 }, { t: 'g2-0.7', cur: 'upd' }, { t: 'g2', click: true },
      { t: 'b4', show: '.subs', rise: 14 }, { t: 'b4', spot: 'subs', pad: 10 }, { t: 'b4+0.2', cur: [1500, 400], dur: 0.8 }, { t: 'g3', flash: '.subs' },
    ],
  },
  '02-subpuslapiai-blokeliais': {
    note: 'Kadras 2 — „Subpuslapiai blokeliais“ (ep_666_02_1): {{structure_blocks(18)}} — sąrašas virsta kortelėmis',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Apie būrelius', siteBody: `<div class="tvs-sweb-p">Būreliai ir užsiėmimai po pamokų.</div>
        <div class="subs list" data-t="subs">${['Robotika', 'Choras', 'Krepšinis', 'Dailė'].map(x => `<div class="subs-i">› ${x}</div>`).join('')}</div>
        <div class="blocks" data-t="blocks">${['Robotika', 'Choras', 'Krepšinis', 'Dailė'].map(x => `<div class="tvs-scard"><div class="tvs-scard-img"></div><div class="tvs-scard-b"><div class="tvs-scard-t">${x}</div><div class="more">Daugiau ›</div></div></div>`).join('')}</div>`,
      editor: E.cke(`<p>Būreliai ir užsiėmimai po pamokų.</p><p data-t="code"><span class="old">{{structure(18)}}</span><span class="new">${E.typed('syn', '{{structure_blocks(18)}}')}</span></p>`), foot: upd })],
    css: CSS + `
  .blocks { position: absolute; left: 40px; right: 40px; top: 120px; }
  .old { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; vertical-align: top; }`,
    steps: [
      { t: 'b1', spot: 'subs', pad: 10 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 },
      { t: 'b2', spot: 'cke', pad: 6 }, { t: 'g1', type: 'syn', dt: 0.06 },
      { t: 'b3', spot: 'code', pad: 8 },
      { t: 'b4', hide: '.list', dur: 0.3 }, { t: 'b4+0.2', show: '.blocks', rise: 16 }, { t: 'b4+0.2', spot: 'blocks', pad: 10 }, { t: 'b4+0.3', cur: [1500, 400], dur: 0.8 }, { t: 'g2', flash: '.blocks' },
    ],
    anim: (T) => [['.old', `istrinti 0.35s steps(8, end) ${T('g1-0.45')}s both`]],
    keyframes: () => '  @keyframes istrinti { from { max-width: 20em; } to { max-width: 0; } }',
  },
  '03-navigacija-pagal-sluga': {
    note: 'Kadras 3 — „Navigacija pagal SLUG“ (ep_666_03_1): {{nav(\'kiti_kontaktai\')}} → „Atnaujinti“ → grupės nuorodos puslapyje',
    origin: '50% 50%',
    screens: [E.split('scr1', { siteTitle: 'Kontaktai', siteBody: `<div class="tvs-sweb-p">Kiti kontaktai</div><div class="navl" data-t="navl"><span>Raštinė</span><span>Buhalterija</span><span>Visuomenės sveikatos specialistė</span><span>Psichologė</span></div>`,
      editor: ed(E.typed('syn', "{{nav('kiti_kontaktai')}}")), foot: upd })],
    css: CSS,
    steps: [
      { t: 'b1', spot: 'cke', pad: 6 }, { t: 'b1+0.2', cur: 'code', ax: 0.02, ay: 1.8 }, { t: 'g1', type: 'syn', dt: 0.06 },
      { t: 'b2', spot: 'upd', pad: 10 }, { t: 'b2', cur: 'upd' }, { t: 'g2', click: true },
      { t: 'b3', show: '.navl', rise: 12 }, { t: 'b3', spot: 'navl', pad: 10 }, { t: 'b3+0.2', cur: [1500, 400], dur: 0.8 },
      { t: 'b4', spot: 'stop', pad: 4 }, { t: 'g3', flash: '.navl' },
    ],
  },
  '03-navigacijos-slugas': {
    note: 'Kadras 4 — „Navigacijos SLUG“ (ep_666_03_2): Meniu → „Kiti kontaktai“ „Redaguoti“ → laukas „Slug“ pažymimas ir nukopijuojamas',
    origin: '40% 40%',
    screens: [menu, form],
    css: `
  .slugv { padding: 0 2px; }
  .toast { left: 760px; top: 250px; }`,
    steps: [
      { t: 'b1', spot: 'smenu', pad: 10 }, { t: 'b1+0.2', cur: 'smenu' }, { t: 'g1', click: true },
      { t: 'b2', spot: 'gkk', pad: 4 }, { t: 'b2+0.2', cur: 'edit' }, { t: 'g2', click: true }, { t: 'g2+0.1', scr: 2, slide: 'right' }, { t: 'g2+0.2', spot: null },
      { t: 'b3', spot: 'fslug', pad: 6 }, { t: 'b3+0.2', cur: 'slugv', ax: 0 }, { t: 'g3', click: true }, { t: 'g3', cur: 'slugv', ax: 1, dur: 0.6 },
      { t: 'b4', show: '.toast', rise: 8 }, { t: 'b4', flash: '[data-t="fslug"] .tvs-input' },
    ],
    anim: (T) => [['.slugv', `pazymeti 0.6s linear ${T('g3')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { background: linear-gradient(90deg, #b3d4fc 0 0%, transparent 0); } to { background: linear-gradient(90deg, #b3d4fc 0 100%, transparent 0); } }',
  },
});
