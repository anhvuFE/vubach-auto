import Link from 'next/link';
import { CarOutlined } from '@ant-design/icons';

export default function CarNotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
      <div className="text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand/10 text-4xl text-brand">
          <CarOutlined />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-charcoal">
          Không tìm thấy xe
        </h1>
        <p className="mt-3 text-gray-500">
          Chiếc xe bạn tìm có thể đã được bán hoặc đường dẫn không còn tồn tại.
        </p>
        <Link
          href="/cars"
          className="mt-6 inline-flex rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
        >
          Xem các xe đang bán
        </Link>
      </div>
    </div>
  );
}
