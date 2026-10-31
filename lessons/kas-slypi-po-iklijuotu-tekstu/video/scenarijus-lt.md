# Video scenarijus: Kas slypi po įklijuotu tekstu

> Serijos „Formatavimo pradžiamokslis“ 3 filmukas, bandomasis. Koncepcija: `../../formatavimo-pradziamokslis/KONCEPCIJA.md`.
> Būsena: **piešiama, 2026-10-11.** Eilė: filmukas be garso → pamoka → straipsnis. Generatorius: `../build_scenes.py`.

**Formatas:** visi kadrai piešiami (HTML šablonai → PNG → animacija), kaip ankstesniuose filmukuose. Svetainė ir TVS redaktorius – imitacija, ne ekrano įrašas.
**Vizualinis stilius:** kortelė ir naršyklės langas kaip `lenteliu-redagavimas-wysiwyg-redaktoriuje`, TVS – `tokens/tvs.css`.
**⛔ TVS redaktorius – toks, koks yra (Eimantas, 2026-10-11).** Trys įrankių eilės, kaip tikroje TVS: `../../formatavimo-pradziamokslis/tyrimas/tvs-redaktorius-tikras.webp`. Juostos nesupaprastinti iki B I U Tx. Siūlomas būdas: įrankių juosta iškerpama iš tikros nuotraukos (tiksliausia), turinio laukas – HTML, kad tekstas galėtų keistis; paspaudimai ir paryškinimai – sluoksnis ant mygtukų koordinačių.
**Diktorius:** Dariaus balsas – tik Eimantui leidus.
**Ekrano skaitytuvo balsas:** ElevenLabs, **ne Dariaus**. Monotoniškas, greitas, mašininis. Tikslumas nesvarbus, svarbus jausmas.
**Trukmė:** 219 s kadrų + automatiniai skirtukai prieš kiekvieną kadrą (3,2 s); tikslinama po TTS.
**Skirtukai:** generuojami automatiškai iš lentelės pavadinimų (`generate-video-clips.js`), atskiros eilutės lentelėje nereikia.
**WP slug:** `kas-slypi-po-iklijuotu-tekstu` (siūlomas; katalogo vardas turi sutapti su WP).
**Skaitytojas:** mokytoja, atsakinga už svetainę, ir raštinės darbuotoja.

## Ką piešiame iš tikrovės (skeletone patikrinta 2026-10-11, tik naršyklėje)

