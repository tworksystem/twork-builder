import { guardInit } from "../../scripts/core/init-guard.js";

function renderPromo(item) {
  const themeClass = item.theme === "cool" ? " promo-banners__item--cool" : " promo-banners__item--warm";
  return `
    <article class="promo-banners__item${themeClass}" data-item-id="${item.id}">
      <h3 class="promo-banners__title" data-field="title">${item.title}</h3>
      <p class="promo-banners__subtitle" data-field="subtitle">${item.subtitle}</p>
      <a class="promo-banners__cta btn" href="${item.href || "#"}" data-field="ctaLabel">${item.ctaLabel}</a>
    </article>
  `;
}

function buildTemplate(data) {
  const items = data.promos || [];
  return `
    <div class="promo-banners__wrap l-section">
      <div class="promo-banners__inner l-grid l-grid--2" data-list="promoItems">
        ${items.map(renderPromo).join("")}
      </div>
    </div>
  `;
}

export function initPromoBanners(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
}
