# Video scenarijus: „Google Sheets“ integracija: kaip lentelė atsiranda svetainėje

**Formatas:** „kur spausti“ filmukas, balsas sakiniais su laiko žymomis, garsai, foninė muzika
**Balsas:** ElevenLabs `eleven_v3_dpo_20260217`, balsas `eqJHjeWMPGJFD6VBf1J2`, greitis 0.9
⛔ **Balsas SUPLANUOTAS, NESUGENERUOTAS.** Dariaus balso be Eimanto žinios nenaudojame (2026-09-17).
**Trukmė:** 297 sek. be intro, outro ir skirtukų (~5:45 su jais)
**Šaltinis:** `build_scenes.py` — scenarijų, šablonus, tekstus ir animacijas generuoja jis; ranka neredaguoti.
**Šaltinis:** publikuota pamoka (WP `kursai/1654`)

---

| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 0 Intro | 5 sek. | intro | — |
| 1 Kodėl tai naudinga | 23 sek. | 00-kodel | Mokyklos lentelės gali gyventi ne svetainėje, o „Google Sheets“ failuose. Lentelei pakeisti nebereikia jungtis prie turinio valdymo sistemos. Šablonai jau paruošti – užpildote tik duomenis. Prieigą gali turėti keli darbuotojai, tad atsakomybes galima pasidalyti. O suintegruojama vieną kartą. |
| 2 Kaip tai veikia | 27 sek. | 01-kaip-veikia | Duomenys gyvena „Google Sheets“ faile. Failas prijungiamas prie turinio valdymo sistemos – ten tam yra modulis „Google Sheets Lentelės“. O svetainės puslapis lentelę tiesiog parodo lankytojui. Prijungtam failui sistema suteikia savo numerį, o kiekvienas lapas turi savo gID. Pagal juos puslapis ir žino, kurią lentelę imti. |
| 3 Failo ir lapo numeriai | 24 sek. | 02-url | Abu numerius matote to paties failo adrese. Failo numeris rodo patį failą – visoms jo lentelėms jis vienodas. O gID rodo konkretų lapą. Jis nesikeičia net tada, kai lapą pervadinate. Pirmasis lapas visada turi gID nulis – tai numatytasis lapas. |
| 4 Kas ką daro | 22 sek. | 03-kas-ka-daro | Prijungimą, publikavimą ir lentelės įdėjimą į puslapį padarome mes. Jums lieka svarbiausia dalis: duomenys. Jūs pildote lenteles, dalijatės prieiga su kolegomis ir parašote mums tada, kai kas nors nepavyksta. Šablono kopijuoti patiems nebereikia. |
| 5 Publikavimas | 22 sek. | 04-publikavimas | Kad svetainė galėtų perskaityti lentelę, failas turi būti atidarytas skaitymui. Bendrojoje prieigoje pasirenkama „Visi, turintys nuorodą“. Rolės „Žiūrintysis“ visiškai pakanka – redaguoti svetainei nereikia. Tai padarome prijungdami failą. |
| 6 Lentelė puslapyje | 25 sek. | 05-kodas | Puslapyje lentelė įrašoma viena eilute. Pirmas skaičius – failo numeris sistemoje, antras – lapo gID. Išsaugojus puslapį, lankytojas mato jau sutvarkytą lentelę. Jums šios eilutės rašyti nereikia – ją įdedame prijungdami lentelę. Vėliau keičiasi tik duomenys faile. |
| 7 Modulis sistemoje | 24 sek. | 06-tvs-modulis | Turinio valdymo sistemoje prijungti failai turi savo sąrašą. Kiekvienas atpažįstamas pagal pavadinimą, kurį suteikiame patys. Numerį sistema priskiria pati – būtent jį puslapis naudoja lentelei rasti. O žyma „Enabled“ rodo, ar failas veikia. Išjungto failo lentelės nematyti. |
| 8 Kaip greitai atsinaujina | 20 sek. | 07-atsinaujinimas | Pataisius langelį, svetainė atsinaujina pati. Dažniausiai tai trunka kelias sekundes. Jei pakeitimo nematyti, tikrinkite du dalykus. Ar redaguojate tą pačią prijungtą lentelę. Ir ar tikrai išėjote iš langelio. |
| 9 Lentelė yra duomenų bazė | 29 sek. | 08-duomenu-baze | Lentelė čia veikia kaip duomenų bazė – svarbiausia tvarka, ne stilius. Langelyje neturi būti nei perkėlimo į naują eilutę, nei formulių, nei sujungtų langelių. Tinka tai, kas paruošta: A stulpelio žymos ir vienas formatas vienai eilutei. Sudėtingesnis formatavimas svetainėje nesimato. Todėl šabloną verta palikti tokį, koks yra. |
| 10 Lapų tvarka | 21 sek. | 09-lapu-tvarka | Pirmas lapas visada turi gID nulis. Jo vietos keisti nereikėtų – svetainė jį atpažįsta būtent pagal šį numerį. Kitus lapus galima perkelti ar pervadinti laisvai. Sistema juos atpažįsta pagal gID, ne pagal vietą. |
| 11 Keli failai pagal atsakomybes | 23 sek. | 10-organizavimas | Visas lenteles galima sudėti į vieną failą, bet patogiau skaidyti pagal atsakomybes. Pavyzdžiui, administracijos ir ugdymo lentelės gyvena atskirai. Taip aišku, kuris failas kam priklauso, klaida paliečia tik vieną failą, o skirtingi žmonės dirba vienas kitam netrukdydami. |
| 12 Ką matote atidarę | 21 sek. | 11-sablonas | Atidarę failą matote, kad darbas jau pradėtas. Lapai paruošti dažniausioms lentelėms: taryba, komisijos, darbo užmokestis. Antraštės ir stulpeliai jau sudėlioti – lieka duomenys. O jei kurios nors lentelės nereikia, tiesiog jos nepildote. |
| 13 Kur toliau | 16 sek. | 12-kur-toliau | Ta pačia tema turime dar dvi pamokas. Pradžiamokslis parodo, kaip tvarkyti pačias lenteles. O lentelių kūrimo principai – kaip lentelė turi atrodyti, kad būtų suprantama. |
| 14 Outro | 5 sek. | autro | — |

