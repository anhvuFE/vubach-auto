import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';
import useCarStore from './store/useCarStore';
import { mockCars } from './utils/mockData';

function App() {
  const { cars, setCars } = useCarStore();

  useEffect(() => {
    if (cars.length === 0) {
      setCars(mockCars);
    }
  }, [cars.length, setCars]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Liên Hệ</h1>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Vũ Bách Auto</h2>
                    <div className="space-y-3">
                      <p><strong>Hotline:</strong> 0975 224 557</p>
                      <p><strong>Địa chỉ:</strong> 177 Trường Chinh, TP. Hải Dương</p>
                      <p><strong>Giờ làm việc:</strong></p>
                      <p className="pl-4">Thứ 2 - Thứ 7: 8:00 - 20:00</p>
                      <p className="pl-4">Chủ nhật: 8:00 - 17:00</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6175730533257!2d106.32320831476292!3d20.94173498606239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31359b4f8e2f5d1b%3A0x9b7c3a4e8f0c5b4d!2zMTc3IFRyxrDhu51uZyBDaGluaCwgVGjDoG5oIHBo4buRIEjhuqNpIETGsMahbmcsIEjhuqNpIETGsMahbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1614581234567!5m2!1svi!2s"
                      width="100%"
                      height="300"
                      style={{border:0}}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            } />
            <Route path="/about" element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Về Chúng Tôi</h1>
                <div className="prose max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-4 text-blue-900">Vũ Bách Auto - Uy tín tạo niềm tin</h2>
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Với hơn 10 năm kinh nghiệm trong lĩnh vực mua bán xe ô tô đã qua sử dụng,
                      Vũ Bách Auto tự hào là một trong những đơn vị uy tín hàng đầu tại Hải Dương.
                    </p>
                    <h3 className="text-xl font-semibold mt-6 mb-3">Cam kết của chúng tôi:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Xe được kiểm tra kỹ lưỡng trước khi giao dịch</li>
                      <li>Giá cả minh bạch, cạnh tranh</li>
                      <li>Hỗ trợ thủ tục sang tên nhanh chóng</li>
                      <li>Bảo hành và chăm sóc sau bán hàng</li>
                      <li>Tư vấn tận tình, chuyên nghiệp</li>
                    </ul>
                    <h3 className="text-xl font-semibold mt-6 mb-3">Dịch vụ của chúng tôi:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Mua bán xe ô tô các loại</li>
                      <li>Thu mua xe ô tô cũ giá cao</li>
                      <li>Hỗ trợ vay vốn mua xe trả góp</li>
                      <li>Đăng kiểm, bảo hiểm xe</li>
                      <li>Bảo dưỡng, sửa chữa xe</li>
                    </ul>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
        <FloatingContact />
      </div>
    </Router>
  );
}

export default App;