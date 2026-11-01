# TVS UI rinkinio katalogas — ko trūksta explaineriams

Sugeneruota 2026-10-31 iš platformos epizodų kortelių (`tvs_ui` žymos „naujas: …“). 83 skirtingos žymos sujungtos į komponentus.
Būsena: ✅ — yra `tokens/tvs.css` ir rinkinio lentose `templates/01–10`; **reikia kadrų** — senuose įrašuose yra, bet repozitorijoje tik kontaktų lapas (480 px), per smulku tiksliai nupiešti; **kadro nėra** — nė viename įraše nematyti, piešti tik pagal tikrą TVS / svetainę.

**Pilna raiška:** `scenos/*/sc*.jpg` yra tik 960 px pločio; tą patį kadrą 1920 px ištraukti iš įrašo: `ffmpeg -ss 16.9 -i turinys/media/video/880-row-mp4.mp4 -frames:v 1 kadras.png` (platformos repo). Visi 2026-11-01 matavimai daryti taip.

**Kaip gauti kadrus (Mac, platformos repo):** `python3 scripts/sena-scenos.py --youtube` (reikia `yt-dlp`) — kadrai `turinys/sena/scenos/yt-*/` (gitignore), tada rinkinį galima pildyti toliau.

## TVS

| Komponentas | Būsena | Epizodų | Žymos kortelėse | Epizodai |
|---|---|---|---|---|
| Turinio redaktoriaus įrankių juosta | ✅ `tvs-cke`, `tvs-cke-top`, `tvs-cke-row`, `tvs-cke-g`, `tvs-cke-b` (`is-on` / `is-off` / `is-hover` / `is-label` / `is-arrow`), `tvs-cke-i is-*` (44 ikonos), `tvs-cke-sep`, `tvs-cke-combo`, `tvs-cke-body`, `tvs-cke-sel`, `tvs-cke-bot` — lenta `04`; kadrai 799 (15,6 s), 800 (22,7 s), `assets/iklijuotas-redaktorius-juosta.png` (dabartinė TVS rodo „Format“, ne „Normal“) | 12 | redaktoriaus įrankių juosta su stiliaus laukeliu; teksto redaktoriaus įrankių juosta; turinio redaktoriaus juosta | ep_658_05_1, ep_691_04_1, ep_692_04_1, ep_694_03_1, ep_694_04_1, ep_695_10_1, ep_695_11_1, ep_695_12_1, ep_905_03_1, ep_905_04_1, ep_909_02_1, ep_909_03_1 |
| Jungiklis „Yes / No“ | ✅ `tvs-switch.is-yes` / `.is-no` — lenta `05`; kadrai 821 (3,6 s, 14,2 s), 854 (8,4 s) | 6 | „Yes“ / „No“ jungiklis | ep_694_06_1, ep_695_08_1, ep_695_13_1, ep_695_15_1, ep_905_04_1, ep_907_03_1 |
| Datos laukas ir kalendorius | laukas ✅ `tvs-date`, `tvs-date-x`, `tvs-date-v`, `tvs-date-tz` — lenta `05`, kadras 816 (16 s); iškrentantis kalendorius — ieškota kadruose 2026-11-01, nerasta | 6 | datos ir laiko laukas; datos pasirinkimo kalendorius; datos pasirinkimo laukas | ep_695_03_1, ep_700_08_1, ep_701_07_1, ep_702_04_1, ep_703_03_1, ep_908_03_1 |
| Pasirinkimo laukas (select) ir žymos | ✅ `tvs-select` (`is-open`), `tvs-select-list`, `tvs-select-opt.is-hl`; `tvs-tags`, `tvs-chip`, `tvs-chip-x` — lenta `05`; kadrai 821 (14,2 s), `media/824`, 816 (16 s) | 5 | išskleidžiamas kategorijų sąrašas; kategorijos pasirinkimo laukas; kategorijų žymos lauke su kryžiuku; reikšmių pasirinkimo sąrašas; žymos ženklelis lauke | ep_683_03_1, ep_690_01_1, ep_690_03_1, ep_695_06_1, ep_695_07_1 |
| Modalinis langas su pasirinkimais | tvs-modal + tvs-opt ✅ | 4 | modalinis langas su pasirinkimu (Page / URL); tipo pasirinkimo langas su sąrašu | ep_1621_06_1, ep_693_01_2, ep_705_04_1, ep_705_05_2 |
| Failų įkėlimas | ✅ „Select File“ / „Upload“ (`tvs-btn.is-tiny`), failo eilutė `tvs-frow`, `tvs-fico`, `tvs-fmeta`, `tvs-fname`, `tvs-fpath`; įkėlimo langas `tvs-dz` (`is-drag`), `tvs-up-th`, `tvs-up-row`, `tvs-badge` — lentos `06`, `07`; kadrai 816 (16 s), 878 (7,8 s, 10,1 s) | 4 | failo įkėlimo laukas (Select File / Upload); failų numetimo langas; įkėlimo langas su punktyriniu lauku; įkėlimo lango lentelė | ep_691_02_1, ep_691_02_2, ep_695_16_1, ep_706_08_2 |
| Nuorodų medis (rankenėlė, žymeklis, išorinė nuoroda) | tvs-node.is-l2 — puslapių medžio kadro nėra / tvs-node.is-l2 ✅ (patikrinti kategorijų medžio kadrą) / tvs-tree / tvs-node / tvs-ext ✅ | 3 | kategorijų medis su įtrauka; puslapių medis su polapiais; raudona išorinės nuorodos strėlytės ikonėlė | ep_667_02_1, ep_683_02_1, ep_705_03_1 |
| Sėkmės juosta | tvs-alert ✅ (buvo) | 3 | žalia sėkmės juosta; žalia sėkmės juosta virš sąrašo | ep_690_02_1, ep_692_04_2, ep_704_04_2 |
| Formos skirtukai | tvs-tabs ✅ | 3 | formos skirtukai; formos skirtukai (Pagrindinis / Parinktys) | ep_691_03_1, ep_693_03_1, ep_705_07_1 |
| Paveikslėlio laukas ir apkirpimas | galerijos eilutė ✅ `tvs-frow.is-alt`, `tvs-thumb` (siluetas), `tvs-badge`, `tvs-move` — lenta `06`, kadras 878 (0,5 s); apkirpimo lango nė viename įraše nėra ([UI: ?]) | 3 | galerijos eilutė su miniatiūra; kadruotės rėmelis virš nuotraukos; nuotraukos apkirpimo sritis su rėmeliu | ep_692_04_2, ep_695_09_1, ep_704_01_1 |
| Modalinis langas su laukais | tvs-modal + tvs-field + select — reikia kadrų / tvs-modal + tvs-field — kadro nėra | 3 | nuorodos nustatymų langas; nustatymų langas su išskleidžiamu lauku | ep_1585_03_1, ep_1585_03_2, ep_699_10_1 |
| Paieškos išskleidžiamas sąrašas | tvs-dropdown ✅ | 3 | paieškos išskleidžiamas sąrašas su grupės antrašte; paieškos pasiūlymų iškrentantis sąrašas; viršutinės paieškos iškrentantis modulių sąrašas | ep_658_06_2, ep_702_02_1, ep_705_05_4 |
| Kartotinio bloko juosta | ✅ `tvs-rep`, `tvs-rep-bar`, `tvs-rep-body` — lenta `10`, kadras 880 (16,9 s) | 2 | kartotinio bloko juosta | ep_1621_06_2, ep_1621_06_3 |
| Pasirinkimo langas „Choose an entry.“ | tvs-modal + tvs-table ✅ | 2 | modalinis sąrašo langas su paieška | ep_694_05_1, ep_695_04_1 |
| Audito juosta | reikia kadrų | 1 | audito įrankio rinkinių juosta | ep_688_11_1 |
| Eilutės žymėjimo langelis | tvs-check ✅ (buvo) | 1 | eilutės žymėjimo langelis | ep_695_01_2 |
| Darbalaukio modulių sąrašas | tvs-dash ✅ | 1 | darbalaukio modulių plytelės | ep_702_02_2 |
| Išskleista šoninė juosta | tvs-side.is-expanded ✅ | 1 | išskleista šoninė juosta (ikona + užrašas) | ep_705_05_4 |
| Turinio redaktoriaus kontekstinis meniu | reikia kadrų | 1 | kontekstinis meniu su submeniu | ep_1585_02_1 |

