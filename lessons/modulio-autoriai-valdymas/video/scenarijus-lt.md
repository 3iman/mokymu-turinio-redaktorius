# Video scenarijus: Modulio „Autoriai“ valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 260013194 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 60 sek. (4 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_704` · senoji WP pamoka `modulio-autoriai-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Apkerpate autoriaus nuotrauką | 14 sek. | 01-nuotraukos-apkirpimas | Prie įkeltos nuotraukos spaudžiate apkirpimo mygtuką. Pažymite sritį, kuri liks matoma. Išsaugote – nuotrauka apkirpta tvarkingai. |
| 2 Kas ką daro su sąrašu | 15 sek. | 03-kas-ka-daro | Visų darbuotojų sąrašą į svetainę patalpiname mes. Su nuotrauka, pareigomis ir el. paštu. Jums belieka jį atnaujinti ir papildyti naujais žmonėmis. |
| 3 Pridedate naują autorių | 16 sek. | 04-naujas-autorius | Sąraše spaudžiate „Pridėti autorių“. Lauke „Full Name“ įrašote vardą ir pavardę. Lauke „Position“ – pareigybę. Daugiau nieko privaloma nėra. |
| 4 Įkeliate kelis autorius | 15 sek. | 04-keli-autoriai | Lauke „Full Name“ kiekvieną autorių rašote naujoje eilutėje. Lauke „Position“ pareigybes surašote ta pačia tvarka. Išsaugojus sąraše atsiranda visi iš karto. |

---

## Kadrai

