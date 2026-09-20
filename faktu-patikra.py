#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Tos pačios temos filmukų faktinė patikra.

⛔ Kodėl (Eimantas 2026-09-20): „Google Sheets pradžiamokslis yra etaloninis pavyzdys.
   Integracijos filmukas ne visur sutampa su tuo, ką rodome pradžiamokslyje… vienur sakome
   vienaip, o kitur kitaip. Saugiklio nepainioti žiūrovo reikėtų.“

Kaip veikia — dviem lygiais:

  1. KIETA patikra (klaida): draudžiamos formuluotės ir terminų dubletai. Jei filmukas sako
     „celė“, kai visur kitur „langelis“, arba „kelias sekundes“, kai etalonas sako
     „akimirksniu“ — tai klaida, ir ją galima rasti mašina.

  2. MINKŠTA patikra (peržiūra): kiekvienam faktui surenkami VISŲ tos temos filmukų sakiniai
     ir parodomi vienas po kito su etalonu. Ar jie sako tą patį, sprendžia žmogus — mašina
     tik pastato juos greta, kad skirtumą būtų matyti iš karto.

Paleidimas:
    python3 faktu-patikra.py temos/google-sheets.json [--tik-klaidos]
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))


def sakiniai(pamoka, lang='lt'):
    """Filmuko sakiniai: balso tekstas ir ekrano užrašai."""
    out = []
    kelias = os.path.join(HERE, 'lessons', pamoka, 'video', f'balso-tekstas-{lang}.md')
    if os.path.exists(kelias):
        for l in open(kelias, encoding='utf-8'):
            m = re.match(r'- `\s*([\d.]+)`\s*(.+)', l)
            if m:
                out.append(('balsas ' + m.group(1) + ' s', m.group(2).strip()))
    turinys = os.path.join(HERE, 'lessons', pamoka, 'content', f'{lang}.json')
    if os.path.exists(turinys):
        d = json.load(open(turinys, encoding='utf-8'))
        for sekcija, laukai in d.items():
            if not isinstance(laukai, dict):
                continue
            for k, v in laukai.items():
                if isinstance(v, str) and len(v) > 12:
                    out.append(('ekranas ' + sekcija, v))
    return out


def tikrinti(temos_failas, tik_klaidos=False):
    t = json.load(open(temos_failas, encoding='utf-8'))
    etalonas = t['etalonas']
    filmukai = t['filmukai']
    tekstai = {p: sakiniai(p) for p in filmukai}
    klaidos = []

    print(f"Tema: {t['tema']} | etalonas: {etalonas} | filmukai: {len(filmukai)}\n")

    # --- 1. Terminų dubletai (kieta patikra)
    for teisingas, blogi in t.get('terminai', {}).items():
        for p, sak in tekstai.items():
            for vieta, s in sak:
                for b in blogi:
                    if re.search(r'\b%s\b' % re.escape(b), s, re.I):
                        klaidos.append((p, vieta, f'terminas „{b}“ — turi būti „{teisingas}“', s))

    # --- 2. Faktai
    for f in t['faktai']:
        rasta = {}
        for p, sak in tekstai.items():
            for vieta, s in sak:
                if any(r.lower() in s.lower() for r in f['raktai']):
                    rasta.setdefault(p, []).append((vieta, s))
        for p, eil in rasta.items():
            for vieta, s in eil:
                for d in f.get('draudziama', []):
                    if d.lower() in s.lower() and p != etalonas:
                        klaidos.append((p, vieta, f"{f['id']}: draudžiama formuluotė „{d}“", s))
        if tik_klaidos:
            continue
        print(f"── {f['id']}  {f['klausimas']}")
        print(f"   etalonas: {f['etalonas']}")
        for p in filmukai:
            zyme = '★' if p == etalonas else ' '
            if p not in rasta:
                print(f"   {zyme} {p}: — (apie tai nekalba)")
                continue
            for vieta, s in rasta[p][:3]:
                print(f"   {zyme} {p} [{vieta}]: {s[:110]}")
        print()

    # --- 3. Ataskaita
    if klaidos:
        print(f"⛔ Neatitikimų: {len(klaidos)}\n")
        for p, vieta, kas, s in klaidos:
            print(f"   {p} [{vieta}]")
            print(f"      {kas}")
            print(f"      „{s[:100]}“")
    else:
        print("✅ Kietų neatitikimų nerasta.")
    return 1 if klaidos else 0


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not args:
        print(__doc__)
        sys.exit(1)
    sys.exit(tikrinti(args[0], '--tik-klaidos' in sys.argv))
