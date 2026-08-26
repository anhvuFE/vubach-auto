'use client';

import { useEffect, useState } from 'react';
import {
  App,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Upload,
  type UploadProps,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BRANDS, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from '@/constants/filters';
import { uploadImage } from '@/services/imageUpload';
import type { Car, CarCondition, CarInput, CarStatus } from '@/types/car';

const CONDITIONS: CarCondition[] = ['Mới', 'Như mới', 'Tốt', 'Trung bình'];
const STATUSES: { label: string; value: CarStatus }[] = [
  { label: 'Đang bán', value: 'available' },
  { label: 'Đã cọc', value: 'reserved' },
  { label: 'Đã bán', value: 'sold' },
];

interface CarFormModalProps {
  open: boolean;
  /** Car being edited, or null when creating a new one. */
  car: Car | null;
  onCancel: () => void;
  onSubmit: (values: CarInput) => void;
}

type FormValues = Omit<CarInput, 'mainImage'>;

const emptyValues: Partial<FormValues> = {
  transmission: 'Số tự động',
  fuelType: 'Xăng',
  bodyType: 'Sedan',
  condition: 'Như mới',
  status: 'available',
  seats: 5,
  origin: 'Nhập khẩu',
  features: [],
  images: [],
  isFeatured: false,
};

export default function CarFormModal({ open, car, onCancel, onSubmit }: CarFormModalProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (car) {
      form.setFieldsValue({ ...car });
    } else {
      form.resetFields();
      form.setFieldsValue(emptyValues);
    }
  }, [open, car, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const images = values.images ?? [];
      onSubmit({ ...values, images, mainImage: images[0] ?? '' });
    } catch {
      /* inline validation */
    }
  };

  const uploadProps: UploadProps = {
    showUploadList: false,
    accept: 'image/*',
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      setUploading(true);
      const result = await uploadImage(file as File);
      setUploading(false);
      if (result.success && result.url) {
        const current = form.getFieldValue('images') ?? [];
        form.setFieldValue('images', [...current, result.url]);
        message.success('Đã thêm ảnh');
        onSuccess?.(result);
      } else {
        message.error(result.error ?? 'Upload thất bại');
        onError?.(new Error(result.error));
      }
    },
  };

  return (
    <Modal
      open={open}
      title={car ? 'Chỉnh sửa xe' : 'Thêm xe mới'}
      onCancel={onCancel}
      onOk={handleOk}
      okText={car ? 'Lưu thay đổi' : 'Thêm xe'}
      cancelText="Huỷ"
      width={760}
      okButtonProps={{ style: { background: '#2563eb' } }}
      styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
    >
      <Form form={form} layout="vertical" requiredMark={false} className="mt-4">
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Form.Item name="brand" label="Hãng xe" rules={[{ required: true, message: 'Bắt buộc' }]}>
            <Select
              showSearch
              placeholder="Chọn hãng"
              options={BRANDS.map((b) => ({ label: b, value: b }))}
            />
          </Form.Item>
          <Form.Item name="model" label="Dòng xe" rules={[{ required: true, message: 'Bắt buộc' }]}>
            <Input placeholder="VD: Camry 2.5Q" />
          </Form.Item>
        </div>

        <div className="grid gap-x-4 sm:grid-cols-3">
          <Form.Item name="year" label="Năm SX" rules={[{ required: true, message: 'Bắt buộc' }]}>
            <InputNumber className="w-full" min={1990} max={2100} placeholder="2024" />
          </Form.Item>
          <Form.Item name="price" label="Giá (VND)" rules={[{ required: true, message: 'Bắt buộc' }]}>
            <InputNumber<number>
              className="w-full"
              min={0}
              step={10_000_000}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={(v) => Number((v ?? '').replace(/\./g, '')) as number}
              placeholder="559000000"
            />
          </Form.Item>
          <Form.Item name="mileage" label="Số km" rules={[{ required: true, message: 'Bắt buộc' }]}>
            <InputNumber className="w-full" min={0} step={1000} placeholder="15000" />
          </Form.Item>
        </div>

        <div className="grid gap-x-4 sm:grid-cols-3">
          <Form.Item name="transmission" label="Hộp số">
            <Select options={TRANSMISSIONS} />
          </Form.Item>
          <Form.Item name="fuelType" label="Nhiên liệu">
            <Select options={FUEL_TYPES} />
          </Form.Item>
          <Form.Item name="bodyType" label="Kiểu dáng">
            <Select options={BODY_TYPES} />
          </Form.Item>
        </div>

        <div className="grid gap-x-4 sm:grid-cols-3">
          <Form.Item name="condition" label="Tình trạng">
            <Select options={CONDITIONS.map((c) => ({ label: c, value: c }))} />
          </Form.Item>
          <Form.Item name="seats" label="Số chỗ">
            <InputNumber className="w-full" min={2} max={16} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Select options={STATUSES} />
          </Form.Item>
        </div>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <Form.Item name="color" label="Màu sắc" rules={[{ required: true, message: 'Bắt buộc' }]}>
            <Input placeholder="Trắng" />
          </Form.Item>
          <Form.Item name="origin" label="Xuất xứ">
            <Input placeholder="Nhập khẩu / Lắp ráp trong nước" />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Bắt buộc' }]}
        >
          <Input.TextArea rows={3} placeholder="Mô tả chi tiết về xe..." />
        </Form.Item>

        <Form.Item name="features" label="Trang bị & tiện nghi (Enter để thêm)">
          <Select mode="tags" placeholder="Nhập tính năng rồi nhấn Enter" open={false} />
        </Form.Item>

        <Form.Item label="Hình ảnh (URL hoặc tải lên — ảnh đầu tiên là ảnh chính)">
          <Form.Item name="images" noStyle>
            <Select mode="tags" placeholder="Dán URL ảnh rồi nhấn Enter" open={false} />
          </Form.Item>
          <Upload {...uploadProps} className="mt-2 block">
            <button
              type="button"
              disabled={uploading}
              className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-brand hover:text-brand"
            >
              <UploadOutlined /> {uploading ? 'Đang tải...' : 'Tải ảnh lên'}
            </button>
          </Upload>
        </Form.Item>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <Form.Item name="contactPhone" label="SĐT liên hệ">
            <Input placeholder="0975224557" />
          </Form.Item>
          <Form.Item name="contactName" label="Người liên hệ">
            <Input placeholder="Mr. Vũ Bách" />
          </Form.Item>
        </div>

        <div className="mb-2 mt-2 text-sm font-semibold text-charcoal">Lịch sử & kiểm định</div>
        <div className="grid gap-x-4 sm:grid-cols-3">
          <Form.Item name="ownerCount" label="Số đời chủ">
            <InputNumber className="w-full" min={1} max={20} placeholder="1" />
          </Form.Item>
          <Form.Item name="registrationExpiry" label="Hạn đăng kiểm">
            <Input placeholder="VD: 06/2026" />
          </Form.Item>
          <Form.Item name="inspectionPoints" label="Số điểm kiểm định">
            <InputNumber className="w-full" min={0} max={500} placeholder="128" />
          </Form.Item>
        </div>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Form.Item name="inspected" label="Đã kiểm định" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="accidentFree" label="Không đâm đụng, ngập nước" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        <Form.Item name="isFeatured" label="Xe nổi bật (hiển thị trang chủ)" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}
