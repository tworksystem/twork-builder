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
        "booking-hero-section",
        "booking-layout-section",
        "booking-info-card-item",
        "csr-moments-gallery-section",
        "csr-moments-gallery-item",
        "ph-upload-section",
        "tele-process-section",
        "tele-process-card",
        "brand-header",
        "brand-nav-item",
        "hero-banner-carousel",
        "hero-banner-slide",
        "image-card-carousel",
        "image-card-slide",
        "numbered-features-grid",
        "numbered-feature-item",
        "category-card-grid",
        "category-card",
        "logo-showcase-section",
        "logo-showcase-item",
        "news-card-grid",
        "news-card",
        "review-carousel",
        "review-card",
        "split-promo-section",
        "faq-accordion-section",
        "faq-accordion-item",
        "subscribe-bar",
        "brand-footer",
        "brand-footer-info-card",
        "brand-footer-column",
        "breadcrumb-nav",
        "brand-page-hero",
        "about-staff-meal-section",
        "about-staff-meal-gallery",
        "about-staff-meal-feedback",
        "about-staff-meal-gallery-item",
        "about-staff-meal-feedback-item",
        "about-story-section",
        "contact-form-section",
        "blog-list-section",
        "blog-article-section",
        "wholesale-section",
        "legal-content-section",
        "quality-section",
        "where-to-buy-section",
        "careers-section",
        "page-not-found-section",
        "shop-header",
        "shop-hero-carousel",
        "shop-sidebar",
        "shop-toolbar",
        "featured-categories-carousel",
        "daily-offers-carousel",
        "best-sellers-carousel",
        "product-grid-section",
        "product-detail-section",
        "back-to-top",
        # Endoscopy page blocks (endoscopy.html port)
        "endo-hero-section",
        "endo-hero-float-card",
        "endo-stats-section",
        "endo-stat-item",
        "endo-procedures-section",
        "endo-procedure-item",
        "endo-technology-section",
        "endo-tech-item",
        "endo-journey-section",
        "endo-journey-step",
        "endo-conditions-section",
        "endo-condition-item",
        "endo-prep-section",
        "endo-prep-tab",
        "endo-prep-group",
        "endo-team-section",
        "endo-doctor-item",
        "endo-testimonials-section",
        "endo-testimonial-item",
        "endo-faq-section",
        "endo-faq-item",
        "endo-cta-section",
        "endo-cta-row",
        # Laparoscopy page blocks Wave 1 (endo-parity fork)
        "laparo-hero-section",
        "laparo-hero-float-card",
        "laparo-stats-section",
        "laparo-stat-item",
        "laparo-procedures-section",
        "laparo-procedure-item",
        "laparo-technology-section",
        "laparo-tech-item",
        "laparo-cta-section",
        "laparo-cta-row",
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
    # editor-utils is local-owned (dual-API useStableBlockProps for scaffold blocks).
    # Do not rmtree/overwrite from mk — same idea as SKIP_BLOCKS for hand-written sources.
    mappings = [
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

    # Keep local Shweghee brand base wiring in global.scss (do not overwrite from mk).
    local_global = TARGET_SRC / "global.scss"
    if not local_global.is_file():
        global_scss = SOURCE_SRC / "global.scss"
        if global_scss.is_file():
            text = apply_namespace_replacements(global_scss.read_text(encoding="utf-8"))
            local_global.write_text(text, encoding="utf-8")


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
