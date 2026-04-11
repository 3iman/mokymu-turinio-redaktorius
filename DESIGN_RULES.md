# Dizaino taisyklės — iliustracijos

## Kortelė (card)
- Plotis: **900px**
- Fonas: `var(--c-surface)`
- Border-radius: **20px**
- Shadow: `var(--c-shadow-card)`
- Padding: **48px 56px**

## Šriftas
- Šeima: **Inter** (fallback: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif)
- Pavadinimas: 22px, bold (700), `var(--c-text)`
- Etiketės: 15px, bold (700), uppercase, `var(--c-text)`
- Aprašymai: 13px, regular, `var(--c-text-muted)`
- Smulkios etiketės (ant rodyklių): 10px, semibold (600), uppercase, `var(--c-text-faint)`

## Spalvų sistema

Visos spalvos centralizuotos **`tokens/tokens.css`** — CSS custom properties su automatniu light / dark mode.

**Niekada nenaudoti hardcoded hex reikšmių šablonuose.** Visada naudoti `var(--c-...)` tokenus.

### Spalvų grupės ir prasmės

| Grupė | Token prefiksas | Paskirtis |
|---|---|---|
| Neutral | `--c-bg`, `--c-surface`, `--c-text`, `--c-border`, `--c-line` | Fonas, tekstas, linijos |
| Green | `--c-green-*` | Teigiamas veiksmas, taisyklingai, Google Sheets |
| Red | `--c-red-*` | Draudimas, klaida, netaisyklingai |
| Blue | `--c-blue-*` | Informatyvi, TVS, neutral-akcentas |
| Purple | `--c-purple-*` | Rezultatas, svetainė, trečias žingsnis |
| Amber | `--c-amber-*` | Įspėjimas, dėmesio reikalaujantis momentas |

- Niekada nenaudoti oranžinės draudimui — draudimui tik raudona
- Kiekviena teksto + fono pora tikrinta per WCAG AA kontrastą (≥ 4.5:1)
- Dark mode aktyvuojamas automatiškai per `@media (prefers-color-scheme: dark)`

## German-first projektavimas

Šablonai projektuojami ir testuojami **vokiškais tekstais**. Jei vokiškas tekstas netelpa — keičiamas layout, ne tekstas. Jei telpa vokiškai — telps ir visomis kitomis kalbomis.

### Testavimo tvarka
1. **DE** (vokiečių) — ilgiausi žodžiai, sudėtiniai terminai
2. **LT** (lietuvių) — vidutinio ilgio
3. **EN** (anglų) — trumpiausi
4. **PL** (lenkų) — panašus į lietuvių

### Privalomas CSS kiekvienam šablonui
```css
/* Žodžių laužymas pagal kalbos taisykles */
.step-label, .step-desc, .highlight, .format-example {
  hyphens: auto;
  overflow-wrap: break-word;
}
```
Veikia tik su teisingu `<html lang="...">` atributu — naršyklė naudoja kalbos taisykles.

### Fiksuotų pločių draudimas
- **Niekada** nenaudoti `width` tekstiniams elementams — tik `min-width` + `flex` + `max-width`
- **Niekada** `white-space: nowrap` ant verčiamo teksto
- Tekstiniai konteineriai turi „kvėpuoti" — elastingai prisitaikyti prie turinio

```css
/* Blogai */
.step { width: 200px; }

/* Gerai */
.step { min-width: 180px; flex: 1; max-width: 240px; }
```

### Kai DE netelpa — sprendimo eiga
1. Pirma bandyti **CSS elastingumą** (flex-wrap, min/max-width)
2. Jei nepadeda — svarstyti **layout keitimą** (horizontalus → vertikalus)
3. Paskutinė priemonė — **trumpinti DE tekstą** (galima pasakyti kitaip)
4. **Niekada nemažinti šrifto tik vienai kalbai** — šrifto dydis vienodas visoms kalboms

## Ikonos
- Dydis: **80x80px** konteineris, **36x36px** SVG viduje
- Border-radius: **20px**
- Fonas: gradientas (135deg)
- SVG: baltos spalvos, stroke-width 1.8

## Lygiavimo taisyklės
- **Viskas centruojama** horizontaliai kortelės viduje
- **Rodyklių etiketės** centruojamos tiksliai po rodykle
- **Ikonos** visada vienodo dydžio, net jei turinys skiriasi
- **Aprašymai po ikonėlėmis** — vienodo pločio zona, tekstas centruotas
- **Elementų grupės** (pvz. 3 žingsniai) — lygiuojami flex su vienodais tarpais
- **Vertikalus lygiavimas**: ikonos, etiketės, aprašymai pradedami nuo tos pačios linijos nepriklausomai nuo turinio ilgio

## Rodyklės
- Punktyrinė linija: 70px ilgio, 2px aukščio
- Spalva: `var(--c-line)` (linija), `var(--c-text-faint)` (rodyklės galvutė)
- Etiketė po rodykle: **privalomas `text-align: center` ir `width: 100%`**
- Etiketės margin-top: 8px
- Konteineris: `align-items: center` kad rodyklė ir etiketė būtų ant tos pačios ašies

### Rodyklių lygiavimo taisyklė
Tekstas po rodyklėmis **visada** turi būti centruotas tiksliai po rodyklės linija.
Problema kyla kai etiketė turi kelias eilutes — be `text-align: center` tekstas
lygiuojasi kairėn ir vizualiai „nušoka" nuo rodyklės centro.

## Brand bar
- Margin-top: **40px**
- Padding-top: **24px**
- Viršuje: 1px `var(--c-border-soft)` separatorius
- Logo: du variantai — juodas (light mode) ir baltas (dark mode), perjungiami per `<img>` + `@media`
- Logo aukštis: **22px**
- Logo opacity: `var(--c-brand-logo-opacity)` (light: 0.5, dark: 0.35)
- Centruotas horizontaliai

## Teksto taisyklės iliustracijose

### Antraštės
- **Be klaustukų** — net jei antraštė skamba kaip klausimas. „Nuo ko pradėti", ne „Nuo ko pradėti?"
- Antraštės yra informacinės, ne retorinės

### Emailai ir URL
- **Niekada nelūžta per eilutes** — `white-space: nowrap` ant kiekvieno email ir URL elemento
- Tai yra išimtis iš bendros `overflow-wrap: break-word` taisyklės — emailai ir URL yra nedalomi vienetai

### Video overlay numeracija
- Grynas tekstas be fono, be dėžučių, be šešėlių — minimalizmas
- Spalva: `#94a3b8` (faint), dydis: 32px, svoris: 700
- Pozicija: apatinis kairys kampas

## PNG eksportas
- Device scale factor: **2x** (retina)
- Viewport: 1200x800
- Fonas: skaidrus (transparent)
- Screenshot'inamas tik `.card` elementas
