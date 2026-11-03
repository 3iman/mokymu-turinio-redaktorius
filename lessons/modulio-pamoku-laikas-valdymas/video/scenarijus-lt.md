# Video scenarijus: Modulio „Pamokų laikas“ valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2490517721 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 70 sek. (5 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_710` · senoji WP pamoka `modulio-pamoku-laikas-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Pavadinimas virš laikroduko | 14 sek. | 01-pamoku-laikas-svetaineje | Šoninėje juostoje matote pamokų laiko laikrodukus. Užrašas virš laikroduko – tai papildinio pavadinimas. Jis toks pat kaip papildinių sąraše. |
| 2 Laiką rašote su tašku | 17 sek. | 03-laiko-irasas | Lauke „Nuo“ laiką rašote su tašku. Taip pat užpildote lauką „Iki“. Pasirenkate tą kategoriją, kurios sąrašą pildote. Laikas atsiranda tos kategorijos sąraše. |
| 3 Kategorijų pavadinimai matomi tik TVS | 13 sek. | 04-kategoriju-pavadinimai | Kategorijų pavadinimus matote tik turinio valdymo sistemoje. Svetainėje jie nerodomi. Todėl kuriate kuo trumpesnius pavadinimus. |
| 4 Zonoje „Home“ pradedate naują papildinį | 13 sek. | 05-nauja-papildinio-zona | Paieškoje pasirenkate „Papildiniai“. Zonų sąraše prie „Home“ spaudžiate violetinį mygtuką. Tada – žalią „Pridėti papildinį“. |
| 5 Pasirenkate tipą ir kategoriją | 13 sek. | 05-papildinio-tipas | Sąraše pasirenkate tipą „Pamokų laikas“. Įrašote pavadinimą ir nurodote kategoriją. Išsaugojus plėtinys atsiranda sąrašo apačioje. |

---

## Kadrai

### KADRAS 1: Pavadinimas virš laikroduko (14 sek.) — epizodas
**Failas:** `01-pamoku-laikas-svetaineje.png`
**Ekrane:** Svetainės šoninė juosta su trimis pamokų laiko laikrodukais; kamera priartėja prie vieno. Užrašas virš laikroduko ir to paties papildinio pavadinimas TVS sąraše trumpam sujungiami linija.
**Ekrano užrašai (tiksliai):** „Pamokų laikas“, „1 klasių pamokų laikas“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo gimnazija
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-pamoku-laikas-svetaineje--822-pamoku_laikas_01.jpg`, `nuorodos/01-pamoku-laikas-svetaineje--sc03_005.9.jpg`
**Komentaras:** epizodas `ep_710_01_1` · dalis `dal_710_01` „Kaip atrodo „Pamokų laikas“?“ · prioritetas 2 · pagrindas: dal_710_01 paaiškinimas; scenos 821: 4

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Šoninėje juostoje matote pamokų laiko laikrodukus. |
| 5.5 | balsas | Užrašas virš laikroduko – tai papildinio pavadinimas. |
| 9.9 | balsas | Jis toks pat kaip papildinių sąraše. |

### KADRAS 2: Laiką rašote su tašku (17 sek.) — epizodas
**Failas:** `03-laiko-irasas.png`
**Ekrane:** Pamokų laiko įrašo forma; kamera priartėja prie laukų „Nuo“ ir „Iki“, į kuriuos įvedami laikai su tašku. Išskleidžiamas laukas „Kategorija“, pasirenkama „1 klasė“, spaudžiama „Išsaugoti“. Perėjimas į svetainės titulinį: išskleidžiamas laikrodukas „1 klasių pamokų laikas“ — sąraše pamokos numeris ir laikas, tarp jų nauja eilutė „1. 08.10 – 08.45“.
**Ekrano užrašai (tiksliai):** „Nuo“, „Iki“, „08.10“, „Kategorija“, „1 klasė“, „1 klasių pamokų laikas“, „1. 08.10 – 08.45“
**TVS UI komponentai:** tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** kategorija: 1 klasė
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-laiko-irasas--824-pamoku_laikas_03.png`, `nuorodos/03-laiko-irasas--sc01_000.3.jpg`
**Komentaras:** epizodas `ep_710_03_1` · dalis `dal_710_03` „Laiko įrašo redagavimas“ · prioritetas 2 · pagrindas: dal_710_03 paaiškinimas; scenos 821: 1; eskizas 2026-10-31: pridėti „Iki“ rašymas, kategorijos pasirinkimas ir „Išsaugoti“; Eimantas 2026-10-31: tituliniame trys pamokų laiko valdikliai = trys kategorijos; išskleidus — pamokos numeris ir laikas nuo–iki

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Lauke „Nuo“ laiką rašote su tašku. |
| 3.0 | garsas | rasymas |
| 5.0 | balsas | Taip pat užpildote lauką „Iki“. |
| 6.0 | garsas | rasymas |
| 7.7 | balsas | Pasirenkate tą kategoriją, kurios sąrašą pildote. |
| 8.9 | garsas | spustelejimas |
| 9.5 | garsas | spustelejimas |
| 11.8 | balsas | Laikas atsiranda tos kategorijos sąraše. |
| 12.1 | garsas | spustelejimas |
| 12.7 | garsas | patvirtinimas |
| 13.7 | garsas | spustelejimas |

