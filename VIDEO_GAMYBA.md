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
| Balso tekstas | tame pačiame scenarijuje, stulpelis **Balsas** | ⛔ rašomas **kartu su kadrais**, ne po jų, žr. §2 |
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

⛔ **Balsas gimsta kartu su pirma idėja** (Eimantas, 2026-09-15). Lentelė turi ketvirtą
stulpelį — **Balsas** — ir jis pildomas tą pačią minutę, kai sugalvojamas kadras:

```
| Kadras | Trukmė | Failas | Balsas |
|---|---|---|---|
| 1 Klausimas ir atsakymas | 8 sek. | 00-virselis | Kartą per metus ar dažniau į raštinę ateina laiškas… |
```

- Kadro trukmė = **ilgesnė iš dviejų**: balso trukmė + ~1,5 s kvėpavimui, arba turinio
  svorio minimumas iš lentelės žemiau. Balsas niekada nespraudžiamas į jau parinktą trukmę.
- Balsas **neskaito ekrano teksto** — papildo jį. Tas pats sakinys ekrane ir balse
  žiūrovui yra perteklius.
- Intro ir vinjetė lieka **be balso** (vinjetės širdies plakimas turi likti vienas, §7).
- Filmukui, sukurtam be balso, balsas **atsirenkamas iš pamokos teksto**, ne rašomas iš naujo.

