# Animacijos principai — Cleverphant infografikos

## Šaltiniai
- Disney's 12 Principles of Animation (UI kontekstas)
- explainer-visuals skill (mcpmarket, 1.0.0) — judesio reikšmės ir „suprantama sustojus“ idėjos, pritaikytos video konvejeriui (2026-09-16)
- 10.studio: Complete Guide to Animated Infographics

---

## Mūsų tonas: „Ramybė"
Viskas turi atrodyti šilta, ramu, profesionalu. Ne cartoon, ne techninė demo.
Auditorija — mokyklų administratoriai, ne dizaineriai.

---

## Taikomi principai

### 1. Gradual Reveal (palaipsnis atskleidimas)
Elementai atsiranda **logine seka**, ne visi iš karto.
Pavadinimas → pauzė → turinys dalimis → summary.
Žiūrovas turi suprasti KĄ mato prieš pamatydamas DAUGIAU.

### 2. Pacing (tempas su pauzėmis)
Tarp blokų — aiškios pauzės (0.5–1s).
Per greita = nesuprantama. Per lėta = nuobodu.
**Taisyklė:** po kiekvieno loginio bloko — kvėpavimo pauzė.

### 3. Staging (scena vs aktoriai)
Kortelės fonas, brand bar = **scena** → matoma nuo pradžių, nejuda.
Turinio elementai = **aktoriai** → jie animuojasi.
Ne viskas turi judėti.

### 4. Follow Through & Overlapping Action
Elementai juda **skirtingais greičiais**, ne tik skirtingu laiku.
Pavadinimas — greičiau, drąsiau (0.5s).
Smulkūs elementai (žingsniai, ikonos) — lėčiau, švelniau (0.4s).
Sukuria natūralų gylį.

### 5. Easing (slow in / slow out)
Niekada `linear`. Niekada paprastas `ease`.
Naudojame: `cubic-bezier(0.16, 1, 0.3, 1)` — spring-like, natūralus.
Elementas „išlekia" ir švelniai sustoja.

### 6. Sequential annotation
Kai atsiranda blokas (pvz. stulpelis), jo vidaus elementai atsiranda **po vieną**.
Žingsniai — kaip skaitymas, vienas po kito, 0.15–0.2s tarpais.

### 7. Cognitive load
Max **2–3 elementai juda vienu metu**.
Jei daugiau — žiūrovas praranda fokusą.

### 8. Secondary Action (mikro-animacijos)
Pagrindinis veiksmas: elementas atsiranda.
Antrinis: ikonos švelnus scale pulse (1.0 → 1.05 → 1.0) atsiradus.

### 9. Mass & Weight (svoris)
Sunkesnis elementas = lėtesnė animacija.
- Pavadinimas (didelis, sunkus) → 0.6s, solidus
- Stulpelis (vidutinis) → 0.5s
- Žingsnis (lengvas) → 0.3–0.4s, greitas ir šviesus
Tai sukuria fizikos pojūtį — ne visi elementai vienodi.

### 10. Arcs (kreivos trajektorijos)
Tiesi linija (tik translateY) atrodo dirbtinai.
Subtilus papildomas `translateX` arba mikro `rotate` (0.5°→0°) sukuria
organišką, natūralų judėjimą. Naudoti saikingai.

### 11. Layered animation (kelios savybės vienu metu)
Vienas elementas gali animuoti keletą savybių:
- opacity + translateY + scale (jau turime)
- Papildomai: background-color intensyvėja, border ryškėja
- Tai sukuria turtingesnį, gylesnį atsiradimą

### 12. Timing & Music sync
Jei animacijos atsiradimo momentai sutampa su muzikos ritmais —
žiūrovas jaučia harmoniją. Sudėtinga automatizuoti, bet verta
žinoti ir taikyti rankiniam derinimui.

### 13. Judesio reikšmė — ką judesys pasako
Judesys renkamas pagal prasmę, ne pagal skonį. Kiekvienas judesio tipas turi savo reikšmę,
ir žiūrovas ją perskaito net nesusimąstęs.

