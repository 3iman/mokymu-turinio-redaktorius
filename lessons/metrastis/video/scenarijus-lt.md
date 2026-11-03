# Video scenarijus: Metraštis — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1389045693 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 18 sek. (1 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_908` · senoji WP pamoka `metrastis`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Sukuriate metraščio įrašą | 18 sek. | 03-metrascio-irasas | Modulyje „Timeline“ spaudžiate „Pridėti“. Pavadinime – metai, lauke „Data“ – įvykio data. Du sakiniai įžangoje, nuotrauka, „Išsaugoti“. Metraštyje atsiranda kortelė. |

---

## Kadrai

### KADRAS 1: Sukuriate metraščio įrašą (18 sek.) — epizodas
**Failas:** `03-metrascio-irasas.png`
**Ekrane:** TVS „Timeline“ sąrašas (Nuotraukos, Pavadinimas, Data, Autorius); kursorius spaudžia „Pridėti“. Forma: „Pavadinimas“ – „2016“, „Laida“, „Data“ su mėnesio sąrašu, „Intro“ – du sakiniai, „Body“, „Nuotraukos“ › „Upload“. Išsaugoma. Ekranas persijungia į svetainės puslapį „Apie mokyklą“: metraščio bloke metų sąraše atsiranda „2016“ ir nauja kortelė su nuotrauka.
**Ekrano užrašai (tiksliai):** „Timeline“, „Pridėti“, „Pavadinimas“, „Data“, „Intro“, „Nuotraukos“
**TVS UI komponentai:** tvs-table, tvs-btn, tvs-input, naujas: datos pasirinkimo laukas, tvs-file, tvs-cursor, tvs-ripple, tvs-site
**Demo duomenys:** pavadinimas: 2016, data: 2016-07-05, intro: Savivaldybės tarybos sprendimu prie mokyklos prijungta kaimyninė mokykla.
**Tarimo kandidatai:** Timeline, Intro, Body (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-metrascio-irasas--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_908_03_1` · dalis `dal_908_03` „Metraščio įrašas“ · prioritetas 2 · pagrindas: dal_908_03 paaiškinimas; skeleton admin/timeline/create 2026-10-18: laukai Pavadinimas *, Slug *, Laida, Data *, Intro, Body, Autorius, Nuotraukos; vlnau.cleverphant.lt/metrastis

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Modulyje „Timeline“ spaudžiate „Pridėti“. |
| 2.4 | garsas | spustelejimas |
| 4.5 | balsas | Pavadinime – metai, lauke „Data“ – įvykio data. |
| 6.7 | garsas | rasymas |
| 9.1 | balsas | Du sakiniai įžangoje, nuotrauka, „Išsaugoti“. |
| 11.1 | garsas | spustelejimas |
| 13.3 | balsas | Metraštyje atsiranda kortelė. |
| 14.7 | garsas | patvirtinimas |
