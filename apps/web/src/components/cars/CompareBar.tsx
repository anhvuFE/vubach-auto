'use client';

import Link from 'next/link';
import { CloseOutlined, SwapOutlined } from '@ant-design/icons';
import CarImage from '@/components/common/CarImage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCompareCars } from '@/store/selectors';
import { removeFromCompare, clearCompare, MAX_COMPARE } from '@/store/slices/compareSlice';
import { carDisplayName } from '@/types/car';

/**
 * Floating tray listing the cars queued for comparison. Rendered globally and
 * only visible once at least one car is selected. Sits bottom-center so it
 * clears the bottom-right floating contact actions.
 */
export default function CompareBar() {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCompareCars);

  if (cars.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[800] px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-gray-100 bg-white/95 p-3 shadow-card-hover backdrop-blur sm:pr-4">
        <div className="flex flex-1 items-center gap-2 overflow-x-auto">
          {cars.map((car) => (
            <div
              key={car.id}
              className="relative shrink-0"
              title={carDisplayName(car)}
            >
              <div className="relative h-14 w-20 overflow-hidden rounded-lg">
                <CarImage
                  src={car.mainImage}
                  alt={carDisplayName(car)}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                aria-label={`Bỏ ${carDisplayName(car)} khỏi so sánh`}
                onClick={() => dispatch(removeFromCompare(car.id))}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] text-white shadow transition-colors hover:bg-brand"
              >
                <CloseOutlined />
              </button>
            </div>
          ))}
          {/* Placeholder slots hint at remaining capacity. */}
          {Array.from({ length: MAX_COMPARE - cars.length }).map((_, i) => (
            <div
              key={i}
              className="hidden h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-gray-200 text-xs text-gray-300 sm:flex"
            >
              + xe
            </div>
          ))}
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-1.5">
          <Link
            href="/compare"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            <SwapOutlined /> So sánh ({cars.length})
          </Link>
          <button
            type="button"
            onClick={() => dispatch(clearCompare())}
            className="text-xs text-gray-400 transition-colors hover:text-brand"
          >
            Xoá tất cả
          </button>
        </div>
      </div>
    </div>
  );
}
