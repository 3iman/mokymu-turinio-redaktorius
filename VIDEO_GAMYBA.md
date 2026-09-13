# Video gamyba — universalios taisyklės

Kaip iš pamokos gimsta YouTube filmukas. Rašyta 2026-09-13 po slapukų pamokos, kurios metu
kiekviena čia surašyta taisyklė buvo pažeista bent kartą ir kainavo perstatymą.

Darbinis katalogas: `~/Workspace/AI vizualai/illustrations`

---

## 1. Ko reikia prieš pradedant

| Kas | Kur | Pastaba |
|---|---|---|
| Iliustracijų šablonai | `lessons/{slug}/templates/NN-*.html` | ⛔ `{slug}` = **WP pamokos slug**, ne laisvas vardas |
| Tekstas | `lessons/{slug}/content/lt.json` | sekcijos raktas = failo vardas su `_` |
| Scenarijus | `lessons/{slug}/video/scenarijus-lt.md` | privalo turėti **lentelę**, žr. §2 |
| Animacijos įrašai | `generate-video-clips.js` → `TEMPLATE_ANIMATIONS` | ⛔ po įrašą **kiekvienam** šablonui |

⛔ **Katalogo vardas privalo sutapti su WP slug.** `generate-youtube-description.js` ieško
įrašo per `?slug=`, ir be sutapimo nutrūksta su „Lesson not found in WP“. Juodraštis slug'o
neturi, kol jo nenustatai — nustatyk iš anksto.

---

## 2. Scenarijus: lentelė valdo viską

Lentelė scenarijaus viršuje **nėra dekoracija** — iš jos imamos ir klipų trukmės, ir
YouTube laiko žymos. Žemiau esantys „KADRAS N“ aprašai skirti žmogui.

```
| Kadras | Trukmė | Failas |
|---|---|---|
| 0 Intro | 5 sek. | intro |
| 1 Klausimas ir atsakymas | 8 sek. | 00-virselis |
…
| 9 Outro | 5 sek. | autro |
```

Trukmė renkama **pagal turinio svorį**, ne vienoda:

| Turinys | Trukmė |
|---|---|
| trys žingsniai, palyginimas iš dviejų dalių | 8–9 s |
| ekranas, kuriame reikia kažką rasti akimis | 10 s |
| lentelė, trys ir daugiau eilučių | 11–12 s |

⛔ **Vienodos trukmės = metronomas.** Būtent jis 2026-09-13 buvo įvardytas kaip
„monotoniška“.

---

## 3. Eiga

```bash
node generate.js --png --lang lt
node generate-video-clips.js --lesson {slug} --lang lt
node build-video.js --lesson {slug} --lang lt
node generate-youtube-description.js --lesson {slug} --lang lt
```

⛔ Prieš `build-video.js`: uždaryti grotuvą ir ištrinti seną failą.

```bash
osascript -e 'quit app "QuickTime Player"'
rm -f lessons/{slug}/video/*lt*.mp4 lessons/{slug}/video/intro.mp4
```

Keičiant animaciją — ištrinti ir klipus: `rm -rf lessons/{slug}/output/lt/clips`.
Senas klipas neperrašomas, o tyliai panaudojamas iš naujo.

---

## 4. Animacija

Pilna teorija — `ANIMATION_PRINCIPLES.md`. Čia tik tai, ką lengva praleisti.

⛔ **Be įrašo `TEMPLATE_ANIMATIONS` klipas gauna `FALLBACK_CSS`** — vienodi 1 s tarpai tarp
viršutinio lygio blokų, be vidinės sekos, be svorio skirtumų. Video susimontuoja ir atrodo
tvarkingai, tad klaida tyli. **Tai dažniausia šios grandinės klaida.**

Ką privalo turėti įrašas:

| Principas | CSS'e |
|---|---|
| Staging | `.card` ir vandens ženklas matomi nuo pradžių; animuojasi tik turinys |
| Svoris | antraštė `fadeUpHeavy 0.6s`, blokai `fadeUpMedium 0.5s`, smulkmenos `fadeUpLight 0.35s` |
| Sequential annotation | bloko vidus po vieną, 0.15–0.2 s tarpais |
| Pacing | tarp loginių blokų pauzė; **vienodi tarpai draudžiami** |
| Secondary action | ikonai `iconPulse` iškart po atsiradimo |
| Easing | tik `var(--ease-spring)`, niekada `linear` |
| Kognityvinė apkrova | ne daugiau kaip 2–3 judantys elementai vienu metu |

**Kryptis seka prasmę**, ne įprotį: grandinė `slinktisIsKaires`, gavėjai `slinktisIsDesines`,
atsakymas `issiskleidzia`, rodyklė `rodyklePiesiama`. Vien `fadeUp` visur — ta pati
monotonija kitu pavidalu.

⛔ **Akcentas nėra atsiradimas.** Žiedas apie svarbią vietą ryškėja atskirai, jau atsiradus
blokui: `ziedasRyskeja` / `ziedasZalias` animuoja tik `border-color` iš `transparent`.

