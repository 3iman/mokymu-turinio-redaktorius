# Dizaino taisyklės — iliustracijos

## Kortelė (card)
- Plotis: **900px**
- Fonas: baltas (`#ffffff`)
- Border-radius: **20px**
- Shadow: subtilus (`0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)`)
- Padding: **48px 56px**

## Šriftas
- Šeima: **Inter** (fallback: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif)
- Pavadinimas: 22px, bold (700), `#1a1a2e`
- Etiketės: 15px, bold (700), uppercase, `#1a1a2e`
- Aprašymai: 13px, regular, `#64748b`
- Smulkios etiketės (ant rodyklių): 10px, semibold (600), uppercase, `#94a3b8`

## Spalvų paletė
- Pagrindinis tekstas: `#1a1a2e`
- Antrinis tekstas: `#64748b`
- Trečias lygis (etiketės): `#94a3b8`
- Žalia (Google Sheets): `#34a853` → `#2d9248` gradientas
- Mėlyna (TVS): `#3363ab` → `#2a5291` gradientas
- Violetinė (svetainė): `#7c3aed` → `#6d28d9` gradientas
- Geltona / amber (įspėjimas, dėmesio): `#f59e0b` → `#d97706` gradientas
- Raudona (draudimas, klaida): `#ef4444` → `#dc2626` gradientas
- Linijų spalva: `#cbd5e1`
- Fono spalva (body): `#f8f9fb`
- Separatoriaus linija: `#f1f5f9`

### Spalvų prasmės
- **Žalia** — teigiamas veiksmas, taisyklingai, galima
- **Raudona** — draudimas, negalima, klaida, netaisyklingai
- **Amber / geltona** — įspėjimas, dėmesio reikalaujantis momentas
- Niekada nenaudoti oranžinės draudimui — draudimui tik raudona

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
- Spalva: `#cbd5e1` (linija), `#94a3b8` (rodyklės galvutė)
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
- Viršuje: 1px `#f1f5f9` separatorius
- Logo: **Cleverphant su drambliuku** (juodas variantas)
- Logo aukštis: **22px**
- Logo opacity: **0.5**
- Centruotas horizontaliai

## PNG eksportas
- Device scale factor: **2x** (retina)
- Viewport: 1200x800
- Fonas: skaidrus (transparent)
- Screenshot'inamas tik `.card` elementas
