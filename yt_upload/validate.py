"""Validacija PRIEŠ siuntimą.

YouTube ribas geriau sužinoti čia, o ne po 50 MB įkėlimo.
"""

from __future__ import annotations

import re
from datetime import datetime

DRAUDZIAMI = ("<", ">")
ISO = re.compile(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$")
PRIVATUMAS = ("private", "unlisted", "public")


def tikrinti(meta, cfg) -> list:
    """Grąžina klaidų sąrašą. Tuščias sąrašas = galima siųsti."""
    klaidos = []
    ribos = cfg.ribos

    # --- tapatybė ---
    if not meta.slug:
        klaidos.append("nėra „slug“")
    if not meta.source_language:
        klaidos.append("nėra „source_language“")
    elif not cfg.kalba_zinoma(meta.source_language):
        klaidos.append(
            f"kalba „{meta.source_language}“ nežinoma — pridėk ją į config/settings.json"
        )
    if meta.audio_language and not cfg.kalba_zinoma(meta.audio_language):
        klaidos.append(f"audio_language „{meta.audio_language}“ nežinoma config/settings.json")

    if not meta.channel:
        klaidos.append(
            f"nenurodytas kanalas, o kalbai „{meta.source_language}“ jo nėra config/settings.json"
        )
    else:
        try:
            kanalas = cfg.kanalas(meta.channel)
        except Exception as e:
            klaidos.append(str(e))
        else:
            if not kanalas.get("aktyvus", True):
                klaidos.append(
                    f"kanalas „{meta.channel}“ pažymėtas neaktyviu (config/channels.json)"
                )

    # --- vaikams skirtas turinys ---
    if meta.made_for_kids:
        klaidos.append(
            "made_for_kids yra true. Auditorija — suaugę mokyklų darbuotojai; "
            "jei tai tikrai turinys vaikams, tai sąmoningas sprendimas, kurį patvirtina žmogus"
        )

    # --- privatumas ---
    if meta.privacy not in PRIVATUMAS:
        klaidos.append(f"privacy „{meta.privacy}“ — galimi: {', '.join(PRIVATUMAS)}")
    if meta.publish_at:
        if meta.privacy != "private":
            klaidos.append("publish_at veikia tik kai privacy = private")
        if not ISO.match(str(meta.publish_at)):
            klaidos.append(f"publish_at „{meta.publish_at}“ nėra ISO 8601 su laiko juosta")
        else:
            try:
                kada = datetime.fromisoformat(str(meta.publish_at).replace("Z", "+00:00"))
                if kada < datetime.now(kada.tzinfo):
                    klaidos.append(f"publish_at {meta.publish_at} yra praeityje")
            except ValueError:
                klaidos.append(f"publish_at „{meta.publish_at}“ neperskaitomas")

    # --- lokalizacijos ---
    if not meta.localizations:
        klaidos.append("nėra „localizations“ — be jų nėra nei pavadinimo, nei aprašymo")
    if meta.source_language and meta.source_language not in meta.localizations:
        klaidos.append(
            f"localizations neturi „{meta.source_language}“ — tai pagrindinė šio įkėlimo kalba"
        )

    for kalba, l in meta.localizations.items():
        if not cfg.kalba_zinoma(kalba):
            klaidos.append(f"localizations.{kalba}: kalba nežinoma config/settings.json")
        title = (l.get("title") or "").strip()
        desc = l.get("description") or ""
        tags = l.get("tags") or []

        if not title:
            klaidos.append(f"localizations.{kalba}: tuščias title")
        elif len(title) > ribos["title"]:
            klaidos.append(
                f"localizations.{kalba}: title {len(title)} simb. (riba {ribos['title']})"
            )
        if any(z in title for z in DRAUDZIAMI):
            klaidos.append(f"localizations.{kalba}: title turi < arba >")

        if len(desc) > ribos["description"]:
            klaidos.append(
                f"localizations.{kalba}: description {len(desc)} simb. (riba {ribos['description']})"
            )
        if any(z in desc for z in DRAUDZIAMI):
            klaidos.append(f"localizations.{kalba}: description turi < arba >")

        if not isinstance(tags, list):
            klaidos.append(f"localizations.{kalba}: tags turi būti sąrašas")
        else:
            viso = sum(len(t) for t in tags) + max(0, len(tags) - 1)
            if viso > ribos["tags_viso"]:
                klaidos.append(
                    f"localizations.{kalba}: tagai {viso} simb. (riba {ribos['tags_viso']})"
                )

    # --- failai ---
    if not meta.video_path.exists():
        klaidos.append(f"nėra video failo: {meta.video_path}")
    elif meta.video_path.stat().st_size == 0:
        klaidos.append(f"video failas tuščias: {meta.video_path}")

    mini = meta.thumbnail_path
    if mini is not None:
        if not mini.exists():
            klaidos.append(f"nėra miniatiūros: {mini}")
        elif mini.stat().st_size > ribos["thumbnail_baitai"]:
            mb = mini.stat().st_size / 1048576
            klaidos.append(f"miniatiūra {mb:.1f} MB (riba 2 MB)")

    return klaidos


def ispejimai(meta) -> list:
    """Ne klaidos — tai, ką reikia užfiksuoti, bet dėl ko nesustojam."""
    isp = []
    for kalba in meta.truksta_subtitru():
        isp.append(f"{kalba}: nėra subtitrų failo")
    if meta.thumbnail_path is None:
        isp.append("nėra miniatiūros — YouTube parinks kadrą pats")
    return isp
