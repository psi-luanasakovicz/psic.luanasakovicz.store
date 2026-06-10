import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSiteBaseUrl, isMercadoPagoCheckoutEnabled } from '@/lib/mercadopago/config';
import { getMercadoPagoPreferenceApi } from '@/lib/mercadopago/client';

interface CheckoutBody {
  productId?: string;
}

export async function POST(request: Request) {
  if (!isMercadoPagoCheckoutEnabled()) {
    return NextResponse.json({ error: 'Checkout Mercado Pago desabilitado.' }, { status: 503 });
  }

  let body: CheckoutBody;

  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: 'Corpo da requisição inválido.' }, { status: 400 });
  }

  if (!body.productId) {
    return NextResponse.json({ error: 'productId é obrigatório.' }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Faça login para continuar.' }, { status: 401 });
  }

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, title, price, slug, is_active')
    .eq('id', body.productId)
    .maybeSingle();

  if (productError || !product || !product.is_active) {
    return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 });
  }

  const { data: existingPurchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', product.id)
    .eq('status', 'approved')
    .maybeSingle();

  if (existingPurchase) {
    return NextResponse.json({ error: 'Você já possui este material.' }, { status: 409 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('email, name')
    .eq('id', user.id)
    .maybeSingle();

  const { data: purchase, error: purchaseError } = await supabase
    .from('purchases')
    .insert({
      user_id: user.id,
      product_id: product.id,
      amount: product.price,
      status: 'pending',
    })
    .select('id')
    .single();

  if (purchaseError || !purchase) {
    return NextResponse.json(
      { error: purchaseError?.message ?? 'Erro ao iniciar checkout.' },
      { status: 500 },
    );
  }

  const baseUrl = getSiteBaseUrl();
  const preferenceApi = getMercadoPagoPreferenceApi();

  try {
    const preference = await preferenceApi.create({
      body: {
        items: [
          {
            id: product.id,
            title: product.title,
            quantity: 1,
            unit_price: Number(product.price),
            currency_id: 'BRL',
          },
        ],
        payer: {
          email: profile?.email || user.email || undefined,
          name: profile?.name || undefined,
        },
        external_reference: purchase.id,
        metadata: {
          purchase_id: purchase.id,
          product_id: product.id,
          user_id: user.id,
        },
        back_urls: {
          success: `${baseUrl}/catalogo/checkout/resultado?status=success&purchase_id=${purchase.id}`,
          failure: `${baseUrl}/catalogo/checkout/resultado?status=failure&purchase_id=${purchase.id}`,
          pending: `${baseUrl}/catalogo/checkout/resultado?status=pending&purchase_id=${purchase.id}`,
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      },
    });

    const checkoutUrl = preference.init_point || preference.sandbox_init_point;

    if (!checkoutUrl) {
      return NextResponse.json({ error: 'Mercado Pago não retornou URL de checkout.' }, { status: 502 });
    }

    return NextResponse.json({
      checkoutUrl,
      purchaseId: purchase.id,
      preferenceId: preference.id,
    });
  } catch (error) {
    console.error('Erro ao criar preferência Mercado Pago:', error);
    return NextResponse.json({ error: 'Não foi possível iniciar o pagamento.' }, { status: 502 });
  }
}
