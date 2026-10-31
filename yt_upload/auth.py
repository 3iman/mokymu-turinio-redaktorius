"""OAuth: vienas token'as kiekvienam kanalui.

⛔ Jokių raktų, client_secret ar refresh token'ų į ekraną ar žurnalą. Niekada.
Failai gyvena .secrets/ ir yra .gitignore.
"""

from __future__ import annotations

import json
import os
import stat
from pathlib import Path

from .errors import ReikiaAutorizuoti, YtKlaida

SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.force-ssl",
]

API_VARDAS = "youtube"
API_VERSIJA = "v3"


def _importai():
    try:
        from google.auth.transport.requests import Request
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        from googleapiclient.discovery import build
    except ImportError as e:
        raise YtKlaida(
            "Trūksta bibliotekų. Paleisk:\n"
            "  python3 -m venv .venv && source .venv/bin/activate\n"
            "  pip install -r requirements.txt\n"
            f"({e})"
        )
    return Request, Credentials, InstalledAppFlow, build


def _apsaugoti(kelias: Path) -> None:
    try:
        os.chmod(kelias, stat.S_IRUSR | stat.S_IWUSR)  # 600
    except OSError:
        pass


def _issaugoti(creds, kelias: Path) -> None:
    kelias.parent.mkdir(parents=True, exist_ok=True)
    kelias.write_text(creds.to_json(), encoding="utf-8")
    _apsaugoti(kelias)


def kredencialai(cfg, kanalas: str, leisti_narsykle: bool = True):
    """Grąžina galiojančius kredencialus kanalui.

    1. Yra token'as ir galioja — imam jį.
    2. Pasibaigęs, bet yra refresh token — atnaujinam tyliai.
    3. Nieko nėra — pirmas autorizavimas per naršyklę (tik kai leisti_narsykle).
    """
    Request, Credentials, InstalledAppFlow, _ = _importai()

    token_kelias = cfg.kanalo_token_kelias(kanalas)
    creds = None

    if token_kelias.exists():
        try:
            creds = Credentials.from_authorized_user_file(str(token_kelias), SCOPES)
        except (ValueError, json.JSONDecodeError):
            raise ReikiaAutorizuoti(
                f"Kanalo „{kanalas}“ token'o failas neperskaitomas. "
                f"Ištrink {token_kelias} ir autorizuok iš naujo: "
                f"python3 -m yt_upload auth --channel {kanalas}"
            )

    if creds and creds.valid:
        return creds

    if creds and creds.expired and creds.refresh_token:
        try:
            creds.refresh(Request())
        except Exception as e:
            raise ReikiaAutorizuoti(
                f"Kanalo „{kanalas}“ prieiga nebegalioja ({type(e).__name__}). "
                f"Autorizuok iš naujo: python3 -m yt_upload auth --channel {kanalas}"
            )
        _issaugoti(creds, token_kelias)
        return creds

    if not leisti_narsykle:
        raise ReikiaAutorizuoti(
            f"Kanalas „{kanalas}“ neautorizuotas. "
            f"Paleisk: python3 -m yt_upload auth --channel {kanalas}"
        )

    secret = cfg.kanalo_client_secret(kanalas)
    if not secret.exists():
        raise YtKlaida(
            f"Nėra OAuth kliento failo: {secret}\n"
            "Google Cloud Console → APIs & Services → Credentials → OAuth client ID "
            "→ Desktop app → Download JSON. Įdėk failą nurodytu keliu."
        )

    flow = InstalledAppFlow.from_client_secrets_file(str(secret), SCOPES)
    creds = flow.run_local_server(port=0, prompt="consent")
    _issaugoti(creds, token_kelias)
    return creds


def servisas(cfg, kanalas: str, leisti_narsykle: bool = False):
    """YouTube Data API v3 klientas kanalui."""
    _, _, _, build = _importai()
    creds = kredencialai(cfg, kanalas, leisti_narsykle=leisti_narsykle)
    return build(API_VARDAS, API_VERSIJA, credentials=creds, cache_discovery=False)


def kanalo_info(servisas_obj) -> dict:
    """Kieno vardu dirbam — patikra po autorizavimo."""
    atsakymas = servisas_obj.channels().list(part="snippet", mine=True).execute()
    elementai = atsakymas.get("items") or []
    if not elementai:
        raise YtKlaida(
            "Šis Google vartotojas neturi YouTube kanalo. "
            "Jei kanalas yra Brand paskyra — autorizuojantis rinkis ją, ne asmeninę paskyrą."
        )
    s = elementai[0]["snippet"]
    return {"id": elementai[0]["id"], "title": s.get("title", "")}
