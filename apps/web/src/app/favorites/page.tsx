import type { Metadata } from 'next';
import PageBanner from '@/components/common/PageBanner';
import FavoritesList from '@/components/cars/FavoritesList';

export const metadata: Metadata = {
  title: 'Xe yêu thích',
  description: 'Danh sách những mẫu xe bạn đã lưu tại Vũ Bách Auto.',
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <>
      <PageBanner
        title="Xe yêu thích"
        description="Những mẫu xe bạn đã lưu để xem lại sau."
        crumbs={[{ label: 'Xe yêu thích' }]}
      />
      <section className="section bg-gray-50">
        <div className="container-page">
          <FavoritesList />
        </div>
      </section>
    </>
  );
}
