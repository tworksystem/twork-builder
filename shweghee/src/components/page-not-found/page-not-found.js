import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { safeUrl } from "../../scripts/core/slider.js";

function buildTemplate(data) {
  const n = data.notFound || {};
  const links = (n.links || [])
    .map((link) => `<a class="btn btn--outline" href="${safeUrl(link.href)}">${escapeHtml(link.label)}</a>`)
    .join("");

  return `
    <div class="page-not-found__inner l-section">
      <p class="page-not-found__code">${escapeHtml(n.code || "404")}</p>
      <h1 class="page-not-found__title">${escapeHtml(n.title || "Page Not Found")}</h1>
      <p class="page-not-found__text">${escapeHtml(n.text || "")}</p>
      <div class="page-not-found__links">${links}</div>
    </div>
  `;
}

export function initPageNotFound(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
}
