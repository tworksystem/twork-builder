import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function renderCard(item) {
  const imageSrc = safeImageSrc(item.imageUrl);
  const image = imageSrc
    ? `<img class="product-categories__img" src="${imageSrc}" alt="${escapeHtml(item.imageAlt || "")}" width="140" height="140" loading="lazy" decoding="async" />`
    : "";

  return `
    <a class="product-categories__card" href="${safeUrl(item.href)}" data-item-id="${item.id}">
      <div class="product-categories__text">
        <h3 class="product-categories__name">${item.title}</h3>
        <p class="product-categories__count">${item.count}</p>
        <span class="product-categories__arrow" aria-hidden="true">→</span>
      </div>
      ${image}
    </a>
  `;
}

function buildTemplate(data) {
  const c = data.categories || {};
  return `
    <div class="product-categories__inner l-section">
      <header class="section-head">
        <p class="section-head__eyebrow">${c.eyebrow || ""}</p>
        <h2 class="section-head__title">${c.title || ""}</h2>
      </header>
      <div class="product-categories__grid" data-list="items">
        ${(c.items || []).map(renderCard).join("")}
        <a class="product-categories__card product-categories__card--cta" href="${safeUrl(c.ctaHref)}">
          <span>${c.ctaLabel || "See all categories"}</span>
          <span class="product-categories__cta-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  `;
}

export function initProductCategories(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  rootEl.querySelectorAll("img").forEach(imageOnError);
}
