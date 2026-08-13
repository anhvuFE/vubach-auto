import { InboxOutlined } from '@ant-design/icons';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = 'Không tìm thấy xe phù hợp',
  description = 'Hãy thử điều chỉnh bộ lọc hoặc từ khoá tìm kiếm của bạn.',
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl text-gray-400">
        {icon ?? <InboxOutlined />}
      </span>
      <h3 className="mt-4 font-display text-xl font-bold text-charcoal">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
