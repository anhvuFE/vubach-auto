'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Loading from '@/components/common/Loading';
import AdminDashboard from './AdminDashboard';

/**
 * Guards the CMS: shows the dashboard to an authenticated admin, and redirects
 * everyone else to the dedicated /login page (with a return path). The shared
 * Loading spinner covers the session-bootstrap window and the redirect itself.
 */
export default function AdminGate() {
  const initialized = useAppSelector((s) => s.auth.initialized);
  const user = useAppSelector((s) => s.auth.user);
  const router = useRouter();
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    if (initialized && !isAdmin) router.replace('/login?redirect=/admin');
  }, [initialized, isAdmin, router]);

  if (!initialized || !isAdmin) {
    return <Loading tip="Đang kiểm tra phiên đăng nhập..." />;
  }

  return <AdminDashboard />;
}
