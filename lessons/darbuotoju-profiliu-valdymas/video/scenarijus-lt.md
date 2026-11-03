# Video scenarijus: Darbuotojų profilių valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 3558490108 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 67 sek. (5 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_706` · senoji WP pamoka `darbuotoju-profiliu-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Darbo laiko lentelė | 14 sek. | 02-darbo-laiko-lentele | Laiką rašote su tašku, o tarp laikų – brūkšnys be tarpų. Pertrauka turi savo stulpelį. Nedirbamų dienų eilutes paliekate tuščias. |
| 2 Peržiūrite darbuotojų sąrašą | 13 sek. | 04-darbuotoju-sarasas | Meniu pasirenkate „Administracija“. Kiekvienas profilis – su nuotrauka ir pareigomis. Žemiau – dokumentai ir kontaktai. |
| 3 Randate profilio ID | 12 sek. | 06-profilio-id | Sąraše spaudžiate „Redaguoti“. Naršyklės adreso juostoje matote skaičių. Tai ir yra profilio ID. |
| 4 Profilio viršaus laukai | 13 sek. | 08-profilio-virsus | Prie darbuotojo spaudžiate „Redaguoti“. Viršuje pildote vardą, pavardę ir pareigas. Žemiau – aprašymas, darbo laikas ir kategorija. |
| 5 Profilio apačios laukai | 15 sek. | 08-profilio-apacia | Apačioje suvedate kontaktus. Įkeliate nuotrauką, CV ir pareigybės aprašą. Trims papildomiems dokumentams – savi laukai ir pavadinimai. |

---

## Kadrai

### KADRAS 1: Darbo laiko lentelė (14 sek.) — koncepcija
**Failas:** `02-darbo-laiko-lentele.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, do_4, dont_title
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: dvi darbo laiko lentelės greta. Dešinėje žalioje – laikas su tašku, brūkšnys be tarpų, pertrauka atskirame stulpelyje, nedirbamų dienų eilutės tuščios; kairėje raudonoje tie patys langeliai suformatuoti kitaip. Skirtumai sumirksi po vieną.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“, „9.00“
**TVS UI komponentai:** —
**Demo duomenys:** diena: Pirmadienis, laikas: 8.00–16.30
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-darbo-laiko-lentele--sc03_004.0.jpg`
**Komentaras:** epizodas `viz_706_02` · dalis `dal_706_02` „Darbo laikas“ · prioritetas 2 · pagrindas: dal_706_02 paaiškinimas; viz_706_02 laukai; scenos 845: 3 (darbo laiko lentelė svetainėje); eskizas 2026-10-31: liepiamoji nuosaka pakeista „jūs“ esamuoju laiku (tono taisyklė)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Laiką rašote su tašku, o tarp laikų – brūkšnys be tarpų. |
| 6.2 | balsas | Pertrauka turi savo stulpelį. |
| 8.7 | balsas | Nedirbamų dienų eilutes paliekate tuščias. |

