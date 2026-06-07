export function formatCurrency(value, currency = "MMK", locale = "my-MM") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(value);
}
