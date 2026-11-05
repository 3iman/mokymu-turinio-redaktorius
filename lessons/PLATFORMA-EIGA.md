# Platformos filmų gamyba — eiga (autonominis režimas nuo 2026-11-03)

> Eimantas 2026-11-03: „Imk visas pamokas iš eilės be mano patvirtinimo. Turi autonomiją. Aš peržiūrėsiu ką padarei ryte.“
> Galioja: piešimas, įgarsinimas (ElevenLabs), montažas. NEgalioja: WP / YouTube publikavimas, tekstų ir kirčių keitimas.
> Šaka abiejuose repo: `claude/friendly-allen-dh1gk0`.

## Būsena ryto peržiūrai (2026-11-03)

**60 pamokų iš 62 pagamintos.** Dvi Google Sheets pamokos nepieštos — pagal promptą jų klipai imami iš esamų scenų.

- Klipai: `lessons/{slug}/video/platforma-lt/{epizodo id}.mp4` + `.vtt` + `.jpg` + `index.json`.
- Kiekviena pamoka: `bash platformos-pamoka.sh {slug}` (žr. VIDEO_GAMYBA.md).
- Scenarijai ir kortelės sutampa visose pamokose (patikra 2026-11-03).

## Reikia tavo sprendimo

1. ✅ **Trys epizodai ilgesni nei 20 s — paliekam kaip yra** (Eimantas, 2026-11-05). Balsas netelpa, tekstų nekeičiau, epizodų neskaidau:
   - `ep_907_03_1` (titulinio-papildiniai K1) — 22 s
   - `ep_709_05_1` (nuorodu-valdymas K2) — 22 s
   - `ep_679_06_1` (dokumentu-banko-anatomija K5) — 21 s
2. **Keturios pamokos sutampa su YouTube pamokomis** (`ka-atsakyti-kai-paklausia-apie-slapukus`, `es-projektu-viesinimas`, `lenteliu-kurimo-principai`, `lenteliu-redagavimas-wysiwyg-redaktoriuje`). Padariau į `lessons/{slug}-platforma/`, kad YouTube pamokos liktų nepaliestos. Koncepcijų kadrai, kurių pavadinimai sutampa, nukopijuoti iš YouTube pamokos. `es-projektu…-platforma` kadre `02-cpva-dokumentai` šriftai padidinti platformai.
3. **Prielaidos be pavyzdinio kadro** — patikrink, ar atitinka tikrą TVS:
   - prisijungimo langas (kaip-prisijungti) — pieštas pagal skeleton faktus;
   - CKEditor dialogai ir kontekstinis meniu — moono-lisa stilius;
   - turinio-zymejimas — papildinio vardas „Žymų juosta“ (kortelė `kl_1472_2` dar atvira);
   - puslapiu-rinkinys-komunikacija K3 — GPM ataskaitos vieta;
   - informacija-gestu-kalba — video laukas kaip įprastas failo laukas.

## Pamokos

