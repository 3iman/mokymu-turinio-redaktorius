# -*- coding: utf-8 -*-
"""Dviejų scenų sukeitimas vietomis (a ↔ b): šablono id, w/t/scene, __S/D__, build.py w(), scenes.json tvarka ir n, translate_lt.py id.
Naudojimas: python3 swap.py A B failas…  (failo tipas pagal plėtinį / vardą)"""
import re, sys, json
a, b = int(sys.argv[1]), int(sys.argv[2])
def m(n): return b if n == a else a if n == b else n
def ids(s, q):
    def tok(x):
        pre, n, rest = x.group(1), int(x.group(2)), x.group(3)
        if re.fullmatch(r'[0-9a-fA-F]{6}', f'c{n}{rest}'): return x.group(0)
        return f'{pre}c{m(n)}{rest}'
    return re.sub(r'([%s])c(\d+)([0-9a-zA-Z]*)' % q, tok, s)
def calls(s):
    for f in ('w', 't'): s = re.sub(r'\b%s\((\d+),' % f, lambda x: f'{f}({m(int(x.group(1)))},', s)
    s = re.sub(r'\bscene\((\d+)\)', lambda x: f'scene({m(int(x.group(1)))})', s)
    return re.sub(r'__([SD])(\d+)__', lambda x: f'__{x.group(1)}{m(int(x.group(2)))}__', s)
for p in sys.argv[3:]:
    s = open(p, encoding='utf-8').read(); assert s
    if p.endswith('scenes.json'):
        S = json.loads(s); S[a], S[b] = S[b], S[a]
        for i, x in enumerate(S): x['n'] = i + 1
        out = json.dumps(S, ensure_ascii=False, indent=1)
    elif p.endswith('build.py'): out = calls(s)
    elif p.endswith('translate_lt.py'): out = calls(ids(s, '#"\''))
    else: out = calls(ids(s, '#"'))
    assert out; open(p, 'w', encoding='utf-8').write(out); print('sukeista', p)
