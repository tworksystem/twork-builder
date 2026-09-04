---
description: Run the project's QA gates and emit the strict PASS/FAIL JSON
argument-hint: "[what changed, e.g. 'packages-section prep panel']"
---

Run the QA step of the project workflow for: **$ARGUMENTS**

Gates, in order. Run each, capture the real result, never assume:

1. `npx wp-scripts lint-js src` — scope to the touched folders if the full run is too slow
2. `npx wp-scripts lint-style "src/**/*.scss"`
3. `node scripts/validate-block-examples.mjs`
4. `node scripts/find-duplicate-block-names.mjs`
5. `php -l` on every PHP file you touched
6. `npm run build` — **only if the task changed block sources**, and remember it re-runs
   `sync-src-from-mk.py`, which wipes any non-`SKIP_BLOCKS` block in `src/`

Then check by reading, not guessing:

- Attribute parity: `block.json` ↔ `edit.js` ↔ `save.js` ↔ the PHP render callback
- Deprecation: did shipped markup or attributes change without a `deprecated` entry?
- Version parity across `twork-builder.php` header, `TWORK_BUILDER_VERSION`,
  `readme.txt` stable tag, `package.json`

Output rules:

- A green build is **not** a pass on its own. Editor render, front-end render, and block
  validation are separate evidence — say plainly which ones you did not verify.
- End with the strict JSON line, then update `progress.md`:

```json
{"status":"PASS|FAIL","phase":"<short>","build":"OK|FAIL|skipped","lint_js":"OK|FAIL|skipped","lint_css":"OK|FAIL|skipped","php_lint":"OK|FAIL|skipped","block_validation":"checked|not-checked","errors":0}
```

If anything fails, fix it and re-run rather than reporting the failure and stopping —
unless the fix needs a decision that is the user's to make.
