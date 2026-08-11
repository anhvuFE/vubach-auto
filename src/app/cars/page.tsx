import type { Metadata } from 'next';
import PageBanner from '@/components/common/PageBanner';
import CarsBrowser from '@/components/cars/CarsBrowser';
import type { CarFilters } from '@/types/common';
import type { BodyType, CarStatus, FuelType } from '@/types/car';

export const metadata: Metadata = {
  title: 'Xe đang bán',
  description:
    'Danh sách ô tô đã qua sử dụng đang bán tại Vũ Bách Auto. Lọc theo hãng, giá, năm sản xuất, số km, nhiên liệu và hộp số.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const asString = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

/** Translate URL query params into initial filter state. */
function parseFilters(params: Record<string, string | string[] | undefined>): Partial<CarFilters> {
  const initial: Partial<CarFilters> = {};

  const brand = asString(params.brand);
  if (brand) initial.brand = brand;

  const bodyType = asString(params.bodyType);
  if (bodyType) initial.bodyType = bodyType as BodyType;

  const fuelType = asString(params.fuelType);
  if (fuelType) initial.fuelType = fuelType as FuelType;

  const status = asString(params.status);
  if (status) initial.status = status as CarStatus | 'all';

  const search = asString(params.search);
  if (search) initial.search = search;

  const price = asString(params.price);
  if (price) {
    const [min, max] = price.split('-').map(Number);
    if (!Number.isNaN(min) && !Number.isNaN(max)) initial.priceRange = [min, max];
  }

  return initial;
}

export default async function CarsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const initial = parseFilters(params);
  const isSold = initial.status === 'sold';

  return (
    <>
      <PageBanner
        title={isSold ? 'Xe đã bán' : 'Xe đang bán'}
        description={
          isSold
            ? 'Những chiếc xe đã được Vũ Bách Auto bàn giao thành công tới khách hàng.'
            : 'Khám phá kho xe đã qua sử dụng chất lượng, đã kiểm định kỹ lưỡng và sẵn sàng bàn giao.'
        }
        crumbs={[{ label: isSold ? 'Xe đã bán' : 'Xe đang bán' }]}
      />

      <section className="section bg-gray-50">
        <div className="container-page">
          <CarsBrowser initial={initial} />
        </div>
      </section>
    </>
  );
}
