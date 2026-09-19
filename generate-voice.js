#!/usr/bin/env node

/**
 * Balso įgarsinimas iš scenarijaus stulpelio „Balsas“ (ElevenLabs).
 *
 * Usage:
 *   node generate-voice.js --lesson {slug} --lang lt                 # viena versija; seed įrašomas scenarijuje
 *   node generate-voice.js --lesson {slug} --lang lt --kandidatai 3  # tik jei Eimantas pats paprašo palyginti
 *   node generate-voice.js --lesson {slug} --lang lt --pasirinkti 12345  # perkelia kandidatą į konvejerį
 *   node generate-voice.js --lesson {slug} --lang lt --force         # ignoruoti kešą
 *
 * Rezultatas: lessons/{slug}/video/balsas-{lang}/kNN.wav + manifest.json.
 * `build-video.js` juos randa pats ir įmaišo ties kiekvieno kadro pradžia.
 *
 * ⛔ Modelis `eleven_v3_dpo_20260217` — Eimantas 2026-09-15 jį išrinko kaip artimiausią
 *    Dariaus balsui (prieš `eleven_v3`). Pavadinime data: tai gali būti bandomoji versija,
 *    kurią ElevenLabs pervadins ar išims. Tada API grąžins klaidą ir skriptas SUSTOS —
 *    į kitą modelį tyliai negrįžtama, nes balsas skambėtų kitaip.
 * ⛔ Balso versijų Eimantas NERENKA (2026-09-15): modelis, balsas ir nustatymai nuspręsti.
 *    Įprastas paleidimas generuoja vieną versiją ir įrašo jos seed scenarijaus antraštėje,
 *    kad pergeneravimas būtų pakartojamas. `--kandidatai` lieka tik tam atvejui, kai
 *    Eimantas pats paprašo palyginti. ElevenLabs determinizmo negarantuoja.
 * ⛔ Visi kadrų sakiniai generuojami VIENA užklausa. v3 modeliai nepriima
 *    `previous_text` / `next_text`, tad atskiri užklausimai duoda intonacijos šuolius.
 * ⛔ ElevenLabs failas baigiasi tiksliai ties paskutine raide, kol balsas dar skamba.
 *    Po paskutinio sakinio pridedamas ATMETAMAS sakinys, kuris iškerpamas.
 * ⛔ Kirtis rašomas tekste kirčio ženklu („ràštinę“). Tarimo žodyno v3 greičiausiai
 *    neskaito (2026-09-15 bandymas).
 * ⛔ Balso trukmė lemia kadro trukmę, ne atvirkščiai: netelpa — kodas 2, kadras ilginamas.
 * ⛔ Laiko žymos („kur spausti“ filmukai, 2026-09-17): jei kadro bloke yra lentelė
 *    „Laiko žymos“ su eilutėmis `balsas`, kadras įgarsinamas tais sakiniais, o ne pagrindinės
 *    lentelės tekstu. Failai `kNN-M.wav`; sakinio langas — iki kitos žymos arba kadro pabaigos.
 *    Žr. scenarijaus-zymos.js.
 *
 * ⛔ Kirčių žodynas (2026-09-17): `tarimo-zodynas/{lang}.json`. Žodis scenarijuje rašomas
 *    įprastai, o į ElevenLabs siunčiamas jo tarimas iš žodyno (v3 — IPA tarp pasvirųjų
 *    brūkšnių). Kirčio ženklų tekste v3 nepaiso („Perrikiúoti“ nepakeitė nieko).
 * Raktas: `illustrations/.env` → `ELEVENLABS_API_KEY`.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { parseCues } = require('./scenarijaus-zymos');

const VOICE_ID = 'eqJHjeWMPGJFD6VBf1J2';   // „Darius Cleverphant“, greitasis klonas
const MODEL = 'eleven_v3_dpo_20260217';
const SPEED = 0.9;
const START_IN_FRAME = 0.6;   // balsas prasideda, kai kadro antraštė jau pasirodžiusi
const TAIL_MARGIN = 0.5;      // iki kadro pabaigos turi likti bent tiek
const MAX_TAIL = 0.45;        // natūrali uodega po paskutinės raidės
const SEP = '\n\n';
const ATMETAMAS = { lt: 'Tiek šiam kartui.', en: 'That is all for now.', de: 'Das war es für heute.', pl: 'To wszystko na dziś.' };

const args = process.argv.slice(2);
const getArg = n => { const i = args.indexOf(`--${n}`); return i !== -1 ? args[i + 1] : null; };
const lessonSlug = getArg('lesson');
const lang = getArg('lang') || 'lt';
const force = args.includes('--force');
const kandidatai = parseInt(getArg('kandidatai') || '0', 10);
const pasirinkti = getArg('pasirinkti');
if (!lessonSlug) {
  console.error('Usage: node generate-voice.js --lesson <slug> --lang <lang> [--kandidatai N | --pasirinkti SEED | --force]');
  process.exit(1);
}

const lessonDir = path.join(__dirname, 'lessons', lessonSlug);
const videoDir = path.join(lessonDir, 'video');
const scenarioPath = path.join(videoDir, `scenarijus-${lang}.md`);
const outDir = path.join(videoDir, `balsas-${lang}`);
const candDir = path.join(videoDir, `balsas-${lang}-kandidatai`);

function envValue(name) {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return '';
  const line = fs.readFileSync(envPath, 'utf-8').split('\n').find(l => l.startsWith(name + '='));
  return line ? line.slice(name.length + 1).trim().replace(/^["']|["']$/g, '') : '';
}

function probe(file) {
  return parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf-8' }).trim());
}

// ---- Scenarijus: lentelė su stulpeliu „Balsas“ ir antraštės eilutė „**Balso seed:** N“ ----
function readScenario() {
  if (!fs.existsSync(scenarioPath)) {
    console.error(`Nėra scenarijaus: ${scenarioPath}`);
    process.exit(1);
  }
  const content = fs.readFileSync(scenarioPath, 'utf-8');
  const rows = [];
  let hasVoiceColumn = false;
  for (const line of content.split('\n')) {
    if (/^\|\s*Kadras\s*\|/.test(line) && /\|\s*Balsas\s*\|/.test(line)) hasVoiceColumn = true;
    const m = line.match(/^\|\s*(\d+)\s+(.+?)\s*\|\s*(\d+)\s*sek\.\s*\|\s*(.+?)\s*\|\s*(.*?)\s*\|\s*$/);
    if (!m) continue;
    const text = m[5].trim();
    rows.push({ kadras: parseInt(m[1]), title: m[2].trim(), duration: parseInt(m[3]), file: m[4].trim(),
                text: (!text || text === '—' || text === '-') ? '' : text });
  }
  if (!hasVoiceColumn) {
    console.error('⛔ Scenarijaus lentelėje nėra stulpelio „Balsas“. Žr. VIDEO_GAMYBA.md §2.');
    process.exit(1);
  }
  // Laiko žymos: kadras įgarsinamas žymų sakiniais; kitaip — pagrindinės lentelės tekstu
  const cues = parseCues(content);
  const voiceRows = [];
  for (const r of rows) {
    const vc = (cues[r.kadras] || []).filter(c => c.kind === 'balsas');
    if (vc.length) {
      vc.forEach((c, i) => {
        const iki = i + 1 < vc.length ? vc[i + 1].at - 0.15 : r.duration - TAIL_MARGIN;
        voiceRows.push({ ...r, cue: i + 1, at: c.at, text: c.value, window: iki - c.at });
      });
    } else if (r.text) {
      voiceRows.push({ ...r, window: r.duration - START_IN_FRAME - TAIL_MARGIN });
    }
  }
  // Kirčių žodynas: žodis pakeičiamas jo tarimu prieš siunčiant
  let zodynas = {};
  try { zodynas = JSON.parse(fs.readFileSync(path.join(__dirname, 'tarimo-zodynas', `${lang}.json`), 'utf-8')).zodziai || {}; } catch (_) {}
  const zodziai = Object.keys(zodynas).sort((a, b) => b.length - a.length);
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const r of voiceRows) {
    r.tekstas_scenarijuje = r.text;
    for (const w of zodziai) {
      r.text = r.text.replace(new RegExp(`(?<![\\p{L}])${escRe(w)}(?![\\p{L}])`, 'gu'), zodynas[w]);
    }
  }
  rows.length = 0;
  rows.push(...voiceRows);
  if (!rows.length) {
    console.error('⛔ Stulpelis „Balsas“ tuščias ir laiko žymų su balsu nėra — nėra ką įgarsinti.');
    process.exit(1);
  }
  const s = content.match(/^\*\*Balso seed:\*\*\s*(\d+)/m);
  return { content, rows, seed: s ? parseInt(s[1], 10) : null };
}

function hashOf(rows, seed, dictId) {
  return crypto.createHash('sha256')
    .update(JSON.stringify({ texts: rows.map(r => r.text), VOICE_ID, MODEL, SPEED, lang, dictId, seed }))
    .digest('hex');
}

// ---- Vienas generavimas: visa pastraipa → sakiniai pagal laiko žymas ----
async function generate(rows, seed, dir, key, dictId) {
  const tail = ATMETAMAS[lang] || ATMETAMAS.en;
  const text = rows.map(r => r.text).join(SEP) + SEP + tail;
  const body = { text, model_id: MODEL, language_code: lang, voice_settings: { speed: SPEED } };
  if (seed !== null && seed !== undefined) body.seed = seed;
  if (dictId) body.pronunciation_dictionary_locators = [{ pronunciation_dictionary_id: dictId }];
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(`⛔ ElevenLabs ${res.status} (modelis ${MODEL}): ${(await res.text()).slice(0, 400)}`);
    process.exit(1);
  }
  const data = await res.json();
  const al = data.alignment;
  if (!al || al.characters.join('') !== text) {
    console.error('⛔ Laiko žymos nesutampa su tekstu — sakinių ribų nustatyti negalima.');
    process.exit(1);
  }

  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const full = path.join(dir, '_visa-pastraipa.mp3');
  fs.writeFileSync(full, Buffer.from(data.audio_base64, 'base64'));

  const S = al.character_start_times_seconds;
  const E = al.character_end_times_seconds;
  const spans = [];
  let pos = 0;
  for (const r of rows) {
    const a = pos, b = pos + r.text.length - 1;
    spans.push([S[a], E[b]]);
    pos = b + 1 + SEP.length;
  }
  const tailStart = S[pos];

  const items = [];
  let overflow = false;
  rows.forEach((r, i) => {
    const [s, e] = spans[i];
    const next = i + 1 < spans.length ? spans[i + 1][0] : tailStart;
    const cutS = Math.max(0, s - 0.06);
    const cutE = Math.min(next - 0.05, e + MAX_TAIL);
    const len = cutE - cutS;
    const file = `k${String(r.kadras).padStart(2, '0')}${r.cue ? `-${r.cue}` : ''}.wav`;
    execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', cutS.toFixed(3), '-t', len.toFixed(3), '-i', full,
      '-af', `afade=t=out:st=${Math.max(0, len - 0.08).toFixed(3)}:d=0.08`, path.join(dir, file)]);
    const d = probe(path.join(dir, file));
    const window = r.window;
    const fits = d <= window;
    if (!fits) overflow = true;
    const reikia = Math.ceil(r.duration + (d - window));
    const zyme = r.cue ? `K${r.kadras}.${r.cue} @${r.at}s` : `K${r.kadras}`;
    items.push({ kadras: r.kadras, cue: r.cue || null, title: r.title, text: r.text, file, duration: +d.toFixed(3), fits, reikia_sek: fits ? r.duration : reikia });
    console.log(`  ${zyme} | balsas ${d.toFixed(2)}s | langas ${window.toFixed(1)}s | ${fits ? 'telpa' : `⛔ VIRŠIJA ${(d - window).toFixed(2)}s → ${r.cue ? 'atitolink kitą žymą arba pailgink kadrą' : `kadrui reikia ${reikia} sek.`}`}`);
  });
  fs.unlinkSync(full);
  return { items, overflow, characters: text.length };
}

function writeManifest(dir, rows, seed, dictId, gen) {
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({
    hash: hashOf(rows, seed, dictId), voice_id: VOICE_ID, model: MODEL, speed: SPEED, lang, seed,
    characters: gen.characters, start_in_frame: START_IN_FRAME,
    created: new Date().toISOString(), items: gen.items,
  }, null, 2));
}

// Klausymui: visi sakiniai iš eilės su 1 s pauzėmis
function previewTrack(dir, items) {
  const ins = [], fl = [];
  items.forEach((it, i) => {
    ins.push('-i', path.join(dir, it.file));
    fl.push(`[${i}:a]aresample=44100,aformat=channel_layouts=mono,apad=pad_dur=1[a${i}]`);
  });
  fl.push(items.map((_, i) => `[a${i}]`).join('') + `concat=n=${items.length}:v=0:a=1[o]`);
  execFileSync('ffmpeg', ['-y', '-v', 'error', ...ins, '-filter_complex', fl.join(';'), '-map', '[o]', '-c:a', 'aac', path.join(dir, 'perziura.m4a')]);
}

function setScenarioSeed(content, seed) {
  const line = `**Balso seed:** ${seed} — įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo`;
  if (/^\*\*Balso seed:\*\*.*$/m.test(content)) return content.replace(/^\*\*Balso seed:\*\*.*$/m, line);
  if (/^\*\*Balsas:\*\*.*$/m.test(content)) return content.replace(/^(\*\*Balsas:\*\*.*)$/m, `$1\n${line}`);
  return content.replace(/^(# .*\n)/, `$1\n${line}\n`);
}

async function main() {
  const { content, rows, seed: scenarioSeed } = readScenario();
  const key = envValue('ELEVENLABS_API_KEY');
  const dictId = envValue('ELEVENLABS_PRON_DICT_ID');

  // --pasirinkti: perkelti kandidatą be naujo generavimo
  if (pasirinkti) {
    const seed = parseInt(pasirinkti, 10);
    const src = path.join(candDir, `seed-${seed}`);
    const m = path.join(src, 'manifest.json');
    if (!fs.existsSync(m)) {
      console.error(`⛔ Nėra kandidato ${src}. Pirma: --kandidatai N`);
      process.exit(1);
    }
    const man = JSON.parse(fs.readFileSync(m, 'utf-8'));
    if (man.hash !== hashOf(rows, seed, dictId)) {
      console.error('⛔ Kandidatas sugeneruotas su kitu tekstu ar nustatymais nei dabartinis scenarijus. Generuok kandidatus iš naujo.');
      process.exit(1);
    }
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.cpSync(src, outDir, { recursive: true });
    fs.rmSync(path.join(outDir, 'perziura.m4a'), { force: true });
    fs.writeFileSync(scenarioPath, setScenarioSeed(content, seed), 'utf-8');
    console.log(`  ✅ Pasirinktas seed ${seed} → ${outDir}; seed įrašytas scenarijuje.`);
    const netelpa = man.items.filter(it => !it.fits);
    if (netelpa.length) {
      console.error(`\n⛔ Netelpa: ${netelpa.map(it => `K${it.kadras} → ${it.reikia_sek} sek.`).join(', ')}. Pailgink kadrus scenarijuje.`);
      process.exit(2);
    }
    return;
  }

  if (!key) {
    console.error('⛔ Nėra ELEVENLABS_API_KEY faile illustrations/.env');
    process.exit(1);
  }

  // --kandidatai N: kelios versijos klausymui
  if (kandidatai > 0) {
    fs.mkdirSync(candDir, { recursive: true });
    console.log(`\nKandidatai: ${lessonSlug} [${lang}] · ${kandidatai} versijos · ${MODEL} · greitis ${SPEED}`);
    for (let i = 0; i < kandidatai; i++) {
      const seed = crypto.randomInt(1, 4294967295);
      const dir = path.join(candDir, `seed-${seed}`);
      console.log(`\n  ── seed ${seed}`);
      const gen = await generate(rows, seed, dir, key, dictId);
      writeManifest(dir, rows, seed, dictId, gen);
      previewTrack(dir, gen.items);
      console.log(`  klausymui: ${path.join(dir, 'perziura.m4a')}`);
    }
    console.log(`\nIšsirinkus: node generate-voice.js --lesson ${lessonSlug} --lang ${lang} --pasirinkti SEED`);
    return;
  }

  // Įprastas paleidimas: scenarijaus seed + kešas
  // Seed: iš scenarijaus arba naujas atsitiktinis, kuris po generavimo įrašomas į scenarijų
  const seed = scenarioSeed !== null ? scenarioSeed : crypto.randomInt(1, 4294967295);
  const hash = hashOf(rows, seed, dictId);
  const manifestPath = path.join(outDir, 'manifest.json');
  if (!force && fs.existsSync(manifestPath)) {
    const old = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    const allFiles = (old.items || []).every(it => fs.existsSync(path.join(outDir, it.file)));
    if (old.hash === hash && allFiles) {
      console.log(`  Balsas nepasikeitė — naudojamas esamas (${old.items.length} kadrai, seed ${old.seed ?? '—'}). --force pergeneruotų.`);
      return;
    }
  }
  console.log(`\nĮgarsinimas: ${lessonSlug} [${lang}] · ${rows.length} kadrai · ${MODEL} · greitis ${SPEED} · seed ${seed ?? '—'}`);
  const gen = await generate(rows, seed, outDir, key, dictId);
  writeManifest(outDir, rows, seed, dictId, gen);
  if (scenarioSeed === null) {
    fs.writeFileSync(scenarioPath, setScenarioSeed(content, seed), 'utf-8');
    console.log(`  Seed ${seed} įrašytas scenarijuje.`);
  }
  console.log(`  Balsas: ${outDir}`);
  if (gen.overflow) {
    console.error('\n⛔ Bent vienas balsas netelpa į kadrą. Pailgink kadro trukmę scenarijuje — balsas nespraudžiamas (VIDEO_GAMYBA.md §2).');
    process.exit(2);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
