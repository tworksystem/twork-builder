import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { on } from "../../scripts/core/events.js";

function buildTemplate(data) {
  const n = data.newsletter || {};
  return `
    <div class="newsletter__banner">
      <div class="newsletter__inner l-section">
        <div class="newsletter__cta">
          <span class="newsletter__icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </span>
          <p class="newsletter__title" data-field="title">${escapeHtml(n.title || "")}</p>
        </div>
        <form class="newsletter__form" data-action="newsletter-submit" novalidate>
          <label class="u-hidden" for="newsletter-email">Email</label>
          <input type="text" name="${escapeHtml(n.honeypotName || "website")}" class="newsletter__hp u-hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <input
            id="newsletter-email"
            class="newsletter__input"
            type="email"
            name="email"
            placeholder="${escapeHtml(n.placeholder || "Your email address")}"
            required
          />
          <button class="newsletter__button btn btn--dark" type="submit">${escapeHtml(n.buttonLabel || "SUBSCRIBE")}</button>
        </form>
        <p class="newsletter__feedback u-hidden" data-field="feedback" role="status" aria-live="polite"></p>
      </div>
    </div>
  `;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function initNewsletter(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);

  on(rootEl, "submit", "[data-action='newsletter-submit']", (event) => {
    event.preventDefault();
    const form = event.target;
    const honeypot = form.querySelector(".newsletter__hp");
    if (honeypot?.value) {
      return;
    }

    const input = form.querySelector("[name='email']");
    const feedback = rootEl.querySelector("[data-field='feedback']");
    const submitBtn = form.querySelector("[type='submit']");

    if (!input || !feedback) {
      return;
    }

    feedback.classList.remove("u-hidden");

    if (!isValidEmail(input.value.trim())) {
      feedback.textContent = "ကျေးဇူးပြု၍ မှန်ကန်သော email ထည့်ပါ။";
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
    }

    feedback.textContent = "Demo: စာရင်းသွင်းမှု မှတ်တမ်းတင်မည်မဟုတ်ပါ (backend မချိတ်ရသေးပါ)။";
    form.reset();

    window.setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
      }
    }, 2000);
  });
}
