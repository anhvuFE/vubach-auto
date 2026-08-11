import Image from 'next/image';
import Link from 'next/link';
import { CheckCircleFilled } from '@ant-design/icons';
import Reveal from '@/components/common/Reveal';
import DynamicIcon from '@/components/common/DynamicIcon';
import { CORE_VALUES, COMMITMENTS } from '@/constants/content';

const SHOWROOM_IMAGE =
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=70';

export default function WhyChooseUs() {
  return (
    <section className="section bg-gray-50">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        {/* Image + values */}
        <Reveal direction="right">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-card-hover">
              <Image
                src={SHOWROOM_IMAGE}
                alt="Showroom Vũ Bách Auto"
                width={700}
                height={520}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-brand p-5 text-white shadow-xl sm:block">
              <p className="font-display text-3xl font-extrabold">10+</p>
              <p className="text-sm font-medium">Năm kinh nghiệm</p>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <Reveal direction="left">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            Vì sao chọn chúng tôi
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Đối tác tin cậy cho chiếc xe của bạn
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            Với hơn một thập kỷ trong nghề, Vũ Bách Auto tự hào mang đến trải nghiệm mua bán xe minh
            bạch, an tâm và chuyên nghiệp.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
            {CORE_VALUES.map((value) => (
              <div key={value.title} className="border-t-2 border-charcoal pt-4">
                <DynamicIcon name={value.icon} className="text-xl text-brand" />
                <p className="mt-3 font-bold text-charcoal">{value.title}</p>
                <p className="mt-1 text-sm text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>

          <ul className="mt-6 space-y-2.5">
            {COMMITMENTS.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal">
                <CheckCircleFilled className="mt-0.5 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="mt-8 inline-flex rounded-lg bg-charcoal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-charcoal-soft"
          >
            Tìm hiểu về chúng tôi
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
