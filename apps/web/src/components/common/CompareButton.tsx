'use client';

import { App } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCompare, MAX_COMPARE } from '@/store/slices/compareSlice';

interface CompareButtonProps {
  carId: string;
  className?: string;
}

/** Toggle a car into the comparison tray (max {@link MAX_COMPARE}). */
export default function CompareButton({ carId, className = '' }: CompareButtonProps) {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.compare.ids);
  const isSelected = ids.includes(carId);
  const isFull = ids.length >= MAX_COMPARE;

  return (
    <button
      type="button"
      aria-label={isSelected ? 'Bỏ khỏi so sánh' : 'Thêm vào so sánh'}
      aria-pressed={isSelected}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isSelected && isFull) {
          message.warning(`Chỉ so sánh tối đa ${MAX_COMPARE} xe cùng lúc.`);
          return;
        }
        dispatch(toggleCompare(carId));
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-base shadow-md backdrop-blur transition-all hover:scale-110 ${
        isSelected ? 'text-brand' : 'text-charcoal'
      } ${className}`}
    >
      <SwapOutlined />
    </button>
  );
}
