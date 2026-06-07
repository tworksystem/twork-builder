import { loadBlogData } from "./core/data.js";
import { getSafeId } from "./core/query.js";
import { initHeader } from "../components/header/header.js";
import { initBreadcrumb } from "../components/breadcrumb/breadcrumb.js";
import { initPageHero } from "../components/page-hero/page-hero.js";
import { initBlogList } from "../components/blog-list/blog-list.js";
import { initBlogArticle } from "../components/blog-article/blog-article.js";
import { initNewsletter } from "../components/newsletter/newsletter.js";
import { initFooter } from "../components/footer/footer.js";
import { initBackToTop } from "../components/back-to-top/back-to-top.js";

const componentRegistry = {
  header: initHeader,
  breadcrumb: initBreadcrumb,
  "page-hero": initPageHero,
  "blog-list": initBlogList,
  "blog-article": initBlogArticle,
  newsletter: initNewsletter,
  footer: initFooter
};

async function bootstrap() {
  const blogData = await loadBlogData();
  const isSingle = document.querySelector("[data-page='blog-single']");
  const postId = getSafeId("id");
  const posts = blogData.blogListing?.blog?.posts || [];

  let pageData;

  if (isSingle) {
    const article = posts.find((p) => p.id === postId);
    const relatedPosts = posts.filter((p) => p.id !== postId).slice(0, 3);

    pageData = {
      header: blogData.header,
      footer: blogData.footer,
      newsletter: blogData.newsletter,
      breadcrumb: {
        items: [
          { id: "home", label: "Home", href: "/pages/home.html" },
          { id: "blog", label: "Blog", href: "/pages/blog.html" },
          { id: "post", label: article?.title || "Post", href: "#" }
        ]
      },
      article,
      relatedPosts: relatedPosts.map((p) => ({
        id: p.id,
        title: p.title,
        date: p.date,
        href: p.href
      }))
    };

    if (article) {
      injectBlogPostingSchema(article);
      document.title = `${article.title} | Shwe Myanmar Blog`;
    } else {
      document.title = "Post Not Found | Shwe Myanmar Blog";
      setMetaRobots("noindex, nofollow");
    }
  } else {
    pageData = {
      header: blogData.header,
      footer: blogData.footer,
      newsletter: blogData.newsletter,
      pageHero: blogData.blogListing?.pageHero,
      breadcrumb: blogData.blogListing?.breadcrumb,
      blog: blogData.blogListing?.blog
    };
  }

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

function injectBlogPostingSchema(article) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    author: { "@type": "Organization", name: article.author },
    datePublished: article.dateIso,
    description: article.excerpt,
    image: article.imageUrl,
    publisher: {
      "@type": "Organization",
      name: "Shwe Myanmar Foodstuff Industry"
    }
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", bootstrap);
