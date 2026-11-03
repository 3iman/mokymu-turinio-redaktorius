# Video scenarijus: Modulio „Partneriai ir draugai“ valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2051860828 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 62 sek. (5 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_708` · senoji WP pamoka `modulio-partneriai-ir-draugai-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Logotipai – titulinio puslapio apačioje | 12 sek. | 02-partneriai-tituliniame | Slenkate titulinį puslapį iki apačios. Ten ir atsiranda partnerių bei draugų logotipai. Jie išdėstomi viena eilute. |
| 2 Logotipo reikalavimai | 13 sek. | 03-logotipo-reikalavimai | Logotipą talpinate be fono. Apkerpate jį tiek, kad neliktų tuščios erdvės. Su fonu logotipas atrodo per mažas. |
| 3 Įrašote partnerio nuorodą | 17 sek. | 04-partnerio-nuoroda | Laukelyje „Url“ įrašote pilną nuorodą. Eilutėje „Target“ įrašote „_blank“. Nuoroda atsidarys naujame lange. |
| 4 Išjungiate partnerio logotipą | 9 sek. | 05-logotipu-isjungimas | Stulpelyje „Enabled“ išjungiate jungiklį. Žalias „Yes“ virsta rožiniu „No“. |
| 5 Išjungus visus – sekcija dingsta | 11 sek. | 05-sekcija-dingsta | Perkraunate titulinį puslapį. Išjungus visus įrašus dingsta visa sekcija. Lankytojas jos nebemato. |

---

## Kadrai

