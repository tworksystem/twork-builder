import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { bindAccordion } from "../../scripts/core/accordion.js";
import { safeUrl } from "../../scripts/core/slider.js";

function renderItem(item, index) {
  const open = item.open ? ' data-open="true"' : "";
  return `
    <div class="faq__item" data-accordion-item data-item-id="${escapeHtml(item.id)}"${open}>
      <button type="button" class="faq__trigger" data-action="accordion-toggle" aria-expanded="${item.open ? "true" : "false"}">
        <span class="faq__question">${escapeHtml(item.question)}</span>
        <span class="faq__icon" aria-hidden="true"></span>
      </button>
      <div class="faq__panel" data-accordion-panel id="faq-panel-${index}" ${item.open ? "" : "hidden"}>
        <p>${escapeHtml(item.answer)}</p>
      </div>
    </div>
  `;
}

function buildTemplate(data) {
  const f = data.faq || {};
  return `
    <div class="faq__inner l-section">
      <header class="section-head">
        <p class="section-head__eyebrow">${escapeHtml(f.eyebrow || "")}</p>
        <h2 class="section-head__title">${escapeHtml(f.title || "")}</h2>
      </header>
      <div class="faq__list" data-list="items">
        ${(f.items || []).map(renderItem).join("")}
      </div>
      <p class="faq__contact">
        ${escapeHtml(f.contactText || "")}
        <a href="${safeUrl(f.contactHref)}">${escapeHtml(f.contactLinkLabel || "Contact us")}</a>
      </p>
    </div>
  `;
}

export function initFaq(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);
  bindAccordion(rootEl, {
    itemSelector: ".faq__item",
    triggerSelector: "[data-action='accordion-toggle']",
    panelSelector: ".faq__panel",
    openClass: "is-open",
    singleOpen: true
  });
}
