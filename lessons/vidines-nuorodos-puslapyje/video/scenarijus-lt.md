# Video scenarijus: Vidinės nuorodos puslapyje — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1872037141 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 34 sek. (2 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_909` · senoji WP pamoka `vidines-nuorodos-puslapyje`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Įdedate inkarą prie skilties antraštės | 15 sek. | 02-inkaras | Žymeklį statote skilties antraštės pradžioje. Juostoje spaudžiate „Anchor“ – vėliavėlę. Lauke „Anchor Name“ įrašote „dokumentai“ ir spaudžiate „OK“. |
| 2 Susiejate turinio eilutę su inkaru | 19 sek. | 03-nuoroda-i-inkara | Pažymite eilutę „Dokumentai“ ir spaudžiate „Link“. „Link Type“ keičiate į „Link to anchor in the text“. Pasirenkate „dokumentai“ ir spaudžiate „OK“. Eilutė nušoka prie skilties. |

---

## Kadrai

### KADRAS 1: Įdedate inkarą prie skilties antraštės (15 sek.) — epizodas
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

### KADRAS 2: Susiejate turinio eilutę su inkaru (19 sek.) — epizodas
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
