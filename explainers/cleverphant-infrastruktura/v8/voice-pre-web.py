# -*- coding: utf-8 -*-
"""
Balso karpymas į scenas ir raktinių žodžių laiko žymos (v7).
Įvestis: balsas/visas.mp3 + visas.json (ElevenLabs with-timestamps), scenes.json.
Išvestis: balsas/kNN.wav, balsas/manifest.json, balsas/words.json.

⛔ -ss ir -t PRIEŠ -i: tada karpinio laikas prasideda nuo nulio ir afade taikomas karpiniui.
   Po -i jis skaičiuojamas nuo originalo pradžios ir nutildo visus karpinius po pirmojo (2026-10-12).
"""
import json, os, re, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
B = os.path.join(HERE, 'balsas')

# raktiniai žodžiai, prie kurių pririšti veiksmai (pirmas pasitaikymas scenoje)
WANT = {
    1: ['All caps', 'Justified', 'images', 'Scanned', 'Broken', 'Staff who left', 'Each one', 'hundred', 'Two hundred', 'Five hundred', 'thousand'],
    2: ['accessibility', 'data protection', 'security', 'rules', 'alone', 'budget', 'chance'],
    3: ['new tender', 'stump', 'And again', 'Ours', 'keeps growing', 'stronger'],
    4: ['website', 'Underneath', 'design system', 'compliance', 'shared by', 'plugs'],
    5: ['benefits', 'bugs', 'one school', 'Fixed once'],
    6: ['curious', 'pilot', 'Slow', 'Very slow', 'data shows', 'at once'],
    7: ['municipality', 'publishes', 'once', 'every school'],
    8: ['village', 'large city', 'design system', 'face', 'Not identical'],
    9: ['Being small', 'Elephants', 'Very slow', 'So slow', 'everywhere', 'Trojan', 'every next step', 'live tables', 'whistleblower', 'consultation',
        'surveys', 'event calendars', 'update subscriptions'],
    10: ['what if?', 'Word file', 'documents', 'fix was ready', 'None of this', 'Each idea', 'One school pilots'],
    11: ['And AI', 'chatbot', 'quietly', 'loves order'],
    12: ['municipality', 'region', 'whole country', 'added', 'costs', 'Not a promise', 'logic'],
    13: ['fifteen', 'first ten', 'Very slow', 'So slow', 'Change in schools', 'grow by itself', 'hundreds', 'slow part', 'Audits', 'onboarding', 'training', 'small country', 'Ready', 'talk'],
}


def run(src_json, src_mp3, scenes, prefix='k'):
    d = json.load(open(src_json))
    text = d['text']; al = d['alignment']
    st, en = al['character_start_times_seconds'], al['character_end_times_seconds']
    assert ''.join(al['characters']) == text
    pos, out = 0, []
    for s in scenes:
        i = text.index(s['voice'], pos); j = i + len(s['voice']); pos = j
        sents = []
        for m in re.finditer(r'[^.!?]+[.!?]', s['voice']):
            a = i + m.start()
            while text[a] == ' ': a += 1
            sents.append({'t': st[a], 'end': en[i + m.end() - 1], 'text': m.group(0).strip()})
        out.append({'n': s['n'], 'i': i, 'j': j, 'v0': st[i], 'v1': en[j - 1], 'sent': sents})
    for k, o in enumerate(out):
        nxt = out[k + 1]['v0'] if k + 1 < len(out) else o['v1'] + 0.6
        a = max(0, o['v0'] - 0.05); b = min(o['v1'] + 0.30, (o['v1'] + nxt) / 2); dur = b - a
        o['clip'] = f'{prefix}{o["n"]:02d}.wav'; o['clip_start'] = a; o['dur'] = round(dur, 3)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.3f}', '-t', f'{dur:.3f}', '-i', src_mp3,
                        '-af', f'afade=t=out:st={dur - 0.12:.3f}:d=0.12', '-ar', '48000', '-ac', '1',
                        os.path.join(B, o['clip'])], check=True)
        for s in o['sent']: s['rel'] = round(s['t'] - a, 3)
    words = {}
    for o, s in zip(out, scenes):
        words[s['n']] = {}
        for w in WANT.get(s['n'], []):
            jj = text.index(w, o['i']); assert jj < o['j'], (s['n'], w)
            words[s['n']][w] = round(st[jj] - o['clip_start'], 2)
    return out, words


if __name__ == '__main__':
    scenes = json.load(open(os.path.join(HERE, 'scenes.json')))
    # paskutinė scena perrašyta atskirai (Eimantas 2026-10-12: „su mūsų know-how galima paboostinti“) —
    # likusios scenos lieka iš patvirtinto visas.mp3, nepergeneruojamos
    man, words = run(os.path.join(B, 'visas.json'), os.path.join(B, 'visas.mp3'), scenes[:12])
    m13, w13 = run(os.path.join(B, 's13.json'), os.path.join(B, 's13.mp3'), scenes[12:])
    man += m13; words.update(w13)
    json.dump(man, open(os.path.join(B, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)
    json.dump(words, open(os.path.join(B, 'words.json'), 'w'), ensure_ascii=False, indent=1)
    for o in man:
        lvl = subprocess.run(['ffmpeg', '-hide_banner', '-i', os.path.join(B, o['clip']), '-af', 'volumedetect', '-f', 'null', '-'],
                             capture_output=True, text=True).stderr
        mv = re.search(r'mean_volume: (-?[\d.]+)', lvl).group(1)
        print(o['n'], o['dur'], 'dB', mv, words[o['n']])
