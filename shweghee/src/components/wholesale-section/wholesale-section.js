import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { on } from "../../scripts/core/events.js";
import { imageOnError, safeImageSrc } from "../../scripts/core/slider.js";
import { renderProductCard, bindProductImages } from "../product-card/product-card.js";

function renderBenefit(item) {
  return `
    <div class="wholesale-section__benefit" data-item-id="${escapeHtml(item.id)}">
      <span class="wholesale-section__benefit-icon" aria-hidden="true">✓</span>
      <div>
        <h3 class="wholesale-section__benefit-title">${escapeHtml(item.title)}</h3>
        <p class="wholesale-section__benefit-text">${escapeHtml(item.text)}</p>
      </div>
    </div>
  `;
}

function buildTemplate(data) {
  const w = data.wholesale || {};
  const imageSrc = safeImageSrc(w.imageUrl);
  const image = imageSrc
    ? `<img class="wholesale-section__image" src="${imageSrc}" alt="${escapeHtml(w.imageAlt || "")}" width="480" height="360" loading="lazy" decoding="async" />`
    : "";

  const products = (w.featuredProducts || []).map((p) => renderProductCard(p, { variant: "compact" })).join("");

  return `
    <div class="wholesale-section__inner l-section">
      <div class="wholesale-section__hero-grid">
        <div>
          <header class="section-head section-head--row">
            <div>
              <p class="section-head__eyebrow">${escapeHtml(w.eyebrow || "")}</p>
              <h2 class="section-head__title">${escapeHtml(w.title || "")}</h2>
            </div>
          </header>
          <p class="wholesale-section__intro">${escapeHtml(w.intro || "")}</p>
          <div class="wholesale-section__benefits" data-list="benefits">
            ${(w.benefits || []).map(renderBenefit).join("")}
          </div>
        </div>
        <div class="wholesale-section__media">${image}</div>
      </div>

      <div class="wholesale-section__products">
        <h2 class="wholesale-section__products-title">${escapeHtml(w.productsTitle || "Bulk Products")}</h2>
        <div class="wholesale-section__products-grid">${products}</div>
      </div>

      <div class="wholesale-section__form-panel">
        <h2 class="wholesale-section__form-title">${escapeHtml(w.formTitle || "Wholesale Inquiry")}</h2>
        <p class="wholesale-section__form-desc">${escapeHtml(w.formDesc || "")}</p>
        <form class="wholesale-section__form" data-action="wholesale-submit" novalidate>
          <input type="text" name="${escapeHtml(w.honeypotName || "url")}" class="wholesale-section__hp u-hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="wholesale-section__row">
            <div class="wholesale-section__field">
              <label for="ws-company">Company Name <span aria-hidden="true">*</span></label>
              <input id="ws-company" type="text" name="company" required maxlength="120" />
            </div>
            <div class="wholesale-section__field">
              <label for="ws-contact">Contact Person <span aria-hidden="true">*</span></label>
              <input id="ws-contact" type="text" name="contact" required maxlength="100" />
            </div>
          </div>
          <div class="wholesale-section__row">
            <div class="wholesale-section__field">
              <label for="ws-phone">Phone <span aria-hidden="true">*</span></label>
              <input id="ws-phone" type="tel" name="phone" required maxlength="20" pattern="[0-9+\\-\\s]+" />
            </div>
            <div class="wholesale-section__field">
              <label for="ws-region">Region <span aria-hidden="true">*</span></label>
              <select id="ws-region" name="region" required>
                ${(w.regions || []).map((r) => `<option value="${escapeHtml(r.id)}">${escapeHtml(r.label)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="wholesale-section__field">
            <label for="ws-volume">Estimated Monthly Volume</label>
            <select id="ws-volume" name="volume">
              ${(w.volumes || []).map((v) => `<option value="${escapeHtml(v.id)}">${escapeHtml(v.label)}</option>`).join("")}
            </select>
          </div>
          <div class="wholesale-section__field">
            <label for="ws-message">Message</label>
            <textarea id="ws-message" name="message" maxlength="2000" rows="4"></textarea>
          </div>
          <button class="btn btn--primary" type="submit">${escapeHtml(w.submitLabel || "SUBMIT INQUIRY")}</button>
          <p class="wholesale-section__feedback u-hidden" data-field="feedback" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  `;
}

let lastWholesaleSubmit = 0;

export function initWholesaleSection(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);
  rootEl.querySelectorAll(".wholesale-section__image").forEach(imageOnError);
  bindProductImages(rootEl);

  on(rootEl, "submit", "[data-action='wholesale-submit']", (event) => {
    event.preventDefault();
    const form = event.target;
    const honeypot = form.querySelector(".wholesale-section__hp");
    if (honeypot?.value) {
      return;
    }

    const now = Date.now();
    if (now - lastWholesaleSubmit < 30000) {
      return;
    }

    const feedback = rootEl.querySelector("[data-field='feedback']");
    const submitBtn = form.querySelector("[type='submit']");

    if (!feedback) {
      return;
    }

    feedback.classList.remove("u-hidden");
    lastWholesaleSubmit = now;

    if (submitBtn) {
      submitBtn.disabled = true;
    }

    feedback.textContent = "Demo: စုံစမ်းမှု မှတ်တမ်းတင်မည်မဟုတ်ပါ။ ဖုန်းဖြင့် ဆက်သွယ်ပါ — 095-2-55122";
    form.reset();

    window.setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
      }
    }, 30000);
  });
}
