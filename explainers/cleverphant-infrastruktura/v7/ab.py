# George vs Darius: tos pačios 3 ir 12 scenos, su ta pačia muzikos lova (sidechain), −19 LUFS
import json, subprocess, tempfile, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'balsas'))
m = json.load(open('manifest.json')); g = [o for o in m if o['n'] in (3, 12)]
d = json.load(open('palyginimas-darius.json')); st = d['alignment']['character_start_times_seconds']; en = d['alignment']['character_end_times_seconds']
txt = d['text']; pos = 0; dar = []
for p in txt.split('\n\n')[:2]:
    i = txt.index(p, pos); j = i + len(p); pos = j; dar.append((max(0, st[i] - 0.05), en[j - 1] + 0.3))
T = tempfile.mkdtemp()
seg = lambda src, a, b, out: subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.3f}', '-t', f'{b - a:.3f}', '-i', src, '-ar', '48000', '-ac', '1', out], check=True)
seg('visas.mp3', g[0]['clip_start'], g[0]['clip_start'] + g[0]['dur'], f'{T}/g1.wav'); seg('visas.mp3', g[1]['clip_start'], g[1]['clip_start'] + g[1]['dur'], f'{T}/g2.wav')
seg('palyginimas-darius.mp3', *dar[0], f'{T}/d1.wav'); seg('palyginimas-darius.mp3', *dar[1], f'{T}/d2.wav')
for who, name in (('g', 'george'), ('d', 'darius')):
    f = ("[0:a]adelay=600|600,apad=pad_dur=1.2[a];[a][1:a]concat=n=2:v=0:a=1,loudnorm=I=-19:TP=-2,aformat=channel_layouts=stereo,asplit=2[v][k];"
         "[2:a]volume=0.4,afade=t=in:d=1[m];[m][k]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=900[md];"
         "[v][md]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.89:level=false[o]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{T}/{who}1.wav', '-i', f'{T}/{who}2.wav', '-i', 'muzikos-lova.wav',
                    '-filter_complex', f, '-map', '[o]', '-b:a', '192k', f'../../renders/balsas-{name}.mp3'], check=True)
    print(name, subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'../../renders/balsas-{name}.mp3'], capture_output=True, text=True).stdout.strip())
