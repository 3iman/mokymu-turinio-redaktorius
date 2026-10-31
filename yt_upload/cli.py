"""yt_upload CLI.

  python3 -m yt_upload auth --channel cleverphant-lt
  python3 -m yt_upload run --dry-run
  python3 -m yt_upload run --lesson slapukai --lang lt
  python3 -m yt_upload update slapukai --lang lt
  python3 -m yt_upload verify
  python3 -m yt_upload status
"""

from __future__ import annotations

import argparse
import sys

from . import captions as captions_mod
from . import playlists as playlists_mod
from . import upload as upload_mod
from . import validate as validate_mod
from .config import Config, ConfigKlaida
from .errors import KvotaBaigesi, ReikiaAutorizuoti, ValidacijosKlaida, YtKlaida
from .log import Zurnalas, dabar
from .meta import rasti_visus

# ---- išvedimas ----


def pranesti(tekstas: str = "", perrasyti: bool = False) -> None:
    if perrasyti and sys.stdout.isatty():
        sys.stdout.write("\r" + tekstas.ljust(60))
        sys.stdout.flush()
    else:
        if perrasyti:
            return
        print(tekstas)


def antraste(tekstas: str) -> None:
    print("")
    print(tekstas)
    print("─" * max(12, len(tekstas)))


# ---- fazė 1: inventorius ----


def inventorius(cfg, zurnalas, slug=None, lang=None):
    """Grąžina (eile, jau_ikelti). Eilėje — tie, kurių nėra žurnale arba pending/error."""
    visi = rasti_visus(cfg, slug=slug, lang=lang)
    eile, ikelti = [], []
    for meta in visi:
        irasas = zurnalas.gauti(meta.slug, meta.lang) or {}
        if irasas.get("video_id"):
            ikelti.append(meta)
        else:
            eile.append(meta)
    return eile, ikelti


def kvotos_ivertinimas(cfg, kiek: int) -> str:
    k = cfg.kvota
    kaina = int(k["upload_kaina"])
    telpa = int(k["paros_limitas"]) // kaina if kaina else kiek
    eilute = (f"Kvota: {kiek} × {kaina} = {kiek * kaina} iš {k['paros_limitas']} "
              f"vienetų (per parą telpa ~{telpa})")
    if kiek > telpa:
        eilute += f"\n⛔ Netelpa. Pirmieji {telpa} bus įkelti, likę liks „pending“."
    return eilute


# ---- fazė 2: vienas filmukas ----


