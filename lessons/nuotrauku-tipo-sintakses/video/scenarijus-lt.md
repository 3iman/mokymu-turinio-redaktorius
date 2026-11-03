# Video scenarijus: Nuotraukų tipo sintaksės — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1729504742 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 126 sek. (8 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_661` · senoji WP pamoka `nuotrauku-tipo-sintakses`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Visą galeriją įterpiate viena sintakse | 19 sek. | 01-visa-galerija | Lauke „Turinys“ tuščioje eilutėje įrašote galerijos sintaksę. Išsaugote puslapį ir grįžtate į svetainę. Visos prie įrašo priskirtos nuotraukos atsiranda tinkleliu. Nieko rikiuoti nereikia. |
| 2 Viena plati nuotrauka iš galerijos | 14 sek. | 02-viena-plati-nuotrauka | Skliaustuose įrašote vienetą — tiek nuotraukų ir matysite. Svetainėje lieka viena plati nuotrauka. Ji nukadruojama žemesnė nei originalas. |
| 3 Dvi nuotraukos viena šalia kitos | 14 sek. | 03-dvi-nuotraukos-salia | Skliaustuose įrašote dvejetą. Svetainėje nuotraukos sugula po dvi. Keturioms nuotraukoms tą pačią sintaksę rašote du kartus. |
| 4 Trys nuotraukos vienoje eilutėje | 16 sek. | 04-trys-nuotraukos-eiluteje | Skliaustuose įrašote trejetą. Išsaugote ir grįžtate į puslapį. Trys nuotraukos išsirikiuoja viena eilute. Likusios galerijos nuotraukos nerodomos. |
| 5 Nuotrauka matoma visa | 15 sek. | 05-nuotrauka-per-visa-ploti | Įrašote plakato sintaksę be skaičiaus. Nuotrauka proporcingai sumažinama. Svetainėje ji matoma visa, per visą plotį. Niekas nenukerpama. |
| 6 Nuotraukos plotį nurodote pats | 16 sek. | 06-nuotraukos-plotis | Sintaksę įklijuojate iš TVS paruoštukų. Keičiate tik skaičių kabutėse. Jis nurodo plotį pikseliais. Pačių kabučių neperrašote. |
| 7 Trijų nuotraukų eilutė mėgsta horizontalias | 14 sek. | 07-vertikalios-nuotraukos | Prieš rašydami sintaksę pažiūrite, kokios nuotraukos įkeltos. Horizontalios sugula tvarkinga eilute. Vertikalios tokioje eilutėje apkarpomos. |
| 8 Nurodote, kiek nuotraukų rodyti | 18 sek. | 08-kiek-vertikaliu-nuotrauku | Skliaustuose įrašote, kiek vertikalių nuotraukų rodyti. Svetainėje jų atsiranda būtent tiek. Taip galerijas patogu perskirti antraštėmis. Be skaičiaus matomos visos nuotraukos. |

---

## Kadrai

### KADRAS 1: Visą galeriją įterpiate viena sintakse (19 sek.) — epizodas
**Failas:** `01-visa-galerija.png`
**Ekrane:** Padalytas kadras: apačioje laukas „Turinys“, viršuje — tas pats puslapis svetainėje. Kursorius tuščioje eilutėje surenka {{images()}}, paspaudžia išsaugojimą, ir viršutinėje pusėje po antrašte tinkleliu sugula visa nuotraukų galerija.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{images()}}“, „Apačioje visa galerija“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** puslapis: Ugdymo aplinka, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-visa-galerija--sc01_000.3.jpg`, `nuorodos/01-visa-galerija--sc03_018.6.jpg`
**Komentaras:** epizodas `ep_661_01_1` · dalis `dal_661_01` „Pilnos galerijos įterpimas“ · prioritetas 2 · pagrindas: dal_661_01 paaiškinimas; scenos 793: 1, 3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Lauke „Turinys“ tuščioje eilutėje įrašote galerijos sintaksę. |
| 3.0 | garsas | rasymas |
| 6.6 | balsas | Išsaugote puslapį ir grįžtate į svetainę. |
| 8.0 | garsas | spustelejimas |
| 10.1 | balsas | Visos prie įrašo priskirtos nuotraukos atsiranda tinkleliu. |
| 14.9 | balsas | Nieko rikiuoti nereikia. |
| 15.7 | garsas | patvirtinimas |

### KADRAS 2: Viena plati nuotrauka iš galerijos (14 sek.) — epizodas
**Failas:** `02-viena-plati-nuotrauka.png`
**Ekrane:** Padalytas kadras: apačioje „Turinys“, viršuje puslapis. Įrašoma {{images(1)}}, puslapis išsaugomas, ir viršuje lieka viena nuotrauka per visą plotį. Šalia jos trumpam pasirodo originalo kontūras — matyti, kad kadras žemesnis.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{images(1)}}“, „Antra antraštė apie naujieną“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** puslapis: Ugdymo aplinka
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-viena-plati-nuotrauka--sc03_002.4.jpg`, `nuorodos/02-viena-plati-nuotrauka--sc05_009.6.jpg`
**Komentaras:** epizodas `ep_661_02_1` · dalis `dal_661_02` „Vieno horizontalaus paveikslėlio įterpimas“ · prioritetas 2 · pagrindas: dal_661_02 paaiškinimas; scenos 790: 1, 5

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Skliaustuose įrašote vienetą — tiek nuotraukų ir matysite. |
| 2.8 | garsas | rasymas |
| 6.2 | balsas | Svetainėje lieka viena plati nuotrauka. |
| 7.4 | garsas | spustelejimas |
| 9.5 | balsas | Ji nukadruojama žemesnė nei originalas. |
| 10.7 | garsas | patvirtinimas |

