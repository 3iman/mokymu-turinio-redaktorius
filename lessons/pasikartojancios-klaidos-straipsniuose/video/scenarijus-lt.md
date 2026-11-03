# Video scenarijus: Pasikartojančios klaidos straipsniuose — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 985205333 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 123 sek. (10 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_694` · senoji WP pamoka `pasikartojancios-klaidos-straipsniuose`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Tekstą lygiuojate pagal kairį kraštą | 13 sek. | 01-lygiavimas-pagal-kaire | Lygiuojant pagal abu kraštus tarp žodžių lieka dideli tarpai. Brūkšnelius dėlioti užtrunka. Renkatės lygiavimą pagal kairį kraštą. |
| 2 Pastraipas skiriate vienu būdu | 15 sek. | 02-vienas-pastraipu-skyrimas | Tarpas ir atitraukimas atlieka tą patį darbą. Naudojate vieną iš jų, ne abu kartu. Atitraukimas tarpais mažame ekrane atrodo netvarkingai. |
| 3 Sąrašą sudarote redaktoriaus funkcija | 13 sek. | 03-sarasai-be-savadarbiu | Savadarbiai ženklai sąraše vienas kito neatitinka. Sąrašą sudarote teksto redaktoriaus funkcija. Lankytojas mato vientisą sąrašą. |
| 4 Eilutes paverčiate sąrašu | 10 sek. | 03-sarasas-redaktoriaus-funkcija | Pažymite eilutes, kurias norite paversti sąrašu. Redaktoriaus juostoje spaudžiate sąrašo mygtuką. |
| 5 „Enter“ pradeda naują pastraipą | 13 sek. | 04-enter-ir-shift-enter | Pastraipa yra tekstas nuo vieno „Enter“ iki kito. „Shift+Enter“ tik nukelia eilutę. Citatoms ar himno eilutėms naudojate jį. |
| 6 Pastraipas atskiriate „Enter“ mygtuku | 10 sek. | 04-pastraipos-su-enter | Pastraipos gale paspaudžiate „Enter“. Rašote naują pastraipą, tarpas atsiranda savaime. |
| 7 Autorių nurodote funkcija „Autoriai“ | 12 sek. | 05-autorius-funkcija | Autorių nurodote ne raštu teksto apačioje. Pasirenkate jį funkcija „Autoriai“. Paspaudus vardą matomi visi jo įrašai. |
| 8 Titulinei rinkitės horizontalią nuotrauką | 12 sek. | 06-horizontali-nuotrauka | Vertikali nuotrauka sąraše nukerpama. Titulinei renkatės horizontalią. Plakatą įkeliate į patį straipsnį. |
| 9 Vertikalioms nuotraukoms naudojate sintakses | 12 sek. | 07-vertikalios-nuotraukos | Jei pakanka horizontalių nuotraukų, naudojate tik jas. Vertikalias įterpiate sintaksėmis, skirtomis plakatams ir diplomams. |
| 10 Kitos pasikartojančios klaidos | 13 sek. | 08-kitos-klaidos | Šios klaidos kartojasi dažniausiai. Nuorodos, nuotraukos, antraštės ir stiliaus šiukšlės. Plačiau jas rasite kurse „Puslapių valdymas“. |

---

## Kadrai

### KADRAS 1: Tekstą lygiuojate pagal kairį kraštą (13 sek.) — koncepcija
**Failas:** `01-lygiavimas-pagal-kaire.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje raudona kortelė „Ne“ su pastraipa, lygiuota pagal abu kraštus — tarp žodžių išsiplečia dideli tarpai; dešinėje žalia kortelė „Taip“ su ta pačia pastraipa pagal kairį kraštą. Raudonos kortelės tarpai sublyksi, kad akis juos pastebėtų.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“, „Pagal kairį kraštą“, „Pagal abu kraštus“
**TVS UI komponentai:** —
**Demo duomenys:** pastraipa: Demo mokyklos naujienos pastraipa
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_694_01` · dalis `dal_694_01` „Tekstas lygiuojamas pagal abu kraštus“ · prioritetas 2 · pagrindas: dal_694_01 paaiškinimas; viz_694_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lygiuojant pagal abu kraštus tarp žodžių lieka dideli tarpai. |
| 6.2 | balsas | Brūkšnelius dėlioti užtrunka. |
| 8.7 | balsas | Renkatės lygiavimą pagal kairį kraštą. |

### KADRAS 2: Pastraipas skiriate vienu būdu (15 sek.) — koncepcija
**Failas:** `02-vienas-pastraipu-skyrimas.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2, dont_3
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje raudona kortelė „Ne“ — pastraipos ir su tarpu, ir su atitraukimu, o atitraukimas sudėliotas paprastaisiais tarpais; dešinėje žalia kortelė „Taip“ — tik tarpas tarp pastraipų, tada tas pats tekstas tik su atitraukimu. Pabaigoje maketas susitraukia iki telefono pločio.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“, „Tarpas tarp pastraipų“, „Pirmos eilutės atitraukimas“, „Abu būdai kartu“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_694_02` · dalis `dal_694_02` „Pirmos pastraipos eilutė atitraukiama nuo krašto“ · prioritetas 2 · pagrindas: dal_694_02 paaiškinimas; viz_694_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Tarpas ir atitraukimas atlieka tą patį darbą. |
| 4.9 | balsas | Naudojate vieną iš jų, ne abu kartu. |
| 8.1 | balsas | Atitraukimas tarpais mažame ekrane atrodo netvarkingai. |

