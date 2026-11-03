# Video scenarijus: Informacija lengvai suprantama kalba — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 3917615244 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 110 sek. (8 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_1621` · senoji WP pamoka `informacija-lengvai-suprantama-kalba`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Tekstą patikrina nemokamai | 13 sek. | 01-teksto-patikra | Peržiūrite adaptuotą tekstą ir patikrinate faktus. Užpildytą teksto rengimo formą siunčiate agentūrai. Atsakymo laukiate apie mėnesį. |
| 2 Kas yra lengvai suprantama kalba | 13 sek. | 02-kas-tai-yra | Rašote taip, kad suprastų kuo daugiau žmonių. Ir tie, kuriems skaityti ar suvokti sunku. Angliškas pavadinimas – easy to read. |
| 3 Kam tai aktualu | 13 sek. | 03-kam-tai-aktualu | Ši kalba svarbi daugiau žmonių, nei atrodo. Suvokimo sunkumai, amžius, kita gimtoji kalba. Padedate suprasti greičiau ir tiksliau. |
| 4 Tas pats dviem būdais | 13 sek. | 04-sunkus-ir-lengvas-sakinys | Kairėje – ilgas biurokratinis sakinys. Dešinėje tą patį pasakote trumpai. Trumpi sakiniai, įprasti žodžiai, svarbiausia pradžioje. |
| 5 Ne visą svetainę | 13 sek. | 05-ar-visa-turini | Visos svetainės perrašyti nereikia. Parengiate atskirą versiją arba aiškiai atskirtus skyrius. Tekstas paprastas, bet ne infantilus. |
| 6 Pradedate naują subpuslapį | 13 sek. | 06-naujas-subpuslapis | Prie puslapio spaudžiate „Pridėti subpuslapį“. Lange renkatės lengvai suprantamos kalbos maketą. Atsiveria tuščia naujo puslapio forma. |
| 7 Pridedate lengvos kalbos bloką | 14 sek. | 06-lengvos-kalbos-blokas | Formoje slenkate iki skilties „Lengvai suprantama kalba“. Spaudžiate „Add Row“. Atsiranda blokas tekstui ir nuotraukai. |
| 8 Pasižiūrite esamą pavyzdį | 18 sek. | 06-esamas-pavyzdys | Medyje spaudžiate esamo pavyzdžio pavadinimą. Peržiūrite, kaip užpildyti blokai. Vienas blokas – viena mintis ir viena piktograma. Apačioje surašote autorius ir iliustracijų šaltinius. |

---

## Kadrai

