# Mokymų turinio redaktorius — iliustracijų generatorius

HTML šablonų sistema, generuojanti daugiakalbias iliustracijas Cleverphant mokymų platformai (`mokymai.cleverphant.lt`).

## Kaip veikia

```
templates/*.html   +   content/{lt,en}.json   +   tokens/tokens.css
        ↓                      ↓                        ↓
                        generate.js
                            ↓
                  output/{lang}/*.html + *.png
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
├── DESIGN_RULES.md           ← Vizualinės taisyklės (šriftai, dydžiai)
├── tokens/
│   └── tokens.css            ← Spalvų sistema (light + dark mode, WCAG AA)
├── agent/
│   └── GLOSSARY.md           ← Terminų žodynas
├── assets/                   ← Logotipai (juodas + baltas dark mode)
├── lessons/
│   ├── google-sheets-integracija/
│   │   ├── templates/        ← 9 iliustracijų šablonai (00–08)
│   │   └── content/          ← lt.json, en.json
│   └── es-projektu-viesinimas/
│       ├── templates/        ← 2 iliustracijų šablonai (01–02)
│       └── content/          ← lt.json
├── generate.js               ← Generatorius (HTML + PNG per Puppeteer)
└── server.js                 ← Dev serveris peržiūrai
```

## Spalvų sistema (Design Tokens)

Visos spalvos centralizuotos `tokens/tokens.css` — CSS custom properties su light ir dark mode.

| Grupė | Paskirtis |
|---|---|
| Neutral | Fonas, tekstas, linijos, rėmeliai |
| Green | Teigiama, nauja, sinchronizuota |
| Red | Neigiama, sena tvarka, klaida |
| Blue | Informatyvi, neutral-akcentas |
| Purple | Rezultatas, trečias žingsnis |
| Amber | Įspėjimas, laukimas |

Dark mode aktyvuojamas per `@media (prefers-color-scheme: dark)`. Kiekviena teksto + fono pora atitinka WCAG AA kontrastą (>= 4.5:1).

Šablonuose:
```css
<link rel="stylesheet" href="./tokens/tokens.css">

background: var(--c-green-bg);
color: var(--c-green-text);
background: linear-gradient(135deg, var(--c-green-gradient-from), var(--c-green-gradient-to));
```

## Naujos pamokos kūrimas

1. Sukurti katalogą `lessons/{slug}/templates/` ir `content/`
2. Parašyti HTML šabloną su `{{kintamaisiais}}` ir `tokens.css`
3. Sukurti `content/lt.json` su atitinkamais raktais
4. Pridėti mapper funkciją į `TEMPLATE_KEYS` objekte `generate.js`
5. Paleisti `node generate.js --png`

## PNG eksportas

PNG generuojami per Puppeteer — fotografuojamas `.card` elementas 2x raiška (retina). Rezultatai tinka tiesioginiam įkėlimui į WordPress.

Dark mode PNG generuojamas atskirai per Puppeteer `emulateMediaFeatures`.
