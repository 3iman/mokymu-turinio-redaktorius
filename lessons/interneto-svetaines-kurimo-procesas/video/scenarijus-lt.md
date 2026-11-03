# Video scenarijus: Interneto svetainės kūrimo procesas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 453315185 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 124 sek. (9 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_684` · senoji WP pamoka `interneto-svetaines-kurimo-procesas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Aštuoni kūrimo etapai | 14 sek. | 01-astuoni-etapai | Svetainė kuriama aštuoniais etapais. Pirmasis yra demo versija, kurią stebite visą projektą. Paskutinis yra startas. |
| 2 Perkėlimas vyksta vieną kartą | 13 sek. | 02-vienas-perkelimas | Turinį perkeliame rankiniu būdu ir vieną kartą. Vėlesnius atnaujinimus darote patys. Todėl padedate nepraleisti svarbių dalykų. |
| 3 Kaip siųsti turinį | 14 sek. | 03-kaip-siusti-turini | Turinį siunčiate taip, kad jo nereikėtų maketuoti. Atsakyme nurodote pastebėjimo numerį. Tekstų PDF ar JPG formatu nesiunčiate. |
| 4 Baigiamieji darbai | 14 sek. | 04-baigiamieji-darbai | Didiesiems darbams einant į pabaigą ateina smulkmenos. Importuojame banerius, naujienas ir darbuotojų sąrašą. Dabar grįžtate ir prie spalvų. |
| 5 Konsultacijai trisdešimt minučių | 12 sek. | 05-konsultacijos | Konsultacija trunka trisdešimt minučių. Nepasiruošus spėjame tik pagrindus. Peržiūrėję kursus klausiate svarbiausio. |
| 6 Turinio patvirtinimas prieš startą | 14 sek. | 06-turinio-patvirtinimas | Koordinatoriai apie visą turinį žino ne viską. Prieš startą svetainę parodote visam kolektyvui. Taip nepraleidžiate kam nors svarbaus turinio. |
| 7 Domeno nukreipimas | 16 sek. | 07-domeno-nukreipimas | Naują svetainės adresą sugalvojate jūs. Registracija ir prieglauda yra partnerio „Wolet“ darbas. Jei prieigos prie domeno neturite, pranešate iš karto. |
| 8 Išjungiate pranešimų juostelę | 13 sek. | 08-juosteles-isjungimas | Po starto išjungiate pranešimų juostelę. Įraše perjungiate rodymą ir išsaugote. Svetainės viršuje juostelės nebematote. |
| 9 Keturi darbai po starto | 14 sek. | 08-po-starto-darbai | Įsitikinate, kad senoji svetainė išjungta. Patikrinate adresą paieškos sistemose ir kataloguose. Pranešate bendruomenei ir išjungiate juostelę. |

---

## Kadrai

