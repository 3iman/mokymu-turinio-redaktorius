# Video scenarijus: Pasikartojančios klaidos — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 2495380223 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 205 sek. (15 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_676` · senoji WP pamoka `pasikartojancios-klaidos`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Pavieniui ar rinkiniu | 14 sek. | 01-rinkinio-sintakse | Kiekvienam dokumentui įterpiate po atskirą sintaksę. Rinkinio sintaksę įterpiate tik kartą. Naujam dokumentui užtenka priskirti kategoriją. |
| 2 Metai pavadinimo priekyje | 14 sek. | 02-metai-priekyje | Kai metai kartais gale, kartais priekyje, sąrašas pakrinka. Metus ir ketvirčius rašote pavadinimo priekyje. Tada dokumentai sugula tvarkingai. |
| 3 Dokumentui privaloma kategorija | 14 sek. | 03-kategorija-privaloma | Įkėlus dokumentą be kategorijos, jo nesimato dokumentų puslapyje. Įkeldami pasirenkate konkrečią kategoriją. Tinkamos nerandate – sukuriate naują. |
| 4 Dokumentų banko priežiūra | 14 sek. | 04-banko-prieziura | Dokumentus peržiūrite iškart po perkėlimo į naują svetainę. Pasenusius pašalinate. Visą banką sutvarkote bent kartą per metus. |
| 5 Be mokyklos pavadinimo | 13 sek. | 05-be-mokyklos-pavadinimo | Ilgas mokyklos pavadinimas priekyje apsunkina sąrašo nuskaitymą. Dokumentai ir taip yra jūsų svetainėje. Pavadinime jo nerašote. |
| 6 Ketvirčiai be atskirų kategorijų | 15 sek. | 06-ketvirciai-be-kategoriju | Atskiros kategorijos metams ir ketvirčiams tik apsunkina darbą. Metus ir ketvirčius rašote pavadinimų priekyje. Iš kelių dokumentų sudedate archyvą. |
| 7 Nuoroda ar grotuvas | 13 sek. | 01-nuoroda-ar-grotuvas | Pilna „YouTube“ nuoroda išveda skaitytoją iš svetainės. Vaizdo įrašą įterpiate grotuvo funkcija. Tada skaitytojas lieka pas jus. |
| 8 Prastos kokybės nuotraukos | 13 sek. | 02-prastos-nuotraukos | Mažų, blankių ar išsiliejusių nuotraukų netalpinate. Netinka ir keliančios neigiamas emocijas. Grąžinate ir prašote tinkamesnės. |
| 9 Antraštės palengvina skaitymą | 13 sek. | 03-antrastes-palengvina-skaityma | Vientisa teksto paklodė atbaido skaitytoją. Ilgesnį tekstą dalijate teminėmis pastraipomis. Kiekvienai duodate savo antraštę. |
| 10 Formatavimo stiliaus šiukšlės | 14 sek. | 04-formatavimo-siuksles | Neįprasti šriftai, spalvos ir keisti tarpai krinta į akis. Pastebėję juos, iš karto pataisote. Skaitytojai jautriai reaguoja į neapdairumą. |
| 11 Plakatas ar tekstas | 15 sek. | 06-plakatas-ar-tekstas | Plakate surašyto teksto neperskaito neregių programos. Nenuskaito jo ir paieškos robotai. Kvietimą surašote tekstu, akcentus sudedate antraštėmis. |
| 12 Kur rodyti atnaujinimo datą | 13 sek. | 07-atnaujinimo-data | Atnaujinimo datą rodote tik ten, kur informacija kinta. Tinkamas pavyzdys – „Priėmimas į mokyklą“. Visuose puslapiuose jos nereikia. |
| 13 Nuorodų pavadinimai | 14 sek. | 08-nuorodu-pavadinimai | Iš naršyklės nukopijuotos nuorodos neįsiminsite. Nuorodos pavadinimas turi pasakyti, kas joje. Vengiate „Spausk čia“ ir „Žiūrėk čia“. |
| 14 Nuorodų patikra | 13 sek. | 09-nuorodu-patikra | Patikrinate, ar kiekviena nuoroda dar veikia. Tada – ar ji aktuali ir naudinga. Pradedate nuo „Karjeros specialisto“ polapio. |
| 15 Nuoroda atsidaro naujame lange | 13 sek. | 10-nuoroda-naujame-lange | Pažymite nuorodą į kitą svetainę. Nuorodos lange pasirenkate atidarymą naujame lange. Svetainėje ji atsidaro antrame skirtuke. |

