export const isString = (x) => typeof x === "string" && x.length > 0;

export const firstToUpper = (x) =>
  isString(x) ? `${x[0].toUpperCase()}${x.slice(1, x.length)}` : "String";

export const allToUpper = (x) =>
  isString(x) ? x.split("-").map(firstToUpper).join(" ") : "String";
