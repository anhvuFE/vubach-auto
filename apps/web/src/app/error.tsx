'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { WarningOutlined } from '@ant-design/icons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error reporting service in production.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
      <div className="text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand/10 text-4xl text-brand">
          <WarningOutlined />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-charcoal">
          Đã có lỗi xảy ra
        </h1>
        <p className="mt-3 max-w-md text-gray-500">
          Rất tiếc, hệ thống gặp sự cố khi tải nội dung. Vui lòng thử lại.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="rounded-lg border border-charcoal/15 px-6 py-3 text-sm font-bold text-charcoal transition-colors hover:border-brand hover:text-brand"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
