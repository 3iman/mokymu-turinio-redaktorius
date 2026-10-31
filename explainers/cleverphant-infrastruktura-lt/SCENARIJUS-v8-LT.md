# Cleverphant explainer v8 — LT

Lietuviška versija pagal EN v8 (`../cleverphant-infrastruktura/SCENARIJUS-v8-EN.md`). 2026-10-13.

**Balsas:** Darius Cleverphant `eqJHjeWMPGJFD6VBf1J2`, `eleven_v3_dpo_20260217`, greitis 0.9, seed 4242 — kaip pamokose (VIDEO_GAMYBA.md §7). Scenos sugrupuotos į 5 dalis iki ~1500 simb. (v3 nepriima previous_text), įžanga — atskira dalis.

**Eiga:** `python3 v8/gen_lt.py [scena]` → `python3 v8/voice.py` → `python3 v8/build.py` → `npx hyperframes@0.8.150 render`. Šablonas: `python3 v8/translate_lt.py v8/template-en.html v8/template.html` (EN šablono kopija + tikslūs pakeitimai; laiko raktai lieka angliški, laiką duoda `scenes.json` → `kw`).

**Pritaikyta Lietuvos žiūrovui:** „Not mandatory where you are“ → „Lietuvoje mokyklų svetainės privalomos. Bet ir ten, kur jų niekas nereikalauja…“; „Built in a small country. Ready for yours.“ → „Sukurta Lietuvoje, kartu su jumis. Ir jau tinka kitoms šalims.“; CTA „Pakalbėkime, ką dar galime nuveikti kartu“ (Eimantas: Lietuvoje mes jau dirbame); „Software with a human touch“ → „Platforma su žmogaus prisilietimu“ (Eimantas); „giving teachers back to their students“ → „grąžinti mokytoją pas vaikus“ (Eimanto formuluotė). Įžanga: „beveik septynios minutės“ (filmas 6:45).

**2026-10-13 pataisos:** „Tiek“ dalių gale — atmetamas sakinys prasidėdavo po 0,05 s, o kirpimas imdavo +0,3 s; dabar kerpama iki jo pradžios (`voice.py`). „Po kąsnelį“ išplėtota: šiandien antraštės, rytoj slapukų juosta, poryt dokumentų pavadinimai → „Nė vienas kąsnelis neatrodo kaip reforma. O po metų mokykla jau kita.“

**Pabaiga ir skaičiai (Eimantas, 2026-10-13):** CTA „Dar ne mūsų klientas? Kviečiame į produkto pristatymą. Ateisime pasiruošę.“ + labas@cleverphant.lt galiniame kadre. Skaičiai — visur iki 500 „… ir daugiau“ (Eimantas; tūkstančio Lietuvoje nėra: ŠVIS 2024–2025 — 884 bendrojo ugdymo mokyklos, tinklas mažėja). Savivaldybės — „bent vieną klientą turime 85 proc. savivaldybių“ (mailer API: 51 iš 60). „Smalsus vadovas“ → „Inovatyvus vadovas“.

**Dizaino peržiūra 2 (2026-10-13):** nauja scena „Dizaino sistema“ (Frostas paprastais žodžiais), ledkalnis „paviršiaus“ scenoje, šriftų skalė ir sakinio forma, 15 metų skydelis dešinėje, kontaktai galiniame kadre, įžanga „septynios su puse minutės“. LT šablonas dabar imamas iš naujausio EN: `cp ../../cleverphant-infrastruktura/v8/template.html template-en.html && python3 translate_lt.py template-en.html template.html`.

