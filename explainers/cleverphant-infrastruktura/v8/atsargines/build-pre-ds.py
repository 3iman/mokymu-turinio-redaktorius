# -*- coding: utf-8 -*-
"""
Cleverphant explainer v8 (EN) — kompozicija, garso takelis (balsas + muzika + garsai), subtitrai.

Eiga:  python3 voice.py   (karpo balsą, žodžių laikai)
       python3 build.py   (→ ../index.html, balsas/mix.wav, ../v8.srt)

Laikai NIEKADA nerašomi ranka: scenos trukmė = balsas + kvėpavimas (suapvalinta iki 0,5 s),
veiksmo ir garso momentas = OFF + žodžio laiko žyma (VIDEO_GAMYBA.md §6).
Muzika ir garsai — kaip pamokose (VIDEO_GAMYBA.md §7): jiglr-malibu, volume 0.4, sidechain po balsu,
garsai iš assets/video/sfx su garsumas.json.
"""
import json, math, os, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
ILL = os.path.abspath(os.path.join(ROOT, '..', '..'))
SFXD = os.path.join(ILL, 'assets', 'video', 'sfx')
MUSIC = os.path.join(ILL, 'assets', 'video', 'jiglr-malibu_cleverphant-mokymu-fonas.mp3')
OFF, BREATH, END_HOLD = 0.6, 1.6, 3.0

man = json.load(open(os.path.join(HERE, 'balsas/manifest.json')))
words = {int(k) - 1: v for k, v in json.load(open(os.path.join(HERE, 'balsas/words.json'))).items()}
D = [math.ceil((OFF + m['dur'] + BREATH) * 2) / 2 for m in man]
D[-1] += END_HOLD
S = [round(sum(D[:i]), 3) for i in range(len(D))]
TOTAL = round(sum(D), 3)
w = lambda i, k: S[i] + OFF + words[i][k]

# ---------------------------------------------------------------- garsai (tie patys momentai kaip template.html)
SFX = [(w(0, 'coffee'), 'spustelejimas'), (w(0, 'Maybe two'), 'spustelejimas'), (w(0, 'tried'), 'numetimas'), (w(0, 'worth it') + 0.6, 'patvirtinimas')] + [(w(1, k) + 0.45, 'spustelejimas') for k in ['All-caps', 'Walls of text', 'Posters', 'Naked links', 'Random fonts', 'Staff who left']]
SFX += [(w(1, k), 'numetimas') for k in ['hundred', 'Two hundred', 'Five hundred', 'and more']]
SFX += [(w(2, 'Search engines') + 0.2, 'spustelejimas'), (w(2, 'AI answers') + 0.2, 'spustelejimas'), (w(2, 'Agents') + 0.2, 'spustelejimas'), (w(2, 'current'), 'patvirtinimas')]
SFX += [(w(4, 'stump') + 0.4, 'numetimas'), (w(4, 'And again') + 0.9 + 0.4, 'numetimas'), (w(4, 'And again') + 1.8 + 0.4, 'numetimas'),
        (w(4, 'continuity'), 'spustelejimas'), (w(4, 'stronger') + 0.5, 'patvirtinimas'),
        (w(5, 'plugs') + 0.5, 'numetimas'),
        (w(6, 'agency') + 0.6, 'rasymas'), (w(6, 'website builder') + 0.6, 'rasymas'), (w(6, 'pages') + 0.2, 'spustelejimas'), (w(6, 'documents') + 0.2, 'spustelejimas'), (w(6, 'staff profiles') + 0.2, 'spustelejimas'), (w(6, 'goes live') + 0.1, 'patvirtinimas'),
        (w(7, 'asks'), 'spustelejimas'), (w(7, 'newsletter') + 0.3, 'numetimas'),
        (w(7, 'one school'), 'spustelejimas'), (w(7, 'Fixed once') + 0.2, 'patvirtinimas'),
        (w(8, 'pilot') - 0.1, 'spustelejimas'), (w(8, 'at once') + 0.1, 'patvirtinimas'),
        (w(9, 'every school') + 0.4, 'numetimas'), (w(9, 'No emails'), 'spustelejimas'), (w(9, 'No reminders'), 'spustelejimas'), (w(9, 'left behind'), 'spustelejimas'),
        (w(9, 'no single school') + 0.9, 'numetimas'), (w(9, 'shared by all') + 0.3, 'patvirtinimas'), (w(10, 'face'), 'patvirtinimas')]