---

## Kadrai

### KADRAS 1: Pavieniui ar rinkiniu (14 sek.) — koncepcija
**Failas:** `01-rinkinio-sintakse.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas „palyginimas“: kairėje „Talpinami pavieniui“ – trys dokumentai, prie kiekvieno po atskirą sintaksės kortelę. Dešinėje „Dokumentų rinkinio sintaksė“ – viena kortelė, o po ja dokumentai patys sugula į lentelę, kai gauna kategorijos žymą. Pabaigoje į dešinę pusę įkrenta ketvirtas dokumentas ir lentelė išauga be jokio papildomo veiksmo.
**Ekrano užrašai (tiksliai):** „Talpinami pavieniui“, „Po atskirą sintaksę“, „Dokumentų rinkinio sintaksė“, „Įterpiama tik kartą“, „Planavimo dokumentai“
**TVS UI komponentai:** —
**Demo duomenys:** kategorija: Planavimo dokumentai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_676_01` · dalis `dal_676_01` „Tos pačios kategorijos dokumentai talpinami pavieniui“ · prioritetas 2 · pagrindas: dal_676_01 paaiškinimas; viz_676_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kiekvienam dokumentui įterpiate po atskirą sintaksę. |
| 5.5 | balsas | Rinkinio sintaksę įterpiate tik kartą. |
| 8.7 | balsas | Naujam dokumentui užtenka priskirti kategoriją. |

### KADRAS 2: Metai pavadinimo priekyje (14 sek.) — koncepcija
**Failas:** `02-metai-priekyje.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, dont_title, dont_1, dont_2
**Ekrane:** Šablonas „taisyklingai_netaisyklingai“: kairėje ✗ kortelė „Nenuosekliai“ – trys pavadinimai, kuriuose metai šokinėja iš galo į priekį, vienur su „m.“, kitur be jo. Dešinėje ✓ kortelė „Nuosekliai“ – tie patys trys pavadinimai metais priekyje; eilutės persirikiuoja į tvarkingą seką.
**Ekrano užrašai (tiksliai):** „Nenuosekliai“, „Nuosekliai“, „Metai, ketvirčiai priekyje“, „2023 m. I ketvirtis“
**TVS UI komponentai:** —
**Demo duomenys:** dokumentas: 2023 m. I ketvirčio finansinė ataskaita
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_676_02` · dalis `dal_676_02` „Trūksta nuoseklumo dokumentų pavadinimuose“ · prioritetas 2 · pagrindas: dal_676_02 paaiškinimas; viz_676_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Kai metai kartais gale, kartais priekyje, sąrašas pakrinka. |
| 6.2 | balsas | Metus ir ketvirčius rašote pavadinimo priekyje. |
| 10.1 | balsas | Tada dokumentai sugula tvarkingai. |