| Judesys | Reiškia | Kada naudoti | Mūsų pavyzdys |
|---|---|---|---|
| **Atsiradimas / išnykimas** (opacity) | egzistavimą | elementas pradeda ar nustoja būti | naujos lentelės ant durų „Reguliacinis vėjas“ kadre |
| **Didinimas / mažinimas** (scale) | svarbą | akcentuojame tai, kas svarbiausia | „Informacija“ stulpelis užsidega poraštėje |
| **Poslinkis** (translate) | ryšį ir vietą | kas kur keliauja, kas prie ko priklauso | septintas punktas nukrenta į antrą aukštą |
| **Virsmas** (spalva, forma) | tapatybės pokytį | tas pats daiktas tampa kitu | kortelė iš pilkos tampa žalia |
| **Pasukimas** (rotate) | būsenos pokytį | kas nors apvirsta, nukrenta, sugenda | nukritusios senos lentelės |

⛔ **Judesys be reikšmės nenaudojamas.** Jei negalima pasakyti, ką judesys reiškia, elementas
tiesiog atsiranda (opacity).

### 14. Suprantama ir sustojus
Iš to paties šablono gimsta ir video klipas, ir pamokos PNG. PNG animacijos neturi, todėl
**sustojęs kadras turi pasakyti visą mintį**.

- **Pagrindinis CSS stilius = galutinė būsena.** Animacija tik veda iki jos: `@keyframes`
  aprašo pradžią (`from`), o pabaiga paimama iš pagrindinio stiliaus.
- Pradžios būsena laikoma per `animation-fill-mode: both` — prieš uždelsimą elementas stovi
  pradžios padėtyje, po animacijos lieka galutinėje.
- **Testas:** atidaryk PNG. Jei be judesio neaišku, kas įvyko — kadras nepavyko, nesvarbu, kaip
  gražiai jis juda.

⛔ **Animuojama tik CSS `@keyframes`.** `generate-video-clips.js` sustabdo animacijas per
`document.getAnimations()` ir kiekvieną kadrą nustato tiksliu laiku. `setTimeout`,
`requestAnimationFrame` ir JavaScript paleidžiami `transition` šito nepaklūsta — kadrai
trūkinėtų ir kiekvieną kartą skirtųsi.

---

## UI žingsnių filmukai („kur spausti“)

Trumpi filmukai, kuriuose imituojama TVS ir rodoma, ką spausti, žingsnis po žingsnio
(Eimantas 2026-09-16). Čia galioja visi aukščiau esantys principai, o papildomai — šie.

### Struktūra
- **Vienu metu aktyvus vienas žingsnis.** Kiti elementai ramūs, neišryškinti.
- **Žingsnių skaitiklis matomas visą laiką** („2 iš 5“), visada toje pačioje vietoje.
- **Instrukcijos eilutė keičiasi kartu su žingsniu** ir sako veiksmą esamuoju laiku
  („Spaudžiate „Išsaugoti““), ekrano žodžiai kabutėse, tiksliai kaip TVS.

### Judesiai ir jų reikšmė (§13)
| Veiksmas UI | Judesys | Kodėl |
|---|---|---|
| Kursorius eina prie tikslo | poslinkis (translate) lenkta trajektorija | rodo ryšį „štai čia“; tiesi linija atrodo mechaniškai (§10) |
| Užvedimas prieš spustelėjimą | mygtuko spalva pasikeičia kaip tikroje TVS | be užvedimo imitacija atrodo netikra |
| Spustelėjimas | trumpas padidėjimas + ratilas nuo kursoriaus | svarba ir momentas |
| Būsenos pasikeitimas | virsmas (spalva, forma: jungiklis, „Išsaugota“) | tas pats elementas tampa kitu |
| Teksto įvedimas | raidės atsiranda po vieną | žiūrovas mato, ką įvesti |
| Priartinimas prie veiksmo vietos | kadro mastelis | pirma visas ekranas, tada mygtukas |

⛔ **Priartinimas privalomas.** Visas TVS langas 1920 px kadre telefone virsta smulkmena. Seka:
parodyti visą ekraną (kur esame) → priartėti prie vietos (ką spausti) → atsitraukti, kai
žingsnis baigtas.

⛔ **Rašymas tik per CSS `steps()`**, ne laikmačiais — kitaip filmavimas jo nepagauna (§14).

### Sustojęs kadras (§14)
PNG rodo visą žingsnį vienu vaizdu: kursorius ant tikslo, paryškintas elementas, instrukcija ir
skaitiklis. Jei iš PNG neaišku, ką spausti — žingsnis nepavyko.

### Tikslumas
TVS atkartojama pagal `DESIGN_RULES.md` § „UI mockup'ai“: struktūra iš tikros ekrano nuotraukos,
pavadinimai tokie, kokius žmogus mato, reikšmės laukuose — kokias moko pamoka.

