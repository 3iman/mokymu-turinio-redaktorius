# Video scenarijus: Titulinio papildiniai — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1665258845 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 123 sek. (8 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_907` · senoji WP pamoka `titulinio-papildiniai`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Kas yra papildiniai | 14 sek. | 00-kas-yra-papildiniai | Šone ir tituliniame yra blokų be puslapio. Tai papildiniai: zonos ir jungiklis kiekvienam. Vasarą išjungiate, prieš priėmimą įjungiate. |
| 2 Papildiniai svetainėje | 16 sek. | 01-papildiniai-svetaineje | Dešinėje papildiniai eina zonos tvarka. Po naujienomis – „Apie mokyklą“. Sraute – spalvotas laikmatis. „Tab“ eina per nuorodas, skaitytuvas skaito pavadinimus. |
| 3 Kur rasti | 15 sek. | 02-kur-rasti | Kairiajame meniu „Papildiniai“ matote zonas. Home – titulinis, Default – vidiniai puslapiai. Prie zonos – „Papildiniai“: sąrašas su jungikliais. |
| 4 Išjungiate papildinį ir keičiate tvarką | 22 sek. | 03-jungiklis-ir-tvarka | Zonos sąraše prie papildinio spaudžiate „Redaguoti“. Jungiklį „Įjungtas/Išjungtas“ perjungiate į „No“ ir išsaugote. Tvarką keičiate tempdami už rodyklių ir spausdami „Perrikiuoti“. Svetainėje tvarka pasikeitė. |
| 5 Google vertimas ir Facebook langas | 12 sek. | 04-vertimas-ir-facebook | Abu papildiniai turi tik jungiklį. Vertimas automatinis – prieinamumo neatstoja. Facebook nenaudojate – langą išjungiate. |
| 6 Nustatote greitąją nuorodą | 17 sek. | 05-greitoji-nuoroda | Prie „Quick link“ spaudžiate „Redaguoti“. Lauke „link“ įrašote priėmimo puslapio adresą. Prie „Image“ įkeliate paveikslėlį ir išsaugote. Šoninėje juostoje atsiranda nuoroda. |
| 7 Spalvotas laikmatis naujienų sraute | 14 sek. | 06-spalvotas-laikmatis | Šoninis laikmatis kuklus, sraute – spalvotas. Pirma naujienos vieta: fonas, ikonėlė, mygtukas. Spalvas ir ikonėlę parenkame mes. |
| 8 Blokas „Apie mokyklą“ | 13 sek. | 07-apie-mokykla | Nuotrauka, keli sakiniai, keturi skaičiai. Skaičiai sensta – atnaujinate kiekvieną rugsėjį. Ketvirtas blokelis – kuo didžiuojatės. |

---

## Kadrai

