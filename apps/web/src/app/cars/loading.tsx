export default function CarsLoading() {
  return (
    <div className="pt-32">
      <div className="container-page section">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <div className="hidden h-96 animate-pulse rounded-2xl bg-gray-100 lg:block" />
          <div>
            <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                  <div className="aspect-[16/10] animate-pulse bg-gray-100" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                    <div className="h-5 w-3/4 animate-pulse rounded bg-gray-100" />
                    <div className="h-16 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
