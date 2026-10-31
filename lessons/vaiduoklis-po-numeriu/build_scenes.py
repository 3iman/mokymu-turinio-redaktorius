# -*- coding: utf-8 -*-
"""
„Vaiduoklis po numeriu" — scenų generatorius.

Vienas šaltinis visam filmukui: iš jo gimsta
  templates/*.html          — šablonai su {{kintamaisiais}}
  content/lt.json           — visi ekrano tekstai
  generate-video-clips.js   — animacijos (blokas tarp žymų VAIDUOKLIS)

PASAKOJIMO EIGA (Eimantas 2026-10-30): pradedama nuo to, kas iš tikrųjų atsitiko —
mokyklų svetainėse pamatėme telefono numerį su AŠTUONETU, pasitikrinome faktus
(aštuonetas išjungtas 2025-03-01), ir tik tada ėmėmės medžioklės. Medžioklėje
išlindo antras, nelauktas dalykas: numeris puslapyje yra DU sluoksniai — tekstas
tarp <a> žymų (jį skaito žmogus) ir nuoroda href (ją renka telefonas). Redaktoriuje
matomas tik pirmasis, todėl pataisius numerį apatinis lieka senas. Taip gimsta
„vaiduoklis". Paskutinis sluoksnis — nuraminimas: tai ne vienos mokyklos klaida.

Filmuko tikslas: kolektyvinė peržiūra mokykloje. Suprasti klaidą, jos priežastį
ir mechanizmą; pabaigoje — kad niekas nekaltas.

⛔ Ekrane rodomos MŪSŲ svetainės detalės (CP_* blokas): antraštė su logotipu,
prieinamumo juosta kairėje, „Titulinis" takelis, šoninis tamsus meniu, darbo laiko
lentelė. Ne abstrakčios dėžutės — žiūrovas turi atpažinti savo svetainę.

⛔ 16 nuorodų į demonstracinį šablono numerį filmuke NEMINIMOS (Eimantas): tai
tikrai klaida, ir ji mūsų, o filmukas kalba apie tendenciją, ne apie kaltę.

Spalvų semantika (tokens.css):
  gintarinė — sena forma / neatitikimas tarp sluoksnių
  violetinė — paslėptas sluoksnis (nuoroda); ne klaida, tiesiog nematoma vieta
  žalia     — sutapę sluoksniai, teisingas atvejis
⛔ Raudonos nenaudojame: filmukas sako „taip nutinka", ne „jūs suklydote".

⛔ Balse `href` NIEKADA netariamas — sakoma „nuoroda", o ekrane tuo metu matomas kodas.
Redaktoriaus juosta — TIKROS TVS nuotrauka (assets/iklijuotas-redaktorius-*).

Faktai apie aštuonetą (2 kadras) — Ryšių reguliavimo tarnyba:
  2024-03-01  šalia „8" pradeda veikti „0"; metus veikia abu
  2025-03-01  „8" išjungtas — numeris su juo nebesujungia
  „+370" veikė visą laiką ir veikia toliau
Patikrinta 2026-10-30: LRT 2025-03-01 „Telefono numerių pradžioje nebelieka
aštuoneto, pradeda galioti kodas su nuliu"; RRT pranešimai per alkas.lt, LRT.

Skaičiai — 2026-10-29/30 skenas, 255 gyvos svetainės. Mokyklos nevardijamos.

Paleidimas: python3 build_scenes.py
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ILL = os.path.abspath(os.path.join(HERE, '..', '..'))
CUR = json.load(open(os.path.join(HERE, '..', 'google-sheets-pradziamokslis', 'cursor_svgs.json'), encoding='utf-8'))

CONTENT = {"lang": "lt", "_intro": {"title": "Vaiduoklis po numeriu"}}
ANIMS = {}

# ---------------------------------------------------------------- istorijos duomenys
ASTUONI = '8 46 497 915'         # 1 kadras: numeris sena forma, kaip radome svetainėje
SENAS = '+370 46 497 915'        # tas pats numeris nauja forma — jis liko nuorodoje
NAUJAS = '+370 686 18256'        # numeris, kurį mokykla įrašė vietoj seno
TEL_SEN = 'tel:+37046497915'
TEL_NAU = 'tel:+37068618256'
KOPIJA = '+370 421 42435'        # kopijavimo kadras: numeris, atkeliavęs su bloku
SAVAS_K = '+370 687 85572'       # kopijavimo kadras: numeris, įrašytas matomame tekste
TEL_KOP = 'tel:+37042142435'

SKEN = 255                       # patikrintos svetainės
RASTA = 137                      # svetainės, kuriose kažkas rasta

# redaktoriaus juosta — tikros TVS nuotraukos matavimai
TB_W = 1936
TB_BTN = {'link': (446, 74), 'tx': (791, 29)}


def kf(name, D, steps, prop_fn):
    """Laiko žymos → @keyframes procentais. steps: [(t, reikšmė), …]."""
    rows = ['0%% { %s }' % prop_fn(steps[0][1])]
    for t, v in steps:
        rows.append('%.3f%% { %s }' % (100.0 * t / D, prop_fn(v)))
    rows.append('100%% { %s }' % prop_fn(steps[-1][1]))
    return '@keyframes %s { %s }' % (name, ' '.join(rows))


def timeline(a, prefix, D, sel, prop, steps):
    nm = prefix + '_' + re.sub(r'[^a-z0-9]', '', (sel + prop).lower())
    a.append('%s { animation: %s %ss linear 0s both; }' % (sel, nm, D))
    a.append(kf(nm, D, steps, lambda v: '%s: %s;' % (prop, v)))


def timelines(a, prefix, D, sel, specs):
    """Kelios savybės VIENAM selektoriui — viena `animation` deklaracija.
    ⛔ Du atskiri `timeline()` tam pačiam selektoriui nustumia vienas kitą (CSS kaskada),
    ir viena animacija dingsta be jokios klaidos."""
    names = []
    for prop, steps in specs:
        nm = prefix + '_' + re.sub(r'[^a-z0-9]', '', (sel + prop).lower())
        names.append('%s %ss linear 0s both' % (nm, D))
        a.append(kf(nm, D, steps, (lambda p: (lambda v: '%s: %s;' % (p, v)))(prop)))
    a.append('%s { animation: %s; }' % (sel, ', '.join(names)))


def cursor_anim(a, nm, D, path):
    a.append('.cur { animation: %s %ss linear 0s both; }' % (nm, D))
    a.append(kf(nm, D, path, lambda p: 'transform: translate(%spx, %spx); animation-timing-function: cubic-bezier(.35,.05,.25,1);' % (p[0], p[1])))


def head(a):
    a.append('.card > .title { opacity: 0; animation: fadeUpHeavy 0.6s var(--ease-spring) 0.12s forwards; }')


def page(css, body):
    return ('<!DOCTYPE html>\n<html lang="{{lang}}">\n<head>\n<meta charset="UTF-8">\n'
            '<link rel="stylesheet" href="./tokens/tokens.css">\n'
            '<link rel="stylesheet" href="./tokens/base.css">\n'
            '<style>%s</style>\n</head>\n<body>\n  <div class="card">\n%s\n  </div>\n</body>\n</html>\n' % (css, body))


def write_template(name, html):
    os.makedirs(os.path.join(HERE, 'templates'), exist_ok=True)
    open(os.path.join(HERE, 'templates', name + '.html'), 'w', encoding='utf-8').write(html)


# ---------------------------------------------------------------- bendri gabalai
BASE_CSS = """
  .card { padding: 46px 110px 56px; }
  .title { margin-bottom: 36px; }
  .cur { position: absolute; left: 0; top: 0; z-index: 9; width: 46px; height: 58px; }
  .cur svg { width: 46px; height: 58px; }
  .rip { position: absolute; z-index: 8; width: 70px; height: 70px; margin: -35px 0 0 -35px; border-radius: 50%;
         background: rgba(124, 58, 237, .40); opacity: 0; }
  @keyframes ratilas { from { opacity: .85; transform: scale(.3); } to { opacity: 0; transform: scale(1.7); } }
