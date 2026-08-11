/**
 * schema.org (JSON-LD) builders for structured data / rich results.
 *
 * Kept in one place so the same business identity (`#organization`) can be
 * referenced by every page — the AutoDealer node, WebSite node, and the
 * `seller` on each Vehicle offer all point at one stable @id.
 */
import type { Car } from '@/types/car';
import { carDisplayName } from '@/types/car';
import { SITE } from '@/constants/site';

const base = SITE.url.replace(/\/$/, '');

/** Stable @id for the business, referenced across all schema nodes. */
export const ORG_ID = `${base}/#organization`;
const WEBSITE_ID = `${base}/#website`;

/** Split "8:00 – 19:00 (T2 – CN)" style hours into a schema-friendly string. */
const OPENING_HOURS = 'Mo-Su 08:00-19:00';

/** AutoDealer / LocalBusiness node describing the showroom. */
export function autoDealerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    '@id': ORG_ID,
    name: SITE.name,
    description: SITE.description,
    url: `${base}/`,
    telephone: SITE.hotline,
    email: SITE.email,
    image: `${base}/opengraph-image`,
    logo: `${base}/favicon.svg`,
    priceRange: 'đđđ',
    slogan: SITE.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: 'Hải Phòng',
      addressCountry: 'VN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:00',
      closes: '19:00',
    },
    openingHours: OPENING_HOURS,
    areaServed: { '@type': 'Country', name: 'Việt Nam' },
    sameAs: [SITE.facebook].filter(Boolean),
  };
}

/** WebSite node — establishes the canonical site identity for search engines. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${base}/`,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'vi-VN',
    publisher: { '@id': ORG_ID },
  };
}

const AVAILABILITY: Record<Car['status'], string> = {
  available: 'https://schema.org/InStock',
  reserved: 'https://schema.org/LimitedAvailability',
  sold: 'https://schema.org/SoldOut',
};

/** Vehicle (schema.org/Car) node with an Offer, for car detail pages. */
export function vehicleSchema(car: Car) {
  const name = `${carDisplayName(car)} ${car.year}`;
  const url = `${base}/cars/${car.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name,
    description: car.description,
    url,
    image: car.images?.length ? car.images : [car.mainImage],
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    productionDate: String(car.year),
    color: car.color,
    vehicleTransmission: car.transmission,
    fuelType: car.fuelType,
    bodyType: car.bodyType,
    vehicleSeatingCapacity: car.seats,
    vehicleInteriorType: car.condition,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.mileage,
      unitCode: 'KMT',
    },
    itemCondition: 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'VND',
      availability: AVAILABILITY[car.status],
      itemCondition: 'https://schema.org/UsedCondition',
      url,
      seller: { '@id': ORG_ID },
    },
  };
}

/** BreadcrumbList node from an ordered list of {name, path} crumbs. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${base}${crumb.path}`,
    })),
  };
}
