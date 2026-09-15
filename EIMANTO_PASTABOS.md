# Eimanto pastabos — kaupiamasis sąrašas

Terminų žodynas yra `Archive1011/GLOSSARY.md`, tono taisyklės — `CLAUDE.md`.
Bet iki 2026-09-13 nebuvo vietos, kur gultų **gyvos pastabos**, pasakytos darbo metu.
Jos būdavo pritaikomos tam tekstui ir dingdavo. Šis failas tą spragą uždaro.

⛔ Įrašas daromas **tą akimirką**, kai pastaba pasakoma, ne sesijos gale.
Kiekvienas įrašas: data, tiksli citata arba esmė, ir ką daryti kitą kartą.

---

## Turinys

### 2026-09-13 · Netikslus teiginys apie architektūrą

> „Jis gyvena turinio valdymo sistemos pagrinde – ne kiekvienoje svetainėje atskirai.“

**Kodėl blogai:** svetainės veikia kaip atskiros ir turi savo tam skirtą modulį, kurio
naujausia versija patenka visiems. „Gyvena pagrinde“ apibūdina architektūrą, kurios nėra.

**Kitą kartą:** „yra atskiras turinio valdymo sistemos **modulis**, o naujausia jo versija
pasiekia visas svetaines“. Jei tiksliai suformuluoti nepavyksta — teiginio **nerašyti**.

### 2026-09-13 · „Pagrinde“ = „viduje“

`background` verčiame **„viduje“**, ne „pagrinde“. Žodis „pagrinde“ lietuviškai reiškia
„daugiausia“, tad sakinys sako ne tai, ką norėta.

### 2026-09-13 · Kam skirti trys sakiniai

> „Į pareigūno laišką atsakote trimis sakiniais:“ → „Pareigūnui galima persiųsti šiuos
> tris teiginius.“

**Kodėl:** skaitytojas nerašo laiško iš naujo — jis persiunčia paruoštą tekstą.
Formuluotė turi atitikti tikrą veiksmą, ne įsivaizduojamą.

### 2026-09-13 · Pirmas kartas ir grįžimas yra skirtingi vaizdai

Slapukų valdymo puslapyje pasirinkimai būna pažymėti **tik** tada, jei lankytojas
anksčiau spaudė „Sutinku“ arba „Nesutinku“. Paspaudus „Nustatymai“ pirmą kartą —
nepažymėta nieko.

**Kitą kartą:** kai pamoka liepia kažką pamatyti ekrane, patikrinti, ar tas vaizdas
vienodas **pirmam** ir **grįžtančiam** lankytojui. Jei ne — abu atvejai aprašomi.

---

## Vizualai

### 2026-09-13 · Kiekvienas punktas turi vizualą

> „Kiekvienas punktas turi būti vienaip ar kitaip vizualizuojamas. Čia standartas.“

Vienos vizualizacijos duoda daugiau vertės, kitos mažiau, bet jos veikia ne tik kaip
komunikacija — **ir kaip prekės ženklas**. Septynių sekcijų pamoka = septyni vizualai
plius viršelis.

### 2026-09-13 · Vizualas rodo tikrą turinį, ne pieštą mygtuką

> „Jei tu rodai Slapukų valdymas kaip mygtuką, tai ieško to mygtuko. Reikia rodyti
> footerio apačią iškadruotą ir kažkaip parodyti, kur tiksliai ta meniu nuoroda.“

**Taisyklė:** pusė „taip yra jūsų svetainėje“ yra nukirptas **tikros svetainės ekranas**
su žiedu apie reikiamą vietą. Piešiamas tik antipaternas, kurio tikrame ekrane nėra.
Ekranai imami iš skeletono, kad nefigūruotų svetimos mokyklos pavadinimas.

### 2026-09-13 · Ekrano nuotrauka vizuale — negražu ir pavojinga

> „Šią dalį tu pasidarei screenshotą iš skeletono. Bet ji atrodo negražiai. Perpiešk pagal
> vizualo stilių. Visų pirma negerai rodyti tikros mokyklos rekvizitus. Antra, turėtų būti
> Cleverphant ženkliukas apačioje.“