## Svetainė

| Komponentas | Būsena | Epizodų | Žymos kortelėse | Epizodai |
|---|---|---|---|---|
| Slapukų juosta ir nustatymai | ✅ mygtukai `tvs-cookie-btns`, `tvs-cookie-btn` (`is-outline`); nustatymai — radijo mygtukai `tvs-cookie-q`, `tvs-radio` (`is-on`) — lenta `08`; `assets/slapukai-mygtukai.png`, `slapukai-nustatymai.png`. Pačios juostos (fono, teksto) kadro nėra — piešti tik mygtukus | 3 | slapukų jungikliai; slapukų juosta | ep_1765_04_1, ep_1765_04_2, ep_1765_04_3 |
| Pranešimų juostelė | ✅ `tvs-note-bar`, `tvs-note-x` (spalva — mokyklos temos, `--tvs-site-note`) — lenta `09`, `media/923-Pranesimo-juosteles-frontas.jpg` | 2 | svetainės pranešimų juostelė; svetainės pranešimų juostelė su uždarymo kryželiu | ep_684_08_1, ep_702_01_1 |
| Redagavimo pieštukas svetainėje | ✅ prie vardo / antraštės `tvs-edit-pen` — lenta `10`, kadras 847 (1 s); dokumentų lentelėje — `tvs-sdocs` stulpelis, lenta `09`, `media/885` | 2 | pieštuko ikona prie antraštės svetainėje; pieštuko ikona prie vardo svetainėje | ep_693_04_1, ep_706_01_1 |
| Poraštė | ✅ `tvs-sfoot`, `tvs-sfoot-cols`, `tvs-sfoot-col`, `tvs-sfoot-h`, `tvs-sfoot-btn`, `tvs-social`, `tvs-crest`, `tvs-sfoot-bot`, `tvs-sfoot-up` — lenta `08`, `assets/slapukai-poraste.png` (herbas — neutralus skydas, duomenys demo) | 1 | svetainės poraštė | ep_1765_04_4 |
| Svetainės dokumentų lentelė su metų grupėmis | ✅ `tvs-sdocs`, `tvs-sdocs-th`, `tvs-sdocs-tr` (`is-group`) — lenta `09`; `media/885` (pieštukas), `media/887` (grupės eilutė „Tvarkos“; metų grupė — ta pati eilutė). Antraštės spalva — temos (`--tvs-site-th`) | 1 | svetainės dokumentų lentelė su metų grupėmis | ep_690_03_2 |
| Svetainės subpuslapių sąrašas | reikia kadrų | 1 | svetainės subpuslapių sąrašas | ep_693_04_4 |
| Svetainės naujienos turinys su paveikslėliais | reikia kadrų | 1 | svetainės naujienos turinys su paveikslėliais | ep_692_04_3 |
| Video grotuvo blokas | ✅ `tvs-player`, `tvs-player-play`, `tvs-player-bar`, `tvs-player-track`, `tvs-player-vol` — lenta `10`, kadras 880 (16,9 s, TVS formoje) | 1 | video grotuvo blokas | ep_691_03_1 |
| Svetainės įrašas su grotuvu | reikia kadrų | 1 | svetainės įrašas su grotuvu | ep_691_04_2 |
| Svetainės naujienų kortelė | reikia kadrų | 1 | svetainės naujienų kortelė | ep_695_04_2 |
| Vaizdo grotuvo peržiūra | kadras yra: 878 (26,9–30,9 s, naršyklės grotuvas su mp4) — dar nepieštas | 1 | vaizdo grotuvo peržiūra | ep_695_14_1 |
| Svetainės straipsnio antraštė su autoriaus vardu | reikia kadrų | 1 | svetainės straipsnio antraštė su autoriaus vardu | ep_704_02_1 |
| Autoriaus puslapio naujienų tinklelis | reikia kadrų | 1 | autoriaus puslapio naujienų tinklelis | ep_704_02_1 |
| Svetainės šoninė juosta su laikrodžio papildiniu | reikia kadrų | 1 | svetainės šoninė juosta su laikrodžio papildiniu | ep_703_01_1 |
| Svetainės profilio kortelė (nuotrauka, pareigos, dokumentai, darbo laiko lentelė) | ✅ `tvs-sprof`, `tvs-sprof-photo` (siluetas), `tvs-sprof-name`, `tvs-sprof-pos`, `tvs-sprof-sec`, `tvs-sprof-doc`, `tvs-sprof-tab`, `tvs-sprof-tr` — lenta `10`, kadras 845 (3 s) | 1 | svetainės profilio kortelė (nuotrauka, pareigos, dokumentai, darbo laiko lentelė) | ep_706_04_1 |
| Žymų juosta | kadro nėra | 1 | žymų juosta svetainėje | ep_1472_06_1 |

