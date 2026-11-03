# Video scenarijus: Kategorijos ir dokumentų talpinimas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2278161564 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 96 sek. (7 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_678` · senoji WP pamoka `pagrindines-dokumentu-banko-funkcijos`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Pervadinate prieš įkeldami | 15 sek. | 01-pervadinti-pries-ikeliant | Dokumentų pavadinimus redaguojate dar prieš talpindami į sistemą. Taip išvengiate painiavos. Failą lengva rasti ir kompiuteryje, ir svetainėje. |
| 2 Subkategoriją kuriate iš sąrašo | 15 sek. | 03-nauja-subkategorija | Užvedate pelytę ant kategorijos pavadinimo. Eilutės dešinėje išnyra mygtukai. Spaudžiate „Sukurti subkategoriją“. Įrašote pavadinimą ir išsaugote. |
| 3 Pažymėtus dokumentus ištrinate | 11 sek. | 05-dokumentu-trynimas | Pažymite konkrečius dokumentus. Sąrašo apačioje išnyra funkciniai mygtukai. Spaudžiate raudoną „Ištrinti“. |
| 4 Iš sąrašo pereinate į redagavimą | 12 sek. | 05-redagavimo-mygtukas | Pažymite dokumentus. Apačioje spaudžiate oranžinį „Redaguoti“. Atsiveria pirmo dokumento redagavimo langas. |
| 5 Kelis failus keliate iš karto | 14 sek. | 06-keliu-failu-ikelimas | Daugiau nei vieną dokumentą greičiau įkelsite per kategorijų sąrašą. Prie kategorijos spaudžiate „Įkelti“. Failus galite tiesiog įtempti. |
| 6 Pavadinimus taisote vieną po kito | 15 sek. | 06-pavadinimu-taisymas | Lauke „Pavadinimas“ pataisote netvarkingą pavadinimą. Spaudžiate „Išsaugoti ir redaguoti sekantį“. Atsiveria kito dokumento langas. Į sąrašą grįžti nereikia. |
| 7 Priminimų funkcija | 14 sek. | 10-priminimai | Priminimų funkcija ypač lengva naudotis. Darbalaukyje matote, kurį dokumentą metas peržiūrėti. Rekomenduojame išnaudoti jos privalumus. |

---

## Kadrai

### KADRAS 1: Pervadinate prieš įkeldami (15 sek.) — koncepcija
**Failas:** `01-pervadinti-pries-ikeliant.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2
**Ekrane:** Šablonas „palyginimas“: kairėje „Po įkėlimo“ – svetainės sąrašas su netvarkingais vardais ir klaustukais. Dešinėje „Prieš įkeliant“ – tie patys failai pervadinami kompiuterio aplanke ir tik tada nuslysta į svetainę, kur sąrašas atrodo tvarkingai.
**Ekrano užrašai (tiksliai):** „Po įkėlimo“, „Prieš įkeliant“, „Painiava“, „Lengva rasti“
**TVS UI komponentai:** —
**Demo duomenys:** blogas: fin_ataisk_23-IV.pdf, geras: 2023 m. III ketvirčio finansinė ataskaita
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-pervadinti-pries-ikeliant--sc02_020.9.jpg`
**Komentaras:** epizodas `viz_678_01` · dalis `dal_678_01` „Dokumentų pavadinimai“ · prioritetas 2 · pagrindas: dal_678_01 paaiškinimas; scenos yt-kguHnB8i9ps: skyrius 01

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Dokumentų pavadinimus redaguojate dar prieš talpindami į sistemą. |
| 6.5 | balsas | Taip išvengiate painiavos. |
| 8.9 | balsas | Failą lengva rasti ir kompiuteryje, ir svetainėje. |

