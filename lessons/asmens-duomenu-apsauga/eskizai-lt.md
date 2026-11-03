# Koncepto eskizai — „Asmens duomenų apsauga“ (8 filmai, serija „Mitas / Bendrieji reikalavimai“)

Redaktoriaus CLAUDE.md §8 (a): tekstinis eskizas → Eimanto „gerai“ → HTML / PNG / klipas.
Visi 8 — koncepcijos (šablonas `palyginimas`), TVS kadrų nereikia. Punktai ir formuluotės — iš pamokos teksto (Valstybės institucijų ir įstaigų interneto svetainių bendrieji reikalavimai). Būsena: **✅ PATVIRTINTA — Eimantas 2026-10-31: „gerai, eskizai tinka“.**

## Serijos kompozicija (vienoda visiems 8)

- **Kortelė** (base.css `.card`), viršuje antraštė (`title`).
- **Kairė kortelė — „Mitas“** (filme 1 — „Dažna dingstis“): pilkai rausvas kraštas, didelės kabutės, tekstas — `old_step_1` (citata „…, nes BDAR“); išnyra pirma.
- **Dešinė kortelė — „Bendrieji reikalavimai“**: mėlynas kraštas, viršuje ženkliukas su punktu (`new_step_1`, pvz. „16.3 punktas“), po juo `new_step_2` — punkto turinys; po jo — **mažas vizualus pavyzdys**, kas skelbiama (žr. lentelę žemiau).
- **Apačioje — išvada** `summary` žaliame ženkliuke („Tai ne BDAR klausimas, o prievolė“).
- Judesys: kairė (1,2 s) → dešinė su punktu (~4 s) → pavyzdys ir išvada (~8 s); kairė pritemsta, kai išnyra dešinė. Pavyzdžių žmonės — garsūs mirę lietuviai, el. paštai `@demo.lt`.
- Paskutinė ~sekundė — ramus viršelis. Laikai — po perskaičiavimo pagal balso tempą (`scripts/laikai-telpa.py`).

## Pavyzdys dešinėje kortelėje

| Filmas | Kas parodoma po punktu |
|---|---|
| `viz_685_01` „Neskelbsime pavardžių, nes BDAR“ | darbuotojų sąrašo eilutė „Jonas Basanavičius · Direktorius · jonas@demo.lt“ |
| `viz_685_02` Mokytojo kvalifikacija | funkcijų sąrašas (3–4 pilkos eilutės), viena — „Mokytojų kvalifikacija“ — paryškinama |
| `viz_685_03` Mokytojų kontaktai | eilutė su telefono ir el. pašto ikonėlėmis: „(8 5) 000 0000“, „vardas@demo.lt“ |
| `viz_685_04` Specialistų darbo laikas | mažas darbo laiko lentelės fragmentas (`8.00–17.00`, pietūs atskirai) |
| `viz_685_05` Vadovų nuotraukos | vadovo profilio kortelė: siluetas, „Jonas Basanavičius, direktorius“, nuoroda „Gyvenimo aprašymas“ |
| `viz_685_06` Pareigybės aprašymas | dvi eilutės: „Funkcijos“, „Specialieji reikalavimai“ su dokumento ikonėle |
| `viz_685_07` Atlyginimų vidurkiai | lentelė „Pareigos · Vidutinis DU“ (sumos — pilkos linijos); eilutė su vienu darbuotoju paryškinama, prie jos — „sutikimo“ ženkliukas ✓ |
| `viz_685_08` Duomenų apsaugos dokumentai | trys dokumento eilutės (taisyklės, tvarkos aprašas, prašymų formos) ir pareigūno kortelė su el. paštu |

---

## `viz_685_01` — „„Neskelbsime pavardžių, nes BDAR““ (16 s, P2)

Kairė: Dažna dingstis — Neskelbsime mokytojų pavardžių · Dešinė: Bendrieji reikalavimai, 16.3 p. — Darbuotojų sąrašas: Vardas ir pavardė, pareigos, kontaktai · Išvada: BDAR ne draudžia, o įpareigoja žinoti