## Naršyklė / OS

| Komponentas | Būsena | Epizodų | Žymos kortelėse | Epizodai |
|---|---|---|---|---|
| Naršyklės adreso juosta | ✅ `tvs-chrome`, `tvs-omni` (`.is-dim`, `.is-mark` — pažymėta kelio dalis) — lenta `09`, kadras 878 (28 s; Chrome 2022, be skirtukų eilės) | 6 | naršyklės adreso juosta; naršyklės adreso juosta su paryškinta dalimi; naršyklės adreso juosta su pažymėta kelio dalimi; naršyklės adreso juosta su puslapio numeriu | ep_1765_03_1, ep_691_02_3, ep_693_04_3, ep_700_09_1, ep_706_06_1, ep_906_01_1 |
| Naršyklės meniu | kadro nėra | 1 | naršyklės meniu | ep_1765_04_1 |
| Kompiuterio failų pasirinkimo langas | reikia kadrų | 1 | kompiuterio failų pasirinkimo langas | ep_692_01_1 |
| Naršyklės išsaugojimo langas | reikia kadrų | 1 | naršyklės išsaugojimo langas | ep_692_01_2 |
| Išpakavimo langas su aplankų medžiu | reikia kadrų | 1 | išpakavimo langas su aplankų medžiu | ep_692_02_1 |

