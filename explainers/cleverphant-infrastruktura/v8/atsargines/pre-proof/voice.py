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
    'Fair warning': ['selling', 'take their time', 'So does', 'four and a half', 'comfortable', 'worth it'],
    'The only channel you control': ['mandatory', 'matter anyway', 'only channel', 'Search engines', 'AI answers', 'Agents', 'looks', 'current'],
    'Details': ['All caps', 'Justified', 'images', 'Scanned', 'Broken', 'Staff who left', 'Each one', 'Together', 'hundred', 'Two hundred', 'Five hundred', 'thousand'],
    'Each school alone': ['elephant in the room', 'Every school', 'accessibility', 'data protection', 'security', 'rules', 'alone', 'budget', 'chance'],
    'Stumps': ['new tender', 'stump', 'And again', 'continuity', 'Ours', 'keeps growing', 'stronger'],
    'Only the surface': ['website', 'Underneath', 'design system', 'compliance', 'shared by', 'plugs'],
    'One notices': ['benefits', 'bugs', 'It happens', 'one school', 'Fixed once'],
    'Pilot → standard': ['curious', 'pilot', 'Slow', 'Very slow', 'data shows', 'at once'],
    'Publish once': ['municipality', 'publishes', 'once', 'new rule', 'safer internet', 'anti-bullying', 'every school', 'No emails', 'No reminders', 'left behind', 'Distribution', 'big ideas', 'no single school', 'shared by all'],
    'Equally good': ['village', 'large city', 'design system', 'face', 'Not identical'],
    'Trojan elephant': ['Being small', 'Elephants', 'Very slow', 'So slow', 'everywhere', 'Trojan', 'eat an elephant', 'One bite', 'every next step', 'live tables', 'whistleblower', 'consultation',
        'surveys', 'event calendars', 'weekly update digests'],
    'What if…': ['what if?', 'Word file', 'documents', 'fix was ready', 'None of this', 'Each idea', 'One school pilots'],
    'And AI?': ['And AI', 'chatbot', 'quietly', 'loves order'],
    'The logic of scale': ['municipality', 'region', 'whole country', 'added', 'costs', 'Not a promise', 'logic'],
    'Walked this road': ['fifteen', 'first ten', 'Very slow', 'So slow', 'Change in schools', 'grow by itself', 'hundreds', 'slow part', 'Audits', 'onboarding', 'training', 'never forgets', 'knowledge stays', 'goal', 'teachers back', 'small country', 'Ready', 'talk'],
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
        for w in WANT.get(s['title'], []):
            jj = text.index(w, o['i']); assert jj < o['j'], (s['n'], w)
            words[s['n']][w] = round(st[jj] - o['clip_start'], 2)
    return out, words


if __name__ == '__main__':
    scenes = json.load(open(os.path.join(HERE, 'scenes.json')))
    # šaltiniai: patvirtintas visas.mp3; atskirai sugeneruotos scenos (Eimantas 2026-10-12) — savo failuose
    SRC = {'Fair warning': 'sintro', 'One notices': 'snotices', 'Publish once': 'spublish', 'Details': 'sdetails', 'Stumps': 'sstumps', 'Each school alone': 'salone', 'Trojan elephant': 'strojan', 'The only channel you control': 'sweb', 'Walked this road': 's13'}
    groups = {}
    for sc in scenes: groups.setdefault(SRC.get(sc['title'], 'visas'), []).append(sc)
    man, words = [], {}
    for src, lst in groups.items():
        m, wd = run(os.path.join(B, src + '.json'), os.path.join(B, src + '.mp3'), lst)
        man += m; words.update(wd)
    man.sort(key=lambda o: o['n'])
    json.dump(man, open(os.path.join(B, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)
    json.dump(words, open(os.path.join(B, 'words.json'), 'w'), ensure_ascii=False, indent=1)
    for o in man:
        lvl = subprocess.run(['ffmpeg', '-hide_banner', '-i', os.path.join(B, o['clip']), '-af', 'volumedetect', '-f', 'null', '-'],
                             capture_output=True, text=True).stderr
        mv = re.search(r'mean_volume: (-?[\d.]+)', lvl).group(1)
        print(o['n'], o['dur'], 'dB', mv, words[o['n']])
