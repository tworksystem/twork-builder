import { escapeHtml } from "../../scripts/core/escape.js";
import { formatCurrency } from "../../scripts/core/format.js";
import { imageOnError, safeUrl } from "../../scripts/core/slider.js";

export function renderStars(rating = 0, reviewCount = 0) {
  const filled = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  const stars = Array.from({ length: 5 }, (_, i) => {
    const cls = i < filled ? "product-card__star--filled" : "product-card__star--empty";
    return `<span class="product-card__star ${cls}" aria-hidden="true">★</span>`;
  }).join("");

  return `
    <div class="product-card__rating" aria-label="${filled} out of 5 stars, ${reviewCount} reviews">
      ${stars}
      <span class="product-card__reviews">(${reviewCount})</span>
    </div>
  `;
}

function renderBadge(badge) {
  if (!badge?.text) {
    return "";
  }
  const type = badge.type === "stock" ? "product-card__badge--stock" : "product-card__badge--sale";
  return `<span class="product-card__badge ${type}">${escapeHtml(badge.text)}</span>`;
}

function renderPrice(product) {
  if (product.priceRange) {
    const [min, max] = product.priceRange;
    return `<p class="product-card__price product-card__price--range">${formatCurrency(min)}–${formatCurrency(max)}</p>`;
  }

  if (product.salePrice != null && product.price != null) {
    return `
      <p class="product-card__price">
        <span class="product-card__price--sale">${formatCurrency(product.salePrice)}</span>
        <span class="product-card__price--was">${formatCurrency(product.price)}</span>
      </p>
    `;
  }

  const amount = product.price ?? product.salePrice ?? 0;
  return `<p class="product-card__price">${formatCurrency(amount)}</p>`;
}

/**
 * @param {object} product
 * @param {{ variant?: 'grid' | 'compact', lazy?: boolean }} options
 */
export function renderProductCard(product, options = {}) {
  const { variant = "grid", lazy = true } = options;
  const loading = lazy ? "lazy" : "eager";

  if (variant === "compact") {
    return `
      <article class="product-card product-card--compact" data-item-id="${escapeHtml(product.id)}">
        <a class="product-card__thumb-link" href="${safeUrl(product.href)}">
          <img class="product-card__thumb" src="${escapeHtml(product.image || "")}" alt="${escapeHtml(product.imageAlt || product.title)}" width="80" height="80" loading="${loading}" />
        </a>
        <div class="product-card__body">
          <h3 class="product-card__title"><a href="${safeUrl(product.href)}">${escapeHtml(product.title)}</a></h3>
          ${renderStars(product.rating, product.reviewCount)}
          ${renderPrice(product)}
        </div>
      </article>
    `;
  }

  return `
    <article class="product-card product-card--grid" data-item-id="${escapeHtml(product.id)}">
      <div class="product-card__media">
        ${renderBadge(product.badge)}
        <a href="${safeUrl(product.href)}" class="product-card__image-link">
          <img class="product-card__image" src="${escapeHtml(product.image || "")}" alt="${escapeHtml(product.imageAlt || product.title)}" width="280" height="280" loading="${loading}" />
        </a>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__title"><a href="${safeUrl(product.href)}">${escapeHtml(product.title)}</a></h3>
        ${renderStars(product.rating, product.reviewCount)}
        ${renderPrice(product)}
      </div>
    </article>
  `;
}

export function bindProductImages(rootEl) {
  rootEl.querySelectorAll(".product-card img").forEach(imageOnError);
}
