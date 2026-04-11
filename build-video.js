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
  :root {
    --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes fadeUpHeavy {
    from { opacity: 0; transform: translateY(32px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lineExpand {
    from { opacity: 0; width: 0; }
    to   { opacity: 1; width: 100px; }
  }

  .title, .accent-line, .subtitle, .url { opacity: 0; }

  /* 0.5s — Title (heavy, 0.7s) */
  .title {
    animation: fadeUpHeavy 0.7s var(--ease-spring) 0.5s forwards;
  }

  /* 1.5s — Accent line (expand, 0.4s) */
  .accent-line {
    animation: lineExpand 0.4s var(--ease-spring) 1.5s forwards;
  }

  /* 2.1s — Subtitle (fade, 0.5s) */
  .subtitle {
    animation: fadeIn 0.5s var(--ease-spring) 2.1s forwards;
  }

  /* 3.0s — URL (fade, 0.4s) */
  .url {
    animation: fadeIn 0.4s var(--ease-spring) 3.0s forwards;
  }
`;

// ---- Generate intro as animated clip ----
async function generateIntroClip(title, subtitle) {
  const introTemplate = path.join(TEMPLATES_DIR, 'video-intro.html');
  if (!fs.existsSync(introTemplate)) {
    console.warn('No video-intro.html template — skipping intro');
    return null;
  }

  let html = fs.readFileSync(introTemplate, 'utf-8');
  html = html.replace(/\{\{video_title\}\}/g, title);
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
  html = html.replace(/\{\{video_title\}\}/g, title);
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

// ---- Build video with ffmpeg ----
function buildVideo(frames, durations, introClipPath, introPng) {
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
      // Use animated clip + extend with static hold for remaining duration
      const holdDuration = Math.max(0, frame.duration - 6);
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

  if (hasOutro) {
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

  // Step 4: Add background music if available
  if (hasMusic) {
    // Get actual video duration (includes transitions)
    let totalDur;
    try {
      totalDur = parseFloat(execSync(
        `ffprobe -v error -show_entries format=duration -of csv=p=0 "${silentVideo}"`,
        { encoding: 'utf-8' }
      ).trim());
    } catch (_) {
      totalDur = allFrames.reduce((s, f) => s + f.duration, 0) + transCount * 2;
    }
    const fadeStart = Math.max(0, totalDur - 3);

    execSync([
      'ffmpeg', '-y',
      '-i', `"${silentVideo}"`,
      '-stream_loop', '-1',
      '-i', `"${musicPath}"`,
      '-filter_complex', `"[1:a]volume=0.4[bg];[bg]afade=t=out:st=${fadeStart}:d=3[aout]"`,
      '-map', '0:v',
      '-map', '"[aout]"',
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-shortest',
      `"${videoOut}"`,
    ].join(' '), { stdio: 'pipe' });
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

  // Build video
  buildVideo(frames, durations, introClip, introPng);
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
