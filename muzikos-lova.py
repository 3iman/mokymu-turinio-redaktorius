#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Muzikos lova iš vieno takelio: intro → kilpa × N → takelio pabaiga.

⛔ Kodėl ne kartojimas nuo pradžių (Eimantas 2026-09-19):
   „mane glumina, kai pasibaigia muzika ir iš naujo prasideda“. Todėl takelio VIDURYJE
   randama kilpa, ji kartojama tiek, kiek reikia, o takelio pabaiga lieka filmuko gale.

⛔ Kodėl to negana (Eimantas 2026-09-19, antras ratas): „pergrubiai sujungta, ritmai
   susimuša“. Takto ilgis, apskaičiuotas 10 ms tikslumu, per 16 taktų virsta dešimtimis
   milisekundžių paklaidos — po siūlės ritmo tinklelis pasislenka. Todėl:
     · taktas skaičiuojamas 5,8 ms žingsniu ir tikslinamas parabole (≈0,1 ms);
     · randama takto fazė, kilpos ribos statomos ant takto;
     · kilpos galas dar patikslinamas pagal bangos sutapimą (NCC) ±pusė takto;
     · iš kelių kandidatų renkamas tas, kurio siūlė patenka į tyliausią vietą;
     · perėja – vienodos galios, 0,4 s.
   Muzika neturi atkreipti į save dėmesio.

Paleidimas:
    python3 muzikos-lova.py {takelis} {reikia_sek} {isvestis.wav}

Išveda JSON su parinkta kilpa — build-video.js jį parodo žurnale.
"""
import json
import subprocess
import sys

import numpy as np

SR = 44100
ASR = 22050            # analizės dažnis
HOP = 128              # 5,8 ms
PEREJA = 0.25          # kryžminė perėja siūlėje (s), vienodos galios
TIKSLINIMAS = 0.015    # kiek sekundžių leidžiama pastumti kilpos galą (±): tik mikro lygiavimas
TAKTAI = 16            # kilpos ilgis taktais (4/4)
KANDIDATAI = 6         # kiek geriausių kilpų lyginama tarpusavyje


def skaityti(kelias, sr, kanalai):
    """Dekoduoja takelį į numpy masyvą per ffmpeg."""
    proc = subprocess.run(['ffmpeg', '-v', 'error', '-i', kelias, '-ac', str(kanalai),
                           '-ar', str(sr), '-f', 's16le', '-'], capture_output=True, check=True)
    x = np.frombuffer(proc.stdout, dtype=np.int16).astype(np.float32) / 32768.0
    return x.reshape(-1, kanalai) if kanalai > 1 else x


def gaubtine(mono):
    """Onset gaubtinė ir RMS 5,8 ms žingsniu."""
    n = len(mono) // HOP * HOP
    rms = np.sqrt(np.mean(mono[:n].reshape(-1, HOP) ** 2, axis=1))
    onset = np.maximum(0, np.diff(rms))
    return (onset - onset.mean()) / (onset.std() + 1e-9), rms


def taktas_ir_faze(onset):
    """Takto ilgis (s) ir fazė (s).

    ⛔ Taktas imamas ne iš vienos autokoreliacijos smailės, o iš 64 taktų lago (÷64):
    taip paklaida sumažėja 64 kartus. Iš vienos smailės gautas 0,5457 s per 16 taktų
    duoda ~20 ms poslinkį — tiek ir užtenka, kad po siūlės ritmas prasilenktų.
    """
    ac = np.correlate(onset, onset, mode='full')[len(onset) - 1:]
    dt = HOP / ASR

    def smaile(apie, plotis):
        i0, i1 = int((apie - plotis) / dt), int((apie + plotis) / dt)
        i = i0 + int(np.argmax(ac[i0:i1]))
        y0, y1, y2 = ac[i - 1], ac[i], ac[i + 1]
        return (i + 0.5 * (y0 - y2) / (y0 - 2 * y1 + y2 + 1e-12)) * dt

    lagai = np.arange(len(ac)) * dt
    zona = (lagai > 0.375) & (lagai < 1.0)                 # 60–160 BPM
    i = int(np.argmax(np.where(zona, ac, -np.inf)))
    taktas = smaile(i * dt, 0.06)
    for k in (16, 64):                                      # ilgas lagas = tikslesnis taktas
        if taktas * k * 1.2 < len(ac) * dt:
            taktas = smaile(taktas * k, taktas * 0.25) / k
    zingsnis = taktas / dt
    geriausia, faze = -1e9, 0.0
    for f in np.arange(0, zingsnis, 0.25):
        idx = np.round(np.arange(f, len(onset) - 1, zingsnis)).astype(int)
        s = float(onset[idx].sum())
        if s > geriausia:
            geriausia, faze = s, f * dt
    return taktas, faze


def spektras(mono, t, langas=1.5):
    n, hop, w = 1024, 512, np.hanning(1024)
    seg = mono[int((t - langas) * ASR):int(t * ASR)]
    if len(seg) < n:
        return None
    v = np.mean([np.abs(np.fft.rfft(seg[i:i + n] * w)) for i in range(0, len(seg) - n, hop)], axis=0)
    return v / (np.linalg.norm(v) + 1e-9)


def tikslinti_gala(mono, A, ilgis, paieska):
    """Kilpos galas sample'o tikslumu: kur banga labiausiai sutampa su kilpos pradžia."""
    langas = int(0.25 * ASR)
    ref = mono[int(A * ASR):int(A * ASR) + langas].astype(np.float64)
    ref -= ref.mean()
    nuo = int((A + ilgis - paieska) * ASR)
    iki = int((A + ilgis + paieska) * ASR) + langas
    zona = mono[nuo:iki].astype(np.float64)
    if len(zona) < langas + 2 or not ref.any():
        return ilgis, 0.0
    n = 1
    while n < len(zona) + langas:
        n *= 2
    kor = np.fft.irfft(np.fft.rfft(zona, n) * np.conj(np.fft.rfft(ref, n)), n)[:len(zona) - langas + 1]
    energija = np.sqrt(np.convolve(zona ** 2, np.ones(langas), mode='valid')) * np.sqrt((ref ** 2).sum())
    ncc = kor / np.maximum(energija, 1e-9)
    i = int(np.argmax(ncc))
    return (nuo + i) / ASR - A, float(ncc[i])