### KADRAS 1: Logotipai – titulinio puslapio apačioje (12 sek.) — epizodas
**Failas:** `02-partneriai-tituliniame.png`
**Ekrane:** Svetainės titulinis puslapis slenkamas žemyn; pasiekus apačią išryškėja sekcija „Partneriai ir draugai“, kurioje logotipai išdėstyti viena eilute.
**Ekrano užrašai (tiksliai):** „Partneriai ir draugai“, „Tvarkaraščiai“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo gimnazija, partneris: Demo partneris
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-partneriai-tituliniame--856-draugai_01.jpg`, `nuorodos/02-partneriai-tituliniame--sc01_000.3.jpg`
**Komentaras:** epizodas `ep_708_02_1` · dalis `dal_708_02` „Atvaizdavimas svetainėje“ · prioritetas 2 · pagrindas: dal_708_02 paaiškinimas; scenos 854: 1

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Slenkate titulinį puslapį iki apačios. |
| 4.6 | balsas | Ten ir atsiranda partnerių bei draugų logotipai. |
| 8.6 | balsas | Jie išdėstomi viena eilute. |

### KADRAS 2: Logotipo reikalavimai (13 sek.) — koncepcija
**Failas:** `03-logotipo-reikalavimai.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, do_4, dont_title, dont_1, dont_2
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: dešinėje žalioje kortelėje logotipai be fono, apkirpti iki pat kraštų, su matmenų užrašu; kairėje raudonoje – tas pats logotipas baltame stačiakampyje ir su plačia tuščia erdve aplink, todėl atrodo mažesnis. Kortelės iškyla viena po kitos.
**Ekrano užrašai (tiksliai):** „Tinka“, „Netinka“, „300 x 300“, „PNG arba SVG“
**TVS UI komponentai:** —
**Demo duomenys:** partneris: Demo partneris
**Tarimo kandidatai:** PNG, SVG (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-logotipo-reikalavimai--857-draugai_02.png`
**Komentaras:** epizodas `viz_708_03` · dalis `dal_708_03` „Logotipų sąrašas“ · prioritetas 2 · pagrindas: dal_708_03 paaiškinimas; viz_708_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Logotipą talpinate be fono. |
| 3.9 | balsas | Apkerpate jį tiek, kad neliktų tuščios erdvės. |
| 7.8 | balsas | Su fonu logotipas atrodo per mažas. |

### KADRAS 3: Įrašote partnerio nuorodą (17 sek.) — epizodas
**Failas:** `04-partnerio-nuoroda.png`
**Ekrane:** Partnerio įrašo kortelė; kamera priartėja prie lauko „Url“, į kurį įvedama pilna nuoroda. Žemiau esančioje eilutėje „Target“ įrašoma „_blank“, tada spaudžiamas žalias „Išsaugoti ir išeiti“.
**Ekrano užrašai (tiksliai):** „Url“, „Target“, „_blank“, „Išsaugoti ir išeiti“
**TVS UI komponentai:** tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** partneris: Demo partneris, nuoroda: https://demo-partneris.lt/
**Tarimo kandidatai:** Url, Target, _blank (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-partnerio-nuoroda--858-draugai_03.png`, `nuorodos/04-partnerio-nuoroda--sc02_003.3.jpg`
**Komentaras:** epizodas `ep_708_04_1` · dalis `dal_708_04` „Konkretaus partnerio įrašas“ · prioritetas 2 · pagrindas: dal_708_04 paaiškinimas; scenos 855: 2; eskizas 2026-10-31: pridėti trūkstami veiksmų garsai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Laukelyje „Url“ įrašote pilną nuorodą. |
| 2.8 | garsas | rasymas |
| 5.2 | balsas | Eilutėje „Target“ įrašote „_blank“. |
| 6.2 | garsas | rasymas |
| 11.3 | balsas | Nuoroda atsidarys naujame lange. |
| 11.9 | garsas | spustelejimas |
| 12.4 | garsas | patvirtinimas |

### KADRAS 4: Išjungiate partnerio logotipą (9 sek.) — epizodas
**Failas:** `05-logotipu-isjungimas.png`
**Ekrane:** Partnerių sąrašas; kamera priartėja prie stulpelio „Enabled“. Kursorius perjungia pirmą jungiklį iš žalio „Yes“ į rožinį „No“, paskui taip pat ir likusius.
**Ekrano užrašai (tiksliai):** „Enabled“, „Yes“, „No“
**TVS UI komponentai:** tvs-row, tvs-cursor, tvs-ripple
**Demo duomenys:** partneris: Demo partneris
**Tarimo kandidatai:** Enabled, Yes, No (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-logotipu-isjungimas--sc04_008.4.jpg`
**Komentaras:** epizodas `ep_708_05_1` · dalis `dal_708_05` „Nenorite nurodyti draugų ir partnerių?“ · prioritetas 1 · pagrindas: dal_708_05 paaiškinimas; scenos 854: 4; eskizas 2026-10-31: pridėti trūkstami veiksmų garsai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Stulpelyje „Enabled“ išjungiate jungiklį. |
| 2.0 | garsas | spustelejimas |
| 2.4 | garsas | spustelejimas |
| 2.8 | garsas | spustelejimas |
| 3.2 | garsas | spustelejimas |
| 3.6 | garsas | spustelejimas |
| 4.4 | balsas | Žalias „Yes“ virsta rožiniu „No“. |

### KADRAS 5: Išjungus visus – sekcija dingsta (11 sek.) — epizodas
**Failas:** `05-sekcija-dingsta.png`
**Ekrane:** Dvi to paties svetainės puslapio būsenos: pirmiausia apačioje matoma sekcija „Partneriai ir draugai“ su logotipais, po perkrovimo jos vietoje lieka tik „Tvarkaraščiai“ ir poraštė. Perėjimas – trumpas persiliejimas.
**Ekrano užrašai (tiksliai):** „Partneriai ir draugai“, „Tvarkaraščiai“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo gimnazija, partneris: Demo partneris
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-sekcija-dingsta--sc05_013.0.jpg`, `nuorodos/05-sekcija-dingsta--sc06_014.7.jpg`
**Komentaras:** epizodas `ep_708_05_2` · dalis `dal_708_05` „Nenorite nurodyti draugų ir partnerių?“ · prioritetas 1 · pagrindas: dal_708_05 paaiškinimas; scenos 854: 1, 5–6

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Perkraunate titulinį puslapį. |
| 3.7 | balsas | Išjungus visus įrašus dingsta visa sekcija. |
| 7.3 | balsas | Lankytojas jos nebemato. |