| s | Vaizdas | Balsas |
|---|---|---|
| 1,2 | kairė kortelė išnyra | „Dažna dingstis – mokytojų pavardžių neskelbti dėl BDAR.“ |
| 5,7 | dešinė kortelė ir punkto ženkliukas | „Bendrieji reikalavimai įpareigoja skelbti darbuotojų sąrašą.“ |
| 10,6 | pavyzdys ir išvada | „Sąraše nurodote vardą, pareigas ir kontaktus.“ |
| 14,2–16 | ramiai (viršelis) | — |

## `viz_685_02` — „Mokytojo kvalifikacija“ (14 s, P1)

Kairė: Mitas — „Neskelbsime mokytojo kvalifikacijos, nes BDAR“ · Dešinė: Bendrieji reikalavimai — 44 punktas: Mokytojų kvalifikacija – tarp mokyklų internetu vykdomų funkcijų, kurioms reikalavimai taikomi · Išvada: Tai ne BDAR klausimas, o prievolė

| s | Vaizdas | Balsas |
|---|---|---|
| 1,2 | kairė kortelė išnyra | „Mitas – kad kvalifikacijos skelbti negalima.“ |
| 4,9 | dešinė kortelė ir punkto ženkliukas | „Bendrųjų reikalavimų 44 punktas sako kitaip.“ |
| 8,6 | pavyzdys ir išvada | „Kvalifikaciją skelbiate kaip esminę mokyklos funkciją.“ |
| 13,0–14 | ramiai (viršelis) | — |

## `viz_685_03` — „Mokytojų kontaktai“ (15 s, P1)

Kairė: Mitas — „Neskelbsime mokytojų kontaktų, nes BDAR“ · Dešinė: Bendrieji reikalavimai — 16.3 punktas: Darbuotojų sąrašas su telefono numeriu ir el. pašto adresu ar jo sudarymo tvarka · Išvada: Tai ne BDAR klausimas, o prievolė

| s | Vaizdas | Balsas |
|---|---|---|
| 1,2 | kairė kortelė išnyra | „Mitas – kad negalima skelbti net darbinių kontaktų.“ |
| 5,4 | dešinė kortelė ir punkto ženkliukas | „Reikalavimai nurodo telefono numerį ir elektroninį paštą.“ |
| 10,1 | pavyzdys ir išvada | „Arba paskelbiate jo sudarymo tvarką.“ |
| 13,0–15 | ramiai (viršelis) | — |

## `viz_685_04` — „Specialistų darbo laikas“ (15 s, P1)

Kairė: Mitas — „Neskelbsime specialistų darbo laiko, nes BDAR“ · Dešinė: Bendrieji reikalavimai — 16.6 punktas: Už asmenų aptarnavimą atsakingo darbuotojo kontaktinė informacija ir darbo laikas · Išvada: Tai ne BDAR klausimas, o prievolė

| s | Vaizdas | Balsas |
|---|---|---|
| 1,2 | kairė kortelė išnyra | „Mitas – kad darbo laiko skelbti negalima.“ |
| 4,6 | dešinė kortelė ir punkto ženkliukas | „Reikalavimų 16.6 punktas nurodo priešingai.“ |
| 8,2 | pavyzdys ir išvada | „Skelbiate už aptarnavimą atsakingo darbuotojo darbo laiką.“ |
| 12,9–15 | ramiai (viršelis) | — |

## `viz_685_05` — „Vadovų nuotraukos“ (14 s, P1)

Kairė: Mitas — „Nedėsime vadovų nuotraukų, nes BDAR“ · Dešinė: Bendrieji reikalavimai — 16.1 punktas: Įstaigos vadovo (-ų) nuotrauka (-os) ir gyvenimo aprašymas (-ai) · Išvada: Tai ne BDAR klausimas, o prievolė

