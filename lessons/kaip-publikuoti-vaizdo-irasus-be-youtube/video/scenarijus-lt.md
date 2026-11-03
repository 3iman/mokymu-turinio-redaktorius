# Video scenarijus: Kaip publikuoti vaizdo įrašus be Youtube? — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 4028925978 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 79 sek. (7 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_691` · senoji WP pamoka `kaip-publikuoti-vaizdo-irasus-be-youtube`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Tinka tik mp4 | 11 sek. | 01-tik-mp4 | Sistema atvaizduoja tik mp4 formato įrašus. Todėl įkeliate tik mp4. |
| 2 Pridedate failus į galeriją | 11 sek. | 02-pridedate-failus | Prie kiekvieno įrašo spaudžiate „Pridėti“. Langą uždarote. Failai matomi galerijos sąraše. |
| 3 Nukopijuojate kelią iki failo | 18 sek. | 02-kopijuojate-kelia | Prie įrašo spaudžiate „Peržiūrėti“. Jis atsidaro naujame lange. Adreso juostoje kopijuojate dalį nuo „/files/“. |
| 4 Kelią įklijuojate skirtuke „Video“ | 8 sek. | 03-kelias-i-video-lauka | Skirtuke „Video“ pridedate bloką. Į lauką įklijuojate nukopijuotą kelią. |
| 5 Nukopijuojate vaizdo įrašo sintaksę | 9 sek. | 03-kopijuojate-video-sintakse | Atidarote skirtuką „Sintaksė“. Prie vaizdo įrašo eilutės spaudžiate „Kopijuoti“. |
| 6 Grotuvai atsiranda tekste | 9 sek. | 04-grotuvai-svetaineje | Išsaugote įrašą. Svetainėje grotuvai atsiranda tose pačiose vietose. |
| 7 Mp4 pašalinate iš galerijos | 13 sek. | 05-salinate-mp4 | Prie kiekvieno mp4 spaudžiate „Šalinti“. Galerijoje lieka tik nuotraukos. Spaudžiate „Atnaujinti“. |

---

## Kadrai

### KADRAS 1: Tinka tik mp4 (11 sek.) — koncepcija
**Failas:** `01-tik-mp4.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, dont_title, dont_1
**Ekrane:** Šablonas taisyklingai_netaisyklingai: kairėje iškyla žalia kortelė su užrašu „mp4“, dešinėje — pilka kortelė „Kiti formatai“; žalioji užsidega varnele, pilkoji — kryžiuku.
**Ekrano užrašai (tiksliai):** „mp4“, „Kiti formatai“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** mp4 (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_691_01` · dalis `dal_691_01` „Vaizdo įrašas turi būti teisingo formato“ · prioritetas 3 · pagrindas: dal_691_01 paaiškinimas; viz_691_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Sistema atvaizduoja tik mp4 formato įrašus. |
| 5.5 | balsas | Todėl įkeliate tik mp4. |

