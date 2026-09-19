# Google Sheets pradžiamokslis — tyrimas (2026-09-17 naktis)

Viskas, kuo remiasi pamoka. [patikrinta] — matyta tikrame šaltinyje; [prielaida] — reikia Eimanto patvirtinimo.

## Mokytojų šablonas
Failas „Svalios progimnazija TABLE“ (`1sCPBdyIwY6_8VYD56uSaccirtPGRc5LonzaEnzk2kC8`), nuoroda iš pamokos WP 1654. [patikrinta]

- 16 lapų: Gimnazijos taryba (gid 0), Mokinių taryba, Mokytojų taryba, Tėvų komitetas, Metodinės grupės,
  Darbo užmokesti, Vaiko gerovės komisija, Darbuotojai, Mokytojų sąrašas, Metodinė taryba,
  Vadovų dienotvarkė, Dienos ritmas, Ugdymo proceso trukmė, Atostogos, Pamokų laikas, Formatavimas. [patikrinta]
- **A stulpelio žymos** — išskleidžiami „čipai“: `H2`, `H3`, `TH`; lape „Formatavimas“ visas sąrašas:
  h2–h6, strong, p, i, u, mark, em, small, del, sup, sub, code, blockquote, `th` (lentelės headeris),
  `ignore` (neatvaizduoja eilutės). Tuščias A = įprasta eilutė. [patikrinta]
- „Mokytojų sąrašas“: H2 pavadinimas → H3 grupė → TH žalia antraštė (`#1c8d1f`, B stulp. `#157d3e`, baltas tekstas)
  → eilutės su kintamomis pilkomis juostomis (`#f1f1f1`, tekstas `#5f5f5f`). [patikrinta]
- **Netikslūs paspalvinimai tikri:** pirmoje grupėje H3 eilutė nuspalvinta pilkai, o juostos skirtingose grupėse
  prasideda skirtinga spalva. [patikrinta]
- ⛔ **Šabloną redaguoti gali bet kas su nuoroda, net neprisijungęs.** Tyrimo metu per klaidą įterpta viena
  eilutė „Mokytojų sąraše“ ir iškart atšaukta (Cmd+Z); patikrinta htmlview — eilutės 1–14 tokios pat kaip prieš. [patikrinta]

## Google Sheets sąsaja lietuviškai (redaktorius, `hl=lt`) [patikrinta]
- Produktas: „Google“ skaičiuoklės. Meniu: Failas, Redaguoti, Peržiūrėti, Įterpti, Formatas, Duomenys, Įrankiai,
  Plėtiniai, Pagalba. Mygtukas „Bendrinti“. Išsaugojimo užrašas „Išsaugoma…“.
- Lapų juosta apačioje: „+“, mygtukas „Visi lapai“ (trys brūkšneliai), lapai su rodykle ▾, slinkimo rodyklės ‹ ›.
  Aktyvus lapas: fonas `#dde3ea`, tekstas `#0b57d0`, 700. Kiti: fonas `#f8fafd`, tekstas `#444746`. Juostos aukštis 37 px.
- Lapo meniu (▾): Ištrinti, Dubliuoti, Pervardyti, Pakeisti spalvą ▸, Slėpti lapą, Peržiūrėti komentarus,
  Perkelti į dešinę, Perkelti į kairę. (Neprisijungus; prisijungusiam gali būti daugiau, pvz. „Kopijuoti į“.)
- Eilutės meniu (dešinys spustelėjimas ant eilutės numerio): Iškirpti, Kopijuoti, Įklijuoti, Įklijuoti specialią
  vertę, Įterpti 1 eilutę aukščiau, Įterpti 1 eilutę žemiau, Ištrinti eilutę, Išvalyti eilutę, Slėpti eilutę,
  Pakeisti eilutės dydį, Sukurti filtrą, Sąlyginis formatavimas, Duomenų patvirtinimas, Žr. daugiau eilutės veiksmų.
