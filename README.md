# Vũ Bách Auto - Landing Page Bán Ô Tô Cũ

## 🚗 Giới thiệu
Landing page quản lý và hiển thị thông tin xe ô tô cũ, được xây dựng với React + TypeScript + Vite. Dữ liệu được lưu trữ local không cần database.

## ✨ Tính năng
- **Landing Page**: Hiển thị danh sách xe với giao diện đẹp mắt
- **Admin Panel**: Quản lý thông tin xe (thêm/sửa/xóa)
- **Local Storage**: Lưu dữ liệu trực tiếp trên trình duyệt
- **Export/Import**: Sao lưu và khôi phục dữ liệu dạng JSON
- **Upload ảnh**: Hỗ trợ upload ảnh base64 hoặc qua ImgBB/Cloudinary
- **Responsive**: Tương thích mọi thiết bị

## 🛠 Công nghệ sử dụng
- React 19 + TypeScript
- Vite
- Material-UI (MUI) + Ant Design
- Zustand (State Management)
- React Router DOM
- Local Storage API

## 🚀 Cài đặt và chạy

### 1. Clone project
```bash
git clone https://github.com/your-username/vubach-auto.git
cd vubach-auto
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Chạy development server
```bash
npm run dev
```

### 4. Build production
```bash
npm run build
```

## 📝 Hướng dẫn sử dụng

### Truy cập Admin Panel
1. Vào trang chủ, click icon Admin ở góc phải header
2. Đăng nhập với mật khẩu: `admin123`
3. Quản lý xe trong Admin Panel

### Thêm xe mới
1. Trong Admin Panel, click "Thêm xe mới"
2. Điền đầy đủ thông tin xe
3. Upload ảnh (sẽ được chuyển thành base64)
4. Click "Thêm xe"

### Export/Import dữ liệu
- **Export**: Click "Xuất dữ liệu" để tải file JSON
- **Import**: Click "Import dữ liệu" và chọn file JSON đã export

### Upload ảnh lên cloud (Tùy chọn)
Nếu muốn upload ảnh lên cloud thay vì base64:

1. **ImgBB** (Miễn phí):
   - Đăng ký tại https://imgbb.com/
   - Lấy API key
   - Thêm vào file `.env`: `VITE_IMGBB_API_KEY=your_key`

2. **Cloudinary** (Miễn phí):
   - Đăng ký tại https://cloudinary.com/
   - Tạo upload preset (unsigned)
   - Thêm vào file `.env`:
     ```
     VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
     VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
     ```

## 🌐 Deploy lên Vercel

### Cách 1: Deploy qua Vercel CLI
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts...
```

### Cách 2: Deploy qua GitHub
1. Push code lên GitHub
2. Vào https://vercel.com/
3. Import project từ GitHub
4. Deploy tự động

## 📁 Cấu trúc project
```
vubach-auto/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Các trang (Home, Admin, Detail)
│   ├── store/          # Zustand store
│   ├── services/       # Services (image upload)
│   ├── types/          # TypeScript types
│   ├── utils/          # Utilities
│   └── styles/         # CSS files
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

## ⚠️ Lưu ý quan trọng
- Dữ liệu lưu trong Local Storage (giới hạn ~5-10MB)
- Nên export backup thường xuyên
- Ảnh base64 chiếm nhiều dung lượng, nên dùng ImgBB/Cloudinary cho ảnh lớn
- Mật khẩu admin lưu trong Local Storage (không bảo mật cao)

## 🔒 Bảo mật
- Đổi mật khẩu admin sau khi deploy
- Không lưu thông tin nhạy cảm
- Backup dữ liệu thường xuyên

## 📞 Liên hệ
- Website: vubach-auto.vercel.app
- Phone: 0901 234 567
- Email: contact@vubach-auto.com

## 📄 License
MIT License - Feel free to use for your project!