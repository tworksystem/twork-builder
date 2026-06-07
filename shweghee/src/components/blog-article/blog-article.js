import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function renderParagraph(p) {
  return `<p class="blog-article__para">${escapeHtml(p)}</p>`;
}

function renderRelated(post) {
  return `
    <a class="blog-article__related-card" href="${safeUrl(post.href)}" data-item-id="${escapeHtml(post.id)}">
      <h3>${escapeHtml(post.title)}</h3>
      <span>${escapeHtml(post.date)}</span>
    </a>
  `;
}

function buildNotFound() {
  return `
    <div class="blog-article__inner l-section">
      <div class="blog-article__not-found">
        <h1>Post Not Found</h1>
        <p>ဤဆောင်းပါးကို ရှာမတွေ့ပါ။</p>
        <a class="btn btn--primary" href="${safeUrl("/pages/blog.html")}">Back to Blog</a>
      </div>
    </div>
  `;
}

function buildTemplate(article, related = []) {
  const imageSrc = safeImageSrc(article.imageUrl);
  const image = imageSrc
    ? `<img class="blog-article__image" src="${imageSrc}" alt="${escapeHtml(article.imageAlt || "")}" width="800" height="450" loading="eager" decoding="async" />`
    : "";

  return `
    <article class="blog-article__inner l-section">
      <header class="blog-article__header">
        <p class="blog-article__meta">
          By <span>${escapeHtml(article.author)}</span>
          in <strong>${escapeHtml(article.category)}</strong>
          on <time datetime="${escapeHtml(article.dateIso || "")}">${escapeHtml(article.date)}</time>
        </p>
        <h1 class="blog-article__title">${escapeHtml(article.title)}</h1>
      </header>
      ${image}
      <div class="blog-article__body">
        ${(article.content || []).map(renderParagraph).join("")}
      </div>
      ${related.length ? `
        <aside class="blog-article__related">
          <h2 class="blog-article__related-title">Related Posts</h2>
          <div class="blog-article__related-grid">${related.map(renderRelated).join("")}</div>
        </aside>
      ` : ""}
    </article>
  `;
}

export function initBlogArticle(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }

  const article = data.article;
  if (!article) {
    rootEl.innerHTML = buildNotFound();
    return;
  }

  rootEl.innerHTML = buildTemplate(article, data.relatedPosts || []);
  const img = rootEl.querySelector(".blog-article__image");
  if (img) {
    imageOnError(img);
  }
}
