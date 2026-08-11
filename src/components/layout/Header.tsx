'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drawer } from 'antd';
import { MenuOutlined, CloseOutlined, PhoneOutlined, HeartOutlined } from '@ant-design/icons';
import Logo from '@/components/common/Logo';
import { NAV_ITEMS, SITE } from '@/constants/site';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMobileMenu } from '@/store/slices/uiSlice';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';

export default function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const favoriteCount = useAppSelector((s) => s.favorite.ids.length);
  const scrolled = useScrollThreshold(24);

  // Transparent overlay only on the homepage hero; solid everywhere else.
  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  const closeMenu = () => dispatch(setMobileMenu(false));

  const isActive = (href: string) => {
    const base = href.split('?')[0];
    if (base === '/') return pathname === '/';
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-[background-color,box-shadow,padding] duration-300 will-change-transform ${
        transparent ? 'bg-transparent py-4' : 'bg-white py-2.5 shadow-header'
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4">
        <Logo variant={transparent ? 'light' : 'dark'} />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                transparent
                  ? 'text-white/85 hover:text-white'
                  : isActive(item.href)
                    ? 'text-brand'
                    : 'text-charcoal hover:text-brand'
              }`}
            >
              {item.label}
              {isActive(item.href) && !transparent && (
                <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/favorites"
            aria-label="Xe yêu thích"
            className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              transparent ? 'text-white hover:bg-white/15' : 'text-charcoal hover:bg-brand/10'
            }`}
          >
            <HeartOutlined />
            {favoriteCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                {favoriteCount}
              </span>
            )}
          </Link>
          <a
            href={`tel:${SITE.hotline}`}
            className={`flex items-center gap-2 text-sm font-bold ${
              transparent ? 'text-white' : 'text-charcoal'
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                transparent ? 'bg-white/15 text-white' : 'bg-brand/10 text-brand'
              }`}
            >
              <PhoneOutlined />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                Hotline
              </span>
              {SITE.hotline}
            </span>
          </a>
          <Link
            href="/cars"
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-dark hover:shadow-lg"
          >
            Xem xe
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/favorites"
            aria-label="Xe yêu thích"
            className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
              transparent ? 'bg-white/15 text-white' : 'bg-brand/10 text-brand'
            }`}
          >
            <HeartOutlined />
            {favoriteCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-white">
                {favoriteCount}
              </span>
            )}
          </Link>
          <a
            href={`tel:${SITE.hotline}`}
            aria-label="Gọi hotline"
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              transparent ? 'bg-white/15 text-white' : 'bg-brand/10 text-brand'
            }`}
          >
            <PhoneOutlined />
          </a>
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => dispatch(setMobileMenu(true))}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${
              transparent ? 'text-white' : 'text-charcoal'
            }`}
          >
            <MenuOutlined />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <Drawer
        placement="right"
        open={mobileMenuOpen}
        onClose={closeMenu}
        width={300}
        closable={false}
        styles={{ body: { padding: 0 } }}
        title={
          <div className="flex items-center justify-between">
            <Logo variant="dark" />
            <button
              type="button"
              aria-label="Đóng menu"
              onClick={closeMenu}
              className="text-lg text-gray-500"
            >
              <CloseOutlined />
            </button>
          </div>
        }
      >
        <nav className="flex flex-col p-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                isActive(item.href) ? 'bg-brand/10 text-brand' : 'text-charcoal hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-2 flex flex-col gap-3 border-t border-gray-100 p-4">
          <Link
            href="/favorites"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-bold text-charcoal"
          >
            <HeartOutlined /> Xe yêu thích{favoriteCount > 0 ? ` (${favoriteCount})` : ''}
          </Link>
          <a
            href={`tel:${SITE.hotline}`}
            className="flex items-center justify-center gap-2 rounded-lg border border-brand py-3 text-sm font-bold text-brand"
          >
            <PhoneOutlined /> {SITE.hotline}
          </a>
          <Link
            href="/cars"
            onClick={closeMenu}
            className="rounded-lg bg-brand py-3 text-center text-sm font-bold text-white"
          >
            Xem xe đang bán
          </Link>
        </div>
      </Drawer>
    </header>
  );
}
