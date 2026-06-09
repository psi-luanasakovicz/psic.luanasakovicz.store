import { isSimulatedCheckoutEnabled } from '@/lib/checkout-config';
import { createClient } from '@/lib/supabase/client';

function generateLicenseCode(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `LUANA-${date}-${random}`;
}

export async function simulatePurchase(
  userId: string,
  productId: string,
  amount: number,
): Promise<{ error: string | null }> {
  if (!isSimulatedCheckoutEnabled()) {
    return { error: 'CHECKOUT_DISABLED' };
  }

  const supabase = createClient();

  const { data: existing } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .eq('status', 'approved')
    .maybeSingle();

  if (existing) {
    return { error: 'ALREADY_OWNED' };
  }

  const { data: purchase, error: purchaseError } = await supabase
    .from('purchases')
    .insert({
      user_id: userId,
      product_id: productId,
      amount,
      status: 'approved',
    })
    .select('id')
    .single();

  if (purchaseError || !purchase) {
    return { error: purchaseError?.message ?? 'Erro ao registrar compra.' };
  }

  const { error: licenseError } = await supabase.from('licenses').insert({
    user_id: userId,
    product_id: productId,
    purchase_id: purchase.id,
    license_code: generateLicenseCode(),
    status: 'active',
  });

  if (licenseError) {
    return { error: licenseError.message };
  }

  await supabase.rpc('increment_product_sales', { p_product_id: productId });

  return { error: null };
}
