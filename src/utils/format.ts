export function formatNumber(value: number) {
  const num = Number(value);
  if (Number.isNaN(num)) {
    return 0;
  }
  return Number(num.toFixed(2));
}
