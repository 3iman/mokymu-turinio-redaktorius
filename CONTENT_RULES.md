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