## Google Sheets

| Komponentas | Būsena | Epizodų | Žymos kortelėse | Epizodai |
|---|---|---|---|---|
| Prieigos prašymo kortelė | reikia kadrų | 2 | prieigos prašymo kortelė | ep_1654_05_1, ep_1845_02_1 |
| Bendrinimo langas | reikia kadrų | 1 | bendrinimo langas | ep_1845_02_2 |
| Lapų juosta su skirtukais | reikia kadrų | 1 | lapų juosta su skirtukais | ep_1845_05_1 |
| Lapų juosta su slinkties rodyklėmis | reikia kadrų | 1 | lapų juosta su slinkties rodyklėmis | ep_1845_05_2 |
| Iškrentantis lapų sąrašas | reikia kadrų | 1 | iškrentantis lapų sąrašas | ep_1845_05_3 |
| Redaguojamas lapo skirtukas | reikia kadrų | 1 | redaguojamas lapo skirtukas | ep_1845_06_1 |
| Lapo kontekstinis meniu | reikia kadrų | 1 | lapo kontekstinis meniu | ep_1845_06_2 |
| Formulės juosta su dviem eilutėmis | reikia kadrų | 1 | formulės juosta su dviem eilutėmis | ep_1845_10_1 |
| Iškrentantis meniu „Formatas“ | reikia kadrų | 1 | iškrentantis meniu „Formatas“ | ep_1845_12_1 |
| Įrankių juostos spalvos ir volelio ženklai | reikia kadrų | 1 | įrankių juostos spalvos ir volelio ženklai | ep_1845_12_2 |

