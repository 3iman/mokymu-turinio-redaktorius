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
  const htmlFiles = fs.readdirSync(outputDir)
    .filter(f => f.endsWith('.html'))
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
