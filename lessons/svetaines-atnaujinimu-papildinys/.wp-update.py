#!/usr/bin/env python3
"""Upload illustrations and push le_list structure to WordPress post 1712."""
import json
import os
import urllib.request
import urllib.error
import base64
import sys

BASE = os.path.dirname(__file__)
ENV_PATH = os.path.join(BASE, '../../.env')
OUTPUT_DIR = os.path.join(BASE, 'output/lt')
POST_ID = 1712
SLUG = 'svetaines-atnaujinimu-papildinys'

env = {}
with open(ENV_PATH) as f:
    for line in f:
        if '=' in line:
            k, v = line.strip().split('=', 1)
            env[k] = v

auth = base64.b64encode(f"{env['WP_USER']}:{env['WP_APP_PASSWORD']}".encode()).decode()
HEADERS_JSON = {"Content-Type": "application/json", "Authorization": f"Basic {auth}"}


def upload_png(filename):
    """Upload a PNG to /wp/v2/media. Return its media ID."""
    path = os.path.join(OUTPUT_DIR, filename)
    with open(path, 'rb') as f:
        data = f.read()
    req = urllib.request.Request(
        f"{env['WP_URL']}/wp-json/wp/v2/media",
        method='POST',
        data=data,
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "Content-Type": "image/png",
            "Authorization": f"Basic {auth}",
        }
    )
    resp = urllib.request.urlopen(req)
    body = json.loads(resp.read().decode())
    return body['id']


# 1. Upload all 9 PNGs
files = [
    '01-prievole-sekti-naujienas.png',
    '02-keturi-zingsniai.png',
    '03-trys-vietos-svetaineje.png',
    '04-bendruomenes-nariai.png',
    '05-du-pakeitimai-automatiskai.png',
    '06-atsakomybiu-dalijimas.png',
    '07-keturi-saugikliai.png',
    '08-admino-dashboard.png',
    '09-duk-trys-klausimai.png',
]

print("Uploading PNGs...")
ids = []
for fn in files:
    try:
        mid = upload_png(fn)
        ids.append(str(mid))
        print(f"  {fn} → media id {mid}")
    except urllib.error.HTTPError as e:
        print(f"  {fn} FAILED: HTTP {e.code} {e.read().decode()[:200]}")
        sys.exit(1)

# Save media map for reference
with open(os.path.join(BASE, 'wp-media-map-lt.csv'), 'w') as f:
    f.write("filename,media_id\n")
    for fn, mid in zip(files, ids):
        f.write(f"{fn},{mid}\n")

