# Vũ Bách Auto – Showroom ô tô đã qua sử dụng

Website showroom ô tô cũ cao cấp: hiện đại, chuyên nghiệp, responsive. Xây dựng bằng **Next.js App Router** với dữ liệu mock, kiến trúc sẵn sàng để thay bằng API thật mà không phải viết lại UI.

> **Uy tín tạo niềm tin – Chất lượng tạo giá trị**

## 🛠 Công nghệ

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3** (layout, spacing, responsive)
- **Ant Design 5** (Form, Select, Drawer, Modal, Table, Pagination...)
- **Redux Toolkit** + React Redux (global state)
- **Framer Motion** (animation)
- ESLint + Prettier

## ✨ Tính năng

- **Trang chủ**: Hero + tìm kiếm nhanh, xe nổi bật, thống kê, dịch vụ, giới thiệu, CTA
- **Danh sách xe** `/cars`: bộ lọc (hãng, giá, năm, km, nhiên liệu, hộp số, kiểu dáng, tình trạng), tìm kiếm, sắp xếp, phân trang, grid/list, filter drawer trên mobile
- **Chi tiết xe** `/cars/[slug]`: gallery + xem toàn màn hình, thông số kỹ thuật, CTA (gọi/Zalo/lái thử/đặt lịch), xe tương tự, SEO động
- **Giới thiệu / Dịch vụ / Liên hệ**: nội dung showroom + form liên hệ (validate)
- **Admin** `/admin`: quản lý xe (thêm/sửa/xoá), export/import JSON, lưu localStorage
- **Yêu thích xe**, floating buttons (phone/Zalo/Messenger)
- **SEO**: metadata theo trang, sitemap, robots, Open Graph

## 📁 Cấu trúc

```
src/
├── app/                # Routes (App Router) + sitemap/robots
│   ├── cars/[slug]/    # Trang chi tiết xe (SSG)
│   ├── about, services, contact, admin/
│   └── layout.tsx, page.tsx, globals.css
├── components/         # common, layout, home, cars, contact, admin
├── constants/          # site, filters, content
├── data/               # cars.ts (mock inventory)
├── store/              # Redux: slices (car, filter, favorite, ui), selectors, persist
├── providers/          # Redux + Ant Design (SSR registry, theme, vi_VN)
├── services/           # imageUpload (ImgBB/Cloudinary/base64)
├── types/ • utils/ • lib/
```

## 🚀 Cài đặt & chạy

```bash
npm install
cp .env.example .env.local   # điều chỉnh biến môi trường nếu cần
npm run dev                  # http://localhost:3000
```

Scripts:

```bash
npm run dev        # Dev server
npm run build      # Production build
npm run start      # Chạy bản production
npm run lint       # ESLint
npm run typecheck  # Kiểm tra kiểu TypeScript
npm run format     # Prettier
```

## 🔧 Biến môi trường

Xem `.env.example`. Tất cả đều tuỳ chọn cho bản mock; quan trọng nhất:

- `NEXT_PUBLIC_SITE_URL` – dùng cho SEO/sitemap/Open Graph
- `NEXT_PUBLIC_HOTLINE`, `NEXT_PUBLIC_ZALO`, `NEXT_PUBLIC_EMAIL`
- `NEXT_PUBLIC_ADMIN_PASSWORD` – mật khẩu vào `/admin` (mặc định `admin123`)
- `NEXT_PUBLIC_IMGBB_API_KEY` / Cloudinary – upload ảnh trong admin (fallback base64)

## 🔌 Thay mock data bằng API thật

Dữ liệu tập trung ở `src/data/cars.ts` với các selector thuần (`getFeaturedCars`, `getCarBySlug`...). Chỉ cần thay phần này bằng lệnh gọi API trả về đúng kiểu `Car` — toàn bộ UI và store giữ nguyên.

## ☁️ Deploy

Tối ưu cho **Vercel** (tự nhận diện Next.js, không cần cấu hình thêm). Đảm bảo `npm run build` không có lỗi TypeScript/ESLint trước khi deploy.
