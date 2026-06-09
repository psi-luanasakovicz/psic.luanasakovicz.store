'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, authLoading } = useApp();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user.isLoggedIn) {
      router.replace('/login');
      return;
    }

    if (!user.isAdmin) {
      router.replace('/biblioteca');
      return;
    }

    setReady(true);
  }, [authLoading, user.isLoggedIn, user.isAdmin, router]);

  if (authLoading || !ready) {
    return (
      <div className="py-24 text-center text-sm text-[#527A6B]/70">
        Verificando permissões...
      </div>
    );
  }

  return <>{children}</>;
}
