#!/usr/bin/env node
/**
 * Mokymų platformos epizodai: po vieną klipą kiekvienam scenarijaus kadrui.
 *
 *   node build-platform-clips.js --lesson navigaciju-valdymas --lang lt
 *   node build-video.js --lesson navigaciju-valdymas --lang lt --platforma     (tas pats)
 *   … [--kadras 5,6] [--muzika] [--dark] [--dry-run]
 *
 * Kuo skiriasi nuo build-video.js (YouTube filmuko):
 *   - kiekvienas kadras — atskiras failas, be intro, outro ir skirtukų (Eimantas 2026-10-15:
 *     „platformai be intro ir outro“);
 *   - be foninės muzikos (platformos filmas yra pamokos esmės sluoksnis; --muzika — jei prireiks);
 *   - subtitrai .vtt iš SCENARIJAUS teksto (ne iš balso manifesto: ten santrumpos ir kirčiai
 *     pakeisti IPA, pvz. /ˈpɛr.rikʲuotʲi/), laikai — iš laiko žymų ir išmatuotos balso trukmės.
 *
 * Kas lieka taip pat kaip build-video.js: animuotas klipas iš output/{lang}/clips/{Failas}.mp4 +
 * stop kadras iš PNG iki scenarijaus trukmės; balsas ties laiko žymomis (balsas-{lang}/manifest.json,
 * generate-voice.js), suvienodintas iki −19 LUFS vienu stiprinimu visai pamokai; garsai iš
 * assets/video/sfx/ su garsumas.json.
 *
 * Rezultatas: lessons/{slug}/video/platforma-{lang}/
 *   {epizodo id}.mp4   — H.264 + AAC, faststart (vardas iš lessons/{slug}/epizodai.json, kurį paruošia
 *                        platformos scripts/epizodai-i-scenarijus.py; be jo — k{NN}-{Failas})
 *   {epizodo id}.vtt   — subtitrai (WCAG 1.2.2)
 *   {epizodo id}.jpg   — viršelis (paskutinis kadras: rezultatas)
 *   index.json         — kas sugeneruota: kadras, epizodas, trukmė, failai, balso ruožai
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { parseCues } = require('./scenarijaus-zymos');

const args = process.argv.slice(2);
const getArg = (n) => { const i = args.indexOf(`--${n}`); return i !== -1 ? args[i + 1] : null; };
const lessonSlug = getArg('lesson');
const lang = getArg('lang') || 'lt';
const isDark = args.includes('--dark');
const isDryRun = args.includes('--dry-run');
const withMusic = args.includes('--muzika');
const onlyKadrai = (getArg('kadras') || '').split(',').map(s => parseInt(s, 10)).filter(Boolean);

if (!lessonSlug) {
  console.error('Usage: node build-platform-clips.js --lesson <slug> --lang <lang> [--kadras 5,6] [--muzika] [--dark] [--dry-run]');
  process.exit(1);
}

const ROOT = __dirname;
const lessonDir = path.join(ROOT, 'lessons', lessonSlug);
const outputDir = path.join(lessonDir, 'output', lang);
const clipsDir = path.join(outputDir, 'clips');
const videoDir = path.join(lessonDir, 'video');
const scenarioPath = path.join(videoDir, `scenarijus-${lang}.md`);
const voiceDir = path.join(videoDir, `balsas-${lang}`);
const outDir = path.join(videoDir, `platforma-${lang}${isDark ? '-dark' : ''}`);
const sfxDir = path.join(ROOT, 'assets', 'video', 'sfx');
const musicPath = path.join(ROOT, 'assets', 'video', 'jiglr-malibu_cleverphant-mokymu-fonas.mp3');

const WIDTH = 1920, HEIGHT = 1080, FPS = 30;
const BG_COLOR = isDark ? '#151b2b' : '#f8f9fb';      // kaip build-video.js
const VOICE_TARGET_LUFS = -19;                           // VIDEO_GAMYBA.md §7 „Balsas“
const PLATFORM_MAX_S = 20;                               // platformos epizodo riba (tikslas ≤ 15 s; Eimantas 2026-10-31)

const sh = (cmd) => execSync(cmd, { stdio: 'pipe', encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 });
const q = (p) => `"${p.replace(/"/g, '\\"')}"`;
const probeDur = (f) => parseFloat(sh(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${q(f)}`).trim()) || 0;

// ---- Scenarijus: lentelė „| N Pavadinimas | NN sek. | Failas | Balsas |“ ----
function parseRows(content) {
  const rows = [];
  for (const line of content.split('\n')) {
    const m = line.match(/^\|\s*(\d+)\s+(.+?)\s*\|\s*(\d+)\s*sek\.\s*\|\s*(.+?)\s*\|(?:\s*(.*?)\s*\|)?\s*$/);
    if (!m) continue;
    const file = m[4].trim().replace(/\.(mp4|png)$/, '');
    if (file === 'intro' || file === 'autro' || /^(intro|outro)$/i.test(m[2].trim())) continue;
    rows.push({ kadras: parseInt(m[1], 10), title: m[2].trim(), duration: parseInt(m[3], 10), file,
                balsas: (m[5] || '').trim() === '—' ? '' : (m[5] || '').trim() });
  }
  return rows;
}

const vttTime = (s) => {
  const ms = Math.max(0, Math.round(s * 1000));
  const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60, r = ms % 1000;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(r).padStart(3, '0')}`;
};

function main() {
  if (!fs.existsSync(scenarioPath)) { console.error(`Nėra scenarijaus: ${scenarioPath}`); process.exit(1); }
  const content = fs.readFileSync(scenarioPath, 'utf-8');
  let rows = parseRows(content);
  if (onlyKadrai.length) rows = rows.filter(r => onlyKadrai.includes(r.kadras));
  if (!rows.length) { console.error('Scenarijuje nėra kadrų (be intro / outro).'); process.exit(1); }
  const cues = parseCues(content);

  // Epizodų id iš platformos (scripts/epizodai-i-scenarijus.py → epizodai.json)
  const epMap = {};
  const epPath = path.join(lessonDir, 'epizodai.json');
  if (fs.existsSync(epPath)) {
    for (const k of JSON.parse(fs.readFileSync(epPath, 'utf-8')).kadrai || []) epMap[k.kadras] = k.epizodas;
  }
  const clipName = (r) => epMap[r.kadras] || `k${String(r.kadras).padStart(2, '0')}-${r.file}`;

  // Balsas: manifestas + vienas stiprinimas visai pamokai (visi jos sakiniai, ne tik pasirinkti kadrai)
  const vm = fs.existsSync(path.join(voiceDir, 'manifest.json')) ? JSON.parse(fs.readFileSync(path.join(voiceDir, 'manifest.json'), 'utf-8')) : null;
  const startIn = (vm && vm.start_in_frame) || 0.6;
  let voiceGainDb = 0;
  if (vm && (vm.items || []).length && !isDryRun) {
    const files = vm.items.map(it => path.join(voiceDir, it.file)).filter(f => fs.existsSync(f));
    if (files.length) {
      const ins = files.map(f => `-i ${q(f)}`).join(' ');
      const cc = files.map((_, j) => `[${j}:a]aresample=44100,aformat=channel_layouts=mono[c${j}]`).join(';') + ';'
        + files.map((_, j) => `[c${j}]`).join('') + `concat=n=${files.length}:v=0:a=1,ebur128`;
      try {
        const o = sh(`ffmpeg -v info ${ins} -filter_complex "${cc}" -f null - 2>&1`);
        const all = [...o.matchAll(/I:\s+(-?[\d.]+) LUFS/g)];
        if (all.length) voiceGainDb = Math.max(-12, Math.min(15, VOICE_TARGET_LUFS - parseFloat(all[all.length - 1][1])));
      } catch (_) { /* paliekama 0 dB */ }
    }
  }
  let sfxGain = {};
  try { sfxGain = JSON.parse(fs.readFileSync(path.join(sfxDir, 'garsumas.json'), 'utf-8')); } catch (_) {}

  if (!isDryRun) fs.mkdirSync(outDir, { recursive: true });
  const tmp = path.join(outDir, '_tmp');
  if (!isDryRun) fs.mkdirSync(tmp, { recursive: true });
  const index = [];
  let problems = 0;

  console.log(`\n▶ Platformos klipai: ${lessonSlug} (${lang}) — ${rows.length} kadrai → ${path.relative(ROOT, outDir)}/`);
  if (vm) console.log(`  Balsas: ${vm.model || '?'} · ${voiceGainDb >= 0 ? '+' : ''}${voiceGainDb.toFixed(1)} dB iki ${VOICE_TARGET_LUFS} LUFS`);
  else console.log('  ⛔ Nėra balso (balsas-' + lang + '/manifest.json) — klipai be balso; pirma node generate-voice.js');

  for (const r of rows) {
    const name = clipName(r);
    const warn = [];
    if (r.duration > PLATFORM_MAX_S) warn.push(`${r.duration} s > ${PLATFORM_MAX_S} s (platformos riba)`);

    // ---- Vaizdas ----
    const png = path.join(outputDir, `${r.file}${isDark ? '-dark' : ''}.png`);
    const anim = path.join(clipsDir, `${r.file}${isDark ? '-dark' : ''}.mp4`);
    const hasAnim = fs.existsSync(anim), hasPng = fs.existsSync(png);
    if (!hasAnim && !hasPng) {
      console.log(`  ✗ K${r.kadras} ${name}: nėra nei ${path.relative(ROOT, anim)}, nei ${path.relative(ROOT, png)} — pirma generate.js / generate-video-clips.js`);
      problems++; continue;
    }

    // ---- Balsas ir garsai šiam kadrui ----
    const kc = cues[r.kadras] || [];
    const vc = kc.filter(c => c.kind === 'balsas');
    const voice = [];
    for (const it of (vm ? vm.items || [] : []).filter(i => i.kadras === r.kadras)) {
      const file = path.join(voiceDir, it.file);
      if (!fs.existsSync(file)) { warn.push(`nėra ${it.file}`); continue; }
      let at, text;
      if (it.cue) {
        const z = vc[it.cue - 1];
        if (!z) { warn.push(`balsas ${it.cue}: scenarijuje tokios žymos nebėra — pergeneruok balsą`); continue; }
        at = z.at; text = z.value;
        const iki = it.cue < vc.length ? vc[it.cue].at : r.duration;
        if (at + it.duration > iki + 0.05) warn.push(`balsas ${it.cue} (${it.duration}s nuo ${at}s) užlipa ant ${iki.toFixed(1)}s`);
      } else {
        at = startIn; text = r.balsas || it.text;
        if (at + it.duration > r.duration - 0.5) warn.push(`balsas (${it.duration}s) netelpa į ${r.duration}s`);
      }
      voice.push({ file, at, dur: it.duration, text });
    }
    const sfx = kc.filter(c => c.kind === 'garsas').map(c => ({ file: path.join(sfxDir, `${c.value}.wav`), at: c.at, gain: sfxGain[c.value] ?? 1, name: c.value }))
      .filter(s => fs.existsSync(s.file) || (warn.push(`nėra garso „${s.name}“`), false));

    if (isDryRun) {
      console.log(`  · K${r.kadras} ${name}: ${r.duration}s, ${hasAnim ? 'animuotas klipas' : 'PNG'}, balso ${voice.length}, garsų ${sfx.length}${warn.length ? ' ⛔ ' + warn.join('; ') : ''}`);
      continue;
    }

    // Vaizdo takelis: animuotas klipas + stop kadras iki scenarijaus trukmės (kaip build-video.js)
    const vf = `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease,pad=${WIDTH}:${HEIGHT}:(ow-iw)/2:(oh-ih)/2:color=${BG_COLOR},fps=${FPS},format=yuv420p`;
    const vid = path.join(tmp, `${name}-v.mp4`);
    if (hasAnim) {
      const a = probeDur(anim);
      if (a > r.duration + 0.05) warn.push(`animacija ${a.toFixed(1)}s ilgesnė už kadrą ${r.duration}s — nukerpama`);
      const hold = Math.max(0, r.duration - a);
      if (hold > 0.02 && hasPng) {
        sh(`ffmpeg -y -v error -i ${q(anim)} -loop 1 -t ${hold.toFixed(3)} -i ${q(png)} -filter_complex "[0:v]${vf}[a];[1:v]${vf}[b];[a][b]concat=n=2:v=1:a=0[v]" -map "[v]" -an -c:v libx264 -crf 18 -pix_fmt yuv420p ${q(vid)}`);
      } else {
        if (hold > 0.02) warn.push('nėra PNG stop kadrui — klipas trumpesnis už scenarijų');
        sh(`ffmpeg -y -v error -i ${q(anim)} -t ${r.duration} -vf "${vf}" -an -c:v libx264 -crf 18 -pix_fmt yuv420p ${q(vid)}`);
      }
    } else {
      sh(`ffmpeg -y -v error -loop 1 -t ${r.duration} -i ${q(png)} -vf "${vf}" -an -c:v libx264 -tune stillimage -crf 18 -pix_fmt yuv420p ${q(vid)}`);
    }
    const D = probeDur(vid);

    // Garso takelis: balsas (vienas stiprinimas), garsai, nebūtina muzika; ilgis = vaizdo ilgis.
    // ffmpeg įvestis #0 — vaizdas, todėl garso įvesties numeris = inputs.push() (be −1).
    const inputs = [], filters = [], mixes = [];
    voice.forEach((v) => {
      const n = inputs.push(`-i ${q(v.file)}`) , ms = Math.round(v.at * 1000);
      filters.push(`[${n}:a]aresample=44100,aformat=channel_layouts=stereo,volume=${voiceGainDb.toFixed(2)}dB,adelay=${ms}|${ms}[v${n}]`); mixes.push(`[v${n}]`);
    });
    sfx.forEach((s) => {
      const n = inputs.push(`-i ${q(s.file)}`) , ms = Math.round(s.at * 1000);
      filters.push(`[${n}:a]aresample=44100,aformat=channel_layouts=stereo,volume=${Number(s.gain).toFixed(2)},adelay=${ms}|${ms}[s${n}]`); mixes.push(`[s${n}]`);
    });
    if (withMusic && fs.existsSync(musicPath)) {
      const n = inputs.push(`-stream_loop -1 -i ${q(musicPath)}`);
      filters.push(`[${n}:a]aresample=44100,aformat=channel_layouts=stereo,volume=0.25,afade=t=out:st=${Math.max(0, D - 1).toFixed(2)}:d=1[m${n}]`); mixes.push(`[m${n}]`);
    }
    // tylus pagrindas, kad takelis būtų lygiai D ilgio ir klipas be balso turėtų garso takelį
    const silent = inputs.push(`-f lavfi -t ${D.toFixed(3)} -i anullsrc=r=44100:cl=stereo`);
    mixes.unshift(`[${silent}:a]`);
    filters.push(`${mixes.join('')}amix=inputs=${mixes.length}:normalize=0:duration=first,alimiter=limit=0.891:level=false[aout]`);
    const outMp4 = path.join(outDir, `${name}.mp4`);
    sh(`ffmpeg -y -v error -i ${q(vid)} ${inputs.join(' ')} -filter_complex "${filters.join(';')}" -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 128k -t ${D.toFixed(3)} -movflags +faststart ${q(outMp4)}`);

    // Subtitrai iš scenarijaus teksto
    const vtt = ['WEBVTT', ''];
    voice.slice().sort((a, b) => a.at - b.at).forEach((v, i) => {
      vtt.push(String(i + 1), `${vttTime(v.at)} --> ${vttTime(Math.min(D, v.at + v.dur))}`, v.text, '');
    });
    fs.writeFileSync(path.join(outDir, `${name}.vtt`), vtt.join('\n'));
    // Viršelis — paskutinis kadras (rezultatas)
    sh(`ffmpeg -y -v error -sseof -0.1 -i ${q(outMp4)} -frames:v 1 -q:v 3 ${q(path.join(outDir, `${name}.jpg`))}`);

    index.push({ kadras: r.kadras, epizodas: epMap[r.kadras] || null, failas: r.file, pavadinimas: r.title,
                 trukme_s: +D.toFixed(2), mp4: `${name}.mp4`, vtt: `${name}.vtt`, poster: `${name}.jpg`,
                 balsas: voice.map(v => ({ nuo_s: v.at, iki_s: +(v.at + v.dur).toFixed(2), tekstas: v.text })),
                 garsai: sfx.map(s => ({ ties_s: s.at, garsas: s.name })), ispejimai: warn });
    if (warn.length) problems++;
    console.log(`  ${warn.length ? '⛔' : '✓'} K${r.kadras} ${name}.mp4 · ${D.toFixed(1)}s · balso ${voice.length} · garsų ${sfx.length}${warn.length ? ' — ' + warn.join('; ') : ''}`);
  }

  if (!isDryRun) {
    fs.rmSync(tmp, { recursive: true, force: true });
    const idxPath = path.join(outDir, 'index.json');
    const prev = fs.existsSync(idxPath) ? JSON.parse(fs.readFileSync(idxPath, 'utf-8')).klipai || [] : [];
    const merged = [...prev.filter(p => !index.some(n => n.kadras === p.kadras)), ...index].sort((a, b) => a.kadras - b.kadras);
    fs.writeFileSync(idxPath, JSON.stringify({ pamoka: lessonSlug, lang, sugeneruota: new Date().toISOString(),
      balso_stiprinimas_db: +voiceGainDb.toFixed(2), muzika: withMusic, klipai: merged }, null, 2));
  }
  console.log(problems ? `\n⛔ Kadrų su įspėjimais: ${problems}` : '\n✓ Visi kadrai be įspėjimų');
}

main();
