import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { on, debounce } from "../../scripts/core/events.js";
import { safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function renderMenuItems(items) {
  return items
    .map((item) => {
      const dropdown = item.hasDropdown ? ' <span class="icon-chevron" aria-hidden="true"></span>' : "";
      return `<a class="header__nav-link" href="${safeUrl(item.href)}" data-item-id="${item.id}">${item.label}${dropdown}</a>`;
    })
    .join("");
}

function buildTemplate(data) {
  const h = data.header || {};
  const menu = renderMenuItems(h.menuItems || []);
  const logoSrc = safeImageSrc(h.logoSrc || "../assets/brand/shwe-myanmar-logo.png");
  const logo = logoSrc
    ? `<img
            class="header__brand-logo"
            src="${logoSrc}"
            alt="${escapeHtml(h.brandName || "Shwe Myanmar")}"
            width="560"
            height="290"
            loading="eager"
            decoding="async"
          />`
    : `<span class="header__brand-text">${escapeHtml(h.brandName || "Shwe Myanmar")}</span>`;

  return `
    <div class="header__main">
      <div class="header__inner l-section">
        <a class="header__brand" href="${safeUrl("/pages/home.html")}" aria-label="${escapeHtml(h.brandName || "Shwe Myanmar")} home">
          ${logo}
        </a>
        <nav id="header-nav" class="header__nav" aria-label="Main navigation">${menu}</nav>
        <div class="header__actions">
          <button type="button" class="header__icon-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <div class="header__hotline">
            <span class="header__hotline-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </span>
            <div>
              <p class="header__hotline-label">${h.hotlineLabel || ""}</p>
              <a class="header__hotline-phone" href="tel:${(h.phone || "").replace(/\D/g, "")}">${h.phone || ""}</a>
            </div>
          </div>
          <button class="header__toggle" type="button" data-action="menu-toggle" aria-expanded="false" aria-controls="header-nav">
            <span class="u-hidden">Menu</span>
            <span class="header__toggle-bar" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function bindStickyHeader(rootEl) {
  const onScroll = debounce(() => {
    rootEl.classList.toggle("header--scrolled", window.scrollY > 20);
  }, 80);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

export function initHeader(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);

  on(rootEl, "click", "[data-action='menu-toggle']", (_event, btn) => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const next = !expanded;
    btn.setAttribute("aria-expanded", String(next));
    rootEl.classList.toggle("header--open", next);
    document.body.classList.toggle("nav-open", next);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && rootEl.classList.contains("header--open")) {
      const btn = rootEl.querySelector("[data-action='menu-toggle']");
      btn?.setAttribute("aria-expanded", "false");
      rootEl.classList.remove("header--open");
      document.body.classList.remove("nav-open");
      btn?.focus();
    }
  });

  bindStickyHeader(rootEl);
}
