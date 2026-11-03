# Video scenarijus: Kur rasti dokumentų banką ir kaip įkelti dokumentą — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 4137183135 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 213 sek. (16 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_679` · senoji WP pamoka `dokumentu-banko-anatomija`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Dokumentų banką randate paieška | 10 sek. | 01-paieska-virsuje | Paieškos laukelyje pradedate rašyti „dokumentų bankas“. Sąraše pasirenkate „Dokumentų bankas“. |
| 2 Dokumentų bankas darbalaukyje | 8 sek. | 01-darbalaukio-skyrius | Darbalaukyje randate skyrių „Dokumentų bankas“. Jį spaudžiate. |
| 3 Pieštuku atidarote dokumento įrašą | 9 sek. | 02-redagavimo-piestukas | Dokumento eilutėje spaudžiate pieštuko ikoną. Atsiveria to dokumento valdymo aplinka. |
| 4 Dokumentą randate svetainės paieška | 17 sek. | 03-dokumentu-puslapis | Svetainėje puslapis „Dokumentai“ rodo visus įstaigos dokumentus. Dešinėje matote kategorijų sąrašą. Viršuje įrašote pavadinimo dalį. Sąrašas susiaurėja iki ieškomo dokumento. |
| 5 Pavadinimas, aprašymas ir URL | 21 sek. | 06-pavadinimas-aprasymas-url | Lauke „Pavadinimas“ rašote pilną dokumento pavadinimą. Bendruomenėje paplitusį pavadinimą rašote langelyje „Aprašymas“. Taip dokumentą lengviau rasti paieškoje. Laukas „URL“ skirtas išorinėje duombazėje esančiam dokumentui. |
| 6 Failą įkeliate mygtuku Upload | 11 sek. | 07-failo-ikelimas | Spaudžiate „Select File“ ir pasirenkate failą. Tada spaudžiate žalią mygtuką „Upload“. Failas atsiranda įraše. |
| 7 Dokumentą priskiriate kategorijai | 13 sek. | 07-kategorijos-priskyrimas | Eilutėje „Kategorijos“ pradedate rašyti kategoriją. Pasirenkate ją iš pasiūlymų. Vienas dokumentas gali turėti ne vieną kategoriją. |
| 8 Sukuriate naują kategoriją | 14 sek. | 08-nauja-kategorija | Kategorijų sąraše spaudžiate žalią mygtuką „Sukurti“. Įrašote pavadinimą, o „Slug“ susikuria pats. Išsaugojus kategorija atsiranda sąraše. |
| 9 Kategoriją užrakinate slaptažodžiu | 13 sek. | 09-kategorijos-uzrakinimas | Lauke „Password“ įrašote slaptažodį be lietuviškų raidžių. Spaudžiate „Atnaujinti“. Svetainėje prie dokumentų atsiranda spyna. |
| 10 Kategoriją paslepiate iš sąrašo | 10 sek. | 09-kategorijos-slepimas | Įjungiate „Slėpti kategoriją“. Spaudžiate „Atnaujinti“. Bendrame kategorijų sąraše jos nebelieka. |
| 11 Užrakintą kategoriją atrakinate slaptažodžiu | 16 sek. | 10-uzrakintos-atrakinimas | Užrakintų kategorijų dokumentai lieka matomi. Vietoje atsisiuntimo ikonos matote spyną. Įvedate slaptažodį ir spaudžiate „Atrakinti“. Sistema jį kurį laiką atsimins. |
| 12 Paieška ir kategorijų filtras | 16 sek. | 11-paieska-ir-filtras | Lauke „Paieška“ įrašote raktažodį. Šalia pasirenkate kategoriją. Paieška veikia paspaudus „Enter“ arba „Filtruoti“. Mygtukas „Valyti“ grąžina pilną sąrašą. |
| 13 Dokumento ID adreso eilutėje | 14 sek. | 12-dokumento-id | Kiekvieno dokumento ID yra unikalus. Jį rasite naršyklės adreso eilutėje. ID prireikia naudojant dokumentų įterpimo funkcijas. |
| 14 Nustatote dokumento patikrinimo datą | 15 sek. | 13-patikrinimo-data | Lauke „Patikrinimo data“ pasirenkate datą ateityje. Komentarą rašote tokį, kad suprastumėte ir po metų. Darbalaukyje priminimas pasirodys mėnesiu anksčiau. |
| 15 Dokumentus perrikiuojate kategorijoje | 18 sek. | 14-dokumentu-rikiavimas | Filtre pasirenkate kategoriją arba subkategoriją. Sąrašo kairėje atsiranda rikiavimui skirtas kryžiukas. Tempiate dokumentą į naują poziciją. Baigę spaudžiate žalią mygtuką „Perrikiuoti“. |
| 16 Sintaksę nukopijuojate vienu paspaudimu | 8 sek. | 15-sintakses-kopijavimas | Sintakses rasite dokumentų sąraše. Prie jos spaudžiate violetinį mygtuką. |

