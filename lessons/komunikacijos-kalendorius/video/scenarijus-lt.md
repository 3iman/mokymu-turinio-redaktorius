# Video scenarijus: Komunikacijos kalendorius — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2414440384 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 57 sek. (4 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_901` · senoji WP pamoka `komunikacijos-kalendorius`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Mokyklos metai ratu | 14 sek. | 00-metai-ratu | Svarbiausios naujienos nėra netikėtos. Priėmimas, rugsėjo pirmoji, egzaminai, vasara – kasmet. Planuojate kartą ir keičiate tik datas. |
| 2 Keturi fiksuoti taškai | 16 sek. | 01-keturi-taskai | Keturiems taškams – data, kada žinutė pasirodo. Priėmimas – registracijos dieną, egzaminai – prieš dvi savaites. Prie keturių pridedate savas šventes. |
| 3 Prieš ir po | 12 sek. | 02-pries-ir-po | Kiekvienam įvykiui – dvi žinutės. „Prieš“ sako, ką daryti; „po“ – kaip buvo. „Po“ skelbiate tą pačią dieną. |
| 4 Kur gyvena kalendorius | 15 sek. | 03-kalendoriaus-lentele | Kalendorius – lentelė su penkiais stulpeliais. Laikote „Google Sheets“ faile, kurį mato visi, kas rašo. Rugsėjį pakeičiate datas – darbas padarytas. |

---

## Kadrai

### KADRAS 1: Mokyklos metai ratu (14 sek.) — koncepcija
**Failas:** `00-metai-ratu.png`
**Šablonas:** `perziura` · laukai: title, item_1, item_2, item_3, item_4, summary
**Ekrane:** Šablonas `perziura`: metų ratas su keturiais taškais – priėmimas, rugsėjo 1-oji, egzaminai, vasara; taškai užsidega iš eilės, apačioje santrauka.
**Ekrano užrašai (tiksliai):** „Rugsėjo 1-oji“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_901_00` · dalis `dal_901_00` „Kam tai“ · prioritetas 2 · pagrindas: dal_901_00 paaiškinimas; viz_901_00 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Svarbiausios naujienos nėra netikėtos. |
| 4.3 | balsas | Priėmimas, rugsėjo pirmoji, egzaminai, vasara – kasmet. |
| 9.3 | balsas | Planuojate kartą ir keičiate tik datas. |

### KADRAS 2: Keturi fiksuoti taškai (16 sek.) — koncepcija
**Failas:** `01-keturi-taskai.png`
**Šablonas:** `tvarka` · laukai: title, step_1, step_2, step_3, step_4, summary
**Ekrane:** Šablonas `tvarka`: keturios numeruotos eilutės „įvykis → data“ ant kalendoriaus juostos; apačioje tuščia penkta eilutė su pliusu – savos šventės.
**Ekrano užrašai (tiksliai):** „Priėmimas“, „Egzaminai“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_901_01` · dalis `dal_901_01` „Keturi fiksuoti taškai“ · prioritetas 2 · pagrindas: dal_901_01 paaiškinimas; viz_901_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Keturiems taškams – data, kada žinutė pasirodo. |
| 5.1 | balsas | Priėmimas – registracijos dieną, egzaminai – prieš dvi savaites. |
| 10.3 | balsas | Prie keturių pridedate savas šventes. |

### KADRAS 3: Prieš ir po (12 sek.) — koncepcija
**Failas:** `02-pries-ir-po.png`
**Šablonas:** `dokumentu_sarasas` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `dokumentu_sarasas`: dvi naujienos kortelės šalia įvykio datos – „prieš“ su kalendoriumi ir „po“ su trimis nuotraukomis; trečia eilutė – laikrodis „tą pačią dieną“.
**Ekrano užrašai (tiksliai):** „Prieš“, „Po“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_901_02` · dalis `dal_901_02` „Prieš ir po“ · prioritetas 2 · pagrindas: dal_901_02 paaiškinimas; viz_901_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kiekvienam įvykiui – dvi žinutės. |
| 4.0 | balsas | „Prieš“ sako, ką daryti; „po“ – kaip buvo. |
| 7.9 | balsas | „Po“ skelbiate tą pačią dieną. |

### KADRAS 4: Kur gyvena kalendorius (15 sek.) — koncepcija
**Failas:** `03-kalendoriaus-lentele.png`
**Šablonas:** `dokumentu_sarasas` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `dokumentu_sarasas`: lentelė su penkiais stulpeliais ir trimis užpildytomis eilutėmis; viršuje „Google Sheets“ skirtukas, šalia trys žmogeliukai – raštinė, pavaduotoja, administratorė.
**Ekrano užrašai (tiksliai):** „Data“, „Įvykis“, „Kas rašo“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Google Sheets (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_901_03` · dalis `dal_901_03` „Kur gyvena kalendorius“ · prioritetas 2 · pagrindas: dal_901_03 paaiškinimas; viz_901_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kalendorius – lentelė su penkiais stulpeliais. |
| 5.0 | balsas | Laikote „Google Sheets“ faile, kurį mato visi, kas rašo. |
| 9.6 | balsas | Rugsėjį pakeičiate datas – darbas padarytas. |
