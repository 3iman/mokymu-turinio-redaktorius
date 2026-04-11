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

  /* ---- STAGING: scene visible from start ---- */
  .card {
    opacity: 1 !important;
  }
  .card::before {
    opacity: 0.37 !important; /* watermark always visible */
  }
`;

// ---- Per-template animation sequences ----
// Each template gets its own CSS based on its HTML structure.
// Timing follows ANIMATION_PRINCIPLES.md sequence.

const TEMPLATE_ANIMATIONS = {

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
const TRANSITION_DURATION = 2.5; // seconds per transition clip
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
      const fileName = m[4].trim().replace(/\.(mp4|png)$/, '');
      if (kadrasNum === 0 || fileName.includes('intro') || fileName.includes('autro')) continue;
      order.push({ kadrasNum, title, fileName });
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
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px;
    overflow: hidden;
    font-family: 'Inter', -apple-system, sans-serif;
    background: #f0f2f5;
  }
  .line-sweep {
    position: absolute; top: 50%; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transform: translateY(-50%) scaleX(0);
    transform-origin: left center;
    animation: lineSweep 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards,
               allFadeOut 0.3s ease 2.1s forwards;
  }
  .line-trail-1 {
    position: absolute; top: calc(50% - 20px); left: 0;
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.2) 30%, rgba(139,92,246,0.15) 70%, transparent 100%);
    transform: scaleX(0); transform-origin: left center;
    animation: lineSweep 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards,
               allFadeOut 0.3s ease 2.1s forwards;
  }
  .line-trail-2 {
    position: absolute; top: calc(50% + 20px); left: 0;
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.2) 30%, rgba(139,92,246,0.15) 70%, transparent 100%);
    transform: scaleX(0); transform-origin: left center;
    animation: lineSweep 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.17s forwards,
               allFadeOut 0.3s ease 2.1s forwards;
  }
  .line-number {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    font-size: 120px; font-weight: 800; color: #3b82f6;
    opacity: 0;
    animation: numPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards,
               allFadeOut 0.3s ease 2.1s forwards;
  }
  .line-title {
    position: absolute; top: calc(50% + 80px); left: 50%;
    transform: translate(-50%, 0) translateY(10px);
    font-size: 28px; font-weight: 600; color: #64748b;
    white-space: nowrap; opacity: 0;
    animation: titleSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards,
               allFadeOut 0.3s ease 2.1s forwards;
  }
  @keyframes lineSweep {
    to { transform: translateY(-50%) scaleX(1); }
  }
  @keyframes numPop {
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes titleSlide {
    to { opacity: 1; transform: translate(-50%, 0) translateY(0); }
  }
  @keyframes allFadeOut {
    to { opacity: 0; }
  }
</style></head><body>
  <div class="line-trail-1"></div>
  <div class="line-sweep"></div>
  <div class="line-trail-2"></div>
  <div class="line-number">${num}</div>
  <div class="line-title">${title}</div>
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

    // Force replay: reset all animations so they start fresh
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.animationName && style.animationName !== 'none') {
          el.style.animation = 'none';
          el.offsetHeight; // force reflow
          el.style.animation = '';
        }
      });
    });

    // Capture frames
    const totalFrames = Math.ceil(CLIP_DURATION * FPS);

    for (let f = 0; f < totalFrames; f++) {
      const framePath = path.join(framesDir, `frame_${String(f).padStart(4, '0')}.png`);
      await page.screenshot({ path: framePath, type: 'png' });

      if (f < totalFrames - 1) {
        await new Promise(r => setTimeout(r, 1000 / FPS));
      }

      if ((f + 1) % 15 === 0 || f === totalFrames - 1) {
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

      // Force replay
      await page.evaluate(() => {
        document.querySelectorAll('*').forEach(el => {
          const style = window.getComputedStyle(el);
          if (style.animationName && style.animationName !== 'none') {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = '';
          }
        });
      });

      const totalFrames = Math.ceil(TRANSITION_DURATION * FPS);
      for (let f = 0; f < totalFrames; f++) {
        const framePath = path.join(framesDir, `frame_${String(f).padStart(4, '0')}.png`);
        await page.screenshot({ path: framePath, type: 'png' });
        if (f < totalFrames - 1) {
          await new Promise(r => setTimeout(r, 1000 / FPS));
        }
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
