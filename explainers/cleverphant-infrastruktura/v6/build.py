# -*- coding: utf-8 -*-
"""
Cleverphant explainer v6 (EN) — kompozicijos ir balso takelio generatorius.

Scenarijus: ../SCENARIJUS-v6-EN.md. Balsas: balsas/manifest.json + balsas/words.json
(ElevenLabs George, eleven_multilingual_v2, seed 4242 — žr. balsas/visas.json).

Laikai NIEKADA nerašomi ranka: scenos pradžia = ankstesnių trukmių suma, veiksmo momentas =
OFF + žodžio laiko žyma (VIDEO_GAMYBA.md §6 — determinuotas laikas).

Paleidimas:  python3 build.py   →  ../index.html, balsas/vo.wav, v6.srt
"""
import json, os, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OFF = 0.6                                   # balsas prasideda 0,6 s po scenos pradžios
D = [9, 16, 15, 12.5, 13, 12.5, 16.5, 27.5, 15, 20]   # scenų trukmės (balsas + kvėpavimas)
S = [round(sum(D[:i]), 3) for i in range(len(D))]
TOTAL = round(sum(D), 3)

man = json.load(open(os.path.join(HERE, 'balsas/manifest.json')))
words = json.load(open(os.path.join(HERE, 'balsas/words.json')))
scenes = json.load(open(os.path.join(HERE, 'scenes.json')))

# balsas neturi išlįsti už scenos ribų
for i, m in enumerate(man):
    assert OFF + m['dur'] <= D[i] - 0.4, f"{i+1} scenai per trumpa: {OFF + m['dur']:.2f} > {D[i]}"

# ---------------------------------------------------------------- balso takelis
inputs, filt = [], []
for i, m in enumerate(man):
    inputs += ['-i', os.path.join(HERE, 'balsas', m['clip'])]
    ms = int(round((S[i] + OFF) * 1000))
    filt.append(f'[{i}:a]adelay={ms}|{ms}[a{i}]')
mix = ''.join(f'[a{i}]' for i in range(len(man)))
filt.append(f'{mix}amix=inputs={len(man)}:normalize=0,apad=whole_dur={TOTAL},atrim=0:{TOTAL},'
            f'loudnorm=I=-18:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(filt), '-map', '[out]',
                '-ar', '48000', '-ac', '2', os.path.join(HERE, 'balsas/vo.wav')], check=True)

# ---------------------------------------------------------------- subtitrai (sakiniais)
def ts(t):
    h, r = divmod(t, 3600); m, s = divmod(r, 60)
    return f'{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s - int(s)) * 1000)):03d}'
srt, n = [], 1
for i, m in enumerate(man):
    for k, s in enumerate(m['sent']):
        a = S[i] + OFF + s['rel']
        b = S[i] + OFF + (s['end'] - m['clip_start']) + 0.25
        if k + 1 < len(m['sent']):
            b = min(b, S[i] + OFF + m['sent'][k + 1]['rel'] - 0.05)
        srt.append(f"{n}\n{ts(a)} --> {ts(b)}\n{s['text']}\n"); n += 1
open(os.path.join(ROOT, 'v6.srt'), 'w', encoding='utf-8').write('\n'.join(srt))

# ---------------------------------------------------------------- kompozicija
T = {'S': S, 'D': D, 'OFF': OFF, 'W': {int(k) - 1: v for k, v in words.items()},
     'SENT': [[s['rel'] for s in m['sent']] for m in man], 'TOTAL': TOTAL}
html = open(os.path.join(HERE, 'template.html'), encoding='utf-8').read()
html = html.replace('__TOTAL__', str(TOTAL)).replace('/*__T__*/', 'const T = ' + json.dumps(T) + ';')
for i in range(len(D)):
    html = html.replace(f'__S{i}__', str(S[i])).replace(f'__D{i}__', str(D[i]))
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(html)
print('v6.html', TOTAL, 's · scenos:', list(zip(S, D)))
