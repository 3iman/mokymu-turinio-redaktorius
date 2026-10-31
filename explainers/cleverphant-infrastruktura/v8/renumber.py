# -*- coding: utf-8 -*-
"""Scenų pernumeravimas: visos scenos nuo `from_n` pastumiamos +1 (vieta naujai scenai).
Liečia šablono id (c6a, #c6…; spalvos #c7b8db nepaliečiamos), w(i,…), t(i,…), scene(i), __Si__/__Di__ ir build.py w(i,…).
Naudojimas: python3 renumber.py template.html build.py 6"""
import re, sys

def bump(n, k): return n + 1 if n >= k else n

def tpl(s, k):
    def tok(m):
        pre, n, rest = m.group(1), int(m.group(2)), m.group(3)
        if re.fullmatch(r'[0-9a-fA-F]{6}', f'c{n}{rest}'): return m.group(0)
        return f'{pre}c{bump(n, k)}{rest}'
    s = re.sub(r'([#"])c(\d+)([0-9a-zA-Z]*)', tok, s)
    for f in ('w', 't'):
        s = re.sub(r'\b%s\((\d+),' % f, lambda m: f'{f}({bump(int(m.group(1)), k)},', s)
    s = re.sub(r'\bscene\((\d+)\)', lambda m: f'scene({bump(int(m.group(1)), k)})', s)
    s = re.sub(r'__([SD])(\d+)__', lambda m: f'__{m.group(1)}{bump(int(m.group(2)), k)}__', s)
    return s

def build(s, k):
    return re.sub(r'\bw\((\d+),', lambda m: f'w({bump(int(m.group(1)), k)},', s)

if __name__ == '__main__':
    t, b, k = sys.argv[1], sys.argv[2], int(sys.argv[3])
    # ⛔ pirma perskaityti, tik tada atidaryti rašymui (open(..., 'w') failą iškart ištuština)
    ts = tpl(open(t, encoding='utf-8').read(), k); bs = build(open(b, encoding='utf-8').read(), k)
    assert ts and bs, 'tuščias rezultatas'
    open(t, 'w', encoding='utf-8').write(ts); open(b, 'w', encoding='utf-8').write(bs)
    print('pernumeruota nuo', k)
