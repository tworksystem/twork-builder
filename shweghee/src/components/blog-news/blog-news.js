import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function renderPost(post) {
  const imageSrc = safeImageSrc(post.imageUrl);
  const media = imageSrc
    ? `<img src="${imageSrc}" alt="${escapeHtml(post.imageAlt || "")}" width="380" height="240" loading="lazy" decoding="async" />`
    : "";

  return `
    <article class="blog-news__card" data-item-id="${post.id}">
      <a class="blog-news__media" href="${safeUrl(post.href)}">
        ${media}
      </a>
      <p class="blog-news__meta">
        By <span class="blog-news__author">${post.author}</span>
        in <strong>${post.category}</strong>
        on <time datetime="${post.dateIso || ""}">${post.date}</time>
      </p>
      <h3 class="blog-news__title"><a href="${safeUrl(post.href)}">${post.title}</a></h3>
      <p class="blog-news__excerpt">${post.excerpt}</p>
    </article>
  `;
}

function buildTemplate(data) {
  const b = data.blog || {};
  return `
    <div class="blog-news__inner l-section">
      <header class="section-head">
        <p class="section-head__eyebrow">${b.eyebrow || ""}</p>
        <h2 class="section-head__title">${b.title || ""}</h2>
      </header>
      <div class="blog-news__grid" data-list="posts">
        ${(b.posts || []).map(renderPost).join("")}
      </div>
      <div class="carousel-nav">
        <div class="carousel-dots">
          <button type="button" class="carousel-dots__dot is-active" aria-label="Page 1"></button>
          <button type="button" class="carousel-dots__dot" aria-label="Page 2"></button>
        </div>
      </div>
    </div>
  `;
}

export function initBlogNews(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  rootEl.querySelectorAll("img").forEach(imageOnError);
}
