#!/usr/bin/env python3
"""UserPromptSubmit — inject the project's live state once per session.

Mirrors what `.cursorrules` context-handoff asks a human to paste by hand: the
current NEXT from active_context.md, plus the two drift checks that silently
break this repo (version spread across four files, CodeGraph daemon down).

Runs once per session_id, then stays quiet. Fails OPEN and silent.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
STAMP_DIR = Path(tempfile.gettempdir()) / "twork-builder-claude-session"


def section(text: str, heading: str, limit: int = 10) -> list[str]:
    """Return the lines under a `## heading` until the next heading."""
    out: list[str] = []
    grabbing = False
    for line in text.splitlines():
        if line.strip().lower().startswith("## "):
            if grabbing:
                break
            grabbing = heading.lower() in line.strip().lower()
            continue
        if grabbing and line.strip():
            out.append(line.rstrip())
            if len(out) >= limit:
                break
    return out


def versions() -> dict[str, str]:
    found: dict[str, str] = {}
    php = ROOT / "twork-builder.php"
    if php.is_file():
        text = php.read_text(encoding="utf-8", errors="replace")
        if m := re.search(r"^\s*\*\s*Version:\s*([0-9][0-9.]*)", text, re.M):
            found["plugin header"] = m.group(1)
        if m := re.search(r"TWORK_BUILDER_VERSION',\s*'([0-9][0-9.]*)'", text):
            found["TWORK_BUILDER_VERSION"] = m.group(1)
    readme = ROOT / "readme.txt"
    if readme.is_file():
        if m := re.search(
            r"^Stable tag:\s*([0-9][0-9.]*)",
            readme.read_text(encoding="utf-8", errors="replace"),
            re.M,
        ):
            found["readme.txt stable tag"] = m.group(1)
    pkg = ROOT / "package.json"
    if pkg.is_file():
        try:
            found["package.json"] = json.loads(pkg.read_text(encoding="utf-8"))["version"]
        except Exception:
            pass
    return found


def daemon_running() -> bool | None:
    try:
        out = subprocess.run(
            ["codegraph", "daemon"],
            capture_output=True, text=True, timeout=6,
        ).stdout
    except Exception:
        return None
    return str(ROOT) in out


def main() -> int:
    data = json.loads(sys.stdin.read() or "{}")
    session_id = str(data.get("session_id") or "")
    if not session_id:
        return 0

    STAMP_DIR.mkdir(parents=True, exist_ok=True)
    stamp = STAMP_DIR / f"{re.sub(r'[^A-Za-z0-9_-]', '_', session_id)}.stamp"
    if stamp.exists():
        return 0
    stamp.write_text("1", encoding="utf-8")

    lines = ["## twork-builder — session state (auto, once per session)"]

    ac = ROOT / "active_context.md"
    if ac.is_file():
        text = ac.read_text(encoding="utf-8", errors="replace")
        title = next((l for l in text.splitlines() if l.startswith("# ")), "").lstrip("# ")
        nxt = section(text, "Next")
        lines.append(f"\n**active_context.md**: {title or '(untitled)'}")
        if nxt:
            lines.append("NEXT:")
            lines.extend(f"  {l}" for l in nxt)
        lines.append(
            "Treat active_context.md + progress.md as SoT. If they contradict the "
            "user's ask, stop and report the drift — do not guess."
        )

    vs = versions()
    if len(set(vs.values())) > 1:
        spread = " · ".join(f"{k}={v}" for k, v in vs.items())
        lines.append(f"\n**⚠ VERSION DRIFT**: {spread} — reconcile before any release.")

    dr = daemon_running()
    if dr is False:
        lines.append(
            "\n**CodeGraph**: no daemon for this project. `codegraph_explore` may be "
            "unavailable — fall back to Grep/Read, or the MCP server will start one."
        )

    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except SystemExit:
        raise
    except Exception:
        raise SystemExit(0)
