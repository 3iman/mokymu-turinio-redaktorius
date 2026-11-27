# Video scenarijus: Metraštis — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1389045693 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 76 sek. (5 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_908` · senoji WP pamoka `metrastis`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Kam metraštis | 13 sek. | 00-kam-metrastis | Istorija kaip ilgas tekstas – jos niekas neskaito. Metraštis ją sudeda į įrašus pagal metus. Kasmet pridedate vieną. |
| 2 Metraštis svetainėje | 18 sek. | 01-metrastis-svetaineje | Po tekstu – metų sąrašas ir kortelės. Kortelė: nuotrauka, metai, įžanga. Įrašas atsidaro atskirame puslapyje. „Tab“, rodyklės, „Enter“ – skaitytuvas skaito metus. |
| 3 Kur rasti | 14 sek. | 02-kur-rasti | Kairiajame meniu modulis vadinasi „Timeline“. Sąraše nuotrauka, pavadinimas, data, autorius. Tvarką lemia data, ne eilė sąraše. |
| 4 Sukuriate metraščio įrašą | 18 sek. | 03-metrascio-irasas | Modulyje „Timeline“ spaudžiate „Pridėti“. Pavadinime – metai, lauke „Data“ – įvykio data. Du sakiniai įžangoje, nuotrauka, „Išsaugoti“. Metraštyje atsiranda kortelė. |
| 5 Geras metraščio įrašas | 13 sek. | 04-geras-irasas | Vienas įvykis – vienas įrašas. Data iš dokumento, du trys sakiniai, viena nuotrauka. Laidai – numeris ir klasės nuotrauka. |

---

## Kadrai

### KADRAS 1: Kam metraštis (13 sek.) — koncepcija
**Failas:** `00-kam-metrastis.png`
**Šablonas:** `perziura` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `perziura`: ilgas istorijos tekstas suskyla į tris korteles su metais ir nuotrauka; trečia eilutė – nauja kortelė prisideda prie eilės.
**Ekrano užrašai (tiksliai):** „1946“, „1999“, „2016“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_908_00` · dalis `dal_908_00` „Kam tai“ · prioritetas 2 · pagrindas: dal_908_00 paaiškinimas; viz_908_00 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Istorija kaip ilgas tekstas – jos niekas neskaito. |
| 5.6 | balsas | Metraštis ją sudeda į įrašus pagal metus. |
| 9.0 | balsas | Kasmet pridedate vieną. |

### KADRAS 2: Metraštis svetainėje (18 sek.) — koncepcija
**Failas:** `01-metrastis-svetaineje.png`
**Šablonas:** `puslapio_maketas` · laukai: title, item_1, item_2, item_3, item_4
**Ekrane:** Šablonas `puslapio_maketas` (generatoriuje – kortelė su sąrašu): puslapio „Apie mokyklą“ apačia – išskleistas metų sąrašas, po juo kortelės su nuotrauka kairėje ir „Plačiau“; trečia eilutė – atskiras įrašo puslapis su metų juosta. Pabaigoje prieinamumo takelis: fokusas ant sąrašo, rodyklė, „Enter“, skaitytuvo burbulas su metais (3–5 s).
**Ekrano užrašai (tiksliai):** „Plačiau“, „Tab“, „Enter“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Tab, Enter (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_908_01` · dalis `dal_908_01` „Kaip atrodo svetainėje“ · prioritetas 2 · pagrindas: dal_908_01 paaiškinimas; viz_908_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Po tekstu – metų sąrašas ir kortelės. |
| 4.6 | balsas | Kortelė: nuotrauka, metai, įžanga. |
| 8.4 | balsas | Įrašas atsidaro atskirame puslapyje. |
| 11.4 | balsas | „Tab“, rodyklės, „Enter“ – skaitytuvas skaito metus. |