### Rinkinys (dar nesukurtas — kuriamas 2026-09-17)
Bendros animacijos `generate-video-clips.js`, kad kiekvienas filmukas jas naudotų, o ne kurtų iš naujo:
1. kursorius su trajektorija;
2. užvedimo būsena;
3. spustelėjimas su ratilu;
4. rašymas (`steps()`);
5. priartinimas ir atsitraukimas;
6. žingsnių skaitiklis ir instrukcijos eilutė.

Kuriamas su pirmu tikru „kur spausti“ filmuku, ne abstrakčiai.

### Kryptis svarstymui: interaktyvus įterpinys pamokoje
Tas pats žingsnių turinys gali būti ne tik video, bet ir įterpinys pamokoje su mygtukais
„Atgal“ / „Toliau“ — mokytoja eina savo tempu, o ne gaudo bėgantį filmuką. Tada galiotų
prieinamumo reikalavimai: `role="img"` ir tekstinis aprašas, `prefers-reduced-motion`,
valdymas klaviatūra, matomas fokusas. Šaltinis — explainer-visuals skill'o žingsnių šablonas.
Sprendimas dar nepriimtas.

---

## Ko NEDARYTI
- Squash & stretch — per cartoon'iška mūsų brandui
- Exaggeration — minimali, nes profesionali auditorija
- Bounce efektai — per žaismingi
  - ⛔ **Išimtis — juokelio kadras** (Eimantas 2026-09-16: „šie neatrodo kaip juokeliai, nes labai statiški“). Kai kadras yra sąmoningas humoras — burbulas iššoka su kryptelėjimu, šunelis atbėga strykčiodamas, uodega vizgina. Viename filme ne daugiau dviejų tokių kadrų.
- Visų elementų slėpimas — scena (fonas, brand) turi būti matoma nuo pradžių
- Vienodi delay tarpai — sukuria mechaniškumą
- Vienodi animacijos trukmės — sunkūs ir lengvi elementai turi skirtis

---

## Techniniai parametrai

| Parametras | Reikšmė |
|---|---|
| Klipo trukmė | 6s (animacija) + hold (likęs kadro laikas) |
| FPS | 30 |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Pavadinimo fade | 0.5s, delay 0.3s |
| Pauzė po pavadinimo | ~1s |
| Bloko fade | 0.5s |
| Žingsnių tarpai | 0.15–0.2s |
| Pauzė tarp blokų | 0.5s |
| Summary | paskutinis, delay ~4.5s |
| Brand bar | statinis, nuo pradžių |
| Kortelės fonas | statinis, nuo pradžių |

---

## Perėjimai tarp kadrų (transition C)

Stilius: horizontali gradientinė linija brėžia iš kairės, centre iššoka numeris ir pavadinimas.

### Timing principas
- **Greitas startas** — veiksmas prasideda per 0.05s, ne laukti
- **Ilgas hold** — skaičius ir pavadinimas laikomi ~1.5s prieš išnykstant
- Bendra trukmė: **2.5s**

### Seka
```
0.05s — Linija brėžia (0.7s, spring easing)
0.15s — Skaičius pop (0.5s, scale 0.8→1)
0.35s — Pavadinimas slide-up (0.4s)
2.10s — Viskas fade-out (0.3s)
2.50s — Klipas baigtas
```

### Ko nedaryti perėjimuose
- Nelaukti ilgai prieš pirmą veiksmą — žiūrovas praranda dėmesį
- Nerodyti skaičiaus per trumpai — turi spėti perskaityti pavadinimą

---

## Animacijos seka (pvz. comparison kadras)

```
0.0s  — Kortelė, brand bar matomi (scena)
0.3s  — Pavadinimas ↑ fade-up (0.5s)
1.3s  — Kairys stulpelis ↑ fade-up (0.5s)
1.6s  — Kairys žingsnis 1 ↑ (0.4s)
1.8s  — Kairys žingsnis 2 ↑ (0.4s)
2.0s  — Kairys žingsnis 3 ↑ (0.4s)
2.2s  — Kairys žingsnis 4 ↑ (0.4s)
2.7s  — Rodyklė fade-in (0.3s)
3.0s  — Dešinys stulpelis ↑ fade-up (0.5s)
3.3s  — Dešinys žingsnis 1 ↑ (0.4s)
3.5s  — Dešinys žingsnis 2 ↑ (0.4s)
4.2s  — Summary ↑ fade-up (0.5s)
4.7s  — Viskas vietoje, hold
```
