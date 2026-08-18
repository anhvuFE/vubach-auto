'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { App, Button, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginThunk, logoutThunk } from '@/store/slices/authSlice';

/** Email/password login form. On success as an admin, navigates to `redirectTo`. */
export default function AdminLogin({ redirectTo = '/admin' }: { redirectTo?: string }) {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const submitting = useAppSelector((s) => s.auth.status === 'loading');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      message.warning('Vui lòng nhập email và mật khẩu');
      return;
    }

    const action = await dispatch(loginThunk({ email, password }));
    if (loginThunk.rejected.match(action)) {
      message.error('Email hoặc mật khẩu không đúng');
      return;
    }

    // Only admins may enter the CMS; sign a non-admin straight back out.
    if (action.payload.role !== 'ADMIN') {
      message.error('Tài khoản không có quyền quản trị');
      await dispatch(logoutThunk());
      return;
    }
    message.success('Đăng nhập thành công');
    router.replace(redirectTo);
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
          Đăng nhập để truy cập trang quản lý xe.
        </p>
        <Input
          size="large"
          className="mt-6"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onPressEnter={handleLogin}
          prefix={<MailOutlined />}
          autoComplete="email"
        />
        <Input.Password
          size="large"
          className="mt-3"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPressEnter={handleLogin}
          prefix={<LockOutlined />}
          autoComplete="current-password"
        />
        <Button
          type="primary"
          size="large"
          block
          loading={submitting}
          className="mt-4 font-bold"
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}
