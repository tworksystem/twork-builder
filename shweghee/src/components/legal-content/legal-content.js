import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { bindAccordion } from "../../scripts/core/accordion.js";

function renderSection(section, index) {
  const open = section.open ? ' data-open="true"' : "";
  return `
    <div class="legal-content__section" data-accordion-item data-item-id="${escapeHtml(section.id)}"${open}>
      <button type="button" class="legal-content__trigger" data-action="accordion-toggle" aria-expanded="${section.open ? "true" : "false"}">
        <span>${escapeHtml(section.title)}</span>
        <span class="legal-content__icon" aria-hidden="true"></span>
      </button>
      <div class="legal-content__panel" data-accordion-panel id="legal-panel-${index}" ${section.open ? "" : "hidden"}>
        ${(section.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
        ${section.list ? `<ul>${section.list.map((li) => `<li>${escapeHtml(li)}</li>`).join("")}</ul>` : ""}
      </div>
    </div>
  `;
}

function buildTemplate(data) {
  const l = data.legal || {};
  return `
    <div class="legal-content__inner l-section">
      <p class="legal-content__updated">Last updated: ${escapeHtml(l.lastUpdated || "")}</p>
      <div class="legal-content__sections" data-list="sections">
        ${(l.sections || []).map(renderSection).join("")}
      </div>
    </div>
  `;
}

export function initLegalContent(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);
  bindAccordion(rootEl, {
    itemSelector: ".legal-content__section",
    triggerSelector: "[data-action='accordion-toggle']",
    panelSelector: ".legal-content__panel",
    openClass: "is-open",
    singleOpen: false
  });
}
