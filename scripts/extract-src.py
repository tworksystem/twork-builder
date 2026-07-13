#!/usr/bin/env python3
"""
Extract src/ block sources from build/ artifacts.
Recovers block.json, SCSS, view.js, and splits minified index.js into index/edit/save.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUILD_DIR = ROOT / "build"
SRC_DIR = ROOT / "src"

WINDOW_IMPORTS = {
    "window.wp.blocks": "@wordpress/blocks",
    "window.React": "@wordpress/element",
    "window.wp.i18n": "@wordpress/i18n",
    "window.wp.blockEditor": "@wordpress/block-editor",
    "window.wp.components": "@wordpress/components",
    "window.wp.element": "@wordpress/element",
    "window.wp.data": "@wordpress/data",
    "window.wp.apiFetch": "@wordpress/api-fetch",
    "window.wp.serverSideRender": "@wordpress/server-side-render",
}


def beautify_js(code: str) -> str:
    """Lightweight formatter; skip slow npx prettier in batch runs."""
    return code


def find_matching_brace(text: str, open_index: int) -> int:
    depth = 0
    in_string = None
    escape = False
    for i in range(open_index, len(text)):
        ch = text[i]
        if in_string:
            if escape:
                escape = False
                continue
            if ch == "\\":
                escape = True
                continue
            if ch == in_string:
                in_string = None
            continue
        if ch in ("'", '"', "`"):
            in_string = ch
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return i
    return -1


def extract_register_config(js: str) -> str | None:
    marker = "registerBlockType"
    idx = js.find(marker)
    if idx == -1:
        return None
    brace_start = js.find("{", idx)
    if brace_start == -1:
        return None
    brace_end = find_matching_brace(js, brace_start)
    if brace_end == -1:
        return None
    return js[brace_start : brace_end + 1]


def extract_function_after_key(config: str, key: str) -> tuple[str | None, str | None, str]:
    patterns = [
        f"{key}:function",
        f"{key}: function",
    ]
    start = -1
    for pattern in patterns:
        pos = config.find(pattern)
        if pos != -1:
            start = pos + len(pattern)
            break
    if start != -1:
        paren_open = config.find("(", start)
        if paren_open == -1:
            return None, None, "missing-paren"
        paren_close = find_matching_paren(config, paren_open)
        brace_open = config.find("{", paren_close)
        if brace_open == -1:
            return None, None, "missing-brace"
        brace_close = find_matching_brace(config, brace_open)
        if brace_close == -1:
            return None, None, "unbalanced-brace"
        params = config[paren_open + 1 : paren_close].strip()
        body = config[brace_open + 1 : brace_close].strip()
        return params, body, "ok"

    arrow_patterns = [
        f"{key}:()=>null",
        f"{key}: () => null",
        f"{key}:()=> null",
    ]
    for pattern in arrow_patterns:
        if pattern.replace(" ", "") in config.replace(" ", ""):
            return "", "null", "ok"

    return None, None, "not-found"


def find_matching_paren(text: str, open_index: int) -> int:
    depth = 0
    in_string = None
    escape = False
    for i in range(open_index, len(text)):
        ch = text[i]
        if in_string:
            if escape:
                escape = False
                continue
            if ch == "\\":
                escape = True
                continue
            if ch == in_string:
                in_string = None
            continue
        if ch in ("'", '"', "`"):
            in_string = ch
            continue
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
            if depth == 0:
                return i
    return -1


def extract_module_preamble(js: str) -> str:
    patterns = [
        r"const\s+[\w$]+=window\.wp\.[\w]+",
        r"const\s+[\w$]+=window\.React",
    ]
    for pattern in patterns:
        match = re.search(pattern, js)
        if match:
            start = match.start()
            json_idx = js.find("JSON.parse", start)
            if json_idx == -1:
                continue
            preamble_end = js.rfind(",", start, json_idx)
            if preamble_end == -1:
                preamble_end = json_idx
            return js[start:preamble_end].strip().rstrip(",")
    return ""


def parse_preamble_aliases(preamble: str) -> list[tuple[str, str]]:
    aliases: list[tuple[str, str]] = []
    for part in preamble.split(","):
        part = part.strip()
        if not part or "=" not in part:
            continue
        name, value = part.split("=", 1)
        name = name.replace("const ", "").strip()
        value = value.strip()
        if value in WINDOW_IMPORTS:
            aliases.append((name, value))
    return aliases


def build_import_section(aliases: list[tuple[str, str]], js: str) -> str:
    lines: list[str] = []
    used_packages: dict[str, str] = {}

    for alias, window_path in aliases:
        pkg = WINDOW_IMPORTS[window_path]
        if pkg not in used_packages:
            used_packages[pkg] = alias
            lines.append(f"import * as {alias} from '{pkg}';")
        else:
            existing = used_packages[pkg]
            lines.append(f"const {alias} = {existing};")

    if "serverSideRender" in js and not any(pkg == "@wordpress/server-side-render" for pkg in used_packages):
        lines.append("import ServerSideRender from '@wordpress/server-side-render';")

    if "apiFetch" in js and not any(pkg == "@wordpress/api-fetch" for pkg in used_packages):
        lines.append("import apiFetch from '@wordpress/api-fetch';")

    return "\n".join(lines)


def strip_webpack_runtime(js: str) -> str:
    if "registerBlockType" in js:
        return js
    return js


def extract_block_js(js: str) -> dict:
    config = extract_register_config(js)
    if not config:
        return {"error": "no-registerBlockType"}

    edit_params, edit_body, edit_status = extract_function_after_key(config, "edit")
    save_params, save_body, save_status = extract_function_after_key(config, "save")

    preamble = extract_module_preamble(js)
    aliases = parse_preamble_aliases(preamble)

    return {
        "edit_params": edit_params,
        "edit_body": edit_body,
        "edit_status": edit_status,
        "save_params": save_params,
        "save_body": save_body,
        "save_status": save_status,
        "preamble": preamble,
        "aliases": aliases,
        "raw_js": js,
    }


def clean_js_body(body: str) -> str:
    body = re.sub(r"\(0,\s*(\w+)\.(\w+)\)", r"\1.\2", body)
    body = re.sub(r"var\s+\w+=\w+\.n\(\w+\);?", "", body)
    body = re.sub(r"return([a-zA-Z_$])", r"return \1", body)
    return body.strip()


def write_js_files(block_src: Path, parsed: dict) -> list[str]:
    notes: list[str] = []
    aliases = parsed["aliases"]
    raw_js = parsed["raw_js"]
    import_section = build_import_section(aliases, raw_js)

    if parsed["edit_status"] != "ok" or parsed["edit_body"] is None:
        notes.append("edit-extract-failed")
        fallback = beautify_js(parsed["raw_js"])
        (block_src / "index.recovered.js").write_text(
            "/**\n * Fallback: could not split edit/save. Full bundle preserved.\n */\n" + fallback,
            encoding="utf-8",
        )
        return notes

    edit_body = clean_js_body(parsed["edit_body"])
    save_body = parsed["save_body"]
    edit_params = parsed["edit_params"]
    save_params = parsed["save_params"]
    raw_js = parsed["raw_js"]

    extra_imports = ""
    if "serverSideRender" in raw_js:
        if "ServerSideRender" not in import_section:
            extra_imports = "import ServerSideRender from '@wordpress/server-side-render';\nimport metadata from './block.json';\n"
        else:
            extra_imports = "import metadata from './block.json';\n"
        edit_body = re.sub(
            r"\.createElement\(\s*\w+\(\)\s*,\s*\{\s*block:\s*\w+\.UU\s*,",
            ".createElement( ServerSideRender, { block: metadata.name,",
            edit_body,
            count=1,
        )

    edit_content = f"""/**
 * Recovered from build/index.js
 */
{import_section}
{extra_imports}
export default function Edit( {edit_params} ) {{
{edit_body}
}}
"""

    if save_body == "null" and save_params == "":
        save_content = """/**
 * Recovered from build/index.js (dynamic block)
 */
