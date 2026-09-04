# Twork Builder — agent instructions (Claude Code)

WordPress block plugin. `wp-scripts` build, 270+ blocks in the `twork/` namespace, PHP 7.4+.
Not a Next.js/SPA repo, not a Composer-managed site, not a theme.

**Language: Burmese only** in replies. Brutally concise, zero-fluff bullets. No code
step-by-step unless asked.

## Where the rules live

`.cursor/rules/*.mdc` is the single source of truth for both editors. Claude Code reads them
through `.claude/rules/`: the always-on ones are symlinks to the same files, and the
path-scoped ones are thin wrappers with `paths:` frontmatter that point back. Cursor reads
`.cursorrules` + the same `.mdc` files. **Edit the `.mdc`, never a copy.**

| Need | Load |
| --- | --- |
| Scope, drive-by refactors | `.claude/rules/anti-overengineering.md` (auto) |
| Invented APIs, fake PASS | `.claude/rules/anti-sycophancy.md` (auto) |
| Escaping, nonces, caps, secrets | `.claude/rules/security-appsec.md` (auto) |
| Thin context, new chat | `.claude/rules/context-handoff.md` (auto) |
| Explore before grep | `.claude/rules/codegraph-auto.md` (auto) |
| Block JS/JSX | `.claude/rules/block-js.md` (on `src/**`) |
| Render output, perf, media | `.claude/rules/frontend-quality.md` (on `includes/**`, `assets/**`) |
| Woo shop blocks | `.claude/rules/woocommerce.md` (on shop paths) |
| Strings, text domain | `.claude/rules/i18n.md` |
| Clickr standards, registry | `.cursor/rules/clickr-coding-standards.mdc`, `awesome-registry.mdc` |

Commands: `/scout` `/qa` `/handoff` `/commit` `/pr-review` `/bug-report`.
WordPress skills: 18 under `.claude/skills/` — start with `wordpress-router`, then
`wp-project-triage`, then the domain skill. Use them eagerly; do not wait to be asked.

## The five things that silently break this repo

1. **`src/` is partly generated.** `npm run build` and `npm start` run
   `scripts/sync-src-from-mk.py`, which rmtree's and recopies every block that is in `build/`,
   absent from `SKIP_BLOCKS`, and present upstream at
   `/Users/clickrmedia/mawkunn/twork-builder/src`. That is **190 of 266 blocks**. Editing one
   here is thrown away. `src/scss/` is wiped unconditionally. A PreToolUse hook denies these
   edits — when it fires, report it and ask the user which path they want; never add to
   `SKIP_BLOCKS` on your own.
2. **Block validation.** Changing shipped markup or attributes invalidates existing posts
   unless a `deprecated` entry ships with it. A green build proves nothing about this.
3. **Build ≠ QA.** Editor render, front-end render, and block validation are separate
   evidence. Say which ones you did not check.
4. **Version lives in four places** — `twork-builder.php` header, `TWORK_BUILDER_VERSION`,
   `readme.txt` stable tag, `package.json`. They move together or not at all.
5. **`block.json` and `*.scss` are not in the CodeGraph index.** "CodeGraph found nothing"
   never means "it does not exist" for those. Read them directly.

## Commands

```bash
npm run build        # sync-src → patch-style-imports → wp-scripts build (RE-SYNCS src/)
npm start            # same, watch mode
npm run sync-src     # sync only
./create-zip.sh      # release zip, must stay under 2 MB
codegraph status     # index health; auto-sync runs off the MCP watcher
```

Lint and gates: `npx wp-scripts lint-js src`, `npx wp-scripts lint-style "src/**/*.scss"`,
`node scripts/validate-block-examples.mjs`, `node scripts/find-duplicate-block-names.mjs`,
`php -l`.

## Layout

```
twork-builder.php     plugin bootstrap, version constant
includes/             render callbacks, CPTs, shop blocks, admin
src/<slug>/           block sources — block.json, edit.js, save.js, index.js, style.scss
src/shared/           cross-block helpers (locally owned, safe to edit)
assets/js/*-init.js   front-end scripts
templates/kits/       demo content
shweghee/             static reference site — not the plugin
active_context.md     handoff SoT — goal / done / not verified / next
progress.md           QA + DevOps JSON log
```

## Working agreement

- **Files win over chat.** Read `active_context.md` and `progress.md` before continuing work.
  If they contradict the user's ask, stop and report the drift.
- **Verify, don't assume.** Confirm hook names, block attributes, and `@wordpress/*` APIs
  against the tree. Say "verify needed" instead of inventing.
- **Minimal diffs.** Touch only what the task needs. No reformatting, no drive-by fixes,
  no new dependencies without approval.
- **Honest status.** "Written but not smoke-tested" when that is true. Never a fake PASS.
- **Never** modify `.env`, production secrets, or commit `build/` `dist/` `node_modules/`
  or a release zip outside a release task.

<!-- Workflow gate below mirrors .cursorrules. Remove this section if you want Claude Code
     to work without the per-step confirmation. -->
## Workflow (mirrors `.cursorrules`)

For code changes: Scout → Architect → Builder → QA → DevOps, **one step per user `y`**.
Do not run Builder or QA in the same turn as Scout or Architect. A run of `y`s unlocks one
step each, not the whole chain. Ask `"<step> ပြီးပါပြီ။ (y?)"` at each boundary.

Small, obviously-scoped edits and questions do not need the gate — use judgement, and when
in doubt Scout first.
