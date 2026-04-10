# Terminų žodynas — Cleverphant mokymai

## Principas

Nuoseklumas ≠ sinonimai yra blogai.

Lietuvių kalba turtinga sinonimais, ir geri tekstai juos naudoja sąmoningai. Žodyno tikslas — **ne sunaikinti sinonimus**, o atskirti du dalykus:

1. **Kontekstinis sinonimas** — skirtingas žodis skirtingame kontekste, ir tai natūralu. Pvz. „įrašas" administracijoje (techninis sąrašo elementas) → „straipsnis" ar „naujiena" frontend'e (tai, ką mato skaitytojas). **Tai gerai.**

2. **Neatitikimas** — kai tas pats dalykas tame pačiame kontekste vadinamas skirtingai ir tai klaidina skaitytoją. Pvz. „ALT reikšmė" / „ALT tekstas" / „alt aprašas" vienoje pamokoje. **Tai blogai.**

Agentas taiso tik neatitikimus. Kontekstinius sinonimus palieka.

### Atsargumo taisyklė
Esamus tekstus redagavo žmogus, išmanantis lietuvių kalbos subtilybes. Prieš siūlydamas pakeitimą, agentas turi savęs paklausti: „Ar čia tikrai neatitikimas, ar tai sąmoningas sinonimas, kuris čia skamba geriau?"

Šis žodynas sudarytas perskaitant visas 47 platformos pamokas (2026-04).

---

## Turinio tipai

| Kanonininis terminas | Kada naudoti | NENAUDOTI |
|---|---|---|
| **Straipsnis** | Naujienų tipo turinys, matomas svetainėje skaitytojui | „postas" |
| **Naujiena** | Sinonimas „straipsniui" kai kalbama apie naujienų kontekstą | — |
| **Įrašas** | Techninis/administracinis terminas — elementas sąraše (CMS viduje) | — |

> **Kontekstinis sinonimas:** „Įrašas" = CMS administracijoje (item sąraše). „Straipsnis" / „naujiena" = frontend, tai ką mato skaitytojas. Abu teisingi savo kontekste.
| **Puslapis** | Statinis svetainės puslapis | „page'as", „langas" |
| **Subpuslapis** | Vaikinis puslapis (puslapis puslapyje) | „vaikinis puslapis" |
| **Dokumentas** | Failas dokumentų banke (atsisiuntimui, spausdinimui, pasirašymui) | „failas" (kai kalbama apie dokumentų banką) |
| **Failas** | Techninis terminas — Google Sheets failas, įkeltas failas | „dokumentas" (kai kalbama apie techninį failą) |
| **Nuotrauka** | Fotografija, realus vaizdas | „paveikslėlis" (kai kalbama apie nuotraukas) |
| **Paveikslėlis** | Grafinis elementas (logotipas, schema, iliustracija) | „nuotrauka" (kai kalbama apie grafiką) |
| **Baneris** | Vizualinis reklaminis elementas šoniniame stulpe | — |
| **Vaizdo įrašas** | Video turinys | „video" (naudoti tik techniniame kontekste) |
| **Garso įrašas** | Audio turinys | „audio" (naudoti tik techniniame kontekste) |
| **Kintamasis** | Pernaudojamas teksto fragmentas TVS | — |

## Sistema ir platforma

| Kanoninis terminas | Kada naudoti | NENAUDOTI |
|---|---|---|
| **Turinio valdymo sistema / TVS** | Kai kalbama apie Pyro CMS | „Cleverphant", „CMS", „sistema" (be konteksto) |
| **Svetainė** | Kliento interneto svetainė | „saitas", „website", „puslapis" (kai kalbama apie visą svetainę) |
| **Mokymų platforma** | mokymai.cleverphant.lt | „mokymų svetainė", „kursų svetainė" |
| **Turinio redaktorius** | CKEditor sąsaja TVS viduje | „CKEditor", „CK redaktorius", „redaktorius", „editorius" |
| **Darbalaukis** | TVS pagrindinis langas | „dashboard" |
| **Administratorius** | Svetainės turinio valdytojas | „adminas", „admin" |

## TVS moduliai

