# Video scenarijus: Banerių valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 808784470 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 37 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_707` · senoji WP pamoka `baneriu-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Banerio reikalavimai | 13 sek. | 01-banerio-reikalavimai | Visi baneriai – vienodo dydžio. Spalvotas logotipas baltame fone arba baltas spalvotame. Aplink logotipą paliekate laisvos vietos. |
| 2 Randate banerių papildinį | 12 sek. | 03-baneriu-papildinys | Paieškoje pasirenkate „Papildiniai“. Zonų sąraše pereinate į papildinius. Prie papildinio „Banner“ spaudžiate „Redaguoti“. |
| 3 Išjungiate atsitiktinę tvarką | 12 sek. | 03-atsitiktine-tvarka-off | Lauke „Order“ vietoje „Random“ pasirenkate „Manual“. Spaudžiate „Atnaujinti“. Baneriai nebekeičia eiliškumo. |

---

## Kadrai

### KADRAS 1: Banerio reikalavimai (13 sek.) — koncepcija
**Failas:** `01-banerio-reikalavimai.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, do_4, dont_title
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: dešinėje žalioje kortelėje keturi vienodo 525 × 300 dydžio baneriai — spalvoti baltame ir balti spalvotame fone, aplink logotipą matoma laisva erdvė; kairėje raudonoje – skirtingų dydžių ir prie pat krašto prigludę variantai. Matmenų užrašas atsiranda prie pirmo banerio.
**Ekrano užrašai (tiksliai):** „525 x 300“, „Tinka“, „Netinka“
**TVS UI komponentai:** —
**Demo duomenys:** partneris: Demo partneris
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-banerio-reikalavimai--sc01_000.3.jpg`
**Komentaras:** epizodas `viz_707_01` · dalis `dal_707_01` „Reikalavimai“ · prioritetas 2 · pagrindas: dal_707_01 paaiškinimas; viz_707_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Visi baneriai – vienodo dydžio. |
| 4.0 | balsas | Spalvotas logotipas baltame fone arba baltas spalvotame. |
| 8.6 | balsas | Aplink logotipą paliekate laisvos vietos. |

### KADRAS 2: Randate banerių papildinį (12 sek.) — epizodas
**Failas:** `03-baneriu-papildinys.png`
**Ekrane:** Viršutinėje paieškoje renkamas žodis, iškrentančiame sąraše pasirenkama „Papildiniai“; atsiveria zonų sąrašas, iš jo pereinama į papildinių sąrašą, prie „Banner“ spaudžiama „Redaguoti“.
**Ekrano užrašai (tiksliai):** „Papildiniai“, „Zonos“, „Banner“, „Redaguoti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple, tvs-filter
**Demo duomenys:** —
**Tarimo kandidatai:** Banner (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-baneriu-papildinys--klik02_003.1.jpg`, `nuorodos/03-baneriu-papildinys--sc02_004.7.jpg`, `nuorodos/03-baneriu-papildinys--sc03_007.2.jpg`
**Komentaras:** epizodas `ep_707_03_1` · dalis `dal_707_03` „Kaip išjungti atsitiktinę banerių vaizdavimo tvarką?“ · prioritetas 2 · pagrindas: dal_707_03 paaiškinimas; scenos 859: 1–3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Paieškoje pasirenkate „Papildiniai“. |
| 2.4 | garsas | spustelejimas |
| 4.4 | balsas | Zonų sąraše pereinate į papildinius. |
| 5.6 | garsas | spustelejimas |
| 7.4 | balsas | Prie papildinio „Banner“ spaudžiate „Redaguoti“. |
| 8.4 | garsas | spustelejimas |

### KADRAS 3: Išjungiate atsitiktinę tvarką (12 sek.) — epizodas
**Failas:** `03-atsitiktine-tvarka-off.png`
**Ekrane:** Papildinio forma; kamera priartėja prie lauko „Order“, kuriame įrašyta „Random“. Reikšmė pakeičiama į „Manual“ ir spaudžiamas žalias „Atnaujinti“.
**Ekrano užrašai (tiksliai):** „Banerių grupė“, „Sidebar“, „Order“, „Random“, „Manual“, „Atnaujinti“
**TVS UI komponentai:** tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** —
**Tarimo kandidatai:** Order, Random, Manual, Sidebar (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-atsitiktine-tvarka-off--klik03_011.1.jpg`, `nuorodos/03-atsitiktine-tvarka-off--sc04_019.0.jpg`
**Komentaras:** epizodas `ep_707_03_2` · dalis `dal_707_03` „Kaip išjungti atsitiktinę banerių vaizdavimo tvarką?“ · prioritetas 1 · pagrindas: dal_707_03 esmė; scenos 859: 4; eskizas 2026-10-31: trūkstami veiksmų garsai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lauke „Order“ vietoje „Random“ pasirenkate „Manual“. |
| 2.6 | garsas | spustelejimas |
| 3.2 | garsas | spustelejimas |
| 5.5 | balsas | Spaudžiate „Atnaujinti“. |
| 6.5 | garsas | spustelejimas |
| 7.7 | balsas | Baneriai nebekeičia eiliškumo. |
| 8.3 | garsas | patvirtinimas |
