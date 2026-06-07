import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function renderStep(item) {
  return `
    <div class="quality-section__step" data-item-id="${escapeHtml(item.id)}">
      <span class="quality-section__step-num">${escapeHtml(item.number)}</span>
      <h3 class="quality-section__step-title">${escapeHtml(item.title)}</h3>
      <p class="quality-section__step-text">${escapeHtml(item.text)}</p>
    </div>
  `;
}

function renderStandard(item) {
  return `
    <div class="quality-section__standard" data-item-id="${escapeHtml(item.id)}">
      <span class="quality-section__standard-icon" aria-hidden="true">✓</span>
      <div>
        <h3 class="quality-section__standard-title">${escapeHtml(item.title)}</h3>
        <p class="quality-section__standard-text">${escapeHtml(item.text)}</p>
      </div>
    </div>
  `;
}

function buildTemplate(data) {
  const q = data.quality || {};
  const imageSrc = safeImageSrc(q.imageUrl);
  const image = imageSrc
    ? `<img class="quality-section__image" src="${imageSrc}" alt="${escapeHtml(q.imageAlt || "")}" width="560" height="400" loading="lazy" decoding="async" />`
    : "";

  return `
    <div class="quality-section__inner l-section">
      <div class="quality-section__intro" id="standards">
        <div class="quality-section__intro-text">
          <header class="section-head section-head--row">
            <div>
              <p class="section-head__eyebrow">${escapeHtml(q.eyebrow || "")}</p>
              <h2 class="section-head__title">${escapeHtml(q.title || "")}</h2>
            </div>
          </header>
          ${(q.paragraphs || []).map((p) => `<p class="quality-section__para">${escapeHtml(p)}</p>`).join("")}
          ${q.ctaLabel ? `<a class="btn btn--primary" href="${safeUrl(q.ctaHref)}">${escapeHtml(q.ctaLabel)}</a>` : ""}
        </div>
        <div class="quality-section__intro-media">${image}</div>
      </div>

      <div class="quality-section__process">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(q.processEyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(q.processTitle || "")}</h2>
        </header>
        <div class="quality-section__steps" data-list="steps">
          ${(q.steps || []).map(renderStep).join("")}
        </div>
      </div>

      <div class="quality-section__standards">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(q.standardsEyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(q.standardsTitle || "")}</h2>
        </header>
        <div class="quality-section__standards-grid" data-list="standards">
          ${(q.standards || []).map(renderStandard).join("")}
        </div>
      </div>
    </div>
  `;
}

export function initQualitySection(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  rootEl.querySelectorAll(".quality-section__image").forEach(imageOnError);
}
