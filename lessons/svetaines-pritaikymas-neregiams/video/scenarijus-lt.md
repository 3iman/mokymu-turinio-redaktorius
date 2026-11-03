# Video scenarijus: Svetainės pritaikymas neregiams — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1622262953 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 101 sek. (8 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_1625` · senoji WP pamoka `svetaines-pritaikymas-neregiams`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Svetainę jie girdi | 12 sek. | 01-kam-tai-aktualu | Regintis į svetainę žiūri. Neregys ją girdi – skaitytuvas skaito viską. Todėl svetainę tvarkote ir techniškai. |
| 2 Įgūdžiai skiriasi | 10 sek. | 02-ar-visi-vienodai | Vieni naršo labai greitai. Kiti tik pradeda mokytis. Todėl struktūrą darote kuo aiškesnę. |
| 3 Ką duoda tvarkinga svetainė | 14 sek. | 03-tvarkinga-svetaine | Pažymėtos antraštės leidžia peršokti nuo temos prie temos. Aiškiai pavadinate mygtukus ir dokumentus. Lankytojas žino, ką rinktis, neatidaręs failo. |
| 4 Kada reikia alt aprašo | 13 sek. | 04-alt-aprasai | Alt aprašą rašote, kai paveikslėlis perteikia prasmę. Dekoratyviniam vaizdui jo nereikia. Perteklinis aprašas skaitytuvą tik stabdo. |
| 5 Mygtukas skaitymui balsu | 13 sek. | 05-skaitymo-mygtukai | Neregiams šio mygtuko dažniausiai nereikia. Skaitytuvą jie turi savo įrenginyje. Naudos matote kitur – esant skaitymo sunkumams. |
| 6 Specialių įrankių nereikia | 13 sek. | 06-be-specialiu-irankiu | Papildomų mygtukų ar atskiros versijos nekuriate. Įrankiai jau yra lankytojo įrenginyje. Lieka techninė kokybė ir standartai. |
| 7 Ne visos klaidos aktualios | 12 sek. | 07-patikros-klaidos | Automatinis įrankis rodo visas aptiktas klaidas. Dalis jų – spalvų kontrastai. Neregiams aktualias atsirenkate patys. |
| 8 Kaip testavome svetainę | 14 sek. | 08-kaip-testavome | Svetainę tikrinome automatiniais įrankiais. Rekomendacijų gavome iš neregio specialisto. Konsultuojamės toliau, todėl pastabas rašote mums. |

---

## Kadrai

### KADRAS 1: Svetainę jie girdi (12 sek.) — koncepcija
**Failas:** `01-kam-tai-aktualu.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje – akis ir svetainės maketas su spalvomis; dešinėje maketas blanksta iki garso bangos, o šalia bėga tekstas, kurį skaito ekrano skaitytuvas.
**Ekrano užrašai (tiksliai):** „Regintis vartotojas“, „Žiūri“, „Neregys“, „Girdi“, „Ekrano skaitytuvas“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1625_01` · dalis `dal_1625_01` „Kam tai aktualu?“ · prioritetas 1 · pagrindas: dal_1625_01 paaiškinimas; viz_1625_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Regintis į svetainę žiūri. |
| 3.6 | balsas | Neregys ją girdi – skaitytuvas skaito viską. |
| 7.3 | balsas | Todėl svetainę tvarkote ir techniškai. |

### KADRAS 2: Įgūdžiai skiriasi (10 sek.) — koncepcija
**Failas:** `02-ar-visi-vienodai.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, summary
**Ekrane:** Šablonas `palyginimas`: kairėje – greitai šokčiojantis fokuso rėmelis per antraštes; dešinėje tas pats rėmelis juda lėtai, po vieną elementą; apačioje lieka bendra eilutė apie aiškią struktūrą.
**Ekrano užrašai (tiksliai):** „Vieni“, „Naršo greitai“, „Kiti“, „Tik pradeda mokytis“, „Aiški struktūra“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1625_02` · dalis `dal_1625_02` „Ar visi neregiai svetainėmis naudojasi vienodai?“ · prioritetas 2 · pagrindas: dal_1625_02 paaiškinimas; viz_1625_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Vieni naršo labai greitai. |
| 3.6 | balsas | Kiti tik pradeda mokytis. |
| 6.2 | balsas | Todėl struktūrą darote kuo aiškesnę. |