### KADRAS 3: Kur rasti (14 sek.) — koncepcija
**Failas:** `02-kur-rasti.png`
**Šablonas:** `ui_maketas` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `ui_maketas` (generatoriuje – kortelė su sąrašu): TVS kairysis meniu su paryškintu „Timeline“, sąrašo lentelė su keturiais stulpeliais ir mygtuku „Pridėti“ viršuje.
**Ekrano užrašai (tiksliai):** „Timeline“, „Pridėti“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Timeline (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_908_02` · dalis `dal_908_02` „Kur rasti“ · prioritetas 2 · pagrindas: dal_908_02 paaiškinimas; viz_908_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kairiajame meniu modulis vadinasi „Timeline“. |
| 4.9 | balsas | Sąraše nuotrauka, pavadinimas, data, autorius. |
| 9.1 | balsas | Tvarką lemia data, ne eilė sąraše. |

### KADRAS 4: Sukuriate metraščio įrašą (18 sek.) — epizodas
**Failas:** `03-metrascio-irasas.png`
**Ekrane:** TVS „Timeline“ sąrašas (Nuotraukos, Pavadinimas, Data, Autorius); kursorius spaudžia „Pridėti“. Forma: „Pavadinimas“ – „2016“, „Laida“, „Data“ su mėnesio sąrašu, „Intro“ – du sakiniai, „Body“, „Nuotraukos“ › „Upload“. Išsaugoma. Ekranas persijungia į svetainės puslapį „Apie mokyklą“: metraščio bloke metų sąraše atsiranda „2016“ ir nauja kortelė su nuotrauka.
**Ekrano užrašai (tiksliai):** „Timeline“, „Pridėti“, „Pavadinimas“, „Data“, „Intro“, „Nuotraukos“
**TVS UI komponentai:** tvs-table, tvs-btn, tvs-input, naujas: datos pasirinkimo laukas, tvs-file, tvs-cursor, tvs-ripple, tvs-site
**Demo duomenys:** pavadinimas: 2016, data: 2016-07-05, intro: Savivaldybės tarybos sprendimu prie mokyklos prijungta kaimyninė mokykla.
**Tarimo kandidatai:** Timeline, Intro, Body (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-metrascio-irasas--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_908_03_1` · dalis `dal_908_03` „Metraščio įrašas“ · prioritetas 2 · pagrindas: dal_908_03 paaiškinimas; skeleton admin/timeline/create 2026-10-18: laukai Pavadinimas *, Slug *, Laida, Data *, Intro, Body, Autorius, Nuotraukos; vlnau.cleverphant.lt/metrastis

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Modulyje „Timeline“ spaudžiate „Pridėti“. |
| 2.4 | garsas | spustelejimas |
| 4.5 | balsas | Pavadinime – metai, lauke „Data“ – įvykio data. |
| 6.7 | garsas | rasymas |
| 9.1 | balsas | Du sakiniai įžangoje, nuotrauka, „Išsaugoti“. |
| 11.1 | garsas | spustelejimas |
| 13.3 | balsas | Metraštyje atsiranda kortelė. |
| 14.7 | garsas | patvirtinimas |

### KADRAS 5: Geras metraščio įrašas (13 sek.) — koncepcija
**Failas:** `04-geras-irasas.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, dont_title, dont_1, dont_2, summary
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje žalia kortelė – viena ryški nuotrauka, data, trys eilutės teksto; dešinėje raudona – kortelė su penkiomis mažomis neryškiomis nuotraukomis ir ilgu tekstu apie kelis įvykius.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla, irasas: 2016 m. liepos 5 d. prijungta Demo centro mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_908_04` · dalis `dal_908_04` „Geras metraščio įrašas“ · prioritetas 2 · pagrindas: dal_908_04 paaiškinimas; viz_908_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Vienas įvykis – vienas įrašas. |
| 4.0 | balsas | Data iš dokumento, du trys sakiniai, viena nuotrauka. |
| 8.3 | balsas | Laidai – numeris ir klasės nuotrauka. |
