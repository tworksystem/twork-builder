import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function renderMilestone(item) {
  return `
    <div class="about-story__milestone" data-item-id="${escapeHtml(item.id)}">
      <span class="about-story__year">${escapeHtml(item.year)}</span>
      <h3 class="about-story__milestone-title">${escapeHtml(item.title)}</h3>
      <p class="about-story__milestone-text">${escapeHtml(item.text)}</p>
    </div>
  `;
}

function renderValue(item) {
  return `
    <div class="about-story__value" data-item-id="${escapeHtml(item.id)}">
      <span class="about-story__value-num">${escapeHtml(item.number)}</span>
      <h3 class="about-story__value-title">${escapeHtml(item.title)}</h3>
      <p class="about-story__value-text">${escapeHtml(item.text)}</p>
    </div>
  `;
}

function buildTemplate(data) {
  const s = data.aboutStory || {};
  const imageSrc = safeImageSrc(s.imageUrl);
  const image = imageSrc
    ? `<img class="about-story__image" src="${imageSrc}" alt="${escapeHtml(s.imageAlt || "")}" width="560" height="400" loading="lazy" decoding="async" />`
    : "";

  return `
    <div class="about-story__inner l-section">
      <div class="about-story__intro" id="story">
        <div class="about-story__intro-text">
          <header class="section-head section-head--row">
            <div>
              <p class="section-head__eyebrow">${escapeHtml(s.eyebrow || "")}</p>
              <h2 class="section-head__title">${escapeHtml(s.title || "")}</h2>
            </div>
          </header>
          ${(s.paragraphs || []).map((p) => `<p class="about-story__para">${escapeHtml(p)}</p>`).join("")}
          ${s.ctaLabel ? `<a class="btn btn--primary" href="${safeUrl(s.ctaHref)}">${escapeHtml(s.ctaLabel)}</a>` : ""}
        </div>
        <div class="about-story__intro-media">${image}</div>
      </div>

      <div class="about-story__milestones">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(s.timelineEyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(s.timelineTitle || "")}</h2>
        </header>
        <div class="about-story__timeline" data-list="milestones">
          ${(s.milestones || []).map(renderMilestone).join("")}
        </div>
      </div>

      <div class="about-story__values">
        <header class="section-head">
          <p class="section-head__eyebrow">${escapeHtml(s.valuesEyebrow || "")}</p>
          <h2 class="section-head__title">${escapeHtml(s.valuesTitle || "")}</h2>
        </header>
        <div class="about-story__values-grid" data-list="values">
          ${(s.values || []).map(renderValue).join("")}
        </div>
      </div>
    </div>
  `;
}

export function initAboutStory(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  rootEl.querySelectorAll(".about-story__image").forEach(imageOnError);
}