| Kanoninis terminas | Kada naudoti | NENAUDOTI |
|---|---|---|
| **Dokumentų bankas** | Dokumentų valdymo modulis | „failų saugykla", „dokumentų biblioteka" |
| **Naujienų sąrašas** | Straipsnių sąrašas administracijoje | „naujienų feed'as", „srauto valdymas" |
| **Puslapių medis** | Hierarchinė puslapių struktūra | „puslapių sąrašas" (kai kalbama apie medį) |
| **Navigacijų valdymas** | Meniu struktūros valdymas | — |
| **Pranešimų juostelė** | Oranžinė pranešimo juosta svetainės viršuje | „notification bar" |
| **Karuselė** | Pagrindinių vaizdų slankiklis | „slider", „hero slider" |
| **Laikmatis** | Atgalinės atskaitos modulis | „countdown", „timer" |
| **Banerių valdymas** | Banerių modulis | — |
| **Darbuotojų profilių valdymas** | Personalo modulis | — |
| **Autoriai** | Straipsnių autorių modulis | — |
| **Nuorodų valdymas** | Nuorodų modulis | — |
| **Partneriai ir draugai** | Partnerių logotipų modulis | „Klientai" (vidinis pavadinimas — paminėti tik kaip paaiškinimą) |
| **Pamokų laikas** | Pamokų tvarkaraščio modulis | — |
| **Turinio auditas** | Turinio peržiūros ir tikrinimo įrankis | — |
| **Papildinys** | Komponentas, rodantis modulio turinį puslapyje | „widget" |

## Turinio struktūros elementai

| Kanoninis terminas | Kada naudoti | NENAUDOTI |
|---|---|---|
| **Pavadinimas** | Turinio vieneto pavadinimas | — |
| **Slug** | URL-draugiškas identifikatorius | — |
| **Kategorija** | Turinio klasifikavimo vienetas | „katalogas", „grupė" |
| **Žyma** | Papildomas turinio žymėjimas | „tag'as", „etiketė", „grotažymė" |
| **Publikavimo data** | Data, nuo kurios turinys matomas | — |
| **Slėpimo data** | Data, nuo kurios turinys paslepiamas | „paslėpimo data", „rodyti iki" (UI etiketė OK) |
| **Atnaujinimo data** | Paskutinio redagavimo data | „paskutinio atnaujinimo data" |
| **Pagrindinė nuotrauka** | Straipsnio ar puslapio titulinė nuotrauka | „titulinė nuotrauka" |
| **Nuotraukos kadravimas** | Pagrindinės nuotraukos apkarpymas | „kadruotė" |
| **Įžanga** | Trumpas įvadinis tekstas po pavadinimu | „lead", „subtitle" |
| **Prisegimas** | Straipsnio prisegiams sąrašo viršuje (pin) | „pin'as" |
| **ALT tekstas** | Alternatyvus paveikslėlio aprašymas | „ALT reikšmė", „alt aprašas" |

## Navigacijos elementai

| Kanoninis terminas | Kada naudoti | NENAUDOTI |
|---|---|---|
| **Pagrindinė navigacija** | Pagrindinis svetainės meniu | „pagrindinis meniu" (OK kaip sinonimas) |
| **Juodoji navigacija** | Juoda meniu juosta | „juodasis meniu", „BLACK navigacija" |
| **Greitosios nuorodos** | Greito pasiekimo nuorodų rinkinys | — |
| **Subnavigacija** | Potinklinė navigacija | „tarpinių puslapių navigacija" |
| **Navigacijų grupė** | Navigacijos elementų rinkinys | — |
| **Nuoroda** | Hipersaitas, URL | „linkas" |
| **Šoninis stulpas** | Šoninė puslapio sekcija | „sidebar" |
| **Titulinis puslapis** | Pagrindinis svetainės puslapis | „home page", „pradinis puslapis" |

## Sintaksės

| Kanoninis terminas | Kada naudoti | NENAUDOTI |
|---|---|---|
| **Sintaksė** | Specialus kodas turinio redaktoriuje dinaminiam turiniui | „shortcode", „kodas" (be konteksto) |
| **Garbanotieji skliaustai** | `{{ }}` simboliai | „curly braces", „riestiniai skliaustai" |

## Formatavimo terminai

| Kanoninis terminas | Kada naudoti | NENAUDOTI |
|---|---|---|
| **Antraštė** (H2, H3, H4) | Teksto antraštės lygiai | „heading" |
| **Pastraipa** | Teksto blokas | — |
| **Sąrašas** | Numeruotas arba nenumeruotas | „bullet points" |
| **Citata** | Teksto citavimas | „blockquote" |
| **Pastorintas** | Bold teksto stilius | „bold" |

## Prieinamumo terminai

| Kanoninis terminas | Kada naudoti | NENAUDOTI |
|---|---|---|
| **Prieinamumas** | Svetainės pritaikymas neįgaliesiems | „accessibility" |
| **Gestų kalba** | Lietuvių gestų kalba | — |
| **Lengvai suprantama kalba** | Easy-to-read standartas | — |
| **Ekrano skaitytuvas** | Pagalbinė technologija neregiams | „screen reader" |
| **Kontrasto režimas** | Padidinto kontrasto rodymas | — |

## Veiksmai

