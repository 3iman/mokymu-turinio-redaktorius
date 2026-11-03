# Video scenarijus: Įrašų kategorizavimas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1402765170 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 116 sek. (10 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_1471` · senoji WP pamoka `irasu-kategorizavimas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Įvykęs ar būsimas renginys | 16 sek. | 01-ivykes-ar-busimas | Kategorijoje „Renginiai“ talpinate straipsnius apie jau įvykusius renginius. Čia tinka ir nuotraukų galerijos. Apie būsimą renginį skelbiate kategorijoje „Kvietimas“. |
| 2 Pranešimas | 11 sek. | 02-kategorija-pranesimas | Čia talpinate informaciją, kuri yra laikino aktualumo. Būsimi renginiai, įstatymų ar tvarkos pakeitimai. |
| 3 Didžiuojamės | 12 sek. | 03-kategorija-didziuojames | Šiai kategorijai priskiriate įrašus apie pasiekimus ir diplomus. Talpinate ne tik diplomą, bet ir žmogaus nuotrauką. |
| 4 Sveikinimas | 11 sek. | 04-kategorija-sveikinimas | Čia talpinate atvirukus įvairioms progoms. Nustatote galiojimo datą – atvirukas aktualus tik laikinai. |
| 5 Konkursas | 10 sek. | 05-kategorija-konkursas | Čia skelbiate konkursų aprašymus. Kartu – ir konkurso nuostatas. |
| 6 Svarbu! | 11 sek. | 06-kategorija-svarbu | Šią kategoriją naudojate, kai norite atkreipti dėmesį. Pranešimas turi būti išskirtinis. |
| 7 Kvietimas | 12 sek. | 07-kategorija-kvietimas | Kategoriją „Kvietimas“ naudojate skelbdami apie būsimus renginius. Taip pat – apie susirinkimus. |
| 8 Ugdymas karjerai | 11 sek. | 08-kategorija-ugdymas-karjerai | Ši kategorija skirta profesinės savišvietos informacijai. Čia ją ir sisteminate. |
| 9 Projektinė veikla | 12 sek. | 09-kategorija-projektine-veikla | Šiai kategorijai priskiriate visus su projektine veikla susijusius įrašus. Nė vieno nepaliekate be kategorijos. |
| 10 Išvykos | 10 sek. | 10-kategorija-isvykos | Šiai kategorijai priskiriate įrašus apie išvykas. Taip pat – apie ekskursijas. |

---

## Kadrai

### KADRAS 1: Įvykęs ar būsimas renginys (16 sek.) — koncepcija
**Failas:** `01-ivykes-ar-busimas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2
**Ekrane:** Šablonas `palyginimas`: dvi naujienų kortelės viena prie kitos. Kairėje – kortelė su žyma „Renginiai“, jos nuotraukų galerija atsiverčia, o data jau praėjusi; dešinėje – kortelė su žyma „Kvietimas“ ir dar neatėjusia data. Tarp jų stovi kalendorius, kurio rodyklė parodo, kuri data jau praėjo.
**Ekrano užrašai (tiksliai):** „Renginiai“, „Kvietimas“
**TVS UI komponentai:** —
**Demo duomenys:** renginys: Šimtadienio nuotraukų galerija, kvietimas: Kvietimas į tėvų susirinkimą
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_01` · dalis `dal_1471_01` „Renginiai“ · prioritetas 2 · pagrindas: dal_1471_01 paaiškinimas; dal_1471_07 paaiškinimas; viz_1471_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kategorijoje „Renginiai“ talpinate straipsnius apie jau įvykusius renginius. |
| 7.4 | balsas | Čia tinka ir nuotraukų galerijos. |
| 10.2 | balsas | Apie būsimą renginį skelbiate kategorijoje „Kvietimas“. |

