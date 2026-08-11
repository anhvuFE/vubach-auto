'use client';

import { useState } from 'react';
import { App, Button, Form, Input, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { CARS } from '@/data/cars';
import { carDisplayName } from '@/types/car';
import type { ContactFormValues } from '@/types/common';

const carOptions = CARS.filter((c) => c.status === 'available').map((c) => ({
  label: `${carDisplayName(c)} ${c.year}`,
  value: c.slug,
}));

export default function ContactForm() {
  const { message } = App.useApp();
  const [form] = Form.useForm<ContactFormValues>();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async () => {
    setSubmitting(true);
    // Simulate an async API call; replace with a real endpoint later.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    form.resetFields();
    message.success('Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ sớm nhất.');
  };

  return (
    <Form form={form} layout="vertical" requiredMark={false} onFinish={handleFinish}>
      <div className="grid gap-x-4 sm:grid-cols-2">
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
      </div>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
        >
          <Input size="large" placeholder="email@example.com" />
        </Form.Item>
        <Form.Item name="carInterested" label="Xe quan tâm">
          <Select
            size="large"
            showSearch
            allowClear
            placeholder="Chọn xe (nếu có)"
            optionFilterProp="label"
            options={carOptions}
          />
        </Form.Item>
      </div>

      <Form.Item
        name="message"
        label="Nội dung"
        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
      >
        <Input.TextArea rows={4} placeholder="Bạn cần chúng tôi hỗ trợ điều gì?" />
      </Form.Item>

      <Button
        htmlType="submit"
        type="primary"
        size="large"
        loading={submitting}
        icon={<SendOutlined />}
        className="w-full font-bold sm:w-auto"
      >
        Gửi yêu cầu
      </Button>
    </Form>
  );
}