| Kanoninis terminas | Kada naudoti | NENAUDOTI |
|---|---|---|
| **Publikuoti** | Padaryti turinį matomą svetainėje | „paskelbti", „paleisti", „įjungti" |
| **Įkelti** | Failą ar nuotrauką patalpinti į sistemą | „upload'inti", „sutalpinti" |
| **Priskirti** | Kategoriją, žymą, autorių susieti su turiniu | „pridėti" (kai kalbama apie ryšį) |
| **Kopijuoti** | Google Sheets failą ar kodą | „nukopijuoti", „pasikopijuoti" |
| **Dubliuoti** | Sukurti turinio kopiją TVS viduje | — |
| **Įterpti** | Sintaksę ar elementą į turinio redaktorių | „embed'inti" |
| **Formatuoti** | Teksto stilių taikyti | — |
| **Kadruoti** | Nuotrauką apkarpyti | „apkirpti", „crop'inti" |

---

## Rastos neatitiktys platformoje (2026-04 auditas)

Peržiūrėjus 47 pamokas. Atskirta: tikros problemos vs. kontekstiniai sinonimai.

### Tikros problemos — taisytinos

Tai atvejai, kai **tame pačiame kontekste** tas pats dalykas vadinamas skirtingai ir tai klaidina:

| # | Problema | Kur rasta | Sprendimas |
|---|---|---|---|
| 1 | „ALT reikšmė" / „ALT tekstas" / „alt aprašas" | Vienos pamokos viduje (!) | **ALT tekstas** |
| 2 | „juodoji navigacija" / „juodasis meniu" / „BLACK navigacija" | Kelios pamokos | **juodoji navigacija** |
| 3 | „žymos" / „tag" / „tagai" / „grotažymė" | Kelios pamokos | **žyma / žymos** |
| 4 | „nuoroda" / „linkas" tame pačiame kontekste | Navigacijų valdymas | **nuoroda** |
| 5 | „pagrindinė nuotrauka" / „titulinė nuotrauka" — tas pats laukas | Naujienų anatomija vs. Pasikartojančios klaidos | **pagrindinė nuotrauka** |
| 6 | „papildinys" / „widget" | Pamokų laikas | **papildinys** |

### Kontekstiniai sinonimai — palikti kaip yra

Tai atvejai, kai skirtingas žodis naudojamas **skirtingame kontekste** ir tai natūralu:

| # | Sinonimai | Kodėl tai gerai |
|---|---|---|
| 1 | „Įrašas" (CMS) / „straipsnis" (frontend) / „naujiena" (naujienų kontekstas) | Skirtingi kontekstai — admin vs. skaitytojas |
| 2 | „Slėpimo data" / „rodyti iki" | Vienas — terminas tekste, kitas — UI etiketė sistemoje |
| 3 | „Nuotrauka" / „paveikslėlis" | Nuotrauka = foto, paveikslėlis = grafika — skirtingi dalykai |
| 4 | „Dokumentų rinkinys" / „dokumentų kategorija" | Rinkinys = ką mato skaitytojas, kategorija = ką mato administratorius |
| 5 | „Atnaujinimo data" / „paskutinio atnaujinimo data" | Ilgesnė forma aiškesnė kai reikia konteksto |
| 6 | „Partneriai ir draugai" / „Klientai" | Pamokoje jau paaiškinta, kad vidinis pavadinimas kitoks |

---

## Esamų tekstų tobulinimas

Agentas, dirbdamas su esamais tekstais platformoje, **švelniai suvienodina terminologiją**:

1. Skaitydamas esamą pamoką — fiksuoja **tik tikrus neatitikimus**, ne kontekstinius sinonimus
2. Prieš siūlydamas pakeitimą, klausia savęs: „Ar čia neatitikimas, ar sąmoningas pasirinkimas?"
3. Siūlo pakeitimus žmogui konkrečiai: „Pamokoje 'Pritaikymas neregiams' viename sakinyje rašoma 'ALT reikšmė', kitame 'alt aprašas'. Siūlau suvienodinti į 'ALT tekstas'. Ar sutinkate?"
4. **Niekada nekeičia be patvirtinimo** — tik siūlo
5. Kartu su terminų keitimu gali pasiūlyti ir vidines nuorodas kur trūksta

### Prioritetai tobulinant:
1. **Tikri neatitikimai** — kai tame pačiame kontekste maišosi terminai
2. **Vidinės nuorodos** — kur mini kitą temą, duok nuorodą
3. **Tonas** — jei kažkur liko liepiamoji nuosaka ar per ilgas paaiškinimas
4. **Niekada nekeisti turinio prasmės** — tik formą
5. **Niekada neliesti kontekstinių sinonimų** — jie ten dėl priežasties
