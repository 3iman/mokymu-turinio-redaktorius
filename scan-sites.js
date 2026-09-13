#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const KLIENTAI_PATH = '/Users/eimantasgardauskas/Documents/Ai agentai/KLIENTAI.md';
const OUTPUT_PATH = path.join(__dirname, 'verified-sites.json');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function parseSites() {
  const content = fs.readFileSync(KLIENTAI_PATH, 'utf-8');
  const lines = content.split('\n');
  const sites = [];
  let currentMunicipality = '';

  for (const line of lines) {
    if (line.startsWith('### ')) {
      currentMunicipality = line.replace('### ', '').trim();
      continue;
    }
    // Match table rows: | sku | name | dev | prod | clv | yt |
    const match = line.match(/^\|?\s*(\w+)\s*\|\s*(.+?)\s*\|\s*(\S+)\s*\|\s*(\S+)\s*\|\s*(\S+|-)\s*\|\s*(\S+|-)\s*\|?\s*$/);
    if (match && match[1] !== 'sku') {
      sites.push({
        sku: match[1],
        name: match[2].trim(),
        dev: match[3].trim(),
        prod: match[4].trim(),
        municipality: currentMunicipality
      });
    }
  }
  return sites;
}

async function checkSite(page, url) {
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const response = await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 15000 });
    if (!response || response.status() >= 400) return { ok: false, reason: `HTTP ${response?.status()}` };

    await sleep(1000);

    const result = await page.evaluate(() => {
      const hasCookieBar = !!document.querySelector('#europeCookieWrapper, .cookies-hold');
      const hasNav = !!document.querySelector('.nav, ul.nav');
      const hasHero = !!document.querySelector('.hero, .hero-section, .slider, .rev_slider, [class*="hero"], [class*="slider"]');
      const hasSidebar = !!document.querySelector('[class*="shortcut"], [class*="side-nav"], .side-buttons');
      const hasFooter = !!document.querySelector('footer, .footer');

      return { hasCookieBar, hasNav, hasHero, hasSidebar, hasFooter };
    });

    const score = [result.hasCookieBar, result.hasNav, result.hasFooter].filter(Boolean).length;
    return {
      ok: score >= 2,
      score,
      ...result,
      url: fullUrl
    };
  } catch (err) {
    return { ok: false, reason: err.message.substring(0, 80) };
  }
}

(async () => {
  const sites = parseSites();
  console.log(`Parsed ${sites.length} sites from KLIENTAI.md\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  const verified = [];
  const failed = [];
  let count = 0;

  for (const site of sites) {
    count++;
    const urls = [];
    if (site.prod && site.prod !== '-') urls.push(site.prod);
    if (site.dev && site.dev !== '-') urls.push(site.dev);

    let bestResult = null;

    for (const url of urls) {
      const result = await checkSite(page, url);
      if (result.ok) {
        bestResult = { ...site, verifiedUrl: result.url, ...result };
        break;
      }
      if (!bestResult || (result.score || 0) > (bestResult.score || 0)) {
        bestResult = { ...site, verifiedUrl: result.url || url, ...result };
      }
    }

    if (bestResult?.ok) {
      verified.push(bestResult);
      console.log(`[${count}/${sites.length}] ✓ ${site.sku} — ${bestResult.verifiedUrl}`);
    } else {
      failed.push({ ...site, reason: bestResult?.reason || 'no standard elements' });
      console.log(`[${count}/${sites.length}] ✗ ${site.sku} — ${bestResult?.reason || 'no match'}`);
    }

    await sleep(500);
  }

  const output = { verified, failed, stats: { total: sites.length, verified: verified.length, failed: failed.length } };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`\n=== RESULTS ===`);
  console.log(`Total: ${sites.length}`);
  console.log(`Verified (standard): ${verified.length}`);
  console.log(`Failed/non-standard: ${failed.length}`);
  console.log(`Saved to: ${OUTPUT_PATH}`);

  await browser.close();
})();
