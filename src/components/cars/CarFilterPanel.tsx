'use client';

import { Button, Segmented, Select, Slider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setBrand,
  setBodyType,
  setFuelType,
  setTransmission,
  setStatus,
  setPriceRange,
  setYearRange,
  setMaxMileage,
  resetFilters,
} from '@/store/slices/filterSlice';
import { BRANDS, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from '@/constants/filters';
import { PRICE_BOUNDS, YEAR_BOUNDS } from '@/constants/filters';
import { formatPriceShort } from '@/utils/format';
import type { BodyType, CarStatus, FuelType, TransmissionType } from '@/types/car';

const STATUS_TABS: { label: string; value: CarStatus | 'all' }[] = [
  { label: 'Đang bán', value: 'available' },
  { label: 'Đã bán', value: 'sold' },
  { label: 'Tất cả', value: 'all' },
];

const MILEAGE_MAX = 200_000;

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-charcoal">{title}</h4>
      {children}
    </div>
  );
}

/** Single-select chip group built on Ant Design buttons for a consistent look. */
function ChipGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T | null;
  onChange: (v: T | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <Button
            key={opt.value}
            shape="round"
            type={active ? 'primary' : 'default'}
            onClick={() => onChange(active ? null : opt.value)}
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}

export default function CarFilterPanel() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((s) => s.filter);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-charcoal">Bộ lọc</h3>
        <Button
          type="text"
          size="small"
          icon={<ReloadOutlined />}
          onClick={() => dispatch(resetFilters())}
          className="font-semibold text-gray-500"
        >
          Đặt lại
        </Button>
      </div>

      <FilterBlock title="Tình trạng">
        <Segmented<CarStatus | 'all'>
          size="large"
          value={filter.status}
          onChange={(v) => dispatch(setStatus(v))}
          options={STATUS_TABS}
        />
      </FilterBlock>

      <FilterBlock title="Hãng xe">
        <Select
          allowClear
          size="large"
          className="w-full"
          placeholder="Tất cả hãng xe"
          value={filter.brand ?? undefined}
          onChange={(v) => dispatch(setBrand(v ?? null))}
          options={BRANDS.map((b) => ({ label: b, value: b }))}
        />
      </FilterBlock>

      <FilterBlock title="Kiểu dáng">
        <ChipGroup<BodyType>
          options={BODY_TYPES}
          value={filter.bodyType}
          onChange={(v) => dispatch(setBodyType(v))}
        />
      </FilterBlock>

      <FilterBlock title="Khoảng giá">
        <Slider
          range
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={50_000_000}
          value={filter.priceRange ?? [PRICE_BOUNDS.min, PRICE_BOUNDS.max]}
          onChange={(v) => dispatch(setPriceRange(v as [number, number]))}
          tooltip={{ formatter: (v) => formatPriceShort(v ?? 0) }}
        />
        <div className="mt-1 flex justify-between text-xs font-medium text-gray-500">
          <span>{formatPriceShort(filter.priceRange?.[0] ?? PRICE_BOUNDS.min)}</span>
          <span>{formatPriceShort(filter.priceRange?.[1] ?? PRICE_BOUNDS.max)}</span>
        </div>
      </FilterBlock>

      <FilterBlock title="Năm sản xuất">
        <Slider
          range
          min={YEAR_BOUNDS.min}
          max={YEAR_BOUNDS.max}
          value={filter.yearRange ?? [YEAR_BOUNDS.min, YEAR_BOUNDS.max]}
          onChange={(v) => dispatch(setYearRange(v as [number, number]))}
        />
        <div className="mt-1 flex justify-between text-xs font-medium text-gray-500">
          <span>{filter.yearRange?.[0] ?? YEAR_BOUNDS.min}</span>
          <span>{filter.yearRange?.[1] ?? YEAR_BOUNDS.max}</span>
        </div>
      </FilterBlock>

      <FilterBlock title="Số km tối đa">
        <Slider
          min={0}
          max={MILEAGE_MAX}
          step={5_000}
          value={filter.maxMileage ?? MILEAGE_MAX}
          onChange={(v) => dispatch(setMaxMileage(v === MILEAGE_MAX ? null : v))}
          tooltip={{ formatter: (v) => `${((v ?? 0) / 1000).toFixed(0)}k km` }}
        />
        <p className="mt-1 text-xs font-medium text-gray-500">
          Tối đa {((filter.maxMileage ?? MILEAGE_MAX) / 1000).toFixed(0)}.000 km
        </p>
      </FilterBlock>

      <FilterBlock title="Nhiên liệu">
        <ChipGroup<FuelType>
          options={FUEL_TYPES}
          value={filter.fuelType}
          onChange={(v) => dispatch(setFuelType(v))}
        />
      </FilterBlock>

      <FilterBlock title="Hộp số">
        <ChipGroup<TransmissionType>
          options={TRANSMISSIONS}
          value={filter.transmission}
          onChange={(v) => dispatch(setTransmission(v))}
        />
      </FilterBlock>
    </div>
  );
}
