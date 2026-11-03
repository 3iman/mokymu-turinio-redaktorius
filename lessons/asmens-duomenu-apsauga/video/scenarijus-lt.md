# Video scenarijus: Asmens duomenų apsauga — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 537118800 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 128 sek. (8 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_685` · senoji WP pamoka `asmens-duomenu-apsauga`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Darbuotojų pavardės | 18 sek. | 01-mokytoju-pavardes | Dažna dingstis – mokytojų pavardžių neskelbti dėl BDAR. Bendrieji reikalavimai įpareigoja skelbti darbuotojų sąrašą. Sąraše nurodote vardą, pareigas ir kontaktus. |
| 2 Mokytojo kvalifikacija | 15 sek. | 02-mokytojo-kvalifikacija | Mitas – kad kvalifikacijos skelbti negalima. Bendrųjų reikalavimų 44 punktas sako kitaip. Kvalifikaciją skelbiate kaip esminę mokyklos funkciją. |
| 3 Mokytojų kontaktai | 15 sek. | 03-mokytoju-kontaktai | Mitas – kad negalima skelbti net darbinių kontaktų. Reikalavimai nurodo telefono numerį ir elektroninį paštą. Arba paskelbiate jo sudarymo tvarką. |
| 4 Specialistų darbo laikas | 16 sek. | 04-specialistu-darbo-laikas | Mitas – kad darbo laiko skelbti negalima. Reikalavimų 16.6 punktas nurodo priešingai. Skelbiate už aptarnavimą atsakingo darbuotojo darbo laiką. |
| 5 Vadovų nuotraukos | 15 sek. | 05-vadovu-nuotraukos | Mitas – kad vadovų nuotraukų dėti negalima. Reikalavimų 16.1 punktas jas skelbti įpareigoja. Kartu patalpinate ir gyvenimo aprašymą. |
| 6 Pareigybės aprašymas | 17 sek. | 06-pareigybes-aprasymas | Mitas – kad pareigybės aprašymo dėti negalima. Reikalavimų 16.4 punktas sako kitaip. Skelbiate kiekvieno darbuotojo funkcijas ir reikalavimus pareigybei. |
| 7 Atlyginimų vidurkiai | 16 sek. | 07-atlyginimu-vidurkiai | Mitas – kad atlyginimų vidurkių skelbti negalima. Vidurkius pagal vienodas pareigas skelbti privalu. Vienintelio darbuotojo duomenis skelbiate tik gavę sutikimą. |
| 8 Duomenų apsaugos dokumentai | 16 sek. | 08-duomenu-apsaugos-dokumentai | Mitas – kad apsaugos taisyklių skelbti nereikia. Reikalavimų 25 punktas nurodo visą sąrašą. Skelbiate taisykles, tvarkos aprašą ir pareigūno kontaktus. |

---

## Kadrai