### KADRAS 1: Aštuoni kūrimo etapai (14 sek.) — koncepcija
**Failas:** `01-astuoni-etapai.png`
**Šablonas:** `naujas` · laukai: title, step1_label, step2_label, step3_label, step4_label, step5_label, step6_label, step7_label, step8_label
**Ekrane:** Šablonas `naujas` (laiko juosta): viena horizontali juosta su aštuoniais etapais; etapai šviečia iš eilės nuo „Demo versija“ iki „Startas“, o prie „Demo versija“ sumirksi laikinas svetainės adresas.
**Ekrano užrašai (tiksliai):** „Demo versija“, „Turinio perkėlimas“, „Turinio kokybė“, „Konsultacijos“, „Domeno nukreipimas“, „Startas“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_684_01` · dalis `dal_684_01` „Demo versija“ · prioritetas 2 · pagrindas: dal_684_01 paaiškinimas; viz_684_01 laukai (pamokos sekcijų pavadinimai)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Svetainė kuriama aštuoniais etapais. |
| 4.4 | balsas | Pirmasis yra demo versija, kurią stebite visą projektą. |
| 8.9 | balsas | Paskutinis yra startas. |

### KADRAS 2: Perkėlimas vyksta vieną kartą (13 sek.) — koncepcija
**Failas:** `02-vienas-perkelimas.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, old_step_3, new_title, new_step_1, summary
**Ekrane:** Šablonas `palyginimas`: kairėje kortelė „Perkėlimas“ su trimis eilutėmis ir ranka, kuri nešioja turinį; dešinėje „Vėliau“ su viena eilute ir mokyklos figūra. Kairė užsipildo pirma, tada rodyklė perduoda darbą į dešinę.
**Ekrano užrašai (tiksliai):** „Vyksta vieną kartą“, „Rankiniu būdu“, „Vėliau“, „Atnaujinimus siunčiate jūs“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_684_02` · dalis `dal_684_02` „Turinio perkėlimas“ · prioritetas 2 · pagrindas: dal_684_02 paaiškinimas; viz_684_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Turinį perkeliame rankiniu būdu ir vieną kartą. |
| 5.1 | balsas | Vėlesnius atnaujinimus darote patys. |
| 8.1 | balsas | Todėl padedate nepraleisti svarbių dalykų. |

### KADRAS 3: Kaip siųsti turinį (14 sek.) — koncepcija
**Failas:** `03-kaip-siusti-turini.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, do_4, dont_title, dont_1
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: dešinėje žalia kortelė „Mums bus lengviau“ su keturiais punktais, kairėje raudona „Venkite“ su tekstu, įkaltu į PDF ir JPG failų ikonas. Žalieji punktai atsiranda po vieną, raudonasis sumirksi pabaigoje.
**Ekrano užrašai (tiksliai):** „Mums bus lengviau“, „Pastebėjimo ID atsakyme“, „Pastebėjimai papunkčiui“, „Vengiate“, „Tekstai PDF ar JPG“
**TVS UI komponentai:** —
**Demo duomenys:** nuotrauka: vincas-kudirka.jpg
**Tarimo kandidatai:** PDF, JPG (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_684_03` · dalis `dal_684_03` „Turinio kokybė“ · prioritetas 2 · pagrindas: dal_684_03 paaiškinimas; viz_684_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Turinį siunčiate taip, kad jo nereikėtų maketuoti. |
| 5.3 | balsas | Atsakyme nurodote pastebėjimo numerį. |
| 8.4 | balsas | Tekstų PDF ar JPG formatu nesiunčiate. |

### KADRAS 4: Baigiamieji darbai (14 sek.) — koncepcija
**Failas:** `04-baigiamieji-darbai.png`
**Šablonas:** `naujas` · laukai: title, item_1, item_2, item_3, item_4, summary
**Ekrane:** Šablonas `naujas` („kortele_su_sarasu“): kortelė „Baigiamieji darbai“ su keturiais punktais; prie trijų pirmųjų išnyra importuojamų sąrašų ikonos, prie ketvirtojo spalvų paletė. Apačioje pasilieka užrašas, kad smulkmenos svarbios.
**Ekrano užrašai (tiksliai):** „Baneriai“, „Paskutinės naujienos“, „Darbuotojų kolektyvas“, „Žinutė ir spalvos“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_684_04` · dalis `dal_684_04` „Baigiamieji darbai“ · prioritetas 3 · pagrindas: dal_684_04 paaiškinimas; viz_684_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Didiesiems darbams einant į pabaigą ateina smulkmenos. |
| 5.7 | balsas | Importuojame banerius, naujienas ir darbuotojų sąrašą. |
| 10.2 | balsas | Dabar grįžtate ir prie spalvų. |

### KADRAS 5: Konsultacijai trisdešimt minučių (12 sek.) — koncepcija
**Failas:** `05-konsultacijos.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: dvi kortelės su tuo pačiu trisdešimties minučių laikrodžiu. Kairėje „Ateinate nepasiruošę“ laikas užsipildo pagrindais; dešinėje „Ateinate su žinių pagrindu“ laikas užsipildo klausimais. Kairė parodoma pirma.
**Ekrano užrašai (tiksliai):** „Ateinate nepasiruošę“, „Spėsime tik pagrindus“, „Su žinių pagrindu“, „Gilinamės į esmę“, „30 min.“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_684_05` · dalis `dal_684_05` „Konsultacijos“ · prioritetas 2 · pagrindas: dal_684_05 paaiškinimas; viz_684_05 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Konsultacija trunka trisdešimt minučių. |
| 4.5 | balsas | Nepasiruošus spėjame tik pagrindus. |
| 7.5 | balsas | Peržiūrėję kursus klausiate svarbiausio. |

### KADRAS 6: Turinio patvirtinimas prieš startą (14 sek.) — koncepcija
**Failas:** `06-turinio-patvirtinimas.png`
**Šablonas:** `srautas` · laukai: title, step1_label, step1_desc, arrow_label_1, step2_label, step2_desc, arrow_label_2, step3_label, step3_desc, summary
**Ekrane:** Šablonas `srautas`: trys kortelės su rodyklėmis. Pirmoje du koordinatoriai, antroje visas kolektyvas prie svetainės, trečioje grįžtamojo ryšio lapeliai, iš kurių vienas su užrašu apie penkerius metus. Kortelės pasirodo iš eilės.
**Ekrano užrašai (tiksliai):** „Koordinatoriai“, „Parodote kolektyvui“, „Grįžtamasis ryšys“, „Saugoti penkerius metus“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_684_06` · dalis `dal_684_06` „Turinio patvirtinimas“ · prioritetas 2 · pagrindas: dal_684_06 paaiškinimas; viz_684_06 laukai; dal_684_06 įspėjimas (senoji svetainė pašalinama)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Koordinatoriai apie visą turinį žino ne viską. |
| 5.0 | balsas | Prieš startą svetainę parodote visam kolektyvui. |
| 9.0 | balsas | Taip nepraleidžiate kam nors svarbaus turinio. |

### KADRAS 7: Domeno nukreipimas (16 sek.) — koncepcija
**Failas:** `07-domeno-nukreipimas.png`
**Šablonas:** `srautas` · laukai: title, step1_label, step1_desc, arrow_label_1, step2_label, step2_desc, arrow_label_2, step3_label, step3_desc, summary
**Ekrane:** Šablonas `srautas`: trys kortelės su rodyklėmis. Pirmoje naujas svetainės adresas rašomas naršyklės juostoje, antroje „Wolet“ registruoja domeną, trečioje svetainė paleidžiama. Prie pirmos kortelės išnyra įspėjimas apie nekorektišką registraciją.
**Ekrano užrašai (tiksliai):** „Sugalvojate adresą“, „„Wolet“ registruoja“, „Paleidžiame“, „Nekorektiška registracija“
**TVS UI komponentai:** —
**Demo duomenys:** adresas: demomokykla.lt
**Tarimo kandidatai:** Wolet (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_684_07` · dalis `dal_684_07` „Domeno nukreipimas“ · prioritetas 2 · pagrindas: dal_684_07 paaiškinimas; viz_684_07 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Naują svetainės adresą sugalvojate jūs. |
| 4.6 | balsas | Registracija ir prieglauda yra partnerio „Wolet“ darbas. |
| 9.2 | balsas | Jei prieigos prie domeno neturite, pranešate iš karto. |

### KADRAS 8: Išjungiate pranešimų juostelę (13 sek.) — epizodas
**Failas:** `08-juosteles-isjungimas.png`
**Ekrane:** TVS pranešimų sąrašas; kursorius atidaro įrašą su juostelės tekstu, perjungia rodymo parinktį „Įjungta“ ir spaudžia „Išsaugoti ir išeiti“. Ekranas persijungia į svetainės viršų, kuriame juostelės nebėra.
**Ekrano užrašai (tiksliai):** „Pranešimai“, „Įjungta“, „Išsaugoti ir išeiti“
**TVS UI komponentai:** tvs-row, tvs-btn, tvs-cursor, tvs-ripple, naujas: svetainės pranešimų juostelė
**Demo duomenys:** zinute: Interneto svetainės turinys dar kuriamas. Atsiprašome už galimus laikinus neatitikimus
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `ep_684_08_1` · dalis `dal_684_08` „Startas“ · prioritetas 2 · pagrindas: dal_684_08 paaiškinimas (juostelės tekstas); ep_702_04_1 ekrano užrašai (kursas 536, nuotraukos 924, 925); kl_684_1: epizodas pakartoja pam_702 veiksmą; kl_684_2: išjungimo parinktis nepatikrinta

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Po starto išjungiate pranešimų juostelę. |
| 2.6 | garsas | spustelejimas |
| 4.7 | balsas | Įraše perjungiate rodymą ir išsaugote. |
| 6.1 | garsas | spustelejimas |
| 8.5 | balsas | Svetainės viršuje juostelės nebematote. |
| 9.9 | garsas | patvirtinimas |

### KADRAS 9: Keturi darbai po starto (14 sek.) — koncepcija
**Failas:** `08-po-starto-darbai.png`
**Šablonas:** `zingsniai` · laukai: title, step1_num, step1_label, step1_desc, step2_num, step2_label, step2_desc_prefix, step2_desc_code, step3_num, step3_label, step3_desc, step4_num, step4_label, step4_desc
**Ekrane:** Šablonas `zingsniai`: keturi numeruoti žingsniai atsiranda vienas po kito. Prie pirmojo išjungta senoji svetainė, prie antrojo „Google“, „Facebook“ ir „Rekvizitai.lt“ ikonos, prie trečiojo pranešimas bendruomenei, prie ketvirtojo dingstanti pranešimų juostelė.
**Ekrano užrašai (tiksliai):** „Senoji svetainė“, „Naujas adresas“, „Pranešate bendruomenei“, „Išjungiate juostelę“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_684_08` · dalis `dal_684_08` „Startas“ · prioritetas 3 · pagrindas: dal_684_08 paaiškinimas; viz_684_08 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Įsitikinate, kad senoji svetainė išjungta. |
| 4.7 | balsas | Patikrinate adresą paieškos sistemose ir kataloguose. |
| 9.1 | balsas | Pranešate bendruomenei ir išjungiate juostelę. |
