#!/usr/bin/env node

/**
 * Illustration Generator
 *
 * Scans lesson subdirectories for templates and content,
 * produces localized HTML illustrations and optionally PNG exports.
 *
 * Usage:
 *   node generate.js              # Generate HTML only
 *   node generate.js --png        # Generate HTML + PNG
 *   node generate.js --lang lt    # Only Lithuanian
 *   node generate.js --png --lang lt  # PNG for Lithuanian only
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

// Template-to-i18n key mapping
const TEMPLATE_KEYS = {
  '00-kodel-tai-naudinga': (data) => {
    const d = data['00_kodel_tai_naudinga'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      title: d.title,
      old_title: d.old_title,
      old_step_1: d.old_step_1,
      old_step_2: d.old_step_2,
      old_step_3: d.old_step_3,
      old_step_4: d.old_step_4,
      new_title: d.new_title,
      new_step_1: d.new_step_1,
      new_step_2: d.new_step_2,
      summary: d.summary,
    };
  },
  '01-sheets-tvs-svetaine': (data) => ({
    lang: data.lang,
    brand_logo_path: './assets/cleverphant-juodas.svg',
    title: data['01_sheets_tvs_svetaine'].title,
    step1_label: data['01_sheets_tvs_svetaine'].step1_label,
    step1_desc: data['01_sheets_tvs_svetaine'].step1_desc,
    step2_label: data['01_sheets_tvs_svetaine'].step2_label,
    step2_desc: data['01_sheets_tvs_svetaine'].step2_desc,
    step3_label: data['01_sheets_tvs_svetaine'].step3_label,
    step3_desc: data['01_sheets_tvs_svetaine'].step3_desc,
    arrow_label_1: data['01_sheets_tvs_svetaine'].arrow_label_1,
    arrow_label_2: data['01_sheets_tvs_svetaine'].arrow_label_2,
  }),
  '02-failo-url-anatomija': (data) => {
    const d = data['02_failo_url_anatomija'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      title: d.title,
      file_label: d.file_label,
      sheet_tab_1: d.sheet_tabs[0],
      sheet_tab_2: d.sheet_tabs[1],
      sheet_tab_3: d.sheet_tabs[2],
      url_label: d.url_label,
      url_base: d.url_base,
      url_file_id: d.url_file_id,
      url_gid: d.url_gid,
      gid_explain: d.gid_explain,
      gid_value_1: d.gid_values[0],
      gid_value_2: d.gid_values[1],
      gid_value_3: d.gid_values[2],
    };
  },
  '03-kopija-pavadinimas-formatas': (data) => {
    const d = data['03_kopija_pavadinimas_formatas'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      title: d.title,
      step1_num: '1',
      step1_label: d.step1_label,
      step1_desc: d.step1_desc,
      step2_num: '2',
      step2_label: d.step2_label,
      step2_desc_prefix: '',
      step2_desc_code: d.step2_code,
      step2_desc_suffix: ' ' + d.step2_desc,
      step3_num: '3',
      step3_label: d.step3_label,
      step3_desc: d.step3_desc,
      step3_format: d.step3_format,
      step4_num: '4',
      step4_label: d.step4_label,
      step4_desc: d.step4_desc,
      step4_email: d.step4_email,
      step4_note: d.step4_note,
    };
  },
  '04-publikavimas-share-viewer': (data) => {
    const d = data['04_publikavimas_share_viewer'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      title: d.title,
      share_button: d.share_button,
      access_label: d.access_label,
      anyone_label: d.anyone_label,
      role_label: d.role_label,
      done_label: d.done_label,
      step1_desc: d.step1_desc,
      step2_desc: d.step2_desc,
      step3_desc: d.step3_desc,
      warning: d.warning,
    };
  },
  '05-taisyklingai-netaisyklingai-lentele': (data) => {
    const d = data['05_taisyklingai_netaisyklingai_lentele'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      title: d.title,
      do_title: d.do_title,
      dont_title: d.dont_title,
      do_1: d.do_1, dont_1: d.dont_1,
      do_2: d.do_2, dont_2: d.dont_2,
      do_3: d.do_3, dont_3: d.dont_3,
      do_4: d.do_4, dont_4: d.dont_4,
    };
  },
  '06-lapu-tvarka-gid-reiksmes': (data) => {
    const d = data['06_lapu_tvarka_gid_reiksmes'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      title: d.title,
      tab_1: d.tab_1,
      tab_2: d.tab_2,
      tab_3: d.tab_3,
      first_label: d.first_label,
      warn_title: d.warn_title,
      warn_desc: d.warn_desc,
      ok_title: d.ok_title,
      ok_desc: d.ok_desc,
    };
  },
  '07-kodo-iterpimas-rezultatas': (data) => {
    const d = data['07_kodo_iterpimas_rezultatas'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      title: d.title,
      editor_label: d.editor_label,
      code_template: d.code_template,
      code_warn: d.code_warn,
      result_label: d.result_label,
      table_h2: d.table_h2,
      table_header_1: d.table_header_1,
      table_header_2: d.table_header_2,
      table_header_3: d.table_header_3,
      table_r1_c1: d.table_r1_c1, table_r1_c2: d.table_r1_c2, table_r1_c3: d.table_r1_c3,
      table_r2_c1: d.table_r2_c1, table_r2_c2: d.table_r2_c2, table_r2_c3: d.table_r2_c3,
    };
  },
  '08-duomenu-atsinaujinimas': (data) => {
    const d = data['08_duomenu_atsinaujinimas'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      brand_logo_dark_path: './assets/cleverphant-baltas.png',
      title: d.title,
      state_editing_title: d.state_editing_title,
      state_left_title: d.state_left_title,
      col_nr: d.col_nr,
      col_name: d.col_name,
      col_role: d.col_role,
      row1_name: d.row1_name,
      row1_role: d.row1_role,
      row2_name_editing: d.row2_name_editing,
      row2_name_done: d.row2_name_done,
      row2_role: d.row2_role,
      status_waiting: d.status_waiting,
      status_synced: d.status_synced,
      arrow_hint: d.arrow_hint,
      summary: d.summary,
    };
  },
  '01-teisingas-projekto-puslapis': (data) => {
    const d = data['01_teisingas_projekto_puslapis'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      title: d.title,
      browser_url: d.browser_url,
      nav_1: d.nav_1,
      nav_2: d.nav_2,
      nav_3: d.nav_3,
      nav_4: d.nav_4,
      bc_1: d.bc_1,
      bc_2: d.bc_2,
      bc_3: d.bc_3,
      page_title: d.page_title,
      eu_banner_text: d.eu_banner_text,
      school_name: d.school_name,
      project_intro: d.project_intro,
      project_goal: d.project_goal,
      project_period: d.project_period,
      project_executor: d.project_executor,
      project_budget: d.project_budget,
      sidebar_1: d.sidebar_1,
      sidebar_2: d.sidebar_2,
      sidebar_3: d.sidebar_3,
      ann_1: d.ann_1,
      ann_2: d.ann_2,
      ann_3: d.ann_3,
      ann_4: d.ann_4,
    };
  },
  '02-cpva-dokumentai': (data) => {
    const d = data['02_cpva_dokumentai'];
    return {
      lang: data.lang,
      brand_logo_path: './assets/cleverphant-juodas.svg',
      title: d.title,
      doc1_label: d.doc1_label,
      doc1_desc: d.doc1_desc,
      doc1_tag: d.doc1_tag,
      doc2_label: d.doc2_label,
      doc2_desc: d.doc2_desc,
      doc2_tag: d.doc2_tag,
      doc3_label: d.doc3_label,
      doc3_desc: d.doc3_desc,
      doc3_tag: d.doc3_tag,
    };
  },
};

function replaceTemplateVars(html, vars) {
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
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
        const mapper = TEMPLATE_KEYS[templateName];

        if (!mapper) {
          console.warn(`  [skip] No key mapping for ${templateName}`);
          continue;
        }

        const template = fs.readFileSync(path.join(lesson.templatesDir, templateFile), 'utf-8');
        const vars = mapper(lang);
        const html = replaceTemplateVars(template, vars);

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

  if (exportPng) {
    return generatePng(allHtmlFiles);
  }
}

async function generatePng(htmlFiles) {
  console.log('\nExporting PNG...');

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: true });

  let exported = 0;

  for (const file of htmlFiles) {
    // PNG goes alongside HTML in the same output lang directory
    const pngDir = path.join(LESSONS_DIR, file.lesson, 'output', file.lang);
    if (!fs.existsSync(pngDir)) {
      fs.mkdirSync(pngDir, { recursive: true });
    }

    const page = await browser.newPage();

    // Set viewport wide enough for the card
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

    // Load the HTML file
    const fileUrl = 'file://' + path.resolve(file.path);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Find the .card element and screenshot just that
    const card = await page.$('.card');
    if (card) {
      const pngPath = path.join(pngDir, `${file.name}.png`);
      await card.screenshot({ path: pngPath, type: 'png', omitBackground: true });
      console.log(`  [${file.lang}] ${file.name}.png`);
      exported++;
    } else {
      // Fallback: screenshot the full page
      const pngPath = path.join(pngDir, `${file.name}.png`);
      await page.screenshot({ path: pngPath, type: 'png', omitBackground: true });
      console.log(`  [${file.lang}] ${file.name}.png (full page)`);
      exported++;
    }

    await page.close();
  }

  await browser.close();
  console.log(`\nExported ${exported} PNG(s).`);
}

generate();
