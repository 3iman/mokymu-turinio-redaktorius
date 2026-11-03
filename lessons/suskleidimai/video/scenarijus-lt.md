# Video scenarijus: Suskleidimai — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 1783538879 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 47 sek. (3 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_905` · senoji WP pamoka `suskleidimai`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Sukuriate kategoriją ir įklijuojate sintaksę | 17 sek. | 03-kategorija-ir-sintakse | Kategorijų sąraše spaudžiate „Sukurti“ ir įrašote pavadinimą. Stulpelyje „Plugin“ nukopijuojate kategorijos sintaksę. Puslapio turinyje įklijuojate ją po įvadu ir atnaujinate. |
| 2 Sukuriate suskleidimo įrašą | 16 sek. | 04-irasas | Spaudžiate „Sukurti“ ir įrašote pavadinimą. „Atsakymas“ – tai, kas atsiskleis paspaudus. Pasirenkate kategoriją ir išsaugote. Svetainėje atsiranda nauja juosta. |
| 3 Perrikiuojate suskleidimus | 14 sek. | 05-perrikiavimas | Pasirenkate kategoriją ir spaudžiate „Filtruoti“. Suimate įrašą už rodyklių ir tempiate. Spaudžiate „Perrikiuoti“ – kitaip tvarka neišsisaugo. |

---

## Kadrai

