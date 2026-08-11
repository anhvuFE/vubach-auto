'use client';

import { Select } from 'antd';
import {
  AppstoreOutlined,
  BarsOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearch, setSort, setView } from '@/store/slices/filterSlice';
import { setFilterDrawer } from '@/store/slices/uiSlice';
import { selectActiveFilterCount } from '@/store/selectors';
import { SORT_OPTIONS } from '@/constants/filters';
import type { SortKey, ViewMode } from '@/types/common';

export default function CarsToolbar({ total }: { total: number }) {
  const dispatch = useAppDispatch();
  const { search, sort, view } = useAppSelector((s) => s.filter);
  const activeCount = useAppSelector(selectActiveFilterCount);

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <SearchOutlined className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Tìm theo hãng, mẫu xe hoặc năm..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          Tìm thấy <span className="font-bold text-charcoal">{total}</span> xe
        </p>

        <div className="flex items-center gap-2">
          {/* Mobile filter trigger */}
          <button
            type="button"
            onClick={() => dispatch(setFilterDrawer(true))}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-charcoal lg:hidden"
          >
            <FilterOutlined /> Bộ lọc
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs text-white">
                {activeCount}
              </span>
            )}
          </button>

          <Select
            size="large"
            className="min-w-[170px]"
            value={sort}
            onChange={(v: SortKey) => dispatch(setSort(v))}
            options={SORT_OPTIONS}
          />

          {/* View toggle */}
          <div className="hidden overflow-hidden rounded-lg border border-gray-200 sm:flex">
            {(['grid', 'list'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-label={mode === 'grid' ? 'Dạng lưới' : 'Dạng danh sách'}
                onClick={() => dispatch(setView(mode))}
                className={`flex h-11 w-11 items-center justify-center text-lg transition-colors ${
                  view === mode ? 'bg-brand text-white' : 'bg-white text-gray-500 hover:text-brand'
                }`}
              >
                {mode === 'grid' ? <AppstoreOutlined /> : <BarsOutlined />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
