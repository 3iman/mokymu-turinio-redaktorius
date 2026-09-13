# Turinio taisyklės — iliustracijos

## Realistiški duomenys
- Iliustracijose naudojame **tikrus duomenis** iš realaus šablono / produkto
- Niekada nekuriame pramanytų pavyzdžių (ne „Kainos", „Tvarkaraštis" — o tai, kas iš tikrųjų yra šablone)
- Prieš kuriant iliustraciją, pasitikriname faktinius duomenis (per API, per failą)

### Dabartinio šablono duomenys
- Lapų pavadinimai: **Gimnazijos taryba**, **Mokytojų sąrašas**, **Darbo užmokestis**
- gID reikšmės: `0`, `1890969320`, `1753601957`
- Lentelės stulpeliai: Eil. Nr., Vardas pavardė, Atstovavimas

## Tarpusavio nuoseklumas
- Jei keliose iliustracijose rodomi tie patys elementai (pvz. lapų pavadinimai 02 ir 06), **duomenys turi sutapti**
- Viena iliustracija neturi prieštarauti kitai
- Spalvos ir stilius turi derėti tarpusavyje per visą seriją

### Personažų nuoseklumas per seriją
Kai pamokoje per kelias iliustracijas rodomi tie patys lentelės duomenys (pvz., Mokytojų sąrašas), naudoti **tą patį personažų rinkinį** visose iliustracijose. Pavyzdys iš Lentelių redagavimo pamokos:

| Vardas, pavardė | Pareigos įstaigoje |
|---|---|
| Jolanta Kazlauskienė | Lietuvių kalbos mokytoja |
| Rasa Petraitienė | Matematikos mokytoja |
| Mindaugas Petraitis | Istorijos mokytojas |
| Domas Jonaitis | Fizinio ugdymo mokytojas |
| Jūratė Mikalauskienė | Anglų kalbos mokytoja |

Jei iliustracija rodo trumpesnę lentelę (pvz., 3 eilutes), imti pirmas tris iš rinkinio, ne kurti naujų vardų. Trumpintos versijos (pvz., „Jolanta K.") atitinka pilną vardą.

## Lentelių struktūros konvencijos

### Du TH iš eilės nebūna
- Lentelė turi **vieną eilę stulpelinių antraščių** (TH)
- Grupinės antraštės (pvz., „Mokytojai", „Tėvai") eina kaip **`<tr>` su `<td colspan="N">`**, ne kaip antros eilės TH
- Dvi eilės TH iš eilės vizualiai susilieja net jei spalvos skiriasi — skaitytojas nesupranta struktūros
- Grupinės antraštės atskiriamos viena nuo kitos **duomenų eilutėmis**, ne kitais grupiniais TH

### Grupinių antraščių spalva
Ta pati kaip TH (`--c-blue-solid` pagal nutylėjimą). Ne darker navy, ne kontrastinė — užtenka `colspan` + padding, kad vizualiai atskirtų nuo duomenų eilučių.

### Colspan'o naudojimas
- **Grupinėms antraštėms:** `<tr><td colspan="N">Mokytojai</td></tr>`
- **Tuščių eilučių antipaternų** demonstracijai — rodom su `colspan` ir raudonu fonu, bet **tik kaip KLAIDOS pavyzdį**, niekada kaip teisingą praktiką

### TH be uppercase
Lentelių antraštės ir grupinės antraštės rašomos **natūraliu registru**, ne uppercase. Pilna taisyklė: `memory/project_table_headers_no_uppercase.md`. Išimtis — smulkios dekoratyvios etiketės (badges) kortelių viršuje, pvz., „KRAŠTUTINIS ATVEJIS", „ATVEJIS 1" — jos **gali** būti uppercase, nes nėra lentelės antraštės.

### Stulpelių pavadinimų konvencija personalo sąrašuose
- „Vardas, pavardė" (ne „Pavardė, vardas", ne „Vardas ir pavardė")
- „Pareigos įstaigoje" (ne „Dalykas") — pilna taisyklė: `memory/project_pareigos_istaigoje_format.md`
- „Eil. Nr." (su tarpu po taško) — numeruotam stulpeliui

## Auditorijos kalba
- Auditorija — **lietuviškai kalbantys** žmonės, dažnai ne IT specialistai
- Google Sheets sąsajos elementai rodomi **lietuviškai** (taip, kaip vartotojas mato savo ekrane):

| Angliškai | Lietuviškai |
|-----------|-------------|
| Share | Bendrinti |
| General access | Bendroji prieiga |
| Anyone with the link | Visi, turintys nuorodą |
| Viewer | Žiūrintysis |
| Done | Atlikta |
| File → Make a copy | Failas → Sukurti kopiją |

- Jei ateityje pridedama naujų UI elementų — visada patikrinti kaip jie atrodo lietuviškoje Google Sheets sąsajoje

## Failų pavadinimai ir struktūra
- Šablonų failai: `NN-trumpas-pavadinimas.html` (pvz. `03-kopija-pavadinimas-formatas.html`)
- Content raktai: `NN_trumpas_pavadinimas` (brūkšneliai keičiami į pabraukimus)
- Output: `lessons/{pamoka}/output/{lang}/NN-trumpas-pavadinimas.png`
- Pavadinimas turėtų būti **apie 3 žodžiai**, apibūdinantys turinį
- **Failų pavadinimai generuojami ta kalba, kuriai kuriamas turinys**
  - LT: `03-kopija-pavadinimas-formatas.html`
  - DE: `03-kopie-benennung-format.html`
  - PL: `03-kopia-nazwa-format.html`

## Daugiakalbystė ir specialūs simboliai

### Šriftas
- **Inter** — Cleverphant dizaino sistemos šriftas, naudojamas visur
- Inter palaiko Latin Extended — tinka vokiečių (ä, ö, ü, ß), lenkų (ł, ż, ź, ś, ć, ń, ą, ę) ir kitoms kalboms

### Failų pavadinimuose — tik ASCII
- Nors failai vardinami tiksline kalba, **specialūs simboliai transliteruojami**:
  - ä → ae, ö → oe, ü → ue, ß → ss (vokiečių)
  - ł → l, ż → z, ś → s, ć → c, ń → n (lenkų)
  - ą → a, ę → e, ų → u, ū → u, č → c, š → s, ž → z (lietuvių)
- Priežastis: OS suderinamumas, git, web serveriai, URL encoding

### Teksto ilgio variacija
- Vokiečių žodžiai vidutiniškai **30-40% ilgesni** nei lietuviški
- Lenkų — panašaus ilgio kaip lietuviški
- **Iliustracijų šablonai turi atlaikyti ilgesnius tekstus** — naudoti `flex-wrap`, vengti fiksuoto pločio tekstiniams elementams
- Prieš pridedant naują kalbą — patikrinti ar tekstai neišlenda už kortelės ribų

### Content JSON struktūra
- Kiekviena kalba turi atskirą `{lang}.json` failą `content/` folderyje
- Raktai (keys) visose kalbose **vienodi** — keičiasi tik reikšmės
- `lang` laukas naudoja ISO 639-1 kodus: `lt`, `en`, `de`, `pl`
