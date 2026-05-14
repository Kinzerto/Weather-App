export function toCelsius(f) {
  return Number(((f - 32) / 1.8).toFixed(1));
}

export function toKm(mile) {
  return Number((mile * 1.60934).toFixed(1));
}