---

## Kadrai

### KADRAS 1: Kodėl tai naudinga (23 sek.)
**Failas:** `00-kodel.png`
**Antraštė kadre:** Visos lentelės – vienoje vietoje
**Ekrane:** Kairėje – žalias „Google Sheets“ failas su trimis lapais („Taryba“, „Mokytojai“, „Atlyginimai“). Dešinėje viena po kitos atslenka keturios naudos kortelės.
**Komentaras:** Turinys iš publikuotos pamokos § „Kodėl tai naudinga“.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Mokyklos lentelės gali gyventi ne svetainėje, o „Google Sheets“ failuose. |
| 6.1 | balsas | Lentelei pakeisti nebereikia jungtis prie turinio valdymo sistemos. |
| 10.6 | balsas | Šablonai jau paruošti – užpildote tik duomenis. |
| 14.5 | balsas | Prieigą gali turėti keli darbuotojai, tad atsakomybes galima pasidalyti. |
| 20.1 | balsas | O suintegruojama vieną kartą. |

### KADRAS 2: Kaip tai veikia (27 sek.)
**Failas:** `01-kaip-veikia.png`
**Antraštė kadre:** Failas, turinio valdymo sistema ir puslapis
**Ekrane:** Trys kortelės iš kairės į dešinę su rodyklėmis: failas → turinio valdymo sistema → svetainės puslapis. Apačioje – paaiškinimas apie ID ir gID.
**Komentaras:** Publikuota pamoka § „Kaip tai veikia“. Sintaksė rodoma atskirame kadre.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Duomenys gyvena „Google Sheets“ faile. |
| 5.0 | balsas | Failas prijungiamas prie turinio valdymo sistemos – ten tam yra modulis „Google Sheets Lentelės“. |
| 11.6 | balsas | O svetainės puslapis lentelę tiesiog parodo lankytojui. |
| 17.0 | balsas | Prijungtam failui sistema suteikia savo numerį, o kiekvienas lapas turi savo gID. |
| 22.6 | balsas | Pagal juos puslapis ir žino, kurią lentelę imti. |

### KADRAS 3: Failo ir lapo numeriai (24 sek.)
**Failas:** `02-url.png`
**Antraštė kadre:** Abu numerius matote adreso juostoje
**Ekrane:** Adreso juosta su geltonai pažymėtu FAILO_ID ir violetiniu gID; po ja dvi kortelės ir pastaba apie pirmąjį lapą.
**Komentaras:** Publikuota pamoka § „Failo struktūra ir URL anatomija“ ir § „Apie lapų tvarką ir gID reikšmes“.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Abu numerius matote to paties failo adrese. |
| 5.2 | balsas | Failo numeris rodo patį failą – visoms jo lentelėms jis vienodas. |
| 11.0 | balsas | O gID rodo konkretų lapą. Jis nesikeičia net tada, kai lapą pervadinate. |
| 17.4 | balsas | Pirmasis lapas visada turi gID nulis – tai numatytasis lapas. |

