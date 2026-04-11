#!/usr/bin/env node

/**
 * Illustration Generator
 *
 * Scans lesson subdirectories for templates and content,
 * produces localized HTML illustrations and optionally PNG exports.
 *
 * Usage:
 *   node generate.js              # Generate HTML only
 *   node generate.js --png        # Generate HTML + PNG (light mode)
 *   node generate.js --dark       # Generate HTML + dark mode PNG (-dark suffix)
 *   node generate.js --png --dark # Generate both light + dark PNGs
 *   node generate.js --lang lt    # Only Lithuanian
 *   node generate.js --png --dark --lang lt  # Both modes, Lithuanian only
 *   node generate.js --manifest             # Regenerate lessons/manifest.json
 */

const fs = require('fs');
const path = require('path');

const LESSONS_DIR = path.join(__dirname, 'lessons');
const ASSETS_DIR = path.join(__dirname, 'assets');
const TOKENS_DIR = path.join(__dirname, 'tokens');

// Parse CLI args
const args = process.argv.slice(2);
const langFilter = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : null;
const exportPng = args.includes('--png');
const exportDark = args.includes('--dark'); // Generate dark mode PNGs (adds -dark suffix)
const exportManifest = args.includes('--manifest'); // Regenerate lessons/manifest.json

// Common template variables injected into every template
const COMMON_VARS = {
  brand_logo_path: './assets/cleverphant-juodas.svg',
  brand_logo_dark_path: './assets/cleverphant-baltas.png',
};

/**
 * Auto-mapper: template filename → JSON section key.
 * Flattens all key-value pairs from the matching JSON section.
 * Arrays are expanded: ["a","b","c"] with key "items" → items_1="a", items_2="b", items_3="c"
 */
function autoMap(templateName, data) {
  const sectionKey = templateName.replace(/-/g, '_');
  const section = data[sectionKey];
  if (!section) return null;

  const vars = { lang: data.lang, ...COMMON_VARS };

  for (const [key, value] of Object.entries(section)) {
    if (Array.isArray(value)) {
      value.forEach((item, i) => { vars[`${key}_${i + 1}`] = item; });
      // Also keep singular form without _N for templates that index from [0]
      value.forEach((item, i) => { vars[`${key.replace(/s$/, '')}_${i + 1}`] = item; });
    } else {
      vars[key] = value;
    }
  }

  return vars;
}

// Override mappers — only for templates that need computed/renamed values
const TEMPLATE_OVERRIDES = {
  '03-kopija-pavadinimas-formatas': (data) => {
    const d = data['03_kopija_pavadinimas_formatas'];
    return {
      step1_num: '1',
      step2_num: '2',
      step2_desc_prefix: '',
      step2_desc_code: d.step2_code,
      step2_desc_suffix: ' ' + d.step2_desc,
      step3_num: '3',
      step4_num: '4',
    };
  },
};

function replaceTemplateVars(html, vars) {
  const missing = [];
  const result = html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (vars[key] !== undefined) return vars[key];
    missing.push(key);
    return match;
  });
  return { html: result, missing };
}

/**
 * Discover lesson directories by scanning lessons/ for subdirectories
 * that contain a templates/ folder.
 */
function discoverLessons() {
  if (!fs.existsSync(LESSONS_DIR)) {
    console.error('No lessons/ directory found.');
    process.exit(1);
  }

  const entries = fs.readdirSync(LESSONS_DIR, { withFileTypes: true });
  const lessons = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const lessonPath = path.join(LESSONS_DIR, entry.name);
    const templatesPath = path.join(lessonPath, 'templates');
    if (fs.existsSync(templatesPath) && fs.statSync(templatesPath).isDirectory()) {
      lessons.push({
        name: entry.name,
        path: lessonPath,
        templatesDir: templatesPath,
        contentDir: path.join(lessonPath, 'content'),
        outputDir: path.join(lessonPath, 'output'),
      });
    }
  }

  if (lessons.length === 0) {
    console.error('No lesson directories found with a templates/ subfolder.');
    process.exit(1);
  }

  return lessons;
}

