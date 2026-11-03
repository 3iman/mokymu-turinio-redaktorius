# Koncepto eskizai — „Darbuotojų tipo sintaksės“ (4 filmai)

Redaktoriaus CLAUDE.md §8 (a): tekstinis eskizas → Eimanto „gerai“ → HTML / PNG / klipas.
Šaltiniai: įrašai 796, 799, 800. Būsena: **✅ PATVIRTINTA — Eimantas 2026-10-31: „gerai, eskizai tinka“.**

## Bendra visiems filmams

Kaip „Navigacijų valdyme“. **Demo žmonės — garsūs mirę lietuviai** (įrašuose — realūs darbuotojai su nuotraukomis, kl_665_3 = A), vietoje nuotraukų — pilki siluetai su inicialais. Laikai — iš kortelių po perskaičiavimo.
**Faktai:** `{'show_description': false}` — profilis **be** aprašymo (kl_665_1; sintaksių modulio įrašas 29; Eimanto paaiškinimas 2026-09-21). Kategorijos sintaksė rodoma **su kabutėmis** — `{{ staff('administracija') }}` (kl_665_2; TVS sąraše ji sugeneruota be kabučių — filme piešiame su kabutėmis, kaip sintaksių modulyje).

---

## Kadras 1 — „Profilio sintaksę randate sąraše“ (`ep_665_01_1`, 13 s, P1)

**Viena žinutė:** kiekvieno darbuotojo profilio sintaksė su jo numeriu yra sąrašo stulpelyje „Sintaksė“.

**Ekranas:** **Darbuotojų sąrašas** (796 sc04; „Darbuotojų modulis / Darbuotojai“, antrinis meniu „Darbuotojai“ / „Kategorijos“ / „Laukai“ / „Settings“): stulpeliai „Image · Full name · Sintaksė · Position“; eilutės — rankenėlė ✛, žymimasis langelis, **pilkas apvalus siluetas su inicialais** (ne nuotrauka), vardas dviem eilutėmis, sintaksė trimis eilutėmis (`{{` / `staff_single(6)` / `}}`), pareigos. Demo: „Jonas Basanavičius · Direktorius · staff_single(6)“, „Marija Pečkauskaitė · Direktoriaus pavaduotoja ugdymui · staff_single(7)“, „Kazys Grinius · Direktoriaus pavaduotojas ūkio reikalams · staff_single(8)“, „Julija Žymantienė · Raštinės administratorė · staff_single(20)“.

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | sąrašas | — |
| 1,2 | fokusas ant stulpelio „Sintaksė“ (visos eilutės) | „Darbuotojų sąraše yra stulpelis su sintakse.“ |
| 4,9 | kamera priartėja prie „Jonas Basanavičius“ eilutės; skaičius `6` paryškėja | „Prie kiekvieno profilio joje matote jo numerį.“ |
| 8,7 | sintaksė pažymima mėlynai (tempiant), kursorius — teksto žymeklis | „Sintaksę pažymite ir nusikopijuojate.“ |
| 9,7 | trumpas pažymėtos sintaksės sužibimas (kopijavimas) | spustelejimas |
| 11,4–13 | ramiai (viršelis) | — |

---

## Kadras 2 — „Kategorijos sintaksę randate kategorijose“ (`ep_665_01_2`, 11 s, P1)

**Viena žinutė:** visos kategorijos sąrašo sintaksė yra skiltyje „Kategorijos“.

**Ekranas:** kategorijų sąrašas (796 sc02): žalias „New Category“; stulpeliai „Title · Sintaksė“; eilutės „Administracija · `{{ staff('administracija') }}`“, „Specialistai · `{{ staff('specialistai') }}`“; apačioje „Perrikiuoti“, „Ištrinti“.

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | darbuotojų sąrašas (kaip kadre 1) | — |
| 1,2 | kursorius prie „Kategorijos“ antriniame meniu | „Kairėje pereinate į kategorijas.“ |
| 2,2 | spustelėjimas → kategorijų sąrašas | spustelejimas |
| 4,0 | fokusas ant stulpelio „Sintaksė“, eilutė „Administracija“ paryškėja | „Prie kiekvienos matote jos sąrašo sintaksę.“ |
| 7,6 | apačioje įslenka nauja eilutė „Pagalbos specialistai · `{{ staff('pagalbos-specialistai') }}`“ (būsena „nauja“) | „Nauja kategorija irgi turi.“ |
| 9,6–11 | ramiai (viršelis) | — |