---

## Kadrai

### KADRAS 1: Dokumentų banką randate paieška (10 sek.) — epizodas
**Failas:** `01-paieska-virsuje.png`
**Ekrane:** TVS viršutinė juosta; kursorius spusteli paieškos lauką ir įrašo pirmas raides. Iškrenta modulių sąrašas, kuriame „Dokumentų bankas“ apvedamas rėmeliu, ir modulis atsidaro.
**Ekrano užrašai (tiksliai):** „Type to search...“, „Dokumentų bankas“, „Darbalaukis“
**TVS UI komponentai:** tvs-top, tvs-searchbar, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-paieska-virsuje--sc02_014.5.jpg`
**Komentaras:** epizodas `ep_679_01_1` · dalis `dal_679_01` „Kaip rasti dokumentų banką?“ · prioritetas 3 · pagrindas: dal_679_01 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 01

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Paieškos laukelyje pradedate rašyti „dokumentų bankas“. |
| 1.8 | garsas | rasymas |
| 5.5 | balsas | Sąraše pasirenkate „Dokumentų bankas“. |
| 6.5 | garsas | spustelejimas |

### KADRAS 2: Dokumentų bankas darbalaukyje (8 sek.) — epizodas
**Failas:** `01-darbalaukio-skyrius.png`
**Ekrane:** TVS darbalaukio įrankių kortelė dviem stulpeliais; kursorius nuslysta per punktus ir sustoja ties „Dokumentų bankas“, kuris apvedamas rėmeliu ir atidaromas.
**Ekrano užrašai (tiksliai):** „Įrankiai“, „Dokumentų bankas“, „Naujienos“, „Puslapiai“
**TVS UI komponentai:** tvs-main, tvs-row, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-darbalaukio-skyrius--sc02_014.5.jpg`
**Komentaras:** epizodas `ep_679_01_2` · dalis `dal_679_01` „Kaip rasti dokumentų banką?“ · prioritetas 3 · pagrindas: dal_679_01 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 01

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Darbalaukyje randate skyrių „Dokumentų bankas“. |
| 4.9 | balsas | Jį spaudžiate. |
| 5.7 | garsas | spustelejimas |

