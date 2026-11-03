#!/usr/bin/env bash
# Platformos pamokos grandinė (2026-11-03): node … ar bash platformos-pamoka.sh {slug} [--be-balso]
#   1. platformos scenarijus iš kortelių → lessons/{slug}/ (seed eilutė išsaugoma — kitaip balsas pergeneruotųsi)
#   2. koncepcijos.js (koncepcijos kadrai), generate.js --png
#   3. generate-voice.js (kešas pagal tekstą + seed)
#   4. laikai-telpa.py --balsas --taisyti: žymos stumiamos pagal TIKRĄ balsą (tekstas nekeičiamas) → 1–2 iš naujo
#   5. generate-video-clips.js, build-video.js --platforma
# TVS epizodų šablonai piešiami atskirai (lessons/{slug}/sablonai.js ir pan.) — jų nėra, kadras praleidžiamas su įspėjimu.
set -euo pipefail
SLUG="$1"; shift || true
DST="${DST:-$SLUG}"   # redaktoriaus katalogas (kai WP slug sutampa su YouTube pamoka — {slug}-platforma)
RED="$(cd "$(dirname "$0")" && pwd)"
PLAT="${PLATFORMA:-$HOME/Workspace/Mokymu-platforma}"
L="$RED/lessons/$DST"

sync_scenario() {
  ( cd "$PLAT" && python3 scripts/epizodai-i-scenarijus.py "$SLUG" >/dev/null )
  local SEED=""
  [ -f "$L/video/scenarijus-lt.md" ] && SEED="$(grep -m1 '^\*\*Balso seed:\*\*' "$L/video/scenarijus-lt.md" || true)"
  mkdir -p "$L"
  cp -r "$PLAT/turinys/explaineriai/$SLUG/"* "$L/"
  if [ -n "$SEED" ]; then
    SEED="$SEED" python3 - "$L/video/scenarijus-lt.md" <<'PY'
import os, re, sys
p = sys.argv[1]; s = open(p, encoding="utf-8").read(); line = os.environ["SEED"]
if not re.search(r"^\*\*Balso seed:\*\*", s, re.M):
    s = re.sub(r"^(\*\*Balsas:\*\*.*)$", lambda m: m.group(1) + "\n" + line, s, count=1, flags=re.M)
open(p, "w", encoding="utf-8").write(s)
PY
  fi
  # pamokos šablonų generatorius (TVS epizodai), jei yra
  [ -f "$L/sablonai.js" ] && node "$L/sablonai.js" >/dev/null || true
  node "$RED/koncepcijos.js" --lesson "$DST" --platforma "$PLAT" >/dev/null
  [ -f "$L/animacijos.js" ] && node "$L/animacijos.js" >/dev/null || true
  [ -f "$L/epizodai-def.js" ] && node "$L/epizodai-def.js" >/dev/null || true
}

cd "$RED"
echo "▶ $SLUG → lessons/$DST"
sync_scenario
node generate.js --png --lang lt --lesson "$DST" 2>&1 | grep -E "⚠|⛔|Exported" || true
if [ "${1:-}" != "--be-balso" ]; then
  node generate-voice.js --lesson "$DST" --lang lt 2>&1 | grep -E "⛔|Seed|nepasikeitė|Įgarsinimas" || true
  FIX="$( cd "$PLAT" && python3 scripts/laikai-telpa.py --balsas --taisyti "$SLUG" --red="$RED" 2>&1 || true )"
  echo "$FIX" | grep -E "✎|⛔" || true
  if echo "$FIX" | grep "✎" >/dev/null; then
    echo "  žymos pastumtos pagal tikrą balsą — scenarijus ir animacijos iš naujo"
    sync_scenario
    node generate.js --png --lang lt --lesson "$DST" >/dev/null 2>&1
  fi
  ( cd "$PLAT" && python3 scripts/laikai-telpa.py --balsas "$SLUG" --red="$RED" | tail -2 ) || true
fi
node generate-video-clips.js --lesson "$DST" --lang lt 2>&1 | grep -E "Error|⛔|Done" || true
node build-video.js --lesson "$DST" --lang lt --platforma 2>&1 | grep -E "✓|⛔|Kadrų" || true