### KADRAS 2: Pranešimas (11 sek.) — koncepcija
**Failas:** `02-kategorija-pranesimas.png`
**Šablonas:** `naujas` · laukai: title, kam
**Ekrane:** Šablonas `kategorijos_kortele` (naujas): naujienų įrašo kortelė su kategorijos žyma „Pranešimas“ viršuje. Po žyma po vienai išnyra dvi laikino aktualumo eilutės ir prisitvirtina prie kortelės. Pabaigoje kortelė su žyma atsistoja į naujienų srauto eilę.
**Ekrano užrašai (tiksliai):** „Pranešimas“, „Laikinas aktualumas“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Pasikeitė pamokų laikas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_02` · dalis `dal_1471_02` „Pranešimas“ · prioritetas 3 · pagrindas: dal_1471_02 paaiškinimas; viz_1471_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Čia talpinate informaciją, kuri yra laikino aktualumo. |
| 5.7 | balsas | Būsimi renginiai, įstatymų ar tvarkos pakeitimai. |

### KADRAS 3: Didžiuojamės (12 sek.) — koncepcija
**Failas:** `03-kategorija-didziuojames.png`
**Šablonas:** `naujas` · laukai: title, kam, taisykle
**Ekrane:** Šablonas `kategorijos_kortele` (naujas): naujienų įrašo kortelė su kategorijos žyma „Didžiuojamės“ viršuje. Po žyma po vienai išnyra dvi pasiekimų eilutės ir prisitvirtina prie kortelės. Pabaigoje kortelė su žyma atsistoja į naujienų srauto eilę.
**Ekrano užrašai (tiksliai):** „Didžiuojamės“, „Diplomas ir nuotrauka“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Pirma vieta rajono olimpiadoje
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_03` · dalis `dal_1471_03` „Didžiuojamės“ · prioritetas 2 · pagrindas: dal_1471_03 paaiškinimas; viz_1471_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Šiai kategorijai priskiriate įrašus apie pasiekimus ir diplomus. |
| 6.4 | balsas | Talpinate ne tik diplomą, bet ir žmogaus nuotrauką. |

### KADRAS 4: Sveikinimas (11 sek.) — koncepcija
**Failas:** `04-kategorija-sveikinimas.png`
**Šablonas:** `naujas` · laukai: title, kam
**Ekrane:** Šablonas `kategorijos_kortele` (naujas): naujienų įrašo kortelė su kategorijos žyma „Sveikinimas“ viršuje. Po žyma po vienai išnyra dvi atviruko eilutės ir prisitvirtina prie kortelės. Pabaigoje kortelė su žyma atsistoja į naujienų srauto eilę.
**Ekrano užrašai (tiksliai):** „Sveikinimas“, „Galiojimo data“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Atvirukas Mokytojo dienai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_04` · dalis `dal_1471_04` „Sveikinimas“ · prioritetas 3 · pagrindas: dal_1471_04 paaiškinimas; dal_1471_04 įspėjimas; viz_1471_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Čia talpinate atvirukus įvairioms progoms. |
| 5.2 | balsas | Nustatote galiojimo datą – atvirukas aktualus tik laikinai. |

### KADRAS 5: Konkursas (10 sek.) — koncepcija
**Failas:** `05-kategorija-konkursas.png`
**Šablonas:** `naujas` · laukai: title, kam
**Ekrane:** Šablonas `kategorijos_kortele` (naujas): naujienų įrašo kortelė su kategorijos žyma „Konkursas“ viršuje. Po žyma po vienai išnyra dvi konkurso eilutės ir prisitvirtina prie kortelės. Pabaigoje kortelė su žyma atsistoja į naujienų srauto eilę.
**Ekrano užrašai (tiksliai):** „Konkursas“, „Aprašymas ir nuostatai“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Piešinių konkurso nuostatai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_05` · dalis `dal_1471_05` „Konkursas“ · prioritetas 3 · pagrindas: dal_1471_05 paaiškinimas; viz_1471_05 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Čia skelbiate konkursų aprašymus. |
| 5.2 | balsas | Kartu – ir konkurso nuostatas. |

