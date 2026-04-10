# Darbo eiga — Mokymų platformos redaktorius

## Trys scenarijai

| | A: Nauja pamoka | B: Iliustracijos esamam turiniui | C: Esamų tekstų tobulinimas |
|---|---|---|---|
| Įvestis | Tema / YouTrack | Esamas pamokos turinys | Pamoka arba kursas |
| Kas vyksta | Tekstas + iliustracijos | Tik iliustracijos | Terminai, nuorodos, tonas |
| Pirmas klausimas | — | „Kurioms sekcijoms?" | Pateikia rastų neatitikimų sąrašą |

---

## Nulinė fazė: CMS pažinimas

Prieš bet kokį turinio kūrimą agentas turi pažinti sistemą iš vidaus.

### Pyro CMS (svetainių TVS)
- `admin_login` — prisijungti prie kliento svetainės administracijos
- Peržiūrėti kaip atrodo turinio struktūra: puslapiai, moduliai, sintaksės
- Suprasti kaip veikia Google Sheets integracija, dokumentų bankas, navigacijos ir kiti moduliai
- Rinkti realius duomenis ir ekrano vaizdus iliustracijoms

### WordPress mokymų platforma
- Per Chrome MCP prisijungti prie `mokymai.cleverphant.lt/wp-admin/`
- Peržiūrėti kaip sukurtas Kursas: kokie laukai, kaip struktūruotas turinys
- Suprasti kaip įterpiamos iliustracijos, video, accordion sekcijos
- Išmokti publikavimo procesą: kur spausti, ką užpildyti

### Kada naudoti:
- **Prieš pirmą kartą** — pilna sistemos peržiūra
- **Kai neaišku** — bet kuriuo metu agentas gali pats nueiti pasižiūrėti, o ne klausti žmogaus
- **Kai rašo apie konkretų modulį** — nueina į CMS pamatyti kaip jis realiai atrodo

---

## Scenarijus A: Nauja pamoka nuo nulio

### 1. Užduoties priėmimas

**Žmogus pateikia vieną iš:**
- Laisvą temą: „Parašyk pamoką apie Google Sheets integracijos pradžią"
- YouTrack nuorodą: `https://youtrack.cleverphant.lt/issue/MOK-42`
- YouTrack numerį: `MOK-42`

**Agentas:**
1. Jei YouTrack — nuskaito užduotį (`youtrack_read_issue`)
2. Peržiūri susijusias esamas pamokas platformoje (Chrome MCP)
3. Pateikia trumpą supratimo santrauką: „Supratau, kad reikia... Ar teisingai?"

---

### 2. Teksto rašymas

**Agentas rašo pamoką standartine struktūra:**

```
Pamokos pavadinimas

[Intro] — Įžanginė pastraipa (kodėl tai svarbu, kas bus aptarta)

[01] Pirma sekcija
     Antraštė (dažnai klausimo forma)
     Turinys

[02] Antra sekcija
     ...

[03] Trečia sekcija
     ...
```

**Laikosi:** `agent/TONE_RULES.md`

**Outputas:** Pamokos turinys failuose, aiškiai sunumeruotomis sekcijomis.

---

### 3. QA — teksto tikrinimas

**Agentas atlieka savikontrolę prieš rodydamas žmogui:**

| Tikrinimas | Kas tikrinama |
|---|---|
| Tonas | Ar nėra liepiamosios nuosakos? Ar „jūs" forma? |
| Terminai | Ar niekur neparašyta „Cleverphant"? Ar nėra angliškų UI terminų? |
| Rišlumas | Ar sekcijos logiškai seka viena kitą? |
| Skaitomumas | Ar sakiniai trumpi? Ar nėra perteklinių žodžių? |
| Tikslumas | Ar faktai teisingi? Ar UI elementų pavadinimai atitinka realybę? |
| Struktūra | Ar yra KODĖL prieš KAIP? Ar antraštės informatyvios? |

**Jei randa problemų — pataiso pats, nepateikia su klaidomis.**

**Tada pateikia žmogui peržiūrai.** Žmogus komentuoja, agentas taiso.

---

### 4. Iliustracijų planavimas

**Kai tekstas patvirtintas:**

1. Agentas analizuoja tekstą
2. Siūlo iliustracijų planą:
   ```
   Siūlau 5 iliustracijas:
   
   01 — Workflow: kaip veikia sinchronizacija (3 žingsniai)
   02 — URL anatomija: failo ID ir gID struktūra
   03 — Vertikali instrukcija: kopijos sukūrimas (4 žingsniai)
   04 — Share dialogo mockup su anotacijomis
   05 — Do/Don't: lentelės redagavimo taisyklės
   ```
3. **Žmogus tvirtina planą** arba koreguoja

---

### 5. Iliustracijų kūrimas

**Po patvirtinto plano — kuria po vieną:**

1. Sukuria HTML šabloną + content JSON
2. Sugeneruoja PNG (`node generate.js --png`)
3. **Parodo žmogui kiekvieną iliustraciją atskirai**
4. Žmogus kiekvienai iliustracijai:
   - ✅ Tvirtina — eina prie sekančios
   - 💬 Komentuoja — agentas taiso ir rodo dar kartą

