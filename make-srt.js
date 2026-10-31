#!/usr/bin/env node
/**
 * make-srt.js
 *
 * Subtitrai iš laiko juostos: lessons/{slug}/video/timeline-{lang}.json
 * → lessons/{slug}/video/subtitles/{lang}.srt
 *
 * ⛔ Laikas imamas TIK iš timeline failo, kurį rašo build-video.js po montažo.
 * Ten kadrų pradžios IŠMATUOTOS iš sumontuotų klipų, todėl TRANSITION konstantos
 * čia kartoti nereikia — o trečia jos kopija tyliai meluotų (VIDEO_GAMYBA.md §8).
 *
 * Usage: node make-srt.js --lesson <slug> [--lang lt] [--eilutes 42]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const getArg = (n, d) => (args.indexOf(n) !== -1 ? args[args.indexOf(n) + 1] : d);

const lessonSlug = getArg('--lesson');
const lang = getArg('--lang', 'lt');
const maxEilute = parseInt(getArg('--eilutes', '42'), 10);

if (!lessonSlug) {
  console.error('Usage: node make-srt.js --lesson <slug> [--lang lt]');
  process.exit(1);
}

const videoDir = path.join(__dirname, 'lessons', lessonSlug, 'video');
const timelinePath = path.join(videoDir, `timeline-${lang}.json`);
const outDir = path.join(videoDir, 'subtitles');
const outPath = path.join(outDir, `${lang}.srt`);

if (!fs.existsSync(timelinePath)) {
  console.error(`⛔ Nėra ${path.relative(__dirname, timelinePath)}.\n`
    + `   Laiko juosta gimsta montuojant: node build-video.js --lesson ${lessonSlug} --lang ${lang}`);
  process.exit(1);
}

const juosta = JSON.parse(fs.readFileSync(timelinePath, 'utf-8'));

// ⛔ Juosta ir filmukas privalo būti iš TOS PAČIOS laidos (2026-09-20).
// Failo data to neįrodo: juosta rašoma prieš paskutinį garso suliejimą, tad ji
// visada kelias sekundes senesnė. Įrodymas yra trukmė — permontavus kadrus ji
// pasikeičia, ir senos juostos subtitrai nuslenka tyliai, niekam nepranešę.
{
  const { execSync } = require('child_process');
  const videoPath = path.join(videoDir, `${lessonSlug}-${lang}.mp4`);
  if (fs.existsSync(videoPath)) {
    let tikra = null;
    try {
      tikra = parseFloat(execSync(
        `ffprobe -v error -show_entries format=duration -of csv=p=0 "${videoPath}"`,
        { encoding: 'utf-8' }
      ).trim());
    } catch (_) {}
    if (tikra && Math.abs(tikra - juosta.trukme) > 0.6) {
      console.error(`⛔ Laiko juosta ne iš šio filmuko.`);
      console.error(`   juosta: ${juosta.trukme} s · ${path.basename(videoPath)}: ${tikra.toFixed(2)} s`);
      console.error(`   Subtitrai nuslinktų. Permontuok — juosta ir filmukas gimsta kartu:`);
      console.error(`     node build-video.js --lesson ${lessonSlug} --lang ${lang}`);
      process.exit(3);
    }
  }
}
const ruozai = (juosta.balsas || []).filter(b => (b.tekstas || '').trim());

if (!ruozai.length) {
  console.error(`⛔ Laiko juostoje nėra balso ruožų — filmukas be balso, subtitrų nėra iš ko daryti.`);
  process.exit(2);
}

function laikas(sek) {
  const ms = Math.max(0, Math.round(sek * 1000));
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const t = ms % 1000;
  const p = (n, k = 2) => String(n).padStart(k, '0');
  return `${p(h)}:${p(m)}:${p(s)},${p(t, 3)}`;
}

// Ilgas sakinys — dvi eilutės, lūžis ties tarpu, o ne ties bet kuo
function laužyti(tekstas) {
  const t = tekstas.trim().replace(/\s+/g, ' ');
  if (t.length <= maxEilute) return t;
  const zodziai = t.split(' ');
  const eilutes = [];
  let dabar = '';
  for (const z of zodziai) {
    if (dabar && (dabar + ' ' + z).length > maxEilute) {
      eilutes.push(dabar);
      dabar = z;
    } else {
      dabar = dabar ? dabar + ' ' + z : z;
    }
  }
  if (dabar) eilutes.push(dabar);
  // SRT: daugiau nei 2 eilutės ekrane neskaitomos — jungiam likutį į antrą
  if (eilutes.length > 2) {
    return [eilutes[0], eilutes.slice(1).join(' ')].join('\n');
  }
  return eilutes.join('\n');
}

ruozai.sort((a, b) => a.pradzia - b.pradzia);

const blokai = [];
let sutrumpinta = 0;
ruozai.forEach((r, i) => {
  const pradzia = r.pradzia;
  let pabaiga = pradzia + (r.trukme || 2);
  const kitas = ruozai[i + 1];
  if (kitas && pabaiga > kitas.pradzia - 0.05) {
    pabaiga = kitas.pradzia - 0.05;
    sutrumpinta++;
  }
  if (juosta.trukme && pabaiga > juosta.trukme) pabaiga = juosta.trukme;
  if (pabaiga <= pradzia) return;
  blokai.push(`${blokai.length + 1}\n${laikas(pradzia)} --> ${laikas(pabaiga)}\n${laužyti(r.tekstas)}`);
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, blokai.join('\n\n') + '\n', 'utf-8');

const paskutinis = ruozai[ruozai.length - 1];
console.log(`subtitrai → ${path.relative(__dirname, outPath)}`);
console.log(`  ruožų: ${blokai.length}`);
console.log(`  paskutinis prasideda ${paskutinis.pradzia.toFixed(1)} s iš ${juosta.trukme} s`);
if (sutrumpinta) console.log(`  ${sutrumpinta} ruožai sutrumpinti, kad neužliptų ant kito`);
