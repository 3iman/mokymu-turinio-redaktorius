# Video scenarijus: Teisingas turinio publikavimas: iš PDF – į JPG, o tada į straipsnį — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 144878386 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 51 sek. (4 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_692` · senoji WP pamoka `teisingas-turinio-publikavimas-is-pdf-i-jpg-o-tada-i-straipsni`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Įkeliate PDF į konverterį | 14 sek. | 01-ikeliate-pdf | Atsidarote nemokamą konvertavimo įrankį. Spaudžiate „Select PDF files“. Pasirenkate dokumentą kompiuteryje. |
| 2 Konvertuojate ir atsisiunčiate | 14 sek. | 01-atsisiunciate-jpg | Spaudžiate „Convert to JPG“. Tada „Download JPG images“. Atsisiunčiamas archyvas su paveikslėliais. |
| 3 Išpakuojate ZIP archyvą | 10 sek. | 02-ispakuojate-zip | Archyvą atidarote ir spaudžiate „Išskleisti viską“. Pasirenkate aplanką ir spaudžiate „Išskleisti“. |
| 4 Skaitoma be atsisiuntimo | 13 sek. | 04-rezultatas-svetaineje | Naujienoje matote PDF puslapius kaip paveikslėlius. Skaityti galima iš karto. Apačioje lieka nuoroda atsisiųsti. |

---

## Kadrai

### KADRAS 1: Įkeliate PDF į konverterį (14 sek.) — epizodas
**Failas:** `01-ikeliate-pdf.png`
**Ekrane:** Svetainė „PDF to JPG“; kursorius spaudžia raudoną mygtuką „Select PDF file“, atsiveria failų langas, pasirenkamas dokumentas ir puslapyje pasirodo jo miniatiūra.
**Ekrano užrašai (tiksliai):** „PDF to JPG“, „Select PDF file“
**TVS UI komponentai:** tvs-cursor, tvs-ripple, naujas: ilovepdf.com puslapis su raudonu mygtuku, naujas: kompiuterio failų pasirinkimo langas
**Demo duomenys:** dokumentas: Mokyklos veiklos planas.pdf, mokykla: Demo mokykla
**Tarimo kandidatai:** PDF, JPG, PDF to JPG, Select PDF file (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-ikeliate-pdf--sc02_004.3.jpg`
**Komentaras:** epizodas `ep_692_01_1` · dalis `dal_692_01` „Kaip PDF konvertuoti į JPG?“ · prioritetas 3 · pagrindas: dal_692_01 paaiškinimas; scenos 838: 1–2; eskizas 2026-10-31: mygtuko užrašas balse kaip ekrane („Select PDF files“)

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Atsidarote nemokamą konvertavimo įrankį. |
| 4.7 | balsas | Spaudžiate „Select PDF files“. |
| 5.9 | garsas | spustelejimas |
| 7.9 | balsas | Pasirenkate dokumentą kompiuteryje. |
| 9.3 | garsas | patvirtinimas |

### KADRAS 2: Konvertuojate ir atsisiunčiate (14 sek.) — epizodas
**Failas:** `01-atsisiunciate-jpg.png`
**Ekrane:** Dešinėje skydelis su pažymėtu „PAGE TO JPG“; kursorius spaudžia „Convert to JPG“, po trumpo laukimo pasirodo „Download JPG images“ ir išsaugojimo lange matosi ZIP archyvas.
**Ekrano užrašai (tiksliai):** „PAGE TO JPG“, „Convert to JPG“, „Download JPG images“
**TVS UI komponentai:** tvs-cursor, tvs-ripple, naujas: ilovepdf.com pasirinkimų skydelis, naujas: naršyklės išsaugojimo langas
**Demo duomenys:** archyvas: veiklos-planas-jpg.zip
**Tarimo kandidatai:** JPG, Convert to JPG, Download JPG images, ZIP (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-atsisiunciate-jpg--sc03_015.7.jpg`, `nuorodos/01-atsisiunciate-jpg--sc05_022.2.jpg`, `nuorodos/01-atsisiunciate-jpg--sc06_029.4.jpg`
**Komentaras:** epizodas `ep_692_01_2` · dalis `dal_692_01` „Kaip PDF konvertuoti į JPG?“ · prioritetas 2 · pagrindas: dal_692_01 paaiškinimas; scenos 838: 3–6

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Spaudžiate „Convert to JPG“. |
| 2.6 | garsas | spustelejimas |
| 5.0 | balsas | Tada „Download JPG images“. |
| 6.2 | garsas | spustelejimas |
| 8.6 | balsas | Atsisiunčiamas archyvas su paveikslėliais. |
| 10.0 | garsas | patvirtinimas |

### KADRAS 3: Išpakuojate ZIP archyvą (10 sek.) — epizodas
**Failas:** `02-ispakuojate-zip.png`
**Ekrane:** Windows aplankas: dešinys paspaudimas ant ZIP, „Išskleisti viską…“, aplanko pasirinkimas; kursorius spaudžia „Extract To“, atsiveria langas su aplankų medžiu, pasirenkamas aplankas ir spaudžiama „OK“, paveikslėliai atsiranda aplanke.
**Ekrano užrašai (tiksliai):** „Destination path“, „OK“, „Išskleisti viską…“, „Išskleisti“
**TVS UI komponentai:** tvs-cursor, tvs-ripple, naujas: išpakavimo langas su aplankų medžiu
**Demo duomenys:** aplankas: Demo mokykla / Naujienos, archyvas: veiklos-planas-jpg.zip
**Tarimo kandidatai:** ZIP, WinRAR, Extract To (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-ispakuojate-zip--sc01_000.3.jpg`, `nuorodos/02-ispakuojate-zip--sc01_004.3.jpg`
**Komentaras:** epizodas `ep_692_02_1` · dalis `dal_692_02` „Kaip išpakuoti ZIP?“ · prioritetas 3 · pagrindas: dal_692_02 paaiškinimas; scenos 837: 1–2; kl_692_1 — Eimantas 2026-10-31: ZIP išpakuojamas Windows „Išskleisti viską…“, be WinRAR

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Archyvą atidarote ir spaudžiate „Išskleisti viską“. |
| 2.6 | garsas | spustelejimas |
| 5.4 | balsas | Pasirenkate aplanką ir spaudžiate „Išskleisti“. |
| 6.8 | garsas | spustelejimas |
| 8.2 | garsas | patvirtinimas |

### KADRAS 4: Skaitoma be atsisiuntimo (13 sek.) — epizodas
**Failas:** `04-rezultatas-svetaineje.png`
**Ekrane:** Svetainės naujiena; vaizdas lėtai slenka per paveikslėlius, kol pasiekia antraštę ir po ja esančią dokumento nuorodą, kuri trumpam paryškinama.
**Ekrano užrašai (tiksliai):** „Parsisiųskite pdf formatu“
**TVS UI komponentai:** tvs-cursor, naujas: svetainės naujienos turinys su paveikslėliais
**Demo duomenys:** mokykla: Demo mokykla, naujiena: Mokslo metų pradžios tvarkaraštis
**Tarimo kandidatai:** PDF (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-rezultatas-svetaineje--sc10_035.1.jpg`
**Komentaras:** epizodas `ep_692_04_3` · dalis `dal_692_04` „Kaip formatuoti straipsnį?“ · prioritetas 2 · pagrindas: dal_692_04 paaiškinimas; scenos 839: 6–7

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Naujienoje matote PDF puslapius kaip paveikslėlius. |
| 5.6 | balsas | Skaityti galima iš karto. |
| 8.6 | balsas | Apačioje lieka nuoroda atsisiųsti. |
