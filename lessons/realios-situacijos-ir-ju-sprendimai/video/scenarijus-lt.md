# Video scenarijus: Realios situacijos ir jų sprendimai — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2330288320 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 29 sek. (2 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_677` · senoji WP pamoka `realios-situacijos-ir-ju-sprendimai`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Išfiltruojate reikiamą kategoriją | 11 sek. | 01-kategorijos-filtravimas | Dokumentų banke pasirenkate kategoriją. Spaudžiate žalią mygtuką „Filtruoti“. Sąraše lieka tik jos dokumentai. |
| 2 Pridedate kategoriją ir priminimą | 18 sek. | 01-antra-kategorija-ir-priminimas | Kategorija jau pažymėta, nes ją išfiltravote. Pavadinime yra žodis planas, todėl pridedate „Planavimo dokumentai“. Nustatote priminimą ir išsaugote. Dokumentas atsiranda abiejuose rinkiniuose. |

---

## Kadrai

### KADRAS 1: Išfiltruojate reikiamą kategoriją (11 sek.) — epizodas
**Failas:** `01-kategorijos-filtravimas.png`
**Ekrane:** Dokumentų sąrašas: kursorius pasirenka kategoriją filtro lauke ir spaudžia žalią „Filtruoti“ – ilgas sąrašas susitraukia iki kelių tos kategorijos eilučių.
**Ekrano užrašai (tiksliai):** „Paieška“, „Kategorijos“, „Filtruoti“, „Valyti“
**TVS UI komponentai:** tvs-main, tvs-filter, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** kategorija: Vaiko gerovės komisija
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-kategorijos-filtravimas--sc45_458.0.jpg`
**Komentaras:** epizodas `ep_677_01_1` · dalis `dal_677_01` „Komisijos pirmininkė nurodė į sistemą įkelti „Vaiko gerovės komisijos veiklos planą““ · prioritetas 2 · pagrindas: dal_677_01 paaiškinimas (2 žingsnis); scenos yt-kguHnB8i9ps: skyrius 08

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Dokumentų banke pasirenkate kategoriją. |
| 2.2 | garsas | spustelejimas |
| 4.3 | balsas | Spaudžiate žalią mygtuką „Filtruoti“. |
| 7.4 | balsas | Sąraše lieka tik jos dokumentai. |

### KADRAS 2: Pridedate kategoriją ir priminimą (18 sek.) — epizodas
**Failas:** `01-antra-kategorija-ir-priminimas.png`
**Ekrane:** Dokumento įrašas: lauke „Kategorijos“ jau yra viena žyma, šalia įrašoma antra. Žemiau pasirenkama „Patikrinimo data“, įrašomas komentaras ir spaudžiama „Išsaugoti ir išeiti“; svetainėje dokumentas atsiranda dviejuose rinkiniuose.
**Ekrano užrašai (tiksliai):** „Kategorijos“, „Planavimo dokumentai“, „Patikrinimo data“, „Išsaugoti ir išeiti“
**TVS UI komponentai:** tvs-main, tvs-input, tvs-btn, tvs-cursor
**Demo duomenys:** kategorija_1: Vaiko gerovės komisija, kategorija_2: Planavimo dokumentai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-antra-kategorija-ir-priminimas--sc33_346.5.jpg`, `nuorodos/01-antra-kategorija-ir-priminimas--sc19_215.8.jpg`
**Komentaras:** epizodas `ep_677_01_3` · dalis `dal_677_01` „Komisijos pirmininkė nurodė į sistemą įkelti „Vaiko gerovės komisijos veiklos planą““ · prioritetas 2 · pagrindas: dal_677_01 paaiškinimas (6–8 žingsniai); scenos yt-eQ4FA_GexN8: skyrius 13

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kategorija jau pažymėta, nes ją išfiltravote. |
| 4.9 | balsas | Pavadinime yra žodis planas, todėl pridedate „Planavimo dokumentai“. |
| 6.3 | garsas | rasymas |
| 10.5 | balsas | Nustatote priminimą ir išsaugote. |
| 11.7 | garsas | patvirtinimas |
| 13.3 | balsas | Dokumentas atsiranda abiejuose rinkiniuose. |