def rasti_kilpa(mono, rms, pabaiga):
    """Kilpa: spektrai panašūs, banga sutampa, siūlė tyli, ribos ant takto."""
    onset, _ = gaubtine(mono)
    taktas, faze = taktas_ir_faze(onset)
    baras = taktas * 4
    ilgis0 = baras * TAKTAI
    kand = []
    t = faze + baras * 2
    while t + ilgis0 < pabaiga - baras:
        a, b = spektras(mono, t), spektras(mono, t + ilgis0)
        if a is not None and b is not None:
            kand.append((float(a @ b), t))
        t += baras
    kand.sort(reverse=True)

    geriausias = None
    for pan, A in kand[:KANDIDATAI]:
        ilgis, ncc = tikslinti_gala(mono, A, ilgis0, TIKSLINIMAS)
        k = int((A + ilgis) / (HOP / ASR))
        tyla = float(np.mean(rms[max(0, k - 4):k + 4]))     # kiek garso ties siūle
        balas = pan + ncc * 0.6 - tyla * 2.0
        if geriausias is None or balas > geriausias[0]:
            geriausias = (balas, A, ilgis, pan, ncc, tyla)
    _, A, ilgis, pan, ncc, tyla = geriausias
    return A, A + ilgis, ilgis, taktas, pan, ncc, tyla


def sulipdyti(x, sr, gabalai):
    """Sujungia [(nuo, iki)] gabalus vienodos galios kryžminėmis perėjomis."""
    per = int(PEREJA * sr)
    t_ = np.linspace(0, 1, per)
    fi = np.sqrt(t_)[:, None] if x.ndim > 1 else np.sqrt(t_)
    fo = np.sqrt(1 - t_)[:, None] if x.ndim > 1 else np.sqrt(1 - t_)
    isvestis = None
    for nuo, iki in gabalai:
        seg = x[int(nuo * sr):int(iki * sr)].copy()
        if isvestis is None:
            isvestis = seg
            continue
        n = min(per, len(isvestis), len(seg))
        isvestis[-n:] = isvestis[-n:] * fo[-n:] + seg[:n] * fi[-n:]
        isvestis = np.concatenate([isvestis, seg[n:]])
    return isvestis


def garso_riba(rms):
    """Kur takelyje baigiasi garsas (uodegos tyla nukerpama)."""
    garsus = np.where(rms > 0.01)[0]
    return float(garsus[-1] * HOP / ASR) if len(garsus) else 0.0


def main():
    takelis, reikia, isvestis = sys.argv[1], float(sys.argv[2]), sys.argv[3]
    mono = skaityti(takelis, ASR, 1)
    _, rms = gaubtine(mono)
    pabaiga = garso_riba(rms)
    A, B, ilgis, taktas, pan, ncc, tyla = rasti_kilpa(mono, rms, pabaiga)

    kartu = max(1, int(np.ceil((reikia - pabaiga) / ilgis)))
    visas = pabaiga + kartu * ilgis
    pradzia = min(max(0.0, visas - (reikia + 2)), A - 1.0)   # perteklių nuimame nuo INTRO

    gabalai = [(pradzia, B)] + [(A, B)] * kartu + [(B, pabaiga)]
    stereo = skaityti(takelis, SR, 2)
    lova = sulipdyti(stereo, SR, gabalai)
    if pradzia > 0.2:                                        # pradėta ne nuo takelio pradžios
        n = int(1.5 * SR)
        lova[:n] *= np.linspace(0, 1, n)[:, None]

    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '2',
                    '-i', '-', '-c:a', 'pcm_s16le', isvestis],
                   input=(np.clip(lova, -1, 1) * 32767).astype(np.int16).tobytes(), check=True)

    print(json.dumps({
        'bpm': round(float(60 / taktas), 2),
        'kilpa': [round(float(A), 3), round(float(B), 3)],
        'kilpos_ilgis': round(float(ilgis), 3),
        'taktai': TAKTAI,
        'kartojimu': kartu,
        'spektru_panasumas': round(float(pan), 4),
        'bangos_sutapimas': round(float(ncc), 4),
        'siules_tyla': round(float(tyla), 5),
        'pereja_s': PEREJA,
        'trukme': round(len(lova) / SR, 2),
    }, ensure_ascii=False))


if __name__ == '__main__':
    main()
