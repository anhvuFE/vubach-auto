/** Formatting helpers for Vietnamese locale display. */

/** Full VND with thousands separators, e.g. "1.450.000.000 ₫". */
export const formatPrice = (value: number): string =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })
    .format(value)
    .replace('₫', 'đ')
    .trim();

/**
 * Compact price for cards/badges, e.g. 1450000000 -> "1 tỷ 450 triệu",
 * 559000000 -> "559 triệu".
 */
export const formatPriceShort = (value: number): string => {
  const billion = Math.floor(value / 1_000_000_000);
  const million = Math.round((value % 1_000_000_000) / 1_000_000);

  if (billion > 0) {
    return million > 0 ? `${billion} tỷ ${million}` : `${billion} tỷ`;
  }
  return `${million} triệu`;
};

/** Mileage with thousands separator + unit, e.g. 15000 -> "15.000 km". */
export const formatMileage = (value: number): string =>
  `${new Intl.NumberFormat('vi-VN').format(value)} km`;

/** Generic number with vi-VN grouping. */
export const formatNumber = (value: number): string =>
  new Intl.NumberFormat('vi-VN').format(value);

/** Format an ISO date string to dd/MM/yyyy. */
export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('vi-VN').format(date);
};
