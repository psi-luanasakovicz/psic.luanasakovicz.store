import { createClient } from '@/lib/supabase/client';

export interface GrantProductAccessResult {
  ok: boolean;
  error?: string;
  licenseCode?: string;
}

interface GrantRpcResponse {
  ok?: boolean;
  error?: string;
  license_code?: string;
}

export async function grantProductAccessToUser(
  userId: string,
  productId: string,
  amount?: number,
): Promise<GrantProductAccessResult> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('admin_grant_product_access', {
    p_user_id: userId,
    p_product_id: productId,
    p_amount: amount ?? null,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const result = data as GrantRpcResponse | null;

  if (!result?.ok) {
    return { ok: false, error: mapGrantError(result?.error) };
  }

  return { ok: true, licenseCode: result.license_code };
}

function mapGrantError(code?: string): string {
  switch (code) {
    case 'FORBIDDEN':
      return 'Acesso negado. Apenas administradores podem liberar materiais.';
    case 'USER_NOT_FOUND':
      return 'Conta não encontrada.';
    case 'PRODUCT_NOT_FOUND':
      return 'Material não encontrado.';
    case 'ALREADY_OWNED':
      return 'Esta conta já possui acesso a este material.';
    default:
      return code ?? 'Erro ao liberar acesso.';
  }
}
