const SAFE_ID_PATTERN = /^[a-z0-9_-]+$/i;

export function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}

export function getSafeId(name) {
  const value = getQueryParam(name).trim();
  return SAFE_ID_PATTERN.test(value) ? value : "";
}
