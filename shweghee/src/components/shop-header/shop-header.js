import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { on } from "../../scripts/core/events.js";
import { safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function renderUtilityLinks(links = []) {
  return links
    .map((link) => `<a href="${safeUrl(link.href)}" data-item-id="${escapeHtml(link.id)}">${escapeHtml(link.label)}</a>`)
    .join("");
}

function renderMenuItems(items = []) {
  return items
    .map((item) => {
      const chevron = item.hasDropdown ? '<span class="shop-header__chevron" aria-hidden="true"></span>' : "";
      return `<a class="shop-header__nav-link" href="${safeUrl(item.href)}" data-item-id="${escapeHtml(item.id)}">${escapeHtml(item.label)}${chevron}</a>`;
    })
    .join("");
}

function renderCategoryOptions(categories = []) {
  return categories
    .map((c) => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.label)}</option>`)
    .join("");
}

function buildTemplate(data) {
  const h = data.header || {};
  const logoSrc = safeImageSrc(h.logoSrc || "../assets/brand/shwe-myanmar-logo.png");
  const logo = logoSrc
    ? `<img
            class="shop-header__brand-logo"
            src="${logoSrc}"
            alt="${escapeHtml(h.brandName || "Shwe Myanmar")}"
            width="560"
            height="290"
            loading="eager"
            decoding="async"
          />`
    : `<span class="shop-header__brand-text">${escapeHtml(h.brandName || "Shwe Myanmar")}</span>`;

  return `
    <div class="shop-header__utility">
      <div class="shop-header__utility-inner l-section shop-header__container">
        <span class="shop-header__utility-spacer"></span>
        <nav class="shop-header__utility-nav" aria-label="Utility">
          ${renderUtilityLinks(h.utilityLinks)}
          <span class="shop-header__divider">|</span>
          <button type="button" class="shop-header__lang" data-field="language">${escapeHtml(h.language || "English")} ▾</button>
          <button type="button" class="shop-header__currency" data-field="currency">${escapeHtml(h.currency || "MMK")} ▾</button>
        </nav>
      </div>
    </div>
    <div class="shop-header__main">
      <div class="shop-header__main-inner l-section shop-header__container">
        <a class="shop-header__brand" href="${safeUrl("/pages/home.html")}" aria-label="${escapeHtml(h.brandName || "Shwe Myanmar")} home">
          ${logo}
        </a>
        <form class="shop-header__search" role="search" action="#" method="get">
          <label class="u-hidden" for="shop-search">Search products</label>
          <select class="shop-header__search-cat" id="shop-search-cat" name="category" aria-label="Category">
            ${renderCategoryOptions(h.categories)}
          </select>
          <input id="shop-search" class="shop-header__search-input" type="search" name="q" placeholder="${escapeHtml(h.searchPlaceholder || "Search...")}" maxlength="120" />
          <button type="submit" class="shop-header__search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </button>
        </form>
        <div class="shop-header__icons">
          <a class="shop-header__icon-link" href="#" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </a>
          <a class="shop-header__icon-link" href="#" aria-label="Wishlist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </a>
          <a class="shop-header__cart" href="#" aria-label="Shopping cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span class="shop-header__cart-total" data-field="cartTotal">${escapeHtml(h.cartTotal || "0 MMK")}</span>
          </a>
        </div>
        <button type="button" class="shop-header__menu-toggle" data-action="shop-menu-toggle" aria-expanded="false" aria-controls="shop-header-nav">
          <span class="u-hidden">Menu</span>
          <span class="shop-header__toggle-bar" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    <div class="shop-header__nav-bar">
      <div class="shop-header__nav-inner l-section shop-header__container">
        <button type="button" class="shop-header__browse" data-action="browse-toggle" aria-expanded="false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          Browse Categories
        </button>
        <nav id="shop-header-nav" class="shop-header__nav" aria-label="Main">${renderMenuItems(h.menuItems)}</nav>
        <a class="shop-header__recent" href="#">${escapeHtml(h.recentLabel || "Recently Viewed")}</a>
      </div>
    </div>
  `;
}

export function initShopHeader(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);

  on(rootEl, "click", "[data-action='shop-menu-toggle']", (_e, btn) => {
    const open = document.body.classList.toggle("shop-nav-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  rootEl.querySelector(".shop-header__search")?.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