**Taisyklė:** ekrano nuotrauka yra darbo priemonė, ne galutinis vaizdas. Pagal ją
patikrinamos tikrosios detalės, o tada tas pats vaizdas **perpiešiamas šablone** mūsų
tokenais ir šriftu. Vizuale negali būti tikros mokyklos pavadinimo, adreso, el. pašto ar
įmonės kodo — tik „Mokyklos pavadinimas", „Mokyklos g. 1, Miestas". Poraštės apačioje
dešinėje — Cleverphant ženklas.

Pastaba pasikartojo antrą kartą tą pačią dieną („šią skaidrę ir reikia mūsų stiliumi
supaišyti"), tad galioja **visoms** skaidrėms, ne tik tai, kuri buvo parodyta.

### 2026-09-13 · Animacija daroma pagal principus, ne pagal nutylėjimą

> „Ar montuodamas video panaudojai teorinią medžiagą kaip animacijas daryti pagal Walt
> Disney principus?“

Ne. `generate-video-clips.js` be įrašo `TEMPLATE_ANIMATIONS` klipui duoda `FALLBACK_CSS` —
vienodi tarpai, jokios vidinės sekos. Video susimontuoja ir atrodo tvarkingai, tad klaida
tyli.

**Kitą kartą:** kiekvienam naujam šablonui rašomas savas animacijos įrašas pagal
`ANIMATION_PRINCIPLES.md` — staging, svorio skirtumai, sequential annotation, netolygios
pauzės, `--ease-spring`, ne daugiau kaip 2–3 judantys elementai vienu metu.

### 2026-09-13 · Monotonija turėjo tris technines priežastis

> „Animacija Youtubui monotoniška išėjo.“

Pamatavus: kiekvienas klipas sustingdavo ties 2–2,5 s ir likusias 3,5–4 s rodydavo
nejudantį paveikslėlį. Iš 79 s video ~30 s (38 %) buvo stop kadras. Trys priežastys ir
trys taisymai:

1. **Kadrai buvo renkami realiu laiku**, o CSS animacija suko savo laikrodį, tad 4,5 s
   seka suspausdavo į ~2 s. Taisymas: animacijos pristabdomos ir kiekvienam kadrui
   nustatomas tikslus `currentTime` (`generate-video-clips.js`).
2. **`build-video.js` laikė, kad klipas visada 6 s** (`frame.duration - 6`) ir ant
   kiekvieno užklijuodavo papildomą stop kadrą. Taisymas: trukmė matuojama `ffprobe`.
3. **Vienodas ritmas** — visi klipai po 6 s, visi perėjimai po 2,5 s ir vienodi.
   Taisymas: trukmė imama iš scenarijaus lentelės (7–10 s pagal turinio svorį),
   perėjimas sutrumpintas iki 1,8 s, o jo kryptis kaitaliojasi pagal kadro numerį.

Papildomai: kryptingi atsiradimai pagal prasmę (grandinė slenka iš kairės, svetainės iš
dešinės, atsakymas išsiskleidžia, rodyklė nubrėžiama) ir lėtas kortelės dreifas, kad
kadras niekada visiškai nesustingtų.

**Rezultatas:** 89,6 s, nejudančių ruožų 10 s (11 %).

⛔ **Kitą kartą matuoti, ne žiūrėti.** „Monotoniška“ yra matuojamas dydis: kadrų skirtumas
kas 0,5 s parodo tiksliai, kur ir kiek laiko niekas nevyksta.

### 2026-09-13 · Skirtuko skaitymo laikas ir tiltelis į skaidrę

> „Žmona sakė, kad per greitai viskas sukasi. Nėra tinkamo perėjimo iš skirtuko į naują
> skaidrę.“ … „skaityti nori, nespėja“

Pamatavus: skirtuko numeris ir pavadinimas matėsi 0,1–0,5 s, o paskui 1,2 s tuščio ekrano.
Determinuotą laiką buvau pritaikęs tik skaidrėms, skirtukams — ne. Be to, pats
sutrumpinau skirtuką iki 1,8 s, nors taisyklės liepia laikyti pavadinimą apie 1,5 s.

**Taisyklės, galiojančios toliau:**
- pavadinimas skirtuke laikomas **ne trumpiau kaip 2 s**;
- skirtuko fonas ir vandens ženklas — **tokie patys kaip skaidrės**, kitaip pjūvis matomas;
- skaidrė **nekartoja** to, ką skirtukas ką tik pasakė: antraštė ateina iškart, be 1,3 s įžangos.

### 2026-09-13 · Vinjetės širdies plakimas

> „O gali likti širdies plakimo soundas kaip Cleverphant paskutinės vinjetės orginale?“

`build-video.js` autro perkoduodavo su `-an` ir garsą išmesdavo. Dabar vaizdas vis dar
konkatenuojamas be garso (visi klipai be jo), o vinjetės takelis įmaišomas atskirai, su
`adelay` iki vinjetės pradžios. Foninė muzika nutildoma 1,5 s prieš ją, kad plakimas
liktų vienas. Patikra: vinjetės ruožo vidurkis −29,5 dB prieš originalo −29,4 dB, pikas
abiejuose −0,9 dB.

### 2026-09-13 · Spalva turi ką nors reikšti

> „Reikia surasti spalvų nustatymą ir sugalvoti kaip tai panaudoti. Spalvų yra įvairesnių.“

Laukas `le_color`, šalia jo `le_background_selector` (`Default` / `Image` / `Video-URL`).
Iki tol 49 pamokos iš 72 buvo tos pačios rožinės, tad spalva nieko nesakė. Dabar ji koduoja
sritį: pradžia rožinė, turinys mėlyna, dokumentai žalsvai mėlyna, moduliai alyvinė,
pritaikomumas tamsiai mėlyna.

### 2026-09-13 · Viršelis, kuris kartoja antraštę, yra perteklius

> „Kodėl čia įdėjai paveikslėlį?“

Įdėjau todėl, kad pilkas blokas atrodė tuščias. Bet tame viršelyje buvo ta pati antraštė ir
tas pats įvadas, kurie jau stovi virš jo ir po juo. Skaitytojas tą patį sakinį perskaito du
kartus.

**Taisyklė:** `le_background_selector: Image` renkamasi tik tada, kai vizualas **prideda**
informacijos. Spalvos plotas viršuje nėra spraga — tai platformos norma. Jei jis atrodo
blankus, taisoma `le_color` reikšmė, ne dedamas paveikslėlis.

Viršelio vizualas lieka prasmingas video pirmame kadre, kur jis yra vienintelis dalykas
ekrane.

### 2026-09-13 · Sakiniai, kurie pasensta, kol juos skaito

> „Mus įvelia į faktų neatitikimą priklausomai kada kas paskaitys. Kažkaip labiau reikia
> vengti tokių sakinių. Mums nėra labai svarbu kada tikrinome ir ką konkrečiai patikrinome.“

Blogas sakinys pamokoje: *„2026 m. rugsėjį patikrinome jį pagal visus penkis inspekcijos
akcentuojamus punktus. Jūsų svetainė tarp patikrintų.“*

Trys atskiros bėdos viename sakinyje:
- **data** — po pusmečio skamba kaip senas darbas;
- **„tarp patikrintų“** — naujam klientui tai tiesiog netiesa;
- **„visus penkis punktus“** — kviečia klausimą „kuriuos penkis?“, į kurį pamoka neatsako.

**Taisyklė:** pamokoje ir vizuale rašomas **mechanizmas**, ne įvykis. Mechanizmas galioja
ir šiandien, ir po metų, ir svetainei, kurios tuo metu dar nebuvo.

| Vietoj įvykio | Savybė |
|---|---|
| „rugsėjį patikrinome“ | „reikalavimus stebime mes“ |
| „jūsų svetainė tarp patikrintų“ | „pataisymas pasiekia visas svetaines vienu metu“ |
| „43 iš 43 atitiko“ | *(į pamoką nerašoma visai)* |

⛔ **Riba: paviršiai su data ir be jos.** Straipsnis ir naujienlaiškis **yra** datuoti savo
prigimtimi — skaitytojas mato, kada parašyta, tad „rugsėjį patikrinome 43 iš 43“ ten lieka
ir netgi stiprina. Pamoka, vizualas ir video yra amžini: juose datų, kiekių ir „tarp
patikrintų“ tipo apibrėžčių nebūna.

Tas pats galioja smulkmenoms: poraštės makete buvo `© 2026`. Metai išimti — makete jie
nieko neprideda, tik pasensta.

### 2026-09-13 · „Toks pats“, ne „tas pats“

> „Slapukų valdymo modulis yra toks pats, o ne tas pats.“
> „Pataisome vienoje vietoje — tiesa, bet labiau mes atnaujiname visiems tą pačią versiją.“

Kiekviena svetainė turi **savo** modulio kopiją. „Tas pats“ lietuviškai reiškia vieną
bendrą egzempliorių, tad teiginys būtų techniškai neteisingas. Teisinga — **„toks pats“**.

Antra pusė tokia pat tiksli: mes ne „taisome vienoje vietoje“, o **atnaujiname visiems tą
pačią versiją**. Skirtumas svarbus: pirmas variantas leidžia įsivaizduoti vieną bendrą
sistemą, antras teisingai aprašo platinimą.

| Netikslu | Tikslu |
|---|---|
| „tas pats modulis visose svetainėse“ | „toks pats modulis visose svetainėse“ |
| „pataisome vienoje vietoje“ | „visoms svetainėms atnaujiname tą pačią versiją“ |
| „pataisymas pasiekia visas“ | „naują versiją gauna visos“ |

⛔ Tai ne stiliaus, o **fakto** pataisa. Produkto veikimą aprašantis sakinys turi atlaikyti
inžinieriaus skaitymą.

### 2026-09-13 · Ramus faktas stipriau už dramatišką

> „Ką renkame yra pernelyg dramatiškas sakinys, kad nei viename nerenkame vardo pavardės
> el.pašto ir t.t. Tiksliau gal būtų: Svetainė nerenka jokių asmens duomenų.“

Buvo: *„Nė viename stulpelyje nėra lankytojo vardo, pašto ar kitų asmens duomenų.“*
Dabar: *„Svetainė nerenka jokių asmens duomenų.“*

Trys taisymai viename sakinyje:
- **Išvardijimas, ko nėra, skamba kaip gynyba.** Kai pradedame vardyti „nei vardo, nei
  pašto, nei…“, skaitytojas ima svarstyti, kodėl apie tai kalbame.
- **„Asmens duomenys“ yra teisinis terminas**, „asmeninė informacija“ — ne. Tikslus
  terminas trumpesnis ir tvirtesnis.
- **Antraštėje „iš tikrųjų“ irgi buvo gynyba** („Kas jūsų svetainėje iš tikrųjų renkama“).
  Išimta.

⛔ **Bendra taisyklė:** ramus teiginys stipresnis už išvardytą neigimą. Jei sakinys
vardija, ko nėra, arba turi žodį „iš tikrųjų“, jis greičiausiai gina, o ne informuoja.

---

### 2026-09-15 · Balso scenarijus gimsta kartu su pirma idėja

> „Tiesiog darant Youtube filmuką, dar nuo pirmų kūrybinių idėjų turi būti kuriamas ir
> voiceover scriptas.“

Slapukų filmukas buvo sukurtas „be balso“, o balsą bandyta uždėti po to, kai kadrai, jų
trukmės ir ekrano tekstai jau buvo sustatyti. Tada balsui lieka tik tai, kas telpa į
svetimą ritmą: vienam kadrui tekstas netilpo, kitam liko tuščios sekundės.

**Taisyklė:** kiekvienas kadras nuo pirmo eskizo turi tris dalis — **ką rodo, ką sako
ekranas, ką sako balsas**. Kadro trukmė skaičiuojama iš balso, ne atvirkščiai.

⛔ **Balsas neskaito ekrano.** Jei balsas kartoja tą patį sakinį, kuris parašytas kadre,
žiūrovas tą patį gauna dukart ir sunkiau įsimena. Balsas papildo: ekranas parodo,
balsas paaiškina, kodėl.

Esamiems filmukams be balso išimtis: balsas **atsirenkamas iš pamokos teksto**, ne
rašomas iš naujo.

### 2026-09-15 · Kirtis: rÀštinė, ne raštInė

> „Kirčiavimas ne raštInė, o rAštinė.“

ElevenLabs `eleven_v3` žodį „raštinę“ sukirčiavo antrame skiemenyje. Iš trijų variantų
(be ženklo, „rãštinę“, „ràštinę“) Eimantas patvirtino **„ràštinę“** su kairiniu kirčio
ženklu tekste.

**Kitą kartą:** balso tekste žodį „raštinė“ rašyti su kairiniu ženklu. Kirtis pirmame
skiemenyje visose formose.

⛔ ElevenLabs tarimo žodynas **nesukurtas**: raktui trūksta teisės
`pronunciation_dictionaries_write`. Ar `eleven_v3` žodynus apskritai skaito, dar
nepatikrinta — dokumentacija to nesako.

### 2026-09-15 · Balsas nukirptas gale — ne tempas, o failo pabaiga

> „Pabaigoje balsas turėtų nusileisti savo tembre, nes dabar atrodo, kad nukirpta.“

Priežastis išmatuota, ne spėta: ElevenLabs failas baigiasi **tiksliai ties paskutine
raide**, kol balsas dar skamba (−25 dB paskutinėse 0,15 s). Maišymas po sakinio muziką
grąžindavo šuoliu ir nukirpimą pabrėždavo.

**Kitą kartą:** visi kadrų sakiniai generuojami **viena užklausa**, o po paskutinio
pridedamas atmetamas sakinys, kuris iškerpamas. Muzika po balsu prislopinama švelniai
(`sidechaincompress`, release ~0,9 s). Lėtinimas 10 % tempą padaro ramesnį, bet nukirpimo
nesutaiso.

### 2026-09-15 · Balsas turi skambėti kaip Darius — modelis ir versija renkami ausimi

> „Aš ElevenLabs esu testavęs Dariaus balsą ir antra generavimo versija yra artimesnė
> Dariaus balsui. Ar galima tai kontroliuoti kažkaip?“

„Antra versija“ buvo ne atsitiktinumas, o **kitas modelis**: ElevenLabs sąsaja šalia
`eleven_v3` rodė `eleven_v3_dpo_20260217`. Palyginus tą patį kadrą abiem, Eimantas išrinko
DPO. Iš trijų viso teksto versijų išrinkta trečia, `seed` 1779642367.

**Kitą kartą:**
1. Modelio ir balso nekeisti be klausymo — jie įrašyti `generate-voice.js`.
2. Naujam filmukui balso versija renkama iš kandidatų (`--kandidatai 3`), ir renka
   **Eimantas**, ne agentas — panašumą į Darių girdi tik žmogus, kuris jį pažįsta.
3. Profesionalus Dariaus klonas ElevenLabs paskyroje neapmokytas, API jo neleidžia naudoti.

### 2026-09-15 · Vinjetė — paskutinis senos vizualikos kadras

> „Kadras kur yra AČIŪ, kad mokotės paskutinis likęs iš senos vizualikos. Gal ir jį
> persidarome?“
> „Ir gal net Ačiū, kad skyrėte laiko būtų teisingesnis padėkojimas :)“

