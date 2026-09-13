const puppeteer = require('puppeteer');

const SITES = [
  { sku: 'raseiniugimnazija', url: 'https://raseiniugimnazija.lt' },
  { sku: 'alvid', url: 'https://vidzgiris.lt' },
  { sku: 'dvm2', url: 'https://dvm.lt' },
  { sku: 'amsm', url: 'https://amsm.lt' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1920, height: 1080 } });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');

  for (const site of SITES) {
    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 20000 });
      await new Promise(r => setTimeout(r, 2000));

      const data = await page.evaluate(() => {
        const selectors = ['.nav ul[role="navigation"] > li', '.nav ul > li', 'ul.nav > li'];
        let navItems = [];
        let usedSelector = '';
        for (const sel of selectors) {
          const items = document.querySelectorAll(sel);
          if (items.length >= 3 && items.length < 20) {
            usedSelector = sel + ' (' + items.length + ')';
            items.forEach(li => {
              const a = li.querySelector(':scope > a');
              const children = [];
              li.querySelectorAll(':scope > ul > li > a').forEach(child => {
                children.push(child.textContent.trim().replace(/\s+/g, ' '));
              });
              const hasChild = li.querySelector(':scope > ul') !== null;
              navItems.push({
                text: a ? a.textContent.trim().replace(/\s+/g, ' ') : '',
                hasDropdown: hasChild,
                children
              });
            });
            break;
          }
        }
        if (navItems.length === 0) {
          const navUl = document.querySelector('.nav ul[role="navigation"], .nav > ul');
          if (navUl) {
            usedSelector = 'direct children of .nav ul';
            Array.from(navUl.children).forEach(li => {
              if (li.tagName !== 'LI') return;
              const a = li.querySelector(':scope > a');
              const children = [];
              li.querySelectorAll(':scope > ul > li > a').forEach(child => {
                children.push(child.textContent.trim().replace(/\s+/g, ' '));
              });
              const hasChild = li.querySelector(':scope > ul') !== null;
              navItems.push({
                text: a ? a.textContent.trim().replace(/\s+/g, ' ') : '',
                hasDropdown: hasChild,
                children
              });
            });
          }
        }
        const shortcuts = [];
        document.querySelectorAll('[class*="shortcut"] a, .side-buttons a, .side-nav a').forEach(a => {
          shortcuts.push(a.textContent.trim());
        });
        return { navItems, usedSelector, shortcuts };
      });

      console.log('\n=== ' + site.sku + ' (' + site.url + ') ===');
      console.log('Selector: ' + (data.usedSelector || 'NONE'));
      if (data.navItems.length) {
        data.navItems.forEach(item => {
          const dd = item.hasDropdown ? ' [DROPDOWN]' : '';
          console.log('  ' + item.text + dd);
          item.children.forEach(c => console.log('    -> ' + c));
        });
      }
      if (data.shortcuts.length) {
        console.log('  SHORTCUTS: ' + data.shortcuts.join(', '));
      }
    } catch (e) {
      console.log('\n=== ' + site.sku + ' === ERROR: ' + e.message.substring(0, 80));
    }
  }
  await browser.close();
})();
