export function guardInit(rootEl, key = "initialized") {
  if (rootEl.dataset[key] === "true") {
    return false;
  }
  rootEl.dataset[key] = "true";
  return true;
}
