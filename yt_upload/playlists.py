"""Grojaraščiai: randam pagal pavadinimą, jei nėra — sukuriam."""

from __future__ import annotations

from . import api


def rasti(servisas, pavadinimas, cfg, pranesti):
    puslapis = None
    while True:
        def zingsnis():
            return servisas.playlists().list(
                part="snippet", mine=True, maxResults=50, pageToken=puslapis
            ).execute()

        atsakymas = api.kartoti(zingsnis, cfg, "grojaraščių sąrašas", pranesti)
        for item in atsakymas.get("items", []):
            if (item["snippet"].get("title") or "").strip() == pavadinimas.strip():
                return item["id"]
        puslapis = atsakymas.get("nextPageToken")
        if not puslapis:
            return None


def sukurti(servisas, pavadinimas, kalba, cfg, pranesti):
    body = {
        "snippet": {"title": pavadinimas, "defaultLanguage": kalba},
        "status": {"privacyStatus": "public"},
    }

    def zingsnis():
        return servisas.playlists().insert(part="snippet,status", body=body).execute()

    atsakymas = api.kartoti(zingsnis, cfg, f"grojaraščio „{pavadinimas}“ kūrimas", pranesti)
    return atsakymas["id"]


def prideti(servisas, video_id, pavadinimas, kalba, cfg, pranesti) -> str:
    """Grąžina playlist_id. Sukuria grojaraštį, jei tokio nėra."""
    playlist_id = rasti(servisas, pavadinimas, cfg, pranesti)
    if not playlist_id:
        playlist_id = sukurti(servisas, pavadinimas, kalba, cfg, pranesti)
        pranesti(f"    sukurtas grojaraštis „{pavadinimas}“")

    body = {
        "snippet": {
            "playlistId": playlist_id,
            "resourceId": {"kind": "youtube#video", "videoId": video_id},
        }
    }

    def zingsnis():
        return servisas.playlistItems().insert(part="snippet", body=body).execute()

    api.kartoti(zingsnis, cfg, f"pridėjimas į „{pavadinimas}“", pranesti)
    return playlist_id
