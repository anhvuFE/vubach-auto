import type { CarStatus } from '@/types/car';

const MAP: Record<CarStatus, { label: string; className: string }> = {
  available: { label: 'Đang bán', className: 'bg-emerald-500' },
  reserved: { label: 'Đã cọc', className: 'bg-amber-500' },
  sold: { label: 'Đã bán', className: 'bg-gray-600' },
};

export default function StatusBadge({
  status,
  className = '',
}: {
  status: CarStatus;
  className?: string;
}) {
  const { label, className: color } = MAP[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm ${color} ${className}`}
    >
      {label}
    </span>
  );
}