### KADRAS 3: Dvi nuotraukos viena šalia kitos (14 sek.) — epizodas
**Failas:** `03-dvi-nuotraukos-salia.png`
**Ekrane:** Padalytas kadras. Apačioje įrašoma {{images(2)}}; viršuje atsiranda dvi nuotraukos viena šalia kitos. Tada apačioje ta pati sintaksė pakartojama antra eilute, ir viršuje po pirmąja pora sugula antra.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{images(2)}}“, „Trečia antraštė apie naujieną“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** puslapis: Ugdymo aplinka
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-dvi-nuotraukos-salia--sc02_002.6.jpg`, `nuorodos/03-dvi-nuotraukos-salia--sc05_007.2.jpg`
**Komentaras:** epizodas `ep_661_03_1` · dalis `dal_661_03` „Dviejų horizontalių paveikslėlių įterpimas“ · prioritetas 2 · pagrindas: dal_661_03 paaiškinimas; scenos 791: 1, 5

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Skliaustuose įrašote dvejetą. |
| 2.6 | garsas | rasymas |
| 5.0 | balsas | Svetainėje nuotraukos sugula po dvi. |
| 6.4 | garsas | spustelejimas |
| 8.0 | balsas | Keturioms nuotraukoms tą pačią sintaksę rašote du kartus. |
| 9.4 | garsas | patvirtinimas |

### KADRAS 4: Trys nuotraukos vienoje eilutėje (16 sek.) — epizodas
**Failas:** `04-trys-nuotraukos-eiluteje.png`
**Ekrane:** Padalytas kadras. Apačioje įrašoma {{images(3)}}, puslapis išsaugomas; viršuje trys nuotraukos išsirikiuoja viena eilute. Likusios galerijos nuotraukos lieka prigesintos už kadro ribos.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{images(3)}}“, „Antra antraštė apie naujieną“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** puslapis: Ugdymo aplinka
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-trys-nuotraukos-eiluteje--sc01_000.3.jpg`, `nuorodos/04-trys-nuotraukos-eiluteje--sc03_008.6.jpg`
**Komentaras:** epizodas `ep_661_04_1` · dalis `dal_661_04` „Trijų horizontalių paveikslėlių įterpimas“ · prioritetas 2 · pagrindas: dal_661_04 pavadinimas (teksto šaltinyje nėra — kl_661_2); scenos 792: 1, 3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Skliaustuose įrašote trejetą. |
| 2.6 | garsas | rasymas |
| 5.0 | balsas | Išsaugote ir grįžtate į puslapį. |
| 6.4 | garsas | spustelejimas |
| 8.4 | balsas | Trys nuotraukos išsirikiuoja viena eilute. |
| 11.9 | balsas | Likusios galerijos nuotraukos nerodomos. |
| 12.9 | garsas | patvirtinimas |

