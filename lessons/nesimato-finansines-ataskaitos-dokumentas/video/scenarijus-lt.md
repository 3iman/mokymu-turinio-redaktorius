# Video scenarijus: Nesimato finansinės ataskaitos dokumentas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2312718738 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 40 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_690` · senoji WP pamoka `nesimato-finansines-ataskaitos-dokumentas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Matote, kokios kategorijos priskirtos | 15 sek. | 01-ne-tos-kategorijos | Sąraše stulpelyje „Kategorijos“ matote, kas dokumentui priskirta. Atidarote dokumentą. Viena kategorija nereikalinga, kita – ne tų metų. |
| 2 Svetainėje dokumentas kartojasi | 13 sek. | 03-du-kartus-lenteleje | Lentelės viršuje matote dokumentą be metų. Žemiau, prie metų, – tas pats dokumentas. Todėl tėvinė kategorija nereikalinga. |
| 3 Išimate tėvinę kategoriją | 12 sek. | 03-isimate-tevine | Prie tėvinės kategorijos spaudžiate kryžiuką. Išsaugojus dokumentas lieka tik prie metų. Lentelėje jis matomas vieną kartą. |

---

## Kadrai

### KADRAS 1: Matote, kokios kategorijos priskirtos (15 sek.) — epizodas
**Failas:** `01-ne-tos-kategorijos.png`
**Ekrane:** Dokumentų banko sąrašas; kamera priartėja prie eilutės ir stulpelio „Kategorijos“. Kursorius spaudžia dokumento pavadinimą, atsiveria forma, kurios lauke „Kategorijos“ šviečia dvi žymos — tėvinė ir ne tų metų.
**Ekrano užrašai (tiksliai):** „Kategorijos“, „Finansinės ataskaitos“, „Redaguoti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, tvs-ripple, naujas: kategorijų žymos lauke su kryžiuku
**Demo duomenys:** mokykla: Demo mokykla, dokumentas: 2023 m. finansinių ataskaitų rinkinys
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-ne-tos-kategorijos--sc02_007.8.jpg`, `nuorodos/01-ne-tos-kategorijos--sc03_016.0.jpg`
**Komentaras:** epizodas `ep_690_01_1` · dalis `dal_690_01` „Supraskite problemą“ · prioritetas 2 · pagrindas: dal_690_01 paaiškinimas; scenos 816: 2–3; eskizas 2026-10-31: veiksmų garsai sutvarkyti

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Sąraše stulpelyje „Kategorijos“ matote, kas dokumentui priskirta. |
| 6.7 | balsas | Atidarote dokumentą. |
| 7.7 | garsas | spustelejimas |
| 9.3 | balsas | Viena kategorija nereikalinga, kita – ne tų metų. |

### KADRAS 2: Svetainėje dokumentas kartojasi (13 sek.) — epizodas
**Failas:** `03-du-kartus-lenteleje.png`
**Ekrane:** Svetainės dokumentų lentelė; kamera paryškina viršutinę eilutę virš metų grupių ir tą pačią eilutę grupėje su metais — abi trumpam apibrėžiamos.
**Ekrano užrašai (tiksliai):** „Finansinės ataskaitos“, „Atnaujinta“, „Dydis“, „2023 m.“
**TVS UI komponentai:** tvs-cursor, naujas: svetainės dokumentų lentelė su metų grupėmis
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-du-kartus-lenteleje--sc05_025.2.jpg`
**Komentaras:** epizodas `ep_690_03_2` · dalis `dal_690_03` „Išbandykite praktiškai“ · prioritetas 2 · pagrindas: dal_690_03 paaiškinimas; scenos 815: 5

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Lentelės viršuje matote dokumentą be metų. |
| 5.0 | balsas | Žemiau, prie metų, – tas pats dokumentas. |
| 8.4 | balsas | Todėl tėvinė kategorija nereikalinga. |

### KADRAS 3: Išimate tėvinę kategoriją (12 sek.) — epizodas
**Failas:** `03-isimate-tevine.png`
**Ekrane:** Laukas „Kategorijos“ iš arti; kursorius spaudžia kryžiuką prie tėvinės žymos, lieka viena. Po „Atnaujinti“ ekranas persijungia į svetainės lentelę, kurioje dokumentas matomas tik prie savo metų.
**Ekrano užrašai (tiksliai):** „Kategorijos“, „Atnaujinti“, „2023 m.“
**TVS UI komponentai:** tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-isimate-tevine--sc06_042.0.jpg`, `nuorodos/03-isimate-tevine--sc12_072.1.jpg`
**Komentaras:** epizodas `ep_690_03_3` · dalis `dal_690_03` „Išbandykite praktiškai“ · prioritetas 1 · pagrindas: dal_690_03 paaiškinimas; scenos 815: 6–7, 12; eskizas 2026-10-31: veiksmų garsai sutvarkyti

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prie tėvinės kategorijos spaudžiate kryžiuką. |
| 2.4 | garsas | spustelejimas |
| 4.9 | balsas | Išsaugojus dokumentas lieka tik prie metų. |
| 5.4 | garsas | spustelejimas |
| 5.9 | garsas | patvirtinimas |
| 8.4 | balsas | Lentelėje jis matomas vieną kartą. |
