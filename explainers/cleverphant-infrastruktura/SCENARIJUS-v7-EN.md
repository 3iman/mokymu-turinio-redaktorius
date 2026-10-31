# Cleverphant explainer — script v7 (EN)

> **Status:** built 2026-10-12 — `renders/cleverphant-infrastructure-v7-en.mp4` (3:23.5), subtitles `…-v7-en.srt`.
> **Build:** `python3 v7/voice.py && python3 v7/build.py` → `index.html` + `v7/balsas/mix.wav` + `v7.srt`. Texts live in `v7/scenes.json`.
> **Voice:** ElevenLabs George (`JBFqnCBsd6RMkjVDRZzb`), `eleven_multilingual_v2`, seed 4242. A/B with Darius: `renders/balsas-george.mp3` / `balsas-darius.mp3`.
> **Sound:** Cleverphant bed (`jiglr-malibu`, volume 0.4, sidechain under the voice) + 26 house SFX tied to the same words as the animation.

**Core (Eimantas):** show how easily everything scales — the wave from one to all repeats through the film.
**v7 adds:** one design system in the shared foundation · 37 live modules flowing under every school · a 7-step ladder of live apps · „What if…“ from the clev3r.app concepts (marked *in development*) · „And AI? Not another chatbot. AI loves order.“

| # | Scene | Time | Length | On screen | Voice |
|---|---|---|---|---|---|
| 1 | Just a detail | 0:00.0–0:09.0 | 9 s | Just a detail. → Now multiply it by a thousand. | All caps on a school website. Looks like a detail. Now multiply it by a thousand schools. |
| 2 | Each school alone | 0:09.0–0:25.0 | 16 s | Same duties. Each school alone. → Quality becomes a matter of chance. | Every school has the same duties: accessibility, data protection, security, and rules that keep changing. Most face them alone, with their own budget and their own contractor. So quality comes down to chance. |
| 3 | Only the surface | 0:25.0–0:42.5 | 17.5 s | Shared digital infrastructure for schools. → The website is only the surface. | Cleverphant is shared digital infrastructure for schools. What people see is the website. Underneath is everything that keeps it right, from one design system to compliance and support, shared by every school. A new school simply plugs in. |
| 4 | One notices | 0:42.5–0:55.0 | 12.5 s | Same benefit. Same bug. → One school notices. Every school is fixed. | Because every school runs on the same system, they all get the same benefits, and the same bugs. But it takes just one school to notice. Fixed once, fixed for all. |
| 5 | Pilot → standard | 0:55.0–1:09.0 | 14 s | Ideas travel the same way. → Pilot. Data. Standard. | Ideas travel the same way. A curious school leader brings a need. Their school becomes the pilot. When the data shows it works, it becomes the standard for every school. |
| 6 | Publish once | 1:09.0–1:22.0 | 13 s | Publish once. → Reach every school. | And it works from the top, too. A municipality or a ministry publishes a new rule or a campaign once, and it appears on every school website at the same time. |
| 7 | Equally good | 1:22.0–1:38.5 | 16.5 s | Quality shouldn't depend on size. → Not identical. Equally good. | A small village school gets what a large city school gets. A family changing schools finds a familiar place. One design system underneath; the face stays the school's own. Not identical. Equally good. |
| 8 | Trojan elephant | 1:38.5–2:07.0 | 28.5 s | Change starts with details. → Every step opens the next. | Change starts with details. Being small is no excuse to look away. Stop writing in capitals, stop stretching text, stop hiding information in images, get cookie consent right. That's our Trojan elephant, in the good sense. Once it works everywhere, every next step lands on every school: live tables, whistleblower channels, consultation booking, surveys, event calendars, update subscriptions. |
| 9 | What if… | 2:07.0–2:36.5 | 29.5 s | What if…? → One school pilots it. Every school gets it. | And we keep asking: what if? What if a teacher's Word file became a finished article, and she just clicked approve? What if documents named, dated and filed themselves? What if the website noticed what's outdated, and asked you once a month? What if a fix was ready before you saw the problem? None of this needs a new website. Each idea is an app on the same foundation. One school pilots it, every school gets it. |
| 10 | And AI? | 2:36.5–2:46.0 | 9.5 s | And AI? → AI loves order. | And AI? Not another chatbot. AI that quietly keeps things in order. Because AI loves order. |
| 11 | The logic of scale | 2:46.0–3:01.5 | 15.5 s | What works in one school works everywhere. → Not a promise of cheap. The logic of scale. | What works in one school works in a municipality, a region, a whole country. Schools can be added quickly, while costs grow far more slowly. Not a promise of cheap. The logic of scale. |
| 12 | Walked this road | 3:01.5–3:23.5 | 22 s | 15 years. Hundreds of institutions. → Built in a small country. Ready for yours. | We have walked this road for fifteen years. Hundreds of institutions, whole municipalities on one standard, with content audits, proven onboarding and a training platform. Built in a small country. Ready for yours. Let's talk about your region. |

## Sources for what is named
- live modules: Sales API `/v1/schools/{sku}/modules` (39 per site) + mokymai.cleverphant.lt (61 lessons, 11 courses)
- ladder (live): Google Sheets live tables (all clients, Eimantas 2026-10-12), whistleblower channel, consultation booking, surveys, event calendar, update subscription — `Marketplace/clev3r-app-programeles.json` stage *veikia*
- „What if…“: Naujienų publikavimas, Dokumentų bankas, Aktualus turinys, Turinio priežiūra — stage *vystoma*
- AI: chatbot built but not deployed; better AI uses = background work in the apps above (Eimantas 2026-10-12)

## Open
- length 3:23 — cut candidates: scene 6 family sentence, scene 8 „stop…“ list, scene 9 one „what if“
- native-speaker check: „Trojan elephant, in the good sense“, „Equally good“, „AI loves order“
- catalog JSON still marks Google Sheets as *idėja* — fix in Marketplace repo