### KADRAS 1: Darbuotojų pavardės (18 sek.) — koncepcija
**Failas:** `01-mokytoju-pavardes.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje kortelė „Dažna dingstis“ su sakiniu apie pavardes, dešinėje „Bendrieji reikalavimai, 16.3 p.“ su darbuotojų sąrašo eilutėmis. Kairė parodoma pirma, tada dešinė, o prie jos pasilieka užrašas, kad tai prievolė.
**Ekrano užrašai (tiksliai):** „Dažna dingstis“, „16.3 punktas“, „Darbuotojų sąrašas“, „Vardas ir pavardė“, „Pareigos, kontaktai“
**TVS UI komponentai:** —
**Demo duomenys:** darbuotojas: Vincas Kudirka, el_pastas: v.kudirka@mokykla.lt
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_685_01` · dalis `dal_685_01` „„Neskelbsime mokytojų pavardžių, nes BDAR““ · prioritetas 2 · pagrindas: dal_685_01 paaiškinimas (bendrųjų reikalavimų 16.3 p.); viz_685_01 laukai; eskizas 2026-10-31: balso sakinio prasmė („Mitas – kad … negalima“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Dažna dingstis – mokytojų pavardžių neskelbti dėl BDAR. |
| 6.9 | balsas | Bendrieji reikalavimai įpareigoja skelbti darbuotojų sąrašą. |
| 11.8 | balsas | Sąraše nurodote vardą, pareigas ir kontaktus. |

### KADRAS 2: Mokytojo kvalifikacija (15 sek.) — koncepcija
**Failas:** `02-mokytojo-kvalifikacija.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje kortelė „Mitas“ su sakiniu apie kvalifikaciją, dešinėje „Bendrieji reikalavimai“ su 44 punkto eilute ir funkcijų sąrašu, kuriame kvalifikacija paryškinama. Kairė parodoma pirma.
**Ekrano užrašai (tiksliai):** „Mitas“, „Bendrieji reikalavimai“, „44 punktas“, „Mokytojų kvalifikacija“
**TVS UI komponentai:** —
**Demo duomenys:** darbuotojas: Jonas Mačiulis
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_685_02` · dalis `dal_685_02` „„Neskelbsime mokytojo kvalifikacijos, nes BDAR““ · prioritetas 1 · pagrindas: dal_685_02 paaiškinimas (44–45 p.); viz_685_02 laukai; kl_685_1: citatos tikslumą patikslina teisininkas; eskizas 2026-10-31: balso sakinio prasmė („Mitas – kad … negalima“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Mitas – kad kvalifikacijos skelbti negalima. |
| 4.9 | balsas | Bendrųjų reikalavimų 44 punktas sako kitaip. |
| 9.3 | balsas | Kvalifikaciją skelbiate kaip esminę mokyklos funkciją. |

### KADRAS 3: Mokytojų kontaktai (15 sek.) — koncepcija
**Failas:** `03-mokytoju-kontaktai.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje kortelė „Mitas“ su sakiniu apie kontaktus, dešinėje „Bendrieji reikalavimai“ su 16.3 punktu, po kuriuo atsiranda telefono numeris ir elektroninio pašto adresas.
**Ekrano užrašai (tiksliai):** „Mitas“, „16.3 punktas“, „Telefono numeris“, „El. pašto adresas“, „Sudarymo tvarka“
**TVS UI komponentai:** —
**Demo duomenys:** el_pastas: v.kudirka@mokykla.lt
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_685_03` · dalis `dal_685_03` „„Neskelbsime mokytojų kontaktų, net darbinio el. pašto ir bendro telefono, nes BDAR““ · prioritetas 1 · pagrindas: dal_685_03 paaiškinimas (16.3 p.); viz_685_03 laukai; eskizas 2026-10-31: balso sakinio prasmė („Mitas – kad … negalima“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Mitas – kad negalima skelbti net darbinių kontaktų. |
| 5.4 | balsas | Reikalavimai nurodo telefono numerį ir elektroninį paštą. |
| 10.1 | balsas | Arba paskelbiate jo sudarymo tvarką. |

### KADRAS 4: Specialistų darbo laikas (16 sek.) — koncepcija
**Failas:** `04-specialistu-darbo-laikas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje kortelė „Mitas“ su sakiniu apie darbo laiką, dešinėje „Bendrieji reikalavimai“ su 16.6 punktu, po kuriuo atsiranda kontaktų ir darbo laiko lentelė.
**Ekrano užrašai (tiksliai):** „Mitas“, „16.6 punktas“, „Kontaktinė informacija“, „Darbo laikas“
**TVS UI komponentai:** —
**Demo duomenys:** darbuotojas: Julija Žymantienė, pareigos: Logopedė
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_685_04` · dalis `dal_685_04` „„Neskelbsime specialistų darbo laiko, nes BDAR““ · prioritetas 1 · pagrindas: dal_685_04 paaiškinimas (16.6 p.); viz_685_04 laukai; kl_685_1: citatos tikslumą patikslina teisininkas; eskizas 2026-10-31: balso sakinio prasmė („Mitas – kad … negalima“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Mitas – kad darbo laiko skelbti negalima. |
| 4.6 | balsas | Reikalavimų 16.6 punktas nurodo priešingai. |
| 9.0 | balsas | Skelbiate už aptarnavimą atsakingo darbuotojo darbo laiką. |

### KADRAS 5: Vadovų nuotraukos (15 sek.) — koncepcija
**Failas:** `05-vadovu-nuotraukos.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje kortelė „Mitas“ su sakiniu apie nuotraukas, dešinėje „Bendrieji reikalavimai“ su 16.1 punktu, po kuriuo atsiranda vadovo profilio kortelė su nuotrauka ir gyvenimo aprašymu.
**Ekrano užrašai (tiksliai):** „Mitas“, „16.1 punktas“, „Vadovo nuotrauka“, „Gyvenimo aprašymas“
**TVS UI komponentai:** —
**Demo duomenys:** vadovas: Aleksandras Stulginskis
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_685_05` · dalis `dal_685_05` „„Nedėsime vadovų ir specialistų nuotraukų, nes BDAR““ · prioritetas 1 · pagrindas: dal_685_05 paaiškinimas (16.1 p.); viz_685_05 laukai; eskizas 2026-10-31: balso sakinio prasmė („Mitas – kad … negalima“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Mitas – kad vadovų nuotraukų dėti negalima. |
| 4.8 | balsas | Reikalavimų 16.1 punktas jas skelbti įpareigoja. |
| 9.8 | balsas | Kartu patalpinate ir gyvenimo aprašymą. |

### KADRAS 6: Pareigybės aprašymas (17 sek.) — koncepcija
**Failas:** `06-pareigybes-aprasymas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje kortelė „Mitas“ su sakiniu apie pareigybės aprašymą, dešinėje „Bendrieji reikalavimai“ su 16.4 punktu, po kuriuo atsiranda funkcijų ir specialiųjų reikalavimų eilutės.
**Ekrano užrašai (tiksliai):** „Mitas“, „16.4 punktas“, „Atliekamos funkcijos“, „Specialieji reikalavimai“
**TVS UI komponentai:** —
**Demo duomenys:** darbuotojas: Marija Pečkauskaitė
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_685_06` · dalis `dal_685_06` „„Nedėsime darbuotojo pareigybės aprašymo, nes BDAR““ · prioritetas 1 · pagrindas: dal_685_06 paaiškinimas (16.4 p.); viz_685_06 laukai; eskizas 2026-10-31: balso sakinio prasmė („Mitas – kad … negalima“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Mitas – kad pareigybės aprašymo dėti negalima. |
| 5.0 | balsas | Reikalavimų 16.4 punktas sako kitaip. |
| 9.2 | balsas | Skelbiate kiekvieno darbuotojo funkcijas ir reikalavimus pareigybei. |

### KADRAS 7: Atlyginimų vidurkiai (16 sek.) — koncepcija
**Failas:** `07-atlyginimu-vidurkiai.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje kortelė „Mitas“ su sakiniu apie vidurkius, dešinėje „Bendrieji reikalavimai“ su 22.3 punktu ir lentele pagal pareigas; eilutė su vienu darbuotoju paryškinama, prie jos atsiranda sutikimo ženklelis.
**Ekrano užrašai (tiksliai):** „Mitas“, „22.3 punktas“, „Vienodos pareigos“, „Vienas darbuotojas“, „Reikia sutikimo“
**TVS UI komponentai:** —
**Demo duomenys:** pareigybe: Mokytojas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_685_07` · dalis `dal_685_07` „„Neskelbsime atlyginimų vidurkių, nes BDAR““ · prioritetas 1 · pagrindas: dal_685_07 paaiškinimas (22.3 p.); viz_685_07 laukai; eskizas 2026-10-31: balso sakinio prasmė („Mitas – kad … negalima“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Mitas – kad atlyginimų vidurkių skelbti negalima. |
| 5.3 | balsas | Vidurkius pagal vienodas pareigas skelbti privalu. |
| 9.4 | balsas | Vienintelio darbuotojo duomenis skelbiate tik gavę sutikimą. |

### KADRAS 8: Duomenų apsaugos dokumentai (16 sek.) — koncepcija
**Failas:** `08-duomenu-apsaugos-dokumentai.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje kortelė „Mitas“ su sakiniu apie taisykles, dešinėje „Bendrieji reikalavimai“ su 25 punktu, po kuriuo atsiranda taisyklių, tvarkos aprašo ir prašymų formų eilutės bei pareigūno kortelė.
**Ekrano užrašai (tiksliai):** „Mitas“, „25 punktas“, „Tvarkymo taisyklės“, „Teisių įgyvendinimo tvarka“, „Pareigūno kontaktai“
**TVS UI komponentai:** —
**Demo duomenys:** pareigunas: Steponas Kairys, el_pastas: s.kairys@mokykla.lt
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_685_08` · dalis `dal_685_08` „„Neskelbsime asmens duomenų apsaugos taisyklių ir tvarkos aprašų““ · prioritetas 1 · pagrindas: dal_685_08 paaiškinimas (25 p.); viz_685_08 laukai; eskizas 2026-10-31: balso sakinio prasmė („Mitas – kad … negalima“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Mitas – kad apsaugos taisyklių skelbti nereikia. |
| 5.2 | balsas | Reikalavimų 25 punktas nurodo visą sąrašą. |
| 9.2 | balsas | Skelbiate taisykles, tvarkos aprašą ir pareigūno kontaktus. |
