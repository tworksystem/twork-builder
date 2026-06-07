import { loadHomeData } from "./core/data.js";
import { initHeader } from "../components/header/header.js";
import { initHero } from "../components/hero/hero.js";
import { initServicesCarousel } from "../components/services-carousel/services-carousel.js";
import { initWhyChooseUs } from "../components/why-choose-us/why-choose-us.js";
import { initProductCategories } from "../components/product-categories/product-categories.js";
import { initPartners } from "../components/partners/partners.js";
import { initBlogNews } from "../components/blog-news/blog-news.js";
import { initTestimonials } from "../components/testimonials/testimonials.js";
import { initAppPromo } from "../components/app-promo/app-promo.js";
import { initFaq } from "../components/faq/faq.js";
import { initNewsletter } from "../components/newsletter/newsletter.js";
import { initFooter } from "../components/footer/footer.js";

const componentRegistry = {
  header: initHeader,
  hero: initHero,
  "services-carousel": initServicesCarousel,
  "why-choose-us": initWhyChooseUs,
  "product-categories": initProductCategories,
  partners: initPartners,
  "blog-news": initBlogNews,
  testimonials: initTestimonials,
  "app-promo": initAppPromo,
  faq: initFaq,
  newsletter: initNewsletter,
  footer: initFooter
};

async function bootstrap() {
  const homeData = await loadHomeData();
  const roots = document.querySelectorAll("[data-component]");

  roots.forEach((rootEl) => {
    const name = rootEl.dataset.component;
    const initializer = componentRegistry[name];

    if (!initializer) {
      console.warn(`[farmart] No initializer for component: ${name}`);
      return;
    }

    initializer(rootEl, homeData);
  });

  injectFaqSchema(homeData);
}

function injectFaqSchema(data) {
  const items = data.faq?.items;
  if (!items?.length) {
    return;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", bootstrap);