### KADRAS 2: Subkategoriją kuriate iš sąrašo (15 sek.) — epizodas
**Failas:** `03-nauja-subkategorija.png`
**Ekrane:** Kategorijų sąrašas: kursorius užveda ant kategorijos eilutės ir jos dešinėje išnyra keturi mygtukai. Spaudžiamas žalias „Sukurti subkategoriją“, formoje įrašomas pavadinimas, o sąraše po kategorija atsiranda įtraukta eilutė.
**Ekrano užrašai (tiksliai):** „Sukurti subkategoriją“, „Peržiūrėti“, „Įkelti“, „Ištrinti“, „Nuostatai“
**TVS UI komponentai:** tvs-row, tvs-actions, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** kategorija: Nuostatai, subkategorija: Tvarkų aprašai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-nauja-subkategorija--sc05_103.9.jpg`, `nuorodos/03-nauja-subkategorija--sc22_221.1.jpg`
**Komentaras:** epizodas `ep_678_03_1` · dalis `dal_678_03` „Nauja subkategorija“ · prioritetas 1 · pagrindas: dal_678_03 paaiškinimas; scenos yt-kguHnB8i9ps: skyrius 03

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Užvedate pelytę ant kategorijos pavadinimo. |
| 4.8 | balsas | Eilutės dešinėje išnyra mygtukai. |
| 7.6 | balsas | Spaudžiate „Sukurti subkategoriją“. |
| 8.6 | garsas | spustelejimas |
| 10.6 | balsas | Įrašote pavadinimą ir išsaugote. |
| 11.8 | garsas | rasymas |

### KADRAS 3: Pažymėtus dokumentus ištrinate (11 sek.) — epizodas
**Failas:** `05-dokumentu-trynimas.png`
**Ekrane:** Dokumentų sąrašas: kursorius pažymi dviejų eilučių langelius, po sąrašu išnyra trys mygtukai. Spaudžiamas raudonas „Ištrinti“ ir pažymėtos eilutės iškrenta iš sąrašo.
**Ekrano užrašai (tiksliai):** „Perrikiuoti“, „Ištrinti“, „Redaguoti“, „Pavadinimas“
**TVS UI komponentai:** tvs-table, tvs-row, tvs-check, tvs-btn, tvs-cursor
**Demo duomenys:** dokumentas: strateginis-planas-2006-2010.pdf
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-dokumentu-trynimas--sc17_185.4.jpg`
**Komentaras:** epizodas `ep_678_05_1` · dalis `dal_678_05` „Funkciniai mygtukai“ · prioritetas 2 · pagrindas: dal_678_05 paaiškinimas; scenos yt-kguHnB8i9ps: skyrius 05

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Pažymite konkrečius dokumentus. |
| 2.0 | garsas | spustelejimas |
| 3.6 | balsas | Sąrašo apačioje išnyra funkciniai mygtukai. |
| 7.2 | balsas | Spaudžiate raudoną „Ištrinti“. |
| 8.2 | garsas | patvirtinimas |

### KADRAS 4: Iš sąrašo pereinate į redagavimą (12 sek.) — epizodas
**Failas:** `05-redagavimo-mygtukas.png`
**Ekrane:** Dokumentų sąrašas su pažymėtomis eilutėmis; apačioje spaudžiamas oranžinis „Redaguoti“ ir ekranas persijungia į pirmo dokumento redagavimo formą.
**Ekrano užrašai (tiksliai):** „Redaguoti“, „Ištrinti“, „Pavadinimas“, „Failas“
**TVS UI komponentai:** tvs-table, tvs-row, tvs-check, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** dokumentas: 2023 m. III ketvirčio finansinė ataskaita
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-redagavimo-mygtukas--sc17_185.4.jpg`
**Komentaras:** epizodas `ep_678_05_2` · dalis `dal_678_05` „Funkciniai mygtukai“ · prioritetas 2 · pagrindas: dal_678_05 paaiškinimas; scenos yt-kguHnB8i9ps: skyrius 05

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Pažymite dokumentus. |
| 2.0 | garsas | spustelejimas |
| 3.4 | balsas | Apačioje spaudžiate oranžinį „Redaguoti“. |
| 6.8 | balsas | Atsiveria pirmo dokumento redagavimo langas. |

### KADRAS 5: Kelis failus keliate iš karto (14 sek.) — epizodas
**Failas:** `06-keliu-failu-ikelimas.png`
**Ekrane:** Kategorijų sąrašas: užvedus ant kategorijos spaudžiamas žalias „Įkelti“. Atsiveria įkėlimo sritis su užrašu per vidurį; į ją iš viršaus nukrenta keturi failai ir sugula į lentelę su stulpeliais.
**Ekrano užrašai (tiksliai):** „Įkelti“, „Spausk arba įtempk failus“, „Vardas“, „Dydis“, „MIME tipas“, „Katalogas“
**TVS UI komponentai:** tvs-row, tvs-actions, tvs-btn, tvs-placeholder, tvs-table, tvs-cursor
**Demo duomenys:** kategorija: Finansinių ataskaitų rinkiniai
**Tarimo kandidatai:** MIME (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-keliu-failu-ikelimas--sc22_221.1.jpg`, `nuorodos/06-keliu-failu-ikelimas--sc24_243.6.jpg`
**Komentaras:** epizodas `ep_678_06_1` · dalis `dal_678_06` „Kelių dokumentų talpinimas“ · prioritetas 2 · pagrindas: dal_678_06 paaiškinimas; scenos yt-kguHnB8i9ps: skyrius 06

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Daugiau nei vieną dokumentą greičiau įkelsite per kategorijų sąrašą. |
| 6.8 | balsas | Prie kategorijos spaudžiate „Įkelti“. |
| 7.8 | garsas | spustelejimas |
| 9.9 | balsas | Failus galite tiesiog įtempti. |
| 11.1 | garsas | numetimas |

