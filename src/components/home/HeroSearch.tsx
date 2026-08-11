'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { BRANDS, BODY_TYPES, PRICE_RANGES } from '@/constants/filters';

const selectProps = {
  allowClear: true,
  size: 'large' as const,
  className: 'w-full',
  popupMatchSelectWidth: false,
};

/** Quick-search bar on the hero that pushes selections to the /cars page. */
export default function HeroSearch() {
  const router = useRouter();
  const [brand, setBrand] = useState<string>();
  const [bodyType, setBodyType] = useState<string>();
  const [price, setPrice] = useState<string>();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (bodyType) params.set('bodyType', bodyType);
    if (price) params.set('price', price);
    router.push(`/cars${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white p-3 shadow-2xl sm:p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
        <Select
          {...selectProps}
          placeholder="Hãng xe"
          value={brand}
          onChange={setBrand}
          options={BRANDS.map((b) => ({ label: b, value: b }))}
        />
        <Select
          {...selectProps}
          placeholder="Kiểu dáng"
          value={bodyType}
          onChange={setBodyType}
          options={BODY_TYPES.map((b) => ({ label: b.label, value: b.value }))}
        />
        <Select
          {...selectProps}
          placeholder="Khoảng giá"
          value={price}
          onChange={setPrice}
          options={PRICE_RANGES}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-base font-bold text-white shadow-md transition-all hover:bg-brand-dark md:px-8"
        >
          <SearchOutlined /> Tìm xe
        </button>
      </div>
    </div>
  );
}
