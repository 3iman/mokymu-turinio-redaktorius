# Video scenarijus: Titulinio papildiniai — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1665258845 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 39 sek. (2 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_907` · senoji WP pamoka `titulinio-papildiniai`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Išjungiate papildinį ir keičiate tvarką | 22 sek. | 03-jungiklis-ir-tvarka | Zonos sąraše prie papildinio spaudžiate „Redaguoti“. Jungiklį „Įjungtas/Išjungtas“ perjungiate į „No“ ir išsaugote. Tvarką keičiate tempdami už rodyklių ir spausdami „Perrikiuoti“. Svetainėje tvarka pasikeitė. |
| 2 Nustatote greitąją nuorodą | 17 sek. | 05-greitoji-nuoroda | Prie „Quick link“ spaudžiate „Redaguoti“. Lauke „link“ įrašote priėmimo puslapio adresą. Prie „Image“ įkeliate paveikslėlį ir išsaugote. Šoninėje juostoje atsiranda nuoroda. |

---

## Kadrai

### KADRAS 1: Išjungiate papildinį ir keičiate tvarką (22 sek.) — epizodas
**Failas:** `03-jungiklis-ir-tvarka.png`
**Ekrane:** „Papildiniai“ › zona „Home“ › sąrašas: Pamokų laikas, Google translate, Nav Black, Facebook fanbox… Kursorius prie „Google translate“ spaudžia „Redaguoti“, formoje jungiklį „Įjungtas/Išjungtas“ perjungia į „No“, išsaugo. Grįžęs į sąrašą suima „Quick link“ už rodyklių, tempia aukščiau, spaudžia „Perrikiuoti“. Ekranas persijungia į svetainės šoninę juostą: vertimo juostos nebėra, greitoji nuoroda aukščiau.
**Ekrano užrašai (tiksliai):** „Home“, „Google translate“, „Redaguoti“, „Įjungtas/Išjungtas“, „No“, „Perrikiuoti“
**TVS UI komponentai:** tvs-table, tvs-row, tvs-btn, naujas: „Yes“ / „No“ jungiklis, tvs-handle, tvs-cursor, tvs-ripple, tvs-site
**Demo duomenys:** zona: Home, papildinys: Google translate
**Tarimo kandidatai:** Google translate, Quick link, No (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-jungiklis-ir-tvarka--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_907_03_1` · dalis `dal_907_03` „Įjungti, išjungti, perrikiuoti“ · prioritetas 2 · pagrindas: dal_907_03 paaiškinimas; skeleton admin/widgets/widgets/1 2026-10-18: sąrašas, laukai Pavadinimas / View / Įjungtas/Išjungtas, mygtukas „Perrikiuoti“

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Zonos sąraše prie papildinio spaudžiate „Redaguoti“. |
| 2.8 | garsas | spustelejimas |
| 5.5 | balsas | Jungiklį „Įjungtas/Išjungtas“ perjungiate į „No“ ir išsaugote. |
| 7.9 | garsas | spustelejimas |
| 12.3 | balsas | Tvarką keičiate tempdami už rodyklių ir spausdami „Perrikiuoti“. |
| 14.3 | garsas | paemimas |
| 15.0 | garsas | numetimas |
| 15.3 | garsas | spustelejimas |
| 17.8 | balsas | Svetainėje tvarka pasikeitė. |
| 19.0 | garsas | patvirtinimas |

### KADRAS 2: Nustatote greitąją nuorodą (17 sek.) — epizodas
**Failas:** `05-greitoji-nuoroda.png`
**Ekrane:** Zonos „Home“ sąraše prie „Quick link“ – „Redaguoti“. Forma: „Pavadinimas“, „View“, „Įjungtas/Išjungtas“, laukas „link“ ir „Image“ su mygtukais „Select Image“ / „Upload“. Kursorius įrašo adresą „/priemimas“, įkelia paveikslėlį „Priėmimas 2027“, jungiklis „Yes“, išsaugo. Svetainės šoninėje juostoje atsiranda paveikslėlis, paspaudus – priėmimo puslapis.
**Ekrano užrašai (tiksliai):** „Quick link“, „Redaguoti“, „link“, „Image“, „Upload“, „Išsaugoti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-input, tvs-file, tvs-cursor, tvs-ripple, tvs-site
**Demo duomenys:** nuoroda: /priemimas, paveikslelis: Priėmimas 2027
**Tarimo kandidatai:** Quick link, link, Image, Upload (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-greitoji-nuoroda--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_907_05_1` · dalis `dal_907_05` „Greitoji nuoroda“ · prioritetas 2 · pagrindas: dal_907_05 paaiškinimas; skeleton Quick link forma 2026-10-18: laukai „link“, „Image“; eskizas 2026-10-31: kategorijos pasirinkimas / išsaugojimas

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prie „Quick link“ spaudžiate „Redaguoti“. |
| 2.6 | garsas | spustelejimas |
| 4.6 | balsas | Lauke „link“ įrašote priėmimo puslapio adresą. |
| 6.4 | garsas | rasymas |
| 8.4 | balsas | Prie „Image“ įkeliate paveikslėlį ir išsaugote. |
| 10.4 | garsas | spustelejimas |
| 11.0 | garsas | spustelejimas |
| 12.3 | balsas | Šoninėje juostoje atsiranda nuoroda. |
| 13.9 | garsas | patvirtinimas |