### KADRAS 1: Apkerpate autoriaus nuotrauką (14 sek.) — epizodas
**Failas:** `01-nuotraukos-apkirpimas.png`
**Ekrane:** Autoriaus įrašo forma ties lauku „Image“; prie įkeltos nuotraukos spaudžiamas apkirpimo mygtukas, atsiveria apkirpimo sritis, rėmelis pakoreguojamas ir išsaugoma.
**Ekrano užrašai (tiksliai):** „Nuotrauka“, „Select Image“, „Upload“, „Crop“, „Išsaugoti ir baigti“
**TVS UI komponentai:** tvs-btn, tvs-cursor, naujas: nuotraukos apkirpimo sritis su rėmeliu
**Demo duomenys:** autorius: Vincas Kudirka
**Tarimo kandidatai:** Image (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-nuotraukos-apkirpimas--sc03_013.9.jpg`
**Komentaras:** epizodas `ep_704_01_1` · dalis `dal_704_01` „Pavyzdys“ · prioritetas 3 · pagrindas: dal_704_01 paaiškinimas; scenos 840: 3 (laukas „Image“ su „Select File“ / „Upload“); eskizas 2026-10-31: veiksmų garsai; kl_536_7: apkirpimo lange — „Išsaugoti ir baigti“; laukas „Nuotrauka“, mygtukai „Select Image“, „Upload“, „Crop“ (skeleton 2026-10-18)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Prie įkeltos nuotraukos spaudžiate apkirpimo mygtuką. |
| 2.6 | garsas | spustelejimas |
| 5.8 | balsas | Pažymite sritį, kuri liks matoma. |
| 6.4 | garsas | paemimas |
| 7.2 | garsas | numetimas |
| 8.8 | balsas | Išsaugote – nuotrauka apkirpta tvarkingai. |
| 9.4 | garsas | spustelejimas |
| 9.9 | garsas | patvirtinimas |

### KADRAS 2: Kas ką daro su sąrašu (15 sek.) — koncepcija
**Failas:** `03-kas-ka-daro.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2
**Ekrane:** Šablonas `palyginimas`: dvi vienodo dydžio kortelės. Kairėje „Mes“ – sąrašo kortelė su nuotrauka, vardu, pareigomis ir el. paštu; dešinėje „Jūs“ – ta pati kortelė, prie kurios atsiranda nauja eilutė. Kairė užsipildo pirma, tada dešinėje priduriama eilutė.
**Ekrano užrašai (tiksliai):** „Mes“, „Jūs“
**TVS UI komponentai:** —
**Demo duomenys:** darbuotojas: Marija Pečkauskaitė, pareigos: Pavaduotoja
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-kas-ka-daro--843-Autoriai_03.png`
**Komentaras:** epizodas `viz_704_03` · dalis `dal_704_03` „Autorių sąrašas sistemoje“ · prioritetas 2 · pagrindas: dal_704_03 paaiškinimas; viz_704_03 laukai; nuotrauka 843

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Visų darbuotojų sąrašą į svetainę patalpiname mes. |
| 5.3 | balsas | Su nuotrauka, pareigomis ir el. paštu. |
| 8.8 | balsas | Jums belieka jį atnaujinti ir papildyti naujais žmonėmis. |

### KADRAS 3: Pridedate naują autorių (16 sek.) — epizodas
**Failas:** `04-naujas-autorius.png`
**Ekrane:** Autorių sąrašas; spaudžiamas žalias „Pridėti autorių“, atsiveria forma. Lauke „Full Name“ įrašomas vardas ir pavardė, lauke „Position“ – pareigybė; abu laukai pažymėti kaip privalomi.
**Ekrano užrašai (tiksliai):** „Pridėti autorių“, „Full Name“, „Position“, „Qualification“, „Email“
**TVS UI komponentai:** tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** autorius: Vincas Kudirka, pareigos: Direktorius
**Tarimo kandidatai:** Full Name, Position (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-naujas-autorius--sc03_005.9.jpg`, `nuorodos/04-naujas-autorius--sc03_017.9.jpg`
**Komentaras:** epizodas `ep_704_04_1` · dalis `dal_704_04` „Kaip pridėti naują autorių?“ · prioritetas 2 · pagrindas: dal_704_04 paaiškinimas; scenos 840: 2–3

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Sąraše spaudžiate „Pridėti autorių“. |
| 2.6 | garsas | spustelejimas |
| 4.6 | balsas | Lauke „Full Name“ įrašote vardą ir pavardę. |
| 6.0 | garsas | rasymas |
| 8.6 | balsas | Lauke „Position“ – pareigybę. Daugiau nieko privaloma nėra. |
| 10.6 | garsas | rasymas |

### KADRAS 4: Įkeliate kelis autorius (15 sek.) — epizodas
**Failas:** `04-keli-autoriai.png`
**Ekrane:** Autoriaus forma; lauke „Full Name“ kiekvienas vardas rašomas naujoje eilutėje, lauke „Position“ pareigybės surašomos ta pačia tvarka. Spaudžiama „Išsaugoti“, viršuje pasirodo žalia juosta, sąraše – visi nauji autoriai.
**Ekrano užrašai (tiksliai):** „Full Name“, „Position“, „Išsaugoti“, „Autoriai sukurtas sėkmingai“
**TVS UI komponentai:** tvs-input, tvs-btn, tvs-cursor, tvs-ripple, naujas: žalia sėkmės juosta virš sąrašo
**Demo duomenys:** autoriai: Vincas Kudirka, Marija Pečkauskaitė, Jonas Biliūnas, pareigos: Direktorius, Pavaduotoja, Informatikos mokytojas
**Tarimo kandidatai:** Full Name, Position (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-keli-autoriai--sc03_033.9.jpg`, `nuorodos/04-keli-autoriai--sc04_042.4.jpg`
**Komentaras:** epizodas `ep_704_04_2` · dalis `dal_704_04` „Kaip pridėti naują autorių?“ · prioritetas 1 · pagrindas: dal_704_04 paaiškinimas („vienu metu galite įkelti kelis autorius“); scenos 840: 3–4; eskizas 2026-10-31: veiksmų garsai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lauke „Full Name“ kiekvieną autorių rašote naujoje eilutėje. |
| 2.8 | garsas | rasymas |
| 6.1 | balsas | Lauke „Position“ pareigybes surašote ta pačia tvarka. |
| 7.7 | garsas | rasymas |
| 10.5 | balsas | Išsaugojus sąraše atsiranda visi iš karto. |
| 11.0 | garsas | spustelejimas |
| 11.5 | garsas | patvirtinimas |
