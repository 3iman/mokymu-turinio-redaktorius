# Video scenarijus: Lentelių kūrimo principai — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 908891041 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 69 sek. (5 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_1584` · senoji WP pamoka `lenteliu-kurimo-principai`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Kurkite lenteles ten, kur gebate | 15 sek. | 01-kurkite-kur-gebate | Lentelę paruošiate sau įprastame redaktoriuje. Galutinį rezultatą nukopijuojate į turinio redaktorių. Taip išvengiate nesusipratimų ir dirbate greičiau. |
| 2 Lygiuokite turinį pagal kairę | 15 sek. | 02-lygiavimas-kaire | Pagal kairę išlygiuotas turinys skaitomas lengviau. Tai numatytasis stilius, todėl pastangų nereikia. Keisdami lygiavimą pažeidžiate vienodumo taisyklę. |
| 3 Nestilizuokite lentelių | 14 sek. | 03-nestilizuokite-lenteliu | Stilizuotos lentelės neša daug HTML šiukšlių. Dėl jų lentelė išsisaugo tik iš dalies. Tamsaus fono režime jos tampa neprieinamos. |
| 4 Nepersistenkite su įmantrumu | 13 sek. | 04-paprastumas | Kuo sudėtingesnė lentelė, tuo sunkiau ją atvaizduoti. Lankytojui ji rūpi tik kaip skaitomas formatas. Todėl renkatės paprastą struktūrą. |
| 5 Pirma eilutė – spalvota kepurė | 12 sek. | 05-spalvota-kepure | Lenteles naudojame su spalvota kepure. Fonas yra dominuojanti svetainės spalva. Tekstas joje baltas. |

---

## Kadrai

### KADRAS 1: Kurkite lenteles ten, kur gebate (15 sek.) — koncepcija
**Failas:** `01-kurkite-kur-gebate.png`
**Šablonas:** `srautas` · laukai: title, step1_label, step1_desc, arrow_label_1, step2_label, step2_desc, arrow_label_2, step3_label, step3_desc
**Ekrane:** Šablonas `srautas`: animuojama esama iliustracija 1693. Trys kortelės su rodyklėmis — įprastas redaktorius, turinio redaktorius, svetainė. Virš pirmos rodyklės išnyra užrašas „nukopijuojate“.
**Ekrano užrašai (tiksliai):** „Word“, „Turinio redaktorius“, „Svetainė“, „nukopijuojate“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** Word (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-kurkite-kur-gebate--1693-00-kurkite-kur-gebate.png`
**Komentaras:** epizodas `viz_1584_01` · dalis `dal_1584_01` „Kurkite lenteles ten kur gebate“ · prioritetas 2 · pagrindas: dal_1584_01 paaiškinimas; viz_1584_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lentelę paruošiate sau įprastame redaktoriuje. |
| 5.0 | balsas | Galutinį rezultatą nukopijuojate į turinio redaktorių. |
| 9.5 | balsas | Taip išvengiate nesusipratimų ir dirbate greičiau. |

### KADRAS 2: Lygiuokite turinį pagal kairę (15 sek.) — koncepcija
**Failas:** `02-lygiavimas-kaire.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2, dont_3
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: animuojama esama iliustracija 1694. Kairėje žalia kortelė su pagal kairę išlygiuota lentele, dešinėje raudona su centruota; varnelė ir kryžiukas atsiranda po vieną.
**Ekrano užrašai (tiksliai):** „Taisyklingai“, „Netaisyklingai“, „Pagal kairę“, „Centre“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-lygiavimas-kaire--1694-01-lygiavimas-kaire.png`
**Komentaras:** epizodas `viz_1584_02` · dalis `dal_1584_02` „Lygiuokite lentelės turinys pagal kairę“ · prioritetas 2 · pagrindas: dal_1584_02 paaiškinimas; viz_1584_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Pagal kairę išlygiuotas turinys skaitomas lengviau. |
| 5.4 | balsas | Tai numatytasis stilius, todėl pastangų nereikia. |
| 9.5 | balsas | Keisdami lygiavimą pažeidžiate vienodumo taisyklę. |

### KADRAS 3: Nestilizuokite lentelių (14 sek.) — koncepcija
**Failas:** `03-nestilizuokite-lenteliu.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2, dont_3, dont_4
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: animuojama esama iliustracija 1695. Dešinėje stilizuotos lentelės kortelėje kaupiasi HTML šiukšlės ir dalis eilučių dingsta; kairėje švari lentelė lieka nepakitusi.
**Ekrano užrašai (tiksliai):** „Švari lentelė“, „Stilizuota lentelė“, „HTML šiukšlės“, „Tamsus fonas“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** HTML (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-nestilizuokite-lenteliu--1695-02-nestilizuokite-lenteliu.png`
**Komentaras:** epizodas `viz_1584_03` · dalis `dal_1584_03` „Nestilizuokite lentelių“ · prioritetas 1 · pagrindas: dal_1584_03 paaiškinimas; viz_1584_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Stilizuotos lentelės neša daug HTML šiukšlių. |
| 5.5 | balsas | Dėl jų lentelė išsisaugo tik iš dalies. |
| 8.8 | balsas | Tamsaus fono režime jos tampa neprieinamos. |

### KADRAS 4: Nepersistenkite su įmantrumu (13 sek.) — koncepcija
**Failas:** `04-paprastumas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, summary
**Ekrane:** Šablonas `palyginimas`: animuojama esama iliustracija 1696. Kairėje įmantri lentelė su sujungtomis celėmis subyra siaurame ekrane, dešinėje paprasta lentelė lieka skaitoma.
**Ekrano užrašai (tiksliai):** „Įmantri“, „Paprasta“, „Sujungtos celės“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-paprastumas--1696-03-paprastumas.png`
**Komentaras:** epizodas `viz_1584_04` · dalis `dal_1584_04` „Nepersistenkite su lentelių įmantrumu“ · prioritetas 2 · pagrindas: dal_1584_04 paaiškinimas; viz_1584_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kuo sudėtingesnė lentelė, tuo sunkiau ją atvaizduoti. |
| 5.6 | balsas | Lankytojui ji rūpi tik kaip skaitomas formatas. |
| 9.5 | balsas | Todėl renkatės paprastą struktūrą. |

### KADRAS 5: Pirma eilutė – spalvota kepurė (12 sek.) — koncepcija
**Failas:** `05-spalvota-kepure.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2
**Ekrane:** Šablonas `palyginimas`: animuojama esama iliustracija 1697. Kairėje lentelė be kepurės, dešinėje ta pati su spalvota antrašte — fonas dominuojančios svetainės spalvos, tekstas baltas.
**Ekrano užrašai (tiksliai):** „Be kepurės“, „Su kepure“, „Baltas tekstas“
**TVS UI komponentai:** —
**Demo duomenys:** lentele: Vincas Kudirka – Pirmininkas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-spalvota-kepure--1697-04-spalvota-kepure.png`
**Komentaras:** epizodas `viz_1584_05` · dalis `dal_1584_05` „Nuspalvinkite pirmą lentelės eilutę“ · prioritetas 2 · pagrindas: dal_1584_05 paaiškinimas; viz_1584_05 laukai; kl_1584_2 (kepurę uždeda dizaino sistema)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lenteles naudojame su spalvota kepure. |
| 4.4 | balsas | Fonas yra dominuojanti svetainės spalva. |
| 7.8 | balsas | Tekstas joje baltas. |
