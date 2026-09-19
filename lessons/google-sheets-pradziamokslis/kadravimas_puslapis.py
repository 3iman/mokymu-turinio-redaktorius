# -*- coding: utf-8 -*-
"""Kadravimo puslapis (artifact) iš video/kadravimas-lt.json. Naudojimas: python3 kadravimas_puslapis.py <išvesties.html> <trukmė su skirtukais, pvz. 7:08>"""
import json, html, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
OUT, FULL = sys.argv[1], sys.argv[2]
STYLE = open(os.path.join(os.path.dirname(OUT), 'navigacijos-kadravimas.html'), encoding='utf-8').read()
STYLE = STYLE[STYLE.index('<link rel="stylesheet"'):STYLE.index('</style>')] + """
.shot{display:block;width:100%;border-radius:10px;border:1px solid var(--line);margin:0 0 10px;background:var(--surface);aspect-ratio:16/9;object-fit:cover;}
.h1line{font-family:"Bricolage Grotesque",sans-serif;font-weight:700;font-size:16px;margin:0 0 10px;}
.vl{display:grid;grid-template-columns:44px 1fr;gap:10px;margin:0 0 6px;}
.vl:last-child{margin-bottom:0;}
.vl code{font-family:ui-monospace,Menlo,monospace;font-size:12.5px;color:var(--muted);font-variant-numeric:tabular-nums;padding-top:3px;}
.vl p{margin:0;font-style:italic;}
.sfx{margin:8px 0 0;display:flex;flex-wrap:wrap;gap:6px;}
.sfx span{font-size:12.5px;color:var(--muted);background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:2px 9px;font-variant-numeric:tabular-nums;}
.check{margin:10px 0 0;font-size:14px;color:var(--mark);}
"""
data = json.load(open(os.path.join(HERE, 'video', 'kadravimas-lt.json'), encoding='utf-8'))
SFX = {'spustelejimas': 'spustelėjimas', 'paemimas': 'paėmimas', 'rasymas': 'rašymas'}
e = html.escape
total = sum(d['D'] for d in data)
ribbon = '<i class="edge" style="flex:5" title="Intro — 5 s"></i>' + ''.join(
    f'<i style="flex:{d["D"]}" title="{i:02d} {e(d["title"])} — {d["D"]} s"></i>' for i, d in enumerate(data, 1)) + '<i class="edge" style="flex:5" title="Outro — 5 s"></i>'
fr = ['<div class="frame"><div class="num">00<small>5 s</small></div><div><p class="ftitle">Intro</p><div class="screen"><span class="label">Ekrane</span>Google Sheets pradžiamokslis: <b>kaip tvarkyti mokyklos lenteles</b></div><p class="silent">Balso nėra.</p></div></div>']
for i, d in enumerate(data, 1):
    vh = ''.join(f'<div class="vl"><code>{c[0]:.1f}</code><p>{e(c[2])}</p></div>' for c in d['cues'] if c[1] == 'balsas')
    sx = [c for c in d['cues'] if c[1] == 'garsas']
    sh = ('<div class="sfx">' + ''.join(f'<span>{c[0]:.1f} · {SFX.get(c[2], c[2])}</span>' for c in sx) + '</div>') if sx else ''
    m = re.search(r'⛔\s*(PATIKRINTI.*)$', d.get('komentaras') or '')
    chk = f'<p class="check">⛔ {e(m.group(1).strip())}</p>' if m else ''
    fr.append(f'<div class="frame"><div class="num">{i:02d}<small>{d["D"]} s</small></div><div><p class="ftitle">{e(d["title"])}</p><p class="file">{e(d["file"])}.png</p>'
              f'<img class="shot" src="kadrai/{e(d["file"])}.jpg" alt="{e(d["h1"])}" loading="lazy"><p class="h1line">{e(d["h1"])}</p>'
              f'<div class="screen"><span class="label">Ekrane</span>{e(d["ekrane"])}</div><div class="voice"><span class="label">Balsas</span>{vh}{sh}</div>{chk}</div></div>')
fr.append('<div class="frame"><div class="num">21<small>5 s</small></div><div><p class="ftitle">Outro</p><div class="screen"><span class="label">Ekrane</span>Cleverphant vinjetė.</div><p class="silent">Balso nėra.</p></div></div>')
nv = sum(1 for d in data for c in d['cues'] if c[1] == 'balsas')
open(OUT, 'w', encoding='utf-8').write(f'''<title>Google Sheets pradžiamokslio kadravimas</title>
{STYLE}</style>
<div class="wrap">
  <h1>Google Sheets pradžiamokslio <span class="thin">kadravimas</span></h1>
  <div class="rule"></div>
  <p class="lead">Pamoka mokytojams, kurie Google Sheets dar nenaudojo. Kadrai jau nupiešti ir animuoti. Balsas suplanuotas sakinio tikslumu, bet dar negeneruotas.</p>
  <div class="meta">
    <span class="chip">Kadrų <b>{len(data)}</b></span><span class="chip">Be skirtukų <b>{total} s</b></span><span class="chip">Su skirtukais <b>~{FULL}</b></span>
    <span class="chip">Balso sakinių <b>{nv}</b></span><span class="chip">Balsas <b>Darius, eleven_v3_dpo — negeneruotas</b></span><span class="chip">Kalba <b>LT</b></span>
  </div>
  <div class="ribbon">{ribbon}</div>
  <p class="ribbon-legend">Juostos dalys atitinka kadrų trukmes. Šviesūs galai yra intro ir outro. Laikas prie sakinio skaičiuojamas nuo kadro pradžios.</p>
  {''.join(fr)}
  <div class="note"><h2>Kas dar nepadaryta</h2><ul>
    <li>Balsas negeneruotas: Dariaus balsą naudojame tik su Eimanto sutikimu.</li>
    <li>Tarimo žodynas papildytas: H2 — „haš du“, H3 — „haš trys“, TH — „tėė haš“, Gmail — „Džy meil“, ignore — angliškai (IPA, dar neišklausyta).</li>
    <li>Nepatikrinti lietuviški Google tekstai: „Jums reikia prieigos“, „Prašyti prieigos“, prieigos laiškas; kibirėlio ir volelio mygtukų pavadinimai.</li>
    <li>Nepatikrinta, ar tempiant ant užpildytų langelių Google klausia „pakeisti duomenis?“ (kadras 16).</li>
    <li>Išsiskleidžianti formulės juosta (kadras 14) ir spalvų paletė (kadras 19) nupieštos supaprastintai.</li>
  </ul></div>
</div>''')
print('ok', len(data), nv)
