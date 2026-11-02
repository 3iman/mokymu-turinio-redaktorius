# Koncepto eskizai — „Navigacijų valdymas“ (13 filmų)

Redaktoriaus CLAUDE.md §8 (a): tekstinis eskizas → Eimanto „gerai“ → tik tada HTML / PNG / klipas.
Šaltiniai: `video/scenarijus-lt.md`, senų įrašų kadrai `nuorodos/` ir platformos `turinys/sena/scenos/833, 834, 835`,
`EIMANTO_PASTABOS.md` 2026-09-16 („kur spausti“ stilius), `ANIMATION_PRINCIPLES.md` § „Fokusas“, § „Tyla kadre“.

| Kadras | Filmas | Būsena |
|---|---|---|
| 1–4, 8–13 | dešimt filmų | ✅ PATVIRTINTA — Eimantas 2026-10-31: „gerai, eskizai tinka“; FA 5 |
| 5, 6, 7 | bandomieji | ✅ PATVIRTINTA — Eimantas 2026-10-31: „gerai, eskizai tinka“ |

---
> **Laikai perskaičiuoti 2026-10-31** pagal išmatuotą Dariaus tempą (`scripts/laikai-telpa.py`, 12,7 ženklo/s): sakinys turi baigtis prieš kitą žymą — kitaip `generate-voice.js` sustoja su kodu 2. Tekstai ir veiksmų tvarka nepakito; garsai paslinkti kartu su savo balso užuomina.

## Bendra visiems filmams

**Stilius — atpažįstama TVS, ne nuotrauka** (Eimantas 2026-09-16): tikros spalvos, išdėstymas ir pavadinimai, be smulkmenų.

| Elementas | Kaip piešiama |
|---|---|
| Rėmas | `tvs-window`: tamsi šoninė juosta `#252525` (70 px, tik ikonos), baltas viršus 70 px (`tvs-burger` + `tvs-searchbar` „Type to search…“), fonas `#f1f1f1`. Viršuje dešinėje — **be vartotojo avataro** (sename įraše buvo tikro žmogaus nuotrauka) |
| Mygtukai | žalias `#47d165` („Naujas meniu“, „Naujas linkas“, „Pažymėti“, „Išsaugoti“), oranžinis `#ff754b` („Redaguoti“), mėlynas „Linkai“ — atspalvį imti iš nuorodos kadro `klik02` (senos TVS žydras) |
| Eilutės | `tvs-row`, skirtukai `#eceeef`, tekstas `#373a3c`, sisteminis šriftas; medžio eilutėse — rankenėlė `≡` ir pilkas žymeklis „Page“ / „URL“ |
| Kursorius | `tvs-cursor` rodyklė; spustelėjimas — `tvs-ripple` (vienas trumpas ratilas), sutampa su garsu „spustelejimas“ |
| Fokusas | spotlight: viskas, kas ne apie šį žingsnį, pritemsta ~60 %, šviesi tik veikiama vieta su plonu mėlynu kraštu; šviesa **slenka** (~0,5 s) į kitą vietą, ne užgęsta |
| Kamera | švelnus priartinimas (scale 1 → ~1,35) prie veikiamos srities, kai ekrano elementai smulkūs; vienu metu juda ≤ 2–3 elementai; `--ease-spring` |
| Užrašai ekrane | tik TVS užrašai (originalo kalba). **Balso teksto ekrane nėra** (pertekliaus principas); subtitrai — atskiras `.vtt` |
| Pabaiga | paskutinė sekundė — ramus rezultatas be fokuso (tai ir viršelis `.jpg`) |
| Demo duomenys | jokių tikrų mokyklų, adresų ir žmonių: senuose įrašuose matoma reali mokykla, tikras dienyno adresas ir mokinių nuotrauka — piešiama „Demo mokykla“, `dienynas.demo.lt`, svetainės vaizde vietoje nuotraukos — neutralus spalvų laukas |
| Formos laukai | kaip tikroje TVS (kadrai 831, 834): pavadinimas paryškintas, privalomas — raudona `*`, po juo pilkas pagalbinis tekstas, tada laukas; laukai atskirti plona linija; apačioje balta juosta su žaliais „Atnaujinti“ / „Išsaugoti ir išeiti“ (redaguojant) arba „Išsaugoti“ / „Išsaugoti ir kurti kitą“ (kuriant) ir pilku „Atšaukti“ dešinėje |

---

## Kadras 1 — „Grupės jau sukurtos“ (`ep_705_01_1`, 13 s)

**Viena žinutė:** navigacijos grupės jau sukurtos, o aprašymas pasako, kur kiekviena rodoma — jums lieka pasirinkti.

