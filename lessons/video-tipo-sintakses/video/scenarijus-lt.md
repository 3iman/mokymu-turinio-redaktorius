# Video scenarijus: Video tipo sintaksės — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 3233796503 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 49 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_662` · senoji WP pamoka `video-tipo-sintakses`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Vieną vaizdo įrašą per visą plotį | 18 sek. | 01-vienas-video | Puslapio skirtuke „Video“ jau pridėtas įrašas. Lauke „Turinys“ nurodote ribą vienetui. Svetainėje matomas vienas grotuvas per visą plotį. Jį paleidžiate neišeidami iš puslapio. |
| 2 Vaizdo įrašus pridedate skirtuke „Video“ | 17 sek. | 02-video-galerijos-formavimas | Puslapio redagavime pereinate į skirtuką „Video“. Sąrašo apačioje spaudžiate „Add Row“. Naujos eilutės lauke įklijuojate nuorodą. Peržiūra pasirodo iš karto. |
| 3 Visus įrašus parodote viena sintakse | 14 sek. | 03-video-galerija | Lauke „Turinys“ įrašote sintaksę be nurodymų. Svetainėje matomi visi prie puslapio prisegti įrašai. Nuo dviejų jie rikiuojasi po du. |

---

## Kadrai

### KADRAS 1: Vieną vaizdo įrašą per visą plotį (18 sek.) — epizodas
**Failas:** `01-vienas-video.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — įrašoma vaizdo įrašų sintaksė su riba vienetui. Viršuje puslapyje atsiranda vienas grotuvas per visą turinio plotį ir jis paleidžiamas.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{videos({'limit': '1'})}}“, „Galima įkelti video“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** puslapis: Renginiai, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-vienas-video--sc01_000.3.jpg`, `nuorodos/01-vienas-video--sc03_014.2.jpg`
**Komentaras:** epizodas `ep_662_01_1` · dalis `dal_662_01` „Vieno video per visą plotį įterpimas“ · prioritetas 2 · pagrindas: dal_662_01 pavadinimas (teksto šaltinyje nėra — kl_662_1); scenos 805: 1, 3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Puslapio skirtuke „Video“ jau pridėtas įrašas. |
| 5.4 | balsas | Lauke „Turinys“ nurodote ribą vienetui. |
| 6.8 | garsas | rasymas |
| 9.0 | balsas | Svetainėje matomas vienas grotuvas per visą plotį. |
| 13.1 | balsas | Jį paleidžiate neišeidami iš puslapio. |
| 14.3 | garsas | patvirtinimas |

### KADRAS 2: Vaizdo įrašus pridedate skirtuke „Video“ (17 sek.) — epizodas
**Failas:** `02-video-galerijos-formavimas.png`
**Ekrane:** Puslapio redagavimas. Kursorius spaudžia kairės juostos punktą „Video“; atsiveria eilučių sąrašas. Sąrašo apačioje spaudžiamas „Add Row“, naujoje eilutėje į lauką su užrašu „http://“ įklijuojama nuoroda, ir šalia iš karto atsiranda įrašo peržiūra.
**Ekrano užrašai (tiksliai):** „Video“, „Add Row“, „Select All“, „http://“, „Antraštė“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** irasas: Rudens koncertas, mokykla: Demo mokykla
**Tarimo kandidatai:** Add Row (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-video-galerijos-formavimas--sc02_002.8.jpg`, `nuorodos/02-video-galerijos-formavimas--sc17_027.9.jpg`
**Komentaras:** epizodas `ep_662_02_1` · dalis `dal_662_02` „Video galerijos formavimas“ · prioritetas 1 · pagrindas: dal_662_02 pavadinimas (teksto šaltinyje nėra — kl_662_1); scenos 804: 2, 17

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Puslapio redagavime pereinate į skirtuką „Video“. |
| 2.6 | garsas | spustelejimas |
| 5.5 | balsas | Sąrašo apačioje spaudžiate „Add Row“. |
| 6.5 | garsas | spustelejimas |
| 8.8 | balsas | Naujos eilutės lauke įklijuojate nuorodą. |
| 10.2 | garsas | rasymas |
| 12.2 | balsas | Peržiūra pasirodo iš karto. |
| 13.0 | garsas | patvirtinimas |

### KADRAS 3: Visus įrašus parodote viena sintakse (14 sek.) — epizodas
**Failas:** `03-video-galerija.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — įrašoma vaizdo įrašų sintaksė be nurodymų. Viršuje puslapyje įrašai sugula po du vienas šalia kito; pirmas lieka platus, kol jų tėra vienas.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{videos()}}“, „Videos“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn
**Demo duomenys:** puslapis: Renginiai, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-video-galerija--sc04_004.8.jpg`, `nuorodos/03-video-galerija--sc06_007.0.jpg`
**Komentaras:** epizodas `ep_662_03_1` · dalis `dal_662_03` „Vaizdo įrašų galerijos atvaizdavimas“ · prioritetas 2 · pagrindas: dal_662_03 paaiškinimas; scenos 807: 3, 6

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Lauke „Turinys“ įrašote sintaksę be nurodymų. |
| 2.8 | garsas | rasymas |
| 5.3 | balsas | Svetainėje matomi visi prie puslapio prisegti įrašai. |
| 9.7 | balsas | Nuo dviejų jie rikiuojasi po du. |
| 10.9 | garsas | patvirtinimas |
