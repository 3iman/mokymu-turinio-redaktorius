#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const VERIFIED_PATH = path.join(__dirname, 'verified-sites.json');
const OUTPUT_DIR = '/Users/eimantasgardauskas/Documents/AI vizualai/reklama/screenshots/hero';
const VIEWPORT = { width: 1920, height: 1080 };

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const data = JSON.parse(fs.readFileSync(VERIFIED_PATH, 'utf-8'));

  // Only launched sites (not cleverphant.lt dev domain)
  const sites = data.verified.filter(s => s.verifiedUrl && !s.verifiedUrl.includes('cleverphant.lt'));
  console.log(`Total launched sites: ${sites.length}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: VIEWPORT,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < sites.length; i++) {
    const site = sites[i];
    const num = String(i + 1).padStart(3, '0');
    const outFile = path.join(OUTPUT_DIR, `${num}-${site.sku}-hero.png`);

    try {
      await page.goto(site.verifiedUrl, { waitUntil: 'networkidle2', timeout: 20000 });
      await sleep(1500);

      // Close cookie bar
      const cookieBtn = await page.$('#europeCookieClose');
      if (cookieBtn) {
        await cookieBtn.click();
        await sleep(800);
      }

      // Hide accessibility widget
      await page.evaluate(() => {
        const widgets = document.querySelectorAll('[class*="accessibility"], [id*="accessibility"], .acc-widget, #acc-widget, [class*="UserWay"], [id*="userway"]');
        widgets.forEach(w => w.style.display = 'none');
      });

      await sleep(300);
      await page.screenshot({ path: outFile });
      success++;
      console.log(`[${i + 1}/${sites.length}] ✓ ${site.sku} — ${site.verifiedUrl}`);
    } catch (err) {
      failed++;
      const reason = err.message.substring(0, 60);
      errors.push({ sku: site.sku, url: site.verifiedUrl, reason });
      console.log(`[${i + 1}/${sites.length}] ✗ ${site.sku} — ${reason}`);
    }

    await sleep(300);
  }

  await browser.close();

  console.log(`\n=== DONE ===`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  if (errors.length) {
    console.log(`\nFailed sites:`);
    errors.forEach(e => console.log(`  ${e.sku}: ${e.reason}`));
  }

  // Save results
  fs.writeFileSync(
    path.join(OUTPUT_DIR, '_results.json'),
    JSON.stringify({ success, failed, errors, total: sites.length }, null, 2)
  );
})();
