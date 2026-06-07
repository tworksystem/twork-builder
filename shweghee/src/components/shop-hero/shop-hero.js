import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { bindCarousel, safeUrl, safeImageSrc } from "../../scripts/core/slider.js";

function slideStyle(slide) {
  const url = safeImageSrc(slide.imageUrl);
  return url ? `background-image: url('${url}');` : "";
}

function renderSlide(slide, index) {
  const active = index === 0 ? " is-active" : "";
  const titleTag = index === 0 ? "h1" : "p";
  const titleClass = index === 0 ? "shop-hero__title" : "shop-hero__title shop-hero__title--duplicate";
  return `
    <article
      class="shop-hero__slide${active}"
      data-carousel-slide
      data-item-id="${escapeHtml(slide.id)}"
      style="${slideStyle(slide)}"
      aria-hidden="${index === 0 ? "false" : "true"}"
    >
      <div class="shop-hero__overlay">
        <div class="shop-hero__content shop-header__container">
          <p class="shop-hero__eyebrow">${escapeHtml(slide.eyebrow)}</p>
          <${titleTag} class="${titleClass}">${escapeHtml(slide.title)}</${titleTag}>
          <p class="shop-hero__highlight">${escapeHtml(slide.highlight)}</p>
          <p class="shop-hero__subtitle">${escapeHtml(slide.subtitle)}</p>
          <a class="shop-hero__cta" href="${safeUrl(slide.ctaHref)}">${escapeHtml(slide.ctaLabel)} <span aria-hidden="true">›</span></a>
        </div>
      </div>
    </article>
  `;
}

function buildTemplate(data) {
  const slides = data.hero?.slides || [];
  if (!slides.length) {
    return `<p class="shop-hero__empty l-section">Hero unavailable.</p>`;
  }

  const dots = slides
    .map(
      (_, i) =>
        `<button type="button" class="carousel-dots__dot${i === 0 ? " is-active" : ""}" data-action="carousel-go" data-slide-index="${i}" aria-label="Slide ${i + 1}"></button>`
    )
    .join("");

  return `
    <div class="shop-hero__wrap" role="region" aria-roledescription="carousel" aria-label="Shop promotions">
      <div class="shop-hero__track" data-list="slides">${slides.map(renderSlide).join("")}</div>
      <button type="button" class="shop-hero__arrow shop-hero__arrow--prev" data-action="carousel-prev" aria-label="Previous">‹</button>
      <button type="button" class="shop-hero__arrow shop-hero__arrow--next" data-action="carousel-next" aria-label="Next">›</button>
      <div class="shop-hero__dots carousel-dots" role="tablist">${dots}</div>
    </div>
  `;
}

export function initShopHero(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  bindCarousel(rootEl, { autoplayMs: 7000 });
}
