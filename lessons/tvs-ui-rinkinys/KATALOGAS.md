# TVS UI rinkinio katalogas — ko trūksta explaineriams

Sugeneruota 2026-10-31 iš platformos epizodų kortelių (`tvs_ui` žymos „naujas: …“). 83 skirtingos žymos sujungtos į komponentus.
Būsena: ✅ — yra `tokens/tvs.css` ir rinkinio lentose `templates/01–03`; **reikia kadrų** — senuose įrašuose yra, bet repozitorijoje tik kontaktų lapas (480 px), per smulku tiksliai nupiešti; **kadro nėra** — nė viename įraše nematyti, piešti tik pagal tikrą TVS / svetainę.

**Kaip gauti kadrus (Mac, platformos repo):** `python3 scripts/sena-scenos.py --youtube` (reikia `yt-dlp`) — kadrai `turinys/sena/scenos/yt-*/` (gitignore), tada rinkinį galima pildyti toliau.

## TVS

| Komponentas | Būsena | Epizodų | Žymos kortelėse | Epizodai |
|---|---|---|---|---|
| Turinio redaktoriaus įrankių juosta | kadrai yra (pilna raiška): platformos `turinys/sena/scenos/799/sc08_015.6.jpg`, `800/sc07_022.7.jpg` | 12 | redaktoriaus įrankių juosta su stiliaus laukeliu; teksto redaktoriaus įrankių juosta; turinio redaktoriaus juosta | ep_658_05_1, ep_691_04_1, ep_692_04_1, ep_694_03_1, ep_694_04_1, ep_695_10_1, ep_695_11_1, ep_695_12_1, ep_905_03_1, ep_905_04_1, ep_909_02_1, ep_909_03_1 |
| Jungiklis „Yes / No“ | kadrai yra (pilna raiška): `turinys/sena/scenos/821/sc02_003.6.jpg` (Yes / No), `854/sc04_008.4.jpg` | 6 | „Yes“ / „No“ jungiklis | ep_694_06_1, ep_695_08_1, ep_695_13_1, ep_695_15_1, ep_905_04_1, ep_907_03_1 |
| Datos laukas ir kalendorius | reikia kadrų | 6 | datos ir laiko laukas; datos pasirinkimo kalendorius; datos pasirinkimo laukas | ep_695_03_1, ep_700_08_1, ep_701_07_1, ep_702_04_1, ep_703_03_1, ep_908_03_1 |
| Pasirinkimo laukas (select) ir žymos | kadrai yra: select — `media/824-pamoku_laikas_03.png`, `821/sc05_014.2.jpg`; žymos su × — `816/sc03_016.0.jpg` | 5 | išskleidžiamas kategorijų sąrašas; kategorijos pasirinkimo laukas; kategorijų žymos lauke su kryžiuku; reikšmių pasirinkimo sąrašas; žymos ženklelis lauke | ep_683_03_1, ep_690_01_1, ep_690_03_1, ep_695_06_1, ep_695_07_1 |
| Modalinis langas su pasirinkimais | tvs-modal + tvs-opt ✅ | 4 | modalinis langas su pasirinkimu (Page / URL); tipo pasirinkimo langas su sąrašu | ep_1621_06_1, ep_693_01_2, ep_705_04_1, ep_705_05_2 |
| Failų įkėlimas | reikia kadrų | 4 | failo įkėlimo laukas (Select File / Upload); failų numetimo langas; įkėlimo langas su punktyriniu lauku; įkėlimo lango lentelė | ep_691_02_1, ep_691_02_2, ep_695_16_1, ep_706_08_2 |
| Nuorodų medis (rankenėlė, žymeklis, išorinė nuoroda) | tvs-node.is-l2 — puslapių medžio kadro nėra / tvs-node.is-l2 ✅ (patikrinti kategorijų medžio kadrą) / tvs-tree / tvs-node / tvs-ext ✅ | 3 | kategorijų medis su įtrauka; puslapių medis su polapiais; raudona išorinės nuorodos strėlytės ikonėlė | ep_667_02_1, ep_683_02_1, ep_705_03_1 |
| Sėkmės juosta | tvs-alert ✅ (buvo) | 3 | žalia sėkmės juosta; žalia sėkmės juosta virš sąrašo | ep_690_02_1, ep_692_04_2, ep_704_04_2 |
| Formos skirtukai | tvs-tabs ✅ | 3 | formos skirtukai; formos skirtukai (Pagrindinis / Parinktys) | ep_691_03_1, ep_693_03_1, ep_705_07_1 |
| Paveikslėlio laukas ir apkirpimas | apkirpimo lango nė viename įraše nėra ([UI: ?]) / reikia kadrų | 3 | galerijos eilutė su miniatiūra; kadruotės rėmelis virš nuotraukos; nuotraukos apkirpimo sritis su rėmeliu | ep_692_04_2, ep_695_09_1, ep_704_01_1 |
| Modalinis langas su laukais | tvs-modal + tvs-field + select — reikia kadrų / tvs-modal + tvs-field — kadro nėra | 3 | nuorodos nustatymų langas; nustatymų langas su išskleidžiamu lauku | ep_1585_03_1, ep_1585_03_2, ep_699_10_1 |
| Paieškos išskleidžiamas sąrašas | tvs-dropdown ✅ | 3 | paieškos išskleidžiamas sąrašas su grupės antrašte; paieškos pasiūlymų iškrentantis sąrašas; viršutinės paieškos iškrentantis modulių sąrašas | ep_658_06_2, ep_702_02_1, ep_705_05_4 |
| Kartotinio bloko juosta | reikia kadrų | 2 | kartotinio bloko juosta | ep_1621_06_2, ep_1621_06_3 |
| Pasirinkimo langas „Choose an entry.“ | tvs-modal + tvs-table ✅ | 2 | modalinis sąrašo langas su paieška | ep_694_05_1, ep_695_04_1 |
| Audito juosta | reikia kadrų | 1 | audito įrankio rinkinių juosta | ep_688_11_1 |
| Eilutės žymėjimo langelis | tvs-check ✅ (buvo) | 1 | eilutės žymėjimo langelis | ep_695_01_2 |
| Darbalaukio modulių sąrašas | tvs-dash ✅ | 1 | darbalaukio modulių plytelės | ep_702_02_2 |
| Išskleista šoninė juosta | tvs-side.is-expanded ✅ | 1 | išskleista šoninė juosta (ikona + užrašas) | ep_705_05_4 |
| Turinio redaktoriaus kontekstinis meniu | reikia kadrų | 1 | kontekstinis meniu su submeniu | ep_1585_02_1 |

