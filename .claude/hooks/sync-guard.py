#!/usr/bin/env python3
"""PreToolUse guard — block edits that the sync pipeline would silently erase.

`npm run build` / `npm start` run scripts/sync-src-from-mk.py, which rmtree's and
recopies every block slug that is (a) present in build/, (b) NOT in SKIP_BLOCKS, and
(c) present in the upstream mk-builder src/. Editing such a block here is thrown away.
src/scss/ is wiped and recopied unconditionally.

Denies those edits with an actionable reason. Fails OPEN on any internal error —
a broken guard must never block legitimate work.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
SYNC_SCRIPT = ROOT / "scripts" / "sync-src-from-mk.py"
BUILD_DIR = ROOT / "build"
UPSTREAM_SRC = Path("/Users/clickrmedia/mawkunn/twork-builder/src")

# Always wiped by copy_supporting_dirs()
ALWAYS_WIPED = ("src/scss/",)


def emit(payload: dict) -> None:
    json.dump(payload, sys.stdout, ensure_ascii=False)
    sys.stdout.write("\n")


def deny(reason: str) -> None:
    emit({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    })


def context(text: str) -> None:
    emit({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "additionalContext": text,
        }
    })


def skip_blocks() -> frozenset[str]:
    src = SYNC_SCRIPT.read_text(encoding="utf-8")
    body = src.split("SKIP_BLOCKS", 1)[1].split("COPY_EXTENSIONS", 1)[0]
    return frozenset(re.findall(r'"([A-Za-z0-9_-]+)"', body))


def build_slugs() -> set[str]:
    if not BUILD_DIR.is_dir():
        return set()
    return {p.name for p in BUILD_DIR.iterdir() if p.is_dir()}


def main() -> int:
    raw = sys.stdin.read()
    try:
        data = json.loads(raw) if raw.strip() else {}
    except json.JSONDecodeError:
        return 0

    tool_input = data.get("tool_input") or {}
    target = tool_input.get("file_path") or tool_input.get("notebook_path")
    if not target:
        return 0

    try:
        rel = Path(target).resolve().relative_to(ROOT).as_posix()
    except (ValueError, OSError):
        return 0  # outside the repo — not our business

    for wiped in ALWAYS_WIPED:
        if rel.startswith(wiped):
            deny(
                f"`{rel}` is inside `src/scss/`, which sync-src-from-mk.py deletes and "
                "recopies from the upstream mk-builder tree on every `npm run build` / "
                "`npm start`. This edit would be erased.\n"
                "Edit it upstream at /Users/clickrmedia/mawkunn/twork-builder/src/scss/, "
                "or ask the user whether to make it locally owned first."
            )
            return 0

    parts = rel.split("/")
    if len(parts) < 2 or parts[0] != "src":
        return 0

    slug = parts[1]

    try:
        skipped = skip_blocks()
    except Exception:
        return 0  # fail open

    if slug in skipped:
        pass  # hand-written and protected — fall through to the reminders below
    elif slug in build_slugs() and (UPSTREAM_SRC / slug).is_dir():
        deny(
            f"`{rel}` belongs to the synced block `{slug}`, which is NOT in SKIP_BLOCKS.\n"
            "sync-src-from-mk.py rmtree's and recopies this whole folder from "
            f"{UPSTREAM_SRC / slug} on every `npm run build` / `npm start` — this edit "
            "would be silently erased.\n\n"
            "Two legitimate paths, both need the user's call:\n"
            f"  1. Edit it upstream in the mk-builder tree, then re-sync.\n"
            f"  2. Make it locally owned: add \"{slug}\" to SKIP_BLOCKS in "
            "scripts/sync-src-from-mk.py (this forks the block from upstream — "
            "the user must approve it).\n\n"
            "Report this to the user and ask which path they want. Do not add to "
            "SKIP_BLOCKS on your own."
        )
        return 0

    # Allowed edit — attach the reminders that matter for this file type.
    notes = []
    name = parts[-1]
    if name == "block.json":
        notes.append(
            "`block.json` is NOT in the CodeGraph index (JSON unsupported) — read it "
            "directly rather than relying on codegraph_explore. Attribute changes to a "
            "shipped block invalidate existing posts unless a `deprecated` entry ships too."
        )
    elif name in ("save.js", "save-deprecated.js"):
        notes.append(
            "Changing `save.js` markup or attribute output invalidates existing posts. "
            "Add a `deprecated` entry, or confirm with the user that no live page uses "
            f"`twork/{slug}`."
        )
    if slug in skipped:
        notes.append(f"`{slug}` is in SKIP_BLOCKS — hand-written and safe to edit here.")

    if notes:
        context(" ".join(notes))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except SystemExit:
        raise
    except Exception:
        raise SystemExit(0)  # fail open
