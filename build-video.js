#!/usr/bin/env node

/**
 * Video Builder
 *
 * Generates a video from illustration PNGs + intro + outro.
 *
 * Usage:
 *   node build-video.js --lesson google-sheets-integracija --lang lt
 *   node build-video.js --lesson google-sheets-integracija --lang lt --dark
 *   node build-video.js --lesson google-sheets-integracija --lang lt --dry-run
 *
 * Prerequisites:
 *   - ffmpeg installed
 *   - Illustrations already generated (node generate.js --png)
 *   - Optional: autro.mp4 and background music in assets/video/
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LESSONS_DIR = path.join(__dirname, 'lessons');
const ASSETS_DIR = path.join(__dirname, 'assets');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const TOKENS_DIR = path.join(__dirname, 'tokens');
const VIDEO_ASSETS_DIR = path.join(ASSETS_DIR, 'video');

// ---- CLI args ----
const args = process.argv.slice(2);
function getArg(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : null;
}
const lessonSlug = getArg('lesson');
const lang = getArg('lang') || 'lt';
const isDark = args.includes('--dark');
const isDryRun = args.includes('--dry-run');
const isAllLangs = args.includes('--all-langs');

if (!lessonSlug) {
  console.error('Usage: node build-video.js --lesson <lesson-slug> --lang <lang> [--all-langs]');
  process.exit(1);
}

// ---- Paths ----
const lessonDir = path.join(LESSONS_DIR, lessonSlug);
const outputDir = path.join(lessonDir, 'output', lang);
const videoDir = path.join(lessonDir, 'video');
const scenarioPath = path.join(videoDir, `scenarijus-${lang}.md`);
const suffix = isDark ? '-dark' : '';

// ---- Video settings ----
const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 1; // for static frames, 1 fps is enough (duration controlled per frame)
const BG_COLOR = isDark ? '#151b2b' : '#f8f9fb';
const VOICE_TARGET_LUFS = -19; // balso garsumas montaže (VIDEO_GAMYBA.md §7 „Balsas“)
// Vinjetės pradžia iš templates/video-outro.html; kalboms be teksto lieka visas senas autro.mp4
const OUTRO_THANKS = { lt: 'Ačiū, kad skyrėte laiko' };
const OUTRO_HEAD_SECONDS = 4.0; // autro.mp4: 4,0–4,24 s tuščias #dfecf3, logotipas atsiranda 4,24 s

// ---- Parse scenario order (file → kadras mapping) ----
function parseScenarioOrder() {
  if (!fs.existsSync(scenarioPath)) return null;

  const content = fs.readFileSync(scenarioPath, 'utf-8');
  const order = [];
  for (const line of content.split('\n')) {
    const m = line.match(/^\|\s*(\d+)\s+(.+?)\s*\|\s*(\d+)\s*sek\.\s*\|\s*(.+?)\s*\|/);
    if (m) {
      const kadrasNum = parseInt(m[1]);
      const title = m[2].trim();
      const fileName = m[4].trim().replace(/\.(mp4|png)$/, '');
      order.push({ kadrasNum, title, fileName });
    }
  }
  return order.length > 0 ? order : null;
}

// ---- Discover frames ----
function discoverFrames() {
  // Read PNG files in order (00-, 01-, 02-, ...)
  const files = fs.readdirSync(outputDir)
    .filter(f => {
      if (!f.endsWith('.png')) return false;
      if (isDark) return f.endsWith('-dark.png');
      return !f.endsWith('-dark.png');
    })
    .sort();

  if (files.length === 0) {
    console.error(`No ${suffix || 'light'} PNGs found in ${outputDir}`);
    console.error('Run: node generate.js --png' + (isDark ? ' --dark' : '') + ` --lang ${lang}`);
    process.exit(1);
  }

  return files.map(f => ({
    name: f.replace('.png', ''),
    path: path.join(outputDir, f),
  }));
}

// ---- Parse scenario for durations ----
function parseScenario() {
  if (!fs.existsSync(scenarioPath)) {
    console.warn(`No scenario file at ${scenarioPath} — using default 8s per frame`);
    return {};
  }

  const content = fs.readFileSync(scenarioPath, 'utf-8');
  const durations = {};

  // Parse summary table: "| 0 Intro | 5 sek. | ..."
  const lines = content.split('\n');
  for (const line of lines) {
    const m = line.match(/^\|\s*(\d+)\s+.+?\|\s*(\d+)\s*sek\.\s*\|/);
    if (m) {
      durations[parseInt(m[1])] = parseInt(m[2]);
    }
  }

  return durations;
}

// ---- Intro animation CSS ----
const INTRO_ANIM_CSS = `
  :root { --ease-spring: cubic-bezier(0.16, 1, 0.3, 1); }

  @keyframes introKyla { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes introPlinta { from { width: 0; } to { width: 300px; } }
  @keyframes introRyskeja { from { opacity: 0; } to { opacity: 1; } }

  .subtitle, .title, .accent-line, .url { opacity: 0; }

  .subtitle    { animation: introKyla 0.55s var(--ease-spring) 0.45s forwards; }
  .title       { animation: introKyla 0.80s var(--ease-spring) 0.70s forwards; }
  .accent-line { animation: introPlinta 0.80s var(--ease-spring) 1.70s forwards, introRyskeja 0.3s linear 1.70s forwards; }
  .url         { animation: introRyskeja 0.5s var(--ease-spring) 2.60s forwards; }
`;

// ---- Generate intro as animated clip ----
async function generateIntroClip(title, subtitle) {
  const introTemplate = path.join(TEMPLATES_DIR, 'video-intro.html');
  if (!fs.existsSync(introTemplate)) {
    console.warn('No video-intro.html template — skipping intro');
    return null;
  }

  let html = fs.readFileSync(introTemplate, 'utf-8');
  // Pavadinimas dviem svoriais: paskutiniai 1–2 žodžiai paryškinami (cleverphant.lt hero)
  const zodziai = String(title).trim().split(/\s+/);
  const stori = zodziai.length > 3 ? 2 : 1;
  const pTitle = zodziai.slice(0, Math.max(1, zodziai.length - stori)).join(' ')
               + '<b>' + zodziai.slice(Math.max(1, zodziai.length - stori)).join(' ') + '</b>';
  html = html.replace(/\{\{video_title\}\}/g, pTitle);
  html = html.replace(/\{\{video_subtitle\}\}/g, subtitle);
  html = html.replace(/\{\{lang\}\}/g, lang);
  html = html.replace(/\{\{brand_logo_path\}\}/g, path.resolve(ASSETS_DIR, 'cleverphant-juodas.svg'));
  html = html.replace(/\{\{brand_logo_dark_path\}\}/g, path.resolve(ASSETS_DIR, 'cleverphant-baltas.png'));
  html = html.replace(/\{\{bg_image_path\}\}/g, path.resolve(ASSETS_DIR, 'blue_bg.png'));

  // Fix CSS paths to absolute
  html = html.replace(
    'href="./tokens/tokens.css"',
    `href="file://${path.resolve(TOKENS_DIR, 'tokens.css')}"`
  );

  const tmpHtml = path.join(videoDir, '_intro_tmp.html');
  fs.writeFileSync(tmpHtml, html, 'utf-8');

  const introClip = path.join(videoDir, `intro${suffix}.mp4`);
  const framesDir = path.join(videoDir, '_intro_frames');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });

  if (isDark) {
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: 'dark' },
    ]);
  }

  await page.goto('file://' + path.resolve(tmpHtml), { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Inject animation CSS
  await page.addStyleTag({ content: INTRO_ANIM_CSS });

  // Force replay
  await page.evaluate(() => {
    document.querySelectorAll('.title, .accent-line, .subtitle, .url').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    });
  });

  // Capture 5s of frames at 30fps
  const introDuration = 5;
  const totalFrames = introDuration * 30;

  for (let f = 0; f < totalFrames; f++) {
    const framePath = path.join(framesDir, `frame_${String(f).padStart(4, '0')}.png`);
    await page.screenshot({ path: framePath, type: 'png' });
    if (f < totalFrames - 1) {
      await new Promise(r => setTimeout(r, 1000 / 30));
    }
    if ((f + 1) % 30 === 0 || f === totalFrames - 1) {
      process.stdout.write(`  Intro: frame ${f + 1}/${totalFrames}\r`);
    }
  }

  await page.close();
  await browser.close();
  fs.unlinkSync(tmpHtml);

  // Stitch into clip
  execSync([
    'ffmpeg', '-y',
    '-framerate', '30',
    '-i', `"${path.join(framesDir, 'frame_%04d.png')}"`,
    '-vf', `"scale=${WIDTH}:${HEIGHT}"`,
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-r', '30',
    `"${introClip}"`,
  ].join(' '), { stdio: 'pipe' });

  // Cleanup frames
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));
  fs.rmdirSync(framesDir);

  console.log(`  Intro clip: ${introClip}`);
  return introClip;
}

// ---- Generate intro PNG (fallback for static hold) ----
async function generateIntroPng(title, subtitle) {
  const introTemplate = path.join(TEMPLATES_DIR, 'video-intro.html');
  if (!fs.existsSync(introTemplate)) return null;

  let html = fs.readFileSync(introTemplate, 'utf-8');
  // Pavadinimas dviem svoriais: paskutiniai 1–2 žodžiai paryškinami (cleverphant.lt hero)
  const zodziai = String(title).trim().split(/\s+/);
  const stori = zodziai.length > 3 ? 2 : 1;
  const pTitle = zodziai.slice(0, Math.max(1, zodziai.length - stori)).join(' ')
               + '<b>' + zodziai.slice(Math.max(1, zodziai.length - stori)).join(' ') + '</b>';
  html = html.replace(/\{\{video_title\}\}/g, pTitle);
  html = html.replace(/\{\{video_subtitle\}\}/g, subtitle);
  html = html.replace(/\{\{lang\}\}/g, lang);
  html = html.replace(/\{\{brand_logo_path\}\}/g, path.resolve(ASSETS_DIR, 'cleverphant-juodas.svg'));
  html = html.replace(/\{\{brand_logo_dark_path\}\}/g, path.resolve(ASSETS_DIR, 'cleverphant-baltas.png'));
  html = html.replace(/\{\{bg_image_path\}\}/g, path.resolve(ASSETS_DIR, 'blue_bg.png'));
  html = html.replace(
    'href="./tokens/tokens.css"',
    `href="file://${path.resolve(TOKENS_DIR, 'tokens.css')}"`
  );

  const tmpHtml = path.join(videoDir, '_intro_tmp.html');
  const introPng = path.join(videoDir, `intro${suffix}.png`);
  fs.writeFileSync(tmpHtml, html, 'utf-8');

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });

  if (isDark) {
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: 'dark' },
    ]);
  }

  await page.goto('file://' + path.resolve(tmpHtml), { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const card = await page.$('.card');
  if (card) {
    await card.screenshot({ path: introPng, type: 'png' });
  } else {
    await page.screenshot({ path: introPng, type: 'png' });
  }

  await browser.close();
  fs.unlinkSync(tmpHtml);
  return introPng;
}

// ---- Vinjetės pradžia (0–OUTRO_HEAD_SECONDS) iš šablono ----
// ⛔ Kiekvienam kadrui nustatomas tikslus laikas (VIDEO_GAMYBA.md §6), ne realiu laiku.
async function generateOutroHead() {
  const text = OUTRO_THANKS[lang];
  const tpl = path.join(TEMPLATES_DIR, 'video-outro.html');
  if (!text || !fs.existsSync(tpl)) return null;

  const zodziai = String(text).trim().split(/\s+/);
  const html = fs.readFileSync(tpl, 'utf-8')
    .replace(/\{\{lang\}\}/g, lang)
    .replace(/\{\{plona\}\}/g, zodziai.slice(0, -1).join(' '))
    .replace(/\{\{stora\}\}/g, zodziai.slice(-1).join(' '));
  const tmpHtml = path.join(videoDir, '_outro_tmp.html');
  fs.writeFileSync(tmpHtml, html, 'utf-8');
  const framesDir = path.join(videoDir, '_outro_frames');
  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir, { recursive: true });

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(tmpHtml), { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const kadru = Math.round(OUTRO_HEAD_SECONDS * 30);
  for (let f = 0; f < kadru; f++) {
    await page.evaluate((ms) => {
      document.getAnimations().forEach(a => { a.pause(); a.currentTime = ms; });
    }, (f / 30) * 1000);
    await page.screenshot({ path: path.join(framesDir, `frame_${String(f).padStart(4, '0')}.png`), type: 'png' });
    if ((f + 1) % 30 === 0 || f === kadru - 1) process.stdout.write(`  Vinjetė: kadras ${f + 1}/${kadru}\r`);
  }
  await browser.close();
  fs.unlinkSync(tmpHtml);

  const outroHead = path.join(videoDir, `outro-galva-${lang}${suffix}.mp4`);
  execSync([
    'ffmpeg', '-y',
    '-framerate', '30',
    '-i', `"${path.join(framesDir, 'frame_%04d.png')}"`,
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-r', '30',
    `"${outroHead}"`,
  ].join(' '), { stdio: 'pipe' });
  fs.rmSync(framesDir, { recursive: true, force: true });
  console.log(`\n  Vinjetės pradžia: ${outroHead}`);
  return outroHead;
}

// ---- Build video with ffmpeg ----
function buildVideo(frames, durations, introClipPath, introPng, outroHeadPath) {
  const videoOut = path.join(videoDir, `${lessonSlug}-${lang}${suffix}.mp4`);

  // Parse scenario order for correct clip sequencing
  const scenarioOrder = parseScenarioOrder();

  // Build frame list: intro + illustrations (in scenario order)
  const allFrames = [];

  if (introClipPath) {
    allFrames.push({ name: 'intro', path: introPng, duration: durations[0] || 5, animatedClip: introClipPath });
  } else if (introPng) {
    allFrames.push({ name: 'intro', path: introPng, duration: durations[0] || 5 });
  }

  // Build a name→frame lookup
  const frameMap = {};
  frames.forEach(f => { frameMap[f.name] = f; });

  if (scenarioOrder) {
    // Use scenario order (skip intro/outro entries)
    scenarioOrder.forEach(item => {
      if (item.fileName.includes('intro') || item.fileName.includes('autro')) return;
      const frame = frameMap[item.fileName];
      if (frame) {
        allFrames.push({
          name: frame.name,
          path: frame.path,
          duration: durations[item.kadrasNum] || 8,
          kadrasNum: item.kadrasNum,
        });
      } else {
        console.warn(`  Warning: scenario references ${item.fileName} but no PNG found`);
      }
    });
  } else {
    // Fallback: alphabetical order
    frames.forEach((frame, i) => {
      allFrames.push({
        name: frame.name,
        path: frame.path,
        duration: durations[i + 1] || 8,
        kadrasNum: i + 1,
      });
    });
  }

  // Check for outro
  const outroPath = path.join(VIDEO_ASSETS_DIR, 'autro.mp4');
  const hasOutro = fs.existsSync(outroPath);

  // Check for background music
  const musicPath = path.join(VIDEO_ASSETS_DIR, 'jiglr-malibu_cleverphant-mokymu-fonas.mp3');
  const hasMusic = fs.existsSync(musicPath);

  console.log(`\n  Frames: ${allFrames.length}`);
  console.log(`  Total duration: ${allFrames.reduce((s, f) => s + f.duration, 0)}s`);
  console.log(`  Outro: ${hasOutro ? 'yes' : 'no (place autro.mp4 in assets/video/)'}`);
  console.log(`  Music: ${hasMusic ? 'yes' : 'no (place mp3 in assets/video/)'}`);

  if (isDryRun) {
    console.log('\n  [dry-run] Would generate:');
    allFrames.forEach((f, i) => {
      console.log(`    Frame ${i}: ${path.basename(f.path)} (${f.duration}s)`);
    });
    if (hasOutro) console.log(`    + outro`);
    return;
  }

  // Strategy: create a concat file with frame durations,
  // then use ffmpeg concat demuxer

  // Check for pre-rendered animated clips
  const animClipsDir = path.join(lessonDir, 'output', lang, 'clips');
  const hasAnimClips = fs.existsSync(animClipsDir);
  if (hasAnimClips) {
    console.log(`  Animated clips found in ${animClipsDir}`);
  }

  // Step 1: Convert each frame to a video clip
  const clipDir = path.join(videoDir, '_clips');
  if (!fs.existsSync(clipDir)) fs.mkdirSync(clipDir, { recursive: true });

  allFrames.forEach((frame, i) => {
    const clipPath = path.join(clipDir, `clip_${String(i).padStart(3, '0')}.mp4`);
    const isIntro = (i === 0 && introPng);

    // Check for animated clip — intro has its own, others check clips dir
    let animClipPath;
    let hasAnimClip;
    if (frame.animatedClip) {
      animClipPath = frame.animatedClip;
      hasAnimClip = fs.existsSync(animClipPath);
    } else {
      animClipPath = hasAnimClips ? path.join(animClipsDir, `${frame.name}.mp4`) : null;
      hasAnimClip = animClipPath && fs.existsSync(animClipPath);
    }

    if (hasAnimClip) {
      // ⛔ Klipo trukmė matuojama, o ne spėjama. Anksčiau čia buvo `frame.duration - 6`,
      // t. y. prielaida, kad kiekvienas klipas yra 6 s. Kai klipai tapo skirtingo ilgio,
      // ta prielaida ant kiekvieno jų užklijuodavo papildomą stop kadrą.
      let animSeconds = 6;
      try {
        animSeconds = parseFloat(execSync(
          `ffprobe -v error -show_entries format=duration -of csv=p=0 "${animClipPath}"`,
          { encoding: 'utf-8' }
        ).trim()) || 6;
      } catch (e) { /* liks 6 */ }
      const holdDuration = Math.max(0, frame.duration - animSeconds);
      if (holdDuration > 0) {
        // Create a hold clip from the PNG, then concat animated + hold
        const holdPath = path.join(clipDir, `hold_${String(i).padStart(3, '0')}.mp4`);
        execSync([
          'ffmpeg', '-y',
          '-loop', '1',
          '-i', `"${frame.path}"`,
          '-t', String(holdDuration),
          '-vf', `"scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease,pad=${WIDTH}:${HEIGHT}:(ow-iw)/2:(oh-ih)/2:color=${BG_COLOR}"`,
          '-c:v', 'libx264',
          '-tune', 'stillimage',
          '-pix_fmt', 'yuv420p',
          '-r', '30',
          `"${holdPath}"`,
        ].join(' '), { stdio: 'pipe' });

        // Concat animated clip + hold
        const miniConcat = path.join(clipDir, `concat_${i}.txt`);
        fs.writeFileSync(miniConcat, `file '${animClipPath}'\nfile '${holdPath}'\n`);
        execSync([
          'ffmpeg', '-y',
          '-f', 'concat',
          '-safe', '0',
          '-i', `"${miniConcat}"`,
          '-c', 'copy',
          `"${clipPath}"`,
        ].join(' '), { stdio: 'pipe' });
        fs.unlinkSync(miniConcat);
        fs.unlinkSync(holdPath);
      } else {
        // Animated clip is long enough — just copy
        fs.copyFileSync(animClipPath, clipPath);
      }
      process.stdout.write(`  Clip ${i + 1}/${allFrames.length} (animated)\r`);
    } else {
      // Static frame — scale/pad to 1920x1080
      let vf;
      if (isIntro) {
        // Intro: slow Ken Burns zoom + fade in from black
        vf = `"scale=${WIDTH * 2}:${HEIGHT * 2}:force_original_aspect_ratio=decrease,pad=${WIDTH * 2}:${HEIGHT * 2}:(ow-iw)/2:(oh-ih)/2:color=${BG_COLOR},zoompan=z='1+0.01*in/${frame.duration}/30':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frame.duration * 30}:s=${WIDTH}x${HEIGHT}:fps=30,fade=t=in:st=0:d=1"`;
      } else {
        vf = `"scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease,pad=${WIDTH}:${HEIGHT}:(ow-iw)/2:(oh-ih)/2:color=${BG_COLOR}"`;
      }

      const cmd = [
        'ffmpeg', '-y',
        '-loop', '1',
        '-i', `"${frame.path}"`,
        '-t', String(frame.duration),
        '-vf', vf,
        '-c:v', 'libx264',
        ...(isIntro ? [] : ['-tune', 'stillimage']),
        '-pix_fmt', 'yuv420p',
        '-r', '30',
        `"${clipPath}"`,
      ].join(' ');
      execSync(cmd, { stdio: 'pipe' });
      process.stdout.write(`  Clip ${i + 1}/${allFrames.length}\r`);
    }
  });
  console.log(`  ${allFrames.length} clips encoded`);

  // Step 1b: Check for transition clips
  const transDir = path.join(animClipsDir, 'transitions');
  const hasTransitions = fs.existsSync(transDir);
  if (hasTransitions) {
    console.log(`  Transition clips found in ${transDir}`);
  }

  // Step 2: Create concat list (with transitions interleaved)
  const concatList = path.join(clipDir, 'concat.txt');
  let concatContent = '';
  let transCount = 0;

  for (let i = 0; i < allFrames.length; i++) {
    const frame = allFrames[i];

    // Insert transition BEFORE this clip (skip intro = index 0, and first content clip = index 1)
    if (hasTransitions && i > 1 && frame.kadrasNum) {
      const transName = `transition-${String(frame.kadrasNum).padStart(2, '0')}${suffix}.mp4`;
      const transPath = path.join(transDir, transName);
      if (fs.existsSync(transPath)) {
        // Copy transition to clip dir
        const transDest = path.join(clipDir, `trans_${String(i).padStart(3, '0')}.mp4`);
        fs.copyFileSync(transPath, transDest);
        concatContent += `file 'trans_${String(i).padStart(3, '0')}.mp4'\n`;
        transCount++;
      }
    }

    concatContent += `file 'clip_${String(i).padStart(3, '0')}.mp4'\n`;
  }

  if (transCount > 0) {
    console.log(`  ${transCount} transitions interleaved`);
  }

  let outroSeconds = 0;
  if (hasOutro) {
    // ⛔ Vaizdas konkatenuojamas be garso (visi klipai be jo), bet autro garsas —
    // firminis širdies plakimas — atskirai įmaišomas žemiau, 4 žingsnyje.
    try {
      outroSeconds = parseFloat(execSync(
        `ffprobe -v error -show_entries format=duration -of csv=p=0 "${outroPath}"`,
        { encoding: 'utf-8' }
      ).trim()) || 0;
    } catch (e) { outroSeconds = 0; }
    // Copy outro to clip dir for concat
    const outroDest = path.join(clipDir, 'outro.mp4');
    // Re-encode outro to match format
    const cmd = [
      'ffmpeg', '-y',
      '-i', `"${outroPath}"`,
      '-vf', `"scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease,pad=${WIDTH}:${HEIGHT}:(ow-iw)/2:(oh-ih)/2:color=${BG_COLOR}"`,
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-r', '30',
      '-an',
      `"${outroDest}"`,
    ].join(' ');
    execSync(cmd, { stdio: 'pipe' });
    if (outroHeadPath && fs.existsSync(outroHeadPath)) {
      // ⛔ Nauja vinjetės pradžia + autro.mp4 nuo OUTRO_HEAD_SECONDS. Bendra trukmė nepakinta,
      // tad širdies plakimo takelis (4 žingsnis, iš autro.mp4) lieka tose pačiose vietose.
      const uodega = path.join(clipDir, 'outro_uodega.mp4');
      execSync([
        'ffmpeg', '-y', '-i', `"${outroDest}"`, '-ss', String(OUTRO_HEAD_SECONDS),
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30', '-an', `"${uodega}"`,
      ].join(' '), { stdio: 'pipe' });
      const galva = path.join(clipDir, 'outro_galva.mp4');
      fs.copyFileSync(outroHeadPath, galva);
      const oc = path.join(clipDir, 'outro_concat.txt');
      fs.writeFileSync(oc, "file 'outro_galva.mp4'\nfile 'outro_uodega.mp4'\n");
      const tmp = path.join(clipDir, 'outro_sujungta.mp4');
      execSync(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', `"${oc}"`, '-c', 'copy', `"${tmp}"`].join(' '), { stdio: 'pipe' });
      fs.renameSync(tmp, outroDest);
      [uodega, galva, oc].forEach(f => fs.unlinkSync(f));
      console.log(`  Vinjetė: „${OUTRO_THANKS[lang]}“ ${OUTRO_HEAD_SECONDS}s + logotipo dalis iš autro.mp4`);
    }
    concatContent += `file 'outro.mp4'\n`;
  }
  fs.writeFileSync(concatList, concatContent, 'utf-8');

  // Step 3: Concat all clips
  const silentVideo = path.join(clipDir, 'silent.mp4');
  execSync([
    'ffmpeg', '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', `"${concatList}"`,
    '-c', 'copy',
    `"${silentVideo}"`,
  ].join(' '), { stdio: 'pipe' });

  // Step 4: Garsas — foninė muzika, vinjetės širdies plakimas ir (jei yra) balsas
  let totalDur;
  try {
    totalDur = parseFloat(execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 "${silentVideo}"`,
      { encoding: 'utf-8' }
    ).trim());
  } catch (_) {
    totalDur = allFrames.reduce((s, f) => s + f.duration, 0) + transCount * 2;
  }

  // ⛔ Balsas (node generate-voice.js) dedamas ties TIKRA kadro pradžia — ji išmatuojama
  // iš sukonkatenuotų failų (intro, klipai, skirtukai), o ne apskaičiuojama iš scenarijaus.
  const voiceDir = path.join(videoDir, `balsas-${lang}`);
  const voiceManifestPath = path.join(voiceDir, 'manifest.json');
  const voice = [];
  let voiceGainDb = 0;
  if (fs.existsSync(voiceManifestPath)) {
    const vm = JSON.parse(fs.readFileSync(voiceManifestPath, 'utf-8'));
    const kadroPradzia = {};
    const kadroTrukme = {};
    let laikas = 0;
    for (const line of concatContent.split('\n')) {
      const m = line.match(/^file '(.+)'$/);
      if (!m) continue;
      const d = parseFloat(execSync(
        `ffprobe -v error -show_entries format=duration -of csv=p=0 "${path.join(clipDir, m[1])}"`,
        { encoding: 'utf-8' }
      ).trim()) || 0;
      const c = m[1].match(/^clip_(\d{3})\.mp4$/);
      if (c) {
        const fr = allFrames[parseInt(c[1], 10)];
        if (fr && fr.kadrasNum) { kadroPradzia[fr.kadrasNum] = laikas; kadroTrukme[fr.kadrasNum] = d; }
      }
      laikas += d;
    }
    const startIn = vm.start_in_frame || 0.6;
    for (const it of vm.items || []) {
      const file = path.join(voiceDir, it.file);
      if (kadroPradzia[it.kadras] === undefined || !fs.existsSync(file)) {
        console.warn(`  ⛔ Balsas K${it.kadras}: kadras arba failas nerastas — praleidžiama`);
        continue;
      }
      const langas = kadroTrukme[it.kadras] - startIn - 0.5;
      if (it.duration > langas) {
        console.warn(`  ⛔ Balsas K${it.kadras} (${it.duration}s) netelpa į kadrą (${langas.toFixed(1)}s) — pailgink kadrą scenarijuje`);
      }
      voice.push({ file, at: kadroPradzia[it.kadras] + startIn });
    }
    // ⛔ Balso garsumas suvienodinamas iki VOICE_TARGET_LUFS VIENU stiprinimu visiems kadrams —
    // taip išlieka natūralus garsumo skirtumas tarp sakinių. eleven_v3_dpo generuoja ~9 dB
    // tyliau nei eleven_v3 (−27,8 prieš −18,8 LUFS, 2026-09-15): be to balsas skęsta muzikoje.
    let integ = null;
    if (voice.length) {
      const ins = voice.map(v => `-i "${v.file}"`).join(' ');
      const cc = voice.map((_, j) => `[${j}:a]aresample=44100,aformat=channel_layouts=mono[c${j}]`).join(';') + ';'
        + voice.map((_, j) => `[c${j}]`).join('') + `concat=n=${voice.length}:v=0:a=1,ebur128`;
      try {
        const o = execSync(`ffmpeg -v info ${ins} -filter_complex "${cc}" -f null - 2>&1`,
          { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 });
        const all = [...o.matchAll(/I:\s+(-?[\d.]+) LUFS/g)];
        if (all.length) integ = parseFloat(all[all.length - 1][1]);
      } catch (e) { integ = null; }
    }
    if (integ !== null && isFinite(integ)) {
      voiceGainDb = Math.max(-12, Math.min(15, VOICE_TARGET_LUFS - integ));
      console.log(`  Balsas: ${voice.length} kadrai (${vm.model}) · ${integ.toFixed(1)} LUFS → ${VOICE_TARGET_LUFS} LUFS (${voiceGainDb >= 0 ? '+' : ''}${voiceGainDb.toFixed(1)} dB)`);
    } else {
      console.warn('  ⛔ Balso garsumo išmatuoti nepavyko — įmaišoma be suvienodinimo');
      console.log(`  Balsas: ${voice.length} kadrai (${vm.model})`);
    }
  }

  const turiPlakima = hasOutro && outroSeconds > 0;
  if (hasMusic || turiPlakima || voice.length) {
    // Muzika nutyla prieš vinjetę, kad širdies plakimas liktų vienas — kaip originale.
    const outroStart = turiPlakima ? Math.max(0, totalDur - outroSeconds) : totalDur;
    const fadeStart = turiPlakima ? Math.max(0, outroStart - 1.5) : Math.max(0, totalDur - 3);
    const fadeLen = turiPlakima ? 1.5 : 3;

    const ivestys = ['-i', `"${silentVideo}"`];
    const filtrai = [];
    const fonai = [];
    let n = 1;
    if (hasMusic) {
      ivestys.push('-stream_loop', '-1', '-i', `"${musicPath}"`);
      filtrai.push(`[${n}:a]volume=0.4,afade=t=out:st=${fadeStart}:d=${fadeLen},aresample=44100,aformat=channel_layouts=stereo[muzika]`);
      fonai.push('[muzika]');
      n++;
    }
    if (turiPlakima) {
      ivestys.push('-i', `"${outroPath}"`);
      const delayMs = Math.round(outroStart * 1000);
      filtrai.push(`[${n}:a]aresample=44100,aformat=channel_layouts=stereo,adelay=${delayMs}|${delayMs}[sirdis]`);
      fonai.push('[sirdis]');
      n++;
    }
    let fonas = null;
    if (fonai.length === 1) {
      fonas = fonai[0];
    } else if (fonai.length > 1) {
      filtrai.push(`${fonai.join('')}amix=inputs=${fonai.length}:duration=first:normalize=0[fonas]`);
      fonas = '[fonas]';
    }

    if (voice.length) {
      voice.forEach((v, j) => {
        ivestys.push('-i', `"${v.file}"`);
        const ms = Math.round(v.at * 1000);
        filtrai.push(`[${n}:a]aresample=44100,aformat=channel_layouts=stereo,volume=${voiceGainDb.toFixed(2)}dB,adelay=${ms}|${ms}[b${j}]`);
        n++;
      });
      const b = voice.map((_, j) => `[b${j}]`).join('');
      filtrai.push(voice.length > 1
        ? `${b}amix=inputs=${voice.length}:normalize=0,alimiter=limit=0.891:level=false,apad[balsas]`
        : `${b}alimiter=limit=0.891:level=false,apad[balsas]`);
      if (fonas) {
        // ⛔ Muzika po balsu prislopinama švelniai (sidechain, release ~0,9 s).
        // Staigus grįžimas iškart po sakinio skamba taip, lyg balsas būtų nukirptas.
        filtrai.push('[balsas]asplit=2[balsasSc][balsasOut]');
        filtrai.push(`${fonas}[balsasSc]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=900[fonasTylus]`);
        filtrai.push('[fonasTylus][balsasOut]amix=inputs=2:normalize=0:duration=first[aout]');
      } else {
        filtrai.push('[balsas]anull[aout]');
      }
    } else {
      filtrai.push(`${fonas}anull[aout]`);
    }

    execSync([
      'ffmpeg', '-y',
      ...ivestys,
      '-filter_complex', `"${filtrai.join(';')}"`,
      '-map', '0:v',
      '-map', '"[aout]"',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-shortest',
      `"${videoOut}"`,
    ].join(' '), { stdio: 'pipe' });
    if (turiPlakima) {
      console.log(`  Vinjetės garsas grąžintas nuo ${outroStart.toFixed(1)}s (${outroSeconds.toFixed(1)}s)`);
    }
  } else {
    fs.renameSync(silentVideo, videoOut);
  }

  // Cleanup clips
  fs.readdirSync(clipDir).forEach(f => fs.unlinkSync(path.join(clipDir, f)));
  fs.rmdirSync(clipDir);

  console.log(`\n  Video: ${videoOut}`);

  // Print duration
  try {
    const probe = execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 "${videoOut}"`,
      { encoding: 'utf-8' }
    ).trim();
    console.log(`  Duration: ${Math.round(parseFloat(probe))}s`);
  } catch (_) {}
}

