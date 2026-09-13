# Prenumeratos pamoka — du šūviai

**Sprendimas 2026-09-12 (Eimantas):** neatidėti pamokos, o išimti dar neįgyvendintas
dalis, išleisti dabar ir grįžti su atnaujinimu.

## Pirmas šūvis — ką pamoka sako dabar

Išimta **`08_admino_dashboard`**. Mokykla dar neturi administratoriaus skydelio;
clev3r.app aplinka kuriama. Pjūvis švarus: skydelis buvo minimas tik ten, o šeštoji
sekcija ir taip sako, kad mokykla el. pašto adresų nemato. Be aštuntos pamoka tampa
nuoseklesnė, ne skylėta.

⛔ **Tikslinimas:** mokykla adresų nemato ir nematys — ji matys jų **skaičių**. Todėl
grįžus su skydeliu šeštosios sekcijos taisyti nereikės.

Patikslintos **`03`** ir **`05`**: prenumeratos langelis šiandien pasiekiamas tik per
juodosios navigacijos nuorodą. Kitos dvi vietos — po naujienomis ir dokumentų banke —
pažymėtos kaip **planuojamos nuo 2027 m. I ketvirčio**. Taip pasakyta sąmoningai: kol
nėra nustatymų, kur widgetą rodyti, o kur ne, žadėti tris vietas būtų per anksti.

## ⛔ Prieš publikuojant

`03` ir `05` PNG **perpiešti** — jų media WordPress'e pasenę. Publikuojant juos reikia
**įkelti iš naujo**, ne panaudoti senus `media_id` (1715 ir 1717). `08` eilutė iš
`wp-media-map-lt.csv` išimta; paveikslėlis 1720 lieka WP bibliotekoje nepanaudotas.

## Antras šūvis — trigeris, ne viltis

Kai **clev3r.app skydelis** gyvas ir **widgeto rodymo nustatymai** įgyvendinti:

1. grąžinti `08_admino_dashboard` (šablonas ir tekstas išlikę git istorijoje)
2. `03` ir `05` — „planuojama" pakeisti į „veikia"
3. laiškas mokykloms: dabar matote patys

Antras šūvis yra kitos rūšies nei pirmas. Pirmas pasakoja, kaip veikia; antras —
ką jie dabar gali patys. Būtent to reikia kadencijai.

YouTrack: **ATN-3**.
