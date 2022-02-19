
export const currencyLocale = (value = 0): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "DOP" }).format(
    value
  )

