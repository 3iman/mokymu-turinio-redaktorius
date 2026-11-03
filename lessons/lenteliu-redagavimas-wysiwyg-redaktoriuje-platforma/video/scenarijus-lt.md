# Video scenarijus: Lentelių redagavimas WYSIWYG redaktoriuje — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 3009692444 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 106 sek. (8 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_1585` · senoji WP pamoka `lenteliu-redagavimas-wysiwyg-redaktoriuje`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Kada tinka WYSIWYG redaktorius | 15 sek. | 01-irankio-pasirinkimas | Redaktorius tinka paprastoms, retai keičiamoms lentelėms. Kai pildo keli žmonės, renkatės „Google Sheets“. Netelpa į plotį, tada tinka PDF. |
| 2 Pridedate eilutę dešiniuoju klavišu | 9 sek. | 02-nauja-eilute | Ant celės spaudžiate dešinį pelės klavišą. Pasirenkate „Row“ ir „Insert Row After“. |
| 3 Pirmą eilutę paverčiate antrašte | 14 sek. | 03-pirma-eilute-antraste | Dešiniuoju klavišu atveriate „Table Properties“. Lauke „Headers“ pasirenkate „First Row“. Spaudžiate „OK“ ir eilutė tampa antraštine. |
| 4 Celę paverčiate antrašte | 15 sek. | 03-cele-antraste | Ant celės spaudžiate dešinį pelės klavišą. Pasirenkate „Cell Properties“. Lauke „Cell Type“ parenkate „Header“. Taip paryškinate ir kairės pusės stulpelį. |
| 5 Išvalote lentelės formatavimą | 12 sek. | 04-isvalote-formatavima | Pažymite visą lentelę klavišais „CTRL+A“. Spaudžiate mygtuką „Tx“. Šiukšlės dingsta, lentelė išsisaugo visa. |
| 6 Nustatote lentelės plotį 100 % | 12 sek. | 05-plotis-100 | Atveriate „Table Properties“. Lauke „Width“ įrašote šimtą procentų. Lentelė prisitaiko prie bet kokio ekrano. |
| 7 Įdedate perspėjimo sintaksę | 14 sek. | 05-perspejimo-sintakse | Prieš lentelę įdedate paruoštą perspėjimo sintaksę. Lankytojas pamato pranešimą virš lentelės. Jis sužino, kad lentelę galima slinkti. |
| 8 Semantikos klaidos | 15 sek. | 06-semantikos-klaidos | Šios klaidos kenkia tam, ką suvokia skaitytuvai. Lentelė lentelėje, bold vietoj antraštės, tuščia eilutė. Antraštei naudojate celės tipą „Header“. |

---

## Kadrai

### KADRAS 1: Kada tinka WYSIWYG redaktorius (15 sek.) — koncepcija
**Failas:** `01-irankio-pasirinkimas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, old_step_3, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: animuojama esama iliustracija 1701. Kairėje kortelė „Tinka“ su trimis punktais, dešinėje „Nebepakanka“; apačioje išplaukia eilutė su alternatyvomis.
**Ekrano užrašai (tiksliai):** „Tinka“, „Nebepakanka“, „Google Sheets“, „PDF“
**TVS UI komponentai:** —
**Demo duomenys:** pavyzdys: Pamokų laikas, trumpa kainodara
**Tarimo kandidatai:** WYSIWYG, PDF (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-irankio-pasirinkimas--1701-01-irankio-pasirinkimas.png`
**Komentaras:** epizodas `viz_1585_01` · dalis `dal_1585_01` „Kada WYSIWYG redaktorius yra tinkamas įrankis“ · prioritetas 1 · pagrindas: dal_1585_01 paaiškinimas; viz_1585_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Redaktorius tinka paprastoms, retai keičiamoms lentelėms. |
| 5.9 | balsas | Kai pildo keli žmonės, renkatės „Google Sheets“. |
| 9.9 | balsas | Netelpa į plotį, tada tinka PDF. |

