import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function buildTemplate(data) {
  const a = data.appPromo || {};
  const imageSrc = safeImageSrc(a.imageUrl);
  const features = (a.features || [])
    .map((f) => `<li class="app-promo__feature"><span class="app-promo__check" aria-hidden="true">✓</span>${f}</li>`)
    .join("");
  const visual = imageSrc
    ? `<img src="${imageSrc}" alt="${escapeHtml(a.imageAlt || "Shwe Myanmar products")}" width="560" height="480" loading="lazy" decoding="async" />`
    : "";

  return `
    <div class="app-promo__inner l-section">
      <div class="app-promo__grid">
        <div class="app-promo__visual">
          ${visual}
        </div>
        <div class="app-promo__content">
          <p class="section-head__eyebrow">${a.eyebrow || ""}</p>
          <h2 class="section-head__title app-promo__title">${a.title || ""}</h2>
          <ul class="app-promo__features">${features}</ul>
          <div class="app-promo__stores">
            <a class="app-promo__store btn btn--dark" href="${safeUrl(a.appStoreHref)}">${a.appStoreLabel || "Call Mandalay Office"}</a>
            <a class="app-promo__store btn btn--dark" href="${safeUrl(a.playStoreHref)}">${a.playStoreLabel || "Call Mobile Line"}</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initAppPromo(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  const img = rootEl.querySelector("img");
  if (img) {
    imageOnError(img);
  }
}