- Meniu Formatas: … Sąlyginis formatavimas, **Besikeičiančios spalvos**, Išvalyti formatavimą.
  Skydelio „Besikeičiančios spalvos“ neatidariau — jis gali iškart pritaikyti spalvas pažymėtam langeliui. [neatidaryta]

## Google oficiali pagalba [patikrinta]
- Pervardyti: dukart spustelėti lapo pavadinimą. Ištrinti: ▾ → Delete → OK. Perkelti: vilkti lapą.
  Slėpti: ▾ → Hide sheet; grąžinti: View → Show. (support.google.com/docs/answer/1218656)
- Neprisijungę redaguotojai rodomi kaip „anoniminiai gyvūnai“ (support.google.com/docs/answer/2494888).
- Bendrinimas ne Google paskyrai su PIN veikia tik iš Google Workspace, lankytojas dirba 7 dienas,
  po to patvirtina iš naujo (support.google.com/drive/answer/9195194).

## Iš ankstesnės pamokos (google-sheets-integracija) [patikrinta]
- Pirmas lapas visada gID 0 — jo eilės nekeisti. Pervadinti, perkelti kitus, pridėti naujus galima — gID nesikeičia.
- Svetainė atsinaujina, kai išeinate iš langelio (Enter / Tab).
- Formulės, Shift+Enter kelios eilutės langelyje — netaisyklingai.
- Integracija spalvų į svetainę neperkelia (CLAUDE.md: integracija slopina stilių).

## Eimanto atsakymai (2026-09-17)
1. **Prieiga:** senoji eiga (mokykla kopijuoja šabloną) nesuveikė. Dabar integraciją padaro Cleverphant, mokytojai tik
   **prašo prieigos**. ⛔ Lietuviški tekstai „Jums reikia prieigos“ / „Prašyti prieigos“ — išversti iš anglų, tikro lango nematyta.
2. **Ne Gmail paskyra:** aktualu — failas neatsiranda asmeniniame diske; kaskart jungiamasi per laiške gautą nuorodą ir PIN
   kodą, nebent su tuo el. paštu susikuriama „Google“ paskyra; jei el. paštas priklauso „Google Workspace“ organizacijai,
   apribojimų nėra. Neaktualu mokytojams: Apps Script, priedai, darbas be interneto, savininko teisės, Gemini, užduočių
   priskyrimas, Connected Sheets.
3. **Ctrl+Z ištrintam lapui:** veikia, kol neuždarytas langas ir neperkrautas puslapis; po kelių veiksmų gali tekti spausti
   kelis kartus. Vėliau — Failas → Versijų istorija → Žiūrėti versijų istoriją (mokytojams nerodome, atkuria Cleverphant).
4. **Paslėptas lapas:** slepiamas dėl patogumo, svetainė iš jo duomenis ima toliau.
5. **Spalvos:** keliant sąrašą per API, TH žalia spalva lieka eilutėse, kurios tapo įprastomis — mokytojų sąrašuose
   beveik visada. Svetainėje nesimato; tvarkos mėgėjams — pažymėti langelius → Formatas → Išvalyti formatavimą.

## Eimanto atsakymai 2026-09-17 (antras ratas)
1. Langelių jungti negalima.
2. Tekstas iš Word ar PDF atsineša eilutės perkėlimus — reikia parodyti, kaip sutvarkyti: viršutinėje langelio juostoje ištrinti perkėlimą.
3. Rikiavimo nenaudojame. „Naudojame paruoštukus ir nemodifikuojame jų, jei tiksliai nežinome kaip. Eksperimentuoti aišku nedraudžiama. Bet rezultatas nebūtinai bus geras.“
4. Tuščia eilutė svetainėje rodoma tuščia.
5. Jei naujame stulpelyje yra turinio, jis nusipiešia ir svetainėje.
6. Pakeitimas svetainėje — akimirksniu, vos išėjus iš langelio redagavimo.

