# Video scenarijus: Kaip prisijungti ir kas ką gali — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 528600013 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 105 sek. (7 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_906` · senoji WP pamoka `kaip-prisijungti-ir-kas-ka-gali`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Nuo ko prasideda | 13 sek. | 00-nuo-ko-prasideda | Svetainę valdo tas, kas turi prisijungimą. Adresas visiems tas pats, skiriasi rolė. Rolė nusprendžia, ką galite – ne pareigos. |
| 2 Prisijungiate prie svetainės valdymo | 17 sek. | 01-prisijungimas | Prie svetainės adreso pridedate „/admin“. Įrašote el. paštą ir slaptažodį. Spaudžiate „Prisijungti“ – atsidaro darbalaukis. |
| 3 Pirmas prisijungimas | 13 sek. | 02-pirmas-prisijungimas | Pirmą nuorodą gauna vadovas, galioja mėnesį. Slaptažodį renkatės patys, niekas jo neprašys. Kolegas prideda mokyklos administratorius. |
| 4 Ką matote prisijungę | 15 sek. | 03-ka-matote-prisijunge | Prisijungę matote darbalaukį ir modulių meniu. Paieška viršuje randa modulį pagal pavadinimą. Svetainėje – pieštukai ir „Turinio auditas“. |
| 5 Trys rolės | 15 sek. | 04-trys-roles | Rolės trys. „Cleverphant“ turime tik mes. „Manager“ tvarko dar vartotojus ir nustatymus. Vadovui – Manager, visiems kitiems – Redakcija. |
| 6 Pridedate kolegą su role „Redakcija“ | 18 sek. | 05-pridedate-kolega | Sąraše „Vartotojai“ spaudžiate „Pridėti vartotoją“. Užpildote vardą, pavardę ir el. paštą. Prie „Rolės“ pažymite „Redakcija“ ir išsaugote. |
| 7 Kai žmogus išeina | 14 sek. | 06-kai-zmogus-iseina | Išėjusio darbuotojo paskyrą išjungiate, ne ištrinate. Įrašai ir istorija lieka. Patikrinate, ar liko bent vienas „Manager“. |

---

## Kadrai

### KADRAS 1: Nuo ko prasideda (13 sek.) — koncepcija
**Failas:** `00-nuo-ko-prasideda.png`
**Šablonas:** `perziura` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `perziura`: kortelė su trimis eilutėmis – adreso juosta „svetaine.lt/admin“, du prisijungimo laukai, rolės ženkliukas; eilutės išnyra po vieną, apačioje santrauka.
**Ekrano užrašai (tiksliai):** „svetaine.lt/admin“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla, adresas: demo-mokykla.lt/admin
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_906_00` · dalis `dal_906_00` „Kam tai“ · prioritetas 2 · pagrindas: dal_906_00 paaiškinimas; viz_906_00 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Svetainę valdo tas, kas turi prisijungimą. |
| 4.7 | balsas | Adresas visiems tas pats, skiriasi rolė. |
| 8.0 | balsas | Rolė nusprendžia, ką galite – ne pareigos. |

### KADRAS 2: Prisijungiate prie svetainės valdymo (17 sek.) — epizodas
**Failas:** `01-prisijungimas.png`
**Ekrane:** Naršyklės adreso juosta: prie „mokykla.lt“ dopildoma „/admin“. Atsidaro langas „Prisijungimas“ su dviem laukais ir mygtuku „Prisijungti“; kursorius įrašo el. paštą, slaptažodį (taškeliai) ir spaudžia mygtuką. Ekranas persijungia į darbalaukį su kairiuoju meniu.
**Ekrano užrašai (tiksliai):** „/admin“, „Prisijungimas“, „Prisiminti mane“, „Prisijungti“, „Darbalaukis“
**TVS UI komponentai:** naujas: naršyklės adreso juosta, tvs-input, tvs-btn, tvs-cursor, tvs-ripple, tvs-side
**Demo duomenys:** el_pastas: v.kudirka@mokykla.lt, mokykla: Demo mokykla
**Tarimo kandidatai:** admin, el. paštą (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-prisijungimas--pradedanciojo-prisijungimas-roles.md`
**Komentaras:** epizodas `ep_906_01_1` · dalis `dal_906_01` „Kaip prisijungti“ · prioritetas 1 · pagrindas: dal_906_01 paaiškinimas; skeleton admin/login 2026-10-18: laukai, „Prisiminti mane“, „Prisijungti“, „Pamiršote slaptažodį?“

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prie svetainės adreso pridedate „/admin“. |
| 2.6 | garsas | rasymas |
| 5.9 | balsas | Įrašote el. paštą ir slaptažodį. |
| 7.7 | garsas | rasymas |
| 9.3 | balsas | Spaudžiate „Prisijungti“ – atsidaro darbalaukis. |
| 11.1 | garsas | spustelejimas |
| 12.3 | garsas | patvirtinimas |

