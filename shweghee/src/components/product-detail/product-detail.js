import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { on } from "../../scripts/core/events.js";
import { formatCurrency } from "../../scripts/core/format.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";
import { renderStars, renderProductCard, bindProductImages } from "../product-card/product-card.js";

function renderPrice(product) {
  if (product.priceRange) {
    const [min, max] = product.priceRange;
    return `<p class="product-detail__price product-detail__price--range">${formatCurrency(min)} – ${formatCurrency(max)}</p>`;
  }
  if (product.salePrice != null && product.price != null) {
    return `
      <p class="product-detail__price">
        <span class="product-detail__price--sale">${formatCurrency(product.salePrice)}</span>
        <span class="product-detail__price--was">${formatCurrency(product.price)}</span>
      </p>
    `;
  }
  const amount = product.price ?? product.salePrice ?? 0;
  return `<p class="product-detail__price">${formatCurrency(amount)}</p>`;
}

function renderTabPanel(tab) {
  const items = tab.items
    ? `<ul class="product-detail__tab-list">${tab.items.map((li) => `<li>${escapeHtml(li)}</li>`).join("")}</ul>`
    : "";
  const paragraphs = (tab.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  return `${paragraphs}${items}`;
}

function buildNotFound() {
  return `
    <div class="product-detail__inner l-section">
      <div class="product-detail__not-found">
        <h1>Product Not Found</h1>
        <p>ဤထုတ်ကုန်ကို ရှာမတွေ့ပါ။</p>
        <a class="btn btn--primary" href="${safeUrl("/pages/shop.html")}">Back to Shop</a>
      </div>
    </div>
  `;
}

function buildTemplate(product, related = []) {
  const imageSrc = safeImageSrc(product.image);
  const image = imageSrc
    ? `<img class="product-detail__image" src="${imageSrc}" alt="${escapeHtml(product.imageAlt || product.title)}" width="500" height="500" loading="eager" decoding="async" />`
    : "";

  const inStock = product.inStock !== false;
  const badge = product.badge?.text
    ? `<span class="product-detail__badge">${escapeHtml(product.badge.text)}</span>`
    : "";

  const tabs = (product.tabs || []).map((tab, i) => {
    const active = i === 0 ? " is-active" : "";
    const hidden = i === 0 ? "" : " hidden";
    return `
      <div class="product-detail__tab-panel${active}" data-tab-panel="${escapeHtml(tab.id)}"${hidden}>
        ${renderTabPanel(tab)}
      </div>
    `;
  }).join("");

  const tabButtons = (product.tabs || []).map((tab, i) => {
    const active = i === 0 ? " is-active" : "";
    return `<button type="button" class="product-detail__tab-btn${active}" data-action="tab-switch" data-tab="${escapeHtml(tab.id)}" aria-selected="${i === 0 ? "true" : "false"}">${escapeHtml(tab.label)}</button>`;
  }).join("");

  const relatedHtml = related.map((p) => renderProductCard(p, { variant: "compact" })).join("");

  return `
    <div class="product-detail__inner l-section">
      <div class="product-detail__grid">
        <div class="product-detail__gallery">
          ${badge}
          ${image}
        </div>
        <div class="product-detail__info">
          ${product.category ? `<p class="product-detail__category">${escapeHtml(product.category)}</p>` : ""}
          <h1 class="product-detail__title">${escapeHtml(product.title)}</h1>
          ${renderStars(product.rating, product.reviewCount)}
          ${renderPrice(product)}
          ${product.sku ? `<p class="product-detail__sku">SKU: ${escapeHtml(product.sku)}</p>` : ""}
          <p class="product-detail__desc">${escapeHtml(product.description || "")}</p>
          <p class="product-detail__stock ${inStock ? "product-detail__stock--in" : "product-detail__stock--out"}">
            ${inStock ? "In Stock" : "Out of Stock"}
          </p>
          <div class="product-detail__actions">
            <button class="btn btn--primary product-detail__cart-btn" type="button" data-action="add-to-cart" ${inStock ? "" : "disabled"}>
              ${inStock ? "ADD TO CART" : "OUT OF STOCK"}
            </button>
            <a class="btn btn--outline" href="tel:095255122">CALL TO ORDER</a>
          </div>
          <p class="product-detail__cart-feedback u-hidden" data-field="cart-feedback" role="status" aria-live="polite"></p>
        </div>
      </div>

      ${product.tabs?.length ? `
        <div class="product-detail__tabs">
          <div class="product-detail__tab-nav" role="tablist">${tabButtons}</div>
          <div class="product-detail__tab-content">${tabs}</div>
        </div>
      ` : ""}

      ${related.length ? `
        <aside class="product-detail__related">
          <h2 class="product-detail__related-title">Related Products</h2>
          <div class="product-detail__related-grid">${relatedHtml}</div>
        </aside>
      ` : ""}
    </div>
  `;
}

export function initProductDetail(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  const product = data.product;
  if (!product) {
    rootEl.innerHTML = buildNotFound();
    return;
  }

  rootEl.innerHTML = buildTemplate(product, data.relatedProducts || []);
  const img = rootEl.querySelector(".product-detail__image");
  if (img) {
    imageOnError(img);
  }
  bindProductImages(rootEl);

  on(rootEl, "click", "[data-action='tab-switch']", (_event, btn) => {
    const tabId = btn.dataset.tab;
    rootEl.querySelectorAll("[data-action='tab-switch']").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });
    rootEl.querySelectorAll("[data-tab-panel]").forEach((panel) => {
      const show = panel.dataset.tabPanel === tabId;
      panel.classList.toggle("is-active", show);
      panel.hidden = !show;
    });
  });

  on(rootEl, "click", "[data-action='add-to-cart']", (_event, btn) => {
    if (btn.disabled) {
      return;
    }
    btn.disabled = true;
    const feedback = rootEl.querySelector("[data-field='cart-feedback']");
    if (feedback) {
      feedback.classList.remove("u-hidden");
      feedback.textContent = "Demo: Cart feature မရရှိသေးပါ။ ဖုန်းဖြင့် အော်ဒါတင်ပါ — 095-2-55122";
    }
    window.setTimeout(() => {
      btn.disabled = false;
    }, 3000);
  });
}

export function enrichProduct(product) {
  const defaults = {
    description: "Premium Shwe Myanmar product crafted in Mandalay, Myanmar. Natural scent, natural taste (သဘာဝ အနံ့ သဘာဝ အရသာ).",
    inStock: true,
    sku: product.id?.toUpperCase(),
    category: product.title?.includes("Ghee") ? "Ghee" : "Butter",
    tabs: [
      {
        id: "description",
        label: "Description",
        paragraphs: [
          product.description || "Shwe Myanmar Foodstuff Industry delivers consistent quality from our Mandalay production facility.",
          "Suitable for home cooking, restaurants, and commercial kitchens across Myanmar."
        ]
      },
      {
        id: "storage",
        label: "Storage",
        items: [
          "Store in a cool, dry place away from direct sunlight.",
          "Refrigerate after opening.",
          "Use within the period printed on packaging."
        ]
      },
      {
        id: "orders",
        label: "Ordering",
        paragraphs: [
          "Call 095-2-55122, 095-2-55123, or 095-9-200 1227 to place orders.",
          "Wholesale and bulk orders available — visit our Wholesale page for details."
        ]
      }
    ]
  };

  return { ...defaults, ...product, href: product.href || `/pages/product.html?id=${product.id}` };
}
