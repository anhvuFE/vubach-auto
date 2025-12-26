import { Phone, MapPin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VŨ BÁCH AUTO</h3>
            <p className="text-gray-400 text-sm">
              Chuyên mua bán xe ô tô đã qua sử dụng chất lượng cao tại Hải Dương
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">LIÊN KẾT</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white">Trang chủ</a></li>
              <li><a href="/cars" className="hover:text-white">Xe đang bán</a></li>
              <li><a href="/about" className="hover:text-white">Giới thiệu</a></li>
              <li><a href="/contact" className="hover:text-white">Liên hệ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">THÔNG TIN</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                177 Trường Chinh, TP. Hải Dương
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                0975 224 557
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@vubachauto.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">GIỜ LÀM VIỆC</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Thứ 2 - Thứ 7: 8:00 - 20:00</li>
              <li>Chủ nhật: 8:00 - 17:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Vũ Bách Auto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;