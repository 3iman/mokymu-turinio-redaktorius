"""Klaidų tipai, kuriuos supranta CLI."""

from __future__ import annotations


class YtKlaida(Exception):
    """Bendras tipas — pranešama vartotojui be steko."""


class KvotaBaigesi(YtKlaida):
    """quotaExceeded: sustojam, likusius paliekam pending."""


class ReikiaAutorizuoti(YtKlaida):
    """Refresh token nebegalioja — reikia žmogaus."""


class ValidacijosKlaida(YtKlaida):
    """meta.json netinkamas — nesiunčiam."""
