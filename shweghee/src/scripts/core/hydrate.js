export function setField(rootEl, fieldName, value) {
  if (value == null || value === "") {
    return;
  }
  const nodes = rootEl.querySelectorAll(`[data-field="${fieldName}"]`);
  nodes.forEach((node) => {
    if (node.tagName === "IMG") {
      node.src = String(value);
      return;
    }
    if (node.tagName === "A" && fieldName.toLowerCase().includes("label")) {
      node.textContent = String(value);
      return;
    }
    node.textContent = String(value);
  });
}

export function setAttr(rootEl, fieldName, attr, value) {
  if (value == null) {
    return;
  }
  rootEl.querySelectorAll(`[data-field="${fieldName}"]`).forEach((node) => {
    node.setAttribute(attr, String(value));
  });
}
