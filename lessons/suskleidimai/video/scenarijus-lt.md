# Video scenarijus: Suskleidimai — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1783538879 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 133 sek. (9 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_905` · senoji WP pamoka `suskleidimai`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Kam suskleidimai | 13 sek. | 00-kam-suskleidimai | Keli ilgi blokai – tekstas neperžvelgiamas. Suskleidimai rodo tik antraštes. Lankytojas atskleidžia tą, kurios ieško. |
| 2 Suskleidimas svetainėje | 16 sek. | 01-suskleidimas-svetaineje | Svetainėje tai tamsi juosta su pliusu. Paspaudus atsiskleidžia turinys. Visi užverti, atverti galima kelis. „Tab“, „Enter“ – skaitytuvas praneša būseną. |
| 3 Kur rasti | 13 sek. | 02-kur-rasti | Modulis – kairiajame meniu „Suskleidimai“. Viena kategorija – vienas blokas puslapyje. Įrašai – jo juostos; viršuje filtrai. |
| 4 Sukuriate kategoriją ir įklijuojate sintaksę | 17 sek. | 03-kategorija-ir-sintakse | Kategorijų sąraše spaudžiate „Sukurti“ ir įrašote pavadinimą. Stulpelyje „Plugin“ nukopijuojate kategorijos sintaksę. Puslapio turinyje įklijuojate ją po įvadu ir atnaujinate. |
| 5 Sukuriate suskleidimo įrašą | 16 sek. | 04-irasas | Spaudžiate „Sukurti“ ir įrašote pavadinimą. „Atsakymas“ – tai, kas atsiskleis paspaudus. Pasirenkate kategoriją ir išsaugote. Svetainėje atsiranda nauja juosta. |
| 6 Perrikiuojate suskleidimus | 14 sek. | 05-perrikiavimas | Pasirenkate kategoriją ir spaudžiate „Filtruoti“. Suimate įrašą už rodyklių ir tempiate. Spaudžiate „Perrikiuoti“ – kitaip tvarka neišsisaugo. |
| 7 Kada suskleidimai, kada ne | 14 sek. | 06-kada-ne-suskleidimai | Kiekvienas pliusas lankytojui – darbas. Trumpą DUK rašote su antraštėmis, ne pliusais. Viso puslapio į vieną suskleidimą nekraunate. |
| 8 Atvaizdavimo variantas | 15 sek. | 07-atvaizdavimo-variantas | Lauke „View“ renkatės, kaip blokas atrodys. „Default“ – juostos; kitas variantas – pvz. kortelės. Variantą paruošiame mes, jūs pasirenkate. |
| 9 Puslapyje, su nuorodomis, suskleidime ar polapyje? | 15 sek. | 08-eile-pries-suskleidima | Suskleidimas – paskutinė vieta turiniui. Pirma trumpinate, tada antraštės ir vidinės nuorodos. Savarankiška tema – polapis; detalė – suskleidimas. |

---

## Kadrai

### KADRAS 1: Kam suskleidimai (13 sek.) — koncepcija
**Failas:** `00-kam-suskleidimai.png`
**Šablonas:** `perziura` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `perziura`: kortelė su trimis eilutėmis – ilgo teksto stulpelis susitraukia į tris tamsias juostas su pliusais, viena juosta atsiskleidžia; apačioje santrauka.
**Ekrano užrašai (tiksliai):** „+“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_905_00` · dalis `dal_905_00` „Kam tai“ · prioritetas 2 · pagrindas: dal_905_00 paaiškinimas; viz_905_00 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Keli ilgi blokai – tekstas neperžvelgiamas. |
| 4.8 | balsas | Suskleidimai rodo tik antraštes. |
| 7.5 | balsas | Lankytojas atskleidžia tą, kurios ieško. |

### KADRAS 2: Suskleidimas svetainėje (16 sek.) — koncepcija
**Failas:** `01-suskleidimas-svetaineje.png`
**Šablonas:** `perziura` · laukai: title, item_1, item_2, item_3, item_4
**Ekrane:** Šablonas `perziura`: tamsių juostų stulpelis su pliusais; viena juosta atsiskleidžia – po ja tekstas, galerija, dokumentų lentelė. Paskutinė eilutė – prieinamumo takelis: fokuso rėmelis ant juostos, „Enter“, skaitytuvo burbulas „atskleista“ (3–5 s).
**Ekrano užrašai (tiksliai):** „+“, „−“, „Tab“, „Enter“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Tab, Enter (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_905_01` · dalis `dal_905_01` „Kaip atrodo svetainėje“ · prioritetas 2 · pagrindas: dal_905_01 paaiškinimas; viz_905_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Svetainėje tai tamsi juosta su pliusu. |
| 4.5 | balsas | Paspaudus atsiskleidžia turinys. |
| 7.2 | balsas | Visi užverti, atverti galima kelis. |
| 10.8 | balsas | „Tab“, „Enter“ – skaitytuvas praneša būseną. |

