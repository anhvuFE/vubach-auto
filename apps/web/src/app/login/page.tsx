'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spin } from 'antd';
import { useAppSelector } from '@/store/hooks';
import AdminLogin from '@/components/admin/AdminLogin';

const Loading = () => (
  <div className="flex min-h-[70vh] items-center justify-center pt-24">
    <Spin size="large" />
  </div>
);

function LoginPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialized = useAppSelector((s) => s.auth.initialized);
  const user = useAppSelector((s) => s.auth.user);

  // Only allow same-path redirects to avoid open-redirect abuse.
  const redirectParam = searchParams.get('redirect');
  const redirectTo =
    redirectParam && redirectParam.startsWith('/') ? redirectParam : '/admin';

  // An already-signed-in admin has no business on the login page.
  useEffect(() => {
    if (initialized && user?.role === 'ADMIN') router.replace(redirectTo);
  }, [initialized, user, redirectTo, router]);

  if (!initialized || user?.role === 'ADMIN') return <Loading />;
  return <AdminLogin redirectTo={redirectTo} />;
}

export default function LoginPage() {
  // useSearchParams requires a Suspense boundary during prerender.
  return (
    <Suspense fallback={<Loading />}>
      <LoginPageInner />
    </Suspense>
  );
}
