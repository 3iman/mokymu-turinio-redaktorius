# Video scenarijus: Vidinės nuorodos puslapyje — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1872037141 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 88 sek. (6 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_909` · senoji WP pamoka `vidines-nuorodos-puslapyje`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Trečias kelias ilgam puslapiui | 14 sek. | 00-trecias-kelias | Ilgas puslapis su penkiomis skiltimis. Suskleidimai slepia, polapiai išbarsto. Trečias kelias: turinys viršuje, nuorodos į skiltis. |
| 2 Kaip atrodo svetainėje | 14 sek. | 01-kaip-atrodo | Lankytojui – sąrašas puslapio pradžioje. Paspaudus puslapis nuslenka iki antraštės. Adrese atsiranda „#dokumentai“ – galite siųsti. |
| 3 Įdedate inkarą prie skilties antraštės | 15 sek. | 02-inkaras | Žymeklį statote skilties antraštės pradžioje. Juostoje spaudžiate „Anchor“ – vėliavėlę. Lauke „Anchor Name“ įrašote „dokumentai“ ir spaudžiate „OK“. |
| 4 Susiejate turinio eilutę su inkaru | 19 sek. | 03-nuoroda-i-inkara | Pažymite eilutę „Dokumentai“ ir spaudžiate „Link“. „Link Type“ keičiate į „Link to anchor in the text“. Pasirenkate „dokumentai“ ir spaudžiate „OK“. Eilutė nušoka prie skilties. |
| 5 Vardų taisyklės | 13 sek. | 04-vardu-taisykles | Vardas gyvena adrese: mažosios, be tarpų. Prasmingas – po metų matysis, kur veda. Antraštę keičiate, inkaras lieka. |
| 6 Kada tai per sudėtinga | 13 sek. | 05-kada-per-sudetinga | Kiekviena skiltis – du veiksmai. Iki šešių pastovių skilčių inkarai atsiperka. Daugiau ar kinta – polapiai; arba parašote mums. |

---

## Kadrai

