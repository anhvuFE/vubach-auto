import { Phone, MapPin, Clock, MessageCircle, Facebook } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Liên Hệ Với Chúng Tôi</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-blue-900">Thông Tin Liên Hệ</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold">Hotline</p>
                  <a href="tel:0975224557" className="text-blue-600 hover:underline">
                    0975 224 557
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold">Địa chỉ</p>
                  <p className="text-gray-600">177 Trường Chinh, TP. Hải Dương</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold">Giờ làm việc</p>
                  <p className="text-gray-600">Thứ 2 - Thứ 7: 8:00 - 20:00</p>
                  <p className="text-gray-600">Chủ nhật: 8:00 - 17:00</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="font-semibold mb-3">Kết nối với chúng tôi</p>
              <div className="flex gap-4">
                <a
                  href="https://zalo.me/0975224557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat Zalo
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-blue-900">Gửi Tin Nhắn</h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Họ tên</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tin nhắn</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Nhập nội dung tin nhắn..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;