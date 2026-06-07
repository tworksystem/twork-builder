import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { safeUrl } from "../../scripts/core/slider.js";

function renderBenefit(item) {
  return `
    <div class="careers-section__benefit" data-item-id="${escapeHtml(item.id)}">
      <span class="careers-section__benefit-icon" aria-hidden="true">${escapeHtml(item.icon || "★")}</span>
      <h3 class="careers-section__benefit-title">${escapeHtml(item.title)}</h3>
      <p class="careers-section__benefit-text">${escapeHtml(item.text)}</p>
    </div>
  `;
}

function renderPosition(item) {
  const isOpen = item.status !== "closed";
  const statusLabel = isOpen ? "Open" : "Closed";
  const statusClass = isOpen ? "careers-section__status--open" : "careers-section__status--closed";

  return `
    <article class="careers-section__position${isOpen ? "" : " careers-section__position--closed"}" data-item-id="${escapeHtml(item.id)}">
      <div class="careers-section__position-head">
        <h3 class="careers-section__position-title">${escapeHtml(item.title)}</h3>
        <span class="careers-section__status ${statusClass}">${escapeHtml(statusLabel)}</span>
      </div>
      <p class="careers-section__position-meta">
        <span>${escapeHtml(item.location || "")}</span>
        <span aria-hidden="true">·</span>
        <span>${escapeHtml(item.type || "")}</span>
      </p>
      <p class="careers-section__position-desc">${escapeHtml(item.description || "")}</p>
    </article>
  `;
}

function buildTemplate(data) {
  const c = data.careers || {};
  const allPositions = c.positions || [];
  const positionsHtml = allPositions.length
    ? allPositions.map(renderPosition).join("")
    : `<p class="careers-section__empty">${escapeHtml(c.emptyText || "No open positions at this time. Please check back later or contact us.")}</p>`;

  return `
    <div class="careers-section__inner l-section">
      <div class="careers-section__intro" id="careers">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(c.eyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(c.title || "")}</h2>
        </header>
        ${(c.paragraphs || []).map((p) => `<p class="careers-section__para">${escapeHtml(p)}</p>`).join("")}
        ${c.disclaimer ? `<p class="careers-section__disclaimer">${escapeHtml(c.disclaimer)}</p>` : ""}
      </div>

      <div class="careers-section__benefits">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(c.benefitsEyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(c.benefitsTitle || "")}</h2>
        </header>
        <div class="careers-section__benefits-grid" data-list="benefits">
          ${(c.benefits || []).map(renderBenefit).join("")}
        </div>
      </div>

      <div class="careers-section__positions">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(c.positionsEyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(c.positionsTitle || "")}</h2>
        </header>
        <div class="careers-section__positions-list" data-list="positions">
          ${positionsHtml}
        </div>
      </div>

      <div class="careers-section__cta">
        <h2 class="careers-section__cta-title">${escapeHtml(c.ctaTitle || "")}</h2>
        <p class="careers-section__cta-text">${escapeHtml(c.ctaText || "")}</p>
        <div class="careers-section__cta-actions">
          ${c.ctaPhone ? `<a class="btn btn--outline" href="tel:${escapeHtml(c.ctaPhone.replace(/\s/g, ""))}">${escapeHtml(c.ctaPhoneLabel || c.ctaPhone)}</a>` : ""}
          ${c.ctaLabel ? `<a class="btn btn--primary" href="${safeUrl(c.ctaHref)}">${escapeHtml(c.ctaLabel)}</a>` : ""}
        </div>
      </div>
    </div>
  `;
}

export function initCareersSection(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);
}