### KADRAS 1: Tekstą patikrina nemokamai (13 sek.) — koncepcija
**Failas:** `01-teksto-patikra.png`
**Šablonas:** `srautas` · laukai: title, step1_label, step1_desc, arrow_label_1, step2_label, step2_desc, arrow_label_2, step3_label, step3_desc
**Ekrane:** Šablonas `srautas`: trys kortelės su rodyklėmis. Pirmoje – adaptuoto teksto lapas su varnele prie patikrintų faktų; antroje – Word forma, nuo jos rodyklė su el. pašto užrašu į trečią kortelę; trečioje – agentūros atsakymas su rekomendacijomis, po juo išsiskleidžia laiko juosta „apie mėnesį“.
**Ekrano užrašai (tiksliai):** „Teksto rengimo forma“, „kc@anta.lt“, „Rekomendacijos“, „apie mėnesį“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** kc@anta.lt (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-teksto-patikra--1640-Suprantama_kalba.jpg`
**Komentaras:** epizodas `viz_1621_01` · dalis `dal_1621_01` „Ko reikia iš mokyklos?“ · prioritetas 2 · pagrindas: dal_1621_01 paaiškinimas; viz_1621_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Peržiūrite adaptuotą tekstą ir patikrinate faktus. |
| 5.3 | balsas | Užpildytą teksto rengimo formą siunčiate agentūrai. |
| 9.5 | balsas | Atsakymo laukiate apie mėnesį. |

### KADRAS 2: Kas yra lengvai suprantama kalba (13 sek.) — koncepcija
**Failas:** `02-kas-tai-yra.png`
**Šablonas:** `naujas` · laukai: title, term, definition, scope_1, scope_2
**Ekrane:** Šablonas `naujas` (siūlomas „apibrezimas“): centre terminas ir po juo viena apibrėžimo eilutė; aplink iš vieno žmogaus silueto išauga žmonių ratas, rodantis, kad tekstas skirtas kuo platesnei auditorijai.
**Ekrano užrašai (tiksliai):** „Easy to read“, „Lengva suprasti“, „Skaitymo sunkumai“, „Kuo daugiau žmonių“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** easy to read (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1621_02` · dalis `dal_1621_02` „Kas tai yra?“ · prioritetas 2 · pagrindas: dal_1621_02 paaiškinimas; viz_1621_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Rašote taip, kad suprastų kuo daugiau žmonių. |
| 4.9 | balsas | Ir tie, kuriems skaityti ar suvokti sunku. |
| 8.4 | balsas | Angliškas pavadinimas – easy to read. |

### KADRAS 3: Kam tai aktualu (13 sek.) — koncepcija
**Failas:** `03-kam-tai-aktualu.png`
**Šablonas:** `naujas` · laukai: title, item_1, item_2, item_3, item_4, benefit_1, benefit_2, benefit_3
**Ekrane:** Šablonas `naujas` (siūlomas „kortele_su_sarasu“): kairėje po vieną pasirodo keturios auditorijos kortelės su piktogramomis; dešinėje, kai sąrašas užsipildo, išsiskleidžia trys naudos eilutės.
**Ekrano užrašai (tiksliai):** „Intelekto ar raidos sutrikimai“, „Vyresnio amžiaus žmonės“, „Kita gimtoji kalba“, „Sunku susikaupti“, „Greičiau suprasti“, „Daugiau savarankiškumo“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1621_03` · dalis `dal_1621_03` „Kam tai aktualu?“ · prioritetas 2 · pagrindas: dal_1621_03 paaiškinimas; viz_1621_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Ši kalba svarbi daugiau žmonių, nei atrodo. |
| 4.8 | balsas | Suvokimo sunkumai, amžius, kita gimtoji kalba. |
| 8.6 | balsas | Padedate suprasti greičiau ir tiksliau. |

### KADRAS 4: Tas pats dviem būdais (13 sek.) — koncepcija
**Failas:** `04-sunkus-ir-lengvas-sakinys.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, summary
**Ekrane:** Šablonas `palyginimas`: kairėje pilkoje kortelėje ilgas biurokratinis sakinys, dešinėje žalioje – trumpas. Ilgajame sakinyje perteklinai žodžiai po vieną išblunka, kol lieka trumpasis variantas.
**Ekrano užrašai (tiksliai):** „Sunkiai suprantamas sakinys“, „Lengvai suprantama kalba“, „Trumpi sakiniai“, „Svarbiausia – pradžioje“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1621_04` · dalis `dal_1621_04` „Kaip atrodo tekstas lengvai suprantama kalba?“ · prioritetas 1 · pagrindas: dal_1621_04 paaiškinimas (abu pavyzdžio sakiniai); viz_1621_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kairėje – ilgas biurokratinis sakinys. |
| 4.4 | balsas | Dešinėje tą patį pasakote trumpai. |
| 7.3 | balsas | Trumpi sakiniai, įprasti žodžiai, svarbiausia pradžioje. |

### KADRAS 5: Ne visą svetainę (13 sek.) — koncepcija
**Failas:** `05-ar-visa-turini.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, dont_title, dont_1, dont_2, summary
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: dešinėje žalioje kortelėje – svetainės maketas su atskira lengvos kalbos versija ir aiškiai atskirtu skyriumi; kairėje raudonoje – visa svetainė, perrašyta vaikiškai, su perbraukimu.
**Ekrano užrašai (tiksliai):** „Atskira versija“, „Aiškiai atskirti skyriai“, „Paprastas, ne infantilus“, „Ne visa svetainė“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1621_05` · dalis `dal_1621_05` „Ar visą svetainės turinį reikia rašyti lengvai suprantama kalba?“ · prioritetas 2 · pagrindas: dal_1621_05 paaiškinimas; viz_1621_05 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Visos svetainės perrašyti nereikia. |
| 4.2 | balsas | Parengiate atskirą versiją arba aiškiai atskirtus skyrius. |
| 9.0 | balsas | Tekstas paprastas, bet ne infantilus. |

### KADRAS 6: Pradedate naują subpuslapį (13 sek.) — epizodas
**Failas:** `06-naujas-subpuslapis.png`
**Ekrane:** TVS puslapių medis; kamera priartėja prie eilutės apie lengvai suprantamą kalbą, kursorius spaudžia „+Pridėti subpuslapį“. Atsiveria tipų langas, jame renkamasi „Lengvai suprantama kalba layout“, ir ekranas persijungia į tuščią puslapio formą su laukais „Pavadinimas“ ir „Slug“.
**Ekrano užrašai (tiksliai):** „+Pridėti subpuslapį“, „Lengvai suprantama kalba layout“, „Pavadinimas“, „Slug“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, tvs-ripple, tvs-window, naujas: tipo pasirinkimo langas su sąrašu
**Demo duomenys:** mokykla: Demo mokykla, puslapis: Informacija lengvai suprantama kalba
**Tarimo kandidatai:** layout, Slug (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-naujas-subpuslapis--sc01_000.3.jpg`, `nuorodos/06-naujas-subpuslapis--klik01_005.8.jpg`, `nuorodos/06-naujas-subpuslapis--sc04_008.8.jpg`
**Komentaras:** epizodas `ep_1621_06_1` · dalis `dal_1621_06` „Kaip tokį tipo tekstą įkelti į svetainę?“ · prioritetas 1 · pagrindas: dal_1621_06 paaiškinimas (1–2 žingsniai); scenos 1630: 1–4

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prie puslapio spaudžiate „Pridėti subpuslapį“. |
| 2.6 | garsas | spustelejimas |
| 5.0 | balsas | Lange renkatės lengvai suprantamos kalbos maketą. |
| 6.4 | garsas | spustelejimas |
| 9.1 | balsas | Atsiveria tuščia naujo puslapio forma. |

### KADRAS 7: Pridedate lengvos kalbos bloką (14 sek.) — epizodas
**Failas:** `06-lengvos-kalbos-blokas.png`
**Ekrane:** Naujo puslapio forma; slenkama iki skilties „Lengvai suprantama kalba“, kursorius spaudžia „Add Row“, trumpai mirkteli „Loading...“ ir atsiveria blokas su laukais „Bloko pavadinimas“, „Tekstas lengvai sk“ ir „Nuotrauka lengvai sk“.
**Ekrano užrašai (tiksliai):** „Lengvai suprantama kalba“, „Add Row“, „Bloko pavadinimas“, „Tekstas lengvai sk“, „Nuotrauka lengvai sk“
**TVS UI komponentai:** tvs-btn, tvs-input, tvs-cursor, tvs-ripple, naujas: kartotinio bloko juosta
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Add Row (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-lengvos-kalbos-blokas--klik04_015.1.jpg`, `nuorodos/06-lengvos-kalbos-blokas--sc08_015.9.jpg`, `nuorodos/06-lengvos-kalbos-blokas--sc10_018.8.jpg`
**Komentaras:** epizodas `ep_1621_06_2` · dalis `dal_1621_06` „Kaip tokį tipo tekstą įkelti į svetainę?“ · prioritetas 2 · pagrindas: dal_1621_06 paaiškinimas (3 žingsnis); scenos 1630: 6–10

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Formoje slenkate iki skilties „Lengvai suprantama kalba“. |
| 5.9 | balsas | Spaudžiate „Add Row“. |
| 7.1 | garsas | spustelejimas |
| 8.9 | balsas | Atsiranda blokas tekstui ir nuotraukai. |
| 10.9 | garsas | patvirtinimas |

### KADRAS 8: Pasižiūrite esamą pavyzdį (18 sek.) — epizodas
**Failas:** `06-esamas-pavyzdys.png`
**Ekrane:** Puslapių medyje kursorius spaudžia esamo pavyzdinio subpuslapio pavadinimą; atsivėrusiame puslapyje greitai slenkama per užpildytus blokus – kiekviename trumpas tekstas ir viena piktograma. Pabaigoje matomas puslapio apačios blokas su autoriais ir iliustracijų šaltiniais.
**Ekrano užrašai (tiksliai):** „Tekstas lengvai sk“, „Nuotrauka lengvai sk“, „Tekstas puslapio apačioje“, „Autoriai“, „Iliustracijų šaltiniai“
**TVS UI komponentai:** tvs-row, tvs-cursor, tvs-ripple, tvs-file, naujas: kartotinio bloko juosta
**Demo duomenys:** mokykla: Demo mokykla, pavyzdys: Kviečiame susipažinti su Demo mokykla, direktore: Marija Pečkauskaitė
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-esamas-pavyzdys--klik07_026.9.jpg`, `nuorodos/06-esamas-pavyzdys--sc17_031.4.jpg`, `nuorodos/06-esamas-pavyzdys--sc22_037.6.jpg`, `nuorodos/06-esamas-pavyzdys--sc26_042.0.jpg`
**Komentaras:** epizodas `ep_1621_06_3` · dalis `dal_1621_06` „Kaip tokį tipo tekstą įkelti į svetainę?“ · prioritetas 2 · pagrindas: dal_1621_06 paaiškinimas („pasižiūrėti į esamą pavyzdį“); scenos 1630: 14–26

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Medyje spaudžiate esamo pavyzdžio pavadinimą. |
| 2.6 | garsas | spustelejimas |
| 4.9 | balsas | Peržiūrite, kaip užpildyti blokai. |
| 8.3 | balsas | Vienas blokas – viena mintis ir viena piktograma. |
| 12.4 | balsas | Apačioje surašote autorius ir iliustracijų šaltinius. |