def apdoroti(cfg, zurnalas, meta, servisas, numeris, viso):
    """Vienas filmukas. Kiekvienas žingsnis atskirai — po įkėlimo klaidos virsta warnings."""
    slug, lang = meta.slug, meta.lang
    pranesti(f"  [{numeris}/{viso}] {slug} ({lang}) — {meta.title}")

    klaidos = validate_mod.tikrinti(meta, cfg)
    if klaidos:
        zurnalas.irasyti(slug, lang, status="error",
                         errors=klaidos, checked_at=dabar())
        pranesti("    ✗ validacija:")
        for k in klaidos:
            pranesti(f"      · {k}")
        return "error"

    ispejimai = list(validate_mod.ispejimai(meta))

    video_id = upload_mod.ikelti(servisas, meta, cfg, zurnalas, pranesti)
    pranesti(f"    ✓ įkelta: https://youtu.be/{video_id}")

    # --- lokalizacijos ---
    issiusta_l = []
    try:
        issiusta_l = upload_mod.lokalizacijos(servisas, meta, video_id, cfg, pranesti)
        if issiusta_l:
            pranesti(f"    ✓ lokalizacijos: {', '.join(issiusta_l)}")
    except KvotaBaigesi:
        raise
    except YtKlaida as e:
        ispejimai.append(f"lokalizacijos: {e}")

    # --- miniatiūra ---
    try:
        if upload_mod.miniatiura(servisas, meta, video_id, cfg, pranesti):
            pranesti("    ✓ miniatiūra")
    except KvotaBaigesi:
        raise
    except YtKlaida as e:
        ispejimai.append(f"miniatiūra: {e}")

    # --- subtitrai ---
    issiusta_s = []
    try:
        issiusta_s, _, isp = captions_mod.ikelti(servisas, meta, video_id, cfg, pranesti)
        ispejimai.extend(isp)
        if issiusta_s:
            pranesti(f"    ✓ subtitrai: {', '.join(issiusta_s)}")
    except KvotaBaigesi:
        raise
    except YtKlaida as e:
        ispejimai.append(f"subtitrai: {e}")

    # --- grojaraštis ---
    playlist_id = None
    if meta.playlist:
        try:
            playlist_id = playlists_mod.prideti(
                servisas, video_id, meta.playlist, meta.source_language, cfg, pranesti
            )
            pranesti(f"    ✓ grojaraštis: {meta.playlist}")
        except KvotaBaigesi:
            raise
        except YtKlaida as e:
            ispejimai.append(f"grojaraštis: {e}")

    # Tas pats įspėjimas ateina iš dviejų vietų (validacijos ir subtitrų žingsnio) —
    # žurnale ir suvestinėje jis turi būti vienas.
    ispejimai = list(dict.fromkeys(ispejimai))

    zurnalas.irasyti(
        slug, lang,
        status="done",
        channel=meta.channel,
        privacy=meta.privacy,
        publish_at=meta.publish_at,
        title=meta.title,
        localizations_sent=issiusta_l,
        subtitles_sent=issiusta_s,
        playlist_id=playlist_id,
        variant_of=meta.variant_of,
        related_url=meta.related_url,
        warnings=ispejimai,
        uploaded_at=dabar(),
    )
    for i in ispejimai:
        pranesti(f"    ⚠ {i}")
    return "done"


# ---- komandos ----


def cmd_auth(args, cfg):
    from . import auth as auth_mod

    kanalas = args.channel
    servisas = auth_mod.servisas(cfg, kanalas, leisti_narsykle=True)
    info = auth_mod.kanalo_info(servisas)
    pranesti(f"✓ Kanalas „{info['title']}“ autorizuotas ({kanalas}).")
    pranesti(f"  Token'as: {cfg.kanalo_token_kelias(kanalas)} (teisės 600, .gitignore)")
    return 0


