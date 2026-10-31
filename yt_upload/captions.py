"""Subtitrų takeliai.

Kiekvienas subtitles/{kalba}.srt — atskiras takelis. Trūkstama kalba nėra klaida:
ji praleidžiama ir patenka į warnings. Vertimas yra kito žingsnio darbas.
"""

from __future__ import annotations

from pathlib import Path

from . import api
from .errors import YtKlaida


def _media(kelias: Path):
    try:
        from googleapiclient.http import MediaFileUpload
    except ImportError as e:
        raise YtKlaida(f"Trūksta google-api-python-client ({e})")
    return MediaFileUpload(str(kelias), mimetype="application/octet-stream", resumable=False)


def esami(servisas, video_id, cfg, pranesti) -> dict:
    """{kalba: caption_id} — kad tas pats takelis nebūtų įkeltas antrą kartą.

    ⛔ YouTube pats sugeneruoja `asr` takelį iš garso (2026-09-20). Jis NĖRA mūsų
    subtitrai: mašina klysta ties terminais ir vardais. Skaičiuojami tik `standard`
    takeliai, kitaip automatinis takelis tyliai užblokuoja tikrųjų įkėlimą.
    """
    def zingsnis():
        return servisas.captions().list(part="snippet", videoId=video_id).execute()

    atsakymas = api.kartoti(zingsnis, cfg, "subtitrų sąrašas", pranesti)
    rasta = {}
    for item in atsakymas.get("items", []):
        s = item.get("snippet", {})
        if s.get("trackKind") == "asr":
            continue
        rasta[s.get("language")] = item.get("id")
    return rasta


def ikelti(servisas, meta, video_id, cfg, pranesti, tik_truksta: bool = True):
    """Grąžina (issiusta, praleista, ispejimai)."""
    failai = meta.subtitrai()
    if not failai:
        return [], [], [f"{k}: nėra subtitrų failo" for k in meta.truksta_subtitru()]

    turimi = esami(servisas, video_id, cfg, pranesti) if tik_truksta else {}

    issiusta, praleista, ispejimai = [], [], []
    for kalba in sorted(failai):
        if kalba in turimi:
            praleista.append(kalba)
            continue
        body = {
            "snippet": {
                "videoId": video_id,
                "language": kalba,
                "name": "",
                "isDraft": False,
            }
        }

        def zingsnis(kelias=failai[kalba]):
            return servisas.captions().insert(
                part="snippet", body=body, media_body=_media(kelias)
            ).execute()

        try:
            api.kartoti(zingsnis, cfg, f"{meta.slug} subtitrai {kalba}", pranesti)
            issiusta.append(kalba)
        except YtKlaida as e:
            ispejimai.append(f"{kalba}: subtitrų įkelti nepavyko — {e}")

    for kalba in meta.truksta_subtitru():
        ispejimai.append(f"{kalba}: nėra subtitrų failo")

    return issiusta, praleista, ispejimai
