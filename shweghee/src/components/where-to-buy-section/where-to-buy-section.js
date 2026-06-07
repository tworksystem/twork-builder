import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { safeUrl } from "../../scripts/core/slider.js";

function renderRegion(item) {
  const outlets = (item.outlets || [])
    .map((o) => `<li>${escapeHtml(o)}</li>`)
    .join("");

  return `
    <div class="where-to-buy__region" data-item-id="${escapeHtml(item.id)}">
      <h3 class="where-to-buy__region-title">${escapeHtml(item.name)}</h3>
      <p class="where-to-buy__region-desc">${escapeHtml(item.description)}</p>
      ${outlets ? `<ul class="where-to-buy__region-outlets">${outlets}</ul>` : ""}
    </div>
  `;
}

function renderTip(item) {
  return `
    <div class="where-to-buy__tip" data-item-id="${escapeHtml(item.id)}">
      <span class="where-to-buy__tip-num">${escapeHtml(item.number)}</span>
      <h3 class="where-to-buy__tip-title">${escapeHtml(item.title)}</h3>
      <p class="where-to-buy__tip-text">${escapeHtml(item.text)}</p>
    </div>
  `;
}

function buildTemplate(data) {
  const w = data.whereToBuy || {};

  return `
    <div class="where-to-buy__inner l-section">
      <div class="where-to-buy__intro">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(w.eyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(w.title || "")}</h2>
        </header>
        ${(w.paragraphs || []).map((p) => `<p class="where-to-buy__para">${escapeHtml(p)}</p>`).join("")}
      </div>

      <div class="where-to-buy__regions">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(w.regionsEyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(w.regionsTitle || "")}</h2>
        </header>
        <div class="where-to-buy__regions-grid" data-list="regions">
          ${(w.regions || []).map(renderRegion).join("")}
        </div>
      </div>

      <div class="where-to-buy__tips">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(w.tipsEyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(w.tipsTitle || "")}</h2>
        </header>
        <div class="where-to-buy__tips-grid" data-list="tips">
          ${(w.tips || []).map(renderTip).join("")}
        </div>
      </div>

      <div class="where-to-buy__cta">
        <h2 class="where-to-buy__cta-title">${escapeHtml(w.ctaTitle || "")}</h2>
        <p class="where-to-buy__cta-text">${escapeHtml(w.ctaText || "")}</p>
        <div class="where-to-buy__cta-actions">
          ${w.ctaPhone ? `<a class="btn btn--primary" href="tel:${w.ctaPhone.replace(/\D/g, "")}">${escapeHtml(w.ctaPhoneLabel || w.ctaPhone)}</a>` : ""}
          ${w.ctaHref ? `<a class="btn btn--outline" href="${safeUrl(w.ctaHref)}">${escapeHtml(w.ctaLabel || "Contact Us")}</a>` : ""}
        </div>
      </div>
    </div>
  `;
}

export function initWhereToBuySection(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
}