## Išorinė

| Komponentas | Būsena | Epizodų | Žymos kortelėse | Epizodai |
|---|---|---|---|---|
| Fontawesome paieška ir ikonos langas | schema — laukia sprendimo B (versija) | 2 | Fontawesome ikonų tinklelis; ikonos langas su stiliaus pasirinkimu | ep_693_03_2, ep_705_07_2 |
| iLovePDF puslapis (schema) | reikia kadrų | 2 | ilovepdf.com pasirinkimų skydelis; ilovepdf.com puslapis su raudonu mygtuku | ep_692_01_1, ep_692_01_2 |

## Bendri

| Komponentas | Būsena | Epizodų | Žymos kortelėse | Epizodai |
|---|---|---|---|---|
| Kodo eilutė / klavišų užrašas | — | 3 | klavišų užrašas ekrano apačioje; kodo eilutė su paryškinta dalimi | ep_700_02_1, ep_700_03_1, ep_706_03_1 |

Komponentų: TVS 19, Svetainė 16, Naršyklė / OS 5, Google Sheets 10, Išorinė 2, Bendri 1 — iš viso 53.

## Pridėta 2026-10-31 be atskiros žymos (reikėjo „Navigacijų valdymo“ eskizams)

| Komponentas | Klasės | Šaltinis |
|---|---|---|
| Formos laukas: pavadinimas, „*“, pagalbinis tekstas | `tvs-form`, `tvs-field`, `tvs-label`, `tvs-req`, `tvs-help` | kadrai 831, 834 sc06/sc09 |
| Pasirinktas įrašas su „Šalinti“ | `tvs-picked`, `tvs-path`, `tvs-btn.is-pink` | kadras 831, 835 sc09 |
| Formos apačia („Atnaujinti“ … „Atšaukti“) | `tvs-form-foot` | kadrai 831, 833 sc05 |
| Lentelė „Vardas · Aprašymas“ | `tvs-table.is-menu`, `tvs-desc` | kadrai 826, 834 sc04 |
| Viršutinė paieška su tekstu | `tvs-searchbar.is-text`, `tvs-caret` | kadras 826 |
| Svetainės juodasis meniu | `tvs-site-menu` | 834 sc10 (be nuotraukų, demo punktai) |

Spalvos išmatuotos iš kadrų pikselių — žr. `tokens/tvs.css` bloką „2026-10-31“. Lentos: `templates/01-navigacija.html`, `02-formos.html`, `03-grupes-ir-pasirinkimas.html`; regresija — `00-komponentai` ir `dokumento-perkelimas-i-virsu` pikselis į pikselį nepakito.

## Pridėta 2026-11-01 (ieškota visuose `turinys/sena/scenos/*` ir `media/`)

Lentos: `templates/04-redaktorius.html`, `05-jungiklis-ir-laukai.html`, `06-failas-ir-galerija.html`, `07-ikelimo-langas.html`, `08-svetaine-slapukai-ir-poraste.html`, `09-svetaine-ir-narsykle.html`, `10-blokas-video-profilis.html`. Spalvos ir dydžiai — `tokens/tvs.css` blokas „2026-11-01“.

- Redaktoriaus ikonos piešiamos kaukėmis: `<span class="tvs-cke-b"><i class="tvs-cke-i is-bold"></i></span>`; visi pavadinimai — `tokens/tvs.css` gale (CKEditor komandų vardai: `is-source`, `is-cut`, … `is-capitalize`).
- Svetainės komponentų šriftas — `--tvs-site-font` (Roboto, kaip svetainėje); temos spalvos (`--tvs-site-note`, `--tvs-site-th`, `--tvs-site-link`) keičiamos pagal mokyklą.
- Nuotraukos kadruose — tikri žmonės, todėl rinkinyje tik siluetai (`tvs-thumb`, `tvs-sprof-photo`); vardai demo.
- Regresija: `00–03` ir `dokumento-perkelimas-i-virsu` (bei visos kitos pamokos, kurios krauna `tvs.css`) — pikselis į pikselį nepakito.