**Ekranai:**
1. **Grupių sąrašas „Meniu“ (`tvs-window` su antriniu meniu „Meniu“ / „Linkai“, kelias „Navigacijų modulis / Meniu“): žalias „Naujas meniu“, paieška „Paieška“ + žalias „Filtruoti“ + pilkas „Valyti“, skirtukai „Visi“ / „Šiukšlės“, lentelė „Vardas · Aprašymas“**. 6 eilutės iš kadro 826: „4 ikonos“ — „Navigacijos ant titulinės nuotraukos“, „Black“ — „Navigacijos su ikonėlėmis, šone po pagrindine nuotrauka ir jos navigacija“, „Footer 1“ — „Pirmoji navigacija apačioje iš kairės“, „Footer 2“ — „Antroji navigacija apačioje iš kairės“, „Main“ — „Pagrindinė navigacija spalvotoje juostoje su subnavigacijomis“, „Mobile“ — „Atskirai kuriama navigacija mobiliame telefone esančioje "hamburger" tipo navigacijoje“. Eilutė „404“ (be aprašymo) nepiešiama. Kiekvienoje — oranžinis „Redaguoti“ ir žydras „Linkai“.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | grupių sąrašas, fokusas ant stulpelio „Vardas“ | — |
| 1,2 | fokusas slenka žemyn per vardus „4 ikonos“ → „Black“ → „Footer 1“ → „Main“ (~0,6 s kiekvienam) | „Navigacijų sąraše grupės jau sukurtos.“ |
| 4,4 | fokusas praplatėja į stulpelį „Aprašymas“; aprašymai šviesėja eilė po eilės iš viršaus | „Prie kiekvienos matote aprašymą, kurioje vietoje ji rodoma.“ |
| 9,2 | kursorius užeina ant eilutės „Main“ (eilutė pašviesėja, `is-hover`), nespaudžia | „Jums belieka pasirinkti reikiamą.“ |
| 10,8–13 | ramus sąrašas (viršelis) | — |

Kortelėje pataisyta: išimtas spustelėjimas 8,6 s — jis neturėjo nei taikinio, nei rezultato (atidarymas rodomas kadre 6).

---

## Kadras 2 — „Sukuriate naują grupę“ (`ep_705_02_1`, 14 s)

**Viena žinutė:** naują grupę sukuriate per „Naujas meniu“: įrašote vardą, „Slug“ užsipildo pats, išsaugote.

**Ekranai:**
1. **Grupių sąrašas „Meniu“ (`tvs-window` su antriniu meniu „Meniu“ / „Linkai“, kelias „Navigacijų modulis / Meniu“): žalias „Naujas meniu“, paieška „Paieška“ + žalias „Filtruoti“ + pilkas „Valyti“, skirtukai „Visi“ / „Šiukšlės“, lentelė „Vardas · Aprašymas“** — kaip kadre 1, fokusas ant „Naujas meniu“.
2. **Grupės forma** (kelias „… / Meniu / Sukurti“): laukai „Vardas *“, „Slug *“, „Aprašymas“ (patikrinta skeleton 2026-10-18); apačioje „Išsaugoti“, „Išsaugoti ir kurti kitą“, „Atšaukti“.
3. Po išsaugojimo — grupių sąrašas su nauja eilute „Pagalba mokiniams“ (būsena „nauja“).

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | grupių sąrašas, fokusas ant „Naujas meniu“ | — |
| 1,4 | kursorius prie „Naujas meniu“ | „Naują grupę pradedate mygtuku „Naujas meniu“.“ |
| 2,6 | spustelėjimas → forma įslenka | spustelejimas |
| 5,1 | fokusas ant lauko „Vardas“ | „Lauke „Vardas“ įrašote grupės pavadinimą.“ |
| 6,5 | po raidę „Pagalba mokiniams“; lauke „Slug“ tuo pat metu atsiranda `pagalba-mokiniams` | rasymas |
| 8,5 | fokusas nuslenka į „Slug“, tada į „Išsaugoti“ | „Laukas „Slug“ užsipildo pats – patikrinate ir išsaugote.“ |
| 10,9 | spustelėjimas „Išsaugoti“ → sąrašas su nauja eilute | spustelejimas |
| 11,4 | trumpas žalias blyksnis naujai eilutei | patvirtinimas |
| 12,3–14 | ramus sąrašas (viršelis) | — |

