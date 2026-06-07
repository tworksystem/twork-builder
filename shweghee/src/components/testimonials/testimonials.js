import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc } from "../../scripts/core/slider.js";
import { on } from "../../scripts/core/events.js";

function renderCard(item) {
  const avatarSrc = safeImageSrc(item.avatarUrl);
  const avatar = avatarSrc
    ? `<img class="testimonials__avatar" src="${avatarSrc}" alt="${escapeHtml(item.avatarAlt || "")}" width="48" height="48" loading="lazy" decoding="async" />`
    : "";

  return `
    <article class="testimonials__card" data-item-id="${item.id}">
      <span class="testimonials__quote" aria-hidden="true">"</span>
      <blockquote class="testimonials__text">${item.text}</blockquote>
      <footer class="testimonials__footer">
        ${avatar}
        <div>
          <cite class="testimonials__name">${item.name}</cite>
          <p class="testimonials__location">${item.location}</p>
        </div>
      </footer>
    </article>
  `;
}

function buildTemplate(data) {
  const t = data.testimonials || {};
  const items = t.items || [];

  return `
    <div class="testimonials__inner l-section">
      <header class="section-head section-head--row">
        <div>
          <p class="section-head__eyebrow">${t.eyebrow || ""}</p>
          <h2 class="section-head__title">${t.title || ""}</h2>
        </div>
        <div class="carousel-dots testimonials__dots" data-testimonials-dots></div>
      </header>
      <div class="testimonials__stage">
        <button type="button" class="carousel-nav__btn" data-action="testimonials-prev" aria-label="Previous">‹</button>
        <div class="testimonials__track" data-testimonials-track tabindex="0">
          ${items.map(renderCard).join("")}
        </div>
        <button type="button" class="carousel-nav__btn" data-action="testimonials-next" aria-label="Next">›</button>
      </div>
    </div>
  `;
}

function bindTestimonialsScroll(rootEl) {
  const track = rootEl.querySelector("[data-testimonials-track]");
  if (!track) {
    return;
  }

  const scrollStep = () => {
    const card = track.querySelector(".testimonials__card");
    return card ? card.offsetWidth + 24 : 320;
  };

  on(rootEl, "click", "[data-action='testimonials-next']", () => {
    track.scrollBy({ left: scrollStep(), behavior: "smooth" });
  });

  on(rootEl, "click", "[data-action='testimonials-prev']", () => {
    track.scrollBy({ left: -scrollStep(), behavior: "smooth" });
  });
}

export function initTestimonials(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);
  rootEl.querySelectorAll("img").forEach(imageOnError);

  const items = data.testimonials?.items || [];
  const dotsEl = rootEl.querySelector("[data-testimonials-dots]");
  if (dotsEl && items.length) {
    dotsEl.innerHTML = items
      .map(
        (_, i) =>
          `<button type="button" class="carousel-dots__dot${i === 0 ? " is-active" : ""}" aria-label="Slide ${i + 1}"></button>`
      )
      .join("");
  }

  bindTestimonialsScroll(rootEl);
}
