# Video scenarijus: Navigacijų tipo sintaksės — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1433164550 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 69 sek. (4 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_666` · senoji WP pamoka `navigaciju-tipo-sintakses`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Subpuslapių navigaciją įterpiate sintakse | 17 sek. | 01-subpuslapiu-navigacija | Įklijuojate navigacijos sintaksę. Skliaustuose įrašote to puslapio numerį. Jį matote adreso juostos pabaigoje. Išsaugojus atsiranda subpuslapių sąrašas. |
| 2 Subpuslapius parodote blokeliais | 17 sek. | 02-subpuslapiai-blokeliais | Tas pats puslapių sąrašas gali atrodyti kitaip. Įrašote blokelių sintaksę. Skliaustuose — to paties puslapio numeris. Subpuslapiai virsta kortelėmis su nuotraukomis. |
| 3 Sukurtą navigaciją įterpiate pagal SLUG | 17 sek. | 03-navigacija-pagal-sluga | Kabutėse įrašote navigacijos grupės SLUG. Spaudžiate „Atnaujinti“. Puslapyje atsiranda visos tos grupės nuorodos. Jas tvarkote navigacijų modulyje, ne čia. |
| 4 Grupės SLUG randate modulyje „Meniu“ | 18 sek. | 03-navigacijos-slugas | Navigacijų modulyje atidarote „Meniu“. Sąraše randate savo grupę ir spaudžiate „Redaguoti“. Lauke „Slug“ matote tai, ką rašysite į sintaksę. Jį pažymite ir nusikopijuojate. |

---

## Kadrai