Kortelėje pataisyta: pridėtas spustelėjimas „Išsaugoti“ (10,4 s) prieš „patvirtinimas“, filmas 12 → 13 s.
**Sprendimas A (Eimantas 2026-10-31):** „Slug“ — su brūkšneliu, `pagalba-mokiniams`.

---

## Kadras 3 — „Atpažįstate išorinę nuorodą“ (`ep_705_03_1`, 11 s)

**Viena žinutė:** raudona strėlytė prie nuorodos reiškia, kad ji veda už svetainės ribų.

**Ekranai:**
1. **Nuorodų medis** (kadras 828; kelias „Navigacijų modulis / Linkai“): žalias „Naujas linkas“; eilutės su pilka kvadratine rankenėle `≡`, pavadinimu ir mažu žymekliu „Page“ / „URL“: „Projektinė veikla · Page“, „El. paštas · URL“, „Dokumentai · URL“, „Biblioteka · Page“, „Youtube kanalas · URL“ + **rožinė strėlytė iš kvadrato** (naujas elementas), „Turinio auditas · Page“.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | medis matomas | — |
| 1,2 | kamera priartėja prie „Youtube kanalas“ (scale ~1,6), fokusas ant eilutės | „Prie nuorodos matote raudoną strėlytę.“ |
| 3,0–3,6 | strėlytė du kartus švelniai sumirksi (didėja 1 → 1,2 → 1) | — |
| 4,6 | fokusas susiaurėja iki strėlytės ir žymeklio „URL“ | „Ji reiškia išorinę nuorodą.“ |
| 7,0 | kamera atsitraukia; fokusas nuimamas | „Lankytoją ji išves už svetainės ribų.“ |
| 9,0–11 | ramus medis (viršelis) | — |

---

## Kadras 4 — „Pasirenkate nuorodos tipą“ (`ep_705_04_1`, 13 s)

> Eimantas 2026-11-03: 12 → 13 s — po paskutinio sakinio buvo likę 0,13 s, klipas baigėsi nukirstas; dabar ≥ 1 s ramybės. Judesys nekeistas.

**Viena žinutė:** kurdami nuorodą pirmiausia pasirenkate tipą: „Page“ — svetainės puslapis, „URL“ — išorinis adresas.

**Ekranai:**
1. **Langas „Kokio tipo linką norite sukurti?“** (kadras 829) virš pritemusio medžio: antraštė, `×` dešinėje, laukas „Paieška…“, du pasirinkimai — **„Page“** ir **„URL“** (pusjuodžiu); smulkūs angliški aprašai po jais nepiešiami.
2. Po spustelėjimo — **nuorodos forma „URL“**: „Title *“, „URL *“, „Description“ (kaip kadre 834 sc06).

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | langas matomas, fonas pritemęs | — |
| 1,2 | fokusas ant antraštės | „Kurdami nuorodą pirmiausia pasirenkate jos tipą.“ |
| 5,2 | fokusas nuslenka ant „Page“, kursorius ten | „„Page“ priskiria puslapį iš svetainės medžio.“ |
| 8,9 | fokusas nuslenka ant „URL“, kursorius ten | „„URL“ veda į išorinę nuorodą.“ |
| 10,3 | spustelėjimas „URL“ → langas užsidaro, atsiveria forma | spustelejimas |
| 10,9–12 | ramiai — forma su laukais „Title“, „URL“ (viršelis) | — |

Kortelėje pataisyta: išimti „šalia išnyrantys paaiškinimai“ — tą patį sako balsas (QA kriterijus K9 — perteklius); pabaiga — forma „URL“.

---

## Kadras 5 — „Kur rasti „Navigacijos““ ✅ (`ep_705_05_4`, 13 s)

**Viena žinutė:** į „Navigacijos“ patenkate trimis keliais — darbalaukis, kairysis meniu, paieška; greičiausia — paieška.
(Eimantas 2026-10-31: „Patekimas yra keliais būdais, tai abu ir rodome“, „Pridedame ir trečią kelią“.)

> **Pataisa (2026-10-31).** Ankstesnėje eskizo versijoje antras kelias buvo „☰ meniu“. Patikrinus senąjį įrašą (scena 1, `sc01_000.3.jpg` → `sc01_004.3.jpg`) — ten naudojama **paieška**: „Type to search…“ → „navi“ → grupė „Navigation“ → „Navigacijos“. Kairysis meniu — trečias kelias (Eimantas 2026-10-31: „vienu atveju per ikoną, kitu atveju per ikoną su label“): suskleistas rodo tik ikonas, išskleidus „☰“ — ikonas su užrašais.

