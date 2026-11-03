# Video scenarijus: Kas yra dokumentų bankas? — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2777459066 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 30 sek. (2 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_681` · senoji WP pamoka `kas-yra-dokumentu-bankas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Ką vadiname dokumentu | 14 sek. | 01-kas-yra-dokumentas | Svetainėje dokumentas – tai failas arba aplankas. Tai, ką norite atsisiųsti ar persiųsti. Taip pat atsispausdinti arba pasirašyti. |
| 2 Kas nėra dokumentas | 16 sek. | 02-kas-nera-dokumentas | Informacinio pobūdžio tekstai ir pranešimai nėra dokumentai. Juos publikuojate kaip straipsnį arba vidinį puslapį. Nuveda navigacija, žyma arba baneris. |

---

## Kadrai

### KADRAS 1: Ką vadiname dokumentu (14 sek.) — koncepcija
**Failas:** `01-kas-yra-dokumentas.png`
**Šablonas:** `naujas` · laukai: title, term, alt_terms, item_1, item_2, item_3, item_4
**Ekrane:** Šablonas „naujas“ (apibrėžimas): centre atsiranda žodis „Dokumentas“, po juo mažesniu šriftu „Dar vadinamas failu, aplanku“. Aplink ratu po vieną sugula keturios ikonos su etiketėmis: atsisiųsti, persiųsti, atsispausdinti, pasirašyti. Pabaigoje visos keturios sumirksi kartu.
**Ekrano užrašai (tiksliai):** „Dokumentas“, „Atsisiųsti“, „Persiųsti“, „Atsispausdinti“, „Pasirašyti“
**TVS UI komponentai:** —
**Demo duomenys:** failas: gimnazijos-nuostatai.pdf
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_681_01` · dalis `dal_681_01` „Ką vadiname dokumentu?“ · prioritetas 2 · pagrindas: dal_681_01 paaiškinimas; viz_681_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Svetainėje dokumentas – tai failas arba aplankas. |
| 5.5 | balsas | Tai, ką norite atsisiųsti ar persiųsti. |
| 8.8 | balsas | Taip pat atsispausdinti arba pasirašyti. |

### KADRAS 2: Kas nėra dokumentas (16 sek.) — koncepcija
**Failas:** `02-kas-nera-dokumentas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas „palyginimas“: kairėje rausva kortelė „Į dokumentų banką nereikia“ su dviem eilutėmis, dešinėje žalia kortelė „Publikuokite kaip“ su straipsnio ir vidinio puslapio ikonomis. PDF ikona nuslysta iš kairės kortelės į dešinę ir virsta puslapiu; apačioje išnyra juosta su navigacijos, žymos ir banerio ženklais.
**Ekrano užrašai (tiksliai):** „Į dokumentų banką nereikia“, „Informacinio pobūdžio tekstai“, „Pranešimai“, „Publikuojate kaip“, „Straipsnį“, „Vidinį puslapį“
**TVS UI komponentai:** —
**Demo duomenys:** pranesimas: Pranešimas dėl mokinių atostogų
**Tarimo kandidatai:** PDF (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_681_02` · dalis `dal_681_02` „Kas nėra dokumentas?“ · prioritetas 2 · pagrindas: dal_681_02 paaiškinimas; viz_681_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Informacinio pobūdžio tekstai ir pranešimai nėra dokumentai. |
| 6.1 | balsas | Juos publikuojate kaip straipsnį arba vidinį puslapį. |
| 10.5 | balsas | Nuveda navigacija, žyma arba baneris. |