### KADRAS 2: Pridedate eilutę dešiniuoju klavišu (9 sek.) — epizodas
**Failas:** `02-nauja-eilute.png`
**Ekrane:** Turinio redaktoriuje lentelė; kursorius spaudžia celę dešiniuoju pelės klavišu. Iškrinta meniu, pasirenkama „Row“, šalia atsiveria submeniu — lentelėje atsiranda nauja eilutė.
**Ekrano užrašai (tiksliai):** „Cell“, „Row“, „Column“, „Insert Row After“, „Table Properties“
**TVS UI komponentai:** tvs-table, tvs-row, tvs-cursor, tvs-ripple, naujas: kontekstinis meniu su submeniu
**Demo duomenys:** lentele: Pamokų laikas
**Tarimo kandidatai:** Row, Insert Row After (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-nauja-eilute--1708-07-panasumas-su-word-v2.png`
**Komentaras:** epizodas `ep_1585_02_1` · dalis `dal_1585_02` „Panašumas su Word teksto redaktoriumi“ · prioritetas 2 · pagrindas: dal_1585_02 paaiškinimas; paveikslėlis 1708 (kontekstinis meniu); eskizas 2026-10-31: pridėti trūkstami spustelėjimai (meniu punktas, pasirinkimo laukas, „OK“ / „Tx“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Ant celės spaudžiate dešinį pelės klavišą. |
| 2.4 | garsas | spustelejimas |
| 4.5 | balsas | Pasirenkate „Row“ ir „Insert Row After“. |
| 6.6 | garsas | spustelejimas |
| 7.1 | garsas | patvirtinimas |

### KADRAS 3: Pirmą eilutę paverčiate antrašte (14 sek.) — epizodas
**Failas:** `03-pirma-eilute-antraste.png`
**Ekrane:** Turinio redaktoriuje lentelė; dešiniuoju klavišu atveriamas meniu ir pasirenkama „Table Properties“. Lange lauke „Headers“ parenkama „First Row“, spaudžiama „OK“ — pirma eilutė tampa antraštine.
**Ekrano užrašai (tiksliai):** „Table Properties“, „Headers“, „First Row“, „OK“
**TVS UI komponentai:** tvs-table, tvs-btn, tvs-cursor, tvs-ripple, naujas: nustatymų langas su išskleidžiamu lauku
**Demo duomenys:** lentele: Gimnazijos taryba
**Tarimo kandidatai:** Table Properties, Headers, First Row (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-pirma-eilute-antraste--1702-02-antrastine-du-keliai.png`, `nuorodos/03-pirma-eilute-antraste--1708-07-panasumas-su-word-v2.png`
**Komentaras:** epizodas `ep_1585_03_1` · dalis `dal_1585_03` „Antraštinė eilutė: du keliai“ · prioritetas 1 · pagrindas: dal_1585_03 paaiškinimas; paveikslėliai 1702 ir 1708 (kaip atveriamas „Table Properties“); eskizas 2026-10-31: pridėti trūkstami spustelėjimai (meniu punktas, pasirinkimo laukas, „OK“ / „Tx“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Dešiniuoju klavišu atveriate „Table Properties“. |
| 2.6 | garsas | spustelejimas |
| 3.6 | garsas | spustelejimas |
| 5.2 | balsas | Lauke „Headers“ pasirenkate „First Row“. |
| 6.4 | garsas | spustelejimas |
| 7.0 | garsas | spustelejimas |
| 8.6 | balsas | Spaudžiate „OK“ ir eilutė tampa antraštine. |
| 9.5 | garsas | spustelejimas |
| 10.0 | garsas | patvirtinimas |

### KADRAS 4: Celę paverčiate antrašte (15 sek.) — epizodas
**Failas:** `03-cele-antraste.png`
**Ekrane:** Lentelė su keliomis antraštėmis; kursorius spaudžia celę dešiniuoju klavišu ir pasirenka „Cell Properties“. Lange lauke „Cell Type“ parenkama „Header“, spaudžiama „OK“ — celė nusispalvina.
**Ekrano užrašai (tiksliai):** „Cell Properties“, „Cell Type“, „Header“, „OK“
**TVS UI komponentai:** tvs-table, tvs-th, tvs-btn, tvs-cursor, naujas: nustatymų langas su išskleidžiamu lauku
**Demo duomenys:** lentele: Mokytojai ir tėvai
**Tarimo kandidatai:** Cell Properties, Cell Type, Header (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-cele-antraste--1702-02-antrastine-du-keliai.png`
**Komentaras:** epizodas `ep_1585_03_2` · dalis `dal_1585_03` „Antraštinė eilutė: du keliai“ · prioritetas 1 · pagrindas: dal_1585_03 paaiškinimas; paveikslėlis 1702; eskizas 2026-10-31: pridėti trūkstami spustelėjimai (meniu punktas, pasirinkimo laukas, „OK“ / „Tx“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Ant celės spaudžiate dešinį pelės klavišą. |
| 2.6 | garsas | spustelejimas |
| 4.7 | balsas | Pasirenkate „Cell Properties“. |
| 5.7 | garsas | spustelejimas |
| 7.3 | balsas | Lauke „Cell Type“ parenkate „Header“. |
| 8.0 | garsas | spustelejimas |
| 8.6 | garsas | spustelejimas |
| 9.6 | garsas | spustelejimas |
| 10.4 | balsas | Taip paryškinate ir kairės pusės stulpelį. |
| 11.8 | garsas | patvirtinimas |

### KADRAS 5: Išvalote lentelės formatavimą (12 sek.) — epizodas
**Failas:** `04-isvalote-formatavima.png`
**Ekrane:** Turinio redaktoriuje lentelė su paslėptu formatavimu. Kursorius pažymi visą lentelę klavišais „CTRL+A“, tada įrankių juostoje spaudžia mygtuką „Tx“ — paslėptas formatavimas dingsta.
**Ekrano užrašai (tiksliai):** „Tx“, „CTRL+A“
**TVS UI komponentai:** tvs-table, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** lentele: Darbo užmokestis
**Tarimo kandidatai:** Tx, CTRL (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-isvalote-formatavima--1703-03-klastingas-simptomas.png`
**Komentaras:** epizodas `ep_1585_04_1` · dalis `dal_1585_04` „Lentelių stiliaus išvalymas“ · prioritetas 2 · pagrindas: dal_1585_04 paaiškinimas; eskizas 2026-10-31: pridėti trūkstami spustelėjimai (meniu punktas, pasirinkimo laukas, „OK“ / „Tx“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Pažymite visą lentelę klavišais „CTRL+A“. |
| 2.4 | garsas | spustelejimas |
| 4.9 | balsas | Spaudžiate mygtuką „Tx“. |
| 5.5 | garsas | spustelejimas |
| 5.9 | garsas | patvirtinimas |
| 7.3 | balsas | Šiukšlės dingsta, lentelė išsisaugo visa. |

### KADRAS 6: Nustatote lentelės plotį 100 % (12 sek.) — epizodas
**Failas:** `05-plotis-100.png`
**Ekrane:** Lentelė, kuri netelpa į svetainės plotį. Dešiniuoju klavišu atveriama „Table Properties“, lauke „Width“ įrašoma „100%“ ir spaudžiama „OK“ — lentelė prisitaiko prie ekrano.
**Ekrano užrašai (tiksliai):** „Table Properties“, „Width“, „100%“, „OK“
**TVS UI komponentai:** tvs-table, tvs-input, tvs-btn, tvs-cursor
**Demo duomenys:** lentele: Pamokų tvarkaraštis
**Tarimo kandidatai:** Table Properties, Width (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-plotis-100--1702-02-antrastine-du-keliai.png`, `nuorodos/05-plotis-100--1704-04-kai-netelpa.png`
**Komentaras:** epizodas `ep_1585_05_1` · dalis `dal_1585_05` „Lentelės plotis 100% ir ką daryti, kai netelpa“ · prioritetas 2 · pagrindas: dal_1585_05 paaiškinimas; paveikslėlis 1702 (laukas „Width“, mygtukas „OK“); eskizas 2026-10-31: pridėti trūkstami spustelėjimai (meniu punktas, pasirinkimo laukas, „OK“ / „Tx“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Atveriate „Table Properties“. |
| 2.2 | garsas | spustelejimas |
| 2.8 | garsas | spustelejimas |
| 3.8 | balsas | Lauke „Width“ įrašote šimtą procentų. |
| 5.0 | garsas | rasymas |
| 6.6 | garsas | spustelejimas |
| 7.0 | balsas | Lentelė prisitaiko prie bet kokio ekrano. |
| 7.3 | garsas | patvirtinimas |

### KADRAS 7: Įdedate perspėjimo sintaksę (14 sek.) — epizodas
**Failas:** `05-perspejimo-sintakse.png`
**Ekrane:** Turinio redaktoriuje prieš plačią lentelę įrašoma paruošta sintaksė. Kadras persijungia į svetainės puslapį, kuriame virš lentelės matomas standartinis pranešimas, kad lentelę galima slinkti į šoną.
**Ekrano užrašai (tiksliai):** „{{t('table_ux_accessibility')}}“, „Nematote visos lentelės?“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-site, tvs-table
**Demo duomenys:** lentele: Pamokų tvarkaraštis
**Tarimo kandidatai:** table_ux_accessibility (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-perspejimo-sintakse--1704-04-kai-netelpa.png`
**Komentaras:** epizodas `ep_1585_05_3` · dalis `dal_1585_05` „Lentelės plotis 100% ir ką daryti, kai netelpa“ · prioritetas 2 · pagrindas: dal_1585_05 paaiškinimas; kl_1585_1 — išsaugojimo žingsnis nerodomas, nes teksto nėra; eskizas 2026-10-31: ekrane — tikrasis pranešimo pradžios tekstas (iliustracija 1704), ne sugalvotas

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prieš lentelę įdedate paruoštą perspėjimo sintaksę. |
| 2.8 | garsas | rasymas |
| 5.4 | balsas | Lankytojas pamato pranešimą virš lentelės. |
| 8.9 | balsas | Jis sužino, kad lentelę galima slinkti. |

### KADRAS 8: Semantikos klaidos (15 sek.) — koncepcija
**Failas:** `06-semantikos-klaidos.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, dont_title, dont_1, dont_2, dont_3, do_title, do_1
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: animuojama esama iliustracija 1705. Dešinėje po vieną išnyra trys klaidos su kryžiukais, kairėje — taisyklingas variantas su antraštės celės tipu.
**Ekrano užrašai (tiksliai):** „Lentelė lentelėje“, „Bold vietoj antraštės“, „Tuščios eilutės“, „Cell type: Header“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** bold, Header (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-semantikos-klaidos--1705-05-semantikos-klaidos.png`
**Komentaras:** epizodas `viz_1585_06` · dalis `dal_1585_06` „Semantikos klaidos“ · prioritetas 1 · pagrindas: dal_1585_06 paaiškinimas; viz_1585_06 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Šios klaidos kenkia tam, ką suvokia skaitytuvai. |
| 5.2 | balsas | Lentelė lentelėje, bold vietoj antraštės, tuščia eilutė. |
| 10.3 | balsas | Antraštei naudojate celės tipą „Header“. |
