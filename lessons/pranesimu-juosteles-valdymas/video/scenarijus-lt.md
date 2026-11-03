# Video scenarijus: Pranešimų juostelės valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 3832682588 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 42 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_702` · senoji WP pamoka `pranesimu-juosteles-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Lankytojas uždaro juostelę | 11 sek. | 01-juosteles-uzdarymas | Matote, kaip lankytojas juostelę uždaro kryželiu. Perkrovus puslapį tos pačios žinutės jis nebemato. |
| 2 Viena žinutė sąraše | 14 sek. | 03-viena-zinute-sarase | Kai sąraše kaupiasi keli įrašai, neaišku, kuris rodomas. Paliekate vieną vienintelį. Naujai žinutei kuriate naują įrašą, o senąjį ištrinate. |
| 3 Sukuriate naują žinutę | 17 sek. | 04-nauja-zinute | Spaudžiate „Pridėti pranešimą“. Lauke „Tekstas“ įrašote trumpą žinutę. Nurodote, nuo kada iki kada ją rodyti. Lauke „URL“ įrašote vidinę nuorodą ir išsaugote. |

---

## Kadrai

### KADRAS 1: Lankytojas uždaro juostelę (11 sek.) — epizodas
**Failas:** `01-juosteles-uzdarymas.png`
**Ekrane:** Svetainės viršuje oranžinė pranešimų juostelė; kursorius spaudžia kryželį dešinėje, juostelė dingsta. Puslapis perkraunamas – juostelės nebėra.
**Ekrano užrašai (tiksliai):** „Rugsėjo 1-osios šventė“
**TVS UI komponentai:** tvs-cursor, naujas: svetainės pranešimų juostelė su uždarymo kryželiu
**Demo duomenys:** zinute: Rugsėjo 1-osios šventė – 10 val.
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `ep_702_01_1` · dalis `dal_702_01` „Kaip atrodo“ · prioritetas 3 · pagrindas: dal_702_01 paaiškinimas

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Matote, kaip lankytojas juostelę uždaro kryželiu. |
| 2.0 | garsas | spustelejimas |
| 5.3 | balsas | Perkrovus puslapį tos pačios žinutės jis nebemato. |

### KADRAS 2: Viena žinutė sąraše (14 sek.) — koncepcija
**Failas:** `03-viena-zinute-sarase.png`
**Šablonas:** `taisyklingai_netaisyklingai` · laukai: title, do_title, do_1, do_2, do_3, dont_title, dont_1, dont_2
**Ekrane:** Šablonas `taisyklingai_netaisyklingai`: kairėje raudona kortelė „Painu“ su keliomis juostelės eilutėmis sąraše, dešinėje žalia kortelė „Rekomenduojame“ su vienintele eilute. Kortelės atsiranda viena po kitos, tada raudonosios eilutės po vieną išnyksta, kol lieka viena.
**Ekrano užrašai (tiksliai):** „Painu“, „Rekomenduojame“
**TVS UI komponentai:** —
**Demo duomenys:** zinute: Rugsėjo 1-osios šventė – 10 val.
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_702_03` · dalis `dal_702_03` „Kaip atrodo sąrašas“ · prioritetas 2 · pagrindas: dal_702_03 paaiškinimas; viz_702_03 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kai sąraše kaupiasi keli įrašai, neaišku, kuris rodomas. |
| 5.8 | balsas | Paliekate vieną vienintelį. |
| 8.2 | balsas | Naujai žinutei kuriate naują įrašą, o senąjį ištrinate. |

### KADRAS 3: Sukuriate naują žinutę (17 sek.) — epizodas
**Failas:** `04-nauja-zinute.png`
**Ekrane:** Pranešimų sąrašas; spaudžiamas „Pridėti pranešimą“, atsiveria forma. Įrašoma trumpa žinutė, nurodomos rodymo datos, „Įjungta“ lieka žalias, įrašoma vidinė nuoroda ir spaudžiama „Išsaugoti ir išeiti“. Ekranas persijungia į svetainę su oranžine juostele.
**Ekrano užrašai (tiksliai):** „Pridėti pranešimą“, „Tekstas“, „Rodyti nuo“, „Rodyti iki“, „Įjungta“, „URL“, „Išsaugoti ir išeiti“
**TVS UI komponentai:** tvs-btn, tvs-input, tvs-cursor, tvs-ripple, naujas: datos pasirinkimo laukas
**Demo duomenys:** zinute: Rugsėjo 1-osios šventė – 10 val., nuoroda: /renginiai
**Tarimo kandidatai:** URL (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `ep_702_04_1` · dalis `dal_702_04` „Kaip užpildyti įrašą“ · prioritetas 2 · pagrindas: dal_702_04 paaiškinimas

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Spaudžiate „Pridėti pranešimą“. |
| 2.4 | garsas | spustelejimas |
| 4.2 | balsas | Lauke „Tekstas“ įrašote trumpą žinutę. |
| 5.6 | garsas | rasymas |
| 7.7 | balsas | Nurodote, nuo kada iki kada ją rodyti. |
| 9.1 | garsas | spustelejimas |
| 10.9 | balsas | Lauke „URL“ įrašote vidinę nuorodą ir išsaugote. |
| 12.7 | garsas | patvirtinimas |
