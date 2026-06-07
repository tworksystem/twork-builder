import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { safeUrl } from "../../scripts/core/slider.js";

function buildTemplate(data) {
  const items = data.breadcrumb?.items || [];
  if (!items.length) {
    return "";
  }

  const crumbs = items
    .map((item, i) => {
      const isLast = i === items.length - 1;
      if (isLast) {
        return `<span class="breadcrumb__current" aria-current="page">${escapeHtml(item.label)}</span>`;
      }
      return `<a href="${safeUrl(item.href)}" data-item-id="${escapeHtml(item.id)}">${escapeHtml(item.label)}</a>`;
    })
    .join('<span class="breadcrumb__sep" aria-hidden="true"> / </span>');

  return `
    <nav class="breadcrumb__inner l-section shop-header__container" aria-label="Breadcrumb">
      <ol class="breadcrumb__list">
        <li class="breadcrumb__item">${crumbs}</li>
      </ol>
    </nav>
  `;
}

export function initBreadcrumb(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
}
