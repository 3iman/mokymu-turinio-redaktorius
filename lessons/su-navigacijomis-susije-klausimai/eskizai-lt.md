# Koncepto eskizai — „Su navigacijomis susiję klausimai“ (2 filmai)

Redaktoriaus CLAUDE.md §8 (a): tekstinis eskizas → Eimanto „gerai“ → HTML / PNG / klipas.
Kiti 10 šios pamokos epizodų **pakartoja** jau esamus (`pakartoja` kortelėse: 8 — „Navigacijų valdymas“, „Puslapio ID“, „Pieštukas į redagavimą“, „Tempiate į vietą“) — jų čia nepiešiame.
Šaltinis: senas įrašas 876 (`turinys/sena/scenos/876`). Būsena: **✅ PATVIRTINTA — Eimantas 2026-10-31: „gerai, eskizai tinka“.**

## Bendra visiems filmams

Kaip „Navigacijų valdyme“ (`../navigaciju-valdymas/eskizai-lt.md` § „Bendra visiems filmams“): atpažįstama TVS be smulkmenų, be vartotojo avataro, fokusas — spotlight, kursorius ir ratilas sutampa su garsu, ekrane tik TVS užrašai, paskutinė ~sekundė — ramus viršelis. **Demo duomenys:** senuose įrašuose matomos realios mokyklos (domenai, nuotraukos, logotipai) — piešiama „Demo gimnazija“, svetainės vaizde vietoje nuotraukų — neutralūs spalvų laukai.
Laikai — iš kortelių po perskaičiavimo pagal išmatuotą balso tempą (`scripts/laikai-telpa.py`).

---

## Kadras 1 — „Nukopijuojate navigacijos sintaksę“ (`ep_693_04_2`, 12 s)

**Viena žinutė:** navigacijos sintaksę paimate puslapio skirtuke „Sintaksė“ mygtuku „Kopijuoti“.

**Ekranai:**
1. **Puslapio redagavimas** (kadras 876 sc05; kelias „Puslapių modulis / Puslapiai / Redaguoti“): kairėje — **vertikalūs skirtukai** „Bendri“, „Video“, „SEO“, „Nustatymai“, „Auditas“, „Sintaksė“ (naujas elementas). Pradžioje aktyvus „Bendri“ (laukas „Pavadinimas *“ — `Ugdymas`).
2. **Skirtukas „Sintaksė“** — sąrašas: kairėje violetinis „Kopijuoti“ (pieštuko ikona), viduryje sintaksė, dešinėje aprašas. Piešiamos 4 eilutės kaip įraše: `{{dokumentubankas_file(87)}}` — „DOKUMENTAI: 1 failo (nuorodos) įterpimas“, `{{dokumentubankas_category(7)}}` — „DOKUMENTAI: Visos dokumentų kategorijos (lentelės) įterpimas“, **`{{structure(19)}}` — „NAVIGACIJA: Navigacijos pagal page childe ID (puslapių struktūros) įterpimas“**, `{{nav('tevams')}}` — „NAVIGACIJA: Navigacijos pagal SLUG (sukurtos navigacijos) įterpimas“. Apačioje — „Atnaujinti“, „Išsaugoti ir išeiti“ … „Atšaukti“, žydras „Peržiūrėti“.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | puslapio forma, aktyvus „Bendri“ | — |
| 1,2 | fokusas ant skirtuko „Sintaksė“, kursorius ten | „Atidarote skirtuką „Sintaksė“.“ |
| 2,4 | spustelėjimas → sintaksių sąrašas | spustelejimas |
| 4,0 | fokusas ant eilutės `{{structure(19)}}`, kursorius prie jos „Kopijuoti“ | „Prie navigacijos pavyzdžio spaudžiate „Kopijuoti“.“ |
| 5,4 | spustelėjimas; eilutė trumpai pašviesėja | spustelejimas |
| 8,1 | fokusas apima sintaksę `{{structure(19)}}` | „Sintaksė nukopijuota.“ |
| 9,1 | trumpas žalias blyksnis ties „Kopijuoti“ | patvirtinimas |
| 10,2–12 | ramiai (viršelis) | — |

Įraše lauke „Slug“ matomas konkrečios mokyklos domenas — nepiešiamas (filmas prasideda skirtuku „Bendri“ be „Slug“ lauko; jei jis reikalingas — `demo.lt`).

---

## Kadras 2 — „Puslapyje atsiranda subpuslapiai“ (`ep_693_04_4`, 12 s)

**Viena žinutė:** išsaugojus puslapį, vietoje sintaksės svetainėje atsiranda jo subpuslapių sąrašas.

**Ekranai:**
1. **Puslapio redagavimas** (876 sc07), apačios juosta: žali „Atnaujinti“, „Išsaugoti ir išeiti“, pilkas „Atšaukti“, žydras „Peržiūrėti“.
2. **Svetainės puslapis „Ugdymas“** (876 sc09, naujas elementas — svetainės subpuslapių sąrašas): balta kortelė, eilutės su rodykle `→` ir pavadinimu didžiosiomis raidėmis, po kai kuriomis — antro lygio punktai su `›` mažesniu šriftu, eilutes skiria plona linija; apačioje „← Grįžti“. Demo subpuslapiai: „UGDYMO ORGANIZAVIMAS“, „FORMALUSIS UGDYMAS“ (› „Pradinis ugdymas“, › „Pagrindinis ugdymas“), „UGDYMO PLANAI“. Šoninės juostos ir banerių nepiešti.

**Judesio seka:**

| s | Vaizdas | Balsas / garsas |
|---|---|---|
| 0,0 | forma, fokusas ant „Atnaujinti“ | — |
| 1,2 | kursorius prie „Atnaujinti“ | „Išsaugote puslapį.“ |
| 2,2 | spustelėjimas; mygtukas trumpai sužimba žaliai | spustelejimas |
| 3,0–3,8 | kryžminis perėjimas į svetainės puslapį „Ugdymas“ (be spustelėjimo — perėjimas, ne veiksmas) | — |
| 4,0 | puslapio vietoje išnyra sąrašas — eilutės iš viršaus po vieną (0,15 s) | „Svetainėje vietoje sintaksės atsiranda subpuslapių sąrašas.“ |
| 5,4 | sąrašas visas, trumpas žalias kontūro blyksnis | patvirtinimas |
| 8,8 | kamera švelniai atsitraukia | „Navigacija nubraižyta.“ |
| 10,4–12 | ramiai (viršelis) | — |

Kortelės aprašas mini „viršuje blyksteli žalia juosta“ — jos teksto įrašuose nėra, todėl rezultatą rodo mygtuko sužibimas.

---

## Sprendimai

- Nėra atvirų klausimų. Kortelių pakeitimų šiai pamokai nedaryta (tik laikų perskaičiavimas).

## Nauji rinkinio elementai

vertikalūs formos skirtukai; sintaksių sąrašo eilutė su violetiniu „Kopijuoti“; žydras „Peržiūrėti“; svetainės subpuslapių sąrašas.