def cmd_run(args, cfg):
    from . import auth as auth_mod

    zurnalas = Zurnalas(cfg.log_path)
    eile, ikelti = inventorius(cfg, zurnalas, args.lesson, args.lang)

    antraste("1. Inventorius")
    pranesti(f"Rasta {len(eile)} video įkėlimui. Jau įkelta anksčiau: {len(ikelti)}.")
    if args.limit:
        eile = eile[: args.limit]
        pranesti(f"Apribota iki {len(eile)}.")
    if not eile:
        pranesti("Nėra ko kelti.")
        return 0
    pranesti(kvotos_ivertinimas(cfg, len(eile)))

    # --- dry-run ---
    if args.dry_run:
        antraste("2. Ką būtų įkelta (--dry-run, niekas nesiunčiama)")
        blogi = 0
        for i, meta in enumerate(eile, 1):
            klaidos = validate_mod.tikrinti(meta, cfg)
            zenklas = "✓" if not klaidos else "✗"
            pranesti(f"  {zenklas} [{i}/{len(eile)}] {meta.slug} ({meta.lang}) → {meta.channel}")
            rodomas = meta.title if len(meta.title) <= 70 else meta.title[:67] + "…"
            pranesti(f"      „{rodomas}“ · {meta.privacy} · kat. {meta.category_id}")
            pranesti(f"      failas: {meta.video_path.name}")
            pranesti(f"      lokalizacijos: {', '.join(sorted(meta.localizations)) or '—'}")
            subs = sorted(meta.subtitrai())
            pranesti(f"      subtitrai: {', '.join(subs) or '—'}")
            if meta.playlist:
                pranesti(f"      grojaraštis: {meta.playlist}")
            for isp in validate_mod.ispejimai(meta):
                pranesti(f"      ⚠ {isp}")
            for k in klaidos:
                pranesti(f"      · {k}")
            if klaidos:
                blogi += 1
        antraste("Suvestinė")
        pranesti(f"Paruošta: {len(eile) - blogi} · su klaidomis: {blogi}")
        return 1 if blogi else 0

    # --- tikras įkėlimas ---
    antraste("2. Įkėlimas")
    servisai = {}
    statistika = {"done": 0, "error": 0, "pending": 0}
    try:
        for i, meta in enumerate(eile, 1):
            if meta.channel not in servisai:
                servisai[meta.channel] = auth_mod.servisas(cfg, meta.channel)
            try:
                rezultatas = apdoroti(cfg, zurnalas, meta, servisai[meta.channel], i, len(eile))
            except (KvotaBaigesi, ReikiaAutorizuoti):
                raise
            except YtKlaida as e:
                # Vienas filmukas nepavyko — eilė nesustoja. Nutrūkęs įkėlimas
                # žurnale pasilieka resumable_uri, tad kitas paleidimas tęsia, ne kartoja.
                pranesti(f"    ✗ {e}")
                zurnalas.irasyti(meta.slug, meta.lang, status="error",
                                 errors=[str(e)], checked_at=dabar())
                rezultatas = "error"
            statistika[rezultatas] = statistika.get(rezultatas, 0) + 1
    except KvotaBaigesi as e:
        statistika["pending"] = len(eile) - statistika["done"] - statistika["error"]
        pranesti("")
        pranesti(f"⛔ {e}")
        pranesti(f"   Kvota atsinaujina {cfg.kvota['atsinaujina']}.")
        pranesti(f"   Liko „pending“: {statistika['pending']}. Paleisk tą pačią komandą vėliau.")
    except ReikiaAutorizuoti as e:
        pranesti("")
        pranesti(f"⛔ {e}")
        return 2

    antraste("3. Verifikacija")
    verifikuoti(cfg, zurnalas, servisai, args.lesson, args.lang)
    suvestine(cfg, zurnalas)
    return 0 if not statistika.get("error") else 1


def cmd_update(args, cfg):
    """Papildo JAU įkeltą video: lokalizacijos + trūkstami subtitrai. Jokio insert."""
    from . import auth as auth_mod

    zurnalas = Zurnalas(cfg.log_path)
    visi = rasti_visus(cfg, slug=args.lesson, lang=args.lang)
    if not visi:
        pranesti(f"Nerasta meta failų: {args.lesson}")
        return 1

    kodas = 0
    for meta in visi:
        video_id = zurnalas.video_id(meta.slug, meta.lang)
        if not video_id:
            pranesti(f"  ⏭ {meta.slug} ({meta.lang}): dar neįkeltas — čia ne --update darbas")
            continue

        pranesti(f"  {meta.slug} ({meta.lang}) → {video_id}")
        klaidos = validate_mod.tikrinti(meta, cfg)
        if klaidos:
            for k in klaidos:
                pranesti(f"      · {k}")
            kodas = 1
            continue

        if args.dry_run:
            pranesti(f"    [dry-run] lokalizacijos: {', '.join(sorted(meta.localizations))}")
            pranesti(f"    [dry-run] subtitrai: {', '.join(sorted(meta.subtitrai())) or '—'}")
            continue

        servisas = auth_mod.servisas(cfg, meta.channel)
        ispejimai = []

        try:
            issiusta_l = upload_mod.lokalizacijos(servisas, meta, video_id, cfg, pranesti)
            pranesti(f"    ✓ lokalizacijos: {', '.join(issiusta_l) or '—'}")
        except YtKlaida as e:
            issiusta_l = []
            ispejimai.append(f"lokalizacijos: {e}")

        issiusta_s, praleista, isp = captions_mod.ikelti(
            servisas, meta, video_id, cfg, pranesti
        )
        ispejimai.extend(isp)
        if issiusta_s:
            pranesti(f"    ✓ nauji subtitrai: {', '.join(issiusta_s)}")
        if praleista:
            pranesti(f"    ⏭ jau buvo: {', '.join(praleista)}")

        irasas = zurnalas.gauti(meta.slug, meta.lang) or {}
        zurnalas.irasyti(
            meta.slug, meta.lang,
            localizations_sent=issiusta_l or irasas.get("localizations_sent", []),
            subtitles_sent=sorted(set(irasas.get("subtitles_sent", [])) | set(issiusta_s)),
            warnings=ispejimai,
            updated_at=dabar(),
        )
        for i in ispejimai:
            pranesti(f"    ⚠ {i}")
    return kodas


