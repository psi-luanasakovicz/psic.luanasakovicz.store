import { createAdminClient } from '@/lib/supabase/admin';

export async function approvePurchasePayment(
  purchaseId: string,
  paymentReference?: string,
): Promise<{ ok: boolean; error?: string; alreadyApproved?: boolean }> {
  const supabase = createAdminClient();

  const { data, error } = await supabase.rpc('approve_purchase_payment', {
    p_purchase_id: purchaseId,
    p_payment_reference: paymentReference ?? null,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const result = data as { ok?: boolean; error?: string; already_approved?: boolean } | null;

  if (!result?.ok) {
    return { ok: false, error: result?.error ?? 'Falha ao aprovar compra.' };
  }

  return { ok: true, alreadyApproved: Boolean(result.already_approved) };
}
