#!/usr/bin/env python3
"""
Fix recovered block edit.js/save.js files with undefined variable references.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

DEFAULTS_PREAMBLE = """import metadata from './block.json';

const DEFAULT_ATTRIBUTES = Object.fromEntries(
\tObject.entries( metadata.attributes ).map( ( [ key, config ] ) => [
\t\tkey,
\t\tconfig.default,
\t] )
);
"""

# Blocks already hand-written; script is idempotent but skip heavy transforms.
SKIP_BLOCKS = frozenset()

# Per-block replacements after generic fixes.
BLOCK_PATCHES: dict[str, list[tuple[str, str]]] = {
    "visitor-guidelines-column": [
        ('("dos"===d?r:i)', '("dos"===d?DOS_GREEN:DONTS_RED)'),
        ('("dos"===l?a:d)', '("dos"===l?DOS_GREEN:DONTS_RED)'),
        ('g||("dos"===d?r:i)', 'g||("dos"===d?DOS_GREEN:DONTS_RED)'),
        ('p||("dos"===d?r:i)', 'p||("dos"===d?DOS_GREEN:DONTS_RED)'),
        ('w=c||("dos"===l?a:d)', 'w=c||("dos"===l?DOS_GREEN:DONTS_RED)'),
        ('x=m||("dos"===l?a:d)', 'x=m||("dos"===l?DOS_GREEN:DONTS_RED)'),
    ],
    "doctor-card-item": [
        ("w||c(k)", "w||getDepartmentLabel(k)"),
        ("options:n,", "options:DEPARTMENT_OPTIONS,"),
        ("options:i,", "options:GENDER_OPTIONS,"),
        ("departmentLabel:c(e)", "departmentLabel:getDepartmentLabel(e)"),
        ("createElement(r,null)", "createElement(o.__experimentalDivider,null)"),
    ],
    "info-card-item": [
        ("createElement(d,{", "createElement(InfoCardIcon,{"),
        ("createElement(c,{", "createElement(InfoCardIcon,{"),
        ("options:i,", "options:INFO_CARD_ICON_TYPE_OPTIONS,"),
        ("options:r,", "options:DASHICON_OPTIONS,"),
        ("null!=I?I:n.ctaColor", "null!=I?I:DEFAULT_ATTRIBUTES.ctaColor"),
    ],
    "hc-testimonial-card": [
        ("createElement(i,{rating:", "createElement(StarRating,{rating:"),
        ("createElement(r,{rating:", "createElement(StarRating,{rating:"),
    ],
    "centre-treatment-card": [
        ("createElement(c,{", "createElement(FlexibleIcon,{"),
        ("options:n,", "options:ICON_TYPE_OPTIONS,"),
    ],
    "centre-technology-item": [
        ("createElement(c,{", "createElement(TechnologyMedia,{"),
        ("options:n,", "options:MEDIA_TYPE_OPTIONS,"),
    ],
    "centre-specialist-card": [
        ("createElement(s,{", "createElement(SpecialistPhoto,{"),
        ("options:i,", "options:PHOTO_TYPE_OPTIONS,"),
    ],
    "centre-faq-item": [
        ("createElement(i,{", "createElement(FlexibleIcon,{"),
        ("options:l,", "options:ICON_TYPE_OPTIONS,"),
    ],
    "centre-doctors-section": [
        ("createElement(d,{", "createElement(FlexibleIcon,{"),
    ],
    "centre-condition-card": [
        ("createElement(c,{", "createElement(FlexibleIcon,{"),
        ("options:n,", "options:ICON_TYPE_OPTIONS,"),
    ],
    "em-amb-section": [
        ("createElement(n,{item:", "createElement(EmAmbFeatureIcon,{item:"),
        ("createElement(d,{item:", "createElement(EmAmbFeatureIcon,{item:"),
    ],
}

HELPER_IMPORTS: dict[str, str] = {
    "visitor-guidelines-column": "import { DOS_GREEN, DONTS_RED } from '../shared/block-helpers.js';",
    "doctor-card-item": (
        "import { getDepartmentLabel } from '../shared/block-helpers.js';\n"
        "import { DEPARTMENT_OPTIONS, GENDER_OPTIONS } from '../shared/select-options.js';"
    ),
    "info-card-item": (
        "import { InfoCardIcon } from '../shared/block-helpers.js';\n"
        "import { INFO_CARD_ICON_TYPE_OPTIONS, DASHICON_OPTIONS } from '../shared/select-options.js';"
    ),
    "hc-testimonial-card": "import { StarRating } from '../shared/block-helpers.js';",
    "centre-treatment-card": (
        "import { FlexibleIcon } from '../shared/block-helpers.js';\n"
        "import { ICON_TYPE_OPTIONS } from '../shared/select-options.js';"
    ),
    "centre-technology-item": (
        "import { TechnologyMedia } from '../shared/block-helpers.js';\n"
        "import { MEDIA_TYPE_OPTIONS } from '../shared/select-options.js';"
    ),
    "centre-specialist-card": (
        "import { SpecialistPhoto } from '../shared/block-helpers.js';\n"
        "import { PHOTO_TYPE_OPTIONS } from '../shared/select-options.js';"
    ),
    "centre-faq-item": (
        "import { FlexibleIcon } from '../shared/block-helpers.js';\n"
        "import { ICON_TYPE_OPTIONS } from '../shared/select-options.js';"
    ),
    "centre-doctors-section": "import { FlexibleIcon } from '../shared/block-helpers.js';",
    "centre-condition-card": (
        "import { FlexibleIcon } from '../shared/block-helpers.js';\n"
        "import { ICON_TYPE_OPTIONS } from '../shared/select-options.js';"
    ),
    "em-amb-section": "import { EmAmbFeatureIcon } from '../shared/block-helpers.js';",
}

# centre-layout-section uses FlexibleIcon with many prop names - patch save/edit
for fname in ("centre-layout-section",):
    BLOCK_PATCHES.setdefault(fname, []).extend(
        [
            ("createElement(d,{", "createElement(FlexibleIcon,{"),
            ("createElement(m,{", "createElement(FlexibleIcon,{"),
            ("createElement(u,{", "createElement(FlexibleIcon,{"),
            ("createElement(p,{", "createElement(FlexibleIcon,{"),
            ("createElement(l,{iconType:", "createElement(FlexibleIcon,{iconType:"),
        ]
    )
    HELPER_IMPORTS[fname] = "import { FlexibleIcon } from '../shared/block-helpers.js';"


def load_children_by_parent() -> dict[str, list[str]]:
    children: dict[str, list[str]] = {}
    for block_json in SRC.glob("*/block.json"):
        data = json.loads(block_json.read_text(encoding="utf-8"))
        parent = data.get("parent")
        if not parent:
            continue
        parents = [parent] if isinstance(parent, str) else list(parent)
        name = data["name"]
        for p in parents:
            children.setdefault(p, []).append(name)
    for key in children:
        children[key] = sorted(set(children[key]))
    return children


def block_name_from_dir(block_dir: Path) -> str | None:
    block_json = block_dir / "block.json"
    if not block_json.exists():
        return None
    return json.loads(block_json.read_text(encoding="utf-8")).get("name")


def has_defaults_preamble(content: str) -> bool:
    return "DEFAULT_ATTRIBUTES" in content and "import metadata from './block.json'" in content


def inject_defaults_preamble(content: str) -> tuple[str, str | None]:
    """Return (content, defaults_var) after injecting preamble and fixing spread."""
    match = re.search(
        r"const\s+(\w+)\s*=\s*\{\.\.\.([a-z]),\.\.\.(\w+)\}",
        content,
    )
    if not match:
        return content, None

    merged_var, defaults_var, attrs_var = match.groups()
    if has_defaults_preamble(content):
        new_content = content
    else:
        # Insert after last import line.
        lines = content.split("\n")
        last_import = 0
        for i, line in enumerate(lines):
            if line.startswith("import "):
                last_import = i
        insert_at = last_import + 1
        preamble_lines = DEFAULTS_PREAMBLE.strip().split("\n")
        lines = lines[:insert_at] + [""] + preamble_lines + [""] + lines[insert_at:]
        new_content = "\n".join(lines)

    spread_old = f"const {merged_var}={{...{defaults_var},...{attrs_var}}}"
    spread_new = f"const {merged_var}={{ ...DEFAULT_ATTRIBUTES, ...{attrs_var} }}"
    new_content = new_content.replace(spread_old, spread_new)

    # Replace defaults_var.property references (word boundary).
    new_content = re.sub(
        rf"\b{re.escape(defaults_var)}\.([a-zA-Z_][a-zA-Z0-9_]*)",
        r"DEFAULT_ATTRIBUTES.\1",
        new_content,
    )
    return new_content, defaults_var


def dedupe_metadata_import(content: str) -> str:
    seen_metadata = False
    result: list[str] = []
    for line in content.split("\n"):
        if line.strip() == "import metadata from './block.json';":
            if seen_metadata:
                continue
            seen_metadata = True
        result.append(line)
    return "\n".join(result)


def insert_after_header(content: str, snippet: str) -> str:
    """Insert snippet after imports (or after file comment if no imports)."""
    import_lines = [
        i for i, line in enumerate(content.split("\n")) if line.startswith("import ")
    ]
    if import_lines:
        lines = content.split("\n")
        pos = import_lines[-1] + 1
        return "\n".join(lines[:pos] + [snippet.rstrip("\n")] + lines[pos:])
    match = re.search(r"\*/\s*\n", content)
    if match:
        pos = match.end()
        return content[:pos] + snippet + content[pos:]
    return snippet + content


def fix_inner_blocks(content: str, block_name: str | None, children_map: dict[str, list[str]]) -> str:
    needs_allowed = bool(
        re.search(r"allowedBlocks:[a-z],", content) or "template:l" in content
    )
    if not needs_allowed:
        return content

    allowed = children_map.get(block_name or "", [])
    allowed_literal = json.dumps(allowed)

    if "ALLOWED_BLOCKS" not in content:
        const_block = f"\nconst ALLOWED_BLOCKS = {allowed_literal};\n"
        content = insert_after_header(content, const_block)

    content = re.sub(r"allowedBlocks:[a-z],", "allowedBlocks:ALLOWED_BLOCKS,", content)
    content = content.replace("template:l", "template:[]")
    return content


MEMBER_TO_PACKAGE = {
    "createElement": "@wordpress/element",
    "Fragment": "@wordpress/element",
    "useEffect": "@wordpress/element",
    "useState": "@wordpress/element",
    "useMemo": "@wordpress/element",
    "useRef": "@wordpress/element",
    "useBlockProps": "@wordpress/block-editor",
    "InspectorControls": "@wordpress/block-editor",
    "InnerBlocks": "@wordpress/block-editor",
    "RichText": "@wordpress/block-editor",
    "PanelColorSettings": "@wordpress/block-editor",
    "MediaUpload": "@wordpress/block-editor",
    "MediaPlaceholder": "@wordpress/block-editor",
    "URLInput": "@wordpress/block-editor",
    "MediaUploadCheck": "@wordpress/block-editor",
    "PanelBody": "@wordpress/components",
    "TextControl": "@wordpress/components",
    "ToggleControl": "@wordpress/components",
    "SelectControl": "@wordpress/components",
    "RangeControl": "@wordpress/components",
    "Button": "@wordpress/components",
    "BaseControl": "@wordpress/components",
    "ButtonGroup": "@wordpress/components",
    "__experimentalDivider": "@wordpress/components",
    "useSelect": "@wordpress/data",
}


def repair_missing_imports(content: str) -> str:
    existing_packages: dict[str, str] = {}
    for match in re.finditer(
        r"import \* as (\w+) from '(@wordpress/[^']+)';", content
    ):
        existing_packages[match.group(2)] = match.group(1)

    needed: dict[str, str] = {}
    for match in re.finditer(r"\b([a-zA-Z_$][\w$]*)\.(\w+)", content):
        alias, member = match.groups()
        package = MEMBER_TO_PACKAGE.get(member)
        if package and package not in existing_packages and package not in needed:
            needed[package] = alias

    for match in re.finditer(r"\b([a-zA-Z_$][\w$]*)\.__\(", content):
        alias = match.group(1)
        package = "@wordpress/i18n"
        if package not in existing_packages and package not in needed:
            needed[package] = alias

    if not needed:
        return content

    imports = "\n".join(
        f"import * as {alias} from '{package}';"
        for package, alias in needed.items()
    )
    return insert_after_header(content, f"\n{imports}\n")


def ensure_components_import(content: str, block_slug: str) -> str:
    """Add @wordpress/components import when PanelBody etc. used without import."""
    if "@wordpress/components" in content:
        return content
    if not re.search(r"\bn\.(PanelBody|Button|TextControl|ToggleControl|SelectControl|RangeControl)", content):
        return content
    lines = content.split("\n")
    last_import = 0
    for i, line in enumerate(lines):
        if line.startswith("import "):
            last_import = i
    lines.insert(last_import + 1, "import * as components from '@wordpress/components';")
    content = "\n".join(lines)
    content = content.replace("n.PanelBody", "components.PanelBody")
    content = content.replace("n.Button", "components.Button")
    content = content.replace("n.TextControl", "components.TextControl")
    content = content.replace("n.ToggleControl", "components.ToggleControl")
    content = content.replace("n.SelectControl", "components.SelectControl")
    content = content.replace("n.RangeControl", "components.RangeControl")
    content = content.replace("n.BaseControl", "components.BaseControl")
    content = content.replace("n.__experimentalDivider", "components.__experimentalDivider")
    return content


def inject_helper_imports(content: str, block_slug: str) -> str:
    helper = HELPER_IMPORTS.get(block_slug)
    if not helper or helper.split("\n")[0] in content:
        return content
    lines = content.split("\n")
    last_import = 0
    for i, line in enumerate(lines):
        if line.startswith("import "):
            last_import = i
    for imp in reversed(helper.split("\n")):
        lines.insert(last_import + 1, imp)
    return "\n".join(lines)


def apply_block_patches(content: str, block_slug: str) -> str:
    for old, new in BLOCK_PATCHES.get(block_slug, []):
        content = content.replace(old, new)
    return content


def fix_file(path: Path, block_slug: str, block_name: str | None, children_map: dict[str, list[str]]) -> bool:
    if block_slug in SKIP_BLOCKS:
        return False

    original = path.read_text(encoding="utf-8")
    content = original

    content, _ = inject_defaults_preamble(content)
    content = fix_inner_blocks(content, block_name, children_map)
    content = ensure_components_import(content, block_slug)
    content = inject_helper_imports(content, block_slug)
    content = apply_block_patches(content, block_slug)
    content = repair_missing_imports(content)
    content = dedupe_metadata_import(content)
    content = content.replace("createElement(u(),", "createElement(ServerSideRender,")
    content = re.sub(
        r"createElement\([a-z]\(\),\{block:",
        "createElement(ServerSideRender,{block:",
        content,
    )

    if content != original:
        path.write_text(content, encoding="utf-8")
        return True
    return False


def main() -> None:
    children_map = load_children_by_parent()
    fixed: list[str] = []

    for block_dir in sorted(SRC.iterdir()):
        if not block_dir.is_dir() or block_dir.name == "shared":
            continue
        block_slug = block_dir.name
        block_name = block_name_from_dir(block_dir)
        for fname in ("edit.js", "save.js"):
            fpath = block_dir / fname
            if fpath.exists() and fix_file(fpath, block_slug, block_name, children_map):
                fixed.append(f"{block_slug}/{fname}")

    print(f"Fixed {len(fixed)} files:")
    for f in fixed:
        print(f"  - {f}")


if __name__ == "__main__":
    main()
