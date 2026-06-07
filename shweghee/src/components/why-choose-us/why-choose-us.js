import { guardInit } from "../../scripts/core/init-guard.js";

const ICONS = {
  cube: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
  star: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  truck: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  tag: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  cherry: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22c-4 0-6-3-6-6 0-3 2-5 6-8 4 3 6 5 6 8 0 3-2 6-6 6z"/><path d="M12 8V2"/><path d="M8 4c2 2 4 2 4 4"/></svg>',
  cert: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
};

const ICON_KEYS = ["cube", "star", "truck", "tag", "cherry", "cert"];

function renderItem(item, index) {
  const icon = ICONS[ICON_KEYS[index % ICON_KEYS.length]];
  return `
    <article class="why-choose-us__item" data-item-id="${item.id}">
      <span class="why-choose-us__number" aria-hidden="true">${item.number}</span>
      <div class="why-choose-us__icon" aria-hidden="true">${icon}</div>
      <h3 class="why-choose-us__title">${item.title}</h3>
      <p class="why-choose-us__text">${item.text}</p>
    </article>
  `;
}

function buildTemplate(data) {
  const w = data.whyChoose || {};
  return `
    <div class="why-choose-us__inner l-section">
      <header class="section-head">
        <p class="section-head__eyebrow">${w.eyebrow || ""}</p>
        <h2 class="section-head__title">${w.title || ""}</h2>
      </header>
      <div class="why-choose-us__grid" data-list="items">
        ${(w.items || []).map(renderItem).join("")}
      </div>
    </div>
  `;
}

export function initWhyChooseUs(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
}