### KADRAS 3: Kur rasti (13 sek.) — koncepcija
**Failas:** `02-kur-rasti.png`
**Šablonas:** `ui_maketas` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `ui_maketas` (generatoriuje – kortelė su sąrašu): TVS kairysis meniu su paryškintu „Suskleidimai“, šalia skirtukas „Kategorijos“, įrašų sąrašas su filtrais viršuje.
**Ekrano užrašai (tiksliai):** „Suskleidimai“, „Kategorijos“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_905_02` · dalis `dal_905_02` „Kur rasti“ · prioritetas 2 · pagrindas: dal_905_02 paaiškinimas; viz_905_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Modulis – kairiajame meniu „Suskleidimai“. |
| 4.7 | balsas | Viena kategorija – vienas blokas puslapyje. |
| 8.2 | balsas | Įrašai – jo juostos; viršuje filtrai. |

### KADRAS 4: Sukuriate kategoriją ir įklijuojate sintaksę (17 sek.) — epizodas
**Failas:** `03-kategorija-ir-sintakse.png`
**Ekrane:** TVS „Suskleidimai“ › „Kategorijos“: kursorius spaudžia „Sukurti“, įrašo pavadinimą „Tarptautinis bakalaureatas“, išsaugo. Sąraše eilutė su stulpeliu „Plugin“ ir sintakse {{ suskleidimai('', {'category_id': 2}) }} – kursorius ją nukopijuoja. Ekranas persijungia į puslapio „Turinys“ lauką, sintaksė įklijuojama po įvadiniu tekstu, „Atnaujinti“.
**Ekrano užrašai (tiksliai):** „Kategorijos“, „Sukurti“, „Pavadinimas“, „Plugin“, „Turinys“, „Atnaujinti“
**TVS UI komponentai:** tvs-table, tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple, naujas: teksto redaktoriaus įrankių juosta
**Demo duomenys:** kategorija: Tarptautinis bakalaureatas, puslapis: Tarptautinis bakalaureatas, sintakse: {{ suskleidimai('', {'category_id': 2}) }}
**Tarimo kandidatai:** Plugin, category_id (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-kategorija-ir-sintakse--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_905_03_1` · dalis `dal_905_03` „Kategorija ir jos sintaksė“ · prioritetas 2 · pagrindas: dal_905_03 paaiškinimas; skeleton ir kristoforopro.lt admin 2026-10-18: Suskleidimai › Kategorijos, stulpelis „Plugin“

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kategorijų sąraše spaudžiate „Sukurti“ ir įrašote pavadinimą. |
| 3.2 | garsas | rasymas |
| 6.2 | balsas | Stulpelyje „Plugin“ nukopijuojate kategorijos sintaksę. |
| 8.2 | garsas | spustelejimas |
| 10.7 | balsas | Puslapio turinyje įklijuojate ją po įvadu ir atnaujinate. |
| 13.1 | garsas | spustelejimas |
| 14.3 | garsas | patvirtinimas |

