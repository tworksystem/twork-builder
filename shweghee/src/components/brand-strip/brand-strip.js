import { guardInit } from "../../scripts/core/init-guard.js";

function buildTemplate(data) {
  const brands = data.brands || [];
  const items = brands
    .map(
      (brand) =>
        `<div class="brand-strip__item" data-item-id="${brand.id}" data-field="name">${brand.name}</div>`
    )
    .join("");

  return `
    <div class="brand-strip__wrap l-section">
      <h2 class="section-heading u-text-center">Trusted Brands</h2>
      <div class="brand-strip__inner" data-list="brands">${items}</div>
    </div>
  `;
}

export function initBrandStrip(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
}