### KADRAS 3: Pieštuku atidarote dokumento įrašą (9 sek.) — epizodas
**Failas:** `02-redagavimo-piestukas.png`
**Ekrane:** Svetainės dokumentų lentelė su žaliu antraštės juosta; kursorius sustoja ties pirmos eilutės pieštuko ikona, ji apvedama ir ekranas persijungia į TVS dokumento formą.
**Ekrano užrašai (tiksliai):** „Finansinių ataskaitų rinkiniai“, „Atnaujinta“, „Dydis“
**TVS UI komponentai:** tvs-site, tvs-site-doc, tvs-table, tvs-row, tvs-cursor, tvs-ripple
**Demo duomenys:** dokumentas: 2023 m. III ketvirčio finansinė ataskaita
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-redagavimo-piestukas--sc03_027.5.jpg`
**Komentaras:** epizodas `ep_679_02_1` · dalis `dal_679_02` „Kaip pasiekti dokumento valdymo aplinką?“ · prioritetas 2 · pagrindas: dal_679_02 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 02

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Dokumento eilutėje spaudžiate pieštuko ikoną. |
| 2.2 | garsas | spustelejimas |
| 4.7 | balsas | Atsiveria to dokumento valdymo aplinka. |

### KADRAS 4: Dokumentą randate svetainės paieška (17 sek.) — epizodas
**Failas:** `03-dokumentu-puslapis.png`
**Ekrane:** Svetainės puslapis „Dokumentai“: dešinėje kategorijų medis, viduryje lentelė. Kursorius spusteli lauką „Ieškoti dokumentų“, įrašo pavadinimo dalį, ir lentelė susitraukia iki vienos eilutės.
**Ekrano užrašai (tiksliai):** „Dokumentai“, „Ieškoti dokumentų“, „VISI FAILAI“, „NUOSTATAI“, „TVARKOS“, „Atnaujinta“
**TVS UI komponentai:** tvs-site, tvs-site-h, tvs-site-doc, tvs-searchbar, tvs-input, tvs-cursor
**Demo duomenys:** mokykla: Demo mokykla, dokumentas: gimnazijos-nuostatai.pdf
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-dokumentu-puslapis--sc04_037.3.jpg`
**Komentaras:** epizodas `ep_679_03_1` · dalis `dal_679_03` „Puslapis „Dokumentai““ · prioritetas 2 · pagrindas: dal_679_03 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 03

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Svetainėje puslapis „Dokumentai“ rodo visus įstaigos dokumentus. |
| 6.4 | balsas | Dešinėje matote kategorijų sąrašą. |
| 9.3 | balsas | Viršuje įrašote pavadinimo dalį. |
| 10.3 | garsas | rasymas |
| 12.0 | balsas | Sąrašas susiaurėja iki ieškomo dokumento. |

