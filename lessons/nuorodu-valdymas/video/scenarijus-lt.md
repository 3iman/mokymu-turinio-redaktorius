# Video scenarijus: Nuorodų valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1249631096 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 43 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_709` · senoji WP pamoka `nuorodu-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Nuorodos išdėstomos po tris | 12 sek. | 02-nuorodos-svetaineje | Nuorodas svetainėje matote lentelėje. Vienoje eilutėje telpa trys logotipai. Vietoje logotipo galite naudoti ikonėlę. |
| 2 Užpildote nuorodos įrašo kortelę | 22 sek. | 05-nuorodos-irasas | Įkeliate logotipą be fono. Nurodote kategoriją – kitaip nuoroda niekur nesimatys. Laukelyje „Target“ įrašote „_blank“. Nuoroda atsidarys naujame lange. |
| 3 Nukopijuojate nuorodų rinkinio sintaksę | 9 sek. | 06-nuorodu-sintakse | Atidarote skyrių „Kategorijos“. Violetinis mygtukas nukopijuoja įterpimo sintaksę. |

---

## Kadrai

### KADRAS 1: Nuorodos išdėstomos po tris (12 sek.) — epizodas
**Failas:** `02-nuorodos-svetaineje.png`
**Ekrane:** Svetainės puslapis su nuorodų lentele; kamera lėtai leidžiasi žemyn. Viena eilutė paryškinama – joje telpa trys logotipai; apatinėje eilutėje vietoje logotipo atsiranda ikonėlė.
**Ekrano užrašai (tiksliai):** „Naudingos nuorodos“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo gimnazija
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-nuorodos-svetaineje--870-naudingos_nuorodos_01.jpg`
**Komentaras:** epizodas `ep_709_02_1` · dalis `dal_709_02` „Nuorodų atvaizdavimas“ · prioritetas 2 · pagrindas: dal_709_02 paaiškinimas; nuotrauka 870

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Nuorodas svetainėje matote lentelėje. |
| 4.5 | balsas | Vienoje eilutėje telpa trys logotipai. |
| 7.7 | balsas | Vietoje logotipo galite naudoti ikonėlę. |

### KADRAS 2: Užpildote nuorodos įrašo kortelę (22 sek.) — epizodas
**Failas:** `05-nuorodos-irasas.png`
**Ekrane:** Nuorodos įrašo kortelė; į viršutinį lauką įkeliamas logotipas be fono. Kamera leidžiasi prie lauko „Kategorija“, kuriame pasirenkamas rinkinys, ir prie lauko „Target“ su reikšme „_blank“; pabaigoje forma išsaugoma ir nuoroda atsiveria naujame lange.
**Ekrano užrašai (tiksliai):** „Logotipas“, „Kategorija“, „Naudingos nuorodos“, „Target“, „_blank“
**TVS UI komponentai:** tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** rinkinys: Naudingos nuorodos, nuoroda: Demo partneris
**Tarimo kandidatai:** Target, _blank, PNG, SVG (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-nuorodos-irasas--873-naudingos_nuorodos_04.png`, `nuorodos/05-nuorodos-irasas--sc03_007.8.jpg`
**Komentaras:** epizodas `ep_709_05_1` · dalis `dal_709_05` „Nuorodos įrašas“ · prioritetas 2 · pagrindas: dal_709_05 paaiškinimas; dal_709_05 įspėjimas; scenos 875: 3; eskizas 2026-10-31: veiksmų garsai (įkėlimas, kategorija, „Išsaugoti“, kopijavimas)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Įkeliate logotipą be fono. |
| 2.6 | garsas | spustelejimas |
| 4.6 | balsas | Nurodote kategoriją – kitaip nuoroda niekur nesimatys. |
| 5.8 | garsas | spustelejimas |
| 6.4 | garsas | spustelejimas |
| 9.1 | balsas | Laukelyje „Target“ įrašote „_blank“. |
| 10.7 | garsas | rasymas |
| 15.1 | balsas | Nuoroda atsidarys naujame lange. |
| 15.7 | garsas | spustelejimas |
| 16.2 | garsas | patvirtinimas |

### KADRAS 3: Nukopijuojate nuorodų rinkinio sintaksę (9 sek.) — epizodas
**Failas:** `06-nuorodu-sintakse.png`
**Ekrane:** Nuorodų modulio šoninėje juostoje spaudžiamas punktas „Kategorijos“; atsiveria kategorijų sąrašas, kurio eilutės gale šviečia violetinis mygtukas su kopijavimo ikonėle. Jį paspaudus sintaksė trumpam nušvinta kaip nukopijuota.
**Ekrano užrašai (tiksliai):** „Nuorodų modulis“, „Kategorijos“, „Kopijuoti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** rinkinys: Naudingos nuorodos
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-nuorodu-sintakse--874-naudingos_nuorodos_05.png`, `nuorodos/06-nuorodu-sintakse--sc03_007.8.jpg`
**Komentaras:** epizodas `ep_709_06_1` · dalis `dal_709_06` „Kategorijų sąrašas“ · prioritetas 2 · pagrindas: dal_709_06 paaiškinimas; scenos 875: 3; eskizas 2026-10-31: veiksmų garsai (įkėlimas, kategorija, „Išsaugoti“, kopijavimas)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Atidarote skyrių „Kategorijos“. |
| 2.2 | garsas | spustelejimas |
| 3.8 | balsas | Violetinis mygtukas nukopijuoja įterpimo sintaksę. |
| 4.6 | garsas | spustelejimas |
| 5.0 | garsas | patvirtinimas |
