import { loadShopData } from "./core/data.js";
import { getSafeId } from "./core/query.js";
import { initShopHeader } from "../components/shop-header/shop-header.js";
import { initBreadcrumb } from "../components/breadcrumb/breadcrumb.js";
import { initProductDetail, enrichProduct } from "../components/product-detail/product-detail.js";
import { initShopFooter } from "../components/shop-footer/shop-footer.js";
import { initBackToTop } from "../components/back-to-top/back-to-top.js";

const componentRegistry = {
  "shop-header": initShopHeader,
  breadcrumb: initBreadcrumb,
  "product-detail": initProductDetail,
  "shop-footer": initShopFooter
};

async function bootstrap() {
  const shopData = await loadShopData();
  const productId = getSafeId("id");
  const products = shopData.products || [];
  const rawProduct = products.find((p) => p.id === productId);
  const product = rawProduct ? enrichProduct({ ...rawProduct, href: `/pages/product.html?id=${rawProduct.id}` }) : null;

  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 4)
    .map((p) => enrichProduct({ ...p, href: `/pages/product.html?id=${p.id}` }));

  const pageData = {
    header: shopData.header,
    footer: shopData.footer,
    breadcrumb: {
      items: [
        { id: "home", label: "Home", href: "/pages/home.html" },
        { id: "shop", label: "Shop", href: "/pages/shop.html" },
        { id: "product", label: product?.title || "Product", href: "#" }
      ]
    },
    product,
    relatedProducts
  };

  document.querySelectorAll("[data-component]").forEach((rootEl) => {
    const name = rootEl.dataset.component;
    const initializer = componentRegistry[name];

    if (!initializer) {
      console.warn(`[farmart] No initializer for component: ${name}`);
      return;
    }

    initializer(rootEl, pageData);
  });

  initBackToTop();

  if (product) {
    injectProductSchema(product);
    document.title = `${product.title} | Shwe Myanmar Shop`;
  } else {
    document.title = "Product Not Found | Shwe Myanmar Shop";
    setMetaRobots("noindex, nofollow");
  }
}

function setMetaRobots(content) {
  let meta = document.querySelector('meta[name="robots"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "robots";
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function injectProductSchema(product) {
  const price = product.salePrice ?? product.price ?? 0;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    brand: { "@type": "Brand", name: "Shwe Myanmar" },
    offers: {
      "@type": "Offer",
      priceCurrency: "MMK",
      price: price,
      availability: product.inStock !== false
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock"
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 0
        }
      : undefined
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", bootstrap);
