# Video scenarijus: Ką reikia žinoti apie paveikslėlius? — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 988736930 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 103 sek. (8 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_697` · senoji WP pamoka `ka-reikia-zinoti-apie-paveikslelius`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Penki paveikslėlių formatai | 17 sek. | 01-paveiksleliu-formatai | Dažniausiai naudojate JPG. PNG gali neturėti fono, GIF yra animuotas. SVG skirtas vektorinei grafikai, WEBP užima mažiausiai vietos. |
| 2 Kelkite JPG arba PNG | 15 sek. | 02-kiti-formatai | Formatai BMP, TIF, AI ir EPS internetui netinka. Konvertuojate juos į JPG arba PNG. |
| 3 Sistema sugeneruoja tinkamą dydį | 11 sek. | 03-sistema-sugeneruoja-dydi | Plotis ir aukštis matuojami pikseliais. Įkeliate paveikslėlį, o tinkamą dydį sistema sugeneruoja pati. |
| 4 Mažinate, bet nedidinate | 12 sek. | 04-mazinkite-nedidinkite | Padidintas paveikslėlis praranda kokybę. Mažinti galite, didinti ne. Tas pats galioja kadruojant mažą fragmentą. |
| 5 Per didelis dviem prasmėmis | 12 sek. | 05-per-dideli-paveiksleliai | Per didelis būna ir matmenimis, ir užimama vieta. Tada serveris failo neapdoros. Renkatės tinkamus matmenis ir raišką. |
| 6 Kelkite RGB paveikslėlius | 12 sek. | 06-rgb-ne-cmyk | CMYK koduotės spalvos sistemoje išsikraipo. Keista spalva ir yra ženklas. Keliate RGB paveikslėlius. |
| 7 Geriausia 1920 x 1080 | 13 sek. | 07-rekomenduojamas-dydis | Sistema priima iki keturių su puse tūkstančio taškų. Neviršijate HD raiškos. Tokia nuotrauka užima visą ekraną. |
| 8 Galerijoje nenaudokite be fono | 11 sek. | 08-paveikslelis-be-fono | Paveikslėlis be fono galerijoje iškrenta. Naujienų įrašuose renkatės nuotraukas su fonu. |

---

## Kadrai

