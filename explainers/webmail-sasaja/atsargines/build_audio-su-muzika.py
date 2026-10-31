# -*- coding: utf-8 -*-
"""Webmail sąsaja (Larry → Elastic): garso takelis be balso — muzikos lova + paspaudimai.
Laikai tie patys kaip index.html konstanta K. Išvestis: garsas/mix.wav."""
import json, os, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
ILL = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
SFXD = os.path.join(ILL, 'assets', 'video', 'sfx')
MUSIC = os.path.join(ILL, 'assets', 'video', 'jiglr-malibu_cleverphant-mokymu-fonas.mp3')
TOTAL = 24.0

K = {'k1': 3.1, 'k2': 5.2, 'k3': 6.9, 'k4': 11.0, 'k5': 12.6, 'elastic': 15.5, 'ok': 16.6, 'k6': 19.6}
SFX = [(K[k], 'spustelejimas') for k in ('k1', 'k2', 'k3', 'k4', 'k5', 'k6')]
SFX += [(K['elastic'], 'numetimas'), (K['ok'] + 0.3, 'patvirtinimas')]

gain = json.load(open(os.path.join(SFXD, 'garsumas.json')))
lova = os.path.join(HERE, 'muzikos-lova.wav')
subprocess.run(['python3', os.path.join(ILL, 'muzikos-lova.py'), MUSIC, f'{TOTAL + 1:.2f}', lova], check=True, capture_output=True)
inp, f = ['-i', lova], [f'[0:a]atrim=0:{TOTAL},asetpts=N/SR/TB,volume=0.4,afade=t=in:st=0:d=1.0,afade=t=out:st={TOTAL - 2.5:.2f}:d=2.5,'
                        'aresample=48000,aformat=channel_layouts=stereo[mus]']
for j, (t, name) in enumerate(SFX):
    inp += ['-i', os.path.join(SFXD, name + '.wav')]; ms = int(round(t * 1000))
    f.append(f'[{j + 1}:a]volume={gain.get(name, 1)},adelay={ms}|{ms},aresample=48000,aformat=channel_layouts=stereo[s{j}]')
f.append('[mus]' + ''.join(f'[s{j}]' for j in range(len(SFX))) +
         f'amix=inputs={1 + len(SFX)}:normalize=0:duration=first,loudnorm=I=-20:TP=-2:LRA=11,aresample=48000,alimiter=limit=0.89:level=false[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(f), '-map', '[out]', '-ar', '48000', '-ac', '2',
                os.path.join(HERE, 'mix.wav')], check=True)
os.remove(lova)
print('mix.wav', TOTAL, 's ·', len(SFX), 'garsai')
