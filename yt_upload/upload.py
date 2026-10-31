"""Video įkėlimas (resumable) ir lokalizacijos.

⛔ Geležinė taisyklė: jei žurnale slug jau turi video_id — videos.insert nekviečiamas.
Ta taisyklė gyvena cli.py, bet čia dar kartą patikrinama, kad neapeitų atsitiktinai.
"""

from __future__ import annotations

from pathlib import Path

from . import api
from .errors import YtKlaida


def _media(kelias: Path, cfg):
    try:
        from googleapiclient.http import MediaFileUpload
    except ImportError as e:
        raise YtKlaida(f"Trūksta google-api-python-client ({e})")
    return MediaFileUpload(
        str(kelias),
        chunksize=int(cfg.tinklas["gabalas_baitai"]),
        resumable=True,
        mimetype="video/*",
    )


def _snippet(meta) -> dict:
    s = {
        "title": meta.title,
        "description": meta.description,
        "tags": meta.tags,
        "categoryId": meta.category_id,
    }
    if meta.source_language:
        s["defaultLanguage"] = meta.source_language
    if meta.audio_language:
        s["defaultAudioLanguage"] = meta.audio_language
    return s


def _status(meta) -> dict:
    st = {
        "privacyStatus": meta.privacy,
        "selfDeclaredMadeForKids": bool(meta.made_for_kids),
        "embeddable": bool(meta.cfg.numatyta.get("embeddable", True)),
    }
    if meta.publish_at:
        st["publishAt"] = meta.publish_at
    return st


def _sesija_tinka(irasas: dict, kelias: Path) -> bool:
    """Sena resumable sesija tinka tik tam pačiam failui."""
    if not irasas or not irasas.get("resumable_uri"):
        return False
    st = kelias.stat()
    return (
        irasas.get("failo_dydis") == st.st_size
        and irasas.get("failo_mtime") == int(st.st_mtime)
    )


def ikelti(servisas, meta, cfg, zurnalas, pranesti) -> str:
    """Įkelia video ir grąžina video_id. Atnaujina žurnalą kelyje."""
    slug, lang = meta.slug, meta.lang

    jau = zurnalas.video_id(slug, lang)
    if jau:
        raise YtKlaida(
            f"{slug} ({lang}) jau turi video_id {jau} — pakartotinis įkėlimas draudžiamas"
        )

    body = {"snippet": _snippet(meta), "status": _status(meta)}
    media = _media(meta.video_path, cfg)
    uzklausa = servisas.videos().insert(
        part="snippet,status", body=body, media_body=media, notifySubscribers=False
    )

    irasas = zurnalas.gauti(slug, lang) or {}
    if _sesija_tinka(irasas, meta.video_path):
        uzklausa.resumable_uri = irasas["resumable_uri"]
        pranesti("    tęsiam nutrūkusį įkėlimą")
    else:
        st = meta.video_path.stat()
        zurnalas.irasyti(
            slug, lang,
            status="pending",
            channel=meta.channel,
            failo_dydis=st.st_size,
            failo_mtime=int(st.st_mtime),
            resumable_uri=None,
        )

    atsakymas = None
    paskutinis_uri = uzklausa.resumable_uri
    while atsakymas is None:
        def zingsnis():
            return uzklausa.next_chunk()

        statusas, atsakymas = api.kartoti(zingsnis, cfg, f"{slug} įkėlimas", pranesti)

        if uzklausa.resumable_uri and uzklausa.resumable_uri != paskutinis_uri:
            paskutinis_uri = uzklausa.resumable_uri
            zurnalas.irasyti(slug, lang, resumable_uri=paskutinis_uri, status="pending")

        if statusas and atsakymas is None:
            pranesti(f"    {int(statusas.progress() * 100)} %", perrasyti=True)

    video_id = atsakymas.get("id")
    if not video_id:
        raise YtKlaida(f"{slug}: YouTube negrąžino video_id")

    zurnalas.irasyti(
        slug, lang,
        video_id=video_id,
        url=f"https://youtu.be/{video_id}",
        status="uploaded",
        privacy=meta.privacy,
        channel=meta.channel,
        resumable_uri=None,
    )
    return video_id


def lokalizacijos(servisas, meta, video_id, cfg, pranesti) -> list:
    """Įrašo visas localizations. Grąžina išsiųstų kalbų sąrašą."""
    if not meta.localizations:
        return []

    body = {
        "id": video_id,
        "snippet": dict(_snippet(meta), defaultLanguage=meta.source_language),
        "localizations": {
            kalba: {
                "title": (l.get("title") or "").strip(),
                "description": l.get("description") or "",
            }
            for kalba, l in meta.localizations.items()
        },
    }

    def zingsnis():
        return servisas.videos().update(part="snippet,localizations", body=body).execute()

    api.kartoti(zingsnis, cfg, f"{meta.slug} lokalizacijos", pranesti)
    return sorted(meta.localizations)


def miniatiura(servisas, meta, video_id, cfg, pranesti) -> bool:
    kelias = meta.thumbnail_path
    if kelias is None:
        return False

    def zingsnis():
        return servisas.thumbnails().set(videoId=video_id, media_body=str(kelias)).execute()

    api.kartoti(zingsnis, cfg, f"{meta.slug} miniatiūra", pranesti)
    return True
