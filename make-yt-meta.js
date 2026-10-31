#!/usr/bin/env node
/**
 * make-yt-meta.js
 *
 * Adapteris tarp esamos gamybos ir yt_upload kontrakto.
 * Iš to, kas jau yra, pagamina lessons/{slug}/video/youtube-{lang}.json.
 *
 *   pavadinimas  ← WP pamokos title (perrašomas ranka meta faile)
 *   aprašymas    ← youtube-{lang}.txt (generate-youtube-description.js)
 *   tagai        ← config/settings.json + scenarijaus antraštės eilutė „**Tagai:** a, b“
 *   related_url  ← WP post link
 *   kanalas      ← config/settings.json → kalbos[lang].kanalas
 *
 * ⛔ Žmogaus sprendimai faile IŠLIEKA. Perrašomas tik aprašymas; title, tags, privacy,
 * publish_at, playlist keičiami tik su --force arba kai jų dar nėra.
 *
 * Usage: node make-yt-meta.js --lesson <slug> [--lang lt] [--force] [--no-wp]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const args = process.argv.slice(2);
const getArg = (n, d) => (args.indexOf(n) !== -1 ? args[args.indexOf(n) + 1] : d);
const hasFlag = n => args.includes(n);

const lessonSlug = getArg('--lesson');
const lang = getArg('--lang', 'lt');
const force = hasFlag('--force');
const noWp = hasFlag('--no-wp');

if (!lessonSlug) {
  console.error('Usage: node make-yt-meta.js --lesson <slug> [--lang lt] [--force] [--no-wp]');
  process.exit(1);
}

const ROOT = __dirname;
const settings = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'settings.json'), 'utf-8'));
const videoDir = path.join(ROOT, 'lessons', lessonSlug, 'video');
const metaPath = path.join(videoDir, `youtube-${lang}.json`);
const aprasymasPath = path.join(videoDir, `youtube-${lang}.txt`);
const scenarioPath = path.join(videoDir, `scenarijus-${lang}.md`);
const videoPath = path.join(videoDir, `${lessonSlug}-${lang}.mp4`);
const balsasDir = path.join(videoDir, `balsas-${lang}`);

if (!fs.existsSync(videoDir)) {
  console.error(`Nėra katalogo: ${videoDir}`);
  process.exit(1);
}
if (!settings.kalbos[lang]) {
  console.error(`Kalba „${lang}“ nežinoma. Pridėk ją į config/settings.json → kalbos.`);
  process.exit(1);
}

// ---- .env ----
function envas() {
  const p = path.join(ROOT, '.env');
  const e = {};
  if (!fs.existsSync(p)) return e;
  for (const line of fs.readFileSync(p, 'utf-8').split('\n')) {
    const i = line.indexOf('=');
    if (i > 0) e[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return e;
}

function httpJson(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, res => {
      let body = '';
      res.on('data', c => (body += c));
      res.on('end', () => {
        if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}`));
        try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function decode(s) {
  return String(s || '')
    .replace(/&#8222;/g, '„').replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .trim();
}

// ---- scenarijaus antraštė: „**Tagai:** a, b, c“ ----
function tagaiIsScenarijaus() {
  if (!fs.existsSync(scenarioPath)) return [];
  const m = fs.readFileSync(scenarioPath, 'utf-8').match(/^\*\*Tagai:\*\*\s*(.+)$/m);
  if (!m) return [];
  return m[1].split(',').map(s => s.trim()).filter(Boolean);
}

function pavadinimasIsScenarijaus() {
  if (!fs.existsSync(scenarioPath)) return '';
  const m = fs.readFileSync(scenarioPath, 'utf-8').match(/^#\s*Video scenarijus:\s*(.+)$/m);
  return m ? m[1].trim() : '';
}

// ---- kurios kalbos keliauja kaip localizations ----
// Ta pati rinka = tas pats kanalas. Kalba su SAVO kanalu yra atskiras įkėlimas
// (YOUTUBE_STRATEGY.md §145), todėl į šio filmuko localizations ji nepatenka.
function lokalizuojamosKalbos(kanalas) {
  const rasta = [lang];
  for (const [kodas, k] of Object.entries(settings.kalbos)) {
    if (kodas === lang) continue;
    const savas = k.kanalas;
    if (savas && savas !== kanalas) continue;
    if (fs.existsSync(path.join(videoDir, `youtube-${kodas}.txt`))) rasta.push(kodas);
  }
  return rasta;
}

(async () => {
  const kanalas = settings.kalbos[lang].kanalas;
  if (!kanalas) {
    console.error(`⛔ Kalbai „${lang}“ config/settings.json nenurodo kanalo. `
      + `Pridėk kanalą į config/channels.json ir nurodyk jį prie kalbos.`);
    process.exit(1);
  }

  // --- aprašymas ---
  if (!fs.existsSync(aprasymasPath)) {
    console.error(`⛔ Nėra ${path.basename(aprasymasPath)}. Paleisk pirma:\n`
      + `   node generate-youtube-description.js --lesson ${lessonSlug} --lang ${lang}`);
    process.exit(1);
  }
  const aprasymas = fs.readFileSync(aprasymasPath, 'utf-8').trimEnd();

  // --- WP: pavadinimas ir nuoroda ---
  let wpTitle = '';
  let relatedUrl = null;
  if (!noWp) {
    const env = envas();
    if (env.WP_URL && env.WP_USER && env.WP_APP_PASSWORD) {
      try {
        const auth = Buffer.from(`${env.WP_USER}:${env.WP_APP_PASSWORD}`).toString('base64');
        const headers = { Authorization: `Basic ${auth}` };
        const rasta = await httpJson(
          `${env.WP_URL}/wp-json/wp/v2/kursai?slug=${encodeURIComponent(lessonSlug)}&status=any`,
          headers);
        if (rasta.length) {
          wpTitle = decode(rasta[0].title?.rendered || '');
          relatedUrl = rasta[0].link || null;
        } else {
          console.warn(`  ⚠ WP nerado pamokos „${lessonSlug}“ — pavadinimas iš scenarijaus`);
        }
      } catch (e) {
        console.warn(`  ⚠ WP neatsakė (${e.message}) — pavadinimas iš scenarijaus`);
      }
    }
  }

  const senas = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
    : null;
  const senaLok = (senas && senas.localizations && senas.localizations[lang]) || {};

  const laikyti = (senaReiksme, nauja) =>
    (senas && senaReiksme !== undefined && senaReiksme !== null && !force) ? senaReiksme : nauja;

  const title = laikyti(senaLok.title, wpTitle || pavadinimasIsScenarijaus() || lessonSlug);
  const tagai = laikyti(
    senaLok.tags,
    [...new Set([...(settings.tagai[lang] || []), ...tagaiIsScenarijaus()])]
  );

  const kalbos = lokalizuojamosKalbos(kanalas);
  const localizations = {};
  for (const kodas of kalbos) {
    const txt = path.join(videoDir, `youtube-${kodas}.txt`);
    const senaK = (senas && senas.localizations && senas.localizations[kodas]) || {};
    localizations[kodas] = {
      title: kodas === lang ? title : (senaK.title || ''),
      description: kodas === lang
        ? aprasymas
        : (fs.existsSync(txt) ? fs.readFileSync(txt, 'utf-8').trimEnd() : (senaK.description || '')),
      tags: kodas === lang ? tagai : (senaK.tags || []),
    };
  }

  const turiBalsa = fs.existsSync(path.join(balsasDir, 'manifest.json'));

  const meta = {
    slug: lessonSlug,
    source_language: lang,
    audio_language: laikyti(senas && senas.audio_language, turiBalsa ? lang : null),
    channel: laikyti(senas && senas.channel, kanalas),
    category_id: laikyti(senas && senas.category_id, settings.numatyta.category_id),
    made_for_kids: laikyti(senas && senas.made_for_kids, settings.numatyta.made_for_kids),
    privacy: laikyti(senas && senas.privacy, settings.numatyta.privacy),
    publish_at: senas ? (senas.publish_at ?? null) : null,
    playlist: laikyti(senas && senas.playlist, undefined),
    related_url: laikyti(senas && senas.related_url, relatedUrl),
    variant_of: senas ? (senas.variant_of ?? null) : null,
    video: `${lessonSlug}-${lang}.mp4`,
    localizations,
  };
  if (meta.playlist === undefined) delete meta.playlist;   // imamas kanalo numatytasis

  fs.mkdirSync(videoDir, { recursive: true });
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf-8');

  console.log(`meta → ${path.relative(ROOT, metaPath)}`);
  console.log(`  pavadinimas: „${title}“ (${title.length}/100)`);
  console.log(`  aprašymas: ${aprasymas.length}/5000 simb.`);
  console.log(`  tagai: ${tagai.length} (${tagai.join(', ').length}/500 simb.)`);
  console.log(`  kanalas: ${meta.channel} · privatumas: ${meta.privacy}`);
  console.log(`  lokalizacijos: ${Object.keys(localizations).join(', ')}`);
  console.log(`  balsas: ${turiBalsa ? lang : 'nėra (audio_language nerašomas)'}`);
  if (!fs.existsSync(videoPath)) {
    console.warn(`  ⚠ dar nėra ${path.basename(videoPath)} — sumontuok prieš įkeliant`);
  }
  if (senas && !force) {
    console.log('  (esami žmogaus sprendimai palikti; perrašyti — --force)');
  }
})().catch(e => { console.error(e.message); process.exit(1); });
