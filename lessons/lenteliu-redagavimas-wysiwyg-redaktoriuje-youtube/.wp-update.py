#!/usr/bin/env python3
"""Push le_list structure to WordPress post 1585 via REST API."""
import json
import os
import urllib.request
import base64

# Load .env
env = {}
with open(os.path.join(os.path.dirname(__file__), '../../.env')) as f:
    for line in f:
        if '=' in line:
            k, v = line.strip().split('=', 1)
            env[k] = v

auth = base64.b64encode(f"{env['WP_USER']}:{env['WP_APP_PASSWORD']}".encode()).decode()

le_list = [
    {
        "title": "Kada WYSIWYG redaktorius yra tinkamas įrankis",
        "content_selector": ["Text", "Image"],
        "text": "<p>WYSIWYG redaktorius yra tinkamas įrankis <strong>paprastoms, vienkartinėms arba retai keičiamoms lentelėms</strong> – pamokų laikui, trumpai kainodarai, pamokų tvarkaraščio fragmentui.</p>\n<p><strong>Kada WYSIWYG nebepakankamas?</strong></p>\n<ul>\n<li>Ta pati lentelė atsikartoja keliuose puslapiuose</li>\n<li>Lentelę pildo keli žmonės</li>\n<li>Duomenys keičiasi dažnai</li>\n<li>Struktūra sudėtinga ir netelpa į svetainės plotį net po supaprastinimo</li>\n</ul>\n<p>Pirmais trimis atvejais tikrai labiau tiks <strong>„Google Sheets\" integracija</strong> (žr. atskirą pamoką). Paskutiniu – priimtinas sprendimas yra <strong>PDF per dokumentų banką</strong> arba <strong>paveikslėlis su aprašymu</strong>.</p>",
        "image": "1701"
    },
    {
        "title": "Panašumas su Word teksto redaktoriumi",
        "content_selector": ["Text", "Image"],
        "text": "<p>Lentelės redagavimas labai panašus į <strong>Word</strong> programą, tačiau reikia suprasti, kad tai nėra ta pati programa ir ji turi savo niuansų.</p>\n<p>Vis tik pagrindinės funkcijos kaip sukurti ar ištrinti lentelę, pridėti ar ištrinti stulpelį, pridėti ar ištrinti eilutę veikia identiškai – <strong>paspaudus ant atitinkamos celės dešinį pelės klavišą</strong>.</p>",
        "image": "1708"
    },
    {
        "title": "Antraštinė eilutė: du keliai",
        "content_selector": ["Text", "Image"],
        "text": "<p>Antraštinė eilutė yra <strong>pirmoji prieinamumo taisyklė</strong>. Ji leidžia ekrano skaitytuvams suprasti lentelės struktūrą, padeda paieškos sistemoms, o mobiliame režime leidžia lentelei išlaikyti prasmę net kai ji suspaudžiama.</p>\n<p><strong>Kai visa pirma eilutė yra <em>kepurė</em>:</strong></p>\n<p>Eikite į <strong>Table properties → Headers: First row</strong>.</p>\n<p><strong>Kai antraštė ne pirmoje eilutėje arba jų yra kelios:</strong></p>\n<p>Pelės dešinys ant celės → <strong>Cell properties → Cell type: Header</strong>. Tokiu būdu galite padaryti antraštinį ir kairės pusės stulpelį, ir kelias antraštes sugrupuotoms lentelėms.</p>\n<p><strong>Svarbu:</strong> bold šriftas vietoj antraštinės eilutės <strong>nepadaro</strong> eilutės antraštine. Vizualiai panašu, bet sistemai tai nėra antraštė.</p>",
        "image": "1702"
    },
    {
        "title": "Lentelių stiliaus išvalymas",
        "content_selector": ["Text", "Image"],
        "text": "<p>Taip pat kaip ir kitur, rekomenduojame išvalyti <strong>HTML šiukšles</strong> – pažymėkite visą lentelę su <strong>CTRL+A</strong> ir paspauskite <strong>„Tx\"</strong> mygtuką.</p>\n<p>Lentelėms tai svarbu dvigubai. <strong>Turinio redaktorius sunkiai apdoroja didesnį eilučių skaičių</strong>, kai celių viduje yra gausybė paslėpto formatavimo. Lentelė išsisaugo ir svetainėje rodoma pilnai, tačiau grįžę į redagavimo langą vėliau pamatysite tik dalį eilučių – likusių redaktorius <em>nebesuvirškina</em>.</p>",
        "image": "1703"
    },
    {
        "title": "Lentelės plotis 100% ir ką daryti, kai netelpa",
        "content_selector": ["Text", "Image"],
        "text": "<p>Lentelės pločio nustatymuose <strong>venkite fiksuoto dydžio pikseliais</strong> – tuomet lentelė praranda dinamiškumą prisitaikyti prie įvairių ekranų. Ypatingai tas pasijaučia mobiliuosiuose įrenginiuose.</p>\n<p><strong>Kai lentelė netelpa į svetainės plotį, eikite šiais žingsniais:</strong></p>\n<ol>\n<li><strong>Table properties</strong> → nustatykite plotį <strong>100%</strong></li>\n<li>Pažymėkite lentelę ir paspauskite <strong>„Tx\"</strong> formatavimo valymo mygtuką</li>\n<li>Patikrinkite, ar celių viduje nėra <strong>nereikalingų tarpų</strong> – jie gali ištempti lentelę</li>\n<li>Apsvarstykite, ar <strong>visi stulpeliai tikrai reikalingi</strong> – dažnai lentelę galima sutalpinti panaikinus perteklinį</li>\n</ol>\n<p>Jei po šių žingsnių lentelė vis tiek netelpa, pločio yra tiek kiek yra. Prieš lentelę įdėkite paruoštą perspėjimo sintaksę:</p>\n<p><code>{{t('table_ux_accessibility')}}</code></p>\n<p>Ji parodo svetainės lankytojui standartinį pranešimą, kad lentelę galima peržiūrėti slenkant į šoną.</p>",
        "image": "1704"
    },
    {
        "title": "Semantikos klaidos",
        "content_selector": ["Text", "Image"],
        "text": "<p>Šios klaidos kenkia tam, ką sistema ir ekrano skaitytuvai suvokia – net jei akimi lentelė atrodo tvarkinga.</p>\n<p><strong>Lentelė lentelėje.</strong> Dažniausiai taip gimsta bandant sudėlioti netipinę struktūrą. Ekrano skaitytuvai tokios konstrukcijos nebesupranta, mobiliame ekrane ji subyra, o <strong>HTML šiukšlių</strong> kiekis dvigubėja ir lentelė sunkiai išsisaugo.</p>\n<p><strong>Bold vietoj antraštinės eilutės.</strong> Pirma eilutė atrodo paryškinta, bet sistemai tai nėra antraštė. Naudokite <strong>„Cell type: Header\"</strong> (žr. 3 skyrių).</p>\n<p><strong>Tuščios eilutės atskyrimui.</strong> Vizualinis tarpas tarp dalių daromas <strong>ne tuščia eilute lentelėje</strong>, o tarp skirtingų lentelių. Tuščia eilutė viduje sugadina lentelės semantiką ir ekrano skaitytuvams pasakoja apie eilutę, kurios iš tikrųjų nėra.</p>",
        "image": "1705"
    },
    {
        "title": "Vizualinio pertekliaus klaidos",
        "content_selector": ["Text", "Image"],
        "text": "<p>Šios klaidos atsiranda bandant rankiniu būdu stilizuoti lentelę – dizaino sistema stilių tvarko pati, <em>prigudrauti</em> papildomai nereikia.</p>\n<p><strong>Rankinis celių fono ir spalvų keitimas.</strong> Dizaino sistema pati pasirūpina antraštės spalva. Kai vartotojas spalvas parenka rankiniu būdu, jos kertasi su svetainės palete, negrąžiai atrodo <strong>tamsaus fono režime</strong> ir tampa nepasiekiamos silpnaregiams.</p>\n<p><strong>Numatytojo šrifto ar šrifto dydžio keitimas.</strong> Lentelės tekstas turi išlaikyti tą patį skaitomumą kaip ir likęs svetainės turinys. Rankinis keitimas sukuria <strong>vizualų nenuoseklumą</strong> ir dažniausiai priveda prie problemų mobiliame ekrane.</p>\n<p><strong>Bold per visą lentelę.</strong> Kai paryškinta viskas, akcento nebelieka – skaitytojui sunkiau orientuotis, kurie duomenys svarbūs. Bold turi būti <strong>išimtis, ne taisyklė</strong>.</p>\n<p><strong>Bandymai <em>išlaužti</em> įmantresnį dizainą.</strong> Susijungusios celės, spalvotos juostos, dekoracijos – viskas, kas peržengia paprastos lentelės ribas, yra ženklas, kad pasirinktas <strong>ne tas įrankis</strong>. Tokią lentelę reikia <strong>iš esmės supaprastinti</strong> arba, jei struktūros pakeisti neįmanoma, patalpinti <strong>PDF formatu</strong> su aprašymu.</p>",
        "image": "1706"
    }
]

payload = json.dumps({"meta_box": {"le_list": le_list}}).encode()
req = urllib.request.Request(
    f"{env['WP_URL']}/wp-json/wp/v2/kursai/1585",
    method="POST",
    data=payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Basic {auth}"
    }
)
try:
    resp = urllib.request.urlopen(req)
    body = resp.read().decode()
    data = json.loads(body)
    updated = data.get("meta_box", {}).get("le_list", [])
    print(f"Updated. Received {len(updated)} sections:")
    for i, it in enumerate(updated):
        print(f"  {i+1}. {it.get('title','')[:45]} | image={it.get('image','')}")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode()[:500]}")
