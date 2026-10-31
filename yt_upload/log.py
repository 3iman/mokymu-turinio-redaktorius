"""uploads-log.json — įrankio atmintis.

Geležinė taisyklė: jei įraše yra video_id, videos.insert nebekviečiamas NIEKADA.

Raktas — `{slug}::{lang}`, nes YOUTUBE_STRATEGY.md §145 kiekvienai rinkai skiria atskirą
kanalą: lenkiškas filmukas yra savarankiškas įkėlimas, ne lietuviško lokalizacija.
"""

from __future__ import annotations

import json
import os
import tempfile
from datetime import datetime, timedelta, timezone
from pathlib import Path

VILNIUS = timezone(timedelta(hours=3))


def dabar() -> str:
    return datetime.now(VILNIUS).replace(microsecond=0).isoformat()


def raktas(slug: str, lang: str) -> str:
    return f"{slug}::{lang}"


class Zurnalas:
    def __init__(self, kelias: Path):
        self.kelias = Path(kelias)
        self.irasai: dict = {}
        self._skaityti()

    def _skaityti(self) -> None:
        if not self.kelias.exists():
            self.irasai = {}
            return
        with self.kelias.open(encoding="utf-8") as f:
            duomenys = json.load(f)
        self.irasai = duomenys.get("uploads", duomenys) or {}

    def issaugoti(self) -> None:
        """Rašom per laikiną failą — nutrūkęs procesas nepalieka sugadinto žurnalo."""
        duomenys = {
            "_komentaras": "Įrankio atmintis. Nekeisti ranka, kol nesupranti, ką darai: "
                           "video_id buvimas draudžia pakartotinį įkėlimą.",
            "atnaujinta": dabar(),
            "uploads": self.irasai,
        }
        self.kelias.parent.mkdir(parents=True, exist_ok=True)
        fd, tmp = tempfile.mkstemp(dir=str(self.kelias.parent), suffix=".tmp")
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as f:
                json.dump(duomenys, f, ensure_ascii=False, indent=2)
                f.write("\n")
            os.replace(tmp, self.kelias)
        except Exception:
            if os.path.exists(tmp):
                os.unlink(tmp)
            raise

    # ---- skaitymas ----
    def gauti(self, slug: str, lang: str) -> dict | None:
        return self.irasai.get(raktas(slug, lang))

    def video_id(self, slug: str, lang: str) -> str | None:
        irasas = self.gauti(slug, lang) or {}
        return irasas.get("video_id")

    def ikeltas(self, slug: str, lang: str) -> bool:
        return bool(self.video_id(slug, lang))

    def pagal_statusa(self, statusas: str) -> list:
        return [v for v in self.irasai.values() if v.get("status") == statusas]

    # ---- rašymas ----
    def irasyti(self, slug: str, lang: str, **laukai) -> dict:
        r = raktas(slug, lang)
        irasas = self.irasai.setdefault(r, {"slug": slug, "lang": lang})
        irasas.update(laukai)
        self.issaugoti()
        return irasas

    def prideti_ispejima(self, slug: str, lang: str, tekstas: str) -> None:
        irasas = self.irasai.setdefault(raktas(slug, lang), {"slug": slug, "lang": lang})
        ispejimai = irasas.setdefault("warnings", [])
        if tekstas not in ispejimai:
            ispejimai.append(tekstas)
        self.issaugoti()

    def issaugoti_sesija(self, slug: str, lang: str, uri: str | None) -> None:
        """Resumable sesijos URI — kad nutrūkęs įkėlimas tęstųsi, o ne prasidėtų iš naujo."""
        self.irasyti(slug, lang, resumable_uri=uri, status="pending")
