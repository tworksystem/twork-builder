#!/usr/bin/env python3
"""Package twork-builder for WordPress upload (target: under 2 MB).

Includes: twork-builder.php, readme.txt, includes/, templates/kits/,
templates/block-defaults/, build/ (no *-rtl.css), assets/js, assets/css,
assets/vendor, assets/images, assets/templates/.

Excludes: src/, node_modules/, shweghee/, *-rtl.css, assets/ipd-consent/,
assets/wporg/, dev scripts, and other non-runtime files.
"""
from __future__ import annotations

import shutil
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dist"
VERSION = "1.0.13"
STAGE = OUT / "twork-builder"
ZIP_PATH = OUT / f"twork-builder-{VERSION}.zip"
MAX_BYTES = 2 * 1024 * 1024
ASSET_SUBS = ("js", "css", "vendor", "images", "templates")
CORE_FILES = ("twork-builder.php", "readme.txt")


def copy_build_tree(src: Path, dest: Path) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    for item in src.iterdir():
        if item.is_file():
            if item.name.endswith("-rtl.css"):
                continue
            shutil.copy2(item, dest / item.name)
        elif item.is_dir():
            block_dest = dest / item.name
            block_dest.mkdir(parents=True, exist_ok=True)
            for f in item.iterdir():
                if f.is_file() and not f.name.endswith("-rtl.css"):
                    shutil.copy2(f, block_dest / f.name)


def stage_plugin() -> None:
    if STAGE.exists():
        shutil.rmtree(STAGE)
    STAGE.mkdir(parents=True)

    for name in CORE_FILES:
        shutil.copy2(ROOT / name, STAGE / name)

    shutil.copytree(ROOT / "includes", STAGE / "includes")

    kits_src = ROOT / "templates" / "kits"
    if kits_src.is_dir():
        kits_dest = STAGE / "templates" / "kits"
        kits_dest.mkdir(parents=True)
        for f in kits_src.glob("kit-*.json"):
            shutil.copy2(f, kits_dest / f.name)
        inner = kits_src / "inner-templates.json"
        if inner.is_file():
            shutil.copy2(inner, kits_dest / inner.name)

    defaults_src = ROOT / "templates" / "block-defaults"
    if defaults_src.is_dir():
        defaults_dest = STAGE / "templates" / "block-defaults"
        defaults_dest.mkdir(parents=True)
        for f in defaults_src.iterdir():
            if f.is_file() and f.suffix in (".html", ".json"):
                shutil.copy2(f, defaults_dest / f.name)

    (STAGE / "assets").mkdir()
    for sub in ASSET_SUBS:
        src = ROOT / "assets" / sub
        if src.is_dir():
            shutil.copytree(src, STAGE / "assets" / sub)

    copy_build_tree(ROOT / "build", STAGE / "build")


def create_zip() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    if ZIP_PATH.exists():
        ZIP_PATH.unlink()

    with zipfile.ZipFile(
        ZIP_PATH, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9
    ) as zf:
        for path in sorted(STAGE.rglob("*")):
            if path.is_file():
                zf.write(path, path.relative_to(OUT))

    return ZIP_PATH.stat().st_size


def main() -> int:
    if not (ROOT / "build").is_dir():
        print("error: run npm run build first", file=sys.stderr)
        return 1

    stage_plugin()
    size = create_zip()
    mb = size / 1024 / 1024
    ok = size < MAX_BYTES

    print(f"Staged: {STAGE}")
    print(f"Zip:    {ZIP_PATH}")
    print(f"Size:   {mb:.2f} MB ({size // 1024} KB)")
    print(f"Limit:  2.00 MB — {'PASS' if ok else 'FAIL'}")

    if not ok:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
