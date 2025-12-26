const SimpleBanner = () => {
  return (
    <section className="relative h-[400px] mt-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&h=400&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">XE ĐANG BÁN</h1>
          <p className="text-lg">Trang chủ</p>
        </div>
      </div>
    </section>
  );
};

export default SimpleBanner;