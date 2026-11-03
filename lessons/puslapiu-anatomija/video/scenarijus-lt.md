# Video scenarijus: Puslapių medis ir puslapio nustatymai — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2276492214 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 157 sek. (12 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_701` · senoji WP pamoka `puslapiu-anatomija`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Sukuriate naują puslapį | 12 sek. | 01-naujas-puslapis | Spaudžiate „Pridėti puslapį“. Pasirenkate puslapio tipą „Default“. Įrašote pavadinimą – puslapis laukia medžio apačioje. |
| 2 Perrikiuojate puslapį medyje | 11 sek. | 01-tempiate-medyje | Puslapį sugriebiate už rankenėlės. Tempiate jį į norimą vietą. Paleidžiate – tvarka medyje pasikeičia. |
| 3 Puslapio tipai | 15 sek. | 02-puslapio-tipas | Numatytasis tipas turi šoninį dizaino objektų stulpą. Pilno ploto tipas jo neturi. Jį pasirenkate, kai reikia viso pločio, pavyzdžiui, tvarkaraščiui. |
| 4 Sukuriate subpuslapį | 13 sek. | 03-subpuslapis | Užvedate ant puslapio, prie kurio kuriate. Spaudžiate „Pridėti subpuslapį“. Slug lauke matote tėvinio puslapio kelią. |
| 5 Pavadinimas ir Slug | 12 sek. | 04-pavadinimas-ir-slug | Įrašote puslapio pavadinimą. Slug susikuria automatiškai. Pakeitę pavadinimą, pamatysite, kad Slug nepasikeitė. |
| 6 Žymos jungia įrašus | 15 sek. | 05-zymos | Žyma sujungia skirtinguose puslapiuose esančius įrašus. Taip lankytojas randa visą vienos temos turinį. Pirmiausia pasirenkate turinio organizavimo strategiją. |
| 7 Kopijuojate sintaksės pavyzdį | 14 sek. | 06-sintaksiu-pavyzdziai | Skirtuke „Sintaksė“ randate tinkamą pavyzdį. Spaudžiate „Kopijuoti“ ir įklijuojate į „Turinys“. Pavyzdinį numerį pakeičiate savo puslapio numeriu. |
| 8 Įkeliate nuotraukas į galeriją | 12 sek. | 08-paveiksleliu-galerija | Atidarote „Paveikslėlių galeriją“. Nutempiate kelias nuotraukas iš karto. Kartu jos negali viršyti šimto megabaitų. |
| 9 Vaizdo įrašų galerija | 12 sek. | 09-vaizdo-irasu-galerija | Į galeriją dedate „YouTube“ ir „Vimeo“ įrašus. Jų skaičius neribojamas. Kiekvienam įrašui pridedate naują bloką. |
| 10 Garso įrašų formatai | 14 sek. | 10-garso-formatai | Garso galerija groja MP3 ir WAV failus. WMA formatas netinka. Pasirenkate MP3 – jis užima mažiau vietos. |
| 11 Įjungiate atnaujinimo datą | 13 sek. | 11-atnaujinimo-data | Formoje randate jungiklį „Show updated“. Perjungiate jį į „Yes“ ir išsaugote. Puslapio apačioje atsiranda atnaujinimo data. |
| 12 Rašote ir formatuojate turinį | 14 sek. | 12-turinys | Lauke „Turinys“ rašote ir formatuojate tekstą. Tarp pastraipų įkopijuojate sintaksę. Svetainėje jos vietoje atsiranda galerija. |

---

## Kadrai

