# Video scenarijus: ES projektų viešinimas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1774918686 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 31 sek. (2 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_682` · senoji WP pamoka `es-projektu-viesinimas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Logotipas puslapio viršuje | 14 sek. | 01-es-logotipas-virsuje | Logotipas privalo būti aprašymo puslapio viršuje. Ir ne mažesnis už kitus logotipus. Aprašymą skelbiate tiesiai puslapyje, ne PDF. |
| 2 Trys CPVA dokumentai | 17 sek. | 02-cpva-dokumentai | Išsamesnes taisykles rasite trijuose agentūros dokumentuose. Pirmasis yra apie Europos Sąjungos emblemos naudojimą. Kiti du apie viešinimą svetainėje ir komunikaciją. |

---

## Kadrai

### KADRAS 1: Logotipas puslapio viršuje (14 sek.) — koncepcija
**Failas:** `01-es-logotipas-virsuje.png`
**Šablonas:** `puslapio_maketas` · laukai: title, page_title, eu_banner_text, project_intro, project_period
**Ekrane:** Šablonas `puslapio_maketas`: projekto aprašymo puslapis. Pirma pasirodo logotipas viršuje, kurio dydis sulyginamas su kitais puslapio logotipais; tada po juo atsiranda aprašymo tekstas, o šoninė dokumento ikona nublanksta. Pabaigoje išnyra penkerių metų juosta.
**Ekrano užrašai (tiksliai):** „Projekto aprašymas“, „Logotipas viršuje“, „Ne mažesnis“, „Skelbiama penkerius metus“
**TVS UI komponentai:** —
**Demo duomenys:** projektas: Erasmus+ „Judri mokykla“, mokykla: Demo mokykla
**Tarimo kandidatai:** PDF (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_682_01` · dalis `dal_682_01` „Aktualiausi momentai“ · prioritetas 1 · pagrindas: dal_682_01 paaiškinimas; viz_682_01 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Logotipas privalo būti aprašymo puslapio viršuje. |
| 5.3 | balsas | Ir ne mažesnis už kitus logotipus. |
| 8.2 | balsas | Aprašymą skelbiate tiesiai puslapyje, ne PDF. |

### KADRAS 2: Trys CPVA dokumentai (17 sek.) — koncepcija
**Failas:** `02-cpva-dokumentai.png`
**Šablonas:** `dokumentu_sarasas` · laukai: title, doc1_label, doc1_tag, doc2_label, doc2_tag, doc3_label, doc3_tag
**Ekrane:** Šablonas `dokumentu_sarasas`: kortelė „CPVA siūlo susipažinti“ su trimis dokumentų eilutėmis; eilutės atsiranda viena po kitos, prie kiekvienos sumirksi formato žyma.
**Ekrano užrašai (tiksliai):** „ES emblemos naudojimas“, „Informacija svetainėje“, „Apie komunikaciją“, „PDF“, „DOCX“
**TVS UI komponentai:** —
**Demo duomenys:** —
**Tarimo kandidatai:** ES, CPVA (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** —
**Komentaras:** epizodas `viz_682_02` · dalis `dal_682_02` „Centrinė projektų valdymo agentūra siūlo susipažinti su šia informacija“ · prioritetas 3 · pagrindas: dal_682_02 paaiškinimas; viz_682_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Išsamesnes taisykles rasite trijuose agentūros dokumentuose. |
| 6.1 | balsas | Pirmasis yra apie Europos Sąjungos emblemos naudojimą. |
| 10.6 | balsas | Kiti du apie viešinimą svetainėje ir komunikaciją. |