**Ekranai (2):**
1. **Darbalaukis** („Darbalaukiai“ › „Įrankiai“) — dviejų stulpelių modulių sąrašas su ikonomis (6–8 eilutės, tarp jų „Puslapiai“, „Navigacijos“…). Dešinės valdiklių **nepiešti**. Kairėje — tamsi suskleista šoninė juosta (`tvs-side`, tik ikonos), viršuje — „☰“ ir paieškos laukas „Type to search…“. Ikona prie „Navigacijos“ — „≡“ (sąrašas), ta pati darbalaukyje ir meniu.
   **Išskleistas meniu** — ta pati juosta praplatėja, prie kiekvienos ikonos atsiranda užrašas; piešiamos 6–8 eilutės, tarp jų „Navigacijos“ (išdėstymą derinti su darbalaukio sąrašu `sc01_000.3.jpg`, kitų punktų užrašų nesugalvoti — tik tie, kurie matosi darbalaukyje). Naujas komponentas `tvs-ui-rinkinys`.
2. **Paieškos išskleidžiamas sąrašas** — po lauku, kuriame įrašyta „navi“: grupės antraštė „Navigation“, po ja punktai „Navigacijos“ ir „Links“ (naujas komponentas `tvs-ui-rinkinys`: sąrašas su grupės antrašte).

Pabaigoje (po spustelėjimo) trumpai parodomas grupių sąrašas — tai kadro 6 pradžia.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | darbalaukis matomas | — |
| 1,0 | fokusas ant „Navigacijos“ darbalaukio sąraše (kursorius **nespaudžia**) | „„Navigacijos“ rasite darbalaukyje.“ |
| 3,9 | fokusas nuslenka į suskleistą kairįjį meniu, ant ikonos „≡“; kursorius prie „☰“ | „Arba kairiajame meniu.“ |
| 4,7 | spustelėjimas „☰“ → juosta praplatėja (0,4 s), prie ikonos „≡“ atsiranda užrašas „Navigacijos“ — fokusas ant jo (nespaudžia) | spustelejimas |
| 6,3 | fokusas nuslenka į paieškos lauką viršuje; kursorius ten | „Greičiausia – paieškoje įrašyti „navi“.“ |
| 7,9 | lauke po raidę atsiranda „navi“; išsiskleidžia sąrašas „Navigation“ | rasymas |
| 9,6 | fokusas ant „Navigacijos“ sąraše; kursorius ten | „Ir pasirenkate „Navigacijos“.“ |
| 10,6 | spustelėjimas → grupių sąrašas įslenka iš dešinės | spustelejimas |
| 11,6–13 | ramus grupių sąrašas (viršelis) | — |

Iki galo nueinamas tik vienas kelias (paieška). Darbalaukis ir meniu parodomi fokusu; „☰“ spustelėjimas tik išskleidžia meniu, kad matytųsi ir ikona, ir ikona su užrašu. „☰“ ir „≡“ panašios — todėl fokusas pirmiausia ant „≡“ ikonos, o „☰“ – tik spaudžiamas.

---

## Kadras 6 — „Atidarote nuorodų medį“ ✅ (`ep_705_05_1`, 9 s)

**Viena žinutė:** per „Linkai“ prie grupės „Main“ atsiveria pagrindinės navigacijos medis.

**Ekranai (2):**
1. **Grupių sąrašas** — viršuje žalias „Naujas meniu“ (piešiamas, bet ne fokuse), lentelė „Vardas · Aprašymas“, 5 eilutės: „4 ikonos“, „Black“, „Footer 1“, **„Main“** („Pagrindinė navigacija spalvotoje juostoje su subnavigacijomis“), „Mobile“; kiekvienoje dešinėje oranžinis „Redaguoti“ ir mėlynas „Linkai“.
2. **Nuorodų medis „Main“** — viršuje žalias „Naujas linkas“; 6–7 eilutės su rankenėlėmis ir įtrauka: „Ugdymas“ → „Ugdymo organizavimas“…; „Pagalba mokiniams ir tėvams“ → „Socialinis pedagogas“, „Specialusis pedagogas“, „Karjeros specialistas“; žymekliai „Page“ / „URL“.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | grupių sąrašas (tęstinumas iš kadro 5), fokusas ant eilutės „Main“ | — |
| 1,0 | kursorius prie mėlyno „Linkai“ eilutėje „Main“ | „Prie grupės „Main“ spaudžiate „Linkai“.“ |
| 2,6 | spustelėjimas → medis įslenka; eilutės iš viršaus žemyn po vieną (0,15 s) | spustelejimas |
| 4,4 | fokusas nuimamas, matosi visas medis | „Atsiveria pagrindinės navigacijos medis.“ |
| 6,8–9 | ramus medis (viršelis) | — |