### KADRAS 5: Pavadinimas, aprašymas ir URL (21 sek.) — epizodas
**Failas:** `06-pavadinimas-aprasymas-url.png`
**Ekrane:** Dokumento forma; po vieną pažymimi laukai „Pavadinimas“, „URL“ ir „Aprašymas“. Į „Pavadinimas“ įrašomas pilnas pavadinimas, į „Aprašymas“ – bendruomenėje paplitęs trumpinys; laukas „URL“ lieka tuščias ir prie jo išnyra išorinės duombazės ženklas.
**Ekrano užrašai (tiksliai):** „Pavadinimas“, „URL“, „Aprašymas“, „Įkėlimas naudojant url“
**TVS UI komponentai:** tvs-main, tvs-input, tvs-cursor
**Demo duomenys:** pavadinimas: Mokinių pasiekimų ir pažangos vertinimo tvarkos aprašas, aprasymas: Pažangos vertinimo tvarka
**Tarimo kandidatai:** URL (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/06-pavadinimas-aprasymas-url--sc10_082.0.jpg`
**Komentaras:** epizodas `ep_679_06_1` · dalis `dal_679_06` „Dokumento pavadinimas“ · prioritetas 2 · pagrindas: dal_679_06 paaiškinimas; dal_679_06 įspėjimas; scenos yt-eQ4FA_GexN8: skyrius 06

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lauke „Pavadinimas“ rašote pilną dokumento pavadinimą. |
| 2.6 | garsas | rasymas |
| 5.7 | balsas | Bendruomenėje paplitusį pavadinimą rašote langelyje „Aprašymas“. |
| 10.9 | balsas | Taip dokumentą lengviau rasti paieškoje. |
| 14.2 | balsas | Laukas „URL“ skirtas išorinėje duombazėje esančiam dokumentui. |

### KADRAS 6: Failą įkeliate mygtuku Upload (11 sek.) — epizodas
**Failas:** `07-failo-ikelimas.png`
**Ekrane:** Dokumento įrašo laukas „Failas“: kursorius spaudžia mėlyną „Select File“, trumpam atsiveria failų langas, tada spaudžiamas žalias „Upload“ ir po lauku atsiranda PDF failo eilutė su dydžiu ir tipu.
**Ekrano užrašai (tiksliai):** „Failas“, „Select File“, „Upload“, „application/pdf“
**TVS UI komponentai:** tvs-main, tvs-btn, tvs-file, tvs-cursor, tvs-ripple
**Demo duomenys:** failas: gimnazijos-nuostatai.pdf
**Tarimo kandidatai:** Select File, Upload (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/07-failo-ikelimas--sc12_101.7.jpg`
**Komentaras:** epizodas `ep_679_07_1` · dalis `dal_679_07` „Dokumento įkėlimas ir priskyrimas kategorijai“ · prioritetas 1 · pagrindas: dal_679_07 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 07

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Spaudžiate „Select File“ ir pasirenkate failą. |
| 2.2 | garsas | spustelejimas |
| 4.8 | balsas | Tada spaudžiate žalią mygtuką „Upload“. |
| 6.0 | garsas | patvirtinimas |
| 8.1 | balsas | Failas atsiranda įraše. |

### KADRAS 7: Dokumentą priskiriate kategorijai (13 sek.) — epizodas
**Failas:** `07-kategorijos-priskyrimas.png`
**Ekrane:** Laukas „Kategorijos“: kursorius spusteli lauką, įrašomos kelios raidės, iškrenta pasiūlymas ir virsta mėlyna žyma. Tas pats pakartojama antrai kategorijai – lauke lieka dvi žymos.
**Ekrano užrašai (tiksliai):** „Kategorijos“, „Nuostatai“, „Tvarkų aprašai“
**TVS UI komponentai:** tvs-main, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** kategorija_1: Nuostatai, kategorija_2: Tvarkų aprašai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/07-kategorijos-priskyrimas--sc12_101.7.jpg`
**Komentaras:** epizodas `ep_679_07_2` · dalis `dal_679_07` „Dokumento įkėlimas ir priskyrimas kategorijai“ · prioritetas 2 · pagrindas: dal_679_07 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 07

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Eilutėje „Kategorijos“ pradedate rašyti kategoriją. |
| 2.4 | garsas | rasymas |
| 5.4 | balsas | Pasirenkate ją iš pasiūlymų. |
| 6.6 | garsas | spustelejimas |
| 8.2 | balsas | Vienas dokumentas gali turėti ne vieną kategoriją. |

### KADRAS 8: Sukuriate naują kategoriją (14 sek.) — epizodas
**Failas:** `08-nauja-kategorija.png`
**Ekrane:** Kategorijų sąrašas; kursorius spaudžia žalią „+ Sukurti“ ir atsiveria forma. Įrašomas „Pavadinimas“, „Slug“ užsipildo pats, spaudžiamas „Išsaugoti“, o sąraše atsiranda nauja eilutė su savo numeriu.
**Ekrano užrašai (tiksliai):** „Sukurti“, „Pavadinimas“, „Slug“, „Išsaugoti“, „Kategorijos“
**TVS UI komponentai:** tvs-side, tvs-crumb, tvs-btn, tvs-input, tvs-cursor, tvs-ripple
**Demo duomenys:** kategorija: Biudžeto vykdymo ataskaitų rinkiniai
**Tarimo kandidatai:** Slug (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/08-nauja-kategorija--klik02_073.8.jpg`, `nuorodos/08-nauja-kategorija--sc13_128.5.jpg`
**Komentaras:** epizodas `ep_679_08_1` · dalis `dal_679_08` „Kategorijų sąrašas“ · prioritetas 2 · pagrindas: dal_679_08 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 08; scenos yt-kguHnB8i9ps: skyrius 02 (formos laukai)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kategorijų sąraše spaudžiate žalią mygtuką „Sukurti“. |
| 2.4 | garsas | spustelejimas |
| 5.6 | balsas | Įrašote pavadinimą, o „Slug“ susikuria pats. |
| 6.8 | garsas | rasymas |
| 9.3 | balsas | Išsaugojus kategorija atsiranda sąraše. |

### KADRAS 9: Kategoriją užrakinate slaptažodžiu (13 sek.) — epizodas
**Failas:** `09-kategorijos-uzrakinimas.png`
**Ekrane:** Kategorijos forma, kamera ties lauku „Password“; įrašomas slaptažodis be lietuviškų raidžių ir spaudžiamas „Atnaujinti“. Ekranas persijungia į svetainę, kur tos kategorijos eilutėse atsisiuntimo ikonos virsta spynomis.
**Ekrano užrašai (tiksliai):** „Password“, „Slėpti kategoriją“, „Atnaujinti“
**TVS UI komponentai:** tvs-main, tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** slaptazodis: bananas, kategorija: Prašymai
**Tarimo kandidatai:** Password (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/09-kategorijos-uzrakinimas--sc14_138.8.jpg`, `nuorodos/09-kategorijos-uzrakinimas--sc48_521.1.jpg`
**Komentaras:** epizodas `ep_679_09_1` · dalis `dal_679_09` „Kategorijos užrakinimas ir paslėpimas“ · prioritetas 2 · pagrindas: dal_679_09 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 09; scenos yt-kguHnB8i9ps: skyrius 09 (mygtukas „Atnaujinti“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Lauke „Password“ įrašote slaptažodį be lietuviškų raidžių. |
| 2.4 | garsas | rasymas |
| 5.8 | balsas | Spaudžiate „Atnaujinti“. |
| 6.6 | garsas | patvirtinimas |
| 7.9 | balsas | Svetainėje prie dokumentų atsiranda spyna. |

### KADRAS 10: Kategoriją paslepiate iš sąrašo (10 sek.) — epizodas
**Failas:** `09-kategorijos-slepimas.png`
**Ekrane:** Kategorijos forma ties jungikliu „Slėpti kategoriją“: kursorius perjungia jį iš „No“ į „Yes“, po juo sumirksi paaiškinimas. Spaudžiamas „Atnaujinti“ ir kategorijų sąraše eilutė dingsta.
**Ekrano užrašai (tiksliai):** „Slėpti kategoriją“, „Paslėpta kategorija nebus rodoma“, „Atnaujinti“
**TVS UI komponentai:** tvs-main, tvs-check, tvs-btn, tvs-cursor
**Demo duomenys:** kategorija: Prašymai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/09-kategorijos-slepimas--sc14_138.8.jpg`
**Komentaras:** epizodas `ep_679_09_2` · dalis `dal_679_09` „Kategorijos užrakinimas ir paslėpimas“ · prioritetas 3 · pagrindas: dal_679_09 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 09

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Įjungiate „Slėpti kategoriją“. |
| 1.8 | garsas | spustelejimas |
| 3.6 | balsas | Spaudžiate „Atnaujinti“. |
| 4.4 | garsas | patvirtinimas |
| 5.7 | balsas | Bendrame kategorijų sąraše jos nebelieka. |

### KADRAS 11: Užrakintą kategoriją atrakinate slaptažodžiu (16 sek.) — epizodas
**Failas:** `10-uzrakintos-atrakinimas.png`
**Ekrane:** Svetainės dokumentų lentelė, kurios eilutėse vietoje atsisiuntimo ikonų – spynos. Kursorius spusteli spyną, po eilute išsiskleidžia slaptažodžio laukas ir mygtukas „Atrakinti“; įvedus slaptažodį spynos virsta atsisiuntimo ikonomis.
**Ekrano užrašai (tiksliai):** „Nuostatai“, „ATRAKINTI“, „Atnaujinta“, „Dydis“
**TVS UI komponentai:** tvs-site, tvs-site-doc, tvs-table, tvs-input, tvs-btn, tvs-cursor
**Demo duomenys:** slaptazodis: bananas, kategorija: Nuostatai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/10-uzrakintos-atrakinimas--sc15_159.1.jpg`
**Komentaras:** epizodas `ep_679_10_1` · dalis `dal_679_10` „Užrakintų dokumentų atsisiuntimas“ · prioritetas 2 · pagrindas: dal_679_10 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 10

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Užrakintų kategorijų dokumentai lieka matomi. |
| 4.9 | balsas | Vietoje atsisiuntimo ikonos matote spyną. |
| 8.3 | balsas | Įvedate slaptažodį ir spaudžiate „Atrakinti“. |
| 9.3 | garsas | patvirtinimas |
| 12.0 | balsas | Sistema jį kurį laiką atsimins. |

### KADRAS 12: Paieška ir kategorijų filtras (16 sek.) — epizodas
**Failas:** `11-paieska-ir-filtras.png`
**Ekrane:** TVS dokumentų sąrašas: kursorius įrašo raktažodį lauke „Paieška“, gretimame lauke pasirenka kategoriją ir spaudžia žalią „Filtruoti“ – sąrašas susitraukia. Pabaigoje spaudžiamas „Valyti“ ir sąrašas vėl pilnas.
**Ekrano užrašai (tiksliai):** „Paieška“, „Kategorijos“, „Filtruoti“, „Valyti“, „Pavadinimas“, „Failas“
**TVS UI komponentai:** tvs-main, tvs-filter, tvs-input, tvs-btn, tvs-table, tvs-cursor
**Demo duomenys:** raktazodis: tvarka, kategorija: Tvarkų aprašai
**Tarimo kandidatai:** Enter (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/11-paieska-ir-filtras--sc17_184.2.jpg`
**Komentaras:** epizodas `ep_679_11_1` · dalis `dal_679_11` „Dokumentų sąrašas“ · prioritetas 2 · pagrindas: dal_679_11 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 11

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lauke „Paieška“ įrašote raktažodį. |
| 2.4 | garsas | rasymas |
| 4.4 | balsas | Šalia pasirenkate kategoriją. |
| 6.9 | balsas | Paieška veikia paspaudus „Enter“ arba „Filtruoti“. |
| 8.1 | garsas | spustelejimas |
| 11.0 | balsas | Mygtukas „Valyti“ grąžina pilną sąrašą. |

### KADRAS 13: Dokumento ID adreso eilutėje (14 sek.) — epizodas
**Failas:** `12-dokumento-id.png`
**Ekrane:** Dokumento įrašas; kamera pakyla į naršyklės adreso eilutę, kurioje paskutinis skaičius po „edit/“ pažymimas ir nukopijuojamas. Šalia trumpam sumirksi kategorijų sąrašas, kuriame prie kiekvienos kategorijos stovi jos numeris.
**Ekrano užrašai (tiksliai):** „edit/746“, „Pavadinimas“, „Dokumentų banko modulis“
**TVS UI komponentai:** tvs-window, tvs-top, tvs-crumb, tvs-cursor
**Demo duomenys:** id: 746
**Tarimo kandidatai:** ID (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/12-dokumento-id--sc18_203.1.jpg`, `nuorodos/12-dokumento-id--sc13_128.5.jpg`
**Komentaras:** epizodas `ep_679_12_1` · dalis `dal_679_12` „Dokumento ID“ · prioritetas 2 · pagrindas: dal_679_12 paaiškinimas; scenos yt-eQ4FA_GexN8: skyriai 12, 08

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kiekvieno dokumento ID yra unikalus. |
| 4.5 | balsas | Jį rasite naršyklės adreso eilutėje. |
| 5.7 | garsas | spustelejimas |
| 7.5 | balsas | ID prireikia naudojant dokumentų įterpimo funkcijas. |

### KADRAS 14: Nustatote dokumento patikrinimo datą (15 sek.) — epizodas
**Failas:** `13-patikrinimo-data.png`
**Ekrane:** Dokumento forma ties laukais „Patikrinimo data“ ir „Patikrinimo komentaras“: pasirenkama data ateityje, įrašomas komentaras, spaudžiamas „Atnaujinti“. Ekranas persijungia į darbalaukio kortelę „Dokumentų priminimai“, kurioje eilutė įsižiebia raudonai.
**Ekrano užrašai (tiksliai):** „Patikrinimo data“, „Patikrinimo komentaras“, „Dokumentų priminimai“, „Atnaujinti“
**TVS UI komponentai:** tvs-main, tvs-input, tvs-btn, tvs-cursor
**Demo duomenys:** komentaras: Pakeisti prieš naujus mokslo metus, data: 2027-04-20 12:00
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/13-patikrinimo-data--sc19_215.8.jpg`, `nuorodos/13-patikrinimo-data--sc20_226.4.jpg`
**Komentaras:** epizodas `ep_679_13_1` · dalis `dal_679_13` „Priminimas“ · prioritetas 2 · pagrindas: dal_679_13 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 13

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Lauke „Patikrinimo data“ pasirenkate datą ateityje. |
| 2.6 | garsas | spustelejimas |
| 5.4 | balsas | Komentarą rašote tokį, kad suprastumėte ir po metų. |
| 6.8 | garsas | rasymas |
| 9.6 | balsas | Darbalaukyje priminimas pasirodys mėnesiu anksčiau. |

### KADRAS 15: Dokumentus perrikiuojate kategorijoje (18 sek.) — epizodas
**Failas:** `14-dokumentu-rikiavimas.png`
**Ekrane:** TVS dokumentų sąrašas: kursorius pasirenka kategoriją filtre ir spaudžia „Filtruoti“; eilučių kairėje atsiranda kryžiukai. Dokumentas sugriebiamas už kryžiuko, nuvelkamas aukštyn ir nukrenta; apačioje sumirksi žalias „Perrikiuoti“ ir jis paspaudžiamas.
**Ekrano užrašai (tiksliai):** „Filtruoti“, „Perrikiuoti“, „Nuostatai >> Taisyklės“, „Pavadinimas“
**TVS UI komponentai:** tvs-main, tvs-filter, tvs-row, tvs-handle, tvs-btn, tvs-cursor
**Demo duomenys:** kategorija: Nuostatai >> Taisyklės
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/14-dokumentu-rikiavimas--sc21_241.6.jpg`, `nuorodos/14-dokumentu-rikiavimas--sc17_185.4.jpg`
**Komentaras:** epizodas `ep_679_14_1` · dalis `dal_679_14` „Dokumentų rikiavimas“ · prioritetas 1 · pagrindas: dal_679_14 paaiškinimas; dal_679_14 įspėjimas; scenos yt-eQ4FA_GexN8: skyrius 14; scenos yt-kguHnB8i9ps: skyrius 05 (mygtukas „Perrikiuoti“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Filtre pasirenkate kategoriją arba subkategoriją. |
| 2.6 | garsas | spustelejimas |
| 5.3 | balsas | Sąrašo kairėje atsiranda rikiavimui skirtas kryžiukas. |
| 9.8 | balsas | Tempiate dokumentą į naują poziciją. |
| 10.8 | garsas | paemimas |
| 12.0 | garsas | numetimas |
| 13.2 | balsas | Baigę spaudžiate žalią mygtuką „Perrikiuoti“. |
| 14.6 | garsas | patvirtinimas |

### KADRAS 16: Sintaksę nukopijuojate vienu paspaudimu (8 sek.) — epizodas
**Failas:** `15-sintakses-kopijavimas.png`
**Ekrane:** Dokumentų sąrašo stulpeliai „Failas“ ir „Kategorijos“: prie kiekvienos sintaksės stovi violetinis mygtukas. Kursorius jį spusteli, mygtukas sumirksi, o sintaksė nuskrenda į iškarpinės ženklą viršuje.
**Ekrano užrašai (tiksliai):** „Failas“, „Kategorijos“, „{{dokumentubankas_file(704)}}“
**TVS UI komponentai:** tvs-table, tvs-row, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** kategorija: Nuostatai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/15-sintakses-kopijavimas--sc23_272.2.jpg`
**Komentaras:** epizodas `ep_679_15_1` · dalis `dal_679_15` „Dokumento įterpimo sintaksės“ · prioritetas 2 · pagrindas: dal_679_15 paaiškinimas; scenos yt-eQ4FA_GexN8: skyrius 15

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Sintakses rasite dokumentų sąraše. |
| 2.0 | garsas | spustelejimas |
| 3.9 | balsas | Prie jos spaudžiate violetinį mygtuką. |
