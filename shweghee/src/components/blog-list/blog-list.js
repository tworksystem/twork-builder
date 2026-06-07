import { guardInit } from "../../scripts/core/init-guard.js";
import { escapeHtml } from "../../scripts/core/escape.js";
import { imageOnError, safeImageSrc, safeUrl } from "../../scripts/core/slider.js";

function renderPost(post) {
  const imageSrc = safeImageSrc(post.imageUrl);
  const media = imageSrc
    ? `<img src="${imageSrc}" alt="${escapeHtml(post.imageAlt || "")}" width="380" height="240" loading="lazy" decoding="async" />`
    : "";

  return `
    <article class="blog-list__card" data-item-id="${escapeHtml(post.id)}">
      <a class="blog-list__media" href="${safeUrl(post.href)}">
        ${media}
      </a>
      <p class="blog-list__meta">
        By <span class="blog-list__author">${escapeHtml(post.author)}</span>
        in <strong>${escapeHtml(post.category)}</strong>
        on <time datetime="${escapeHtml(post.dateIso || "")}">${escapeHtml(post.date)}</time>
      </p>
      <h2 class="blog-list__title"><a href="${safeUrl(post.href)}">${escapeHtml(post.title)}</a></h2>
      <p class="blog-list__excerpt">${escapeHtml(post.excerpt)}</p>
      <a class="blog-list__read-more" href="${safeUrl(post.href)}">Read more →</a>
    </article>
  `;
}

function buildTemplate(data) {
  const b = data.blog || {};
  const posts = b.posts || [];
  return `
    <div class="blog-list__inner l-section">
      <div class="blog-list__grid" data-list="posts">
        ${posts.map(renderPost).join("")}
      </div>
      ${posts.length === 0 ? `<p class="blog-list__empty">No posts available.</p>` : ""}
    </div>
  `;
}

export function initBlogList(rootEl, data = {}) {
  if (!guardInit(rootEl)) {
    return;
  }
  rootEl.innerHTML = buildTemplate(data);
  rootEl.querySelectorAll(".blog-list__media img").forEach(imageOnError);
}
