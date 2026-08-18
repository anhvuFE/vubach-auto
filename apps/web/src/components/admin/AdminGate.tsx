'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { useAppSelector } from '@/store/hooks';
import AdminDashboard from './AdminDashboard';

/**
 * Guards the CMS: shows the dashboard to an authenticated admin, and redirects
 * everyone else to the dedicated /login page (with a return path). A spinner
 * covers the brief session-bootstrap window and the redirect itself.
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
    return (
      <div className="flex min-h-[70vh] items-center justify-center pt-24">
        <Spin size="large" />
      </div>
    );
  }

  return <AdminDashboard />;
}