### KADRAS 3: Dokumentui privaloma kategorija (14 sek.) — koncepcija
**Failas:** `03-kategorija-privaloma.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, dont_title, dont_1, dont_2, dont_3, do_title, do_1, do_2, summary
**Ekrane:** Šablonas „taisyklingai_netaisyklingai“: kairėje ✗ „Klaida“ – dokumentas įkeliamas tuščiu kategorijos lauku ir dingsta iš visų dokumentų puslapio. Dešinėje ✓ „Teisingai“ – tas pats dokumentas gauna kategorijos žymą ir atsiranda sąraše. Pabaigoje prie dešinės kortelės išnyra mygtukas naujai kategorijai sukurti.
**Ekrano užrašai (tiksliai):** „Klaida“, „Be kategorijos“, „Teisingai“, „Konkreti kategorija“, „Nuostatai“
**TVS UI komponentai:** —
**Demo duomenys:** dokumentas: gimnazijos-nuostatai.pdf, kategorija: Nuostatai
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_676_03` · dalis `dal_676_03` „Dokumentas nepriskiriamas kategorijai“ · prioritetas 1 · pagrindas: dal_676_03 paaiškinimas; viz_676_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Įkėlus dokumentą be kategorijos, jo nesimato dokumentų puslapyje. |
| 6.7 | balsas | Įkeldami pasirenkate konkrečią kategoriją. |
| 10.2 | balsas | Tinkamos nerandate – sukuriate naują. |

