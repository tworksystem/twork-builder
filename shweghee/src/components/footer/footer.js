import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";
import { debounce } from "../../scripts/core/events.js";

const INFO_ICONS = {
  phone:
    '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  pin: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock:
    '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
};

function renderInfoCard(card) {
  const lines = (card.lines || []).map((line) => `<span>${escapeHtml(line)}</span>`).join("");
  const icon = INFO_ICONS[card.icon] || INFO_ICONS.phone;
  return `
    <div class="footer__info-card" data-item-id="${escapeHtml(card.id)}">
      <div class="footer__info-text">
        <p class="footer__info-label">${escapeHtml(card.label)}</p>
        <div class="footer__info-lines">${lines}</div>
      </div>
      <span class="footer__info-icon" aria-hidden="true">${icon}</span>
    </div>
  `;
}

function renderSocialLink(item) {
  const href = (item.href || "").trim();
  const label = escapeHtml(item.label || "");
  const initial = (item.label || "?").charAt(0);

  if (!href || href === "#") {
    return `<span class="footer__social-link footer__social-link--disabled" aria-label="${label} (coming soon)" title="Coming soon">${initial}</span>`;
  }

  return `<a class="footer__social-link" href="${safeUrl(href)}" aria-label="${label}" rel="noopener noreferrer" target="_blank">${initial}</a>`;
}

function renderColumn(column) {
  const links = (column.links || [])
    .map((link) => `<a class="footer__link" href="${safeUrl(link.href)}" data-item-id="${escapeHtml(link.id)}">${escapeHtml(link.label)}</a>`)
    .join("");

  return `
    <div class="footer__column" data-item-id="${escapeHtml(column.id)}">
      <h3 class="footer__column-title">${escapeHtml(column.title)}</h3>
      <nav class="footer__links">${links}</nav>
    </div>
  `;
}

function buildTemplate(data) {
  const f = data.footer || {};
  const pastureSrc = safeImageSrc(f.pastureImageUrl);
  const pastureImg = pastureSrc
    ? `<img src="${pastureSrc}" alt="${escapeHtml(f.pastureImageAlt || "")}" width="1600" height="400" loading="lazy" decoding="async" />`
    : "";
  const social = (f.social || []).map(renderSocialLink).join("");

  const copyrightHtml = (f.copyright || "").replace(
    "Farmart",
    '<span class="footer__brand-highlight">Farmart</span>'
  );

  return `
    <div class="footer__top l-section">
      <div class="footer__info-grid" data-list="infoCards">
        ${(f.infoCards || []).map(renderInfoCard).join("")}
      </div>
    </div>
    <div class="footer__main l-section">
      <div class="footer__brand-col">
        <a class="footer__brand" href="${safeUrl("/pages/home.html")}">
          <span>${escapeHtml(f.brandPrefix || "Farm")}</span><span class="footer__brand-suffix">${escapeHtml(f.brandSuffix || "art.")}</span>
        </a>
        <p class="footer__desc">${escapeHtml(f.description || "")}</p>
        <div class="footer__social">${social}</div>
      </div>
      <div class="footer__columns">
        ${(f.columns || []).map(renderColumn).join("")}
      </div>
    </div>
    <div class="footer__bottom l-section">
      <p class="footer__copyright">${copyrightHtml}</p>
    </div>
    <div class="footer__pasture">
      ${pastureImg}
    </div>
  `;
}

function bindBackToTop() {
  let btn = document.querySelector("[data-action='back-to-top']");
  if (!btn) {
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "back-to-top";
    btn.dataset.action = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = "↑";
    document.body.appendChild(btn);
  }

  const onScroll = debounce(() => {
    btn.classList.toggle("is-visible", window.scrollY > 400);
  }, 100);

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

export function initFooter(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);
  const pastureImg = rootEl.querySelector(".footer__pasture img");
  if (pastureImg) {
    imageOnError(pastureImg);
  }
  bindBackToTop();
}
