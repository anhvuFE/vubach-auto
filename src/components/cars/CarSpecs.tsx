import { CheckCircleFilled } from '@ant-design/icons';
import type { Car } from '@/types/car';
import { formatMileage } from '@/utils/format';

export default function CarSpecs({ car }: { car: Car }) {
  const specs: { label: string; value: string }[] = [
    { label: 'Hãng xe', value: car.brand },
    { label: 'Dòng xe', value: car.model },
    { label: 'Năm sản xuất', value: String(car.year) },
    { label: 'Kiểu dáng', value: car.bodyType },
    { label: 'Số km đã đi', value: formatMileage(car.mileage) },
    { label: 'Hộp số', value: car.transmission },
    { label: 'Nhiên liệu', value: car.fuelType },
    { label: 'Số chỗ ngồi', value: `${car.seats} chỗ` },
    { label: 'Màu sắc', value: car.color },
    { label: 'Xuất xứ', value: car.origin },
    { label: 'Tình trạng', value: car.condition },
  ];

  return (
    <div className="space-y-8">
      {/* Description */}
      <section>
        <h2 className="font-display text-2xl font-bold text-charcoal">Mô tả chi tiết</h2>
        <p className="mt-3 leading-relaxed text-gray-600">{car.description}</p>
      </section>

      {/* Specifications */}
      <section>
        <h2 className="font-display text-2xl font-bold text-charcoal">Thông số kỹ thuật</h2>
        <dl className="mt-4 grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-100 sm:grid-cols-2">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <dt className="text-sm text-gray-500">{spec.label}</dt>
              <dd className="text-right text-sm font-semibold text-charcoal">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Features */}
      {car.features.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold text-charcoal">Trang bị & Tiện nghi</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {car.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-charcoal">
                <CheckCircleFilled className="mt-0.5 text-brand" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
