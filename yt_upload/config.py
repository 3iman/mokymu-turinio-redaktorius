"""Konfigūracija: settings.json + channels.json.

⛔ Kalbų ir kanalų sąrašo kode NĖRA. Nauja rinka pridedama tik JSON failuose.
"""

from __future__ import annotations

import json
import os
from pathlib import Path

# illustrations/ — paketo tėvinis katalogas
ROOT = Path(__file__).resolve().parent.parent


class ConfigKlaida(Exception):
    pass


def _skaityti(kelias: Path) -> dict:
    if not kelias.exists():
        raise ConfigKlaida(f"Nėra konfigūracijos failo: {kelias}")
    with kelias.open(encoding="utf-8") as f:
        return json.load(f)


class Config:
    def __init__(self, root: Path | None = None):
        self.root = Path(root) if root else ROOT
        self.settings = _skaityti(self.root / "config" / "settings.json")
        self.channels = _skaityti(self.root / "config" / "channels.json")["channels"]

    # ---- keliai ----
    @property
    def lessons_dir(self) -> Path:
        return self.root / self.settings["keliai"]["lessons"]

    @property
    def log_path(self) -> Path:
        return self.root / self.settings["keliai"]["log"]

    def kelias(self, santykinis: str) -> Path:
        return self.root / santykinis

    # ---- kalbos ----
    @property
    def kalbos(self) -> dict:
        return self.settings["kalbos"]

    def kalba_zinoma(self, kodas: str) -> bool:
        return kodas in self.settings["kalbos"]

    def kanalas_kalbai(self, kodas: str) -> str | None:
        return (self.settings["kalbos"].get(kodas) or {}).get("kanalas")

    def tagai(self, kodas: str) -> list:
        return list(self.settings.get("tagai", {}).get(kodas, []))

    # ---- kanalai ----
    def kanalas(self, raktas: str) -> dict:
        if raktas not in self.channels:
            zinomi = ", ".join(sorted(self.channels)) or "(nėra nė vieno)"
            raise ConfigKlaida(
                f"Kanalas „{raktas}“ nežinomas. config/channels.json turi: {zinomi}"
            )
        return self.channels[raktas]

    def kanalo_token_kelias(self, raktas: str) -> Path:
        return self.root / self.kanalas(raktas)["token"]

    def kanalo_client_secret(self, raktas: str) -> Path:
        k = self.kanalas(raktas)
        # Leidžiam nurodyti ir per aplinkos kintamąjį — patogu vienam bendram OAuth klientui
        env = os.environ.get("YT_CLIENT_SECRET")
        if env:
            return Path(env)
        return self.root / k["client_secret"]

    # ---- ribos ir kvota ----
    @property
    def ribos(self) -> dict:
        return self.settings["ribos"]

    @property
    def kvota(self) -> dict:
        return self.settings["kvota"]

    @property
    def numatyta(self) -> dict:
        return self.settings["numatyta"]

    @property
    def tinklas(self) -> dict:
        return self.settings["tinklas"]
