import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { bindCarousel, safeUrl } from "../../scripts/core/slider.js";
import { imageOnError } from "../../scripts/core/slider.js";

function renderCategoryCard(cat) {
  const links = (cat.sublinks || [])
    .map((link) => {
      const cls = link.highlight ? "featured-categories__link featured-categories__link--cta" : "featured-categories__link";
      return `<a class="${cls}" href="${safeUrl(link.href)}" data-item-id="${escapeHtml(link.id)}">${escapeHtml(link.label)}${link.highlight ? " ›" : ""}</a>`;
    })
    .join("");

  return `
    <article class="featured-categories__card" data-item-id="${escapeHtml(cat.id)}">
      <div class="featured-categories__media">
        <img src="${escapeHtml(cat.image || "")}" alt="${escapeHtml(cat.title)}" width="200" height="160" loading="lazy" />
      </div>
      <h3 class="featured-categories__name">${escapeHtml(cat.title)}</h3>
      <nav class="featured-categories__links">${links}</nav>
    </article>
  `;
}

function renderSlide(categories, index) {
  const active = index === 0 ? " is-active" : "";
  return `
    <div class="featured-categories__slide${active}" data-carousel-slide aria-hidden="${index === 0 ? "false" : "true"}">
      <div class="featured-categories__grid" data-list="categories">
        ${(categories || []).map(renderCategoryCard).join("")}
      </div>
    </div>
  `;
}

function buildTemplate(data) {
  const fc = data.featuredCategories || {};
  const slides = fc.slides || [];

  const dots = slides
    .map(
      (_, i) =>
        `<button type="button" class="carousel-dots__dot${i === 0 ? " is-active" : ""}" data-action="carousel-go" data-slide-index="${i}" aria-label="Categories slide ${i + 1}"></button>`
    )
    .join("");

  return `
    <div class="shop-panel featured-categories__panel">
      <header class="shop-panel__head">
        <div class="shop-panel__title-wrap">
          <span class="shop-panel__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 5 5-9"/></svg>
          </span>
          <h2 class="shop-panel__title" data-field="title">${escapeHtml(fc.title || "")}</h2>
        </div>
        <a class="shop-panel__view-all" href="${safeUrl(fc.viewAllHref)}">View All ›</a>
      </header>
      <div class="featured-categories__stage" role="region" aria-label="${escapeHtml(fc.title || "Featured categories")}">
        <button type="button" class="featured-categories__arrow featured-categories__arrow--prev" data-action="carousel-prev" aria-label="Previous">‹</button>
        <div class="featured-categories__track">${slides.map(renderSlide).join("")}</div>
        <button type="button" class="featured-categories__arrow featured-categories__arrow--next" data-action="carousel-next" aria-label="Next">›</button>
      </div>
      <div class="featured-categories__dots carousel-dots">${dots}</div>
    </div>
  `;
}

export function initFeaturedCategories(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  bindCarousel(rootEl, { autoplayMs: 0 });
  rootEl.querySelectorAll("img").forEach(imageOnError);
}