def verifikuoti(cfg, zurnalas, servisai=None, slug=None, lang=None):
    """videos.list: ar kiekvienas done tikrai yra ir turi lokalizacijas."""
    from . import auth as auth_mod

    servisai = servisai if servisai is not None else {}
    pagal_kanala = {}
    for irasas in zurnalas.irasai.values():
        if irasas.get("status") != "done" or not irasas.get("video_id"):
            continue
        if slug and irasas.get("slug") != slug:
            continue
        if lang and irasas.get("lang") != lang:
            continue
        pagal_kanala.setdefault(irasas.get("channel"), []).append(irasas)

    if not pagal_kanala:
        pranesti("Nėra ką verifikuoti.")
        return

    for kanalas, irasai in pagal_kanala.items():
        try:
            if kanalas not in servisai:
                servisai[kanalas] = auth_mod.servisas(cfg, kanalas)
            servisas = servisai[kanalas]
        except YtKlaida as e:
            pranesti(f"  ⚠ {kanalas}: {e}")
            continue

        ids = [i["video_id"] for i in irasai]
        rasta = {}
        for i in range(0, len(ids), 50):
            atsakymas = servisas.videos().list(
                part="snippet,status,localizations", id=",".join(ids[i:i + 50])
            ).execute()
            for item in atsakymas.get("items", []):
                rasta[item["id"]] = item

        for irasas in irasai:
            vid = irasas["video_id"]
            item = rasta.get(vid)
            if not item:
                pranesti(f"  ✗ {irasas['slug']} ({irasas['lang']}): {vid} nerastas YouTube")
                zurnalas.irasyti(irasas["slug"], irasas["lang"], status="error",
                                 errors=[f"videos.list nerado {vid}"])
                continue
            turimos = set((item.get("localizations") or {}).keys())
            lauktos = set(irasas.get("localizations_sent") or [])
            truksta = lauktos - turimos
            privacy = (item.get("status") or {}).get("privacyStatus")
            eilute = f"  ✓ {irasas['slug']} ({irasas['lang']}): {privacy}"
            if truksta:
                eilute += f" ⚠ trūksta lokalizacijų: {', '.join(sorted(truksta))}"
                zurnalas.prideti_ispejima(
                    irasas["slug"], irasas["lang"],
                    f"verifikacija: YouTube neturi lokalizacijų {', '.join(sorted(truksta))}",
                )
            pranesti(eilute)


def suvestine(cfg, zurnalas):
    antraste("Suvestinė")
    done = zurnalas.pagal_statusa("done")
    error = zurnalas.pagal_statusa("error")
    pending = zurnalas.pagal_statusa("pending")
    pranesti(f"done: {len(done)} · error: {len(error)} · pending: {len(pending)}")

    ispejimai = [(i, w) for i in zurnalas.irasai.values() for w in (i.get("warnings") or [])]
    if ispejimai:
        pranesti("")
        pranesti("Įspėjimai:")
        for irasas, w in ispejimai:
            pranesti(f"  · {irasas.get('slug')} ({irasas.get('lang')}): {w}")
    if error:
        pranesti("")
        pranesti("Klaidos:")
        for irasas in error:
            for k in irasas.get("errors", []) or ["(be detalių)"]:
                pranesti(f"  · {irasas.get('slug')} ({irasas.get('lang')}): {k}")
    privatus = [i for i in done if i.get("privacy") == "private"]
    if privatus:
        pranesti("")
        pranesti(f"{len(privatus)} filmukai liko privatūs — viešina žmogus po peržiūros.")


