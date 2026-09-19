#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Suderina scenarijaus laiko žymas su TIKRA balso trukme.

Planuojant kadrus balso ilgis apskaičiuojamas iš simbolių (CPS), o tikras Dariaus tempas
skiriasi nuo sakinio prie sakinio. Sugeneravus balsą lieka du darbai:
  1) pastumti žymas, kad sakinys neprasidėtų anksčiau, nei baigiasi ankstesnis;
  2) pailginti kadrus, kuriuose balsas nebetelpa.
Šis skriptas abu darbus padaro pagal `video/balsas-{lang}/manifest.json`.

⛔ Tekstai NEKEIČIAMI, todėl balso generuoti iš naujo nereikia — `generate-voice.js`
   ima jį iš kešo, o `build-video.js` žymas skaito iš scenarijaus.

Paleidimas:
    python3 sutvarkyti-laika.py {pamokos-katalogas} [--lang lt] [--tarpas 0.25] [--rasyti]

Be `--rasyti` tik parodo, ką keistų.
"""
import json
import os
import re
import sys

TARPAS = 0.25      # mažiausias tarpas tarp sakinių (s)
UODEGA = 0.4       # kiek tylos palikti kadro gale po paskutinio sakinio


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)
    katalogas = args[0]
    lang = args[args.index('--lang') + 1] if '--lang' in args else 'lt'
    tarpas = float(args[args.index('--tarpas') + 1]) if '--tarpas' in args else TARPAS
    rasyti = '--rasyti' in args

    manifestas = json.load(open(os.path.join(katalogas, 'video', f'balsas-{lang}', 'manifest.json'), encoding='utf-8'))
    scenos = json.load(open(os.path.join(katalogas, 'video', f'kadravimas-{lang}.json'), encoding='utf-8'))

    tikros = {}
    for it in manifestas['items']:
        tikros.setdefault(int(it['file'].split('-')[0][1:]), []).append(it['duration'])

    zymos, ilginti = [], []
    for i, s in enumerate(scenos, 1):
        cues = [c for c in s.get('cues', []) if c[1] == 'balsas']
        tr = tikros.get(i, [])
        pab = 0.0
        for j, (t, _, txt) in enumerate(cues):
            d = tr[j] if j < len(tr) else 0
            start = round(max(t, pab + tarpas if pab else t), 1)
            if abs(start - t) > 0.05:
                zymos.append((txt, t, start))
            pab = start + d
        reikia = pab + UODEGA
        if reikia > s['D']:
            ilginti.append((s['file'], s['D'], int(reikia) + 1))

    print(f'Žymų stumdoma: {len(zymos)} | kadrų ilginama: {len(ilginti)}')
    for f, d, n in ilginti:
        print(f'  {f:<22} {d} → {n} s')
    if not rasyti:
        print('\n(be --rasyti niekas nekeičiama)')
        return

    kelias = os.path.join(katalogas, 'build_scenes.py')
    src = open(kelias, encoding='utf-8').read()
    pritaikyta = 0
    for txt, sena, nauja in zymos:
        # šaltinyje laikas gali būti ir „6“, ir „6.0“
        pat = re.compile(r"s\.voice\((%s(?:\.0)?), ('|\")%s" % (re.escape('%g' % sena), re.escape(txt[:40])))
        m = pat.search(src)
        if not m:
            print(f'  ⛔ nerasta žyma {sena}: {txt[:40]}')
            continue
        ilgis = len(f"s.voice({m.group(1)}, ")
        src = src[:m.start()] + f"s.voice({'%g' % nauja}, " + src[m.start() + ilgis:]
        pritaikyta += 1
    for f, d, n in ilginti:
        pat = re.compile(r"(Scene\('%s',[^)]*?), %d\)" % (re.escape(f), d))
        if not pat.search(src):
            print(f'  ⛔ nerastas kadras {f} su D={d}')
            continue
        src = pat.sub(lambda mm: f'{mm.group(1)}, {n})', src, count=1)
    open(kelias, 'w', encoding='utf-8').write(src)
    print(f'\nĮrašyta: {pritaikyta}/{len(zymos)} žymų, {len(ilginti)} kadrų.')
    if ilginti:
        print('Perpiešti reikia tik šių kadrų klipus:')
        print('  node generate-video-clips.js --lesson {slug} --lang ' + lang
              + ' --only ' + ','.join(f for f, _, _ in ilginti))


if __name__ == '__main__':
    main()