### KADRAS 1: Sukuriate naują puslapį (12 sek.) — epizodas
**Failas:** `01-naujas-puslapis.png`
**Ekrane:** Puslapių medyje kursorius spaudžia žalią „+ Pridėti puslapį“; atsiveria langas su klausimu, kokio tipo puslapį kuriate, renkamas „Default“, įrašomas pavadinimas ir spaudžiama „Išsaugoti“. Naujas puslapis atsiranda medžio apačioje.
**Ekrano užrašai (tiksliai):** „+ Pridėti puslapį“, „Default“, „Išsaugoti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-window, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** puslapis: Logopedas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-naujas-puslapis--sc01_016.3.jpg`, `nuorodos/01-naujas-puslapis--klik08_040.6.jpg`, `nuorodos/01-naujas-puslapis--klik17_101.1.jpg`
**Komentaras:** epizodas `ep_701_01_1` · dalis `dal_701_01` „Puslapių medis“ · prioritetas 2 · pagrindas: dal_701_01 paaiškinimas; scenos yt-VOV8HzR9yGc: 1–2

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Spaudžiate „Pridėti puslapį“. |
| 2.2 | garsas | spustelejimas |
| 3.8 | balsas | Pasirenkate puslapio tipą „Default“. |
| 5.0 | garsas | spustelejimas |
| 6.8 | balsas | Įrašote pavadinimą – puslapis laukia medžio apačioje. |
| 8.8 | garsas | patvirtinimas |

### KADRAS 2: Perrikiuojate puslapį medyje (11 sek.) — epizodas
**Failas:** `01-tempiate-medyje.png`
**Ekrane:** Puslapių medyje kursorius sugriebia puslapio eilutę už rankenėlės kairėje, pakelia ją virš kitų eilučių ir paleidžia aukščiau; kitos eilutės prasiskiria ir vėl užsidaro, puslapis lieka naujoje vietoje.
**Ekrano užrašai (tiksliai):** „Veiklos sritys“, „Paslaugos“, „Default“
**TVS UI komponentai:** tvs-row, tvs-handle, tvs-cursor, tvs-ripple
**Demo duomenys:** puslapis: Logopedas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-tempiate-medyje--sc01_016.3.jpg`, `nuorodos/01-tempiate-medyje--klik03_020.4.jpg`
**Komentaras:** epizodas `ep_701_01_2` · dalis `dal_701_01` „Puslapių medis“ · prioritetas 1 · pagrindas: dal_701_01 paaiškinimas; scenos yt-VOV8HzR9yGc: 1

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Puslapį sugriebiate už rankenėlės. |
| 1.6 | garsas | paemimas |
| 4.1 | balsas | Tempiate jį į norimą vietą. |
| 6.4 | balsas | Paleidžiate – tvarka medyje pasikeičia. |
| 6.8 | garsas | numetimas |

### KADRAS 3: Puslapio tipai (15 sek.) — koncepcija
**Failas:** `02-puslapio-tipas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1
**Ekrane:** Šablonas `palyginimas`: kairėje – numatytasis puslapis su turinio stulpu ir šoniniu dizaino objektų stulpu; dešinėje – tas pats puslapis per visą plotį, šoninis stulpas išnykęs. Perėjimas animuojamas: šoninis stulpas nuslysta, turinys išsiplečia.
**Ekrano užrašai (tiksliai):** „Default“, „Pilno ploto(full)“, „Šoninis stulpas“
**TVS UI komponentai:** —
**Demo duomenys:** puslapis: Pamokų tvarkaraštis
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-puslapio-tipas--klik08_040.6.jpg`
**Komentaras:** epizodas `viz_701_02` · dalis `dal_701_02` „Puslapio tipas“ · prioritetas 2 · pagrindas: dal_701_02 paaiškinimas; viz_701_02 laukai; scenos yt-VOV8HzR9yGc: 2

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Numatytasis tipas turi šoninį dizaino objektų stulpą. |
| 5.8 | balsas | Pilno ploto tipas jo neturi. |
| 8.2 | balsas | Jį pasirenkate, kai reikia viso pločio, pavyzdžiui, tvarkaraščiui. |

