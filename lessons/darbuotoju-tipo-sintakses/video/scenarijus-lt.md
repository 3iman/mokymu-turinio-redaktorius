# Video scenarijus: Darbuotojų tipo sintaksės — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1415048702 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 52 sek. (4 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_665` · senoji WP pamoka `darbuotoju-tipo-sintakses`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Profilio sintaksę randate sąraše | 13 sek. | 01-profilio-sintakse-sarase | Darbuotojų sąraše yra stulpelis su sintakse. Prie kiekvieno profilio joje matote jo numerį. Sintaksę pažymite ir nusikopijuojate. |
| 2 Kategorijos sintaksę randate kategorijose | 11 sek. | 01-kategorijos-sintakse | Kairėje pereinate į kategorijas. Prie kiekvienos matote jos sąrašo sintaksę. Nauja kategorija irgi turi. |
| 3 Profilį rodote be aprašymo | 13 sek. | 02-profilis-be-aprasymo | Po numerio įrašote papildomą nurodymą. Jis išjungia profilio aprašymo laukelį. Svetainėje lieka tik pareigos ir kontaktai. |
| 4 Visą kategoriją įterpiate pagal SLUG | 15 sek. | 03-kategorijos-sarasas-pagal-sluga | Kabutėse įrašote kategorijos SLUG. Jis turi sutapti su kategorijos sąrašu. Svetainėje atsiranda visi tos kategorijos darbuotojai. Kabučių nepamirštate. |

---

## Kadrai

### KADRAS 1: Profilio sintaksę randate sąraše (13 sek.) — epizodas
**Failas:** `01-profilio-sintakse-sarase.png`
**Ekrane:** Darbuotojų sąrašas su stulpeliais „Image“, „Full name“, „Sintaksė“ ir „Position“. Kursorius slenka iki demo darbuotojo eilutės, stulpelyje „Sintaksė“ paryškėja jo profilio kodas; jis pažymimas ir nukopijuojamas.
**Ekrano užrašai (tiksliai):** „Full name“, „Sintaksė“, „Position“, „{{ staff_single(6) }}“
**TVS UI komponentai:** tvs-row, tvs-cursor, tvs-filter, tvs-ripple
**Demo duomenys:** darbuotojas: Vincas Kudirka, pareigos: Direktorius, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-profilio-sintakse-sarase--sc01_004.3.jpg`, `nuorodos/01-profilio-sintakse-sarase--sc04_018.9.jpg`
**Komentaras:** epizodas `ep_665_01_1` · dalis `dal_665_01` „Kur rasti darbuotojų sąrašo ir konkretaus darbuotojo sintakses“ · prioritetas 1 · pagrindas: dal_665_01 paaiškinimas; scenos 796: 1, 4; įraše tikri darbuotojų vardai ir nuotraukos — explaineryje demo asmenys

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Darbuotojų sąraše yra stulpelis su sintakse. |
| 4.9 | balsas | Prie kiekvieno profilio joje matote jo numerį. |
| 8.7 | balsas | Sintaksę pažymite ir nusikopijuojate. |
| 9.7 | garsas | spustelejimas |

### KADRAS 2: Kategorijos sintaksę randate kategorijose (11 sek.) — epizodas
**Failas:** `01-kategorijos-sintakse.png`
**Ekrane:** Kairėje spaudžiamas punktas „Kategorijos“. Atsiveria lentelė su stulpeliais „Title“ ir „Sintaksė“; prie eilutės „Administracija“ paryškėja sugeneruota kategorijos sintaksė. Ji piešiama su viengubomis kabutėmis, kaip reikalauja dal_665_03 (TVS sąraše kabučių nėra — kl_665_2).
**Ekrano užrašai (tiksliai):** „Kategorijos“, „Title“, „Sintaksė“, „Administracija“
**TVS UI komponentai:** tvs-row, tvs-cursor, tvs-ripple
**Demo duomenys:** kategorija: Administracija, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-kategorijos-sintakse--sc02_011.3.jpg`
**Komentaras:** epizodas `ep_665_01_2` · dalis `dal_665_01` „Kur rasti darbuotojų sąrašo ir konkretaus darbuotojo sintakses“ · prioritetas 1 · pagrindas: dal_665_01 paaiškinimas („Naujai sukurta kategorija turės savo ir bus matoma Kategorijos sąraše“); scenos 796: 2; kabučių klausimas — kl_665_2

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kairėje pereinate į kategorijas. |
| 2.2 | garsas | spustelejimas |
| 4.0 | balsas | Prie kiekvienos matote jos sąrašo sintaksę. |
| 7.6 | balsas | Nauja kategorija irgi turi. |

