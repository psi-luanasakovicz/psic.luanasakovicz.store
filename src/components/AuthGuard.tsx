'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, authLoading } = useApp();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user.isLoggedIn) {
      router.replace('/login');
      return;
    }

    setReady(true);
  }, [authLoading, user.isLoggedIn, router]);

  if (authLoading || !ready) {
    return (
      <div className="py-24 text-center text-sm text-[#8A645D]/70">
        Carregando sua sessão...
      </div>
    );
  }

  return <>{children}</>;
}