---

## Kadras 7 — „Puslapį pridedate į meniu“ ✅ (`ep_705_05_2`, 17 s)

**Viena žinutė:** puslapį į meniu pridedate kaip naują nuorodą — pasirenkate „Page“, susirandate puslapį ir išsaugote.

**Ekranai (4):** (užrašai iš scenų 3–6, `turinys/adaptuota/scenos/835.json`)
1. **Nuorodų medis „Main“** — kaip kadro 6 pabaigoje (tęstinumas).
2. **Langas „Kokio tipo linką norite sukurti?“** — du pasirinkimai „Page“ ir „URL“ (aprašų smulkiu šriftu nepiešti); fonas pritemęs.
3. **Nuorodos forma** — laukai „Title“ (lieka tuščias visą kadrą — nerašomas ir neužsipildo, meniu rodo priskirto puslapio pavadinimą; Eimantas 2026-11-02), **„Page“** su žaliu „Pažymėti“, „Description“; apačioje žali „Išsaugoti“ ir „Išsaugoti ir kurti kitą“, pilkas „Atšaukti“. Skirtukų „Pagrindinis / Parinktys“ — nepiešti.
   *Patikslinimas pagal kadrą 831 (2026-10-31, koncepcijos nekeičia):* po kiekvieno lauko pavadinimo — pilkas pagalbinis tekstas („Enter the link title.“, „Choose the page this link should point to.“); „Page“ pažymėtas raudona `*`; mygtukas „Pažymėti“ — mažas, žalias, su lupa. Pasirinktas puslapis rodomas pilka eilute „Logopedas  /logopedas“ su rožiniu „Šalinti“ dešinėje.
4. **Langas „Choose an entry.“** — paieškos laukas, žalias „Filtruoti“, lentelė „Pavadinimas · Kelias“; po įvedimo lieka viena eilutė **„Logopedas“** su žaliu „Pažymėti“.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | medis, fokusas ant „Naujas linkas“ | — |
| 1,6 | kursorius prie „Naujas linkas“ | „Nuorodų medyje spaudžiate „Naujas linkas“ ir pasirenkate „Page“.“ |
| 2,8 | spustelėjimas → langas su „Page“ / „URL“ | spustelejimas |
| 4,4 | spustelėjimas ant „Page“ → forma | spustelejimas |
| 5,0–5,8 | kamera priartėja prie lauko „Page“ | — |
| 6,8 | — | „Lauke „Page“ susirandate puslapį „Logopedas“.“ |
| 7,2 | spustelėjimas „Pažymėti“ → langas „Choose an entry.“ | spustelejimas |
| 7,9 | paieškoje rašoma „logo“, sąrašas susitraukia iki „Logopedas“ | rasymas |
| 9,1 | spustelėjimas „Pažymėti“ → forma, lauke „Page“ — „Logopedas“; „Title“ lieka tuščias | spustelejimas |
| 9,5–10,7 | kamera atsitraukia, fokusas ant „Išsaugoti“ | — |
| 10,9 | — | „Spaudžiate „Išsaugoti“ – nuoroda atsiranda medžio apačioje.“ |
| 12,3 | spustelėjimas → medis; nauja eilutė „Logopedas · Page“ apačioje (būsena „nauja“ iš `tvs-ui-rinkinys`) | spustelejimas |
| 13,7 | trumpas žalias blyksnis naujai eilutei | patvirtinimas |
| 14,6–17 | ramus medis su nauja eilute (viršelis) | — |

Kalbos dalis ~70 %, ilgiausia tyla 1,6 s.

---

## Kadras 8 — „Meniu vardas gali skirtis“ (`ep_705_06_1`, 13 s)

**Viena žinutė:** meniu pavadinimas („Title“) ir priskirto puslapio pavadinimas gali skirtis — meniu lieka trumpas.

**Ekranai:**
1. **Nuorodos redagavimo forma** (kadras 831; kelias „Navigacijų modulis / Linkai / Black / Redaguoti“): skirtukai „Pagrindinis“ (aktyvus) / „Parinktys“; „Title“ — `Projektai`; „Page *“ — pilka eilutė „Projektinė veikla  /projektine-veikla“ su rožiniu „Šalinti“; apačioje „Atnaujinti“, „Išsaugoti ir išeiti“, „Atšaukti“.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | forma matoma | — |
| 1,2 | kamera priartėja; fokusas ant lauko „Title“ su „Projektai“ | „Lauke „Title“ įrašote, kaip nuoroda vadinsis meniu.“ |
| 5,4 | fokusas nuslenka ant eilutės „Projektinė veikla“ | „Priskirtas puslapis gali vadintis kitaip.“ |
| 8,8 | fokusas apima abu — „Projektai“ ir „Projektinė veikla“; abu užrašai vienu metu švelniai sumirksi | „Meniu lieka trumpas pavadinimas.“ |
| 10,4–13 | kamera atsitraukia, ramiai (viršelis) | — |

