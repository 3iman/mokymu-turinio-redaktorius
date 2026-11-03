# Platformos filmų gamyba — eiga (autonominis režimas nuo 2026-11-03)

> Eimantas 2026-11-03: „Imk visas pamokas iš eilės be mano patvirtinimo. Turi autonomiją. Aš peržiūrėsiu ką padarei ryte.“
> Galioja: piešimas, įgarsinimas (ElevenLabs), montažas. NEgalioja: WP / YouTube publikavimas, tekstų ir kirčių keitimas.
> Šaka abiejuose repo: `claude/friendly-allen-dh1gk0`. Po kiekvienos pamokos — commit + push.

## Eiga

1. Koncepcijos filmai (199) — `koncepcijos.js` generuoja šabloną + turinį + animaciją iš kortelės laukų.
2. TVS epizodai (164, be navigaciju-valdymas) — rankomis iš `tvs-ui-rinkinys` komponentų, kaip navigaciju-valdymas.

## Pamokos

| Pamoka | Koncepcijos | Epizodai | Būsena | Pastabos ryto peržiūrai |
|---|---|---|---|---|
| navigaciju-valdymas | 0 | 13 | ✅ 2026-11-03 | — |
| asmens-duomenu-apsauga | 8 | 0 | ✅ | — |
| administracijai | 16 | 0 | ⏳ perleidžiama | grandinė nutrūko (skriptas redaguotas jam veikiant) |
| dinaminis-turinys | 1 | 0 | ✅ | `step3_desc` kortelėje — vietos rezervas „[pavyzdžiai…]“, nerodomas |
| greitosios-nuorodos | 1 | 0 | ✅ | — |
| informacinis-srautas | 1 | 0 | ✅ | — |
| irasu-kategorizavimas | 10 | 0 | ✅ | kategorijos — naujienos kortelė sraute |
| ka-reikia-zinoti-apie-paveikslelius | 8 | 0 | ✅ | — |
| kaip-kartu-dirbsime | 10 | 0 | ✅ | — |
| kas-yra-dokumentu-bankas | 2 | 0 | ✅ | — |
| personos | 6 | 0 | ✅ | siluetas be veido |
| projektine-veikla | 2 | 0 | ✅ | — |
| puslapio-formatavimas | 1 | 0 | ✅ | — |
| svetaines-pritaikymas-neregiams | 8 | 0 | ✅ | — |
| turinio-manipuliacija | 1 | 0 | ✅ | — |
| metrastis | 0 | 1 | ✅ | — |
| kaip-prisijungti-ir-kas-ka-gali | 0 | 2 | ✅ | prisijungimo langas pieštas pagal skeleton faktus (kadro nėra) |
| realios-situacijos-ir-ju-sprendimai | 0 | 2 | ✅ | — |
| su-navigacijomis-susije-klausimai | 0 | 2 | ✅ | — |
| vidines-nuorodos-puslapyje | 0 | 2 | ✅ | CKEditor dialogai — moono-lisa stilius (kadro nėra) |
| titulinio-papildiniai | 0 | 2 | ⚠️ | **K1 `ep_907_03_1` 22 s > 20 s** — balsas netelpa į 20; skaidyti ar trumpinti — tavo sprendimas |

## Atidėta (reikia tavo sprendimo)

- **Keturios pamokos sutampa su esamomis YouTube pamokomis** (`ka-atsakyti-kai-paklausia-apie-slapukus`, `es-projektu-viesinimas`, `lenteliu-kurimo-principai`, `lenteliu-redagavimas-wysiwyg-redaktoriuje`): platformos scenarijus perrašytų YouTube scenarijų. Kol nepasakysi, kur dėti (pvz. `lessons/{slug}-platforma/`), neliečiu.
- **Google Sheets** pamokos — pagal promptą nepiešiamos (klipai iš esamų scenų).

## Pamokos (techninės) — žr. EIMANTO_PASTABOS.md 2026-11-03
