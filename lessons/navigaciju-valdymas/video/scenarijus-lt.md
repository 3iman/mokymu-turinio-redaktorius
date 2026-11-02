# Video scenarijus: Navigacijų valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 989646156 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 176 sek. (13 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_705` · senoji WP pamoka `navigaciju-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Grupės jau sukurtos | 13 sek. | 01-navigaciju-grupes | Navigacijų sąraše grupės jau sukurtos. Prie kiekvienos matote aprašymą, kurioje vietoje ji rodoma. Jums belieka pasirinkti reikiamą. |
| 2 Sukuriate naują grupę | 14 sek. | 02-nauja-grupe | Naują grupę pradedate mygtuku „Naujas meniu“. Lauke „Vardas“ įrašote grupės pavadinimą. Laukas „Slug“ užsipildo pats – patikrinate ir išsaugote. |
| 3 Atpažįstate išorinę nuorodą | 11 sek. | 03-isorine-nuoroda | Prie nuorodos matote raudoną strėlytę. Ji reiškia išorinę nuorodą. Lankytoją ji išves už svetainės ribų. |
| 4 Pasirenkate nuorodos tipą | 12 sek. | 04-nuorodos-tipas | Kurdami nuorodą pirmiausia pasirenkate jos tipą. „Page“ priskiria puslapį iš svetainės medžio. „URL“ veda į išorinę nuorodą. |
| 5 Kur rasti „Navigacijos“ | 13 sek. | 05-kur-rasti-navigacijas | „Navigacijos“ rasite darbalaukyje. Arba kairiajame meniu. Greičiausia – paieškoje įrašyti „navi“. Ir pasirenkate „Navigacijos“. |
| 6 Atidarote nuorodų medį | 9 sek. | 05-nuorodu-medis | Prie grupės „Main“ spaudžiate „Linkai“. Atsiveria pagrindinės navigacijos medis. |
| 7 Puslapį pridedate į meniu | 17 sek. | 05-nauja-nuoroda | Nuorodų medyje spaudžiate „Naujas linkas“ ir pasirenkate „Page“. Lauke „Page“ susirandate puslapį „Logopedas“. Spaudžiate „Išsaugoti“ – nuoroda atsiranda medžio apačioje. |
| 8 Meniu vardas gali skirtis | 13 sek. | 06-skirtingi-pavadinimai | Lauke „Title“ įrašote, kaip nuoroda vadinsis meniu. Priskirtas puslapis gali vadintis kitaip. Meniu lieka trumpas pavadinimas. |
| 9 Atidarote nuorodos parinktis | 14 sek. | 07-juodojo-meniu-parinktys | Prie grupės „Black“ spaudžiate „Linkai“. Atidarote nuorodą, kuriai norite ikonėlės. Skirtuke „Parinktys“ laukas „Class“ kol kas tuščias. |
| 10 Nukopijuojate ikonėlės kodą | 15 sek. | 07-fontawesome-kodas | Fontawesome paieškoje įrašote ikonos vardą. Pasirenkate tinkamą ikoną. Stilių renkatės „Light“ ir nukopijuojate HTML kodą. |
| 11 Įklijuojate ikonėlės klasę | 16 sek. | 07-ikonos-klase | Lauke „Class“ įklijuojate nukopijuotą kodą. Paliekate tik klasę – HTML dalis ištrinate. Spaudžiate „Atnaujinti“ ir ikonėlė atsiranda meniu. |
| 12 Atidarote keturių ikonų nuorodas | 15 sek. | 08-keturios-ikonos | Paieškoje pasirenkate „Navigacijos“. Prie grupės „4 ikonos“ spaudžiate „Linkai“. Matote keturias titulinio puslapio nuorodas. |
| 13 Pakeičiate el. dienyno adresą | 14 sek. | 08-dienyno-adresas | Sąraše spaudžiate „Elektroninis dienynas“. Lauke „URL“ įrašote naują dienyno adresą. Spaudžiate „Atnaujinti“ – nuoroda išsaugota. |

---

## Kadrai