| Pamoka | Koncepcijos | Epizodai | Iš viso | Būsena |
|---|---|---|---|---|
| administracijai | 16 | 0 | 205 s | ✅ |
| asmens-duomenu-apsauga | 8 | 0 | 128 s | ✅ |
| baneriu-valdymas | 1 | 2 | 37 s | ✅ |
| bendrieji-principai | 22 | 8 | 388 s | ✅ |
| darbuotoju-profiliu-valdymas | 1 | 4 | 67 s | ✅ |
| darbuotoju-tipo-sintakses | 0 | 4 | 52 s | ✅ |
| dinaminis-turinys | 1 | 0 | 15 s | ✅ |
| dokumentu-banko-anatomija | 0 | 16 | 213 s | ⚠️ `ep_679_06_1` 21 s |
| dokumentu-banko-tipo-sintakses | 0 | 3 | 43 s | ✅ |
| es-projektu-viesinimas-platforma | 2 | 0 | 31 s | ✅ |
| greitosios-nuorodos | 1 | 0 | 16 s | ✅ |
| informacija-gestu-kalba | 5 | 1 | 78 s | ✅ |
| informacija-lengvai-suprantama-kalba | 5 | 3 | 110 s | ✅ |
| informacinis-srautas | 1 | 0 | 16 s | ✅ |
| interneto-svetaines-kurimo-procesas | 8 | 1 | 124 s | ✅ |
| irasu-kategorizavimas | 10 | 0 | 116 s | ✅ |
| ka-atsakyti-kai-paklausia-apie-slapukus-platforma | 5 | 5 | 118 s | ✅ |
| ka-reikia-zinoti-apie-paveikslelius | 8 | 0 | 103 s | ✅ |
| kaip-kartu-dirbsime | 10 | 0 | 134 s | ✅ |
| kaip-prisijungti-ir-kas-ka-gali | 0 | 2 | 35 s | ✅ |
| kaip-publikuoti-vaizdo-irasus-be-youtube | 1 | 6 | 79 s | ✅ |
| karuseles-valdymas | 1 | 2 | 47 s | ✅ |
| kas-yra-dokumentu-bankas | 2 | 0 | 30 s | ✅ |
| kintamuju-valdymas | 3 | 1 | 59 s | ✅ |
| laikmatis | 1 | 2 | 44 s | ✅ |
| lenteliu-kurimo-principai-platforma | 5 | 0 | 69 s | ✅ |
| lenteliu-redagavimas-wysiwyg-redaktoriuje-platforma | 2 | 6 | 106 s | ✅ |
| metrastis | 0 | 1 | 18 s | ✅ |
| modulio-autoriai-valdymas | 1 | 3 | 60 s | ✅ |
| modulio-pamoku-laikas-valdymas | 1 | 4 | 70 s | ✅ |
| modulio-partneriai-ir-draugai-valdymas | 1 | 4 | 62 s | ✅ |
| naujienu-anatomija | 0 | 19 | 192 s | ✅ |
| naujienu-tipo-sintakses | 0 | 3 | 50 s | ✅ |
| navigaciju-tipo-sintakses | 0 | 4 | 69 s | ✅ |
| navigaciju-valdymas | 0 | 13 | 177 s | ✅ |
| nesimato-finansines-ataskaitos-dokumentas | 0 | 3 | 40 s | ✅ |
| nuorodu-tipo-sintakses | 0 | 3 | 46 s | ✅ |
| nuorodu-valdymas | 0 | 3 | 43 s | ⚠️ `ep_709_05_1` 22 s |
| nuotrauku-tipo-sintakses | 0 | 8 | 126 s | ✅ |
| pagrindines-dokumentu-banko-funkcijos | 2 | 5 | 96 s | ✅ |
| pasikartojancios-klaidos-straipsniuose | 8 | 2 | 123 s | ✅ |
| pasikartojancios-klaidos | 14 | 1 | 205 s | ✅ |
| personos | 6 | 0 | 84 s | ✅ |
| pranesimu-juosteles-valdymas | 1 | 2 | 42 s | ✅ |
| projektine-veikla | 2 | 0 | 28 s | ✅ |
| puslapio-formatavimas | 1 | 0 | 14 s | ✅ |
| puslapiu-anatomija | 4 | 8 | 157 s | ✅ |
| puslapiu-rinkinys-komunikacija | 12 | 2 | 183 s | ✅ |
| realios-situacijos-ir-ju-sprendimai | 0 | 2 | 29 s | ✅ |
| su-navigacijomis-susije-klausimai | 0 | 2 | 24 s | ✅ |
| suskleidimai | 0 | 3 | 47 s | ✅ |
| svetaines-pritaikymas-neregiams | 8 | 0 | 101 s | ✅ |
| svetaines-pritaikymas-silpnaregiams | 3 | 3 | 67 s | ✅ |
| teisingas-turinio-publikavimas-is-pdf-i-jpg-o-tada-i-straipsni | 0 | 4 | 51 s | ✅ |
| titulinio-papildiniai | 0 | 2 | 39 s | ⚠️ `ep_907_03_1` 22 s |
| turinio-audito-irankis | 10 | 1 | 140 s | ✅ |
| turinio-manipuliacija | 1 | 0 | 15 s | ✅ |
| turinio-zymejimas | 5 | 1 | 71 s | ✅ |
| video-tipo-sintakses | 0 | 3 | 49 s | ✅ |
| vidines-nuorodos-puslapyje | 0 | 2 | 34 s | ✅ |
| **Iš viso: 60 pamokų** | **199** | **177** | **84 min** | |

## Pamokos (techninės) — žr. EIMANTO_PASTABOS.md 2026-11-03
