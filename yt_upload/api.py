"""Bendra API mechanika: klaidų atpažinimas ir kartojimas.

Skirtumas tarp „tinklas mirktelėjo“ ir „kvota baigėsi“ yra esminis: pirmu atveju
kartojam, antru — sustojam ir paliekam likusius pending.
"""

from __future__ import annotations

import json
import random
import socket
import ssl
import time

from .errors import KvotaBaigesi, ReikiaAutorizuoti, YtKlaida

KVOTOS_PRIEZASTYS = {"quotaExceeded", "dailyLimitExceeded", "rateLimitExceeded",
                     "userRateLimitExceeded", "uploadLimitExceeded"}

LAIKINOS_PRIEZASTYS = {"backendError", "internalError", "transientError",
                       "rateLimitExceeded", "userRateLimitExceeded"}


def _http_error():
    try:
        from googleapiclient.errors import HttpError
    except ImportError:
        return ()
    return (HttpError,)


def priezastis(err) -> str:
    """Išlukštena YouTube klaidos „reason“ be steko triukšmo."""
    turinys = getattr(err, "content", b"") or b""
    if isinstance(turinys, bytes):
        turinys = turinys.decode("utf-8", "replace")
    try:
        duomenys = json.loads(turinys)
    except (ValueError, TypeError):
        return ""
    klaida = duomenys.get("error") or {}
    detales = klaida.get("errors") or []
    if detales:
        return detales[0].get("reason", "") or ""
    return klaida.get("status", "") or ""


def zinute(err) -> str:
    turinys = getattr(err, "content", b"") or b""
    if isinstance(turinys, bytes):
        turinys = turinys.decode("utf-8", "replace")
    try:
        duomenys = json.loads(turinys)
        return (duomenys.get("error") or {}).get("message", "") or turinys[:200]
    except (ValueError, TypeError):
        return turinys[:200]


def statusas(err) -> int:
    resp = getattr(err, "resp", None)
    return int(getattr(resp, "status", 0) or 0)


def perversti(err):
    """HttpError → mūsų klaidų tipas. Grąžina None, jei klaida nėra galutinė."""
    kodas = statusas(err)
    kas = priezastis(err)
    if kas in KVOTOS_PRIEZASTYS and kas not in ("rateLimitExceeded", "userRateLimitExceeded"):
        return KvotaBaigesi(
            "YouTube kvota išnaudota (quotaExceeded). Likę filmukai lieka „pending“."
        )
    if kodas in (401,):
        return ReikiaAutorizuoti(
            "Prieiga atmesta (401). Reikia autorizuoti iš naujo: "
            "python3 -m yt_upload auth --channel <kanalas>"
        )
    if kodas == 403 and kas in KVOTOS_PRIEZASTYS:
        return KvotaBaigesi("YouTube kvota išnaudota (403).")
    return None


def laikina(err) -> bool:
    """Ar verta kartoti."""
    if isinstance(err, (socket.timeout, socket.error, ssl.SSLError, ConnectionError, TimeoutError)):
        return True
    for tipas in _http_error():
        if isinstance(err, tipas):
            if statusas(err) in (500, 502, 503, 504):
                return True
            return priezastis(err) in LAIKINOS_PRIEZASTYS
    return False


def kartoti(veiksmas, cfg, aprasymas: str, pranesti=None):
    """Vykdo veiksmą su kartojimais pagal config/settings.json → tinklas."""
    pauzes = cfg.tinklas["pauze_sek"]
    bandymai = int(cfg.tinklas["bandymai"])
    paskutine = None

    for bandymas in range(1, bandymai + 1):
        try:
            return veiksmas()
        except Exception as e:  # noqa: BLE001 — klasifikuojam žemiau
            galutine = perversti(e)
            if galutine is not None:
                raise galutine
            if not laikina(e) or bandymas == bandymai:
                if isinstance(e, YtKlaida):
                    raise
                raise YtKlaida(f"{aprasymas}: {zinute(e) or e}") from e
            paskutine = e
            pauze = pauzes[min(bandymas - 1, len(pauzes) - 1)] + random.uniform(0, 1)
            if pranesti:
                pranesti(f"    tinklo klaida ({bandymas}/{bandymai}), kartojam po {pauze:.0f} s")
            time.sleep(pauze)

    raise YtKlaida(f"{aprasymas}: nepavyko po {bandymai} bandymų ({paskutine})")
