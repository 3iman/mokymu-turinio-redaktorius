# Video scenarijus: Naujienų tipo sintaksės — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1734314082 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 50 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_663` · senoji WP pamoka `naujienu-tipo-sintakses`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Straipsnius surenkate pagal žymas | 18 sek. | 01-straipsniai-pagal-zymas | Laužtiniuose skliaustuose išvardijate žymas. Kiekvieną rašote viengubose kabutėse. Svetainėje lieka tik tomis žymomis pažymėti straipsniai. Taip atskiriate vieno projekto informaciją. |
| 2 Konkretų straipsnį įterpiate pagal ID | 16 sek. | 02-straipsnis-pagal-id | Skliaustuose įrašote straipsnio numerį. Kiekvienam straipsniui — sava eilutė. Svetainėje jie atsiranda nurodyta tvarka. Senos informacijos perrašyti nereikia. |
| 3 Visą kategoriją parodote puslapyje | 16 sek. | 03-straipsniai-pagal-kategorija | Vietoj žymų nurodote kategorijos numerį. Puslapyje atsiranda visi jai priskirti straipsniai. Naujausi — viršuje. Sąrašo prižiūrėti nereikia. |

---

## Kadrai

### KADRAS 1: Straipsnius surenkate pagal žymas (18 sek.) — epizodas
**Failas:** `01-straipsniai-pagal-zymas.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — laužtiniuose skliaustuose viena po kitos atsiranda dvi žymos viengubose kabutėse. Viršuje puslapyje sugula tomis žymomis pažymėti straipsniai su data ir kategorija.
**Ekrano užrašai (tiksliai):** „Turinys“, „'erasmus'“, „'projektai'“, „Pranešimai ir straipsniai“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn
**Demo duomenys:** zymos: 'erasmus', 'projektai', mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-straipsniai-pagal-zymas--sc01_008.3.jpg`, `nuorodos/01-straipsniai-pagal-zymas--sc02_020.0.jpg`
**Komentaras:** epizodas `ep_663_01_1` · dalis `dal_663_01` „Straipsnių sąrašo išvedimas puslapyje pagal tagus, gali būti keli“ · prioritetas 2 · pagrindas: dal_663_01 paaiškinimas; scenos 808: 1, 2

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Laužtiniuose skliaustuose išvardijate žymas. |
| 2.8 | garsas | rasymas |
| 5.1 | balsas | Kiekvieną rašote viengubose kabutėse. |
| 8.5 | balsas | Svetainėje lieka tik tomis žymomis pažymėti straipsniai. |
| 13.1 | balsas | Taip atskiriate vieno projekto informaciją. |
| 14.5 | garsas | patvirtinimas |

### KADRAS 2: Konkretų straipsnį įterpiate pagal ID (16 sek.) — epizodas
**Failas:** `02-straipsnis-pagal-id.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — viena po kitos įrašomos dvi straipsnio sintaksės, skaičiai skliaustuose paryškėja. Viršuje po antrašte sugula tie patys du straipsniai su data, kategorija ir nuoroda „Plačiau“.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{news_item(36)}}“, „Plačiau“, „Kategorija: Pranešimai“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn
**Demo duomenys:** straipsnis: Prieš egzaminus, mokykla: Demo mokykla
**Tarimo kandidatai:** ID (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-straipsnis-pagal-id--sc03_010.8.jpg`, `nuorodos/02-straipsnis-pagal-id--sc05_022.2.jpg`
**Komentaras:** epizodas `ep_663_02_1` · dalis `dal_663_02` „Naujienos įterpimas pagal jos ID“ · prioritetas 2 · pagrindas: dal_663_02 paaiškinimas; scenos 795: 3, 5; autoriaus blokas su Cleverphant darbuotoju explaineryje nerodomas (DECISIONS 2026-10-15)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Skliaustuose įrašote straipsnio numerį. |
| 2.8 | garsas | rasymas |
| 4.7 | balsas | Kiekvienam straipsniui — sava eilutė. |
| 8.1 | balsas | Svetainėje jie atsiranda nurodyta tvarka. |
| 11.5 | balsas | Senos informacijos perrašyti nereikia. |
| 12.7 | garsas | patvirtinimas |

### KADRAS 3: Visą kategoriją parodote puslapyje (16 sek.) — epizodas
**Failas:** `03-straipsniai-pagal-kategorija.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — vietoj žymų sąrašo įrašomas kategorijos raktas ir jo numeris. Viršuje puslapyje sugula visi tai kategorijai priskirti straipsniai, naujausi viršuje.
**Ekrano užrašai (tiksliai):** „Turinys“, „category_id“, „Projektų straipsniai“, „Daugiau“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn
**Demo duomenys:** kategorija: Projektai, mokykla: Demo mokykla
**Tarimo kandidatai:** category_id (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-straipsniai-pagal-kategorija--sc02_001.3.jpg`, `nuorodos/03-straipsniai-pagal-kategorija--sc05_020.4.jpg`
**Komentaras:** epizodas `ep_663_03_1` · dalis `dal_663_03` „Straipsnių sąrašo išvedimas puslapyje pagal kategorijos ID“ · prioritetas 2 · pagrindas: dal_663_03 paaiškinimas; scenos 794: 2, 5; ekrane svetainės antraštė buvo „Naujausiai straipsniai“ — explaineryje naudojama demo antraštė

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Vietoj žymų nurodote kategorijos numerį. |
| 2.8 | garsas | rasymas |
| 5.0 | balsas | Puslapyje atsiranda visi jai priskirti straipsniai. |
| 9.2 | balsas | Naujausi — viršuje. |
| 11.6 | balsas | Sąrašo prižiūrėti nereikia. |
| 13.0 | garsas | patvirtinimas |
