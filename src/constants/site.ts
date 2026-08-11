import type { NavItem } from '@/types/common';

/** Central business/config info. Reads from env with sensible fallbacks. */
export const SITE = {
  name: 'Vũ Bách Auto',
  shortName: 'Vũ Bách Auto',
  tagline: 'Uy tín tạo niềm tin – Chất lượng tạo giá trị',
  description:
    'Vũ Bách Auto – Showroom chuyên mua bán, thu mua và ký gửi ô tô đã qua sử dụng. Xe kiểm định chất lượng, hỗ trợ trả góp, sang tên nhanh chóng.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  hotline: process.env.NEXT_PUBLIC_HOTLINE ?? '0975224557',
  zalo: process.env.NEXT_PUBLIC_ZALO ?? '0975224557',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'lienhe@vubachauto.vn',
  address: 'Số 1 Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội',
  workingHours: '8:00 – 19:00 (T2 – CN)',
  owner: 'Mr. Vũ Bách',
  facebook: 'https://facebook.com',
  messenger: 'https://m.me/vubachauto',
  mapEmbed:
    'https://www.google.com/maps?q=Nam+Tu+Liem+Ha+Noi&output=embed',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Xe đang bán', href: '/cars' },
  { label: 'Xe đã bán', href: '/cars?status=sold' },
  { label: 'Giới thiệu', href: '/about' },
  { label: 'Dịch vụ', href: '/services' },
  { label: 'Liên hệ', href: '/contact' },
];
