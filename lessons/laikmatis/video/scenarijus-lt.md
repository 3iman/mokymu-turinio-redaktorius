# Video scenarijus: Laikmatis — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2199803416 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 44 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_703` · senoji WP pamoka `laikmatis`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Kur rodomas laikmatis | 12 sek. | 01-kur-laikmatis | Laikmatį rasite dešinėje svetainės pusėje. Iš karto po juodąja navigacija. Virš laikroduko – jūsų įrašyta antraštė. |
| 2 Progų – daugiau nei viena | 12 sek. | 02-kelios-progos | Sąraše numatote kelias progas iš karto. Vienai pasibaigus laikmatis sustoja. Ir pats pradeda skaičiuoti iki kitos. |
| 3 Laikmačio formos laukai | 20 sek. | 03-laikmacio-laukai | „Antraštė“ – tekstas virš laikroduko. „Pabaigos data“ – įvykis, iki kurio skaičiuojate. „Rodyti nuo“ ir „Rodyti iki“ valdo, kada laikmatis matomas. „Tekstas pasibaigus“ – ką parodyti sulaukus įvykio. |

---

## Kadrai

### KADRAS 1: Kur rodomas laikmatis (12 sek.) — epizodas
**Failas:** `01-kur-laikmatis.png`
**Ekrane:** Svetainės puslapis; kamera slenka dešine puse ir sustoja po juoduoju meniu, kur šviečia laikrodukas su užrašu virš jo.
**Ekrano užrašai (tiksliai):** „Iki naujų mokslo metų liko:“
**TVS UI komponentai:** tvs-cursor, naujas: svetainės šoninė juosta su laikrodžio papildiniu
**Demo duomenys:** antraste: Iki naujų mokslo metų liko:
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-kur-laikmatis--865-laikmatis_01.jpg`
**Komentaras:** epizodas `ep_703_01_1` · dalis `dal_703_01` „Pavyzdys“ · prioritetas 2 · pagrindas: dal_703_01 paaiškinimas; nuotrauka 865 (laikmatis šoninėje juostoje)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Laikmatį rasite dešinėje svetainės pusėje. |
| 4.7 | balsas | Iš karto po juodąja navigacija. |
| 7.3 | balsas | Virš laikroduko – jūsų įrašyta antraštė. |

### KADRAS 2: Progų – daugiau nei viena (12 sek.) — koncepcija
**Failas:** `02-kelios-progos.png`
**Šablonas:** `srautas` · laukai: title, step1_label, step1_desc, arrow_label_1, step2_label, step2_desc, arrow_label_2, step3_label, step3_desc, summary
**Ekrane:** Šablonas `srautas`: trys kortelės su rodyklėmis. Pirmoje – laikmačių sąrašas su keliomis iš eilės suplanuotomis progomis; antroje laikrodukas pasiekia nulį; trečioje laikrodukas pats pradeda skaičiuoti iki kitos progos. Rodyklė tarp antros ir trečios kortelės pasirodo su užrašu „automatiškai“.
**Ekrano užrašai (tiksliai):** „automatiškai“
**TVS UI komponentai:** —
**Demo duomenys:** progos: Rugsėjo 1-oji, rudens atostogos
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-kelios-progos--866-laikmatis_02.jpg`
**Komentaras:** epizodas `viz_703_02` · dalis `dal_703_02` „Progų – daugiau nei viena“ · prioritetas 2 · pagrindas: dal_703_02 paaiškinimas; viz_703_02 laukai; nuotrauka 866

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Sąraše numatote kelias progas iš karto. |
| 4.5 | balsas | Vienai pasibaigus laikmatis sustoja. |
| 7.5 | balsas | Ir pats pradeda skaičiuoti iki kitos. |

### KADRAS 3: Laikmačio formos laukai (20 sek.) — epizodas
**Failas:** `03-laikmacio-laukai.png`
**Ekrane:** Laikmačio įrašo forma; kamera leidžiasi per laukus, kiekvieno pavadinimas sumirksi. Prie „Pabaigos data“ išnyra laikrodukas, prie „Rodyti nuo“ ir „Rodyti iki“ – svetainės miniatiūra, kurioje laikmatis atsiranda ir dingsta.
**Ekrano užrašai (tiksliai):** „Antraštė“, „Pabaigos data“, „Rodyti nuo“, „Rodyti iki“, „Tekstas pasibaigus“
**TVS UI komponentai:** tvs-input, tvs-cursor, naujas: datos ir laiko laukas
**Demo duomenys:** antraste: Iki naujų mokslo metų liko:
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-laikmacio-laukai--867-laikmatis_03.png`
**Komentaras:** epizodas `ep_703_03_1` · dalis `dal_703_03` „Laikmačio anatomija“ · prioritetas 1 · pagrindas: dal_703_03 paaiškinimas; nuotrauka 867 (laikmačio forma TVS)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | „Antraštė“ – tekstas virš laikroduko. |
| 4.5 | balsas | „Pabaigos data“ – įvykis, iki kurio skaičiuojate. |
| 8.6 | balsas | „Rodyti nuo“ ir „Rodyti iki“ valdo, kada laikmatis matomas. |
| 13.8 | balsas | „Tekstas pasibaigus“ – ką parodyti sulaukus įvykio. |