### KADRAS 4: Kas ką daro (22 sek.)
**Failas:** `03-kas-ka-daro.png`
**Antraštė kadre:** Prijungiame mes – pildote jūs
**Ekrane:** Dvi kortelės: mėlyna „Cleverphant“ su trimis darbais ir žalia „Mokykla“ su trimis. Apačioje – pastaba apie seną eigą.
**Komentaras:** Eimantas 2026-09-17: senoji eiga (mokykla kopijuoja šabloną) nesuveikė, integraciją daro Cleverphant. Kadras pridėtas 2026-09-19 pagal Eimanto sprendimą „mišrus variantas“.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Prijungimą, publikavimą ir lentelės įdėjimą į puslapį padarome mes. |
| 7.0 | balsas | Jums lieka svarbiausia dalis: duomenys. |
| 10.3 | balsas | Jūs pildote lenteles, dalijatės prieiga su kolegomis |
| 15.0 | balsas | ir parašote mums tada, kai kas nors nepavyksta. |
| 18.7 | balsas | Šablono kopijuoti patiems nebereikia. |

### KADRAS 5: Publikavimas (22 sek.)
**Failas:** `04-publikavimas.png`
**Antraštė kadre:** Kad svetainė galėtų perskaityti duomenis
**Ekrane:** Bendrinimo lango kortelė: „Bendroji prieiga“ → „Visi, turintys nuorodą“, žemiau žalia juosta „Rolė: Žiūrintysis – to pakanka“.
**Komentaras:** Publikuota pamoka § „Kaip publikuoti Google Sheets failą“. ⛔ PATIKRINTI lietuviškus užrašus: „Bendroji prieiga“, „Visi, turintys nuorodą“, „Žiūrintysis“ — versti iš anglų (Share, General access, Anyone with the link, Viewer).

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Kad svetainė galėtų perskaityti lentelę, failas turi būti atidarytas skaitymui. |
| 6.6 | balsas | Bendrojoje prieigoje pasirenkama „Visi, turintys nuorodą“. |
| 12.0 | balsas | Rolės „Žiūrintysis“ visiškai pakanka – redaguoti svetainei nereikia. |
| 18.0 | balsas | Tai padarome prijungdami failą. |

### KADRAS 6: Lentelė puslapyje (25 sek.)
**Failas:** `05-kodas.png`
**Antraštė kadre:** Puslapyje – viena eilutė, svetainėje – lentelė
**Ekrane:** Kairėje kortelė su kodu {{google_sheet(1, {'tab':'0'})}}, dešinėje – kaip ta pati lentelė atrodo svetainėje.
**Komentaras:** Publikuota pamoka § „Kaip įterpti lentelę į puslapį“. Sintaksė rodoma kaip paaiškinimas, ne kaip užduotis (Eimantas 2026-09-19).

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Puslapyje lentelė įrašoma viena eilute. |
| 5.0 | balsas | Pirmas skaičius – failo numeris sistemoje, antras – lapo gID. |
| 10.6 | balsas | Išsaugojus puslapį, lankytojas mato jau sutvarkytą lentelę. |
| 16.0 | balsas | Jums šios eilutės rašyti nereikia – ją įdedame prijungdami lentelę. |
| 20.9 | balsas | Vėliau keičiasi tik duomenys faile. |

### KADRAS 7: Modulis sistemoje (24 sek.)
**Failas:** `06-tvs-modulis.png`
**Antraštė kadre:** Prijungti failai turi savo sąrašą
**Ekrane:** Modulio lentelė su trimis prijungtais failais: ID, pavadinimas ir „Enabled“ varnelė; trečias išjungtas.
**Komentaras:** Publikuota pamoka § „Kaip atrodo lentelių modulis TVS“.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Turinio valdymo sistemoje prijungti failai turi savo sąrašą. |
| 5.7 | balsas | Kiekvienas atpažįstamas pagal pavadinimą, kurį suteikiame patys. |
| 10.6 | balsas | Numerį sistema priskiria pati – būtent jį puslapis naudoja lentelei rasti. |
| 16.4 | balsas | O žyma „Enabled“ rodo, ar failas veikia. |
| 19.9 | balsas | Išjungto failo lentelės nematyti. |

### KADRAS 8: Kaip greitai atsinaujina (20 sek.)
**Failas:** `07-atsinaujinimas.png`
**Antraštė kadre:** Pakeitimas svetainėje – per kelias sekundes
**Ekrane:** Dvi kortelės su rodykle: „Pataisote langelį“ → „Matyti po kelių sekundžių“. Žemiau dvi patikros.
**Komentaras:** Publikuota pamoka § „Kaip greitai veikia duomenų atsinaujinimas“.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Pataisius langelį, svetainė atsinaujina pati. |
| 5.0 | balsas | Dažniausiai tai trunka kelias sekundes. |
| 9.0 | balsas | Jei pakeitimo nematyti, tikrinkite du dalykus. |
| 12.9 | balsas | Ar redaguojate tą pačią prijungtą lentelę. |
| 16.5 | balsas | Ir ar tikrai išėjote iš langelio. |

