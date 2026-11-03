# Koncepto eskizai — „Nuorodų tipo sintaksės“ (3 filmai)

Redaktoriaus CLAUDE.md §8 (a): tekstinis eskizas → Eimanto „gerai“ → HTML / PNG / klipas.
Šaltiniai: įrašai 801, 802, 803. Būsena: **✅ PATVIRTINTA — Eimantas 2026-10-31: „gerai, eskizai tinka“.**

## Bendra visiems filmams

Kaip „Navigacijų valdyme“. Padalyti kadrai: viršuje svetainė, apačioje turinio redaktorius su pilna įrankių juosta (802 sc07, 801/803 sc02), apačioje „Atnaujinti“. **Demo:** įrašuose — realios mokyklos puslapiai ir tikrų institucijų logotipai; piešiami neutralūs demo logotipai ir demo puslapiai („Būreliai“ → nuoroda į „Būrelių tvarkaraštis“). Laikai — iš kortelių po perskaičiavimo.

---

## Kadras 1 — „Nuorodas su logotipais įterpiate puslapyje“ (`ep_664_01_2`, 14 s)

**Viena žinutė:** `{{nuorodos(1)}}` įterpia nuorodų rinkinį su logotipais — po tris eilutėje, todėl reikia bent trijų.

**Ekranai:** apačioje laukas „Turinys“; viršuje — svetainės nuorodų lentelė (kaip „Nuorodų valdymo“ kadre 1, 802 sc02): plytelės su demo logotipais po tris, apačioje „← Grįžti“.

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | tuščias laukas, viršus tuščias | — |
| 1,4 | žymeklis lauke | „Lauke „Turinys“ įklijuojate kategorijos sintaksę.“ |
| 2,8 | įklijuojama `{{nuorodos(1)}}` (iš karto) | rasymas |
| 5,5 | kursorius prie „Atnaujinti“ | „Išsaugote puslapį.“ |
| 6,5 | spustelėjimas | spustelejimas |
| 7,5 | viršuje plytelės sugula po vieną, eilėmis po tris | „Svetainėje nuorodos atsiranda su logotipais.“ |
| 11,2 | pirma eilutė (trys plytelės) apvedama | „Reikia bent trijų.“ |
| 12,0 | kontūras žaliai sužimba | patvirtinimas |
| 12,6–14 | ramiai (viršelis) | — |

---

## Kadras 2 — „Nuorodą kuriate pagal puslapio ID“ (`ep_664_02_1`, 15 s)

**Viena žinutė:** `{{page_url(181)}}` sukuria nuorodą, kurios tekstas — puslapio pavadinimas; atsidaro tame pačiame lange.

**Ekranai:** apačioje redaktorius — antraštė „Būreliai“, po ja tuščia eilutė; viršuje — svetainės puslapio „Būreliai“ tekstas, kuriame atsiranda žalia nuoroda **„Būrelių tvarkaraštis“**; paspaudus — atsidaro to puslapio antraštė (tame pačiame lange).

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | redaktorius ir puslapis be nuorodos | — |
| 1,4 | žymeklis po antrašte | „Skliaustuose įrašote puslapio numerį.“ |
| 2,8 | po raidę `{{page_url(181)}}`; `181` paryškėja | rasymas |
| 5,0 | viršuje atsiranda nuoroda „Būrelių tvarkaraštis“ | „Nuorodos teksto rašyti nereikia.“ |
| 8,4 | nuorodos tekstas ir tikslinio puslapio pavadinimas sujungiami linija | „Jis paimamas iš puslapio pavadinimo.“ |
| 11,4 | kursorius prie nuorodos | „Nuoroda atsidaro tame pačiame lange.“ |
| 12,0 | spustelėjimas → tame pačiame lange atsiveria „Būrelių tvarkaraštis“ | spustelejimas |
| 12,6 | antraštė žaliai sužimba | patvirtinimas |
| 13,8–15 | ramiai (viršelis) | — |

Kortelėje pataisyta: ekrano nuorodos tekstas — „Būrelių tvarkaraštis“ (tikslinio puslapio pavadinimas; „Būreliai“ — redaguojamo puslapio antraštė); pridėtas nuorodos spustelėjimas.

---

## Kadras 3 — „Nuorodą kuriate pagal puslapio SLUG“ (`ep_664_03_1`, 15 s)

**Viena žinutė:** į kabutes įklijuojate visą puslapio kelią be domeno — `{{page_url('tvarkarasciai/bureliu-tvarkarastis')}}`.

**Ekranai:** kaip kadre 2; papildomai — trumpam virš redaktoriaus parodoma **naršyklės adreso juosta** `https://demo.lt/tvarkarasciai/bureliu-tvarkarastis`: domenas pilkas, likusi dalis pažymima mėlynai.

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | redaktorius, žymeklis po antrašte | — |
| 1,4 | eilutėje `{{page_url('')}}`, žymeklis tarp kabučių | „Kabutėse įklijuojate puslapio adreso dalį.“ |
| 2,8 | įklijuojama `tvarkarasciai/bureliu-tvarkarastis` | rasymas |
| 5,0 | virš redaktoriaus išnyra adreso juosta; kelias pažymimas mėlynai | „Ją nukopijuojate iš naršyklės juostos.“ |
| 8,6 | domenas `https://demo.lt/` perbraukiamas pilka linija | „Domeno į kabutes neimate.“ |
| 11,4 | adreso juosta dingsta; viršuje — nuoroda „Būrelių tvarkaraštis“, kursorius prie jos | „Nuoroda atsidaro tame pačiame lange.“ |
| 12,0 | spustelėjimas → atsiveria puslapis | spustelejimas |
| 12,6 | antraštė žaliai sužimba | patvirtinimas |
| 13,8–15 | ramiai (viršelis) | — |

Kortelėje pataisyta: demo SLUG — visas kelias su `/` (įraše 803 kabutėse — `tvarkarasciai/neformaliojo-svietimo-tvarkarastis`, ne vienas žodis); pridėtas nuorodos spustelėjimas.

---

## Sprendimai

Atvirų klausimų nėra. Kortelių pataisos — kadrai 2 ir 3.

## Nauji rinkinio elementai

svetainės teksto nuoroda (žalia); naršyklės adreso juosta su pažymėta dalimi (jau sąraše).
