# Kompozicijos principai — Cleverphant infografikos

## Saltiniai
- Column Five Media: Infographic Design Tips & Minimal Design
- explainer-visuals skill (mcpmarket, 1.0.0) — minties tipo ir formos atitikmenų idėja (2026-09-16)
- Beautiful.ai: Ultimate Guide to Presentation Design
- University of Hull: 6 Principles of Design for Infographics

---

## Musu kontekstas
Kortelės 1920x1080. Auditorija — 45-65 m. mokytojai. Viena iliustracija = viena mintis.
Dizainas turi buti aiškus per 3 sekundes — jei reikia galvoti, iliustracija nepavyko.

---

## Taikomi principai

### 1. Viena žinutė — viena kortelė
Niekada nekrauti kelių konceptų į vieną iliustraciją.
Jei noris daugiau — geriau dvi atskiros iliustracijos.
**Testas:** ar galima aprašyti iliustracijos mintį vienu sakiniu?

### 2. Trijų lygių hierarchija
- **1 lygis: Pavadinimas** — didelis, bold, traukia akį
- **2 lygis: Blokai / stulpeliai** — vidutinis, struktūruoja turinį
- **3 lygis: Detales** — mažesnis, paaiškina

Daugiau nei 3 lygiai kuria painiavą. Jei reikia ketvirto — supaprastink struktūrą.

### 3. Balansas
Trys tipai, kuriuos naudojame:

| Tipas | Kada naudoti | Pvz. |
|---|---|---|
| **Simetrinis** | Palyginimai, prieš/po | 00 — senoji vs naujoji tvarka |
| **Asimetrinis** | Procesai, flow | 01 — trys žingsniai su rodyklėmis |
| **Radialinis** | Ciklai, etapai | Retai, bet tinka duomenų srautams |

**Simetrinis:** vienodi stulpeliai, centrinė ašis — kuria ramybę ir aiškumą.
**Asimetrinis:** vienas didelis + keli maži elementai — kuria energiją, bet reikia balansuoti vizualinį svorį.

### 4. Tuščia erdvė (white space)
Tuščia erdvė — ne tuštuma, o aktyvus dizaino įrankis.

- **Pavadinimas:** daugiau erdvės virš nei po — optiškai atsieta nuo turinio
- **Tarp blokų:** aiškūs tarpai sukuria kvėpavimą
- **Aplink ikonas:** erdvė aplink ikoną padaro ją ryškesnę
- **Kortelės padding:** 80px 120px — dosnūs kraštai grindžia kompoziciją

**Taisyklė:** jei elementai jauciasi suspauti — ne mažink jų, o didink tarpus.

### 5. Dominantė ir akcentas
- **Dominantė** — vienas pagrindinis fokusas visoje kortelėje (dažniausiai pavadinimas arba centrinis elementas)
- **Akcentas** — antrinis fokusas sekcijoje (ikona, numeris, highlight)

Technikos:
- **Dydis:** didesnis = svarbesnis
- **Spalva:** ryškesnė / kontrastingesnė = labiau traukia akį
- **Izoliacija:** elementas su daugiau erdvės aplink — automatiškai tampa fokusu
- **Pozicija:** centras arba viršus traukia dėmesį natūraliai

### 6. Panašumas ir kontrastas
Panašūs elementai turi atrodyti panašiai. Skirtingi — skirtingai.

- **Žingsniai** vienoje sekcijoje — vienodo dydžio, vienodo stiliaus
- **Stulpeliai** palyginime — vienodo aukščio, bet skirtingų spalvų
- **Ikonos** — vienodo dydžio per visą iliustraciją
- **Kontrastas tarp blokų:** spalva, background, border — aiškiai atskirti

### 7. Vienybė (unity)
Visa kortelė turi atrodyti kaip vienas vienetas, ne sudėta iš atskirų gabalų.

- Kartoti tuos pačius elementus: tas pats border-radius, tie patys gradient'ai
- Spalvų paletė iš `tokens.css` — niekada ad hoc spalvų
- Šriftų šeima viena (Inter) — hierarchija per dydį ir svorį, ne per šriftą
- Watermark fone sujungia viską į vieną branded visumą

### 8. Skaitymo srautas (visual flow)
Žiūrovas skaito natūralia tvarka:

- **Z pattern:** iš kairės viršaus → dešinėn → kairėn apačion → dešinėn (bendras)
- **F pattern:** iš viršaus žemyn kairėje, tada dešiniau (sąrašai, žingsniai)
- **Centrinė ašis:** pavadinimas viršuje centre → turinys centre (mūsų dažniausias)

Rodyklės, linijos, numeriai — padeda valdyti skaitymo kryptį.

### 9. Proporcija ir svoris
Elementų dydis turi atspindėti jų svarbą:

| Elementas | Dydis | Svoris |
|---|---|---|
| Pavadinimas | 44px, bold 700 | Sunkiausias |
| Bloko label | 26-37px, bold 700 | Vidutinis |
| Aprašymas | 24-32px, normal | Lengvas |
| Pastaba / note | 22-24px, italic | Lengviausias |

Nekeisti proporcijų tarp šablonų — nuoseklumas per seriją.

### 10. Spalvų ribojimas
- **Max 5 spalvos** vienoje kortelėje (Column Five)
- **2 pagrindinės + atspalviai** (Beautiful.ai)
- Mūsų sistema: spalvos iš `tokens.css` semantinės (green=gerai, red=blogai, blue=informacija, amber=dėmesio)
- **80% brando atpažinimo** ateina iš spalvų — nuoseklumas kritiškas