### KADRAS 1: Penki paveikslėlių formatai (17 sek.) — koncepcija
**Failas:** `01-paveiksleliu-formatai.png`
**Šablonas:** `naujas` · laukai: title, item_1, item_2, item_3, item_4, item_5
**Ekrane:** Naujas šablonas — kortelė su sąrašu: ta pati nuotrauka penkis kartus, prie kiekvienos užrašas; PNG variante išnyksta fonas, GIF sujuda, SVG išdidinamas neprarasdamas kokybės, WEBP svoris nukrenta.
**Ekrano užrašai (tiksliai):** „JPG“, „PNG“, „GIF“, „SVG“, „WEBP“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** JPG, PNG, GIF, SVG, WEBP (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_697_01` · dalis `dal_697_01` „Interneto svetainėse naudojami paveikslėlių formatai“ · prioritetas 2 · pagrindas: dal_697_01 paaiškinimas; viz_697_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Dažniausiai naudojate JPG. |
| 4.3 | balsas | PNG gali neturėti fono, GIF yra animuotas. |
| 9.5 | balsas | SVG skirtas vektorinei grafikai, WEBP užima mažiausiai vietos. |

### KADRAS 2: Kelkite JPG arba PNG (15 sek.) — koncepcija
**Failas:** `02-kiti-formatai.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2, dont_3, dont_4
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje raudona kortelė „Ne“ — failai BMP, TIF, AI ir EPS, kiekvienas su ✗; dešinėje žalia kortelė „Taip“ — tie patys failai, virtę JPG ir PNG. PDF nukeliauja į atskirą prisegtuko eilutę.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“, „JPG“, „PNG“, „BMP“, „TIF“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** BMP, TIF, AI, EPS, JPG, PNG, PDF (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_697_02` · dalis `dal_697_02` „Kiti formatai“ · prioritetas 2 · pagrindas: dal_697_02 paaiškinimas; viz_697_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Formatai BMP, TIF, AI ir EPS internetui netinka. |
| 7.5 | balsas | Konvertuojate juos į JPG arba PNG. |

### KADRAS 3: Sistema sugeneruoja tinkamą dydį (11 sek.) — koncepcija
**Failas:** `03-sistema-sugeneruoja-dydi.png`
**Šablonas:** `srautas` · laukai: title, step1_label, step1_desc, arrow_label_1, step2_label, step2_desc, arrow_label_2, step3_label, step3_desc
**Ekrane:** Šablonas `srautas`: trys žingsniai su rodyklėmis — „Įkeliate paveikslėlį“, „Sistema sugeneruoja“, „Svetainėje“. Viduryje iš vieno didelio failo atsiskiria keli mažesni variantai.
**Ekrano užrašai (tiksliai):** „Įkeliate paveikslėlį“, „Sistema sugeneruoja“, „Svetainėje“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-sistema-sugeneruoja-dydi--klik91_556.9.jpg`
**Komentaras:** epizodas `viz_697_03` · dalis `dal_697_03` „Paveikslėlių matavimo vienetas“ · prioritetas 2 · pagrindas: dal_697_03 paaiškinimas; viz_697_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Plotis ir aukštis matuojami pikseliais. |
| 4.5 | balsas | Įkeliate paveikslėlį, o tinkamą dydį sistema sugeneruoja pati. |

### KADRAS 4: Mažinate, bet nedidinate (12 sek.) — koncepcija
**Failas:** `04-mazinkite-nedidinkite.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, dont_title, dont_1, dont_2
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje raudona kortelė „Ne“ — mažas paveikslėlis ištempiamas ir subyra į taškus; dešinėje žalia kortelė „Taip“ — didelis paveikslėlis sumažinamas ir lieka ryškus. Apačioje „Crop“ fragmentas rodo tą patį praradimą.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“, „Mažinti“, „Didinti“, „Crop“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** Crop (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-mazinkite-nedidinkite--sc68_361.5.jpg`
**Komentaras:** epizodas `viz_697_04` · dalis `dal_697_04` „Mažinkite ir niekada nedidinkite“ · prioritetas 2 · pagrindas: dal_697_04 paaiškinimas; scenos yt-tezrWtRdIqY: 9

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Padidintas paveikslėlis praranda kokybę. |
| 4.5 | balsas | Mažinti galite, didinti ne. |
| 7.4 | balsas | Tas pats galioja kadruojant mažą fragmentą. |

### KADRAS 5: Per didelis dviem prasmėmis (12 sek.) — koncepcija
**Failas:** `05-per-dideli-paveiksleliai.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, old_step_3, new_title, new_step_1, new_step_2
**Ekrane:** Šablonas `palyginimas`: kairėje „Per didelis“ — paveikslėlis netelpa į ekraną, šalia jo svoris megabaitais, įkėlimo juosta sustoja; dešinėje „Tinkamas“ — tas pats vaizdas tinkamų matmenų, juosta užsipildo.
**Ekrano užrašai (tiksliai):** „Per didelis“, „Tinkamas“, „Matmenys“, „Užimama vieta“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_697_05` · dalis `dal_697_05` „Nekelkite per didelių paveikslėlių į sistemą“ · prioritetas 2 · pagrindas: dal_697_05 paaiškinimas; viz_697_05 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Per didelis būna ir matmenimis, ir užimama vieta. |
| 5.3 | balsas | Tada serveris failo neapdoros. |
| 7.9 | balsas | Renkatės tinkamus matmenis ir raišką. |

### KADRAS 6: Kelkite RGB paveikslėlius (12 sek.) — koncepcija
**Failas:** `06-rgb-ne-cmyk.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, summary
**Ekrane:** Šablonas `palyginimas`: kairėje „CMYK“ — nuotrauka, kurios spalvos staiga paryškėja ir nutolsta nuo originalo; dešinėje „RGB“ — ta pati nuotrauka natūraliomis spalvomis.
**Ekrano užrašai (tiksliai):** „RGB“, „CMYK“, „Išsikraipo spalvos“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** RGB, CMYK (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_697_06` · dalis `dal_697_06` „Nenaudokite paveikslėlių su CMYK spalvų koduote“ · prioritetas 2 · pagrindas: dal_697_06 paaiškinimas; dal_697_06 įspėjimas

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | CMYK koduotės spalvos sistemoje išsikraipo. |
| 5.2 | balsas | Keista spalva ir yra ženklas. |
| 7.9 | balsas | Keliate RGB paveikslėlius. |

### KADRAS 7: Geriausia 1920 x 1080 (13 sek.) — koncepcija
**Failas:** `07-rekomenduojamas-dydis.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje „Sistemos ribos“ — 4500 x 4500 ir 20 Mb; dešinėje „Geriausia“ — 1920 x 1080, paveikslėlis užpildo ekraną, o jo svoris nukrenta.
**Ekrano užrašai (tiksliai):** „Sistemos ribos“, „4500 x 4500“, „20 Mb“, „Geriausia“, „1920 x 1080“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** 4500 x 4500, 1920 x 1080, Mb, HD (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_697_07` · dalis `dal_697_07` „Rekomenduojamas dydis“ · prioritetas 2 · pagrindas: dal_697_07 paaiškinimas; viz_697_07 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Sistema priima iki keturių su puse tūkstančio taškų. |
| 5.5 | balsas | Neviršijate HD raiškos. |
| 7.9 | balsas | Tokia nuotrauka užima visą ekraną. |

### KADRAS 8: Galerijoje nenaudokite be fono (11 sek.) — koncepcija
**Failas:** `08-paveikslelis-be-fono.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, dont_title, dont_1, dont_2, do_title, do_1
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje raudona kortelė „Ne“ — galerijoje tarp nuotraukų kabo iškirptas paveikslėlis be fono; dešinėje žalia kortelė „Taip“ — visos nuotraukos su fonu, galerija atrodo vientisa.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“, „Be fono“, „Su fonu“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/08-paveikslelis-be-fono--sc111_594.4.jpg`
**Komentaras:** epizodas `viz_697_08` · dalis `dal_697_08` „Paveikslėlis be fono galerijoje“ · prioritetas 3 · pagrindas: dal_697_08 paaiškinimas; viz_697_08 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Paveikslėlis be fono galerijoje iškrenta. |
| 4.6 | balsas | Naujienų įrašuose renkatės nuotraukas su fonu. |
