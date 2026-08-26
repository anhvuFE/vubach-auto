import { SafetyCertificateOutlined } from '@ant-design/icons';

interface InspectionBadgeProps {
  points?: number;
  className?: string;
}

/**
 * "Đã kiểm định" trust pill, optionally showing the number of inspection points.
 * Render only for cars that passed inspection.
 */
export default function InspectionBadge({ points, className = '' }: InspectionBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-emerald-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur ${className}`}
    >
      <SafetyCertificateOutlined />
      {points ? `Đã kiểm định ${points} điểm` : 'Đã kiểm định'}
    </span>
  );
}