### KADRAS 9: Lentelė yra duomenų bazė (29 sek.)
**Failas:** `08-duomenu-baze.png`
**Antraštė kadre:** Svarbu tvarka, ne stilius
**Ekrane:** Dvi kortelės: raudona „Netinka“ su trimis draudimais ir žalia „Tinka“ su trimis leidžiamais dalykais.
**Komentaras:** Publikuota pamoka § „Google Sheets lapų redagavimas“. Formuluotės sušvelnintos (Eimantas 2026-09-17: „nekeiskite“ skamba per griežtai).

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Lentelė čia veikia kaip duomenų bazė – svarbiausia tvarka, ne stilius. |
| 6.4 | balsas | Langelyje neturi būti nei perkėlimo į naują eilutę, nei formulių, nei sujungtų langelių. |
| 13.5 | balsas | Tinka tai, kas paruošta: A stulpelio žymos ir vienas formatas vienai eilutei. |
| 20.3 | balsas | Sudėtingesnis formatavimas svetainėje nesimato. |
| 24.2 | balsas | Todėl šabloną verta palikti tokį, koks yra. |

### KADRAS 10: Lapų tvarka (21 sek.)
**Failas:** `09-lapu-tvarka.png`
**Antraštė kadre:** Pirmas lapas lieka pirmas
**Ekrane:** Trys lapų kortelės su gID reikšmėmis; pirmoji apvesta žaliai su prierašu „numatytasis – vietos nekeisti“.
**Komentaras:** Publikuota pamoka § „Apie lapų tvarką ir gID reikšmes“.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Pirmas lapas visada turi gID nulis. |
| 5.0 | balsas | Jo vietos keisti nereikėtų – svetainė jį atpažįsta būtent pagal šį numerį. |
| 11.0 | balsas | Kitus lapus galima perkelti ar pervadinti laisvai. |
| 15.0 | balsas | Sistema juos atpažįsta pagal gID, ne pagal vietą. |

### KADRAS 11: Keli failai pagal atsakomybes (23 sek.)
**Failas:** `10-organizavimas.png`
**Antraštė kadre:** Ne vienas didelis, o keli aiškūs
**Ekrane:** Du failai – „Administracija“ ir „Ugdymas“ – su savo lentelių sąrašais; apačioje trys privalumai.
**Komentaras:** Publikuota pamoka § „Kaip organizuoti failus“. Sutampa su pradžiamokslio žinute, kad atsakomybėmis galima dalytis.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Visas lenteles galima sudėti į vieną failą, bet patogiau skaidyti pagal atsakomybes. |
| 7.4 | balsas | Pavyzdžiui, administracijos ir ugdymo lentelės gyvena atskirai. |
| 12.6 | balsas | Taip aišku, kuris failas kam priklauso, |
| 15.8 | balsas | klaida paliečia tik vieną failą, |
| 18.3 | balsas | o skirtingi žmonės dirba vienas kitam netrukdydami. |

### KADRAS 12: Ką matote atidarę (21 sek.)
**Failas:** `11-sablonas.png`
**Antraštė kadre:** Darbas jau pradėtas – lieka duomenys
**Ekrane:** Paruoštas failas su trimis lapais; dešinėje trys kortelės apie tai, kas jau padaryta.
**Komentaras:** Publikuota pamoka § „Ką matote atidarę šabloną“.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Atidarę failą matote, kad darbas jau pradėtas. |
| 5.0 | balsas | Lapai paruošti dažniausioms lentelėms: taryba, komisijos, darbo užmokestis. |
| 11.0 | balsas | Antraštės ir stulpeliai jau sudėlioti – lieka duomenys. |
| 15.7 | balsas | O jei kurios nors lentelės nereikia, tiesiog jos nepildote. |

### KADRAS 13: Kur toliau (16 sek.)
**Failas:** `12-kur-toliau.png`
**Antraštė kadre:** Dar dvi pamokos ta pačia tema
**Ekrane:** Dvi pamokų kortelės ir kvietimas jas peržiūrėti.
**Komentaras:** Eimantas 2026-09-19: kiekvieno filmuko gale siūlyti kitus — „Būtinai pažiūrėkite ir tokį ir tokį video, jei dar nežiūrėjote“.

**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.0 | balsas | Ta pačia tema turime dar dvi pamokas. |
| 4.6 | balsas | Pradžiamokslis parodo, kaip tvarkyti pačias lenteles. |
| 9.4 | balsas | O lentelių kūrimo principai – kaip lentelė turi atrodyti, kad būtų suprantama. |
