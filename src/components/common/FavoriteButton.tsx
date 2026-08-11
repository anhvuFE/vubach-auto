'use client';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/favoriteSlice';

interface FavoriteButtonProps {
  carId: string;
  className?: string;
}

/** Heart toggle backed by the favorite Redux slice (persisted to localStorage). */
export default function FavoriteButton({ carId, className = '' }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((s) => s.favorite.ids.includes(carId));

  return (
    <button
      type="button"
      aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      aria-pressed={isFavorite}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(carId));
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-base shadow-md backdrop-blur transition-all hover:scale-110 ${
        isFavorite ? 'text-brand' : 'text-charcoal'
      } ${className}`}
    >
      {isFavorite ? <HeartFilled /> : <HeartOutlined />}
    </button>
  );
}
