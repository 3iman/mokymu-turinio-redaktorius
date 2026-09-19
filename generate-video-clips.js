#!/usr/bin/env node

/**
 * Video Clip Generator
 *
 * Takes existing HTML illustrations and records animated video clips
 * by injecting CSS animations and capturing via Puppeteer screencast.
 *
 * This is SEPARATE from generate.js — does not modify the PNG pipeline.
 *
 * Animation principles applied (see ANIMATION_PRINCIPLES.md):
 *   - Gradual reveal with logical sequence
 *   - Staging: card/watermark visible from start, only content animates
 *   - Spring easing: cubic-bezier(0.16, 1, 0.3, 1)
 *   - Mass/weight: heavy elements (title 0.6s) → light elements (steps 0.35s)
 *   - Arcs: subtle rotate(0.5deg→0) for organic movement
 *   - Pacing: breathing pauses (0.5-1s) between logical blocks
 *   - Sequential annotation: steps appear one-by-one, 0.2s gaps
 *   - Secondary action: icon pulse on appear
 *   - Max 2-3 elements moving at once (cognitive load)
 *
 * Usage:
 *   node generate-video-clips.js --lesson google-sheets-integracija --lang lt
 *   node generate-video-clips.js --lesson google-sheets-integracija --lang lt --dark
 *
 * Output:
 *   lessons/<lesson>/output/<lang>/clips/00-kodel-tai-naudinga.mp4
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LESSONS_DIR = path.join(__dirname, 'lessons');

// ---- CLI args ----
const args = process.argv.slice(2);
function getArg(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : null;
}
const lessonSlug = getArg('lesson');
const lang = getArg('lang') || 'lt';
const isDark = args.includes('--dark');
const isAllLangs = args.includes('--all-langs');

if (!lessonSlug) {
  console.error('Usage: node generate-video-clips.js --lesson <slug> --lang <lang> [--dark] [--all-langs]');
  process.exit(1);
}

// ---- Common animation keyframes & variables ----
const COMMON_CSS = `
  /*
   * Animation layer — Cleverphant illustrations
   * Žr. ANIMATION_PRINCIPLES.md
   */
  :root {
    --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-soft: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Heavy element: title, large containers (0.6s) — arc with subtle rotate */
  @keyframes fadeUpHeavy {
    from {
      opacity: 0;
      transform: translateY(28px) rotate(0.4deg) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotate(0) scale(1);
    }
  }

  /* Medium element: columns, blocks (0.5s) */
  @keyframes fadeUpMedium {
    from {
      opacity: 0;
      transform: translateY(20px) rotate(0.3deg) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotate(0) scale(1);
    }
  }

  /* Light element: steps, details (0.35s) — quick, nimble */
  @keyframes fadeUpLight {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.99);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Fade only — for dividers, arrows, connectors */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Secondary action — icon pulse after appearing */
  @keyframes iconPulse {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  /* Attention pulse — draws eye to a clickable element */
  @keyframes attentionPulse {
    0%   { background: rgba(59,130,246,0); box-shadow: 0 0 0 0 rgba(59,130,246,0); }
    30%  { background: rgba(59,130,246,0.12); box-shadow: 0 0 0 6px rgba(59,130,246,0.15); }
    70%  { background: rgba(59,130,246,0.12); box-shadow: 0 0 0 6px rgba(59,130,246,0.15); }
    100% { background: rgba(59,130,246,0); box-shadow: 0 0 0 0 rgba(59,130,246,0); }
  }



  /* Kryptingi atsiradimai — kryptis seka turinio logiką, ne įprotį */
  @keyframes slinktisIsKaires {
    from { opacity: 0; transform: translateX(-30px) scale(0.985); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes slinktisIsDesines {
    from { opacity: 0; transform: translateX(30px) scale(0.985); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  /* Augimas — kai elementas yra atsakymas, ne dar vienas punktas */
  @keyframes issiskleidzia {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  /* Rodyklė nubrėžiama, o ne atsiranda */
  @keyframes rodyklePiesiama {
    from { opacity: 0; clip-path: inset(0 100% 0 0); }
    to   { opacity: 1; clip-path: inset(0 0 0 0); }
  }

  /* Žiedas ryškėja — akcentas, ne atsiradimas (ANIMATION_PRINCIPLES §11) */
  @keyframes ziedasRyskeja {
    from { border-color: transparent; }
    to   { border-color: #dc2626; }
  }
  @keyframes ziedasZalias {
    from { border-color: transparent; }
    to   { border-color: #16a34a; }
  }


  /* Lėtas kortelės dreifas — kadras kvėpuoja, o ne sustingsta.
     Trukmė paimama iš --klipo-trukme, tad dreifas tęsiasi visą klipą. */
  @keyframes kortelesDreifas {
    from { transform: scale(1) translateY(0); }
    to   { transform: scale(1.018) translateY(-6px); }
  }

  /* ---- STAGING: scene visible from start ---- */
  .card {
    opacity: 1 !important;
    animation: kortelesDreifas var(--klipo-trukme, 6s) linear 0s forwards !important;
  }
  .card::before {
    opacity: 0.37 !important; /* watermark always visible */
  }
`;

// ---- Per-template animation sequences ----
// Each template gets its own CSS based on its HTML structure.
// Timing follows ANIMATION_PRINCIPLES.md sequence.

const TEMPLATE_ANIMATIONS = {
  // >>> DOMENAS (generuoja lessons/domeno-nuosavybe/build_scenes.py — ranka neredaguoti)
  '00-turtas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .dom { animation: fadeUpMedium 0.5s var(--ease-spring) 0.3s both; }
    .it0 { animation: fadeUpLight 0.4s var(--ease-spring) 2.0s both; }
    .l0 { animation: fadeUpLight 0.3s var(--ease-spring) 1.9s both; }
    .it1 { animation: fadeUpLight 0.4s var(--ease-spring) 3.3s both; }
    .l1 { animation: fadeUpLight 0.3s var(--ease-spring) 3.2s both; }
    .it2 { animation: fadeUpLight 0.4s var(--ease-spring) 4.6s both; }
    .l2 { animation: fadeUpLight 0.3s var(--ease-spring) 4.5s both; }
    .it3 { animation: fadeUpLight 0.4s var(--ease-spring) 5.9s both; }
    .l3 { animation: fadeUpLight 0.3s var(--ease-spring) 5.800000000000001s both; }
    .cz { animation: v_00_turtas_9 17s linear 0s both; }
    @keyframes v_00_turtas_9 { 0%, 52.935% { opacity: 0; } 54.412% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '01-tvarkingas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .brw { animation: fadeUpMedium 0.5s var(--ease-spring) 0.3s both; }
    .cw { animation: v_01_tvarkingas_1 18s linear 0s both; }
    @keyframes v_01_tvarkingas_1 { 0%, 23.328% { opacity: 0; } 24.722% { opacity: 1; } 100% { opacity: 1; } }
    .ok { animation: slinktisIsDesines 0.5s var(--ease-spring) 8.0s both; }
  `,
  '02-trys-atvejai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .c0 { animation: fadeUpMedium 0.5s var(--ease-spring) 0.5s both; }
    .c1 { animation: fadeUpMedium 0.5s var(--ease-spring) 3.9s both; }
    .c2 { animation: fadeUpMedium 0.5s var(--ease-spring) 7.3s both; }
    .cz { animation: v_02_trys_atvejai_3 20s linear 0s both; }
    @keyframes v_02_trys_atvejai_3 { 0%, 60.995% { opacity: 0; } 62.250% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '03-pastas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .w { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.4s both; }
    .m0 { animation: slinktisIsDesines 0.45s var(--ease-spring) 4.2s both; }
    .m1 { animation: slinktisIsDesines 0.45s var(--ease-spring) 5.800000000000001s both; }
    .m2 { animation: slinktisIsDesines 0.45s var(--ease-spring) 7.4s both; }
    .lock { animation: fadeUpMedium 0.5s var(--ease-spring) 11.0s both; }
  `,
  '04-ikurta': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .w1 { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.4s both; }
    .w2 { animation: slinktisIsDesines 0.5s var(--ease-spring) 4.6s both; }
    .z { animation: fadeUpMedium 0.5s var(--ease-spring) 9.4s both; }
  `,
  '05-kol-veikia': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .y0 { animation: fadeUpLight 0.4s var(--ease-spring) 0.4s both; }
    .d0 { animation: fadeUpLight 0.4s var(--ease-spring) 0.5s both; }
    .y1 { animation: fadeUpLight 0.4s var(--ease-spring) 1.5s both; }
    .d1 { animation: fadeUpLight 0.4s var(--ease-spring) 1.6s both; }
    .y2 { animation: fadeUpLight 0.4s var(--ease-spring) 2.6s both; }
    .d2 { animation: fadeUpLight 0.4s var(--ease-spring) 2.7s both; }
    .y3 { animation: fadeUpLight 0.4s var(--ease-spring) 3.7s both; }
    .d3 { animation: fadeUpLight 0.4s var(--ease-spring) 3.8000000000000003s both; }
    .note { animation: fadeUpMedium 0.5s var(--ease-spring) 7.4s both; }
  `,
  '06-testas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .req { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.4s both; }
    .a0 { animation: slinktisIsDesines 0.45s var(--ease-spring) 4.6s both; }
    .a1 { animation: slinktisIsDesines 0.45s var(--ease-spring) 6.6s both; }
    .a2 { animation: slinktisIsDesines 0.45s var(--ease-spring) 8.6s both; }
    .cc { animation: v_06_testas_4 19s linear 0s both; }
    @keyframes v_06_testas_4 { 0%, 61.047% { opacity: 0; } 62.368% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '07-irodymas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .li { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.4s both; }
    .ri { animation: slinktisIsDesines 0.5s var(--ease-spring) 4.2s both; }
    .ce { animation: v_07_irodymas_2 21s linear 0s both; }
    @keyframes v_07_irodymas_2 { 0%, 49.519% { opacity: 0; } 50.714% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '08-nera-istorijoje': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .a { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.4s both; }
    .b { animation: slinktisIsDesines 0.5s var(--ease-spring) 4.4s both; }
    .o0 { animation: fadeUpMedium 0.45s var(--ease-spring) 10.6s both; }
    .o1 { animation: fadeUpMedium 0.45s var(--ease-spring) 12.6s both; }
  `,
  '09-ka-daryti': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .st0 { animation: fadeUpMedium 0.5s var(--ease-spring) 0.6s both; }
    .st1 { animation: fadeUpMedium 0.5s var(--ease-spring) 4.2s both; }
    .st2 { animation: fadeUpMedium 0.5s var(--ease-spring) 7.8s both; }
    .st3 { animation: fadeUpMedium 0.5s var(--ease-spring) 11.4s both; }
    .cd { animation: v_09_ka_daryti_4 28s linear 0s both; }
    @keyframes v_09_ka_daryti_4 { 0%, 58.568% { opacity: 0; } 59.464% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '10-google': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .g1 { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.4s both; }
    .g2 { animation: slinktisIsDesines 0.5s var(--ease-spring) 5.0s both; }
    .cg { animation: v_10_google_2 18s linear 0s both; }
    @keyframes v_10_google_2 { 0%, 61.106% { opacity: 0; } 62.500% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '11-pries-starta': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .t { animation: fadeUpMedium 0.5s var(--ease-spring) 0.3s both; }
    .p0 { animation: slinktisIsKaires 0.5s var(--ease-spring) 5.0s both; }
    .p1 { animation: slinktisIsDesines 0.5s var(--ease-spring) 8.4s both; }
    .r { animation: fadeUpMedium 0.5s var(--ease-spring) 13.6s both; }
  `,
  '12-penki-klausimai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .q0 { animation: fadeUpLight 0.4s var(--ease-spring) 0.6s both; }
    .q1 { animation: fadeUpLight 0.4s var(--ease-spring) 3.2s both; }
    .q2 { animation: fadeUpLight 0.4s var(--ease-spring) 5.8s both; }
    .q3 { animation: fadeUpLight 0.4s var(--ease-spring) 8.4s both; }
    .q4 { animation: fadeUpLight 0.4s var(--ease-spring) 11.0s both; }
    .fin { animation: fadeUpMedium 0.5s var(--ease-spring) 15.0s both; }
  `,
  '13-kaip-pas-mus': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .w { animation: fadeUpMedium 0.5s var(--ease-spring) 0.4s both; }
    .c { animation: fadeUpMedium 0.5s var(--ease-spring) 5.2s both; }
  `,
  '14-disclaimeris': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .d { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
  `,
  // <<< DOMENAS
  // >>> GS-PRADZIAMOKSLIS (generuoja lessons/google-sheets-pradziamokslis/build_scenes.py — ranka neredaguoti)
  '00-kas-yra-sheets': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .spot { animation: spot_00_kas_yra_sheets 17s linear 0s both; }
    @keyframes spot_00_kas_yra_sheets { 0%, 35.288% { opacity: 0; left: 4px; top: 690px; width: 1672px; height: 52px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 37.647% { opacity: 1; left: 4px; top: 690px; width: 1672px; height: 52px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 100% { opacity: 1; left: 4px; top: 690px; width: 1672px; height: 52px; } }
    .stage > .gs-window { animation: fadeUpMedium 0.6s var(--ease-spring) 0.3s both; }
    .n-tabs { animation: v_00_kas_yra_sheets_3 17s linear 0s both; }
    @keyframes v_00_kas_yra_sheets_3 { 0%, 38.818% { opacity: 0; } 40.294% { opacity: 1; } 62.353% { opacity: 1; } 63.529%, 100% { opacity: 0; } }
    .n-files { animation: v_00_kas_yra_sheets_5 17s linear 0s both; }
    @keyframes v_00_kas_yra_sheets_5 { 0%, 64.112% { opacity: 0; } 65.588% { opacity: 1; } 100% { opacity: 1; } }
    .gs-tab.tab-0 { animation: tabPulseGS 0.5s ease-in-out 6.80s both; }
    .gs-tab.tab-1 { animation: tabPulseGS 0.5s ease-in-out 7.08s both; }
    .gs-tab.tab-2 { animation: tabPulseGS 0.5s ease-in-out 7.36s both; }
    .gs-tab.tab-3 { animation: tabPulseGS 0.5s ease-in-out 7.64s both; }
    .gs-tab.tab-4 { animation: tabPulseGS 0.5s ease-in-out 7.92s both; }
    .gs-tab.tab-5 { animation: tabPulseGS 0.5s ease-in-out 8.20s both; }
    .gs-tab.tab-6 { animation: tabPulseGS 0.5s ease-in-out 8.48s both; }
  `,
  '01-prieiga': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .em-0 { animation: raideGS 0.01s steps(1,end) 17.40s both; }
    .em-1 { animation: raideGS 0.01s steps(1,end) 17.46s both; }
    .em-2 { animation: raideGS 0.01s steps(1,end) 17.52s both; }
    .em-3 { animation: raideGS 0.01s steps(1,end) 17.58s both; }
    .em-4 { animation: raideGS 0.01s steps(1,end) 17.64s both; }
    .em-5 { animation: raideGS 0.01s steps(1,end) 17.70s both; }
    .em-6 { animation: raideGS 0.01s steps(1,end) 17.76s both; }
    .em-7 { animation: raideGS 0.01s steps(1,end) 17.82s both; }
    .em-8 { animation: raideGS 0.01s steps(1,end) 17.88s both; }
    .em-9 { animation: raideGS 0.01s steps(1,end) 17.94s both; }
    .em-10 { animation: raideGS 0.01s steps(1,end) 18.00s both; }
    .em-11 { animation: raideGS 0.01s steps(1,end) 18.06s both; }
    .em-12 { animation: raideGS 0.01s steps(1,end) 18.12s both; }
    .em-13 { animation: raideGS 0.01s steps(1,end) 18.18s both; }
    .em-14 { animation: raideGS 0.01s steps(1,end) 18.24s both; }
    .em-15 { animation: raideGS 0.01s steps(1,end) 18.30s both; }
    .em-16 { animation: raideGS 0.01s steps(1,end) 18.36s both; }
    .em-17 { animation: raideGS 0.01s steps(1,end) 18.42s both; }
    .rip18 { animation: ratilasGS 0.6s ease-out 8.4s forwards; }
    .rip19 { animation: ratilasGS 0.6s ease-out 15.6s forwards; }
    .rip20 { animation: ratilasGS 0.6s ease-out 23.6s forwards; }
    .cursor-wrap { animation: k_01_prieiga 31s linear 0s both; }
    @keyframes k_01_prieiga { 0% { transform: translate(320px, 210px); } 0.000% { transform: translate(320px, 210px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 20.645% { transform: translate(320px, 210px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 26.129% { transform: translate(-874px, -1px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 43.871% { transform: translate(-874px, -1px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 49.355% { transform: translate(460px, -412px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 53.548% { transform: translate(460px, -412px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 55.484% { transform: translate(-480px, -190px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 74.194% { transform: translate(-480px, -190px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 75.484% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .req { animation: fadeUpMedium 0.6s var(--ease-spring) 0.5s both; }
    .req .btn { animation: mygtukasGS 31s linear 0s both; }
    @keyframes mygtukasGS { 0%, 26.935% { filter: brightness(1); transform: scale(1); } 27.258% { filter: brightness(.85); transform: scale(.96); } 28.065%, 100% { filter: brightness(1); transform: scale(1); } }
    .grant { animation: slinktisIsDesines 0.6s var(--ease-spring) 10.0s both; }
    .req { animation: v_01_prieiga_27 31s linear 0s both; }
    @keyframes v_01_prieiga_27 { 0%, 1.610% { opacity: 0; } 2.419% { opacity: 1; } 45.161% { opacity: 1; } 45.806%, 100% { opacity: 0; } }
    .grant { animation: v_01_prieiga_29 31s linear 0s both; }
    @keyframes v_01_prieiga_29 { 0%, 32.255% { opacity: 0; } 33.065% { opacity: 1; } 45.161% { opacity: 1; } 45.806%, 100% { opacity: 0; } }
    .shwrap { animation: v_01_prieiga_31 31s linear 0s both; }
    @keyframes v_01_prieiga_31 { 0%, 45.803% { opacity: 0; } 46.613% { opacity: 1; } 100% { opacity: 1; } }
    .shdlg { animation: fadeUpMedium 0.5s var(--ease-spring) 16.4s both; }
    .shdlg .row { animation: v_01_prieiga_34 31s linear 0s both; }
    @keyframes v_01_prieiga_34 { 0%, 67.739% { opacity: 0; } 68.548% { opacity: 1; } 100% { opacity: 1; } }
    .shdlg .fld .ph { animation: v_01_prieiga_36 31s linear 0s both; }
    @keyframes v_01_prieiga_36 { 0%, 45.803% { opacity: 0; } 46.613% { opacity: 1; } 56.129% { opacity: 1; } 56.774%, 100% { opacity: 0; } }
    .shdlg .send { animation: siusti_01_prieiga 31s linear 0s both; }
    @keyframes siusti_01_prieiga { 0%, 75.968% { filter: brightness(1); } 76.290% { filter: brightness(.85); } 77.097%, 100% { filter: brightness(1); } }
  `,
  '02-paskyra': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .acc.g { animation: slinktisIsKaires 0.6s var(--ease-spring) 1.0s both; }
    .acc.g .badge { animation: iconPulse 0.6s ease-in-out 3.0s both; }
    .acc.o { animation: slinktisIsDesines 0.6s var(--ease-spring) 6.4s both; }
    .ws { animation: v_02_paskyra_3 17s linear 0s both; }
    @keyframes v_02_paskyra_3 { 0%, 75.876% { opacity: 0; } 77.353% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '03-langas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .spot { animation: spot_03_langas 16s linear 0s both; }
    @keyframes spot_03_langas { 0%, 8.119% { opacity: 0; left: 66px; top: 6px; width: 520px; height: 48px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 10.625% { opacity: 1; left: 66px; top: 6px; width: 520px; height: 48px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 20.000% { opacity: 1; left: 66px; top: 6px; width: 520px; height: 48px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 23.438% { opacity: 1; left: 66px; top: 54px; width: 1000px; height: 44px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 45.000% { opacity: 1; left: 66px; top: 54px; width: 1000px; height: 44px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 48.438% { opacity: 1; left: 64px; top: 248px; width: 1612px; height: 438px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 67.500% { opacity: 1; left: 64px; top: 248px; width: 1612px; height: 438px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 70.938% { opacity: 1; left: 4px; top: 690px; width: 1672px; height: 52px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 100% { opacity: 1; left: 4px; top: 690px; width: 1672px; height: 52px; } }
    .stage > .gs-window { animation: fadeUpMedium 0.5s var(--ease-spring) 0.2s both; }
    .nr1 { animation: v_03_langas_3 16s linear 0s both; }
    @keyframes v_03_langas_3 { 0%, 10.306% { opacity: 0; } 11.875% { opacity: 1; } 19.688% { opacity: 1; } 20.938%, 100% { opacity: 0; } }
    .nr2 { animation: v_03_langas_5 16s linear 0s both; }
    @keyframes v_03_langas_5 { 0%, 22.181% { opacity: 0; } 23.750% { opacity: 1; } 44.688% { opacity: 1; } 45.938%, 100% { opacity: 0; } }
    .nr3 { animation: v_03_langas_7 16s linear 0s both; }
    @keyframes v_03_langas_7 { 0%, 47.181% { opacity: 0; } 48.750% { opacity: 1; } 67.188% { opacity: 1; } 68.438%, 100% { opacity: 0; } }
    .nr4 { animation: v_03_langas_9 16s linear 0s both; }
    @keyframes v_03_langas_9 { 0%, 69.681% { opacity: 0; } 71.250% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '04-lapai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 4.6s forwards; }
    .rip1 { animation: ratilasGS 0.6s ease-out 10.0s forwards; }
    .cursor-wrap { animation: k_04_lapai 15s linear 0s both; }
    @keyframes k_04_lapai { 0% { transform: translate(-444px, -316px); } 0.000% { transform: translate(-444px, -316px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 18.667% { transform: translate(-444px, -316px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 28.667% { transform: translate(-980px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 57.333% { transform: translate(-980px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 64.667% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .grid-b { animation: v_04_lapai_4 15s linear 0s both; }
    @keyframes v_04_lapai_4 { 0%, 31.660% { opacity: 0; } 33.333% { opacity: 1; } 100% { opacity: 1; } }
    .gs-tab.tab-3 { animation: tabOnOffGS_04_lapai 15s steps(1,end) 0s both; }
    @keyframes tabOnOffGS_04_lapai { 0% { background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; } 31.333%, 100% { background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; } }
    .gs-tab.tab-2 { animation: tabOnGS_04_lapai 15s steps(1,end) 0s both; }
    @keyframes tabOnGS_04_lapai { 0% { background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; } 31.333%, 100% { background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; } }
    .strip { animation: juostaSlenkaGS 15s cubic-bezier(.3,0,.2,1) 0s both; }
    @keyframes juostaSlenkaGS { 0%, 67.000% { transform: translateX(0); } 71.333%, 100% { transform: translateX(-250px); } }
    .stage { transform-origin: 0% 100%; animation: z_04_lapai 15s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_04_lapai { 0%, 16.000% { transform: scale(1); } 23.333% { transform: scale(1.28); } 82.667% { transform: scale(1.28); } 90.000%, 100% { transform: scale(1); } }
  `,
  '05-visi-lapai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 2.8s forwards; }
    .rip1 { animation: ratilasGS 0.6s ease-out 7.4s forwards; }
    .cursor-wrap { animation: k_05_visi_lapai 13s linear 0s both; }
    @keyframes k_05_visi_lapai { 0% { transform: translate(724px, -220px); } 0.000% { transform: translate(724px, -220px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 9.231% { transform: translate(724px, -220px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 19.231% { transform: translate(-98px, 196px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 43.077% { transform: translate(-98px, 196px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 54.615% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .list-pop { animation: v_05_visi_lapai_4 13s linear 0s both; }
    @keyframes v_05_visi_lapai_4 { 0%, 22.685% { opacity: 0; } 24.615% { opacity: 1; } 57.692% { opacity: 1; } 59.231%, 100% { opacity: 0; } }
    .list-pop .li-4 { animation: hlGS_05_visi_lapai 13s steps(1,end) 0s both; }
    @keyframes hlGS_05_visi_lapai { 0%, 50.769% { background: transparent; } 50.769%, 100% { background: #e8eaed; } }
    .grid-c { animation: v_05_visi_lapai_8 13s linear 0s both; }
    @keyframes v_05_visi_lapai_8 { 0%, 58.454% { opacity: 0; } 60.385% { opacity: 1; } 100% { opacity: 1; } }
    .gs-tab.tab-3 { animation: t3GS_05_visi_lapai 13s steps(1,end) 0s both; }
    @keyframes t3GS_05_visi_lapai { 0% { background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; } 58.462%, 100% { background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; } }
    .gs-tab.tab-4 { animation: t4GS_05_visi_lapai 13s steps(1,end) 0s both; }
    @keyframes t4GS_05_visi_lapai { 0% { background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; } 58.462%, 100% { background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; } }
    .stage { transform-origin: 0% 100%; animation: z_05_visi_lapai 13s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_05_visi_lapai { 0%, 12.308% { transform: scale(1); } 20.769% { transform: scale(1.3); } 78.462% { transform: scale(1.3); } 86.923%, 100% { transform: scale(1); } }
  `,
  '06-lapo-meniu': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 3.4s forwards; }
    .cursor-wrap { animation: k_06_lapo_meniu 15s linear 0s both; }
    @keyframes k_06_lapo_meniu { 0% { transform: translate(236px, -29px); } 0.000% { transform: translate(236px, -29px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 12.000% { transform: translate(236px, -29px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 20.667% { transform: translate(48px, 389px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 42.000% { transform: translate(48px, 389px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 46.000% { transform: translate(0px, 88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 52.000% { transform: translate(0px, 88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 54.000% { transform: translate(0px, 132px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 58.667% { transform: translate(0px, 132px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 60.667% { transform: translate(0px, 176px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 68.000% { transform: translate(0px, 176px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 72.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .tab-menu { animation: v_06_lapo_meniu_3 15s linear 0s both; }
    @keyframes v_06_lapo_meniu_3 { 0%, 23.660% { opacity: 0; } 25.333% { opacity: 1; } 100% { opacity: 1; } }
    .tab-menu .m-ren { animation: hl_06_lapo_meniu_ren 15s steps(1,end) 0s both; }
    @keyframes hl_06_lapo_meniu_ren { 0%, 46.000% { background: transparent; } 46.067% { background: #e8eaed; } 53.333% { background: #e8eaed; } 53.400%, 100% { background: transparent; } }
    .tab-menu .m-col { animation: hl_06_lapo_meniu_col 15s steps(1,end) 0s both; }
    @keyframes hl_06_lapo_meniu_col { 0%, 54.000% { background: transparent; } 54.067% { background: #e8eaed; } 60.000% { background: #e8eaed; } 60.067%, 100% { background: transparent; } }
    .tab-menu .m-hide { animation: hl_06_lapo_meniu_hide 15s steps(1,end) 0s both; }
    @keyframes hl_06_lapo_meniu_hide { 0%, 60.667% { background: transparent; } 60.733% { background: #e8eaed; } 71.333% { background: #e8eaed; } 71.400%, 100% { background: transparent; } }
    .tab-menu .m-del { animation: hl_06_lapo_meniu_del 15s steps(1,end) 0s both; }
    @keyframes hl_06_lapo_meniu_del { 0%, 72.000% { background: transparent; } 72.067% { background: #e8eaed; } 100% { background: #e8eaed; } }
    .stage { transform-origin: 10% 100%; animation: z_06_lapo_meniu 15s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_06_lapo_meniu { 0%, 13.333% { transform: scale(1); } 20.667% { transform: scale(1.22); } 100% { transform: scale(1.22); } }
  `,
  '07-pervardyti': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rn-0 { animation: raideGS 0.01s steps(1,end) 5.20s both; }
    .rn-1 { animation: raideGS 0.01s steps(1,end) 5.30s both; }
    .rn-2 { animation: raideGS 0.01s steps(1,end) 5.40s both; }
    .rn-3 { animation: raideGS 0.01s steps(1,end) 5.50s both; }
    .rn-4 { animation: raideGS 0.01s steps(1,end) 5.60s both; }
    .rn-5 { animation: raideGS 0.01s steps(1,end) 5.70s both; }
    .rn-6 { animation: raideGS 0.01s steps(1,end) 5.80s both; }
    .rn-7 { animation: raideGS 0.01s steps(1,end) 5.90s both; }
    .rn-8 { animation: raideGS 0.01s steps(1,end) 6.00s both; }
    .rn-9 { animation: raideGS 0.01s steps(1,end) 6.10s both; }
    .rn-10 { animation: raideGS 0.01s steps(1,end) 6.20s both; }
    .rn-11 { animation: raideGS 0.01s steps(1,end) 6.30s both; }
    .rn-12 { animation: raideGS 0.01s steps(1,end) 6.40s both; }
    .rn-13 { animation: raideGS 0.01s steps(1,end) 6.50s both; }
    .rn-14 { animation: raideGS 0.01s steps(1,end) 6.60s both; }
    .rn-15 { animation: raideGS 0.01s steps(1,end) 6.70s both; }
    .rn-16 { animation: raideGS 0.01s steps(1,end) 6.80s both; }
    .rn-17 { animation: raideGS 0.01s steps(1,end) 6.90s both; }
    .rn-18 { animation: raideGS 0.01s steps(1,end) 7.00s both; }
    .rip19 { animation: ratilasGS 0.6s ease-out 3.0s forwards; }
    .rip20 { animation: ratilasGS 0.6s ease-out 3.28s forwards; }
    .cursor-wrap { animation: k_07_pervardyti 14s linear 0s both; }
    @keyframes k_07_pervardyti { 0% { transform: translate(236px, -466px); } 0.000% { transform: translate(236px, -466px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 8.571% { transform: translate(236px, -466px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 19.286% { transform: translate(30px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 21.429% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .edit-box { animation: laukelisGS_07_pervardyti 14s steps(1,end) 0s both; }
    @keyframes laukelisGS_07_pervardyti { 0% { border-color: transparent; background: transparent; } 23.929% { border-color: var(--gs-select); background: #fff; } 57.143%, 100% { border-color: transparent; background: transparent; } }
    .old-sel { animation: senasGS_07_pervardyti 14s steps(1,end) 0s both; }
    @keyframes senasGS_07_pervardyti { 0% { max-width: 400px; background: transparent; } 23.929% { max-width: 400px; background: #c3dafe; } 36.786%, 100% { max-width: 0; background: #c3dafe; } }
    .stage { transform-origin: 20% 100%; animation: z_07_pervardyti 14s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_07_pervardyti { 0%, 11.429% { transform: scale(1); } 19.286% { transform: scale(1.35); } 100% { transform: scale(1.35); } }
  `,
  '08-atsargiai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .box.a { animation: slinktisIsKaires 0.6s var(--ease-spring) 4.0s both; }
    .box.a .ren { animation: v_08_atsargiai_1 33s linear 0s both; }
    @keyframes v_08_atsargiai_1 { 0%, 26.664% { opacity: 0; } 27.424% { opacity: 1; } 100% { opacity: 1; } }
    .box.b { animation: slinktisIsDesines 0.6s var(--ease-spring) 14.2s both; }
    .box.a .lock { animation: iconPulse 0.6s ease-in-out 5.6s both; }
    .box.b .warn { animation: v_08_atsargiai_5 33s linear 0s both; }
    @keyframes v_08_atsargiai_5 { 0%, 58.785% { opacity: 0; } 59.545% { opacity: 1; } 100% { opacity: 1; } }
    .undo { animation: v_08_atsargiai_7 33s linear 0s both; }
    @keyframes v_08_atsargiai_7 { 0%, 76.361% { opacity: 0; } 77.121% { opacity: 1; } 100% { opacity: 1; } }
    .undo .later { animation: v_08_atsargiai_9 33s linear 0s both; }
    @keyframes v_08_atsargiai_9 { 0%, 86.664% { opacity: 0; } 87.424% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '09-zymos': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .mini { animation: slinktisIsKaires 0.6s var(--ease-spring) 0.4s both; }
    .site { animation: slinktisIsDesines 0.6s var(--ease-spring) 1.2s both; }
    .hl0 { animation: v_09_zymos_2 18s linear 0s both; }
    @keyframes v_09_zymos_2 { 0%, 26.661% { opacity: 0; } 28.056% { opacity: 1; } 34.167% { opacity: 1; } 35.278%, 100% { opacity: 0; } }
    .hl1 { animation: v_09_zymos_4 18s linear 0s both; }
    @keyframes v_09_zymos_4 { 0%, 34.439% { opacity: 0; } 35.833% { opacity: 1; } 41.944% { opacity: 1; } 43.056%, 100% { opacity: 0; } }
    .hl2 { animation: v_09_zymos_6 18s linear 0s both; }
    @keyframes v_09_zymos_6 { 0%, 42.217% { opacity: 0; } 43.611% { opacity: 1; } 54.167% { opacity: 1; } 55.278%, 100% { opacity: 0; } }
    .hl3 { animation: v_09_zymos_8 18s linear 0s both; }
    @keyframes v_09_zymos_8 { 0%, 54.439% { opacity: 0; } 55.833% { opacity: 1; } 73.056% { opacity: 1; } 74.167%, 100% { opacity: 0; } }
    .hl4 { animation: v_09_zymos_10 18s linear 0s both; }
    @keyframes v_09_zymos_10 { 0%, 73.328% { opacity: 0; } 74.722% { opacity: 1; } 88.889% { opacity: 1; } 90.000%, 100% { opacity: 0; } }
    .mini .mrow.h2 { animation: dim_09_zymos_12 18s linear 0s both; }
    @keyframes dim_09_zymos_12 { 0% { opacity: 1; } 26.667% { opacity: 1; } 28.333% { opacity: 1; } 34.444% { opacity: 1; } 36.111% { opacity: 0.28; } 42.222% { opacity: 0.28; } 43.889% { opacity: 0.28; } 54.444% { opacity: 0.28; } 56.111% { opacity: 0.28; } 73.333% { opacity: 0.28; } 75.000% { opacity: 0.28; } 88.889% { opacity: 0.28; } 90.556% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-h2 { animation: dim_09_zymos_14 18s linear 0s both; }
    @keyframes dim_09_zymos_14 { 0% { opacity: 1; } 26.667% { opacity: 1; } 28.333% { opacity: 1; } 34.444% { opacity: 1; } 36.111% { opacity: 0.28; } 42.222% { opacity: 0.28; } 43.889% { opacity: 0.28; } 54.444% { opacity: 0.28; } 56.111% { opacity: 0.28; } 73.333% { opacity: 0.28; } 75.000% { opacity: 0.28; } 88.889% { opacity: 0.28; } 90.556% { opacity: 1; } 100% { opacity: 1; } }
    .mini .mrow.h3 { animation: dim_09_zymos_16 18s linear 0s both; }
    @keyframes dim_09_zymos_16 { 0% { opacity: 1; } 26.667% { opacity: 1; } 28.333% { opacity: 0.28; } 34.444% { opacity: 0.28; } 36.111% { opacity: 1; } 42.222% { opacity: 1; } 43.889% { opacity: 0.28; } 54.444% { opacity: 0.28; } 56.111% { opacity: 0.28; } 73.333% { opacity: 0.28; } 75.000% { opacity: 0.28; } 88.889% { opacity: 0.28; } 90.556% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-h3 { animation: dim_09_zymos_18 18s linear 0s both; }
    @keyframes dim_09_zymos_18 { 0% { opacity: 1; } 26.667% { opacity: 1; } 28.333% { opacity: 0.28; } 34.444% { opacity: 0.28; } 36.111% { opacity: 1; } 42.222% { opacity: 1; } 43.889% { opacity: 0.28; } 54.444% { opacity: 0.28; } 56.111% { opacity: 0.28; } 73.333% { opacity: 0.28; } 75.000% { opacity: 0.28; } 88.889% { opacity: 0.28; } 90.556% { opacity: 1; } 100% { opacity: 1; } }
    .mini .mrow.th { animation: dim_09_zymos_20 18s linear 0s both; }
    @keyframes dim_09_zymos_20 { 0% { opacity: 1; } 26.667% { opacity: 1; } 28.333% { opacity: 0.28; } 34.444% { opacity: 0.28; } 36.111% { opacity: 0.28; } 42.222% { opacity: 0.28; } 43.889% { opacity: 1; } 54.444% { opacity: 1; } 56.111% { opacity: 0.28; } 73.333% { opacity: 0.28; } 75.000% { opacity: 0.28; } 88.889% { opacity: 0.28; } 90.556% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-th { animation: dim_09_zymos_22 18s linear 0s both; }
    @keyframes dim_09_zymos_22 { 0% { opacity: 1; } 26.667% { opacity: 1; } 28.333% { opacity: 0.28; } 34.444% { opacity: 0.28; } 36.111% { opacity: 0.28; } 42.222% { opacity: 0.28; } 43.889% { opacity: 1; } 54.444% { opacity: 1; } 56.111% { opacity: 0.28; } 73.333% { opacity: 0.28; } 75.000% { opacity: 0.28; } 88.889% { opacity: 0.28; } 90.556% { opacity: 1; } 100% { opacity: 1; } }
    .mini .mrow.data { animation: dim_09_zymos_24 18s linear 0s both; }
    @keyframes dim_09_zymos_24 { 0% { opacity: 1; } 26.667% { opacity: 1; } 28.333% { opacity: 0.28; } 34.444% { opacity: 0.28; } 36.111% { opacity: 0.28; } 42.222% { opacity: 0.28; } 43.889% { opacity: 0.28; } 54.444% { opacity: 0.28; } 56.111% { opacity: 1; } 73.333% { opacity: 1; } 75.000% { opacity: 0.28; } 88.889% { opacity: 0.28; } 90.556% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-td { animation: dim_09_zymos_26 18s linear 0s both; }
    @keyframes dim_09_zymos_26 { 0% { opacity: 1; } 26.667% { opacity: 1; } 28.333% { opacity: 0.28; } 34.444% { opacity: 0.28; } 36.111% { opacity: 0.28; } 42.222% { opacity: 0.28; } 43.889% { opacity: 0.28; } 54.444% { opacity: 0.28; } 56.111% { opacity: 1; } 73.333% { opacity: 1; } 75.000% { opacity: 0.28; } 88.889% { opacity: 0.28; } 90.556% { opacity: 1; } 100% { opacity: 1; } }
    .mini .mrow.ign { animation: dim_09_zymos_28 18s linear 0s both; }
    @keyframes dim_09_zymos_28 { 0% { opacity: 1; } 26.667% { opacity: 1; } 28.333% { opacity: 0.28; } 34.444% { opacity: 0.28; } 36.111% { opacity: 0.28; } 42.222% { opacity: 0.28; } 43.889% { opacity: 0.28; } 54.444% { opacity: 0.28; } 56.111% { opacity: 0.28; } 73.333% { opacity: 0.28; } 75.000% { opacity: 1; } 88.889% { opacity: 1; } 90.556% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-ign { animation: v_09_zymos_30 18s linear 0s both; }
    @keyframes v_09_zymos_30 { 0%, 74.439% { opacity: 0; } 75.833% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '10-rasymas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .tp-0 { animation: raideGS 0.01s steps(1,end) 4.40s both; }
    .tp-1 { animation: raideGS 0.01s steps(1,end) 4.49s both; }
    .tp-2 { animation: raideGS 0.01s steps(1,end) 4.58s both; }
    .tp-3 { animation: raideGS 0.01s steps(1,end) 4.67s both; }
    .tp-4 { animation: raideGS 0.01s steps(1,end) 4.76s both; }
    .tp-5 { animation: raideGS 0.01s steps(1,end) 4.85s both; }
    .tp-6 { animation: raideGS 0.01s steps(1,end) 4.94s both; }
    .tp-7 { animation: raideGS 0.01s steps(1,end) 5.03s both; }
    .tp-8 { animation: raideGS 0.01s steps(1,end) 5.12s both; }
    .tp-9 { animation: raideGS 0.01s steps(1,end) 5.21s both; }
    .tp-10 { animation: raideGS 0.01s steps(1,end) 5.30s both; }
    .tp-11 { animation: raideGS 0.01s steps(1,end) 5.39s both; }
    .tp-12 { animation: raideGS 0.01s steps(1,end) 5.48s both; }
    .tp-13 { animation: raideGS 0.01s steps(1,end) 5.57s both; }
    .tp-14 { animation: raideGS 0.01s steps(1,end) 5.66s both; }
    .tp-15 { animation: raideGS 0.01s steps(1,end) 5.75s both; }
    .tp-16 { animation: raideGS 0.01s steps(1,end) 5.84s both; }
    .tp-17 { animation: raideGS 0.01s steps(1,end) 5.93s both; }
    .tp-18 { animation: raideGS 0.01s steps(1,end) 6.02s both; }
    .rip19 { animation: ratilasGS 0.6s ease-out 2.4s forwards; }
    .cursor-wrap { animation: k_10_rasymas 12s linear 0s both; }
    @keyframes k_10_rasymas { 0% { transform: translate(673px, -389px); } 0.000% { transform: translate(673px, -389px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 8.333% { transform: translate(673px, -389px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 18.333% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .sel1 { animation: v_10_rasymas_22 12s linear 0s both; }
    @keyframes v_10_rasymas_22 { 0%, 21.242% { opacity: 0; } 23.333% { opacity: 1; } 61.667% { opacity: 1; } 63.333%, 100% { opacity: 0; } }
    .sel2 { animation: v_10_rasymas_24 12s linear 0s both; }
    @keyframes v_10_rasymas_24 { 0%, 62.075% { opacity: 0; } 64.167% { opacity: 1; } 100% { opacity: 1; } }
    .gs-saved { animation: v_10_rasymas_26 12s linear 0s both; }
    @keyframes v_10_rasymas_26 { 0%, 63.325% { opacity: 0; } 65.417% { opacity: 1; } 83.333% { opacity: 1; } 85.000%, 100% { opacity: 0; } }
    .stage { transform-origin: 30% 55%; animation: z_10_rasymas 12s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_10_rasymas { 0%, 10.000% { transform: scale(1); } 19.167% { transform: scale(1.3); } 81.667% { transform: scale(1.3); } 90.833%, 100% { transform: scale(1); } }
  `,
  '11-akimirksniu': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .hd-0 { animation: raideGS 0.01s steps(1,end) 12.60s both; }
    .hd-1 { animation: raideGS 0.01s steps(1,end) 12.68s both; }
    .hd-2 { animation: raideGS 0.01s steps(1,end) 12.76s both; }
    .hd-3 { animation: raideGS 0.01s steps(1,end) 12.84s both; }
    .hd-4 { animation: raideGS 0.01s steps(1,end) 12.92s both; }
    .hd-5 { animation: raideGS 0.01s steps(1,end) 13.00s both; }
    .hd-6 { animation: raideGS 0.01s steps(1,end) 13.08s both; }
    .hd-7 { animation: raideGS 0.01s steps(1,end) 13.16s both; }
    .hd-8 { animation: raideGS 0.01s steps(1,end) 13.24s both; }
    .k1-0 { animation: raideGS 0.01s steps(1,end) 14.10s both; }
    .k1-1 { animation: raideGS 0.01s steps(1,end) 14.25s both; }
    .n1-0 { animation: raideGS 0.01s steps(1,end) 2.20s both; }
    .n1-1 { animation: raideGS 0.01s steps(1,end) 2.28s both; }
    .n1-2 { animation: raideGS 0.01s steps(1,end) 2.36s both; }
    .n1-3 { animation: raideGS 0.01s steps(1,end) 2.44s both; }
    .n1-4 { animation: raideGS 0.01s steps(1,end) 2.52s both; }
    .n1-5 { animation: raideGS 0.01s steps(1,end) 2.60s both; }
    .n1-6 { animation: raideGS 0.01s steps(1,end) 2.68s both; }
    .n1-7 { animation: raideGS 0.01s steps(1,end) 2.76s both; }
    .n1-8 { animation: raideGS 0.01s steps(1,end) 2.84s both; }
    .n1-9 { animation: raideGS 0.01s steps(1,end) 2.92s both; }
    .n1-10 { animation: raideGS 0.01s steps(1,end) 3.00s both; }
    .k2-0 { animation: raideGS 0.01s steps(1,end) 15.10s both; }
    .k2-1 { animation: raideGS 0.01s steps(1,end) 15.25s both; }
    .rip24 { animation: ratilasGS 0.6s ease-out 1.6s forwards; }
    .rip25 { animation: ratilasGS 0.6s ease-out 12.2s forwards; }
    .rip26 { animation: ratilasGS 0.6s ease-out 13.8s forwards; }
    .rip27 { animation: ratilasGS 0.6s ease-out 14.8s forwards; }
    .cursor-wrap { animation: k_11_akimirksniu 20s linear 0s both; }
    @keyframes k_11_akimirksniu { 0% { transform: translate(-50px, 233px); } 0.000% { transform: translate(-50px, 233px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 4.000% { transform: translate(-50px, 233px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 7.500% { transform: translate(-340px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 20.000% { transform: translate(-300px, 10px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 57.000% { transform: translate(-300px, 10px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 60.500% { transform: translate(-40px, -255px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 67.500% { transform: translate(-40px, -255px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 68.500% { transform: translate(-40px, -190px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 73.000% { transform: translate(-40px, -190px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 73.500% { transform: translate(-40px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .tb.sh { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.2s both; }
    .tb.st { animation: slinktisIsDesines 0.5s var(--ease-spring) 0.4s both; }
    .s1 { animation: v_11_akimirksniu_32 20s linear 0s both; }
    @keyframes v_11_akimirksniu_32 { 0%, 8.245% { opacity: 0; } 9.500% { opacity: 1; } 17.500% { opacity: 1; } 18.500%, 100% { opacity: 0; } }
    .old1 { animation: v_11_akimirksniu_34 20s linear 0s both; }
    @keyframes v_11_akimirksniu_34 { 0%, 0.000% { opacity: 0; } 1.250% { opacity: 1; } 10.500% { opacity: 1; } 11.500%, 100% { opacity: 0; } }
    .new1 { animation: v_11_akimirksniu_36 20s linear 0s both; }
    @keyframes v_11_akimirksniu_36 { 0%, 10.745% { opacity: 0; } 12.000% { opacity: 1; } 100% { opacity: 1; } }
    .en1 { animation: v_11_akimirksniu_38 20s linear 0s both; }
    @keyframes v_11_akimirksniu_38 { 0%, 14.995% { opacity: 0; } 16.250% { opacity: 1; } 23.000% { opacity: 1; } 24.000%, 100% { opacity: 0; } }
    .old1s { animation: v_11_akimirksniu_40 20s linear 0s both; }
    @keyframes v_11_akimirksniu_40 { 0%, 0.000% { opacity: 0; } 1.250% { opacity: 1; } 18.000% { opacity: 1; } 19.000%, 100% { opacity: 0; } }
    .new1s { animation: v_11_akimirksniu_42 20s linear 0s both; }
    @keyframes v_11_akimirksniu_42 { 0%, 18.245% { opacity: 0; } 19.500% { opacity: 1; } 100% { opacity: 1; } }
    .f1 { animation: v_11_akimirksniu_44 20s linear 0s both; }
    @keyframes v_11_akimirksniu_44 { 0%, 18.245% { opacity: 0; } 19.500% { opacity: 1; } 25.000% { opacity: 1; } 26.000%, 100% { opacity: 0; } }
    .rea { animation: v_11_akimirksniu_46 20s linear 0s both; }
    @keyframes v_11_akimirksniu_46 { 0%, 43.995% { opacity: 0; } 45.250% { opacity: 1; } 58.000% { opacity: 1; } 59.000%, 100% { opacity: 0; } }
    .reb { animation: v_11_akimirksniu_48 20s linear 0s both; }
    @keyframes v_11_akimirksniu_48 { 0%, 43.995% { opacity: 0; } 45.250% { opacity: 1; } 58.000% { opacity: 1; } 59.000%, 100% { opacity: 0; } }
    .tb .r:not(.e):not(.h) { animation: dim_11_akimirksniu_50 20s linear 0s both; }
    @keyframes dim_11_akimirksniu_50 { 0% { opacity: 1; } 44.000% { opacity: 1; } 45.500% { opacity: 0.3; } 58.000% { opacity: 0.3; } 59.500% { opacity: 1; } 100% { opacity: 1; } }
    .sh3 { animation: v_11_akimirksniu_52 20s linear 0s both; }
    @keyframes v_11_akimirksniu_52 { 0%, 61.245% { opacity: 0; } 62.500% { opacity: 1; } 69.000% { opacity: 1; } 70.000%, 100% { opacity: 0; } }
    .sk1 { animation: v_11_akimirksniu_54 20s linear 0s both; }
    @keyframes v_11_akimirksniu_54 { 0%, 69.245% { opacity: 0; } 70.500% { opacity: 1; } 74.000% { opacity: 1; } 75.000%, 100% { opacity: 0; } }
    .sk2 { animation: v_11_akimirksniu_56 20s linear 0s both; }
    @keyframes v_11_akimirksniu_56 { 0%, 74.245% { opacity: 0; } 75.500% { opacity: 1; } 78.000% { opacity: 1; } 79.000%, 100% { opacity: 0; } }
    .tb.st .c3 { animation: c3_11_akimirksniu 20s cubic-bezier(.4,0,.2,1) 0s both; }
    @keyframes c3_11_akimirksniu { 0%, 78.500% { width: 0; } 82.000%, 100% { width: 180px; } }
    .f3 { animation: v_11_akimirksniu_60 20s linear 0s both; }
    @keyframes v_11_akimirksniu_60 { 0%, 80.995% { opacity: 0; } 82.250% { opacity: 1; } 87.000% { opacity: 1; } 88.000%, 100% { opacity: 0; } }
    .rca { animation: v_11_akimirksniu_62 20s linear 0s both; }
    @keyframes v_11_akimirksniu_62 { 0%, 84.995% { opacity: 0; } 86.250% { opacity: 1; } 100% { opacity: 1; } }
    .rcb { animation: v_11_akimirksniu_64 20s linear 0s both; }
    @keyframes v_11_akimirksniu_64 { 0%, 84.995% { opacity: 0; } 86.250% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '12-viena-eilute': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .vs { animation: slinktisIsKaires 0.6s var(--ease-spring) 0.4s both; }
    .ring-bad { animation: v_12_viena_eilute_1 16s linear 0s both; }
    @keyframes v_12_viena_eilute_1 { 0%, 26.244% { opacity: 0; } 27.812% { opacity: 1; } 100% { opacity: 1; } }
    .site { animation: slinktisIsDesines 0.6s var(--ease-spring) 5.0s both; }
    .site .lost { animation: v_12_viena_eilute_4 16s linear 0s both; }
    @keyframes v_12_viena_eilute_4 { 0%, 43.744% { opacity: 0; } 45.312% { opacity: 1; } 100% { opacity: 1; } }
    .ok { animation: v_12_viena_eilute_6 16s linear 0s both; }
    @keyframes v_12_viena_eilute_6 { 0%, 59.994% { opacity: 0; } 61.562% { opacity: 1; } 100% { opacity: 1; } }
    .db { animation: v_12_viena_eilute_8 16s linear 0s both; }
    @keyframes v_12_viena_eilute_8 { 0%, 74.369% { opacity: 0; } 75.938% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '13-is-word': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 7.0s forwards; }
    .cursor-wrap { animation: k_13_is_word 17s linear 0s both; }
    @keyframes k_13_is_word { 0% { transform: translate(-50px, -20px); } 0.000% { transform: translate(-50px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 32.941% { transform: translate(-50px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 40.000% { transform: translate(-1072px, -283px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 76.471% { transform: translate(-1072px, -283px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 83.529% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .fbar { animation: v_13_is_word_3 17s linear 0s both; }
    @keyframes v_13_is_word_3 { 0%, 10.582% { opacity: 0; } 12.059% { opacity: 1; } 78.824% { opacity: 1; } 80.000%, 100% { opacity: 0; } }
    .sA { animation: v_13_is_word_5 17s linear 0s both; }
    @keyframes v_13_is_word_5 { 0%, 10.582% { opacity: 0; } 12.059% { opacity: 1; } 41.471% { opacity: 1; } 42.647%, 100% { opacity: 0; } }
    .sB { animation: v_13_is_word_7 17s linear 0s both; }
    @keyframes v_13_is_word_7 { 0%, 41.759% { opacity: 0; } 43.235% { opacity: 1; } 56.176% { opacity: 1; } 57.353%, 100% { opacity: 0; } }
    .sC { animation: v_13_is_word_9 17s linear 0s both; }
    @keyframes v_13_is_word_9 { 0%, 56.465% { opacity: 0; } 57.941% { opacity: 1; } 65.588% { opacity: 1; } 66.765%, 100% { opacity: 0; } }
    .sD { animation: v_13_is_word_11 17s linear 0s both; }
    @keyframes v_13_is_word_11 { 0%, 65.876% { opacity: 0; } 67.353% { opacity: 1; } 100% { opacity: 1; } }
    .kb { animation: v_13_is_word_13 17s linear 0s both; }
    @keyframes v_13_is_word_13 { 0%, 49.406% { opacity: 0; } 50.882% { opacity: 1; } 61.176% { opacity: 1; } 62.353%, 100% { opacity: 0; } }
    .ke { animation: v_13_is_word_15 17s linear 0s both; }
    @keyframes v_13_is_word_15 { 0%, 74.112% { opacity: 0; } 75.588% { opacity: 1; } 81.176% { opacity: 1; } 82.353%, 100% { opacity: 0; } }
    .d5a { animation: v_13_is_word_17 17s linear 0s both; }
    @keyframes v_13_is_word_17 { 0%, 0.000% { opacity: 0; } 1.471% { opacity: 1; } 78.824% { opacity: 1; } 80.000%, 100% { opacity: 0; } }
    .d5b { animation: v_13_is_word_19 17s linear 0s both; }
    @keyframes v_13_is_word_19 { 0%, 79.406% { opacity: 0; } 80.882% { opacity: 1; } 100% { opacity: 1; } }
    .stage { transform-origin: 0% 10%; animation: z_13_is_word 17s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_13_is_word { 0%, 7.059% { transform: scale(1); } 13.529% { transform: scale(1.3); } 85.882% { transform: scale(1.3); } 92.353%, 100% { transform: scale(1); } }
  `,
  '14-numeriai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 6.2s forwards; }
    .rip1 { animation: ratilasGS 0.6s ease-out 10.0s forwards; }
    .cursor-wrap { animation: k_14_numeriai 14s linear 0s both; }
    @keyframes k_14_numeriai { 0% { transform: translate(798px, -295px); } 0.000% { transform: translate(798px, -295px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 35.714% { transform: translate(798px, -295px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 42.857% { transform: translate(-20px, -180px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 45.000% { transform: translate(-20px, -180px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 50.000% { transform: translate(-20px, -112px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 65.714% { transform: translate(-20px, -112px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 70.714% { transform: translate(-20px, -10px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .ftry { animation: v_14_numeriai_4 14s linear 0s both; }
    @keyframes v_14_numeriai_4 { 0%, 11.421% { opacity: 0; } 13.214% { opacity: 1; } 37.143% { opacity: 1; } 38.571%, 100% { opacity: 0; } }
    .sela { animation: v_14_numeriai_6 14s linear 0s both; }
    @keyframes v_14_numeriai_6 { 0%, 44.636% { opacity: 0; } 46.429% { opacity: 1; } 71.429% { opacity: 1; } 72.857%, 100% { opacity: 0; } }
    .kc { animation: v_14_numeriai_8 14s linear 0s both; }
    @keyframes v_14_numeriai_8 { 0%, 52.850% { opacity: 0; } 54.643% { opacity: 1; } 67.143% { opacity: 1; } 68.571%, 100% { opacity: 0; } }
    .copybox { animation: v_14_numeriai_10 14s linear 0s both; }
    @keyframes v_14_numeriai_10 { 0%, 52.850% { opacity: 0; } 54.643% { opacity: 1; } 78.571% { opacity: 1; } 80.000%, 100% { opacity: 0; } }
    .selb { animation: v_14_numeriai_12 14s linear 0s both; }
    @keyframes v_14_numeriai_12 { 0%, 71.779% { opacity: 0; } 73.571% { opacity: 1; } 100% { opacity: 1; } }
    .kv { animation: v_14_numeriai_14 14s linear 0s both; }
    @keyframes v_14_numeriai_14 { 0%, 74.993% { opacity: 0; } 76.786% { opacity: 1; } 87.143% { opacity: 1; } 88.571%, 100% { opacity: 0; } }
    .pasted { animation: v_14_numeriai_16 14s linear 0s both; }
    @keyframes v_14_numeriai_16 { 0%, 76.421% { opacity: 0; } 78.214% { opacity: 1; } 100% { opacity: 1; } }
    .stage { transform-origin: 0% 45%; animation: z_14_numeriai 14s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_14_numeriai { 0%, 4.286% { transform: scale(1); } 12.143% { transform: scale(1.25); } 87.143% { transform: scale(1.25); } 95.000%, 100% { transform: scale(1); } }
  `,
  '15-nauja-eilute': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .nm-0 { animation: raideGS 0.01s steps(1,end) 11.00s both; }
    .nm-1 { animation: raideGS 0.01s steps(1,end) 11.07s both; }
    .nm-2 { animation: raideGS 0.01s steps(1,end) 11.14s both; }
    .nm-3 { animation: raideGS 0.01s steps(1,end) 11.21s both; }
    .nm-4 { animation: raideGS 0.01s steps(1,end) 11.28s both; }
    .nm-5 { animation: raideGS 0.01s steps(1,end) 11.35s both; }
    .nm-6 { animation: raideGS 0.01s steps(1,end) 11.42s both; }
    .nm-7 { animation: raideGS 0.01s steps(1,end) 11.49s both; }
    .nm-8 { animation: raideGS 0.01s steps(1,end) 11.56s both; }
    .nm-9 { animation: raideGS 0.01s steps(1,end) 11.63s both; }
    .nm-10 { animation: raideGS 0.01s steps(1,end) 11.70s both; }
    .nm-11 { animation: raideGS 0.01s steps(1,end) 11.77s both; }
    .nm-12 { animation: raideGS 0.01s steps(1,end) 11.84s both; }
    .nm-13 { animation: raideGS 0.01s steps(1,end) 11.91s both; }
    .nm-14 { animation: raideGS 0.01s steps(1,end) 11.98s both; }
    .nm-15 { animation: raideGS 0.01s steps(1,end) 12.05s both; }
    .nm-16 { animation: raideGS 0.01s steps(1,end) 12.12s both; }
    .nm-17 { animation: raideGS 0.01s steps(1,end) 12.19s both; }
    .nm-18 { animation: raideGS 0.01s steps(1,end) 12.26s both; }
    .nm-19 { animation: raideGS 0.01s steps(1,end) 12.33s both; }
    .nm-20 { animation: raideGS 0.01s steps(1,end) 12.40s both; }
    .nm-21 { animation: raideGS 0.01s steps(1,end) 12.47s both; }
    .pr-0 { animation: raideGS 0.01s steps(1,end) 13.30s both; }
    .pr-1 { animation: raideGS 0.01s steps(1,end) 13.35s both; }
    .pr-2 { animation: raideGS 0.01s steps(1,end) 13.40s both; }
    .pr-3 { animation: raideGS 0.01s steps(1,end) 13.45s both; }
    .pr-4 { animation: raideGS 0.01s steps(1,end) 13.50s both; }
    .pr-5 { animation: raideGS 0.01s steps(1,end) 13.55s both; }
    .pr-6 { animation: raideGS 0.01s steps(1,end) 13.60s both; }
    .pr-7 { animation: raideGS 0.01s steps(1,end) 13.65s both; }
    .pr-8 { animation: raideGS 0.01s steps(1,end) 13.70s both; }
    .pr-9 { animation: raideGS 0.01s steps(1,end) 13.75s both; }
    .pr-10 { animation: raideGS 0.01s steps(1,end) 13.80s both; }
    .pr-11 { animation: raideGS 0.01s steps(1,end) 13.85s both; }
    .pr-12 { animation: raideGS 0.01s steps(1,end) 13.90s both; }
    .pr-13 { animation: raideGS 0.01s steps(1,end) 13.95s both; }
    .pr-14 { animation: raideGS 0.01s steps(1,end) 14.00s both; }
    .pr-15 { animation: raideGS 0.01s steps(1,end) 14.05s both; }
    .pr-16 { animation: raideGS 0.01s steps(1,end) 14.10s both; }
    .pr-17 { animation: raideGS 0.01s steps(1,end) 14.15s both; }
    .pr-18 { animation: raideGS 0.01s steps(1,end) 14.20s both; }
    .pr-19 { animation: raideGS 0.01s steps(1,end) 14.25s both; }
    .pr-20 { animation: raideGS 0.01s steps(1,end) 14.30s both; }
    .pr-21 { animation: raideGS 0.01s steps(1,end) 14.35s both; }
    .pr-22 { animation: raideGS 0.01s steps(1,end) 14.40s both; }
    .pr-23 { animation: raideGS 0.01s steps(1,end) 14.45s both; }
    .pr-24 { animation: raideGS 0.01s steps(1,end) 14.50s both; }
    .kt-0 { animation: raideGS 0.01s steps(1,end) 15.20s both; }
    .kt-1 { animation: raideGS 0.01s steps(1,end) 15.25s both; }
    .kt-2 { animation: raideGS 0.01s steps(1,end) 15.30s both; }
    .kt-3 { animation: raideGS 0.01s steps(1,end) 15.35s both; }
    .kt-4 { animation: raideGS 0.01s steps(1,end) 15.40s both; }
    .kt-5 { animation: raideGS 0.01s steps(1,end) 15.45s both; }
    .kt-6 { animation: raideGS 0.01s steps(1,end) 15.50s both; }
    .kt-7 { animation: raideGS 0.01s steps(1,end) 15.55s both; }
    .kt-8 { animation: raideGS 0.01s steps(1,end) 15.60s both; }
    .ln-0 { animation: raideGS 0.01s steps(1,end) 27.20s both; }
    .ln-1 { animation: raideGS 0.01s steps(1,end) 27.35s both; }
    .rip58 { animation: ratilasGS 0.6s ease-out 4.0s forwards; }
    .rip59 { animation: ratilasGS 0.6s ease-out 8.0s forwards; }
    .rip60 { animation: ratilasGS 0.6s ease-out 10.6s forwards; }
    .rip61 { animation: ratilasGS 0.6s ease-out 12.9s forwards; }
    .rip62 { animation: ratilasGS 0.6s ease-out 20.0s forwards; }
    .rip63 { animation: ratilasGS 0.6s ease-out 26.6s forwards; }
    .rip64 { animation: ratilasGS 0.6s ease-out 31.6s forwards; }
    .rip65 { animation: ratilasGS 0.6s ease-out 37.4s forwards; }
    .cursor-wrap { animation: k_15_nauja_eilute 42s linear 0s both; }
    @keyframes k_15_nauja_eilute { 0% { transform: translate(588px, -405px); } 0.000% { transform: translate(588px, -405px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 5.714% { transform: translate(588px, -405px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 8.810% { transform: translate(-281px, -122px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 14.762% { transform: translate(-281px, -122px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 16.667% { transform: translate(-92px, -33px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 20.476% { transform: translate(-92px, -33px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 23.333% { transform: translate(405px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 25.000% { transform: translate(405px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 29.524% { transform: translate(405px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 30.476% { transform: translate(875px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 45.000% { transform: translate(875px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 47.381% { transform: translate(-30px, -54px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 47.857% { transform: translate(-30px, -54px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 50.238% { transform: translate(-30px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 51.429% { transform: translate(-30px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 53.333% { transform: translate(-30px, -69px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 55.714% { transform: translate(-30px, -69px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 57.857% { transform: translate(-30px, -103px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 60.952% { transform: translate(-30px, -103px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 63.095% { transform: translate(-30px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 70.952% { transform: translate(-10px, -10px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 75.000% { transform: translate(140px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 75.476% { transform: translate(140px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 77.381% { transform: translate(1160px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 77.857% { transform: translate(1160px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 79.286% { transform: translate(320px, -103px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 80.000% { transform: translate(320px, -103px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 82.143% { transform: translate(320px, -137px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 86.667% { transform: translate(320px, -137px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 88.810% { transform: translate(-30px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .cursor-wrap .c-arrow { animation: ka_15_nauja_eilute 42s steps(1,end) 0s both; }
    @keyframes ka_15_nauja_eilute { 0% { opacity: 1; } 53.810% { opacity: 0; } 58.095% { opacity: 1; } 79.762% { opacity: 0; } 82.619% { opacity: 1; } 100% { opacity: 1; } }
    .cursor-wrap .c-grab { animation: kg_15_nauja_eilute 42s steps(1,end) 0s both; }
    @keyframes kg_15_nauja_eilute { 0% { opacity: 0; } 53.810% { opacity: 1; } 58.095% { opacity: 0; } 79.762% { opacity: 1; } 82.619% { opacity: 0; } 100% { opacity: 0; } }
    .ctx { animation: v_15_nauja_eilute_72 42s linear 0s both; }
    @keyframes v_15_nauja_eilute_72 { 0%, 9.879% { opacity: 0; } 10.476% { opacity: 1; } 19.286% { opacity: 1; } 19.762%, 100% { opacity: 0; } }
    .ctx .ctx5 { animation: hl_15_nauja_eilute 42s steps(1,end) 0s both; }
    @keyframes hl_15_nauja_eilute { 0%, 16.667% { background: transparent; } 16.690%, 19.286% { background: #e8eaed; } 19.310%, 100% { background: transparent; } }
    .gs-row.ins { animation: v_15_nauja_eilute_76 42s linear 0s both; }
    @keyframes v_15_nauja_eilute_76 { 0%, 19.640% { opacity: 0; } 20.238% { opacity: 1; } 100% { opacity: 1; } }
    .gs-row[data-r="8"] { animation: eilSlenkaGS_15_nauja_eilute 42s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="9"] { animation: eilSlenkaGS_15_nauja_eilute 42s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="10"] { animation: eilSlenkaGS_15_nauja_eilute 42s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="11"] { animation: eilSlenkaGS_15_nauja_eilute 42s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="12"] { animation: eilSlenkaGS_15_nauja_eilute 42s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="13"] { animation: eilSlenkaGS_15_nauja_eilute 42s cubic-bezier(.3,0,.2,1) 0s both; }
    @keyframes eilSlenkaGS_15_nauja_eilute { 0%, 19.524% { transform: translateY(-34px); } 20.476%, 100% { transform: translateY(0); } }
    .selc7 { animation: v_15_nauja_eilute_85 42s linear 0s both; }
    @keyframes v_15_nauja_eilute_85 { 0%, 25.355% { opacity: 0; } 25.952% { opacity: 1; } 30.714% { opacity: 1; } 31.190%, 100% { opacity: 0; } }
    .seld7 { animation: v_15_nauja_eilute_87 42s linear 0s both; }
    @keyframes v_15_nauja_eilute_87 { 0%, 30.831% { opacity: 0; } 31.429% { opacity: 1; } 35.714% { opacity: 1; } 36.190%, 100% { opacity: 0; } }
    .sele7 { animation: v_15_nauja_eilute_89 42s linear 0s both; }
    @keyframes v_15_nauja_eilute_89 { 0%, 35.831% { opacity: 0; } 36.429% { opacity: 1; } 38.571% { opacity: 1; } 39.048%, 100% { opacity: 0; } }
    .gap { animation: v_15_nauja_eilute_91 42s linear 0s both; }
    @keyframes v_15_nauja_eilute_91 { 0%, 38.569% { opacity: 0; } 39.167% { opacity: 1; } 46.667% { opacity: 1; } 47.143%, 100% { opacity: 0; } }
    .gs-row[data-r="8"] > span:nth-child(3), .gs-row[data-r="9"] > span:nth-child(3) { animation: bSlepti_15_nauja_eilute 42s steps(1,end) 0s both; }
    @keyframes bSlepti_15_nauja_eilute { 0%, 47.595% { color: var(--gs-cell-text); } 47.619%, 100% { color: transparent; } }
    .numcol { animation: numSlenka_15_nauja_eilute 42s cubic-bezier(.4,0,.2,1) 0s both; }
    @keyframes numSlenka_15_nauja_eilute { 0%, 47.595% { opacity: 0; transform: translateY(34px); } 47.619%, 55.714% { opacity: 1; transform: translateY(34px); } 57.857%, 100% { opacity: 1; transform: translateY(0); } }
    .selm { animation: selm_15_nauja_eilute 42s cubic-bezier(.4,0,.2,1) 0s both; }
    @keyframes selm_15_nauja_eilute { 0%, 47.738% { opacity: 0; transform: translateY(34px); height: 35px; } 47.857% { opacity: 1; transform: translateY(34px); height: 35px; } 50.238% { opacity: 1; transform: translateY(34px); height: 69px; } 55.714% { opacity: 1; transform: translateY(34px); height: 69px; } 57.857% { opacity: 1; transform: translateY(0); height: 69px; } 63.095% { opacity: 1; transform: translateY(0); } 63.214%, 100% { opacity: 0; transform: translateY(0); } }
    .gs-row[data-r="6"] > span:nth-child(4), .gs-row[data-r="6"] > span:nth-child(5), .gs-row[data-r="6"] > span:nth-child(6) { animation: perrasyti_15_nauja_eilute 42s steps(1,end) 0s both; }
    @keyframes perrasyti_15_nauja_eilute { 0%, 82.119% { opacity: 1; } 82.143%, 100% { opacity: 0; } }
    .gs-row[data-r="8"] > span:nth-child(4), .gs-row[data-r="8"] > span:nth-child(5), .gs-row[data-r="8"] > span:nth-child(6), .gs-row[data-r="9"] > span:nth-child(4), .gs-row[data-r="9"] > span:nth-child(5), .gs-row[data-r="9"] > span:nth-child(6), .newt { animation: perimti_15_nauja_eilute 42s steps(1,end) 0s both; }
    @keyframes perimti_15_nauja_eilute { 0%, 75.214% { opacity: 1; } 75.238%, 100% { opacity: 0; } }
    .pblk { animation: pblk_15_nauja_eilute 42s steps(1,end) 0s both; }
    @keyframes pblk_15_nauja_eilute { 0%, 75.214% { opacity: 0; transform: translateY(0); } 75.238%, 82.119% { opacity: 1; transform: translateY(0); } 82.143%, 100% { opacity: 1; transform: translateY(-34px); } }
    .selblk { animation: selblk_15_nauja_eilute 42s cubic-bezier(.4,0,.2,1) 0s both; }
    @keyframes selblk_15_nauja_eilute { 0%, 75.333% { opacity: 0; transform: translateY(0); } 75.357%, 80.000% { opacity: 1; transform: translateY(0); } 82.143%, 87.619% { opacity: 1; transform: translateY(-34px); } 87.738%, 100% { opacity: 0; transform: translateY(-34px); } }
    .selb9 { animation: v_15_nauja_eilute_107 42s linear 0s both; }
    @keyframes v_15_nauja_eilute_107 { 0%, 89.164% { opacity: 0; } 89.762% { opacity: 1; } 95.238% { opacity: 1; } 95.714%, 100% { opacity: 0; } }
    .kdel { animation: v_15_nauja_eilute_109 42s linear 0s both; }
    @keyframes v_15_nauja_eilute_109 { 0%, 90.474% { opacity: 0; } 91.071% { opacity: 1; } 94.286% { opacity: 1; } 94.762%, 100% { opacity: 0; } }
    .lastnr { animation: lastnr_15_nauja_eilute 42s steps(1,end) 0s both; }
    @keyframes lastnr_15_nauja_eilute { 0%, 91.405% { opacity: 1; } 91.429%, 100% { opacity: 0; } }
    .stage { transform-origin: 0% 55%; animation: z_15_nauja_eilute 42s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_15_nauja_eilute { 0%, 4.762% { transform: scale(1); } 7.381% { transform: scale(1.25); } 96.667% { transform: scale(1.25); } 99.286%, 100% { transform: scale(1); } }
  `,
  '16-paruostukai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .p1 { animation: fadeUpMedium 0.5s var(--ease-spring) 5.8s both; }
    .p2 { animation: fadeUpMedium 0.5s var(--ease-spring) 7.6s both; }
    .p3 { animation: fadeUpMedium 0.5s var(--ease-spring) 9.8s both; }
  `,
  '17-spalvos': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 7.8s forwards; }
    .rip1 { animation: ratilasGS 0.6s ease-out 10.6s forwards; }
    .rip2 { animation: ratilasGS 0.6s ease-out 12.8s forwards; }
    .cursor-wrap { animation: k_17_spalvos 16s linear 0s both; }
    @keyframes k_17_spalvos { 0% { transform: translate(330px, -41px); } 0.000% { transform: translate(330px, -41px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 41.250% { transform: translate(330px, -41px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 47.500% { transform: translate(-388px, -236px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 49.375% { transform: translate(-388px, -236px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 56.250% { transform: translate(980px, -197px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 60.000% { transform: translate(980px, -197px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 65.000% { transform: translate(-170px, -525px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 71.250% { transform: translate(-170px, -525px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 76.875% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .left1 { animation: v_17_spalvos_5 16s linear 0s both; }
    @keyframes v_17_spalvos_5 { 0%, 9.994% { opacity: 0; } 11.562% { opacity: 1; } 47.500% { opacity: 1; } 48.750%, 100% { opacity: 0; } }
    .selbox { animation: v_17_spalvos_7 16s linear 0s both; }
    @keyframes v_17_spalvos_7 { 0%, 49.056% { opacity: 0; } 50.625% { opacity: 1; } 81.250% { opacity: 1; } 82.500%, 100% { opacity: 0; } }
    .selbox { transform-origin: top left; }
    .fmt { animation: v_17_spalvos_10 16s linear 0s both; }
    @keyframes v_17_spalvos_10 { 0%, 67.181% { opacity: 0; } 68.750% { opacity: 1; } 80.625% { opacity: 1; } 81.875%, 100% { opacity: 0; } }
    .fmt .f16 { animation: hl_17_spalvos 16s steps(1,end) 0s both; }
    @keyframes hl_17_spalvos { 0%, 76.875% { background: transparent; } 76.938%, 100% { background: #e8eaed; } }
    .grid-bad { animation: v_17_spalvos_14 16s linear 0s both; }
    @keyframes v_17_spalvos_14 { 0%, 0.000% { opacity: 0; } 1.562% { opacity: 1; } 81.250% { opacity: 1; } 82.500%, 100% { opacity: 0; } }
    .stage { transform-origin: 35% 40%; animation: z_17_spalvos 16s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_17_spalvos { 0%, 5.000% { transform: scale(1); } 11.875% { transform: scale(1.18); } 42.500% { transform: scale(1.18); } 49.375%, 100% { transform: scale(1); } }
  `,
  '18-th-spalva': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 5.2s forwards; }
    .rip1 { animation: ratilasGS 0.6s ease-out 6.6s forwards; }
    .rip2 { animation: ratilasGS 0.6s ease-out 7.8s forwards; }
    .rip3 { animation: ratilasGS 0.6s ease-out 10.2s forwards; }
    .rip4 { animation: ratilasGS 0.6s ease-out 11.4s forwards; }
    .cursor-wrap { animation: k_18_th_spalva 17s linear 0s both; }
    @keyframes k_18_th_spalva { 0% { transform: translate(-406px, -171px); } 0.000% { transform: translate(-406px, -171px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 25.294% { transform: translate(-406px, -171px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 30.000% { transform: translate(-1224px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 32.941% { transform: translate(-1224px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 38.235% { transform: translate(-967px, -596px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 40.588% { transform: translate(-967px, -596px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 45.294% { transform: translate(-856px, -447px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 49.412% { transform: translate(-856px, -447px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 59.412% { transform: translate(-1319px, -596px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 61.765% { transform: translate(-1319px, -596px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 66.471% { transform: translate(-939px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 67.647% { transform: translate(-939px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 75.294% { transform: translate(-30px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .gs-row.th.nocolor > span:nth-child(3) { animation: thB_18_th_spalva 17s steps(1,end) 0s both; }
    @keyframes thB_18_th_spalva { 0%, 48.824% { background: #fff; color: var(--gs-cell-text); font-weight: 400; } 48.882%, 100% { background: var(--gs-green-th-b); color: #fff; font-weight: 700; } }
    .gs-row.th.nocolor > span:nth-child(4) { animation: thCE_18_th_spalva 17s steps(1,end) 0s both; }
    .gs-row.th.nocolor > span:nth-child(5) { animation: thCE_18_th_spalva 17s steps(1,end) 0s both; }
    .gs-row.th.nocolor > span:nth-child(6) { animation: thCE_18_th_spalva 17s steps(1,end) 0s both; }
    @keyframes thCE_18_th_spalva { 0%, 76.471% { background: #fff; color: var(--gs-cell-text); font-weight: 400; } 76.529%, 100% { background: var(--gs-green-th); color: #fff; font-weight: 700; } }
    .r13 { animation: v_18_th_spalva_13 17s linear 0s both; }
    @keyframes v_18_th_spalva_13 { 0%, 7.053% { opacity: 0; } 8.529% { opacity: 1; } 27.059% { opacity: 1; } 28.235%, 100% { opacity: 0; } }
    .selb { animation: v_18_th_spalva_15 17s linear 0s both; }
    @keyframes v_18_th_spalva_15 { 0%, 30.876% { opacity: 0; } 32.353% { opacity: 1; } 60.000% { opacity: 1; } 61.176%, 100% { opacity: 0; } }
    .pal { animation: v_18_th_spalva_17 17s linear 0s both; }
    @keyframes v_18_th_spalva_17 { 0%, 39.700% { opacity: 0; } 41.176% { opacity: 1; } 48.824% { opacity: 1; } 50.000%, 100% { opacity: 0; } }
    .bucket { animation: bk_18_th_spalva 17s steps(1,end) 0s both; }
    @keyframes bk_18_th_spalva { 0%, 38.824% { background: var(--gs-toolbar); } 38.882%, 48.824% { background: #c2e7ff; } 48.882%, 100% { background: var(--gs-toolbar); } }
    .antb { animation: v_18_th_spalva_21 17s linear 0s both; }
    @keyframes v_18_th_spalva_21 { 0%, 60.288% { opacity: 0; } 61.765% { opacity: 1; } 76.471% { opacity: 1; } 77.647%, 100% { opacity: 0; } }
    .roller { animation: rolGS_18_th_spalva 17s steps(1,end) 0s both; }
    @keyframes rolGS_18_th_spalva { 0%, 60.000% { background: var(--gs-toolbar); } 60.059%, 76.471% { background: #c2e7ff; } 76.529%, 100% { background: var(--gs-toolbar); } }
    .selce { animation: v_18_th_spalva_25 17s linear 0s both; }
    @keyframes v_18_th_spalva_25 { 0%, 67.347% { opacity: 0; } 68.824% { opacity: 1; } 76.471% { opacity: 1; } 77.647%, 100% { opacity: 0; } }
    .stage { transform-origin: 0% 45%; animation: z_18_th_spalva 17s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_18_th_spalva { 0%, 3.529% { transform: scale(1); } 10.000% { transform: scale(1.12); } 82.353% { transform: scale(1.12); } 88.824%, 100% { transform: scale(1); } }
  `,
  '19-versijos': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 5.8s forwards; }
    .rip1 { animation: ratilasGS 0.6s ease-out 17.0s forwards; }
    .rip2 { animation: ratilasGS 0.6s ease-out 22.0s forwards; }
    .cursor-wrap { animation: k_19_versijos 35s linear 0s both; }
    @keyframes k_19_versijos { 0% { transform: translate(700px, 434px); } 0.000% { transform: translate(700px, 434px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 14.286% { transform: translate(700px, 434px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 16.286% { transform: translate(-80px, -68px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 18.286% { transform: translate(-80px, -68px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 46.286% { transform: translate(1160px, 304px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 49.143% { transform: translate(1160px, 304px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 60.571% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 63.429% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .vpath { animation: v_19_versijos_5 35s linear 0s both; }
    @keyframes v_19_versijos_5 { 0%, 3.997% { opacity: 0; } 4.714% { opacity: 1; } 32.571% { opacity: 1; } 33.143%, 100% { opacity: 0; } }
    .vpanel { animation: v_19_versijos_7 35s linear 0s both; }
    @keyframes v_19_versijos_7 { 0%, 33.140% { opacity: 0; } 33.857% { opacity: 1; } 100% { opacity: 1; } }
    .vbtn { animation: v_19_versijos_9 35s linear 0s both; }
    @keyframes v_19_versijos_9 { 0%, 58.854% { opacity: 0; } 59.571% { opacity: 1; } 100% { opacity: 1; } }
    .gs-toolbar { animation: v_19_versijos_11 35s linear 0s both; }
    @keyframes v_19_versijos_11 { 0%, 0.000% { opacity: 0; } 0.714% { opacity: 1; } 58.571% { opacity: 1; } 59.143%, 100% { opacity: 0; } }
    .vsafe { animation: v_19_versijos_13 35s linear 0s both; }
    @keyframes v_19_versijos_13 { 0%, 74.283% { opacity: 0; } 75.000% { opacity: 1; } 100% { opacity: 1; } }
    .vsafe .vcell { animation: v_19_versijos_15 35s linear 0s both; }
    @keyframes v_19_versijos_15 { 0%, 87.140% { opacity: 0; } 87.857% { opacity: 1; } 100% { opacity: 1; } }
    .vit.pick { animation: iconPulse 0.6s ease-in-out 17.0s both; }
  `,
  '20-nebijokite': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .keys { animation: fadeUpMedium 0.6s var(--ease-spring) 1.0s both; }
    .helpbox { animation: v_20_nebijokite_1 12s linear 0s both; }
    @keyframes v_20_nebijokite_1 { 0%, 48.325% { opacity: 0; } 50.417% { opacity: 1; } 100% { opacity: 1; } }
  `,
  // <<< GS-PRADZIAMOKSLIS

  // ===== „Kur spausti“: dokumento tempimas į viršų (bandomoji scena, 2026-09-17) =====
  // Pagrindinis stilius = galutinė būsena (§14). Laiko žymos garsams: paėmimas 3.6, numetimas 6.0,
  // spustelėjimas 8.2, patvirtinimas (juosta) 8.8.
  '03-tempiate-i-virsu': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    /* Kamera: priartėja prie lentelės, pasislenka iki mygtuko, atsitraukia */
    .stage { animation: kamera 11.2s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes kamera {
      0%, 8%   { transform: scale(1) translate(0, 0); }
      19%      { transform: scale(1.32) translate(0, 0); }
      58%      { transform: scale(1.32) translate(0, 0); }
      68%      { transform: scale(1.32) translate(0, -46px); }
      76%      { transform: scale(1.32) translate(0, -46px); }
      82%      { transform: scale(1.32) translate(0, 40px); }
      90%      { transform: scale(1.32) translate(0, 40px); }
      97%, 100% { transform: scale(1) translate(0, 0); }
    }

    /* Nauja eilutė: iš apačios į viršų, pakelta tempiant */
    .rows .row-new { animation: naujaKyla 6.0s linear 0s both; }
    @keyframes naujaKyla {
      0%, 60%  { transform: translateY(252px) scale(1); box-shadow: none; }
      63.3%    { transform: translateY(252px) scale(1.012); box-shadow: 0 18px 40px rgba(30,40,70,.24);
                 animation-timing-function: cubic-bezier(.45,0,.55,1); }
      96.7%    { transform: translateY(0) scale(1.012); box-shadow: 0 18px 40px rgba(30,40,70,.24); }
      100%     { transform: translateY(0) scale(1); box-shadow: none; }
    }
    .rows .row-new .tvs-handle { animation: rankenaUzvesta 6.2s linear 0s both; }
    @keyframes rankenaUzvesta {
      0%, 51%  { color: var(--tvs-text); }
      52%, 96% { color: var(--tvs-info); }
      100%     { color: var(--tvs-text); }
    }

    /* Kitos eilutės pasislenka žemyn, kai tempiama eilutė pro jas praeina */
    .rows .row-3 { animation: eiluteNusileidzia 0.32s var(--ease-soft) 4.35s both; }
    .rows .row-2 { animation: eiluteNusileidzia 0.32s var(--ease-soft) 4.85s both; }
    .rows .row-1 { animation: eiluteNusileidzia 0.32s var(--ease-soft) 5.35s both; }
    @keyframes eiluteNusileidzia { from { transform: translateY(-84px); } to { transform: translateY(0); } }

    /* Mygtukas „Perrikiuoti“: įsijungia numetus, paspaudžiamas, po išsaugojimo vėl neaktyvus */
    .tvs-foot .reorder { animation: perrikiuoti 9.0s linear 0s both; }
    @keyframes perrikiuoti {
      0%, 66.6% { opacity: .5; transform: scale(1); }
      68%       { opacity: 1; transform: scale(1.06); }
      70.5%     { opacity: 1; transform: scale(1); }
      88.5%     { opacity: 1; transform: scale(1); filter: brightness(1); }
      90%       { opacity: 1; transform: scale(1); filter: brightness(.92); }
      91.1%     { opacity: 1; transform: scale(.95); filter: brightness(.9); }
      93%       { opacity: 1; transform: scale(1); filter: brightness(1); }
      97.8%     { opacity: 1; }
      100%      { opacity: .5; }
    }
    /* Po paspaudimo puslapis persikrauna: trumpas blyksnis, viršuje atsiranda žalia pranešimo juosta
       (TVS .alert-success, tekstas iš branduolio vertimo „:count eil. perrikiuotos sėkmingai“) */
    .tvs-main { animation: persikrauna 0.4s ease-in-out 8.45s both; }
    @keyframes persikrauna { 0% { opacity: 1; } 45% { opacity: .35; } 100% { opacity: 1; } }
    .tvs-main .tvs-alert { animation: juostaAtsiranda 0.45s var(--ease-spring) 8.75s both; }
    @keyframes juostaAtsiranda {
      from { max-height: 0; padding-top: 0; padding-bottom: 0; margin-bottom: -22px; opacity: 0; }
      to   { max-height: 80px; padding-top: 16px; padding-bottom: 16px; margin-bottom: 0; opacity: 1; }
    }

    /* Spustelėjimo ratilas */
    .click-ripple { animation: ratilas 0.6s ease-out 8.2s both; }
    @keyframes ratilas {
      from { opacity: .7; transform: scale(.3); }
      to   { opacity: 0;  transform: scale(1.5); }
    }

    /* Kursorius: ateina, užveda rankenėlę, paima, tempia, numeta, nueina prie mygtuko */
    .cursor-wrap { animation: kursoriausKelias 7.0s linear 1.8s both; }
    @keyframes kursoriausKelias {
      0%     { transform: translate(1150px, 300px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      20%    { transform: translate(-65px, -84px); }
      28.6%  { transform: translate(-65px, -84px); animation-timing-function: cubic-bezier(.45,0,.55,1); }
      57.1%  { transform: translate(-65px, -336px); }
      65.7%  { transform: translate(-65px, -336px); animation-timing-function: cubic-bezier(.3,.1,.25,1); }
      75%    { transform: translate(40px, -200px); animation-timing-function: cubic-bezier(.3,0,.2,1); }
      85.7%  { transform: translate(0, 0); }
      100%   { transform: translate(0, 0); }
    }
    .cursor-wrap .c-arrow { animation: rodykle 7.0s steps(1, end) 1.8s both; }
    .cursor-wrap .c-grab  { animation: ranka   7.0s steps(1, end) 1.8s both; }
    @keyframes rodykle { 0% { opacity: 1; } 25.7% { opacity: 0; } 60% { opacity: 1; } 100% { opacity: 1; } }
    @keyframes ranka   { 0% { opacity: 0; } 25.7% { opacity: 1; } 60% { opacity: 0; } 100% { opacity: 0; } }
  `,

  // ===== navigacijos-nuoseklumas (Eimantas 2026-09-16: juokeliai ir procesai turi judėti) =====

  // Dviaukštis meniu gimsta: septintas punktas atvažiuoja, atsitrenkia į juostą ir nukrenta į antrą aukštą
  '04-du-aukstai': `
    .card > .title, .card > .stack, .card > .mark { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .stack { animation: fadeUpMedium 0.5s var(--ease-spring) 0.9s forwards; }
    .floor2 { overflow: visible; animation: aukstasGimsta 0.6s var(--ease-spring) 3.0s both; }
    .floor2 .it { animation: punktasAtvaziuoja 1.6s var(--ease-soft) 1.6s both; }
    .nav.top { animation: juostaSusvyra 0.5s ease-out 2.45s both; }
    .card > .mark { animation: fadeUpLight 0.4s var(--ease-spring) 3.9s forwards; }
    @keyframes aukstasGimsta {
      from { background-color: transparent; border-top-color: transparent; }
      to   { background-color: #3b4250; border-top-color: rgba(255,255,255,.22); }
    }
    @keyframes punktasAtvaziuoja {
      0%   { transform: translate(1400px, -104px); }
      55%  { transform: translate(30px, -104px); }
      64%  { transform: translate(0, -104px); }
      100% { transform: translate(0, 0); }
    }
    @keyframes juostaSusvyra {
      0% { transform: translateX(0); } 35% { transform: translateX(-12px); }
      70% { transform: translateX(6px); } 100% { transform: translateX(0); }
    }
  `,

  // Reguliacinis vėjas: senos lentelės nukrenta, naujos užkabinamos, slapukų burbulas iššoka
  '05-reguliacinis-vejas': `
    .card > .title, .card > .doors, .card > .bubble { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .doors { animation: fadeUpMedium 0.5s var(--ease-spring) 0.8s forwards; }
    .slot .falling { animation: lentelesKrenta 1.0s cubic-bezier(.55,0,.85,.35) 2.4s both; }
    .slot:nth-child(2) .falling { animation-delay: 2.9s; }
    .slot:nth-child(3) .falling { animation-delay: 3.4s; }
    .slot .newplate { animation: lenteleKabinama 0.6s var(--ease-spring) 3.8s both; }
    .slot:nth-child(2) .newplate { animation-delay: 4.25s; }
    .slot:nth-child(3) .newplate { animation-delay: 4.7s; }
    .card > .bubble { transform-origin: 0% 100%; animation: burbulasIssoka 0.8s var(--ease-soft) 6.2s both; }
    @keyframes lentelesKrenta {
      from { transform: translate(-50%, -250px) rotate(0deg); opacity: 1; color: var(--c-text); }
    }
    @keyframes lenteleKabinama {
      from { opacity: 0; transform: translateY(-46px) rotate(-5deg); }
      to   { opacity: 1; transform: translateY(0) rotate(0); }
    }
    @keyframes burbulasIssoka {
      0%   { opacity: 0; transform: scale(.5) rotate(-6deg); }
      55%  { opacity: 1; transform: scale(1.08) rotate(3deg); }
      78%  { transform: scale(.97) rotate(-1.5deg); }
      100% { opacity: 1; transform: scale(1) rotate(0); }
    }
  `,

  // Stendas: žvilgsnio kelias nubrėžiamas, puslapis nuslenka iki poraštės, stulpelis užsidega
  '09-porastes-informacija': `
    .card > .title, .card > .viewport { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .viewport { animation: fadeUpMedium 0.5s var(--ease-spring) 0.8s forwards; }
    .zpath path { stroke-dasharray: 100; animation: zBreziamas 2.6s var(--ease-soft) 1.4s both; }
    .page { animation: puslapisSlenka 3.2s var(--ease-soft) 4.4s both; }
    .fcol.on { animation: stulpelisUzsidega 0.7s var(--ease-spring) 7.8s both; }
    .fcol.on .fh { animation: fadeIn 0.4s ease 7.9s both; }
    @keyframes zBreziamas { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
    @keyframes puslapisSlenka {
      from { transform: translateY(calc(100% - 680px)); }
      to   { transform: translateY(0); }
    }
    @keyframes stulpelisUzsidega {
      0%   { border-color: transparent; background: transparent; transform: scale(1); }
      60%  { transform: scale(1.03); }
      100% { transform: scale(1); }
    }
  `,

  // Šunelis: atbėga su nuoroda, padeda ją ant laiško, pavizgina uodegą
  '10-neranda': `
    .card > .title, .card > .row { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .row { animation: fadeIn 0.01s linear 0.8s forwards; }
    .row .mail { animation: fadeUpMedium 0.5s var(--ease-spring) 0.9s both; }
    .row .search { animation: fadeUpLight 0.4s var(--ease-spring) 1.7s both; }
    .row .tree { animation: fadeUpLight 0.4s var(--ease-spring) 2.1s both; }
    .row .dog { animation: suoAtbega 1.4s linear 3.0s both; }
    .dog svg .tag { animation: nuorodaAtiduodama 5.2s linear 3.0s both; }
    .mail .mchip { animation: nuorodaPristatyta 0.6s var(--ease-spring) 7.8s both; }
    .dog svg .tail { transform-box: fill-box; transform-origin: 0% 100%;
                     animation: uodegaVizgina 0.3s ease-in-out 8.4s 8 alternate both; }
    @keyframes suoAtbega {
      0%   { transform: translate(900px, 0); }
      20%  { transform: translate(720px, -20px); }
      40%  { transform: translate(540px, 0); }
      60%  { transform: translate(360px, -20px); }
      80%  { transform: translate(160px, 0); }
      92%  { transform: translate(40px, -8px); }
      100% { transform: translate(0, 0); }
    }
    @keyframes nuorodaAtiduodama { 0%, 85% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes nuorodaPristatyta {
      from { opacity: 0; transform: translateX(260px) scale(.6) rotate(8deg); }
      to   { opacity: 1; transform: translateX(0) scale(1) rotate(0); }
    }
    @keyframes uodegaVizgina { from { transform: rotate(-14deg); } to { transform: rotate(16deg); } }
  `,

  // ============================================================
  // Slapukų atitiktis — ANIMATION_PRINCIPLES.md seka
  // Scena: kortelė + watermark matomi nuo pradžių. Aktoriai: title → lead → turinys → foot
  // ============================================================

  // Viršelis: klausimas atsiranda pirmas, atsakymo teiginiai — po vieną
  '00-virselis': `
    .card > .title, .card > .lead, .card > .cols, .card > .foot { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .lead  { animation: fadeUpLight 0.4s var(--ease-spring) 0.35s forwards; }
    .card > .cols  { animation: fadeIn 0.01s linear 0.99s forwards; }

    .cols > .col { opacity: 0; }
    .cols > .col:nth-child(1) { animation: slinktisIsKaires 0.55s var(--ease-spring) 1.0s forwards; }
    .cols > .col:nth-child(2) { animation: issiskleidzia 0.55s var(--ease-spring) 1.9s forwards; }

    .col .zenklas, .col .kl-txt, .col .ats-item { opacity: 0; }
    .kl .zenklas  { animation: fadeUpLight 0.35s var(--ease-spring) 1.25s forwards; }
    .kl .kl-txt   { animation: fadeUpLight 0.35s var(--ease-spring) 1.45s forwards; }
    .col-do .zenklas { animation: fadeUpLight 0.35s var(--ease-spring) 2.15s forwards; }
    .col-do .ats-item:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 2.4s forwards; }
    .col-do .ats-item:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 2.6s forwards; }
    .col-do .ats-item:nth-child(4) { animation: fadeUpLight 0.35s var(--ease-spring) 2.8s forwards; }

    .card > .foot { animation: fadeUpMedium 0.5s var(--ease-spring) 3.9s forwards; }
    .card > .brand-bar { opacity: 0 !important; }
  `,

  // Grandinė: trys žingsniai su rodyklėmis tarp jų
  '01-is-kur-ateina-klausimas': `
    .card > .title, .card > .steps, .card > .foot { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .steps { animation: fadeIn 0.01s linear 0.69s forwards; }

    .steps > .step, .steps > .arrow { opacity: 0; }
    .steps > .step:nth-child(1) { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.7s forwards; }
    .steps > .step:nth-child(1) .step-num { animation: iconPulse 0.5s var(--ease-soft) 1.2s forwards; }
    .steps > .arrow:nth-child(2)  { animation: rodyklePiesiama 0.45s var(--ease-spring) 1.35s forwards; }
    .steps > .step:nth-child(3) { animation: slinktisIsKaires 0.5s var(--ease-spring) 1.8s forwards; }
    .steps > .step:nth-child(3) .step-num { animation: iconPulse 0.5s var(--ease-soft) 2.3s forwards; }
    .steps > .arrow:nth-child(4)  { animation: rodyklePiesiama 0.45s var(--ease-spring) 2.45s forwards; }
    .steps > .step:nth-child(5) { animation: slinktisIsKaires 0.5s var(--ease-spring) 2.9s forwards; }
    .steps > .step:nth-child(5) .step-num { animation: iconPulse 0.5s var(--ease-soft) 3.4s forwards; }

    .card > .foot { animation: fadeUpMedium 0.5s var(--ease-spring) 3.9s forwards; }
    .card > .brand-bar { opacity: 0 !important; }
  `,

  // Tas pats žingsnių karkasas
  '07-vienas-taisymas': `
    .card > .title, .card > .steps, .card > .foot { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .steps { animation: fadeIn 0.01s linear 0.69s forwards; }

    .steps > .step, .steps > .arrow { opacity: 0; }
    .steps > .step:nth-child(1) { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.7s forwards; }
    .steps > .step:nth-child(1) .step-num { animation: iconPulse 0.5s var(--ease-soft) 1.2s forwards; }
    .steps > .arrow:nth-child(2)  { animation: rodyklePiesiama 0.45s var(--ease-spring) 1.35s forwards; }
    .steps > .step:nth-child(3) { animation: slinktisIsKaires 0.5s var(--ease-spring) 1.8s forwards; }
    .steps > .step:nth-child(3) .step-num { animation: iconPulse 0.5s var(--ease-soft) 2.3s forwards; }
    .steps > .arrow:nth-child(4)  { animation: rodyklePiesiama 0.45s var(--ease-spring) 2.45s forwards; }
    .steps > .step:nth-child(5) { animation: slinktisIsKaires 0.5s var(--ease-spring) 2.9s forwards; }
    .steps > .step:nth-child(5) .step-num { animation: iconPulse 0.5s var(--ease-soft) 3.4s forwards; }

    .card > .foot { animation: fadeUpMedium 0.5s var(--ease-spring) 3.9s forwards; }
    .card > .brand-bar { opacity: 0 !important; }
  `,

  // Modulis → svetainės: šaltinis pirmas, tada rodyklė, tada svetainės po vieną
  '02-tas-pats-modulis': `
    .card > .title, .card > .srautas, .card > .foot { opacity: 0; }
    .card > .title   { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .srautas { animation: fadeIn 0.01s linear 0.69s forwards; }

    .srautas > .core, .srautas > .arrow, .sites > .site { opacity: 0; }
    .srautas > .core  { animation: slinktisIsKaires 0.55s var(--ease-spring) 0.7s forwards; }
    .srautas > .arrow { animation: rodyklePiesiama 0.45s var(--ease-spring) 1.45s forwards; }

    .sites > .site:nth-child(1) { animation: slinktisIsDesines 0.4s var(--ease-spring) 1.95s forwards; }
    .sites > .site:nth-child(2) { animation: slinktisIsDesines 0.4s var(--ease-spring) 2.12s forwards; }
    .sites > .site:nth-child(3) { animation: slinktisIsDesines 0.4s var(--ease-spring) 2.29s forwards; }
    .sites > .site:nth-child(4) { animation: slinktisIsDesines 0.4s var(--ease-spring) 2.5s forwards; }
    .sites > .site:nth-child(5) { animation: slinktisIsDesines 0.4s var(--ease-spring) 2.67s forwards; }
    .sites > .site:nth-child(6) { animation: slinktisIsDesines 0.4s var(--ease-spring) 2.84s forwards; }

    .card > .foot { animation: fadeUpMedium 0.5s var(--ease-spring) 3.9s forwards; }
    .card > .brand-bar { opacity: 0 !important; }
  `,

  // Poraštė: pirma visa poraštė, tada žiedas, paskiausiai rodyklė — akis vedama
  '03-kur-rasti-nuoroda': `
    .card > .title, .card > .lead, .card > .fm, .card > .foot { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .lead  { animation: fadeUpLight 0.4s var(--ease-spring) 0.35s forwards; }
    .card > .fm    { animation: issiskleidzia 0.6s var(--ease-spring) 1.0s forwards; }

    .fm .fm-target { border-color: transparent; }
    .fm .fm-target {
      animation: ziedasRyskeja 0.6s var(--ease-spring) 2.3s forwards;
    }
    .fm .fm-arrow { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 2.9s forwards; }

    .card > .foot { animation: fadeUpMedium 0.5s var(--ease-spring) 3.9s forwards; }
    .card > .brand-bar { opacity: 0 !important; }
  `,

  // Palyginimas: klaida kairėje, tada teisinga dešinėje, vidus po vieną
  '04-pirma-karta-nepazymeta': `
    .card > .title, .card > .lead, .card > .cols, .card > .foot { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .lead  { animation: fadeUpLight 0.4s var(--ease-spring) 0.35s forwards; }
    .card > .cols  { animation: fadeIn 0.01s linear 0.99s forwards; }

    .cols > .col { opacity: 0; }
    .cols > .col:nth-child(1) { animation: slinktisIsKaires 0.55s var(--ease-spring) 1.0s forwards; }
    .cols > .col:nth-child(2) { animation: slinktisIsDesines 0.55s var(--ease-spring) 2.2s forwards; }

    .col .col-icon { animation: iconPulse 0.5s var(--ease-soft) 1.5s forwards; }
    .col-do .col-icon { animation: iconPulse 0.5s var(--ease-soft) 2.6s forwards; }

    .col .eil, .col .klaus { opacity: 0; }
    .col-dont .eil:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 1.45s forwards; }
    .col-dont .eil:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 1.65s forwards; }
    .col-do .klaus              { animation: fadeUpLight 0.35s var(--ease-spring) 2.55s forwards; }
    .col-do .eil:nth-child(2)   { animation: fadeUpLight 0.35s var(--ease-spring) 2.8s forwards; }
    .col-do .eil:nth-child(3)   { animation: fadeUpLight 0.35s var(--ease-spring) 3.0s forwards; }

    .card > .foot { animation: fadeUpMedium 0.5s var(--ease-spring) 4.0s forwards; }
    .card > .brand-bar { opacity: 0 !important; }
  `,

  // Mygtukai: klaida, tada tikra juosta, žiedas apie porą paskutinis
  '05-mygtukai-vienodi': `
    .card > .title, .card > .lead, .card > .cols, .card > .foot { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .lead  { animation: fadeUpLight 0.4s var(--ease-spring) 0.35s forwards; }
    .card > .cols  { animation: fadeIn 0.01s linear 0.99s forwards; }

    .cols > .col { opacity: 0; }
    .cols > .col:nth-child(1) { animation: slinktisIsKaires 0.55s var(--ease-spring) 1.0s forwards; }
    .cols > .col:nth-child(2) { animation: slinktisIsDesines 0.55s var(--ease-spring) 2.2s forwards; }

    .col-dont .col-icon { animation: iconPulse 0.5s var(--ease-soft) 1.5s forwards; }
    .col-do .col-icon   { animation: iconPulse 0.5s var(--ease-soft) 2.6s forwards; }

    .juosta > .mb, .juosta > .pora, .juosta > .m-yes, .juosta > .m-no { opacity: 0; }
    .col-dont .juosta > .m-yes { animation: fadeUpLight 0.35s var(--ease-spring) 1.45s forwards; }
    .col-dont .juosta > .m-no  { animation: fadeUpLight 0.35s var(--ease-spring) 1.65s forwards; }
    .col-do .juosta > .mb      { animation: fadeUpLight 0.35s var(--ease-spring) 2.55s forwards; }
    .col-do .juosta > .pora    { animation: fadeUpLight 0.35s var(--ease-spring) 2.75s forwards; }

    .col-do .pora { border-color: transparent; }
    .col-do .pora { animation: fadeUpLight 0.35s var(--ease-spring) 2.75s forwards,
                               ziedasZalias 0.6s var(--ease-spring) 3.4s forwards; }

    .card > .foot { animation: fadeUpMedium 0.5s var(--ease-spring) 4.2s forwards; }
    .card > .brand-bar { opacity: 0 !important; }
  `,

  // Lentelė: antraštė, tada eilutės po vieną — kaip skaitymas
  '06-ka-renka': `
    .card > .title, .card > .lead, .card > .lent, .card > .foot { opacity: 0; }
    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .card > .lead  { animation: fadeUpLight 0.4s var(--ease-spring) 0.35s forwards; }
    .card > .lent  { animation: fadeIn 0.01s linear 0.99s forwards; }

    .lent > .eil { opacity: 0; }
    .lent > .eil:nth-child(1) { animation: fadeUpMedium 0.5s var(--ease-spring) 1.0s forwards; }
    .lent > .eil:nth-child(2) { animation: slinktisIsKaires 0.45s var(--ease-spring) 1.75s forwards; }
    .lent > .eil:nth-child(3) { animation: slinktisIsKaires 0.45s var(--ease-spring) 2.45s forwards; }
    .lent > .eil:nth-child(4) { animation: slinktisIsKaires 0.45s var(--ease-spring) 3.15s forwards; }

    .card > .foot { animation: fadeUpMedium 0.5s var(--ease-spring) 4.0s forwards; }
    .card > .brand-bar { opacity: 0 !important; }
  `,


  // ============================================================
  // 00: Comparison — senoji vs naujoji tvarka
  // Sequence: title → left column + steps → arrow → right column + steps → summary
  // ============================================================
  '00-kodel-tai-naudinga': `
    .card > .title,
    .card > .comparison,
    .card > .summary,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy, 0.6s) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.3s — Left column container (medium, 0.5s) */
    .column-old {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.3s forwards;
    }

    /* 1.3s — Comparison container instant reveal */
    .card > .comparison {
      animation: fadeIn 0.01s linear 1.29s forwards;
    }

    /* Left column header icon pulse */
    .column-old .column-icon {
      animation: iconPulse 0.5s var(--ease-soft) 1.8s forwards;
    }

    /* 1.6-2.2s — Left steps sequential (light, 0.35s, 0.2s gaps) */
    .column-old .step { opacity: 0; }
    .column-old .step:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 1.6s forwards; }
    .column-old .step:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 1.8s forwards; }
    .column-old .step:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 2.0s forwards; }
    .column-old .step:nth-child(4) { animation: fadeUpLight 0.35s var(--ease-spring) 2.2s forwards; }

    /* 2.6s — Divider arrow (fade, 0.3s) */
    .divider {
      opacity: 0;
      animation: fadeIn 0.3s var(--ease-soft) 2.6s forwards;
    }

    /* 2.9s — Right column (medium, 0.5s) */
    .column-new {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 2.9s forwards;
    }

    .column-new .column-icon {
      animation: iconPulse 0.5s var(--ease-soft) 3.4s forwards;
    }

    /* 3.2-3.4s — Right steps (light, 0.35s) */
    .column-new .step { opacity: 0; }
    .column-new .step:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 3.2s forwards; }
    .column-new .step:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 3.4s forwards; }

    /* 4.2s — Summary (medium, 0.5s) */
    .card > .summary {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.2s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 01: Workflow — redaguojate → sinchronizuojama → atvaizduojama
  // Sequence: title → step1 → arrow1 → step2 → arrow2 → step3
  // ============================================================
  '01-sheets-tvs-svetaine': `
    .card > .title,
    .card > .workflow,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.2s — Workflow container instant */
    .card > .workflow {
      animation: fadeIn 0.01s linear 1.19s forwards;
    }

    /* Steps and arrows — all hidden initially */
    .workflow > .step,
    .workflow > .arrow-container { opacity: 0; }

    /* 1.2s — Step 1 (medium) + icon pulse */
    .workflow > .step:nth-child(1) {
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.2s forwards;
    }
    .workflow > .step:nth-child(1) .step-icon {
      animation: iconPulse 0.5s var(--ease-soft) 1.7s forwards;
    }

    /* 1.8s — Arrow 1 (fade) */
    .workflow > .arrow-container:nth-child(2) {
      animation: fadeIn 0.3s var(--ease-soft) 1.8s forwards;
    }

    /* 2.2s — Step 2 (medium) + icon pulse */
    .workflow > .step:nth-child(3) {
      animation: fadeUpMedium 0.5s var(--ease-spring) 2.2s forwards;
    }
    .workflow > .step:nth-child(3) .step-icon {
      animation: iconPulse 0.5s var(--ease-soft) 2.7s forwards;
    }

    /* 2.8s — Arrow 2 (fade) */
    .workflow > .arrow-container:nth-child(4) {
      animation: fadeIn 0.3s var(--ease-soft) 2.8s forwards;
    }

    /* 3.2s — Step 3 (medium) + icon pulse */
    .workflow > .step:nth-child(5) {
      animation: fadeUpMedium 0.5s var(--ease-spring) 3.2s forwards;
    }
    .workflow > .step:nth-child(5) .step-icon {
      animation: iconPulse 0.5s var(--ease-soft) 3.7s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 02: URL anatomy — file mockup → URL bar → gID mappings
  // Sequence: title → file section → URL section → gID section with mappings
  // ============================================================
  '02-failo-url-anatomija': `
    .card > .title,
    .card > .file-section,
    .card > .url-section,
    .card > .gid-section,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.2s — File section (medium) */
    .card > .file-section {
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.2s forwards;
    }

    /* 2.0s — URL section (medium) */
    .card > .url-section {
      animation: fadeUpMedium 0.5s var(--ease-spring) 2.0s forwards;
    }

    /* 2.8s — gID section container */
    .card > .gid-section {
      animation: fadeIn 0.01s linear 2.79s forwards;
    }

    /* 2.8s — gID explain (light) */
    .gid-explain {
      opacity: 0;
      animation: fadeUpLight 0.35s var(--ease-spring) 2.8s forwards;
    }

    /* 3.1-3.7s — gID mappings sequential (light, 0.2s gaps) */
    .gid-mapping { opacity: 0; }
    .gid-mapping:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 3.1s forwards; }
    .gid-mapping:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 3.3s forwards; }
    .gid-mapping:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 3.5s forwards; }
    .gid-mapping:nth-child(4) { animation: fadeUpLight 0.35s var(--ease-spring) 3.7s forwards; }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 03: Steps — 4 vertical steps with connector lines
  // Sequence: title → step1 → step2 → step3 → step4
  // ============================================================
  '03-kopija-pavadinimas-formatas': `
    .card > .title,
    .card > .steps,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.2s — Steps container instant */
    .card > .steps {
      animation: fadeIn 0.01s linear 1.19s forwards;
    }

    /* 1.2-2.7s — Steps sequential (medium spacing for reading) */
    .steps > .step { opacity: 0; }
    .steps > .step:nth-child(1) { animation: fadeUpMedium 0.5s var(--ease-spring) 1.2s forwards; }
    .steps > .step:nth-child(2) { animation: fadeUpMedium 0.5s var(--ease-spring) 1.9s forwards; }
    .steps > .step:nth-child(3) { animation: fadeUpMedium 0.5s var(--ease-spring) 2.6s forwards; }
    .steps > .step:nth-child(4) { animation: fadeUpMedium 0.5s var(--ease-spring) 3.3s forwards; }

    /* Step number pulse on appear */
    .step:nth-child(1) .step-num { animation: iconPulse 0.5s var(--ease-soft) 1.7s forwards; }
    .step:nth-child(2) .step-num { animation: iconPulse 0.5s var(--ease-soft) 2.4s forwards; }
    .step:nth-child(3) .step-num { animation: iconPulse 0.5s var(--ease-soft) 3.1s forwards; }
    .step:nth-child(4) .step-num { animation: iconPulse 0.5s var(--ease-soft) 3.8s forwards; }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 04: Dialog mockup — dialog → step annotations → warning
  // Sequence: title → dialog (header→body→footer) → annotations → warning
  // ============================================================
  '04-publikavimas-share-viewer': `
    .card > .title,
    .card > .dialog,
    .card > .steps-row,
    .card > .warning,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.2s — Dialog (medium) — appears as whole unit */
    .card > .dialog {
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.2s forwards;
    }

    /* Dialog internals fade in sequentially */
    .dialog-header, .dialog-body, .dialog-footer { opacity: 0; }
    .dialog-header { animation: fadeIn 0.3s var(--ease-soft) 1.5s forwards; }
    .dialog-body { animation: fadeIn 0.4s var(--ease-soft) 1.8s forwards; }
    .dialog-footer { animation: fadeIn 0.3s var(--ease-soft) 2.3s forwards; }

    /* 2.7s — Steps row container instant */
    .card > .steps-row {
      animation: fadeIn 0.01s linear 2.69s forwards;
    }

    /* 2.7-3.2s — Step annotations sequential (light) */
    .step-annotation { opacity: 0; }
    .step-annotation:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 2.7s forwards; }
    .step-annotation:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 2.95s forwards; }
    .step-annotation:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 3.2s forwards; }

    /* Step badge pulse */
    .step-annotation:nth-child(1) .step-badge { animation: iconPulse 0.4s var(--ease-soft) 3.05s forwards; }
    .step-annotation:nth-child(2) .step-badge { animation: iconPulse 0.4s var(--ease-soft) 3.3s forwards; }
    .step-annotation:nth-child(3) .step-badge { animation: iconPulse 0.4s var(--ease-soft) 3.55s forwards; }

    /* 3.8s — Warning (medium) */
    .card > .warning {
      animation: fadeUpMedium 0.5s var(--ease-spring) 3.8s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 05: Two columns — do's vs don'ts
  // Sequence: title → left column + rules → right column + rules
  // ============================================================
  '05-taisyklingai-netaisyklingai-lentele': `
    .card > .title,
    .card > .columns,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.3s — Columns container instant */
    .card > .columns {
      animation: fadeIn 0.01s linear 1.29s forwards;
    }

    /* 1.3s — Left column (do's) (medium) */
    .col-do {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.3s forwards;
    }

    .col-do .col-icon {
      animation: iconPulse 0.5s var(--ease-soft) 1.8s forwards;
    }

    /* 1.7-2.3s — Left rules (light, 0.2s gaps) */
    .col-do .rule-item { opacity: 0; }
    .col-do .rule-item:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 1.7s forwards; }
    .col-do .rule-item:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 1.9s forwards; }
    .col-do .rule-item:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 2.1s forwards; }
    .col-do .rule-item:nth-child(4) { animation: fadeUpLight 0.35s var(--ease-spring) 2.3s forwards; }

    /* 2.7s — Right column (don'ts) (medium) */
    .col-dont {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 2.7s forwards;
    }

    .col-dont .col-icon {
      animation: iconPulse 0.5s var(--ease-soft) 3.2s forwards;
    }

    /* 3.0-3.6s — Right rules (light, 0.2s gaps) */
    .col-dont .rule-item { opacity: 0; }
    .col-dont .rule-item:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 3.0s forwards; }
    .col-dont .rule-item:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 3.2s forwards; }
    .col-dont .rule-item:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 3.4s forwards; }
    .col-dont .rule-item:nth-child(4) { animation: fadeUpLight 0.35s var(--ease-spring) 3.6s forwards; }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 06: File mockup — tabs → pointer → notes
  // Sequence: title → file mockup → pointer line → notes
  // ============================================================
  '06-lapu-tvarka-gid-reiksmes': `
    .card > .title,
    .card > .file-mockup,
    .card > .first-pointer,
    .card > .notes,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.2s — File mockup (medium) */
    .card > .file-mockup {
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.2s forwards;
    }

    /* 2.0s — Pointer line (fade, 0.4s) */
    .card > .first-pointer {
      animation: fadeIn 0.4s var(--ease-soft) 2.0s forwards;
    }

    /* 2.7s — Notes container instant */
    .card > .notes {
      animation: fadeIn 0.01s linear 2.69s forwards;
    }

    /* 2.7-3.2s — Notes sequential (medium) */
    .note { opacity: 0; }
    .note:nth-child(1) { animation: fadeUpMedium 0.5s var(--ease-spring) 2.7s forwards; }
    .note:nth-child(2) { animation: fadeUpMedium 0.5s var(--ease-spring) 3.2s forwards; }

    /* Note icon pulse */
    .note:nth-child(1) .note-icon { animation: iconPulse 0.5s var(--ease-soft) 3.2s forwards; }
    .note:nth-child(2) .note-icon { animation: iconPulse 0.5s var(--ease-soft) 3.7s forwards; }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 07: Code editor → result — two-section vertical flow
  // Sequence: title → editor section → code warning → arrow → result section
  // ============================================================
  '07-kodo-iterpimas-rezultatas': `
    .card > .title,
    .card > .editor-section,
    .card > .code-warn,
    .card > .arrow-down,
    .card > .result-section,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.0s — Editor section label (light) */
    .editor-section > .section-label {
      opacity: 0;
      animation: fadeUpLight 0.35s var(--ease-spring) 1.0s forwards;
    }

    /* 1.0s — Editor section container instant */
    .card > .editor-section {
      animation: fadeIn 0.01s linear 0.99s forwards;
    }

    /* 1.3s — Editor mockup (medium) */
    .editor-mockup {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.3s forwards;
    }

    /* 2.1s — Code warning (light) */
    .card > .code-warn {
      animation: fadeUpLight 0.35s var(--ease-spring) 2.1s forwards;
    }

    /* 2.7s — Arrow down (fade) */
    .card > .arrow-down {
      animation: fadeIn 0.3s var(--ease-soft) 2.7s forwards;
    }

    /* 3.1s — Result section container instant */
    .card > .result-section {
      animation: fadeIn 0.01s linear 3.09s forwards;
    }

    /* 3.1s — Result section label (light) */
    .result-section > .section-label {
      opacity: 0;
      animation: fadeUpLight 0.35s var(--ease-spring) 3.1s forwards;
    }

    /* 3.4s — Result preview (medium) */
    .result-preview {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 3.4s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 08: States — editing → syncing → summary
  // Sequence: title → left state → arrow → right state → summary
  // ============================================================
  '08-duomenu-atsinaujinimas': `
    .card > .title,
    .card > .states,
    .card > .summary,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.3s — States container instant */
    .card > .states {
      animation: fadeIn 0.01s linear 1.29s forwards;
    }

    /* 1.3s — Left state (medium) */
    .state:nth-child(1) {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.3s forwards;
    }

    .state:nth-child(1) .state-icon {
      animation: iconPulse 0.5s var(--ease-soft) 1.8s forwards;
    }

    /* 2.3s — Arrow (fade) */
    .states-arrow {
      opacity: 0;
      animation: fadeIn 0.3s var(--ease-soft) 2.3s forwards;
    }

    /* 2.8s — Right state (medium) */
    .state:nth-child(3) {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 2.8s forwards;
    }

    .state:nth-child(3) .state-icon {
      animation: iconPulse 0.5s var(--ease-soft) 3.3s forwards;
    }

    /* 4.0s — Summary (medium) */
    .card > .summary {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.0s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 09: Template preview — spreadsheet + expanded tab menu → summary
  // Sequence: title → spreadsheet (mockup + grid rows) → tab bar →
  //           tab menu header → tab list items sequential → summary
  // ============================================================
  '09-ka-matote-atidare-sablona': `
    .card > .title,
    .card > .layout,
    .card > .summary,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.2s — Layout container instant */
    .card > .layout {
      animation: fadeIn 0.01s linear 1.19s forwards;
    }

    /* 1.2s — Spreadsheet mockup (medium) */
    .sheets-mockup {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.2s forwards;
    }

    /* 1.7s — ☰ button attention pulse (draws eye to menu) */
    .tab-menu-btn {
      border-radius: 6px;
      animation: attentionPulse 1.0s var(--ease-soft) 1.7s forwards;
    }

    /* 2.0s — Tab menu header (medium) */
    .tab-menu {
      opacity: 0;
      animation: fadeIn 0.01s linear 1.99s forwards;
    }

    .tab-menu-header {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 2.0s forwards;
    }

    .tab-menu-icon {
      animation: iconPulse 0.5s var(--ease-soft) 2.5s forwards;
    }

    /* 2.6s — Tab list container */
    .tab-list {
      opacity: 0;
      animation: fadeIn 0.01s linear 2.59s forwards;
    }

    /* 2.6-3.8s — Tab items sequential (light, 0.2s gaps) */
    .tab-item { opacity: 0; }
    .tab-item:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 2.6s forwards; }
    .tab-item:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 2.8s forwards; }
    .tab-item:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 3.0s forwards; }
    .tab-item:nth-child(4) { animation: fadeUpLight 0.35s var(--ease-spring) 3.2s forwards; }
    .tab-item:nth-child(5) { animation: fadeUpLight 0.35s var(--ease-spring) 3.4s forwards; }
    .tab-item:nth-child(6) { animation: fadeUpLight 0.35s var(--ease-spring) 3.6s forwards; }

    /* 4.2s — Summary (medium) */
    .card > .summary {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.2s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 10: CMS module — list view + edit view → annotation
  // Sequence: title → list panel (header + rows) → connector → edit panel (fields) → annotation
  // ============================================================
  '10-tvs-modulis': `
    .card > .title,
    .card > .layout,
    .card > .annotation,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.2s — Layout container instant */
    .card > .layout {
      animation: fadeIn 0.01s linear 1.19s forwards;
    }

    /* 1.2s — List panel (medium) */
    .cms-list {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.2s forwards;
    }

    .cms-list-icon {
      animation: iconPulse 0.5s var(--ease-soft) 1.7s forwards;
    }

    /* 1.8-2.4s — Table rows sequential (light, 0.3s gaps) */
    .list-table tbody tr { opacity: 0; }
    .list-table tbody tr:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 1.8s forwards; }
    .list-table tbody tr:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 2.1s forwards; }
    .list-table tbody tr:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 2.4s forwards; }

    /* 2.8s — Connector arrow (fade) */
    .connector {
      opacity: 0;
      animation: fadeIn 0.3s var(--ease-soft) 2.8s forwards;
    }

    /* 3.1s — Edit panel (medium) */
    .cms-edit {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 3.1s forwards;
    }

    /* 3.5-4.1s — Form fields sequential (light, 0.3s gaps) */
    .form-group { opacity: 0; }
    .form-group:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 3.5s forwards; }
    .form-group:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 3.8s forwards; }
    .form-group:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 4.1s forwards; }

    /* 4.6s — Annotation (medium) */
    .card > .annotation {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.6s forwards;
    }

    .annotation-icon {
      animation: iconPulse 0.5s var(--ease-soft) 5.1s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // 11: File organization — two file cards → summary
  // Sequence: title → left card (header + tabs) → right card (header + tabs) → summary
  // ============================================================
  '11-kaip-organizuoti-failus': `
    .card > .title,
    .card > .files,
    .card > .summary,
    .card > .brand-bar { opacity: 0; }

    /* 0.3s — Title (heavy) */
    .card > .title {
      animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
    }

    /* 1.3s — Files container instant */
    .card > .files {
      animation: fadeIn 0.01s linear 1.29s forwards;
    }

    /* 1.3s — Left file card: admin (medium) */
    .file-admin {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 1.3s forwards;
    }

    .file-admin .file-icon {
      animation: iconPulse 0.5s var(--ease-soft) 1.8s forwards;
    }

    /* 1.7-2.1s — Admin tabs sequential (light, 0.2s gaps) */
    .file-admin .file-tab { opacity: 0; }
    .file-admin .file-tab:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 1.7s forwards; }
    .file-admin .file-tab:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 1.9s forwards; }
    .file-admin .file-tab:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 2.1s forwards; }

    /* 2.6s — Right file card: edu (medium) */
    .file-edu {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 2.6s forwards;
    }

    .file-edu .file-icon {
      animation: iconPulse 0.5s var(--ease-soft) 3.1s forwards;
    }

    /* 3.0-3.4s — Edu tabs sequential (light, 0.2s gaps) */
    .file-edu .file-tab { opacity: 0; }
    .file-edu .file-tab:nth-child(1) { animation: fadeUpLight 0.35s var(--ease-spring) 3.0s forwards; }
    .file-edu .file-tab:nth-child(2) { animation: fadeUpLight 0.35s var(--ease-spring) 3.2s forwards; }
    .file-edu .file-tab:nth-child(3) { animation: fadeUpLight 0.35s var(--ease-spring) 3.4s forwards; }

    /* 4.2s — Summary (medium) */
    .card > .summary {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.2s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // Lentelių pamoka 01: Įrankio pasirinkimas (2 primary columns + amber fallback)
  // Sequence: title → subtitle → WYSIWYG column → Sheets column → fallback banner
  // ============================================================
  '01-irankio-pasirinkimas': `
    .card > .title,
    .card > .subtitle,
    .card > .primary-row,
    .card > .fallback-row,
    .card > .brand-bar { opacity: 0; }

    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards; }
    .card > .subtitle { animation: fadeIn 0.4s var(--ease-spring) 1.0s forwards; }

    .card > .primary-row { animation: fadeIn 0.01s linear 1.49s forwards; }

    .primary-row > .column-blue {
      opacity: 0;
      animation: fadeUpMedium 0.55s var(--ease-spring) 1.5s forwards;
    }
    .primary-row > .column-green {
      opacity: 0;
      animation: fadeUpMedium 0.55s var(--ease-spring) 2.1s forwards;
    }
    .column-blue .icon { animation: iconPulse 0.5s var(--ease-soft) 2.05s forwards; }
    .column-green .icon { animation: iconPulse 0.5s var(--ease-soft) 2.65s forwards; }

    .card > .fallback-row {
      animation: fadeUpMedium 0.5s var(--ease-spring) 3.3s forwards;
    }
    .fallback-badge { animation: iconPulse 0.5s var(--ease-soft) 3.8s forwards; }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // Lentelių pamoka 02: Antraštinė eilutė – 2 cases with dialogs
  // Sequence: title → subtitle → case1 (left) → case2 (right) → warning
  // ============================================================
  '02-antrastine-du-keliai': `
    .card > .title,
    .card > .subtitle,
    .card > .cases-row,
    .card > .warning,
    .card > .brand-bar { opacity: 0; }

    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards; }
    .card > .subtitle { animation: fadeIn 0.4s var(--ease-spring) 1.0s forwards; }

    .card > .cases-row { animation: fadeIn 0.01s linear 1.49s forwards; }

    .cases-row > .case:nth-of-type(1) {
      opacity: 0;
      animation: fadeUpMedium 0.55s var(--ease-spring) 1.5s forwards;
    }
    .cases-row > .case:nth-of-type(2) {
      opacity: 0;
      animation: fadeUpMedium 0.55s var(--ease-spring) 2.6s forwards;
    }

    .case:nth-of-type(1) .case-badge { animation: iconPulse 0.5s var(--ease-soft) 2.05s forwards; }
    .case:nth-of-type(2) .case-badge { animation: iconPulse 0.5s var(--ease-soft) 3.15s forwards; }

    .card > .warning {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.0s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // Lentelių pamoka 03: Klastingas simptomas – split svetainėje vs redaktoriuje
  // Sequence: title → subtitle → left panel → right panel → prevention banner
  // ============================================================
  '03-klastingas-simptomas': `
    .card > .title,
    .card > .subtitle,
    .card > .comparison,
    .card > .prevention,
    .card > .brand-bar { opacity: 0; }

    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards; }
    .card > .subtitle { animation: fadeIn 0.4s var(--ease-spring) 1.0s forwards; }

    .card > .comparison { animation: fadeIn 0.01s linear 1.49s forwards; }

    .comparison > *:nth-child(1) {
      opacity: 0;
      animation: fadeUpMedium 0.55s var(--ease-spring) 1.5s forwards;
    }
    .comparison > *:nth-child(2) {
      opacity: 0;
      animation: fadeUpMedium 0.55s var(--ease-spring) 2.6s forwards;
    }

    .comparison > *:nth-child(1) .panel-badge { animation: iconPulse 0.5s var(--ease-soft) 2.05s forwards; }
    .comparison > *:nth-child(2) .panel-badge { animation: iconPulse 0.5s var(--ease-soft) 3.15s forwards; }

    .card > .prevention {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.0s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // Lentelių pamoka 04: Kai netelpa – 4 steps + fallback section
  // Sequence: title → subtitle → 4 steps sequential → divider → fallback section
  // ============================================================
  '04-kai-netelpa': `
    .card > .title,
    .card > .subtitle,
    .card > .steps-row,
    .card > .fallback-divider,
    .card > .fallback-section,
    .card > .brand-bar { opacity: 0; }

    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards; }
    .card > .subtitle { animation: fadeIn 0.4s var(--ease-spring) 1.0s forwards; }

    .card > .steps-row { animation: fadeIn 0.01s linear 1.49s forwards; }
    .steps-row > .step { opacity: 0; }
    .steps-row > .step:nth-child(1) { animation: fadeUpMedium 0.45s var(--ease-spring) 1.5s forwards; }
    .steps-row > .step:nth-child(2) { animation: fadeUpMedium 0.45s var(--ease-spring) 1.85s forwards; }
    .steps-row > .step:nth-child(3) { animation: fadeUpMedium 0.45s var(--ease-spring) 2.2s forwards; }
    .steps-row > .step:nth-child(4) { animation: fadeUpMedium 0.45s var(--ease-spring) 2.55s forwards; }

    .step:nth-child(1) .step-num { animation: iconPulse 0.5s var(--ease-soft) 1.95s forwards; }
    .step:nth-child(2) .step-num { animation: iconPulse 0.5s var(--ease-soft) 2.3s forwards; }
    .step:nth-child(3) .step-num { animation: iconPulse 0.5s var(--ease-soft) 2.65s forwards; }
    .step:nth-child(4) .step-num { animation: iconPulse 0.5s var(--ease-soft) 3.0s forwards; }

    .card > .fallback-divider {
      animation: fadeIn 0.4s var(--ease-soft) 3.4s forwards;
    }
    .card > .fallback-section {
      animation: fadeUpMedium 0.55s var(--ease-spring) 3.8s forwards;
    }
    .fallback-badge { animation: iconPulse 0.5s var(--ease-soft) 4.35s forwards; }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // Lentelių pamoka 05: Semantikos klaidos – 3 error cards + takeaway
  // Sequence: title → subtitle → 3 error cards sequential → takeaway
  // ============================================================
  '05-semantikos-klaidos': `
    .card > .title,
    .card > .subtitle,
    .card > .errors-row,
    .card > .takeaway,
    .card > .brand-bar { opacity: 0; }

    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards; }
    .card > .subtitle { animation: fadeIn 0.4s var(--ease-spring) 1.0s forwards; }

    .card > .errors-row { animation: fadeIn 0.01s linear 1.49s forwards; }
    .errors-row > .error-card { opacity: 0; }
    .errors-row > .error-card:nth-child(1) { animation: fadeUpMedium 0.5s var(--ease-spring) 1.5s forwards; }
    .errors-row > .error-card:nth-child(2) { animation: fadeUpMedium 0.5s var(--ease-spring) 2.1s forwards; }
    .errors-row > .error-card:nth-child(3) { animation: fadeUpMedium 0.5s var(--ease-spring) 2.7s forwards; }

    .error-card:nth-child(1) .error-badge { animation: iconPulse 0.5s var(--ease-soft) 2.05s forwards; }
    .error-card:nth-child(2) .error-badge { animation: iconPulse 0.5s var(--ease-soft) 2.65s forwards; }
    .error-card:nth-child(3) .error-badge { animation: iconPulse 0.5s var(--ease-soft) 3.25s forwards; }

    .card > .takeaway {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.0s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // Lentelių pamoka 06: Vizualinio pertekliaus klaidos – 2x2 grid + takeaway
  // Sequence: title → subtitle → 4 error cards sequential (grid) → takeaway
  // ============================================================
  '06-vizualinio-pertekliaus-klaidos': `
    .card > .title,
    .card > .subtitle,
    .card > .errors-grid,
    .card > .takeaway,
    .card > .brand-bar { opacity: 0; }

    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards; }
    .card > .subtitle { animation: fadeIn 0.4s var(--ease-spring) 1.0s forwards; }

    .card > .errors-grid { animation: fadeIn 0.01s linear 1.49s forwards; }
    .errors-grid > .error-card { opacity: 0; }
    .errors-grid > .error-card:nth-child(1) { animation: fadeUpMedium 0.5s var(--ease-spring) 1.5s forwards; }
    .errors-grid > .error-card:nth-child(2) { animation: fadeUpMedium 0.5s var(--ease-spring) 1.9s forwards; }
    .errors-grid > .error-card:nth-child(3) { animation: fadeUpMedium 0.5s var(--ease-spring) 2.3s forwards; }
    .errors-grid > .error-card:nth-child(4) { animation: fadeUpMedium 0.5s var(--ease-spring) 2.7s forwards; }

    .error-card:nth-child(1) .error-badge { animation: iconPulse 0.5s var(--ease-soft) 2.0s forwards; }
    .error-card:nth-child(2) .error-badge { animation: iconPulse 0.5s var(--ease-soft) 2.4s forwards; }
    .error-card:nth-child(3) .error-badge { animation: iconPulse 0.5s var(--ease-soft) 2.8s forwards; }
    .error-card:nth-child(4) .error-badge { animation: iconPulse 0.5s var(--ease-soft) 3.2s forwards; }

    .card > .takeaway {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.0s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,

  // ============================================================
  // Lentelių pamoka 07: Panašumas su Word – split comparison + connector + takeaway
  // Sequence: title → subtitle → Word card (left) → connector (mouse+gesture) → CKeditor card (right) → takeaway
  // ============================================================
  '07-panasumas-su-word': `
    .card > .title,
    .card > .subtitle,
    .card > .comparison-row,
    .card > .takeaway,
    .card > .brand-bar { opacity: 0; }

    .card > .title { animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards; }
    .card > .subtitle { animation: fadeIn 0.4s var(--ease-spring) 1.0s forwards; }

    .card > .comparison-row { animation: fadeIn 0.01s linear 1.49s forwards; }

    .comparison-row > .editor-card.word-card {
      opacity: 0;
      animation: fadeUpMedium 0.55s var(--ease-spring) 1.5s forwards;
    }
    .editor-card.word-card .context-badge {
      animation: iconPulse 0.5s var(--ease-soft) 2.05s forwards;
    }

    .comparison-row > .connector {
      opacity: 0;
      animation: fadeUpMedium 0.5s var(--ease-spring) 2.4s forwards;
    }
    .connector .click-ripple {
      animation: iconPulse 0.5s var(--ease-soft) 2.9s forwards;
    }

    .comparison-row > .editor-card.ck-card {
      opacity: 0;
      animation: fadeUpMedium 0.55s var(--ease-spring) 3.0s forwards;
    }
    .editor-card.ck-card .context-badge {
      animation: iconPulse 0.5s var(--ease-soft) 3.55s forwards;
    }

    .card > .takeaway {
      animation: fadeUpMedium 0.5s var(--ease-spring) 4.3s forwards;
    }

    .card > .brand-bar { opacity: 0 !important; }
  `,
};

// Fallback generic animation for unknown templates
const FALLBACK_CSS = `
  .card > * { opacity: 0; }
  .card { opacity: 1 !important; }
  .card::before { opacity: 0.37 !important; }

  .card > .title, .card > h2 {
    animation: fadeUpHeavy 0.6s var(--ease-spring) 0.3s forwards;
  }

  .card > *:nth-child(2) { animation: fadeUpMedium 0.5s var(--ease-spring) 1.3s forwards; }
  .card > *:nth-child(3) { animation: fadeUpMedium 0.5s var(--ease-spring) 2.3s forwards; }
  .card > *:nth-child(4) { animation: fadeUpMedium 0.5s var(--ease-spring) 3.3s forwards; }
  .card > *:nth-child(5) { animation: fadeUpMedium 0.5s var(--ease-spring) 4.0s forwards; }
  .card > *:last-child { animation: fadeUpMedium 0.5s var(--ease-spring) 4.5s forwards; }

  .card > .brand-bar { opacity: 0 !important; }
`;

// How long to record each clip (seconds)
const CLIP_DURATION = 6;
const TRANSITION_DURATION = 3.2; // skaitymo laikas: pavadinimas laikomas ~2.1 s prieš išnykstant
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

// ---- Parse scenario for clip order ----
function parseScenarioOrder() {
  const videoDir = path.join(LESSONS_DIR, lessonSlug, 'video');
  const scenarioPath = path.join(videoDir, `scenarijus-${lang}.md`);
  if (!fs.existsSync(scenarioPath)) return null;

  const content = fs.readFileSync(scenarioPath, 'utf-8');
  const order = [];
  for (const line of content.split('\n')) {
    const m = line.match(/^\|\s*(\d+)\s+(.+?)\s*\|\s*(\d+)\s*sek\.\s*\|\s*(.+?)\s*\|/);
    if (m) {
      const kadrasNum = parseInt(m[1]);
      const title = m[2].trim();
      const sek = parseInt(m[3]);
      const fileName = m[4].trim().replace(/\.(mp4|png)$/, '');
      if (kadrasNum === 0 || fileName.includes('intro') || fileName.includes('autro')) continue;
      order.push({ kadrasNum, title, fileName, sek });
    }
  }
  return order.length > 0 ? order : null;
}

// ---- Number overlay CSS (minimal text, bottom-left) ----
const NUMBER_OVERLAY_CSS = `
  .clip-number-overlay {
    position: fixed;
    bottom: 32px;
    left: 44px;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: -0.5px;
    z-index: 9999;
    opacity: 0;
    animation: numberBadgeIn 0.4s var(--ease-spring) 0.3s forwards;
  }

  @keyframes numberBadgeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// ---- Transition C HTML generator ----
function buildTransitionHtml(number, title) {
  const num = String(number).padStart(2, '0');
  // Skirtuko etiketė pagal kalbą
  const etiketes = { lt: 'KADRAS', pl: 'UJĘCIE', de: 'SZENE', en: 'SCENE' };
  const et = etiketes[lang] || etiketes.en;
  // Pavadinimas skaidomas į dvi eilutes: paskutiniai 1–2 žodžiai paryškinami.
  const zod = String(title).trim().split(/\s+/);
  const kiekStoru = zod.length > 3 ? 2 : 1;
  const plona = zod.slice(0, Math.max(1, zod.length - kiekStoru)).join(' ');
  const stora = zod.slice(Math.max(1, zod.length - kiekStoru)).join(' ');
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root { --sp: cubic-bezier(0.16, 1, 0.3, 1); }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
    font-family: Inter, -apple-system, sans-serif; color: #14142b;
    /* Tas pats fonas kaip .card (tokens/base.css) — pjūvis tarp skirtuko ir skaidrės nematomas */
    background:
      radial-gradient(circle 430px at 88% 6%,  rgba(255,255,255,.80) 0 99%, rgba(255,255,255,0) 100%),
      radial-gradient(circle 190px at 3% 95%,  rgba(199,185,219,.34) 0 99%, rgba(199,185,219,0) 100%),
      radial-gradient(circle 78px  at 93% 88%, rgba(243,168,196,.50) 0 99%, rgba(243,168,196,0) 100%),
      linear-gradient(160deg, #eef1f8 0%, #f4f6fa 42%, #faf9fb 100%);
    position: relative;
  }
  /* Nukirstas numeris fone — citata iš cleverphant.lt hero, kur antraštė išeina už kadro */
  .nr {
    position: absolute; left: -70px; top: 50%; transform: translate(-90px, -50%);
    font-size: 460px; font-weight: 800; letter-spacing: -22px; color: #dfe4f0; opacity: 0;
    animation: nrAteina .9s var(--sp) .05s forwards, viskasDingsta .4s ease 2.75s forwards;
  }
  .blokas {
    position: absolute; left: 620px; top: 50%; width: 1120px; opacity: 0;
    transform: translate(0, calc(-50% + 26px));
    animation: blokasKyla .65s var(--sp) .5s forwards, viskasDingsta .4s ease 2.75s forwards;
  }
  .et { font-size: 19px; font-weight: 700; letter-spacing: 3.5px; color: #9aa1b4; margin-bottom: 18px; }
  .pav { font-size: 76px; font-weight: 400; letter-spacing: -2px; line-height: 1.06;
         hyphens: auto; overflow-wrap: break-word; }
  .pav b { display: block; font-weight: 800; }
  .bruksnys {
    position: absolute; left: 620px; top: 50%; margin-top: 150px; width: 0; height: 4px;
    border-radius: 2px; background: linear-gradient(90deg, #3ab0b0, #f3a8c4);
    animation: bruksnysPlinta .7s var(--sp) .95s forwards, viskasDingsta .4s ease 2.75s forwards;
  }
  @keyframes nrAteina { to { opacity: 1; transform: translate(0, -50%); } }
  @keyframes blokasKyla { to { opacity: 1; transform: translate(0, -50%); } }
  @keyframes bruksnysPlinta { to { width: 280px; } }
  @keyframes viskasDingsta { to { opacity: 0; } }
</style></head>
<body>
  <div class="nr">${num}</div>
  <div class="blokas"><div class="et">${et}</div>
    <div class="pav">${plona}<b>${stora}</b></div></div>
  <div class="bruksnys"></div>
</body></html>`;
}
async function main() {
  const outputDir = path.join(LESSONS_DIR, lessonSlug, 'output', lang);
  const clipsDir = path.join(outputDir, 'clips');
  const suffix = isDark ? '-dark' : '';

  if (!fs.existsSync(outputDir)) {
    console.error(`Output dir not found: ${outputDir}`);
    console.error('Run: node generate.js first');
    process.exit(1);
  }

  // Find HTML files
  // --only 00-a,03-b — perrenderinti tik šiuos turinio klipus (perėjimai generuojami kaip visada)
  const onlyArg = getArg('only');
  const only = onlyArg ? onlyArg.split(',').map(x => x.trim()) : null;
  const htmlFiles = fs.readdirSync(outputDir)
    .filter(f => f.endsWith('.html'))
    .filter(f => !only || only.includes(path.basename(f, '.html')))
    .sort();

  if (htmlFiles.length === 0) {
    console.error(`No HTML files found in ${outputDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(clipsDir)) fs.mkdirSync(clipsDir, { recursive: true });

  // Parse scenario order for numbering and transitions
  const scenarioOrder = parseScenarioOrder();
  const nameToKadras = {};
  if (scenarioOrder) {
    scenarioOrder.forEach(item => {
      nameToKadras[item.fileName] = item;
    });
  }

  console.log(`\nGenerating video clips: ${lessonSlug} [${lang}]${isDark ? ' (dark)' : ''}`);
  console.log(`  Found ${htmlFiles.length} illustration(s)`);
  console.log(`  Clip duration: ${CLIP_DURATION}s @ ${FPS}fps`);
  if (scenarioOrder) {
    console.log(`  Scenario order: ${scenarioOrder.length} clips (will add numbers + transitions)`);
  }

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: true });

  // ---- Generate content clips with number overlay ----
  for (const htmlFile of htmlFiles) {
    const name = path.basename(htmlFile, '.html');
    const clipName = `${name}${suffix}.mp4`;
    const framesDir = path.join(clipsDir, `_frames_${name}`);

    if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

    // Select per-template animation CSS
    const templateCSS = TEMPLATE_ANIMATIONS[name] || FALLBACK_CSS;
    let fullCSS = COMMON_CSS + templateCSS;

    // Add number overlay CSS if we have scenario info
    const kadrasInfo = nameToKadras[name];
    if (kadrasInfo) {
      fullCSS += NUMBER_OVERLAY_CSS;
    }
    const klipoTrukme = (kadrasInfo && kadrasInfo.sek) ? kadrasInfo.sek : CLIP_DURATION;
    fullCSS = `:root { --klipo-trukme: ${klipoTrukme}s; }\n` + fullCSS;

    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });

    if (isDark) {
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' },
      ]);
    }

    // Load the HTML
    const fileUrl = 'file://' + path.resolve(outputDir, htmlFile);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');

    // Inject animation CSS
    await page.addStyleTag({ content: fullCSS });

    // Inject number badge DOM element
    if (kadrasInfo) {
      await page.evaluate((num) => {
        const badge = document.createElement('div');
        badge.className = 'clip-number-overlay';
        badge.textContent = String(num).padStart(2, '0');
        document.body.appendChild(badge);
      }, kadrasInfo.kadrasNum);
    }

    // ⛔ Determinuotas laikas. Anksčiau kadrai buvo renkami realiu laiku, o CSS animacija
    // suko savo laikrodį — 4.5 s seka suspausdavo į ~2 s, ir likusios 4 s būdavo stop kadras.
    // Dabar animacijos pristabdomos ir kiekvienam kadrui nustatomas tikslus currentTime.
    await page.evaluate(() => {
      document.getAnimations().forEach(a => { a.pause(); a.currentTime = 0; });
    });

    // Klipo trukmė — iš scenarijaus lentelės, jei ji ten nurodyta
    const clipSeconds = (kadrasInfo && kadrasInfo.sek) ? kadrasInfo.sek : CLIP_DURATION;
    const totalFrames = Math.ceil(clipSeconds * FPS);

    for (let f = 0; f < totalFrames; f++) {
      const tMs = (f / FPS) * 1000;
      await page.evaluate((t) => {
        document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; });
      }, tMs);

      const framePath = path.join(framesDir, `frame_${String(f).padStart(4, '0')}.png`);
      await page.screenshot({ path: framePath, type: 'png' });

      if ((f + 1) % 30 === 0 || f === totalFrames - 1) {
        process.stdout.write(`  ${name}: frame ${f + 1}/${totalFrames}\r`);
      }
    }

    await page.close();

    // Stitch frames with ffmpeg
    const clipPath = path.join(clipsDir, clipName);
    execSync([
      'ffmpeg', '-y',
      '-framerate', String(FPS),
      '-i', `"${path.join(framesDir, 'frame_%04d.png')}"`,
      '-vf', `"scale=${WIDTH}:${HEIGHT}"`,
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-r', String(FPS),
      `"${clipPath}"`,
    ].join(' '), { stdio: 'pipe' });

    // Cleanup frames
    fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));
    fs.rmdirSync(framesDir);

    console.log(`  ${clipName}`);
  }

  // ---- Generate transition clips (style C: line sweep) ----
  if (scenarioOrder && scenarioOrder.length > 1) {
    console.log(`\n  Generating ${scenarioOrder.length - 1} transition clips...`);
    const transDir = path.join(clipsDir, 'transitions');
    if (!fs.existsSync(transDir)) fs.mkdirSync(transDir, { recursive: true });

    // Transitions go BEFORE each clip (except the first one)
    for (let i = 1; i < scenarioOrder.length; i++) {
      const item = scenarioOrder[i];
      const transName = `transition-${String(item.kadrasNum).padStart(2, '0')}${suffix}`;
      const framesDir = path.join(transDir, `_frames_${transName}`);
      if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

      // Build transition HTML
      const html = buildTransitionHtml(item.kadrasNum, item.title);
      const tmpHtml = path.join(transDir, `_${transName}.html`);
      fs.writeFileSync(tmpHtml, html, 'utf-8');

      const page = await browser.newPage();
      await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
      await page.goto('file://' + path.resolve(tmpHtml), { waitUntil: 'networkidle0' });
      await page.evaluateHandle('document.fonts.ready');

      // ⛔ Skirtukui galioja tas pats determinuotas laikas kaip ir klipams.
      // Kol jo nebuvo, numeris su pavadinimu blykstelėdavo per ~0.5 s, o likusį laiką
      // ekranas būdavo tuščias — žiūrovas nespėdavo perskaityti.
      await page.evaluate(() => {
        document.getAnimations().forEach(a => { a.pause(); a.currentTime = 0; });
      });

      const totalFrames = Math.ceil(TRANSITION_DURATION * FPS);
      for (let f = 0; f < totalFrames; f++) {
        const tMs = (f / FPS) * 1000;
        await page.evaluate((ms) => {
          document.getAnimations().forEach(a => { a.pause(); a.currentTime = ms; });
        }, tMs);
        const framePath = path.join(framesDir, `frame_${String(f).padStart(4, '0')}.png`);
        await page.screenshot({ path: framePath, type: 'png' });
      }

      await page.close();
      fs.unlinkSync(tmpHtml);

      // Stitch
      const clipPath = path.join(transDir, `${transName}.mp4`);
      execSync([
        'ffmpeg', '-y',
        '-framerate', String(FPS),
        '-i', `"${path.join(framesDir, 'frame_%04d.png')}"`,
        '-vf', `"scale=${WIDTH}:${HEIGHT}"`,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-r', String(FPS),
        `"${clipPath}"`,
      ].join(' '), { stdio: 'pipe' });

      // Cleanup
      fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));
      fs.rmdirSync(framesDir);

      console.log(`  ${transName}.mp4`);
    }

    // Cleanup transitions frames dir if empty
    try { fs.rmdirSync(transDir + '/_frames_*'); } catch (_) {}
  }

  await browser.close();
  console.log(`\nDone. Clips saved to: ${clipsDir}`);
}

if (isAllLangs) {
  const manifestPath = path.join(LESSONS_DIR, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const languages = manifest.lessons[lessonSlug]?.languages || ['lt'];
  console.log(`Running for all languages: ${languages.join(', ')}`);
  (async () => {
    for (const l of languages) {
      console.log(`\n${'='.repeat(60)}\n  Language: ${l}\n${'='.repeat(60)}`);
      const childArgs = ['--lesson', lessonSlug, '--lang', l];
      if (isDark) childArgs.push('--dark');
      execSync(`node ${JSON.stringify(__filename)} ${childArgs.join(' ')}`, { stdio: 'inherit' });
    }
  })().catch(err => { console.error(err); process.exit(1); });
} else {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
