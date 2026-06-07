import { loadPagesData, mergePageData } from "./core/data.js";
import { initHeader } from "../components/header/header.js";
import { initBreadcrumb } from "../components/breadcrumb/breadcrumb.js";
import { initPageHero } from "../components/page-hero/page-hero.js";
import { initAboutStory } from "../components/about-story/about-story.js";
import { initContactForm } from "../components/contact-form/contact-form.js";
import { initLegalContent } from "../components/legal-content/legal-content.js";
import { initWholesaleSection } from "../components/wholesale-section/wholesale-section.js";
import { initQualitySection } from "../components/quality-section/quality-section.js";
import { initCareersSection } from "../components/careers-section/careers-section.js";
import { initWhereToBuySection } from "../components/where-to-buy-section/where-to-buy-section.js";
import { initFaq } from "../components/faq/faq.js";
import { initNewsletter } from "../components/newsletter/newsletter.js";
import { initFooter } from "../components/footer/footer.js";
import { initPageNotFound } from "../components/page-not-found/page-not-found.js";
import { initBackToTop } from "../components/back-to-top/back-to-top.js";

const componentRegistry = {
  header: initHeader,
  breadcrumb: initBreadcrumb,
  "page-hero": initPageHero,
  "about-story": initAboutStory,
  "contact-form": initContactForm,
  "legal-content": initLegalContent,
  "wholesale-section": initWholesaleSection,
  "quality-section": initQualitySection,
  "careers-section": initCareersSection,
  "where-to-buy-section": initWhereToBuySection,
  faq: initFaq,
  newsletter: initNewsletter,
  footer: initFooter,
  "page-not-found": initPageNotFound
};

async function bootstrap() {
  const pagesData = await loadPagesData();
  const mainEl = document.querySelector("[data-page]");
  const pageKey = mainEl?.dataset.page || "about";
  const pageData = mergePageData(pagesData, pageKey);

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

  if (pageKey === "faq") {
    injectFaqSchema(pageData);
  }
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
