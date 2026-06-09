'use client';

import { Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#88B7A5] text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 transition-all transform duration-300 animate-bounce">
      <Sparkles className="w-5 h-5 flex-shrink-0 text-[#F8FAF9]" />
      <p className="text-sm font-medium">{toastMessage}</p>
    </div>
  );
}
