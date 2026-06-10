import { NextResponse } from 'next/server';
import { approvePurchasePayment } from '@/lib/mercadopago/approve-purchase';
import { getMercadoPagoPaymentApi } from '@/lib/mercadopago/client';
import { getMercadoPagoAccessToken, isMercadoPagoCheckoutEnabled } from '@/lib/mercadopago/config';

const APPROVED_STATUSES = new Set(['approved', 'authorized']);

async function processPaymentNotification(paymentId: string) {
  const paymentApi = getMercadoPagoPaymentApi();
  const payment = await paymentApi.get({ id: paymentId });

  const purchaseId = payment.external_reference;
  const status = payment.status;

  if (!purchaseId) {
    return { ok: false, error: 'Pagamento sem external_reference.' };
  }

  if (!status || !APPROVED_STATUSES.has(status)) {
    return { ok: true, skipped: true, status };
  }

  return approvePurchasePayment(purchaseId, String(payment.id));
}

export async function GET(request: Request) {
  if (!isMercadoPagoCheckoutEnabled()) {
    return NextResponse.json({ ok: true, disabled: true });
  }

  if (!getMercadoPagoAccessToken()) {
    return NextResponse.json({ error: 'Token Mercado Pago ausente.' }, { status: 500 });
  }

  const url = new URL(request.url);
  const topic = url.searchParams.get('topic') ?? url.searchParams.get('type');
  const id = url.searchParams.get('id') ?? url.searchParams.get('data.id');

  if (topic === 'payment' && id) {
    try {
      const result = await processPaymentNotification(id);
      return NextResponse.json(result);
    } catch (error) {
      console.error('Erro no webhook Mercado Pago (GET):', error);
      return NextResponse.json({ error: 'Falha ao processar webhook.' }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, ignored: true });
}

export async function POST(request: Request) {
  if (!isMercadoPagoCheckoutEnabled()) {
    return NextResponse.json({ ok: true, disabled: true });
  }

  if (!getMercadoPagoAccessToken()) {
    return NextResponse.json({ error: 'Token Mercado Pago ausente.' }, { status: 500 });
  }

  try {
    const body = (await request.json()) as {
      type?: string;
      action?: string;
      data?: { id?: string | number };
    };

    const paymentId =
      body?.data?.id !== undefined && body?.data?.id !== null ? String(body.data.id) : null;

    if ((body.type === 'payment' || body.action?.startsWith('payment.')) && paymentId) {
      const result = await processPaymentNotification(paymentId);
      return NextResponse.json(result);
    }

    return NextResponse.json({ ok: true, ignored: true });
  } catch (error) {
    console.error('Erro no webhook Mercado Pago (POST):', error);
    return NextResponse.json({ error: 'Falha ao processar webhook.' }, { status: 500 });
  }
}
