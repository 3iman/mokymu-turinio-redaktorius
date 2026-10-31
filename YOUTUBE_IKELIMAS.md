# YouTube įkėlimas

Kaip sumontuotas filmukas patenka į YouTube. Įrankis — `yt_upload`, paleidžiamas ranka
arba kaip paskutinis `VIDEO_GAMYBA.md` grandinės žingsnis.

Darbinis katalogas: `~/Workspace/AI vizualai/illustrations`

⛔ **Kalba yra duomenys, ne logika.** Kalbų ir kanalų sąrašas gyvena `config/settings.json`
ir `config/channels.json`. Nauja rinka pridedama ten — kode nekeičiama nieko.

---

## 1. Vienkartinis paruošimas (žmogaus darbas)

### 1.1 Python

**Padaryta 2026-09-19** — `brew install python@3.12` atliktas, `.venv` pastatytas ant
Python 3.12.14, bibliotekos įdiegtos. Kartoti reikia tik persikėlus į kitą kompiuterį:

```bash
brew install python@3.12
cd ~/Workspace/AI\ vizualai/illustrations
python3.12 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

⛔ **Nenaudoti sistemos `python3`** (3.9.6). Kodas ant jo veikia, bet `google-auth` į
kiekvieną išvestį pila EOL įspėjimus, ir tikra klaida juose pasislepia. Visos komandos
žemiau rašomos su `.venv/bin/python`, ne `python3`.

### 1.2 Google Cloud projektas

1. [console.cloud.google.com](https://console.cloud.google.com) → **New Project** → vardas
   `cleverphant-youtube`. **Atskiras projektas**, ne tas, kuriame gyvena Sheets servisas.
2. **APIs & Services → Library** → „YouTube Data API v3" → **Enable**.

### 1.3 OAuth sutikimo ekranas

**Sukonfigūruota 2026-09-19** — kartoti nereikia. Kas nustatyta ir kodėl:

| Laukas | Reikšmė |
|---|---|
| App name | Cleverphant video ikelimas |
| User type | **External** |
| Publishing status | **In production** |
| Application home page | https://cleverphant.lt |
| Privacy policy | https://cleverphant.lt/privatumo-politika/ |
| Authorized domain | cleverphant.lt |
| Contact | eimantas@gardauskas.lt |

⛔ **Internal režimas šiam darbui NETINKA, nors projektas yra `gardauskas.lt` organizacijoje.**
Cleverphant YouTube kanalas yra **Brand paskyra**, o Brand paskyra nėra organizacijos narys —
net kai Workspace vartotojas yra jos savininkas (patikrinta: YouTube Studio → Permissions rodo
`eimantas@gardauskas.lt` kaip Owner, ir vis tiek):

```
Access blocked: Cleverphant video ikelimas can only be used within its organization
Error 403: org_internal
```

Todėl **External**. O kadangi External + „Testing" naikina refresh token'ą po 7 dienų,
statusas iš karto perjungtas į **In production**. Tam Google reikalauja Branding puslapio
(svetainė, privatumo politika, autorizuotas domenas) — jis užpildytas.

⛔ **Verifikacijos nereikia, bet įspėjimo ekranas lieka.** Autorizuojantis pamatysi
„Google hasn't verified this app" → **Advanced** → **Continue**. Tai normalu: programa
skirta tik sau, viešai neplatinama. Verifikacijos prireiktų tik tada, jei ja naudotųsi
pašaliniai žmonės.

### 1.4 OAuth klientas

**Credentials → Create credentials → OAuth client ID → Application type: Desktop app.**
Atsisiųstą JSON įdėk į:

```
.secrets/oauth-cleverphant-lt.json
```

⛔ `.secrets/` yra `.gitignore`. Ten pat gula ir token'as. Į git nepatenka niekada.

### 1.5 Brand paskyra — kanalo pasirinkimas

Cleverphant kanalas yra Brand paskyra. Autorizuojantis eilė tokia:

1. **Choose an account** → `eimantas@gardauskas.lt` (jis kanalo Owner)
2. **Choose a channel** → **Cleverphant**

⛔ Antrame žingsnyje lengva prašauti: numatytasis pasirinkimas yra asmeninis kanalas
(„Eimucijus"), ir įkėlimai nueitų ten. Įrankis po autorizavimo **atspausdina kanalo
pavadinimą** — perskaityk jį, tai vienintelė patikra prieš pirmą įkėlimą.

### 1.6 Autorizavimas

```bash
.venv/bin/python -m yt_upload auth --channel cleverphant-lt
```

Atsidaro naršyklė, po sutikimo token'as įrašomas į `.secrets/yt-cleverphant-lt.json`
(teisės 600). Įrankis atspausdina kanalo pavadinimą — **perskaityk jį** ir įsitikink, kad
tai tas kanalas.

### 1.7 Kvota

**IAM & Admin → Quotas** → filtruok „YouTube Data API". Pažiūrėk tikrąją `videos.insert`
kainą ir įrašyk ją į `config/settings.json` → `kvota.upload_kaina`.

⛔ Dokumentacijoje ta pati operacija nurodoma ir **100**, ir **1600** vienetų. Nuo to
priklauso, ar per parą telpa 6, ar 100 filmukų — tad kaina imama iš konsolės, ne iš
straipsnio. Numatytoji reikšmė faile — atsargesnė (1600).

### 1.8 Auditas

Kol Google YouTube API auditas nepraeitas, **kiekvienas per API įkeltas filmukas
užrakinamas kaip privatus** — jo nepaviešinsi net ranka. Įrankis dėl to veikia: mes
ir taip keliame `private`, o viešina žmogus po peržiūros.

Paraiškos juodraštis — `YOUTUBE_AUDITO_PARAISKA.md`.

---

## 2. Kasdienis darbas

Po to, kai filmukas sumontuotas (`VIDEO_GAMYBA.md` §3):

```bash
node generate-youtube-description.js --lesson {slug} --lang lt   # aprašymas + žymos
node make-srt.js --lesson {slug} --lang lt                       # subtitrai (jei yra balsas)
node make-yt-meta.js --lesson {slug} --lang lt                   # meta.json
.venv/bin/python -m yt_upload run --lesson {slug} --dry-run      # patikra
.venv/bin/python -m yt_upload run --lesson {slug}                # įkėlimas
```

### Ką daro kiekvienas žingsnis

| Komanda | Rezultatas |
|---|---|
| `make-srt.js` | `video/subtitles/{lang}.srt` iš `timeline-{lang}.json` |
| `make-yt-meta.js` | `video/youtube-{lang}.json` — pavadinimas iš WP, aprašymas iš `.txt`, tagai iš `config/` |
| `yt_upload run` | inventorius → įkėlimas → verifikacija |

⛔ **`make-yt-meta.js` žmogaus sprendimų netrina.** Antrą kartą paleistas jis atnaujina tik
aprašymą; pavadinimas, tagai, `privacy`, `publish_at`, grojaraštis lieka tokie, kokius
palikai. Perrašyti viską — `--force`.

### Komandos

| Komanda | Kam |
|---|---|
| `run` | viskas iš eilės; `--lesson`, `--lang`, `--limit`, `--dry-run` |
| `update {slug}` | **nekelia iš naujo** — tik papildo lokalizacijas ir trūkstamus subtitrus |
| `verify` | per `videos.list` tikrina, ar įkeltieji tikrai yra ir turi lokalizacijas |
| `status` | ką žino žurnalas |
| `auth --channel X` | autorizuoti kanalą |

### Geležinė taisyklė

**Jei `uploads-log.json` slug'as jau turi `video_id` — `videos.insert` nekviečiamas.**
Taisyklė patikrinama dviejose vietose: sudarant eilę ir prieš patį įkėlimą.

Žurnalo raktas — `{slug}::{lang}`, nes kiekviena rinka turi savo kanalą, tad lenkiškas
filmukas yra savarankiškas įkėlimas, ne lietuviško lokalizacija.

---

## 3. Kontraktas

```
lessons/{slug}/video/
  {slug}-{lang}.mp4          filmukas (build-video.js)
  timeline-{lang}.json       laiko juosta (build-video.js) — vienintelis laiko šaltinis
  youtube-{lang}.txt         aprašymas su žymomis
  youtube-{lang}.json        meta — šitą skaito yt_upload
  subtitles/{lang}.srt       subtitrai
  thumbnail-{lang}.png       miniatiūra (neprivaloma, 1280×720, iki 2 MB)
