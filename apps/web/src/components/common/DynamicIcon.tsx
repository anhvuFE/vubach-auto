import {
  CarOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  AuditOutlined,
  BankOutlined,
  SolutionOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  HeartOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

/** Maps a content icon key (from constants) to an Ant Design icon element. */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  car: CarOutlined,
  dollar: DollarOutlined,
  safety: SafetyCertificateOutlined,
  audit: AuditOutlined,
  bank: BankOutlined,
  solution: SolutionOutlined,
  tool: ToolOutlined,
  check: CheckCircleOutlined,
  heart: HeartOutlined,
  thunderbolt: ThunderboltOutlined,
};

export default function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? CarOutlined;
  return <Icon className={className} />;
}
