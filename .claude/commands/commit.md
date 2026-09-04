---
description: Stage and commit using this repo's type: DDMMYYYY - description convention
argument-hint: "[optional: what to emphasise]"
---

Write and make the commit for the current work. Emphasis: $ARGUMENTS

1. `git status` and `git diff` first — commit only what belongs to this task. If unrelated
   dirty files are present, leave them out and say so.
2. `git log --oneline -5` and match the convention you actually see. It is currently:

   ```
   <type>: <DDMMYYYY> - <what changed>
   ```

   for example `fix: 25082026 - refine doctor card responsive layout`. No parenthesised
   scope; the date comes before the description; lower case; no trailing period.
3. Types in use: `feat` · `fix` · `chore` · `docs` (plus `refactor`, `perf`, `build`, `style`
   when they genuinely apply). Do not invent new types.
4. Name the concrete surface in the description — the block, include file, or script.
5. Split rather than bundle: a version bump, a build artifact, and a feature are three commits.
6. Never commit `build/`, `dist/`, `node_modules/`, or a release zip outside a release task.
7. If block markup or attributes changed in a way that invalidates existing posts, mark it
   breaking (`feat!:` or a `BREAKING CHANGE:` footer naming the affected `twork/*` blocks).
8. If on `main` and this is feature work, branch first: `type/short-description`.

Full rule: `.cursor/rules/git-commit-conventions.mdc`.
