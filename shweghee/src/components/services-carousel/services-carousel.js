import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function renderCard(item) {
  const imageSrc = safeImageSrc(item.imageUrl);
  const media = imageSrc
    ? `<img src="${imageSrc}" alt="${escapeHtml(item.imageAlt || "")}" width="380" height="280" loading="lazy" decoding="async" />`
    : "";

  return `
    <article class="services-carousel__card" data-item-id="${item.id}">
      <div class="services-carousel__media">
        ${media}
      </div>
      <div class="services-carousel__box">
        <h3 class="services-carousel__card-title">${item.title}</h3>
        <a class="services-carousel__link" href="${safeUrl(item.href)}">${item.ctaLabel || "Learn more"}</a>
      </div>
    </article>
  `;
}

function buildTemplate(data) {
  const s = data.services || {};
  const items = s.items || [];
  const dots = items
    .map(
      (_, i) =>
        `<button type="button" class="carousel-dots__dot${i === 0 ? " is-active" : ""}" data-action="carousel-go" data-slide-index="${i}" aria-label="Service ${i + 1}"></button>`
    )
    .join("");

  return `
    <div class="services-carousel__inner l-section">
      <header class="section-head">
        <p class="section-head__eyebrow">${s.eyebrow || ""}</p>
        <h2 class="section-head__title">${s.title || ""}</h2>
      </header>
      <div class="services-carousel__stage" role="region" aria-label="Farming services">
        <div class="services-carousel__track" data-list="items">
          ${items.slice(0, 3).map(renderCard).join("")}
        </div>
      </div>
      <div class="carousel-nav" aria-hidden="true">
        <div class="carousel-dots">${dots}</div>
      </div>
    </div>
  `;
}

export function initServicesCarousel(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);
  rootEl.querySelectorAll("img").forEach(imageOnError);
}