### KADRAS 1: Kas yra papildiniai (14 sek.) — koncepcija
**Failas:** `00-kas-yra-papildiniai.png`
**Šablonas:** `perziura` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `perziura`: titulinio maketas su dešine juosta iš mažų blokų; prie kiekvieno bloko jungiklis, vienas perjungiamas ir blokas dingsta, kitas atsiranda.
**Ekrano užrašai (tiksliai):** „Facebook“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Facebook (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_907_00` · dalis `dal_907_00` „Kam tai“ · prioritetas 2 · pagrindas: dal_907_00 paaiškinimas; viz_907_00 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Šone ir tituliniame yra blokų be puslapio. |
| 4.7 | balsas | Tai papildiniai: zonos ir jungiklis kiekvienam. |
| 8.6 | balsas | Vasarą išjungiate, prieš priėmimą įjungiate. |

### KADRAS 2: Papildiniai svetainėje (16 sek.) — koncepcija
**Failas:** `01-papildiniai-svetaineje.png`
**Šablonas:** `puslapio_maketas` · laukai: title, item_1, item_2, item_3, item_4
**Ekrane:** Šablonas `puslapio_maketas` (generatoriuje – kortelė su sąrašu): titulinio schema – dešinė juosta su šešiais blokais iš eilės, po naujienų srautu platus blokas „Apie mokyklą“, sraute spalvota kortelė. Pabaigoje prieinamumo takelis: fokuso rėmelis šoka per blokus, skaitytuvo burbulas su pavadinimu (3–5 s).
**Ekrano užrašai (tiksliai):** „Apie mokyklą“, „Default“, „Tab“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Default, Tab (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_907_01` · dalis `dal_907_01` „Kaip atrodo svetainėje“ · prioritetas 2 · pagrindas: dal_907_01 paaiškinimas; viz_907_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Dešinėje papildiniai eina zonos tvarka. |
| 4.4 | balsas | Po naujienomis – „Apie mokyklą“. |
| 7.1 | balsas | Sraute – spalvotas laikmatis. |
| 9.7 | balsas | „Tab“ eina per nuorodas, skaitytuvas skaito pavadinimus. |

### KADRAS 3: Kur rasti (15 sek.) — koncepcija
**Failas:** `02-kur-rasti.png`
**Šablonas:** `ui_maketas` · laukai: title, item_1, item_2, item_3, item_4, summary
**Ekrane:** Šablonas `ui_maketas` (generatoriuje – kortelė su sąrašu): TVS meniu „Papildiniai“, zonų sąrašas Home / Default / Titulinio apačia, prie zonos mygtukas „Papildiniai“, atsiveria blokų sąrašas su jungikliais.
**Ekrano užrašai (tiksliai):** „Papildiniai“, „Home“, „Default“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Home, Default (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_907_02` · dalis `dal_907_02` „Kur rasti“ · prioritetas 2 · pagrindas: dal_907_02 paaiškinimas; viz_907_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kairiajame meniu „Papildiniai“ matote zonas. |
| 4.8 | balsas | Home – titulinis, Default – vidiniai puslapiai. |
| 8.8 | balsas | Prie zonos – „Papildiniai“: sąrašas su jungikliais. |

### KADRAS 4: Išjungiate papildinį ir keičiate tvarką (22 sek.) — epizodas
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

### KADRAS 5: Google vertimas ir Facebook langas (12 sek.) — koncepcija
**Failas:** `04-vertimas-ir-facebook.png`
**Šablonas:** `dokumentu_sarasas` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `dokumentu_sarasas`: dvi kortelės – vertimo juosta su kalbų sąrašu ir Facebook langas; prie abiejų tik jungiklis, trečioje eilutėje tuščias langas perjungiamas į „Išjungtas“.
**Ekrano užrašai (tiksliai):** „Google“, „Facebook“, „Facebook valdymas“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Google, Facebook (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_907_04` · dalis `dal_907_04` „Google vertimas ir Facebook langas“ · prioritetas 2 · pagrindas: dal_907_04 paaiškinimas; viz_907_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Abu papildiniai turi tik jungiklį. |
| 4.0 | balsas | Vertimas automatinis – prieinamumo neatstoja. |
| 7.7 | balsas | Facebook nenaudojate – langą išjungiate. |

### KADRAS 6: Nustatote greitąją nuorodą (17 sek.) — epizodas
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

### KADRAS 7: Spalvotas laikmatis naujienų sraute (14 sek.) — koncepcija
**Failas:** `06-spalvotas-laikmatis.png`
**Šablonas:** `dokumentu_sarasas` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `dokumentu_sarasas`: kairėje mažas pilkas šoninis laikmatis, dešinėje didelė spalvota kortelė sraute su ikonėle, atgaline atskaita ir mygtuku; trečia eilutė – du tokie laikmačiai su jungikliais.
**Ekrano užrašai (tiksliai):** „Titulinio naujienos“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_907_06` · dalis `dal_907_06` „Spalvotas laikmatis naujienų sraute“ · prioritetas 2 · pagrindas: dal_907_06 paaiškinimas; viz_907_06 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Šoninis laikmatis kuklus, sraute – spalvotas. |
| 5.2 | balsas | Pirma naujienos vieta: fonas, ikonėlė, mygtukas. |
| 9.6 | balsas | Spalvas ir ikonėlę parenkame mes. |

### KADRAS 8: Blokas „Apie mokyklą“ (13 sek.) — koncepcija
**Failas:** `07-apie-mokykla.png`
**Šablonas:** `anatomija` · laukai: title, item_1, item_2, item_3, summary
**Ekrane:** Šablonas `anatomija` (generatoriuje – kortelė su sąrašu): platus blokas – kairėje nuotrauka, viduryje antraštė su tekstu, dešinėje keturi skaičių blokeliai; ketvirtas blokelis paryškėja, prie skaičių kalendoriaus ženklas „rugsėjis“.
**Ekrano užrašai (tiksliai):** „Apie mokyklą“, „350+“, „rugsėjis“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla, skaiciai: 350+ mokinių · 50 mokytojų · I–IV klasės · 5 laisvos vietos
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_907_07` · dalis `dal_907_07` „„Apie mokyklą““ · prioritetas 2 · pagrindas: dal_907_07 paaiškinimas; viz_907_07 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Nuotrauka, keli sakiniai, keturi skaičiai. |
| 4.7 | balsas | Skaičiai sensta – atnaujinate kiekvieną rugsėjį. |
| 8.6 | balsas | Ketvirtas blokelis – kuo didžiuojatės. |
