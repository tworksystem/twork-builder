import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { safeUrl, safeImageSrc, imageOnError } from "../../scripts/core/slider.js";

function renderLogo(logo) {
  const name = escapeHtml(logo.name);
  const imageUrl = safeImageSrc(logo.imageUrl);
  const alt = escapeHtml(logo.imageAlt || `${logo.name} — Shwe Myanmar`);

  if (imageUrl) {
    return `
      <div class="partners__logo-cell" data-item-id="${logo.id}">
        <img
          class="partners__logo-img"
          src="${imageUrl}"
          alt="${alt}"
          width="120"
          height="48"
          loading="lazy"
          decoding="async"
        />
        <span class="partners__logo-name">${name}</span>
      </div>
    `;
  }

  return `
    <div class="partners__logo-cell" data-item-id="${logo.id}">
      <span class="partners__logo-text">${name}</span>
    </div>
  `;
}

function buildTemplate(data) {
  const p = data.partners || {};
  return `
    <div class="partners__inner l-section">
      <div class="partners__top">
        <header class="partners__head">
          <p class="section-head__eyebrow">${p.eyebrow || ""}</p>
          <h2 class="section-head__title">${p.title || ""}</h2>
        </header>
        <div class="partners__desc">
          <p><strong>${p.descriptionBold || ""}</strong>${p.description || ""}</p>
          <p class="partners__more">For more information about brands. <a href="${safeUrl(p.readMoreHref)}">${p.readMoreLabel || "Read more"}</a></p>
        </div>
      </div>
      <div class="partners__logos" data-list="logos">
        ${(p.logos || []).map(renderLogo).join("")}
      </div>
    </div>
  `;
}

export function initPartners(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  rootEl.querySelectorAll(".partners__logo-img").forEach(imageOnError);
}
