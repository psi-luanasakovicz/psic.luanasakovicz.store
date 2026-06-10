import { Suspense } from 'react';
import CheckoutResultContent from '@/components/CheckoutResultContent';

export default function CheckoutResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center text-sm text-[#527A6B]/70">
          Carregando...
        </div>
      }
    >
      <CheckoutResultContent />
    </Suspense>
  );
}