```

`youtube-{lang}.json`:

```json
{
  "slug": "ka-atsakyti-kai-paklausia-apie-slapukus",
  "source_language": "lt",
  "audio_language": "lt",
  "channel": "cleverphant-lt",
  "category_id": "27",
  "made_for_kids": false,
  "privacy": "private",
  "publish_at": null,
  "related_url": "https://mokymai.cleverphant.lt/...",
  "variant_of": null,
  "video": "ka-atsakyti-kai-paklausia-apie-slapukus-lt.mp4",
  "localizations": {
    "lt": { "title": "…", "description": "…", "tags": ["…"] }
  }
}
```

| Laukas | Taisyklė |
|---|---|
| `source_language` | kalba, kuria parašytas pagrindinis pavadinimas → `snippet.defaultLanguage` |
| `audio_language` | kalba, kuria **kalbama** → `snippet.defaultAudioLanguage`. Filmukui be balso — `null` |
| `localizations` | BCP-47 kodas → pavadinimas ir aprašymas ta kalba |
| `channel` | raktas iš `config/channels.json` |
| `category_id` | `27` = Education |
| `made_for_kids` | **visada `false`** — auditorija yra suaugę mokytojai. `true` praeina tik kaip sąmoningas sprendimas: validacija jį sustabdo |
| `privacy` | `private`. Viešina žmogus po peržiūros arba `publish_at` (ISO 8601 su juosta) |

**Ribos, tikrinamos prieš siuntimą:** pavadinimas ≤ 100, aprašymas ≤ 5000, visi tagai
kartu ≤ 500 simbolių, jokių `<` ir `>`.

---

## 4. Du daugiakalbystės keliai

| | Kada | Kaip |
|---|---|---|
| **Tas pats garsas, kitas tekstas** | vertimas tik metaduomenims ir subtitrams | vienas filmukas, kelios `localizations`, keli `subtitles/*.srt` |
| **Įgarsinta kita kalba** | atskiras balsas, atskiras mp4 | atskiras `youtube-{lang}.json` su savo `audio_language` ir dažniausiai kitu `channel`; ryšys su originalu — `"variant_of": "{originalo slug}"` |

⛔ **Įrankis neverčia.** Trūksta kalbos — ji praleidžiama ir patenka į `warnings`. Vertimas
yra atskiras gamybos žingsnis.

⛔ **`YOUTUBE_STRATEGY.md` §145: kiekviena rinka turi savo kanalą.** Todėl lenkiškas
filmukas beveik visada yra **antrasis kelias**, ne `localizations` įrašas. `localizations`
lieka toms kalboms, kurios dalijasi kanalu (pvz. lt + en viename).

---

## 5. Nauja kalba

Pridėti tik `config/settings.json`:

```json
"lv": { "vardas": "latvių", "kanalas": "cleverphant-lv" }
```

ir, jei reikia, `tagai.lv`. Kodo neliesti.

## 6. Naujas kanalas

1. `config/channels.json` → naujas įrašas su `token`, `client_secret`, `numatytasis_playlist`,
   `aktyvus: true`.
2. OAuth klientas tam kanalui → `.secrets/oauth-{kanalas}.json`.
3. `python -m yt_upload auth --channel {kanalas}`.

⛔ `aktyvus: false` reiškia „kanalo dar nėra" — validacija tokį įkėlimą sustabdo prieš
siuntimą, ne po jo.

---

## 7. Kai kas nors nutinka

| Simptomas | Kas tai | Ką daryti |
|---|---|---|
| `quotaExceeded` | dienos kvota | įrankis sustoja, likę lieka `pending`. Kvota atsinaujina **apie 10:00 Vilniaus laiku** (vidurnaktis Ramiojo vandenyno laiku). Paleisk tą pačią komandą |
| Nutrūko tinklas | laikina | kartojama 3 kartus su ilgėjančia pauze; sesijos URI saugomas žurnale, tad tęsiama nuo tos vietos, o ne nuo nulio |
| `Reikia autorizuoti` | token'as nebegalioja | `python -m yt_upload auth --channel {kanalas}`. Jei kartojasi kas savaitę — OAuth ekranas tebėra „Testing", žr. §1.3 |
| Filmukas liko privatus | auditas nepraeitas arba taip ir norėta | viešina žmogus; tai ne klaida |
| `videos.list nerado` | filmukas ištrintas YouTube pusėje | ištrink įrašą iš `uploads-log.json` ir kelk iš naujo |

⛔ **Token'ai, `client_secret` ir refresh token'ai niekada nerašomi į ekraną ar žurnalą.**
Jei kada nors pamatysi juos išvestyje — tai defektas, ne patogumas.
