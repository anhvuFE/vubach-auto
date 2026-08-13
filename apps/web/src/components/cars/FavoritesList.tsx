'use client';

import Link from 'next/link';
import { HeartOutlined } from '@ant-design/icons';
import CarGrid from './CarGrid';
import EmptyState from '@/components/common/EmptyState';
import { useAppSelector } from '@/store/hooks';
import { selectFavoriteCars } from '@/store/selectors';

export default function FavoritesList() {
  const cars = useAppSelector(selectFavoriteCars);

  if (cars.length === 0) {
    return (
      <EmptyState
        icon={<HeartOutlined />}
        title="Chưa có xe yêu thích"
        description="Nhấn vào biểu tượng trái tim trên mỗi xe để lưu lại những mẫu bạn quan tâm."
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
    <div>
      <p className="mb-6 text-sm text-gray-500">
        Bạn đang lưu <span className="font-bold text-charcoal">{cars.length}</span> xe yêu thích.
      </p>
      <CarGrid cars={cars} />
    </div>
  );
}
