# -*- coding: utf-8 -*-
"""2026-10-13: „Tiek“ dalių gale, „Po kąsnelį“ išplėtojimas, LT pabaiga, „žmogaus prisilietimu“. Vienkartinis."""
import json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# 1) voice.py: dalies gale kirpti iki atmetamo sakinio pradžios
p = 'voice.py'; s = open(p, encoding='utf-8').read()
a = ("        nxt = out[k + 1]['v0'] if k + 1 < len(out) else o['v1'] + 0.6\n"
     "        a = max(0, o['v0'] - 0.05); b = min(o['v1'] + 0.30, (o['v1'] + nxt) / 2); dur = b - a")
assert a in s
s = s.replace(a, """        if k + 1 < len(out):
            nxt = out[k + 1]['v0']; b = min(o['v1'] + 0.30, (o['v1'] + nxt) / 2)
        else:  # LT: atmetamas sakinys prasideda vos po 0,05 s — kerpama prieš jį, kitaip girdisi „Tiek“
            q = o['j']
            while q < len(text) and text[q].isspace(): q += 1
            b = min(o['v1'] + 0.30, st[q] - 0.03) if q < len(text) else o['v1'] + 0.30
        a = max(0, o['v0'] - 0.05); dur = b - a""", 1)
open(p, 'w', encoding='utf-8').write(s)

# 2) scenos
sc = json.load(open('scenes.json')); T = {x['title']: x for x in sc}
def rv(t, a, b):
    assert a in T[t]['voice'], (t, a); T[t]['voice'] = T[t]['voice'].replace(a, b, 1)
rv('No blank page', 'Platforma, už kurios stovi žmonės.', 'Platforma su žmogaus prisilietimu.')
T['No blank page']['kw']['human touch'] = 'žmogaus prisilietimu'
rv('Trojan elephant', 'Kaip suvalgyti dramblį? Po kąsnelį. Ir kiekvienas',
   'Kaip suvalgyti dramblį? Po kąsnelį. Šiandien – antraštės. Rytoj – slapukų juosta. Poryt – dokumentų pavadinimai. '
   'Nė vienas kąsnelis neatrodo kaip reforma. O po metų mokykla jau kita. Ir kiekvienas')
T['Trojan elephant']['kw'].update({'bite1': 'Šiandien', 'bite2': 'Rytoj', 'bite3': 'Poryt', 'no reform': 'reforma', 'a year': 'po metų'})
rv('Walked this road', 'Sukurta Lietuvoje. Tinka ir kitoms šalims.', 'Sukurta Lietuvoje, kartu su jumis. Ir jau tinka kitoms šalims.')
T['Walked this road']['kw']['Ready'] = 'jau tinka'
rv('Walked this road', 'Pakalbėkime apie jūsų regioną.', 'Pakalbėkime, ką dar galime nuveikti kartu.')
for x in sc:
    for k, v in x['kw'].items(): assert v in x['voice'], (x['title'], k, v)
json.dump(sc, open('scenes.json', 'w'), ensure_ascii=False, indent=1)

# 3) vertimo skriptas
p = 'translate_lt.py'; s = open(p, encoding='utf-8').read()
def R(a, b):
    global s
    assert a in s, a[:70]; s = s.replace(a, b, 1)
R("<em>Platforma su žmonėmis.</em>", "<em>Platforma su žmogaus prisilietimu.</em>")
R("'c15b': 'Sukurta <em>Lietuvoje</em>. Tinka ir kitoms šalims.',", "'c15b': 'Sukurta <em>Lietuvoje</em> – kartu su jumis.',")
R("'c15cta': 'Pakalbėkime apie jūsų regioną',", "'c15cta': 'Pakalbėkime, ką dar nuveikti kartu',")
R("""('"Your region"', '"Jūsų regionas"', 1),""", """('"Your region"', '"jūsų savivaldybė"', 1),""")
BLOCK = open('kasnelis_block.txt', encoding='utf-8').read().rstrip()
R("\n]\nfor a, b in M: R(a, b)", ",\n" + BLOCK + "\n]\nfor a, b in M: R(a, b)")
open(p, 'w', encoding='utf-8').write(s)
print('ok')