| s | Vaizdas | Balsas |
|---|---|---|
| 1,2 | kairė kortelė išnyra | „Mitas – kad vadovų nuotraukų dėti negalima.“ |
| 4,8 | dešinė kortelė ir punkto ženkliukas | „Reikalavimų 16.1 punktas jas skelbti įpareigoja.“ |
| 8,8 | pavyzdys ir išvada | „Kartu patalpinate ir gyvenimo aprašymą.“ |
| 12,0–14 | ramiai (viršelis) | — |

## `viz_685_06` — „Pareigybės aprašymas“ (15 s, P1)

Kairė: Mitas — „Nedėsime pareigybės aprašymo, nes BDAR“ · Dešinė: Bendrieji reikalavimai — 16.4 punktas: Kiekvieno darbuotojo atliekamos funkcijos ir specialieji reikalavimai pareigybei · Išvada: Tai ne BDAR klausimas, o prievolė

| s | Vaizdas | Balsas |
|---|---|---|
| 1,2 | kairė kortelė išnyra | „Mitas – kad pareigybės aprašymo dėti negalima.“ |
| 5,0 | dešinė kortelė ir punkto ženkliukas | „Reikalavimų 16.4 punktas sako kitaip.“ |
| 8,1 | pavyzdys ir išvada | „Skelbiate kiekvieno darbuotojo funkcijas ir reikalavimus pareigybei.“ |
| 13,6–15 | ramiai (viršelis) | — |

## `viz_685_07` — „Atlyginimų vidurkiai“ (16 s, P1)

Kairė: Mitas — „Neskelbsime atlyginimų vidurkių, nes BDAR“ · Dešinė: Bendrieji reikalavimai — 22.3 punktas: Vienodas pareigas einančių darbuotojų darbo užmokestis; išimtis – kai pareigas eina tik vienas darbuotojas · Išvada: Tai ne BDAR klausimas, o prievolė

| s | Vaizdas | Balsas |
|---|---|---|
| 1,2 | kairė kortelė išnyra | „Mitas – kad atlyginimų vidurkių skelbti negalima.“ |
| 5,3 | dešinė kortelė ir punkto ženkliukas | „Vidurkius pagal vienodas pareigas skelbti privalu.“ |
| 9,4 | pavyzdys ir išvada | „Vienintelio darbuotojo duomenis skelbiate tik gavę sutikimą.“ |
| 14,2–16 | ramiai (viršelis) | — |

## `viz_685_08` — „Duomenų apsaugos dokumentai“ (15 s, P1)

Kairė: Mitas — „Neskelbsime asmens duomenų apsaugos taisyklių“ · Dešinė: Bendrieji reikalavimai — 25 punktas: Asmens duomenų tvarkymo taisyklės, teisių įgyvendinimo tvarkos aprašas, pareigūno kontaktai · Išvada: Tai ne BDAR klausimas, o prievolė

| s | Vaizdas | Balsas |
|---|---|---|
| 1,2 | kairė kortelė išnyra | „Mitas – kad apsaugos taisyklių skelbti nereikia.“ |
| 5,2 | dešinė kortelė ir punkto ženkliukas | „Reikalavimų 25 punktas nurodo visą sąrašą.“ |
| 8,7 | pavyzdys ir išvada | „Skelbiate taisykles, tvarkos aprašą ir pareigūno kontaktus.“ |
| 13,4–15 | ramiai (viršelis) | — |

---

## Sprendimai

Atvirų klausimų nėra.

**Kortelių pataisos (balso prasmė):** „Mitas yra neskelbti darbo laiko“ pažodžiui sako, kad mitas — pats neskelbimas; pataisyta į „Mitas – kad darbo laiko skelbti negalima.“ Taip pat filmuose 02–08; filme 01 — „Dažna dingstis – mokytojų pavardžių neskelbti dėl BDAR.“; filme 03 — „Arba paskelbiate jo sudarymo tvarką.“ Dėl to 8 filmai pailgėjo 1–2 s (≤ 15 s).

## Nauji rinkinio elementai

koncepcijų šablonas `palyginimas` jau yra; nauja — serijos variantas „Mitas / Bendrieji reikalavimai“ (citatos kortelė + punkto ženkliukas + pavyzdys).