---

## Kadras 9 — „Atidarote nuorodos parinktis“ (`ep_705_07_1`, 14 s)

**Viena žinutė:** nuorodos ikonėlė nustatoma skirtuke „Parinktys“, lauke „Class“.

**Ekranai:**
1. **Grupių sąrašas „Meniu“ (`tvs-window` su antriniu meniu „Meniu“ / „Linkai“, kelias „Navigacijų modulis / Meniu“): žalias „Naujas meniu“, paieška „Paieška“ + žalias „Filtruoti“ + pilkas „Valyti“, skirtukai „Visi“ / „Šiukšlės“, lentelė „Vardas · Aprašymas“** — fokusas ant eilutės „Black“.
2. **„Black“ nuorodų medis**: „Pamokų laikas · URL“, „Projektinė veikla · Page“, „Biblioteka · Page“, „Dokumentai · URL“, „Mėnesio veiklos planas · URL“ (įrašo „Pamokų tvarkaraštis“ nekartojamas — kl_536_5 = C).
3. **Nuorodos forma**, skirtukas „Pagrindinis“ → **„Parinktys“** (naujas elementas — formos skirtukai): laukai „Target *“ („Atidaryti dabartiniame lange.“), **„Class“** (tuščias; pagalbinis tekstas „Nurodykite papildomas class, kurias nurodė programuotojas“), „Leidžiamos rolės“ — kaip kadre 834 sc09.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | grupių sąrašas, fokusas ant „Black“ | — |
| 1,4 | kursorius prie „Linkai“ eilutėje „Black“ | „Prie grupės „Black“ spaudžiate „Linkai“.“ |
| 2,6 | spustelėjimas → „Black“ medis | spustelejimas |
| 4,7 | kursorius prie „Pamokų laikas“ | „Atidarote nuorodą, kuriai norite ikonėlės.“ |
| 5,9 | spustelėjimas → forma (skirtukas „Pagrindinis“) | spustelejimas |
| 8,2 | kursorius prie skirtuko „Parinktys“ | „Skirtuke „Parinktys“ laukas „Class“ kol kas tuščias.“ |
| 9,0 | spustelėjimas → „Parinktys“; fokusas ant tuščio lauko „Class“ | spustelejimas |
| 11,4–14 | ramiai, laukas „Class“ tuščias (viršelis) | — |

Kortelėje pataisyta: pridėtas skirtuko „Parinktys“ spustelėjimas (8,4 s), filmas 10 → 12 s; demo nuoroda — „Pamokų laikas“.

---

## Kadras 10 — „Nukopijuojate ikonėlės kodą“ (`ep_705_07_2`, 15 s)

**Viena žinutė:** ikonėlės kodą paimate iš Fontawesome: susirandate ikoną, pasirenkate stilių „Light“ ir nukopijuojate kodą.

**Ekranai:**
1. **Fontawesome paieška** — schematiškai, ne svetainės kopija: paieškos laukas, po juo ikonų tinklelis (pilkos kortelės su ikona ir vardu: `list`, `list-ol`, `list-ul`, `list-check`…). Reklamos juostų ir prekių ženklo grafikos nepiešti.
2. **Ikonos langas `list-ol`**: didelė ikona, stiliaus pasirinkimas (eilė „Solid / Regular / **Light** / Thin“) ir tamsus kodo blokas „HTML“ su kopijavimo mygtuku.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | tinklelis ir tuščia paieška | — |
| 1,4 | fokusas ant paieškos | „Fontawesome paieškoje įrašote ikonos vardą.“ |
| 2,8 | po raidę „list“; tinklelis persitvarko | rasymas |
| 5,0 | fokusas ant `list-ol`, kursorius ten | „Pasirenkate tinkamą ikoną.“ |
| 6,2 | spustelėjimas → atsiveria ikonos langas | spustelejimas |
| 8,4 | fokusas ant „Light“ (pasižymi), tada slenka į kodo bloką | „Stilių renkatės „Light“ ir nukopijuojate HTML kodą.“ |
| 10,6 | kursorius ant kopijavimo mygtuko; kodo blokas trumpai pašviesėja | — |
| 11,0 | — | patvirtinimas |
| 12,0–15 | ramiai, langas su kodu (viršelis) | — |

