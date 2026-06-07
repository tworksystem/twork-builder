export function qs(root, selector) {
  return root.querySelector(selector);
}

export function qsa(root, selector) {
  return Array.from(root.querySelectorAll(selector));
}

export function getRequiredNode(root, selector) {
  const node = qs(root, selector);
  if (!node) {
    throw new Error(`Missing required selector: ${selector}`);
  }
  return node;
}