### KADRAS 5: Nuotrauka matoma visa (15 sek.) — epizodas
**Failas:** `05-nuotrauka-per-visa-ploti.png`
**Ekrane:** Padalytas kadras. Apačioje įrašoma {{plakatas()}}; viršuje nuotrauka proporcingai susitraukia ir atsistoja per visą turinio plotį. Prie kraštų trumpam sumirksi punktyrinė riba — nieko nenukirpta.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{plakatas()}}“, „body p“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** puslapis: Ugdymo aplinka
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-nuotrauka-per-visa-ploti--sc02_005.3.jpg`, `nuorodos/05-nuotrauka-per-visa-ploti--sc03_008.2.jpg`
**Komentaras:** epizodas `ep_661_05_1` · dalis `dal_661_05` „Vienos pilno dydžio nuotraukos įterpimas“ · prioritetas 2 · pagrindas: dal_661_05 paaiškinimas; scenos 798: 2, 3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Įrašote plakato sintaksę be skaičiaus. |
| 2.8 | garsas | rasymas |
| 5.2 | balsas | Nuotrauka proporcingai sumažinama. |
| 6.4 | garsas | spustelejimas |
| 8.1 | balsas | Svetainėje ji matoma visa, per visą plotį. |
| 11.6 | balsas | Niekas nenukerpama. |
| 12.4 | garsas | patvirtinimas |

### KADRAS 6: Nuotraukos plotį nurodote pats (16 sek.) — epizodas
**Failas:** `06-nuotraukos-plotis.png`
**Ekrane:** Padalytas kadras. Apačioje į „Turinys“ įklijuojama {{plakatas({'width': '300'})}}; skaičius kabutėse paryškėja ir pakeičiamas kitu. Viršuje nuotrauka tuoj pat susitraukia iki nurodyto pločio, šalia jos sumirksi matmuo.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{plakatas({'width': '300'})}}“, „300“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** plotis: 300
**Tarimo kandidatai:** TVS (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-nuotraukos-plotis--sc01_004.3.jpg`, `nuorodos/06-nuotraukos-plotis--sc02_010.1.jpg`
**Komentaras:** epizodas `ep_661_06_1` · dalis `dal_661_06` „Vienos nuotraukos su keičiamu dydžiu įterpimas“ · prioritetas 2 · pagrindas: dal_661_06 paaiškinimas; scenos 797: 1, 2

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Sintaksę įklijuojate iš TVS paruoštukų. |
| 2.6 | garsas | rasymas |
| 5.4 | balsas | Keičiate tik skaičių kabutėse. |
| 6.8 | garsas | rasymas |
| 8.8 | balsas | Jis nurodo plotį pikseliais. |
| 11.6 | balsas | Pačių kabučių neperrašote. |
| 12.6 | garsas | patvirtinimas |

### KADRAS 7: Trijų nuotraukų eilutė mėgsta horizontalias (14 sek.) — epizodas
**Failas:** `07-vertikalios-nuotraukos.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ su sintakse {{images(3)}}. Viršuje pirma parodoma eilutė iš trijų horizontalių nuotraukų — lygi ir tvarkinga; tada ta pati eilutė su vertikaliomis: nuotraukos apkarpomos, prie jų išnyra klaustukas.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{images(3)}}“, „Horizontalios“, „Vertikalios“
**TVS UI komponentai:** tvs-input, tvs-cursor
**Demo duomenys:** galerija: Diplomai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/07-vertikalios-nuotraukos--sc02_001.3.jpg`, `nuorodos/07-vertikalios-nuotraukos--sc06_007.5.jpg`
**Komentaras:** epizodas `ep_661_07_1` · dalis `dal_661_07` „Visų vertikalių nuotraukų ar diplomų įterpimas (po 3 į eilutę)“ · prioritetas 2 · pagrindas: dal_661_07 paaiškinimas („Naudojant sintaksę {{images(3)}} … nuotraukos būtų horizontalios“); scenos 787: 3 (įraše — {{diplomai(3)}}; sintaksė pasirinkta pagal tekstą, kl_661_1)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Prieš rašydami sintaksę pažiūrite, kokios nuotraukos įkeltos. |
| 6.4 | balsas | Horizontalios sugula tvarkinga eilute. |
| 7.6 | garsas | patvirtinimas |
| 9.6 | balsas | Vertikalios tokioje eilutėje apkarpomos. |

### KADRAS 8: Nurodote, kiek nuotraukų rodyti (18 sek.) — epizodas
**Failas:** `08-kiek-vertikaliu-nuotrauku.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ su {{diplomai(6)}}; skaičius skliaustuose paryškėja. Viršuje sugula tiek vertikalių nuotraukų, kiek nurodyta. Tada skaičius išimamas ir galerija išsiplečia per visas priskirtas nuotraukas.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{diplomai(6)}}“, „{{diplomai()}}“, „Penkta antraštė apie diplomus“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** galerija: Diplomai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/08-kiek-vertikaliu-nuotrauku--sc03_003.3.jpg`, `nuorodos/08-kiek-vertikaliu-nuotrauku--sc07_013.1.jpg`
**Komentaras:** epizodas `ep_661_08_1` · dalis `dal_661_08` „Vertikalių nuotraukų ar diplomų įterpimas (nurodant kiek tokių nuotraukų yra)“ · prioritetas 2 · pagrindas: dal_661_08 paaiškinimas; scenos 786: 2, 6, 7

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Skliaustuose įrašote, kiek vertikalių nuotraukų rodyti. |
| 3.0 | garsas | rasymas |
| 5.9 | balsas | Svetainėje jų atsiranda būtent tiek. |
| 7.1 | garsas | patvirtinimas |
| 9.5 | balsas | Taip galerijas patogu perskirti antraštėmis. |
| 13.2 | balsas | Be skaičiaus matomos visos nuotraukos. |