Balsą gamina `generate-voice.js`, montažas jį įmaišo pats — žr. §7 „Balsas“.

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
node generate.js --png --lang lt --lesson {slug}
node generate-video-clips.js --lesson {slug} --lang lt
node generate-voice.js --lesson {slug} --lang lt
node build-video.js --lesson {slug} --lang lt
node generate-youtube-description.js --lesson {slug} --lang lt
node make-srt.js --lesson {slug} --lang lt          # subtitrai, jei yra balsas
node make-yt-meta.js --lesson {slug} --lang lt      # meta įkėlimui
.venv/bin/python -m yt_upload run --lesson {slug} --dry-run
```

⛔ **`--lesson` pridėtas 2026-09-19.** Be jo `generate.js` perpiešia VISŲ pamokų kadrus
(109 PNG, ~1,5 min) — taisant vieną pamoką tai gryna laukimo mokestis; su filtru 13 PNG per 15 s.
Kelios pamokos rašomos per kablelį. Manifestas (`--manifest`) filtro nepaiso: jis aprėpia visas.

⛔ **Nieko netrinti, kol sukasi renderis.** 2026-09-19 pašalinus užsilikusį kadro HTML viduryje
klipų generavimo, visa grandinė nulūžo su `net::ERR_FILE_NOT_FOUND`. Valymas — tarp paleidimų.

⛔ **Laukiant proceso nenaudoti `pgrep -f "build-video.js"`** cikle: `pgrep` randa ir pačią laukimo
komandą, tad ji laukia savęs amžinai (taip prarasta ~20 min). Laukti pagal žurnalo eilutę arba PID.

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

### Balsas (nuo 2026-09-15)

`generate-voice.js` skaito scenarijaus stulpelį **Balsas** ir kuria
`video/balsas-{lang}/kNN.wav` + `manifest.json`. `build-video.js` juos randa pats.

| Kas | Kaip | Kodėl |
|---|---|---|
| Modelis ir balsas | `eleven_v3_dpo_20260217`, „Darius Cleverphant“ greitasis klonas `eqJHjeWMPGJFD6VBf1J2` | Eimantas išrinko ausimi 2026-09-15 prieš `eleven_v3`. Profesionalus klonas neapmokytas, o v3 jam dar neoptimizuotas |
| Versija | **viena versija**; seed įrašomas scenarijaus antraštėje automatiškai | modelis, balsas ir nustatymai nuspręsti 2026-09-15 — Eimantas versijų **nerenka**. Seed daro pergeneravimą pakartojamą. `--kandidatai` — tik jei Eimantas pats paprašo |
| Visi sakiniai | **viena** užklausa, iškerpami pagal simbolių laiko žymas | `eleven_v3` nepriima `previous_text`/`next_text`; atskiros užklausos duoda intonacijos šuolius |
| Paskutinis sakinys | po jo pridedamas **atmetamas** sakinys | ElevenLabs failas baigiasi ties paskutine raide, kol balsas dar skamba (−25 dB) — skamba nukirpta |
| Vieta filmuke | kadro pradžia **išmatuota** iš sukonkatenuotų failų + 0,6 s | ne apskaičiuota iš scenarijaus — skirtukai ir klipai gali skirtis |
| Muzika po balsu | `sidechaincompress`, release ~0,9 s | staigus grįžimas po sakinio irgi skamba kaip nukirpimas |
| Garsumas | montaže visų kadrų balsas pakeliamas iki **−19 LUFS vienu stiprinimu**, ribotuvas −1 dBFS | `eleven_v3_dpo` generuoja ~9 dB tyliau nei `eleven_v3` (−27,8 prieš −18,8 LUFS). Be suvienodinimo balsas skęsta muzikoje, nors ji prislopinama. Vienas stiprinimas visiems išsaugo skirtumus tarp sakinių |
| Greitis | `speed: 0.9` | ramesnis tempas 45–65 m. žiūrovui |
| Kešas | jei tekstai nepakito, API nekviečiama; `--force` pergeneruoja | pakeitus vieną sakinį, pergeneruojami **visi** — tyčia, dėl intonacijos |
| Netelpa | `generate-voice.js` baigiasi kodu 2 | kadras pailginamas scenarijuje, balsas nespraudžiamas |
| Serveris užimtas | 429 `system_busy` arba 5xx — laukiama 20/45/90/180/300 s ir bandoma dar kartą (2026-09-19) | piko metu ElevenLabs atmeta užklausas; tai ne mūsų klaida, o be kartojimo visa eilė nutrūksta |

⛔ **Prieš įgarsinant — patikrinti tylą** (`ANIMATION_PRINCIPLES.md` § „Tyla kadre“): tarpai tarp
sakinių iki 3 s, kalbos dalis 70–80 %. Tyliame filmuke duobės nesimato, su balsu jos skamba kaip klaida.

⛔ **Kirtis rašomas tekste kirčio ženklu**, pvz. „ràštinę“ (Eimantas patvirtino
2026-09-15). Tarimo žodynas `cleverphant-lt-tarimas` ElevenLabs paskyroje sukurtas, bet
`eleven_v3` jo greičiausiai **neskaito**: normalizuotame tekste pakaitalas neatsirado.
Įjungiamas per `.env` → `ELEVENLABS_PRON_DICT_ID`, jei kada nors pasitvirtintų.

Patikra po montažo (slapukų pamoka, 2026-09-15):

| Rodiklis | Be balso | Su balsu |
|---|---|---|
| trukmė | 110,4 s | 110,4 s |
| vinjetės vidurkis | −29,5 dB | −29,5 dB |
| K1 ruožas (balsas) | −26,6 dB | −21,4 dB |
| tarpas tarp sakinių | −19,9 dB | −19,8 dB |

Kaina: ~740 simbolių 110 s filmukui. Raktas `illustrations/.env` → `ELEVENLABS_API_KEY`.
Rakto teisės: Text to Speech, `user_read`, tarimo žodynai (read/write).

### Laiko žymos: balsas sakiniais ir garsai (nuo 2026-09-17)

„Kur spausti“ filmukuose balsas sakomas ne vienu gabalu nuo kadro pradžios, o sakiniais, kurių
kiekvienas skamba savo veiksmo metu, ir kiekvienas veiksmas turi savo garsą. Tai aprašoma kadro
bloke lentele **„Laiko žymos“**:

```
**Laiko žymos:**