---

## Kadras 3 — „Profilį rodote be aprašymo“ (`ep_665_02_1`, 13 s)

**Viena žinutė:** po numerio įrašytas `{'show_description': false}` paslepia profilio aprašymą — lieka pareigos ir kontaktai.

**Ekranai (padalytas kadras):** viršuje — **Svetainės profilio kortelė** (demo): kairėje pilkas siluetas, dešinėje vardas pusjuodžiu, pareigos, darbo laiko eilutė, kontaktai (el. paštas `vardas@demo.lt`, telefonas pilkomis linijomis); po jais — aprašymo pastraipa (pilkos teksto linijos). Apačioje — **Laukas „Turinys“ su turinio redaktoriumi** (800 sc07, 799 sc08 — pilna juosta, naujas rinkinio elementas): dvi eilutės mygtukų („Source“, iškirpti / kopijuoti / įklijuoti, atšaukti, B I U S x₂ x², Tx; sąrašai, atitraukimai, citata, lygiavimas; nuoroda, lentelė, linija, Ω; „Styles ▾“, „Normal ▾“, „Font ▾“, „Size ▾“, spalvos, išdidinimas), baltas laukas, apačioje būsenos juosta „body p“. Lauke: antraštė „Atsakingi asmenys“ ir eilutė `{{ staff_single(6) }}`; apačioje „Atnaujinti“.

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | viršuje kortelė su aprašymu, apačioje sintaksė | — |
| 1,4 | žymeklis po `6` | „Po numerio įrašote papildomą nurodymą.“ |
| 3,0 | po raidę `, {'show_description': false}` | rasymas |
| 5,0 | `false` paryškėja | „Jis išjungia profilio aprašymo laukelį.“ |
| 6,2 | spustelėjimas „Atnaujinti“ | spustelejimas |
| 8,3 | viršuje aprašymo pastraipa susitraukia ir dingsta — lieka nuotrauka, pareigos, kontaktai | „Svetainėje lieka tik pareigos ir kontaktai.“ |
| 9,9 | kortelės kontūras žaliai sužimba | patvirtinimas |
| 11,4–13 | ramiai (viršelis) | — |

---

## Kadras 4 — „Visą kategoriją įterpiate pagal SLUG“ (`ep_665_03_1`, 15 s)

**Viena žinutė:** `{{ staff('administracija') }}` įterpia visus kategorijos darbuotojus — SLUG kabutėse turi sutapti su kategorijos sąrašu.

**Ekranai (padalytas kadras):** apačioje — turinio redaktorius (kaip kadre 3) su tuščiu lauku; viršuje — keturios demo profilio kortelės viena po kita (kaip kadre 3, be aprašymų).

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | tuščias laukas, viršus tuščias | — |
| 1,4 | žymeklis lauke | „Kabutėse įrašote kategorijos SLUG.“ |
| 2,8 | po raidę `{{ staff('administracija') }}` | rasymas |
| 4,4 | `administracija` paryškėja; šalia trumpai išnyra kategorijų sąrašo eilutė „Administracija“ (kaip kadre 2) ir sujungiama linija | „Jis turi sutapti su kategorijos sąrašu.“ |
| 7,7 | viršuje po vieną sugula keturios kortelės | „Svetainėje atsiranda visi tos kategorijos darbuotojai.“ |
| 12,2 | apačioje abi viengubos kabutės `'…'` paryškėja | „Kabučių nepamirštate.“ |
| 13,0 | kabutės žaliai sužimba | patvirtinimas |
| 13,8–15 | ramiai (viršelis) | — |

---

## Sprendimai

Atvirų klausimų nėra (kl_665_1, 2, 3 jau atsakyti). Kortelių pakeitimų nėra.

## Nauji rinkinio elementai

**pilna turinio redaktoriaus įrankių juosta** (pilnos raiškos kadrai 799 sc08, 800 sc07 — iš jų galima piešti, nelaukiant YouTube kadrų; ją naudoja dar 11 epizodų); darbuotojų sąrašas su siluetais; kategorijų sąrašas; svetainės profilio kortelė.
