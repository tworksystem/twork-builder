import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { bindCarousel, safeUrl } from "../../scripts/core/slider.js";
import { renderProductCard, bindProductImages } from "../product-card/product-card.js";

function renderProductSlide(products, index) {
  const active = index === 0 ? " is-active" : "";
  const cards = (products || []).map((p) => renderProductCard(p)).join("");
  return `
    <div class="product-carousel__slide${active}" data-carousel-slide aria-hidden="${index === 0 ? "false" : "true"}">
      <div class="product-carousel__grid" data-list="products">${cards}</div>
    </div>
  `;
}

const STAR_ICON =
  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

export function initBestSellers(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  const section = data.bestSellers || {};
  const slides = section.slides || [];
  const dots = slides
    .map(
      (_, i) =>
        `<button type="button" class="carousel-dots__dot${i === 0 ? " is-active" : ""}" data-action="carousel-go" data-slide-index="${i}" aria-label="Slide ${i + 1}"></button>`
    )
    .join("");

  rootEl.innerHTML = `
    <div class="shop-panel best-sellers__panel">
      <header class="shop-panel__head">
        <div class="shop-panel__title-wrap">
          <span class="shop-panel__icon" aria-hidden="true">${STAR_ICON}</span>
          <h2 class="shop-panel__title">${escapeHtml(section.title || "")}</h2>
        </div>
        <a class="shop-panel__view-all" href="${safeUrl(section.viewAllHref)}">View All ›</a>
      </header>
      <div class="best-sellers__stage" role="region" aria-label="${escapeHtml(section.title || "")}">
        <div class="best-sellers__track">${slides.map(renderProductSlide).join("")}</div>
      </div>
      <div class="best-sellers__dots carousel-dots">${dots}</div>
    </div>
  `;

  bindCarousel(rootEl, { autoplayMs: 7000 });
  bindProductImages(rootEl);
}