### KADRAS 6: Pavadinimus taisote vieną po kito (15 sek.) — epizodas
**Failas:** `06-pavadinimu-taisymas.png`
**Ekrane:** Dokumento redagavimo forma su netvarkingu pavadinimu; jis perrašomas. Apačioje spaudžiamas žalias „Išsaugoti ir redaguoti sekantį“ ir forma iškart pasikeičia į kito dokumento – į sąrašą grįžti nereikia.
**Ekrano užrašai (tiksliai):** „Pavadinimas“, „Išsaugoti ir redaguoti sekantį“, „Atnaujinti“, „Išsaugoti ir išeiti“
**TVS UI komponentai:** tvs-main, tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** blogas: 03251-siga.docx, geras: 2023 m. III ketvirčio finansinė ataskaita
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-pavadinimu-taisymas--sc27_263.5.jpg`, `nuorodos/06-pavadinimu-taisymas--sc33_346.5.jpg`
**Komentaras:** epizodas `ep_678_06_2` · dalis `dal_678_06` „Kelių dokumentų talpinimas“ · prioritetas 2 · pagrindas: dal_678_06 paaiškinimas; scenos yt-kguHnB8i9ps: skyrius 06

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lauke „Pavadinimas“ pataisote netvarkingą pavadinimą. |
| 2.6 | garsas | rasymas |
| 5.6 | balsas | Spaudžiate „Išsaugoti ir redaguoti sekantį“. |
| 6.8 | garsas | spustelejimas |
| 9.3 | balsas | Atsiveria kito dokumento langas. |
| 12.0 | balsas | Į sąrašą grįžti nereikia. |

### KADRAS 7: Priminimų funkcija (14 sek.) — koncepcija
**Failas:** `10-priminimai.png`
**Šablonas:** `naujas` · laukai: title, note
**Ekrane:** Šablonas „naujas“ (kortelė su sąrašu): centre darbalaukio kortelė „Dokumentų priminimai“, kurioje viena po kitos atsiranda dvi eilutės su data ir komentaru. Viena jų įsižiebia raudonai, o varpelio ženklas prie jos sumirksi.
**Ekrano užrašai (tiksliai):** „Dokumentų priminimai“, „Patikrinimo data“, „Patikrinimo komentaras“
**TVS UI komponentai:** —
**Demo duomenys:** komentaras: Pakeisti prieš naujus mokslo metus, dokumentas: Ugdymo planas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/10-priminimai--sc51_556.6.jpg`, `nuorodos/10-priminimai--sc20_226.4.jpg`
**Komentaras:** epizodas `viz_678_10` · dalis `dal_678_10` „Priminimai“ · prioritetas 3 · pagrindas: dal_678_10 paaiškinimas; scenos yt-kguHnB8i9ps: skyrius 10; scenos yt-eQ4FA_GexN8: skyrius 13 (darbalaukio kortelė)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Priminimų funkcija ypač lengva naudotis. |
| 4.7 | balsas | Darbalaukyje matote, kurį dokumentą metas peržiūrėti. |
| 9.1 | balsas | Rekomenduojame išnaudoti jos privalumus. |
