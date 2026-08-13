'use client';

import { useState } from 'react';
import { App, Button, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store/hooks';
import { setAdminAuthenticated } from '@/store/slices/uiSlice';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin123';

export default function AdminLogin() {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      dispatch(setAdminAuthenticated(true));
      message.success('Đăng nhập thành công');
    } else {
      message.error('Mật khẩu không đúng');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-2xl text-brand">
          <LockOutlined />
        </span>
        <h1 className="mt-4 text-center font-display text-2xl font-extrabold text-charcoal">
          Quản trị viên
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Nhập mật khẩu để truy cập trang quản lý xe.
        </p>
        <Input.Password
          size="large"
          className="mt-6"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPressEnter={handleLogin}
          prefix={<LockOutlined />}
        />
        <Button
          type="primary"
          size="large"
          block
          className="mt-4 font-bold"
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
        <p className="mt-4 text-center text-xs text-gray-400">Mật khẩu mặc định: admin123</p>
      </div>
    </div>
  );
}
