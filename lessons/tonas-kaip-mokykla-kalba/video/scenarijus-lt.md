# Video scenarijus: Tonas: kaip mokykla kalba — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2670244293 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 73 sek. (5 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_903` · senoji WP pamoka `tonas-kaip-mokykla-kalba`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Kas skaito | 15 sek. | 00-kas-skaito | Svetainę skaito telefone, per pertrauką. Trisdešimt sekundžių: kas, kada, ką daryti. Neaišku – tekstas neperskaitytas, kad ir teisingas. |
| 2 „Jūs“ ir vardas | 14 sek. | 01-jus-ir-vardas | Rašote tam, kas skaito: „kviečiame jus“. Žmogų vadinate vardu ir pareigomis. Naujienoje užtenka „tėvai“ – globėjai supranta. |
| 3 Vienas sakinys, vienas faktas | 14 sek. | 02-vienas-sakinys | Ilgas sakinys telefone netelpa į vieną žvilgsnį. Vienas sakinys – keturi faktai. Perrašote į du sakinius po vieną faktą – trys sekundės. |
| 4 Kanceliarizmai ir pakaitalai | 15 sek. | 03-kanceliarizmai | Kanceliarinį žodį keičiate kasdieniu. „Vykdoma“ – „vyksta“, „ugdymo įstaiga“ – „mokykla“. Tekstą perskaitote balsu – kaip tėvų susirinkime. |
| 5 Personos kaip tono tikrinimas | 15 sek. | 04-personos | Prieš skelbdami perskaitote dviejų skaitytojų akimis. Užimtas vadovas ir pamainomis dirbanti mama. Bent viena nesupranta per pusę minutės – trumpinate. |

---

## Kadrai

### KADRAS 1: Kas skaito (15 sek.) — koncepcija
**Failas:** `00-kas-skaito.png`
**Šablonas:** `perziura` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `perziura`: telefono ekranas su naujiena, šalia laikrodis „30 s“; ilgas oficialus tekstas išblunka, lieka trys trumpos eilutės.
**Ekrano užrašai (tiksliai):** „30 s“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_903_00` · dalis `dal_903_00` „Kam tai“ · prioritetas 2 · pagrindas: dal_903_00 paaiškinimas; viz_903_00 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Svetainę skaito telefone, per pertrauką. |
| 4.5 | balsas | Trisdešimt sekundžių: kas, kada, ką daryti. |
| 8.2 | balsas | Neaišku – tekstas neperskaitytas, kad ir teisingas. |

### KADRAS 2: „Jūs“ ir vardas (14 sek.) — koncepcija
**Failas:** `01-jus-ir-vardas.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, dont_title, dont_1, dont_2, dont_3
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: dvi kortelės su tomis pačiomis trimis eilutėmis – žalioje kreipinys, vardas, „tėvai“; raudonoje beasmenė forma, „atsakingas asmuo“, teisinė formulė.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla, pedagoge: Marija Pečkauskaitė
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_903_01` · dalis `dal_903_01` „„Jūs“ ir vardas“ · prioritetas 2 · pagrindas: dal_903_01 paaiškinimas; viz_903_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Rašote tam, kas skaito: „kviečiame jus“. |
| 4.8 | balsas | Žmogų vadinate vardu ir pareigomis. |
| 7.7 | balsas | Naujienoje užtenka „tėvai“ – globėjai supranta. |

### KADRAS 3: Vienas sakinys, vienas faktas (14 sek.) — koncepcija
**Failas:** `02-vienas-sakinys.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje ilgas sakinys netelpa telefono ekrane, dešinėje du trumpi sakiniai telpa; apačioje santrauka.
**Ekrano užrašai (tiksliai):** „Vienas sakinys, keturi faktai“, „Du sakiniai, du faktai“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_903_02` · dalis `dal_903_02` „Vienas sakinys, vienas faktas“ · prioritetas 2 · pagrindas: dal_903_02 paaiškinimas; viz_903_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Ilgas sakinys telefone netelpa į vieną žvilgsnį. |
| 5.1 | balsas | Vienas sakinys – keturi faktai. |
| 7.7 | balsas | Perrašote į du sakinius po vieną faktą – trys sekundės. |

### KADRAS 4: Kanceliarizmai ir pakaitalai (15 sek.) — koncepcija
**Failas:** `03-kanceliarizmai.png`
**Šablonas:** `dokumentu_sarasas` · laukai: title, item_1, item_2, item_3, item_4, summary
**Ekrane:** Šablonas `dokumentu_sarasas`: keturios eilutės „kanceliarizmas → kasdienis žodis“, kairė pusė pilka, dešinė paryškinta; apačioje santrauka.
**Ekrano užrašai (tiksliai):** „vykdoma“, „vyksta“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_903_03` · dalis `dal_903_03` „Kanceliarizmai ir pakaitalai“ · prioritetas 2 · pagrindas: dal_903_03 paaiškinimas; viz_903_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kanceliarinį žodį keičiate kasdieniu. |
| 4.3 | balsas | „Vykdoma“ – „vyksta“, „ugdymo įstaiga“ – „mokykla“. |
| 8.5 | balsas | Tekstą perskaitote balsu – kaip tėvų susirinkime. |

### KADRAS 5: Personos kaip tono tikrinimas (15 sek.) — koncepcija
**Failas:** `04-personos.png`
**Šablonas:** `zingsniai` · laukai: title, step_1, step_2, step_3, summary
**Ekrane:** Šablonas `zingsniai` (generatoriuje – numeruota kortelė): du personų portretai su savo klausimu, trečia eilutė – žirklės ties ilgu tekstu.
**Ekrano užrašai (tiksliai):** „Užimtas vadovas“, „Pamainomis dirbanti mama“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_903_04` · dalis `dal_903_04` „Personos kaip tono tikrinimas“ · prioritetas 2 · pagrindas: dal_903_04 paaiškinimas; viz_903_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prieš skelbdami perskaitote dviejų skaitytojų akimis. |
| 5.5 | balsas | Užimtas vadovas ir pamainomis dirbanti mama. |
| 9.1 | balsas | Bent viena nesupranta per pusę minutės – trumpinate. |
