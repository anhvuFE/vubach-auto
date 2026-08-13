'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Drawer, Pagination } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CarGrid from './CarGrid';
import CarFilterPanel from './CarFilterPanel';
import CarsToolbar from './CarsToolbar';
import EmptyState from '@/components/common/EmptyState';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { applyFilters, resetFilters, setPage } from '@/store/slices/filterSlice';
import { setFilterDrawer } from '@/store/slices/uiSlice';
import { selectFilteredCars } from '@/store/selectors';
import type { CarFilters } from '@/types/common';

interface CarsBrowserProps {
  /** Initial filters parsed from the URL query on the server. */
  initial?: Partial<CarFilters>;
}

export default function CarsBrowser({ initial }: CarsBrowserProps) {
  const dispatch = useAppDispatch();
  const applied = useRef(false);

  const cars = useAppSelector(selectFilteredCars);
  const { page, pageSize, view } = useAppSelector((s) => s.filter);
  const drawerOpen = useAppSelector((s) => s.ui.filterDrawerOpen);

  // Seed filters from URL once on mount.
  useEffect(() => {
    if (applied.current) return;
    applied.current = true;
    if (initial && Object.keys(initial).length > 0) {
      dispatch(applyFilters(initial));
    }
  }, [dispatch, initial]);

  const start = (page - 1) * pageSize;
  const paginated = cars.slice(start, start + pageSize);

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
          <CarFilterPanel />
        </div>
      </aside>

      {/* Main */}
      <div>
        <CarsToolbar total={cars.length} />

        <div className="mt-6">
          {paginated.length > 0 ? (
            <>
              <CarGrid cars={paginated} view={view} priorityCount={3} />
              {cars.length > pageSize && (
                <div className="mt-10 flex justify-center">
                  <Pagination
                    current={page}
                    total={cars.length}
                    pageSize={pageSize}
                    showSizeChanger={false}
                    onChange={(p) => {
                      dispatch(setPage(p));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState
              action={
                <button
                  type="button"
                  onClick={() => dispatch(resetFilters())}
                  className="rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  Xoá bộ lọc
                </button>
              }
            />
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">Không tìm thấy chiếc xe bạn cần?</p>
          <Link
            href="/contact"
            className="mt-2 inline-flex font-bold text-brand hover:underline"
          >
            Để lại yêu cầu, chúng tôi sẽ tìm xe cho bạn →
          </Link>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => dispatch(setFilterDrawer(false))}
        width={320}
        closable={false}
        title={
          <div className="flex items-center justify-between">
            <span className="font-display font-bold">Bộ lọc tìm kiếm</span>
            <button
              type="button"
              aria-label="Đóng"
              onClick={() => dispatch(setFilterDrawer(false))}
              className="text-lg text-gray-500"
            >
              <CloseOutlined />
            </button>
          </div>
        }
      >
        <CarFilterPanel />
        <button
          type="button"
          onClick={() => dispatch(setFilterDrawer(false))}
          className="mt-4 w-full rounded-lg bg-brand py-3 text-sm font-bold text-white"
        >
          Xem {cars.length} kết quả
        </button>
      </Drawer>
    </div>
  );
}
