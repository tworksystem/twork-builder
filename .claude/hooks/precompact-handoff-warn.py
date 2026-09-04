#!/usr/bin/env python3
"""PreCompact — handoff warning, mirroring .cursor/hooks/precompact-handoff-warn.py.

Best-effort: the Claude Code PreCompact contract documents exit 2 (blocks compaction)
but no additionalContext channel, so this emits systemMessage + stderr and never blocks.
The durable half of the handoff discipline lives in CLAUDE.md and
.claude/rules/context-handoff.md, both of which are re-injected after compaction.
"""
from __future__ import annotations

import json
import sys

MSG = (
    "[twork-builder] Compaction စနေပြီ — summary lossy ဖြစ်နိုင်။ "
    "Agent: Builder ရပ် · active_context.md မှာ DONE/PARTIAL/NEXT ရေး · "
    "progress.md Next line update · reply = handoff သာ။ "
    "SoT = active_context.md + progress.md, chat recall မဟုတ်။"
)


def main() -> int:
    raw = sys.stdin.read()
    try:
        data = json.loads(raw) if raw.strip() else {}
    except json.JSONDecodeError:
        data = {}

    trigger = data.get("compact_reason") or data.get("trigger") or "unknown"
    text = f"{MSG} (trigger={trigger})"

    print(text, file=sys.stderr)
    json.dump({"systemMessage": text}, sys.stdout, ensure_ascii=False)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except SystemExit:
        raise
    except Exception:
        raise SystemExit(0)