def cmd_verify(args, cfg):
    zurnalas = Zurnalas(cfg.log_path)
    antraste("Verifikacija")
    verifikuoti(cfg, zurnalas, None, args.lesson, args.lang)
    suvestine(cfg, zurnalas)
    return 0


def cmd_status(args, cfg):
    zurnalas = Zurnalas(cfg.log_path)
    eile, ikelti = inventorius(cfg, zurnalas, args.lesson, args.lang)
    antraste("Būsena")
    pranesti(f"meta failų: {len(eile) + len(ikelti)} · laukia: {len(eile)} · įkelta: {len(ikelti)}")
    for meta in eile:
        irasas = zurnalas.gauti(meta.slug, meta.lang) or {}
        pranesti(f"  … {meta.slug} ({meta.lang}) {irasas.get('status') or 'naujas'}")
    for irasas in sorted(zurnalas.irasai.values(), key=lambda x: x.get("slug", "")):
        if irasas.get("video_id"):
            pranesti(f"  ✓ {irasas['slug']} ({irasas['lang']}) {irasas['video_id']} "
                     f"{irasas.get('privacy', '')}")
    suvestine(cfg, zurnalas)
    return 0


# ---- argumentai ----


def parseris():
    p = argparse.ArgumentParser(
        prog="yt_upload",
        description="Cleverphant pamokų filmukų įkėlimas į YouTube.",
    )
    sub = p.add_subparsers(dest="komanda")

    def bendri(sp):
        sp.add_argument("--lang", help="kalbos kodas (lt, pl, lv…)")
        sp.add_argument("--dry-run", action="store_true",
                        help="patikrinti ir parodyti, nieko nesiunčiant")
        sp.add_argument("--limit", type=int, help="apriboti kiekį")

    sp = sub.add_parser("run", help="inventorius → įkėlimas → verifikacija")
    sp.add_argument("--lesson", help="pamokos slug")
    bendri(sp)

    sp = sub.add_parser("update", help="papildyti jau įkeltą: lokalizacijos + subtitrai")
    sp.add_argument("lesson", help="pamokos slug")
    bendri(sp)

    sp = sub.add_parser("auth", help="autorizuoti kanalą")
    sp.add_argument("--channel", required=True, help="kanalo raktas iš config/channels.json")

    sp = sub.add_parser("verify", help="patikrinti įkeltus per videos.list")
    sp.add_argument("--lesson")
    sp.add_argument("--lang")

    sp = sub.add_parser("status", help="ką žurnalas žino")
    sp.add_argument("--lesson")
    sp.add_argument("--lang")

    return p


def main(argv=None) -> int:
    args = parseris().parse_args(argv)
    if not args.komanda:
        parseris().print_help()
        return 0

    try:
        cfg = Config()
    except ConfigKlaida as e:
        print(f"⛔ {e}")
        return 2

    komandos = {
        "run": cmd_run,
        "update": cmd_update,
        "auth": cmd_auth,
        "verify": cmd_verify,
        "status": cmd_status,
    }
    try:
        return komandos[args.komanda](args, cfg)
    except (YtKlaida, ValidacijosKlaida) as e:
        print("")
        print(f"⛔ {e}")
        return 2
    except KeyboardInterrupt:
        print("")
        print("Nutraukta. Žurnalas išsaugotas — paleidus iš naujo tęsis nuo tos vietos.")
        return 130
