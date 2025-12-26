import { Search, Car, Shield, Award, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCarStore from '../store/useCarStore';

const Hero = () => {
  const { setFilters } = useCarStore();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setFilters({ brand: searchQuery });
      navigate('/cars');
    }
  };

  const stats = [
    { icon: Car, value: '500+', label: 'Xe đã bán' },
    { icon: Users, value: '1000+', label: 'Khách hàng' },
    { icon: TrendingUp, value: '10+', label: 'Năm kinh nghiệm' },
  ];

  const features = [
    {
      icon: Car,
      title: 'Xe Chất Lượng Cao',
      description: 'Kiểm tra kỹ lưỡng 150+ hạng mục trước khi giao dịch',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Bảo Hành Toàn Diện',
      description: 'Cam kết bảo hành và hỗ trợ sau bán hàng chu đáo',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Giá Tốt Nhất',
      description: 'Minh bạch trong giao dịch, không phí ẩn',
      gradient: 'from-amber-500 to-orange-500'
    },
  ];

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                ⭐ Đơn vị uy tín hàng đầu Hải Dương
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-up">
              VŨ BÁCH <span className="text-gradient">AUTO</span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Chuyên mua bán xe ô tô đã qua sử dụng chất lượng cao
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex bg-white rounded-xl overflow-hidden">
                  <input
                    type="text"
                    placeholder="Tìm kiếm xe theo hãng (VD: Toyota, Honda...)"
                    className="flex-1 px-6 py-4 text-gray-900 outline-none text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group"
                  >
                    <Search className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-400 mr-2" />
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <span className="text-gray-300 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Tại Sao Chọn <span className="text-gradient">Vũ Bách Auto</span>
            </h2>
            <p className="text-gray-600 text-lg">Cam kết mang đến dịch vụ tốt nhất cho khách hàng</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center text-blue-600 font-medium group-hover:text-indigo-600 transition-colors">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Cam kết thực hiện</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;