import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { safeImageSrc } from "../../scripts/core/slider.js";

function buildTemplate(data) {
  const h = data.pageHero || {};
  const bgSrc = safeImageSrc(h.imageUrl);
  const bgStyle = bgSrc ? ` style="--page-hero-bg: url('${bgSrc}')"` : "";

  return `
    <div class="page-hero__inner l-section"${bgStyle}>
      <div class="page-hero__content">
        ${h.eyebrow ? `<p class="page-hero__eyebrow">${escapeHtml(h.eyebrow)}</p>` : ""}
        <h1 class="page-hero__title">${escapeHtml(h.title || "Shwe Myanmar")}</h1>
        ${h.subtitle ? `<p class="page-hero__subtitle">${escapeHtml(h.subtitle)}</p>` : ""}
      </div>
    </div>
  `;
}

export function initPageHero(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
}