### KADRAS 3: Ką duoda tvarkinga svetainė (14 sek.) — koncepcija
**Failas:** `03-tvarkinga-svetaine.png`
**Šablonas:** `naujas` · laukai: title, item_1, item_2, item_3, item_4
**Ekrane:** Šablonas `naujas` (siūlomas „jei_tai_poros“): keturios eilutės, kuriose kairė pusė yra svetainės elementas, o dešinė – ką dėl jo gali lankytojas; eilutės užsidega po vieną, fokuso rėmelis peršoka nuo antraštės prie antraštės.
**Ekrano užrašai (tiksliai):** „Pažymėtos antraštės“, „Galima peršokti“, „Aiškūs mygtukų pavadinimai“, „Aiškūs dokumentų pavadinimai“, „Paslėpta nuo skaitytuvo“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1625_03` · dalis `dal_1625_03` „Kokias problemas sprendžia techniškai tvarkinga svetainė?“ · prioritetas 1 · pagrindas: dal_1625_03 paaiškinimas; viz_1625_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Pažymėtos antraštės leidžia peršokti nuo temos prie temos. |
| 6.0 | balsas | Aiškiai pavadinate mygtukus ir dokumentus. |
| 9.5 | balsas | Lankytojas žino, ką rinktis, neatidaręs failo. |

### KADRAS 4: Kada reikia alt aprašo (13 sek.) — koncepcija
**Failas:** `04-alt-aprasai.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: dešinėje – prasmę perteikiantis paveikslėlis su alt eilute, kurią balsu perskaito skaitytuvas; kairėje – dekoratyvinė figūra, kurios alt eilutė išblunka, ir skaitytuvas ją praleidžia.
**Ekrano užrašai (tiksliai):** „Su alt aprašu“, „Perteikia prasmę“, „Be alt teksto“, „Dekoratyviniai vaizdai“, „Foniniai vaizdai“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** alt (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1625_04` · dalis `dal_1625_04` „Ar visiems paveikslėliams reikia uždėti ALT reikšmę?“ · prioritetas 2 · pagrindas: dal_1625_04 paaiškinimas; viz_1625_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Alt aprašą rašote, kai paveikslėlis perteikia prasmę. |
| 5.6 | balsas | Dekoratyviniam vaizdui jo nereikia. |
| 8.6 | balsas | Perteklinis aprašas skaitytuvą tik stabdo. |

### KADRAS 5: Mygtukas skaitymui balsu (13 sek.) — koncepcija
**Failas:** `05-skaitymo-mygtukai.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2
**Ekrane:** Šablonas `palyginimas`: kairėje – neregio įrenginys, kuriame skaitytuvas jau veikia, o svetainės mygtukas lieka nepaspaustas; dešinėje tas pats mygtukas pasitarnauja skaitančiajam su sunkumais ir klausančiam prie vairo.
**Ekrano užrašai (tiksliai):** „Neregiams“, „Dažniausiai nereikalingi“, „Skaitymo sunkumai“, „Disleksija“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** disleksija (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1625_05` · dalis `dal_1625_05` „Kodėl kai kuriose svetainėse yra papildomi mygtukai „skaitymui balsu“?“ · prioritetas 3 · pagrindas: dal_1625_05 paaiškinimas; viz_1625_05 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Neregiams šio mygtuko dažniausiai nereikia. |
| 4.8 | balsas | Skaitytuvą jie turi savo įrenginyje. |
| 7.8 | balsas | Naudos matote kitur – esant skaitymo sunkumams. |

### KADRAS 6: Specialių įrankių nereikia (13 sek.) — koncepcija
**Failas:** `06-be-specialiu-irankiu.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, dont_title, dont_1, dont_2, do_title, do_1, do_2, do_3, summary
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje – svetainė, apkarstyta papildomais mygtukais ir atskira versija, viskas perbraukiama; dešinėje – švarus puslapis, kurio kode užsidega tvarkingos žymos, o patikros įrankis rodo žalią rezultatą.
**Ekrano užrašai (tiksliai):** „Nereikia“, „Papildomų mygtukų“, „Atskirų versijų“, „Reikia“, „HTML standartų“, „Techninės kokybės“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** HTML (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1625_06` · dalis `dal_1625_06` „Ar neregiams reikia specialių įrankių puslapyje?“ · prioritetas 2 · pagrindas: dal_1625_06 paaiškinimas; viz_1625_06 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Papildomų mygtukų ar atskiros versijos nekuriate. |
| 5.3 | balsas | Įrankiai jau yra lankytojo įrenginyje. |
| 8.5 | balsas | Lieka techninė kokybė ir standartai. |

### KADRAS 7: Ne visos klaidos aktualios (12 sek.) — koncepcija
**Failas:** `07-patikros-klaidos.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, summary
**Ekrane:** Šablonas `palyginimas`: kairėje – ilgas automatinio įrankio klaidų sąrašas, dešinėje iš jo atsirenkamos tik tos eilutės, kurias pajunta ekrano skaitytuvas; spalvų kontrasto eilutės nusistumia į šalį.
**Ekrano užrašai (tiksliai):** „WAVE“, „Visos aptiktos klaidos“, „Spalvų kontrastai“, „Aktualu neregiams“, „Ekrano skaitytuvas“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** WAVE (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1625_07` · dalis `dal_1625_07` „Kodėl tikrinant mūsų svetainę per WAVE matome daug klaidų?“ · prioritetas 2 · pagrindas: dal_1625_07 paaiškinimas; viz_1625_07 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Automatinis įrankis rodo visas aptiktas klaidas. |
| 5.2 | balsas | Dalis jų – spalvų kontrastai. |
| 7.7 | balsas | Neregiams aktualias atsirenkate patys. |

### KADRAS 8: Kaip testavome svetainę (14 sek.) — koncepcija
**Failas:** `08-kaip-testavome.png`
**Šablonas:** `srautas` · laukai: title, step1_label, step1_desc, arrow_label_1, step2_label, step2_desc, arrow_label_2, step3_label, step3_desc, summary
**Ekrane:** Šablonas `srautas`: trys kortelės su rodyklėmis – automatinės patikros ataskaita, neregio specialisto pastabų lapas ir besitęsiančio bendradarbiavimo ratas; paskutinė rodyklė sukasi, rodydama, kad darbas nesibaigia.
**Ekrano užrašai (tiksliai):** „Lighthouse, WAVE“, „Neregio specialisto pastabos“, „Konsultuojamės toliau“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Lighthouse, WAVE (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1625_08` · dalis `dal_1625_08` „Kaip buvo testuojama mūsų interneto svetainių modelis?“ · prioritetas 3 · pagrindas: dal_1625_08 paaiškinimas; viz_1625_08 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Svetainę tikrinome automatiniais įrankiais. |
| 4.8 | balsas | Rekomendacijų gavome iš neregio specialisto. |
| 8.5 | balsas | Konsultuojamės toliau, todėl pastabas rašote mums. |
