import type { Metadata } from 'next';
import PageBanner from '@/components/common/PageBanner';
import CompareView from '@/components/cars/CompareView';

export const metadata: Metadata = {
  title: 'So sánh xe',
  description: 'So sánh thông số các mẫu xe bạn quan tâm tại Vũ Bách Auto.',
  robots: { index: false, follow: true },
};

export default function ComparePage() {
  return (
    <>
      <PageBanner
        title="So sánh xe"
        description="Đặt các mẫu xe cạnh nhau để dễ dàng lựa chọn."
        crumbs={[{ label: 'So sánh xe' }]}
      />
      <section className="section bg-gray-50">
        <div className="container-page">
          <CompareView />
        </div>
      </section>
    </>
  );
}