### KADRAS 3: Kategorijų pavadinimai matomi tik TVS (13 sek.) — koncepcija
**Failas:** `04-kategoriju-pavadinimai.png`
**Šablonas:** `naujas` · laukai: title, cms_label, cms_note, site_label, site_note, summary
**Ekrane:** Naujas „dviejų zonų“ šablonas: kairėje – turinio valdymo sistemos kategorijų sąrašas, kuriame pavadinimas paryškėja; dešinėje – svetainės šoninė juosta su laikroduku, kurioje to pavadinimo nėra. Tarp zonų nubrėžiama perbraukta rodyklė, apačioje iškyla išvada.
**Ekrano užrašai (tiksliai):** „TVS aplinka“, „Svetainė“, „Kategorijų sąrašas“
**TVS UI komponentai:** —
**Demo duomenys:** kategorija: 1 klasė
**Tarimo kandidatai:** TVS (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-kategoriju-pavadinimai--825-pamoku_laikas_04.png`
**Komentaras:** epizodas `viz_710_04` · dalis `dal_710_04` „Kategorijų sąrašas“ · prioritetas 3 · pagrindas: dal_710_04 paaiškinimas; viz_710_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Kategorijų pavadinimus matote tik turinio valdymo sistemoje. |
| 6.3 | balsas | Svetainėje jie nerodomi. |
| 8.4 | balsas | Todėl kuriate kuo trumpesnius pavadinimus. |

### KADRAS 4: Zonoje „Home“ pradedate naują papildinį (13 sek.) — epizodas
**Failas:** `05-nauja-papildinio-zona.png`
**Ekrane:** Paieškos eilutėje pasirenkamas „Papildiniai“; atsiveria zonų sąrašas, kuriame eilutėje „Home“ šviečia violetinis mygtukas „Papildiniai“. Jį paspaudus atsiveria papildinių sąrašas, o kursorius spaudžia žalią „Pridėti papildinį“.
**Ekrano užrašai (tiksliai):** „Zonos“, „Home“, „Papildiniai“, „Pridėti papildinį“, „papil“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo gimnazija
**Tarimo kandidatai:** Home (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-nauja-papildinio-zona--klik02_002.1.jpg`, `nuorodos/05-nauja-papildinio-zona--sc02_003.6.jpg`, `nuorodos/05-nauja-papildinio-zona--sc03_005.9.jpg`
**Komentaras:** epizodas `ep_710_05_1` · dalis `dal_710_05` „Kaip aktyvuoti papildinį“ · prioritetas 1 · pagrindas: dal_710_05 paaiškinimas; scenos 821: 2–4; eskizas 2026-10-31: pridėti trūkstami veiksmų garsai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Paieškoje pasirenkate „Papildiniai“. |
| 1.6 | garsas | rasymas |
| 2.2 | garsas | spustelejimas |
| 4.2 | balsas | Zonų sąraše prie „Home“ spaudžiate violetinį mygtuką. |
| 6.6 | garsas | spustelejimas |
| 8.6 | balsas | Tada – žalią „Pridėti papildinį“. |
| 9.6 | garsas | spustelejimas |

### KADRAS 5: Pasirenkate tipą ir kategoriją (13 sek.) — epizodas
**Failas:** `05-papildinio-tipas.png`
**Ekrane:** Langas su papildinių tipų sąrašu; kursorius pasirenka apatinį „Pamokų laikas“. Atsivėrusioje formoje įrašomas pavadinimas, lauke „Kategorija“ pasirenkama klasių grupė ir spaudžiama „Išsaugoti“.
**Ekrano užrašai (tiksliai):** „Kokio tipo plėtinys?“, „Pamokų laikas“, „Pavadinimas“, „Kategorija“, „Išsaugoti“
**TVS UI komponentai:** tvs-row, tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** papildinys: 1 klasių pamokų laikas, kategorija: 1 klasė
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-papildinio-tipas--sc04_007.9.jpg`, `nuorodos/05-papildinio-tipas--sc05_010.2.jpg`, `nuorodos/05-papildinio-tipas--sc05_014.2.jpg`
**Komentaras:** epizodas `ep_710_05_2` · dalis `dal_710_05` „Kaip aktyvuoti papildinį“ · prioritetas 1 · pagrindas: dal_710_05 paaiškinimas; scenos 821: 5–6; eskizas 2026-10-31: pridėti trūkstami veiksmų garsai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Sąraše pasirenkate tipą „Pamokų laikas“. |
| 2.2 | garsas | spustelejimas |
| 4.5 | balsas | Įrašote pavadinimą ir nurodote kategoriją. |
| 5.7 | garsas | rasymas |
| 6.8 | garsas | spustelejimas |
| 7.4 | garsas | spustelejimas |
| 8.0 | balsas | Išsaugojus plėtinys atsiranda sąrašo apačioje. |
| 8.6 | garsas | spustelejimas |
| 9.2 | garsas | patvirtinimas |
