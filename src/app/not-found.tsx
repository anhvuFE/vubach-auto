import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-charcoal">
          Trang không tồn tại
        </h1>
        <p className="mt-3 text-gray-500">
          Rất tiếc, trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
