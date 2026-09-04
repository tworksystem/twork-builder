---
paths:
  - "src/**/*.{js,jsx}"
  - "assets/js/**/*.js"
  - "scripts/**/*.mjs"
---

# Block JS / front-end scripts

Full rule: `.cursor/rules/js-code-quality.mdc` — **read it** before non-trivial JS work here.
Procedure for block internals: the `wp-block-development` skill.

Hard guards (apply without reading anything else):

- `useBlockProps()` in `edit.js`, `useBlockProps.save()` in `save.js` — never hand-write the wrapper class
- `save.js` stays pure and deterministic — no `Date`, no random, no `window`
- Markup/attribute changes on a shipped block need a `deprecated` entry, or existing posts break
- Attribute names must match across `block.json` ↔ `edit.js` ↔ `save.js` ↔ the PHP render callback
- Defaults live in `block.json`, not as `||` fallbacks in the component
- Import from `@wordpress/*`; never import React directly
- Wrap user-facing strings in `__()` with the `twork-builder` text domain
- Shared logic goes in `src/shared/` — do not copy a helper into an Nth block folder
- Minimal diffs: touch only what the task needs; no reformatting, no drive-by refactors
