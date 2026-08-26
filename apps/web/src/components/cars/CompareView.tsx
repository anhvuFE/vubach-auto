'use client';

import Link from 'next/link';
import { CloseOutlined, SwapOutlined } from '@ant-design/icons';
import CarImage from '@/components/common/CarImage';
import EmptyState from '@/components/common/EmptyState';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCompareCars } from '@/store/selectors';
import { removeFromCompare } from '@/store/slices/compareSlice';
import { carDisplayName, type Car } from '@/types/car';
import { formatMileage, formatPrice } from '@/utils/format';

/** One comparison row: a label and how to read the value off a car. */
const ROWS: { label: string; get: (car: Car) => string }[] = [
  { label: 'Giá bán', get: (c) => formatPrice(c.price) },
  { label: 'Hãng xe', get: (c) => c.brand },
  { label: 'Dòng xe', get: (c) => c.model },
  { label: 'Năm sản xuất', get: (c) => String(c.year) },
  { label: 'Số km đã đi', get: (c) => formatMileage(c.mileage) },
  { label: 'Hộp số', get: (c) => c.transmission },
  { label: 'Nhiên liệu', get: (c) => c.fuelType },
  { label: 'Kiểu dáng', get: (c) => c.bodyType },
  { label: 'Số chỗ ngồi', get: (c) => `${c.seats} chỗ` },
  { label: 'Màu sắc', get: (c) => c.color },
  { label: 'Xuất xứ', get: (c) => c.origin },
  { label: 'Tình trạng', get: (c) => c.condition },
];

export default function CompareView() {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCompareCars);

  if (cars.length === 0) {
    return (
      <EmptyState
        icon={<SwapOutlined />}
        title="Chưa có xe để so sánh"
        description="Nhấn biểu tượng so sánh trên mỗi xe để thêm vào đây (tối đa 3 xe)."
        action={
          <Link
            href="/cars"
            className="rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Khám phá xe đang bán
          </Link>
        }
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="w-32 bg-white p-3 text-left align-bottom text-sm font-semibold text-gray-400 sm:w-40">
              {cars.length} xe đang so sánh
            </th>
            {cars.map((car) => (
              <th key={car.id} className="p-3 align-top">
                <div className="relative">
                  <button
                    type="button"
                    aria-label={`Bỏ ${carDisplayName(car)} khỏi so sánh`}
                    onClick={() => dispatch(removeFromCompare(car.id))}
                    className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/80 text-xs text-white transition-colors hover:bg-brand"
                  >
                    <CloseOutlined />
                  </button>
                  <Link href={`/cars/${car.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                      <CarImage
                        src={car.mainImage}
                        alt={carDisplayName(car)}
                        fill
                        sizes="(max-width: 768px) 50vw, 240px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 line-clamp-1 text-center font-display text-sm font-bold text-charcoal group-hover:text-brand">
                      {carDisplayName(car)}
                    </p>
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => {
            // Highlight rows where the cars actually differ.
            const values = cars.map(row.get);
            const allSame = values.every((v) => v === values[0]);
            return (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-3 text-sm text-gray-500">{row.label}</td>
                {cars.map((car, j) => (
                  <td
                    key={car.id}
                    className={`p-3 text-center text-sm font-semibold ${
                      allSame ? 'text-charcoal' : 'text-brand'
                    }`}
                  >
                    {values[j]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