### KADRAS 3: Profilį rodote be aprašymo (13 sek.) — epizodas
**Failas:** `02-profilis-be-aprasymo.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ su profilio sintakse; kursorius po numerio įrašo papildomą nurodymą garbanotuose skliaustuose. Viršuje demo profilio kortelėje ilgas aprašymo tekstas susitraukia ir dingsta — lieka nuotrauka, pareigos, darbo laikas ir kontaktai.
**Ekrano užrašai (tiksliai):** „Turinys“, „show_description“, „Pareigybės aprašas“, „Kontaktai“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** darbuotojas: Marija Pečkauskaitė, pareigos: Direktoriaus pavaduotoja ugdymui, el_pastas: m.peckauskaite@mokykla.lt, mokykla: Demo mokykla
**Tarimo kandidatai:** show_description (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-profilis-be-aprasymo--sc03_002.4.jpg`, `nuorodos/02-profilis-be-aprasymo--sc07_022.7.jpg`
**Komentaras:** epizodas `ep_665_02_1` · dalis `dal_665_02` „Darbuotojo profilio atvaizdavimas be aprašymo“ · prioritetas 2 · pagrindas: dal_665_02 paaiškinimas; scenos 800: 1, 7; reikšmė false ar true nepatvirtinta — kl_665_1, todėl balse neįvardijama

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Po numerio įrašote papildomą nurodymą. |
| 3.0 | garsas | rasymas |
| 5.0 | balsas | Jis išjungia profilio aprašymo laukelį. |
| 6.2 | garsas | spustelejimas |
| 8.3 | balsas | Svetainėje lieka tik pareigos ir kontaktai. |
| 9.9 | garsas | patvirtinimas |

### KADRAS 4: Visą kategoriją įterpiate pagal SLUG (15 sek.) — epizodas
**Failas:** `03-kategorijos-sarasas-pagal-sluga.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — kursorius surenka kategorijos sintaksę, viengubos kabutės aplink žodį trumpam paryškėja. Viršuje sugula visos tos kategorijos profilių kortelės viena po kita.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{ staff('administracija') }}“, „Administracija“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn
**Demo duomenys:** kategorija: administracija, mokykla: Demo mokykla
**Tarimo kandidatai:** SLUG (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-kategorijos-sarasas-pagal-sluga--sc01_000.3.jpg`, `nuorodos/03-kategorijos-sarasas-pagal-sluga--sc08_015.6.jpg`
**Komentaras:** epizodas `ep_665_03_1` · dalis `dal_665_03` „Darbuotojų sąrašo išvedimas pagal kategorijos SLUG“ · prioritetas 2 · pagrindas: dal_665_03 paaiškinimas; scenos 799: 1, 8

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Kabutėse įrašote kategorijos SLUG. |
| 2.8 | garsas | rasymas |
| 4.4 | balsas | Jis turi sutapti su kategorijos sąrašu. |
| 7.7 | balsas | Svetainėje atsiranda visi tos kategorijos darbuotojai. |
| 12.2 | balsas | Kabučių nepamirštate. |
| 13.0 | garsas | patvirtinimas |