### KADRAS 4: Sukuriate subpuslapį (13 sek.) — epizodas
**Failas:** `03-subpuslapis.png`
**Ekrane:** Puslapių medyje kursorius užveda ant tėvinio puslapio eilutės, dešinėje atsiranda mygtukai ir spaudžiamas „Pridėti subpuslapį“. Formoje Slug lauke iš karto matyti tėvinio puslapio kelias, įrašomas pavadinimas ir spaudžiama „Išsaugoti“.
**Ekrano užrašai (tiksliai):** „Pridėti subpuslapį“, „Slug *“, „Išsaugoti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** tevinis: Veiklos sritys, subpuslapis: Logopedas
**Tarimo kandidatai:** Slug (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-subpuslapis--klik03_020.4.jpg`, `nuorodos/03-subpuslapis--sc09_065.1.jpg`
**Komentaras:** epizodas `ep_701_03_1` · dalis `dal_701_03` „Subpuslapis“ · prioritetas 1 · pagrindas: dal_701_03 paaiškinimas; scenos yt-VOV8HzR9yGc: 3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Užvedate ant puslapio, prie kurio kuriate. |
| 4.7 | balsas | Spaudžiate „Pridėti subpuslapį“. |
| 5.7 | garsas | spustelejimas |
| 7.6 | balsas | Slug lauke matote tėvinio puslapio kelią. |
| 9.4 | garsas | patvirtinimas |

### KADRAS 5: Pavadinimas ir Slug (12 sek.) — epizodas
**Failas:** `04-pavadinimas-ir-slug.png`
**Ekrane:** Naujo puslapio formoje rašomas pavadinimas, o lauke „Slug“ tuo pačiu metu susidėlioja tas pats tekstas mažosiomis raidėmis su brūkšneliais. Tada pavadinimas pakoreguojamas – Slug lieka toks pat, ir ta vieta pažymima.
**Ekrano užrašai (tiksliai):** „Pavadinimas *“, „Slug *“, „logopedas“
**TVS UI komponentai:** tvs-window, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** pavadinimas: Logopedas, slug: logopedas
**Tarimo kandidatai:** Slug (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-pavadinimas-ir-slug--klik17_101.1.jpg`
**Komentaras:** epizodas `ep_701_04_1` · dalis `dal_701_04` „Pavadinimas ir Slug“ · prioritetas 2 · pagrindas: dal_701_04 paaiškinimas; scenos yt-VOV8HzR9yGc: 4

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Įrašote puslapio pavadinimą. |
| 2.8 | garsas | rasymas |
| 4.4 | balsas | Slug susikuria automatiškai. |
| 7.0 | balsas | Pakeitę pavadinimą, pamatysite, kad Slug nepasikeitė. |
| 9.4 | garsas | spustelejimas |

### KADRAS 6: Žymos jungia įrašus (15 sek.) — koncepcija
**Failas:** `05-zymos.png`
**Šablonas:** `naujas` · laukai: title, tag_1, note, summary
**Ekrane:** Naujas šablonas (siūlomas „kortele_su_sarasu“): viduryje viena žymos kortelė, iš jos į skirtingus puslapius ir naujienas nusitiesia linijos; paspaudus žymą visi susiję įrašai susirenka į vieną sąrašą.
**Ekrano užrašai (tiksliai):** „Žyma“, „Priėmimas“, „Projektai“, „Egzaminai“
**TVS UI komponentai:** —
**Demo duomenys:** zyma: Priėmimas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-zymos--klik25_154.8.jpg`
**Komentaras:** epizodas `viz_701_05` · dalis `dal_701_05` „Žymos (temos) (tags)“ · prioritetas 3 · pagrindas: dal_701_05 paaiškinimas; viz_701_05 laukai; scenos yt-VOV8HzR9yGc: 5

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Žyma sujungia skirtinguose puslapiuose esančius įrašus. |
| 5.9 | balsas | Taip lankytojas randa visą vienos temos turinį. |
| 9.8 | balsas | Pirmiausia pasirenkate turinio organizavimo strategiją. |

### KADRAS 7: Kopijuojate sintaksės pavyzdį (14 sek.) — epizodas
**Failas:** `06-sintaksiu-pavyzdziai.png`
**Ekrane:** Skirtuke „Sintaksė“ matoma lentelė: kairėje mygtukas „Kopijuoti“, viduryje kodas, dešinėje paaiškinimas. Kursorius spaudžia „Kopijuoti“, pereina į lauką „Turinys“, įklijuoja kodą ir pakeičia pavyzdinį numerį savu.
**Ekrano užrašai (tiksliai):** „Sintaksė“, „Kopijuoti“, „{{structure(19)}}“, „Turinys“
**TVS UI komponentai:** tvs-table, tvs-th, tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** puslapis: Veiklos sritys
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-sintaksiu-pavyzdziai--sc26_205.2.jpg`
**Komentaras:** epizodas `ep_701_06_1` · dalis `dal_701_06` „Sintaksių pavyzdžiai“ · prioritetas 2 · pagrindas: dal_701_06 paaiškinimas; scenos yt-VOV8HzR9yGc: 6

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Skirtuke „Sintaksė“ randate tinkamą pavyzdį. |
| 2.6 | garsas | spustelejimas |
| 4.9 | balsas | Spaudžiate „Kopijuoti“ ir įklijuojate į „Turinys“. |
| 6.3 | garsas | spustelejimas |
| 9.0 | balsas | Pavyzdinį numerį pakeičiate savo puslapio numeriu. |
| 10.8 | garsas | rasymas |

### KADRAS 8: Įkeliate nuotraukas į galeriją (12 sek.) — epizodas
**Failas:** `08-paveiksleliu-galerija.png`
**Ekrane:** Puslapio formoje atveriama „Paveikslėlių galerija“ ir langas „Images“ su žyme „Max: 100 MB“; iš aplanko iš karto nutempiamos kelios nuotraukos, jos sukrenta į sąrašą ir kiekviena pridedama mygtuku „Pridėti“.
**Ekrano užrašai (tiksliai):** „Paveikslėlių galerija“, „Max: 100 MB“, „Pridėti“, „Vardas“, „Dydis“
**TVS UI komponentai:** tvs-window, tvs-file, tvs-btn, tvs-table, tvs-cursor, tvs-ripple
**Demo duomenys:** aplankas: Demo mokyklos nuotraukos, nuotraukos: Rugsejo-pirmoji (1-6).jpg
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/08-paveiksleliu-galerija--sc37_299.0.jpg`, `nuorodos/08-paveiksleliu-galerija--sc41_339.2.jpg`
**Komentaras:** epizodas `ep_701_08_1` · dalis `dal_701_08` „Paveikslėlių galerija“ · prioritetas 2 · pagrindas: dal_701_08 paaiškinimas; scenos yt-VOV8HzR9yGc: 8

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Atidarote „Paveikslėlių galeriją“. |
| 2.4 | garsas | spustelejimas |
| 4.2 | balsas | Nutempiate kelias nuotraukas iš karto. |
| 5.6 | garsas | numetimas |
| 7.4 | balsas | Kartu jos negali viršyti šimto megabaitų. |
| 9.6 | garsas | patvirtinimas |

### KADRAS 9: Vaizdo įrašų galerija (12 sek.) — koncepcija
**Failas:** `09-vaizdo-irasu-galerija.png`
**Šablonas:** `naujas` · laukai: title, source_1, source_2, summary
**Ekrane:** Naujas šablonas (siūlomas „kortele_su_sarasu“): vienas po kito atsiranda vaizdo įrašų blokai su „YouTube“ ir „Vimeo“ ženklais; sąrašas tęsiasi už kadro ribų, o skaitiklis prie jo vis didėja – ribos nėra.
**Ekrano užrašai (tiksliai):** „Videos“, „Video“, „YouTube“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Demo mokyklos šventė
**Tarimo kandidatai:** YouTube, Vimeo (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/09-vaizdo-irasu-galerija--sc53_380.0.jpg`
**Komentaras:** epizodas `viz_701_09` · dalis `dal_701_09` „Vaizdo įrašų galerija“ · prioritetas 3 · pagrindas: dal_701_09 paaiškinimas; viz_701_09 laukai; scenos yt-VOV8HzR9yGc: 9

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Į galeriją dedate „YouTube“ ir „Vimeo“ įrašus. |
| 5.2 | balsas | Jų skaičius neribojamas. |
| 7.3 | balsas | Kiekvienam įrašui pridedate naują bloką. |

### KADRAS 10: Garso įrašų formatai (14 sek.) — koncepcija
**Failas:** `10-garso-formatai.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: žalioje kortelėje – MP3 failas su žemu dydžio stulpeliu ir WAV su daug aukštesniu; raudonoje – perbrauktas WMA. Stulpeliai užauga vienas šalia kito ir parodo skirtumą.
**Ekrano užrašai (tiksliai):** „audio/mpeg“, „2.94 MB“, „audio/x-wav“, „28.13 MB“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Mokyklos himnas.mp3
**Tarimo kandidatai:** MP3, WAV, WMA (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/10-garso-formatai--klik88_464.4.jpg`
**Komentaras:** epizodas `viz_701_10` · dalis `dal_701_10` „Garso įrašų galerija“ · prioritetas 3 · pagrindas: dal_701_10 paaiškinimas; viz_701_10 laukai; scenos yt-VOV8HzR9yGc: 10

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Garso galerija groja MP3 ir WAV failus. |
| 5.7 | balsas | WMA formatas netinka. |
| 8.2 | balsas | Pasirenkate MP3 – jis užima mažiau vietos. |

### KADRAS 11: Įjungiate atnaujinimo datą (13 sek.) — epizodas
**Failas:** `11-atnaujinimo-data.png`
**Ekrane:** Puslapio formoje po žymų lauku matomas jungiklis „Show updated“; kursorius perjungia jį į žalią „Yes“ ir spaudžia „Išsaugoti ir išeiti“. Ekranas persijungia į svetainę, kur puslapio apačioje atsiranda data.
**Ekrano užrašai (tiksliai):** „Show updated“, „Yes“, „Išsaugoti ir išeiti“
**TVS UI komponentai:** tvs-window, tvs-check, tvs-btn, tvs-cursor, tvs-ripple, tvs-site
**Demo duomenys:** puslapis: Priėmimas į mokyklą
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/11-atnaujinimo-data--klik96_503.9.jpg`
**Komentaras:** epizodas `ep_701_11_1` · dalis `dal_701_11` „Atnaujinimo data“ · prioritetas 3 · pagrindas: dal_701_11 paaiškinimas; scenos yt-VOV8HzR9yGc: 11

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Formoje randate jungiklį „Show updated“. |
| 2.6 | garsas | spustelejimas |
| 4.5 | balsas | Perjungiate jį į „Yes“ ir išsaugote. |
| 5.9 | garsas | patvirtinimas |
| 7.8 | balsas | Puslapio apačioje atsiranda atnaujinimo data. |

### KADRAS 12: Rašote ir formatuojate turinį (14 sek.) — epizodas
**Failas:** `12-turinys.png`
**Ekrane:** Lauke „Turinys“ pažymimas sakinys ir įrankių juostoje paspaudžiamas paryškinimas; tada tarp pastraipų įklijuojama sintaksė. Peržiūroje matyti, kad sintaksės vietoje svetainėje atsiranda nuotraukų galerija.
**Ekrano užrašai (tiksliai):** „Turinys“, „Source“, „Styles“, „Format“
**TVS UI komponentai:** tvs-window, tvs-input, tvs-btn, tvs-cursor, tvs-ripple, tvs-site
**Demo duomenys:** tekstas: Čia rašome tekstą, formatuojame jį.
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/12-turinys--klik106_539.1.jpg`, `nuorodos/12-turinys--sc95_564.2.jpg`
**Komentaras:** epizodas `ep_701_12_1` · dalis `dal_701_12` „Turinys“ · prioritetas 3 · pagrindas: dal_701_12 paaiškinimas; scenos yt-VOV8HzR9yGc: 12

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lauke „Turinys“ rašote ir formatuojate tekstą. |
| 2.6 | garsas | spustelejimas |
| 5.2 | balsas | Tarp pastraipų įkopijuojate sintaksę. |
| 6.6 | garsas | rasymas |
| 8.3 | balsas | Svetainėje jos vietoje atsiranda galerija. |
