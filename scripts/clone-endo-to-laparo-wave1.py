#!/usr/bin/env python3
"""One-shot: copy Wave 1 endo blocks → laparo with mechanical renames."""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
ASSETS_JS = ROOT / "assets" / "js"
ASSETS_CSS = ROOT / "assets" / "css"

PAIRS = [
    ("endo-hero-section", "laparo-hero-section"),
    ("endo-hero-float-card", "laparo-hero-float-card"),
    ("endo-stats-section", "laparo-stats-section"),
    ("endo-stat-item", "laparo-stat-item"),
    ("endo-procedures-section", "laparo-procedures-section"),
    ("endo-procedure-item", "laparo-procedure-item"),
    ("endo-technology-section", "laparo-technology-section"),
    ("endo-tech-item", "laparo-tech-item"),
    ("endo-cta-section", "laparo-cta-section"),
    ("endo-cta-row", "laparo-cta-row"),
]

JS_PAIRS = [
    ("endo-stats-init.js", "laparo-stats-init.js"),
    ("endo-procedures-init.js", "laparo-procedures-init.js"),
    ("endo-technology-init.js", "laparo-technology-init.js"),
]

CSS_PAIRS = [
    ("endo-stats-critical.css", "laparo-stats-critical.css"),
]

# Order matters: longer / more specific first
REPLACEMENTS: list[tuple[str, str]] = [
    ("twork/endo-", "twork/laparo-"),
    ("twork-endo-", "twork-laparo-"),
    (".twork-endo-", ".twork-laparo-"),
    ("wp-block-twork-endo-", "wp-block-twork-laparo-"),
    ("Endoscopy Centre", "Laparoscopy Centre"),
    ("Endoscopy Hero", "Laparoscopy Hero"),
    ("Endoscopy ", "Laparoscopy "),
    ("endoscopy", "laparoscopy"),
    ("Endoscopy", "Laparoscopy"),
    ("endo-tokens", "laparo-tokens"),
    ("endo-atoms", "laparo-atoms"),
    ("endo-editor", "laparo-editor"),
    ("--endo-", "--laparo-"),
    ("endoCountDone", "laparoCountDone"),
    ("endoStatsBound", "laparoStatsBound"),
    ("endoSpotlightBound", "laparoSpotlightBound"),
    ("endoProceduresBound", "laparoProceduresBound"),
    ("endoTechBound", "laparoTechBound"),
    ("data-endo-", "data-laparo-"),
    ("endo-", "laparo-"),
    ("Endo", "Laparo"),
    ("ENDO", "LAPARO"),
]

# Restore shared icon picker path after mechanical rename.
RESTORE: list[tuple[str, str]] = [
    ("laparo-icon-picker", "endo-icon-picker"),
    ("LaparoIconPicker", "EndoIconPicker"),
    ("LaparoFlexibleIcon", "EndoFlexibleIcon"),
]


def transform(text: str) -> str:
    out = text
    for old, new in REPLACEMENTS:
        out = out.replace(old, new)
    for old, new in RESTORE:
        out = out.replace(old, new)
    return out


def copy_tree(src: Path, dest: Path) -> int:
    if not src.is_dir():
        raise SystemExit(f"missing source: {src}")
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    n = 0
    for path in sorted(src.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(src)
        out = dest / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        if path.suffix.lower() in {".js", ".json", ".scss", ".css", ".php", ".md"}:
            out.write_text(transform(path.read_text(encoding="utf-8")), encoding="utf-8")
        else:
            shutil.copy2(path, out)
        n += 1
    return n


def copy_file(src: Path, dest: Path) -> None:
    if not src.is_file():
        raise SystemExit(f"missing source: {src}")
    dest.write_text(transform(src.read_text(encoding="utf-8")), encoding="utf-8")


def main() -> int:
    total = 0
    for old, new in PAIRS:
        total += copy_tree(SRC / old, SRC / new)
        print(f"block {old} → {new}")
    for old, new in JS_PAIRS:
        copy_file(ASSETS_JS / old, ASSETS_JS / new)
        print(f"js {new}")
    for old, new in CSS_PAIRS:
        copy_file(ASSETS_CSS / old, ASSETS_CSS / new)
        print(f"css {new}")
    print(f"done, files written in blocks: {total}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
