import { guardInit } from "../../scripts/core/init-guard.js";
import { bindCarousel, safeUrl, safeImageSrc } from "../../scripts/core/slider.js";

const ALLOWED_BG_POSITIONS = new Set([
  "center",
  "center right",
  "center left",
  "right center",
  "left center"
]);

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeBgPosition(position) {
  const normalized = String(position || "center right")
    .trim()
    .toLowerCase();
  return ALLOWED_BG_POSITIONS.has(normalized) ? normalized : "center right";
}

function slideStyle(slide) {
  const imageUrl = safeImageSrc(slide.imageUrl);
  const bgPosition = safeBgPosition(slide.backgroundPosition);

  if (!imageUrl) {
    return `background-position: ${bgPosition};`;
  }

  return `background-image: url('${imageUrl}'); background-position: ${bgPosition};`;
}

function renderSlide(slide, index) {
  const active = index === 0 ? " is-active" : "";
  const ariaLabel = slide.imageAlt ? ` aria-label="${escapeHtml(slide.imageAlt)}"` : "";

  return `
    <article
      class="hero__slide${active}"
      data-carousel-slide
      data-item-id="${escapeHtml(slide.id)}"
      aria-hidden="${index === 0 ? "false" : "true"}"
      style="${slideStyle(slide)}"
      ${ariaLabel}
    >
      <div class="hero__overlay">
        <div class="hero__inner l-section">
          <div class="hero__content">
            <p class="hero__eyebrow">${escapeHtml(slide.eyebrow)}</p>
            <h1 class="hero__title">${escapeHtml(slide.title)}</h1>
            <p class="hero__subtitle">${escapeHtml(slide.subtitle)}</p>
            <a class="hero__cta btn btn--primary" href="${safeUrl(slide.ctaHref)}">
              ${escapeHtml(slide.ctaLabel)}<span class="hero__cta-icon" aria-hidden="true"> ›</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function buildTemplate(data) {
  const slides = data.hero?.slides || [];
  if (!slides.length) {
    return `<div class="hero__empty l-section">Hero content unavailable.</div>`;
  }

  const dots = slides
    .map(
      (_, i) =>
        `<button type="button" class="carousel-dots__dot${i === 0 ? " is-active" : ""}" data-action="carousel-go" data-slide-index="${i}" aria-label="Slide ${i + 1}" aria-selected="${i === 0 ? "true" : "false"}"></button>`
    )
    .join("");

  return `
    <div class="hero__wrap" role="region" aria-roledescription="carousel" aria-label="Hero">
      <div class="hero__track" data-list="slides">
        ${slides.map((s, i) => renderSlide(s, i)).join("")}
      </div>
      <button type="button" class="hero__arrow hero__arrow--prev" data-action="carousel-prev" aria-label="Previous slide">‹</button>
      <button type="button" class="hero__arrow hero__arrow--next" data-action="carousel-next" aria-label="Next slide">›</button>
      <div class="hero__dots carousel-dots" role="tablist">${dots}</div>
    </div>
  `;
}

export function initHero(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);

  bindCarousel(rootEl, {
    slideSelector: "[data-carousel-slide]",
    activeSlideClass: "is-active",
    activeDotClass: "is-active",
    autoplayMs: 7000
  });
}
