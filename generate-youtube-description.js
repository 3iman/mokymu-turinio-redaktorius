#!/usr/bin/env node
/**
 * generate-youtube-description.js
 *
 * Generuoja YouTube aprašymą su timestamps iš:
 * - scenarijus-{lang}.md (kadrų trukmės + antraštės)
 * - WP le_intro (aprašymas + susijusių pamokų nuorodos)
 *
 * Output: lessons/{slug}/video/youtube-{lang}.txt
 *
 * Pirmas chapter sujungia įvadą su pirmu skyrium (YouTube chapters reikalauja min. 10s pirmam).
 * Perėjimai tarp klipų laikomi 2.5s ilgio (kaip build-video.js).
 *
 * Usage: node generate-youtube-description.js --lesson <slug> [--lang lt]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ---- CLI ----
const args = process.argv.slice(2);
function getArg(name, def) {
  const idx = args.indexOf(name);
  return idx !== -1 ? args[idx + 1] : def;
}

const lessonSlug = getArg('--lesson');
const lang = getArg('--lang', 'lt');

if (!lessonSlug) {
  console.error('Usage: node generate-youtube-description.js --lesson <slug> [--lang lt]');
  process.exit(1);
}

// ---- Paths ----
const LESSONS_DIR = path.join(__dirname, 'lessons');
const lessonDir = path.join(LESSONS_DIR, lessonSlug);
const scenarioPath = path.join(lessonDir, 'video', `scenarijus-${lang}.md`);
const outputPath = path.join(lessonDir, 'video', `youtube-${lang}.txt`);
const envPath = path.join(__dirname, '.env');

// ---- Load .env ----
if (!fs.existsSync(envPath)) {
  console.error(`No .env at ${envPath}`);
  process.exit(1);
}
const env = {};
fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
  const idx = line.indexOf('=');
  if (idx > 0) {
    env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
});

// ---- Parse scenarijus-{lang}.md ----
if (!fs.existsSync(scenarioPath)) {
  console.error(`No scenario file at ${scenarioPath}`);
  process.exit(1);
}
const frames = [];
for (const line of fs.readFileSync(scenarioPath, 'utf-8').split('\n')) {
  const m = line.match(/^\|\s*(\d+)\s+(.+?)\s*\|\s*(\d+)\s*sek\.\s*\|\s*(.+?)\s*\|/);
  if (m) {
    frames.push({
      num: parseInt(m[1]),
      title: m[2].trim(),
      duration: parseInt(m[3]),
      file: m[4].trim(),
    });
  }
}
if (!frames.length) {
  console.error('No frames parsed from scenarijus file');
  process.exit(1);
}

// ---- Compute chapter timestamps ----
const TRANSITION = 3.2; // tarp klipų (pagal generate-video-clips.js TRANSITION_DURATION)

function formatTs(seconds) {
  const s = Math.floor(seconds);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${ss.toString().padStart(2, '0')}`;
}

const chapters = [];
let t = 0;
let hasIntro = false;
for (const f of frames) {
  if (f.num === 0) {
    // Intro — neatskiras chapter (YouTube reikalauja min 10s); sujungsim su pirmu skyrium
    hasIntro = true;
    t += f.duration;
  } else if (f.num === 1) {
    // Pirmas chapter = (Įvadas +) pirmas skyrius, pradžia 0:00
    const title = hasIntro ? `Įvadas. ${f.title}` : f.title;
    chapters.push({ t: 0, title });
    t += f.duration + TRANSITION;
  } else {
    chapters.push({ t, title: f.title });
    t += f.duration + TRANSITION;
  }
}

// ---- Fetch le_intro from WP ----
function httpJson(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
        } else {
          try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
        }
      });
    }).on('error', reject);
  });
}

// ---- Extract plain text + links from HTML ----
function extractLinks(html) {
  const links = [];
  const re = /<a\s+[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    links.push({ url: m[1], text: m[2].trim() });
  }
  return links;
}

function htmlToPlain(html) {
  return html
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8222;/g, '„')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/[ \t]+/g, ' ')
    .split('\n')
    .map(l => l.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ---- Main ----
(async () => {
  const auth = Buffer.from(`${env.WP_USER}:${env.WP_APP_PASSWORD}`).toString('base64');
  const headers = { Authorization: `Basic ${auth}` };

  // Surasti post ID pagal slug
  const searchData = await httpJson(
    `${env.WP_URL}/wp-json/wp/v2/kursai?slug=${encodeURIComponent(lessonSlug)}&status=any`,
    headers
  );
  if (!searchData.length) {
    console.error(`Lesson "${lessonSlug}" not found in WP`);
    process.exit(1);
  }
  const postId = searchData[0].id;

  // Gauti pilną post'ą su meta_box
  const post = await httpJson(
    `${env.WP_URL}/wp-json/wp/v2/kursai/${postId}?context=edit`,
    headers
  );
  const le_intro = post.meta_box?.le_intro || '';

  const links = extractLinks(le_intro);
  const plainIntro = htmlToPlain(le_intro);

  // Build output
  const out = [];
  if (plainIntro) {
    out.push(plainIntro);
    out.push('');
  }
  out.push('📋 SKYRIAI');
  out.push('');
  for (const ch of chapters) {
    out.push(`${formatTs(ch.t)} ${ch.title}`);
  }

  if (links.length) {
    out.push('');
    out.push('🔗 SUSIJUSIOS PAMOKOS');
    out.push('');
    for (const l of links) {
      out.push(`• ${l.text}`);
      out.push(`  ${l.url}`);
    }
  }

  out.push('');
  out.push('—');
  out.push('Cleverphant mokymai mokyklų svetainių administratoriams');
  out.push('https://mokymai.cleverphant.lt');

  fs.writeFileSync(outputPath, out.join('\n') + '\n', 'utf-8');
  console.log(`YouTube description → ${outputPath}`);
  console.log(`  Chapters: ${chapters.length}`);
  console.log(`  Related lessons: ${links.length}`);
  console.log(`  Intro: ${plainIntro ? 'yes' : 'no'}`);
})().catch(err => {
  console.error(err.message);
  process.exit(1);
});
