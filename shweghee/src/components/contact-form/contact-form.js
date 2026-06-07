import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { on } from "../../scripts/core/events.js";

const INFO_ICONS = {
  phone:
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  pin: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock:
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
};

function renderInfoCard(card) {
  const lines = (card.lines || []).map((line) => `<span>${escapeHtml(line)}</span>`).join("");
  const icon = INFO_ICONS[card.icon] || INFO_ICONS.phone;
  return `
    <div class="contact-form__info-card" data-item-id="${escapeHtml(card.id)}">
      <span class="contact-form__info-icon" aria-hidden="true">${icon}</span>
      <div>
        <p class="contact-form__info-label">${escapeHtml(card.label)}</p>
        <div class="contact-form__info-lines">${lines}</div>
      </div>
    </div>
  `;
}

function renderSubjectOptions(subjects) {
  return (subjects || [])
    .map((s) => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.label)}</option>`)
    .join("");
}

function buildTemplate(data) {
  const c = data.contact || {};
  return `
    <div class="contact-form__inner l-section">
      <div class="contact-form__info" data-list="infoCards">
        ${(c.infoCards || []).map(renderInfoCard).join("")}
      </div>
      <div class="contact-form__panel">
        <h2 class="contact-form__heading">${escapeHtml(c.formTitle || "Send us a message")}</h2>
        <p class="contact-form__desc">${escapeHtml(c.formDesc || "")}</p>
        <form class="contact-form__form" data-action="contact-submit" novalidate>
          <input type="text" name="${escapeHtml(c.honeypotName || "company")}" class="contact-form__hp u-hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="contact-form__row">
            <div class="contact-form__field">
              <label for="contact-name">Name <span aria-hidden="true">*</span></label>
              <input id="contact-name" type="text" name="name" required maxlength="100" autocomplete="name" />
            </div>
            <div class="contact-form__field">
              <label for="contact-phone">Phone <span aria-hidden="true">*</span></label>
              <input id="contact-phone" type="tel" name="phone" required maxlength="20" pattern="[0-9+\\-\\s]+" autocomplete="tel" placeholder="09xxxxxxxxx" />
            </div>
          </div>
          <div class="contact-form__field">
            <label for="contact-email">Email</label>
            <input id="contact-email" type="email" name="email" maxlength="120" autocomplete="email" />
          </div>
          <div class="contact-form__field">
            <label for="contact-subject">Subject <span aria-hidden="true">*</span></label>
            <select id="contact-subject" name="subject" required>
              ${renderSubjectOptions(c.subjects)}
            </select>
          </div>
          <div class="contact-form__field">
            <label for="contact-message">Message <span aria-hidden="true">*</span></label>
            <textarea id="contact-message" name="message" required maxlength="2000" rows="5"></textarea>
          </div>
          <button class="btn btn--primary contact-form__submit" type="submit">${escapeHtml(c.submitLabel || "SEND MESSAGE")}</button>
          <p class="contact-form__feedback u-hidden" data-field="feedback" role="status" aria-live="polite"></p>
        </form>
        <noscript>
          <p class="contact-form__noscript">JavaScript မရှိပါက ဖုန်းဖြင့် ဆက်သွယ်ပါ — <a href="tel:095255122">095-2-55122</a></p>
        </noscript>
      </div>
    </div>
  `;
}

let lastSubmit = 0;

export function initContactForm(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);

  on(rootEl, "submit", "[data-action='contact-submit']", (event) => {
    event.preventDefault();
    const form = event.target;
    const honeypot = form.querySelector(".contact-form__hp");
    if (honeypot?.value) {
      return;
    }

    const now = Date.now();
    if (now - lastSubmit < 30000) {
      return;
    }

    const feedback = rootEl.querySelector("[data-field='feedback']");
    const submitBtn = form.querySelector("[type='submit']");
    const name = form.querySelector("[name='name']")?.value.trim();
    const phone = form.querySelector("[name='phone']")?.value.trim();
    const message = form.querySelector("[name='message']")?.value.trim();

    if (!feedback) {
      return;
    }

    feedback.classList.remove("u-hidden");

    if (!name || !phone || !message) {
      feedback.textContent = "ကျေးဇူးပြု၍ လိုအပ်သော အကွက်များ ဖြည့်ပါ။";
      return;
    }

    lastSubmit = now;
    if (submitBtn) {
      submitBtn.disabled = true;
    }

    feedback.textContent = "Demo: သင့်မက်ဆေ့ချ် မှတ်တမ်းတင်မည်မဟုတ်ပါ (backend မချိတ်ရသေးပါ)။ ဖုန်းဖြင့် ဆက်သွယ်ပါ — 095-2-55122";
    form.reset();

    window.setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
      }
    }, 30000);
  });
}