| Laikas | Kas | Tekstas arba garsas |
|---|---|---|
| 1.5 | balsas | Paimate naują dokumentą už rankenėlės ir tempiate į viršų. |
| 3.6 | garsas | paemimas |
```

- **Laikas** — sekundės nuo kadro pradžios. Skaitytuvas `scenarijaus-zymos.js`, bendras abiem įrankiams.
- **`generate-voice.js`**: kadras su `balsas` žymomis įgarsinamas jų sakiniais (vis tiek viena
  užklausa), failai `kNN-M.wav`. Sakinio langas — iki kitos balso žymos minus 0,15 s arba iki kadro
  pabaigos minus 0,5 s. Netelpa — kodas 2: atitolinti kitą žymą arba pailginti kadrą.
- **`build-video.js`**: sakinį deda ties jo žyma. Vieta skaitoma iš scenarijaus, ne iš manifesto —
  perkėlus žymą balso generuoti iš naujo nereikia. Garsus ima iš `assets/video/sfx/{vardas}.wav`,
  garsumą iš `assets/video/sfx/garsumas.json`. Garsai muzikos prislopinimo nesukelia.
- **Garsai** sugeneruoti patys (ffmpeg sinusai ir triukšmas), nieko neatsisiųsta:
  `spustelejimas`, `paemimas`, `numetimas`, `patvirtinimas`.
- Kadrai be žymų veikia kaip anksčiau: balsas iš pagrindinės lentelės stulpelio „Balsas“.
- Žymos laikas turi sutapti su animacijos laiku `TEMPLATE_ANIMATIONS` įraše — jo komentare
  surašomi tie patys momentai.

### Vinjetė (nuo 2026-09-15)

Senos `autro.mp4` pirmos 4 s (sodriai mėlynas fonas, ranka pieštos „AČIŪ, KAD MOKOTĖS“)
buvo paskutinis senos vizualikos kadras ir davė du spalvos šuolius. Dabar pradžia
atvaizduojama iš `templates/video-outro.html`, o nuo 4,0 s prijungiama nekeista `autro.mp4`
logotipo dalis. Širdies plakimo takelis imamas iš `autro.mp4` visas, tad nepasislenka.

| Laikas | Vaizdas | Kodėl |
|---|---|---|
| 0,0 s | tas pats šviesus fonas kaip skaidrių ir skirtukų | iš paskutinio kadro nėra spalvos šuolio |
| 0,2 s | centre „Ačiū, kad skyrėte **laiko**“ (92 px, 400/800) | „skyrėte laiko“, ne „mokotės“ — kreipiamasi į suaugusį (Eimantas) |
| 0,9 s | brūkšnys iš #3ab0b0 į #f3a8c4, kaip skirtuke | ta pati brando kalba |
| 3,05–3,40 s | tekstas išnyksta | teksto matomumas ~2,9 s (≥ 2 s) |
| 3,30–4,00 s | fonas pereina į #dfecf3 | tokia `autro.mp4` spalva 4,0–4,24 s — pjūvis nematomas |
| 3,40–3,95 s | brūkšnys susitraukia į kadro centrą (960, 540) | ten 4,24 s nusileidžia logotipas |
| 4,0–8,0 s | `autro.mp4` logotipo dalis ir garsas | brando dalis nekeičiama |

Išmatuoti atskaitos taškai (`autro.mp4`): 29,97 kadro/s, 7,97 s; 4,0–4,24 s tuščias
#dfecf3; logotipas matomas nuo 4,24 s, sustoja iki 5,0 s bloke x 580–1336, y 232–844,
centras (958, 538); garsas 0,2–3,3 s ir dūžis 4,1 s.

⛔ **Tekstas išeina PRIEŠ brūkšnį.** „laiko“ stovi ant kadro centro. Kai abu išėjimai
prasidėdavo 3,3 s, į centrą keliaujantis brūkšnys ėjo per blankstantį žodį ir atrodė kaip
perbraukimas. Skaičiai to neparodė — pagauta tik apžiūrėjus centrą pilna raiška.

⛔ Kadrai atvaizduojami **nustatant laiką** kiekvienam (`currentTime`), kaip §6.

Kalbos: tekstas imamas iš `OUTRO_THANKS` (`build-video.js`). Kol kas tik `lt`; kitos kalbos
gauna visą seną `autro.mp4`. Tarpinis `video/outro-galva-{lang}.mp4` perrenkamas kiekvieną
kartą ir į git neįtraukiamas.

Priėmimo patikra (slapukų pamoka, 2026-09-15):

| Rodiklis | Riba | Rezultatas |
|---|---|---|
| paskutinio kadro ir vinjetės 0,05 s kampo spalva | sutampa | #ecf0f5 / #ecf0f5 |
| 3,95 s ir 4,05 s kampo spalva | abi #dfecf3 | #dfecf3 / #dfecf3 |
| vinjetės garso vidurkis | ± 0,5 dB nuo originalo | −29,5 dB |
| filmuko trukmė | nepakinta | 110,4 s |
| kadro centras 3,2–3,9 s pilna raiška | brūkšnys nekerta teksto | ✅ |

---

## 8. YouTube aprašymas

`generate-youtube-description.js` skaito lentelę, skaičiuoja žymas ir traukia `le_intro`
iš WP.

⛔ **`TRANSITION` konstanta gyvena dviejuose failuose** — `generate-video-clips.js`
(`TRANSITION_DURATION`) ir `generate-youtube-description.js` (`TRANSITION`). Pakeitus vieną,
antrą pakeisti **tą pačią minutę**, kitaip laiko žymos meluoja tyliai.

⛔ **Trečios kopijos nedaryti.** Nuo 2026-09-19 `build-video.js` po montažo rašo
`video/timeline-{lang}.json`, kuriame kadrų pradžios ir balso ruožai **išmatuoti** iš
sumontuotų failų, ne perskaičiuoti. Viskas, kam reikia laiko (subtitrai, žymos), ima iš ten.

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
- Negeneruoti balso po vieną kadrą ir nerašyti balso, kuris garsiai skaito ekrano tekstą.
- Nekeisti vinjetės laiko taip, kad brūkšnys keliautų į centrą, kol tekstas dar matomas.
- Neperdarinėti `autro.mp4` — logotipo dalis ir širdies plakimas imami iš jo nekeisti.
- Nekelti į YouTube be žmogaus sprendimo. Nuo 2026-09-19 įkėlimas automatinis
  (`yt_upload`, žr. `YOUTUBE_IKELIMAS.md`), bet filmukas keliamas **`private`** ir viešina
  žmogus po peržiūros. Tai riba, ne laikinas apribojimas.
- Nekelti to paties filmuko antrą kartą: jei `uploads-log.json` slug'as turi `video_id`,
  `videos.insert` nekviečiamas. Naujiems vertimams ir subtitrams — `yt_upload update`.

---

## 11. Įkėlimas į YouTube

Pilna tvarka — `YOUTUBE_IKELIMAS.md` (paruošimas, kanalai, kvota, klaidos).

Trumpai:

```bash
node make-srt.js --lesson {slug} --lang lt
node make-yt-meta.js --lesson {slug} --lang lt
.venv/bin/python -m yt_upload run --lesson {slug} --dry-run
.venv/bin/python -m yt_upload run --lesson {slug}
```

| Kas | Kur |
|---|---|
| kalbos ir kanalai | `config/settings.json`, `config/channels.json` — **ne kode** |
| įrankio atmintis | `uploads-log.json` |
| prieigos raktai | `.secrets/` (`.gitignore`) |

⛔ Nauja kalba ar rinka pridedama tik JSON failuose. Jei tam prireikė keisti kodą — kažkas
padaryta ne ten.
