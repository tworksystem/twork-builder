const FALLBACK_DATA = {
  header: {
    brandName: "Shwe Myanmar",
    logoSrc: "../assets/brand/shwe-myanmar-logo.png",
    brandPrefix: "Shwe",
    brandSuffix: "Myanmar",
    hotlineLabel: "CUSTOMER HOTLINE",
    phone: "095-2-55122",
    menuItems: [{ id: "home", label: "Home", href: "#", hasDropdown: false }]
  },
  hero: { slides: [] },
  services: { eyebrow: "", title: "", items: [] },
  whyChoose: { eyebrow: "", title: "", items: [] },
  categories: { eyebrow: "", title: "", items: [], ctaLabel: "See all", ctaHref: "#" },
  partners: { eyebrow: "", title: "", logos: [] },
  blog: { eyebrow: "", title: "", posts: [] },
  testimonials: { eyebrow: "", title: "", items: [] },
  appPromo: { eyebrow: "", title: "", features: [] },
  faq: { eyebrow: "", title: "", items: [] },
  newsletter: { title: "", placeholder: "Email", buttonLabel: "Subscribe" },
  footer: { infoCards: [], columns: [], copyright: "" }
};

export async function loadHomeData() {
  return loadJsonData("../data/home.mock.json", FALLBACK_DATA, "home");
}

const FALLBACK_SHOP_DATA = {
  header: {
    brandName: "Shwe Myanmar",
    logoSrc: "../assets/brand/shwe-myanmar-logo.png",
    brandPrefix: "Shwe",
    brandSuffix: "Myanmar",
    menuItems: []
  },
  breadcrumb: { items: [{ id: "shop", label: "Shop", href: "#" }] },
  hero: { slides: [] },
  sidebar: { categories: [], recommendationSlides: [] },
  featuredCategories: { slides: [] },
  dailyOffers: { slides: [] },
  bestSellers: { slides: [] },
  toolbar: { sortOptions: [], perPageOptions: [20], defaultPerPage: 20, currentPage: 1, totalPages: 1 },
  products: [],
  footer: {
    brandPrefix: "Shwe",
    brandSuffix: "Myanmar",
    phone: "095-2-55122",
    copyright: "© 2026 Shwe Myanmar Foodstuff Industry. All rights reserved."
  }
};

export async function loadShopData() {
  return loadJsonData("../data/shop.mock.json", FALLBACK_SHOP_DATA, "shop");
}

