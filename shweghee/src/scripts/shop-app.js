import { loadShopData } from "./core/data.js";
import { initShopHeader } from "../components/shop-header/shop-header.js";
import { initBreadcrumb } from "../components/breadcrumb/breadcrumb.js";
import { initShopHero } from "../components/shop-hero/shop-hero.js";
import { initShopSidebar } from "../components/shop-sidebar/shop-sidebar.js";
import { initFeaturedCategories } from "../components/featured-categories/featured-categories.js";
import { initDailyOffers } from "../components/daily-offers/daily-offers.js";
import { initBestSellers } from "../components/best-sellers/best-sellers.js";
import { initShopToolbar } from "../components/shop-toolbar/shop-toolbar.js";
import { initProductGrid } from "../components/product-grid/product-grid.js";
import { initShopFooter } from "../components/shop-footer/shop-footer.js";
import { initBackToTop } from "../components/back-to-top/back-to-top.js";

const componentRegistry = {
  "shop-header": initShopHeader,
  breadcrumb: initBreadcrumb,
  "shop-hero": initShopHero,
  "shop-sidebar": initShopSidebar,
  "featured-categories": initFeaturedCategories,
  "daily-offers": initDailyOffers,
  "best-sellers": initBestSellers,
  "shop-toolbar": initShopToolbar,
  "product-grid": initProductGrid,
  "shop-footer": initShopFooter
};

async function bootstrap() {
  const shopData = await loadShopData();
  const toolbarEl = document.querySelector('[data-component="shop-toolbar"]');

  document.querySelectorAll("[data-component]").forEach((rootEl) => {
    const name = rootEl.dataset.component;
    const initializer = componentRegistry[name];

    if (!initializer) {
      console.warn(`[farmart] No initializer for component: ${name}`);
      return;
    }

    if (name === "product-grid") {
      initializer(rootEl, shopData, { toolbarEl });
      return;
    }

    initializer(rootEl, shopData);
  });

  initBackToTop();
  injectItemListSchema(shopData);
}

function injectItemListSchema(data) {
  const products = data.products || [];
  if (!products.length) {
    return;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: String(product.title || ""),
      url: product.href?.startsWith("http") ? product.href : `https://example.com${product.href || ""}`
    }))
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", bootstrap);
