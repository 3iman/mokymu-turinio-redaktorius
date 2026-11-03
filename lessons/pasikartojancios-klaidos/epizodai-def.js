#!/usr/bin/env node
// „Pasikartojančios klaidos“ — TVS epizodas (epizodai.js): nuoroda naujame lange.
const E = require('../../epizodai');
const S = E.SVG;
const dlg = E.ckd('Link', `<div>Target</div><div class="tvs-ckd-in is-select" data-t="tg"><span class="t-n">&lt;not set&gt;</span><span class="t-b">New Window (_blank)</span></div>`, { cls: 'dlg', tabs: ['Link Info', 'Target', 'Advanced'] });
E.build(__dirname, {
  '10-nuoroda-naujame-lange': {
    note: 'K15 — „Nuoroda naujame lange“ (ep_699_10_1)', origin: '35% 32%',
    css: `.tvs-cke-body { min-height: 260px; } .dlg { left: 560px; top: 260px; width: 680px; } .tg { position: relative; } .t-b { position: absolute; left: 10px; } [data-t="tg"] { position: relative; } .t-b { opacity: 0; }
  .ln { color: #1155cc; text-decoration: underline; padding: 0 2px; } .br2 { position: absolute; inset: 0; background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #dfe3ea; } .br2 .pg { padding: 40px; font: 20px var(--tvs-site-font); color: #444; }`,
    screens: [E.win({ cls: 'scr1', crumb: 'Puslapiai  /  Mokiniams  /  Redaguoti', sideOn: 1, body: `<div>${E.tabs(['Turinys', 'Nustatymai', 'SEO'], 0)}<div class="tvs-form" style="padding:10px 0">${E.cke('<h3>Mokiniams</h3><p>Pažymius ir namų darbus rasite <span class="ln" data-t="ln">Elektroniniame dienyne</span>.</p>', { marks: { link: 'blink' } })}</div></div>
          <div class="tvs-form-foot">${E.btn('Išsaugoti ir išeiti', { cls: 'is-tiny', icon: S.save, t: 'save' })}</div>`, extra: '\n' + dlg }),
      E.scr('scr2 br2', `<div class="tvs-tabsbar"><span>Mokiniams – Demo mokykla</span><span class="is-on nt">Elektroninis dienynas</span></div>${E.chrome('<span class="is-dim">https://</span>dienynas.demo.lt/', 'omni')}<div class="pg">Elektroninio dienyno prisijungimas</div>`)],
    steps: [{ t: 'b1', spot: 'ln', pad: 6 }, { t: 'b1+0.2', cur: 'ln', ax: 1 }, { t: 'b1+0.4', cur: 'ln', ax: 0, dur: 0.6 }, { t: 'g1-0.3', zoom: 1.4 }, { t: 'g1-0.2', cur: 'blink', dur: 0.4 }, { t: 'g1', spot: 'blink', pad: 6 },
      { t: 'g1+0.1', zoom: 1 }, { t: 'g1+0.3', spot: null }, { t: 'g1+0.3', show: '.dlg', dur: 0.2 },
      { t: 'b2', spot: 'tg', pad: 8 }, { t: 'b2', cur: 'tg', ax: 0.9 }, { t: 'g2', click: true }, { t: 'g2+0.05', hide: '.t-n', dur: 0.1 }, { t: 'g2+0.05', show: '.t-b', dur: 0.1 },
      { t: 'g2+0.5', cur: 'ok', dur: 0.4 }, { t: 'g2+1.0', click: true }, { t: 'g2+1.1', hide: '.dlg', dur: 0.2 }, { t: 'g2+1.2', spot: 'save', pad: 10 }, { t: 'g2+1.4', cur: 'save', dur: 0.4 }, { t: 'g2+1.9', click: true },
      { t: 'b3', scr: 2, slide: 'right' }, { t: 'b3+0.2', spot: 'omni', pad: 6 }, { t: 'g3', flash: '.nt' }, { t: 'b3+0.2', cur: [1300, 700], dur: 0.8 }],
    anim: (T) => [['.ln', `pazymeti 0.6s linear ${T('b1+0.4')}s both`]],
    keyframes: () => '  @keyframes pazymeti { from { background: linear-gradient(90deg, transparent 0 100%, #b3d4fc 0); } to { background: linear-gradient(90deg, #b3d4fc 0 100%, transparent 0); } }',
  },
});