const FALLBACK_PAGES_DATA = {
  header: FALLBACK_DATA.header,
  footer: FALLBACK_DATA.footer,
  newsletter: FALLBACK_DATA.newsletter,
  quality: {
    pageHero: {
      eyebrow: "QUALITY ASSURANCE",
      title: "Quality Standards",
      subtitle: "Premium butter and ghee from Mandalay, Myanmar."
    },
    breadcrumb: {
      items: [
        { id: "home", label: "Home", href: "/pages/home.html" },
        { id: "quality", label: "Quality Standards", href: "/pages/quality.html" }
      ]
    },
    quality: {
      eyebrow: "OUR COMMITMENT",
      title: "Natural Quality, Every Batch",
      paragraphs: [
        "Shwe Myanmar Foodstuff Industry maintains strict quality standards at our Mandalay facility."
      ],
      ctaLabel: "VIEW OUR PRODUCTS",
      ctaHref: "/pages/shop.html",
      processTitle: "Our Quality Control Process",
      steps: [],
      standardsTitle: "Our Quality Standards",
      standards: []
    }
  },
  whereToBuy: {
    pageHero: {
      eyebrow: "FIND US",
      title: "Where to Buy",
      subtitle: "Shwe Myanmar products across Myanmar."
    },
    breadcrumb: {
      items: [
        { id: "home", label: "Home", href: "/pages/home.html" },
        { id: "where", label: "Where to Buy", href: "/pages/where-to-buy.html" }
      ]
    },
    whereToBuy: {
      eyebrow: "NATIONWIDE DISTRIBUTION",
      title: "Serving Customers Across Myanmar",
      paragraphs: ["Contact 095-2-55122 for nearest outlet information."],
      regionsTitle: "Regions We Serve",
      regions: [],
      tipsTitle: "Ways to Get Shwe Myanmar Products",
      tips: [],
      ctaTitle: "Can't Find Shwe Myanmar Near You?",
      ctaText: "Call our Mandalay team for distributor information.",
      ctaPhone: "095-2-55122",
      ctaPhoneLabel: "Call 095-2-55122",
      ctaHref: "/pages/contact.html",
      ctaLabel: "Send an Inquiry"
    }
  },
  faq: {
    pageHero: { title: "FAQ", subtitle: "Common questions about Shwe Myanmar products." },
    breadcrumb: {
      items: [
        { id: "home", label: "Home", href: "/pages/home.html" },
        { id: "faq", label: "FAQ", href: "/pages/faq.html" }
      ]
    },
    faq: { title: "Frequently Asked Questions", items: [] }
  },
  careers: {
    pageHero: {
      eyebrow: "JOIN OUR TEAM",
      title: "Careers at Shwe Myanmar",
      subtitle: "Career opportunities at our Mandalay facility."
    },
    breadcrumb: {
      items: [
        { id: "home", label: "Home", href: "/pages/home.html" },
        { id: "careers", label: "Careers", href: "/pages/careers.html" }
      ]
    },
    careers: {
      eyebrow: "WORK WITH US",
      title: "Grow With Shwe Myanmar",
      paragraphs: ["Contact us for current openings at our Mandalay facility."],
      benefits: [],
      positions: [],
      emptyText: "No open positions at this time. Please contact us.",
      ctaPhone: "095-2-55122",
      ctaPhoneLabel: "Call 095-2-55122",
      ctaHref: "/pages/contact.html",
      ctaLabel: "Send an Inquiry"
    }
  },
  accessibility: {
    pageHero: {
      eyebrow: "INCLUSION",
      title: "Accessibility Statement",
      subtitle: "Our commitment to an inclusive website experience."
    },
    breadcrumb: {
      items: [
        { id: "home", label: "Home", href: "/pages/home.html" },
        { id: "accessibility", label: "Accessibility", href: "/pages/accessibility.html" }
      ]
    },
    legal: {
      lastUpdated: "June 5, 2026",
      sections: [
        {
          id: "commitment",
          title: "Our Commitment",
          open: true,
          paragraphs: ["We are committed to improving website accessibility for all visitors."]
        }
      ]
    }
  },
  notFound: {
    notFound: {
      code: "404",
      title: "Page Not Found",
      text: "ဤစာမျက်နှာကို ရှာမတွေ့ပါ။",
      links: [
        { id: "home", label: "Go Home", href: "/pages/home.html" },
        { id: "shop", label: "Browse Shop", href: "/pages/shop.html" }
      ]
    }
  }
};

export async function loadPagesData() {
  return loadJsonData("../data/pages.mock.json", FALLBACK_PAGES_DATA, "pages");
}

const FALLBACK_BLOG_DATA = {
  header: FALLBACK_DATA.header,
  footer: FALLBACK_DATA.footer,
  newsletter: FALLBACK_DATA.newsletter,
  blogListing: { pageHero: {}, breadcrumb: { items: [] }, blog: { posts: [] } }
};

export async function loadBlogData() {
  return loadJsonData("../data/blog.mock.json", FALLBACK_BLOG_DATA, "blog");
}

export function mergePageData(pagesData, pageKey) {
  const pageSlice = pagesData[pageKey] || {};
  return {
    header: pagesData.header,
    footer: pagesData.footer,
    newsletter: pagesData.newsletter,
    pageHero: pageSlice.pageHero,
    breadcrumb: pageSlice.breadcrumb,
    aboutStory: pageSlice.aboutStory,
    contact: pageSlice.contact,
    legal: pageSlice.legal,
    faq: pageSlice.faq,
    wholesale: pageSlice.wholesale,
    quality: pageSlice.quality,
    whereToBuy: pageSlice.whereToBuy,
    careers: pageSlice.careers,
    notFound: pageSlice.notFound
  };
}

async function loadJsonData(relativePath, fallback, label) {
  try {
    const response = await fetch(new URL(relativePath, import.meta.url));
    if (!response.ok) {
      throw new Error(`Failed to load mock data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[farmart] Using fallback ${label} data.`, error);
    return fallback;
  }
}
