# Video scenarijus: Nuorodų tipo sintaksės — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2130975432 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 46 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_664` · senoji WP pamoka `nuorodu-tipo-sintakses`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Nuorodas su logotipais įterpiate puslapyje | 14 sek. | 01-naudingos-nuorodos-puslapyje | Lauke „Turinys“ įklijuojate kategorijos sintaksę. Išsaugote puslapį. Svetainėje nuorodos atsiranda su logotipais. Reikia bent trijų. |
| 2 Nuorodą kuriate pagal puslapio ID | 16 sek. | 02-nuoroda-pagal-id | Skliaustuose įrašote puslapio numerį. Nuorodos teksto rašyti nereikia. Jis paimamas iš puslapio pavadinimo. Nuoroda atsidaro tame pačiame lange. |
| 3 Nuorodą kuriate pagal puslapio SLUG | 16 sek. | 03-nuoroda-pagal-sluga | Kabutėse įklijuojate puslapio adreso dalį. Ją nukopijuojate iš naršyklės juostos. Domeno į kabutes neimate. Nuoroda atsidaro tame pačiame lange. |

---

## Kadrai

### KADRAS 1: Nuorodas su logotipais įterpiate puslapyje (14 sek.) — epizodas
**Failas:** `01-naudingos-nuorodos-puslapyje.png`
**Ekrane:** Padalytas kadras. Apačioje į „Turinys“ įklijuojama kategorijos sintaksė ir puslapis išsaugomas. Viršuje svetainėje išsidėsto nuorodų plytelės su logotipais po tris į eilutę.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{nuorodos(1)}}“, „Nuorodos“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** kategorija: Naudingos nuorodos, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-naudingos-nuorodos-puslapyje--sc07_023.9.jpg`, `nuorodos/01-naudingos-nuorodos-puslapyje--sc02_001.9.jpg`
**Komentaras:** epizodas `ep_664_01_2` · dalis `dal_664_01` „Naudingų nuorodų įterpimas“ · prioritetas 2 · pagrindas: dal_664_01 paaiškinimas; scenos 802: 7, 1

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Lauke „Turinys“ įklijuojate kategorijos sintaksę. |
| 2.8 | garsas | rasymas |
| 5.5 | balsas | Išsaugote puslapį. |
| 6.5 | garsas | spustelejimas |
| 7.5 | balsas | Svetainėje nuorodos atsiranda su logotipais. |
| 11.2 | balsas | Reikia bent trijų. |
| 12.0 | garsas | patvirtinimas |

### KADRAS 2: Nuorodą kuriate pagal puslapio ID (16 sek.) — epizodas
**Failas:** `02-nuoroda-pagal-id.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — įrašoma puslapio nuorodos sintaksė, skaičius skliaustuose paryškėja. Viršuje tekste atsiranda nuoroda puslapio pavadinimu; ją paspaudus puslapis atsiveria tame pačiame lange.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{page_url(181)}}“, „Būrelių tvarkaraštis“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn
**Demo duomenys:** puslapis: Būreliai, mokykla: Demo mokykla
**Tarimo kandidatai:** ID (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-nuoroda-pagal-id--sc01_000.3.jpg`, `nuorodos/02-nuoroda-pagal-id--sc02_009.2.jpg`
**Komentaras:** epizodas `ep_664_02_1` · dalis `dal_664_02` „Puslapio nuoroda pagal jo ID“ · prioritetas 2 · pagrindas: dal_664_02 paaiškinimas; scenos 801: 1, 2; eskizas 2026-10-31: nuorodos tekstas — tikslinio puslapio pavadinimas; nuorodos spustelėjimas prieš patvirtinimą

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Skliaustuose įrašote puslapio numerį. |
| 2.8 | garsas | rasymas |
| 5.0 | balsas | Nuorodos teksto rašyti nereikia. |
| 8.4 | balsas | Jis paimamas iš puslapio pavadinimo. |
| 11.4 | balsas | Nuoroda atsidaro tame pačiame lange. |
| 12.0 | garsas | spustelejimas |
| 12.6 | garsas | patvirtinimas |

### KADRAS 3: Nuorodą kuriate pagal puslapio SLUG (16 sek.) — epizodas
**Failas:** `03-nuoroda-pagal-sluga.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — į viengubas kabutes įklijuojama puslapio adreso dalis; virš jos trumpam parodoma naršyklės juosta, kurioje domenas lieka pilkas, o likusi adreso dalis paryškėja. Viršuje atsiranda nuoroda puslapio pavadinimu.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{page_url('tvarkarasciai/bureliu-tvarkarastis')}}“, „Būrelių tvarkaraštis“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn
**Demo duomenys:** slug: tvarkarasciai/bureliu-tvarkarastis, puslapis: Būrelių tvarkaraštis
**Tarimo kandidatai:** SLUG (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-nuoroda-pagal-sluga--sc01_000.3.jpg`, `nuorodos/03-nuoroda-pagal-sluga--sc02_012.2.jpg`
**Komentaras:** epizodas `ep_664_03_1` · dalis `dal_664_03` „Puslapio nuoroda pagal jo SLUG“ · prioritetas 2 · pagrindas: dal_664_03 paaiškinimas; scenos 803: 1, 2; formuluotė „dalis iki pagrindinio domeno“ patikslinta pagal įrašą — kl_664_1; įrašas 803 sc02: kabutėse — visas kelias be domeno (tvarkarasciai/…), ne vienas žodis; eskizas 2026-10-31: nuorodos tekstas — tikslinio puslapio pavadinimas; nuorodos spustelėjimas prieš patvirtinimą

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Kabutėse įklijuojate puslapio adreso dalį. |
| 2.8 | garsas | rasymas |
| 5.0 | balsas | Ją nukopijuojate iš naršyklės juostos. |
| 8.6 | balsas | Domeno į kabutes neimate. |
| 11.4 | balsas | Nuoroda atsidaro tame pačiame lange. |
| 12.0 | garsas | spustelejimas |
| 12.6 | garsas | patvirtinimas |
