'use client';

import { Badge, Button, Input, Segmented, Select } from 'antd';
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
      <Input
        size="large"
        allowClear
        prefix={<SearchOutlined className="text-gray-400" />}
        placeholder="Tìm theo hãng, mẫu xe hoặc năm..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          Tìm thấy <span className="font-bold text-charcoal">{total}</span> xe
        </p>

        <div className="flex items-center gap-2">
          {/* Mobile filter trigger */}
          <Badge count={activeCount} size="small" className="lg:hidden">
            <Button
              size="large"
              icon={<FilterOutlined />}
              onClick={() => dispatch(setFilterDrawer(true))}
            >
              Bộ lọc
            </Button>
          </Badge>

          <Select
            size="large"
            className="min-w-[170px]"
            value={sort}
            onChange={(v: SortKey) => dispatch(setSort(v))}
            options={SORT_OPTIONS}
          />

          {/* View toggle */}
          <Segmented<ViewMode>
            size="large"
            className="hidden sm:inline-block"
            value={view}
            onChange={(v) => dispatch(setView(v))}
            options={[
              { value: 'grid', icon: <AppstoreOutlined />, title: 'Dạng lưới' },
              { value: 'list', icon: <BarsOutlined />, title: 'Dạng danh sách' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
