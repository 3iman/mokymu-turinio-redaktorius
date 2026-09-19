# „Google Sheets“ integracija – balso tekstas (lt)

⛔ Suplanuotas, nesugeneruotas. Laikas – nuo kadro pradžios.

## 01. Kodėl tai naudinga – 23 s
*Antraštė:* Visos lentelės – vienoje vietoje

- ` 1.0` Mokyklos lentelės gali gyventi ne svetainėje, o „Google Sheets“ failuose.
- ` 6.1` Lentelei pakeisti nebereikia jungtis prie turinio valdymo sistemos.
- `10.6` Šablonai jau paruošti – užpildote tik duomenis.
- `14.5` Prieigą gali turėti keli darbuotojai, tad atsakomybes galima pasidalyti.
- `20.1` O suintegruojama vieną kartą.

## 02. Kaip tai veikia – 27 s
*Antraštė:* Failas, turinio valdymo sistema ir puslapis

- ` 1.0` Duomenys gyvena „Google Sheets“ faile.
- ` 5.0` Failas prijungiamas prie turinio valdymo sistemos – ten tam yra modulis „Google Sheets Lentelės“.
- `11.6` O svetainės puslapis lentelę tiesiog parodo lankytojui.
- `17.0` Prijungtam failui sistema suteikia savo numerį, o kiekvienas lapas turi savo gID.
- `22.6` Pagal juos puslapis ir žino, kurią lentelę imti.

## 03. Failo ir lapo numeriai – 24 s
*Antraštė:* Abu numerius matote adreso juostoje

- ` 1.0` Abu numerius matote to paties failo adrese.
- ` 5.2` Failo numeris rodo patį failą – visoms jo lentelėms jis vienodas.
- `11.0` O gID rodo konkretų lapą. Jis nesikeičia net tada, kai lapą pervadinate.
- `17.4` Pirmasis lapas visada turi gID nulis – tai numatytasis lapas.

## 04. Kas ką daro – 22 s
*Antraštė:* Prijungiame mes – pildote jūs

- ` 1.0` Prijungimą, publikavimą ir lentelės įdėjimą į puslapį padarome mes.
- ` 7.0` Jums lieka svarbiausia dalis: duomenys.
- `10.3` Jūs pildote lenteles, dalijatės prieiga su kolegomis
- `15.0` ir parašote mums tada, kai kas nors nepavyksta.
- `18.7` Šablono kopijuoti patiems nebereikia.

## 05. Publikavimas – 22 s
*Antraštė:* Kad svetainė galėtų perskaityti duomenis

- ` 1.0` Kad svetainė galėtų perskaityti lentelę, failas turi būti atidarytas skaitymui.
- ` 6.6` Bendrojoje prieigoje pasirenkama „Visi, turintys nuorodą“.
- `12.0` Rolės „Žiūrintysis“ visiškai pakanka – redaguoti svetainei nereikia.
- `18.0` Tai padarome prijungdami failą.

## 06. Lentelė puslapyje – 25 s
*Antraštė:* Puslapyje – viena eilutė, svetainėje – lentelė

- ` 1.0` Puslapyje lentelė įrašoma viena eilute.
- ` 5.0` Pirmas skaičius – failo numeris sistemoje, antras – lapo gID.
- `10.6` Išsaugojus puslapį, lankytojas mato jau sutvarkytą lentelę.
- `16.0` Jums šios eilutės rašyti nereikia – ją įdedame prijungdami lentelę.
- `20.9` Vėliau keičiasi tik duomenys faile.

## 07. Modulis sistemoje – 24 s
*Antraštė:* Prijungti failai turi savo sąrašą

- ` 1.0` Turinio valdymo sistemoje prijungti failai turi savo sąrašą.
- ` 5.7` Kiekvienas atpažįstamas pagal pavadinimą, kurį suteikiame patys.
- `10.6` Numerį sistema priskiria pati – būtent jį puslapis naudoja lentelei rasti.
- `16.4` O žyma „Enabled“ rodo, ar failas veikia.
- `19.9` Išjungto failo lentelės nematyti.

## 08. Kaip greitai atsinaujina – 20 s
*Antraštė:* Pakeitimas svetainėje – per kelias sekundes

- ` 1.0` Pataisius langelį, svetainė atsinaujina pati.
- ` 5.0` Dažniausiai tai trunka kelias sekundes.
- ` 9.0` Jei pakeitimo nematyti, tikrinkite du dalykus.
- `12.9` Ar redaguojate tą pačią prijungtą lentelę.
- `16.5` Ir ar tikrai išėjote iš langelio.

## 09. Lentelė yra duomenų bazė – 29 s
*Antraštė:* Svarbu tvarka, ne stilius

- ` 1.0` Lentelė čia veikia kaip duomenų bazė – svarbiausia tvarka, ne stilius.
- ` 6.4` Langelyje neturi būti nei perkėlimo į naują eilutę, nei formulių, nei sujungtų langelių.
- `13.5` Tinka tai, kas paruošta: A stulpelio žymos ir vienas formatas vienai eilutei.
- `20.3` Sudėtingesnis formatavimas svetainėje nesimato.
- `24.2` Todėl šabloną verta palikti tokį, koks yra.

## 10. Lapų tvarka – 21 s
*Antraštė:* Pirmas lapas lieka pirmas

- ` 1.0` Pirmas lapas visada turi gID nulis.
- ` 5.0` Jo vietos keisti nereikėtų – svetainė jį atpažįsta būtent pagal šį numerį.
- `11.0` Kitus lapus galima perkelti ar pervadinti laisvai.
- `15.0` Sistema juos atpažįsta pagal gID, ne pagal vietą.

## 11. Keli failai pagal atsakomybes – 23 s
*Antraštė:* Ne vienas didelis, o keli aiškūs

- ` 1.0` Visas lenteles galima sudėti į vieną failą, bet patogiau skaidyti pagal atsakomybes.
- ` 7.4` Pavyzdžiui, administracijos ir ugdymo lentelės gyvena atskirai.
- `12.6` Taip aišku, kuris failas kam priklauso,
- `15.8` klaida paliečia tik vieną failą,
- `18.3` o skirtingi žmonės dirba vienas kitam netrukdydami.

## 12. Ką matote atidarę – 21 s
*Antraštė:* Darbas jau pradėtas – lieka duomenys

- ` 1.0` Atidarę failą matote, kad darbas jau pradėtas.
- ` 5.0` Lapai paruošti dažniausioms lentelėms: taryba, komisijos, darbo užmokestis.
- `11.0` Antraštės ir stulpeliai jau sudėlioti – lieka duomenys.
- `15.7` O jei kurios nors lentelės nereikia, tiesiog jos nepildote.

## 13. Kur toliau – 16 s
*Antraštė:* Dar dvi pamokos ta pačia tema

- ` 1.0` Ta pačia tema turime dar dvi pamokas.
- ` 4.6` Pradžiamokslis parodo, kaip tvarkyti pačias lenteles.
- ` 9.4` O lentelių kūrimo principai – kaip lentelė turi atrodyti, kad būtų suprantama.
