# -*- coding: utf-8 -*-
"""Webmail sąsaja (Larry → Elastic): garso takelis — tik paspaudimai, be muzikos ir balso (Eimantas 2026-10-14).
Laikai tie patys kaip index.html konstanta K. Išvestis: garsas/mix.wav."""
import json, os, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
ILL = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
SFXD = os.path.join(ILL, 'assets', 'video', 'sfx')
TOTAL = 24.0

K = {'k1': 3.1, 'k2': 5.2, 'k3': 6.9, 'k4': 11.0, 'k5': 12.6, 'k6': 19.6}
SFX = [(t, 'spustelejimas') for t in K.values()]  # be muzikos — paspaudimai +6 dB

gain = json.load(open(os.path.join(SFXD, 'garsumas.json')))
inp, f = ['-f', 'lavfi', '-t', str(TOTAL), '-i', 'anullsrc=r=48000:cl=stereo'], []
for j, (t, name) in enumerate(SFX):
    inp += ['-i', os.path.join(SFXD, name + '.wav')]; ms = int(round(t * 1000))
    f.append(f'[{j + 1}:a]volume={gain.get(name, 1) * 2:.2f},adelay={ms}|{ms},aresample=48000,aformat=channel_layouts=stereo[s{j}]')
f.append('[0:a]' + ''.join(f'[s{j}]' for j in range(len(SFX))) +
         f'amix=inputs={1 + len(SFX)}:normalize=0:duration=first,alimiter=limit=0.89:level=false[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(f), '-map', '[out]', '-ar', '48000', '-ac', '2',
                os.path.join(HERE, 'mix.wav')], check=True)
print('mix.wav', TOTAL, 's ·', len(SFX), 'paspaudimai')
