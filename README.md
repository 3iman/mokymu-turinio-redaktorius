# Mokymų turinio redaktorius — iliustracijų generatorius

HTML šablonų sistema, generuojanti daugiakalbias iliustracijas Cleverphant mokymų platformai (`mokymai.cleverphant.lt`).

## Kaip veikia

```
templates/*.html   +   content/{lt,en}.json   →   generate.js   →   output/{lang}/*.html + *.png
```

Kiekviena pamoka turi savo katalogą `lessons/{pamokos-slug}/` su trimis dalimis:

| Katalogas | Turinys |
|---|---|
| `templates/` | HTML šablonai su `{{placeholder}}` kintamaisiais |
| `content/` | JSON failai kiekvienai kalbai (`lt.json`, `en.json`) |
| `output/` | Sugeneruoti HTML ir PNG failai |

## Greitas startas

```bash
npm install
node generate.js              # Generuoti HTML
node generate.js --png        # Generuoti HTML + PNG (reikia Puppeteer)
node generate.js --lang lt    # Tik lietuvių kalba
```

## Struktūra

```
├── CLAUDE.md                 ← Agento instrukcijos (mindset, workflow, QA)
├── DESIGN_RULES.md           ← Vizualinės taisyklės (spalvos, šriftai, dydžiai)
├── agent/
│   └── GLOSSARY.md           ← Terminų žodynas
├── assets/                   ← Bendri resursai (logotipai)
├── lessons/
│   ├── google-sheets-integracija/
│   │   ├── templates/        ← 8 iliustracijų šablonai (00–07)
│   │   └── content/          ← lt.json, en.json
│   └── es-projektu-viesinimas/
│       ├── templates/        ← 2 iliustracijų šablonai (01–02)
│       └── content/          ← lt.json
├── generate.js               ← Generatorius (HTML + PNG per Puppeteer)
└── server.js                 ← Dev serveris peržiūrai
```

## Naujos pamokos kūrimas

1. Sukurti katalogą `lessons/{slug}/templates/` ir `content/`
2. Parašyti HTML šabloną su `{{kintamaisiais}}`
3. Sukurti `content/lt.json` su atitinkamais raktais
4. Pridėti mapper funkciją į `TEMPLATE_KEYS` objekte `generate.js`
5. Paleisti `node generate.js --png`

## PNG eksportas

PNG generuojami per Puppeteer — fotografuojamas `.card` elementas 2x raiška (retina). Rezultatai tinka tiesioginiam įkėlimui į WordPress.
