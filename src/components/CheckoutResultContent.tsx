'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Clock3, XCircle } from 'lucide-react';
import { DashboardPrimaryButton, DashboardShell } from '@/components/dashboard/DashboardUI';

export default function CheckoutResultContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') ?? 'pending';

  const content =
    status === 'success'
      ? {
          icon: CheckCircle2,
          title: 'Pagamento confirmado',
          description:
            'Seu acesso já deve aparecer na Minha Área. Se acabou de pagar via Pix, pode levar alguns segundos.',
          accent: 'text-green-700',
        }
      : status === 'failure'
        ? {
            icon: XCircle,
            title: 'Pagamento não concluído',
            description:
              'O pagamento foi cancelado ou recusado. Você pode tentar novamente a partir da página do material.',
            accent: 'text-red-700',
          }
        : {
            icon: Clock3,
            title: 'Pagamento em processamento',
            description:
              'Pix e boleto podem levar alguns minutos. Assim que o Mercado Pago confirmar, o material aparecerá na sua área.',
            accent: 'text-amber-700',
          };

  const Icon = content.icon;

  return (
    <DashboardShell>
      <div className="max-w-xl mx-auto bg-white border border-[#C8DDD4]/60 rounded-[2rem] p-8 sm:p-10 text-center space-y-5 shadow-sm">
        <div
          className={`w-16 h-16 rounded-2xl bg-[#EEF5F2] border border-[#C8DDD4]/60 flex items-center justify-center mx-auto ${content.accent}`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif-brand text-2xl font-bold text-[#527A6B]">{content.title}</h1>
          <p className="text-sm text-[#527A6B]/80 leading-relaxed">{content.description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/biblioteca">
            <DashboardPrimaryButton>Ir para Minha Área</DashboardPrimaryButton>
          </Link>
          <Link
            href="/catalogo"
            className="border border-[#C8DDD4] hover:bg-[#EEF5F2] text-[#527A6B] text-sm font-semibold px-5 py-2.5 rounded-full transition-all inline-flex items-center justify-center"
          >
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}
