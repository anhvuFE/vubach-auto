'use client';

import { useAppSelector } from '@/store/hooks';
import Loading from '@/components/common/Loading';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

/**
 * Shows the dashboard to an authenticated admin, the login gate otherwise.
 * While the session is being restored on load, shows a spinner so we don't
 * flash the login form for an already-signed-in admin.
 */
export default function AdminGate() {
  const initialized = useAppSelector((s) => s.auth.initialized);
  const user = useAppSelector((s) => s.auth.user);

  if (!initialized) {
    return <Loading tip="Đang kiểm tra phiên đăng nhập..." />;
  }

  const isAdmin = user?.role === 'ADMIN';
  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
}
