'use client';

import { useAppSelector } from '@/store/hooks';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

/** Shows the dashboard when authenticated, otherwise the password gate. */
export default function AdminGate() {
  const isAuthenticated = useAppSelector((s) => s.ui.isAdminAuthenticated);
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}