**Sprendimas B (2026-10-31):** svetainėse FA 5 — kodo blokas `<i class="fal fa-list-ol"></i>`, Fontawesome v5 puslapis (kaip įraše, v5.15.4), stilius „Light“ = `fal`.
Tylos 11,0–15 s — 4 s su viršeliu; jei per ilga, filmą trumpinti iki 13 s.

---

## Kadras 11 — „Įklijuojate ikonėlės klasę“ (`ep_705_07_3`, 15 s)

**Viena žinutė:** į lauką „Class“ įklijuojate kodą, paliekate tik klasę ir atnaujinate — ikonėlė atsiranda meniu.

**Ekranai:**
1. **Skirtukas „Parinktys“** (kaip kadro 9 pabaigoje), laukas „Class“.
2. **Svetainės šoninis juodasis meniu** (naujas elementas, svetainės šeima): tamsus stulpelis, punktai didžiosiomis raidėmis su ikonomis kairėje — „PAMOKŲ LAIKAS“, „PROJEKTINĖ VEIKLA“, „BIBLIOTEKA“, „DOKUMENTAI“; pirmas punktas pradžioje be ikonos. Šalia — neutralus svetainės fonas, be nuotraukų.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | laukas „Class“ tuščias, fokuse | — |
| 1,4 | kursorius lauke | „Lauke „Class“ įklijuojate nukopijuotą kodą.“ |
| 2,6 | laukas užsipildo visu kodu (įklijavimas — iš karto, ne po raidę) | rasymas |
| 5,0 | `<i class="` ir `"></i>` pasižymi mėlynai | „Paliekate tik klasę – HTML dalis ištrinate.“ |
| 7,2 | pažymėtos dalys išnyksta, lieka klasė (kodo forma — pagal sprendimą B) | rasymas |
| 9,0 | fokusas ant „Atnaujinti“, kursorius ten | „Spaudžiate „Atnaujinti“ ir ikonėlė atsiranda meniu.“ |
| 10,4 | spustelėjimas → kryžminis perėjimas į svetainės juodąjį meniu | spustelejimas |
| 12,2 | prie „PAMOKŲ LAIKAS“ išnyra ikonėlė, trumpas žalias blyksnis | patvirtinimas |
| 13,2–15 | ramiai, meniu su ikonėle (viršelis) | — |

Senajame įraše galinė būsena — reali mokyklos svetainė su mokinių nuotrauka; čia piešiamas tik meniu stulpelis.

---

## Kadras 12 — „Atidarote keturių ikonų nuorodas“ (`ep_705_08_1`, 14 s)

**Viena žinutė:** titulinio keturios ikonos yra grupė „4 ikonos“ — atidarote per „Linkai“.

**Ekranai:**
1. **Darbalaukis** + paieškos išskleidžiamas sąrašas — kaip kadre 5 (tik paieškos kelias).
2. **Grupių sąrašas „Meniu“ (`tvs-window` su antriniu meniu „Meniu“ / „Linkai“, kelias „Navigacijų modulis / Meniu“): žalias „Naujas meniu“, paieška „Paieška“ + žalias „Filtruoti“ + pilkas „Valyti“, skirtukai „Visi“ / „Šiukšlės“, lentelė „Vardas · Aprašymas“** — fokusas ant „4 ikonos“.
3. **„4 ikonos“ nuorodų medis** (kadras 833 sc04): „Elektroninis dienynas · URL“ + rožinė strėlytė, „Tėvams · URL“, „Mokiniams · URL“, „Mokytojams · URL“.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | darbalaukis | — |
| 1,2 | fokusas ant paieškos | „Paieškoje pasirenkate „Navigacijos“.“ |
| 1,8 | po raidę „navi“, sąrašas išsiskleidžia | rasymas |
| 3,0 | spustelėjimas „Navigacijos“ → grupių sąrašas | spustelejimas |
| 4,6 | kursorius prie „Linkai“ eilutėje „4 ikonos“ | „Prie grupės „4 ikonos“ spaudžiate „Linkai“.“ |
| 5,8 | spustelėjimas → medis, keturios eilutės po vieną | spustelejimas |
| 8,2 | fokusas apima visas keturias eilutes | „Matote keturias titulinio puslapio nuorodas.“ |
| 11,2–14 | ramiai (viršelis) | — |

Kortelėje pataisyta: pridėtas paieškos rašymas (1,8 s), spustelėjimas perkeltas 2,4 → 3,0 s, išimtas „patvirtinimas“ (atidarymas nėra išsaugojimas); grąžintos visos keturios nuorodos — kadre sc04_015.7 jos matomos.

