# Video scenarijus: Kaip prisijungti ir kas ką gali — platformos epizodai

**Formatas:** mokymų platformos filmai (tikslas ≤ 15 s, riba 20 s; be intro / outro): `epizodas` — veiksmas ekrane, `koncepcija` — šablonas, animuojamas ir įgarsinamas
**Kalba:** lt — ekrano užrašai ir TVS komponentai lieka originalo kalba (§7.3)
**Balsas:** ElevenLabs, „Darius Cleverphant“ — modelis ir nustatymai pagal `VIDEO_GAMYBA.md` §7
**Balso seed:** 528600013 – įrašomas automatiškai; pakeitus tekstą balsas generuojamas iš naujo
**Trukmė:** 35 sek. (2 epizodai)
**Šaltinis:** `clv-mokymu-platformos-redisign-html/turinys/adaptuota/kursai/*.json` › `explaineris` — generuoja `scripts/epizodai-i-scenarijus.py`; ranka neredaguoti.
**Pamoka platformoje:** `pam_906` · senoji WP pamoka `kaip-prisijungti-ir-kas-ka-gali`
**Išvestis platformai:** kiekvienas kadras — atskiras klipas `{epizodo id}.mp4` + `.vtt` (subtitrai iš balso); YouTube rinkiniui — su intro / outro

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Prisijungiate prie svetainės valdymo | 17 sek. | 01-prisijungimas | Prie svetainės adreso pridedate „/admin“. Įrašote el. paštą ir slaptažodį. Spaudžiate „Prisijungti“ – atsidaro darbalaukis. |
| 2 Pridedate kolegą su role „Redakcija“ | 18 sek. | 05-pridedate-kolega | Sąraše „Vartotojai“ spaudžiate „Pridėti vartotoją“. Užpildote vardą, pavardę ir el. paštą. Prie „Rolės“ pažymite „Redakcija“ ir išsaugote. |

---

## Kadrai

### KADRAS 1: Prisijungiate prie svetainės valdymo (17 sek.) — epizodas
**Failas:** `01-prisijungimas.png`
**Ekrane:** Naršyklės adreso juosta: prie „mokykla.lt“ dopildoma „/admin“. Atsidaro langas „Prisijungimas“ su dviem laukais ir mygtuku „Prisijungti“; kursorius įrašo el. paštą, slaptažodį (taškeliai) ir spaudžia mygtuką. Ekranas persijungia į darbalaukį su kairiuoju meniu.
**Ekrano užrašai (tiksliai):** „/admin“, „Prisijungimas“, „Prisiminti mane“, „Prisijungti“, „Darbalaukis“
**TVS UI komponentai:** naujas: naršyklės adreso juosta, tvs-input, tvs-btn, tvs-cursor, tvs-ripple, tvs-side
**Demo duomenys:** el_pastas: v.kudirka@mokykla.lt, mokykla: Demo mokykla
**Tarimo kandidatai:** admin, el. paštą (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/01-prisijungimas--pradedanciojo-prisijungimas-roles.md`
**Komentaras:** epizodas `ep_906_01_1` · dalis `dal_906_01` „Kaip prisijungti“ · prioritetas 1 · pagrindas: dal_906_01 paaiškinimas; skeleton admin/login 2026-10-18: laukai, „Prisiminti mane“, „Prisijungti“, „Pamiršote slaptažodį?“

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Prie svetainės adreso pridedate „/admin“. |
| 2.6 | garsas | rasymas |
| 5.9 | balsas | Įrašote el. paštą ir slaptažodį. |
| 7.7 | garsas | rasymas |
| 9.3 | balsas | Spaudžiate „Prisijungti“ – atsidaro darbalaukis. |
| 11.1 | garsas | spustelejimas |
| 12.3 | garsas | patvirtinimas |

### KADRAS 2: Pridedate kolegą su role „Redakcija“ (18 sek.) — epizodas
**Failas:** `05-pridedate-kolega.png`
**Ekrane:** TVS „Vartotojai“ sąrašas; kursorius spaudžia „Pridėti vartotoją“. Forma: laukai „Vardas“, „Pavardė“, „Rodomas vardas“, „Vartotojo vardas“, „El.paštas“ užpildomi, bloke „Rolės“ pažymimas langelis „Redakcija“, spaudžiama „Išsaugoti“. Sąraše atsiranda nauja eilutė su būsena „Aktyvus“.
**Ekrano užrašai (tiksliai):** „Pridėti vartotoją“, „El.paštas“, „Rolės“, „Redakcija“, „Išsaugoti“, „Aktyvus“
**TVS UI komponentai:** tvs-table, tvs-row, tvs-btn, tvs-input, tvs-check, tvs-cursor, tvs-ripple
**Demo duomenys:** vardas: Marija Pečkauskaitė, el_pastas: m.peckauskaite@mokykla.lt, role: Redakcija
**Tarimo kandidatai:** El.paštas (tikrinti `kircio-patikra.js`)
**Nuorodos (senas įrašas):** `nuorodos/05-pridedate-kolega--pradedanciojo-prisijungimas-roles.md`
**Komentaras:** epizodas `ep_906_05_1` · dalis `dal_906_05` „Kaip pridėti kolegą“ · prioritetas 1 · pagrindas: dal_906_05 paaiškinimas; skeleton admin/users/create 2026-10-18: formos laukai, „Rolės *“; rolės Cleverphant / Manager / Redakcija; eskizas 2026-10-31: trūkstami veiksmų garsai

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.2 | balsas | Sąraše „Vartotojai“ spaudžiate „Pridėti vartotoją“. |
| 2.8 | garsas | spustelejimas |
| 8.3 | balsas | Užpildote vardą, pavardę ir el. paštą. |
| 10.1 | garsas | rasymas |
| 12.1 | balsas | Prie „Rolės“ pažymite „Redakcija“ ir išsaugote. |
| 13.5 | garsas | spustelejimas |
| 14.1 | garsas | spustelejimas |
| 15.3 | garsas | patvirtinimas |
