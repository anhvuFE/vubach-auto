'use client';

import { useState } from 'react';
import { App, DatePicker, Form, Input, Modal } from 'antd';
import type { Dayjs } from 'dayjs';
import { PhoneOutlined, CalendarOutlined, CarOutlined, MessageOutlined } from '@ant-design/icons';
import { SITE } from '@/constants/site';
import { formatPrice } from '@/utils/format';
import { carDisplayName, type Car } from '@/types/car';
import { createBooking, type BookingKind } from '@/services/bookings';

type LeadKind = BookingKind | null;

interface LeadForm {
  name: string;
  phone: string;
  date?: Dayjs;
  note?: string;
}

export default function CarContactCard({ car }: { car: Car }) {
  const { message } = App.useApp();
  const [form] = Form.useForm<LeadForm>();
  const [kind, setKind] = useState<LeadKind>(null);
  const [submitting, setSubmitting] = useState(false);

  const title = kind === 'test-drive' ? 'Đăng ký lái thử' : 'Đặt lịch xem xe';

  const handleSubmit = async () => {
    let values: LeadForm;
    try {
      values = await form.validateFields();
    } catch {
      return; // validation errors shown inline
    }
    if (!kind) return;

    setSubmitting(true);
    try {
      await createBooking({
        kind,
        carSlug: car.slug,
        carName: carDisplayName(car),
        name: values.name,
        phone: values.phone,
        preferredDate: values.date ? values.date.toISOString() : null,
        note: values.note ?? null,
      });
      setKind(null);
      form.resetFields();
      message.success('Đã gửi yêu cầu! Vũ Bách Auto sẽ liên hệ với bạn sớm nhất.');
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Gửi yêu cầu thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
      <p className="text-sm text-gray-500">Giá niêm yết</p>
      <p className="font-display text-3xl font-extrabold text-brand">{formatPrice(car.price)}</p>
      <p className="mt-1 text-xs text-gray-400">Giá có thể thương lượng · Hỗ trợ trả góp 80%</p>

      <div className="mt-5 flex flex-col gap-2.5">
        <a
          href={`tel:${car.contactPhone ?? SITE.hotline}`}
          className="flex items-center justify-center gap-2 rounded-lg bg-brand py-3 text-base font-bold text-white shadow-md transition-colors hover:bg-brand-dark"
        >
          <PhoneOutlined /> Gọi ngay: {car.contactPhone ?? SITE.hotline}
        </a>
        <a
          href={`https://zalo.me/${SITE.zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#0068ff] py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
        >
          <MessageOutlined /> Nhắn tin Zalo
        </a>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setKind('test-drive')}
            className="flex items-center justify-center gap-2 rounded-lg border border-charcoal/15 py-3 text-sm font-bold text-charcoal transition-colors hover:border-brand hover:text-brand"
          >
            <CarOutlined /> Lái thử
          </button>
          <button
            type="button"
            onClick={() => setKind('schedule')}
            className="flex items-center justify-center gap-2 rounded-lg border border-charcoal/15 py-3 text-sm font-bold text-charcoal transition-colors hover:border-brand hover:text-brand"
          >
            <CalendarOutlined /> Đặt lịch
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm">
        <p className="font-semibold text-charcoal">{car.contactName ?? SITE.owner}</p>
        <p className="mt-0.5 text-gray-500">Tư vấn viên · {SITE.workingHours}</p>
      </div>

      <Modal
        open={kind !== null}
        title={title}
        onCancel={() => setKind(null)}
        onOk={handleSubmit}
        okText="Gửi yêu cầu"
        cancelText="Huỷ"
        confirmLoading={submitting}
        maskClosable={!submitting}
        okButtonProps={{ style: { background: '#2563eb' } }}
      >
        <p className="mb-4 text-sm text-gray-500">
          Xe quan tâm: <span className="font-semibold text-charcoal">{carDisplayName(car)}</span>
        </p>
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input size="large" placeholder="Nguyễn Văn A" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^0\d{9}$/, message: 'Số điện thoại không hợp lệ' },
            ]}
          >
            <Input size="large" placeholder="09xxxxxxxx" />
          </Form.Item>
          <Form.Item name="date" label={kind === 'test-drive' ? 'Ngày lái thử' : 'Ngày xem xe'}>
            <DatePicker size="large" className="w-full" format="DD/MM/YYYY" placeholder="Chọn ngày" />
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={3} placeholder="Nội dung bạn muốn trao đổi thêm..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