### KADRAS 1: Sukuriate kategoriją ir įklijuojate sintaksę (17 sek.) — epizodas
**Failas:** `03-kategorija-ir-sintakse.png`
**Ekrane:** TVS „Suskleidimai“ › „Kategorijos“: kursorius spaudžia „Sukurti“, įrašo pavadinimą „Tarptautinis bakalaureatas“, išsaugo. Sąraše eilutė su stulpeliu „Plugin“ ir sintakse {{ suskleidimai('', {'category_id': 2}) }} – kursorius ją nukopijuoja. Ekranas persijungia į puslapio „Turinys“ lauką, sintaksė įklijuojama po įvadiniu tekstu, „Atnaujinti“.
**Ekrano užrašai (tiksliai):** „Kategorijos“, „Sukurti“, „Pavadinimas“, „Plugin“, „Turinys“, „Atnaujinti“
**TVS UI komponentai:** tvs-table, tvs-row, tvs-btn, tvs-input, tvs-cursor, tvs-ripple, naujas: teksto redaktoriaus įrankių juosta
**Demo duomenys:** kategorija: Tarptautinis bakalaureatas, puslapis: Tarptautinis bakalaureatas, sintakse: {{ suskleidimai('', {'category_id': 2}) }}
**Tarimo kandidatai:** Plugin, category_id (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/03-kategorija-ir-sintakse--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_905_03_1` · dalis `dal_905_03` „Kategorija ir jos sintaksė“ · prioritetas 2 · pagrindas: dal_905_03 paaiškinimas; skeleton ir kristoforopro.lt admin 2026-10-18: Suskleidimai › Kategorijos, stulpelis „Plugin“

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Kategorijų sąraše spaudžiate „Sukurti“ ir įrašote pavadinimą. |
| 3.2 | garsas | rasymas |
| 6.2 | balsas | Stulpelyje „Plugin“ nukopijuojate kategorijos sintaksę. |
| 8.2 | garsas | spustelejimas |
| 10.7 | balsas | Puslapio turinyje įklijuojate ją po įvadu ir atnaujinate. |
| 13.1 | garsas | spustelejimas |
| 14.3 | garsas | patvirtinimas |

### KADRAS 2: Sukuriate suskleidimo įrašą (16 sek.) — epizodas
**Failas:** `04-irasas.png`
**Ekrane:** „Suskleidimai“ › „Sukurti“: forma su laukais „Pavadinimas“, „Atsakymas“ (teksto redaktorius), „Kalba“, „Kategorija“, „Enabled“ (Yes / No). Kursorius įrašo pavadinimą „Tarptautinio bakalaureato programa – apie ką ji?“, redaktoriuje – kelias pastraipas, pasirenka kategoriją, „Išsaugoti“. Ekranas persijungia į svetainę: bloke atsiranda nauja tamsi juosta su pliusu.
**Ekrano užrašai (tiksliai):** „Sukurti“, „Pavadinimas“, „Atsakymas“, „Kategorija“, „Enabled“, „Išsaugoti“
**TVS UI komponentai:** tvs-btn, tvs-input, naujas: teksto redaktoriaus įrankių juosta, naujas: „Yes“ / „No“ jungiklis, tvs-cursor, tvs-ripple, tvs-site
**Demo duomenys:** pavadinimas: Tarptautinio bakalaureato programa – apie ką ji?, kategorija: Tarptautinis bakalaureatas
**Tarimo kandidatai:** Enabled (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/04-irasas--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_905_04_1` · dalis `dal_905_04` „Įrašas: beveik atskiras puslapis“ · prioritetas 2 · pagrindas: dal_905_04 paaiškinimas; skeleton admin/suskleidimai/create 2026-10-18: laukai Pavadinimas *, Atsakymas *, Kalba, Kategorija *, Enabled, Nuotrauka, Galerija, Video; eskizas 2026-10-31: kategorijos pasirinkimas / išsaugojimas

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Spaudžiate „Sukurti“ ir įrašote pavadinimą. |
| 2.8 | garsas | rasymas |
| 5.0 | balsas | „Atsakymas“ – tai, kas atsiskleis paspaudus. |
| 7.0 | garsas | rasymas |
| 8.7 | balsas | Pasirenkate kategoriją ir išsaugote. |
| 9.3 | garsas | spustelejimas |
| 9.8 | garsas | spustelejimas |
| 10.4 | garsas | spustelejimas |
| 11.7 | balsas | Svetainėje atsiranda nauja juosta. |
| 13.3 | garsas | patvirtinimas |

### KADRAS 3: Perrikiuojate suskleidimus (14 sek.) — epizodas
**Failas:** `05-perrikiavimas.png`
**Ekrane:** „Suskleidimai“ sąrašas; viršuje filtras „Kategorija“ – kursorius pasirenka kategoriją ir spaudžia „Filtruoti“. Eilučių pradžioje atsiranda rodyklių rankenėlės; kursorius suima trečią eilutę, tempia į antrą vietą, paleidžia, spaudžia žalią „Perrikiuoti“. Svetainėje juostos sustoja nauja tvarka.
**Ekrano užrašai (tiksliai):** „Kategorija“, „Filtruoti“, „Perrikiuoti“
**TVS UI komponentai:** tvs-filter, tvs-table, tvs-row, tvs-handle, tvs-btn, tvs-cursor, tvs-ripple
**Demo duomenys:** kategorija: Tarptautinis bakalaureatas
**Tarimo kandidatai:** — (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-perrikiavimas--moduliai-be-pamokos-faktai.md`
**Komentaras:** epizodas `ep_905_05_1` · dalis `dal_905_05` „Perrikiavimas“ · prioritetas 2 · pagrindas: dal_905_05 paaiškinimas; KB 11-suskleidimų-valdymas §5: be filtro rankenėlė neatsiranda; skeleton: filtrai Kalba / Kategorija, mygtukas „Perrikiuoti“

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Pasirenkate kategoriją ir spaudžiate „Filtruoti“. |
| 3.0 | garsas | spustelejimas |
| 5.1 | balsas | Suimate įrašą už rodyklių ir tempiate. |
| 7.1 | garsas | paemimas |
| 7.9 | garsas | numetimas |
| 8.5 | balsas | Spaudžiate „Perrikiuoti“ – kitaip tvarka neišsisaugo. |
| 10.5 | garsas | spustelejimas |
| 11.7 | garsas | patvirtinimas |