### KADRAS 3: Pirmas prisijungimas (13 sek.) — koncepcija
**Failas:** `02-pirmas-prisijungimas.png`
**Šablonas:** `tvarka` · laukai: title, step_1, step_2, step_3, summary
**Ekrane:** Šablonas `tvarka`: trys numeruoti žingsniai vienas po kito – laiškas su nuoroda ir kalendoriaus ženklu „mėnuo“, slaptažodžio laukas su spynele, vartotojų sąrašas su nauja eilute; apačioje santrauka.
**Ekrano užrašai (tiksliai):** „mėnuo“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_906_02` · dalis `dal_906_02` „Pirmas prisijungimas“ · prioritetas 2 · pagrindas: dal_906_02 paaiškinimas; viz_906_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Pirmą nuorodą gauna vadovas, galioja mėnesį. |
| 4.8 | balsas | Slaptažodį renkatės patys, niekas jo neprašys. |
| 8.6 | balsas | Kolegas prideda mokyklos administratorius. |

### KADRAS 4: Ką matote prisijungę (15 sek.) — koncepcija
**Failas:** `03-ka-matote-prisijunge.png`
**Šablonas:** `ui_maketas` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `ui_maketas` (generatoriuje – kortelė su sąrašu): supaprastintas TVS langas – kairysis meniu su moduliais, paieškos laukas viršuje; trečioje eilutėje svetainės blokas su pieštuku ir juodo meniu nuoroda „Turinio auditas“.
**Ekrano užrašai (tiksliai):** „Turinio auditas“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_906_03` · dalis `dal_906_03` „Ką matote prisijungę“ · prioritetas 2 · pagrindas: dal_906_03 paaiškinimas; viz_906_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prisijungę matote darbalaukį ir modulių meniu. |
| 5.0 | balsas | Paieška viršuje randa modulį pagal pavadinimą. |
| 8.8 | balsas | Svetainėje – pieštukai ir „Turinio auditas“. |

### KADRAS 5: Trys rolės (15 sek.) — koncepcija
**Failas:** `04-trys-roles.png`
**Šablonas:** `dokumentu_sarasas` · laukai: title, role_1, role_2, role_3, summary
**Ekrane:** Šablonas `dokumentu_sarasas`: trys eilutės „rolė → ką gali“, rolės vardas paryškintas; apačioje santraukos taisyklė. Be ✓ / ✗ ženklų – rolės nėra geros ar blogos.
**Ekrano užrašai (tiksliai):** „Cleverphant“, „Manager“, „Redakcija“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Cleverphant, Manager, Redakcija (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_906_04` · dalis `dal_906_04` „Trys rolės“ · prioritetas 2 · pagrindas: dal_906_04 paaiškinimas; viz_906_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Rolės trys. „Cleverphant“ turime tik mes. |
| 4.9 | balsas | „Manager“ tvarko dar vartotojus ir nustatymus. |
| 8.7 | balsas | Vadovui – Manager, visiems kitiems – Redakcija. |

### KADRAS 6: Pridedate kolegą su role „Redakcija“ (18 sek.) — epizodas
**Failas:** `05-pridedate-kolega.png`
**Ekrane:** TVS „Vartotojai“ sąrašas; kursorius spaudžia „Pridėti vartotoją“. Forma: laukai „Vardas“, „Pavardė“, „Rodomas vardas“, „Vartotojo vardas“, „El.paštas“ užpildomi, bloke „Rolės“ pažymimas langelis „Redakcija“, spaudžiama „Išsaugoti“. Sąraše atsiranda nauja eilutė su būsena „Aktyvus“.
**Ekrano užrašai (tiksliai):** „Pridėti vartotoją“, „El.paštas“, „Rolės“, „Redakcija“, „Išsaugoti“, „Aktyvus“
**TVS UI komponentai:** tvs-table, tvs-row, tvs-btn, tvs-input, tvs-check, tvs-cursor, tvs-ripple
**Demo duomenys:** vardas: Marija Pečkauskaitė, el_pastas: m.peckauskaite@mokykla.lt, role: Redakcija
**Tarimo kandidatai:** El.paštas (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-pridedate-kolega--pradedanciojo-prisijungimas-roles.md`
**Komentaras:** epizodas `ep_906_05_1` · dalis `dal_906_05` „Kaip pridėti kolegą“ · prioritetas 1 · pagrindas: dal_906_05 paaiškinimas; skeleton admin/users/create 2026-10-18: formos laukai, „Rolės *“; rolės Cleverphant / Manager / Redakcija; eskizas 2026-10-31: trūkstami veiksmų garsai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Sąraše „Vartotojai“ spaudžiate „Pridėti vartotoją“. |
| 2.8 | garsas | spustelejimas |
| 8.3 | balsas | Užpildote vardą, pavardę ir el. paštą. |
| 10.1 | garsas | rasymas |
| 12.1 | balsas | Prie „Rolės“ pažymite „Redakcija“ ir išsaugote. |
| 13.5 | garsas | spustelejimas |
| 14.1 | garsas | spustelejimas |
| 15.3 | garsas | patvirtinimas |

### KADRAS 7: Kai žmogus išeina (14 sek.) — koncepcija
**Failas:** `06-kai-zmogus-iseina.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, dont_title, dont_1, dont_2
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje žalia kortelė „Išjungti“ su jungikliu ties „No“ ir išlikusia įrašų istorija, dešinėje raudona „Ištrinti“ su tuščia istorija ir užrakinta svetaine.
**Ekrano užrašai (tiksliai):** „Išjungti“, „Ištrinti“, „No“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Manager, No (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_906_06` · dalis `dal_906_06` „Kai žmogus išeina“ · prioritetas 2 · pagrindas: dal_906_06 paaiškinimas; viz_906_06 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Išėjusio darbuotojo paskyrą išjungiate, ne ištrinate. |
| 5.5 | balsas | Įrašai ir istorija lieka. |
| 7.9 | balsas | Patikrinate, ar liko bent vienas „Manager“. |