| # | Scena | Balsas |
|---|---|---|
| 1 | Fair warning | Įspėjame iš anksto: dramblio greitai neparduosi. Drambliai neskuba. Šis filmukas irgi: septynios su puse minutės. Taip, septynios su puse. Įsipilkite kavos. Gal net du puodelius. Dramblio nepaskubinsi. Patikėkite, bandėme. Pažadame, kad dramblys to vertas. |
| 2 | Details | Antraštės didžiosiomis raidėmis. Teksto paklodės. Plakatai, kurių neperskaito ekrano skaitytuvai. Nuogos nuorodos. Margi šriftai ir spalvos. Darbuotojai, išėję prieš kelerius metus. Kiekviena atrodo kaip smulkmena. Kartu jos gerą mokyklą parodo prastesnę, nei ji yra. O dabar padauginkite iš šimto mokyklų. Dviejų šimtų. Penkių šimtų… ir daugiau. |
| 3 | The only channel you control | Lietuvoje mokyklų svetainės privalomos. Bet ir ten, kur jų niekas nereikalauja, jos vis tiek svarbios. Svetainė – vienintelis kanalas, kurį mokykla valdo pati. Ją skaito paieškos sistemos. Iš jos kuriami dirbtinio intelekto atsakymai. Pagal ją veiks agentai. Svarbu ne tai, kaip ji atrodo, o ar ji aktuali. |
| 4 | Each school alone | Pakalbėkime apie dramblį kambaryje. Visos mokyklos turi tas pačias pareigas: prieinamumą, duomenų apsaugą, saugumą ir vis besikeičiančias taisykles. Dauguma su jomis grumiasi vienos, su savo biudžetu ir savo rangovu. Todėl kokybė priklauso nuo atsitiktinumo. |
| 5 | Stumps | O kas kelerius metus – naujas konkursas, nauja svetainė. Medis nupjaunamas iki kelmo ir sodinamas iš naujo. Ir vėl. Kaskart prarandamas tęstinumas. Mūsų medis niekada nepjaunamas. Jis auga, o kiekviena nauja taisyklė jį tik sustiprina. |
| 6 | Only the surface | Cleverphant – tai bendra skaitmeninė mokyklų infrastruktūra. Žmonės mato svetainę. Po ja – viskas, kas palaiko ją tvarkingą: nuo vienos dizaino sistemos iki atitikties ir pagalbos, bendra visoms mokykloms. Nauja mokykla tiesiog prisijungia. |
| 7 | Design system | Kas yra dizaino sistema? Paruoštų detalių rinkinys. Iš spalvų, šriftų ir mygtukų sudedami blokai: paieškos laukelis, darbuotojo kortelė. Iš blokų – skiltys, iš skilčių – puslapiai. Kiekvienas kiekvienos mokyklos puslapis sudėtas iš tų pačių detalių, o kiekviena detalė jau atitinka prieinamumo reikalavimus: kontrastas, antraštės, klaviatūra. Patobulinus vieną detalę, ji patobulėja visur. |
| 8 | No blank page | Ne agentūra. Ne dar vienas svetainių konstruktorius. Platforma su žmogaus prisilietimu. Niekas nepradeda nuo tuščio lapo: senąją svetainę perkeliame mes – puslapius, dokumentus ir darbuotojų profilius, pakeliui juos sutvarkydami. Mokykla patikrina, ir nauja svetainė paleidžiama. |
| 9 | One notices | Kadangi visos mokyklos veikia ta pačia sistema, jos gauna tą pačią naudą... Ir taip... tas pačias klaidas. Pasitaiko. Bet užtenka, kad pastebėtų viena mokykla. Pataisyta kartą – pataisyta visoms. Taip pat ir su žiniomis. Kai viena mokykla užduoda klausimą, atsakymas tampa pamoka, filmuku ir naujienlaiškiu visoms mokykloms. |
| 10 | Pilot → standard | Idėjos keliauja taip pat. Inovatyvus mokyklos vadovas atneša poreikį. Jo mokykla tampa pilotine. Lėtai. Labai lėtai. Tada duomenys parodo, kad veikia, ir iš karto tai turi visos mokyklos. |
| 11 | Publish once | Tai veikia ir iš viršaus. Savivaldybė ar ministerija paskelbia vieną kartą: naują taisyklę, saugesnio interneto savaitę, patyčių prevencijos kampaniją. Ji tuo pačiu metu atsiranda visų mokyklų svetainėse. Jokių laiškų. Jokių priminimų. Nė viena mokykla nelieka nuošalyje. Platinimas jau išspręstas. Todėl didelis tinklas gali sau leisti dideles idėjas: tai, ko viena mokykla niekada nesukurtų, sukuriama vieną kartą visoms. |
| 12 | Equally good | Maža kaimo mokykla gauna tą patį, ką didelė miesto mokykla. Apačioje – viena dizaino sistema, o veidas lieka mokyklos. Ne vienodos. Vienodai geros. |
| 13 | Trojan elephant | Pokyčiai prasideda nuo smulkmenų. Būti mažam – ne priežastis jų nepastebėti. Drambliai lėti. Labai lėti. Tokie lėti, kad pokyčio niekas nepastebi, kol jis jau visur. Tai mūsų Trojos dramblys. Kaip suvalgyti dramblį? Po kąsnelį. Šiandien – antraštės. Rytoj – slapukų juosta. Poryt – dokumentų pavadinimai. Nė vienas kąsnelis neatrodo kaip reforma. O po metų mokykla jau kita. Ir kiekvienas kitas žingsnis pasiekia visas mokyklas: gyvos lentelės, pranešėjų kanalai, registracija į konsultacijas, apklausos, renginių kalendoriai, savaitinės atnaujinimų santraukos. |
| 14 | What if… | Ir mes vis klausiame: o kas, jeigu? Kas, jeigu mokytojo Word failas virstų baigtu straipsniu? Kas, jeigu dokumentai patys pasivadintų ir susidėliotų į vietas? Kas, jeigu pataisymas būtų paruoštas dar prieš jums pastebint problemą? Tam nereikia naujos svetainės. Kiekviena idėja – programėlė ant to paties pamato. Viena mokykla išbando, visos mokyklos gauna. |
| 15 | And AI? | O dirbtinis intelektas? Ne dar vienas pokalbių robotas. Dirbtinis intelektas, kuris tyliai palaiko tvarką. Nes dirbtinis intelektas mėgsta tvarką. |
| 16 | The logic of scale | Kas veikia vienoje mokykloje, veikia savivaldybėje, regione, visoje šalyje. Mokyklas galima prijungti greitai, o kaštai auga daug lėčiau. Ne pažadas, kad bus pigu. Mastelio logika. |
| 17 | Walked this road | Šiuo keliu einame penkiolika metų. Pirmieji dešimt? Lėti. Labai lėti. Tokie lėti. Pokyčiai mokyklose užtrunka. Tada tinklas ėmė augti pats. Šiandien – beveik trys šimtai įstaigų pagal vieną standartą, ir bent vieną klientą turime aštuoniasdešimt penkiuose procentuose Lietuvos savivaldybių. Jums nereikia pradėti nuo lėtosios dalies. Auditai, įdiegimas ir mokymai jau paruošti. O dramblys niekada nepamiršta: keičiasi darbuotojai, žinios lieka. Tikslas niekada nebuvo svetainės. Tikslas – grąžinti mokytoją pas vaikus. Sukurta Lietuvoje, kartu su jumis. Ir jau tinka kitoms šalims. Visoje Europos Sąjungoje viešosioms įstaigoms galioja tos pačios taisyklės: svetainių prieinamumas, duomenų apsauga, pranešėjų apsauga. Sukurta vienai šaliai, tinka visoms. Dar ne mūsų klientas? Kviečiame į produkto pristatymą. Ateisime pasiruošę. |

