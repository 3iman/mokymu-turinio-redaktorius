# AI video įrankių žinynas (video agentui)

Šaltiniai: LinkedIn infografikas „10 Best AI Agents for AI Filmmaking" (Shailesh Shakya, 2026-10) ir API/MCP patikra 2026-10-31. Kainos keičiasi, todėl prieš didesnę užduotį agentas jas pasitikrina iš naujo.

## Kaip agentas naudoja šį failą

1. Nustato užduoties tipą (lentelė „Užduotis → įrankis").
2. Pasiūlo Eimantui 1–2 įrankius su priežastimi, laukiamu rezultatu ir kainos įverčiu.
3. Įrankius su MCP ar API naudoja tiesiogiai, bet tik jei jie įrašyti „Įrankių aprėptyje". Jei neįrašyti, paprašo prieigos.
4. Įrankiams, kurie veikia tik per naršyklę, paruošia promptus ir kadrų sąrašą, o Eimantas juos įklijuoja pats.
5. Lietuvišką įgarsinimą visada daro per ElevenLabs ir savo rašymo skill'us, ne per video platformos balsus.
6. Montažą ir tekstinius elementus (explaineriuose) daro Remotion. AI generatoriai tiekia tik vaizdinę medžiagą.

## Prieigos būdai (patikrinta 2026-10-31)

| Įrankis | Kaip agentas gali pasiekti | Apmokėjimas | Pastabos |
|---|---|---|---|
| **Higgsfield** | Oficialus MCP: `https://mcp.higgsfield.ai/mcp` (OAuth, be API rakto). Atskirai: API per cloud.higgsfield.ai | MCP nuskaito tos pačios paskyros kreditus. API turi atskirą dolerių balansą | Per MCP kreditai nurašomi net su „unlimited" planu. Claude Code: `claude mcp add --transport http --scope user higgsfield https://mcp.higgsfield.ai/mcp` |
| **OpenArt** | Oficialus MCP: `https://mcp.openart.ai/mcp` (OAuth). Viešo REST API nėra | OpenArt kreditai | Vienintelis būdas automatizuoti OpenArt (įsk. Director). Galima naudoti ankstesnes generacijas kaip pradinį kadrą |
| **Krea** | REST API `https://api.krea.ai`, JS SDK `@krea-ai/sdk`, Krea MCP serveris | API balansas atskiras nuo app kreditų, kaina dolerių už generaciją, nepavykusios generacijos neapmokestinamos | Agregatorius: per vieną raktą Veo 3/3.1, Kling, Runway Gen-4.5, Seedance, Wan, Hailuo |
| **Magnific** (buvęs Freepik) | API `https://api.magnific.com/v1`, MCP | Tie patys Magnific prenumeratos kreditai | Senas `api.freepik.com` dar veikia. Plius stock biblioteka: vaizdai, video, muzika, garso efektai |
| **Google Veo** | Gemini API (paid tier) arba Vertex AI | Mokama už sekundę, nemokamo lygio nėra | Flow (UI) API neturi. 50 nemokamų kreditų per dieną galioja tik naudojant Flow rankiniu būdu |
| **Runway** | Developer API (dev.runwayml.com), self-serve | Kreditai po $0,01, atskiri nuo app prenumeratos | API kreditas pigesnis už prenumeratos kreditą. Per API pasiekiamas ir Veo 3.1 |
| **Luma** | Luma Agents API `https://agents.lumalabs.ai/v1`, SDK `luma-agents` (Python/JS/Go), CLI | Mokama už generaciją | Video modelis Ray 3.2, vaizdai uni-1. Sandbox aplinkos nėra |
| **Pollo** | API + dokumentacija (docs.pollo.ai) | Kreditai ~$0,06–0,08 | Agregatorius (Kling, Veo, Runway, Seedance ir kt.) |
| **invideo** | Oficialaus viešo API nerasta | Plus $20/mėn. | Tik per naršyklę. Infografiko autorius teigia, kad Agent Two geriausiai valdo scenų planą ir turi ilgą konteksto atmintį (jo nuomonė, nepatikrinta). Kandidatas rankiniam bandymui, jei reikės gatavo „scenarijus → filmas" įrankio |
| **Frameo** (Dashverse) | API nerasta | — | Tik per naršyklę |

## Kainos per API (už sekundę video)

| Modelis / kanalas | 720p | 1080p |
|---|---|---|
| Veo 3.1 Lite (Gemini API) | $0,05 | $0,08 |
| Veo 3.1 Fast (Gemini API) | $0,10 | $0,12 |
| Veo 3.1 Standard (Gemini API) | $0,40 | $0,40 |
| Veo 3.1 per Krea | $0,20 | — |
| Runway Gen-4 Turbo (Runway API) | $0,05 | — |
| Runway Gen-4.5 (Runway API) | $0,12 | — |
| Kling 2.6 per Krea | $0,07 | — |

Jei garso nereikia (explaineriai daromi be garso, garsas dedamas atskirai), Veo generavimas be audio pagal vieną šaltinį pigesnis apie 33 %. Prieš pasikliaunant reikia patikrinti.

**Pavyzdys — Citrinos apimtis (32 kadrai × 8 s = 256 s), be pergeneravimų:** Veo 3.1 Lite 720p ≈ $13; Fast 1080p ≈ $31; Standard ≈ $102. Su pergeneravimais realiai 2–3 kartus daugiau.

## Užduotis → įrankis

| Užduotis | Pirmas pasirinkimas | Alternatyva | Pastaba |
|---|---|---|---|
| B-roll, fonai, atmosferiniai kadrai explaineriams | Veo 3.1 Fast/Lite per Gemini API | Krea API (Veo, Kling) | Bandymams Lite, galutiniams kadrams Fast |
| Muzikinis klipas (kaip Citrina) | Veo 3.1 per Gemini API | Higgsfield MCP | Dainos struktūrą (BPM, dropai) naudoti kaip kadrų trukmės pagrindą |
| Pasikartojantis personažas (pvz. Cleverphant dramblys) | OpenArt MCP (Director) | Higgsfield MCP | Nuoseklumas negarantuotas — būtinas personažo pavyzdžių lapas |
| Trumpos reklamos, social (mokykloms, Wolet, Seglo) | Runway API | Higgsfield MCP | |
| Pakartojamas serijos gamybos procesas | Magnific (API + stock) | Krea API | Stock muzika ir SFX tame pačiame rakte |
| Vaizdų asset'ai (iliustracijos, personažų lapai, lokacijos) | Krea API | Magnific API | |

## Rekomenduojamas minimalus rinkinys agentui

1. **Gemini API raktas** — Veo tiesiogiai, pigiausia, nebereikia tarpininko.
2. **Higgsfield MCP** — be rakto, OAuth, daug modelių ir kameros valdymas. Apmokama iš esamų kreditų.
3. **Krea API** — kai reikia kito modelio (Kling, Runway, Seedance) be atskirų paskyrų.
4. Pasirinktinai **OpenArt MCP** — tik jei bus daroma personažo serija.

Visa kita — tik per naršyklę ir rankiniu būdu.

## Nuoseklaus personažo gamybos procesas

Esmė: modeliai personažo neatsimena. Nuoseklumą užtikrina vienas patvirtintas pavyzdžių lapas, kuris pridedamas prie kiekvienos generacijos. Seka: eskizas → vaizdas → video, niekada ne eskizas → video tiesiai.

1. **Scenarijus ir kadrų sąrašas.** Agentas pirma gauna visą scenarijų (personažai, jų pokyčiai, rekvizitas), tik tada kuria vaizdus.
2. **Eskizai (kompozicija).** Ranka pieštas arba pilkas storyboard eskizas kiekvienam kadrui. Eskizas valdo struktūrą: kas kur stovi, kameros kampas. Sudėtingoms pozoms (du personažai liečiasi, POV) — būtinai eskizas ar telefono nuotrauka, tekstu modelis jų nesugeneruoja.
3. **Personažo lapas (tapatybė).**
   - Pirma veido portretas, tada iš jo apsisukimo lapas: priekis, 3/4, profilis, nugara, veido stambus planas, vidutinis planas. Aukšta raiška.
   - Sugeneruoti 4 variantus ir išrinkti vieną. Jis tampa vieninteliu tiesos šaltiniu.
   - Lape personažas be daiktų rankose — rekvizitas tarp kampų „plaukia".
   - Jei personažas keičiasi (kostiumas, naujas daiktas), kiekvienam pokyčiui atskiras lapas.
   - Įrankis: Nano Banana (Gemini API) arba GPT Image.
4. **Lokacijos ir stilius.** Atskiri lokacijų vaizdai ir vienas stiliaus blokas (tas pats tekstas kiekviename prompte). Plius neigiama eilutė: jokių kostiumo pokyčių, jokių daiktų, kurių nėra lape.
5. **Raktiniai kadrai (vienodinimas).** Kiekvienam kadrui į vaizdo redagavimo modelį paduodama: eskizas (struktūra) + personažo lapas (tapatybė) + lokacija + stiliaus blokas. Įrankis: Nano Banana edit arba Flux Kontext. Jei personažas „nuplaukė" — taisyti lapą, ne kadrą, ir pergeneruoti tik paveiktus kadrus.
6. **Vaizdas → video.** Du būdai:
   - *Pirmas (+ paskutinis) kadras* — Veo 3.1 frames-to-video. Tiksliausia kontrolė, kur kadras prasideda ir baigiasi.
   - *Reference-to-video* — modelis gauna lapą ir lokaciją kaip nuorodas: Veo 3.1 „ingredients", Seedance 2.0 reference-to-video (per Krea API), Kling (iki 4 elementų vienoje scenoje).
   - Skaičiuoti ~3 generacijas vienam tinkamam kadrui.
7. **Tęstinumas tarp klipų.** Ankstesnio klipo paskutinis kadras (ar paskutinė sekundė) tampa kito klipo pradžia, kartu su tuo pačiu lapu.
8. **Sujungimas.** Montažas Remotion, garsas atskirai (ElevenLabs/muzika), raiškos didinimas pačioje pabaigoje.

Alternatyva lapui — apmokytas personažas (Higgsfield Soul ID): reikia 20+ kokybiškų nuotraukų iš įvairių kampų. Prasminga tik ilgai serijai su tuo pačiu personažu.

Šaltinių pastaba: didžioji dalis detalių (4 variantai, lapas kiekvienam pokyčiui, ~3 generacijos kadrui) — iš invideo kūrybinės komandos aprašų. Jie parduoda savo agentą, bet patys žingsniai nepriklauso nuo įrankio.

## Trys taisyklės prieš generuojant (privalomos)

1. **Scenų planas pirma.** Prieš leidžiant kreditus Eimantas patvirtina kadrų sąrašą: kadras, trukmė, vaizdas, tekstas ekrane, kameros judesys.
2. **Pavyzdžiai pirma.** Personažams ir lokacijoms pirmiausia sukurti pavyzdžių lapus ir tik tada video. Tai vienintelis būdas gauti nuoseklų vaizdą tarp kadrų.
3. **Pataisų kaina.** Prieš didelę užduotį sugeneruoti 1–2 bandomuosius kadrus ir suskaičiuoti, kiek kainuoja vienas tinkamas kadras su pergeneravimais. Tik tada vertinti bendrą biudžetą.

## Šaltiniai

- Gemini API kainos: https://ai.google.dev/gemini-api/docs/pricing
- Runway API kainos: https://docs.dev.runwayml.com/guides/pricing
- Krea API: https://docs.krea.ai/developers/introduction
- Higgsfield MCP: https://higgsfield.ai/creator-hub/help-center/mcp-cli/what-is-higgsfield-mcp
- OpenArt MCP: https://openart.ai/mcp/
- Magnific API: https://www.magnific.com/de/ai/docs/magnific-api
- Luma Agents API: https://docs.agents.lumalabs.ai/guides/faq
- Pollo API: https://pollo.ai/api-platform
