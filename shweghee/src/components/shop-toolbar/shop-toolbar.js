import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";

function buildTemplate(data) {
  const t = data.toolbar || {};
  const sortOptions = (t.sortOptions || [])
    .map((o) => `<option value="${escapeHtml(o.id)}">${escapeHtml(o.label)}</option>`)
    .join("");
  const perPage = (t.perPageOptions || [20])
    .map((n) => `<option value="${n}"${n === t.defaultPerPage ? " selected" : ""}>${n} per page</option>`)
    .join("");

  return `
    <div class="shop-toolbar__page-info" data-field="pageInfo">
      Page <span class="shop-toolbar__page-box"><input type="text" inputmode="numeric" value="${t.currentPage || 1}" aria-label="Current page" data-action="page-input" /></span> of ${t.totalPages || 1}
    </div>
    <div class="shop-toolbar__bar">
      <label class="shop-toolbar__field">
        <span class="u-hidden">Sort products</span>
        <select data-action="sort" aria-label="Sort products">${sortOptions}</select>
      </label>
      <label class="shop-toolbar__field shop-toolbar__field--view">
        <span>View:</span>
        <select data-action="per-page" aria-label="Products per page">${perPage}</select>
      </label>
      <div class="shop-toolbar__layouts" role="group" aria-label="Layout">
        <button type="button" class="shop-toolbar__layout is-active" data-action="layout" data-layout="grid-4" aria-pressed="true" aria-label="4 column grid">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        </button>
        <button type="button" class="shop-toolbar__layout" data-action="layout" data-layout="list" aria-pressed="false" aria-label="List view">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        </button>
        <button type="button" class="shop-toolbar__layout" data-action="layout" data-layout="grid-3" aria-pressed="false" aria-label="3 column grid">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="5" height="5"/><rect x="10" y="3" width="5" height="5"/><rect x="17" y="3" width="5" height="5"/><rect x="3" y="10" width="5" height="5"/><rect x="10" y="10" width="5" height="5"/><rect x="17" y="10" width="5" height="5"/></svg>
        </button>
      </div>
    </div>
  `;
}

export function initShopToolbar(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  rootEl._toolbarConfig = data.toolbar || {};
}

export function getToolbarState(toolbarEl) {
  const config = toolbarEl?._toolbarConfig || {};
  const pageInput = toolbarEl?.querySelector("[data-action='page-input']");
  const perPageSelect = toolbarEl?.querySelector("[data-action='per-page']");
  const sortSelect = toolbarEl?.querySelector("[data-action='sort']");
  const layoutBtn = toolbarEl?.querySelector(".shop-toolbar__layout.is-active");

  let page = Number.parseInt(pageInput?.value, 10) || config.currentPage || 1;
  const totalPages = config.totalPages || 1;
  page = Math.max(1, Math.min(totalPages, page));

  return {
    page,
    totalPages,
    perPage: Number.parseInt(perPageSelect?.value, 10) || config.defaultPerPage || 20,
    sort: sortSelect?.value || "default",
    layout: layoutBtn?.dataset.layout || "grid-4"
  };
}

export function bindToolbarEvents(toolbarEl, onChange) {
  if (!toolbarEl || typeof onChange !== "function") {
    return;
  }

  const emit = () => onChange(getToolbarState(toolbarEl));

  toolbarEl.addEventListener("change", (e) => {
    if (e.target.matches("[data-action='sort'], [data-action='per-page']")) {
      emit();
    }
  });

  toolbarEl.addEventListener("blur", (e) => {
    if (e.target.matches("[data-action='page-input']")) {
      const config = toolbarEl._toolbarConfig || {};
      let page = Number.parseInt(e.target.value, 10) || 1;
      page = Math.max(1, Math.min(config.totalPages || 1, page));
      e.target.value = String(page);
      emit();
    }
  }, true);

  toolbarEl.addEventListener("keydown", (e) => {
    if (e.target.matches("[data-action='page-input']") && e.key === "Enter") {
      e.target.blur();
    }
  });

  toolbarEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='layout']");
    if (!btn) {
      return;
    }
    toolbarEl.querySelectorAll("[data-action='layout']").forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    emit();
  });
}
