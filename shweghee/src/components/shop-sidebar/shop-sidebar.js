import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { bindAccordion } from "../../scripts/core/accordion.js";
import { bindCarousel, safeUrl } from "../../scripts/core/slider.js";
import { renderProductCard, bindProductImages } from "../product-card/product-card.js";

function renderCategoryItem(cat) {
  const children = (cat.children || [])
    .map(
      (child) =>
        `<a class="shop-sidebar__child-link" href="${safeUrl(child.href)}" data-item-id="${escapeHtml(child.id)}">${escapeHtml(child.label)}</a>`
    )
    .join("");

  const panel = children
    ? `<div class="shop-sidebar__panel" data-accordion-panel hidden>${children}</div>`
    : "";

  return `
    <li class="shop-sidebar__cat-item" data-accordion-item data-open="${cat.open ? "true" : "false"}">
      <button type="button" class="shop-sidebar__cat-trigger" data-action="accordion-toggle">
        <span>${escapeHtml(cat.label)}</span>
        <span class="shop-sidebar__cat-chevron" aria-hidden="true"></span>
      </button>
      ${panel}
    </li>
  `;
}

function renderRecommendationSlide(products, index) {
  const active = index === 0 ? " is-active" : "";
  const cards = (products || []).map((p) => renderProductCard(p, { variant: "compact" })).join("");
  return `
    <div class="product-carousel__slide shop-sidebar__rec-slide${active}" data-carousel-slide aria-hidden="${index === 0 ? "false" : "true"}">
      <div class="shop-sidebar__rec-list" data-list="recommendations">${cards}</div>
    </div>
  `;
}

function buildTemplate(data) {
  const s = data.sidebar || {};
  const recSlides = s.recommendationSlides || [];
  const dots = recSlides
    .map(
      (_, i) =>
        `<button type="button" class="carousel-dots__dot${i === 0 ? " is-active" : ""}" data-action="carousel-go" data-slide-index="${i}" aria-label="Recommendations page ${i + 1}"></button>`
    )
    .join("");

  return `
    <aside class="shop-sidebar__inner">
      <div class="shop-sidebar__widget shop-panel">
        <h2 class="shop-sidebar__widget-title">${escapeHtml(s.categoriesTitle || "PRODUCT CATEGORIES")}</h2>
        <ul class="shop-sidebar__cats" data-list="categories">
          ${(s.categories || []).map(renderCategoryItem).join("")}
        </ul>
      </div>
      <div class="shop-sidebar__widget shop-panel">
        <h2 class="shop-sidebar__widget-title">${escapeHtml(s.recommendationsTitle || "RECOMMENDATIONS")}</h2>
        <div class="shop-sidebar__rec" role="region" aria-label="Recommendations">
          <div class="shop-sidebar__rec-track">
            ${recSlides.map(renderRecommendationSlide).join("")}
          </div>
          <div class="shop-sidebar__rec-dots carousel-dots">${dots}</div>
        </div>
      </div>
    </aside>
  `;
}

export function initShopSidebar(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  bindAccordion(rootEl);
  const recRegion = rootEl.querySelector(".shop-sidebar__rec");
  if (recRegion) {
    bindCarousel(recRegion, { autoplayMs: 8000 });
  }
  bindProductImages(rootEl);
}
