# Cleverphant explainer – kadrų lentelė (v5)

Šaltinis: `~/Downloads/cleverphant-explainer-scenarijus-v5.md`. Kompozicija: `index.html` (Hyperframes 0.8.150).
Trukmės lentelėje = `S`/`D` konstantos skripte. Keičiant vieną – keisti abu.

Balsas dar **negeneruotas** (Eimantas 2026-10-12: pirma vaizdas). Sąmata – Dariaus balsas ~16 simb./s + 1,5 s kvėpavimui.

| Nr. | Scena | Laikas | Trukmė | Balso sąmata | Ekrane | Balsas |
|---|---|---|---|---|---|---|
| 1 | Smulkmena | 0:00–0:09 | 9 s | 7,9 s | Atrodo smulkmena. → Padauginkite iš tūkstančio. | Didžiosios raidės mokyklos svetainėje. Atrodo smulkmena. Dabar padauginkite tai iš tūkstančio mokyklų. |
| 2 | Problema | 0:09–0:26 | 17 s | 16,1 s | Tos pačios pareigos. Kiekviena – viena. → Kokybė tampa atsitiktinumu. | Kiekviena mokykla turi tas pačias pareigas: prieinamumą, duomenų apsaugą, saugumą ir nuolat besikeičiančius reikalavimus. Dažniausiai ji jas sprendžia viena, su savo biudžetu ir savo rangovu. Todėl kokybė priklauso nuo atsitiktinumo. |
| 3 | Kas tai | 0:26–0:41 | 15 s | 12,9 s | Bendra skaitmeninė infrastruktūra mokykloms. | Cleverphant yra bendra skaitmeninė infrastruktūra mokykloms: svetainė, atitiktis, mokymai ir pagalba vienoje platformoje. Mokyklos prie jos prisijungia, užuot kūrusios viską iš naujo. |
| 4 | Mechanizmas | 0:41–0:57 | 16 s | 12,6 s | Ta pati nauda. Ta pati klaida. → Pastebi viena – sutvarkoma visiems. | Kadangi visos mokyklos naudoja tą patį sprendimą, jos gauna tą pačią naudą ir tą pačią klaidą. Bet užtenka, kad klaidą pastebėtų viena. Pataisymas vienoje vietoje pasiekia visas. |
| 5 | Vienodai gerai | 0:57–1:10 | 13 s | 11,4 s | Kokybė neturi priklausyti nuo dydžio. → Vienodai gerai. Savas veidas. | Maža kaimo mokykla gauna tą patį, ką didelė gimnazija. Pagrindas bendras, o veidas, turinys ir balsas lieka kiekvienos mokyklos. Ne vienodai, o vienodai gerai. |
| 6 | Trojos dramblys | 1:10–1:28 | 18 s | 15,9 s | Pradedame nuo smulkmenų. → Kiekvienas žingsnis atveria kitą. | Pokytis prasideda nuo smulkmenų: tvarkingo teksto ir teisingo slapukų sutikimo. Tai mūsų Trojos dramblys, gerąja prasme. Kai tai pasiteisina visur, žengiame toliau: dokumentų bankas, pranešėjų apsauga, o vėliau ir AI integracijos. |
| 7 | Įrodymas | 1:28–1:40 | 12 s | 11,1 s | Veikia jau 15 metų. → pabaigos kadras | Tai veikia jau penkiolika metų. Šimtai įstaigų, ištisos savivaldybės viename standarte. Jums nereikės pradėti nuo nulio. Pasikalbėkime apie jūsų regioną. |

**Iš viso: 100 s.**

## Nukrypimai nuo v5 ir kodėl

- **2 scena 17 s, ne 16 s.** Balsas pagal sąmatą trunka 16,1 s, o kvėpavimui reikia ~1,5 s (VIDEO_GAMYBA.md §2: balsas nespraudžiamas į parinktą trukmę). Dėl to bendra trukmė 100 s, ne ~99 s.
- **Ekrano brūkšnys „–“, ne „—“** – redaktoriaus taisyklė (LRT korpusas).
- **Dramblys = tikras Cleverphant ženklas** (`assets/cleverphant-simbolis-spalvotas.svg`), ne taškinis. Atsakymas į v5 atvirą klausimą Nr. 2.
- **Spalvos – iš ženklo:** `#3363ab`, `#3ab0b0`, `#f3a8c4`, `#c6b8db`, `#d0deec`; klaida `#ef4444`. Fonas – pamokų kortelės fonas su apskritimais. Atsakymas į klausimą Nr. 1 (siūlymas, ne sprendimas).
- **Skirtukų tarp scenų nėra** – vietoj jų 0,5 s ištirpimas per foną. Pamokų skirtukai su numeriais 7 scenoms pridėtų ~20 s ir nebūtų v5 laike.
- **Pabaigoje nėra adreso** – v5 klausimas Nr. 5 (ar cleverphant.com veikia) atviras.

## Kas liko iki galutinio

1. Testas su 3–5 žmonėmis be Lietuvos konteksto: „Kas tai yra?“ (v5 „Kitas žingsnis“).
2. Balsas (`generate-voice.js`) – tik Eimantui leidus; tada trukmės matuojamos `ffprobe`, ne sąmata.
3. Subtitrai ir YouTube teksto sluoksnis – kai bus balsas.
4. Muzika – kol kas be muzikos (Eimantas 2026-10-12).
5. EN/PL versijos – tas pats `index.html`, kiti tekstai ir perskaičiuoti laikai.