### KADRAS 2: Pridedate failus į galeriją (11 sek.) — epizodas
**Failas:** `02-pridedate-failus.png`
**Ekrane:** Įkėlimo lange lentelė su įkeltais mp4; prie kiekvienos eilutės kursorius spaudžia žalią „Pridėti“ ir eilutės dingsta. Langas uždaromas kryžiuku, o galerijos sąrašo apačioje matomi abu įrašai.
**Ekrano užrašai (tiksliai):** „Vardas“, „MIME tipas“, „Pridėti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, tvs-ripple, naujas: įkėlimo lango lentelė
**Demo duomenys:** irasas: sventes-eisena.mp4
**Tarimo kandidatai:** mp4, MIME (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-pridedate-failus--sc05_014.1.jpg`, `nuorodos/02-pridedate-failus--sc07_020.4.jpg`
**Komentaras:** epizodas `ep_691_02_2` · dalis `dal_691_02` „mp4 įkeliame į sistemą“ · prioritetas 2 · pagrindas: dal_691_02 paaiškinimas; scenos 878: 3–4

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prie kiekvieno įrašo spaudžiate „Pridėti“. |
| 2.6 | garsas | spustelejimas |
| 3.6 | garsas | spustelejimas |
| 4.7 | balsas | Langą uždarote. |
| 5.5 | garsas | spustelejimas |
| 6.7 | balsas | Failai matomi galerijos sąraše. |
| 7.9 | garsas | patvirtinimas |

### KADRAS 3: Nukopijuojate kelią iki failo (18 sek.) — epizodas
**Failas:** `02-kopijuojate-kelia.png`
**Ekrane:** Galerijos sąrašas; kursorius spaudžia „Peržiūrėti“, atsiveria naujas naršyklės langas su grotuvu. Kamera priartėja prie adreso juostos ir pažymima kelio dalis, prasidedanti „/files/“.
**Ekrano užrašai (tiksliai):** „Peržiūrėti“, „/files/naujienos/“, „mp4“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, tvs-ripple, naujas: naršyklės adreso juosta su pažymėta kelio dalimi
**Demo duomenys:** kelias: /files/naujienos/sventes-eisena.mp4, mokykla: Demo mokykla
**Tarimo kandidatai:** files, mp4 (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-kopijuojate-kelia--sc09_024.6.jpg`, `nuorodos/02-kopijuojate-kelia--sc10_026.9.jpg`
**Komentaras:** epizodas `ep_691_02_3` · dalis `dal_691_02` „mp4 įkeliame į sistemą“ · prioritetas 1 · pagrindas: dal_691_02 paaiškinimas; scenos 878: 5–6

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Prie įrašo spaudžiate „Peržiūrėti“. |
| 2.6 | garsas | spustelejimas |
| 4.6 | balsas | Jis atsidaro naujame lange. |
| 7.6 | balsas | Adreso juostoje kopijuojate dalį nuo „/files/“. |
| 9.6 | garsas | patvirtinimas |

### KADRAS 4: Kelią įklijuojate skirtuke „Video“ (8 sek.) — epizodas
**Failas:** `03-kelias-i-video-lauka.png`
**Ekrane:** Įrašo redagavimas; kursorius spaudžia skirtuką „Video“, mygtuku „Add Row“ pridedamas blokas, į lauką „Video“ įklijuojamas kelias ir grotuvas iš karto parodo įrašą.
**Ekrano užrašai (tiksliai):** „Video“, „Add Row“, „Antraštė“
**TVS UI komponentai:** tvs-input, tvs-btn, tvs-cursor, tvs-ripple, naujas: formos skirtukai, naujas: video grotuvo blokas
**Demo duomenys:** kelias: /files/naujienos/sventes-eisena.mp4
**Tarimo kandidatai:** Add Row, Video (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-kelias-i-video-lauka--sc03_004.4.jpg`, `nuorodos/03-kelias-i-video-lauka--sc06_016.9.jpg`
**Komentaras:** epizodas `ep_691_03_1` · dalis `dal_691_03` „Paruošiame panaudojimui“ · prioritetas 1 · pagrindas: dal_691_03 paaiškinimas; scenos 880: 2–3; eskizas 2026-10-31: pridėtas „Add Row“ spustelėjimas (du veiksmai — skirtukas ir blokas)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Skirtuke „Video“ pridedate bloką. |
| 2.2 | garsas | spustelejimas |
| 3.2 | garsas | spustelejimas |
| 4.0 | balsas | Į lauką įklijuojate nukopijuotą kelią. |
| 5.2 | garsas | rasymas |
| 6.6 | garsas | patvirtinimas |

### KADRAS 5: Nukopijuojate vaizdo įrašo sintaksę (9 sek.) — epizodas
**Failas:** `03-kopijuojate-video-sintakse.png`
**Ekrane:** Skirtukas „Sintaksė“ su lentele „Kopijuoti“, „Sintaksė“, „Aprašymas“; vaizdas sustoja ties vaizdo įrašo eilute ir kursorius spaudžia „Kopijuoti“.
**Ekrano užrašai (tiksliai):** „Sintaksė“, „Kopijuoti“, „Aprašymas“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** —
**Tarimo kandidatai:** sintaksė (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-kopijuojate-video-sintakse--sc09_024.7.jpg`
**Komentaras:** epizodas `ep_691_03_2` · dalis `dal_691_03` „Paruošiame panaudojimui“ · prioritetas 2 · pagrindas: dal_691_03 paaiškinimas; scenos 880: 5

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Atidarote skirtuką „Sintaksė“. |
| 2.2 | garsas | spustelejimas |
| 4.0 | balsas | Prie vaizdo įrašo eilutės spaudžiate „Kopijuoti“. |
| 5.2 | garsas | spustelejimas |
| 6.4 | garsas | patvirtinimas |

### KADRAS 6: Grotuvai atsiranda tekste (9 sek.) — epizodas
**Failas:** `04-grotuvai-svetaineje.png`
**Ekrane:** Spaudžiamas išsaugojimo mygtukas, ekranas persijungia į svetainės įrašą, kuriame tarp pastraipų atsiranda vaizdo įrašų grotuvai.
**Ekrano užrašai (tiksliai):** „Atnaujinti“
**TVS UI komponentai:** tvs-btn, tvs-cursor, tvs-ripple, naujas: svetainės įrašas su grotuvu
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-grotuvai-svetaineje--sc04_016.5.jpg`
**Komentaras:** epizodas `ep_691_04_2` · dalis `dal_691_04` „Panaudojame vaizdo įrašo įterpimo sintaksę“ · prioritetas 2 · pagrindas: dal_691_04 paaiškinimas; scenos 881: 2–4

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Išsaugote įrašą. |
| 2.0 | garsas | spustelejimas |
| 3.4 | balsas | Svetainėje grotuvai atsiranda tose pačiose vietose. |
| 4.8 | garsas | patvirtinimas |

### KADRAS 7: Mp4 pašalinate iš galerijos (13 sek.) — epizodas
**Failas:** `05-salinate-mp4.png`
**Ekrane:** Galerijos sąrašas; kursorius spaudžia raudoną „Šalinti“ prie pirmo mp4, eilutė dingsta, tas pats pakartojama antrai. Tada spaudžiama „Atnaujinti“.
**Ekrano užrašai (tiksliai):** „Nuotraukų galerija“, „Šalinti“, „Atnaujinti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo mokykla, irasas: sventes-eisena.mp4
**Tarimo kandidatai:** mp4 (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-salinate-mp4--sc01_000.3.jpg`, `nuorodos/05-salinate-mp4--sc01_012.3.jpg`
**Komentaras:** epizodas `ep_691_05_1` · dalis `dal_691_05` „Ištriname iš nuotraukų galerijos mp4 failus“ · prioritetas 3 · pagrindas: dal_691_05 paaiškinimas; scenos 877: 1–2

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Prie kiekvieno mp4 spaudžiate „Šalinti“. |
| 2.6 | garsas | spustelejimas |
| 3.8 | garsas | spustelejimas |
| 5.5 | balsas | Galerijoje lieka tik nuotraukos. |
| 8.5 | balsas | Spaudžiate „Atnaujinti“. |
| 9.5 | garsas | spustelejimas |
| 10.7 | garsas | patvirtinimas |
