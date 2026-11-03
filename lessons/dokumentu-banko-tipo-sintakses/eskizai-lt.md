# Koncepto eskizai — „Dokumentų banko tipo sintaksės“ (3 filmai)

Redaktoriaus CLAUDE.md §8 (a): tekstinis eskizas → Eimanto „gerai“ → HTML / PNG / klipas.
Kiti šios pamokos epizodai pakartoja esamus. Šaltiniai: įrašai 788, 789. Būsena: **✅ PATVIRTINTA — Eimantas 2026-10-31: „gerai, eskizai tinka“.**

## Bendra visiems filmams

Kaip „Navigacijų valdyme“. **Demo:** įraše matomas konkrečios mokyklos adresas — nepiešiamas; dokumentų ir kategorijų pavadinimai bendri (be mokyklos vardo), kaip įraše. Padalyti kadrai: viršuje svetainė, apačioje turinio redaktorius su pilna įrankių juosta (kaip „Darbuotojų tipo sintaksių“ kadre 3; 789 sc03). Laikai — iš kortelių po perskaičiavimo.

---

## Kadras 1 — „Vieną dokumentą įterpiate į puslapį“ (`ep_667_01_2`, 14 s)

**Viena žinutė:** `{{dokumentubankas_file(ID)}}` po antrašte įterpia vieną dokumento nuorodą.

**Ekranai (padalytas kadras):** apačioje laukas „Turinys“ — sąrašo punktai (pilkos linijos), antraštė „Gimnazistų tarybos veiklą reglamentuoja“, po ja tuščia eilutė; apačioje „Atnaujinti“. Viršuje svetainės puslapis (789 sc01): ta pati antraštė, po ja plona linija ir **dokumento eilutė** — pilka atsisiuntimo ikona kairėje, žalia nuoroda „Gimnazistų tarybos nuostatai 2020 m.“; apačioje „← Grįžti“.

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | viršus — puslapis be dokumento, apačia — redaktorius | — |
| 1,4 | žymeklis po antrašte | „Lauke „Turinys“ po antrašte įklijuojate nukopijuotą sintaksę.“ |
| 2,8 | eilutėje atsiranda `{{dokumentubankas_file(129)}}` (įklijavimas — iš karto, pažymėtas mėlynai) | rasymas |
| 6,4 | kursorius prie „Atnaujinti“ | „Išsaugote.“ |
| 7,2 | spustelėjimas | spustelejimas |
| 8,8 | viršuje po antrašte išnyra dokumento eilutė | „Puslapyje lieka viena ryški dokumento nuoroda.“ |
| 10,0 | eilutė žaliai sužimba | patvirtinimas |
| 12,6–14 | ramiai (viršelis) | — |

---

## Kadras 2 — „Tėvinės kategorijos numerį randate kategorijose“ (`ep_667_02_1`, 14 s, P1)

**Viena žinutė:** tėvinė kategorija dokumentų neturi, todėl jos numerį randate kategorijų medyje — „(#13)“ prie pavadinimo.

**Ekranai:** dokumentų sąrašas („Nesimato finansinės ataskaitos…“ kadras 1); po spustelėjimo — **kategorijų medis** (788 sc09): eilutės su pilka rankenėle ≡, pavadinimas ir pilkas numeris „(#…)“; vaikai — su įtrauka: „Finansinių ataskaitų rinkiniai (#37)“ → „2023 m. (#44)“, „2022 m. (#43)“…; **„Biudžeto vykdymo ataskaitų rinkiniai (#13)“** → „2023 m. (#45)“, „2022 m. (#40)“…; „Mokinių maitinimas (#3)“.

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | dokumentų sąrašas | — |
| 1,4 | sąrašo stulpelis „Kategorijos“ — rodomos tik metų subkategorijos | „Tėvinė kategorija dokumentų neturi.“ |
| 4,4 | fokusas ant sintaksių stulpelio, tėvinės nėra | „Todėl jos sintaksės sąraše nerasite.“ |
| 7,4 | kursorius prie „Kategorijos“ antriniame meniu | „Atidarote „Kategorijos“ ir pasižiūrite numerį prie pavadinimo.“ |
| 8,6 | spustelėjimas → medis; fokusas nusileidžia iki „Biudžeto vykdymo ataskaitų rinkiniai“, „(#13)“ paryškėja | spustelejimas |
| 12,4–14 | ramiai (viršelis) | — |

Kortelėje pataisyta: spustelėjimas „Kategorijos“ perkeltas 5,4 → 8,6 s (po balso užuominos); kategorijos pavadinimas — kaip įraše 788 („Biudžeto vykdymo ataskaitų rinkiniai“, buvo „Planavimo dokumentai“).

---

## Kadras 3 — „Visą kategoriją įterpiate lentele“ (`ep_667_02_2`, 15 s)

**Viena žinutė:** `{{dokumentubankas_category(13)}}` įterpia visą kategorijos dokumentų lentelę su datomis ir dydžiais.

**Ekranai (padalytas kadras):** apačioje — redaktorius su tuščia eilute; viršuje — puslapis „Biudžeto vykdymo ataskaitų rinkiniai“ ir **dokumentų lentelė su metų grupėmis** (788 sc01; kaip „Nesimato finansinės ataskaitos…“ kadre 2): žalia antraštė „Biudžeto vykdymo ataskaitų rinkiniai · Atnaujinta · Dydis“, grupės „2023 m.“, „2022 m.“, eilutės „2023 m. III ketv. biudžeto vykdymo ataskaitos · 2023-10-29 · 1.87 MB“…

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | tuščias laukas, viršus tuščias | — |
| 1,4 | žymeklis lauke | „Skliaustuose įrašote tos kategorijos numerį.“ |
| 2,8 | po raidę `{{dokumentubankas_category(13)}}`; `13` paryškėja | rasymas |
| 5,1 | kursorius prie „Atnaujinti“ | „Išsaugote puslapį.“ |
| 6,1 | spustelėjimas | spustelejimas |
| 7,7 | viršuje išsiskleidžia lentelė — antraštė, tada grupės po vieną | „Svetainėje atsiranda visa dokumentų lentelė.“ |
| 11,4 | stulpeliai „Atnaujinta“ ir „Dydis“ paryškėja | „Su datomis ir dydžiais.“ |
| 12,2 | lentelės kontūras žaliai sužimba | patvirtinimas |
| 13,8–15 | ramiai (viršelis) | — |

---

## Sprendimai

Atvirų klausimų nėra. Kortelės pataisa — kadras 2 (spustelėjimo laikas, kategorijos pavadinimas).

## Nauji rinkinio elementai

kategorijų medis su numeriais „(#…)“ (kaip nuorodų medis, plius numeris); svetainės vieno dokumento eilutė; svetainės dokumentų lentelė su metų grupėmis (jau aprašyta).