## Svetainė

| Komponentas | Būsena | Epizodų | Žymos kortelėse | Epizodai |
|---|---|---|---|---|
| Slapukų juosta ir nustatymai | kadro nėra | 3 | slapukų jungikliai; slapukų juosta | ep_1765_04_1, ep_1765_04_2, ep_1765_04_3 |
| Pranešimų juostelė | reikia kadrų | 2 | svetainės pranešimų juostelė; svetainės pranešimų juostelė su uždarymo kryželiu | ep_684_08_1, ep_702_01_1 |
| Redagavimo pieštukas svetainėje | reikia kadrų | 2 | pieštuko ikona prie antraštės svetainėje; pieštuko ikona prie vardo svetainėje | ep_693_04_1, ep_706_01_1 |
| Poraštė | kadro nėra | 1 | svetainės poraštė | ep_1765_04_4 |
| Svetainės dokumentų lentelė su metų grupėmis | reikia kadrų | 1 | svetainės dokumentų lentelė su metų grupėmis | ep_690_03_2 |
| Svetainės subpuslapių sąrašas | reikia kadrų | 1 | svetainės subpuslapių sąrašas | ep_693_04_4 |
| Svetainės naujienos turinys su paveikslėliais | reikia kadrų | 1 | svetainės naujienos turinys su paveikslėliais | ep_692_04_3 |
| Video grotuvo blokas | reikia kadrų | 1 | video grotuvo blokas | ep_691_03_1 |
| Svetainės įrašas su grotuvu | reikia kadrų | 1 | svetainės įrašas su grotuvu | ep_691_04_2 |
| Svetainės naujienų kortelė | reikia kadrų | 1 | svetainės naujienų kortelė | ep_695_04_2 |
| Vaizdo grotuvo peržiūra | reikia kadrų | 1 | vaizdo grotuvo peržiūra | ep_695_14_1 |
| Svetainės straipsnio antraštė su autoriaus vardu | reikia kadrų | 1 | svetainės straipsnio antraštė su autoriaus vardu | ep_704_02_1 |
| Autoriaus puslapio naujienų tinklelis | reikia kadrų | 1 | autoriaus puslapio naujienų tinklelis | ep_704_02_1 |
| Svetainės šoninė juosta su laikrodžio papildiniu | reikia kadrų | 1 | svetainės šoninė juosta su laikrodžio papildiniu | ep_703_01_1 |
| Svetainės profilio kortelė (nuotrauka, pareigos, dokumentai, darbo laiko lentelė) | reikia kadrų | 1 | svetainės profilio kortelė (nuotrauka, pareigos, dokumentai, darbo laiko lentelė) | ep_706_04_1 |
| Žymų juosta | kadro nėra | 1 | žymų juosta svetainėje | ep_1472_06_1 |

## Naršyklė / OS

| Komponentas | Būsena | Epizodų | Žymos kortelėse | Epizodai |
|---|---|---|---|---|
| Naršyklės adreso juosta | reikia kadrų | 6 | naršyklės adreso juosta; naršyklės adreso juosta su paryškinta dalimi; naršyklės adreso juosta su pažymėta kelio dalimi; naršyklės adreso juosta su puslapio numeriu | ep_1765_03_1, ep_691_02_3, ep_693_04_3, ep_700_09_1, ep_706_06_1, ep_906_01_1 |
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
