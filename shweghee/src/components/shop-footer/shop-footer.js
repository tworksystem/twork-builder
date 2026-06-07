import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { safeUrl } from "../../scripts/core/slider.js";

function renderColumn(column) {
  const links = (column.links || [])
    .map((link) => `<a class="shop-footer__link" href="${safeUrl(link.href)}" data-item-id="${escapeHtml(link.id)}">${escapeHtml(link.label)}</a>`)
    .join("");

  return `
    <div class="shop-footer__column" data-item-id="${escapeHtml(column.id)}">
      <h3 class="shop-footer__column-title">${escapeHtml(column.title)}</h3>
      <nav class="shop-footer__links">${links}</nav>
    </div>
  `;
}

function buildTemplate(data) {
  const f = data.footer || {};
  const categoryLinks = (f.categoryLinks || [])
    .map((label) => `<a href="#" class="shop-footer__cat-link">${escapeHtml(label)}</a>`)
    .join("");
  const payments = (f.payments || [])
    .map((p) => `<span class="shop-footer__pay" data-item-id="${escapeHtml(p)}">${escapeHtml(p)}</span>`)
    .join("");

  return `
    <div class="shop-footer__main l-section shop-header__container">
      <div class="shop-footer__brand-block">
        <a class="shop-footer__brand" href="${safeUrl("/pages/home.html")}">
          <span>${escapeHtml(f.brandPrefix || "Farm")}</span><span class="shop-footer__brand-dot">${escapeHtml(f.brandSuffix || "art.")}</span>
        </a>
        <p class="shop-footer__phone">${escapeHtml(f.phone || "")}</p>
        ${f.email ? `<p><a href="mailto:${escapeHtml(f.email)}">${escapeHtml(f.email)}</a></p>` : ""}
        <p class="shop-footer__address">${escapeHtml(f.address || "")}</p>
      </div>
      <div class="shop-footer__columns">${(f.columns || []).map(renderColumn).join("")}</div>
      <div class="shop-footer__newsletter">
        <h3 class="shop-footer__column-title">${escapeHtml(f.newsletterTitle || "")}</h3>
        <p class="shop-footer__newsletter-text">${escapeHtml(f.newsletterText || "")}</p>
        <form class="shop-footer__form" action="#" method="post" data-action="newsletter-form">
          <label class="u-hidden" for="shop-newsletter-email">Email</label>
          <input id="shop-newsletter-email" type="email" name="email" placeholder="${escapeHtml(f.newsletterPlaceholder || "Email")}" maxlength="120" required />
          <button type="submit" class="shop-footer__subscribe">${escapeHtml(f.newsletterButton || "Subscribe")}</button>
        </form>
      </div>
    </div>
    <div class="shop-footer__cats l-section shop-header__container">${categoryLinks}</div>
    <div class="shop-footer__bottom l-section shop-header__container">
      <p class="shop-footer__copyright">${escapeHtml(f.copyright || "")}</p>
      <div class="shop-footer__payments">${payments}</div>
    </div>
  `;
}

export function initShopFooter(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);

  rootEl.querySelector("[data-action='newsletter-form']")?.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