# 2. Build corrected le_list
le_list = [
    {
        "title": "Jūsų svetainė privalo leisti sekti naujienas",
        "content_selector": ["Text", "Image"],
        "text": "Nuo 2026 m. kovo 1 d. galioja atnaujintas Vyriausybės nutarimas Nr. 480, kuris nustato, kaip turi atrodyti ir veikti mokyklų interneto svetainės.\r\n\r\nVienas iš reikalavimų: jei svetainėje skelbiamos naujienos, lankytojas turi turėti galimybę jas užsisakyti el. paštu — kad galėtų sekti pasikeitimus neapsilankęs svetainėje.\r\n\r\nTai ne rekomendacija — tai privalomas reikalavimas, kurį tikrina VSSA savo kasmetiniuose vertinimuose.",
        "image": ids[0],
    },
    {
        "title": "Kaip tai veikia",
        "content_selector": ["Text", "Image"],
        "text": "Prenumeratos langelis svetainėje. Matomas įvairiose svetainės vietose. Aiškiai komunikuoja lankytojui, kas tai yra, kaip veikia prenumerata ir kaip jos atsisakyti.\r\n\r\nPrenumeratorių valdymas. Sistema, kuri automatiškai priima naujus prenumeratorius, siunčia patvirtinimo laiškus, valdo atsisakymus. Prenumeruoti paprasta, atsisakyti — vienu paspaudimu.\r\n\r\nTurinio atnaujinimų sekimas. Sprendimas, kuris automatiškai stebi, kas svetainėje pasikeitė per savaitę — nauji puslapiai, atnaujinti dokumentai, įkeltos naujienos — ir kasdien ruošia duomenis savaitiniam išsiuntimui.\r\n\r\nLaiškų sudarymas ir išsiuntimas. Pagal šabloną suformuojama savaitinė santrauka ir išsiunčiama visiems svetainės prenumeratoriams.\r\n\r\nVisas procesas vyksta automatiškai — jums nereikia nieko rašyti, siųsti ar konfigūruoti.",
        "image": ids[1],
    },
    {
        "title": "Kur matomas papildinys ir kodėl",
        "content_selector": ["Text", "Image"],
        "text": "Įgyvendinti prievolę sudaryti sąlygas sekti naujienas reiškia ne paslėpti nuorodą kažkur svetainės kampe, o realiai parodyti tą galimybę ten, kur ji aktualiausia. Todėl papildinys rodomas keliose vietose:\r\n\r\nAtskiras puslapis. Svetainėje sukurtas naujas polapis, skirtas prenumeratai. Lankytojai jį pasiekia per juodąją navigaciją.\r\n\r\nPo kiekviena naujiena. Perskaičius naujieną, lankytojas iškart mato galimybę užsisakyti atnaujinimus — toje vietoje, kur tai natūraliai aktualu.\r\n\r\nDokumentų banko apačioje. Lankytojas, kuris atėjo pasitikrinti dokumentų, mato galimybę gauti pranešimą, kai dokumentai atsinaujins.\r\n\r\nTaip užtikrinama, kad sąlygos sekti naujienas yra realios, o ne formalios.",
        "image": ids[2],
    },
    {
        "title": "Kam tai skirta",
        "content_selector": ["Text", "Image"],
        "text": "Šis sprendimas visų pirma skirtas jūsų bendruomenės nariams — tėvams, mokyklos personalui, vietos bendruomenei.\r\n\r\nNet mokykloje dirbantis mokytojas neturi ištreniruoto įgūdžio kasdien ar kas savaitę užeiti į svetainę ir pasižiūrėti, kas joje naujo. O svetainė yra pirminis mokyklos informacinis šaltinis. Prenumeratos papildinys išsprendžia šią spragą. Informacija pati ateis pas žmogų, užuot laukusi, kol jis ateis pas ją.",
        "image": ids[3],
    },
    {
        "title": "Kas pasikeitė jūsų svetainėje",
        "content_selector": ["Text", "Image"],
        "text": "Du dalykai, abu automatiniai:\r\n\r\nPirma — svetainėje atsirado prenumeratos langelis keliose vietose.\r\n\r\nAntra — Cleverphant privatumo politikoje atsirado pastraipa apie šią prenumeratos funkciją. Lankytojas iki prenumeravimo mato nuorodą į ją iš formos ir patvirtina sutikimą.\r\n\r\nJums nereikėjo nieko daryti ir nereikia nieko daryti.",
        "image": ids[4],
    },
    {
        "title": "Privatumas ir duomenų apsauga",
        "content_selector": ["Text", "Image"],
        "text": "Prenumeratorių el. pašto adresus valdo Cleverphant, ne jūsų mokykla. Jūs tų adresų nematote, netvarkote ir neturite jokių papildomų pareigų dėl jų.\r\n\r\nLankytojas prieš prenumeruodamas mato nuorodą į Cleverphant privatumo politiką, kurioje aprašyta: kokie duomenys renkami, kokiu tikslu, kiek laiko saugomi ir kaip atsisakyti.\r\n\r\nTrumpai — jūsų mokykla čia neturi jokių BDAR įsipareigojimų.",
        "image": ids[5],
    },
    {
        "title": "Ką mes jau apgalvojome",
        "content_selector": ["Text", "Image"],
        "text": "Apsauga nuo netikrų prenumeratų. Sistema naudoja dviejų žingsnių patvirtinimą — prenumeratorius turi atidaryti savo el. paštą ir paspausti patvirtinimo nuorodą. Nepatvirtinti adresai automatiškai pašalinami.\r\n\r\nAtsisakymas. Kiekviename laiške yra atsisakymo nuoroda. Vienas paspaudimas — ir prenumeratorius pašalinamas, laiškų nebegauna.\r\n\r\nPrivatumas. Prenumeratorių duomenis valdo Cleverphant. Lankytojas prieš prenumeruodamas mato nuorodą į Cleverphant privatumo politiką. Mokyklai jokių papildomų BDAR pareigų nekyla.\r\n\r\nLaiškų pristatymas. Laiškai siunčiami per profesionalią laiškų siuntimo platformą, kuri užtikrina, kad jie patektų į gavėjo pašto dėžutę, o ne į šiukšlių aplanką.",
        "image": ids[6],
    },
    {
        "title": "Ką jūs matote",
        "content_selector": ["Text", "Image"],
        "text": "Prenumeratorių skaičių\r\n\r\nAtšaukusių prenumeratą skaičių\r\n\r\nIšsiųstų santraukų kelių mėnesių archyvą",
        "image": ids[7],
    },
    {
        "title": "Klausimai, kurie gali kilti",
        "content_selector": ["Text", "Image"],
        "text": "<strong>Ar siunčiamos santraukos yra rinkodaros veiksmas, kuriam reikia gauti papildomą sutikimą?</strong>\r\n\r\nNe. Prenumeratorius pats aktyviai užsisakė gauti svetainės atnaujinimų santrauką, įvedė el. paštą ir patvirtino prenumeratą. Tai yra informacinė paslauga pagal asmens prašymą, ne rinkodaros veiksmas. Papildomo sutikimo nereikia.\r\n\r\nTačiau reikia turėti omenyje, kad kas bus svetainėje, tas bus ir kas savaitę siunčiamame laiške. Jei svetainėje retkarčiais atsiranda kvietimas paremti ar kitas skatinimo pobūdžio turinys tarp kitų naujienų, galime tai laikyti natūralia svetainės veiklos dalimi. Jei sistemiškai, kiekvieną savaitę skatinsite paramos rinkimą, santraukos pobūdis keičiasi iš informacinio į rinkodarinį. Tokiu atveju gali kilti papildomų teisinių reikalavimų dėl sutikimo.\r\n\r\n<strong>Kas nutinka su prenumeratorių duomenimis įstaigai nutraukus aptarnavimo sutartį?</strong>\r\n\r\nPapildinys nustoja veikti, laiškų siuntimas sustabdomas. Prenumeratorių duomenų automatiškai perduoti mokyklai negalime — duomenų valdytojas yra Cleverphant ir prenumeratoriai sutikimą davė Cleverphant, ne mokyklai.\r\n\r\nTačiau jei mokykla nori perimti prenumeratorių bazę ir tęsti paslaugą savarankiškai, tai įmanoma su atskiru prenumeratorių sutikimu. Prieš sutarties pabaigą prenumeratoriams išsiunčiamas pranešimas su klausimu, ar jie sutinka, kad jų el. pašto adresas būtų perduotas mokyklai. Sutikusių prenumeratorių duomenys perduodami, likusių — ištrinami per 30 dienų po sutarties pabaigos.\r\n\r\n<strong>Ar galime naudoti savo sprendimą?</strong>\r\n\r\nTeoriškai — taip, prievolę galite įgyvendinti ir savarankiškai. Praktiškai tai reiškia, kad patiems reikės sukonstruoti prenumeratorių registracijos mechanizmą, turinio atnaujinimų sekimą, laiškų sudarymo šabloną, siuntimo infrastruktūrą, atsisakymo valdymą ir užtikrinti atitiktį BDAR reikalavimams. Cleverphant papildinys visa tai jau daro automatiškai.",
        "image": ids[8],
    },
]

# 3. POST update — slug + le_list together
print("\nPushing le_list + slug to post...")
payload = json.dumps({"slug": SLUG, "meta_box": {"le_list": le_list}}).encode()
req = urllib.request.Request(
    f"{env['WP_URL']}/wp-json/wp/v2/kursai/{POST_ID}",
    method="POST",
    data=payload,
    headers=HEADERS_JSON,
)
try:
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read().decode())
    updated = data.get("meta_box", {}).get("le_list", [])
    print(f"\nDone. Slug: {data.get('slug','')}")
    print(f"Sections received: {len(updated)}")
    for i, it in enumerate(updated):
        title = it.get('title', '')
        img = it.get('image', '')
        sel = it.get('content_selector', [])
        print(f"  {i+1}. {title[:50]:<50} | image={img} | sel={sel}")
except urllib.error.HTTPError as e:
    print(f"\nHTTP {e.code}: {e.read().decode()[:600]}")
    sys.exit(1)