### 11. Grupavimas (chunking)
Susiję elementai grupuojami vizualiai:
- **Boksai** su border/background — stulpeliai palyginime
- **Numeriai** — žingsnių seka
- **Linijos / rodyklės** — ryšys tarp elementų
- **Proximity** — arti esantys elementai suvokiami kaip grupė

**Atsargiai:** per daug boksų = vizualinis triukšmas. Naudoti selektyviai.

### 12. Turinio tipas lemia vaizdo formą
Prieš piešiant pirmiausia atsakyti: **kokio tipo mintį rodome?** Forma renkama pagal mintį,
ne pagal tai, kas buvo pieštas praeitą kartą.

| Minties tipas | Forma | Kodėl | Mūsų pavyzdys |
|---|---|---|---|
| **Virsmas** (buvo → tapo) | tas pats objektas prieš ir po | žiūrovas mato, kas pasikeitė, o ne du skirtingus daiktus | „O galima mainyti?“ — ta pati juosta prieš ir po |
| **Procesas** (kaip kažkas vyksta) | vienas objektas, kuriame procesas įvyksta | procesas suprantamas, kai matai jį vykstantį | „Kaip gimsta dviaukštis meniu“ — viena juosta, į kurią įstumiamas punktas |
| **Augimas / eskalacija** | grandinė su stiprėjančia spalva | kiekviena pakopa stipresnė už ankstesnę | „Nekaltas prašymas vis užauga“ — pageidavimas → prašymas → reikalavimas |
| **Palyginimas** (du variantai) | dvi lygiavertės kolonos | simetrija leidžia lyginti | „Straipsniu arba žinute el. dienyne“ |
| **Kriterijus** (kas tinka, kas ne) | dvi kolonos su priešinga semantine spalva | žalia ir pilka iškart pasako verdiktą | „Kas nusipelno durų?“ |
| **Kiekis, matmuo** | objektas su matmenimis ta kryptimi, kurią matuoja | plotis rodomas horizontaliai, aukštis — vertikaliai | „Kiek vietos yra“ — 8 px greta raidės |
| **Vieta** (kur kas yra) | tikras ekrano fragmentas arba maketas su slinkimu | žiūrovas atpažįsta savo svetainę | poraštės „Informacija“ stulpelis |
| **Abstrakti mintis** | metafora iš kasdienybės | pažįstamas vaizdas nešioja nepažįstamą idėją | durys, pastatas, pramintas takas |
| **Veiksmas TVS** (kur spausti) | TVS imitacija su vienu aktyviu žingsniu, priartinimu ir skaitikliu | žiūrovas turi rasti mygtuką, ne visą ekraną | žr. `ANIMATION_PRINCIPLES.md` § „UI žingsnių filmukai“ |

⛔ **Metafora laikoma iki galo.** Jei filmas pradėjo durimis ir pastatu, kiti kadrai kalba ta pačia
kalba („informacijos stendas fojė“, ne „kitos durys“). Metafora, kuri nušoka, klaidina labiau nei
jokios metaforos (Eimantas 2026-09-16).

---

## Ko NEDARYTI

- **Per daug elementų vienu metu** — max 5-7 per kortelę
- **Dekoratyvūs elementai** — jei neprideda prasmės, šalinti
- **Skirtingi šriftai** — tik Inter, tik dydis/svoris hierarchijai
- **Ad hoc spalvos** — tik iš tokens.css
- **Pilnas justify** — kenkia skaitomumui
- **Mažas šriftas** — min 22px (mūsų kontekste)
- **Vienodo dydžio viskas** — be hierarchijos žiūrovas nežino kur žiūrėti
- **Tuščios erdvės baimė** — erdvė = dizaino dalis, ne „švaistymas"
- **Per daug boksų / rėmelių** — geriau erdvė nei rėmelis

---

## Praktiniai parametrai

| Parametras | Reikšmė |
|---|---|
| Kortelės dydis | 1920 x 1080px |
| Padding | 80px 120px |
| Border-radius (kortelė) | 32px |
| Border-radius (blokai) | 18-24px |
| Border-radius (ikonos) | 16px |
| Tarpas tarp stulpelių | 48-62px |
| Tarpas tarp žingsnių | 18-24px |
| Pavadinimo margin-bottom | 48-64px |
| Min šrifto dydis | 22px |
| Max spalvų skaičius | 5 |
| Max šriftų skaičius | 1 (Inter) |
| Max hierarchijos lygiai | 3 |

---

## Checklist prieš finalizuojant iliustraciją

| # | Tikrinimas |
|---|---|
| 1 | Ar viena aiški žinutė? |
| 2 | Ar hierarchija veikia — akis pirmiausia mato pavadinimą? |
| 3 | Ar yra pakankamai tuščios erdvės? |
| 4 | Ar panašūs elementai atrodo vienodai? |
| 5 | Ar spalvos iš tokens.css? |
| 6 | Ar viskas subalansuota — nė viena pusė „nesunkesnė"? |
| 7 | Ar galima suprasti per 3 sekundes? |
| 8 | Ar tiktų su ilgesniais (vokiškais) tekstais? |
| 9 | Ar forma atitinka minties tipą (virsmas, procesas, palyginimas…), ir ar metafora nenušoka nuo filmo kalbos? |