walk0, walk1 = w(11, 'Elephants') - 0.4, w(11, 'everywhere') + 0.9
SFX += [(walk0 + f * (walk1 - walk0) + 0.1, 'spustelejimas') for f in (0.30, 0.42, 0.66, 0.84)]
SFX += [(w(11, 'every next step') + 0.9, 'numetimas')] + [(w(11, k) + 0.85, 'numetimas') for k in ['live tables', 'whistleblower', 'consultation', 'surveys', 'event calendars', 'weekly update digests']]
SFX += [(w(11, 'One bite'), 'numetimas'), (w(11, 'One bite') + 0.45, 'numetimas'), (w(15, 'never forgets'), 'spustelejimas'), (w(15, 'teachers back') + 1.4, 'patvirtinimas')]
SFX += [(w(12, k) - 0.1, 'spustelejimas') for k in ['Word file', 'documents', 'fix was ready']]
SFX += [(w(12, 'One school pilots') + 0.6, 'patvirtinimas'), (w(13, 'loves order'), 'patvirtinimas'),
        (w(15, 'Ready') + 0.6, 'patvirtinimas'), (w(15, 'web accessibility'), 'spustelejimas'), (w(15, 'data protection'), 'spustelejimas'), (w(15, 'whistleblower protection'), 'spustelejimas'), (w(15, 'talk') + 2.6, 'spustelejimas')]
gain = json.load(open(os.path.join(SFXD, 'garsumas.json')))

# ---------------------------------------------------------------- garso takelis
tmp = os.path.join(HERE, 'balsas')
lova = os.path.join(tmp, 'muzikos-lova.wav')
subprocess.run(['python3', os.path.join(ILL, 'muzikos-lova.py'), MUSIC, f'{TOTAL + 1:.2f}', lova], check=True, capture_output=True)
inp, f = [], []
for i, m in enumerate(man):
    inp += ['-i', os.path.join(tmp, m['clip'])]
    ms = int(round((S[i] + OFF) * 1000)); f.append(f'[{i}:a]adelay={ms}|{ms},aformat=channel_layouts=stereo[v{i}]')
nv = len(man)
f.append(''.join(f'[v{i}]' for i in range(nv)) + f'amix=inputs={nv}:normalize=0,apad=whole_dur={TOTAL},atrim=0:{TOTAL},'
         'loudnorm=I=-19:TP=-2:LRA=11,aresample=48000[voice]')
f.append('[voice]asplit=2[vmix][vkey]')
inp += ['-i', lova]; mi = nv
f.append(f'[{mi}:a]atrim=0:{TOTAL},asetpts=N/SR/TB,volume=0.4,afade=t=in:st=0:d=1.0,afade=t=out:st={TOTAL - 3:.2f}:d=3,'
         'aresample=48000,aformat=channel_layouts=stereo[mus]')
f.append('[mus][vkey]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=900[musd]')
for j, (t, name) in enumerate(SFX):
    inp += ['-i', os.path.join(SFXD, name + '.wav')]; k = nv + 1 + j; ms = int(round(t * 1000))
    f.append(f'[{k}:a]volume={gain.get(name, 1)},adelay={ms}|{ms},aresample=48000,aformat=channel_layouts=stereo[s{j}]')
f.append('[vmix][musd]' + ''.join(f'[s{j}]' for j in range(len(SFX))) +
         f'amix=inputs={2 + len(SFX)}:normalize=0:duration=first,alimiter=limit=0.89:level=false[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(f), '-map', '[out]', '-ar', '48000', '-ac', '2',
                os.path.join(tmp, 'mix.wav')], check=True)

# ---------------------------------------------------------------- subtitrai
def ts(t):
    h, r = divmod(t, 3600); mm, s = divmod(r, 60)
    return f'{int(h):02d}:{int(mm):02d}:{int(s):02d},{int(round((s - int(s)) * 1000)):03d}'
srt, n = [], 1
for i, m in enumerate(man):
    for k, s in enumerate(m['sent']):
        a = S[i] + OFF + s['rel']; b = S[i] + OFF + (s['end'] - m['clip_start']) + 0.25
        if k + 1 < len(m['sent']): b = min(b, S[i] + OFF + m['sent'][k + 1]['rel'] - 0.05)
        srt.append(f"{n}\n{ts(a)} --> {ts(b)}\n{s['text']}\n"); n += 1
open(os.path.join(ROOT, 'v8.srt'), 'w', encoding='utf-8').write('\n'.join(srt))

# ---------------------------------------------------------------- kompozicija
T = {'S': S, 'D': D, 'OFF': OFF, 'W': words, 'TOTAL': TOTAL}
html = open(os.path.join(HERE, 'template.html'), encoding='utf-8').read()
html = html.replace('__TOTAL__', str(TOTAL)).replace('/*__T__*/', 'const T = ' + json.dumps(T) + ';')
for i in range(len(D)):
    html = html.replace(f'__S{i}__', str(S[i])).replace(f'__D{i}__', str(D[i]))
assert '__S' not in html and '__D' not in html
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(html)
print('index.html', TOTAL, 's ·', len(SFX), 'garsai · scenos:', list(zip(S, D)))
