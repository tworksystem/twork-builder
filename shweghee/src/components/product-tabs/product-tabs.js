import { guardInit } from "../../scripts/core/init-guard.js";
import { on } from "../../scripts/core/events.js";
import { formatCurrency } from "../../scripts/core/format.js";

function renderPrice(product) {
  if (product.salePrice != null) {
    return `
      <span class="product-tabs__price product-tabs__price--sale" data-field="salePrice">${formatCurrency(product.salePrice)}</span>
      <span class="product-tabs__price product-tabs__price--old" data-field="price">${formatCurrency(product.price)}</span>
    `;
  }
  return `<span class="product-tabs__price" data-field="price">${formatCurrency(product.price)}</span>`;
}

function renderProductCard(product) {
  return `
    <article class="product-tabs__card" data-item-id="${product.id}">
      <a class="product-tabs__thumb" href="#">
        <img
          src="${product.imageUrl}"
          alt="${product.imageAlt || product.name}"
          width="280"
          height="280"
          loading="lazy"
          data-field="imageUrl"
        />
      </a>
      <h3 class="product-tabs__name" data-field="name">${product.name}</h3>
      <div class="product-tabs__prices">${renderPrice(product)}</div>
      <button class="product-tabs__add btn" type="button" data-action="add-cart" data-product-id="${product.id}">Add to cart</button>
    </article>
  `;
}

function renderPanel(tabId, products, isActive) {
  const list = products || [];
  const body = list.length
    ? list.map(renderProductCard).join("")
    : `<p class="product-tabs__empty">No products in this collection.</p>`;

  return `
    <div
      class="product-tabs__panel${isActive ? " product-tabs__panel--active" : ""}"
      role="tabpanel"
      data-panel-id="${tabId}"
      ${isActive ? "" : "hidden"}
    >
      <div class="product-tabs__grid" data-list="products">${body}</div>
    </div>
  `;
}

function buildTemplate(data) {
  const tabs = data.productTabs || [];
  const productsByTab = data.products || {};
  const firstId = tabs[0]?.id || "featured";

  const tabButtons = tabs
    .map(
      (tab, i) => `
      <button
        class="product-tabs__tab${tab.id === firstId ? " product-tabs__tab--active" : ""}"
        type="button"
        role="tab"
        aria-selected="${tab.id === firstId ? "true" : "false"}"
        data-action="tab-switch"
        data-item-id="${tab.id}"
        data-field="label"
      >${tab.label}</button>`
    )
    .join("");

  const panels = tabs
    .map((tab) => renderPanel(tab.id, productsByTab[tab.id], tab.id === firstId))
    .join("");

  return `
    <div class="product-tabs__wrap l-section">
      <h2 class="section-heading">Popular Products</h2>
      <div class="product-tabs__nav" role="tablist" data-list="tabs">${tabButtons}</div>
      <div class="product-tabs__panels">${panels}</div>
    </div>
  `;
}

function switchTab(rootEl, tabId) {
  rootEl.querySelectorAll("[data-action='tab-switch']").forEach((tabEl) => {
    const active = tabEl.dataset.itemId === tabId;
    tabEl.classList.toggle("product-tabs__tab--active", active);
    tabEl.setAttribute("aria-selected", active ? "true" : "false");
  });

  rootEl.querySelectorAll("[data-panel-id]").forEach((panelEl) => {
    const active = panelEl.dataset.panelId === tabId;
    panelEl.classList.toggle("product-tabs__panel--active", active);
    panelEl.toggleAttribute("hidden", !active);
  });

  rootEl.dataset.activeTab = tabId;
}

export function initProductTabs(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);
  const firstTab = data.productTabs?.[0]?.id || "featured";
  rootEl.dataset.activeTab = firstTab;

  on(rootEl, "click", "[data-action='tab-switch']", (_event, target) => {
    switchTab(rootEl, target.dataset.itemId);
  });

  on(rootEl, "click", "[data-action='add-cart']", (_event, target) => {
    target.textContent = "Added";
    target.disabled = true;
  });
}