### KADRAS 5: Sukuriate suskleidimo įrašą (16 sek.) — epizodas
**Failas:** `04-irasas.png`
**Ekrane:** „Suskleidimai“ › „Sukurti“: forma su laukais „Pavadinimas“, „Atsakymas“ (teksto redaktorius), „Kalba“, „Kategorija“, „Enabled“ (Yes / No). Kursorius įrašo pavadinimą „Tarptautinio bakalaureato programa – apie ką ji?“, redaktoriuje – kelias pastraipas, pasirenka kategoriją, „Išsaugoti“. Ekranas persijungia į svetainę: bloke atsiranda nauja tamsi juosta su pliusu.
**Ekrano užrašai (tiksliai):** „Sukurti“, „Pavadinimas“, „Atsakymas“, „Kategorija“, „Enabled“, „Išsaugoti“
**TVS UI komponentai:** tvs-btn, tvs-input, naujas: teksto redaktoriaus įrankių juosta, naujas: „Yes“ / „No“ jungiklis, tvs-cursor, tvs-ripple, tvs-site
**Demo duomenys:** pavadinimas: Tarptautinio bakalaureato programa – apie ką ji?, kategorija: Tarptautinis bakalaureatas
**Tarimo kandidatai:** Enabled (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-irasas--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_905_04_1` · dalis `dal_905_04` „Įrašas: beveik atskiras puslapis“ · prioritetas 2 · pagrindas: dal_905_04 paaiškinimas; skeleton admin/suskleidimai/create 2026-10-18: laukai Pavadinimas *, Atsakymas *, Kalba, Kategorija *, Enabled, Nuotrauka, Galerija, Video; eskizas 2026-10-31: kategorijos pasirinkimas / išsaugojimas

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Spaudžiate „Sukurti“ ir įrašote pavadinimą. |
| 2.8 | garsas | rasymas |
| 5.0 | balsas | „Atsakymas“ – tai, kas atsiskleis paspaudus. |
| 7.0 | garsas | rasymas |
| 8.7 | balsas | Pasirenkate kategoriją ir išsaugote. |
| 9.3 | garsas | spustelejimas |
| 9.8 | garsas | spustelejimas |
| 10.4 | garsas | spustelejimas |
| 11.7 | balsas | Svetainėje atsiranda nauja juosta. |
| 13.3 | garsas | patvirtinimas |

### KADRAS 6: Perrikiuojate suskleidimus (14 sek.) — epizodas
**Failas:** `05-perrikiavimas.png`
**Ekrane:** „Suskleidimai“ sąrašas; viršuje filtras „Kategorija“ – kursorius pasirenka kategoriją ir spaudžia „Filtruoti“. Eilučių pradžioje atsiranda rodyklių rankenėlės; kursorius suima trečią eilutę, tempia į antrą vietą, paleidžia, spaudžia žalią „Perrikiuoti“. Svetainėje juostos sustoja nauja tvarka.
**Ekrano užrašai (tiksliai):** „Kategorija“, „Filtruoti“, „Perrikiuoti“
**TVS UI komponentai:** tvs-filter, tvs-table, tvs-row, tvs-handle, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** kategorija: Tarptautinis bakalaureatas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-perrikiavimas--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_905_05_1` · dalis `dal_905_05` „Perrikiavimas“ · prioritetas 2 · pagrindas: dal_905_05 paaiškinimas; KB 11-suskleidimų-valdymas §5: be filtro rankenėlė neatsiranda; skeleton: filtrai Kalba / Kategorija, mygtukas „Perrikiuoti“

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Pasirenkate kategoriją ir spaudžiate „Filtruoti“. |
| 3.0 | garsas | spustelejimas |
| 5.1 | balsas | Suimate įrašą už rodyklių ir tempiate. |
| 7.1 | garsas | paemimas |
| 7.9 | garsas | numetimas |
| 8.5 | balsas | Spaudžiate „Perrikiuoti“ – kitaip tvarka neišsisaugo. |
| 10.5 | garsas | spustelejimas |
| 11.7 | garsas | patvirtinimas |

### KADRAS 7: Kada suskleidimai, kada ne (14 sek.) — koncepcija
**Failas:** `06-kada-ne-suskleidimai.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2, summary
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje žalia kortelė su keliomis vidutinėmis juostomis, dešinėje raudona – ilgas DUK sąrašas sugrūstas į pliusus ir vienas pliusas su visu puslapiu viduje.
**Ekrano užrašai (tiksliai):** „DUK“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** DUK (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_905_06` · dalis `dal_905_06` „Kada ne suskleidimai“ · prioritetas 2 · pagrindas: dal_905_06 paaiškinimas; viz_905_06 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kiekvienas pliusas lankytojui – darbas. |
| 4.4 | balsas | Trumpą DUK rašote su antraštėmis, ne pliusais. |
| 8.8 | balsas | Viso puslapio į vieną suskleidimą nekraunate. |

### KADRAS 8: Atvaizdavimo variantas (15 sek.) — koncepcija
**Failas:** `07-atvaizdavimo-variantas.png`
**Šablonas:** `perziura` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `perziura`: kategorijos forma su lauku „View“; pasirinkus kitą variantą blokas šalia persirikiuoja iš juostų į korteles su nuotraukomis.
**Ekrano užrašai (tiksliai):** „View“, „Default“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** View, Default (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_905_07` · dalis `dal_905_07` „Atvaizdavimo variantas“ · prioritetas 2 · pagrindas: dal_905_07 paaiškinimas; viz_905_07 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lauke „View“ renkatės, kaip blokas atrodys. |
| 5.0 | balsas | „Default“ – juostos; kitas variantas – pvz. kortelės. |
| 9.7 | balsas | Variantą paruošiame mes, jūs pasirenkate. |

### KADRAS 9: Puslapyje, su nuorodomis, suskleidime ar polapyje? (15 sek.) — koncepcija
**Failas:** `08-eile-pries-suskleidima.png`
**Šablonas:** `tvarka` · laukai: title, step_1, step_2, step_3, step_4, step_5, summary
**Ekrane:** Šablonas `tvarka`: penki numeruoti žingsniai iš viršaus žemyn, kiekvienas su mažu puslapio piktogramos variantu (trumpesnis lapas, antraštės, turinys su nuorodomis, atskiras lapas, pliusas); penktas – paskutinis ir blyškiausias.
**Ekrano užrašai (tiksliai):** „GOV.UK“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** GOV.UK (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_905_08` · dalis `dal_905_08` „Puslapyje, su vidinėmis nuorodomis, suskleidime ar polapyje?“ · prioritetas 2 · pagrindas: dal_905_08 paaiškinimas; viz_905_08 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Suskleidimas – paskutinė vieta turiniui. |
| 4.5 | balsas | Pirma trumpinate, tada antraštės ir vidinės nuorodos. |
| 8.8 | balsas | Savarankiška tema – polapis; detalė – suskleidimas. |
