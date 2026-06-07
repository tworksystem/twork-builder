import { guardInit } from "./init-guard.js";
import { on } from "./events.js";

/**
 * @param {HTMLElement} rootEl
 * @param {object} options
 */
export function bindAccordion(rootEl, options = {}) {
  const {
    itemSelector = "[data-accordion-item]",
    triggerSelector = "[data-action='accordion-toggle']",
    panelSelector = "[data-accordion-panel]",
    openClass = "is-open",
    singleOpen = true
  } = options;

  const items = Array.from(rootEl.querySelectorAll(itemSelector));

  const setOpen = (item, open) => {
    const trigger = item.querySelector(triggerSelector);
    const panel = item.querySelector(panelSelector);
    if (!trigger || !panel) {
      return;
    }
    item.classList.toggle(openClass, open);
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
  };

  items.forEach((item, i) => {
    const trigger = item.querySelector(triggerSelector);
    const panel = item.querySelector(panelSelector);
    if (!trigger || !panel) {
      return;
    }
    const panelId = panel.id || `accordion-panel-${i}`;
    panel.id = panelId;
    trigger.setAttribute("aria-controls", panelId);
    const initiallyOpen = item.dataset.open === "true";
    setOpen(item, initiallyOpen);
  });

  on(rootEl, "click", triggerSelector, (_event, trigger) => {
    const item = trigger.closest(itemSelector);
    if (!item) {
      return;
    }
    const isOpen = item.classList.contains(openClass);

    if (singleOpen) {
      items.forEach((other) => {
        if (other !== item) {
          setOpen(other, false);
        }
      });
    }

    setOpen(item, !isOpen);
  });
}

export function initAccordionSection(rootEl, dataKey, data) {
  if (!guardInit(rootEl)) {
    return;
  }
  return { rootEl, dataKey, data };
}
