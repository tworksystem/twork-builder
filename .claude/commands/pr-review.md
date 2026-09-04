---
description: Severity-ranked review of a diff or PR, WordPress-correctness first
argument-hint: "[angle: wp | security | perf | arch] [target: PR number, branch, or blank for the working diff]"
---

Review: $ARGUMENTS

Default target is the working-tree diff; default angle is **WordPress correctness**.
Follow `.cursor/rules/pr-review.mdc` for the four angles in full.

Output discipline:

- Cite `path/to/file.php:42` on every finding
- Rank each: **blocker · important · nit**
- Be specific — a claim with no line reference is not a finding
- Ask for the full file when the diff lacks the context to be sure; never guess
- End with a verdict on its own line: `Safe to merge | needs changes | reject`

The blockers that matter most in this repo, check these even on a security or perf pass:

1. A `src/<slug>/` edit where `<slug>` is not in `SKIP_BLOCKS` — the next build erases it
2. Shipped block markup or attributes changed with no `deprecated` entry — live posts break
3. Unescaped output of a block attribute, meta, or `$_GET` value
4. A Woo call with no `class_exists('WooCommerce')` guard
5. Version moved in one of the four locations but not the others
