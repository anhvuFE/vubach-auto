'use client';

import { useState } from 'react';
import { Image as AntImage } from 'antd';
import { ExpandOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import CarImage from '@/components/common/CarImage';
import StatusBadge from '@/components/common/StatusBadge';
import FavoriteButton from '@/components/common/FavoriteButton';
import type { Car } from '@/types/car';
import { carDisplayName } from '@/types/car';

export default function CarGallery({ car }: { car: Car }) {
  const images = car.images.length > 0 ? car.images : [car.mainImage];
  const [active, setActive] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const go = (dir: number) => setActive((i) => (i + dir + images.length) % images.length);

  return (
    <div>
      {/* Main image */}
      <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-charcoal shadow-card">
        <CarImage
          key={active}
          src={images[active]}
          alt={`${carDisplayName(car)} - ảnh ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="animate-fade-in object-cover"
        />

        <div className="absolute left-4 top-4 flex gap-2">
          <StatusBadge status={car.status} />
          <span className="inline-flex items-center rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {car.condition}
          </span>
        </div>
        <FavoriteButton carId={car.id} className="absolute right-4 top-4 h-10 w-10" />

        <button
          type="button"
          aria-label="Xem toàn màn hình"
          onClick={() => setPreviewOpen(true)}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-md transition-transform hover:scale-110"
        >
          <ExpandOutlined />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal opacity-0 shadow-md transition-opacity hover:bg-white group-hover:opacity-100"
            >
              <LeftOutlined />
            </button>
            <button
              type="button"
              aria-label="Ảnh sau"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal opacity-0 shadow-md transition-opacity hover:bg-white group-hover:opacity-100"
            >
              <RightOutlined />
            </button>
            <span className="absolute bottom-4 left-4 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-semibold text-white">
              {active + 1}/{images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="scrollbar-thin mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-[16/10] h-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                active === i ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <CarImage
                src={src}
                alt={`Ảnh thu nhỏ ${i + 1}`}
                fill
                sizes="128px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Hidden fullscreen preview group (controlled) */}
      <div className="hidden">
        <AntImage.PreviewGroup
          items={images}
          preview={{
            visible: previewOpen,
            current: active,
            onVisibleChange: (v) => setPreviewOpen(v),
            onChange: (current) => setActive(current),
          }}
        />
      </div>
    </div>
  );
}
