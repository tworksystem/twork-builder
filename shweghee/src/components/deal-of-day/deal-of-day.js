import { guardInit } from "../../scripts/core/init-guard.js";
import { formatCurrency } from "../../scripts/core/format.js";

function formatCountdown(ms) {
  if (ms <= 0) {
    return "Deal ended";
  }
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function buildTemplate(data) {
  const deal = data.dealOfDay || {};
  const product = deal.product || {};
  const priceBlock =
    product.salePrice != null
      ? `<span class="deal-of-day__sale" data-field="salePrice">${formatCurrency(product.salePrice)}</span>
         <span class="deal-of-day__price" data-field="price">${formatCurrency(product.price)}</span>`
      : `<span class="deal-of-day__sale" data-field="price">${formatCurrency(product.price)}</span>`;

  return `
    <div class="deal-of-day__inner l-section">
      <div class="deal-of-day__head">
        <h2 class="deal-of-day__title" data-field="title">${deal.title || "Deal of the Day"}</h2>
        <p class="deal-of-day__timer" data-field="countdown" aria-live="polite">--:--:--</p>
      </div>
      <article class="deal-of-day__product" data-item-id="${product.id || "deal"}">
        <img
          class="deal-of-day__image"
          src="${product.imageUrl || ""}"
          alt="${product.imageAlt || product.name || ""}"
          width="320"
          height="320"
          loading="lazy"
        />
        <div class="deal-of-day__body">
          <h3 class="deal-of-day__name" data-field="name">${product.name || ""}</h3>
          <div class="deal-of-day__prices">${priceBlock}</div>
          <a class="btn deal-of-day__cta" href="#">Buy now</a>
        </div>
      </article>
    </div>
  `;
}

function bindCountdown(rootEl, endsAt) {
  const timerEl = rootEl.querySelector("[data-field='countdown']");
  if (!timerEl || !endsAt) {
    return;
  }

  const endTime = new Date(endsAt).getTime();
  let timerId = 0;

  const tick = () => {
    const remaining = endTime - Date.now();
    timerEl.textContent = formatCountdown(remaining);
    if (remaining <= 0) {
      window.clearInterval(timerId);
    }
  };

  tick();
  timerId = window.setInterval(tick, 1000);
}

export function initDealOfDay(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  rootEl.innerHTML = buildTemplate(data);
  bindCountdown(rootEl, data.dealOfDay?.endsAt);
}