### KADRAS 2: Peržiūrite darbuotojų sąrašą (13 sek.) — epizodas
**Failas:** `04-darbuotoju-sarasas.png`
**Ekrane:** Svetainės meniu „Struktūra ir kontaktai“ pasirenkama „Administracija“; puslapis lėtai slenka per profilių korteles — nuotrauka, pareigos, dokumentai, darbo laiko lentelė, kontaktai.
**Ekrano užrašai (tiksliai):** „Administracija“, „CV“, „Pareigybės aprašas“, „Darbo laikas“, „Kontaktai“
**TVS UI komponentai:** tvs-cursor, naujas: svetainės profilio kortelė (nuotrauka, pareigos, dokumentai, darbo laiko lentelė)
**Demo duomenys:** darbuotojas: Marija Pečkauskaitė, mokykla: Demo mokykla
**Tarimo kandidatai:** CV (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-darbuotoju-sarasas--sc03_004.0.jpg`, `nuorodos/04-darbuotoju-sarasas--sc04_005.1.jpg`
**Komentaras:** epizodas `ep_706_04_1` · dalis `dal_706_04` „Darbuotojų sąrašo atvaizdavimas“ · prioritetas 3 · pagrindas: dal_706_04 esmė (dalies tekstas tik nurodo į video); scenos 845: 2–5

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Meniu pasirenkate „Administracija“. |
| 2.6 | garsas | spustelejimas |
| 4.4 | balsas | Kiekvienas profilis – su nuotrauka ir pareigomis. |
| 8.5 | balsas | Žemiau – dokumentai ir kontaktai. |

### KADRAS 3: Randate profilio ID (12 sek.) — epizodas
**Failas:** `06-profilio-id.png`
**Ekrane:** Darbuotojų sąrašas; kursorius spaudžia „Redaguoti“, atsiveria forma, kamera priartėja prie naršyklės adreso juostos, kurioje sumirksi paskutinis skaičius.
**Ekrano užrašai (tiksliai):** „Darbuotojai“, „Redaguoti“, „/edit/6“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, naujas: naršyklės adreso juosta su paryškinta dalimi
**Demo duomenys:** id: 6
**Tarimo kandidatai:** ID (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-profilio-id--851-Profiliai_04.png`, `nuorodos/06-profilio-id--sc01_000.3.jpg`
**Komentaras:** epizodas `ep_706_06_1` · dalis `dal_706_06` „Profilio įrašas ir jo ID“ · prioritetas 2 · pagrindas: dal_706_06 paaiškinimas; nuotrauka 851 (ID adreso juostoje); scenos 846: 1 (sąrašo mygtukas „Redaguoti“); eskizas 2026-10-31: užvedus žymeklį adresas rodomas tik apatinėje būsenos juostoje — adreso juostoje jis atsiranda paspaudus (iliustracija 851)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Sąraše spaudžiate „Redaguoti“. |
| 2.6 | garsas | spustelejimas |
| 4.5 | balsas | Naršyklės adreso juostoje matote skaičių. |
| 7.9 | balsas | Tai ir yra profilio ID. |

### KADRAS 4: Profilio viršaus laukai (13 sek.) — epizodas
**Failas:** `08-profilio-virsus.png`
**Ekrane:** Darbuotojų sąraše spaudžiama „Redaguoti“; atsiveria forma ir kamera lėtai leidžiasi per laukus — kiekvieno pavadinimas sumirksi: vardas, pavardė, pareigos, aprašymas, darbo laikas, kategorija.
**Ekrano užrašai (tiksliai):** „First Name“, „Last Name“, „Position“, „Description“, „Hours“, „Category“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-cursor
**Demo duomenys:** darbuotojas: Vincas Kudirka, pareigos: Direktorius
**Tarimo kandidatai:** First Name, Position, Hours (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/08-profilio-virsus--sc02_003.7.jpg`, `nuorodos/08-profilio-virsus--sc03_006.1.jpg`
**Komentaras:** epizodas `ep_706_08_1` · dalis `dal_706_08` „Konkretaus darbuotojo įrašas“ · prioritetas 3 · pagrindas: dal_706_08 esmė (dalies tekstas tik nurodo į video); scenos 846: 2–3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Prie darbuotojo spaudžiate „Redaguoti“. |
| 2.4 | garsas | spustelejimas |
| 4.7 | balsas | Viršuje pildote vardą, pavardę ir pareigas. |
| 8.3 | balsas | Žemiau – aprašymas, darbo laikas ir kategorija. |

### KADRAS 5: Profilio apačios laukai (15 sek.) — epizodas
**Failas:** `08-profilio-apacia.png`
**Ekrane:** Ta pati forma, slenkama toliau: kontaktų laukai, nuotraukos ir CV įkėlimas, pareigybės aprašas ir trys dokumentų laukai su pavadinimais; apačioje sumirksi „Enabled“.
**Ekrano užrašai (tiksliai):** „Phone“, „Email“, „Image“, „Cv“, „Pareigos“, „Dokumentas #1“, „Enabled“
**TVS UI komponentai:** tvs-input, tvs-cursor, naujas: failo įkėlimo laukas (Select File / Upload)
**Demo duomenys:** telefonas: (8 37) 00 00 00, pastas: v.kudirka@mokykla.lt
**Tarimo kandidatai:** Cv, Email (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/08-profilio-apacia--sc03_014.1.jpg`, `nuorodos/08-profilio-apacia--sc03_018.1.jpg`
**Komentaras:** epizodas `ep_706_08_2` · dalis `dal_706_08` „Konkretaus darbuotojo įrašas“ · prioritetas 3 · pagrindas: dal_706_08 esmė; scenos 846: 3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Apačioje suvedate kontaktus. |
| 4.0 | balsas | Įkeliate nuotrauką, CV ir pareigybės aprašą. |
| 8.2 | balsas | Trims papildomiems dokumentams – savi laukai ir pavadinimai. |
