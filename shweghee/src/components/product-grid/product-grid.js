import { guardInit } from "../../scripts/core/init-guard.js";
import { renderProductCard, bindProductImages } from "../product-card/product-card.js";
import { getToolbarState, bindToolbarEvents } from "../shop-toolbar/shop-toolbar.js";

function getProductPrice(product) {
  if (product.salePrice != null) {
    return product.salePrice;
  }
  if (product.priceRange) {
    return product.priceRange[0];
  }
  return product.price ?? 0;
}

function sortProducts(products, sortKey) {
  const list = [...products];
  switch (sortKey) {
    case "price-asc":
      return list.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    case "price-desc":
      return list.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    case "latest":
      return list.reverse();
    default:
      return list;
  }
}

function layoutClass(layout) {
  if (layout === "list") {
    return "product-grid__list";
  }
  if (layout === "grid-3") {
    return "product-grid__grid product-grid__grid--3";
  }
  return "product-grid__grid product-grid__grid--4";
}

function renderGrid(products, layout) {
  const cards = products.map((p) => renderProductCard(p)).join("");
  return `<div class="${layoutClass(layout)}" data-list="products" id="products">${cards}</div>`;
}

function renderPagination(page, totalPages) {
  return `
    <nav class="product-grid__pagination" aria-label="Product pagination">
      <span class="product-grid__page-label">Page</span>
      <span class="product-grid__page-box">
        <input type="text" inputmode="numeric" value="${page}" aria-label="Current page" data-action="grid-page-input" />
      </span>
      <span class="product-grid__page-total">/ ${totalPages}</span>
      <button type="button" class="product-grid__page-next" data-action="grid-page-next" aria-label="Next page"${page >= totalPages ? " disabled aria-disabled=\"true\"" : ""}>›</button>
    </nav>
  `;
}

export function initProductGrid(rootEl, data = {}, options = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  const allProducts = data.products || [];
  const toolbarEl = options.toolbarEl || document.querySelector('[data-component="shop-toolbar"]');

  const render = () => {
    const state = getToolbarState(toolbarEl);
    const sorted = sortProducts(allProducts, state.sort);
    const totalPages = Math.max(1, Math.ceil(sorted.length / state.perPage) || 1);
    const page = Math.min(state.page, totalPages);
    const start = (page - 1) * state.perPage;
    const slice = sorted.slice(start, start + state.perPage);

    if (toolbarEl) {
      const pageInput = toolbarEl.querySelector("[data-action='page-input']");
      if (pageInput) {
        pageInput.value = String(page);
      }
    }

    rootEl.innerHTML = `
      <div class="product-grid__live" aria-live="polite" aria-atomic="true">
        ${renderGrid(slice, state.layout)}
      </div>
      ${renderPagination(page, totalPages)}
    `;
    bindProductImages(rootEl);
  };

  if (!rootEl.dataset.paginationBound) {
    rootEl.dataset.paginationBound = "true";

    rootEl.addEventListener("blur", (e) => {
      if (!e.target.matches("[data-action='grid-page-input']")) {
        return;
      }
      const state = getToolbarState(toolbarEl);
      const sorted = sortProducts(allProducts, state.sort);
      const totalPages = Math.max(1, Math.ceil(sorted.length / state.perPage) || 1);
      let nextPage = Number.parseInt(e.target.value, 10) || 1;
      nextPage = Math.max(1, Math.min(totalPages, nextPage));
      if (toolbarEl) {
        const topInput = toolbarEl.querySelector("[data-action='page-input']");
        if (topInput) {
          topInput.value = String(nextPage);
        }
      }
      render();
    }, true);

    rootEl.addEventListener("keydown", (e) => {
      if (e.target.matches("[data-action='grid-page-input']") && e.key === "Enter") {
        e.target.blur();
      }
    });

    rootEl.addEventListener("click", (e) => {
      const nextBtn = e.target.closest("[data-action='grid-page-next']");
      if (!nextBtn || nextBtn.disabled || !toolbarEl) {
        return;
      }
      const state = getToolbarState(toolbarEl);
      const sorted = sortProducts(allProducts, state.sort);
      const totalPages = Math.max(1, Math.ceil(sorted.length / state.perPage) || 1);
      const page = Math.min(state.page, totalPages);
      if (page >= totalPages) {
        return;
      }
      const topInput = toolbarEl.querySelector("[data-action='page-input']");
      if (topInput) {
        topInput.value = String(page + 1);
      }
      render();
    });
  }

  if (toolbarEl) {
    bindToolbarEvents(toolbarEl, render);
  }

  render();
}
