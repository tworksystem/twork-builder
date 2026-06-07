import { guardInit } from "../../scripts/core/init-guard.js";

function renderCategory(item) {
  return `
    <a class="category-grid__item" href="${item.href || "#"}" data-item-id="${item.id}">
      <span class="category-grid__icon" aria-hidden="true">${item.icon || "🛒"}</span>
      <h3 class="category-grid__title" data-field="title">${item.title}</h3>
    </a>
  `;
}

function buildTemplate(data) {
  const items = data.categories || [];
  const cards = items.length
    ? items.map(renderCategory).join("")
    : `<p class="category-grid__empty">Categories unavailable.</p>`;

  return `
    <div class="category-grid__wrap l-section">
      <h2 class="section-heading">Shop by Category</h2>
      <div class="category-grid__inner" data-list="categories">${cards}</div>
    </div>
  `;
}

export function initCategoryGrid(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
}
