# -*- coding: utf-8 -*-
"""LT balsas: Darius (eleven_v3_dpo), scenos sujungiamos į dalis iki ~1500 simb., kiekviena — viena užklausa
(v3 nepriima previous_text). Po dalies — atmetamas sakinys. Įžanga — atskira dalis (jos trukmė minima tekste).
Paleidimas: python3 gen_lt.py [scenos pavadinimas …]  — be argumentų generuoja visas dalis."""
import json, os, sys, base64, urllib.request, subprocess, time
HERE = os.path.dirname(os.path.abspath(__file__)); B = os.path.join(HERE, 'balsas')
VOICE, MODEL, SPEED, SEED, TAIL, LIM = 'eqJHjeWMPGJFD6VBf1J2', 'eleven_v3_dpo_20260217', 0.9, 4242, 'Tiek šiam kartui.', 1500
key = [l.split('=', 1)[1].strip().strip('"') for l in open(os.path.expanduser('~/Workspace/AI vizualai/illustrations/.env')) if l.startswith('ELEVENLABS_API_KEY')][0]
sc = json.load(open(os.path.join(HERE, 'scenes.json')))
groups, cur = [], []
for s in sc:
    if cur and (s['n'] == 2 or sum(len(x['voice']) for x in cur) + len(s['voice']) > LIM): groups.append(cur); cur = []
    cur.append(s)
groups.append(cur)
dalys = {}
for gi, g in enumerate(groups):
    name = f'lt{gi + 1:02d}'
    for s in g: dalys[s['title']] = name
    want = sys.argv[1:]
    if want and not any(s['title'] in want for s in g): continue
    text = '\n\n'.join(s['voice'] for s in g) + '\n\n' + TAIL
    body = {'text': text, 'model_id': MODEL, 'language_code': 'lt', 'seed': SEED, 'voice_settings': {'speed': SPEED}}
    for att, wait in enumerate([0, 20, 45, 90, 180]):
        time.sleep(wait)
        try:
            r = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128',
                                       data=json.dumps(body).encode(), headers={'xi-api-key': key, 'Content-Type': 'application/json'}, method='POST')
            d = json.load(urllib.request.urlopen(r, timeout=600)); break
        except Exception as e:
            print('  kartojama', name, e)
    else: sys.exit(1)
    open(os.path.join(B, name + '.mp3'), 'wb').write(base64.b64decode(d['audio_base64']))
    al = d['alignment']; got = ''.join(al['characters'])
    json.dump({'text': got, 'alignment': al, 'voice': VOICE, 'model': MODEL, 'seed': SEED}, open(os.path.join(B, name + '.json'), 'w'), ensure_ascii=False)
    print(name, [s['n'] for s in g], len(text), 'simb.', round(al['character_end_times_seconds'][-1], 1), 's', '' if got == text else '⚠ tekstas pakeistas')
json.dump(dalys, open(os.path.join(B, 'dalys.json'), 'w'), ensure_ascii=False, indent=1)
