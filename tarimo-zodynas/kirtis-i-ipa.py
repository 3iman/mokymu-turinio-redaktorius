#!/usr/bin/env python3
"""Kirčiuotas lietuviškas žodis → IPA, kokį priima ElevenLabs v3 (tarp pasvirųjų brūkšnių).

⛔ Kodėl: v3 kirčio ženklų tekste nepaiso (lt.json § _apie), kirtis perduodamas tik IPA ˈ ženklu
   prieš skiemenį. Ženklą rašome ranka tik vieną kartą — čia — kad 100+ įrašų būtų vienodo stiliaus
   kaip esami (/spalˈva/, /paˈruoʃtʲi/).

Taisyklės (sąmoningai paprastos — balsui užtenka kirčio vietos ir skiemenų):
  - ą ę į ų ū y → ilgi (aː ɛː iː uː uː iː); ė → eː; o → oː (lietuviškas o visada ilgas, išskyrus svetimžodžius);
    kirčiuotas a/e su akūtu ar riestiniu → ilgas (aː/ɛː), su graviu → trumpas.
  - c→ts č→tʃ š→ʃ ž→ʒ dž→dʒ ch→x h→ɣ g→ɡ.
  - Minkštinimas: priebalsis prieš i į y e ę ė ie → Cʲ; priebalsis + i + užpakalinis balsis (ia iu io ią iū ių) → Cʲ + balsis.
  - Skiemuo: balsis (ar dvibalsis ai au ei ui ie uo oi eu) + paskutinis priebalsis iš grupės eina į kitą skiemenį (spal-va, spus-tɛ-lʲeː-jus).
  - ˈ prieš kirčiuotą skiemenį. Kirtis ant priebalsio (al̃ ar̃ er̃ …) reiškia tą patį skiemenį.

Paleidimas:
  python3 tarimo-zodynas/kirtis-i-ipa.py "spalvà" "paruõšti"          # parodo IPA
  python3 tarimo-zodynas/kirtis-i-ipa.py --json sprendimai.json        # [{"zodis":"…","kirciuotas":"…"}] → spausdina poras
"""
import sys, json, unicodedata, re

MARKS = {'̀': 'grave', '́': 'acute', '̃': 'tilde'}
VOW = set('aąeęėiįyouųū')

def dekomponuoti(z):
    """→ sąrašas (raidė, kirčio ženklas|None), raidė be diakritikų, lietuviškos raidės išlaikytos."""
    out = []
    for ch in unicodedata.normalize('NFD', z):
        if ch in MARKS:
            if out: out[-1][1] = MARKS[ch]
            continue
        if unicodedata.category(ch) == 'Mn':      # ogonek, caron, dot, macron — lietuviškos raidės dalis
            base, mark = out.pop()
            out.append([unicodedata.normalize('NFC', base + ch), mark])
            continue
        out.append([ch, None])
    return out

def ipa(z):
    raides = dekomponuoti(z.lower())
    letters = [r for r, _ in raides]
    # kirčiuotas indeksas (raidė su ženklu); jei ženklas ant priebalsio — tas pats skiemuo
    kirtis = next((i for i, (r, m) in enumerate(raides) if m), None)
    if kirtis is None:
        raise ValueError(f'„{z}“ be kirčio ženklo')
    # 1. fonemos su skiemenų nucleus žymėjimu
    fon = []   # (ipa, is_vowel, letter_index)
    i = 0
    n = len(letters)
    def frontish(j):
        return j < n and letters[j] in 'iįyeęė'
    while i < n:
        c = letters[i]
        nxt = letters[i + 1] if i + 1 < n else ''
        if c in VOW:
            m = raides[i][1]
            prev_l = letters[i - 1] if i > 0 else ''
            long_ = c in 'ąęįųūy' or c == 'ė' or (c == 'o' and prev_l != 'u') or (c in 'ae' and m in ('acute', 'tilde'))
            base = {'a': 'a', 'ą': 'a', 'e': 'ɛ', 'ę': 'ɛ', 'ė': 'e', 'i': 'i', 'į': 'i', 'y': 'i', 'o': 'o', 'u': 'u', 'ų': 'u', 'ū': 'u'}[c]
            fon.append([base + ('ː' if long_ else ''), True, i]); i += 1; continue
        # priebalsiai
        if c == 'd' and nxt == 'ž': s = 'dʒ'; step = 2
        elif c == 'c' and nxt == 'h': s = 'x'; step = 2
        elif c == 'c': s = 'ts'; step = 1
        elif c == 'č': s = 'tʃ'; step = 1
        elif c == 'š': s = 'ʃ'; step = 1
        elif c == 'ž': s = 'ʒ'; step = 1
        elif c == 'h': s = 'ɣ'; step = 1
        elif c == 'g': s = 'ɡ'; step = 1
        else: s = c; step = 1
        j = i + step
        soft = False
        if j < n and letters[j] == 'i' and j + 1 < n and letters[j + 1] in 'aąouųū' and raides[j][1] is None:
            soft = True; skip_i = True
        else:
            skip_i = False
            if frontish(j): soft = True
        fon.append([s + ('ʲ' if soft and c != 'j' else ''), False, i])
        i = j + (1 if skip_i else 0)
    # 2. skiemenys: nucleus = balsis arba dvibalsis
    DIFT = {('a', 'i'), ('a', 'u'), ('ɛ', 'i'), ('ɛ', 'u'), ('u', 'i'), ('i', 'ɛ'), ('u', 'o'), ('o', 'i')}
    sylls = []  # list of lists of fon indices
    cur = []; have_nucleus = False
    k = 0
    while k < len(fon):
        f = fon[k]
        if f[1]:
            if have_nucleus:
                prev = fon[k - 1]
                if prev[1] and (prev[0].rstrip('ː'), f[0].rstrip('ː')) in DIFT and not (prev[0].endswith('ː') and prev[0][0] in 'ɛa' and False):
                    cur.append(k); k += 1; continue   # dvibalsis
                # naujas skiemuo: paskutinis priebalsis prieš balsį pereina į jį
                cons = []
                while cur and not fon[cur[-1]][1]: cons.insert(0, cur.pop())
                if cons:
                    cur.extend(cons[:-1]); sylls.append(cur); cur = [cons[-1]]
                else:
                    sylls.append(cur); cur = []
            cur.append(k); have_nucleus = True
        else:
            cur.append(k)
        k += 1
    if cur: sylls.append(cur)
    # 3. kirčiuotas skiemuo = tas, kuriame yra raidė su ženklu
    def syl_has(si):
        return any(fon[x][2] <= kirtis < (fon[x + 1][2] if x + 1 < len(fon) else n) for x in sylls[si])
    out = []
    for si, s in enumerate(sylls):
        seg = ''.join(fon[x][0] for x in s)
        out.append(('ˈ' if syl_has(si) else '') + seg)
    return '/' + ''.join(out) + '/'

if __name__ == '__main__':
    a = sys.argv[1:]
    if a and a[0] == '--json':
        for e in json.load(open(a[1], encoding='utf-8')):
            print(f"{e['zodis']}\t{e['kirciuotas']}\t{ipa(e['kirciuotas'])}")
    else:
        for z in a: print(z, '→', ipa(z))
