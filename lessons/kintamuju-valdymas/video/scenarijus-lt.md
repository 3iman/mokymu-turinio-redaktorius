# Video scenarijus: Kintamųjų valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2116040056 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 59 sek. (4 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_1473` · senoji WP pamoka `kintamuju-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Sukuriate kintamąjį | 13 sek. | 01-kintamojo-kurimas | Vertimų modulyje spaudžiate „Sukurti“. Pavadinimą rašote su kategorija prieš dvitaškius. Įrašote teksto gabalėlį ir išsaugote. |
| 2 Progimnazija tampa gimnazija | 15 sek. | 02-vienas-zodis | Žodis „progimnazija“ svetainėje vartojamas dešimtis kartų. Rasti ir pakeisti visus rankiniu būdu užimtų daug laiko. Su kintamuoju pakeičiate vieną kartą. |
| 3 GPM paramos informacija | 15 sek. | 03-gpm-parama | Kasmet paramos informaciją rašote nuo nulio. Su kintamuoju pakeičiate kelis skaičius ir prisegate ataskaitą. Taip išvengiate ir formatavimo griūties. |
| 4 Mygtuko įterpimas | 16 sek. | 04-mygtukas-kintamuoju | Kintamuoju galite paversti ir mygtuką. Sudėtingą kodo struktūrą teksto redaktoriumi lengva sugriauti. Įterpiate vieną kintamąjį – lankytojas mato tvarkingą mygtuką. |

---

## Kadrai

### KADRAS 1: Sukuriate kintamąjį (13 sek.) — epizodas
**Failas:** `01-kintamojo-kurimas.png`
**Ekrane:** TVS Vertimų modulis (kintamieji): kursorius spaudžia „Sukurti“, lauke „Key“ įrašo „2proc::terminas“ – dalis prieš dvitaškius yra kategorija, lauke „Value“ (LT) suveda teksto gabalėlį ir spaudžia „Išsaugoti ir išeiti“. Sąraše atsiranda naujas įrašas, filtre „Category“ – jo kategorija.
**Ekrano užrašai (tiksliai):** „Vertimai“, „Sukurti“, „Key“, „Value“, „Išsaugoti ir išeiti“
**TVS UI komponentai:** tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** kintamasis: mokykla::pavadinimas, reiksme: Demo progimnazija
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `ep_1473_01_1` · dalis `dal_1473_01` „Kintamųjų valdymas“ · prioritetas 2 · pagrindas: dal_1473_01 paaiškinimas; pam_1473 aprašymas („teksto dalis, gabalėlis“); ep_1473_01_1 žingsniai; UI patikrinta: skeleton Vertimai (2026-10-18) — modulis, mygtukas „Sukurti“, laukai Key / Value LT

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Vertimų modulyje spaudžiate „Sukurti“. |
| 2.8 | garsas | spustelejimas |
| 4.6 | balsas | Pavadinimą rašote su kategorija prieš dvitaškius. |
| 6.0 | garsas | rasymas |
| 8.7 | balsas | Įrašote teksto gabalėlį ir išsaugote. |
| 10.1 | garsas | patvirtinimas |

### KADRAS 2: Progimnazija tampa gimnazija (15 sek.) — koncepcija
**Failas:** `02-vienas-zodis.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, old_step_3, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje – svetainės puslapių tinklas, kuriame po vienas sumirksi išsibarstę žodžiai „progimnazija“, o kursorius vieną po kito taiso ranka; dešinėje – vienas kintamojo laukas, kuriame žodis pakeičiamas vieną kartą, ir tuo pačiu metu persirašo visi puslapiai. Virš kairės kortelės užrašas „Rankiniu būdu“, virš dešinės – „Su kintamuoju“.
**Ekrano užrašai (tiksliai):** „Rankiniu būdu“, „Su kintamuoju“
**TVS UI komponentai:** —
**Demo duomenys:** kintamasis: progimnazija, nauja_reiksme: gimnazija
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1473_02` · dalis `dal_1473_02` „Kintamasis – vienas žodis“ · prioritetas 2 · pagrindas: dal_1473_02 paaiškinimas; viz_1473_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Žodis „progimnazija“ svetainėje vartojamas dešimtis kartų. |
| 6.0 | balsas | Rasti ir pakeisti visus rankiniu būdu užimtų daug laiko. |
| 10.6 | balsas | Su kintamuoju pakeičiate vieną kartą. |

### KADRAS 3: GPM paramos informacija (15 sek.) — koncepcija
**Failas:** `03-gpm-parama.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, old_step_3, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje – tas pats puslapis trejais metais, kiekvienas perrašytas iš naujo ir kitokio formatavimo; dešinėje – vienas kintamasis, kuriame pasikeičia tik keli skaičiai, o apačioje prisisega panaudojimo ataskaitos failas. Virš kairės kortelės užrašas „Kasmet nuo nulio“, virš dešinės – „Kintamasis“.
**Ekrano užrašai (tiksliai):** „Kasmet nuo nulio“, „Kintamasis“, „1,2 % GPM“
**TVS UI komponentai:** —
**Demo duomenys:** ataskaita: Paramos panaudojimo ataskaita
**Tarimo kandidatai:** GPM (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1473_03` · dalis `dal_1473_03` „1,2 % GPM paramos informacija“ · prioritetas 2 · pagrindas: dal_1473_03 paaiškinimas; viz_1473_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kasmet paramos informaciją rašote nuo nulio. |
| 4.9 | balsas | Su kintamuoju pakeičiate kelis skaičius ir prisegate ataskaitą. |
| 10.1 | balsas | Taip išvengiate ir formatavimo griūties. |

### KADRAS 4: Mygtuko įterpimas (16 sek.) — koncepcija
**Failas:** `04-mygtukas-kintamuoju.png`
**Šablonas:** `kodas_rezultatas` · laukai: title, editor_label, code_warn, result_label, table_h2
**Ekrane:** Šablonas `kodas_rezultatas`: kairėje – redaktoriaus laukas, kuriame vietoje ilgos mygtuko kodo struktūros stovi vienas kintamojo žymeklis, o po juo – „<iframe>“ gabalėlis; dešinėje – puslapis, kurį mato lankytojas, su tvarkingu mygtuku. Kairėje kodo eilutė sumirksi raudonai, kai į ją įsiterpia teksto redaktorius.
**Ekrano užrašai (tiksliai):** „Kintamasis redaktoriuje“, „Ką mato lankytojas“
**TVS UI komponentai:** —
**Demo duomenys:** mygtukas: Pildyti prašymą
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1473_04` · dalis `dal_1473_04` „Mygtuko įterpimas“ · prioritetas 2 · pagrindas: dal_1473_04 paaiškinimas; viz_1473_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kintamuoju galite paversti ir mygtuką. |
| 4.4 | balsas | Sudėtingą kodo struktūrą teksto redaktoriumi lengva sugriauti. |
| 9.5 | balsas | Įterpiate vieną kintamąjį – lankytojas mato tvarkingą mygtuką. |
