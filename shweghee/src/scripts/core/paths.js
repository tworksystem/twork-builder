const PAGES_MARKER = "/pages/";

/**
 * Detects the URL prefix for HTML pages based on the current document path.
 * Works with Live Server (project root → /src/pages/) and python -m http.server from src/ (→ /pages/).
 */
export function getPagesPrefix() {
  const path = window.location.pathname;
  const idx = path.indexOf(PAGES_MARKER);
  if (idx >= 0) {
    return path.slice(0, idx + PAGES_MARKER.length - 1);
  }
  if (path.includes("/src/")) {
    return "/src/pages";
  }
  return "/pages";
}

/**
 * Rewrites canonical /pages/foo.html links to match the active server root.
 */
export function resolvePageHref(href) {
  if (!href || typeof href !== "string") {
    return href || "#";
  }

  const hashIdx = href.indexOf("#");
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
  const beforeHash = hashIdx >= 0 ? href.slice(0, hashIdx) : href;

  if (!beforeHash.startsWith("/pages/")) {
    return href;
  }

  const rest = beforeHash.slice("/pages/".length);
  return `${getPagesPrefix()}/${rest}${hash}`;
}
