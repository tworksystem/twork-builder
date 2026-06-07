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

function buildTemplate(data, sectionKey, iconSvg) {
  const section = data[sectionKey] || {};
  const slides = section.slides || [];
  const dots = slides
    .map(
      (_, i) =>
        `<button type="button" class="carousel-dots__dot${i === 0 ? " is-active" : ""}" data-action="carousel-go" data-slide-index="${i}" aria-label="Slide ${i + 1}"></button>`
    )
    .join("");

  return `
    <div class="shop-panel daily-offers__panel">
      <header class="shop-panel__head">
        <div class="shop-panel__title-wrap">
          <span class="shop-panel__icon" aria-hidden="true">${iconSvg}</span>
          <h2 class="shop-panel__title">${escapeHtml(section.title || "")}</h2>
        </div>
        <a class="shop-panel__view-all" href="${safeUrl(section.viewAllHref)}">View All ›</a>
      </header>
      <div class="daily-offers__stage" role="region" aria-label="${escapeHtml(section.title || "")}">
        <div class="daily-offers__track">${slides.map(renderProductSlide).join("")}</div>
      </div>
      <div class="daily-offers__dots carousel-dots">${dots}</div>
    </div>
  `;
}

const TAG_ICON =
  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>';

export function initDailyOffers(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data, "dailyOffers", TAG_ICON);
  bindCarousel(rootEl, { autoplayMs: 7000 });
  bindProductImages(rootEl);
}
