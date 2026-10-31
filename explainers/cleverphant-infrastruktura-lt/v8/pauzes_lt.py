# -*- coding: utf-8 -*-
"""„Vienas pastebi“ pauzės po LT dalies generavimo: prieš „Ir taip“ 0.9 s, prieš „tas pačias klaidas“ 0.7 s.
Paleisti po kiekvieno gen_lt.py, kuris perrašė tą dalį (dalį randa dalys.json)."""
import json, subprocess
B = 'balsas/'; n = json.load(open(B + 'dalys.json'))['One notices']
d = json.load(open(B + n + '.json'))
if 'pauzes' in d: raise SystemExit(f'{n} jau su pauzėmis')
subprocess.run(['cp', B + n + '.mp3', B + n + '-raw.mp3'], check=True); subprocess.run(['cp', B + n + '.json', B + n + '-raw.json'], check=True)
t = d['text']; al = d['alignment']; st, en = al['character_start_times_seconds'], al['character_end_times_seconds']
pts = []
for ci, target in ((t.index('Ir taip'), 0.9), (t.index('tas pačias klaidas'), 0.7)):
    gap = st[ci] - en[ci - 2]; add = max(0, round(target - gap, 3)); pts.append((round((en[ci - 2] + st[ci]) / 2, 3), add)); print(n, 'tarpas', round(gap, 2), '+', add)
segs, prev, f, k = [], 0, [], 0
for at, add in pts:
    f.append(f'[0:a]atrim={prev}:{at},asetpts=N/SR/TB[a{k}]'); f.append(f'anullsrc=r=44100:cl=mono,atrim=0:{add}[z{k}]'); segs += [f'[a{k}]', f'[z{k}]']; prev = at; k += 1
f.append(f'[0:a]atrim={prev},asetpts=N/SR/TB[a{k}]'); segs.append(f'[a{k}]'); f.append(''.join(segs) + f'concat=n={len(segs)}:v=0:a=1[o]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', B + n + '-raw.mp3', '-filter_complex', ';'.join(f), '-map', '[o]', '-ac', '1', '-ar', '44100', '-b:a', '128k', B + n + '.mp3'], check=True)
sh = lambda x: round(x + sum(a for p, a in pts if x >= p), 3)
al['character_start_times_seconds'] = [sh(x) for x in st]; al['character_end_times_seconds'] = [sh(x) for x in en]; d['pauzes'] = pts
json.dump(d, open(B + n + '.json', 'w'), ensure_ascii=False)
