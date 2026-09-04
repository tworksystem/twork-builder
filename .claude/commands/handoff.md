---
description: Write the context handoff into active_context.md and progress.md — no new code
---

Context handoff. **Write no new code this turn** — not even a small fix.

1. Read `active_context.md` and `progress.md` first. They are the source of truth, not this chat.
2. Rewrite `active_context.md` with, in this order:
   - `# <goal> (DDMMYYYY)` title
   - **Done** — only what you have evidence for
   - **PARTIAL** — if mid-Builder: exact files touched and exactly what is left
   - **Not verified** — what was written but never run, rendered, or smoke-tested
   - **Open / user decisions** — numbered, each one a real decision, not a task
   - **Next** — numbered, concrete, actionable by someone with no chat history
   - A fenced paste block for the next chat:
     ```
     Continue twork-builder from active_context.md + progress.md.
     DONE: …
     NEXT: …
     SoT / rejects / wave limits…
     If context thin: update active_context handoff only — no code.
     ```
3. Update the `progress.md` Next line if status or QA changed. Never write a PASS you
   cannot point to evidence for.
4. Record the four version locations verbatim if a release is in flight:
   `twork-builder.php` header, `TWORK_BUILDER_VERSION`, `readme.txt` stable tag, `package.json`.
5. Reply with a short status plus the paste block. Nothing else — no "meanwhile I'll also…".

Full rule: `.claude/rules/context-handoff.md`.
