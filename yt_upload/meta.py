"""meta.json skaitymas.

Failas gyvena šalia jau esamų gamybos failų:
    lessons/{slug}/video/youtube-{lang}.json

Keliai jame — santykiniai to paties katalogo atžvilgiu. Numatytieji atitinka esamą
gamybos tvarką ({slug}-{lang}.mp4), todėl dažniausiai jų rašyti nereikia.
"""

from __future__ import annotations

import json
from pathlib import Path

from .config import Config


class Meta:
    def __init__(self, duomenys: dict, kelias: Path, cfg: Config):
        self.raw = duomenys
        self.kelias = Path(kelias)
        self.dir = self.kelias.parent
        self.cfg = cfg

    # ---- tapatybė ----
    @property
    def slug(self) -> str:
        return self.raw.get("slug") or ""

    @property
    def source_language(self) -> str:
        return self.raw.get("source_language") or ""

    @property
    def audio_language(self) -> str | None:
        """Kalba, kuria KALBAMA. Filmukui be balso jos nėra — ir melo čia nerašom."""
        return self.raw.get("audio_language") or None

    @property
    def lang(self) -> str:
        """Kalba, kuria šis įkėlimas identifikuojamas žurnale."""
        return self.source_language

    @property
    def channel(self) -> str:
        return self.raw.get("channel") or (self.cfg.kanalas_kalbai(self.source_language) or "")

    @property
    def variant_of(self) -> str | None:
        return self.raw.get("variant_of")

    # ---- YouTube laukai ----
    @property
    def category_id(self) -> str:
        return str(self.raw.get("category_id") or self.cfg.numatyta["category_id"])

    @property
    def made_for_kids(self) -> bool:
        reiksme = self.raw.get("made_for_kids")
        if reiksme is None:
            return bool(self.cfg.numatyta["made_for_kids"])
        return bool(reiksme)

    @property
    def privacy(self) -> str:
        return self.raw.get("privacy") or self.cfg.numatyta["privacy"]

    @property
    def publish_at(self) -> str | None:
        return self.raw.get("publish_at")

    @property
    def playlist(self) -> str | None:
        if "playlist" in self.raw:
            return self.raw["playlist"]
        kanalas = self.cfg.channels.get(self.channel) or {}
        return kanalas.get("numatytasis_playlist")

    @property
    def related_url(self) -> str | None:
        return self.raw.get("related_url")

    @property
    def localizations(self) -> dict:
        return self.raw.get("localizations") or {}

    def lokalizacija(self, kalba: str) -> dict:
        return self.localizations.get(kalba) or {}

    @property
    def title(self) -> str:
        return (self.lokalizacija(self.source_language).get("title") or "").strip()

    @property
    def description(self) -> str:
        return self.lokalizacija(self.source_language).get("description") or ""

    @property
    def tags(self) -> list:
        return list(self.lokalizacija(self.source_language).get("tags") or [])

    # ---- failai ----
    @property
    def video_path(self) -> Path:
        vardas = self.raw.get("video") or f"{self.slug}-{self.source_language}.mp4"
        return (self.dir / vardas).resolve()

    @property
    def thumbnail_path(self) -> Path | None:
        vardas = self.raw.get("thumbnail")
        if vardas is None:
            numatytas = self.dir / f"thumbnail-{self.source_language}.png"
            return numatytas if numatytas.exists() else None
        if not vardas:
            return None
        return (self.dir / vardas).resolve()

    def subtitrai(self) -> dict:
        """{kalba: kelias} tik tiems failams, kurie tikrai yra.

        Trūkstama kalba nėra klaida — ji praleidžiama ir užfiksuojama warnings.
        """
        rasta = {}
        nurodyti = self.raw.get("subtitles")
        if isinstance(nurodyti, dict):
            for kalba, vardas in nurodyti.items():
                kelias = (self.dir / vardas).resolve()
                if kelias.exists():
                    rasta[kalba] = kelias
            return rasta
        katalogas = self.dir / (nurodyti or "subtitles")
        if katalogas.is_dir():
            for kalba in self.localizations:
                kelias = katalogas / f"{kalba}.srt"
                if kelias.exists():
                    rasta[kalba] = kelias
        return rasta

    def truksta_subtitru(self) -> list:
        turi = set(self.subtitrai())
        return [k for k in self.localizations if k not in turi]


def skaityti_meta(kelias: Path, cfg: Config) -> Meta:
    kelias = Path(kelias)
    with kelias.open(encoding="utf-8") as f:
        duomenys = json.load(f)
    return Meta(duomenys, kelias, cfg)


def rasti_visus(cfg: Config, slug: str | None = None, lang: str | None = None) -> list:
    """Inventorius: visi lessons/*/video/youtube-*.json."""
    rasta = []
    saka = cfg.lessons_dir
    if not saka.is_dir():
        return rasta
    for pamoka in sorted(p for p in saka.iterdir() if p.is_dir()):
        if slug and pamoka.name != slug:
            continue
        video_dir = pamoka / "video"
        if not video_dir.is_dir():
            continue
        for kelias in sorted(video_dir.glob("youtube-*.json")):
            kalba = kelias.stem.replace("youtube-", "", 1)
            if lang and kalba != lang:
                continue
            rasta.append(skaityti_meta(kelias, cfg))
    return rasta
