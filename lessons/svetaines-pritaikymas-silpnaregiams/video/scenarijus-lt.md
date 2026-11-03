# Video scenarijus: Svetainės pritaikymas silpnaregiams — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 3165844356 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 67 sek. (6 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_1624` · senoji WP pamoka `svetaines-pritaikymas-silpnaregiams`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Kam naudingas vaizdo įrankis | 12 sek. | 01-kam-naudingas-irankis | Naršyklės nustatymus reikia žinoti, kur rasti. Įrankį svetainėje pamatote iš karto. Dalinai regintiems to dažnai pakanka. |
| 2 Ne visi naudoja įrankį | 12 sek. | 02-ne-visi-naudojasi | Nežinote, kuo naudosis lankytojas. Vieni didina naršyklę, kiti – visą sistemą. Treti turi specialią programinę įrangą. |
| 3 Perjungiate kontrasto režimą | 9 sek. | 03-kontrasto-rezimas | Įrankio juostoje spaudžiate „Kontrastas“. Puslapis persijungia į kitą spalvų režimą. |
| 4 Padidinate teksto dydį | 12 sek. | 03-teksto-dydis | Spaudžiate teksto didinimo mygtuką. Renkatės pirmą arba antrą dydį. „Normalus“ grąžina pradinį tekstą. |
| 5 Įjungiate ryškias nuorodas | 9 sek. | 03-ryskios-nuorodos | Spaudžiate „Nuorodų ryškinimas“. Nuorodos tekste atsiskiria nuo kitų žodžių. |
| 6 Trys mygtukai – sąmoningas pasirinkimas | 13 sek. | 04-ar-pridesime-daugiau | Daugiau mygtukų – daugiau vietų pasimesti. Trys aiškūs sprendžia pagrindinius sunkumus. Prireikus konkrečios funkcijos, parašote mums. |

---

## Kadrai

### KADRAS 1: Kam naudingas vaizdo įrankis (12 sek.) — koncepcija
**Failas:** `01-kam-naudingas-irankis.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2
**Ekrane:** Šablonas `palyginimas`: kairėje – naršyklės ir sistemos nustatymų langai, pasislėpę po meniu; dešinėje – svetainės viršuje iš karto matoma trijų mygtukų juosta, kuri sumirksi.
**Ekrano užrašai (tiksliai):** „Naršyklės nustatymai“, „Reikia žinoti, kur“, „Įrankis svetainėje“, „Matomas iš karto“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-kam-naudingas-irankis--1641-Kontrastas.jpg`
**Komentaras:** epizodas `viz_1624_01` · dalis `dal_1624_01` „Kam naudingas trijų funkcijų vaizdą keičiantis įrankis mūsų svetainėje?“ · prioritetas 2 · pagrindas: dal_1624_01 paaiškinimas; viz_1624_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Naršyklės nustatymus reikia žinoti, kur rasti. |
| 5.0 | balsas | Įrankį svetainėje pamatote iš karto. |
| 8.0 | balsas | Dalinai regintiems to dažnai pakanka. |