### KADRAS 1: Trečias kelias ilgam puslapiui (14 sek.) — koncepcija
**Failas:** `00-trecias-kelias.png`
**Šablonas:** `tvarka` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `tvarka` (trys eilutės su pora): ilgas puslapis „Priėmimas“ su penkiomis skiltimis; pirmoje eilutėje jos susitraukia į pliusus, antroje išsibarsto į penkis lapus, trečioje – lieka vienas lapas su turinio sąrašu viršuje ir rodyklėmis į skiltis.
**Ekrano užrašai (tiksliai):** „Anchor“, „Link“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Anchor, Link (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_909_00` · dalis `dal_909_00` „Kam tai“ · prioritetas 2 · pagrindas: dal_909_00 paaiškinimas; viz_909_00 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Ilgas puslapis su penkiomis skiltimis. |
| 4.3 | balsas | Suskleidimai slepia, polapiai išbarsto. |
| 7.9 | balsas | Trečias kelias: turinys viršuje, nuorodos į skiltis. |

### KADRAS 2: Kaip atrodo svetainėje (14 sek.) — koncepcija
**Failas:** `01-kaip-atrodo.png`
**Šablonas:** `perziura` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `perziura`: puslapio viršuje eilutė „Terminai · Dokumentai · Klasės · Klausimai · Kontaktai“; kursorius spaudžia „Dokumentai“, lapas nuslenka iki antraštės, adreso juostoje prisideda „#dokumentai“.
**Ekrano užrašai (tiksliai):** „Terminai“, „Dokumentai“, „#dokumentai“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla, puslapis: Priėmimas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_909_01` · dalis `dal_909_01` „Kaip atrodo svetainėje“ · prioritetas 2 · pagrindas: dal_909_01 paaiškinimas; viz_909_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lankytojui – sąrašas puslapio pradžioje. |
| 4.5 | balsas | Paspaudus puslapis nuslenka iki antraštės. |
| 8.0 | balsas | Adrese atsiranda „#dokumentai“ – galite siųsti. |

### KADRAS 3: Įdedate inkarą prie skilties antraštės (15 sek.) — epizodas
**Failas:** `02-inkaras.png`
**Ekrane:** Puslapio redagavimas, laukas „Turinys“ su antrašte „Dokumentai“; žymeklis jos pradžioje. Kamera priartėja prie įrankių juostos – vėliavėlės mygtuko „Anchor“ tarp „Unlink“ ir „Table“. Atsidaro langas „Anchor Properties“ su lauku „Anchor Name“, įrašoma „dokumentai“, „OK“. Prie antraštės atsiranda maža vėliavėlė.
**Ekrano užrašai (tiksliai):** „Dokumentai“, „Anchor“, „Anchor Properties“, „Anchor Name“, „dokumentai“, „OK“
**TVS UI komponentai:** naujas: teksto redaktoriaus įrankių juosta, tvs-window, tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** puslapis: Priėmimas į mokyklą, skiltis: Dokumentai, inkaras: dokumentai
**Tarimo kandidatai:** Anchor, Anchor Name, OK (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-inkaras--vidines-nuorodos-ckeditor.md`
**Komentaras:** epizodas `ep_909_02_1` · dalis `dal_909_02` „Inkaras prie skilties“ · prioritetas 2 · pagrindas: dal_909_02 paaiškinimas; skeleton CKEditor 4.7.2 2026-10-18: mygtukas „Anchor“, dialogas „Anchor Properties“ / „Anchor Name“

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Žymeklį statote skilties antraštės pradžioje. |
| 2.6 | garsas | spustelejimas |
| 4.9 | balsas | Juostoje spaudžiate „Anchor“ – vėliavėlę. |
| 6.5 | garsas | spustelejimas |
| 8.3 | balsas | Lauke „Anchor Name“ įrašote „dokumentai“ ir spaudžiate „OK“. |
| 9.9 | garsas | rasymas |
| 11.1 | garsas | spustelejimas |

### KADRAS 4: Susiejate turinio eilutę su inkaru (19 sek.) — epizodas
**Failas:** `03-nuoroda-i-inkara.png`
**Ekrane:** Lauko „Turinys“ viršuje – sąrašas „Terminai · Dokumentai · Kontaktai“; pažymimas žodis „Dokumentai“. Kursorius spaudžia „Link“ juostoje. Langas „Link“, skirtukas „Link Info“: laukas „Link Type“ perjungiamas į „Link to anchor in the text“, atsiranda sąrašas „By Anchor Name“, pasirenkama „dokumentai“, „OK“. Ekranas persijungia į svetainę: paspaudus eilutę puslapis nuslenka prie skilties.
**Ekrano užrašai (tiksliai):** „Dokumentai“, „Link“, „Link Type“, „By Anchor Name“, „dokumentai“, „OK“
**TVS UI komponentai:** naujas: teksto redaktoriaus įrankių juosta, tvs-window, tvs-input, tvs-btn, tvs-cursor, tvs-ripple, tvs-site
**Demo duomenys:** puslapis: Priėmimas į mokyklą, inkaras: dokumentai
**Tarimo kandidatai:** Link, Link Type, Link to anchor in the text, By Anchor Name (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-nuoroda-i-inkara--vidines-nuorodos-ckeditor.md`
**Komentaras:** epizodas `ep_909_03_1` · dalis `dal_909_03` „Nuoroda į inkarą“ · prioritetas 2 · pagrindas: dal_909_03 paaiškinimas; skeleton CKEditor dialogas „Link“ 2026-10-18: „Link Type“ parinktys URL / Link to anchor in the text / E-mail

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Pažymite eilutę „Dokumentai“ ir spaudžiate „Link“. |
| 2.8 | garsas | spustelejimas |
| 5.1 | balsas | „Link Type“ keičiate į „Link to anchor in the text“. |
| 7.5 | garsas | spustelejimas |
| 9.4 | balsas | Pasirenkate „dokumentai“ ir spaudžiate „OK“. |
| 11.0 | garsas | spustelejimas |
| 13.2 | balsas | Eilutė nušoka prie skilties. |
| 14.8 | garsas | patvirtinimas |

### KADRAS 5: Vardų taisyklės (13 sek.) — koncepcija
**Failas:** `04-vardu-taisykles.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, dont_title, dont_1, dont_2, summary
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje žalia kortelė su „#dokumentai“, „#terminai“; dešinėje raudona su „#Reikalingi dokumentai“ (tarpai perbraukti) ir „#skiltis1“; apačioje santrauka.
**Ekrano užrašai (tiksliai):** „#dokumentai“, „#skiltis1“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** #dokumentai, #skiltis1 (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_909_04` · dalis `dal_909_04` „Vardų taisyklės“ · prioritetas 2 · pagrindas: dal_909_04 paaiškinimas; viz_909_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Vardas gyvena adrese: mažosios, be tarpų. |
| 5.0 | balsas | Prasmingas – po metų matysis, kur veda. |
| 8.2 | balsas | Antraštę keičiate, inkaras lieka. |

### KADRAS 6: Kada tai per sudėtinga (13 sek.) — koncepcija
**Failas:** `05-kada-per-sudetinga.png`
**Šablonas:** `tvarka` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `tvarka`: trys eilutės su pora – lapas su penkiomis skiltimis ir varnele, lapas su dešimčia skilčių virstantis į polapius, laiško ženklas „pagalba@cleverphant.lt“.
**Ekrano užrašai (tiksliai):** „5–6“, „8+“, „pagalba@cleverphant.lt“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** pagalba@cleverphant.lt (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_909_05` · dalis `dal_909_05` „Kada tai per sudėtinga“ · prioritetas 2 · pagrindas: dal_909_05 paaiškinimas; viz_909_05 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kiekviena skiltis – du veiksmai. |
| 3.9 | balsas | Iki šešių pastovių skilčių inkarai atsiperka. |
| 7.6 | balsas | Daugiau ar kinta – polapiai; arba parašote mums. |
