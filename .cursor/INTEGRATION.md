# Cursor integration map (twork-builder)

WordPress block plugin — `wp-scripts` build, 270+ blocks in the `twork/` namespace. **Not** a Next.js/SPA repo, not a full Composer-managed site.

## Sources

| Upstream | In this PJ | How |
|----------|------------|-----|
| [WordPress/agent-skills](https://github.com/WordPress/agent-skills) | Yes | `.agents/skills/` + `.cursor/skills/` symlinks + `skills-lock.json` + `wordpress-skills.mdc` |
| [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | 9 packs, adapted | Cherry-pick + reject log in `rules/awesome-registry.mdc` — no full clone, no submodule |
| `dbs-mtj` Cursor setup | Ported subset | Always-on discipline rules + gated packs, re-scoped to WordPress |
| Clickr Coding Standards (zip v1.1) | Docs + gated | `docs/standards/` SoT; `clickr-coding-standards.mdc` digest |
| [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) | Yes | CLI 1.5.0 + `.codegraph/` + `codegraph.json` + MCP + `codegraph-auto.mdc` |

## Layout

```text
.cursorrules                       ← agent SoT (Burmese workflow, WP anchor)
.cursor/
  rules/
    anti-overengineering.mdc       ← always · scope + SKIP_BLOCKS guard
    anti-sycophancy.mdc            ← always · no invented APIs / fake PASS
    security-appsec.mdc            ← always · WP escaping, nonces, caps, secrets
    context-handoff.mdc            ← always · active_context/progress discipline
    codegraph-auto.mdc             ← always · CodeGraph MCP before grep loops
    wordpress-skills.mdc           ← always · eager skill auto-load (pre-existing)
    tech-lead.mdc                  ← always · persona (pre-existing)
    js-code-quality.mdc            ← globs · block JS/JSX + assets/js
    web-app-optimization.mdc       ← globs · Web Vitals + a11y
    landing-page-image-quality.mdc ← globs · media quality / alt / CLS
    woocommerce-blocks.mdc         ← globs · Woo queries / HPOS / inactive guard
    wp-i18n.mdc                    ← globs · text domain discipline
    clickr-coding-standards.mdc    ← request · Clickr master digest
    qa-bug-report.mdc              ← request · QA write-up structure
    git-commit-conventions.mdc     ← request · type: DDMMYYYY - desc
    pr-review.mdc                  ← request · severity-ranked diff review
    awesome-registry.mdc           ← request · registry + precedence + reject log
  skills/                          ← symlinks → ../../.agents/skills/*
  mcp.json                         ← CodeGraph MCP (Cursor), absolute --path
  hooks.json                       ← preCompact warn
  hooks/precompact-handoff-warn.py
.mcp.json                          ← CodeGraph MCP (Claude Code), same server
codegraph.json                     ← exclude / deprioritize tuning
.codegraph/                        ← index DB (self-gitignoring; commit only its .gitignore)
docs/standards/                    ← Clickr zip archive (raw SoT)
  CODING-STANDARDS.md  php-wordpress.md  javascript.md
active_context.md                  ← handoff SoT (goal / done / next)
progress.md                        ← QA + DevOps JSON log
```

## CodeGraph (verified 2026-08-25)

- CLI: `codegraph` 1.5.0 on PATH (`~/.nvm/versions/node/v22.17.0/bin/codegraph`)
- Index: 1,015 files · 5,835 nodes · 10,306 edges · 18 MB — JS 974 · PHP 19 · liquid 11 · python 10
- Config: `codegraph.json` — `exclude` `woocommerce-import/`, `languages/`; `deprioritize` `shweghee/`, `templates/`, `scripts/`, `.agents/`
- Rebuild: `codegraph index` (full) · `codegraph status` (check) · `codegraph unlock` (stale lock)

### Auto-sync — no manual `codegraph sync`

`serve --mcp` runs a native-OS-file-event watcher by default (2s debounce, incremental).
**Verified on 2026-08-25:** added `src/shared/__cg_autosync_probe.js` → symbol queryable in <8s with no sync command; deleted it → gone in <8s, index back to 1,015 / 5,835 exactly.

- **Never** pass `--no-watch` in either MCP config — that is the only thing that turns auto-sync off
- One daemon per project; `codegraph daemon` lists them and stops a chosen one
- Edits made while no editor is open are picked up on the next MCP start

### MCP restart checklist (when the daemon misses twork-builder)

1. Cursor: MCP reconnect / Reload Window (Claude Code: restart the session)
2. `codegraph status` in repo root → index up to date
3. `codegraph daemon` → this PJ path listed (not only another Local site)
4. Still stale: `codegraph sync`, then touch a tracked JS file and recheck
5. Prefer the **project** MCP absolute path over the global `${workspaceFolder}` duplicate

### Not in the graph (do not conclude "does not exist")

`block.json` (JSON unsupported) · `*.scss` · `build/` `dist/` `node_modules/` `.backup-manual-blocks/` `*.min.js` (gitignored) · files over 1 MB. Use Read/Grep for those.

## Claude Code parity layer

`.cursor/rules/*.mdc` stays the single source of truth. Claude Code reaches the same files:

```text
CLAUDE.md                     ← always-on digest + routing table (100 lines)
.claude/
  rules/
    anti-overengineering.md   → symlink to ../../.cursor/rules/*.mdc  (5 always-on rules,
    anti-sycophancy.md           no `paths:` frontmatter → loaded every session, zero drift)
    security-appsec.md
    context-handoff.md
    codegraph-auto.md
    block-js.md               ← `paths:` wrapper → js-code-quality.mdc
    frontend-quality.md       ← `paths:` wrapper → web-app-optimization + landing-page-image-quality
    woocommerce.md            ← `paths:` wrapper → woocommerce-blocks.mdc
    i18n.md                   ← `paths:` wrapper → wp-i18n.mdc
  commands/                   ← request-only rules become slash commands
    scout.md qa.md handoff.md commit.md pr-review.md bug-report.md
  skills/                     ← symlinks → ../../.agents/skills/* (same 18 as .cursor/skills)
  hooks/
    sync-guard.py             ← PreToolUse Edit|Write — DENIES sync-erased edits
    session-context.py        ← UserPromptSubmit, once per session — NEXT + drift checks
    precompact-handoff-warn.py← PreCompact, best-effort warn
  settings.json               ← hooks + permissions (committed)
  settings.local.json         ← machine-local, gitignored
```

### Mapping

| Cursor | Claude Code |
| --- | --- |
| `.cursorrules` | `CLAUDE.md` |
| `alwaysApply: true` | `.claude/rules/*.md` with no `paths:` (symlinked) |
| `globs:` | `paths:` frontmatter |
| Request-only `.mdc` | `.claude/commands/*.md` |
| `.cursor/hooks.json` preCompact | `settings.json` `PreCompact` |
| — (no equivalent) | **`PreToolUse` hard deny** — enforcement Cursor cannot do |

### The enforcement upgrade

Cursor rules are advice the model may ignore. `sync-guard.py` is not: it returns
`permissionDecision: "deny"` for any `Edit`/`Write` targeting a block the next build would
erase, with the two legitimate paths in the reason. Verified on six cases — synced block denied,
`SKIP_BLOCKS` block allowed with a deprecation note, `src/scss/` denied, `includes/` and
`src/shared/` silent, malformed input fails open.

`session-context.py` injects the `active_context.md` NEXT once per session and flags version
drift across the four locations. On first run it correctly caught `package.json` 1.0.12 against
1.0.13 everywhere else.

**Known gap:** the Claude Code `PreCompact` contract documents no context-injection channel
(only exit 2 to block), so the compaction warning is best-effort. The durable half is
`CLAUDE.md` + `.claude/rules/context-handoff.md`, both re-injected after compaction.

## WordPress skills (eager)

- 18 skills under `.agents/skills/`, hash-locked in `skills-lock.json`
- Routing: `wordpress-router` → `wp-project-triage` → domain skill — see `rules/wordpress-skills.mdc`
- Do **not** hand-edit a skill folder; re-sync from upstream instead

## Build / release facts the rules depend on

- Build: `npm run build` → runs `scripts/sync-src-from-mk.py` + `scripts/patch-style-imports.py` + `wp-scripts build`
- **`src/` is partly generated.** Blocks not listed in `SKIP_BLOCKS` (`scripts/sync-src-from-mk.py`) are overwritten from `/Users/clickrmedia/mawkunn/twork-builder` on every build
- Version lives in 3+ places: `twork-builder.php` header, `TWORK_BUILDER_VERSION`, `readme.txt` stable tag, `package.json`
- Zip: `create-zip.sh` / `scripts/package-plugin-zip.py` — watch the size budget

## Not ported from dbs-mtj

- `clickr-sharepoint-aspx`, `classic-visual-parity`, `classic-spfx-migration`, `spfx` skill — SharePoint/SPFx only

## Reject in twork-builder

- Foreign stacks scaffolded into the plugin root (Next.js, Vite SPA, Tailwind-primary, shadcn)
- Full clones of awesome-cursorrules or WordPress/agent-skills as submodules
- `CLAUDE.md` replacing `.cursorrules` as agent SoT
- Editing a synced block in `src/` without adding it to `SKIP_BLOCKS` (user approval required)
- Committing `build/`, `dist/`, `node_modules/`, or release zips outside a release task
