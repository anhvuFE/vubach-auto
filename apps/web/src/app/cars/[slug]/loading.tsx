export default function CarDetailLoading() {
  return (
    <div className="pt-32">
      <div className="container-page section pt-8">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Gallery + info */}
          <div>
            <div className="aspect-[16/10] animate-pulse rounded-2xl bg-gray-100" />
            <div className="mt-3 flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 w-32 animate-pulse rounded-lg bg-gray-100" />
              ))}
            </div>
            <div className="mt-6 h-10 w-2/3 animate-pulse rounded-lg bg-gray-100" />
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-gray-100" />
              ))}
            </div>
            <div className="mt-8 h-64 animate-pulse rounded-2xl bg-gray-100" />
          </div>
          {/* Contact */}
          <div className="h-96 animate-pulse rounded-2xl bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