⛔ **Kadras niekada visiškai nesustingsta** — `.card` turi lėtą `kortelesDreifas` per visą
klipą (`--klipo-trukme`).

---

## 5. Skirtukas tarp kadrų

⛔ **Pavadinimas laikomas ne trumpiau kaip 2 s.** Žiūrovas nori jį perskaityti. Dabartinis
`TRANSITION_DURATION = 3.2` duoda ~2,1 s matomumo.

⛔ **Skirtuko fonas ir vandens ženklas privalo sutapti su skaidrės kortele** (`#f3f4f6` +
`simbolis_big.png`, opacity 0.37). Kitaip pjūvis tarp skirtuko ir skaidrės matomas, ir
atsiliepimas skamba „nėra tinkamo perėjimo“.

⛔ **Skaidrė nekartoja to, ką skirtukas ką tik pasakė** — antraštė ateina beveik iškart
(~0.12 s), be 1,3 s įžangos. Antraip tarp skirtuko ir turinio lieka tuščias tarpas.

⛔ Kryptis kaitaliojasi pagal kadro numerį: nelyginis brėžia iš kairės, lyginis iš dešinės.

---

## 6. ⛔ Determinuotas laikas — visur

Kadrai **nerenkami realiu laiku**. Animacijos pristabdomos ir kiekvienam kadrui nustatomas
tikslus `currentTime`:

```js
await page.evaluate((ms) => {
  document.getAnimations().forEach(a => { a.pause(); a.currentTime = ms; });
}, (f / FPS) * 1000);
```

Kol to nebuvo, 4,5 s seka suspausdavo į ~2 s, o likusi klipo dalis būdavo stop kadras.
**Tas pats galioja ir skirtukams** — juos praleidus, numeris blykstelėdavo per 0,5 s.

⛔ **`build-video.js` klipo trukmės nespėja, o matuoja** (`ffprobe`). Senoji eilutė
`frame.duration - 6` rėmėsi prielaida, kad klipas visada 6 s, ir ant kiekvieno užklijuodavo
papildomą stop kadrą.

---

## 7. Garsas

Foninė muzika: `assets/video/jiglr-malibu_cleverphant-mokymu-fonas.mp3`, `volume=0.4`,
kartojama per visą filmuką.

⛔ **Vinjetės (`autro.mp4`) širdies plakimas privalo likti.** Vaizdas konkatenuojamas be
garso (visi klipai be jo), o vinjetės takelis įmaišomas atskirai su `adelay` iki jos
pradžios; muzika nutildoma 1,5 s prieš, kad plakimas liktų vienas.

Patikra: vinjetės ruožo `volumedetect` turi sutapti su originalo:

```bash
ffmpeg -v info -ss {outroStart} -t 8 -i video.mp4 -af volumedetect -f null - 2>&1 | grep volume
ffmpeg -v info -i assets/video/autro.mp4 -af volumedetect -f null - 2>&1 | grep volume
```

---

## 8. YouTube aprašymas

`generate-youtube-description.js` skaito lentelę, skaičiuoja žymas ir traukia `le_intro`
iš WP.

⛔ **`TRANSITION` konstanta gyvena dviejuose failuose** — `generate-video-clips.js`
(`TRANSITION_DURATION`) ir `generate-youtube-description.js` (`TRANSITION`). Pakeitus vieną,
antrą pakeisti **tą pačią minutę**, kitaip laiko žymos meluoja tyliai.

⛔ Sugeneravus **palyginti paskutinę žymą su tikrąja trukme**:

```bash
ffprobe -v error -show_entries format=duration -of csv=p=0 lessons/{slug}/video/{slug}-lt.mp4
```

---

## 9. Priėmimo patikra

Ne „pažiūrėjau, atrodo gerai“, o matavimas. Monotonija yra skaičius:

```python
from PIL import Image, ImageChops, ImageStat
# kadrai kas 0.5 s; < 0.02 reiškia visiškai nejudantį ruožą
ImageStat.Stat(ImageChops.difference(a, b)).mean[0] < 0.02
```

| Rodiklis | Riba |
|---|---|
| visiškai nejudančių ruožų | **≤ 15 %** filmuko |
| skirtuko pavadinimo matomumas | **≥ 2 s** |
| vinjetės garso vidurkis | ± 0,5 dB nuo originalo |
| paskutinė YouTube žyma | neviršija tikrosios trukmės |

Slapukų pamokos rodikliai po taisymų: 110 s, nejudančių ruožų ~11 %, skirtukas 2,1 s,
vinjetė −29,5 dB prieš −29,4 dB.

---

## 10. Ko NEDARYTI

- Negaminti klipų neparašius `TEMPLATE_ANIMATIONS` įrašo.
- Nekeisti `TRANSITION_DURATION` nepakeitus `TRANSITION` aprašymo generatoriuje.
- Netrumpinti skirtuko žemiau 3 s.
- Nedėti vienodų trukmių visiems kadrams.
- Nemontuoti neištrynus senų klipų ir seno mp4.
- Nekelti į YouTube be žmogaus sprendimo — prieigos raktų projekte nėra, įkėlimas rankinis.