function generate() {
  const lessons = discoverLessons();
  let totalGenerated = 0;
  const allHtmlFiles = [];
  const validationErrors = [];

  for (const lesson of lessons) {
    console.log(`\nLesson: ${lesson.name}`);

    // Load content/language files
    if (!fs.existsSync(lesson.contentDir)) {
      console.warn(`  [skip] No content/ directory in ${lesson.name}`);
      continue;
    }

    const langFiles = fs.readdirSync(lesson.contentDir).filter(f => f.endsWith('.json'));
    const languages = langFiles.map(f => {
      const data = JSON.parse(fs.readFileSync(path.join(lesson.contentDir, f), 'utf-8'));
      return data;
    }).filter(d => !langFilter || d.lang === langFilter);

    if (languages.length === 0) {
      console.warn(`  [skip] No language files found${langFilter ? ` for "${langFilter}"` : ''}`);
      continue;
    }

    // Load templates
    const templateFiles = fs.readdirSync(lesson.templatesDir).filter(f => f.endsWith('.html'));

    for (const lang of languages) {
      const langDir = path.join(lesson.outputDir, lang.lang);
      if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
      }

      for (const templateFile of templateFiles) {
        const templateName = path.basename(templateFile, '.html');

        // Auto-map from JSON section, then merge any overrides
        const vars = autoMap(templateName, lang);
        if (!vars) {
          console.warn(`  [skip] No JSON section for ${templateName}`);
          continue;
        }
        const override = TEMPLATE_OVERRIDES[templateName];
        if (override) Object.assign(vars, override(lang));

        const template = fs.readFileSync(path.join(lesson.templatesDir, templateFile), 'utf-8');
        const { html, missing } = replaceTemplateVars(template, vars);

        if (missing.length > 0) {
          const unique = [...new Set(missing)];
          console.error(`  [${lang.lang}] ⚠ ${templateName}: missing keys → ${unique.join(', ')}`);
          validationErrors.push({ template: templateName, lang: lang.lang, keys: unique });
        }

        const outPath = path.join(langDir, `${templateName}.html`);
        fs.writeFileSync(outPath, html, 'utf-8');
        console.log(`  [${lang.lang}] ${templateName}.html`);
        totalGenerated++;

        allHtmlFiles.push({ lesson: lesson.name, lang: lang.lang, name: templateName, path: outPath });
      }

      // Copy assets to output lang directory
      const langAssetsDir = path.join(langDir, 'assets');
      if (!fs.existsSync(langAssetsDir)) {
        fs.mkdirSync(langAssetsDir, { recursive: true });
      }
      const assetFiles = fs.readdirSync(ASSETS_DIR).filter(f => !f.startsWith('.'));
      for (const assetFile of assetFiles) {
        fs.copyFileSync(path.join(ASSETS_DIR, assetFile), path.join(langAssetsDir, assetFile));
      }
      console.log(`  [${lang.lang}] Copied ${assetFiles.length} asset(s)`);

      // Copy tokens to output lang directory (same relative path as templates use)
      const langTokensDir = path.join(langDir, 'tokens');
      if (!fs.existsSync(langTokensDir)) {
        fs.mkdirSync(langTokensDir, { recursive: true });
      }
      const tokenFiles = fs.readdirSync(TOKENS_DIR).filter(f => f.endsWith('.css'));
      for (const tokenFile of tokenFiles) {
        fs.copyFileSync(path.join(TOKENS_DIR, tokenFile), path.join(langTokensDir, tokenFile));
      }
    }
  }

  console.log(`\nGenerated ${totalGenerated} illustration(s).`);

  if (validationErrors.length > 0) {
    console.error(`\n⚠ VALIDATION: ${validationErrors.length} template(s) have unreplaced placeholders:`);
    for (const err of validationErrors) {
      console.error(`  [${err.lang}] ${err.template}: ${err.keys.join(', ')}`);
    }
  }

  if (exportPng || exportDark) {
    return generatePng(allHtmlFiles);
  }
}

async function generatePng(htmlFiles) {
  const modes = [];
  if (exportPng) modes.push({ name: 'light', suffix: '', darkFeature: false });
  if (exportDark) modes.push({ name: 'dark', suffix: '-dark', darkFeature: true });

  console.log(`\nExporting PNG (${modes.map(m => m.name).join(' + ')})...`);

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: true });

  let exported = 0;

  for (const file of htmlFiles) {
    const pngDir = path.join(LESSONS_DIR, file.lesson, 'output', file.lang);
    if (!fs.existsSync(pngDir)) {
      fs.mkdirSync(pngDir, { recursive: true });
    }

    for (const mode of modes) {
      const page = await browser.newPage();

      // Set viewport wide enough for the card
      await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

      // Enable dark mode via Puppeteer media feature emulation
      if (mode.darkFeature) {
        await page.emulateMediaFeatures([
          { name: 'prefers-color-scheme', value: 'dark' },
        ]);
      }

      // Load the HTML file
      const fileUrl = 'file://' + path.resolve(file.path);
      await page.goto(fileUrl, { waitUntil: 'networkidle0' });

      // Wait for fonts to load
      await page.evaluateHandle('document.fonts.ready');

      // Find the .card element and screenshot just that
      const card = await page.$('.card');
      const pngFilename = `${file.name}${mode.suffix}.png`;
      if (card) {
        const pngPath = path.join(pngDir, pngFilename);
        await card.screenshot({ path: pngPath, type: 'png', omitBackground: true });
        console.log(`  [${file.lang}] ${pngFilename}`);
        exported++;
      } else {
        const pngPath = path.join(pngDir, pngFilename);
        await page.screenshot({ path: pngPath, type: 'png', omitBackground: true });
        console.log(`  [${file.lang}] ${pngFilename} (full page)`);
        exported++;
      }

      await page.close();
    }
  }

  await browser.close();
  console.log(`\nExported ${exported} PNG(s).`);
}

/**
 * Generate lessons/manifest.json from templates + content
 */
function generateManifest() {
  const lessons = discoverLessons();
  const manifest = { lessons: {} };

  for (const lesson of lessons) {
    const templateFiles = fs.readdirSync(lesson.templatesDir).filter(f => f.endsWith('.html'));
    const templates = templateFiles.map(f => {
      const name = f.replace('.html', '');
      const html = fs.readFileSync(path.join(lesson.templatesDir, f), 'utf-8');
      const placeholders = [...new Set((html.match(/\{\{(\w+)\}\}/g) || []))].map(p => p.replace(/[{}]/g, ''));
      return { name, json_section: name.replace(/-/g, '_'), placeholders };
    });

    const langs = fs.existsSync(lesson.contentDir)
      ? fs.readdirSync(lesson.contentDir).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''))
      : [];

    manifest.lessons[lesson.name] = { templates, languages: langs };
  }

  const outPath = path.join(LESSONS_DIR, 'manifest.json');
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
  console.log(`Manifest written: ${outPath} (${Object.keys(manifest.lessons).length} lessons)`);
}

if (exportManifest) {
  generateManifest();
} else {
  generate();
}