### KADRAS 2: Ne visi naudoja įrankį (12 sek.) — koncepcija
**Failas:** `02-ne-visi-naudojasi.png`
**Šablonas:** `dokumentu_sarasas` · laukai: title, doc1_label, doc1_desc, doc1_tag, doc2_label, doc2_desc, doc2_tag, doc3_label, doc3_desc, doc3_tag
**Ekrane:** Šablonas `dokumentu_sarasas`: trys eilutės su žymomis – klaviatūros kombinacija, operacinės sistemos nustatymų langas ir atskira pagalbinė programa; prie kiekvienos užsidega po vieną lankytojo piktogramą.
**Ekrano užrašai (tiksliai):** „Ctrl + +“, „Naršyklės didinimas“, „Sistemos mastelis“, „Speciali programinė įranga“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** Ctrl (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_1624_02` · dalis `dal_1624_02` „Ar visi silpnaregiai naudojasi šiais įrankiai?“ · prioritetas 3 · pagrindas: dal_1624_02 paaiškinimas; viz_1624_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Nežinote, kuo naudosis lankytojas. |
| 4.1 | balsas | Vieni didina naršyklę, kiti – visą sistemą. |
| 7.7 | balsas | Treti turi specialią programinę įrangą. |

### KADRAS 3: Perjungiate kontrasto režimą (9 sek.) — epizodas
**Failas:** `03-kontrasto-rezimas.png`
**Ekrane:** Svetainės puslapis su tekstu ir nuorodomis; kursorius spaudžia prieinamumo juostos mygtuką „Kontrastas“, ir puslapis persijungia iš juodo teksto baltame fone į baltą tekstą juodame.
**Ekrano užrašai (tiksliai):** „Kontrastas“, „Juodai ant balto“, „Baltai ant juodo“
**TVS UI komponentai:** tvs-site, tvs-site-h, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-kontrasto-rezimas--1641-Kontrastas.jpg`
**Komentaras:** epizodas `ep_1624_03_1` · dalis `dal_1624_03` „Kokias problemas sprendžia jūsų svetainėje esantis įrankis?“ · prioritetas 2 · pagrindas: dal_1624_03 paaiškinimas; nuotrauka 1641 (mygtuko užrašas)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Įrankio juostoje spaudžiate „Kontrastas“. |
| 2.4 | garsas | spustelejimas |
| 4.6 | balsas | Puslapis persijungia į kitą spalvų režimą. |
| 6.4 | garsas | patvirtinimas |

### KADRAS 4: Padidinate teksto dydį (12 sek.) — epizodas
**Failas:** `03-teksto-dydis.png`
**Ekrane:** Tas pats svetainės puslapis; kursorius spaudžia mygtuką „Teksto didinimas“, tekstas paauga vienu, tada dar vienu laipteliu ir grįžta į pradinį dydį.
**Ekrano užrašai (tiksliai):** „Teksto didinimas“, „Dydis +1“, „Dydis +2“, „Normalus“
**TVS UI komponentai:** tvs-site, tvs-site-h, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-teksto-dydis--1642-Teksto_didinimas.jpg`
**Komentaras:** epizodas `ep_1624_03_2` · dalis `dal_1624_03` „Kokias problemas sprendžia jūsų svetainėje esantis įrankis?“ · prioritetas 2 · pagrindas: dal_1624_03 paaiškinimas; nuotrauka 1642 (mygtuko užrašas); kl_1624_1: šrifto dydžio valdiklis — ikona be užrašo, todėl balse ne kabutėmis

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Spaudžiate teksto didinimo mygtuką. |
| 2.4 | garsas | spustelejimas |
| 4.2 | balsas | Renkatės pirmą arba antrą dydį. |
| 5.6 | garsas | spustelejimas |
| 7.4 | balsas | „Normalus“ grąžina pradinį tekstą. |

### KADRAS 5: Įjungiate ryškias nuorodas (9 sek.) — epizodas
**Failas:** `03-ryskios-nuorodos.png`
**Ekrane:** Tas pats svetainės puslapis; kursorius spaudžia mygtuką „Nuorodų ryškinimas“, ir teksto viduryje esančios nuorodos tampa aiškiai matomos tarp kitų žodžių.
**Ekrano užrašai (tiksliai):** „Nuorodų ryškinimas“, „Ryškios nuorodos“
**TVS UI komponentai:** tvs-site, tvs-site-h, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-ryskios-nuorodos--1643-Nuorodu_ryskinimas.jpg`
**Komentaras:** epizodas `ep_1624_03_3` · dalis `dal_1624_03` „Kokias problemas sprendžia jūsų svetainėje esantis įrankis?“ · prioritetas 2 · pagrindas: dal_1624_03 paaiškinimas; nuotrauka 1643 (mygtuko užrašas)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Spaudžiate „Nuorodų ryškinimas“. |
| 2.4 | garsas | spustelejimas |
| 4.2 | balsas | Nuorodos tekste atsiskiria nuo kitų žodžių. |
| 5.8 | garsas | patvirtinimas |

### KADRAS 6: Trys mygtukai – sąmoningas pasirinkimas (13 sek.) — koncepcija
**Failas:** `04-ar-pridesime-daugiau.png`
**Šablonas:** `palyginimas` · laukai: title, old_title, old_step_1, old_step_2, new_title, new_step_1, new_step_2, summary
**Ekrane:** Šablonas `palyginimas`: kairėje – perkrauta dešimties mygtukų juosta, kurioje kursorius blaškosi; dešinėje – trys mygtukai, ir kursorius iš karto pataiko į reikiamą.
**Ekrano užrašai (tiksliai):** „Daugiau įrankių“, „Vartotojai pasimeta“, „Trys mygtukai“, „Aiškūs ir praktiški“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo mokykla
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-ar-pridesime-daugiau--1643-Nuorodu_ryskinimas.jpg`
**Komentaras:** epizodas `viz_1624_04` · dalis `dal_1624_04` „Ar ketiname pridėti daugiau įrankių?“ · prioritetas 3 · pagrindas: dal_1624_04 paaiškinimas; viz_1624_04 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Daugiau mygtukų – daugiau vietų pasimesti. |
| 4.7 | balsas | Trys aiškūs sprendžia pagrindinius sunkumus. |
| 8.4 | balsas | Prireikus konkrečios funkcijos, parašote mums. |