export default function save() {
\treturn null;
}
"""
    else:
        save_body_clean = clean_js_body(save_body or "")
        save_content = f"""/**
 * Recovered from build/index.js
 */
{import_section}
{extra_imports}
export default function save( {save_params} ) {{
{save_body_clean}
}}
"""

    index_content = """/**
 * Recovered from build/index.js
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

registerBlockType( metadata.name, {
\tedit,
\tsave,
} );
"""

    (block_src / "index.js").write_text(beautify_js(index_content), encoding="utf-8")
    (block_src / "edit.js").write_text(beautify_js(edit_content), encoding="utf-8")
    (block_src / "save.js").write_text(beautify_js(save_content), encoding="utf-8")

    if parsed["save_status"] != "ok":
        notes.append(f"save:{parsed['save_status']}")

    return notes


def copy_if_exists(src: Path, dest: Path) -> bool:
    if src.is_file():
        shutil.copy2(src, dest)
        return True
    return False


def process_block(block_name: str) -> dict:
    build_block = BUILD_DIR / block_name
    block_src = SRC_DIR / block_name
    block_src.mkdir(parents=True, exist_ok=True)

    result = {"block": block_name, "notes": []}

    copy_if_exists(build_block / "block.json", block_src / "block.json")

    for css_name, scss_name in (
        ("style-index.css", "style.scss"),
        ("index.css", "editor.scss"),
    ):
        css_path = build_block / css_name
        if css_path.is_file():
            shutil.copy2(css_path, block_src / scss_name)

    view_js = build_block / "view.js"
    if view_js.is_file():
        content = view_js.read_text(encoding="utf-8")
        (block_src / "view.js").write_text(
            beautify_js(
                "/**\n * Recovered from build/view.js\n */\n" + content
            ),
            encoding="utf-8",
        )

    index_js = build_block / "index.js"
    if not index_js.is_file() or index_js.stat().st_size == 0:
        result["notes"].append("missing-or-empty-index.js")
        return result

    js = index_js.read_text(encoding="utf-8")
    parsed = extract_block_js(js)
    if "error" in parsed:
        result["notes"].append(parsed["error"])
        shutil.copy2(index_js, block_src / "index.recovered.js")
        return result

    result["notes"].extend(write_js_files(block_src, parsed))
    return result


def main() -> int:
    if not BUILD_DIR.is_dir():
        print(f"build dir not found: {BUILD_DIR}", file=sys.stderr)
        return 1

    SRC_DIR.mkdir(parents=True, exist_ok=True)

    blocks = sorted(
        name
        for name in os.listdir(BUILD_DIR)
        if (BUILD_DIR / name).is_dir() and (BUILD_DIR / name / "block.json").is_file()
    )

    failed: list[str] = []
    warnings: list[str] = []

    for block_name in blocks:
        result = process_block(block_name)
        if any("failed" in n or n.startswith("no-") for n in result["notes"]):
            failed.append(block_name)
        elif result["notes"]:
            warnings.append(f"{block_name}: {', '.join(result['notes'])}")

    print(f"Extracted {len(blocks)} blocks to {SRC_DIR}")
    if failed:
        print(f"Failed ({len(failed)}): {', '.join(failed[:20])}{'...' if len(failed) > 20 else ''}")
    if warnings:
        print(f"Warnings ({len(warnings)}): showing first 10")
        for line in warnings[:10]:
            print(f"  - {line}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
