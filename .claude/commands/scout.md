---
description: Plan-first exploration — map the target files and blockers before any edit
argument-hint: "[the task, e.g. 'fix doctor card mobile layout']"
---

Scout the task before touching anything: **$ARGUMENTS**

1. Read `active_context.md` and `progress.md`. If either contradicts the task, stop and
   report the drift instead of guessing which wins.
2. Use `codegraph_explore` for the structural questions (callers, flow, blast radius)
   **before** any grep/read loop. Remember what is not in the graph: `block.json`, `*.scss`,
   `build/`, `dist/`, `.backup-manual-blocks/`, `*.min.js` — read those directly.
3. For each candidate `src/<slug>/` file, check ownership against `SKIP_BLOCKS` in
   `scripts/sync-src-from-mk.py`. A block that is not in `SKIP_BLOCKS` gets wiped on the next
   build — say so up front rather than discovering it after the edit is denied.
4. Load the matching WordPress skill (`wordpress-router` → `wp-project-triage` → domain skill)
   when the task touches blocks, REST, WP-CLI, or packaging.
5. `git status` — note what is already dirty so your diff stays separable.

Output only:

- The target file list with per-file ownership (`SKIP_BLOCKS` / synced / not a block)
- Anything that blocks the task, with the decision it needs
- One edge case and one failure scenario worth designing against

No code this turn. End with what you propose to do next, in one or two lines.
