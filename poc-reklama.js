#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'poc-reklama-output');
if (fs.existsSync(OUTPUT_DIR)) fs.rmSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const VIEWPORT = { width: 1920, height: 1080 };

const SITES = [
  { sku: 'arspt', url: 'https://arspt.lt' },
  { sku: 'adzuk', url: 'https://www.dzukijosmokykla.lt' },
  { sku: 'alvid', url: 'https://vidzgiris.lt' },
  { sku: 'dvm2', url: 'https://dvm.lt' },
  { sku: 'amsm', url: 'https://amsm.lt' },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function hideAccessibilityWidget(page) {
  await page.evaluate(() => {
    const widget = document.querySelector('[class*="accessibility"], [id*="accessibility"], .acc-widget, #acc-widget');
    if (widget) widget.style.display = 'none';
  });
}

async function captureFlow(page, site, index) {
  const prefix = `${String(index).padStart(2, '0')}-${site.sku}`;

  try {
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 20000 });
    await sleep(1500);

    // Step 1: Page with cookie bar visible
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${prefix}-01-cookies.png`) });
    console.log(`✓ ${site.sku} — cookies bar`);

    // Step 2: Click "Sutinku" and capture clean hero
    const sutinkuBtn = await page.$('#europeCookieClose');
    if (sutinkuBtn) {
      await sutinkuBtn.click();
      await sleep(800);
    }
    await hideAccessibilityWidget(page);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${prefix}-02-hero.png`) });
    console.log(`✓ ${site.sku} — hero (clean)`);

    // Step 3: Hover on nav item with submenu (li.has-child inside .nav)
    const submenuItem = await page.$('.nav li.has-child > a');
    if (submenuItem) {
      const text = await page.evaluate(el => el.textContent.trim(), submenuItem);
      await submenuItem.hover();
      await sleep(800);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${prefix}-03-nav-hover.png`) });
      console.log(`✓ ${site.sku} — nav hover ("${text}")`);
    } else {
      const fallback = await page.$('.nav li:nth-child(2) > a');
      if (fallback) {
        const text = await page.evaluate(el => el.textContent.trim(), fallback);
        await fallback.hover();
        await sleep(600);
        await page.screenshot({ path: path.join(OUTPUT_DIR, `${prefix}-03-nav-hover.png`) });
        console.log(`✓ ${site.sku} — nav hover fallback ("${text}")`);
      }
    }

  } catch (err) {
    console.error(`✗ ${site.sku} — ${err.message}`);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: VIEWPORT,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  for (let i = 0; i < SITES.length; i++) {
    await captureFlow(page, SITES[i], i);
  }

  await browser.close();
  console.log(`\nDone! Screenshots in: ${OUTPUT_DIR}`);
})();