### KADRAS 3: Sąrašą sudarote redaktoriaus funkcija (13 sek.) — koncepcija
**Failas:** `03-sarasai-be-savadarbiu.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, dont_title, dont_1, dont_2, dont_3, dont_4
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje raudona kortelė „Ne“ — tos pačios eilutės, pažymėtos žvaigždutėmis, brūkšneliais, rombais ir pasvirais brūkšniais, kiekviena kitaip; dešinėje žalia kortelė „Taip“ — vienodi redaktoriaus sąrašo ženkliukai.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“, „Žvaigždutės“, „Brūkšneliai“, „Rombai“, „Redaktoriaus sąrašas“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_694_03` · dalis `dal_694_03` „Netaisyklingai formatuojami sąrašai“ · prioritetas 2 · pagrindas: dal_694_03 paaiškinimas; viz_694_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Savadarbiai ženklai sąraše vienas kito neatitinka. |
| 5.3 | balsas | Sąrašą sudarote teksto redaktoriaus funkcija. |
| 9.2 | balsas | Lankytojas mato vientisą sąrašą. |

### KADRAS 4: Eilutes paverčiate sąrašu (10 sek.) — epizodas
**Failas:** `03-sarasas-redaktoriaus-funkcija.png`
**Ekrane:** Teksto redaktorius su keliomis eilutėmis, pažymėtomis žvaigždutėmis. Kursorius pažymi eilutes, redaktoriaus juostoje spaudžia sąrašo mygtuką — žvaigždutės virsta vienodais sąrašo ženkliukais.
**Ekrano užrašai (tiksliai):** „Turinys“, „Source“, „Format“
**TVS UI komponentai:** tvs-cursor, tvs-ripple, naujas: teksto redaktoriaus įrankių juosta
**Demo duomenys:** sarasas: Šventė, tėvų susirinkimas, ekskursija
**Tarimo kandidatai:** Source (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-sarasas-redaktoriaus-funkcija--klik80_493.9.jpg`
**Komentaras:** epizodas `ep_694_03_1` · dalis `dal_694_03` „Netaisyklingai formatuojami sąrašai“ · prioritetas 2 · pagrindas: dal_694_03 paaiškinimas; scenos yt-tezrWtRdIqY: 11 (redaktoriaus juosta)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Pažymite eilutes, kurias norite paversti sąrašu. |
| 2.6 | garsas | spustelejimas |
| 5.2 | balsas | Redaktoriaus juostoje spaudžiate sąrašo mygtuką. |
| 6.4 | garsas | spustelejimas |
| 7.6 | garsas | patvirtinimas |

### KADRAS 5: „Enter“ pradeda naują pastraipą (13 sek.) — koncepcija
**Failas:** `04-enter-ir-shift-enter.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, summary
**Ekrane:** Šablonas `palyginimas`: kairėje „Shift+Enter“ — tekstas nusikelia žemiau, bet abi eilutes apgaubia vienas pastraipos rėmelis; dešinėje „Enter“ — atsiranda antras, atskiras rėmelis. Apačioje lieka eilutė apie citatas ir himno eilutes.
**Ekrano užrašai (tiksliai):** „„Enter““, „„Shift+Enter““, „Nauja pastraipa“, „Tekstas nusikelia“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** Enter, Shift (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_694_04` · dalis `dal_694_04` „Netaisyklingai atskiriamos pastraipos“ · prioritetas 2 · pagrindas: dal_694_04 paaiškinimas; viz_694_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Pastraipa yra tekstas nuo vieno „Enter“ iki kito. |
| 5.3 | balsas | „Shift+Enter“ tik nukelia eilutę. |
| 8.1 | balsas | Citatoms ar himno eilutėms naudojate jį. |

### KADRAS 6: Pastraipas atskiriate „Enter“ mygtuku (10 sek.) — epizodas
**Failas:** `04-pastraipos-su-enter.png`
**Ekrane:** Teksto redaktorius su viena pastraipa. Kursorius atsistoja pastraipos gale, paspaudžiamas „Enter“ ir atsiranda antra, atskira pastraipa su savo tarpu.
**Ekrano užrašai (tiksliai):** „Turinys“, „„Enter““, „Nauja pastraipa“
**TVS UI komponentai:** tvs-cursor, tvs-ripple, naujas: teksto redaktoriaus įrankių juosta
**Demo duomenys:** pastraipa: Pirmokai šventę pradėjo dainomis
**Tarimo kandidatai:** Enter (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-pastraipos-su-enter--klik84_506.1.jpg`
**Komentaras:** epizodas `ep_694_04_1` · dalis `dal_694_04` „Netaisyklingai atskiriamos pastraipos“ · prioritetas 2 · pagrindas: dal_694_04 paaiškinimas; scenos yt-tezrWtRdIqY: 11 (redaktorius)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Pastraipos gale paspaudžiate „Enter“. |
| 2.4 | garsas | spustelejimas |
| 4.3 | balsas | Rašote naują pastraipą, tarpas atsiranda savaime. |
| 6.9 | garsas | rasymas |

### KADRAS 7: Autorių nurodote funkcija „Autoriai“ (12 sek.) — koncepcija
**Failas:** `05-autorius-funkcija.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje straipsnio apačioje ranka įrašyta autorės eilutė, ji blanksta; dešinėje laukas „Autoriai“ su pasirinktu vardu, iš jo išsiskleidžia to paties autoriaus įrašų sąrašas.
**Ekrano užrašai (tiksliai):** „Autoriai“, „Raštu teksto apačioje“, „Visi autoriaus įrašai“
**TVS UI komponentai:** —
**Demo duomenys:** autorius: Marija Pečkauskaitė, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-autorius-funkcija--klik22_099.6.jpg`, `nuorodos/05-autorius-funkcija--sc26_130.5.jpg`
**Komentaras:** epizodas `viz_694_05` · dalis `dal_694_05` „Straipsnių autoriai nurodomi raštu teksto apačioje“ · prioritetas 2 · pagrindas: dal_694_05 paaiškinimas; scenos yt-tezrWtRdIqY: 4

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Autorių nurodote ne raštu teksto apačioje. |
| 4.7 | balsas | Pasirenkate jį funkcija „Autoriai“. |
| 7.7 | balsas | Paspaudus vardą matomi visi jo įrašai. |

### KADRAS 8: Titulinei rinkitės horizontalią nuotrauką (12 sek.) — koncepcija
**Failas:** `06-horizontali-nuotrauka.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje raudona kortelė „Ne“ — vertikali nuotrauka naujienos kortelėje, nukerpamos kojos ir galva; dešinėje žalia kortelė „Taip“ — horizontali nuotrauka telpa visa, o plakatas rodomas straipsnio viduje.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“, „Horizontali titulinė“, „Vertikali titulinė“, „Nukirpta galva“
**TVS UI komponentai:** —
**Demo duomenys:** plakatas: Demo mokyklos šventės plakatas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_694_06` · dalis `dal_694_06` „Straipsnių sąraše naudojamos vertikalios nuotraukos“ · prioritetas 2 · pagrindas: dal_694_06 paaiškinimas; viz_694_06 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Vertikali nuotrauka sąraše nukerpama. |
| 4.3 | balsas | Titulinei renkatės horizontalią. |
| 7.0 | balsas | Plakatą įkeliate į patį straipsnį. |

### KADRAS 9: Vertikalioms nuotraukoms naudojate sintakses (12 sek.) — koncepcija
**Failas:** `07-vertikalios-nuotraukos.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje raudona kortelė „Ne“ — vertikalios nuotraukos, sudėtos kaip socialinio tinklo sraute; dešinėje žalia kortelė „Taip“ — horizontalios nuotraukos straipsnyje ir viena vertikali, įterpta plakatams skirta sintakse.
**Ekrano užrašai (tiksliai):** „Taip“, „Ne“, „Plakatų sintaksė“, „Vertikalios kaip sraute“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_694_07` · dalis `dal_694_07` „Straipsniuose įterpiamos vertikalios nuotraukos“ · prioritetas 2 · pagrindas: dal_694_07 paaiškinimas; viz_694_07 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Jei pakanka horizontalių nuotraukų, naudojate tik jas. |
| 5.7 | balsas | Vertikalias įterpiate sintaksėmis, skirtomis plakatams ir diplomams. |

### KADRAS 10: Kitos pasikartojančios klaidos (13 sek.) — koncepcija
**Failas:** `08-kitos-klaidos.png`
**Šablonas:** `naujas` · laukai: title, item_1, item_2, item_3, item_4, item_5, item_6, item_7, item_8, summary
**Ekrane:** Naujas šablonas — kortelė su sąrašu: aštuoni klaidų punktai iškyla po vieną iš viršaus į apačią, kiekvienas su ✗ ženkleliu; pabaigoje po sąrašu lieka eilutė apie kursą „Puslapių valdymas“.
**Ekrano užrašai (tiksliai):** „Prastos nuotraukos“, „Nenaudojamos antraštės“, „Stiliaus šiukšlės“, „Neveikiančios nuorodos“, „Puslapių valdymas“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_694_08` · dalis `dal_694_08` „Kitos klaidos, plačiau aprašytos kurse „Puslapių valdymas““ · prioritetas 3 · pagrindas: dal_694_08 paaiškinimas; viz_694_08 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Šios klaidos kartojasi dažniausiai. |
| 4.2 | balsas | Nuorodos, nuotraukos, antraštės ir stiliaus šiukšlės. |
| 8.6 | balsas | Plačiau jas rasite kurse „Puslapių valdymas“. |
