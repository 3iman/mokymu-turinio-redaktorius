# Video scenarijus: Dokumentų banko tipo sintaksės — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2995211343 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 43 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_667` · senoji WP pamoka `dokumentu-banko-tipo-sintakses`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Vieną dokumentą įterpiate į puslapį | 14 sek. | 01-vienas-dokumentas-puslapyje | Lauke „Turinys“ po antrašte įklijuojate nukopijuotą sintaksę. Išsaugote. Puslapyje lieka viena ryški dokumento nuoroda. |
| 2 Tėvinės kategorijos numerį randate kategorijose | 14 sek. | 02-tevines-kategorijos-id | Tėvinė kategorija dokumentų neturi. Todėl jos sintaksės sąraše nerasite. Atidarote „Kategorijos“ ir pasižiūrite numerį prie pavadinimo. |
| 3 Visą kategoriją įterpiate lentele | 15 sek. | 02-kategorijos-lentele | Skliaustuose įrašote tos kategorijos numerį. Išsaugote puslapį. Svetainėje atsiranda visa dokumentų lentelė. Su datomis ir dydžiais. |

---

## Kadrai

### KADRAS 1: Vieną dokumentą įterpiate į puslapį (14 sek.) — epizodas
**Failas:** `01-vienas-dokumentas-puslapyje.png`
**Ekrane:** Padalytas kadras. Apačioje į „Turinys“ po antrašte įklijuojama dokumento sintaksė ir puslapis išsaugomas. Viršuje svetainėje lieka viena ryški dokumento nuoroda su atsisiuntimo ženkliuku.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{dokumentubankas_file(129)}}“, „Grįžti“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** dokumentas: Gimnazistų tarybos nuostatai, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-vienas-dokumentas-puslapyje--sc01_004.3.jpg`, `nuorodos/01-vienas-dokumentas-puslapyje--sc03_024.7.jpg`
**Komentaras:** epizodas `ep_667_01_2` · dalis `dal_667_01` „1 failo (nuorodos) įterpimas“ · prioritetas 2 · pagrindas: dal_667_01 paaiškinimas; scenos 789: 1, 3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Lauke „Turinys“ po antrašte įklijuojate nukopijuotą sintaksę. |
| 2.8 | garsas | rasymas |
| 6.4 | balsas | Išsaugote. |
| 7.2 | garsas | spustelejimas |
| 8.8 | balsas | Puslapyje lieka viena ryški dokumento nuoroda. |
| 10.0 | garsas | patvirtinimas |

### KADRAS 2: Tėvinės kategorijos numerį randate kategorijose (14 sek.) — epizodas
**Failas:** `02-tevines-kategorijos-id.png`
**Ekrane:** Dokumentų banko kairėje spaudžiamas punktas „Kategorijos“. Atsiveria medis; kursorius leidžiasi juo iki pirmo lygio kategorijos, ir šalia jos pavadinimo paryškėja numeris skliausteliuose.
**Ekrano užrašai (tiksliai):** „Kategorijos“, „(#13)“, „Biudžeto vykdymo ataskaitų rinkiniai“
**TVS UI komponentai:** tvs-row, tvs-cursor, tvs-ripple, naujas: kategorijų medis su įtrauka
**Demo duomenys:** kategorija: Planavimo dokumentai, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-tevines-kategorijos-id--sc09_019.7.jpg`
**Komentaras:** epizodas `ep_667_02_1` · dalis `dal_667_02` „Visos dokumentų kategorijos (lentelės) įterpimas“ · prioritetas 1 · pagrindas: dal_667_02 paaiškinimas; scenos 788: 7 (ID rodomas pavidalu „(#13)“); eskizas 2026-10-31: spustelėjimas „Kategorijos“ po balso užuominos; kategorija — kaip įraše 788

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Tėvinė kategorija dokumentų neturi. |
| 4.4 | balsas | Todėl jos sintaksės sąraše nerasite. |
| 7.4 | balsas | Atidarote „Kategorijos“ ir pasižiūrite numerį prie pavadinimo. |
| 8.6 | garsas | spustelejimas |

### KADRAS 3: Visą kategoriją įterpiate lentele (15 sek.) — epizodas
**Failas:** `02-kategorijos-lentele.png`
**Ekrane:** Padalytas kadras. Apačioje „Turinys“ — įrašoma kategorijos sintaksė, skaičius skliaustuose paryškėja. Viršuje puslapyje išsiskleidžia dokumentų lentelė su stulpeliais „Atnaujinta“ ir „Dydis“, sugrupuota pagal metus.
**Ekrano užrašai (tiksliai):** „Turinys“, „{{dokumentubankas_category(13)}}“, „Atnaujinta“, „Dydis“
**TVS UI komponentai:** tvs-input, tvs-cursor, tvs-btn, tvs-ripple
**Demo duomenys:** kategorija: Planavimo dokumentai, mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-kategorijos-lentele--sc13_032.0.jpg`, `nuorodos/02-kategorijos-lentele--sc01_000.3.jpg`
**Komentaras:** epizodas `ep_667_02_2` · dalis `dal_667_02` „Visos dokumentų kategorijos (lentelės) įterpimas“ · prioritetas 2 · pagrindas: dal_667_02 paaiškinimas; scenos 788: 13, 1

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Skliaustuose įrašote tos kategorijos numerį. |
| 2.8 | garsas | rasymas |
| 5.1 | balsas | Išsaugote puslapį. |
| 6.1 | garsas | spustelejimas |
| 7.7 | balsas | Svetainėje atsiranda visa dokumentų lentelė. |
| 11.4 | balsas | Su datomis ir dydžiais. |
| 12.2 | garsas | patvirtinimas |
