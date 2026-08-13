/** Convert Vietnamese text to a URL-friendly slug. */
export const slugify = (input: string): string =>
  input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritics
    .replace(/[đĐ]/g, 'd') // đ / Đ -> d
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

/** Build a stable, unique-ish slug for a car from its identity fields. */
export const buildCarSlug = (params: {
  brand: string;
  model: string;
  year: number;
  id: string;
}): string => slugify(`${params.brand} ${params.model} ${params.year} ${params.id}`);
