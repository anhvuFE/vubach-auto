import {
  SafetyCertificateFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { Car } from '@/types/car';

/**
 * "Lịch sử & kiểm định" panel — owner count, accident history, registration
 * validity and the inspection result. Renders nothing if the car carries no
 * history data at all, and skips individual rows that are undefined.
 */
export default function CarHistory({ car }: { car: Car }) {
  const hasAny =
    car.ownerCount != null ||
    car.accidentFree != null ||
    car.inspected != null ||
    car.registrationExpiry != null;

  if (!hasAny) return null;

  const rows: { icon: React.ReactNode; label: string; value: React.ReactNode }[] = [];

  if (car.ownerCount != null) {
    rows.push({
      icon: <UserOutlined />,
      label: 'Số đời chủ',
      value: `${car.ownerCount} đời chủ`,
    });
  }
  if (car.accidentFree != null) {
    rows.push({
      icon: car.accidentFree ? (
        <CheckCircleFilled className="text-emerald-600" />
      ) : (
        <CloseCircleFilled className="text-red-500" />
      ),
      label: 'Lịch sử va chạm',
      value: car.accidentFree ? 'Không đâm đụng, ngập nước' : 'Có lịch sử va chạm',
    });
  }
  if (car.registrationExpiry != null) {
    rows.push({
      icon: <CalendarOutlined />,
      label: 'Hạn đăng kiểm',
      value: car.registrationExpiry,
    });
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-charcoal">Lịch sử & kiểm định</h2>

      {car.inspected && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <SafetyCertificateFilled className="mt-0.5 text-xl text-emerald-600" />
          <div>
            <p className="font-bold text-emerald-800">
              {car.inspectionPoints
                ? `Đã kiểm định ${car.inspectionPoints} điểm`
                : 'Đã kiểm định chất lượng'}
            </p>
            <p className="text-sm text-emerald-700">
              Xe được kỹ thuật viên Vũ Bách Auto kiểm tra toàn diện trước khi bàn giao.
            </p>
          </div>
        </div>
      )}

      {rows.length > 0 && (
        <dl className="mt-4 grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-100 sm:grid-cols-2">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <dt className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-brand">{row.icon}</span>
                {row.label}
              </dt>
              <dd className="text-right text-sm font-semibold text-charcoal">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