### KADRAS 1: Subpuslapių navigaciją įterpiate sintakse (17 sek.) — epizodas
**Failas:** `01-subpuslapiu-navigacija.png`
**Ekrane:** Padalytas kadras. Apačioje į „Turinys“ įklijuojama navigacijos sintaksė; skaičius skliaustuose pakeičiamas tuo, kuris paryškėja naršyklės adreso pabaigoje. Spaudžiamas „Atnaujinti“. Viršuje puslapyje sugula subpuslapių sąrašas su rodyklėmis.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{structure(6)}}“, „Atnaujinti“, „Administracija“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** puslapis: Struktūra ir kontaktai, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-subpuslapiu-navigacija--sc06_031.4.jpg`, `nuorodos/01-subpuslapiu-navigacija--sc09_041.2.jpg`
**Komentaras:** epizodas `ep_666_01_1` · dalis `dal_666_01` „Navigacija pagal puslapio ID“ · prioritetas 2 · pagrindas: dal_666_01 pavadinimas (teksto šaltinyje nėra — kl_666_1); scenos 876: 6, 7, 9

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Įklijuojate navigacijos sintaksę. |
| 2.4 | garsas | rasymas |
| 4.4 | balsas | Skliaustuose įrašote to puslapio numerį. |
| 7.8 | balsas | Jį matote adreso juostos pabaigoje. |
| 10.0 | garsas | spustelejimas |
| 11.0 | balsas | Išsaugojus atsiranda subpuslapių sąrašas. |
| 13.0 | garsas | patvirtinimas |

### KADRAS 2: Subpuslapius parodote blokeliais (17 sek.) — epizodas
**Failas:** `02-subpuslapiai-blokeliais.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — paprasta navigacijos sintaksė pakeičiama blokelių sintakse. Viršuje tas pats subpuslapių sąrašas virsta kortelėmis su nuotrauka, pavadinimu ir nuoroda „Daugiau“.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{structure_blocks(18)}}“, „Apie būrelius“, „Daugiau“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** puslapis: Apie būrelius, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-subpuslapiai-blokeliais--sc01_000.3.jpg`, `nuorodos/02-subpuslapiai-blokeliais--sc03_025.9.jpg`
**Komentaras:** epizodas `ep_666_02_1` · dalis `dal_666_02` „Subpuslapių atvaizdavimas blokeliais“ · prioritetas 2 · pagrindas: dal_666_02 pavadinimas ir TVS sintaksių sąrašo aprašas (teksto šaltinyje nėra — kl_666_1); scenos 809: 1, 2, 3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Tas pats puslapių sąrašas gali atrodyti kitaip. |
| 5.3 | balsas | Įrašote blokelių sintaksę. |
| 6.5 | garsas | rasymas |
| 8.3 | balsas | Skliaustuose — to paties puslapio numeris. |
| 11.8 | balsas | Subpuslapiai virsta kortelėmis su nuotraukomis. |
| 13.4 | garsas | patvirtinimas |

### KADRAS 3: Sukurtą navigaciją įterpiate pagal SLUG (17 sek.) — epizodas
**Failas:** `03-navigacija-pagal-sluga.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — į viengubas kabutes surenkamas navigacijos grupės raktas, spaudžiamas „Atnaujinti“. Viršuje puslapyje po antrašte sugula visos tos grupės nuorodos.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{nav('kiti_kontaktai')}}“, „Atnaujinti“, „Kiti kontaktai“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** grupe: Kiti kontaktai, slug: kiti_kontaktai, mokykla: Demo mokykla
**Tarimo kandidatai:** SLUG (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-navigacija-pagal-sluga--sc05_019.8.jpg`, `nuorodos/03-navigacija-pagal-sluga--sc02_001.8.jpg`
**Komentaras:** epizodas `ep_666_03_1` · dalis `dal_666_03` „Navigacijos pagal SLUG (sukurtos navigacijos) įterpimas“ · prioritetas 2 · pagrindas: dal_666_03 pavadinimas (teksto šaltinyje nėra — kl_666_1); scenos 810: 5, 2

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Kabutėse įrašote navigacijos grupės SLUG. |
| 2.8 | garsas | rasymas |
| 5.2 | balsas | Spaudžiate „Atnaujinti“. |
| 6.2 | garsas | spustelejimas |
| 7.6 | balsas | Puslapyje atsiranda visos tos grupės nuorodos. |
| 11.4 | balsas | Jas tvarkote navigacijų modulyje, ne čia. |
| 13.2 | garsas | patvirtinimas |

### KADRAS 4: Grupės SLUG randate modulyje „Meniu“ (18 sek.) — epizodas
**Failas:** `03-navigacijos-slugas.png`
**Ekrane:** Navigacijų modulis. Kursorius slenka grupių sąrašu su stulpeliais „Vardas“ ir „Aprašymas“ iki eilutės „Kiti kontaktai“ ir spaudžia „Redaguoti“. Formoje paryškėja laukas „Slug“, jo reikšmė pažymima ir nukopijuojama.
**Ekrano užrašai (tiksliai):** „Meniu“, „Vardas“, „Redaguoti“, „Slug“, „kiti_kontaktai“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** grupe: Kiti kontaktai, slug: kiti_kontaktai, mokykla: Demo mokykla
**Tarimo kandidatai:** SLUG (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-navigacijos-slugas--sc10_042.8.jpg`, `nuorodos/03-navigacijos-slugas--sc11_051.8.jpg`
**Komentaras:** epizodas `ep_666_03_2` · dalis `dal_666_03` „Navigacijos pagal SLUG (sukurtos navigacijos) įterpimas“ · prioritetas 1 · pagrindas: dal_666_03 pavadinimas (kl_666_1); scenos 810: 9, 11

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Navigacijų modulyje atidarote „Meniu“. |
| 2.6 | garsas | spustelejimas |
| 4.6 | balsas | Sąraše randate savo grupę ir spaudžiate „Redaguoti“. |
| 5.8 | garsas | spustelejimas |
| 8.9 | balsas | Lauke „Slug“ matote tai, ką rašysite į sintaksę. |
| 10.9 | garsas | spustelejimas |
| 13.2 | balsas | Jį pažymite ir nusikopijuojate. |