Piešinys turi atitikti tai, kas iš tikrųjų nutinka, todėl elgesys išmatuotas tikroje temoje:
- Kontrasto ženkliukas (pusiau užpildytas apskritimas): 1 paspaudimas – „Juodai ant balto“, 2 – „Baltai ant juodo“, 3 – „Normalus“. Fonas tampa tamsiai pilkas (#373737).
- Įklijuota Word pastraipa lieka **balta juosta su juodu tekstu ir svetimu šriftu**; tamsiai mėlynas (#1F3864) Word tekstas ant tamsaus fono beveik dingsta. Nuotrauka: `../../formatavimo-pradziamokslis/tyrimas/baltai-ant-juodo-word-tekstas.jpg`.
- Teksto dydžio ženkliukas („Dydis 1“, „Dydis 2“) svetainės tekstą didina, Word `11pt` lieka 14,7 px.

---

| Kadras | Trukmė | Failas | Balsas | Skaitytuvo balsas |
|---|---|---|---|---|
| 0 Intro | 5 sek. | intro | — | — |
| 1 Atrodo tvarkingai | 14 sek. | 01-atrodo-tvarkingai | Šis puslapis atrodo tvarkingai. Dalis teksto parašyta svetainės redaktoriuje, dalis nukopijuota iš Word. Iš pirmo žvilgsnio skirtumo beveik nesimato. | — |
| 2 Baltai ant juodo | 15 sek. | 02-baltai-ant-juodo | Dabar puslapį atsidaro silpnaregė mama ir įjungia kontrastą. Svetainės tekstas prisitaiko. Įklijuotas lieka toks, kokį jį atnešėte. | — |
| 3 Didinimas neveikia | 13 sek. | 03-didinimas | Su raidžių dydžiu tas pats. Žmogus jas padidina, o įklijuota pastraipa lieka smulki, nes Word jai liepė būti vienuolikos punktų. | — |
| 4 Ko nesimato | 15 sek. | 04-ko-nesimato | Kopijuodami nusinešate ne tik žodžius, bet ir jų apdarą: šriftą, dydį, spalvą, foną. Ekrane jo nematote, o svetainė jį gauna ir paklūsta. | — |
| 5 Apdarą atneša visi | 11 sek. | 05-apdara-atnesa-visi | Apdarą atneša ne tik Word. Jį atneša el. laiškas, Facebook įrašas, PDF ir kita svetainė. | — |
| 6 Neregys klauso | 16 sek. | 06-neregys-klauso | Neregys šio puslapio nemato, jis jo klauso. Tarpai, kuriuos Word darė tuščiomis eilutėmis, jam skamba taip: | tuščia. tuščia. tuščia. Svarbu: per atostogas biblioteka dirba trumpiau. |
| 7 Tas pats, tik švariai | 13 sek. | 07-svariai | O štai tas pats tekstas, įklijuotas švariai. Skaitytuvas pasako, kad tai sąrašas ir kiek jame punktų. | Svarbu: per atostogas biblioteka dirba trumpiau. sąrašas, du elementai. spalio 28 d. – knygų mainų mugė |
| 8 Telefone | 15 sek. | 07b-telefone | Telefone tai matyti dar aiškiau. Per abu kraštus lygiuotas tekstas prisipildo skylių, o ranka sudėti brūkšneliai nebelaiko eilės. Redaktoriaus sąrašas eilę išlaiko. | — |
| 9 Lopas ant lopo | 14 sek. | 08-lopas | Kai svetainės dizainas atsinaujina, tekstas keičiasi kartu su juo. Įklijuotas lieka senas, ir puslapis po truputį tampa *lopas ant lopo*. | — |
| 10 Ką jaučia skaitytojas | 13 sek. | 09-ar-kas-priziuri | Skaitytojas nežino, kas yra kodas. Bet mato skirtingus šriftus ir jaučia, kad čia niekas nežiūri. O neprižiūrėtu puslapiu sunku pasitikėti. | — |
| 11 Vienas klavišas daugiau | 12 sek. | 10-vienas-klavisas | Įklijuodami pridedate vieną klavišą. Ateina tik žodžiai, o apdarą jiems duoda pati svetainė. | — |
| 12 Jei jau įklijavote | 13 sek. | 11-jei-jau-iklijavote | Jei tekstas jau įklijuotas, jį galima išvalyti. Pažymite viską ir spaudžiate „Tx“. Formatavimas dingsta, žodžiai lieka. | — |
| 13 Lentelė – išimtis | 17 sek. | 12-lentele-isimtis | Lentelėms taisyklė kitokia. Ilgą ar dažnai atnaujinamą lentelę laikote Google Sheets. Trumpą lentelę įklijuojate įprastai, kad neišbyrėtų langeliai, ir tik tada išvalote tuo pačiu mygtuku. | — |
| 14 Toliau – redaktoriuje | 15 sek. | 13-redaktoriaus-mygtukai | Išvalytą tekstą tvarkote redaktoriaus mygtukais. Jie yra svetainės dalis, todėl prisitaiko ir prie kontrasto, ir prie telefono. Tik šriftų, dydžių, spalvų ir pabraukimo mygtukų nelieskite – jie uždeda tą patį apdarą. | — |
| 15 Pabraukta – nuoroda? | 12 sek. | 13b-pabraukimas | Pabrauktą žodį lankytojas palaiko nuoroda. Spusteli, ir nieko neįvyksta. Svetainėje pabraukimas priklauso nuorodoms. | — |
| 16 Pasitikrinkite patys | 13 sek. | 14-pasitikrinkite | Pasitikrinti galite jau šiandien. Atsidarote savo svetainę ir du kartus spustelite kontrasto ženkliuką. Ką pamatysite, tą kasdien mato silpnaregis. | — |
| 17 Outro | 5 sek. | autro | — | — |

---

## Koncepto eskizai (tvirtinami prieš HTML)

Bendras rėmas visiems svetainės kadrams: naršyklės langas `mokykla.lt/rudens-atostogos`, viršuje dešinėje svetainės prieinamumo juostelė (kontrasto ir teksto dydžio ženkliukai), puslapis „Rudens atostogos“ su trimis dalimis – pastraipa iš redaktoriaus, pastraipa iš Word, lentelė iš Word. Tas pats puslapis keliauja per 1–3, 6–9 ir 15 kadrus, kad žiūrovas jį atpažintų.

### 1 Atrodo tvarkingai
**Antraštė:** „Iš pirmo žvilgsnio – tvarkinga“
**Ekrane:** naršyklės langas su puslapiu įprastu režimu. Word pastraipa vos kitokiu šriftu, niekas nepažymėta.
**Animacija:** puslapis įsislenka, ramiai pasislenka žemyn ir atgal.
**Spalvų semantika:** jokių raudonų ar žalių žymų – žiūrovas neturi įtarti.

### 2 Baltai ant juodo
**Antraštė:** „Įjungus kontrastą“
**Ekrane:** kursorius spusteli kontrasto ženkliuką du kartus, iššoka užuomina „Baltai ant juodo“. Puslapis patamsėja. Redaktoriaus tekstas baltas ant tamsaus. Word pastraipa – balta juosta, žodis tamsiai mėlynu beveik dingęs. Lentelė balta su juodu tekstu.
**Animacija:** perjungimas virsmu (~0,5 s), tada spotlight ant baltos juostos, aplink pritemsta. Užrašas prie jos: „Įklijuotas tekstas nepaklūsta“.
**Spalvų semantika:** raudonas kraštas tik ant baltos juostos.

### 3 Didinimas neveikia
**Antraštė:** „Padidinus raides“
**Ekrane:** spustelimas teksto dydžio ženkliuką, užuomina „Dydis 2“. Redaktoriaus pastraipa išauga, Word pastraipa lieka smulki. Šalia matmenų žymos: „auga“ ir „11 pt – stovi vietoje“.
**Animacija:** svetainės tekstas sklandžiai didėja, Word eilutė nejuda.

### 4 Ko nesimato
**Antraštė:** „Tekstas atkeliauja su apdaru“
**Ekrane:** du skydeliai. Kairėje „Ką matote“ – vienas sakinys. Dešinėje „Ką gauna svetainė“ – to paties sakinio kodas: `<p class="MsoNormal">`, `<span style="font-family:Calibri; font-size:11pt; color:#1F3864">`… Kodas tikras Word įklijavimo kodas.
**Animacija:** kodo eilutės išsiskleidžia viena po kitos, kol užpildo skydelį. Apačioje skaitikliai: „1 sakinys“ · „[N] eilučių kodo“.
**Komentaras:** žiūrovas kodo neskaito – jaučia jo kiekį. Kodo tekstas ne mažesnis kaip 20 px.

### 5 Apdarą atneša visi
**Antraštė:** „Iš kur atkeliauja apdaras“
**Ekrane:** penkios kortelės be prekių ženklų: „Word“, „El. laiškas“, „Facebook įrašas“, „PDF“, „Kita svetainė“. Iš kiekvienos į centrinę kortelę „Jūsų svetainė“ keliauja tas pats lagaminėlis.
**Animacija:** kortelės po vieną, lagaminėliai keliauja nuosekliai.

### 6 Neregys klauso
**Antraštė:** „Kaip puslapį girdi neregys“
**Ekrane:** tas pats puslapis, tik įklijuotas iš Word su trimis tuščiomis eilutėmis ir sąrašu iš brūkšnelių. Puslapis užgęsta (90 proc. tamsos), matomas tik raudonas ekrano skaitytuvo rėmelis. Rėmelis šokinėja per tris tuščias eilutes, tada per sakinį. Apačioje juosta „Ekrano skaitytuvas“ su jo žodžiais ir garso banga.
**Animacija:** rėmelis šoka kartu su kiekvienu „tuščia“.
**Komentaras:** kuo mažiau vaizdo – žiūrovas turi pajusti, kaip yra tik klausant.

### 7 Tas pats, tik švariai
**Antraštė:** „Tas pats tekstas, įklijuotas švariai“
**Ekrane:** tas pats puslapis, įklijuotas švariai: pastraipos ir tikras sąrašas iš dviejų punktų. Žalias rėmelis eina per sakinį, apgaubia visą sąrašą, tada pirmą punktą.
**Animacija:** rėmelis vienu judesiu apgaubia visą sąrašą, tada eina per punktus.
**Spalvų semantika:** žalias rėmelis (6 kadre – raudonas).

### 8 Telefone (naujas, Eimantas 2026-10-11)
**Antraštė:** „Telefone matyti dar aiškiau“
**Ekrane:** du telefonai su tikra mobiliąja temos juosta (skydas, „+“, laikrodis, paieška, meniu). Kairėje „Įklijuota iš Word“: tekstas lygiuotas per abu kraštus su pirmos eilutės atitraukimu, sąrašas iš brūkšnelių – antra eilutė nulenda po brūkšneliu. Dešinėje „Švariai“: kairysis lygiavimas, tikras sąrašas. Žymos „Skylės tarp žodžių“, „Brūkšnelis – ne sąrašas“, „Eilutės lygios“.
**Šaltinis:** pamoka „Pasikartojančios klaidos straipsniuose“ (lygiavimas, atitraukimas, netaisyklingi sąrašai).

### 9 Lopas ant lopo
**Antraštė:** „Po dizaino atnaujinimo“
**Ekrane:** du langai: „Šiandien“ ir „Po atnaujinimo“. Dešinėje svetainės šriftas ir spalvos kitokie, o Word pastraipa liko sena – apvesta brūkšnine linija kaip *lopas*.
**Animacija:** kairysis langas virsta dešiniuoju, Word pastraipa nepasikeičia.

### 10 Ką jaučia skaitytojas
**Antraštė:** „Ar čia kas nors prižiūri?“
**Ekrane:** puslapis su keturiais šriftais, trimis dydžiais ir baltais blokais. Šalia skaitytojo piktograma su klaustuku.
**Komentaras:** sieja su serijos teze – prižiūrėta reiškia patikima.

### 11 Vienas klavišas daugiau
**Antraštė:** „Įklijuojate be apdaro“
**Ekrane:** tikras TVS laukas: pavadinimas, po juo pilka užuomina „Ctrl+Shift+V“ (TVS ją rodo pati), žemiau redaktorius su visa juosta. Dvi eilutės palyginimui: „Ctrl + V – žodžiai su apdaru“, „Ctrl + Shift + V – tik žodžiai“. Klavišai įsispaudžia, tekstas įsikloja svetainės šriftu.
**Animacija:** pirma spotlight ant pilkos užuominos („TVS jums tai jau primena“), tada klavišai po vieną, „Shift“ paryškinamas.
**Komentaras:** užuomina „Ctrl+Shift+V“ rodoma ir puslapio turinio lauke (Eimantas, 2026-10-11). Juostoje yra ir mygtukas įklijuoti kaip tekstą (iškarpinė su „T“) – [PATIKRINTI jo lietuvišką užuominą], galima parodyti kaip antrą kelią.

### 12 Jei jau įklijavote
**Antraštė:** „Išvalote vienu mygtuku“
**Ekrane:** redaktorius su margu tekstu. „Ctrl + A“ – viskas pažymima; kursorius ant „Tx“ (pirmos eilutės gale, pasvirusi T su mažu x), spustelimas. Spalvos ir šriftai dingsta, žodžiai lieka.
**Animacija:** priartinimas prie „Tx“, ratilas, virsmas į švarų tekstą.

### 13 Lentelė – išimtis
**Antraštė:** „Lentelės: ilga – Google Sheets, trumpa – išvalote“
**Ekrane:** dvi dalys. Kairėje ilga lentelė su užrašu „Ilga, dažnai atnaujinama“ ir rodykle į Google Sheets lapo ženklą. Dešinėje trumpa lentelė įklijuojama su „Ctrl + V“ (langeliai su spalvomis), tada „Ctrl + A“ ir „Tx“ – spalvos dingsta, langeliai lieka.
**Animacija:** pirma kairė (riba), tada dešinė (veiksmas).
**Komentaras:** ⛔ žinutė sutampa su Google Sheets pamokomis ir „Bendraisiais principais“ (lentelę – Ctrl+V, tada Ctrl+A ir „Tx“), nekartoja jų plačiau (Eimantas, 2026-10-11: B). „Tx“ langelių spalvas nuima (Eimantas, 2026-10-11).

### 14 Toliau – redaktoriuje
**Antraštė:** „Formatuojate redaktoriaus mygtukais“
**Ekrane:** tikra redaktoriaus juosta, spotlight slenka per tris vietas: „Format“ (antraštės), sąrašų mygtukai, nuoroda (grandinėlė). Šalia mažas tas pats tekstas tamsiame režime – prisitaiko.
**Komentaras:** tiltas į 4 filmuką „Puslapis: struktūra, ne išvaizda“.
**Pabaigoje:** raudonu rėmeliu apvedami „Font“, „Size“, teksto ir fono spalvų mygtukai su užrašu „Uždeda apdarą“ (Eimantas, 2026-10-11: „Įdėk“).

### 15 Pabraukta – vadinasi, nuoroda? (naujas, Eimantas 2026-10-11)
**Antraštė:** „Pabraukta – vadinasi, nuoroda?“
**Ekrane:** puslapis, kuriame pabrauktas žodis „nemokamas“. Kursorius jį spusteli – nieko neįvyksta, žodis krūpteli, žyma „Ne nuoroda“. Tada kursorius ant tikros nuorodos „Valgiaraštis (mokykla.lt)“, žyma „Nuoroda“.

### 16 Pasitikrinkite patys
**Antraštė:** „Pasitikrinkite savo svetainėje“
**Ekrane:** svetainės viršus su prieinamumo juostele, kontrasto ženkliukas apvestas, skaitiklis „1 · 2“, puslapis patamsėja.
**Komentaras:** veiksmas, kurį žiūrovas gali atlikti iškart.

---

## Atviri klausimai Eimantui

2. **Mac klavišai** – rodyti Cmd + Shift + V šalia Windows?
3. **Koncepto eskizai** – tvirtinate visus, ar keičiame kurį nors prieš HTML?
5. **Ryškesnė redaktoriaus nuotrauka** – priartinimui prie „Tx“ praverstų ekrano nuotrauka su didesniu mastu (pvz., naršyklėje 200 proc.). Ar galite atsiųsti?
