import { Phone, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      navigate('/cars');
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-bold">
              <span className="text-blue-600">VŨ BÁCH</span>
              <span className="text-gray-800"> AUTO</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              TRANG CHỦ
            </Link>
            <Link to="/cars" className="text-gray-700 hover:text-blue-600 font-medium">
              XE ĐANG BÁN
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              GIỚI THIỆU
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              LIÊN HỆ
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Hotline:</span>
              <a href="tel:0975224557" className="text-lg font-bold text-blue-600">
                0975 224 557
              </a>
            </div>

            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              TRANG CHỦ
            </Link>
            <Link
              to="/cars"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              XE ĐANG BÁN
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              GIỚI THIỆU
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              LIÊN HỆ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;