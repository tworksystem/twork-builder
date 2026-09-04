---
description: Write a structured QA bug report for this plugin
argument-hint: "[the bug, e.g. 'prep panel does not open on mobile']"
---

Write a bug report for: **$ARGUMENTS**

Use the structure in `.cursor/rules/qa-bug-report.mdc`. Fill the WordPress-specific fields
from the repo rather than leaving them blank:

- Twork Builder version — read `TWORK_BUILDER_VERSION` in `twork-builder.php`
- Block name in the `twork/*` namespace, and the page or template it sits on
- Whether it reproduces in the editor, on the front end, or both
- Whether existing posts are affected (block validation / deprecation)
- Other plugins that matter here: mk-builder on the same site, WooCommerce

Rules: severity with a reason, one issue per report, numbered reproduction steps, exact
error text. Quote the block validation message verbatim if it is a
"this block contains unexpected or invalid content" case. Sanitize tokens and PII — no
patient, booking, or enquiry data in the report.

Ask me for anything you cannot determine from the repo. Do not invent an environment.
