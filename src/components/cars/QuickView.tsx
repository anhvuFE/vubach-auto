'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Modal } from 'antd';
import {
  EyeOutlined,
  CalendarOutlined,
  DashboardOutlined,
  SettingOutlined,
  DeploymentUnitOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import CarImage from '@/components/common/CarImage';
import StatusBadge from '@/components/common/StatusBadge';
import FavoriteButton from '@/components/common/FavoriteButton';
import { SITE } from '@/constants/site';
import { carDisplayName, type Car } from '@/types/car';
import { formatMileage, formatPrice } from '@/utils/format';

/** "Xem nhanh" overlay button + modal preview shown from a car card. */
export default function QuickView({ car }: { car: Car }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const images = car.images.length > 0 ? car.images : [car.mainImage];

  const specs = [
    { icon: <CalendarOutlined />, label: 'Năm SX', value: String(car.year) },
    { icon: <DashboardOutlined />, label: 'Số km', value: formatMileage(car.mileage) },
    { icon: <SettingOutlined />, label: 'Hộp số', value: car.transmission },
    { icon: <DeploymentUnitOutlined />, label: 'Nhiên liệu', value: car.fuelType },
    { icon: <TeamOutlined />, label: 'Số chỗ', value: `${car.seats} chỗ` },
    { icon: <EnvironmentOutlined />, label: 'Xuất xứ', value: car.origin },
  ];

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(0);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-label="Xem nhanh"
        className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-charcoal shadow-md transition-transform hover:scale-105"
      >
        <EyeOutlined /> Xem nhanh
      </button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={860}
        centered
        styles={{ body: { padding: 0 } }}
        classNames={{ content: 'overflow-hidden !p-0' }}
      >
        <div className="grid gap-0 md:grid-cols-2">
          {/* Gallery */}
          <div className="bg-charcoal p-4">
            <div className="relative aspect-[16/11] overflow-hidden rounded-xl">
              <CarImage
                key={active}
                src={images[active]}
                alt={carDisplayName(car)}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="animate-fade-in object-cover"
              />
              <StatusBadge status={car.status} className="absolute left-3 top-3" />
              <FavoriteButton carId={car.id} className="absolute bottom-3 right-3" />
            </div>
            {images.length > 1 && (
              <div className="scrollbar-thin mt-3 flex gap-2 overflow-x-auto">
                {images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative aspect-[16/11] h-14 shrink-0 overflow-hidden rounded-md border-2 ${
                      active === i ? 'border-brand' : 'border-transparent opacity-60'
                    }`}
                  >
                    <CarImage src={src} alt={`Ảnh ${i + 1}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col p-5 pr-10 sm:p-6 sm:pr-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                {car.brand} · {car.bodyType}
              </p>
              <h3 className="mt-1 font-display text-xl font-extrabold text-charcoal">
                {carDisplayName(car)} {car.year}
              </h3>
            </div>

            <p className="mt-2 font-display text-2xl font-extrabold text-brand">
              {formatPrice(car.price)}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-brand">{spec.icon}</span>
                  <span className="line-clamp-1">{spec.value}</span>
                </div>
              ))}
            </div>

            {car.features.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {car.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-charcoal">
                    <CheckCircleFilled className="mt-0.5 text-brand" />
                    <span className="line-clamp-1">{f}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto flex flex-col gap-2.5 pt-5">
              <Link
                href={`/cars/${car.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg bg-brand py-3 text-center text-sm font-bold text-white transition-colors hover:bg-brand-dark"
              >
                Xem chi tiết
              </Link>
              <a
                href={`tel:${car.contactPhone ?? SITE.hotline}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-charcoal/15 py-3 text-sm font-bold text-charcoal transition-colors hover:border-brand hover:text-brand"
              >
                <PhoneOutlined /> Gọi ngay
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
