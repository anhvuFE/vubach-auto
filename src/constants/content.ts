/**
 * Static marketing content (services, stats, values). Kept out of components so
 * copy can be edited in one place and later swapped for a CMS feed.
 */

export interface ServiceItem {
  icon: string; // Ant Design icon name (resolved in component)
  title: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    icon: 'car',
    title: 'Mua bán xe cũ',
    description:
      'Kho xe đa dạng phân khúc, đã qua kiểm định 100%, giấy tờ pháp lý minh bạch, giá tốt nhất thị trường.',
  },
  {
    icon: 'dollar',
    title: 'Thu mua xe',
    description:
      'Thu mua mọi dòng xe với giá cao, thẩm định nhanh, thanh toán trong ngày, thủ tục gọn nhẹ.',
  },
  {
    icon: 'safety',
    title: 'Ký gửi xe',
    description:
      'Nhận ký gửi bán xe hộ, hỗ trợ chụp ảnh, đăng tin, tìm khách nhanh, chi phí hợp lý.',
  },
  {
    icon: 'audit',
    title: 'Định giá xe',
    description:
      'Định giá miễn phí, chính xác theo thị trường, giúp bạn nắm rõ giá trị chiếc xe của mình.',
  },
  {
    icon: 'bank',
    title: 'Hỗ trợ trả góp',
    description:
      'Liên kết nhiều ngân hàng, trả góp tới 80% giá trị xe, lãi suất ưu đãi, giải ngân nhanh.',
  },
  {
    icon: 'solution',
    title: 'Hỗ trợ sang tên',
    description:
      'Hỗ trợ trọn gói thủ tục sang tên, rút hồ sơ, đăng ký biển số nhanh chóng, đúng quy định.',
  },
  {
    icon: 'tool',
    title: 'Kiểm định xe',
    description:
      'Kiểm tra kỹ thuật toàn diện bởi kỹ thuật viên giàu kinh nghiệm trước khi bàn giao.',
  },
];

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: StatItem[] = [
  { value: 500, suffix: '+', label: 'Xe đã bán' },
  { value: 10, suffix: '+', label: 'Năm kinh nghiệm' },
  { value: 1000, suffix: '+', label: 'Khách hàng tin tưởng' },
  { value: 100, suffix: '%', label: 'Xe được kiểm định' },
];

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export const CORE_VALUES: ValueItem[] = [
  {
    icon: 'safety',
    title: 'Uy tín',
    description: 'Cam kết minh bạch thông tin, đúng chất lượng như mô tả.',
  },
  {
    icon: 'check',
    title: 'Chất lượng',
    description: 'Mỗi chiếc xe đều qua quy trình kiểm định nghiêm ngặt.',
  },
  {
    icon: 'heart',
    title: 'Tận tâm',
    description: 'Đồng hành, tư vấn tận tình trước và sau khi mua xe.',
  },
  {
    icon: 'thunderbolt',
    title: 'Nhanh chóng',
    description: 'Thủ tục gọn nhẹ, bàn giao xe và sang tên nhanh.',
  },
];

export const COMMITMENTS: string[] = [
  'Xe kiểm định chất lượng 100%, không đâm đụng, không ngập nước',
  'Giấy tờ pháp lý minh bạch, hỗ trợ sang tên nhanh chóng',
  'Hỗ trợ trả góp lãi suất ưu đãi lên tới 80% giá trị xe',
  'Bảo hành, bảo dưỡng và hỗ trợ kỹ thuật sau bán hàng',
  'Cam kết mua lại hoặc đổi xe trong thời gian quy định',
];
