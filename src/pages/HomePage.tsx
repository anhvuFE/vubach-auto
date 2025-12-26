import CarCard from '../components/CarCard';
import SimpleBanner from '../components/SimpleBanner';
import useCarStore from '../store/useCarStore';

const HomePage = () => {
  const { getFilteredCars } = useCarStore();
  const cars = getFilteredCars();
  const featuredCars = cars.filter(car => car.status === 'available').slice(0, 8);

  return (
    <>
      <SimpleBanner />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center uppercase">Xe Đang Bán</h2>

          {featuredCars.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-4">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">Chưa có xe nào để hiển thị.</p>
            </div>
          )}

          {featuredCars.length > 0 && (
            <div className="text-center mt-8">
              <a
                href="/cars"
                className="inline-block bg-gray-900 text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                Xem tất cả
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;