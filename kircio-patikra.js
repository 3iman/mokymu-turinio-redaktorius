#!/usr/bin/env node
/**
 * Kirčio patikra prieš įgarsinimą.
 *
 * ⛔ Kodėl (Eimantas 2026-09-20): „kirčiavimo aš nemoku klaviatūra parašyti. Geriau būtų,
 *    jei aš sakau, kad blogai pagal klausą, o tu tikrini šaltinius ir klausi manęs ar taip ar taip.
 *    Skaityti kirčiavimą moku gerai.“
 *    Todėl skriptas nieko netaiso pats: jis atrenka žodžius, kuriuose kirtis gali būti ne vienas,
 *    ir parodo variantus su morfologine informacija — kad Eimantas galėtų pasirinkti skaitydamas.
 *
 * Šaltinis: VDU „Kirčiuoklis“ (kalbu.vdu.lt). ⛔ Tai NE paskelbtas API — tos pačios priemonės
 * vidinis galas (`/ajax-call`, veiksmai `text_accents` ir `word_accent`), o `nonce` imamas iš
 * puslapio. Naudojame retai (kartą pamokai) ir tik savo tekstams. Prieš nuolatinį naudojimą
 * verta paklausti VDU leidimo.
 *
 * Paleidimas:
 *   node kircio-patikra.js lessons/{pamoka}/video/balso-tekstas-lt.md
 *   node kircio-patikra.js --zodziai "paruošti spalva"
 */
const fs = require('fs');

const BAZE = 'https://kalbu.vdu.lt';
const PUSLAPIS = BAZE + '/mokymosi-priemones/kirciuoklis/';

async function nonce() {
  const html = await (await fetch(PUSLAPIS)).text();
  const m = html.match(/["']NONCE["']\s*:\s*["']([^"']+)["']/);
  if (!m) throw new Error('nepavyko rasti nonce — pasikeitė puslapis');
  return m[1];
}

async function kviesti(veiksmas, laukas, reiksme, n) {
  const r = await fetch(BAZE + '/ajax-call', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: new URLSearchParams({ action: veiksmas, nonce: n, [laukas]: reiksme }),
  });
  if (!r.ok) throw new Error(`Kirčiuoklis atsakė ${r.status}`);
  const j = await r.json();
  return JSON.parse(j.message);
}

/** Dažni žodžiai — jų kirčio netikriname: balsas juos taria teisingai, o sąrašas be jų perpus trumpesnis. */
function dazni() {
  const out = new Set();
  try {
    for (const w of JSON.parse(fs.readFileSync(__dirname + '/tarimo-zodynas/dazni-lt.json', 'utf-8')).zodziai) out.add(w);
  } catch (_) { /* sąrašo gali ir nebūti */ }
  // ⛔ Eimanto perklausyti ir patvirtinti žodžiai — jų nebeklausiame antrą kartą (2026-09-20).
  try {
    const z = JSON.parse(fs.readFileSync(__dirname + '/tarimo-zodynas/lt.json', 'utf-8'));
    for (const w of Object.keys(z.patvirtinti || {})) out.add(w.toLowerCase());
    for (const w of Object.keys(z.zodziai || {})) out.add(w.toLowerCase());
  } catch (_) { /* žodyno gali ir nebūti */ }
  return out;
}

/** Tekste esantys žodžiai, kurių kirtis nevienareikšmis. */
const DAZNI = dazni();


async function abejotini(tekstas, n) {
  const dalys = await kviesti('text_accents', 'body', tekstas.slice(0, 4000), n);
  const out = new Map();
  for (const eil of dalys) {
    for (const p of eil) {
      const w = p.string.toLowerCase();
      const kirciuotas = /[\u0300\u0301\u0303\u0330àáãèéẽìíĩòóõùúũ]/.test(p.string);
      const lietuviskas = /^[a-ząčęėįšųūž]+$/.test(w);
      if (p.type === 'WORD' && p.accentType !== 'ONE' && !DAZNI.has(w)
          && w.length > 3 && lietuviskas && !kirciuotas) out.set(w, p.accented);
    }
  }
  return out;
}

async function variantai(zodis, n) {
  const info = await kviesti('word_accent', 'word', zodis, n);
  const out = [];
  for (const eil of info) {
    for (const p of eil) {
      const a = (p.accented || []).join('');
      for (const i of (p.information || [])) {
        if (!out.some(x => x.a === a && x.mi === i.mi)) out.push({ a, mi: i.mi, reiksme: i.meaning || '' });
      }
    }
  }
  return out;
}

(async () => {
  const args = process.argv.slice(2);
  let tekstas;
  if (args[0] === '--zodziai') {
    tekstas = args.slice(1).join(' ');
  } else if (args[0]) {
    tekstas = fs.readFileSync(args[0], 'utf-8')
      .split('\n').filter(l => l.startsWith('- `')).map(l => l.replace(/^- `[^`]*`\s*/, '')).join(' ');
    if (!tekstas.trim()) tekstas = fs.readFileSync(args[0], 'utf-8');
  } else {
    console.error('Nurodyk balso teksto failą arba --zodziai "…"');
    process.exit(1);
  }

  const n = await nonce();
  const abj = await abejotini(tekstas, n);
  if (!abj.size) {
    console.log('Nevienareikšmio kirčio žodžių nerasta.');
    return;
  }
  console.log(`Žodžiai, kuriuose kirtis gali būti ne vienas (${abj.size}):\n`);
  for (const [zodis] of abj) {
    const v = await variantai(zodis, n);
    if (!v.length) continue;                       // Kirčiuoklis žodžio nepažįsta (angliškas, tikrinis) — praleidžiam
    const eil = v.map(x => `${x.a} (${x.mi}${x.reiksme ? ', ' + x.reiksme : ''})`).join('  ·  ');
    console.log(`  ${zodis}\n     ${eil}`);
    await new Promise(r => setTimeout(r, 400));     // nespaudžiame svetimos paslaugos
  }
  console.log('\n⛔ Pasirink variantą pagal sakinio prasmę ir įrašyk į tarimo-zodynas/lt.json (IPA).');
})();
