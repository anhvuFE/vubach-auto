import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import useCarStore from '../store/useCarStore';
import CarCard from '../components/CarCard';
import type { Car } from '../types/car';

const AdminPanel = () => {
  const { cars, addCar, updateCar, deleteCar, isAdmin } = useCarStore();
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<Partial<Car>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuelType: 'Xăng',
    transmission: 'Tự động',
    engineCapacity: '',
    seats: 5,
    color: '',
    location: 'Hải Dương',
    images: [],
    description: '',
    features: [],
    status: 'available'
  });

  useEffect(() => {
    if (editingCar) {
      setFormData(editingCar);
      setShowForm(true);
    }
  }, [editingCar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCar) {
      updateCar(editingCar.id, formData);
    } else {
      const newCar: Car = {
        ...formData as Car,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      addCar(newCar);
    }

    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCar(null);
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: 'Xăng',
      transmission: 'Tự động',
      engineCapacity: '',
      seats: 5,
      color: '',
      location: 'Hải Dương',
      images: [],
      description: '',
      features: [],
      status: 'available'
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa xe này?')) {
      deleteCar(id);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
  };

  const handleImageAdd = () => {
    const imageUrl = prompt('Nhập URL hình ảnh:');
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), imageUrl]
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureAdd = () => {
    const feature = prompt('Nhập tính năng:');
    if (feature) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), feature]
      }));
    }
  };

  const handleFeatureRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }));
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Truy cập bị từ chối</h1>
        <p>Bạn cần đăng nhập với quyền quản trị để truy cập trang này.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quản Lý Xe</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm Xe Mới
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingCar ? 'Sửa Thông Tin Xe' : 'Thêm Xe Mới'}
                </h2>
                <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Hãng xe</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Mẫu xe</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Năm sản xuất</label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Giá (VNĐ)</label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Số km đã đi</label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Loại nhiên liệu</label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.fuelType}
                      onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as Car['fuelType'] })}
                    >
                      <option value="Xăng">Xăng</option>
                      <option value="Dầu">Dầu</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Điện">Điện</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Hộp số</label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.transmission}
                      onChange={(e) => setFormData({ ...formData, transmission: e.target.value as Car['transmission'] })}
                    >
                      <option value="Số sàn">Số sàn</option>
                      <option value="Tự động">Tự động</option>
                      <option value="Bán tự động">Bán tự động</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dung tích động cơ</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.engineCapacity}
                      onChange={(e) => setFormData({ ...formData, engineCapacity: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Số chỗ ngồi</label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.seats}
                      onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Màu xe</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Vị trí</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Trạng thái</label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as Car['status'] })}
                    >
                      <option value="available">Đang bán</option>
                      <option value="sold">Đã bán</option>
                      <option value="pending">Đang chờ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mô tả</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hình ảnh</label>
                  <div className="space-y-2">
                    {formData.images?.map((image, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={image}
                          className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageRemove(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleImageAdd}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Thêm hình ảnh
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tính năng</label>
                  <div className="space-y-2">
                    {formData.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={feature}
                          className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
                        />
                        <button
                          type="button"
                          onClick={() => handleFeatureRemove(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleFeatureAdd}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Thêm tính năng
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingCar ? 'Cập nhật' : 'Thêm xe'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {cars.map(car => (
          <CarCard
            key={car.id}
            car={car}
            isAdmin={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {cars.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Chưa có xe nào được thêm.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;