`autro.mp4` (2026-04) pirmos 4 s — sodriai mėlynas fonas (#3161ab) ir ranka pieštos raidės.
Paskutinis šviesus turinio kadras į jį šoka staigiai, o po 4 s — antras šuolis į šviesiai
mėlyną logotipo foną (#dfecf3).

**Sprendimas (koncepcija B, patvirtinta):** šviesus skaidrių fonas, centre „Ačiū, kad
skyrėte laiko“ dviem svoriais, brūkšnys iš žalsvai mėlynos į rožinę; išeinant fonas pereina
į #dfecf3, o brūkšnys **susitraukia į centrą** — ten, kur atsiras logotipas. Logotipo dalis
ir širdies plakimo garsas nekeičiami. Kol kas tik lietuviškai.

**Kodėl „skyrėte laiko“, ne „mokotės“:** kreipiamasi į suaugusį žmogų, kuris skyrė savo laiką,
ne į mokinį; tinka ir bet kuriam YouTube žiūrovui.

## Straipsniai (tinklaraštis)

### 2026-09-13 · Straipsnis nėra pamoka — taisyklės skirtingos

Perskaičiau visus septynis `cleverphant.lt/tinklarastis` straipsnius. Buvau parašęs savo,
nepažiūrėjęs į jokį — ir suklydau tuo, kad į straipsnį perkėliau **pamokos** taisykles.

| | Pamoka | Straipsnis |
|---|---|---|
| Ilgis | kiek reikia | **150–250 žodžių**, ilgiausias 473 |
| Antraštės | be klaustukų | **klausimo forma su klaustuku** („Kam to reikia?“, „Ką siūlome daryti?“) |
| Liepiamoji nuosaka | draudžiama | **naudojama** („Standartizuokite“, „Nepalikite nė vieno“) |
| „Cleverphant“ | draudžiama | **įvardijama**, dar ir atskiru bloku |

**Karkasas, kuris kartojasi visuose septyniuose:**

1. **H1 — klausimas arba citata iš mokyklos lūpų.** „Gelbėkit, mūsų mokyklos interneto
   svetainę nulaužė!“, „Kaip organizuoti mokyklos interneto svetainės turinį?“
2. **Pradžia — lauko stebėjimas, ne naujiena.** „Dirbdami su įvairiomis mokyklomis
   pastebėjome tendenciją…“, „Kai kalbame su švietimo įstaigomis…“, „Girdime, kad…“
3. **Klaidingas įsivaizdavimas, tada apvertimas.** „Pradėkime nuo to, kaip įstaigos
   įsivaizduoja… Tačiau dažnai būna visiškai priešingai.“
4. **H3 paantraštės — klausimai.**
5. **Blokas „Ką daro Cleverphant 🐘“** — sąrašu, prieš pabaigą.
6. **Pabaiga — tiesioginis kreipinys.** „Tai ar galime sutarti, kad dirbsime išvien?
   Pasidalinkit šia informacija su kolegomis.“

Skaičiai konkretūs ir iš praktikos: „per mėnesį ~10 įrašų, per metus ~100, dar po metų 200“.

⛔ **Mano pirmoji versija buvo 477 žodžiai, be klaustukų, be Cleverphant ir baigėsi šaltinių
sąrašu.** Perrašyta iki 164 žodžių pagal šį karkasą. Senoji palikta kaip
`straipsnis-senas.md` palyginimui.

### 2026-09-14 · Keturios pastabos straipsniui

> „Kur dažniausiai nueinama ne ten — lietuviai taip nesako.“
> „Kodėl tai vienoda visose mokyklose — čia viešas straipsnis, tai nerašykime to.“
> „Ką daryti, jei svetainė ne mūsų → Kaip pasitikrinti patiems“
> „Šaltinių nededame. Nereikia.“

| Taisyklė | Kodėl |
|---|---|
| **Antraštė turi skambėti lietuviškai** | „Kur dažniausiai nueinama ne ten“ yra vertinys. Lietuviškai — „Dvi dažniausios klaidos“ |
| **Vidinės virtuvės viešai nerašome** | kiek klientų ir kaip centralizuotai prižiūrime yra mūsų reikalas; straipsnyje rašoma, **ką mokykla gauna**, ne kaip mes tai organizuojame |
| **Skyrius apie patikrą — „Kaip pasitikrinti patiems“** | pavadinimas sako, ką skaitytojas gali padaryti, o ne kokiu atveju jam tai aktualu |
| **Šaltinių sąrašo straipsnio gale nebūna** | šaltinis, jei reikia, įvardijamas sakinyje („Valstybinė duomenų apsaugos inspekcija tai įvardija atskiru punktu“) |

⛔ Ta pati taisyklė kaip su „Ką renkame“: **antraštė, kuri aiškina mūsų pusę, keičiama į
tokią, kuri sako skaitytojui, ką jis gali padaryti.**

### 2026-09-14 · Straipsnio karkasas turi dar du privalomus elementus

> „Čia pvz kaip konstruojame straipsnį nuo pradžių.“ (ekrane — „Gelbėkit, mūsų mokyklos
> interneto svetainę nulaužė!“)

Pirmą versiją įkėliau be dviejų dalykų, kuriuos turi **visi** septyni publikuoti straipsniai:

1. **Įvadas `<em>` žymėje.** Tai ne kursyvas — tema jį atvaizduoja kaip didelį įvadinį
   sakinį po antrašte. Turinio pradžia **visada** `<em>…</em>`, ir tai kabliukas, ne
   santrauka: „Skamba baisiai, tiesa?“, „Pritaikomumas nėra tik techninė užduotis…“.
   Tik po jo eina lauko stebėjimas įprastu šriftu.
2. **Laukas `bl-color` (`meta_box`).** Kortelės spalva tinklaraščio sąraše. Ta pati
   platformos palėtė kaip pamokose, ir **kiekvienas straipsnis turi savitą** — nė viena
   iš aštuonių nesikartoja.

Užimta: `accent-ultra-dark`, `primary-light`, `action-light`, `primary`, `secondary`,
`accent-light`, `accent-ultra-light`, `secondary-light`. Slapukų straipsniui parinkta
`var(--accent)`, nes ji dar nenaudota.

Viršuje matoma etiketė **PAMĄSTYMAI** yra šablono dalis, ne taksonomija — nustatinėti
nereikia. Featured image irgi ne: iš septynių jį turi tik vienas.

⛔ **Techninis kelias:** `tinklarastis` yra atskiras įrašo tipas, redaktorius klasikinis.
Turinys — paprastas HTML, pastraipos skiriamos `\r\n\r\n`, be `<p>`, antraštės `<h3>`.
Rašoma per REST su prisijungusios sesijos `X-WP-Nonce`; programinio slaptažodžio
cleverphant.lt neturime.

### 2026-09-14 · cleverphant.lt tikslas — daryti įspūdį

> „Cleverphant.lt svetainės tikslas daryti įspūdį.“
> „O vakarykštį filmuką jei perdaryti tokiu stiliumi? Jaučiu labai nice būtų.“

Straipsniui buvau pradėjęs piešti baltas korteles su raudonais ir žaliais rėmeliais — tai
dokumentacijos kalba. Svetainės kalba kita: **73 px antraštė dviem svoriais, pastelinis
mėlynai alyvinis fonas, milžiniški permatomi apskritimai, ploni spalvoti pabraukimai,
daug oro.**

**Sprendimas:** tai tampa standartu **visoms** pamokoms, ne tik straipsniui. Įgyvendinta
`tokens/base.css` lygyje, tad visi 81 vizualas visomis kalbomis persipiešė be šablonų
keitimo.

⛔ **Prieš piešiant bet kam nors skirtą vizualą — pirma pažiūrėti, kaip atrodo ta vieta.**
Tą pačią klaidą dariau tris kartus: vizualai be DESIGN_RULES, animacija be
ANIMATION_PRINCIPLES, straipsnis be tavo straipsnių. Kiekvieną kartą atsakymas gulėjo
projekte arba ekrane.

⛔ **Istorinis skaičius nėra taisyklė.** „Nė viename straipsnyje nėra vizualų“ reiškė ne
formatą, o tai, kad nebuvo galimybių. Prieš remiantis statistika verta paklausti, ar ji
matuoja pasirinkimą, ar apribojimą.

### 2026-09-14 · Skirtukas ir intro — paskutiniai šabloniniai elementai

> „Dabar vienintelis šabloninis dalykas liko tas skirtukas.“
> „Noriu, kad liktų mūsų tinklapio reklama cleverphant.lt kaip dabartiniame.“

**Skirtukas.** Buvo tiesi gradientinė linija ir didelis mėlynas numeris centre — abu
svetimi brando kalbai. Dabar: **nukirstas numeris fone** (citata iš cleverphant.lt hero,
kur antraštė išeina už kadro), pavadinimas šalia **dviem svoriais**, po juo trumpas
brūkšnys iš žalsvai mėlynos į rožinę. Pavadinimas skaidomas automatiškai: paskutiniai
1–2 žodžiai paryškinami.

**Intro.** Buvo vienintelis sodrios mėlynos kadras visame filme (`blue_bg.png`). Dabar —
**tamsus atidarymas**, pora firminei vinjetei pabaigoje. Tarp jų filmas šviesus, tad
gaunasi arka, ne vienalytė juosta. Tamsus kadras duoda spalvos smūgį pirmoje sekundėje
brando spalvomis, o ne atsitiktine mėlyna.

⛔ **`cleverphant.lt` lieka intro kadre** — tai reklama, ne dekoracija. Kairėje apačioje,
sulygiuota su pavadinimo bloku, atsiranda paskutinė.

⛔ Šablonas `templates/video-intro.html` nebenaudoja `blue_bg.png`. Fonas piešiamas
`radial-gradient`'ais, tad jį keičia tik CSS, o ne paveikslėlis.
