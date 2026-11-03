# Video scenarijus: Karuselės valdymas — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1821842307 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 47 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_711` · senoji WP pamoka `karuseles-valdymas`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Pagrindinis karuselės vizualas | 18 sek. | 02-karuseles-vizualas | Karuselės nuotrauka – 1920 x 606 pikselių. Svarbus turinys turi tilpti tarp pirmų dviejų linijų. Telefonui talpinate atskirą, kvadratu apkirptą nuotrauką. |
| 2 Parenkate karuselės šrifto dydį | 16 sek. | 04-srifto-dydziai | Antraštės dydį parenkate lauke „Title Font Size“. Telefonui skirtas atskiras dydžio laukas. Aprašymui – dar vienas. Taip ilgesnis tekstas telpa ir mažame ekrane. |
| 3 Pakeičiate karuselės teksto spalvą | 13 sek. | 05-teksto-spalva | Laukelyje „Text Color“ pasirenkate spalvą. Išsaugote įrašą. Svetainėje tekstas ant nuotraukos jau naujos spalvos. |

---

## Kadrai

### KADRAS 1: Pagrindinis karuselės vizualas (18 sek.) — koncepcija
**Failas:** `02-karuseles-vizualas.png`
**Šablonas:** `naujas` · laukai: title, full_size, safe_zone, visible_width, side_zones, mobile
**Ekrane:** Naujas šablonas: ekrano viduryje – karuselės vizualo rėmas su trimis vertikaliomis linijomis. Tarp pirmų dviejų linijų nušvinta sritis su svarbiu turiniu, tarp pirmos ir trečios parodomas matuojamas plotis, o kraštai pritemsta. Dešinėje iškyla kvadratinis telefono kadras su ta pačia, apkirpta nuotrauka.
**Ekrano užrašai (tiksliai):** „1920 x 606“, „1180 pikselių“, „Kvadratas telefone“
**TVS UI komponentai:** —
**Demo duomenys:** mokykla: Demo gimnazija
**Tarimo kandidatai:** 1920 x 606, 1180 (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/02-karuseles-vizualas--864-karusele.jpg`
**Komentaras:** epizodas `viz_711_02` · dalis `dal_711_02` „Pagrindinis vizualas“ · prioritetas 2 · pagrindas: dal_711_02 paaiškinimas; viz_711_02 laukai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Karuselės nuotrauka – 1920 x 606 pikselių. |
| 7.4 | balsas | Svarbus turinys turi tilpti tarp pirmų dviejų linijų. |
| 11.8 | balsas | Telefonui talpinate atskirą, kvadratu apkirptą nuotrauką. |

### KADRAS 2: Parenkate karuselės šrifto dydį (16 sek.) — epizodas
**Failas:** `04-srifto-dydziai.png`
**Ekrane:** Karuselės įrašo forma; kamera leidžiasi per tris gretimus laukus – „Title Font Size“, „Mobile Title Font Size“ ir „Description Font Size“; kiekvienas trumpam paryškinamas. Šalia rodoma, kaip tas pats ilgesnis tekstas sutelpa telefono ekrane.
**Ekrano užrašai (tiksliai):** „Title Font Size“, „Mobile Title Font Size“, „Description Font Size“
**TVS UI komponentai:** tvs-input, tvs-row, tvs-cursor
**Demo duomenys:** irasas: Mokyklą pristatantis
**Tarimo kandidatai:** Title Font Size, Mobile Title Font Size, Description Font Size (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-srifto-dydziai--862-karusele_04.jpg`
**Komentaras:** epizodas `ep_711_04_1` · dalis `dal_711_04` „Konkretaus įrašo valdymas“ · prioritetas 2 · pagrindas: dal_711_04 paaiškinimas; nuotrauka 862

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Antraštės dydį parenkate lauke „Title Font Size“. |
| 5.5 | balsas | Telefonui skirtas atskiras dydžio laukas. |
| 8.9 | balsas | Aprašymui – dar vienas. |
| 11.1 | balsas | Taip ilgesnis tekstas telpa ir mažame ekrane. |

### KADRAS 3: Pakeičiate karuselės teksto spalvą (13 sek.) — epizodas
**Failas:** `05-teksto-spalva.png`
**Ekrane:** Karuselės įrašo forma; kamera priartėja prie lauko „Text Color“, iš kurio išskleidžiama spalvų paletė ir pasirenkama tamsesnė spalva. Forma išsaugoma, vaizdas persijungia į svetainės karuselę – tekstas ant nuotraukos jau naujos spalvos.
**Ekrano užrašai (tiksliai):** „Text Color“, „Slides“
**TVS UI komponentai:** tvs-input, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** irasas: Mokyklą pristatantis, mokykla: Demo gimnazija
**Tarimo kandidatai:** Text Color, Slides (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-teksto-spalva--862-karusele_04.jpg`, `nuorodos/05-teksto-spalva--863-karusele_05.jpg`
**Komentaras:** epizodas `ep_711_05_1` · dalis `dal_711_05` „Teksto spalva“ · prioritetas 3 · pagrindas: dal_711_05 paaiškinimas; nuotraukos 862, 863; eskizas 2026-10-31: trūkstami veiksmų garsai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.4 | balsas | Laukelyje „Text Color“ pasirenkate spalvą. |
| 3.0 | garsas | spustelejimas |
| 5.0 | balsas | Išsaugote įrašą. |
| 5.6 | garsas | spustelejimas |
| 6.0 | garsas | patvirtinimas |
| 7.6 | balsas | Svetainėje tekstas ant nuotraukos jau naujos spalvos. |