### KADRAS 6: Svarbu! (11 sek.) — koncepcija
**Failas:** `06-kategorija-svarbu.png`
**Šablonas:** `naujas` · laukai: title, kam
**Ekrane:** Šablonas `kategorijos_kortele` (naujas): naujienų įrašo kortelė su kategorijos žyma „Svarbu!“ viršuje. Po žyma po vienai išnyra dvi išskirtinio pranešimo eilutės ir prisitvirtina prie kortelės. Pabaigoje kortelė su žyma atsistoja į naujienų srauto eilę.
**Ekrano užrašai (tiksliai):** „Svarbu!“, „Išskirtinis pranešimas“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Rytoj mokykla nedirba
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_06` · dalis `dal_1471_06` „Svarbu!“ · prioritetas 3 · pagrindas: dal_1471_06 paaiškinimas; viz_1471_06 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Šią kategoriją naudojate, kai norite atkreipti dėmesį. |
| 5.7 | balsas | Pranešimas turi būti išskirtinis. |

### KADRAS 7: Kvietimas (12 sek.) — koncepcija
**Failas:** `07-kategorija-kvietimas.png`
**Šablonas:** `naujas` · laukai: title, kam
**Ekrane:** Šablonas `kategorijos_kortele` (naujas): naujienų įrašo kortelė su kategorijos žyma „Kvietimas“ viršuje. Po žyma po vienai išnyra dvi būsimo renginio eilutės ir prisitvirtina prie kortelės. Pabaigoje kortelė su žyma atsistoja į naujienų srauto eilę.
**Ekrano užrašai (tiksliai):** „Kvietimas“, „Būsimi renginiai“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Kvietimas į tėvų susirinkimą
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_07` · dalis `dal_1471_07` „Kvietimas“ · prioritetas 3 · pagrindas: dal_1471_07 paaiškinimas; viz_1471_07 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kategoriją „Kvietimas“ naudojate skelbdami apie būsimus renginius. |
| 6.6 | balsas | Taip pat – apie susirinkimus. |

### KADRAS 8: Ugdymas karjerai (11 sek.) — koncepcija
**Failas:** `08-kategorija-ugdymas-karjerai.png`
**Šablonas:** `naujas` · laukai: title, kam
**Ekrane:** Šablonas `kategorijos_kortele` (naujas): naujienų įrašo kortelė su kategorijos žyma „Ugdymas karjerai“ viršuje. Po žyma po vienai išnyra dvi savišvietos eilutės ir prisitvirtina prie kortelės. Pabaigoje kortelė su žyma atsistoja į naujienų srauto eilę.
**Ekrano užrašai (tiksliai):** „Ugdymas karjerai“, „Profesinė savišvieta“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Susitikimas su profesijos atstovu
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_08` · dalis `dal_1471_08` „Ugdymas karjerai“ · prioritetas 3 · pagrindas: dal_1471_08 paaiškinimas; viz_1471_08 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Ši kategorija skirta profesinės savišvietos informacijai. |
| 5.9 | balsas | Čia ją ir sisteminate. |

### KADRAS 9: Projektinė veikla (12 sek.) — koncepcija
**Failas:** `09-kategorija-projektine-veikla.png`
**Šablonas:** `naujas` · laukai: title, kam
**Ekrane:** Šablonas `kategorijos_kortele` (naujas): naujienų įrašo kortelė su kategorijos žyma „Projektinė veikla“ viršuje. Po žyma po vienai išnyra dvi projekto eilutės ir prisitvirtina prie kortelės. Pabaigoje kortelė su žyma atsistoja į naujienų srauto eilę.
**Ekrano užrašai (tiksliai):** „Projektinė veikla“, „Visi projekto įrašai“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: ES projekto naujienos
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_09` · dalis `dal_1471_09` „Projektinė veikla“ · prioritetas 3 · pagrindas: dal_1471_09 paaiškinimas; pam_1471 aprašymas („Nepalikite nė vieno įrašo be kategorijos“); viz_1471_09 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Šiai kategorijai priskiriate visus su projektine veikla susijusius įrašus. |
| 7.2 | balsas | Nė vieno nepaliekate be kategorijos. |

### KADRAS 10: Išvykos (10 sek.) — koncepcija
**Failas:** `10-kategorija-isvykos.png`
**Šablonas:** `naujas` · laukai: title, kam
**Ekrane:** Šablonas `kategorijos_kortele` (naujas): naujienų įrašo kortelė su kategorijos žyma „Išvykos“ viršuje. Po žyma po vienai išnyra dvi išvykos eilutės ir prisitvirtina prie kortelės. Pabaigoje kortelė su žyma atsistoja į naujienų srauto eilę.
**Ekrano užrašai (tiksliai):** „Išvykos“, „Išvykos ir ekskursijos“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Ekskursija į Kernavę
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1471_10` · dalis `dal_1471_10` „Išvykos“ · prioritetas 3 · pagrindas: dal_1471_10 paaiškinimas; viz_1471_10 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Šiai kategorijai priskiriate įrašus apie išvykas. |
| 5.2 | balsas | Taip pat – apie ekskursijas. |
