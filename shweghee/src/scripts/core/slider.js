import { on, debounce } from "./events.js";
import { resolvePageHref } from "./paths.js";

function safeUrl(href) {
  if (!href || href === "#") {
    return "#";
  }
  if (href.startsWith("/pages/")) {
    return resolvePageHref(href);
  }
  if (href.startsWith("#") || href.startsWith("/")) {
    return href;
  }
  if (/^(tel:|mailto:)/i.test(href)) {
    return href;
  }
  try {
    const url = new URL(href, window.location.origin);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return href;
    }
  } catch {
    return "#";
  }
  return "#";
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LOCAL_ASSET_PREFIX = "../assets/";

function isSafeLocalAsset(url) {
  const normalized = String(url).trim();
  if (!normalized.startsWith(LOCAL_ASSET_PREFIX)) {
    return false;
  }
  const rest = normalized.slice(LOCAL_ASSET_PREFIX.length);
  if (rest.includes("..") || rest.startsWith("/")) {
    return false;
  }
  if (/['"()\\]/.test(normalized)) {
    return false;
  }
  return /^[a-zA-Z0-9_\-./]+$/.test(normalized);
}

function safeImageSrc(url) {
  if (!url) {
    return "";
  }

  if (isSafeLocalAsset(url)) {
    return escapeHtml(url.trim());
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== "images.unsplash.com") {
      return "";
    }

    const href = parsed.href;
    if (/['"()\\]/.test(href)) {
      return "";
    }

    return escapeHtml(href);
  } catch {
    return "";
  }
}

export { safeUrl, safeImageSrc };

/**
 * @param {HTMLElement} rootEl
 * @param {object} options
 */
export function bindCarousel(rootEl, options = {}) {
  const {
    slideSelector = "[data-carousel-slide]",
    controlPrev = "[data-action='carousel-prev']",
    controlNext = "[data-action='carousel-next']",
    dotSelector = "[data-action='carousel-go']",
    activeSlideClass = "is-active",
    activeDotClass = "is-active",
    autoplayMs = 6000,
    hideControlsIfSingle = true
  } = options;

  const slides = Array.from(rootEl.querySelectorAll(slideSelector));
  const dots = Array.from(rootEl.querySelectorAll(dotSelector));
  const prevBtn = rootEl.querySelector(controlPrev);
  const nextBtn = rootEl.querySelector(controlNext);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!slides.length) {
    return { destroy: () => {} };
  }

  if (hideControlsIfSingle && slides.length < 2) {
    [prevBtn, nextBtn, ...dots].forEach((el) => el?.classList.add("u-hidden"));
    slides[0]?.classList.add(activeSlideClass);
    return { destroy: () => {} };
  }

  let index = 0;
  let timerId = 0;

  const go = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle(activeSlideClass, i === index);
      slide.setAttribute("aria-hidden", i === index ? "false" : "true");
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle(activeDotClass, i === index);
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
    });
    rootEl.dataset.activeIndex = String(index);
  };

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const stop = () => window.clearInterval(timerId);

  const start = () => {
    stop();
    if (reducedMotion || autoplayMs <= 0) {
      return;
    }
    timerId = window.setInterval(next, autoplayMs);
  };

  on(rootEl, "click", controlNext, () => {
    stop();
    next();
    start();
  });

  on(rootEl, "click", controlPrev, () => {
    stop();
    prev();
    start();
  });

  on(rootEl, "click", dotSelector, (_e, dot) => {
    stop();
    go(Number(dot.dataset.slideIndex));
    start();
  });

  const onVisibility = () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  };

  document.addEventListener("visibilitychange", onVisibility);
  rootEl.addEventListener("mouseenter", stop);
  rootEl.addEventListener("mouseleave", start);

  go(0);
  start();

  return {
    destroy: () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    }
  };
}

export function imageOnError(img) {
  img.addEventListener("error", () => {
    img.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='14'%3EImage%3C/text%3E%3C/svg%3E";
    img.removeAttribute("srcset");
  });
}
