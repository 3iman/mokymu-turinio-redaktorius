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
  // >>> DIGITAL-INFRA (generuoja lessons/digital-infrastructure/build_scenes.py — ranka neredaguoti)
  '01-hook': `
    .big { opacity: 0; animation: fadeUpHeavy 0.7s var(--ease-spring) 0.3s forwards; }
    .a1 { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 2.60s forwards; }
    .a2 { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 3.40s forwards; }
    .a3 { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 4.20s forwards; }
    .d1 { opacity: 0; animation: fadeIn 0.3s linear 3.20s forwards; }
    .d2 { opacity: 0; animation: fadeIn 0.3s linear 4.00s forwards; }
    .flash { animation: m1_flashopacity 12s linear 0s both; }
    @keyframes m1_flashopacity { 0% { opacity: 0; } 45.000% { opacity: 0; } 46.250% { opacity: .22; } 49.167% { opacity: 0; } 95.000% { opacity: 0; } 100% { opacity: 0; } }
    .foot { animation: m1_footopacity 12s linear 0s both; }
    @keyframes m1_footopacity { 0% { opacity: 0; } 55.000% { opacity: 0; } 61.667% { opacity: 1; } 95.000% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '02-contrast': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .left { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.5s forwards; }
    .right { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 1.1s forwards; }
    .m0 { opacity: 0; animation: fadeIn 0.25s linear 1.60s forwards; }
    .m1 { opacity: 0; animation: fadeIn 0.25s linear 1.69s forwards; }
    .m2 { opacity: 0; animation: fadeIn 0.25s linear 1.78s forwards; }
    .m3 { opacity: 0; animation: fadeIn 0.25s linear 1.87s forwards; }
    .m4 { opacity: 0; animation: fadeIn 0.25s linear 1.96s forwards; }
    .m5 { opacity: 0; animation: fadeIn 0.25s linear 2.05s forwards; }
    .m6 { opacity: 0; animation: fadeIn 0.25s linear 2.14s forwards; }
    .m7 { opacity: 0; animation: fadeIn 0.25s linear 2.23s forwards; }
    .m8 { opacity: 0; animation: fadeIn 0.25s linear 2.32s forwards; }
    .m9 { opacity: 0; animation: fadeIn 0.25s linear 2.41s forwards; }
    .m10 { opacity: 0; animation: fadeIn 0.25s linear 2.50s forwards; }
    .m11 { opacity: 0; animation: fadeIn 0.25s linear 2.59s forwards; }
    .m12 { opacity: 0; animation: fadeIn 0.25s linear 2.68s forwards; }
    .m13 { opacity: 0; animation: fadeIn 0.25s linear 2.77s forwards; }
    .m14 { opacity: 0; animation: fadeIn 0.25s linear 2.86s forwards; }
    .m15 { opacity: 0; animation: fadeIn 0.25s linear 2.95s forwards; }
    .m16 { opacity: 0; animation: fadeIn 0.25s linear 3.04s forwards; }
    .m17 { opacity: 0; animation: fadeIn 0.25s linear 3.13s forwards; }
    .m18 { opacity: 0; animation: fadeIn 0.25s linear 3.22s forwards; }
    .m19 { opacity: 0; animation: fadeIn 0.25s linear 3.31s forwards; }
    .m20 { opacity: 0; animation: fadeIn 0.25s linear 3.40s forwards; }
    .m21 { opacity: 0; animation: fadeIn 0.25s linear 3.49s forwards; }
    .b1 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 3.30s forwards; }
    .b2 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 3.70s forwards; }
    .b3 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 4.10s forwards; }
    .s0 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.40s forwards; }
    .s1 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.52s forwards; }
    .s2 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.64s forwards; }
    .s3 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.76s forwards; }
    .s4 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.88s forwards; }
    .s5 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.40s forwards; }
    .s6 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.52s forwards; }
    .s7 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.64s forwards; }
    .s8 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.76s forwards; }
    .s9 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.88s forwards; }
    .s10 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.40s forwards; }
    .s11 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.52s forwards; }
    .s12 { stroke-dashoffset: var(--dash); animation: draw 2.6s var(--ease-soft) 5.64s forwards; }
    @keyframes draw { from { stroke-dashoffset: var(--dash); } to { stroke-dashoffset: 0; } }
    .sym { animation: m2_symopacity 13s linear 0s both; }
    @keyframes m2_symopacity { 0% { opacity: 0; } 49.231% { opacity: 0; } 55.385% { opacity: 1; } 95.385% { opacity: 1; } 100% { opacity: 1; } }
    .sym { animation: iconPulse 1.6s var(--ease-soft) 7.4s 2; }
  `,
  '03-solution': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .lines { opacity: 0; animation: fadeIn 0.8s linear 1.4s forwards; }
    .hub { animation: m3_hubopacity 17s linear 0s both; }
    @keyframes m3_hubopacity { 0% { opacity: 0; } 3.529% { opacity: 0; } 8.235% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .hub { animation: iconPulse 1.8s var(--ease-soft) 3.2s 3; }
    .g0 { animation: m3_g0opacity 17s linear 0s both; }
    @keyframes m3_g0opacity { 0% { opacity: 0; } 5.294% { opacity: 0; } 7.353% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .g0 { animation: m3_g0fill 17s linear 0s both; }
    @keyframes m3_g0fill { 0% { fill: #c9d3dd; } 24.118% { fill: #c9d3dd; } 25.882% { fill: var(--c-green-solid); } 96.471% { fill: var(--c-green-solid); } 100% { fill: var(--c-green-solid); } }
    .g1 { animation: m3_g1opacity 17s linear 0s both; }
    @keyframes m3_g1opacity { 0% { opacity: 0; } 6.588% { opacity: 0; } 8.647% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .g1 { animation: m3_g1fill 17s linear 0s both; }
    @keyframes m3_g1fill { 0% { fill: #c9d3dd; } 28.353% { fill: #c9d3dd; } 30.118% { fill: var(--c-green-solid); } 96.471% { fill: var(--c-green-solid); } 100% { fill: var(--c-green-solid); } }
    .g2 { animation: m3_g2opacity 17s linear 0s both; }
    @keyframes m3_g2opacity { 0% { opacity: 0; } 7.882% { opacity: 0; } 9.941% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .g2 { animation: m3_g2fill 17s linear 0s both; }
    @keyframes m3_g2fill { 0% { fill: #c9d3dd; } 32.588% { fill: #c9d3dd; } 34.353% { fill: var(--c-green-solid); } 96.471% { fill: var(--c-green-solid); } 100% { fill: var(--c-green-solid); } }
    .g3 { animation: m3_g3opacity 17s linear 0s both; }
    @keyframes m3_g3opacity { 0% { opacity: 0; } 9.176% { opacity: 0; } 11.235% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .g3 { animation: m3_g3fill 17s linear 0s both; }
    @keyframes m3_g3fill { 0% { fill: #c9d3dd; } 36.824% { fill: #c9d3dd; } 38.588% { fill: var(--c-green-solid); } 96.471% { fill: var(--c-green-solid); } 100% { fill: var(--c-green-solid); } }
    .g4 { animation: m3_g4opacity 17s linear 0s both; }
    @keyframes m3_g4opacity { 0% { opacity: 0; } 10.471% { opacity: 0; } 12.529% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .g4 { animation: m3_g4fill 17s linear 0s both; }
    @keyframes m3_g4fill { 0% { fill: #c9d3dd; } 41.059% { fill: #c9d3dd; } 42.824% { fill: var(--c-green-solid); } 96.471% { fill: var(--c-green-solid); } 100% { fill: var(--c-green-solid); } }
    .g5 { animation: m3_g5opacity 17s linear 0s both; }
    @keyframes m3_g5opacity { 0% { opacity: 0; } 11.765% { opacity: 0; } 13.824% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .g5 { animation: m3_g5fill 17s linear 0s both; }
    @keyframes m3_g5fill { 0% { fill: #c9d3dd; } 45.294% { fill: #c9d3dd; } 47.059% { fill: var(--c-green-solid); } 96.471% { fill: var(--c-green-solid); } 100% { fill: var(--c-green-solid); } }
    .p0 { animation: m3_p0r 17s linear 0s both; }
    @keyframes m3_p0r { 0% { r: 90; } 20.000% { r: 90; } 32.353% { r: 430; } 96.471% { r: 430; } 100% { r: 430; } }
    .p0 { animation: m3_p0opacity 17s linear 0s both; }
    @keyframes m3_p0opacity { 0% { opacity: 0; } 20.000% { opacity: 0; } 21.176% { opacity: .55; } 32.353% { opacity: 0; } 96.471% { opacity: 0; } 100% { opacity: 0; } }
    .p1 { animation: m3_p1r 17s linear 0s both; }
    @keyframes m3_p1r { 0% { r: 90; } 28.824% { r: 90; } 41.176% { r: 430; } 96.471% { r: 430; } 100% { r: 430; } }
    .p1 { animation: m3_p1opacity 17s linear 0s both; }
    @keyframes m3_p1opacity { 0% { opacity: 0; } 28.824% { opacity: 0; } 30.000% { opacity: .55; } 41.176% { opacity: 0; } 96.471% { opacity: 0; } 100% { opacity: 0; } }
    .p2 { animation: m3_p2r 17s linear 0s both; }
    @keyframes m3_p2r { 0% { r: 90; } 37.647% { r: 90; } 50.000% { r: 430; } 96.471% { r: 430; } 100% { r: 430; } }
    .p2 { animation: m3_p2opacity 17s linear 0s both; }
    @keyframes m3_p2opacity { 0% { opacity: 0; } 37.647% { opacity: 0; } 38.824% { opacity: .55; } 50.000% { opacity: 0; } 96.471% { opacity: 0; } 100% { opacity: 0; } }
    .chip { animation: m3_chipopacity 17s linear 0s both; }
    @keyframes m3_chipopacity { 0% { opacity: 0; } 57.647% { opacity: 0; } 62.353% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .cap { animation: m3_capopacity 17s linear 0s both; }
    @keyframes m3_capopacity { 0% { opacity: 0; } 69.412% { opacity: 0; } 74.118% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '04-lifecycle': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .r0 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 1.60s forwards; }
    .r0 .i { animation: m4_r0iopacity 16s linear 0s both; }
    @keyframes m4_r0iopacity { 0% { opacity: 0; } 14.375% { opacity: 0; } 17.500% { opacity: 1; } 96.250% { opacity: 1; } 100% { opacity: 1; } }
    .r1 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 3.70s forwards; }
    .r1 .i { animation: m4_r1iopacity 16s linear 0s both; }
    @keyframes m4_r1iopacity { 0% { opacity: 0; } 27.500% { opacity: 0; } 30.625% { opacity: 1; } 96.250% { opacity: 1; } 100% { opacity: 1; } }
    .r2 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 5.80s forwards; }
    .r2 .i { animation: m4_r2iopacity 16s linear 0s both; }
    @keyframes m4_r2iopacity { 0% { opacity: 0; } 40.625% { opacity: 0; } 43.750% { opacity: 1; } 96.250% { opacity: 1; } 100% { opacity: 1; } }
    .r3 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 7.90s forwards; }
    .r3 .i { animation: m4_r3iopacity 16s linear 0s both; }
    @keyframes m4_r3iopacity { 0% { opacity: 0; } 53.750% { opacity: 0; } 56.875% { opacity: 1; } 96.250% { opacity: 1; } 100% { opacity: 1; } }
    .cap { animation: m4_capopacity 16s linear 0s both; }
    @keyframes m4_capopacity { 0% { opacity: 0; } 71.250% { opacity: 0; } 76.875% { opacity: 1; } 96.250% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '05-cta': `
    .logo { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }
    .lead { animation: m5_leadopacity 19s linear 0s both; }
    @keyframes m5_leadopacity { 0% { opacity: 0; } 8.421% { opacity: 0; } 12.632% { opacity: 1; } 96.842% { opacity: 1; } 100% { opacity: 1; } }
    .tag { animation: m5_tagopacity 19s linear 0s both; }
    @keyframes m5_tagopacity { 0% { opacity: 0; } 44.211% { opacity: 0; } 48.421% { opacity: 1; } 96.842% { opacity: 1; } 100% { opacity: 1; } }
    .btn { animation: m5_btnopacity 19s linear 0s both; }
    @keyframes m5_btnopacity { 0% { opacity: 0; } 62.105% { opacity: 0; } 66.316% { opacity: 1; } 96.842% { opacity: 1; } 100% { opacity: 1; } }
    .btn { animation: attentionPulse 1.8s var(--ease-soft) 13.0s 2; }
    .sub { animation: m5_subopacity 19s linear 0s both; }
    @keyframes m5_subopacity { 0% { opacity: 0; } 77.895% { opacity: 0; } 82.105% { opacity: 1; } 96.842% { opacity: 1; } 100% { opacity: 1; } }
  `,
  // <<< DIGITAL-INFRA
  // >>> VAIDUOKLIS (generuoja lessons/vaiduoklis-po-numeriu/build_scenes.py — ranka neredaguoti)
  '01-astuonetas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .cp { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }
    .cur { animation: k01 14s linear 0s both; }
    @keyframes k01 { 0% { transform: translate(900px, 820px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(900px, 820px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 18.571% { transform: translate(900px, 820px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 35.714% { transform: translate(1138px, 556px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 60.000% { transform: translate(1142px, 560px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 88.571% { transform: translate(1560px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(1560px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
    .ring { animation: m01_ringoutlinecolor 14s linear 0s both; }
    @keyframes m01_ringoutlinecolor { 0% { outline-color: transparent; } 40.000% { outline-color: transparent; } 45.000% { outline-color: var(--c-amber-solid); } 95.714% { outline-color: var(--c-amber-solid); } 100% { outline-color: var(--c-amber-solid); } }
    .flag { animation: m01_flagopacity 14s linear 0s both; }
    @keyframes m01_flagopacity { 0% { opacity: 0; } 58.571% { opacity: 0; } 63.571% { opacity: 1; } 95.714% { opacity: 1; } 100% { opacity: 1; } }
    .flag { animation: iconPulse 1.5s var(--ease-soft) 9.4s 2; }
  `,
  '02-ar-galioja': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .tl-rail { animation: m02_tlrailopacity 23s linear 0s both; }
    @keyframes m02_tlrailopacity { 0% { opacity: 0; } 2.609% { opacity: 0; } 5.652% { opacity: 1; } 97.391% { opacity: 1; } 100% { opacity: 1; } }
    .na { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 1.8s forwards; }
    .tm { opacity: 0; animation: fadeIn 0.5s linear 4.6s forwards; }
    .nb { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 7.6s forwards; }
    .nb .dot { animation: iconPulse 1.5s var(--ease-soft) 8.4s 2; }
    .c-bad { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 11.6s forwards; }
    .c-good { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 15.4s forwards; }
    .src { animation: m02_srcopacity 23s linear 0s both; }
    @keyframes m02_srcopacity { 0% { opacity: 0; } 84.348% { opacity: 0; } 87.391% { opacity: 1; } 97.391% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '03-tinkle': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .s0 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.50s forwards; }
    .s1 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.66s forwards; }
    .s2 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.82s forwards; }
    .s3 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.98s forwards; }
    .s4 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 1.14s forwards; }
    .s5 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.60s forwards; }
    .s6 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.76s forwards; }
    .s7 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.92s forwards; }
    .s8 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 1.08s forwards; }
    .s9 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 1.24s forwards; }
    .s10 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.70s forwards; }
    .s11 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.86s forwards; }
    .s12 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 1.02s forwards; }
    .s13 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 1.18s forwards; }
    .s14 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 1.34s forwards; }
    .s15 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.80s forwards; }
    .s16 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 0.96s forwards; }
    .s17 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 1.12s forwards; }
    .s18 { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) 1.28s forwards; }
    @keyframes piesiama { from { stroke-dashoffset: var(--dash); } to { stroke-dashoffset: 0; } }
    .gate { animation: m03_gateopacity 17s linear 0s both; }
    @keyframes m03_gateopacity { 0% { opacity: 0; } 14.118% { opacity: 0; } 18.824% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .gate img { animation: iconPulse 1.8s var(--ease-soft) 3.4s 2; }
    .hit.h0 { stroke-dashoffset: var(--dash); animation: piesiama 1.1s var(--ease-soft) 5.00s forwards; }
    .hd.h0 { animation: m03_hdh0r 17s linear 0s both; }
    @keyframes m03_hdh0r { 0% { r: 0; } 35.882% { r: 0; } 38.824% { r: 11; } 41.176% { r: 9; } 96.471% { r: 9; } 100% { r: 9; } }
    .hit.h1 { stroke-dashoffset: var(--dash); animation: piesiama 1.1s var(--ease-soft) 5.50s forwards; }
    .hd.h1 { animation: m03_hdh1r 17s linear 0s both; }
    @keyframes m03_hdh1r { 0% { r: 0; } 38.824% { r: 0; } 41.765% { r: 11; } 44.118% { r: 9; } 96.471% { r: 9; } 100% { r: 9; } }
    .hit.h2 { stroke-dashoffset: var(--dash); animation: piesiama 1.1s var(--ease-soft) 6.00s forwards; }
    .hd.h2 { animation: m03_hdh2r 17s linear 0s both; }
    @keyframes m03_hdh2r { 0% { r: 0; } 41.765% { r: 0; } 44.706% { r: 11; } 47.059% { r: 9; } 96.471% { r: 9; } 100% { r: 9; } }
    .flag { animation: m03_flagopacity 17s linear 0s both; }
    @keyframes m03_flagopacity { 0% { opacity: 0; } 61.176% { opacity: 0; } 65.882% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .cap { animation: m03_capopacity 17s linear 0s both; }
    @keyframes m03_capopacity { 0% { opacity: 0; } 74.118% { opacity: 0; } 78.824% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '04-du-sluoksniai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .pan-t { opacity: 0; animation: fadeUpMedium 0.55s var(--ease-spring) 0.5s forwards; }
    .fix { animation: m04_fixopacity 15s linear 0s both; }
    @keyframes m04_fixopacity { 0% { opacity: 0; } 9.333% { opacity: 0; } 14.000% { opacity: 1; } 96.000% { opacity: 1; } 100% { opacity: 1; } }
    .pan-b { opacity: 0; animation: issislenka 0.7s var(--ease-spring) 3.4s forwards; }
    @keyframes issislenka { from { opacity: 0; transform: translateY(-56px) scale(.97); } to { opacity: 1; transform: none; } }
    .hl-t { animation: m04_hltbackground 15s linear 0s both; }
    @keyframes m04_hltbackground { 0% { background: transparent; } 36.000% { background: transparent; } 40.000% { background: rgba(110,231,183,.26); } 96.000% { background: rgba(110,231,183,.26); } 100% { background: rgba(110,231,183,.26); } }
    .n-t { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 5.8s forwards; }
    .hl-h { animation: m04_hlhbackground 15s linear 0s both; }
    @keyframes m04_hlhbackground { 0% { background: transparent; } 58.667% { background: transparent; } 62.667% { background: rgba(167,139,250,.38); } 96.000% { background: rgba(167,139,250,.38); } 100% { background: rgba(167,139,250,.38); } }
    .n-b { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 9.2s forwards; }
  `,
  '05-administratorius-taiso': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .ed-lbl, .ed { opacity: 0; animation: fadeUpMedium 0.55s var(--ease-spring) 0.45s forwards; }
    .cur { animation: k05 22s linear 0s both; }
    @keyframes k05 { 0% { transform: translate(1120px, 620px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(1120px, 620px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 7.273% { transform: translate(1120px, 620px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 15.455% { transform: translate(430px, 300px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 20.909% { transform: translate(700px, 304px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 29.091% { transform: translate(704px, 308px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 41.818% { transform: translate(48px, 70px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 51.818% { transform: translate(50px, 72px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 68.182% { transform: translate(1240px, 660px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(1240px, 660px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
    .ed-body { animation: m05_edbodyopacity 22s linear 0s both; }
    @keyframes m05_edbodyopacity { 0% { opacity: 1; } 0.000% { opacity: 1; } 47.727% { opacity: 1; } 47.909% { opacity: 0; } 97.273% { opacity: 0; } 100% { opacity: 0; } }
    .ed-src { animation: m05_edsrcopacity 22s linear 0s both; }
    @keyframes m05_edsrcopacity { 0% { opacity: 0; } 0.000% { opacity: 0; } 47.727% { opacity: 0; } 47.909% { opacity: 1; } 97.273% { opacity: 1; } 100% { opacity: 1; } }
    .e-a { animation: m05_eaopacity 22s linear 0s both; }
    @keyframes m05_eaopacity { 0% { opacity: 1; } 0.000% { opacity: 1; } 47.727% { opacity: 1; } 47.909% { opacity: 0; } 97.273% { opacity: 0; } 100% { opacity: 0; } }
    .e-b { animation: m05_ebopacity 22s linear 0s both; }
    @keyframes m05_ebopacity { 0% { opacity: 0; } 0.000% { opacity: 0; } 47.727% { opacity: 0; } 47.909% { opacity: 1; } 97.273% { opacity: 1; } 100% { opacity: 1; } }
    .sel { animation: m05_selbackground 22s linear 0s both; }
    @keyframes m05_selbackground { 0% { background: transparent; } 20.000% { background: transparent; } 21.818% { background: #b4d5fe; } 28.636% { background: #b4d5fe; } 29.091% { background: transparent; } 97.273% { background: transparent; } 100% { background: transparent; } }
    .caret { animation: m05_caretopacity 22s linear 0s both; }
    @keyframes m05_caretopacity { 0% { opacity: 0; } 29.091% { opacity: 0; } 30.000% { opacity: 1; } 38.182% { opacity: 1; } 39.545% { opacity: 0; } 97.273% { opacity: 0; } 100% { opacity: 0; } }
    .t-old { animation: m05_toldopacity 22s linear 0s both; }
    @keyframes m05_toldopacity { 0% { opacity: 1; } 29.091% { opacity: 1; } 29.545% { opacity: 0; } 97.273% { opacity: 0; } 100% { opacity: 0; } }
    .t-new { animation: m05_tnewopacity 22s linear 0s both; }
    @keyframes m05_tnewopacity { 0% { opacity: 0; } 29.091% { opacity: 0; } 29.545% { opacity: 1; } 97.273% { opacity: 1; } 100% { opacity: 1; } }
    .r-src { animation: ratilas 0.7s ease-out 9.7s forwards; }
    .ed-src .hl-a { animation: attentionPulse 1.6s var(--ease-soft) 13.0s 2; }
    .chip { animation: m05_chipopacity 22s linear 0s both; }
    @keyframes m05_chipopacity { 0% { opacity: 0; } 74.545% { opacity: 0; } 78.182% { opacity: 1; } 97.273% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '06-vaiduoklis': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .side { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.5s forwards; }
    .arrow { opacity: 0; animation: fadeIn 0.4s linear 2.6s forwards; }
    .ph { opacity: 0; animation: slinktisIsDesines 0.6s var(--ease-spring) 2.9s forwards; }
    .cur { animation: k07 14s linear 0s both; }
    @keyframes k07 { 0% { transform: translate(640px, 420px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(640px, 420px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 10.000% { transform: translate(640px, 420px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 21.429% { transform: translate(300px, 250px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 40.000% { transform: translate(304px, 254px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 70.000% { transform: translate(600px, 400px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(600px, 400px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
    .r-tap { animation: ratilas 0.7s ease-out 3.4s forwards; }
    .dial-num { animation: m07_dialnumopacity 14s linear 0s both; }
    @keyframes m07_dialnumopacity { 0% { opacity: 0; } 38.571% { opacity: 0; } 43.571% { opacity: 1; } 95.714% { opacity: 1; } 100% { opacity: 1; } }
    .dial-ico { animation: iconPulse 1.6s var(--ease-soft) 6.4s 3; }
    .ghost { animation: m07_ghostopacity 14s linear 0s both; }
    @keyframes m07_ghostopacity { 0% { opacity: 0; } 61.429% { opacity: 0; } 66.429% { opacity: 1; } 95.714% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '07-kopijavimas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .col:first-of-type { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.5s forwards; }
    .col:last-of-type { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 1.1s forwards; }
    .blk-a { animation: m08_blkabackground 17s linear 0s both; }
    @keyframes m08_blkabackground { 0% { background: #fff; } 12.941% { background: #fff; } 15.882% { background: #dbeafe; } 37.647% { background: #dbeafe; } 40.000% { background: #fff; } 96.471% { background: #fff; } 100% { background: #fff; } }
    .kc1 { animation: m08_kc1opacity 17s linear 0s both; }
    @keyframes m08_kc1opacity { 0% { opacity: 0; } 18.824% { opacity: 0; } 21.176% { opacity: 1; } 29.412% { opacity: 1; } 31.765% { opacity: 0; } 96.471% { opacity: 0; } 100% { opacity: 0; } }
    .fly { animation: m08_flyopacity 17s linear 0s both; }
    @keyframes m08_flyopacity { 0% { opacity: 0; } 24.706% { opacity: 0; } 27.059% { opacity: 1; } 38.824% { opacity: 1; } 41.176% { opacity: 0; } 96.471% { opacity: 0; } 100% { opacity: 0; } }
    .fly { animation: m08_flytransform 17s linear 0s both; }
    @keyframes m08_flytransform { 0% { transform: translate(0, 0); } 25.882% { transform: translate(0, 0); } 38.824% { transform: translate(790px, 0); } 96.471% { transform: translate(790px, 0); } 100% { transform: translate(790px, 0); } }
    .kc2 { animation: m08_kc2opacity 17s linear 0s both; }
    @keyframes m08_kc2opacity { 0% { opacity: 0; } 36.471% { opacity: 0; } 38.824% { opacity: 1; } 47.059% { opacity: 1; } 49.412% { opacity: 0; } 96.471% { opacity: 0; } 100% { opacity: 0; } }
    .blk-b { animation: m08_blkbopacity 17s linear 0s both; }
    @keyframes m08_blkbopacity { 0% { opacity: 0; } 37.647% { opacity: 0; } 41.176% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    @keyframes m08_boldopacity { 0% { opacity: 1; } 0.000% { opacity: 1; } 60.588% { opacity: 1; } 61.176% { opacity: 0; } 96.471% { opacity: 0; } 100% { opacity: 0; } }
    @keyframes m08_boldbackground { 0% { background: transparent; } 50.588% { background: transparent; } 52.941% { background: #dbeafe; } 60.000% { background: #dbeafe; } 60.588% { background: transparent; } 96.471% { background: transparent; } 100% { background: transparent; } }
    .b-old { animation: m08_boldopacity 17s linear 0s both, m08_boldbackground 17s linear 0s both; }
    .b-num { animation: m08_bnumopacity 17s linear 0s both; }
    @keyframes m08_bnumopacity { 0% { opacity: 0; } 60.588% { opacity: 0; } 61.176% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .strip { animation: m08_stripopacity 17s linear 0s both; }
    @keyframes m08_stripopacity { 0% { opacity: 0; } 68.235% { opacity: 0; } 72.353% { opacity: 1; } 96.471% { opacity: 1; } 100% { opacity: 1; } }
    .strip .hl-h { animation: iconPulse 1.5s var(--ease-soft) 13.2s 2; }
  `,
  '08-skaiciai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .p1 { opacity: 0; animation: fadeUpLight 0.5s var(--ease-spring) 0.9s forwards; }
    .p2 { opacity: 0; animation: fadeUpLight 0.5s var(--ease-spring) 4.2s forwards; }
    .p3 { opacity: 0; animation: fadeUpLight 0.5s var(--ease-spring) 8.0s forwards; }
    .det { animation: m09_detopacity 18s linear 0s both; }
    @keyframes m09_detopacity { 0% { opacity: 0; } 63.333% { opacity: 0; } 67.778% { opacity: 1; } 96.667% { opacity: 1; } 100% { opacity: 1; } }
    .e1 { opacity: 0; animation: fadeIn 0.4s linear 12.40s forwards; }
    .e2 { opacity: 0; animation: fadeIn 0.4s linear 12.80s forwards; }
    .e3 { opacity: 0; animation: fadeIn 0.4s linear 13.20s forwards; }
  `,
  '09-patikra': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .ph { opacity: 0; animation: slinktisIsDesines 0.6s var(--ease-spring) 0.5s forwards; }
    .s0 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 1.20s forwards; }
    .s1 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 2.30s forwards; }
    .s2 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 3.60s forwards; }
    .tick { animation: m12_tickopacity 13s linear 0s both; }
    @keyframes m12_tickopacity { 0% { opacity: 0; } 47.692% { opacity: 0; } 53.077% { opacity: 1; } 95.385% { opacity: 1; } 100% { opacity: 1; } }
    .dial-ico { animation: iconPulse 1.6s var(--ease-soft) 5.2s 2; }
    .cta { animation: m12_ctaopacity 13s linear 0s both; }
    @keyframes m12_ctaopacity { 0% { opacity: 0; } 64.615% { opacity: 0; } 70.000% { opacity: 1; } 95.385% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '10-grisime': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .k0 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 0.70s forwards; }
    .k1 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 1.50s forwards; }
    .k2 { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 2.30s forwards; }
    .hb { opacity: 0; animation: slinktisIsDesines 0.6s var(--ease-spring) 1.1s forwards; }
    .ba .b .t::after { animation: m13_babtaftertransform 30s linear 0s both; }
    @keyframes m13_babtaftertransform { 0% { transform: scaleX(0); } 11.333% { transform: scaleX(0); } 14.000% { transform: scaleX(1); } 98.000% { transform: scaleX(1); } 100% { transform: scaleX(1); } }
    @keyframes m13_babopacity { 0% { opacity: 1; } 11.333% { opacity: 1; } 15.333% { opacity: .45; } 98.000% { opacity: .45; } 100% { opacity: .45; } }
    @keyframes m13_babfilter { 0% { filter: grayscale(0); } 11.333% { filter: grayscale(0); } 15.333% { filter: grayscale(1); } 98.000% { filter: grayscale(1); } 100% { filter: grayscale(1); } }
    .ba .b { animation: m13_babopacity 30s linear 0s both, m13_babfilter 30s linear 0s both; }
    .ba .a { opacity: 0; animation: fadeUpLight 0.5s var(--ease-spring) 4.6s forwards; }
    .hb-count { animation: m13_hbcountopacity 30s linear 0s both; }
    @keyframes m13_hbcountopacity { 0% { opacity: 0; } 20.000% { opacity: 0; } 22.333% { opacity: 1; } 98.000% { opacity: 1; } 100% { opacity: 1; } }
    .sym { animation: m13_symopacity 30s linear 0s both; }
    @keyframes m13_symopacity { 0% { opacity: 0; } 32.667% { opacity: 0; } 35.333% { opacity: 1; } 98.000% { opacity: 1; } 100% { opacity: 1; } }
    .sym { animation: iconPulse 1.8s var(--ease-soft) 10.6s 2; }
    .lead { animation: m13_leadopacity 30s linear 0s both; }
    @keyframes m13_leadopacity { 0% { opacity: 0; } 50.000% { opacity: 0; } 53.000% { opacity: 1; } 98.000% { opacity: 1; } 100% { opacity: 1; } }
    .big { animation: m13_bigopacity 30s linear 0s both; }
    @keyframes m13_bigopacity { 0% { opacity: 0; } 78.000% { opacity: 0; } 81.000% { opacity: 1; } 98.000% { opacity: 1; } 100% { opacity: 1; } }
  `,
  // <<< VAIDUOKLIS
  // >>> IKLIJUOTAS-TEKSTAS (generuoja lessons/kas-slypi-po-iklijuotu-tekstu/build_scenes.py — ranka neredaguoti)
  '01-atrodo-tvarkingai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
    .cursor-wrap { animation: k01 14s linear 0s both; }
    @keyframes k01 { 0% { transform: translate(1040px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(1040px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 14.286% { transform: translate(1040px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 24.286% { transform: translate(720px, 432.65625px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 40.000% { transform: translate(900px, 454.65625px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 50.000% { transform: translate(640px, 526.65625px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 64.286% { transform: translate(560px, 632.65625px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 75.714% { transform: translate(1040px, 660px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(1040px, 660px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
  `,
  '02-baltai-ant-juodo': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
    .cursor-wrap { animation: k02 15s linear 0s both; }
    @keyframes k02 { 0% { transform: translate(760px, 620px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(760px, 620px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 12.000% { transform: translate(760px, 620px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 19.333% { transform: translate(25.0px, 481.4453125px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 38.667% { transform: translate(25.0px, 481.4453125px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 45.333% { transform: translate(1180px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(1180px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
    .r1 { animation: ratilasIK 0.6s ease-out 3.4s forwards; }
    .r2 { animation: ratilasIK 0.6s ease-out 5.0s forwards; }
    @keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }
    .tip-1 { animation: m02_tip1opacity 15s linear 0s both; }
    @keyframes m02_tip1opacity { 0% { opacity: 0; } 19.333% { opacity: 0; } 20.667% { opacity: 1; } 22.667% { opacity: 1; } 23.667% { opacity: 0; } 100% { opacity: 0; } }
    .tip-2 { animation: m02_tip2opacity 15s linear 0s both; }
    @keyframes m02_tip2opacity { 0% { opacity: 0; } 24.667% { opacity: 0; } 26.000% { opacity: 1; } 33.333% { opacity: 1; } 34.333% { opacity: 0; } 100% { opacity: 0; } }
    .site { animation: m02_sitebackgroundcolor 15s linear 0s both; }
    @keyframes m02_sitebackgroundcolor { 0% { background-color: #f2f2f2; } 22.667% { background-color: #f2f2f2; } 24.667% { background-color: #ffffff; } 33.333% { background-color: #ffffff; } 36.667% { background-color: #373737; } 100% { background-color: #373737; } }
    .h-n { animation: m02_hnopacity 15s linear 0s both; }
    @keyframes m02_hnopacity { 0% { opacity: 1; } 22.667% { opacity: 1; } 24.667% { opacity: 0; } 33.333% { opacity: 0; } 36.667% { opacity: 0; } 100% { opacity: 0; } }
    .h-b { animation: m02_hbopacity 15s linear 0s both; }
    @keyframes m02_hbopacity { 0% { opacity: 0; } 22.667% { opacity: 0; } 24.667% { opacity: 1; } 33.333% { opacity: 1; } 36.667% { opacity: 0; } 100% { opacity: 0; } }
    .h-d { animation: m02_hdopacity 15s linear 0s both; }
    @keyframes m02_hdopacity { 0% { opacity: 0; } 22.667% { opacity: 0; } 24.667% { opacity: 0; } 33.333% { opacity: 0; } 36.667% { opacity: 1; } 100% { opacity: 1; } }
    .a-n { animation: m02_anopacity 15s linear 0s both; }
    @keyframes m02_anopacity { 0% { opacity: 1; } 22.667% { opacity: 1; } 24.667% { opacity: 0; } 33.333% { opacity: 0; } 36.667% { opacity: 0; } 100% { opacity: 0; } }
    .a-b { animation: m02_abopacity 15s linear 0s both; }
    @keyframes m02_abopacity { 0% { opacity: 0; } 22.667% { opacity: 0; } 24.667% { opacity: 1; } 33.333% { opacity: 1; } 36.667% { opacity: 0; } 100% { opacity: 0; } }
    .a-d { animation: m02_adopacity 15s linear 0s both; }
    @keyframes m02_adopacity { 0% { opacity: 0; } 22.667% { opacity: 0; } 24.667% { opacity: 0; } 33.333% { opacity: 0; } 36.667% { opacity: 1; } 100% { opacity: 1; } }
    .s-page { animation: m02_spagebackgroundcolor 15s linear 0s both; }
    @keyframes m02_spagebackgroundcolor { 0% { background-color: #f2f2f2; } 22.667% { background-color: #f2f2f2; } 24.667% { background-color: #ffffff; } 33.333% { background-color: #ffffff; } 36.667% { background-color: #373737; } 100% { background-color: #373737; } }
    .s-card { animation: m02_scardbackgroundcolor 15s linear 0s both; }
    @keyframes m02_scardbackgroundcolor { 0% { background-color: #ffffff; } 22.667% { background-color: #ffffff; } 24.667% { background-color: #ffffff; } 33.333% { background-color: #ffffff; } 36.667% { background-color: #373737; } 100% { background-color: #373737; } }
    .s-side div { animation: m02_ssidedivbackgroundcolor 15s linear 0s both; }
    @keyframes m02_ssidedivbackgroundcolor { 0% { background-color: #373737; } 22.667% { background-color: #373737; } 24.667% { background-color: #000000; } 33.333% { background-color: #000000; } 36.667% { background-color: #373737; } 100% { background-color: #373737; } }
    .s-h1 { animation: m02_sh1color 15s linear 0s both; }
    @keyframes m02_sh1color { 0% { color: #373737; } 22.667% { color: #373737; } 24.667% { color: #000000; } 33.333% { color: #000000; } 36.667% { color: #ffffff; } 100% { color: #ffffff; } }
    .s-p { animation: m02_spcolor 15s linear 0s both; }
    @keyframes m02_spcolor { 0% { color: #5f5f5f; } 22.667% { color: #5f5f5f; } 24.667% { color: #000000; } 33.333% { color: #000000; } 36.667% { color: #ffffff; } 100% { color: #ffffff; } }
    .dim { animation: m02_dimopacity 15s linear 0s both; }
    @keyframes m02_dimopacity { 0% { opacity: 0; } 49.333% { opacity: 0; } 52.667% { opacity: 1; } 100% { opacity: 1; } }
    .mark { animation: m02_markopacity 15s linear 0s both; }
    @keyframes m02_markopacity { 0% { opacity: 0; } 49.333% { opacity: 0; } 52.667% { opacity: 1; } 100% { opacity: 1; } }
    .say { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 8.1s forwards; }
    .bw-wrap { transform-origin: 574.21875px 550.65625px; animation: zoom02 15s linear 0s both; }
    @keyframes zoom02 { 0% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } 49.333% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } 54.667% { transform: scale(1.05); animation-timing-function: cubic-bezier(.4,0,.2,1); } 100% { transform: scale(1.05); animation-timing-function: cubic-bezier(.4,0,.2,1); } }
  `,
  '03-didinimas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
    .cursor-wrap { animation: k03 13s linear 0s both; }
    @keyframes k03 { 0% { transform: translate(900px, 640px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(900px, 640px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 12.308% { transform: translate(900px, 640px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 20.000% { transform: translate(25.0px, 544.3359375px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 40.000% { transform: translate(25.0px, 544.3359375px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 47.692% { transform: translate(1000px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(1000px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
    .r1 { animation: ratilasIK 0.6s ease-out 3.0s forwards; }
    .r2 { animation: ratilasIK 0.6s ease-out 4.6s forwards; }
    @keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }
    .tip-1 { animation: m03_tip1opacity 13s linear 0s both; }
    @keyframes m03_tip1opacity { 0% { opacity: 0; } 19.231% { opacity: 0; } 20.769% { opacity: 1; } 23.077% { opacity: 1; } 24.231% { opacity: 0; } 100% { opacity: 0; } }
    .tip-2 { animation: m03_tip2opacity 13s linear 0s both; }
    @keyframes m03_tip2opacity { 0% { opacity: 0; } 25.385% { opacity: 0; } 26.923% { opacity: 1; } 35.385% { opacity: 1; } 36.538% { opacity: 0; } 100% { opacity: 0; } }
    .h-n { animation: m03_hnopacity 13s linear 0s both; }
    @keyframes m03_hnopacity { 0% { opacity: 1; } 23.077% { opacity: 1; } 24.615% { opacity: 0; } 35.385% { opacity: 0; } 36.923% { opacity: 0; } 100% { opacity: 0; } }
    .h-s1 { animation: m03_hs1opacity 13s linear 0s both; }
    @keyframes m03_hs1opacity { 0% { opacity: 0; } 23.077% { opacity: 0; } 24.615% { opacity: 1; } 35.385% { opacity: 1; } 36.923% { opacity: 0; } 100% { opacity: 0; } }
    .h-s2 { animation: m03_hs2opacity 13s linear 0s both; }
    @keyframes m03_hs2opacity { 0% { opacity: 0; } 23.077% { opacity: 0; } 24.615% { opacity: 0; } 35.385% { opacity: 0; } 36.923% { opacity: 1; } 100% { opacity: 1; } }
    .a-n { animation: m03_anopacity 13s linear 0s both; }
    @keyframes m03_anopacity { 0% { opacity: 1; } 23.077% { opacity: 1; } 24.615% { opacity: 0; } 35.385% { opacity: 0; } 36.923% { opacity: 0; } 100% { opacity: 0; } }
    .a-s1 { animation: m03_as1opacity 13s linear 0s both; }
    @keyframes m03_as1opacity { 0% { opacity: 0; } 23.077% { opacity: 0; } 24.615% { opacity: 1; } 35.385% { opacity: 1; } 36.923% { opacity: 0; } 100% { opacity: 0; } }
    .a-s2 { animation: m03_as2opacity 13s linear 0s both; }
    @keyframes m03_as2opacity { 0% { opacity: 0; } 23.077% { opacity: 0; } 24.615% { opacity: 0; } 35.385% { opacity: 0; } 36.923% { opacity: 1; } 100% { opacity: 1; } }
    .s-page { animation: m03_spagetop 13s linear 0s both; }
    @keyframes m03_spagetop { 0% { top: 222.66px; } 23.077% { top: 222.66px; } 25.769% { top: 254.30px; } 35.385% { top: 254.30px; } 38.077% { top: 270.70px; } 100% { top: 270.70px; } }
    .s-p { animation: m03_spfontsize 13s linear 0s both; }
    @keyframes m03_spfontsize { 0% { font-size: 22.00px; } 23.077% { font-size: 22.00px; } 25.769% { font-size: 23.47px; } 35.385% { font-size: 23.47px; } 38.077% { font-size: 25.67px; } 100% { font-size: 25.67px; } }
    .s-h1 { animation: m03_sh1fontsize 13s linear 0s both; }
    @keyframes m03_sh1fontsize { 0% { font-size: 36.00px; } 23.077% { font-size: 36.00px; } 25.769% { font-size: 38.40px; } 35.385% { font-size: 38.40px; } 38.077% { font-size: 42.00px; } 100% { font-size: 42.00px; } }
    .s-scroll { animation: m03_sscrolltransform 13s linear 0s both; }
    @keyframes m03_sscrolltransform { 0% { transform: translateY(0px); } 43.077% { transform: translateY(0px); } 48.462% { transform: translateY(-0px); } 100% { transform: translateY(-0px); } }
    .s-p::before { animation: m03_spbeforeopacity 13s linear 0s both; }
    @keyframes m03_spbeforeopacity { 0% { opacity: 0; } 50.769% { opacity: 0; } 53.846% { opacity: 1; } 100% { opacity: 1; } }
    .w-p::before, .w-t::before { animation: m03_wpbeforewtbeforeopacity 13s linear 0s both; }
    @keyframes m03_wpbeforewtbeforeopacity { 0% { opacity: 0; } 54.615% { opacity: 0; } 57.692% { opacity: 1; } 100% { opacity: 1; } }
    .lg-grow { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 6.8999999999999995s forwards; }
    .lg-stay { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 7.3999999999999995s forwards; }
  `,
  '04-ko-nesimato': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .pan-l { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.6s forwards; }
    .pan-r { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 1.6s forwards; }
    .ln0 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 2.40s forwards; }
    .ln1 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 2.68s forwards; }
    .ln2 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 2.96s forwards; }
    .ln3 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 3.24s forwards; }
    .ln4 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 3.52s forwards; }
    .ln5 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 3.80s forwards; }
    .ln6 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 4.08s forwards; }
    .ln7 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 4.36s forwards; }
    .ln8 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 4.64s forwards; }
    .ln9 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 4.92s forwards; }
    .ln10 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 5.20s forwards; }
    .ln11 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 5.48s forwards; }
    .ln12 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 5.76s forwards; }
    .ln13 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 6.04s forwards; }
    .ln14 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 6.32s forwards; }
    .ln15 { opacity: 0; animation: fadeUpLight 0.3s var(--ease-spring) 6.60s forwards; }
    .hl-f { animation: hl04f 15s linear 0s both; }
    @keyframes hl04f { 0% { background: transparent; } 49.867% { background: transparent; } 51.867% { background: rgba(167,139,250,.35); } 100% { background: rgba(167,139,250,.35); } }
    .ch-f { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 7.48s forwards; }
    .hl-s { animation: hl04s 15s linear 0s both; }
    @keyframes hl04s { 0% { background: transparent; } 55.867% { background: transparent; } 57.867% { background: rgba(52,211,153,.32); } 100% { background: rgba(52,211,153,.32); } }
    .ch-s { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 8.38s forwards; }
    .hl-c { animation: hl04c 15s linear 0s both; }
    @keyframes hl04c { 0% { background: transparent; } 61.867% { background: transparent; } 63.867% { background: rgba(251,146,60,.38); } 100% { background: rgba(251,146,60,.38); } }
    .ch-c { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 9.28s forwards; }
  `,
  '05-apdara-atnesa-visi': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .tgt { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.5s forwards; }
    .src0 { opacity: 0; animation: slinktisIsKaires 0.5s var(--ease-spring) 1.00s forwards; }
    .bag0 { animation: bag05_0 11s linear 0s both; }
    @keyframes bag05_0 { 0%, 12.727% { opacity: 0; transform: translate(500px, 64px) rotate(0deg); } 14.545% { opacity: 1; transform: translate(500px, 64px) rotate(0deg); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 24.545% { opacity: 1; transform: translate(1050px, 520px) rotate(-6deg); } 100% { opacity: 1; transform: translate(1050px, 520px) rotate(-6deg); } }
    .src1 { opacity: 0; animation: slinktisIsKaires 0.5s var(--ease-spring) 1.90s forwards; }
    .bag1 { animation: bag05_1 11s linear 0s both; }
    @keyframes bag05_1 { 0%, 20.909% { opacity: 0; transform: translate(500px, 188px) rotate(0deg); } 22.727% { opacity: 1; transform: translate(500px, 188px) rotate(0deg); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 32.727% { opacity: 1; transform: translate(1170px, 520px) rotate(4deg); } 100% { opacity: 1; transform: translate(1170px, 520px) rotate(4deg); } }
    .src2 { opacity: 0; animation: slinktisIsKaires 0.5s var(--ease-spring) 2.80s forwards; }
    .bag2 { animation: bag05_2 11s linear 0s both; }
    @keyframes bag05_2 { 0%, 29.091% { opacity: 0; transform: translate(500px, 312px) rotate(0deg); } 30.909% { opacity: 1; transform: translate(500px, 312px) rotate(0deg); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 40.909% { opacity: 1; transform: translate(1290px, 520px) rotate(-2deg); } 100% { opacity: 1; transform: translate(1290px, 520px) rotate(-2deg); } }
    .src3 { opacity: 0; animation: slinktisIsKaires 0.5s var(--ease-spring) 3.70s forwards; }
    .bag3 { animation: bag05_3 11s linear 0s both; }
    @keyframes bag05_3 { 0%, 37.273% { opacity: 0; transform: translate(500px, 436px) rotate(0deg); } 39.091% { opacity: 1; transform: translate(500px, 436px) rotate(0deg); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 49.091% { opacity: 1; transform: translate(1410px, 520px) rotate(7deg); } 100% { opacity: 1; transform: translate(1410px, 520px) rotate(7deg); } }
    .src4 { opacity: 0; animation: slinktisIsKaires 0.5s var(--ease-spring) 4.60s forwards; }
    .bag4 { animation: bag05_4 11s linear 0s both; }
    @keyframes bag05_4 { 0%, 45.455% { opacity: 0; transform: translate(500px, 560px) rotate(0deg); } 47.273% { opacity: 1; transform: translate(500px, 560px) rotate(0deg); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 57.273% { opacity: 1; transform: translate(1530px, 520px) rotate(-4deg); } 100% { opacity: 1; transform: translate(1530px, 520px) rotate(-4deg); } }
  `,
  '06-neregys-klauso': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
    .sr { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 1.4s forwards; }
    .blackout { animation: u06_neregys_klauso_blackoutopacity 16s linear 0s both; }
    @keyframes u06_neregys_klauso_blackoutopacity { 0% { opacity: 0; } 6.250% { opacity: 0; } 11.250% { opacity: 1; } 100% { opacity: 1; } }
    .focus { animation: fc_06_neregys_klauso 16s linear 0s both; }
    @keyframes fc_06_neregys_klauso { 0% { opacity: 0; top: 402.65625px; height: 42px; } 51.875% { opacity: 0; top: 402.65625px; height: 42px; animation-timing-function: steps(1, end); } 53.750% { opacity: 1; top: 402.65625px; height: 42px; animation-timing-function: steps(1, end); } 60.625% { opacity: 1; top: 444.65625px; height: 42px; animation-timing-function: steps(1, end); } 67.500% { opacity: 1; top: 486.65625px; height: 42px; animation-timing-function: steps(1, end); } 74.375% { opacity: 1; top: 528.65625px; height: 42px; animation-timing-function: steps(1, end); } }
    .say0 { animation: u06_neregys_klauso_say0opacity 16s linear 0s both; }
    @keyframes u06_neregys_klauso_say0opacity { 0% { opacity: 0; } 53.437% { opacity: 0; } 53.750% { opacity: 1; } 59.375% { opacity: 1; } 59.688% { opacity: 0; } 100% { opacity: 0; } }
    .say1 { animation: u06_neregys_klauso_say1opacity 16s linear 0s both; }
    @keyframes u06_neregys_klauso_say1opacity { 0% { opacity: 0; } 60.312% { opacity: 0; } 60.625% { opacity: 1; } 66.250% { opacity: 1; } 66.562% { opacity: 0; } 100% { opacity: 0; } }
    .say2 { animation: u06_neregys_klauso_say2opacity 16s linear 0s both; }
    @keyframes u06_neregys_klauso_say2opacity { 0% { opacity: 0; } 67.188% { opacity: 0; } 67.500% { opacity: 1; } 73.125% { opacity: 1; } 73.438% { opacity: 0; } 100% { opacity: 0; } }
    .say3 { animation: u06_neregys_klauso_say3opacity 16s linear 0s both; }
    @keyframes u06_neregys_klauso_say3opacity { 0% { opacity: 0; } 74.062% { opacity: 0; } 74.375% { opacity: 1; } 100% { opacity: 1; } }
    @keyframes bangaIK { 0%, 100% { height: 14px; } 50% { height: 52px; } }
    .wave i:nth-child(1) { animation: bangaIK 0.42s ease-in-out 8.60s 14; }
    .wave i:nth-child(2) { animation: bangaIK 0.51s ease-in-out 8.65s 14; }
    .wave i:nth-child(3) { animation: bangaIK 0.60s ease-in-out 8.70s 14; }
    .wave i:nth-child(4) { animation: bangaIK 0.69s ease-in-out 8.75s 14; }
    .wave i:nth-child(5) { animation: bangaIK 0.42s ease-in-out 8.80s 14; }
    .wave i:nth-child(6) { animation: bangaIK 0.51s ease-in-out 8.85s 14; }
    .wave i:nth-child(7) { animation: bangaIK 0.60s ease-in-out 8.90s 14; }
    .wave i:nth-child(8) { animation: bangaIK 0.69s ease-in-out 8.95s 14; }
    .wave i:nth-child(9) { animation: bangaIK 0.42s ease-in-out 9.00s 14; }
  `,
  '07-svariai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
    .sr { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 1.4s forwards; }
    .blackout { animation: u07_svariai_blackoutopacity 13s linear 0s both; }
    @keyframes u07_svariai_blackoutopacity { 0% { opacity: 0; } 7.692% { opacity: 0; } 13.846% { opacity: 1; } 100% { opacity: 1; } }
    .focus { animation: fc_07_svariai 13s linear 0s both; }
    @keyframes fc_07_svariai { 0% { opacity: 0; top: 402.65625px; height: 47px; } 39.231% { opacity: 0; top: 402.65625px; height: 47px; animation-timing-function: steps(1, end); } 41.538% { opacity: 1; top: 402.65625px; height: 47px; animation-timing-function: steps(1, end); } 64.615% { opacity: 1; top: 459.65625px; height: 82px; animation-timing-function: steps(1, end); } 78.462% { opacity: 1; top: 459.65625px; height: 47px; animation-timing-function: steps(1, end); } }
    .say0 { animation: u07_svariai_say0opacity 13s linear 0s both; }
    @keyframes u07_svariai_say0opacity { 0% { opacity: 0; } 41.154% { opacity: 0; } 41.538% { opacity: 1; } 63.077% { opacity: 1; } 63.462% { opacity: 0; } 100% { opacity: 0; } }
    .say1 { animation: u07_svariai_say1opacity 13s linear 0s both; }
    @keyframes u07_svariai_say1opacity { 0% { opacity: 0; } 64.231% { opacity: 0; } 64.615% { opacity: 1; } 76.923% { opacity: 1; } 77.308% { opacity: 0; } 100% { opacity: 0; } }
    .say2 { animation: u07_svariai_say2opacity 13s linear 0s both; }
    @keyframes u07_svariai_say2opacity { 0% { opacity: 0; } 78.077% { opacity: 0; } 78.462% { opacity: 1; } 100% { opacity: 1; } }
    @keyframes bangaIK { 0%, 100% { height: 14px; } 50% { height: 52px; } }
    .wave i:nth-child(1) { animation: bangaIK 0.42s ease-in-out 5.40s 15; }
    .wave i:nth-child(2) { animation: bangaIK 0.51s ease-in-out 5.45s 15; }
    .wave i:nth-child(3) { animation: bangaIK 0.60s ease-in-out 5.50s 15; }
    .wave i:nth-child(4) { animation: bangaIK 0.69s ease-in-out 5.55s 15; }
    .wave i:nth-child(5) { animation: bangaIK 0.42s ease-in-out 5.60s 15; }
    .wave i:nth-child(6) { animation: bangaIK 0.51s ease-in-out 5.65s 15; }
    .wave i:nth-child(7) { animation: bangaIK 0.60s ease-in-out 5.70s 15; }
    .wave i:nth-child(8) { animation: bangaIK 0.69s ease-in-out 5.75s 15; }
    .wave i:nth-child(9) { animation: bangaIK 0.42s ease-in-out 5.80s 15; }
  `,
  '07b-telefone': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .col:nth-child(1) { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.6s forwards; }
    .col:nth-child(2) { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 1.6s forwards; }
    .call-gap { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 4.4s forwards; }
    .call-dash { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 6.4s forwards; }
    .call-ok { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 8.6s forwards; }
  `,
  '08-lopas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
    .upd { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 2.8s forwards; }
    .s-p { animation: u08sp 14s linear 0s both; }
    @keyframes u08sp { 0%, 24.286% { font-family: 'Roboto', sans-serif; color: #5f5f5f; opacity: 1; } 26.071% { font-family: 'Roboto', sans-serif; color: #5f5f5f; opacity: .15; } 26.143% { font-family: 'Inter', sans-serif; color: #334155; opacity: .15; } 28.571%, 100% { font-family: 'Inter', sans-serif; color: #334155; opacity: 1; } }
    .s-h1 { animation: u08sh1 14s linear 0s both; }
    @keyframes u08sh1 { 0%, 24.286% { font-family: 'Roboto', sans-serif; color: #373737; opacity: 1; } 26.071% { font-family: 'Roboto', sans-serif; color: #373737; opacity: .15; } 26.143% { font-family: 'Inter', sans-serif; color: #1e3a5f; opacity: .15; } 28.571%, 100% { font-family: 'Inter', sans-serif; color: #1e3a5f; opacity: 1; } }
    .s-side div { animation: u08_ssidedivbackgroundcolor 14s linear 0s both; }
    @keyframes u08_ssidedivbackgroundcolor { 0% { background-color: #373737; } 24.286% { background-color: #373737; } 27.857% { background-color: #1e3a5f; } 100% { background-color: #1e3a5f; } }
    .s-card { animation: u08_scardborderradius 14s linear 0s both; }
    @keyframes u08_scardborderradius { 0% { border-radius: 0px; } 24.286% { border-radius: 0px; } 27.857% { border-radius: 16px; } 100% { border-radius: 16px; } }
    .w-p::before, .w-t::before { animation: u08_wpbeforewtbeforeopacity 14s linear 0s both; }
    @keyframes u08_wpbeforewtbeforeopacity { 0% { opacity: 0; } 51.429% { opacity: 0; } 54.286% { opacity: 1; } 100% { opacity: 1; } }
    .w-p::after, .w-t::after { animation: u08_wpafterwtafteropacity 14s linear 0s both; }
    @keyframes u08_wpafterwtafteropacity { 0% { opacity: 0; } 54.286% { opacity: 0; } 57.143% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '09-ar-kas-priziuri': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
    .pz0 { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 1.20s forwards; }
    .pz1 { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 1.90s forwards; }
    .pz2 { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 2.60s forwards; }
    .pz3 { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 3.30s forwards; }
    .pz4 { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 4.00s forwards; }
    .reader { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 6.0s forwards; }
    .rq { opacity: 0; animation: fadeIn 0.25s linear 6.8s forwards, iconPulse 0.6s var(--ease-soft) 7.0s; }
  `,
  '10-vienas-klavisas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .panel { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }
    .ring.hint { animation: u10_ringhintopacity 12s linear 0s both; }
    @keyframes u10_ringhintopacity { 0% { opacity: 0; } 10.000% { opacity: 0; } 12.500% { opacity: 1; } 28.333% { opacity: 1; } 30.833% { opacity: 0; } 100% { opacity: 0; } }
    .kk-k0 { opacity: 0; animation: fadeUpMedium 0.35s var(--ease-spring) 3.90s forwards; }
    .kk-k1 { opacity: 0; animation: fadeUpMedium 0.35s var(--ease-spring) 4.35s forwards; }
    .kk-p1 { opacity: 0; animation: fadeIn 0.2s linear 4.25s forwards; }
    .kk-k2 { opacity: 0; animation: fadeUpMedium 0.35s var(--ease-spring) 4.80s forwards; }
    .kk-p2 { opacity: 0; animation: fadeIn 0.2s linear 4.70s forwards; }
    .kk-k1 { border-color: var(--c-green-solid); color: var(--c-green-text); background: var(--c-green-bg); }
    .pasted { opacity: 0; animation: fadeIn 0.3s linear 5.4s forwards; }
    .c-bad { opacity: 0; animation: slinktisIsDesines 0.5s var(--ease-spring) 6.8s forwards; }
    .c-good { opacity: 0; animation: slinktisIsDesines 0.5s var(--ease-spring) 7.4s forwards; }
  `,
  '11-jei-jau-iklijavote': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .panel { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }
    .ka-k0 { opacity: 0; animation: fadeUpMedium 0.35s var(--ease-spring) 2.40s forwards; }
    .ka-k1 { opacity: 0; animation: fadeUpMedium 0.35s var(--ease-spring) 2.85s forwards; }
    .ka-p1 { opacity: 0; animation: fadeIn 0.2s linear 2.75s forwards; }
    .m .m-a { animation: u11ma 13s linear 0s both; }
    @keyframes u11ma { 0%, 24.615% { font-family: Calibri, 'Times New Roman', serif; font-size: 24px; color: #1F3864; background-color: transparent; font-weight: 700; font-style: normal; } 26.154%, 44.615% { font-family: Calibri, 'Times New Roman', serif; font-size: 24px; color: #1F3864; background-color: rgba(59,130,246,.28); font-weight: 700; font-style: normal; } 44.692%, 63.077% { font-family: 'Times New Roman', serif; font-size: 28px; color: #000; background-color: rgba(59,130,246,.28); font-weight: 400; font-style: normal; } 66.154%, 100% { font-family: 'Times New Roman', serif; font-size: 28px; color: #000; background-color: transparent; font-weight: 400; font-style: normal; } }
    .m .m-b { animation: u11mb 13s linear 0s both; }
    @keyframes u11mb { 0%, 24.615% { font-family: Calibri, 'Times New Roman', serif; font-size: 24px; color: #000; background-color: transparent; font-weight: 400; font-style: normal; } 26.154%, 44.615% { font-family: Calibri, 'Times New Roman', serif; font-size: 24px; color: #000; background-color: rgba(59,130,246,.28); font-weight: 400; font-style: normal; } 44.692%, 63.077% { font-family: 'Times New Roman', serif; font-size: 28px; color: #000; background-color: rgba(59,130,246,.28); font-weight: 400; font-style: normal; } 66.154%, 100% { font-family: 'Times New Roman', serif; font-size: 28px; color: #000; background-color: transparent; font-weight: 400; font-style: normal; } }
    .m .m-c { animation: u11mc 13s linear 0s both; }
    @keyframes u11mc { 0%, 24.615% { font-family: Arial, sans-serif; font-size: 21px; color: #000; background-color: #ffff00; font-weight: 400; font-style: normal; } 26.154%, 44.615% { font-family: Arial, sans-serif; font-size: 21px; color: #000; background-color: rgba(59,130,246,.28); font-weight: 400; font-style: normal; } 44.692%, 63.077% { font-family: 'Times New Roman', serif; font-size: 28px; color: #000; background-color: rgba(59,130,246,.28); font-weight: 400; font-style: normal; } 66.154%, 100% { font-family: 'Times New Roman', serif; font-size: 28px; color: #000; background-color: transparent; font-weight: 400; font-style: normal; } }
    .m .m-d { animation: u11md 13s linear 0s both; }
    @keyframes u11md { 0%, 24.615% { font-family: Georgia, serif; font-size: 25px; color: #7f7f7f; background-color: transparent; font-weight: 400; font-style: italic; } 26.154%, 44.615% { font-family: Georgia, serif; font-size: 25px; color: #7f7f7f; background-color: rgba(59,130,246,.28); font-weight: 400; font-style: italic; } 44.692%, 63.077% { font-family: 'Times New Roman', serif; font-size: 28px; color: #000; background-color: rgba(59,130,246,.28); font-weight: 400; font-style: normal; } 66.154%, 100% { font-family: 'Times New Roman', serif; font-size: 28px; color: #000; background-color: transparent; font-weight: 400; font-style: normal; } }
    .cur { animation: k11 13s linear 0s both; }
    @keyframes k11 { 0% { transform: translate(1100px, 380px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(1100px, 380px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 29.231% { transform: translate(1100px, 380px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 37.692% { transform: translate(606.8615702479339px, 18.46900826446281px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 50.769% { transform: translate(606.8615702479339px, 18.46900826446281px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 58.462% { transform: translate(1100px, 380px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(1100px, 380px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
    .r1 { animation: ratilasIK 0.6s ease-out 5.6s forwards; }
    @keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }
    .zoom { transform-origin: 613px 22px; animation: zoom11 13s linear 0s both; }
    @keyframes zoom11 { 0% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } 32.308% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } 38.462% { transform: scale(1.18); animation-timing-function: cubic-bezier(.4,0,.2,1); } 53.846% { transform: scale(1.18); animation-timing-function: cubic-bezier(.4,0,.2,1); } 60.000% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } 100% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } }
  `,
  '12-lentele-isimtis': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .lng { opacity: 0; animation: slinktisIsKaires 0.5s var(--ease-spring) 0.8s forwards; }
    .arr { opacity: 0; animation: fadeIn 0.4s linear 1.8s forwards; }
    .gs { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 2.3s forwards; }
    .panel { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 4.4s forwards; }
    .st { opacity: 0; animation: fadeIn 0.3s linear 5.6s forwards; }
    .kt-k0 { opacity: 0; animation: fadeUpMedium 0.35s var(--ease-spring) 7.40s forwards; }
    .kt-k1 { opacity: 0; animation: fadeUpMedium 0.35s var(--ease-spring) 7.85s forwards; }
    .kt-p1 { opacity: 0; animation: fadeIn 0.2s linear 7.75s forwards; }
    .st tr:first-child td { animation: u12h 17s linear 0s both; }
    @keyframes u12h { 0%, 48.235% { background-color: #D9E2F3; font-family: Calibri, serif; font-weight: 700; color: #1F3864; } 49.412%, 63.529% { background-color: rgba(59,130,246,.28); font-family: Calibri, serif; font-weight: 700; color: #1F3864; } 63.588%, 76.471% { background-color: rgba(59,130,246,.28); font-family: 'Times New Roman', serif; font-weight: 400; color: #000; } 78.824%, 100% { background-color: transparent; font-family: 'Times New Roman', serif; font-weight: 400; color: #000; } }
    .st tr:not(:first-child) td { animation: u12b 17s linear 0s both; }
    @keyframes u12b { 0%, 48.235% { background-color: #ffffff; font-family: Calibri, serif; font-weight: 400; color: #000; } 49.412%, 63.529% { background-color: rgba(59,130,246,.28); font-family: Calibri, serif; font-weight: 400; color: #000; } 63.588%, 76.471% { background-color: rgba(59,130,246,.28); font-family: 'Times New Roman', serif; font-weight: 400; color: #000; } 78.824%, 100% { background-color: transparent; font-family: 'Times New Roman', serif; font-weight: 400; color: #000; } }
    .cur { animation: k12 17s linear 0s both; }
    @keyframes k12 { 0% { transform: translate(1100px, 300px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(1100px, 300px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 52.941% { transform: translate(1100px, 300px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 58.824% { transform: translate(606.8615702479339px, 18.46900826446281px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 68.235% { transform: translate(606.8615702479339px, 18.46900826446281px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 74.118% { transform: translate(1100px, 300px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(1100px, 300px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
    .r1 { animation: ratilasIK 0.6s ease-out 10.6s forwards; }
    @keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }
    .zoom { transform-origin: 613px 22px; animation: zoom12 17s linear 0s both; }
    @keyframes zoom12 { 0% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } 54.118% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } 58.824% { transform: scale(1.18); animation-timing-function: cubic-bezier(.4,0,.2,1); } 70.588% { transform: scale(1.18); animation-timing-function: cubic-bezier(.4,0,.2,1); } 75.294% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } 100% { transform: scale(1); animation-timing-function: cubic-bezier(.4,0,.2,1); } }
  `,
  '13-redaktoriaus-mygtukai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .panel { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }
    .rg-f { animation: u13_rgfopacity 15s linear 0s both; }
    @keyframes u13_rgfopacity { 0% { opacity: 0; } 10.667% { opacity: 0; } 12.667% { opacity: 1; } 26.667% { opacity: 1; } 28.667% { opacity: 0; } 100% { opacity: 0; } }
    .cp-f { animation: u13_cpfopacity 15s linear 0s both; }
    @keyframes u13_cpfopacity { 0% { opacity: 0; } 10.667% { opacity: 0; } 12.667% { opacity: 1; } 26.667% { opacity: 1; } 28.667% { opacity: 0; } 100% { opacity: 0; } }
    .x-h { animation: u13_xhbackgroundcolor 15s linear 0s both; }
    @keyframes u13_xhbackgroundcolor { 0% { background-color: rgba(66,133,244,0); } 10.667% { background-color: rgba(66,133,244,0); } 12.667% { background-color: rgba(66,133,244,.16); } 26.667% { background-color: rgba(66,133,244,.16); } 28.667% { background-color: rgba(66,133,244,0); } 100% { background-color: rgba(66,133,244,0); } }
    .rg-l { animation: u13_rglopacity 15s linear 0s both; }
    @keyframes u13_rglopacity { 0% { opacity: 0; } 28.000% { opacity: 0; } 30.000% { opacity: 1; } 44.000% { opacity: 1; } 46.000% { opacity: 0; } 100% { opacity: 0; } }
    .cp-l { animation: u13_cplopacity 15s linear 0s both; }
    @keyframes u13_cplopacity { 0% { opacity: 0; } 28.000% { opacity: 0; } 30.000% { opacity: 1; } 44.000% { opacity: 1; } 46.000% { opacity: 0; } 100% { opacity: 0; } }
    .x-l { animation: u13_xlbackgroundcolor 15s linear 0s both; }
    @keyframes u13_xlbackgroundcolor { 0% { background-color: rgba(66,133,244,0); } 28.000% { background-color: rgba(66,133,244,0); } 30.000% { background-color: rgba(66,133,244,.16); } 44.000% { background-color: rgba(66,133,244,.16); } 46.000% { background-color: rgba(66,133,244,0); } 100% { background-color: rgba(66,133,244,0); } }
    .rg-a { animation: u13_rgaopacity 15s linear 0s both; }
    @keyframes u13_rgaopacity { 0% { opacity: 0; } 45.333% { opacity: 0; } 47.333% { opacity: 1; } 61.333% { opacity: 1; } 63.333% { opacity: 0; } 100% { opacity: 0; } }
    .cp-a { animation: u13_cpaopacity 15s linear 0s both; }
    @keyframes u13_cpaopacity { 0% { opacity: 0; } 45.333% { opacity: 0; } 47.333% { opacity: 1; } 61.333% { opacity: 1; } 63.333% { opacity: 0; } 100% { opacity: 0; } }
    .x-a { animation: u13_xabackgroundcolor 15s linear 0s both; }
    @keyframes u13_xabackgroundcolor { 0% { background-color: rgba(66,133,244,0); } 45.333% { background-color: rgba(66,133,244,0); } 47.333% { background-color: rgba(66,133,244,.16); } 61.333% { background-color: rgba(66,133,244,.16); } 63.333% { background-color: rgba(66,133,244,0); } 100% { background-color: rgba(66,133,244,0); } }
    .rg-x { animation: u13_rgxopacity 15s linear 0s both; }
    @keyframes u13_rgxopacity { 0% { opacity: 0; } 64.000% { opacity: 0; } 66.000% { opacity: 1; } 100% { opacity: 1; } }
    .rg-u { animation: u13_rguopacity 15s linear 0s both; }
    @keyframes u13_rguopacity { 0% { opacity: 0; } 68.000% { opacity: 0; } 70.000% { opacity: 1; } 100% { opacity: 1; } }
    .cp-x { animation: u13_cpxopacity 15s linear 0s both; }
    @keyframes u13_cpxopacity { 0% { opacity: 0; } 64.000% { opacity: 0; } 66.000% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '13b-pabraukimas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
    .cursor-wrap { animation: k13b 12s linear 0s both; }
    @keyframes k13b { 0% { transform: translate(900px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(900px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 13.333% { transform: translate(900px, 700px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 23.333% { transform: translate(278.59375px, 471.65625px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 46.667% { transform: translate(278.59375px, 471.65625px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 61.667% { transform: translate(228.59375px, 528.65625px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(228.59375px, 528.65625px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
    .r1 { animation: ratilasIK 0.6s ease-out 3.6s forwards; }
    @keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }
    @keyframes kruptelejaIK { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    .uw { display: inline-block; animation: kruptelejaIK 0.3s ease-in-out 3.8000000000000003s 2; }
    .tag-no { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 4.5s forwards; }
    .tag-yes { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) 7.8s forwards; }
  `,
  '14-pasitikrinkite': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }
    .bw { animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s both; }
    @keyframes pulsIK { 0% { opacity: 0; transform: scale(.7); } 40% { opacity: 1; } 100% { opacity: 0; transform: scale(1.3); } }
    .pulse { animation: pulsIK 1s ease-out 1.4s 2; }
    .cursor-wrap { animation: k14 13s linear 0s both; }
    @keyframes k14 { 0% { transform: translate(1100px, 640px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 0.000% { transform: translate(1100px, 640px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 20.000% { transform: translate(1100px, 640px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 28.462% { transform: translate(25.0px, 481.4453125px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 50.769% { transform: translate(25.0px, 481.4453125px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 58.462% { transform: translate(1100px, 640px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(1100px, 640px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } }
    .r1 { animation: ratilasIK 0.6s ease-out 4.2s forwards; }
    .r2 { animation: ratilasIK 0.6s ease-out 5.8s forwards; }
    @keyframes ratilasIK { from { opacity: .8; transform: scale(.3); } to { opacity: 0; transform: scale(1.6); } }
    .tip-1 { animation: m14_tip1opacity 13s linear 0s both; }
    @keyframes m14_tip1opacity { 0% { opacity: 0; } 28.462% { opacity: 0; } 30.000% { opacity: 1; } 32.308% { opacity: 1; } 33.462% { opacity: 0; } 100% { opacity: 0; } }
    .tip-2 { animation: m14_tip2opacity 13s linear 0s both; }
    @keyframes m14_tip2opacity { 0% { opacity: 0; } 34.615% { opacity: 0; } 36.154% { opacity: 1; } 44.615% { opacity: 1; } 45.769% { opacity: 0; } 100% { opacity: 0; } }
    .site { animation: m14_sitebackgroundcolor 13s linear 0s both; }
    @keyframes m14_sitebackgroundcolor { 0% { background-color: #f2f2f2; } 32.308% { background-color: #f2f2f2; } 34.615% { background-color: #ffffff; } 44.615% { background-color: #ffffff; } 48.462% { background-color: #373737; } 100% { background-color: #373737; } }
    .h-n { animation: m14_hnopacity 13s linear 0s both; }
    @keyframes m14_hnopacity { 0% { opacity: 1; } 32.308% { opacity: 1; } 34.615% { opacity: 0; } 44.615% { opacity: 0; } 48.462% { opacity: 0; } 100% { opacity: 0; } }
    .h-b { animation: m14_hbopacity 13s linear 0s both; }
    @keyframes m14_hbopacity { 0% { opacity: 0; } 32.308% { opacity: 0; } 34.615% { opacity: 1; } 44.615% { opacity: 1; } 48.462% { opacity: 0; } 100% { opacity: 0; } }
    .h-d { animation: m14_hdopacity 13s linear 0s both; }
    @keyframes m14_hdopacity { 0% { opacity: 0; } 32.308% { opacity: 0; } 34.615% { opacity: 0; } 44.615% { opacity: 0; } 48.462% { opacity: 1; } 100% { opacity: 1; } }
    .a-n { animation: m14_anopacity 13s linear 0s both; }
    @keyframes m14_anopacity { 0% { opacity: 1; } 32.308% { opacity: 1; } 34.615% { opacity: 0; } 44.615% { opacity: 0; } 48.462% { opacity: 0; } 100% { opacity: 0; } }
    .a-b { animation: m14_abopacity 13s linear 0s both; }
    @keyframes m14_abopacity { 0% { opacity: 0; } 32.308% { opacity: 0; } 34.615% { opacity: 1; } 44.615% { opacity: 1; } 48.462% { opacity: 0; } 100% { opacity: 0; } }
    .a-d { animation: m14_adopacity 13s linear 0s both; }
    @keyframes m14_adopacity { 0% { opacity: 0; } 32.308% { opacity: 0; } 34.615% { opacity: 0; } 44.615% { opacity: 0; } 48.462% { opacity: 1; } 100% { opacity: 1; } }
    .s-page { animation: m14_spagebackgroundcolor 13s linear 0s both; }
    @keyframes m14_spagebackgroundcolor { 0% { background-color: #f2f2f2; } 32.308% { background-color: #f2f2f2; } 34.615% { background-color: #ffffff; } 44.615% { background-color: #ffffff; } 48.462% { background-color: #373737; } 100% { background-color: #373737; } }
    .s-card { animation: m14_scardbackgroundcolor 13s linear 0s both; }
    @keyframes m14_scardbackgroundcolor { 0% { background-color: #ffffff; } 32.308% { background-color: #ffffff; } 34.615% { background-color: #ffffff; } 44.615% { background-color: #ffffff; } 48.462% { background-color: #373737; } 100% { background-color: #373737; } }
    .s-side div { animation: m14_ssidedivbackgroundcolor 13s linear 0s both; }
    @keyframes m14_ssidedivbackgroundcolor { 0% { background-color: #373737; } 32.308% { background-color: #373737; } 34.615% { background-color: #000000; } 44.615% { background-color: #000000; } 48.462% { background-color: #373737; } 100% { background-color: #373737; } }
    .s-h1 { animation: m14_sh1color 13s linear 0s both; }
    @keyframes m14_sh1color { 0% { color: #373737; } 32.308% { color: #373737; } 34.615% { color: #000000; } 44.615% { color: #000000; } 48.462% { color: #ffffff; } 100% { color: #ffffff; } }
    .s-p { animation: m14_spcolor 13s linear 0s both; }
    @keyframes m14_spcolor { 0% { color: #5f5f5f; } 32.308% { color: #5f5f5f; } 34.615% { color: #000000; } 44.615% { color: #000000; } 48.462% { color: #ffffff; } 100% { color: #ffffff; } }
  `,
  // <<< IKLIJUOTAS-TEKSTAS
  // >>> GS-INTEGRACIJA (generuoja lessons/google-sheets-integracija-explaineris/build_scenes.py — ranka neredaguoti)
  '00-kodel': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .failas { animation: fadeUpMedium 0.6s var(--ease-spring) 0.6s both; }
    .n0 { animation: slinktisIsDesines 0.5s var(--ease-spring) 5.0s both; }
    .n1 { animation: slinktisIsDesines 0.5s var(--ease-spring) 8.6s both; }
    .n2 { animation: slinktisIsDesines 0.5s var(--ease-spring) 12.2s both; }
    .n3 { animation: slinktisIsDesines 0.5s var(--ease-spring) 15.8s both; }
  `,
  '01-kaip-veikia': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .g0 { animation: fadeUpMedium 0.5s var(--ease-spring) 1.0s both; }
    .g1 { animation: fadeUpMedium 0.5s var(--ease-spring) 6.4s both; }
    .g2 { animation: fadeUpMedium 0.5s var(--ease-spring) 11.8s both; }
    .r0 { animation: fadeUpLight 0.4s var(--ease-spring) 5.6s both; }
    .r1 { animation: fadeUpLight 0.4s var(--ease-spring) 11.0s both; }
    .id { animation: v_01_kaip_veikia_5 27s linear 0s both; }
    @keyframes v_01_kaip_veikia_5 { 0%, 62.959% { opacity: 0; } 63.889% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '02-url': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .urlbar { animation: fadeUpMedium 0.5s var(--ease-spring) 0.8s both; }
    .u_f { animation: iconPulse 0.7s ease-in-out 5.2s both; }
    .u_g { animation: iconPulse 0.7s ease-in-out 11.0s both; }
    .u0 { animation: fadeUpLight 0.5s var(--ease-spring) 5.4s both; }
    .u1 { animation: fadeUpLight 0.5s var(--ease-spring) 11.2s both; }
  `,
  '03-kas-ka-daro': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .k0 { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.8s both; }
    .k1 { animation: slinktisIsDesines 0.5s var(--ease-spring) 8.6s both; }
    .k0i0 { animation: v_03_kas_ka_daro_2 22s linear 0s both; }
    @keyframes v_03_kas_ka_daro_2 { 0%, 9.086% { opacity: 0; } 10.227% { opacity: 1; } 100% { opacity: 1; } }
    .k0i1 { animation: v_03_kas_ka_daro_4 22s linear 0s both; }
    @keyframes v_03_kas_ka_daro_4 { 0%, 18.632% { opacity: 0; } 19.773% { opacity: 1; } 100% { opacity: 1; } }
    .k0i2 { animation: v_03_kas_ka_daro_6 22s linear 0s both; }
    @keyframes v_03_kas_ka_daro_6 { 0%, 28.177% { opacity: 0; } 29.318% { opacity: 1; } 100% { opacity: 1; } }
    .k1i0 { animation: v_03_kas_ka_daro_8 22s linear 0s both; }
    @keyframes v_03_kas_ka_daro_8 { 0%, 43.632% { opacity: 0; } 44.773% { opacity: 1; } 100% { opacity: 1; } }
    .k1i1 { animation: v_03_kas_ka_daro_10 22s linear 0s both; }
    @keyframes v_03_kas_ka_daro_10 { 0%, 53.177% { opacity: 0; } 54.318% { opacity: 1; } 100% { opacity: 1; } }
    .k1i2 { animation: v_03_kas_ka_daro_12 22s linear 0s both; }
    @keyframes v_03_kas_ka_daro_12 { 0%, 62.723% { opacity: 0; } 63.864% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '04-publikavimas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .dlg { animation: fadeUpMedium 0.5s var(--ease-spring) 0.8s both; }
    .sel { animation: v_04_publikavimas_1 22s linear 0s both; }
    @keyframes v_04_publikavimas_1 { 0%, 27.268% { opacity: 0; } 28.409% { opacity: 1; } 100% { opacity: 1; } }
    .rol { animation: v_04_publikavimas_3 22s linear 0s both; }
    @keyframes v_04_publikavimas_3 { 0%, 54.541% { opacity: 0; } 55.682% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '05-kodas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .kod { animation: fadeUpMedium 0.5s var(--ease-spring) 1.0s both; }
    .res { animation: slinktisIsDesines 0.6s var(--ease-spring) 9.0s both; }
  `,
  '06-tvs-modulis': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .mod { animation: fadeUpMedium 0.5s var(--ease-spring) 0.8s both; }
    .me0 { animation: v_06_tvs_modulis_1 25s linear 0s both; }
    @keyframes v_06_tvs_modulis_1 { 0%, 15.996% { opacity: 0; } 17.000% { opacity: 1; } 100% { opacity: 1; } }
    .me1 { animation: v_06_tvs_modulis_3 25s linear 0s both; }
    @keyframes v_06_tvs_modulis_3 { 0%, 24.796% { opacity: 0; } 25.800% { opacity: 1; } 100% { opacity: 1; } }
    .me2 { animation: v_06_tvs_modulis_5 25s linear 0s both; }
    @keyframes v_06_tvs_modulis_5 { 0%, 33.596% { opacity: 0; } 34.600% { opacity: 1; } 100% { opacity: 1; } }
    .kort:last-child { animation: v_06_tvs_modulis_7 25s linear 0s both; }
    @keyframes v_06_tvs_modulis_7 { 0%, 51.996% { opacity: 0; } 53.000% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '07-atsinaujinimas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .a0 { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.8s both; }
    .a1 { animation: slinktisIsDesines 0.5s var(--ease-spring) 4.4s both; }
    .t0 { animation: fadeUpLight 0.5s var(--ease-spring) 10.0s both; }
    .t1 { animation: fadeUpLight 0.5s var(--ease-spring) 14.2s both; }
  `,
  '08-duomenu-baze': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .d0 { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.8s both; }
    .d1 { animation: slinktisIsDesines 0.5s var(--ease-spring) 11.0s both; }
    .d0i0 { animation: v_08_duomenu_baze_2 29s linear 0s both; }
    @keyframes v_08_duomenu_baze_2 { 0%, 8.272% { opacity: 0; } 9.138% { opacity: 1; } 100% { opacity: 1; } }
    .d0i1 { animation: v_08_duomenu_baze_4 29s linear 0s both; }
    @keyframes v_08_duomenu_baze_4 { 0%, 16.548% { opacity: 0; } 17.414% { opacity: 1; } 100% { opacity: 1; } }
    .d0i2 { animation: v_08_duomenu_baze_6 29s linear 0s both; }
    @keyframes v_08_duomenu_baze_6 { 0%, 24.824% { opacity: 0; } 25.690% { opacity: 1; } 100% { opacity: 1; } }
    .d1i0 { animation: v_08_duomenu_baze_8 29s linear 0s both; }
    @keyframes v_08_duomenu_baze_8 { 0%, 42.755% { opacity: 0; } 43.621% { opacity: 1; } 100% { opacity: 1; } }
    .d1i1 { animation: v_08_duomenu_baze_10 29s linear 0s both; }
    @keyframes v_08_duomenu_baze_10 { 0%, 51.031% { opacity: 0; } 51.897% { opacity: 1; } 100% { opacity: 1; } }
    .d1i2 { animation: v_08_duomenu_baze_12 29s linear 0s both; }
    @keyframes v_08_duomenu_baze_12 { 0%, 59.307% { opacity: 0; } 60.172% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '09-lapu-tvarka': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .lp0 { animation: fadeUpMedium 0.5s var(--ease-spring) 1.0s both; }
    .lp1 { animation: fadeUpMedium 0.5s var(--ease-spring) 4.2s both; }
    .lp2 { animation: fadeUpMedium 0.5s var(--ease-spring) 7.4s both; }
    .kort:last-child { animation: v_09_lapu_tvarka_3 21s linear 0s both; }
    @keyframes v_09_lapu_tvarka_3 { 0%, 57.138% { opacity: 0; } 58.333% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '10-organizavimas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .f0 { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.8s both; }
    .f1 { animation: slinktisIsDesines 0.5s var(--ease-spring) 4.6s both; }
    .p0 { animation: fadeUpLight 0.5s var(--ease-spring) 10.0s both; }
    .p1 { animation: fadeUpLight 0.5s var(--ease-spring) 13.0s both; }
    .p2 { animation: fadeUpLight 0.5s var(--ease-spring) 16.0s both; }
  `,
  '11-sablonas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .failas { animation: fadeUpMedium 0.6s var(--ease-spring) 0.8s both; }
    .r0 { animation: slinktisIsDesines 0.5s var(--ease-spring) 4.6s both; }
    .r1 { animation: slinktisIsDesines 0.5s var(--ease-spring) 8.0s both; }
    .r2 { animation: slinktisIsDesines 0.5s var(--ease-spring) 11.399999999999999s both; }
    .kort:last-child { animation: v_11_sablonas_4 21s linear 0s both; }
    @keyframes v_11_sablonas_4 { 0%, 71.424% { opacity: 0; } 72.619% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '12-kur-toliau': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .v0 { animation: slinktisIsKaires 0.5s var(--ease-spring) 1.0s both; }
    .v1 { animation: slinktisIsDesines 0.5s var(--ease-spring) 5.0s both; }
    .kort:last-child { animation: v_12_kur_toliau_2 16s linear 0s both; }
    @keyframes v_12_kur_toliau_2 { 0%, 58.744% { opacity: 0; } 60.312% { opacity: 1; } 100% { opacity: 1; } }
  `,
  // <<< GS-INTEGRACIJA
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
    .spot { animation: spot_00_kas_yra_sheets 18s linear 0s both; }
    @keyframes spot_00_kas_yra_sheets { 0%, 33.328% { opacity: 0; left: 4px; top: 690px; width: 1672px; height: 52px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 35.556% { opacity: 1; left: 4px; top: 690px; width: 1672px; height: 52px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 100% { opacity: 1; left: 4px; top: 690px; width: 1672px; height: 52px; } }
    .stage > .gs-window { animation: fadeUpMedium 0.6s var(--ease-spring) 0.3s both; }
    .n-tabs { animation: v_00_kas_yra_sheets_3 18s linear 0s both; }
    @keyframes v_00_kas_yra_sheets_3 { 0%, 36.661% { opacity: 0; } 38.056% { opacity: 1; } 58.889% { opacity: 1; } 60.000%, 100% { opacity: 0; } }
    .n-files { animation: v_00_kas_yra_sheets_5 18s linear 0s both; }
    @keyframes v_00_kas_yra_sheets_5 { 0%, 60.550% { opacity: 0; } 61.944% { opacity: 1; } 100% { opacity: 1; } }
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
    .cursor-wrap { animation: k_01_prieiga 32s linear 0s both; }
    @keyframes k_01_prieiga { 0% { transform: translate(320px, 210px); } 0.000% { transform: translate(320px, 210px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 20.000% { transform: translate(320px, 210px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 25.312% { transform: translate(-874px, -1px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 42.500% { transform: translate(-874px, -1px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 47.812% { transform: translate(460px, -412px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 51.875% { transform: translate(460px, -412px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 53.750% { transform: translate(-480px, -190px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 71.875% { transform: translate(-480px, -190px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 73.125% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 96.875% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .req { animation: fadeUpMedium 0.6s var(--ease-spring) 0.5s both; }
    .req .btn { animation: mygtukasGS 32s linear 0s both; }
    @keyframes mygtukasGS { 0%, 26.094% { filter: brightness(1); transform: scale(1); } 26.406% { filter: brightness(.85); transform: scale(.96); } 27.187%, 100% { filter: brightness(1); transform: scale(1); } }
    .grant { animation: slinktisIsDesines 0.6s var(--ease-spring) 10.0s both; }
    .req { animation: v_01_prieiga_27 32s linear 0s both; }
    @keyframes v_01_prieiga_27 { 0%, 1.559% { opacity: 0; } 2.344% { opacity: 1; } 43.750% { opacity: 1; } 44.375%, 100% { opacity: 0; } }
    .grant { animation: v_01_prieiga_29 32s linear 0s both; }
    @keyframes v_01_prieiga_29 { 0%, 31.247% { opacity: 0; } 32.031% { opacity: 1; } 43.750% { opacity: 1; } 44.375%, 100% { opacity: 0; } }
    .shwrap { animation: v_01_prieiga_31 32s linear 0s both; }
    @keyframes v_01_prieiga_31 { 0%, 44.372% { opacity: 0; } 45.156% { opacity: 1; } 100% { opacity: 1; } }
    .shdlg { animation: fadeUpMedium 0.5s var(--ease-spring) 16.4s both; }
    .shdlg .row { animation: v_01_prieiga_34 32s linear 0s both; }
    @keyframes v_01_prieiga_34 { 0%, 65.622% { opacity: 0; } 66.406% { opacity: 1; } 100% { opacity: 1; } }
    .shdlg .fld .ph { animation: v_01_prieiga_36 32s linear 0s both; }
    @keyframes v_01_prieiga_36 { 0%, 44.372% { opacity: 0; } 45.156% { opacity: 1; } 54.375% { opacity: 1; } 55.000%, 100% { opacity: 0; } }
    .shdlg .send { animation: siusti_01_prieiga 32s linear 0s both; }
    @keyframes siusti_01_prieiga { 0%, 73.594% { filter: brightness(1); } 73.906% { filter: brightness(.85); } 74.688%, 100% { filter: brightness(1); } }
  `,
  '02-paskyra': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .acc.g { animation: slinktisIsKaires 0.6s var(--ease-spring) 1.0s both; }
    .acc.g .badge { animation: iconPulse 0.6s ease-in-out 3.0s both; }
    .acc.o { animation: slinktisIsDesines 0.6s var(--ease-spring) 6.4s both; }
    .ws { animation: v_02_paskyra_3 20s linear 0s both; }
    @keyframes v_02_paskyra_3 { 0%, 64.495% { opacity: 0; } 65.750% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '03-langas': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .spot { animation: spot_03_langas 17s linear 0s both; }
    @keyframes spot_03_langas { 0%, 7.641% { opacity: 0; left: 66px; top: 6px; width: 520px; height: 48px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 10.000% { opacity: 1; left: 66px; top: 6px; width: 520px; height: 48px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 18.824% { opacity: 1; left: 66px; top: 6px; width: 520px; height: 48px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 22.059% { opacity: 1; left: 66px; top: 54px; width: 1000px; height: 44px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 42.353% { opacity: 1; left: 66px; top: 54px; width: 1000px; height: 44px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 45.588% { opacity: 1; left: 64px; top: 248px; width: 1612px; height: 438px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 63.529% { opacity: 1; left: 64px; top: 248px; width: 1612px; height: 438px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 66.765% { opacity: 1; left: 4px; top: 690px; width: 1672px; height: 52px; animation-timing-function: cubic-bezier(.4,0,.2,1); } 100% { opacity: 1; left: 4px; top: 690px; width: 1672px; height: 52px; } }
    .stage > .gs-window { animation: fadeUpMedium 0.5s var(--ease-spring) 0.2s both; }
    .nr1 { animation: v_03_langas_3 17s linear 0s both; }
    @keyframes v_03_langas_3 { 0%, 9.700% { opacity: 0; } 11.176% { opacity: 1; } 18.529% { opacity: 1; } 19.706%, 100% { opacity: 0; } }
    .nr2 { animation: v_03_langas_5 17s linear 0s both; }
    @keyframes v_03_langas_5 { 0%, 20.876% { opacity: 0; } 22.353% { opacity: 1; } 42.059% { opacity: 1; } 43.235%, 100% { opacity: 0; } }
    .nr3 { animation: v_03_langas_7 17s linear 0s both; }
    @keyframes v_03_langas_7 { 0%, 44.406% { opacity: 0; } 45.882% { opacity: 1; } 63.235% { opacity: 1; } 64.412%, 100% { opacity: 0; } }
    .nr4 { animation: v_03_langas_9 17s linear 0s both; }
    @keyframes v_03_langas_9 { 0%, 65.582% { opacity: 0; } 67.059% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '04-lapai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 4.6s forwards; }
    .rip1 { animation: ratilasGS 0.6s ease-out 10.0s forwards; }
    .cursor-wrap { animation: k_04_lapai 17s linear 0s both; }
    @keyframes k_04_lapai { 0% { transform: translate(-444px, -316px); } 0.000% { transform: translate(-444px, -316px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 16.471% { transform: translate(-444px, -316px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 25.294% { transform: translate(-980px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 50.588% { transform: translate(-980px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 57.059% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 88.235% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .grid-b { animation: v_04_lapai_4 17s linear 0s both; }
    @keyframes v_04_lapai_4 { 0%, 27.935% { opacity: 0; } 29.412% { opacity: 1; } 100% { opacity: 1; } }
    .gs-tab.tab-3 { animation: tabOnOffGS_04_lapai 17s steps(1,end) 0s both; }
    @keyframes tabOnOffGS_04_lapai { 0% { background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; } 27.647%, 100% { background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; } }
    .gs-tab.tab-2 { animation: tabOnGS_04_lapai 17s steps(1,end) 0s both; }
    @keyframes tabOnGS_04_lapai { 0% { background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; } 27.647%, 100% { background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; } }
    .strip { animation: juostaSlenkaGS 17s cubic-bezier(.3,0,.2,1) 0s both; }
    @keyframes juostaSlenkaGS { 0%, 59.118% { transform: translateX(0); } 62.941%, 100% { transform: translateX(-250px); } }
    .stage { transform-origin: 0% 100%; animation: z_04_lapai 17s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_04_lapai { 0%, 14.118% { transform: scale(1); } 20.588% { transform: scale(1.28); } 72.941% { transform: scale(1.28); } 79.412%, 100% { transform: scale(1); } }
  `,
  '05-visi-lapai': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 2.8s forwards; }
    .rip1 { animation: ratilasGS 0.6s ease-out 7.4s forwards; }
    .cursor-wrap { animation: k_05_visi_lapai 14s linear 0s both; }
    @keyframes k_05_visi_lapai { 0% { transform: translate(724px, -220px); } 0.000% { transform: translate(724px, -220px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 8.571% { transform: translate(724px, -220px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 17.857% { transform: translate(-98px, 196px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 40.000% { transform: translate(-98px, 196px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 50.714% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 92.857% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .list-pop { animation: v_05_visi_lapai_4 14s linear 0s both; }
    @keyframes v_05_visi_lapai_4 { 0%, 21.064% { opacity: 0; } 22.857% { opacity: 1; } 53.571% { opacity: 1; } 55.000%, 100% { opacity: 0; } }
    .list-pop .li-4 { animation: hlGS_05_visi_lapai 14s steps(1,end) 0s both; }
    @keyframes hlGS_05_visi_lapai { 0%, 47.143% { background: transparent; } 47.143%, 100% { background: #e8eaed; } }
    .grid-c { animation: v_05_visi_lapai_8 14s linear 0s both; }
    @keyframes v_05_visi_lapai_8 { 0%, 54.279% { opacity: 0; } 56.071% { opacity: 1; } 100% { opacity: 1; } }
    .gs-tab.tab-3 { animation: t3GS_05_visi_lapai 14s steps(1,end) 0s both; }
    @keyframes t3GS_05_visi_lapai { 0% { background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; } 54.286%, 100% { background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; } }
    .gs-tab.tab-4 { animation: t4GS_05_visi_lapai 14s steps(1,end) 0s both; }
    @keyframes t4GS_05_visi_lapai { 0% { background: var(--gs-tabbar); color: var(--gs-muted); font-weight: 500; } 54.286%, 100% { background: var(--gs-tab-active); color: var(--gs-blue); font-weight: 700; } }
    .stage { transform-origin: 0% 100%; animation: z_05_visi_lapai 14s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_05_visi_lapai { 0%, 11.429% { transform: scale(1); } 19.286% { transform: scale(1.3); } 72.857% { transform: scale(1.3); } 80.714%, 100% { transform: scale(1); } }
  `,
  '06-lapo-meniu': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 3.4s forwards; }
    .cursor-wrap { animation: k_06_lapo_meniu 17s linear 0s both; }
    @keyframes k_06_lapo_meniu { 0% { transform: translate(236px, -29px); } 0.000% { transform: translate(236px, -29px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 10.588% { transform: translate(236px, -29px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 18.235% { transform: translate(48px, 389px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 37.059% { transform: translate(48px, 389px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 40.588% { transform: translate(0px, 88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 45.882% { transform: translate(0px, 88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 47.647% { transform: translate(0px, 132px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 51.765% { transform: translate(0px, 132px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 53.529% { transform: translate(0px, 176px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 60.000% { transform: translate(0px, 176px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 63.529% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 88.235% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .tab-menu { animation: v_06_lapo_meniu_3 17s linear 0s both; }
    @keyframes v_06_lapo_meniu_3 { 0%, 20.876% { opacity: 0; } 22.353% { opacity: 1; } 100% { opacity: 1; } }
    .tab-menu .m-ren { animation: hl_06_lapo_meniu_ren 17s steps(1,end) 0s both; }
    @keyframes hl_06_lapo_meniu_ren { 0%, 40.588% { background: transparent; } 40.647% { background: #e8eaed; } 47.059% { background: #e8eaed; } 47.118%, 100% { background: transparent; } }
    .tab-menu .m-col { animation: hl_06_lapo_meniu_col 17s steps(1,end) 0s both; }
    @keyframes hl_06_lapo_meniu_col { 0%, 47.647% { background: transparent; } 47.706% { background: #e8eaed; } 52.941% { background: #e8eaed; } 53.000%, 100% { background: transparent; } }
    .tab-menu .m-hide { animation: hl_06_lapo_meniu_hide 17s steps(1,end) 0s both; }
    @keyframes hl_06_lapo_meniu_hide { 0%, 53.529% { background: transparent; } 53.588% { background: #e8eaed; } 62.941% { background: #e8eaed; } 63.000%, 100% { background: transparent; } }
    .tab-menu .m-del { animation: hl_06_lapo_meniu_del 17s steps(1,end) 0s both; }
    @keyframes hl_06_lapo_meniu_del { 0%, 63.529% { background: transparent; } 63.588% { background: #e8eaed; } 100% { background: #e8eaed; } }
    .stage { transform-origin: 10% 100%; animation: z_06_lapo_meniu 17s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_06_lapo_meniu { 0%, 11.765% { transform: scale(1); } 18.235% { transform: scale(1.22); } 100% { transform: scale(1.22); } }
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
    .box.a .ren { animation: v_08_atsargiai_1 38s linear 0s both; }
    @keyframes v_08_atsargiai_1 { 0%, 23.155% { opacity: 0; } 23.816% { opacity: 1; } 100% { opacity: 1; } }
    .box.b { animation: slinktisIsDesines 0.6s var(--ease-spring) 14.2s both; }
    .box.a .lock { animation: iconPulse 0.6s ease-in-out 5.6s both; }
    .box.b .warn { animation: v_08_atsargiai_5 38s linear 0s both; }
    @keyframes v_08_atsargiai_5 { 0%, 51.050% { opacity: 0; } 51.711% { opacity: 1; } 100% { opacity: 1; } }
    .undo { animation: v_08_atsargiai_7 38s linear 0s both; }
    @keyframes v_08_atsargiai_7 { 0%, 66.313% { opacity: 0; } 66.974% { opacity: 1; } 100% { opacity: 1; } }
    .undo .later { animation: v_08_atsargiai_9 38s linear 0s both; }
    @keyframes v_08_atsargiai_9 { 0%, 75.261% { opacity: 0; } 75.921% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '09-zymos': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .mini { animation: slinktisIsKaires 0.6s var(--ease-spring) 0.4s both; }
    .site { animation: slinktisIsDesines 0.6s var(--ease-spring) 1.2s both; }
    .hl0 { animation: v_09_zymos_2 20s linear 0s both; }
    @keyframes v_09_zymos_2 { 0%, 23.995% { opacity: 0; } 25.250% { opacity: 1; } 30.750% { opacity: 1; } 31.750%, 100% { opacity: 0; } }
    .hl1 { animation: v_09_zymos_4 20s linear 0s both; }
    @keyframes v_09_zymos_4 { 0%, 30.995% { opacity: 0; } 32.250% { opacity: 1; } 37.750% { opacity: 1; } 38.750%, 100% { opacity: 0; } }
    .hl2 { animation: v_09_zymos_6 20s linear 0s both; }
    @keyframes v_09_zymos_6 { 0%, 37.995% { opacity: 0; } 39.250% { opacity: 1; } 48.750% { opacity: 1; } 49.750%, 100% { opacity: 0; } }
    .hl3 { animation: v_09_zymos_8 20s linear 0s both; }
    @keyframes v_09_zymos_8 { 0%, 48.995% { opacity: 0; } 50.250% { opacity: 1; } 65.750% { opacity: 1; } 66.750%, 100% { opacity: 0; } }
    .hl4 { animation: v_09_zymos_10 20s linear 0s both; }
    @keyframes v_09_zymos_10 { 0%, 65.995% { opacity: 0; } 67.250% { opacity: 1; } 80.000% { opacity: 1; } 81.000%, 100% { opacity: 0; } }
    .mini .mrow.h2 { animation: dim_09_zymos_12 20s linear 0s both; }
    @keyframes dim_09_zymos_12 { 0% { opacity: 1; } 24.000% { opacity: 1; } 25.500% { opacity: 1; } 31.000% { opacity: 1; } 32.500% { opacity: 0.28; } 38.000% { opacity: 0.28; } 39.500% { opacity: 0.28; } 49.000% { opacity: 0.28; } 50.500% { opacity: 0.28; } 66.000% { opacity: 0.28; } 67.500% { opacity: 0.28; } 80.000% { opacity: 0.28; } 81.500% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-h2 { animation: dim_09_zymos_14 20s linear 0s both; }
    @keyframes dim_09_zymos_14 { 0% { opacity: 1; } 24.000% { opacity: 1; } 25.500% { opacity: 1; } 31.000% { opacity: 1; } 32.500% { opacity: 0.28; } 38.000% { opacity: 0.28; } 39.500% { opacity: 0.28; } 49.000% { opacity: 0.28; } 50.500% { opacity: 0.28; } 66.000% { opacity: 0.28; } 67.500% { opacity: 0.28; } 80.000% { opacity: 0.28; } 81.500% { opacity: 1; } 100% { opacity: 1; } }
    .mini .mrow.h3 { animation: dim_09_zymos_16 20s linear 0s both; }
    @keyframes dim_09_zymos_16 { 0% { opacity: 1; } 24.000% { opacity: 1; } 25.500% { opacity: 0.28; } 31.000% { opacity: 0.28; } 32.500% { opacity: 1; } 38.000% { opacity: 1; } 39.500% { opacity: 0.28; } 49.000% { opacity: 0.28; } 50.500% { opacity: 0.28; } 66.000% { opacity: 0.28; } 67.500% { opacity: 0.28; } 80.000% { opacity: 0.28; } 81.500% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-h3 { animation: dim_09_zymos_18 20s linear 0s both; }
    @keyframes dim_09_zymos_18 { 0% { opacity: 1; } 24.000% { opacity: 1; } 25.500% { opacity: 0.28; } 31.000% { opacity: 0.28; } 32.500% { opacity: 1; } 38.000% { opacity: 1; } 39.500% { opacity: 0.28; } 49.000% { opacity: 0.28; } 50.500% { opacity: 0.28; } 66.000% { opacity: 0.28; } 67.500% { opacity: 0.28; } 80.000% { opacity: 0.28; } 81.500% { opacity: 1; } 100% { opacity: 1; } }
    .mini .mrow.th { animation: dim_09_zymos_20 20s linear 0s both; }
    @keyframes dim_09_zymos_20 { 0% { opacity: 1; } 24.000% { opacity: 1; } 25.500% { opacity: 0.28; } 31.000% { opacity: 0.28; } 32.500% { opacity: 0.28; } 38.000% { opacity: 0.28; } 39.500% { opacity: 1; } 49.000% { opacity: 1; } 50.500% { opacity: 0.28; } 66.000% { opacity: 0.28; } 67.500% { opacity: 0.28; } 80.000% { opacity: 0.28; } 81.500% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-th { animation: dim_09_zymos_22 20s linear 0s both; }
    @keyframes dim_09_zymos_22 { 0% { opacity: 1; } 24.000% { opacity: 1; } 25.500% { opacity: 0.28; } 31.000% { opacity: 0.28; } 32.500% { opacity: 0.28; } 38.000% { opacity: 0.28; } 39.500% { opacity: 1; } 49.000% { opacity: 1; } 50.500% { opacity: 0.28; } 66.000% { opacity: 0.28; } 67.500% { opacity: 0.28; } 80.000% { opacity: 0.28; } 81.500% { opacity: 1; } 100% { opacity: 1; } }
    .mini .mrow.data { animation: dim_09_zymos_24 20s linear 0s both; }
    @keyframes dim_09_zymos_24 { 0% { opacity: 1; } 24.000% { opacity: 1; } 25.500% { opacity: 0.28; } 31.000% { opacity: 0.28; } 32.500% { opacity: 0.28; } 38.000% { opacity: 0.28; } 39.500% { opacity: 0.28; } 49.000% { opacity: 0.28; } 50.500% { opacity: 1; } 66.000% { opacity: 1; } 67.500% { opacity: 0.28; } 80.000% { opacity: 0.28; } 81.500% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-td { animation: dim_09_zymos_26 20s linear 0s both; }
    @keyframes dim_09_zymos_26 { 0% { opacity: 1; } 24.000% { opacity: 1; } 25.500% { opacity: 0.28; } 31.000% { opacity: 0.28; } 32.500% { opacity: 0.28; } 38.000% { opacity: 0.28; } 39.500% { opacity: 0.28; } 49.000% { opacity: 0.28; } 50.500% { opacity: 1; } 66.000% { opacity: 1; } 67.500% { opacity: 0.28; } 80.000% { opacity: 0.28; } 81.500% { opacity: 1; } 100% { opacity: 1; } }
    .mini .mrow.ign { animation: dim_09_zymos_28 20s linear 0s both; }
    @keyframes dim_09_zymos_28 { 0% { opacity: 1; } 24.000% { opacity: 1; } 25.500% { opacity: 0.28; } 31.000% { opacity: 0.28; } 32.500% { opacity: 0.28; } 38.000% { opacity: 0.28; } 39.500% { opacity: 0.28; } 49.000% { opacity: 0.28; } 50.500% { opacity: 0.28; } 66.000% { opacity: 0.28; } 67.500% { opacity: 1; } 80.000% { opacity: 1; } 81.500% { opacity: 1; } 100% { opacity: 1; } }
    .site .s-ign { animation: v_09_zymos_30 20s linear 0s both; }
    @keyframes v_09_zymos_30 { 0%, 66.995% { opacity: 0; } 68.250% { opacity: 1; } 100% { opacity: 1; } }
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
    .cursor-wrap { animation: k_10_rasymas 14s linear 0s both; }
    @keyframes k_10_rasymas { 0% { transform: translate(673px, -389px); } 0.000% { transform: translate(673px, -389px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 7.143% { transform: translate(673px, -389px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 15.714% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .sel1 { animation: v_10_rasymas_22 14s linear 0s both; }
    @keyframes v_10_rasymas_22 { 0%, 18.207% { opacity: 0; } 20.000% { opacity: 1; } 52.857% { opacity: 1; } 54.286%, 100% { opacity: 0; } }
    .sel2 { animation: v_10_rasymas_24 14s linear 0s both; }
    @keyframes v_10_rasymas_24 { 0%, 53.207% { opacity: 0; } 55.000% { opacity: 1; } 100% { opacity: 1; } }
    .gs-saved { animation: v_10_rasymas_26 14s linear 0s both; }
    @keyframes v_10_rasymas_26 { 0%, 54.279% { opacity: 0; } 56.071% { opacity: 1; } 71.429% { opacity: 1; } 72.857%, 100% { opacity: 0; } }
    .stage { transform-origin: 30% 55%; animation: z_10_rasymas 14s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_10_rasymas { 0%, 8.571% { transform: scale(1); } 16.429% { transform: scale(1.3); } 70.000% { transform: scale(1.3); } 77.857%, 100% { transform: scale(1); } }
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
    .cursor-wrap { animation: k_11_akimirksniu 18s linear 0s both; }
    @keyframes k_11_akimirksniu { 0% { transform: translate(-50px, 233px); } 0.000% { transform: translate(-50px, 233px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 4.444% { transform: translate(-50px, 233px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 8.333% { transform: translate(-340px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 22.222% { transform: translate(-300px, 10px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 63.333% { transform: translate(-300px, 10px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 67.222% { transform: translate(-40px, -255px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 75.000% { transform: translate(-40px, -255px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 76.111% { transform: translate(-40px, -190px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 81.111% { transform: translate(-40px, -190px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 81.667% { transform: translate(-40px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .tb.sh { animation: slinktisIsKaires 0.5s var(--ease-spring) 0.2s both; }
    .tb.st { animation: slinktisIsDesines 0.5s var(--ease-spring) 0.4s both; }
    .s1 { animation: v_11_akimirksniu_32 18s linear 0s both; }
    @keyframes v_11_akimirksniu_32 { 0%, 9.161% { opacity: 0; } 10.556% { opacity: 1; } 19.444% { opacity: 1; } 20.556%, 100% { opacity: 0; } }
    .old1 { animation: v_11_akimirksniu_34 18s linear 0s both; }
    @keyframes v_11_akimirksniu_34 { 0%, 0.000% { opacity: 0; } 1.389% { opacity: 1; } 11.667% { opacity: 1; } 12.778%, 100% { opacity: 0; } }
    .new1 { animation: v_11_akimirksniu_36 18s linear 0s both; }
    @keyframes v_11_akimirksniu_36 { 0%, 11.939% { opacity: 0; } 13.333% { opacity: 1; } 100% { opacity: 1; } }
    .en1 { animation: v_11_akimirksniu_38 18s linear 0s both; }
    @keyframes v_11_akimirksniu_38 { 0%, 16.661% { opacity: 0; } 18.056% { opacity: 1; } 25.556% { opacity: 1; } 26.667%, 100% { opacity: 0; } }
    .old1s { animation: v_11_akimirksniu_40 18s linear 0s both; }
    @keyframes v_11_akimirksniu_40 { 0%, 0.000% { opacity: 0; } 1.389% { opacity: 1; } 20.000% { opacity: 1; } 21.111%, 100% { opacity: 0; } }
    .new1s { animation: v_11_akimirksniu_42 18s linear 0s both; }
    @keyframes v_11_akimirksniu_42 { 0%, 20.272% { opacity: 0; } 21.667% { opacity: 1; } 100% { opacity: 1; } }
    .f1 { animation: v_11_akimirksniu_44 18s linear 0s both; }
    @keyframes v_11_akimirksniu_44 { 0%, 20.272% { opacity: 0; } 21.667% { opacity: 1; } 27.778% { opacity: 1; } 28.889%, 100% { opacity: 0; } }
    .rea { animation: v_11_akimirksniu_46 18s linear 0s both; }
    @keyframes v_11_akimirksniu_46 { 0%, 48.883% { opacity: 0; } 50.278% { opacity: 1; } 64.444% { opacity: 1; } 65.556%, 100% { opacity: 0; } }
    .reb { animation: v_11_akimirksniu_48 18s linear 0s both; }
    @keyframes v_11_akimirksniu_48 { 0%, 48.883% { opacity: 0; } 50.278% { opacity: 1; } 64.444% { opacity: 1; } 65.556%, 100% { opacity: 0; } }
    .tb .r:not(.e):not(.h) { animation: dim_11_akimirksniu_50 18s linear 0s both; }
    @keyframes dim_11_akimirksniu_50 { 0% { opacity: 1; } 48.889% { opacity: 1; } 50.556% { opacity: 0.3; } 64.444% { opacity: 0.3; } 66.111% { opacity: 1; } 100% { opacity: 1; } }
    .sh3 { animation: v_11_akimirksniu_52 18s linear 0s both; }
    @keyframes v_11_akimirksniu_52 { 0%, 68.050% { opacity: 0; } 69.444% { opacity: 1; } 76.667% { opacity: 1; } 77.778%, 100% { opacity: 0; } }
    .sk1 { animation: v_11_akimirksniu_54 18s linear 0s both; }
    @keyframes v_11_akimirksniu_54 { 0%, 76.939% { opacity: 0; } 78.333% { opacity: 1; } 82.222% { opacity: 1; } 83.333%, 100% { opacity: 0; } }
    .sk2 { animation: v_11_akimirksniu_56 18s linear 0s both; }
    @keyframes v_11_akimirksniu_56 { 0%, 82.494% { opacity: 0; } 83.889% { opacity: 1; } 86.667% { opacity: 1; } 87.778%, 100% { opacity: 0; } }
    .tb.st .c3 { animation: c3_11_akimirksniu 18s cubic-bezier(.4,0,.2,1) 0s both; }
    @keyframes c3_11_akimirksniu { 0%, 87.222% { width: 0; } 91.111%, 100% { width: 180px; } }
    .f3 { animation: v_11_akimirksniu_60 18s linear 0s both; }
    @keyframes v_11_akimirksniu_60 { 0%, 89.994% { opacity: 0; } 91.389% { opacity: 1; } 96.667% { opacity: 1; } 97.778%, 100% { opacity: 0; } }
    .rca { animation: v_11_akimirksniu_62 18s linear 0s both; }
    @keyframes v_11_akimirksniu_62 { 0%, 94.439% { opacity: 0; } 95.833% { opacity: 1; } 100% { opacity: 1; } }
    .rcb { animation: v_11_akimirksniu_64 18s linear 0s both; }
    @keyframes v_11_akimirksniu_64 { 0%, 94.439% { opacity: 0; } 95.833% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '12-viena-eilute': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .vs { animation: slinktisIsKaires 0.6s var(--ease-spring) 0.4s both; }
    .ring-bad { animation: v_12_viena_eilute_1 20s linear 0s both; }
    @keyframes v_12_viena_eilute_1 { 0%, 20.995% { opacity: 0; } 22.250% { opacity: 1; } 100% { opacity: 1; } }
    .site { animation: slinktisIsDesines 0.6s var(--ease-spring) 5.0s both; }
    .site .lost { animation: v_12_viena_eilute_4 20s linear 0s both; }
    @keyframes v_12_viena_eilute_4 { 0%, 34.995% { opacity: 0; } 36.250% { opacity: 1; } 100% { opacity: 1; } }
    .ok { animation: v_12_viena_eilute_6 20s linear 0s both; }
    @keyframes v_12_viena_eilute_6 { 0%, 47.995% { opacity: 0; } 49.250% { opacity: 1; } 100% { opacity: 1; } }
    .db { animation: v_12_viena_eilute_8 20s linear 0s both; }
    @keyframes v_12_viena_eilute_8 { 0%, 59.495% { opacity: 0; } 60.750% { opacity: 1; } 100% { opacity: 1; } }
  `,
  '13-is-word': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 7.0s forwards; }
    .cursor-wrap { animation: k_13_is_word 21s linear 0s both; }
    @keyframes k_13_is_word { 0% { transform: translate(-50px, -20px); } 0.000% { transform: translate(-50px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 26.667% { transform: translate(-50px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 32.381% { transform: translate(-1072px, -283px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 61.905% { transform: translate(-1072px, -283px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 67.619% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 80.952% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .fbar { animation: v_13_is_word_3 21s linear 0s both; }
    @keyframes v_13_is_word_3 { 0%, 8.567% { opacity: 0; } 9.762% { opacity: 1; } 63.810% { opacity: 1; } 64.762%, 100% { opacity: 0; } }
    .sA { animation: v_13_is_word_5 21s linear 0s both; }
    @keyframes v_13_is_word_5 { 0%, 8.567% { opacity: 0; } 9.762% { opacity: 1; } 33.571% { opacity: 1; } 34.524%, 100% { opacity: 0; } }
    .sB { animation: v_13_is_word_7 21s linear 0s both; }
    @keyframes v_13_is_word_7 { 0%, 33.805% { opacity: 0; } 35.000% { opacity: 1; } 45.476% { opacity: 1; } 46.429%, 100% { opacity: 0; } }
    .sC { animation: v_13_is_word_9 21s linear 0s both; }
    @keyframes v_13_is_word_9 { 0%, 45.710% { opacity: 0; } 46.905% { opacity: 1; } 53.095% { opacity: 1; } 54.048%, 100% { opacity: 0; } }
    .sD { animation: v_13_is_word_11 21s linear 0s both; }
    @keyframes v_13_is_word_11 { 0%, 53.329% { opacity: 0; } 54.524% { opacity: 1; } 100% { opacity: 1; } }
    .kb { animation: v_13_is_word_13 21s linear 0s both; }
    @keyframes v_13_is_word_13 { 0%, 39.995% { opacity: 0; } 41.190% { opacity: 1; } 49.524% { opacity: 1; } 50.476%, 100% { opacity: 0; } }
    .ke { animation: v_13_is_word_15 21s linear 0s both; }
    @keyframes v_13_is_word_15 { 0%, 59.995% { opacity: 0; } 61.190% { opacity: 1; } 65.714% { opacity: 1; } 66.667%, 100% { opacity: 0; } }
    .d5a { animation: v_13_is_word_17 21s linear 0s both; }
    @keyframes v_13_is_word_17 { 0%, 0.000% { opacity: 0; } 1.190% { opacity: 1; } 63.810% { opacity: 1; } 64.762%, 100% { opacity: 0; } }
    .d5b { animation: v_13_is_word_19 21s linear 0s both; }
    @keyframes v_13_is_word_19 { 0%, 64.281% { opacity: 0; } 65.476% { opacity: 1; } 100% { opacity: 1; } }
    .stage { transform-origin: 0% 10%; animation: z_13_is_word 21s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_13_is_word { 0%, 5.714% { transform: scale(1); } 10.952% { transform: scale(1.3); } 69.524% { transform: scale(1.3); } 74.762%, 100% { transform: scale(1); } }
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
    .cursor-wrap { animation: k_15_nauja_eilute 51s linear 0s both; }
    @keyframes k_15_nauja_eilute { 0% { transform: translate(588px, -405px); } 0.000% { transform: translate(588px, -405px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 4.706% { transform: translate(588px, -405px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 7.255% { transform: translate(-281px, -122px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 12.157% { transform: translate(-281px, -122px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 13.725% { transform: translate(-92px, -33px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 16.863% { transform: translate(-92px, -33px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 19.216% { transform: translate(405px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 20.588% { transform: translate(405px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 24.314% { transform: translate(405px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 25.098% { transform: translate(875px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 37.059% { transform: translate(875px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 39.020% { transform: translate(-30px, -54px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 39.412% { transform: translate(-30px, -54px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 41.373% { transform: translate(-30px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 42.353% { transform: translate(-30px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 43.922% { transform: translate(-30px, -69px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 45.882% { transform: translate(-30px, -69px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 47.647% { transform: translate(-30px, -103px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 50.196% { transform: translate(-30px, -103px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 51.961% { transform: translate(-30px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 58.431% { transform: translate(-10px, -10px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 61.765% { transform: translate(140px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 62.157% { transform: translate(140px, -88px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 63.725% { transform: translate(1160px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 64.118% { transform: translate(1160px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 65.294% { transform: translate(320px, -103px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 65.882% { transform: translate(320px, -103px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 67.647% { transform: translate(320px, -137px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 71.373% { transform: translate(320px, -137px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 73.137% { transform: translate(-30px, -20px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 82.353% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .cursor-wrap .c-arrow { animation: ka_15_nauja_eilute 51s steps(1,end) 0s both; }
    @keyframes ka_15_nauja_eilute { 0% { opacity: 1; } 44.314% { opacity: 0; } 47.843% { opacity: 1; } 65.686% { opacity: 0; } 68.039% { opacity: 1; } 100% { opacity: 1; } }
    .cursor-wrap .c-grab { animation: kg_15_nauja_eilute 51s steps(1,end) 0s both; }
    @keyframes kg_15_nauja_eilute { 0% { opacity: 0; } 44.314% { opacity: 1; } 47.843% { opacity: 0; } 65.686% { opacity: 1; } 68.039% { opacity: 0; } 100% { opacity: 0; } }
    .ctx { animation: v_15_nauja_eilute_72 51s linear 0s both; }
    @keyframes v_15_nauja_eilute_72 { 0%, 8.135% { opacity: 0; } 8.627% { opacity: 1; } 15.882% { opacity: 1; } 16.275%, 100% { opacity: 0; } }
    .ctx .ctx5 { animation: hl_15_nauja_eilute 51s steps(1,end) 0s both; }
    @keyframes hl_15_nauja_eilute { 0%, 13.725% { background: transparent; } 13.745%, 15.882% { background: #e8eaed; } 15.902%, 100% { background: transparent; } }
    .gs-row.ins { animation: v_15_nauja_eilute_76 51s linear 0s both; }
    @keyframes v_15_nauja_eilute_76 { 0%, 16.175% { opacity: 0; } 16.667% { opacity: 1; } 100% { opacity: 1; } }
    .gs-row[data-r="8"] { animation: eilSlenkaGS_15_nauja_eilute 51s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="9"] { animation: eilSlenkaGS_15_nauja_eilute 51s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="10"] { animation: eilSlenkaGS_15_nauja_eilute 51s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="11"] { animation: eilSlenkaGS_15_nauja_eilute 51s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="12"] { animation: eilSlenkaGS_15_nauja_eilute 51s cubic-bezier(.3,0,.2,1) 0s both; }
    .gs-row[data-r="13"] { animation: eilSlenkaGS_15_nauja_eilute 51s cubic-bezier(.3,0,.2,1) 0s both; }
    @keyframes eilSlenkaGS_15_nauja_eilute { 0%, 16.078% { transform: translateY(-34px); } 16.863%, 100% { transform: translateY(0); } }
    .selc7 { animation: v_15_nauja_eilute_85 51s linear 0s both; }
    @keyframes v_15_nauja_eilute_85 { 0%, 20.880% { opacity: 0; } 21.373% { opacity: 1; } 25.294% { opacity: 1; } 25.686%, 100% { opacity: 0; } }
    .seld7 { animation: v_15_nauja_eilute_87 51s linear 0s both; }
    @keyframes v_15_nauja_eilute_87 { 0%, 25.390% { opacity: 0; } 25.882% { opacity: 1; } 29.412% { opacity: 1; } 29.804%, 100% { opacity: 0; } }
    .sele7 { animation: v_15_nauja_eilute_89 51s linear 0s both; }
    @keyframes v_15_nauja_eilute_89 { 0%, 29.508% { opacity: 0; } 30.000% { opacity: 1; } 31.765% { opacity: 1; } 32.157%, 100% { opacity: 0; } }
    .gap { animation: v_15_nauja_eilute_91 51s linear 0s both; }
    @keyframes v_15_nauja_eilute_91 { 0%, 31.763% { opacity: 0; } 32.255% { opacity: 1; } 38.431% { opacity: 1; } 38.824%, 100% { opacity: 0; } }
    .gs-row[data-r="8"] > span:nth-child(3), .gs-row[data-r="9"] > span:nth-child(3) { animation: bSlepti_15_nauja_eilute 51s steps(1,end) 0s both; }
    @keyframes bSlepti_15_nauja_eilute { 0%, 39.196% { color: var(--gs-cell-text); } 39.216%, 100% { color: transparent; } }
    .numcol { animation: numSlenka_15_nauja_eilute 51s cubic-bezier(.4,0,.2,1) 0s both; }
    @keyframes numSlenka_15_nauja_eilute { 0%, 39.196% { opacity: 0; transform: translateY(34px); } 39.216%, 45.882% { opacity: 1; transform: translateY(34px); } 47.647%, 100% { opacity: 1; transform: translateY(0); } }
    .selm { animation: selm_15_nauja_eilute 51s cubic-bezier(.4,0,.2,1) 0s both; }
    @keyframes selm_15_nauja_eilute { 0%, 39.314% { opacity: 0; transform: translateY(34px); height: 35px; } 39.412% { opacity: 1; transform: translateY(34px); height: 35px; } 41.373% { opacity: 1; transform: translateY(34px); height: 69px; } 45.882% { opacity: 1; transform: translateY(34px); height: 69px; } 47.647% { opacity: 1; transform: translateY(0); height: 69px; } 51.961% { opacity: 1; transform: translateY(0); } 52.059%, 100% { opacity: 0; transform: translateY(0); } }
    .gs-row[data-r="6"] > span:nth-child(4), .gs-row[data-r="6"] > span:nth-child(5), .gs-row[data-r="6"] > span:nth-child(6) { animation: perrasyti_15_nauja_eilute 51s steps(1,end) 0s both; }
    @keyframes perrasyti_15_nauja_eilute { 0%, 67.627% { opacity: 1; } 67.647%, 100% { opacity: 0; } }
    .gs-row[data-r="8"] > span:nth-child(4), .gs-row[data-r="8"] > span:nth-child(5), .gs-row[data-r="8"] > span:nth-child(6), .gs-row[data-r="9"] > span:nth-child(4), .gs-row[data-r="9"] > span:nth-child(5), .gs-row[data-r="9"] > span:nth-child(6), .newt { animation: perimti_15_nauja_eilute 51s steps(1,end) 0s both; }
    @keyframes perimti_15_nauja_eilute { 0%, 61.941% { opacity: 1; } 61.961%, 100% { opacity: 0; } }
    .pblk { animation: pblk_15_nauja_eilute 51s steps(1,end) 0s both; }
    @keyframes pblk_15_nauja_eilute { 0%, 61.941% { opacity: 0; transform: translateY(0); } 61.961%, 67.627% { opacity: 1; transform: translateY(0); } 67.647%, 100% { opacity: 1; transform: translateY(-34px); } }
    .selblk { animation: selblk_15_nauja_eilute 51s cubic-bezier(.4,0,.2,1) 0s both; }
    @keyframes selblk_15_nauja_eilute { 0%, 62.039% { opacity: 0; transform: translateY(0); } 62.059%, 65.882% { opacity: 1; transform: translateY(0); } 67.647%, 72.157% { opacity: 1; transform: translateY(-34px); } 72.255%, 100% { opacity: 0; transform: translateY(-34px); } }
    .selb9 { animation: v_15_nauja_eilute_107 51s linear 0s both; }
    @keyframes v_15_nauja_eilute_107 { 0%, 73.429% { opacity: 0; } 73.922% { opacity: 1; } 78.431% { opacity: 1; } 78.824%, 100% { opacity: 0; } }
    .kdel { animation: v_15_nauja_eilute_109 51s linear 0s both; }
    @keyframes v_15_nauja_eilute_109 { 0%, 74.508% { opacity: 0; } 75.000% { opacity: 1; } 77.647% { opacity: 1; } 78.039%, 100% { opacity: 0; } }
    .lastnr { animation: lastnr_15_nauja_eilute 51s steps(1,end) 0s both; }
    @keyframes lastnr_15_nauja_eilute { 0%, 75.275% { opacity: 1; } 75.294%, 100% { opacity: 0; } }
    .stage { transform-origin: 0% 55%; animation: z_15_nauja_eilute 51s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_15_nauja_eilute { 0%, 3.922% { transform: scale(1); } 6.078% { transform: scale(1.25); } 79.608% { transform: scale(1.25); } 81.765%, 100% { transform: scale(1); } }
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
    .cursor-wrap { animation: k_17_spalvos 17s linear 0s both; }
    @keyframes k_17_spalvos { 0% { transform: translate(330px, -41px); } 0.000% { transform: translate(330px, -41px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 38.824% { transform: translate(330px, -41px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 44.706% { transform: translate(-388px, -236px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 46.471% { transform: translate(-388px, -236px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 52.941% { transform: translate(980px, -197px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 56.471% { transform: translate(980px, -197px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 61.176% { transform: translate(-170px, -525px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 67.059% { transform: translate(-170px, -525px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 72.353% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 94.118% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .left1 { animation: v_17_spalvos_5 17s linear 0s both; }
    @keyframes v_17_spalvos_5 { 0%, 9.406% { opacity: 0; } 10.882% { opacity: 1; } 44.706% { opacity: 1; } 45.882%, 100% { opacity: 0; } }
    .selbox { animation: v_17_spalvos_7 17s linear 0s both; }
    @keyframes v_17_spalvos_7 { 0%, 46.171% { opacity: 0; } 47.647% { opacity: 1; } 76.471% { opacity: 1; } 77.647%, 100% { opacity: 0; } }
    .selbox { transform-origin: top left; }
    .fmt { animation: v_17_spalvos_10 17s linear 0s both; }
    @keyframes v_17_spalvos_10 { 0%, 63.229% { opacity: 0; } 64.706% { opacity: 1; } 75.882% { opacity: 1; } 77.059%, 100% { opacity: 0; } }
    .fmt .f16 { animation: hl_17_spalvos 17s steps(1,end) 0s both; }
    @keyframes hl_17_spalvos { 0%, 72.353% { background: transparent; } 72.412%, 100% { background: #e8eaed; } }
    .grid-bad { animation: v_17_spalvos_14 17s linear 0s both; }
    @keyframes v_17_spalvos_14 { 0%, 0.000% { opacity: 0; } 1.471% { opacity: 1; } 76.471% { opacity: 1; } 77.647%, 100% { opacity: 0; } }
    .stage { transform-origin: 35% 40%; animation: z_17_spalvos 17s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_17_spalvos { 0%, 4.706% { transform: scale(1); } 11.176% { transform: scale(1.18); } 40.000% { transform: scale(1.18); } 46.471%, 100% { transform: scale(1); } }
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
    .cursor-wrap { animation: k_18_th_spalva 22s linear 0s both; }
    @keyframes k_18_th_spalva { 0% { transform: translate(-406px, -171px); } 0.000% { transform: translate(-406px, -171px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 19.545% { transform: translate(-406px, -171px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 23.182% { transform: translate(-1224px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 25.455% { transform: translate(-1224px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 29.545% { transform: translate(-967px, -596px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 31.364% { transform: translate(-967px, -596px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 35.000% { transform: translate(-856px, -447px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 38.182% { transform: translate(-856px, -447px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 45.909% { transform: translate(-1319px, -596px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 47.727% { transform: translate(-1319px, -596px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 51.364% { transform: translate(-939px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 52.273% { transform: translate(-939px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 58.182% { transform: translate(-30px, -60px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 77.273% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .gs-row.th.nocolor > span:nth-child(3) { animation: thB_18_th_spalva 22s steps(1,end) 0s both; }
    @keyframes thB_18_th_spalva { 0%, 37.727% { background: #fff; color: var(--gs-cell-text); font-weight: 400; } 37.773%, 100% { background: var(--gs-green-th-b); color: #fff; font-weight: 700; } }
    .gs-row.th.nocolor > span:nth-child(4) { animation: thCE_18_th_spalva 22s steps(1,end) 0s both; }
    .gs-row.th.nocolor > span:nth-child(5) { animation: thCE_18_th_spalva 22s steps(1,end) 0s both; }
    .gs-row.th.nocolor > span:nth-child(6) { animation: thCE_18_th_spalva 22s steps(1,end) 0s both; }
    @keyframes thCE_18_th_spalva { 0%, 59.091% { background: #fff; color: var(--gs-cell-text); font-weight: 400; } 59.136%, 100% { background: var(--gs-green-th); color: #fff; font-weight: 700; } }
    .r13 { animation: v_18_th_spalva_13 22s linear 0s both; }
    @keyframes v_18_th_spalva_13 { 0%, 5.450% { opacity: 0; } 6.591% { opacity: 1; } 20.909% { opacity: 1; } 21.818%, 100% { opacity: 0; } }
    .selb { animation: v_18_th_spalva_15 22s linear 0s both; }
    @keyframes v_18_th_spalva_15 { 0%, 23.859% { opacity: 0; } 25.000% { opacity: 1; } 46.364% { opacity: 1; } 47.273%, 100% { opacity: 0; } }
    .pal { animation: v_18_th_spalva_17 22s linear 0s both; }
    @keyframes v_18_th_spalva_17 { 0%, 30.677% { opacity: 0; } 31.818% { opacity: 1; } 37.727% { opacity: 1; } 38.636%, 100% { opacity: 0; } }
    .bucket { animation: bk_18_th_spalva 22s steps(1,end) 0s both; }
    @keyframes bk_18_th_spalva { 0%, 30.000% { background: var(--gs-toolbar); } 30.045%, 37.727% { background: #c2e7ff; } 37.773%, 100% { background: var(--gs-toolbar); } }
    .antb { animation: v_18_th_spalva_21 22s linear 0s both; }
    @keyframes v_18_th_spalva_21 { 0%, 46.586% { opacity: 0; } 47.727% { opacity: 1; } 59.091% { opacity: 1; } 60.000%, 100% { opacity: 0; } }
    .roller { animation: rolGS_18_th_spalva 22s steps(1,end) 0s both; }
    @keyframes rolGS_18_th_spalva { 0%, 46.364% { background: var(--gs-toolbar); } 46.409%, 59.091% { background: #c2e7ff; } 59.136%, 100% { background: var(--gs-toolbar); } }
    .selce { animation: v_18_th_spalva_25 22s linear 0s both; }
    @keyframes v_18_th_spalva_25 { 0%, 52.041% { opacity: 0; } 53.182% { opacity: 1; } 59.091% { opacity: 1; } 60.000%, 100% { opacity: 0; } }
    .stage { transform-origin: 0% 45%; animation: z_18_th_spalva 22s cubic-bezier(.45,0,.2,1) 0s both; }
    @keyframes z_18_th_spalva { 0%, 2.727% { transform: scale(1); } 7.727% { transform: scale(1.12); } 63.636% { transform: scale(1.12); } 68.636%, 100% { transform: scale(1); } }
  `,
  '19-versijos': `
    .card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }

    @keyframes ratilasGS { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    @keyframes raideGS { from { opacity: 0; } to { opacity: 1; } }
    @keyframes tabPulseGS { 0%, 100% { background: var(--gs-tabbar); } 40%, 60% { background: #d3e3fd; } }
    .rip0 { animation: ratilasGS 0.6s ease-out 6.0s forwards; }
    .rip1 { animation: ratilasGS 0.6s ease-out 19.0s forwards; }
    .rip2 { animation: ratilasGS 0.6s ease-out 25.2s forwards; }
    .cursor-wrap { animation: k_19_versijos 40s linear 0s both; }
    @keyframes k_19_versijos { 0% { transform: translate(340px, 508px); } 0.000% { transform: translate(340px, 508px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 13.000% { transform: translate(340px, 508px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 14.750% { transform: translate(774px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 16.500% { transform: translate(774px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 45.500% { transform: translate(800px, 322px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 48.000% { transform: translate(800px, 322px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 61.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 63.500% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 95.000% { transform: translate(0px, 0px); animation-timing-function: cubic-bezier(.35,.05,.25,1); } 100% { transform: translate(0, 0); } }
    .vclock { animation: v_19_versijos_5 40s linear 0s both; }
    @keyframes v_19_versijos_5 { 0%, 0.000% { opacity: 0; } 0.625% { opacity: 1; } 16.000% { opacity: 1; } 16.500%, 100% { opacity: 0; } }
    .vpanel { animation: v_19_versijos_7 40s linear 0s both; }
    @keyframes v_19_versijos_7 { 0%, 16.497% { opacity: 0; } 17.125% { opacity: 1; } 100% { opacity: 1; } }
    .vbar { animation: v_19_versijos_9 40s linear 0s both; }
    @keyframes v_19_versijos_9 { 0%, 16.497% { opacity: 0; } 17.125% { opacity: 1; } 100% { opacity: 1; } }
    .vsafe { animation: v_19_versijos_11 40s linear 0s both; }
    @keyframes v_19_versijos_11 { 0%, 72.497% { opacity: 0; } 73.125% { opacity: 1; } 100% { opacity: 1; } }
    .vsafe .vcell { animation: v_19_versijos_13 40s linear 0s both; }
    @keyframes v_19_versijos_13 { 0%, 83.998% { opacity: 0; } 84.625% { opacity: 1; } 100% { opacity: 1; } }
    .vit.pick { animation: iconPulse 0.6s ease-in-out 19.0s both; }
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
  // >>> NAVIGACIJU-VALDYMAS (generuoja lessons/navigaciju-valdymas/animacijos.js — ranka neredaguoti)
  '05-kur-rasti-navigacijas': `
    /* Kamera: darbalaukis visas → priartėja prie viršutinio kairio kampo (meniu, paieška) → atsitraukia prie sąrašo */
    .stage { animation: k5kamera 13s linear 0s both; }
    @keyframes k5kamera {
      0% { transform: scale(1); }
      26.154% { transform: scale(1); animation-timing-function: cubic-bezier(.45,0,.2,1); }
      30.769% { transform: scale(1.3); }
      81.538% { transform: scale(1.3); animation-timing-function: cubic-bezier(.45,0,.2,1); }
      87.692% { transform: scale(1); }
      100% { transform: scale(1); }
    }
    /* Prožektorius slenka: darbalaukis → „≡“ → „Navigacijos“ meniu → paieška → sąrašo punktas */
    .spot { animation: k5spot 13s linear 0s both; }
    @keyframes k5spot {
      0% { left: 357.0px; top: 389.0px; width: 381.0px; height: 73.0px; opacity: 0; }
      7.692% { left: 357.0px; top: 389.0px; width: 381.0px; height: 73.0px; opacity: 0; }
      10.769% { left: 357.0px; top: 389.0px; width: 381.0px; height: 73.0px; opacity: 1; }
      30% { left: 357.0px; top: 389.0px; width: 381.0px; height: 73.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      33.846% { left: 14.0px; top: 189.0px; width: 50.0px; height: 44.0px; opacity: 1; }
      38.462% { left: 14.0px; top: 189.0px; width: 50.0px; height: 44.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      41.538% { left: -3.0px; top: 247.0px; width: 328.0px; height: 60.0px; opacity: 1; }
      48.462% { left: -3.0px; top: 247.0px; width: 328.0px; height: 60.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      52.308% { left: 137.0px; top: 13.5px; width: 330.0px; height: 50.0px; opacity: 1; }
      67.692% { left: 137.0px; top: 13.5px; width: 330.0px; height: 50.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      70% { left: 137.0px; top: 13.5px; width: 360.0px; height: 195.2px; opacity: 1; }
      73.846% { left: 137.0px; top: 13.5px; width: 360.0px; height: 195.2px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      77.692% { left: 140.0px; top: 110.7px; width: 354.0px; height: 62.0px; opacity: 1; }
      81.538% { left: 140.0px; top: 110.7px; width: 354.0px; height: 62.0px; opacity: 1; }
      84.615% { left: 140.0px; top: 110.7px; width: 354.0px; height: 62.0px; opacity: 0; }
      100% { left: 140.0px; top: 110.7px; width: 354.0px; height: 62.0px; opacity: 0; }
    }
    /* Kursorius: ramybė → „☰“ → paieška → sąrašo punktas → ramybė */
    .cursor-wrap { animation: k5kursorius 13s linear 0s both; }
    @keyframes k5kursorius {
      0% { transform: translate(1346.0px, 637.0px); }
      30% { transform: translate(1346.0px, 637.0px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      34.615% { transform: translate(108.0px, 35.5px); }
      48.462% { transform: translate(108.0px, 35.5px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      53.077% { transform: translate(393.0px, 35.5px); }
      73.846% { transform: translate(393.0px, 35.5px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      78.462% { transform: translate(204.0px, 138.7px); }
      83.846% { transform: translate(204.0px, 138.7px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      90.769% { transform: translate(1200.0px, 700.0px); }
      100% { transform: translate(1200.0px, 700.0px); }
    }
    .rp1 { left: 112.0px; top: 38.5px; animation: ratilas 0.6s ease-out 4.7s forwards; }
    .rp2 { left: 208.0px; top: 141.7px; animation: ratilas 0.6s ease-out 10.6s forwards; }
    @keyframes ratilas { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    /* „☰“ išskleidžia meniu (ikona su užrašu), susiskleidžia perėjus į paiešką */
    .side-x { animation: k5meniu 13s linear 0s both; }
    @keyframes k5meniu {
      0% { clip-path: inset(0 100% 0 0); }
      36.154% { clip-path: inset(0 100% 0 0); animation-timing-function: cubic-bezier(.45,0,.2,1); }
      39.231% { clip-path: inset(0 0 0 0); }
      48.462% { clip-path: inset(0 0 0 0); animation-timing-function: cubic-bezier(.45,0,.2,1); }
      50.769% { clip-path: inset(0 100% 0 0); }
      100% { clip-path: inset(0 100% 0 0); }
    }
    /* Paieška: žymeklis, placeholder dingsta, „navi“ po raidę, išskleidžiamas sąrašas */
    .caret { animation: k5caret 13s linear 0s both; }
    @keyframes k5caret {
      0% { opacity: 0; }
      52.692% { opacity: 0; }
      53.077% { opacity: 1; }
      81.538% { opacity: 1; }
      81.923% { opacity: 0; }
      100% { opacity: 0; }
    }
    .ph { animation: k5ph 0.05s linear 7.85s both; }
    @keyframes k5ph { from { opacity: 1; } to { opacity: 0; } }
    @keyframes k5raide { from { max-width: 0; } to { max-width: 1.2em; } }
    .typed .l1 { animation: k5raide 0.01s step-end 7.9s both; }
    .typed .l2 { animation: k5raide 0.01s step-end 8.1s both; }
    .typed .l3 { animation: k5raide 0.01s step-end 8.3s both; }
    .typed .l4 { animation: k5raide 0.01s step-end 8.5s both; }
    .dd { animation: k5dd 13s linear 0s both; }
    @keyframes k5dd {
      0% { opacity: 0; transform: translateY(8px); }
      67.692% { opacity: 0; transform: translateY(8px); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      70% { opacity: 1; transform: translateY(0); }
      81.538% { opacity: 1; transform: translateY(0); }
      83.846% { opacity: 0; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(0); }
    }
    /* Grupių sąrašas įslenka iš dešinės po spustelėjimo */
    .scr2 { animation: k5sarasas 13s linear 0s both; }
    @keyframes k5sarasas {
      0% { opacity: 0; transform: translateX(60px); }
      82.308% { opacity: 0; transform: translateX(60px); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      86.154% { opacity: 1; transform: translateX(0); }
      100% { opacity: 1; transform: translateX(0); }
    }
  `,
  '05-nuorodu-medis': `
    .stage { animation: k6kamera 9s linear 0s both; }
    @keyframes k6kamera {
      0% { transform: scale(1); }
      8.889% { transform: scale(1); animation-timing-function: cubic-bezier(.45,0,.2,1); }
      15.556% { transform: scale(1.25); }
      28.889% { transform: scale(1.25); animation-timing-function: cubic-bezier(.45,0,.2,1); }
      37.778% { transform: scale(1); }
      100% { transform: scale(1); }
    }
    .spot { animation: k6spot 9s linear 0s both; }
    @keyframes k6spot {
      0% { left: 331.0px; top: 552.0px; width: 1324.0px; height: 82.0px; opacity: 0; }
      3.333% { left: 331.0px; top: 552.0px; width: 1324.0px; height: 82.0px; opacity: 0; }
      7.778% { left: 331.0px; top: 552.0px; width: 1324.0px; height: 82.0px; opacity: 1; }
      11.111% { left: 331.0px; top: 552.0px; width: 1324.0px; height: 82.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      15.556% { left: 1530.9px; top: 568.5px; width: 106.1px; height: 50.0px; opacity: 1; }
      28.889% { left: 1530.9px; top: 568.5px; width: 106.1px; height: 50.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      33.333% { left: 331.0px; top: 222.0px; width: 1324.0px; height: 540.0px; opacity: 1; }
      48.889% { left: 331.0px; top: 222.0px; width: 1324.0px; height: 540.0px; opacity: 1; }
      54.444% { left: 331.0px; top: 222.0px; width: 1324.0px; height: 540.0px; opacity: 0; }
      100% { left: 331.0px; top: 222.0px; width: 1324.0px; height: 540.0px; opacity: 0; }
    }
    .cursor-wrap { animation: k6kursorius 9s linear 0s both; }
    @keyframes k6kursorius {
      0% { transform: translate(1146.0px, 697.0px); }
      11.111% { transform: translate(1146.0px, 697.0px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      17.778% { transform: translate(1580.0px, 590.5px); }
      32.222% { transform: translate(1580.0px, 590.5px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      40% { transform: translate(1300.0px, 760.0px); }
      100% { transform: translate(1300.0px, 760.0px); }
    }
    .rp1 { left: 1584.0px; top: 593.5px; animation: ratilas 0.6s ease-out 2.6s forwards; }
    @keyframes ratilas { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    /* Medis: ekranas pasikeičia po spustelėjimo, eilutės iš viršaus žemyn po vieną */
    .scr2 { animation: k6medis 9s linear 0s both; }
    @keyframes k6medis {
      0% { opacity: 0; }
      30% { opacity: 0; }
      33.333% { opacity: 1; }
      100% { opacity: 1; }
    }
    .nd { animation: fadeUpLight 0.35s cubic-bezier(0.16, 1, 0.3, 1) 2.8s both; }
    .nd:nth-child(2) { animation-delay: 2.95s; } .nd:nth-child(3) { animation-delay: 3.10s; }
    .nd:nth-child(4) { animation-delay: 3.25s; } .nd:nth-child(5) { animation-delay: 3.40s; }
    .nd:nth-child(6) { animation-delay: 3.55s; } .nd:nth-child(7) { animation-delay: 3.70s; }
  `,
  '05-nauja-nuoroda': `
    .stage { animation: k7kamera 17s linear 0s both; }
    @keyframes k7kamera {
      0% { transform: scale(1); }
      29.412% { transform: scale(1); animation-timing-function: cubic-bezier(.45,0,.2,1); }
      34.118% { transform: scale(1.3); }
      55.882% { transform: scale(1.3); animation-timing-function: cubic-bezier(.45,0,.2,1); }
      62.941% { transform: scale(1); }
      100% { transform: scale(1); }
    }
    .spot { animation: k7spot 17s linear 0s both; }
    @keyframes k7spot {
      0% { left: 329.0px; top: 140.0px; width: 195.4px; height: 58.0px; opacity: 0; }
      2.353% { left: 329.0px; top: 140.0px; width: 195.4px; height: 58.0px; opacity: 0; }
      4.706% { left: 329.0px; top: 140.0px; width: 195.4px; height: 58.0px; opacity: 1; }
      18.824% { left: 329.0px; top: 140.0px; width: 195.4px; height: 58.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      21.176% { left: 511.0px; top: 289.0px; width: 660.0px; height: 68.0px; opacity: 1; }
      25.882% { left: 511.0px; top: 289.0px; width: 660.0px; height: 68.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      28.824% { left: 357.0px; top: 445.0px; width: 132.6px; height: 50.0px; opacity: 1; }
      43.529% { left: 357.0px; top: 445.0px; width: 132.6px; height: 50.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      45.882% { left: 209.0px; top: 129.0px; width: 356.0px; height: 68.0px; opacity: 1; }
      51.765% { left: 209.0px; top: 129.0px; width: 356.0px; height: 68.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      53.529% { left: 1319.4px; top: 279.5px; width: 132.6px; height: 50.0px; opacity: 1; }
      56.471% { left: 1319.4px; top: 279.5px; width: 132.6px; height: 50.0px; opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      59.412% { left: 357.0px; top: 819.0px; width: 131.5px; height: 50.0px; opacity: 1; }
      72.941% { left: 357.0px; top: 819.0px; width: 131.5px; height: 50.0px; opacity: 1; }
      75.294% { left: 357.0px; top: 819.0px; width: 131.5px; height: 50.0px; opacity: 0; }
      100% { left: 357.0px; top: 819.0px; width: 131.5px; height: 50.0px; opacity: 0; }
    }
    .cursor-wrap { animation: k7kursorius 17s linear 0s both; }
    @keyframes k7kursorius {
      0% { transform: translate(1146.0px, 717.0px); }
      9.412% { transform: translate(1146.0px, 717.0px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      12.941% { transform: translate(422.7px, 166.0px); }
      20% { transform: translate(422.7px, 166.0px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      23.529% { transform: translate(633.0px, 326.0px); }
      36.471% { transform: translate(633.0px, 326.0px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      40% { transform: translate(419.3px, 467.0px); }
      50% { transform: translate(419.3px, 467.0px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      52.941% { transform: translate(1381.7px, 301.5px); }
      61.176% { transform: translate(1381.7px, 301.5px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      65.882% { transform: translate(418.8px, 841.0px); }
      75.294% { transform: translate(418.8px, 841.0px); animation-timing-function: cubic-bezier(.2,.7,.3,1); }
      80% { transform: translate(1250.0px, 780.0px); }
      100% { transform: translate(1250.0px, 780.0px); }
    }
    .rp1 { left: 426.7px; top: 169.0px; animation: ratilas 0.6s ease-out 2.8s forwards; }
    .rp2 { left: 637.0px; top: 329.0px; animation: ratilas 0.6s ease-out 4.4s forwards; }
    .rp3 { left: 423.3px; top: 470.0px; animation: ratilas 0.6s ease-out 7.2s forwards; }
    .rp4 { left: 1385.7px; top: 304.5px; animation: ratilas 0.6s ease-out 9.1s forwards; }
    .rp5 { left: 422.8px; top: 844.0px; animation: ratilas 0.6s ease-out 12.3s forwards; }
    @keyframes ratilas { from { opacity: .7; transform: scale(.3); } to { opacity: 0; transform: scale(1.5); } }
    /* Langas „Kokio tipo linką norite sukurti?“ — išsiskleidžia, dingsta pasirinkus „Page“ */
    .ov1 { animation: k7ov1 17s linear 0s both; }
    @keyframes k7ov1 {
      0% { opacity: 0; }
      17.059% { opacity: 0; }
      18.824% { opacity: 1; }
      26.176% { opacity: 1; }
      27.059% { opacity: 0; }
      100% { opacity: 0; }
    }
    .modal-type { animation: k7modal1 17s linear 0s both; }
    @keyframes k7modal1 {
      0% { opacity: 0; transform: scale(.94); }
      17.059% { opacity: 0; transform: scale(.94); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      19.118% { opacity: 1; transform: scale(1); }
      26.176% { opacity: 1; transform: scale(1); }
      27.059% { opacity: 0; transform: scale(1); }
      100% { opacity: 0; transform: scale(1); }
    }
    /* Forma */
    .scr2 { animation: k7forma 17s linear 0s both; }
    @keyframes k7forma {
      0% { opacity: 0; }
      26.471% { opacity: 0; }
      28.235% { opacity: 1; }
      100% { opacity: 1; }
    }
    /* Langas „Choose an entry.“: paieška „logo“, sąrašas susitraukia iki „Logopedas“ */
    .ov2 { animation: k7ov2 17s linear 0s both; }
    @keyframes k7ov2 {
      0% { opacity: 0; }
      42.941% { opacity: 0; }
      44.706% { opacity: 1; }
      53.824% { opacity: 1; }
      55% { opacity: 0; }
      100% { opacity: 0; }
    }
    .modal-pick { animation: k7modal2 17s linear 0s both; }
    @keyframes k7modal2 {
      0% { opacity: 0; transform: scale(.94); }
      42.941% { opacity: 0; transform: scale(.94); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      45% { opacity: 1; transform: scale(1); }
      53.824% { opacity: 1; transform: scale(1); }
      55% { opacity: 0; transform: scale(1); }
      100% { opacity: 0; transform: scale(1); }
    }
    .caret { animation: k7caret 17s linear 0s both; }
    @keyframes k7caret {
      0% { opacity: 0; }
      44.706% { opacity: 0; }
      45% { opacity: 1; }
      53.529% { opacity: 1; }
      53.824% { opacity: 0; }
      100% { opacity: 0; }
    }
    .ph2 { animation: k7ph 0.05s linear 7.85s both; }
    @keyframes k7ph { from { opacity: 1; } to { opacity: 0; } }
    @keyframes k7raide { from { max-width: 0; } to { max-width: 1.2em; } }
    .typed .l1 { animation: k7raide 0.01s step-end 7.9s both; }
    .typed .l2 { animation: k7raide 0.01s step-end 8.1s both; }
    .typed .l3 { animation: k7raide 0.01s step-end 8.3s both; }
    .typed .l4 { animation: k7raide 0.01s step-end 8.5s both; }
    .list-all { animation: k7visi 17s linear 0s both; }
    @keyframes k7visi {
      0% { opacity: 1; }
      51.176% { opacity: 1; }
      52.059% { opacity: 0; }
      100% { opacity: 0; }
    }
    .list-one { animation: k7vienas 17s linear 0s both; }
    @keyframes k7vienas {
      0% { opacity: 0; }
      51.471% { opacity: 0; }
      52.647% { opacity: 1; }
      100% { opacity: 1; }
    }
    /* Pasirinktas puslapis atsiranda lauke „Page“ */
    .picked-row { animation: fadeUpLight 0.35s cubic-bezier(0.16, 1, 0.3, 1) 9.3s both; }
    /* Po „Išsaugoti“ — medis su nauja eilute apačioje, žalias blyksnis ties garsu „patvirtinimas“ */
    .scr3 { animation: k7medis 17s linear 0s both; }
    @keyframes k7medis {
      0% { opacity: 0; }
      72.941% { opacity: 0; }
      74.706% { opacity: 1; }
      100% { opacity: 1; }
    }
    .node-new { animation: fadeUpLight 0.4s cubic-bezier(0.16, 1, 0.3, 1) 12.6s both, blyksnis 0.7s ease-out 13.7s both; }
    @keyframes blyksnis { 0% { box-shadow: 0 0 0 0 rgba(71,209,101,0); } 30% { box-shadow: 0 0 0 5px rgba(71,209,101,.9); } 100% { box-shadow: 0 0 0 0 rgba(71,209,101,0); } }
  `,
  // <<< NAVIGACIJU-VALDYMAS
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

// `**Skirtukai:** ne` scenarijuje — skirtukų kortelių negaminame (žr. build-video.js).
function skirtukaiIsjungti() {
  const sp = path.join(LESSONS_DIR, lessonSlug, 'video', `scenarijus-${lang}.md`);
  try { return /^\*\*Skirtukai:\*\*\s*(ne|no|off)\s*$/mi.test(fs.readFileSync(sp, 'utf-8')); }
  catch (e) { return false; }
}

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
  // Skirtukų pavadinimai — atskira lentelė `## Skirtukai` (nebūtina).
  let skirtukuose = false;
  const skirtukai = {};
  for (const line of content.split('\n')) {
    if (/^##\s+Skirtukai/i.test(line)) { skirtukuose = true; continue; }
    if (skirtukuose && /^##\s/.test(line)) break;
    if (!skirtukuose) continue;
    const sm = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*$/);
    if (sm) skirtukai[parseInt(sm[1])] = sm[2].trim();
  }
  order.forEach(o => { if (skirtukai[o.kadrasNum]) o.skirtukas = skirtukai[o.kadrasNum]; });

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
  // ⛔ Skirtuko pavadinimas NEKARTOJA po juo einančio kadro antraštės (Eimantas, 2026-10-30):
  // jis trumpesnis, o eilučių lūžis nurodomas ranka pasviruoju brūkšniu scenarijaus
  // skyriuje „## Skirtukai" (`plona / STORA`). Be jo veikia senas spėjimas — paskutiniai
  // 1–2 žodžiai į antrą eilutę, dėl ko ilgi pavadinimai lūždavo ne ten.
  const raw = String(title).trim();
  let plona, stora;
  if (raw.includes('/')) {
    const dalys = raw.split('/');
    plona = dalys[0].trim();
    stora = dalys.slice(1).join('/').trim();
  } else {
    const zod = raw.split(/\s+/);
    const kiekStoru = zod.length > 3 ? 2 : 1;
    plona = zod.slice(0, Math.max(1, zod.length - kiekStoru)).join(' ');
    stora = zod.slice(Math.max(1, zod.length - kiekStoru)).join(' ');
  }
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
  if (scenarioOrder && scenarioOrder.length > 1 && !skirtukaiIsjungti()) {
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
      const html = buildTransitionHtml(item.kadrasNum, item.skirtukas || item.title);
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