**Taisyklių failai:**
- `DESIGN_RULES.md` — vizualinis stilius
- `TEXT_RULES.md` — iliustracijų tekstai
- `CONTENT_RULES.md` — duomenys ir nuoseklumas

---

### 6. Publikavimas

**Kai tekstas ir visos iliustracijos patvirtintos:**

1. Agentas praneša: „Viskas patvirtinta. Publikuoju?"
2. **Žmogus patvirtina**
3. Agentas siunčia į WordPress:
   - Įkelia PNG iliustracijas į media
   - Sukuria / atnaujina Kursą su turiniu
   - Įterpia iliustracijas į atitinkamas sekcijas

### WordPress platforma:
- WordPress + Bricks builder
- Automatic.css stilių sistema
- Meta Box custom post types (Kursai)
- URL: `mokymai.cleverphant.lt/kursai/{kurso-slug}/{pamokos-slug}/`

---

### 7. QA — frontend tikrinimas

**Po publikavimo:**

1. Agentas per Chrome MCP atidaro publikuotą pamoką
2. Tikrina:
   - Ar iliustracijos matomos ir teisingos?
   - Ar tekstas teisingai suformatuotas?
   - Ar navigacija veikia (Ankstesnis / Kitas)?
   - Ar breadcrumb teisingas?
3. Jei randa problemų — praneša žmogui
4. Jei viskas gerai — praneša „Publikuota ir patikrinta ✓"

---

## Scenarijus B: Iliustracijos esamam turiniui

### 1. Turinio peržiūra

**Žmogus pateikia:** nuorodą į esamą pamoką arba tekstą.

**Agentas:**
1. Perskaito turinį
2. Klausia: **„Kurioms sekcijoms reikia iliustracijų?"**
   ```
   Pamokoje matau 8 sekcijas:
   
   [01] Naujienų sąrašas
   [02] Pavadinimas ir Slug
   [03] Publikavimo ir slėpimo datos
   [04] Įrašo autoriai
   [05] Nuotraukų autoriai
   [06] Kategorija
   [07] Žymos
   [08] Pagrindinė nuotrauka
   
   Kurioms norite iliustracijų?
   ```
3. Žmogus pasirenka: „01, 03, 06, 08"

### 2–5. Toliau kaip Scenarijus A (žingsniai 4–7)

Planavimas → patvirtinimas → kūrimas → kiekvienos tvirtinimas → publikavimas → QA.

---

## Scenarijus C: Esamų tekstų tobulinimas

### 1. Peržiūra

**Žmogus pateikia:** pamokos nuorodą, kurso pavadinimą, arba „peržiūrėk visas pamokas".

**Agentas:**
1. Perskaito turinį per Chrome MCP
2. Tikrina pagal `GLOSSARY.md` — ar terminai nuoseklūs
3. Tikrina ar yra vietos vidinėms nuorodoms
4. Tikrina toną — ar nėra liepiamosios nuosakos, per ilgų pastraipų

### 2. Ataskaita

Pateikia žmogui struktūruotą sąrašą:
```
Pamoka: „Naujienų anatomija"

Terminai:
- 3× „įrašas" → siūlau „straipsnis" (pagal žodyną)
- 1× „meniu" → siūlau „navigacija"

Vidinės nuorodos:
- Sekcija „Kategorija" — mini kategorijas, bet nenukreipia į pamoka apie kategorizavimą
- Sekcija „Sintaksės" — galima nukreipti į kursą „Sintaksės"

Tonas:
- „Kontroliuokite straipsnių kiekį" → „Straipsnių kiekį sąraše galima kontroliuoti"
```

### 3. Patvirtinimas ir vykdymas

- **Žmogus tvirtina** kiekvieną pakeitimų grupę
- Agentas atlieka pakeitimus
- Po pakeitimų — QA per frontend

### Svarbu:
- **Niekada nekeisti turinio prasmės** — tik formą
- Prioritetai: terminai → nuorodos → tonas
- Vienu metu keisti tik vieną pamoką — kad būtų lengva peržiūrėti

---

## Patvirtinimo taškai (žmogus visada tvirtina)

```
Tekstas parašytas          → žmogus tvirtina
Iliustracijų planas        → žmogus tvirtina
Kiekviena iliustracija     → žmogus tvirtina arba komentuoja
Publikavimas               → žmogus tvirtina
```

**Agentas niekada nesiunčia į produkciją be aiškaus „taip".**

---

## Įrankiai

### YouTrack
- `youtrack_read_issue` — užduoties detalės
- `youtrack_add_comment` — progreso pranešimas
- `youtrack_update_field` — statuso keitimas

### Google Sheets
- `sheets_api_get_tabs_list` — lapų sąrašas
- `sheets_api_read_cells` — realių duomenų nuskaitymas

### Chrome MCP
- `navigate`, `read_page`, `get_page_text` — turinio peržiūra
- `take_screenshot` — vizualinis tikrinimas

### Failų sistema + generavimas
- `Read`, `Write`, `Edit` — failų kūrimas
- `Bash: node generate.js --png` — iliustracijų generavimas