// ---- Main ----
async function main() {
  console.log(`\nBuilding video: ${lessonSlug} [${lang}]${isDark ? ' (dark)' : ''}`);

  if (!fs.existsSync(lessonDir)) {
    console.error(`Lesson not found: ${lessonDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  // Discover illustration frames
  const frames = discoverFrames();
  console.log(`  Found ${frames.length} illustration(s)`);

  // Parse durations from scenario
  const durations = parseScenario();

  // Load lesson content for intro title
  const contentPath = path.join(lessonDir, 'content', `${lang}.json`);
  let introTitle = lessonSlug;
  let introSubtitle = '';
  if (fs.existsSync(contentPath)) {
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
    // Use first section title or lesson-level title
    const firstSection = Object.keys(content).find(k => k.match(/^\d\d_/));
    if (firstSection && content[firstSection].title) {
      introTitle = content[firstSection].title;
    }
    // Use the main flow title if available
    if (content['01_sheets_tvs_svetaine']) {
      introTitle = content['01_sheets_tvs_svetaine'].title;
    }
    // Explicit lesson intro title override (preferred, generic)
    if (content._intro && content._intro.title) {
      introTitle = content._intro.title;
    }
    // Localized subtitle
    const subtitles = {
      lt: '250+ mokyklų jau naudoja Cleverphant',
      en: '250+ schools already use Cleverphant',
      de: '250+ Schulen nutzen bereits Cleverphant',
      pl: '250+ szk\u00f3\u0142 ju\u017c korzysta z Cleverphant',
    };
    introSubtitle = subtitles[lang] || subtitles['en'];
  }

  // Generate animated intro clip + static PNG for hold
  const introClip = await generateIntroClip(introTitle, introSubtitle);
  const introPng = await generateIntroPng(introTitle, introSubtitle);
  const outroHead = await generateOutroHead();

  // Build video
  buildVideo(frames, durations, introClip, introPng, outroHead);
}

if (isAllLangs) {
  const manifestPath = path.join(LESSONS_DIR, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const languages = manifest.lessons[lessonSlug]?.languages || ['lt'];
  console.log(`Building video for all languages: ${languages.join(', ')}`);
  (async () => {
    for (const l of languages) {
      console.log(`\n${'='.repeat(60)}\n  Language: ${l}\n${'='.repeat(60)}`);
      const childArgs = ['--lesson', lessonSlug, '--lang', l];
      if (isDark) childArgs.push('--dark');
      if (isDryRun) childArgs.push('--dry-run');
      execSync(`node ${JSON.stringify(__filename)} ${childArgs.join(' ')}`, { stdio: 'inherit' });
    }
  })().catch(err => { console.error(err); process.exit(1); });
} else {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