### KADRAS 4: Dokumentų banko priežiūra (14 sek.) — koncepcija
**Failas:** `04-banko-prieziura.png`
**Šablonas:** `zingsniai` · laukai: title, step1_num, step1_label, step1_desc, step2_num, step2_label, step2_desc, step3_num, step3_label, step3_desc, step4_note
**Ekrane:** Šablonas „zingsniai“: trys numeruoti žingsniai atsiranda vienas po kito ant laiko juostos – „Iškart po perkėlimo“, „Pašalinkite“, „Kartą per metus“. Prie antro žingsnio iš sąrašo iškrenta dvi pilkos eilutės. Apačioje lieka eilutė „Tvarka priklauso nuo jūsų“.
**Ekrano užrašai (tiksliai):** „Iškart po perkėlimo“, „Pašalinate“, „Kartą per metus“, „Tvarka priklauso nuo jūsų“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_676_04` · dalis `dal_676_04` „Dokumentų bankas neprižiūrimas“ · prioritetas 2 · pagrindas: dal_676_04 paaiškinimas; viz_676_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Dokumentus peržiūrite iškart po perkėlimo į naują svetainę. |
| 6.2 | balsas | Pasenusius pašalinate. |
| 8.4 | balsas | Visą banką sutvarkote bent kartą per metus. |

### KADRAS 5: Be mokyklos pavadinimo (13 sek.) — koncepcija
**Failas:** `05-be-mokyklos-pavadinimo.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, dont_title, dont_1, dont_2
**Ekrane:** Šablonas „taisyklingai_netaisyklingai“: kairėje ✗ sąrašas, kuriame visos eilutės prasideda tuo pačiu ilgu mokyklos vardu ir atrodo vienodai. Dešinėje ✓ tas pats sąrašas – mokyklos vardas iš kiekvienos eilutės ištirpsta ir skirtumai tampa matomi iš karto.
**Ekrano užrašai (tiksliai):** „Ne“, „Taip“, „Demo mokyklos nuostatai“, „Nuostatai“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_676_05` · dalis `dal_676_05` „Dokumentuose minimas mokyklos pavadinimas“ · prioritetas 2 · pagrindas: dal_676_05 paaiškinimas; viz_676_05 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Ilgas mokyklos pavadinimas priekyje apsunkina sąrašo nuskaitymą. |
| 6.6 | balsas | Dokumentai ir taip yra jūsų svetainėje. |
| 9.9 | balsas | Pavadinime jo nerašote. |

### KADRAS 6: Ketvirčiai be atskirų kategorijų (15 sek.) — koncepcija
**Failas:** `06-ketvirciai-be-kategoriju.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas „palyginimas“: kairėje „Atskiros kategorijos“ – medis, kuriame po kategorija kabo metai, o po metų keturi ketvirčiai. Dešinėje „Viena kategorija“ – vienas sąrašas, kuriame metai ir ketvirtis stovi pavadinimų priekyje. Medžio šakos susitraukia į vieną eilutę, apačioje atsiranda ZIP archyvo ikona.
**Ekrano užrašai (tiksliai):** „Atskiros kategorijos“, „Viena kategorija“, „Metai, ketvirčiai priekyje“, „ZIP archyvas“
**TVS UI komponentai:** —
**Demo duomenys:** kategorija: Veiklos ataskaitos
**Tarimo kandidatai:** ZIP (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_676_06` · dalis `dal_676_06` „Kuriamos kategorijos atskiriems ketvirčiams“ · prioritetas 2 · pagrindas: dal_676_06 paaiškinimas; viz_676_06 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Atskiros kategorijos metams ir ketvirčiams tik apsunkina darbą. |
| 6.6 | balsas | Metus ir ketvirčius rašote pavadinimų priekyje. |
| 10.5 | balsas | Iš kelių dokumentų sudedate archyvą. |

### KADRAS 7: Nuoroda ar grotuvas (13 sek.) — koncepcija
**Failas:** `01-nuoroda-ar-grotuvas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, summary
**Ekrane:** Šablonas `palyginimas`: kairėje raudonoje kortelėje – pilna „YouTube“ nuoroda, nuo jos skaitytojo figūrėlė iškeliauja pro svetainės lango kraštą; dešinėje žalioje tas pats įrašas groja įdėtame grotuve, o figūrėlė lieka puslapyje. Pabaigoje po abiem kortelėmis užsidega eilutė apie riziką netekti skaitytojo.
**Ekrano užrašai (tiksliai):** „Nuoroda“, „Grotuvas“, „Skaitytojas išeina“, „Skaitytojas lieka“
**TVS UI komponentai:** —
**Demo duomenys:** irasas: Demo mokyklos šventės įrašas
**Tarimo kandidatai:** YouTube, Vimeo (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_699_01` · dalis `dal_699_01` „Vaizdo įrašai įkeliami kaip nuoroda“ · prioritetas 2 · pagrindas: dal_699_01 paaiškinimas; viz_699_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Pilna „YouTube“ nuoroda išveda skaitytoją iš svetainės. |
| 5.9 | balsas | Vaizdo įrašą įterpiate grotuvo funkcija. |
| 9.2 | balsas | Tada skaitytojas lieka pas jus. |

### KADRAS 8: Prastos kokybės nuotraukos (13 sek.) — koncepcija
**Failas:** `02-prastos-nuotraukos.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, dont_title, dont_1, dont_2, dont_3, dont_4, do_title, do_1, do_2, do_3
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: raudonoje kortelėje keturios nuotraukos – maža, blanki, išsiliejusi ir niūri; žalioje ta pati nuotrauka ryški ir pilno dydžio, o po ja – rodyklė atgal su užrašu „Grąžinkite nuotrauką“. Blogosios po vieną pritemsta.
**Ekrano užrašai (tiksliai):** „Netalpinate“, „Mažų“, „Blankių“, „Išsiliejusių“, „Grąžinate nuotrauką“
**TVS UI komponentai:** —
**Demo duomenys:** nuotrauka: Demo mokyklos šventė
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_699_02` · dalis `dal_699_02` „Prastos kokybės nuotraukos“ · prioritetas 2 · pagrindas: dal_699_02 paaiškinimas; viz_699_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.3 | balsas | Mažų, blankių ar išsiliejusių nuotraukų netalpinate. |
| 5.7 | balsas | Netinka ir keliančios neigiamas emocijas. |
| 9.1 | balsas | Grąžinate ir prašote tinkamesnės. |

### KADRAS 9: Antraštės palengvina skaitymą (13 sek.) — koncepcija
**Failas:** `03-antrastes-palengvina-skaityma.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje raudonoje kortelėje – viena ilga pilka teksto paklodė; dešinėje žalioje tas pats tekstas subyra į tris teminius gabalus, kiekvienas su ryškia antrašte. Perėjimas animuojamas – paklodė atsiskiria į pastraipas.
**Ekrano užrašai (tiksliai):** „Teksto paklodė“, „Teminės pastraipos“, „Atskiros antraštės“, „Didesnis skaitomumas“
**TVS UI komponentai:** —
**Demo duomenys:** puslapis: Demo mokyklos istorija
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_699_03` · dalis `dal_699_03` „Nenaudojamos antraštės“ · prioritetas 2 · pagrindas: dal_699_03 paaiškinimas; viz_699_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Vientisa teksto paklodė atbaido skaitytoją. |
| 5.0 | balsas | Ilgesnį tekstą dalijate teminėmis pastraipomis. |
| 8.9 | balsas | Kiekvienai duodate savo antraštę. |

### KADRAS 10: Formatavimo stiliaus šiukšlės (14 sek.) — koncepcija
**Failas:** `04-formatavimo-siuksles.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, dont_title, dont_1, dont_2, dont_3, dont_4, do_title, do_1, do_2
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: raudonoje kortelėje tas pats sakinys rodomas keturis kartus – skirtingo dydžio ir storio šriftu, spalvotas ir su keistu atitraukimu; žalioje – vienodas tvarkingas tekstas. Netvarkingos vietos pažymimos ir po vieną nusivalo.
**Ekrano užrašai (tiksliai):** „Šiukšlės“, „Neįprasti šriftai“, „Spalvos“, „Keisti tarpai“, „Pataisote“
**TVS UI komponentai:** —
**Demo duomenys:** puslapis: Demo mokyklos naujiena
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_699_04` · dalis `dal_699_04` „Paliekamos formatavimo stiliaus šiukšlės“ · prioritetas 2 · pagrindas: dal_699_04 paaiškinimas; viz_699_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Neįprasti šriftai, spalvos ir keisti tarpai krinta į akis. |
| 6.2 | balsas | Pastebėję juos, iš karto pataisote. |
| 9.3 | balsas | Skaitytojai jautriai reaguoja į neapdairumą. |

### KADRAS 11: Plakatas ar tekstas (15 sek.) — koncepcija
**Failas:** `06-plakatas-ar-tekstas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje raudonoje kortelėje – informacinis plakatas kaip vientisas paveikslėlis, per jį perbraukiami ekrano skaitytuvo ir paieškos roboto ženklai; dešinėje žalioje tas pats kvietimas surinktas tekstu su antrašte ir data.
**Ekrano užrašai (tiksliai):** „Plakatas paveikslėlyje“, „Informacija tekstu“, „Akcentai antraštėmis“
**TVS UI komponentai:** —
**Demo duomenys:** kvietimas: Kviečiame į Šimtadienį
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_699_06` · dalis `dal_699_06` „Svarbi informacija skelbiama paveikslėlyje“ · prioritetas 2 · pagrindas: dal_699_06 paaiškinimas; viz_699_06 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Plakate surašyto teksto neperskaito neregių programos. |
| 5.9 | balsas | Nenuskaito jo ir paieškos robotai. |
| 8.8 | balsas | Kvietimą surašote tekstu, akcentus sudedate antraštėmis. |

### KADRAS 12: Kur rodyti atnaujinimo datą (13 sek.) — koncepcija
**Failas:** `07-atnaujinimo-data.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: žalioje kortelėje – puslapis „Priėmimas į mokyklą“ su atnaujinimo data apačioje; raudonoje – trys puslapiai, kurių turinys nesikeičia, ir ta pati data po kiekvienu. Raudonos pusės datos pritemsta.
**Ekrano užrašai (tiksliai):** „Rodote“, „Periodiškai kintanti informacija“, „Nepersistengiate“, „Visuose puslapiuose“
**TVS UI komponentai:** —
**Demo duomenys:** puslapis: Priėmimas į mokyklą
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_699_07` · dalis `dal_699_07` „Atnaujinimo data naudojama netinkamai“ · prioritetas 3 · pagrindas: dal_699_07 paaiškinimas; viz_699_07 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Atnaujinimo datą rodote tik ten, kur informacija kinta. |
| 6.1 | balsas | Tinkamas pavyzdys – „Priėmimas į mokyklą“. |
| 9.6 | balsas | Visuose puslapiuose jos nereikia. |

### KADRAS 13: Nuorodų pavadinimai (14 sek.) — koncepcija
**Failas:** `08-nuorodu-pavadinimai.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, dont_title, dont_1, dont_2, dont_3
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: raudonoje kortelėje – ilga iš naršyklės nukopijuota nuoroda ir dvi nuorodos „Spausk čia“, „Žiūrėk čia“; žalioje – ta pati nuoroda su aiškiu pavadinimu, kuris pasako, kas už jos. Kursorius užveda ant aiškaus pavadinimo.
**Ekrano užrašai (tiksliai):** „Aiškus pavadinimas“, „Nusako, kas nuorodoje“, „„Spausk čia““, „„Žiūrėk čia““
**TVS UI komponentai:** —
**Demo duomenys:** nuoroda: Elektroninis dienynas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_699_08` · dalis `dal_699_08` „Netinkami nuorodų pavadinimai“ · prioritetas 2 · pagrindas: dal_699_08 paaiškinimas; viz_699_08 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Iš naršyklės nukopijuotos nuorodos neįsiminsite. |
| 5.4 | balsas | Nuorodos pavadinimas turi pasakyti, kas joje. |
| 9.1 | balsas | Vengiate „Spausk čia“ ir „Žiūrėk čia“. |

### KADRAS 14: Nuorodų patikra (13 sek.) — koncepcija
**Failas:** `09-nuorodu-patikra.png`
**Šablonas:** `zingsniai` · laukai: title, step1_num, step1_label, step1_desc, step2_num, step2_label, step2_desc, step3_num, step3_label, step3_desc, step4_num, step4_label, step4_desc
**Ekrane:** Šablonas `zingsniai`: trys numeruoti langeliai vienas po kito – „Ar veikia“, „Ar aktuali“, „Ar naudinga“; prie kiekvieno patikrinus užsidega varnelė. Ketvirtas langelis parodo, nuo kurio polapio pradėti.
**Ekrano užrašai (tiksliai):** „Ar veikia“, „Ar aktuali“, „Ar naudinga“, „„Karjeros specialisto“ polapis“
**TVS UI komponentai:** —
**Demo duomenys:** polapis: Karjeros specialistas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_699_09` · dalis `dal_699_09` „Neveikiančios nuorodos“ · prioritetas 2 · pagrindas: dal_699_09 paaiškinimas; viz_699_09 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Patikrinate, ar kiekviena nuoroda dar veikia. |
| 5.2 | balsas | Tada – ar ji aktuali ir naudinga. |
| 8.2 | balsas | Pradedate nuo „Karjeros specialisto“ polapio. |

### KADRAS 15: Nuoroda atsidaro naujame lange (13 sek.) — epizodas
**Failas:** `10-nuoroda-naujame-lange.png`
**Ekrane:** Lauke „Turinys“ pažymima nuoroda į kitą svetainę; kursorius atveria nuorodos nustatymų langą ir pažymi parinktį atidaryti naujame lange, tada išsaugo. Ekranas persijungia į svetainę: paspaudus nuorodą atsiveria antras naršyklės skirtukas, o mokyklos puslapis lieka pirmame.
**Ekrano užrašai (tiksliai):** „Turinys“, „Išsaugoti ir išeiti“
**TVS UI komponentai:** tvs-window, tvs-input, tvs-btn, tvs-cursor, tvs-ripple, tvs-site, naujas: nuorodos nustatymų langas
**Demo duomenys:** nuoroda: Elektroninis dienynas, adresas: https://dienynas.demo.lt/
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `ep_699_10_1` · dalis `dal_699_10` „Už svetainės ribų vedančios nuorodos“ · prioritetas 2 · pagrindas: dal_699_10 paaiškinimas

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Pažymite nuorodą į kitą svetainę. |
| 2.4 | garsas | spustelejimas |
| 4.2 | balsas | Nuorodos lange pasirenkate atidarymą naujame lange. |
| 5.6 | garsas | spustelejimas |
| 8.4 | balsas | Svetainėje ji atsidaro antrame skirtuke. |
| 9.4 | garsas | patvirtinimas |