"""

# --- MŪSŲ svetainė: tai, ką žiūrovas atpažįsta savo ekrane -------------------
# antraštė su logotipu ir meniu juosta, prieinamumo mygtukai kairėje,
# „Titulinis" takelis, tamsus šoninis meniu, darbo laiko lentelė.
CP_CSS = """
  .cp { position: relative; border-radius: 16px; overflow: hidden; background: #fff;
        box-shadow: 0 26px 60px rgba(15, 23, 42, .16); border: 1px solid var(--c-border); }
  .cp-bar { height: 54px; background: #e9edf3; display: flex; align-items: center; padding: 0 20px; gap: 10px; }
  .cp-bar .d { width: 13px; height: 13px; border-radius: 50%; background: #c6ccd6; }
  .cp-url { flex: 1; margin-left: 16px; height: 32px; border-radius: 16px; background: #fff; border: 1px solid #d6dbe3;
            display: flex; align-items: center; padding: 0 16px; font-size: 19px; color: var(--c-text-muted); }
  .cp-head { height: 76px; background: var(--mok); display: flex; align-items: center; padding: 0 30px; gap: 18px; }
  .cp-logo { width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,.14);
             border: 2px solid rgba(255,255,255,.45); flex: none; }
  .cp-name { color: #fff; font-size: 19px; font-weight: 700; letter-spacing: 1.7px; }
  .cp-top { margin-left: auto; display: flex; gap: 20px; }
  .cp-top i { display: block; width: 84px; height: 10px; border-radius: 5px; background: rgba(255,255,255,.34); }
  .cp-nav { height: 48px; background: var(--mok-d); display: flex; align-items: center; gap: 30px; padding: 0 30px; }
  .cp-nav i { display: block; height: 10px; border-radius: 5px; background: rgba(255,255,255,.30); }
  .cp-wrap { display: flex; background: #fff; }
  .cp-a11y { width: 56px; padding: 26px 0; display: flex; flex-direction: column; align-items: center; gap: 18px;
             border-right: 1px solid #eef1f5; flex: none; }
  .cp-a11y span { width: 34px; height: 34px; border-radius: 50%; background: #f1f3f7;
                  display: flex; align-items: center; justify-content: center; }
  .cp-a11y svg { width: 18px; height: 18px; display: block; }
  .cp-main { flex: 1; padding: 24px 40px 32px; min-width: 0; }
  .cp-crumb { font-size: 20px; color: #a8b0bd; border-bottom: 1px solid #edf0f4; padding-bottom: 16px; margin-bottom: 22px; }
  .cp-h1 { font-size: 48px; font-weight: 800; color: #2a2a2a; margin-bottom: 24px; }
  .cp-sub { font-size: 28px; font-weight: 700; color: #2a2a2a; margin: 22px 0 12px; }
  .cp-line { font-size: 27px; color: #5f5f5f; margin-bottom: 10px; }
  .cp-tel { color: var(--mok); text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 7px; }
  .cp-tbl { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 22px; }
  .cp-tbl th { background: var(--mok); color: #fff; text-align: left; font-weight: 600; padding: 11px 18px; }
  .cp-tbl td { border-bottom: 1px solid #e9edf2; color: #6b7280; padding: 10px 18px; }
  .cp-side { width: 292px; background: #2f3640; flex: none; }
  .cp-side .it { display: flex; align-items: center; gap: 14px; padding: 16px 20px;
                 border-bottom: 1px solid rgba(255,255,255,.08); }
  .cp-side .it b { width: 21px; height: 21px; border-radius: 5px; background: rgba(255,255,255,.34); flex: none; }
  .cp-side .it i { display: block; height: 10px; border-radius: 5px; background: rgba(255,255,255,.26); }
"""

A11Y_SVG = (
    '<span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#5f6b7a" stroke-width="2"/>'
    '<path d="M12 3a9 9 0 0 0 0 18z" fill="#5f6b7a"/></svg></span>'
    '<span><svg viewBox="0 0 24 24"><path d="M5 7V5h14v2M12 5v14M9 19h6" fill="none" stroke="#5f6b7a" '
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
    '<span><svg viewBox="0 0 24 24" fill="none" stroke="#5f6b7a" stroke-width="2" stroke-linecap="round">'
    '<path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1 1"/>'
    '<path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1-1"/></svg></span>')

SIDE_ITEMS = (210, 268, 166, 240, 150, 196, 224)


def cp_side():
    return ''.join('<div class="it"><b></b><i style="width:%dpx"></i></div>' % w for w in SIDE_ITEMS)


def cp_nav(widths=(96, 140, 118, 164, 104, 132)):
    return ''.join('<i style="width:%dpx"></i>' % w for w in widths)


def cp_chrome(url, name_txt):
    """Naršyklės juosta + mokyklos antraštė — vienodos visuose kadruose."""
    return ('<div class="cp-bar"><span class="d"></span><span class="d"></span><span class="d"></span>'
            '<div class="cp-url">' + url + '</div></div>'
            '<div class="cp-head"><div class="cp-logo"></div><div class="cp-name">' + name_txt + '</div>'
            '<div class="cp-top"><i></i><i></i></div></div>'
            '<div class="cp-nav">' + cp_nav() + '</div>')


BW_CSS = """
  .bw { position: relative; border-radius: 16px; overflow: hidden; background: #fff;
        box-shadow: 0 26px 60px rgba(15, 23, 42, .16); border: 1px solid var(--c-border); }
  .bw-bar { height: 50px; background: #e9edf3; display: flex; align-items: center; padding: 0 18px; gap: 9px; }
  .bw-bar .d { width: 12px; height: 12px; border-radius: 50%; background: #c6ccd6; }
  .bw-url { flex: 1; margin-left: 14px; height: 30px; border-radius: 15px; background: #fff; border: 1px solid #d6dbe3;
            display: flex; align-items: center; padding: 0 14px; font-size: 18px; color: var(--c-text-muted); }
  .bw-head { height: 44px; background: var(--mok); display: flex; align-items: center; gap: 12px; padding: 0 16px; }
  .bw-head .lg { width: 26px; height: 26px; border-radius: 50%; background: rgba(255,255,255,.22);
                 border: 1.5px solid rgba(255,255,255,.45); }
  .bw-head i { display: block; height: 8px; border-radius: 4px; background: rgba(255,255,255,.32); }
  .bw-page { background: #fff; padding: 26px 30px; }
  .s-card { background: #fff; border: 1px solid var(--c-border); border-radius: 12px; padding: 22px 26px; }
  .s-h { font-size: 30px; font-weight: 700; color: #2a2a2a; margin-bottom: 16px; }
  .s-row { display: flex; align-items: baseline; gap: 16px; margin-bottom: 12px; font-size: 26px; color: #5f5f5f; }
  .s-tel { color: var(--mok); text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 6px; }
"""

LAY_CSS = """
  .lay { width: 1480px; margin: 0 auto; display: grid; gap: 28px; position: relative; }
  .pan { border-radius: 20px; padding: 28px 40px 30px; box-shadow: var(--c-shadow-card); position: relative; }
  .pan-t { background: var(--c-surface); border: 1.5px solid var(--c-border); }
  .pan-b { background: #1e293b; }
  .lbl { font-size: 25px; font-weight: 700; color: var(--c-text-secondary); margin-bottom: 16px; }
  .pan-b .lbl { color: #cbd5e1; }
  .num { font-size: 64px; font-weight: 700; color: var(--c-text); letter-spacing: 1px; }
  .num.link { color: #2563eb; text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 11px; }
  .code { font-family: 'SF Mono', Menlo, monospace; font-size: 36px; line-height: 1.45; color: #e2e8f0; white-space: nowrap; }
  .tg { color: #93c5fd; }
  .hl { border-radius: 6px; padding: 2px 9px; }
  .hl-h { background: rgba(167,139,250,.38); color: #ede9fe; }
  .hl-t { background: rgba(110,231,183,.26); color: #d1fae5; }
  .note { font-size: 26px; font-weight: 600; margin-top: 16px; }
  .pan-t .note { color: var(--c-green-text); }
  .pan-b .note { color: #c4b5fd; }
"""

PHONE_CSS = """
  .ph { width: 430px; height: 840px; border-radius: 52px; background: #111827; padding: 16px;
        box-shadow: 0 30px 70px rgba(15, 23, 42, .28); position: relative; }
  .ph-in { width: 100%; height: 100%; border-radius: 38px; background: #f7f8fa; overflow: hidden; position: relative;
           display: flex; flex-direction: column; }
  .ph-top { height: 56px; background: #111827; }
  .dial { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px;
          background: #1f2937; }
  .dial-lbl { font-size: 26px; color: #9ca3af; letter-spacing: 1px; }
  .dial-num { font-size: 46px; font-weight: 700; color: #fff; }
  .dial-ico { width: 104px; height: 104px; border-radius: 50%; background: var(--c-green-solid);
              display: flex; align-items: center; justify-content: center; margin-top: 14px; }
  .dial-ico svg { width: 52px; height: 52px; }
"""

# mokyklos firminė spalva — neutralus tamsus žalsvai mėlynas; ne raudona
MOK_CSS = """
  .card { --mok: #1f5a63; --mok-d: #17474f; }
"""

TEL_SVG = ('<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round">'
           '<path d="M6.6 3.5h3.1l1.6 4-2 1.3a12 12 0 0 0 5.9 5.9l1.3-2 4 1.6v3.1a1.5 1.5 0 0 1-1.7 1.5'
           'A17 17 0 0 1 5.1 5.2 1.5 1.5 0 0 1 6.6 3.5z"/></svg>')

CHECK_SVG = ('<svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" '
             'stroke-linejoin="round"><path d="M4 12.5l5.5 5.5L20 6.5"/></svg>')

LOCK_SVG = ('<svg viewBox="0 0 24 24" fill="none" stroke="#166534" stroke-width="2" stroke-linecap="round">'
            '<rect x="4" y="10.5" width="16" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>')


def anchor_code(href, text, h_cls='hl hl-h', t_cls='hl hl-t'):
    return ('<span class="tg">&lt;a href="</span><span class="%s">%s</span><span class="tg">"&gt;</span>'
            '<span class="%s">%s</span><span class="tg">&lt;/a&gt;</span>' % (h_cls, href, t_cls, text))


# --- tinklelis: 255 svetainės vienu žvilgsniu --------------------------------
GRID_COLS, GRID_W, GRID_H, GRID_GAP = 17, 82, 36, 7
RASTA_IDX = [i for i in range(SKEN) if (i * 97) % SKEN < RASTA]   # 137 iš 255, tolygiai


def grid_html(extra_cls=''):
    out = []
    for i in range(SKEN):
        row, col = divmod(i, GRID_COLS)
        cls = 'tl t%d' % i
        if i in RASTA_IDX:
            cls += ' hit'
        out.append('<div class="%s%s" style="left:%dpx; top:%dpx"></div>'
                   % (cls, extra_cls, col * (GRID_W + GRID_GAP), row * (GRID_H + GRID_GAP)))
    return ''.join(out)


GRID_CSS = """
  .grid { position: relative; width: %dpx; height: %dpx; margin: 0 auto; }
  .tl { position: absolute; width: %dpx; height: %dpx; border-radius: 6px; background: var(--c-surface);
        border: 1.5px solid var(--c-border); overflow: hidden; }
  .tl::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 9px; background: #ccd4de; }
  .tl::after { content: ''; position: absolute; left: 9px; width: 46px; top: 18px; height: 4px; border-radius: 2px;
               background: #e4e9ef; box-shadow: 0 9px 0 -1px #eaeef3; }
""" % (GRID_COLS * (GRID_W + GRID_GAP) - GRID_GAP,
       ((SKEN + GRID_COLS - 1) // GRID_COLS) * (GRID_H + GRID_GAP) - GRID_GAP,
       GRID_W, GRID_H)


# ---------------------------------------------------------------- 01 Pamatėme aštuonetą
def scene_01():
    """Mūsų svetainės PORAŠTĖ su rekvizitais — ten, kur telefonas stovi oficialiai.
    Eimantas 2026-10-30: akcentuoti ne kontaktų puslapį, o poraštės rekvizitus;
    apačioje — Cleverphant ženklas, kaip ir tikroje svetainėje."""
    name, D = '01-astuonetas', 14
    COLS = (("Gimnazija", ("Apie gimnaziją", "Ugdymo aplinka", "Vizija ir misija",
                           "Pasiekimai", "Tradiciniai renginiai")),
            ("Paslaugos", ("Neformalusis švietimas", "Pagalba mokiniams", "Mokinių pavėžėjimas",
                           "Mokinių maitinimas", "Biblioteka")),
            ("Ataskaitos", ("Biudžeto vykdymo ataskaitos", "Finansinių ataskaitų rinkiniai",
                            "Projektai", "Viešieji pirkimai", "1,2 proc. parama")),
            ("Informacija", ("Nuorodos", "Laisvos darbo vietos", "Asmens duomenų apsauga",
                             "Pranešėjų apsauga", "Civilinė sauga")))
    CONTENT[name.replace('-', '_')] = dict(
        title="Pamatėme aštuonetą", url="miesto-gimnazija.lt", mok="MIESTO GIMNAZIJA",
        err_h="Pastebėjote klaidų?", err_s="Turite pasiūlymų?", err_b="RAŠYKITE",
        soc="Bendraukime", steig="Steigėjas", steig_v="Miesto savivaldybė",
        r_name="Miesto gimnazija", r_tipas="Savivaldybės biudžetinė įstaiga",
        r_adr="Mokyklos g. 1, 00000 Miestas", r_tel_k="Tel.", r_tel=ASTUONI,
        r_el_k="El. p.", r_el="rastine@miesto-gimnazija.lt",
        r_reg1="Duomenys kaupiami ir saugomi", r_reg2="Juridinių asmenų registre",
        r_kod="Įmonės kodas 000000000",
        cp1="© 2026. Miesto gimnazija. Visos teisės saugomos.",
        cp2="Kopijuoti turinį be raštiško sutikimo draudžiama.",
        lnk1="Prieinamumo paraiška", lnk2="Slapukų valdymas",
        clv="Sumanus būdas atnaujinti mokyklos interneto svetainę", flag="senoji forma")
    cols = ''.join('<div class="fc"><div class="fc-h">%s</div>%s</div>'
                   % (h, ''.join('<div class="fc-i">%s</div>' % t for t in items))
                   for h, items in COLS)
    soc = ''.join('<span class="sc" style="background:%s"></span>' % c
                  for c in ('#3b5998', '#c4302b', '#c13584', '#6b7280', '#0a66c2'))
    body = ("""    <div class="title">{{title}}</div>
    <div class="wrap">
      <div class="cp">
        <div class="cp-bar"><span class="d"></span><span class="d"></span><span class="d"></span>
          <div class="cp-url">{{url}}</div></div>
        <div class="fade"><div class="fb"></div><div class="fb"></div><div class="fb"></div></div>
        <div class="ftr">
          <div class="fcols">""" + cols + """</div>
          <div class="fmid">
            <div class="fm1"><div class="fm-h">{{err_h}}</div><div class="fm-s">{{err_s}}</div>
              <div class="btn">{{err_b}}</div></div>
            <div class="fm2"><div class="fm-h">{{soc}}</div><div class="socs">""" + soc + """</div></div>
            <div class="fm3"><div class="herb"></div><div><div class="fm-h">{{steig}}</div>
              <div class="fm-s">{{steig_v}}</div></div></div>
            <div class="rekv">
              <div class="rk-n">{{r_name}}</div>
              <div class="rk-l">{{r_tipas}}</div>
              <div class="rk-l">{{r_adr}}</div>
              <div class="rk-l">{{r_tel_k}} <a class="rk-a ring" href="#">{{r_tel}}</a><span class="flag">{{flag}}</span></div>
              <div class="rk-l">{{r_el_k}} <a class="rk-a" href="#">{{r_el}}</a></div>
              <div class="rk-l rk-s">{{r_reg1}}</div>
              <div class="rk-l rk-s">{{r_reg2}}</div>
              <div class="rk-l rk-s">{{r_kod}}</div>
            </div>
          </div>
          <div class="fbot">
            <div class="fb-l"><div>{{cp1}}</div><div>{{cp2}}</div></div>
            <div class="fb-c"><span>{{lnk1}}</span><span>{{lnk2}}</span></div>
            <div class="fb-r"><span class="fb-t">{{clv}}</span>
              <img class="clv" src="assets/cleverphant-juodas.svg" alt="Cleverphant"></div>
          </div>
        </div>
      </div>
      <div class="cur">""" + CUR['arrow'] + """</div>
    </div>""")
    css = BASE_CSS + MOK_CSS + """
  .card { padding: 40px 100px 44px; }
  .title { margin-bottom: 30px; }
  .wrap { position: relative; width: 1700px; margin: 0 auto; }
  .cp { position: relative; border-radius: 16px; overflow: hidden; background: #fff;
        box-shadow: 0 26px 60px rgba(15, 23, 42, .16); border: 1px solid var(--c-border); }
  .cp-bar { height: 54px; background: #e9edf3; display: flex; align-items: center; padding: 0 20px; gap: 10px; }
  .cp-bar .d { width: 13px; height: 13px; border-radius: 50%; background: #c6ccd6; }
  .cp-url { flex: 1; margin-left: 16px; height: 32px; border-radius: 16px; background: #fff; border: 1px solid #d6dbe3;
            display: flex; align-items: center; padding: 0 16px; font-size: 19px; color: var(--c-text-muted); }
  .fade { height: 92px; background: #fff; padding: 0 44px; display: flex; gap: 22px; align-items: flex-end;
          -webkit-mask-image: linear-gradient(#fff0, #fff); mask-image: linear-gradient(#fff0, #fff); }
  .fb { flex: 1; height: 62px; background: #eef1f5; border-radius: 10px; }
  .ftr { background: #eef0f3; padding: 34px 44px 0; }
  .fcols { display: flex; gap: 36px; padding-bottom: 28px; border-bottom: 1px solid #dfe3e9; }
  .fc { flex: 1; }
  .fc-h { font-size: 24px; font-weight: 700; color: #2a2a2a; margin-bottom: 16px; }
  .fc-i { font-size: 21px; color: #6b7280; margin-bottom: 11px; padding-left: 18px; position: relative; }
  .fc-i::before { content: ''; position: absolute; left: 0; top: 9px; width: 6px; height: 6px;
                  border-top: 2px solid var(--mok); border-right: 2px solid var(--mok); transform: rotate(45deg); }
  .fmid { display: flex; gap: 40px; padding: 30px 0 32px; border-bottom: 1px solid #dfe3e9; }
  .fm1, .fm2 { width: 300px; }
  .fm3 { width: 320px; display: flex; align-items: center; gap: 18px; }
  .fm-h { font-size: 24px; font-weight: 700; color: #2a2a2a; margin-bottom: 8px; }
  .fm-s { font-size: 21px; color: #6b7280; }
  .btn { margin-top: 18px; width: 190px; height: 48px; border-radius: 6px; background: #c9ced6; color: #fff;
         font-size: 19px; font-weight: 700; letter-spacing: 1px; display: flex; align-items: center;
         justify-content: center; }
  .socs { display: flex; gap: 12px; margin-top: 14px; }
  .sc { width: 40px; height: 40px; border-radius: 7px; display: block; opacity: .85; }
  .herb { width: 62px; height: 74px; flex: none; border-radius: 6px 6px 31px 31px; background: #d6dbe2; }
  .rekv { flex: 1; min-width: 0; }
  .rk-n { font-size: 23px; font-weight: 700; color: #2a2a2a; margin-bottom: 8px; }
  .rk-l { font-size: 22px; color: #6b7280; margin-bottom: 7px; }
  .rk-s { color: #949aa5; }
  .rk-a { color: var(--mok); text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 5px; }
  .ring { border-radius: 6px; outline: 4px solid var(--c-amber-solid); outline-offset: 5px; margin-left: 6px; }
  .flag { margin-left: 30px; background: var(--c-amber-bg); border: 2px solid var(--c-amber-border);
          color: var(--c-amber-text); font-size: 20px; font-weight: 700; padding: 4px 16px; border-radius: 999px;
          white-space: nowrap; }
  .fbot { display: flex; align-items: center; gap: 40px; padding: 24px 0 26px; }
  .fb-l { flex: 1; font-size: 18px; color: #9aa1ab; line-height: 1.5; }
  .fb-c { display: flex; gap: 30px; font-size: 19px; color: #6b7280; }
  .fb-r { display: flex; align-items: center; gap: 18px; }
  .fb-t { font-size: 17px; color: #9aa1ab; width: 250px; line-height: 1.35; text-align: right; }
  .clv { height: 34px; display: block; }
  .cur { transform: translate(1560px, 700px); }
"""
    write_template(name, page(css, body))
    a = []
    head(a)
    a.append('.cp { opacity: 0; animation: fadeUpMedium 0.6s var(--ease-spring) 0.4s forwards; }')
    cursor_anim(a, 'k01', D, [(0, (900, 820)), (2.6, (900, 820)), (5.0, (1138, 556)), (8.4, (1142, 560)), (12.4, (1560, 700))])
    timeline(a, 'm01', D, '.ring', 'outline-color', [(5.6, 'transparent'), (6.3, 'var(--c-amber-solid)'), (13.4, 'var(--c-amber-solid)')])
    timeline(a, 'm01', D, '.flag', 'opacity', [(8.2, '0'), (8.9, '1'), (13.4, '1')])
    a.append('.flag { animation: iconPulse 1.5s var(--ease-soft) 9.4s 2; }')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 02 Ar aštuonetas dar galioja
def scene_02():
    name, D = '02-ar-galioja', 23
    CONTENT[name.replace('-', '_')] = dict(
        title="Ar aštuonetas dar galioja?",
        d1="2024 m. kovo 1 d.", t1="šalia aštuoneto pradeda veikti nulis",
        mid="metus veikia abu",
        d2="2025 m. kovo 1 d.", t2="aštuonetas išjungtas",
        bad_l="Nebesujungia", bad_n=ASTUONI,
        good_l="Veikia", good_n=SENAS, good_n2="0 46 497 915",
        src="Šaltinis: Ryšių reguliavimo tarnyba")
    body = """    <div class="title">{{title}}</div>
    <div class="tl">
      <div class="tl-rail"></div>
      <div class="tn na"><span class="dot"></span><b>{{d1}}</b><i>{{t1}}</i></div>
      <div class="tm">{{mid}}</div>
      <div class="tn nb"><span class="dot dot-off"></span><b>{{d2}}</b><i>{{t2}}</i></div>
    </div>
    <div class="duo">
      <div class="cc c-bad"><div class="cc-l">{{bad_l}}</div><div class="cc-n">{{bad_n}}</div></div>
      <div class="cc c-good"><div class="cc-l">{{good_l}}</div><div class="cc-n">{{good_n}}</div>
        <div class="cc-n2">{{good_n2}}</div></div>
    </div>
    <div class="src">{{src}}</div>"""
    css = BASE_CSS + """
  .tl { position: relative; width: 1540px; margin: 10px auto 70px; display: flex; align-items: flex-start;
        justify-content: space-between; }
  .tl-rail { position: absolute; left: 215px; right: 215px; top: 15px; height: 4px; border-radius: 2px;
             background: var(--c-line); }
  .tn { width: 470px; text-align: center; position: relative; }
  .tm { width: 420px; text-align: center; padding-top: 44px; font-size: 25px; color: var(--c-text-muted); }
  .dot { display: block; width: 34px; height: 34px; border-radius: 50%; margin: 0 auto 22px;
         background: var(--c-amber-solid); box-shadow: 0 0 0 7px var(--c-amber-bg); }
  .dot-off { background: #475569; box-shadow: 0 0 0 7px #e4e8ee; }
  .tn b { display: block; font-size: 32px; font-weight: 800; color: var(--c-text); margin-bottom: 10px; }
  .tn i { display: block; font-style: normal; font-size: 26px; color: var(--c-text-muted); }
  .duo { display: flex; gap: 46px; justify-content: center; }
  .cc { width: 640px; border-radius: 20px; padding: 28px 36px 32px; box-shadow: var(--c-shadow-card); }
  .c-bad { background: var(--c-amber-bg); border: 2px solid var(--c-amber-border); }
  .c-good { background: var(--c-green-bg); border: 2px solid var(--c-green-border); }
  .cc-l { font-size: 26px; font-weight: 700; margin-bottom: 14px; }
  .c-bad .cc-l { color: var(--c-amber-text); }
  .c-good .cc-l { color: var(--c-green-text); }
  .cc-n { font-size: 52px; font-weight: 800; color: var(--c-text); letter-spacing: 1px; }
  .cc-n2 { font-size: 36px; font-weight: 700; color: var(--c-text-secondary); margin-top: 10px; }
  .c-bad .cc-n { text-decoration: line-through; text-decoration-thickness: 4px; color: var(--c-text-muted); }
  .src { text-align: center; font-size: 23px; color: var(--c-text-faint); margin-top: 34px; }
"""
    write_template(name, page(css, body))
    a = []
    head(a)
    timeline(a, 'm02', D, '.tl-rail', 'opacity', [(0.6, '0'), (1.3, '1'), (22.4, '1')])
    a.append('.na { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 1.8s forwards; }')
    a.append('.tm { opacity: 0; animation: fadeIn 0.5s linear 4.6s forwards; }')
    a.append('.nb { opacity: 0; animation: fadeUpMedium 0.5s var(--ease-spring) 7.6s forwards; }')
    a.append('.nb .dot { animation: iconPulse 1.5s var(--ease-soft) 8.4s 2; }')
    a.append('.c-bad { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 11.6s forwards; }')
    a.append('.c-good { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 15.4s forwards; }')
    timeline(a, 'm02', D, '.src', 'opacity', [(19.4, '0'), (20.1, '1'), (22.4, '1')])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 03 Pynė: kas vyksta tinkle
# ⛔ Eimantas 2026-10-30: „Video rodome mūsų kitus planus, tai nerodykime." — kortelių juosta
# su būsimais darbais išimta. Vietoj jos — PYNĖ iš cleverphant.lt hero („pynė per simbolio
# arteriją"): į kairę įeina susivėlusios juostos, pereina pro simbolį, dešinėje ištiesėja.
# Brand paletė iš design.webas.lt/clvweb: navy #3464ad, teal #3ab0b0, pink #f3a8c4,
# lavanda #c6b8db, triukšmas pilkas.
BRAND = dict(navy='#3464ad', teal='#3ab0b0', pink='#f3a8c4', lav='#c6b8db',
             noise='#ccd6e0', noise2='#bcc8d4', ink='#1a1a1a', gray='#646b77')

import math


def smoothstep(a, b, x):
    t = max(0.0, min(1.0, (x - a) / float(b - a)))
    return t * t * (3 - 2 * t)


BRAID = dict(n=19, x0=140, x1=1790, cy=560, xg=1090, step=14)


def braid_paths():
    """Juostos: kairėje susivėlusios, pro vartus ištiesėja į lygiagrečias linijas.
    Kiekvienai grąžinama ir atkarpa PO vartų — ja piešiamas radinys, kad gintarinė
    spalva atsirastų tik praėjus patikrą, o ne nuo pat pradžių."""
    n, x0, x1, cy, xg, step = (BRAID[k] for k in ('n', 'x0', 'x1', 'cy', 'xg', 'step'))
    out = []
    lanes = [(-1 + 2.0 * i / (n - 1)) * 196 for i in range(n)]
    for i in range(n):
        spread = (-1 + 2.0 * i / (n - 1)) * 238
        amp = 34 + ((i * 37) % 61)
        lam = 210 + ((i * 83) % 230)
        ph = (i * 1.37) % (2 * math.pi)
        pts, L, px, py = [], 0.0, None, None
        pts2, L2, qx, qy = [], 0.0, None, None
        x = x0
        while x <= x1:
            u = smoothstep(xg - 300, xg + 130, x)
            y = cy + (1 - u) * (spread + amp * math.sin(2 * math.pi * x / lam + ph)) + u * lanes[i]
            if px is not None:
                L += math.hypot(x - px, y - py)
            pts.append('%.1f %.1f' % (x, y))
            px, py = x, y
            if x >= xg - 30:
                if qx is not None:
                    L2 += math.hypot(x - qx, y - qy)
                pts2.append('%.1f %.1f' % (x, y))
                qx, qy = x, y
            x += step
        out.append(dict(d='M' + ' L'.join(pts), len=L, d2='M' + ' L'.join(pts2), len2=L2,
                        lane=lanes[i]))
    return out


def scene_03():
    name, D = '03-tinkle', 17
    CONTENT[name.replace('-', '_')] = dict(
        title="Peržiūrėjome, kas vyksta tinkle", gate="Patikra",
        cap=str(SKEN) + " svetainių · viena patikra", flag="rasta")
    paths = braid_paths()
    n = len(paths)
    SAVOS = {4: BRAND['navy'], 9: BRAND['teal'], 14: BRAND['lav']}   # mūsų juostos
    RADINIAI = (2, 11, 16)                                            # radiniai — tik PO vartų
    svg = []
    for i, pt in enumerate(paths):
        col = SAVOS.get(i, BRAND['noise'] if i % 2 else BRAND['noise2'])
        w = 5.5 if i in SAVOS else 3.2
        svg.append('<path class="st s%d" d="%s" stroke="%s" stroke-width="%.1f" '
                   'style="--dash:%.0f" />' % (i, pt['d'], col, w, pt['len'] * 1.06))
    for j, i in enumerate(RADINIAI):
        pt = paths[i]
        svg.append('<path class="hit h%d" d="%s" stroke="var(--c-amber-solid)" stroke-width="5.5" '
                   'style="--dash:%.0f" />' % (j, pt['d2'], pt['len2'] * 1.06))
        svg.append('<circle class="hd h%d" cx="%d" cy="%.1f" r="10" fill="var(--c-amber-solid)" />'
                   % (j, BRAID['x1'], BRAID['cy'] + pt['lane']))
    flag_top = BRAID['cy'] + paths[RADINIAI[0]]['lane'] - 130 - 58
    body = """    <div class="title">{{title}}</div>
    <div class="band">
      <svg class="braid" viewBox="0 0 1920 1120">%s</svg>
      <div class="gate"><img src="assets/cleverphant-simbolis-spalvotas.svg" alt="">
        <span class="gate-l">{{gate}}</span></div>
      <span class="flag" style="top:%.0fpx">{{flag}}</span>
    </div>
    <div class="cap">{{cap}}</div>""" % (''.join(svg), flag_top)
    css = BASE_CSS + """
  .card { padding: 42px 0 46px; }
  .title { margin-bottom: 10px; }
  .band { position: relative; width: 1920px; height: 760px; margin: 0 auto; }
  .braid { position: absolute; left: 0; top: -130px; width: 1920px; height: 1120px; fill: none; }
  .braid .st, .braid .hit { stroke-linecap: round; stroke-dasharray: var(--dash); stroke-dashoffset: 0; }
  .gate { position: absolute; left: 1090px; top: 430px; transform: translate(-50%, -50%);
          display: flex; flex-direction: column; align-items: center; gap: 14px; }
  .gate img { width: 128px; height: 128px; display: block;
              filter: drop-shadow(0 14px 34px rgba(26,26,26,.16)); }
  .gate-l { background: #fff; border-radius: 22px; height: 44px; display: flex; align-items: center;
            padding: 0 26px; font-size: 20px; font-weight: 600; letter-spacing: .12em;
            text-transform: uppercase; color: """ + BRAND['navy'] + """;
            box-shadow: 0 10px 26px rgba(26,26,26,.10); }
  .flag { position: absolute; right: 36px; background: var(--c-amber-bg);
          border: 2px solid var(--c-amber-border); color: var(--c-amber-text); font-size: 24px;
          font-weight: 700; padding: 8px 22px; border-radius: 999px; }
  .cap { text-align: center; font-size: 27px; color: """ + BRAND['gray'] + """; margin-top: 4px; }
"""
    write_template(name, page(css, body))
    a = []
    head(a)
    for i in range(n):
        t = 0.5 + (i % 5) * 0.16 + (i // 5) * 0.1
        a.append('.s%d { stroke-dashoffset: var(--dash); animation: piesiama 3.4s var(--ease-soft) %.2fs forwards; }'
                 % (i, t))
    a.append('@keyframes piesiama { from { stroke-dashoffset: var(--dash); } to { stroke-dashoffset: 0; } }')
    timeline(a, 'm03', D, '.gate', 'opacity', [(2.4, '0'), (3.2, '1'), (16.4, '1')])
    a.append('.gate img { animation: iconPulse 1.8s var(--ease-soft) 3.4s 2; }')
    for j in range(3):
        a.append('.hit.h%d { stroke-dashoffset: var(--dash); animation: piesiama 1.1s var(--ease-soft) %.2fs forwards; }'
                 % (j, 5.0 + j * 0.5))
        timeline(a, 'm03', D, '.hd.h%d' % j, 'r', [(6.1 + j * 0.5, '0'), (6.6 + j * 0.5, '11'), (7.0 + j * 0.5, '9'), (16.4, '9')])
    timeline(a, 'm03', D, '.flag', 'opacity', [(10.4, '0'), (11.2, '1'), (16.4, '1')])
    timeline(a, 'm03', D, '.cap', 'opacity', [(12.6, '0'), (13.4, '1'), (16.4, '1')])
    ANIMS[name] = '\n    '.join(a)

# ---------------------------------------------------------------- 04 Du sluoksniai
def scene_04():
    name, D = '04-du-sluoksniai', 15
    CONTENT[name.replace('-', '_')] = dict(
        title="Numeris puslapyje yra du dalykai", t_lbl="Ką matote", num=SENAS,
        fix="forma sutvarkyta", t_note="tekstą skaito žmogus",
        b_lbl="Kas parašyta po tekstu", b_note="nuorodą surenka telefonas")
    body = """    <div class="title">{{title}}</div>
    <div class="lay">
      <div class="pan pan-t"><div class="lbl">{{t_lbl}}</div>
        <div class="row"><span class="num link">{{num}}</span><span class="fix">{{fix}}</span></div>
        <div class="note n-t">{{t_note}}</div></div>
      <div class="pan pan-b"><div class="lbl">{{b_lbl}}</div>
        <div class="code">""" + anchor_code(TEL_SEN, SENAS) + """</div>
        <div class="note n-b">{{b_note}}</div></div>
    </div>"""
    css = BASE_CSS + LAY_CSS + """
  .pan-b { transform-origin: 50% 0; }
  .row { display: flex; align-items: center; gap: 34px; }
  .fix { background: var(--c-green-bg); border: 2px solid var(--c-green-border); color: var(--c-green-text);
         font-size: 23px; font-weight: 700; padding: 6px 20px; border-radius: 999px; }
"""
    write_template(name, page(css, body))
    a = []
    head(a)
    a.append('.pan-t { opacity: 0; animation: fadeUpMedium 0.55s var(--ease-spring) 0.5s forwards; }')
    timeline(a, 'm04', D, '.fix', 'opacity', [(1.4, '0'), (2.1, '1'), (14.4, '1')])
    a.append('.pan-b { opacity: 0; animation: issislenka 0.7s var(--ease-spring) 3.4s forwards; }')
    a.append('@keyframes issislenka { from { opacity: 0; transform: translateY(-56px) scale(.97); } '
             'to { opacity: 1; transform: none; } }')
    timeline(a, 'm04', D, '.hl-t', 'background', [(5.4, 'transparent'), (6.0, 'rgba(110,231,183,.26)'), (14.4, 'rgba(110,231,183,.26)')])
    a.append('.n-t { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 5.8s forwards; }')
    timeline(a, 'm04', D, '.hl-h', 'background', [(8.8, 'transparent'), (9.4, 'rgba(167,139,250,.38)'), (14.4, 'rgba(167,139,250,.38)')])
    a.append('.n-b { opacity: 0; animation: fadeUpLight 0.4s var(--ease-spring) 9.2s forwards; }')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 05 Mokykla taiso tai, ką mato
def scene_05():
    """Sujungti buvę 5 ir 6 kadrai (Eimantas 2026-10-30): viena istorija nuo pažymėjimo
    iki radinio. Numeris ne „persirašo" pats — kursorius jį PAŽYMI ir perrašo; būtent
    taip klaida ir gimsta. Paspaudus kodo peržiūros mygtuką redaktorius parodo TIKRĄ
    HTML tamsiame fone: antrasis sluoksnis yra kodo eilutės, ir jose nuoroda liko sena."""
    name, D = '05-administratorius-taiso', 22
    CONTENT[name.replace('-', '_')] = dict(
        title="Administratorius taiso tai, ką mato", ed_lbl="Turinio redaktorius",
        old=SENAS, new=NAUJAS, src_lbl="Kodo peržiūra", mism="du skirtingi numeriai")
    W = 1500
    code = ('<span class="tg">&lt;p&gt;</span>Telefonas '
            + anchor_code(TEL_SEN, NAUJAS, h_cls='hl hl-a', t_cls='hl hl-t')
            + '<span class="tg">&lt;/p&gt;</span>')
    body = """    <div class="title">{{title}}</div>
    <div class="wrap">
      <div class="ed-lbl"><span class="e-a">{{ed_lbl}}</span><span class="e-b">{{src_lbl}}</span></div>
      <div class="ed">
        <img src="assets/iklijuotas-redaktorius-juosta.png" style="width:%dpx">
        <div class="ed-stack">
          <div class="ed-body">
            <p>Telefonas <span class="sel"><span class="t-old">{{old}}</span><span class="t-new">{{new}}</span></span><span class="caret"></span></p>
          </div>
          <div class="ed-src"><div class="code">%s</div></div>
        </div>
        <img src="assets/iklijuotas-redaktorius-apacia.png" style="width:%dpx">
      </div>
      <div class="chip">{{mism}}</div>
      <div class="rip r-src" style="left:48px; top:70px"></div>
      <div class="cur">%s</div>
    </div>""" % (W, code, W, CUR['arrow'])
    css = BASE_CSS + LAY_CSS + """
  .card { padding: 44px 110px 48px; }
  .wrap { position: relative; width: %dpx; margin: 0 auto; }
  .ed-lbl { position: relative; height: 32px; font-size: 25px; font-weight: 700;
            color: var(--c-text-secondary); margin-bottom: 12px; }
  .e-a, .e-b { position: absolute; left: 0; top: 0; }
  .e-a { opacity: 0; }
  .ed-stack { position: relative; height: 190px; }
  .ed { background: #fff; box-shadow: var(--c-shadow-card); }
  .ed img { display: block; }
  .ed-body { position: absolute; inset: 0; border-left: 1px solid #b7b7b7; border-right: 1px solid #b7b7b7;
             background: #fff; padding: 34px 38px; font-family: 'Times New Roman', Times, serif; font-size: 36px;
             line-height: 1.5; color: #000; opacity: 0; }
  .sel { border-radius: 3px; position: relative; display: inline-block; }
  .t-old, .t-new { color: #2563eb; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 7px; }
  .t-new { position: absolute; left: 0; top: 0; white-space: nowrap; }
  .t-old { opacity: 0; }
  .ed-src { position: absolute; inset: 0; background: #0f172a; padding: 38px; display: flex; align-items: center; }
  .ed-src .code { font-size: 31px; white-space: nowrap; }
  .hl-a { background: rgba(245,158,11,.34); color: #fde68a; }
  .cur { transform: translate(1240px, 660px); }
  .caret { display: inline-block; width: 3px; height: 38px; background: #111827; vertical-align: -7px; margin-left: 3px; opacity: 0; }
  .chip { width: fit-content; margin: 30px auto 0; background: var(--c-amber-bg); border: 2px solid var(--c-amber-border);
          color: var(--c-amber-text); font-size: 28px; font-weight: 700; padding: 10px 30px; border-radius: 999px; }
""" % W
    write_template(name, page(css, body))
    a = []
    head(a)
    a.append('.ed-lbl, .ed { opacity: 0; animation: fadeUpMedium 0.55s var(--ease-spring) 0.45s forwards; }')
    cursor_anim(a, 'k05', D, [(0, (1120, 620)), (1.6, (1120, 620)), (3.4, (430, 300)), (4.6, (700, 304)),
                              (6.4, (704, 308)), (9.2, (48, 70)), (11.4, (50, 72)), (15.0, (1240, 660))])
    # redaktoriaus vaizdas rodomas pirmas, kodo peržiūra — po paspaudimo
    # ⛔ `display` šioje grandinėje neanimuojamas — sluoksniai dedami vienas ant kito ir
    # perjungiami `opacity`. Natūralus redaktoriaus vaizdas rodomas pirmas, kodas — po paspaudimo.
    timeline(a, 'm05', D, '.ed-body', 'opacity', [(0.0, '1'), (10.50, '1'), (10.54, '0'), (21.4, '0')])
    timeline(a, 'm05', D, '.ed-src', 'opacity', [(0.0, '0'), (10.50, '0'), (10.54, '1'), (21.4, '1')])
    timeline(a, 'm05', D, '.e-a', 'opacity', [(0.0, '1'), (10.50, '1'), (10.54, '0'), (21.4, '0')])
    timeline(a, 'm05', D, '.e-b', 'opacity', [(0.0, '0'), (10.50, '0'), (10.54, '1'), (21.4, '1')])
    # pažymėjimas → perrašymas
    timeline(a, 'm05', D, '.sel', 'background', [(4.4, 'transparent'), (4.8, '#b4d5fe'), (6.3, '#b4d5fe'),
                                                 (6.4, 'transparent'), (21.4, 'transparent')])
    timeline(a, 'm05', D, '.caret', 'opacity', [(6.4, '0'), (6.6, '1'), (8.4, '1'), (8.7, '0'), (21.4, '0')])
    timeline(a, 'm05', D, '.t-old', 'opacity', [(6.4, '1'), (6.5, '0'), (21.4, '0')])
    timeline(a, 'm05', D, '.t-new', 'opacity', [(6.4, '0'), (6.5, '1'), (21.4, '1')])
    a.append('.r-src { animation: ratilas 0.7s ease-out 9.7s forwards; }')
    a.append('.ed-src .hl-a { animation: attentionPulse 1.6s var(--ease-soft) 13.0s 2; }')
    timeline(a, 'm05', D, '.chip', 'opacity', [(16.4, '0'), (17.2, '1'), (21.4, '1')])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 07 Vaiduoklis
def scene_07():
    name, D = '06-vaiduoklis', 14
    CONTENT[name.replace('-', '_')] = dict(
        title="Paspaudus telefonas renka kitą numerį", scr_lbl="Svetainės poraštėje", scr_num=NAUJAS,
        rk_name="Miesto gimnazija", rk_adr="Mokyklos g. 1, 00000 Miestas", rk_tel_k="Tel.",
        rk_kod="Įmonės kodas 000000000",
        dial_lbl="Skambinama", dial_num=SENAS, ghost="vaiduoklis")
    body = """    <div class="title">{{title}}</div>
    <div class="duo">
      <div class="side">
        <div class="side-lbl">{{scr_lbl}}</div>
        <div class="plate"><div class="rk-n">{{rk_name}}</div>
          <div class="rk-l">{{rk_adr}}</div>
          <div class="rk-l big">{{rk_tel_k}} <span class="num link">{{scr_num}}</span></div>
          <div class="rk-l">{{rk_kod}}</div></div>
        <div class="rip r-tap" style="left:300px; top:250px"></div>
        <div class="cur">""" + CUR['arrow'] + """</div>
      </div>
      <div class="arrow"><svg viewBox="0 0 120 40"><path d="M4 20h98" stroke="var(--c-text-faint)" stroke-width="5"
        stroke-linecap="round" fill="none"/><path d="M92 8l16 12-16 12" stroke="var(--c-text-faint)" stroke-width="5"
        stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
      <div class="ph"><div class="ph-in"><div class="ph-top"></div>
        <div class="dial">
          <div class="dial-lbl">{{dial_lbl}}</div>
          <div class="dial-num">{{dial_num}}</div>
          <div class="dial-ico">""" + TEL_SVG + """</div>
        </div></div>
        <div class="ghost">{{ghost}}</div>
      </div>
    </div>"""
    css = BASE_CSS + LAY_CSS + PHONE_CSS + """
  .duo { display: flex; align-items: center; justify-content: center; gap: 56px; }
  .side { position: relative; width: 700px; }
  .side-lbl { font-size: 25px; font-weight: 700; color: var(--c-text-secondary); margin-bottom: 16px; }
  .plate { background: var(--c-surface); border: 1.5px solid var(--c-border); border-radius: 20px;
           padding: 36px 40px 40px; box-shadow: var(--c-shadow-card); }
  .rk-n { font-size: 30px; font-weight: 700; color: var(--c-text); margin-bottom: 12px; }
  .rk-l { font-size: 26px; color: var(--c-text-muted); margin-bottom: 10px; }
  .rk-l.big { margin: 18px 0 20px; display: flex; align-items: center; gap: 14px; }
  .plate .num { font-size: 48px; }
  .arrow svg { width: 120px; height: 40px; }
  .ph { position: relative; }
  .dial-num { font-size: 40px; }
  .ghost { position: absolute; left: 50%; bottom: -62px; z-index: 5; transform: translateX(-50%);
           background: var(--c-purple-bg); border: 2px solid var(--c-purple-border); color: var(--c-purple-text);
           font-size: 26px; font-weight: 700; padding: 8px 24px; border-radius: 999px; }
  .cur { transform: translate(600px, 400px); }
"""
    write_template(name, page(css, body))
    a = []
    head(a)
    a.append('.side { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.5s forwards; }')
    a.append('.arrow { opacity: 0; animation: fadeIn 0.4s linear 2.6s forwards; }')
    a.append('.ph { opacity: 0; animation: slinktisIsDesines 0.6s var(--ease-spring) 2.9s forwards; }')
    cursor_anim(a, 'k07', D, [(0, (640, 420)), (1.4, (640, 420)), (3.0, (300, 250)), (5.6, (304, 254)), (9.8, (600, 400))])
    a.append('.r-tap { animation: ratilas 0.7s ease-out 3.4s forwards; }')
    timeline(a, 'm07', D, '.dial-num', 'opacity', [(5.4, '0'), (6.1, '1'), (13.4, '1')])
    a.append('.dial-ico { animation: iconPulse 1.6s var(--ease-soft) 6.4s 3; }')
    timeline(a, 'm07', D, '.ghost', 'opacity', [(8.6, '0'), (9.3, '1'), (13.4, '1')])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 08 Kopijuota pastraipa
def scene_08():
    name, D = '07-kopijavimas', 17
    CONTENT[name.replace('-', '_')] = dict(
        title="Štai dar viena situacija", a_lbl="Senas puslapis", b_lbl="Naujas puslapis",
        a_url="…/kontaktai", b_url="…/priesmokyklinis", blk="Kontaktai", a_num=KOPIJA,
        b_num=SAVAS_K, code_lbl="Naujame puslapyje", k1="Ctrl + C", k2="Ctrl + V")
    bwh = ('<div class="bw-head"><span class="lg"></span><i style="width:120px"></i>'
           '<i style="width:78px"></i><i style="width:96px"></i></div>')
    body = ("""    <div class="title">{{title}}</div>
    <div class="duo">
      <div class="col">
        <div class="col-lbl">{{a_lbl}}</div>
        <div class="bw" style="width:620px">
          <div class="bw-bar"><span class="d"></span><span class="d"></span><span class="d"></span>
            <div class="bw-url">{{a_url}}</div></div>""" + bwh + """
          <div class="bw-page" style="height:280px">
            <div class="s-card blk-a"><div class="s-h">{{blk}}</div>
              <div class="s-row"><a class="s-tel" href="#">{{a_num}}</a></div></div>
          </div></div>
      </div>
      <div class="fly"><div class="s-card" style="padding:16px 22px; box-shadow:0 18px 40px rgba(15,23,42,.22)">
        <div class="s-row" style="margin:0; font-size:24px"><a class="s-tel" href="#">{{a_num}}</a></div></div></div>
      <div class="col">
        <div class="col-lbl">{{b_lbl}}</div>
        <div class="bw" style="width:620px">
          <div class="bw-bar"><span class="d"></span><span class="d"></span><span class="d"></span>
            <div class="bw-url">{{b_url}}</div></div>""" + bwh + """
          <div class="bw-page" style="height:280px">
            <div class="s-card blk-b"><div class="s-h">{{blk}}</div>
              <div class="s-row"><span class="swap"><a class="s-tel b-old" href="#">{{a_num}}</a><a class="s-tel b-num" href="#">{{b_num}}</a></span></div></div>
          </div></div>
      </div>
    </div>
    <span class="kc kc1">{{k1}}</span><span class="kc kc2">{{k2}}</span>
    <div class="strip"><span class="strip-lbl">{{code_lbl}}</span>
      <span class="code">""" + anchor_code(TEL_KOP, SAVAS_K) + """</span></div>""")
    css = BASE_CSS + MOK_CSS + BW_CSS + LAY_CSS + """
  .duo { display: flex; align-items: flex-start; justify-content: center; gap: 70px; position: relative; }
  .col-lbl { font-size: 25px; font-weight: 700; color: var(--c-text-secondary); margin-bottom: 14px; }
  .fly { position: absolute; left: 100px; top: 185px; opacity: 0; z-index: 5; }
  .strip { width: 1400px; margin: 44px auto 0; background: #1e293b; border-radius: 18px; padding: 24px 36px;
           display: flex; align-items: center; gap: 30px; box-shadow: var(--c-shadow-card); }
  .strip-lbl { font-size: 25px; font-weight: 700; color: #cbd5e1; white-space: nowrap; }
  .strip .code { font-size: 30px; }
  .swap { position: relative; display: inline-block; }
  .b-num { position: absolute; left: 0; top: 0; white-space: nowrap; }
  .b-old { opacity: 0; }
  .kc { position: absolute; z-index: 6; background: #1e293b; color: #e2e8f0; font-size: 24px; font-weight: 700;
        padding: 9px 22px; border-radius: 10px; box-shadow: 0 10px 24px rgba(15,23,42,.22); opacity: 0;
        font-family: 'SF Mono', Menlo, monospace; }
  .kc1 { left: 300px; top: 470px; }
  .kc2 { right: 300px; top: 470px; }
  .blk-a, .b-old { border-radius: 6px; }
"""
    write_template(name, page(css, body))
    a = []
    head(a)
    a.append('.col:first-of-type { opacity: 0; animation: slinktisIsKaires 0.55s var(--ease-spring) 0.5s forwards; }')
    a.append('.col:last-of-type { opacity: 0; animation: slinktisIsDesines 0.55s var(--ease-spring) 1.1s forwards; }')
    # 1. blokas pažymimas  2. Ctrl+C  3. keliauja  4. Ctrl+V  5. matomas numeris pažymimas ir perrašomas
    timeline(a, 'm08', D, '.blk-a', 'background', [(2.2, '#fff'), (2.7, '#dbeafe'), (6.4, '#dbeafe'),
                                                   (6.8, '#fff'), (16.4, '#fff')])
    timeline(a, 'm08', D, '.kc1', 'opacity', [(3.2, '0'), (3.6, '1'), (5.0, '1'), (5.4, '0'), (16.4, '0')])
    timeline(a, 'm08', D, '.fly', 'opacity', [(4.2, '0'), (4.6, '1'), (6.6, '1'), (7.0, '0'), (16.4, '0')])
    timeline(a, 'm08', D, '.fly', 'transform',
             [(4.4, 'translate(0, 0)'), (6.6, 'translate(790px, 0)'), (16.4, 'translate(790px, 0)')])
    timeline(a, 'm08', D, '.kc2', 'opacity', [(6.2, '0'), (6.6, '1'), (8.0, '1'), (8.4, '0'), (16.4, '0')])
    timeline(a, 'm08', D, '.blk-b', 'opacity', [(6.4, '0'), (7.0, '1'), (16.4, '1')])
    timelines(a, 'm08', D, '.b-old',
              [('opacity', [(0.0, '1'), (10.3, '1'), (10.4, '0'), (16.4, '0')]),
               ('background', [(8.6, 'transparent'), (9.0, '#dbeafe'), (10.2, '#dbeafe'),
                               (10.3, 'transparent'), (16.4, 'transparent')])])
    timeline(a, 'm08', D, '.b-num', 'opacity', [(10.3, '0'), (10.4, '1'), (16.4, '1')])
    timeline(a, 'm08', D, '.strip', 'opacity', [(11.6, '0'), (12.3, '1'), (16.4, '1')])
    a.append('.strip .hl-h { animation: iconPulse 1.5s var(--ease-soft) 13.2s 2; }')
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 09 Ką radome
# ⛔ 16 nuorodų į demonstracinį numerį čia NEMINIMOS (Eimantas 2026-10-30)
SKAICIAI_09 = (('148', 'nuoroda sena forma'), ('66', 'numeris ekrane sena forma'),
               ('117', 'tas pats „Facebook" peržiūroje'))


def scene_09():
    """Statistika — PAČIOJE PABAIGOJE ir LYG TARP KITKO (Eimantas, 2026-10-30).
    Jokių didelių plytelių su skaičiais: tai šoninė pastaba, ne prietaisų skydas.
    Skaičiai sakinyje, po juo — plona eilutė su skaidymu."""
    name, D = '08-skaiciai', 18
    CONTENT[name.replace('-', '_')] = dict(
        title="Šiek tiek statistikos",
        s1="Peržiūrėjome", n1=str(SKEN), s2="svetaines.",
        s3="Taisyti reikėjo", n2="341", s4="vietą", n3=str(RASTA), s5="svetainėse.",
        s6="Dešimtyje jų nuoroda vedė visai į kitą numerį, nei parašyta ekrane.",
        d1="148 nuoroda sena forma", d2="66 numeris ekrane sena forma",
        d3="117 tas pats „Facebook“ peržiūroje")
    body = """    <div class="title">{{title}}</div>
    <div class="txt">
      <p class="p1">{{s1}} <b>{{n1}}</b> {{s2}}</p>
      <p class="p2">{{s3}} <b>{{n2}}</b> {{s4}} <b>{{n3}}</b> {{s5}}</p>
      <p class="p3">{{s6}}</p>
    </div>
    <div class="det"><span class="e1">{{d1}}</span><span class="dot">·</span>
      <span class="e2">{{d2}}</span><span class="dot">·</span><span class="e3">{{d3}}</span></div>"""
    css = BASE_CSS + """
  .card { padding: 120px 110px 110px; }
  .title { margin-bottom: 56px; color: var(--c-text-secondary); }
  .txt { width: 1320px; margin: 0 auto; text-align: center; }
  .txt p { font-size: 46px; line-height: 1.5; color: var(--c-text); }
  .txt p b { font-weight: 800; color: var(--c-purple-text); font-variant-numeric: tabular-nums; }
  .p2, .p3 { margin-top: 26px; }
  .det { display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 70px;
         padding-top: 34px; border-top: 1px solid var(--c-line); width: 1320px; margin-left: auto;
         margin-right: auto; font-size: 24px; color: var(--c-text-faint); }
  .det .dot { color: var(--c-text-faint); }
"""
    write_template(name, page(css, body))
    a = []
    head(a)
    a.append('.p1 { opacity: 0; animation: fadeUpLight 0.5s var(--ease-spring) 0.9s forwards; }')
    a.append('.p2 { opacity: 0; animation: fadeUpLight 0.5s var(--ease-spring) 4.2s forwards; }')
    a.append('.p3 { opacity: 0; animation: fadeUpLight 0.5s var(--ease-spring) 8.0s forwards; }')
    timeline(a, 'm09', D, '.det', 'opacity', [(11.4, '0'), (12.2, '1'), (17.4, '1')])
    for i, t in ((1, 12.4), (2, 12.8), (3, 13.2)):
        a.append('.e%d { opacity: 0; animation: fadeIn 0.4s linear %.2fs forwards; }' % (i, t))
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 12 Patikra
def scene_12():
    name, D = '09-patikra', 13
    CONTENT[name.replace('-', '_')] = dict(
        title="Patikra trunka dešimt sekundžių", s1="Atsidarote savo svetainę telefone",
        s2="Paspaudžiate savo numerį", s3="Palyginate su tuo, kas rodoma ekrane",
        dial_lbl="Skambinama", dial_num=NAUJAS, cta="Patikra čia ne akimis, o pirštu.")
    steps = ''.join('<div class="st s%d"><span class="st-n">%d</span><span class="st-t">{{s%d}}</span></div>'
                    % (i, i + 1, i + 1) for i in range(3))
    body = """    <div class="title">{{title}}</div>
    <div class="duo">
      <div class="left">%s
        <div class="cta">{{cta}}</div></div>
      <div class="ph"><div class="ph-in"><div class="ph-top"></div>
        <div class="dial"><div class="dial-lbl">{{dial_lbl}}</div><div class="dial-num">{{dial_num}}</div>
          <div class="dial-ico">%s</div></div></div>
        <div class="tick">%s</div>
      </div>
    </div>""" % (steps, TEL_SVG, CHECK_SVG)
    css = BASE_CSS + PHONE_CSS + """
  .duo { display: flex; align-items: center; justify-content: center; gap: 90px; }
  .left { width: 760px; }
  .st { display: flex; align-items: center; gap: 24px; background: var(--c-surface); border: 1.5px solid var(--c-border);
        border-radius: 16px; padding: 22px 28px; margin-bottom: 20px; box-shadow: 0 8px 22px rgba(15,23,42,.06); }
  .st-n { width: 54px; height: 54px; flex: none; border-radius: 50%; background: var(--c-purple-bg);
          color: var(--c-purple-text); font-size: 28px; font-weight: 800;
          display: flex; align-items: center; justify-content: center; }
  .st-t { font-size: 29px; color: var(--c-text); }
  .cta { margin-top: 34px; font-size: 40px; font-weight: 800; color: var(--c-green-text); }
  .ph { position: relative; }
  .dial-num { font-size: 40px; }
  .tick { position: absolute; right: -26px; bottom: 78px; width: 96px; height: 96px; border-radius: 50%;
          background: #fff; border: 3px solid var(--c-green-border); display: flex; align-items: center;
          justify-content: center; box-shadow: 0 12px 30px rgba(15,23,42,.14); }
  .tick svg { width: 50px; height: 50px; }
"""
    write_template(name, page(css, body))
    a = []
    head(a)
    a.append('.ph { opacity: 0; animation: slinktisIsDesines 0.6s var(--ease-spring) 0.5s forwards; }')
    for i, t in ((0, 1.2), (1, 2.3), (2, 3.6)):
        a.append('.s%d { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) %.2fs forwards; }' % (i, t))
    timeline(a, 'm12', D, '.tick', 'opacity', [(6.2, '0'), (6.9, '1'), (12.4, '1')])
    a.append('.dial-ico { animation: iconPulse 1.6s var(--ease-soft) 5.2s 2; }')
    timeline(a, 'm12', D, '.cta', 'opacity', [(8.4, '0'), (9.1, '1'), (12.4, '1')])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- 12 Grįšime
def scene_13():
    """Uždarymas: trys varnelės kairėje, simbolis su pažadu centre, „prieš ir po" kortelė dešinėje.
    Eimanto redakcija 2026-10-30: filmukas baigiasi ne pavieniu radiniu, o serijos pažadu —
    „Kodo sluoksnyje tūno ne tik aštuonetai."."""
    name, D = '10-grisime', 30
    CONTENT[name.replace('-', '_')] = dict(
        title="Grįšime", t1="Pažiūrėjome", t2="Pasitikslinome", t3="Sutvarkėme",
        lead="Kodo sluoksnyje tūno ne tik aštuonetai.", big="Grįšime su kita serija.",
        c_chip="Kontaktai", c_h="Telefono nuorodos", c_b=ASTUONI, c_a=SENAS,
        c_n="341", c_l="vieta", c_st="Sutvarkyta")
    ticks = ''.join('<div class="tk k%d"><span class="tk-i">%s</span><span>{{t%d}}</span></div>'
                    % (i, CHECK_SVG, i + 1) for i in range(3))
    body = """    <div class="title">{{title}}</div>
    <div class="trio">
      <div class="left">""" + ticks + """</div>
      <div class="mid">
        <img class="sym" src="assets/cleverphant-simbolis-spalvotas.svg" alt="">
        <div class="lead">{{lead}}</div>
        <div class="big">{{big}}</div>
      </div>
      <div class="hb">
        <span class="hb-chip">{{c_chip}}</span>
        <h3>{{c_h}}</h3>
        <div class="ba">
          <div class="b"><span class="t">{{c_b}}</span></div>
          <div class="arr">↓</div>
          <div class="a">{{c_a}}</div>
        </div>
        <div class="hb-count"><b>{{c_n}}</b><span>{{c_l}}</span><span class="st">{{c_st}}</span></div>
      </div>
    </div>"""
    css = BASE_CSS + """
  .card { padding: 48px 100px 50px; }
  .title { margin-bottom: 52px; }
  .trio { display: flex; align-items: center; justify-content: center; gap: 58px; }
  .left { width: 440px; }
  .tk { display: flex; align-items: center; gap: 16px; font-size: 28px; color: var(--c-text);
        background: var(--c-green-bg); border: 1.5px solid var(--c-green-border); border-radius: 14px;
        padding: 14px 24px; margin-bottom: 14px; }
  .tk-i svg { width: 26px; height: 26px; display: block; }
  .mid { width: 620px; text-align: center; }
  .sym { width: 92px; height: 92px; display: block; margin: 0 auto 26px; }
  .lead { font-size: 31px; line-height: 1.4; color: """ + BRAND['gray'] + """; }
  .big { font-size: 46px; font-weight: 800; color: var(--c-text); margin-top: 22px; line-height: 1.2; }
  /* „prieš ir po" kortelė — design.webas.lt/clvweb .hb-card */
  .hb { width: 470px; background: #fff; border-radius: 40px; padding: 34px; display: flex;
        flex-direction: column; gap: 16px; box-shadow: 0 22px 54px rgba(26,26,26,.10); }
  .hb-chip { align-self: flex-start; font-size: 19px; font-weight: 600; color: """ + BRAND['ink'] + """;
             background: #e4eef5; border-radius: 13px; padding: 5px 16px; }
  .hb h3 { font-size: 27px; font-weight: 600; margin: 0; color: """ + BRAND['ink'] + """; }
  .ba { display: grid; grid-template-rows: 1fr auto 1fr; align-items: center; justify-items: start;
        gap: 6px; padding: 8px 0 2px; }
  .ba .b { font-size: 29px; color: """ + BRAND['gray'] + """; position: relative; opacity: .45;
           filter: grayscale(1); }
  .ba .b .t { position: relative; }
  .ba .b .t::after { content: ''; position: absolute; left: -3px; right: -3px; top: 52%; height: 3px;
                     background: #94a3b8; transform-origin: left; transform: scaleX(1); }
  .ba .arr { color: """ + BRAND['navy'] + """; font-size: 27px; line-height: 1; }
  .ba .a { font-size: 37px; font-weight: 700; letter-spacing: -.01em; color: """ + BRAND['ink'] + """; }
  .hb-count { border-top: 1px solid var(--c-border); padding-top: 16px; display: flex;
              align-items: baseline; gap: 9px; font-size: 20px; color: """ + BRAND['gray'] + """; }
  .hb-count b { font-size: 32px; color: #15803d; font-variant-numeric: tabular-nums; }
  .hb-count .st { margin-left: auto; font-weight: 600; color: #15803d; }
"""
    write_template(name, page(css, body))
    a = []
    head(a)
    for i, t in ((0, 0.7), (1, 1.5), (2, 2.3)):
        a.append('.k%d { opacity: 0; animation: fadeUpMedium 0.45s var(--ease-spring) %.2fs forwards; }' % (i, t))
    a.append('.hb { opacity: 0; animation: slinktisIsDesines 0.6s var(--ease-spring) 1.1s forwards; }')
    timeline(a, 'm13', D, '.ba .b .t::after', 'transform',
             [(3.4, 'scaleX(0)'), (4.2, 'scaleX(1)'), (29.4, 'scaleX(1)')])
    timelines(a, 'm13', D, '.ba .b',
              [('opacity', [(3.4, '1'), (4.6, '.45'), (29.4, '.45')]),
               ('filter', [(3.4, 'grayscale(0)'), (4.6, 'grayscale(1)'), (29.4, 'grayscale(1)')])])
    a.append('.ba .a { opacity: 0; animation: fadeUpLight 0.5s var(--ease-spring) 4.6s forwards; }')
    timeline(a, 'm13', D, '.hb-count', 'opacity', [(6.0, '0'), (6.7, '1'), (29.4, '1')])
    timeline(a, 'm13', D, '.sym', 'opacity', [(9.8, '0'), (10.6, '1'), (29.4, '1')])
    a.append('.sym { animation: iconPulse 1.8s var(--ease-soft) 10.6s 2; }')
    timeline(a, 'm13', D, '.lead', 'opacity', [(15.0, '0'), (15.9, '1'), (29.4, '1')])
    timeline(a, 'm13', D, '.big', 'opacity', [(23.4, '0'), (24.3, '1'), (29.4, '1')])
    ANIMS[name] = '\n    '.join(a)


# ---------------------------------------------------------------- rašymas
def write_content():
    os.makedirs(os.path.join(HERE, 'content'), exist_ok=True)
    json.dump(CONTENT, open(os.path.join(HERE, 'content', 'lt.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=2)


def write_anims():
    p = os.path.join(ILL, 'generate-video-clips.js')
    js = open(p, encoding='utf-8').read()
    start = '  // >>> VAIDUOKLIS (generuoja lessons/vaiduoklis-po-numeriu/build_scenes.py — ranka neredaguoti)\n'
    end = '  // <<< VAIDUOKLIS\n'
    block = start + ''.join("  '%s': `\n    %s\n  `,\n" % (n, css) for n, css in ANIMS.items()) + end
    if start in js:
        js = js[:js.index(start)] + block + js[js.index(end) + len(end):]
    else:
        anchor = 'const TEMPLATE_ANIMATIONS = {\n'
        js = js.replace(anchor, anchor + block, 1)
    open(p, 'w', encoding='utf-8').write(js)


if __name__ == '__main__':
    for fn in (scene_01, scene_02, scene_03, scene_04, scene_05,
               scene_07, scene_08, scene_09, scene_12, scene_13):
        fn()
    write_content()
    write_anims()
    print('Scenos:', ', '.join(ANIMS))
