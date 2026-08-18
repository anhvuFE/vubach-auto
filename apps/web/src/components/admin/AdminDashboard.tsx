'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { App, Button, Popconfirm, Table, Tooltip, type TableColumnsType } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  ReloadOutlined,
  LogoutOutlined,
  CarOutlined,
  TagOutlined,
  CheckCircleOutlined,
  FireOutlined,
  StarFilled,
} from '@ant-design/icons';
import CarFormModal from './CarFormModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addCar, updateCar, deleteCar, resetCars, setCars } from '@/store/slices/carSlice';
import { logoutThunk } from '@/store/slices/authSlice';
import { formatPrice } from '@/utils/format';
import { carDisplayName, type Car, type CarInput, type CarStatus } from '@/types/car';

const STATUS_TAG: Record<
  CarStatus,
  { label: string; pill: string; dot: string }
> = {
  available: {
    label: 'Đang bán',
    pill: 'bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
  },
  reserved: {
    label: 'Đã cọc',
    pill: 'bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
  },
  sold: {
    label: 'Đã bán',
    pill: 'bg-slate-100 text-slate-500',
    dot: 'bg-slate-400',
  },
};

export default function AdminDashboard() {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const cars = useAppSelector((s) => s.cars.items);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Car | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (car: Car) => {
    setEditing(car);
    setModalOpen(true);
  };

  const handleSubmit = (values: CarInput) => {
    if (editing) {
      dispatch(updateCar({ id: editing.id, changes: values }));
      message.success('Đã cập nhật xe');
    } else {
      dispatch(addCar(values));
      message.success('Đã thêm xe mới');
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(cars, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vubach-auto-cars-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    message.success('Đã xuất dữ liệu');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (Array.isArray(data)) {
          dispatch(setCars(data as Car[]));
          message.success('Đã nhập dữ liệu');
        } else {
          message.error('File không hợp lệ');
        }
      } catch {
        message.error('Không thể đọc file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const columns: TableColumnsType<Car> = [
    {
      title: 'Xe',
      dataIndex: 'model',
      render: (_, car) => (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={car.mainImage}
            alt={carDisplayName(car)}
            className="h-12 w-16 rounded-lg object-cover"
          />
          <div>
            <p className="font-semibold text-charcoal">{carDisplayName(car)}</p>
            <p className="text-xs text-gray-400">
              {car.year} · {car.bodyType}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      responsive: ['md'],
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => <span className="font-semibold text-brand">{formatPrice(price)}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      filters: Object.entries(STATUS_TAG).map(([value, { label }]) => ({ text: label, value })),
      onFilter: (value, car) => car.status === value,
      render: (status: CarStatus) => {
        const s = STATUS_TAG[status];
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.pill}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </span>
        );
      },
    },
    {
      title: 'Nổi bật',
      dataIndex: 'isFeatured',
      responsive: ['lg'],
      render: (v: boolean) =>
        v ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            <StarFilled className="text-[10px]" />
            Nổi bật
          </span>
        ) : (
          <span className="text-gray-300">—</span>
        ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, car) => (
        <div className="flex gap-1">
          <Tooltip title="Sửa">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => openEdit(car)}
              className="!text-gray-500 hover:!bg-brand/5 hover:!text-brand"
            />
          </Tooltip>
          <Popconfirm
            title="Xoá xe này?"
            okText="Xoá"
            cancelText="Huỷ"
            okButtonProps={{ danger: true }}
            onConfirm={() => {
              dispatch(deleteCar(car.id));
              message.success('Đã xoá xe');
            }}
          >
            <Tooltip title="Xoá">
              <Button type="text" size="small" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const stats = [
    {
      label: 'Tổng số xe',
      value: cars.length,
      icon: <CarOutlined />,
      accent: 'text-brand',
      bg: 'bg-brand/10',
    },
    {
      label: 'Đang bán',
      value: cars.filter((c) => c.status === 'available').length,
      icon: <TagOutlined />,
      accent: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Đã bán',
      value: cars.filter((c) => c.status === 'sold').length,
      icon: <CheckCircleOutlined />,
      accent: 'text-slate-500',
      bg: 'bg-slate-100',
    },
    {
      label: 'Nổi bật',
      value: cars.filter((c) => c.isFeatured).length,
      icon: <FireOutlined />,
      accent: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className="pt-24">
      <div className="container-page section">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-charcoal">Quản lý xe</h1>
            <p className="mt-1 text-sm text-gray-500">
              Thêm, chỉnh sửa và quản lý kho xe của Vũ Bách Auto.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button icon={<ExportOutlined />} onClick={handleExport}>
              Xuất
            </Button>
            <Button icon={<ImportOutlined />} onClick={() => fileInputRef.current?.click()}>
              Nhập
            </Button>
            <Popconfirm
              title="Khôi phục dữ liệu mẫu?"
              description="Toàn bộ thay đổi hiện tại sẽ bị xoá."
              okText="Khôi phục"
              cancelText="Huỷ"
              onConfirm={() => {
                dispatch(resetCars());
                message.success('Đã khôi phục dữ liệu mẫu');
              }}
            >
              <Button icon={<ReloadOutlined />}>Reset</Button>
            </Popconfirm>
            <Button
              icon={<LogoutOutlined />}
              onClick={() => dispatch(logoutThunk())}
            >
              Đăng xuất
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              hidden
              onChange={handleImport}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-lg"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${stat.bg} ${stat.accent}`}
              >
                {stat.icon}
              </span>
              <div>
                <p className="font-display text-3xl font-extrabold leading-none text-charcoal">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-brand">
            ← Về trang chủ
          </Link>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate} className="font-bold">
            Thêm xe mới
          </Button>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
          <Table<Car>
            rowKey="id"
            columns={columns}
            dataSource={cars}
            pagination={{ pageSize: 8, showSizeChanger: false }}
            scroll={{ x: 640 }}
          />
        </div>
      </div>

      <CarFormModal
        open={modalOpen}
        car={editing}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
