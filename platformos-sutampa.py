#!/usr/bin/env python3
"""Ar platformos pamokų scenarijai (video/scenarijus-lt.md) sutampa su kortelėmis.

  python3 platformos-sutampa.py        # kiekvienai pamokai su epizodai.json: OK arba neatitikimai

Lygina kiekvieno kadro trukmę scenarijuje su kortelės explaineris.trukme_s
(Mokymu-platforma/turinys/adaptuota/kursai/*.json). Neatitikimas = kortelė pakeista,
o scenarijus neperkurtas — paleisk `bash platformos-pamoka.sh {slug}`.
"""
import glob, json, os, re

R = os.path.dirname(os.path.abspath(__file__))
P = os.environ.get('PLATFORMA', os.path.expanduser('~/Workspace/Mokymu-platforma'))

cards = {}
for f in glob.glob(P + '/turinys/adaptuota/kursai/*.json'):
    for v in json.load(open(f))['vizualai']:
        cards[v['id']] = v

for ep in sorted(glob.glob(R + '/lessons/*/epizodai.json')):
    d = os.path.dirname(ep); slug = os.path.basename(d); sc = d + '/video/scenarijus-lt.md'
    if not os.path.exists(sc):
        continue
    txt = open(sc).read(); bad = []
    for k in json.load(open(ep))['kadrai']:
        e = cards[k['epizodas']].get('explaineris', {})
        m = re.search(r'^\| %d .*?\| (\d+) sek\. \| %s' % (k['kadras'], re.escape(k['failas'])), txt, re.M)
        if not m or int(m.group(1)) != e.get('trukme_s'):
            bad.append(f"K{k['kadras']} scenarijus={m.group(1) if m else '?'} kortelė={e.get('trukme_s')}")
    print(slug, 'OK' if not bad else bad)