### KADRAS 1: Grupės jau sukurtos (13 sek.) — epizodas
**Failas:** `01-navigaciju-grupes.png`
**Ekrane:** Navigacijų grupių sąrašas „Meniu“; kamera lėtai eina stulpeliu „Vardas“ — „4 ikonos“, „Black“, „Footer 1“, „Main“ — šalia kiekvienos šviečia aprašymas stulpelyje „Aprašymas“.
**Ekrano užrašai (tiksliai):** „Vardas“, „Aprašymas“, „4 ikonos“, „Black“, „Main“
**TVS UI komponentai:** tvs-row, tvs-cursor
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Footer (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-navigaciju-grupes--826-navigacijos_01.png`
**Komentaras:** epizodas `ep_705_01_1` · dalis `dal_705_01` „Navigacijų grupių sąrašas“ · prioritetas 2 · pagrindas: dal_705_01 paaiškinimas; nuotrauka 826 (grupių sąrašas); eskizas 2026-10-31 (eskizai-lt.md)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Navigacijų sąraše grupės jau sukurtos. |
| 4.4 | balsas | Prie kiekvienos matote aprašymą, kurioje vietoje ji rodoma. |
| 9.2 | balsas | Jums belieka pasirinkti reikiamą. |

### KADRAS 2: Sukuriate naują grupę (14 sek.) — epizodas
**Failas:** `02-nauja-grupe.png`
**Ekrane:** Grupių sąrašas; kursorius spaudžia žalią mygtuką „Naujas meniu“, atsiveria forma su laukais „Vardas“ ir „Slug“. Įrašomas vardas, „Slug“ užsipildo pats („pagalba-mokiniams“ — su brūkšneliu), spaudžiama „Išsaugoti“.
**Ekrano užrašai (tiksliai):** „Naujas meniu“, „Vardas“, „Slug“, „Išsaugoti“
**TVS UI komponentai:** tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** grupe: Pagalba mokiniams, slug: pagalba-mokiniams
**Tarimo kandidatai:** Slug (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `ep_705_02_1` · dalis `dal_705_02` „Navigacijų grupės sukūrimas“ · prioritetas 2 · pagrindas: dal_705_02 paaiškinimas; eskizas 2026-10-31 (eskizai-lt.md); Eimantas 2026-10-31: „Slug“ — su brūkšneliu

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Naują grupę pradedate mygtuku „Naujas meniu“. |
| 2.6 | garsas | spustelejimas |
| 5.1 | balsas | Lauke „Vardas“ įrašote grupės pavadinimą. |
| 6.5 | garsas | rasymas |
| 8.5 | balsas | Laukas „Slug“ užsipildo pats – patikrinate ir išsaugote. |
| 10.9 | garsas | spustelejimas |
| 11.4 | garsas | patvirtinimas |

### KADRAS 3: Atpažįstate išorinę nuorodą (11 sek.) — epizodas
**Failas:** `03-isorine-nuoroda.png`
**Ekrane:** Nuorodų sąrašas; kamera priartėja prie eilutės „Youtube kanalas“, kurioje šalia pavadinimo šviečia raudona strėlytės ikonėlė. Ikonėlė sumirksi.
**Ekrano užrašai (tiksliai):** „Youtube kanalas“, „URL“
**TVS UI komponentai:** tvs-row, tvs-cursor, naujas: raudona išorinės nuorodos strėlytės ikonėlė
**Demo duomenys:** —
**Tarimo kandidatai:** Youtube (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-isorine-nuoroda--828-navigacijos_03.png`
**Komentaras:** epizodas `ep_705_03_1` · dalis `dal_705_03` „Nuorodų (linkų) sąrašas“ · prioritetas 1 · pagrindas: dal_705_03 paaiškinimas; nuotrauka 828 (raudona ikonėlė prie „Youtube kanalas“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prie nuorodos matote raudoną strėlytę. |
| 4.6 | balsas | Ji reiškia išorinę nuorodą. |
| 7.0 | balsas | Lankytoją ji išves už svetainės ribų. |

### KADRAS 4: Pasirenkate nuorodos tipą (12 sek.) — epizodas
**Failas:** `04-nuorodos-tipas.png`
**Ekrane:** Modalinis langas „Kokio tipo linką norite sukurti?“ su dviem pasirinkimais — „Page“ ir „URL“. Fokusas stoja ties „Page“, tada ties „URL“; spaudžiama „URL“ ir atsiveria forma su laukais „Title“ ir „URL“.
**Ekrano užrašai (tiksliai):** „Kokio tipo linką norite sukurti?“, „Page“, „URL“
**TVS UI komponentai:** tvs-btn, tvs-cursor, naujas: modalinis langas su pasirinkimu (Page / URL)
**Demo duomenys:** —
**Tarimo kandidatai:** Page, URL (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-nuorodos-tipas--829-navigacijos_04.png`
**Komentaras:** epizodas `ep_705_04_1` · dalis `dal_705_04` „Nuorodos (linko) pasirinkimas“ · prioritetas 2 · pagrindas: dal_705_04 paaiškinimas; nuotrauka 829 (langas su Page / URL); eskizas 2026-10-31 (eskizai-lt.md)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kurdami nuorodą pirmiausia pasirenkate jos tipą. |
| 5.2 | balsas | „Page“ priskiria puslapį iš svetainės medžio. |
| 8.9 | balsas | „URL“ veda į išorinę nuorodą. |
| 10.3 | garsas | spustelejimas |

### KADRAS 5: Kur rasti „Navigacijos“ (13 sek.) — epizodas
**Failas:** `05-kur-rasti-navigacijas.png`
**Ekrane:** TVS darbalaukis („Darbalaukiai“ › „Įrankiai“). Fokusas ant „Navigacijos“ modulių sąraše (nespaudžiama). Tada fokusas ant suskleisto kairiojo meniu — ikona „≡“ (tokia pat kaip darbalaukyje prie „Navigacijos“); spaudžiamas „☰“, meniu išsiskleidžia ir prie tos pačios ikonos matosi užrašas „Navigacijos“ (nespaudžiama). Tada paieškos lauke „Type to search…“ įrašoma „navi“, išsiskleidžia sąrašas su grupe „Navigation“ ir spaudžiama „Navigacijos“ — atsiveria grupių sąrašas.
**Ekrano užrašai (tiksliai):** „Darbalaukiai“, „Įrankiai“, „Puslapiai“, „Navigacijos“, „Type to search…“, „navi“, „Navigation“, „Links“
**TVS UI komponentai:** tvs-window, tvs-side, tvs-burger, tvs-searchbar, tvs-input, tvs-cursor, tvs-ripple, naujas: išskleista šoninė juosta (ikona + užrašas), naujas: paieškos išskleidžiamas sąrašas su grupės antrašte
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** navi (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-kur-rasti-navigacijas--sc01_000.3.jpg`, `nuorodos/05-kur-rasti-navigacijas--sc01_004.3.jpg`
**Komentaras:** epizodas `ep_705_05_4` · dalis `dal_705_05` „Navigacijų nuorodos (linko) pridėjimas“ · prioritetas 2 · pagrindas: scenos 835: 1 (paieška „navi“ → „Navigacijos“); Eimantas 2026-10-31: į modulį patenkama keliais būdais — rodomi visi trys; Eimantas 2026-10-31: kairysis meniu — vienu atveju ikona, kitu (išskleidus „☰“) ikona su užrašu

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | „Navigacijos“ rasite darbalaukyje. |
| 3.9 | balsas | Arba kairiajame meniu. |
| 4.7 | garsas | spustelejimas |
| 6.3 | balsas | Greičiausia – paieškoje įrašyti „navi“. |
| 7.9 | garsas | rasymas |
| 9.6 | balsas | Ir pasirenkate „Navigacijos“. |
| 10.6 | garsas | spustelejimas |

### KADRAS 6: Atidarote nuorodų medį (9 sek.) — epizodas
**Failas:** `05-nuorodu-medis.png`
**Ekrane:** Navigacijų grupių sąrašas; fokusas ant eilutės „Main“, kursorius spaudžia mėlyną „Linkai“, atsiveria nuorodų medis eilutė po eilutės.
**Ekrano užrašai (tiksliai):** „Main“, „Linkai“, „Redaguoti“, „Vardas“, „Aprašymas“, „Naujas linkas“, „Page“, „URL“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Main (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-nuorodu-medis--klik02_009.6.jpg`, `nuorodos/05-nuorodu-medis--sc03_010.3.jpg`
**Komentaras:** epizodas `ep_705_05_1` · dalis `dal_705_05` „Navigacijų nuorodos (linko) pridėjimas“ · prioritetas 3 · pagrindas: dal_705_05 paaiškinimas; scenos 835: 2–3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Prie grupės „Main“ spaudžiate „Linkai“. |
| 2.6 | garsas | spustelejimas |
| 4.4 | balsas | Atsiveria pagrindinės navigacijos medis. |

### KADRAS 7: Puslapį pridedate į meniu (17 sek.) — epizodas
**Failas:** `05-nauja-nuoroda.png`
**Ekrane:** Grupės „Main“ nuorodų medis; kursorius spaudžia „Naujas linkas“, lange pasirenka „Page“. Formoje lauke „Page“ — „Pažymėti“, paieškoje įrašoma „logo“, prie „Logopedas“ — „Pažymėti“; „Title“ lieka tuščias (meniu rodo priskirto puslapio pavadinimą), tada „Išsaugoti“.
**Ekrano užrašai (tiksliai):** „Title“, „Naujas linkas“, „Page“, „URL“, „Pažymėti“, „Logopedas“, „Išsaugoti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple, naujas: modalinis langas su pasirinkimu (Page / URL)
**Demo duomenys:** puslapis: Logopedas
**Tarimo kandidatai:** Page, Logopedas (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-nauja-nuoroda--klik03_011.6.jpg`, `nuorodos/05-nauja-nuoroda--sc05_016.2.jpg`, `nuorodos/05-nauja-nuoroda--sc07_019.3.jpg`, `nuorodos/05-nauja-nuoroda--sc09_026.8.jpg`
**Komentaras:** epizodas `ep_705_05_2` · dalis `dal_705_05` „Navigacijų nuorodos (linko) pridėjimas“ · prioritetas 2 · pagrindas: dal_705_05 paaiškinimas („Logopedas“, pagrindinė navigacija); scenos 835: 3–6; Eimantas 2026-11-02: „Title“ nerašomas ir neužsipildo — užtenka prisegti puslapį, meniu rodo jo pavadinimą („Logopedas“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.6 | balsas | Nuorodų medyje spaudžiate „Naujas linkas“ ir pasirenkate „Page“. |
| 2.8 | garsas | spustelejimas |
| 4.4 | garsas | spustelejimas |
| 6.8 | balsas | Lauke „Page“ susirandate puslapį „Logopedas“. |
| 7.2 | garsas | spustelejimas |
| 7.9 | garsas | rasymas |
| 9.1 | garsas | spustelejimas |
| 10.9 | balsas | Spaudžiate „Išsaugoti“ – nuoroda atsiranda medžio apačioje. |
| 12.3 | garsas | spustelejimas |
| 13.7 | garsas | patvirtinimas |

### KADRAS 8: Meniu vardas gali skirtis (13 sek.) — epizodas
**Failas:** `06-skirtingi-pavadinimai.png`
**Ekrane:** Nuorodos redagavimo forma; kameroje greta laukas „Title“ su reikšme „Projektai“ ir priskirtas puslapis „Projektinė veikla“. Abu užrašai sumirksi vienu metu.
**Ekrano užrašai (tiksliai):** „Title“, „Projektai“, „Projektinė veikla“
**TVS UI komponentai:** tvs-input, tvs-row, tvs-cursor
**Demo duomenys:** puslapis: Projektinė veikla
**Tarimo kandidatai:** Title (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-skirtingi-pavadinimai--831-navigacijos_06.png`
**Komentaras:** epizodas `ep_705_06_1` · dalis `dal_705_06` „Skirtingi puslapio ir navigacijos pavadinimai“ · prioritetas 2 · pagrindas: dal_705_06 paaiškinimas; nuotrauka 831 (Title „Projektai“ ↔ puslapis „Projektinė veikla“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lauke „Title“ įrašote, kaip nuoroda vadinsis meniu. |
| 5.4 | balsas | Priskirtas puslapis gali vadintis kitaip. |
| 8.8 | balsas | Meniu lieka trumpas pavadinimas. |

### KADRAS 9: Atidarote nuorodos parinktis (14 sek.) — epizodas
**Failas:** `07-juodojo-meniu-parinktys.png`
**Ekrane:** Grupių sąrašas; prie eilutės „Black“ spaudžiama „Linkai“, atsiveria juodojo meniu nuorodos. Pasirenkama viena nuoroda, formoje spaudžiamas skirtukas „Parinktys“ ir rodomas tuščias laukas „Class“.
**Ekrano užrašai (tiksliai):** „Black“, „Linkai“, „Pagrindinis“, „Parinktys“, „Class“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple, naujas: formos skirtukai (Pagrindinis / Parinktys)
**Demo duomenys:** nuoroda: Pamokų laikas
**Tarimo kandidatai:** Black, Class (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/07-juodojo-meniu-parinktys--sc06_013.1.jpg`
**Komentaras:** epizodas `ep_705_07_1` · dalis `dal_705_07` „Nuoroda (linkas), turinti ikonėlę“ · prioritetas 2 · pagrindas: dal_705_07 paaiškinimas; scenos 834: 4–7; eskizas 2026-10-31 (eskizai-lt.md)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Prie grupės „Black“ spaudžiate „Linkai“. |
| 2.6 | garsas | spustelejimas |
| 4.7 | balsas | Atidarote nuorodą, kuriai norite ikonėlės. |
| 5.9 | garsas | spustelejimas |
| 8.2 | balsas | Skirtuke „Parinktys“ laukas „Class“ kol kas tuščias. |
| 9.0 | garsas | spustelejimas |

### KADRAS 10: Nukopijuojate ikonėlės kodą (15 sek.) — epizodas
**Failas:** `07-fontawesome-kodas.png`
**Ekrane:** Fontawesome puslapis su ikonų tinkleliu; paieškoje įrašoma „list“, tinklelyje pažymima „list-ol“. Atsiveria ikonos langas su stiliais, pasirenkamas „Light“ ir nukopijuojamas HTML kodas.
**Ekrano užrašai (tiksliai):** „list“, „list-ol“, „Light“, „HTML“
**TVS UI komponentai:** tvs-input, tvs-cursor, naujas: Fontawesome ikonų tinklelis, naujas: ikonos langas su stiliaus pasirinkimu
**Demo duomenys:** —
**Tarimo kandidatai:** Fontawesome, list-ol, Light, HTML (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/07-fontawesome-kodas--sc08_026.5.jpg`, `nuorodos/07-fontawesome-kodas--sc09_035.8.jpg`
**Komentaras:** epizodas `ep_705_07_2` · dalis `dal_705_07` „Nuoroda (linkas), turinti ikonėlę“ · prioritetas 2 · pagrindas: dal_705_07 paaiškinimas (fontawesome.com, 5 versija, „light“ stilius); scenos 834: 8–9

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Fontawesome paieškoje įrašote ikonos vardą. |
| 2.8 | garsas | rasymas |
| 5.0 | balsas | Pasirenkate tinkamą ikoną. |
| 6.2 | garsas | spustelejimas |
| 8.4 | balsas | Stilių renkatės „Light“ ir nukopijuojate HTML kodą. |
| 11.0 | garsas | patvirtinimas |

### KADRAS 11: Įklijuojate ikonėlės klasę (16 sek.) — epizodas
**Failas:** `07-ikonos-klase.png`
**Ekrane:** TVS skirtukas „Parinktys“; į lauką „Class“ įklijuojamas kodas, iš jo ištrinamos HTML dalys ir lieka tik klasė. Spaudžiama „Atnaujinti“, ekranas persijungia į svetainės juodąjį meniu, kuriame atsiranda ikonėlė.
**Ekrano užrašai (tiksliai):** „Class“, „fal fa-list-ol“, „Atnaujinti“
**TVS UI komponentai:** tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** nuoroda: Pamokų laikas
**Tarimo kandidatai:** Class, fal fa-list-ol, HTML (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/07-ikonos-klase--sc09_039.8.jpg`, `nuorodos/07-ikonos-klase--sc10_044.8.jpg`
**Komentaras:** epizodas `ep_705_07_3` · dalis `dal_705_07` „Nuoroda (linkas), turinti ikonėlę“ · prioritetas 1 · pagrindas: dal_705_07 paaiškinimas; scenos 834: 9–11; eskizas 2026-10-31 (eskizai-lt.md)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Lauke „Class“ įklijuojate nukopijuotą kodą. |
| 2.6 | garsas | rasymas |
| 5.0 | balsas | Paliekate tik klasę – HTML dalis ištrinate. |
| 7.2 | garsas | rasymas |
| 9.1 | balsas | Spaudžiate „Atnaujinti“ ir ikonėlė atsiranda meniu. |
| 10.5 | garsas | spustelejimas |
| 12.3 | garsas | patvirtinimas |

### KADRAS 12: Atidarote keturių ikonų nuorodas (15 sek.) — epizodas
**Failas:** `08-keturios-ikonos.png`
**Ekrane:** TVS darbalaukis; paieškoje įrašoma „navi“ ir pasirenkama „Navigacijos“, grupių sąraše prie „4 ikonos“ spaudžiama „Linkai“ ir pasirodo keturios titulinio puslapio nuorodos: „Elektroninis dienynas“, „Tėvams“, „Mokiniams“, „Mokytojams“.
**Ekrano užrašai (tiksliai):** „navi“, „Navigacijos“, „4 ikonos“, „Linkai“, „Elektroninis dienynas“, „Tėvams“, „Mokiniams“, „Mokytojams“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** 4 ikonos (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/08-keturios-ikonos--sc03_006.3.jpg`, `nuorodos/08-keturios-ikonos--sc04_015.7.jpg`
**Komentaras:** epizodas `ep_705_08_1` · dalis `dal_705_08` „El. dienyno navigacija“ · prioritetas 3 · pagrindas: dal_705_08 paaiškinimas; scenos 833: 1–4; eskizas 2026-10-31 (eskizai-lt.md)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Paieškoje pasirenkate „Navigacijos“. |
| 1.8 | garsas | rasymas |
| 3.0 | garsas | spustelejimas |
| 4.6 | balsas | Prie grupės „4 ikonos“ spaudžiate „Linkai“. |
| 5.8 | garsas | spustelejimas |
| 8.7 | balsas | Matote keturias titulinio puslapio nuorodas. |

### KADRAS 13: Pakeičiate el. dienyno adresą (14 sek.) — epizodas
**Failas:** `08-dienyno-adresas.png`
**Ekrane:** Nuorodų sąrašas; spaudžiama „Elektroninis dienynas“, atsiveria forma. Lauke „URL“ senas adresas pažymimas ir pakeičiamas nauju, spaudžiama „Atnaujinti“.
**Ekrano užrašai (tiksliai):** „Elektroninis dienynas“, „Title“, „URL“, „Atnaujinti“
**TVS UI komponentai:** tvs-row, tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** adresas: https://dienynas.demo.lt/
**Tarimo kandidatai:** URL (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/08-dienyno-adresas--sc05_017.8.jpg`, `turinys/sena/scenos/833/klik08_026.0.jpg` (sugeneruoti: python3 scripts/sena-scenos.py)
**Komentaras:** epizodas `ep_705_08_2` · dalis `dal_705_08` „El. dienyno navigacija“ · prioritetas 1 · pagrindas: dal_705_08 paaiškinimas; scenos 833: 4–5

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Sąraše spaudžiate „Elektroninis dienynas“. |
| 2.4 | garsas | spustelejimas |
| 4.7 | balsas | Lauke „URL“ įrašote naują dienyno adresą. |
| 6.1 | garsas | rasymas |
| 8.8 | balsas | Spaudžiate „Atnaujinti“ – nuoroda išsaugota. |
| 9.8 | garsas | spustelejimas |
| 10.2 | garsas | patvirtinimas |