---

## Kadras 13 — „Pakeičiate el. dienyno adresą“ (`ep_705_08_2`, 13 s)

**Viena žinutė:** pasikeitus dienyno adresui, nuorodoje pakeičiate lauką „URL“ ir atnaujinate.

**Ekranai:**
1. **„4 ikonos“ medis** — kaip kadro 12 pabaigoje.
2. **Nuorodos forma** (kadras 833 sc05): „Title *“ — `Elektroninis dienynas`, „URL *“ — senas adresas `https://senas.dienynas.demo.lt/` (ne tikras), „Description“; apačioje „Atnaujinti“, „Išsaugoti ir išeiti“, „Atšaukti“.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | medis, fokusas ant „Elektroninis dienynas“ | — |
| 1,2 | kursorius prie eilutės | „Sąraše spaudžiate „Elektroninis dienynas“.“ |
| 2,4 | spustelėjimas → forma | spustelejimas |
| 4,7 | fokusas ant „URL“; senas adresas pasižymi mėlynai | „Lauke „URL“ įrašote naują dienyno adresą.“ |
| 6,1 | po raidę `https://dienynas.demo.lt/` | rasymas |
| 8,3 | kursorius prie „Atnaujinti“ | „Spaudžiate „Atnaujinti“ – nuoroda išsaugota.“ |
| 9,3 | spustelėjimas | spustelejimas |
| 9,7 | laukas „URL“ trumpai žaliai sužimba | patvirtinimas |
| 10,3–13 | ramiai (viršelis) | — |

Pranešimo juostos po „Atnaujinti“ nepiešiame — jos teksto nė viename įraše nėra; rezultatą rodo žalias lauko blyksnis.

---

## Sprendimai

**Atviri (reikia Eimanto):**
- ~~A. „Slug“ forma~~ — **NUSPRĘSTA 2026-10-31:** su brūkšneliu (`pagalba-mokiniams`).
- ~~B. Fontawesome versija~~ — **NUSPRĘSTA 2026-10-31:** svetainėse FA 5 (Eimantas: „Svetainėje yra FA 5“; sutampa su kl_705_3 įrodymu). Kode ekrane ir lauke „Class“ — `fal fa-list-ol`, paieška — fontawesome.com v5 puslapis.

**Kortelių pataisos, jau įrašytos (prašau patvirtinti kartu su eskizais):**
- kadras 1 — išimtas spustelėjimas be taikinio;
- kadras 2 — pridėtas „Išsaugoti“ spustelėjimas, 13 s;
- kadras 4 — be išnyrančių paaiškinimų, pabaiga — „URL“ forma;
- kadras 9 — pridėtas skirtuko spustelėjimas, 12 s; nuoroda „Pamokų laikas“ (kl_536_5 = C, kortelėje buvo likęs „Pamokų tvarkaraštis“);
- kadras 12 — paieškos rašymas, be „patvirtinimas“, grąžintos keturios nuorodos.

**Priimti (kadrai 5–7):**
1. Rodomi trys keliai (darbalaukis, kairysis meniu, paieška); senas K5 padalintas į kadrus 5 ir 6.
2. ~~Kadro 7 laukas „Title“ — „Logopedas“~~ — **pakeista 2026-11-02 (Eimantas):** „Title“ nerašomas ir neužsipildo, užtenka prisegti puslapį; balsas jo nemini, fokuso nėra.
3. Kadras 6 be „patvirtinimas“; kadro 7 antras sakinys 5,9 s, spustelėjimas „Pažymėti“ 6,3 s.
4. Kairysis meniu — vienas kelias dviem būsenomis: suskleistas (ikona) ir išskleistas per „☰“ (ikona su užrašu).

## Po „gerai“ (redaktoriuje)

Šablonai `templates/{Failas}.html` iš `tvs-ui-rinkinys`, `content/lt.json`, `TEMPLATE_ANIMATIONS` įrašai pagal lenteles aukščiau → `generate.js --png` → `generate-video-clips.js` → `generate-voice.js` → `build-video.js --platforma`.
Nauji rinkinio elementai šiai pamokai: modalinis langas su pasirinkimais, paieškos išskleidžiamas sąrašas su grupės antrašte, išskleista šoninė juosta, formos skirtukai, formos laukas su pagalbiniu tekstu, nuorodų medžio eilutė su žymekliu ir išorinės nuorodos ikonėle, pasirinkto įrašo eilutė su „Šalinti“, Fontawesome schema, svetainės juodasis meniu.
