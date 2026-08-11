import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircleFilled, AimOutlined, RocketOutlined } from '@ant-design/icons';
import PageBanner from '@/components/common/PageBanner';
import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import StatsCounter from '@/components/common/StatsCounter';
import DynamicIcon from '@/components/common/DynamicIcon';
import { STATS, CORE_VALUES, COMMITMENTS } from '@/constants/content';
import { SITE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description:
    'Vũ Bách Auto - hơn 10 năm kinh nghiệm trong lĩnh vực mua bán ô tô đã qua sử dụng. Uy tín tạo niềm tin, chất lượng tạo giá trị.',
  alternates: { canonical: '/about' },
};

const STORY_IMAGE =
  'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=1000&q=70';

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="Về Vũ Bách Auto"
        description={SITE.tagline}
        crumbs={[{ label: 'Giới thiệu' }]}
        image={STORY_IMAGE}
      />

      {/* Story */}
      <section className="section bg-white">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="overflow-hidden rounded-2xl shadow-card-hover">
              <Image
                src={STORY_IMAGE}
                alt="Showroom Vũ Bách Auto"
                width={700}
                height={520}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal direction="left">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Câu chuyện thương hiệu
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              Hơn một thập kỷ đồng hành cùng khách hàng
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-gray-600">
              <p>
                Vũ Bách Auto khởi đầu từ niềm đam mê ô tô và mong muốn mang đến cho khách hàng những
                chiếc xe đã qua sử dụng chất lượng với mức giá hợp lý nhất. Trải qua hơn 10 năm phát
                triển, chúng tôi tự hào là địa chỉ tin cậy của hàng nghìn khách hàng.
              </p>
              <p>
                Chúng tôi tin rằng sự minh bạch và tận tâm chính là nền tảng của mọi giao dịch. Mỗi
                chiếc xe đến tay khách hàng đều được kiểm định kỹ lưỡng, đảm bảo chất lượng đúng như
                cam kết.
              </p>
            </div>
            <ul className="mt-6 space-y-2.5">
              {COMMITMENTS.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal">
                  <CheckCircleFilled className="mt-0.5 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal py-16">
        <div className="container-page grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-4xl font-extrabold text-brand sm:text-5xl">
                <StatsCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-white/70">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section bg-white">
        <div className="container-page grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="border-t-2 border-charcoal pt-8">
            <div className="flex items-center gap-3">
              <AimOutlined className="text-xl text-brand" />
              <h3 className="font-display text-2xl font-bold text-charcoal">Tầm nhìn</h3>
            </div>
            <p className="mt-4 leading-relaxed text-gray-500">
              Trở thành hệ thống showroom ô tô đã qua sử dụng uy tín hàng đầu, nơi khách hàng luôn an
              tâm về chất lượng và dịch vụ.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="border-t-2 border-charcoal pt-8">
            <div className="flex items-center gap-3">
              <RocketOutlined className="text-xl text-brand" />
              <h3 className="font-display text-2xl font-bold text-charcoal">Sứ mệnh</h3>
            </div>
            <p className="mt-4 leading-relaxed text-gray-500">
              Mang đến cho mỗi khách hàng trải nghiệm mua bán xe minh bạch, tiện lợi và xứng đáng với
              giá trị đồng tiền bỏ ra.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Giá trị cốt lõi"
            title="Điều làm nên Vũ Bách Auto"
            description="Những giá trị chúng tôi kiên định theo đuổi trong suốt hành trình phát triển."
          />
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((value, i) => (
              <Reveal key={value.title} delay={(i % 4) * 0.08} className="border-t-2 border-charcoal pt-6">
                <DynamicIcon name={value.icon} className="text-2xl text-brand" />
                <h3 className="mt-4 font-display text-lg font-bold text-charcoal">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-50">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal">
              Sẵn sàng tìm chiếc xe của bạn?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Ghé thăm showroom hoặc liên hệ với chúng tôi để được tư vấn và trải nghiệm dịch vụ tận
              tâm.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/cars"
                className="rounded-lg bg-brand px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand-dark"
              >
                Xem xe đang bán
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-charcoal/15 px-7 py-3.5 font-bold text-charcoal transition-colors hover:border-brand hover:text-brand"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