## Neišspręsta
- gimtakalbio ausis: „Nuogos nuorodos“, „Platforma su žmogaus prisilietimu“, „Trojos dramblys · gerąja prasme“
- kirčiai: v3 ženklų nepaiso — jei Darius kur suklys, taisyti IPA tarimo žodynu (VIDEO_GAMYBA.md §7)

## 2026-10-14 — Trojos dramblys: valgymas = nuolatiniai atnaujinimai
- Dramblys yra didžiausias darbas: šimtai svetainių turi būti prieinamos, aktualios ir stabilios. Jis valgomas po kąsnelį, nuolat.
- Iš dramblio išskrenda 12 tikrų atnaujinimų (Patobulinimai / Greitis ir stabilumas / Kosmetika). Banga nueina į visas mokyklas, o mokyklos praneša atgal („daugiau akių“).
- Pašalinta „Po metų mokykla jau kita“.
- Dalių ribos pasislinko, todėl perrašytos lt04–lt06. lt03 (pauzės „Ir taip“ ir „tas pačias klaidas“) liko nepaliesta.
- Įžanga: „apie aštuonias minutes“ (filmukas 8:03).

## 2026-10-14 — Medis: trys jėgos
- Vėjas – taisyklės, lietus – technologijos, metų laikai – lankytojų lūkesčiai.
- Balsas: „Jį lenkė vėjai, merkė lietūs, keitė metų laikai: naujos taisyklės, naujos technologijos, lankytojai, kurie kasmet tikisi daugiau.“ Perrašyta tik lt02.

## 2026-10-14 — „Kaip svetainė genda“ + scenų sukeitimas
- Kanalas eina prieš klaidas. Klaidų scena tapo istorija: šablonas? → unikalus dizainas sensta → kolega, kitas kolega, vadovas, tėvai → visų ir niekieno → 12 klaidų → padauginkite → mokosi viena iš kitos, keliauja ir klaidos → visa sistema.
- Pilotas: „Mokyklos ir taip mokosi viena iš kitos. Čia jos perima tai, kas patikrinta.“ „Vienodai geros“: „Ne šablonas, o modelis veikiančioje infrastruktūroje – su jūsų turiniu.“
- Visos dalys lt02–lt06 perrašytos; „Vienas pastebi“ pauzės dabar įterpiamos `pauzes_lt.py` (dalį randa dalys.json). Įžanga: „beveik devynios minutės“.
