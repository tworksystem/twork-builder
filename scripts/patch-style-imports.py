#!/usr/bin/env python3
"""
Ensure block index.js files import their SCSS so wp-scripts emits style-index.css.
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"


def patch_index_js(block_dir: Path) -> list[str]:
    index_js = block_dir / "index.js"
    if not index_js.is_file():
        return []

    content = index_js.read_text(encoding="utf-8")
    imports_to_add: list[str] = []

    for scss_name in ("style.scss", "editor.scss"):
        scss_path = block_dir / scss_name
        import_line = f"import './{scss_name}';"
        if scss_path.is_file() and import_line not in content:
            imports_to_add.append(import_line)

    if not imports_to_add:
        return []

    lines = content.splitlines()
    insert_at = 0
    for i, line in enumerate(lines):
        if line.startswith("import "):
            insert_at = i + 1

    if insert_at == 0:
        for i, line in enumerate(lines):
            if line.strip() and not line.strip().startswith(("/", "*")):
                insert_at = i
                break

    for import_line in reversed(imports_to_add):
        lines.insert(insert_at, import_line)

    index_js.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return imports_to_add


def main() -> None:
    patched = 0
    for block_dir in sorted(p for p in SRC.iterdir() if p.is_dir()):
        added = patch_index_js(block_dir)
        if added:
            patched += 1
            print(f"{block_dir.name}: {', '.join(added)}")

    print(f"Patched {patched} block(s).")


if __name__ == "__main__":
    main()
