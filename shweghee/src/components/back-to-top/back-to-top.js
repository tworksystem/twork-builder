import { debounce } from "../../scripts/core/events.js";

export function initBackToTop() {
  let btn = document.querySelector("[data-component='back-to-top']");
  if (!btn) {
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "back-to-top";
    btn.dataset.component = "back-to-top";
    btn.dataset.block = "farmart/back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = "↑";
    document.body.appendChild(btn);
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onScroll = debounce(() => {
    btn.classList.toggle("is-visible", window.scrollY > 400);
  }, 100);

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}
