// Method for currency formatter (1st param passed is undefined as it will default to the user's locale such as English,
// 2nd param passed is the options object):
export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "usd",
  style: "currency",
  // code below removes trailing zeros
  minimumFractionDigits: 0,
});
