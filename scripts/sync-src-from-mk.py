#!/usr/bin/env python3
"""
Copy original block sources from mawkunn/mk-builder into twork-builder src/.

- Syncs only blocks present in build/ (registered block slugs).
- Skips hand-written twork blocks that should not be overwritten.
- Renames mk/mk-builder namespaces to twork/twork-builder.
"""

from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_ROOT = Path("/Users/clickrmedia/mawkunn/twork-builder")
SOURCE_SRC = SOURCE_ROOT / "src"
BUILD_DIR = ROOT / "build"
TARGET_SRC = ROOT / "src"

SKIP_BLOCKS = frozenset(
    {
        "hero-new-section",
        "rad-diagnostic-tabs",
        "rad-hero-section",
        "help-section",
        "doctor-search-filter-section",
        "doctor-directory-section",
        "doctor-card-item",
        "amb-process-section",
        "amb-process-step",
        "amb-tech-section",
        "amb-tech-item",
        "jivaka-header-section",
        "jivaka-footer-section",
        "dept-layout-section",
        "centre-layout-section",
        "csr-stats-section",
        "stat-item",
        "ipd-consent-content-section",
        "ipd-consent-clause-item",
        "ipd-terms-section",
        "visitor-guidelines-section",
        "visitor-guidelines-column",
    }
)

COPY_EXTENSIONS = {
    ".js",
    ".json",
    ".scss",
    ".css",
    ".php",
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
}

REPLACEMENTS: list[tuple[str, str]] = [
    ("@mk-builder/editor-utils", "@twork-builder/editor-utils"),
    ("wp-block-mk-builder-", "wp-block-twork-builder-"),
    ("wp-block-mk-", "wp-block-twork-"),
    ("mk-builder/", "twork-builder/"),
    ("mk/", "twork/"),
    ("'mk-builder'", "'twork-builder'"),
    ('"mk-builder"', '"twork-builder"'),
]


def discover_block_slugs() -> list[str]:
    slugs: set[str] = set()

    if BUILD_DIR.is_dir():
        for entry in BUILD_DIR.iterdir():
            if entry.is_dir():
                slugs.add(entry.name)

    if not slugs and (SOURCE_ROOT / "build").is_dir():
        for entry in (SOURCE_ROOT / "build").iterdir():
            if entry.is_dir() and (entry / "block.json").is_file():
                slugs.add(entry.name)

    if not slugs:
        print("No block slugs discovered.", file=sys.stderr)
        sys.exit(1)

    return sorted(
        slug
        for slug in slugs
        if slug not in SKIP_BLOCKS and (SOURCE_SRC / slug).is_dir()
    )


def should_copy_file(path: Path) -> bool:
    if path.name.startswith("."):
        return False
    if path.suffix.lower() in COPY_EXTENSIONS:
        return True
    return path.name in {"render.php", "save-deprecated.js"}


def apply_namespace_replacements(content: str) -> str:
    updated = content
    for old, new in REPLACEMENTS:
        updated = updated.replace(old, new)
    return updated


def copy_supporting_dirs() -> None:
    mappings = [
        (SOURCE_SRC / "editor-utils", TARGET_SRC / "editor-utils"),
        (SOURCE_SRC / "scss", TARGET_SRC / "scss"),
    ]
    for src, dest in mappings:
        if not src.is_dir():
            print(f"warning: missing source dir {src}", file=sys.stderr)
            continue
        if dest.exists():
            shutil.rmtree(dest)
        dest.mkdir(parents=True)
        for src_file in src.rglob("*"):
            if not src_file.is_file():
                continue
            rel = src_file.relative_to(src)
            dest_file = dest / rel
            dest_file.parent.mkdir(parents=True, exist_ok=True)
            if src_file.suffix.lower() in {".js", ".scss", ".css"}:
                dest_file.write_text(
                    apply_namespace_replacements(
                        src_file.read_text(encoding="utf-8")
                    ),
                    encoding="utf-8",
                )
            else:
                shutil.copy2(src_file, dest_file)

    global_scss = SOURCE_SRC / "global.scss"
    if global_scss.is_file():
        text = apply_namespace_replacements(global_scss.read_text(encoding="utf-8"))
        (TARGET_SRC / "global.scss").write_text(text, encoding="utf-8")


def sync_block(block_slug: str) -> dict:
    source_block = SOURCE_SRC / block_slug
    target_block = TARGET_SRC / block_slug
    result = {"block": block_slug, "copied": 0, "notes": []}

    if block_slug in SKIP_BLOCKS:
        result["notes"].append("skipped-hand-written")
        return result

    if not source_block.is_dir():
        result["notes"].append("missing-in-source")
        return result

    if target_block.exists():
        shutil.rmtree(target_block)
    target_block.mkdir(parents=True)

    for src_file in sorted(source_block.rglob("*")):
        if not src_file.is_file() or not should_copy_file(src_file):
            continue

        rel = src_file.relative_to(source_block)
        dest_file = target_block / rel
        dest_file.parent.mkdir(parents=True, exist_ok=True)

        if src_file.suffix.lower() in {".js", ".json", ".scss", ".css", ".php"}:
            content = apply_namespace_replacements(
                src_file.read_text(encoding="utf-8")
            )
            dest_file.write_text(content, encoding="utf-8")
        else:
            shutil.copy2(src_file, dest_file)

        result["copied"] += 1

    return result


def main() -> int:
    if not SOURCE_SRC.is_dir():
        print(f"source src not found: {SOURCE_SRC}", file=sys.stderr)
        return 1

    copy_supporting_dirs()

    blocks = discover_block_slugs()
    synced = 0
    skipped = 0
    missing: list[str] = []

    for block_slug in blocks:
        result = sync_block(block_slug)
        if "skipped-hand-written" in result["notes"]:
            skipped += 1
            continue
        if "missing-in-source" in result["notes"]:
            missing.append(block_slug)
            continue
        synced += 1

    print(f"Synced {synced} blocks from {SOURCE_SRC}")
    print(f"Skipped hand-written: {skipped}")
    if missing:
        print(f"Missing in source ({len(missing)}): {', '.join(missing[:20])}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
