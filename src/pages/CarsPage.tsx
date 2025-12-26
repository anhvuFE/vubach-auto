import { useState } from 'react';
import CarCard from '../components/CarCard';
import useCarStore from '../store/useCarStore';
import { ChevronDown, ChevronUp, LayoutGrid } from 'lucide-react';

const CarsPage = () => {
  const { getFilteredCars, setFilters, clearFilters } = useCarStore();
  const allCars = useCarStore((state) => state.cars);
  const cars = getFilteredCars();

  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    price: false,
    year: false,
    mileage: false,
    type: false,
  });

  const [localFilters, setLocalFilters] = useState({
    brand: '',
    priceMin: 0,
    priceMax: 20000000000,
    yearMin: '',
    yearMax: '',
    fuelType: '',
    transmission: ''
  });

  const [sortBy, setSortBy] = useState('newest');

  // Get unique brands
  const brands = [...new Set(allCars.map(car => car.brand))].sort();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handleFilterChange = (filterType: string, value: any) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);

    // Apply filters immediately
    const filters: any = {};
    if (newFilters.brand) filters.brand = newFilters.brand;
    if (newFilters.fuelType) filters.fuelType = newFilters.fuelType;
    if (newFilters.transmission) filters.transmission = newFilters.transmission;

    if (newFilters.priceMin || newFilters.priceMax) {
      filters.priceRange = [
        newFilters.priceMin || 0,
        newFilters.priceMax || Number.MAX_SAFE_INTEGER
      ];
    }

    if (newFilters.yearMin || newFilters.yearMax) {
      filters.yearRange = [
        parseInt(newFilters.yearMin) || 1900,
        parseInt(newFilters.yearMax) || new Date().getFullYear()
      ];
    }

    setFilters(filters);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    handleFilterChange('priceMax', value);
  };

  // Sort cars
  const sortedCars = [...cars].sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'newest':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">
          <span>Trang chủ</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Xe đang bán</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">XE ĐANG BÁN</h1>
          <p className="text-gray-600">Hiện có {cars.length} xe</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase">Nhóm danh mục</h2>

              {/* Brand Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => toggleSection('brand')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-700">Thương Hiệu</span>
                  {expandedSections.brand ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSections.brand && (
                  <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        value=""
                        checked={localFilters.brand === ''}
                        onChange={(e) => handleFilterChange('brand', e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-600">Tất cả</span>
                    </label>
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="brand"
                          value={brand}
                          checked={localFilters.brand === brand}
                          onChange={(e) => handleFilterChange('brand', e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-gray-600">{brand}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-700">Mức Giá</span>
                  {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSections.price && (
                  <div className="mt-3">
                    <div className="px-3">
                      <input
                        type="range"
                        min="0"
                        max="20000000000"
                        step="100000000"
                        value={localFilters.priceMax}
                        onChange={handlePriceRangeChange}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>0 đ</span>
                        <span>{new Intl.NumberFormat('vi-VN').format(localFilters.priceMax)} đ</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Year Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => toggleSection('year')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-700">Năm Sản Xuất</span>
                  {expandedSections.year ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSections.year && (
                  <div className="mt-3 space-y-2">
                    <input
                      type="number"
                      placeholder="Từ năm"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      value={localFilters.yearMin}
                      onChange={(e) => handleFilterChange('yearMin', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Đến năm"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      value={localFilters.yearMax}
                      onChange={(e) => handleFilterChange('yearMax', e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Fuel Type Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => toggleSection('type')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-700">Loại Xe</span>
                  {expandedSections.type ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSections.type && (
                  <div className="mt-3 space-y-2">
                    {['Xăng', 'Dầu', 'Hybrid', 'Điện'].map(fuel => (
                      <label key={fuel} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="fuel"
                          value={fuel}
                          checked={localFilters.fuelType === fuel}
                          onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-gray-600">{fuel}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setLocalFilters({
                    brand: '',
                    priceMin: 0,
                    priceMax: 20000000000,
                    yearMin: '',
                    yearMax: '',
                    fuelType: '',
                    transmission: ''
                  });
                  clearFilters();
                }}
                className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-400"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="priceAsc">Giá thấp đến cao</option>
                  <option value="priceDesc">Giá cao đến thấp</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cars Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {sortedCars.length === 0 && (
              <div className="bg-white rounded-lg p-16 text-center">
                <p className="text-gray-500">Không tìm thấy xe phù hợp với bộ lọc của bạn.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;