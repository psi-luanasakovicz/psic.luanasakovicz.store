import { createClient } from '@/lib/supabase/client';

export interface RevokeProductAccessResult {
  ok: boolean;
  error?: string;
}

interface RevokeRpcResponse {
  ok?: boolean;
  error?: string;
}

export async function revokeProductAccessFromUser(
  userId: string,
  productId: string,
): Promise<RevokeProductAccessResult> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('admin_revoke_product_access', {
    p_user_id: userId,
    p_product_id: productId,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const result = data as RevokeRpcResponse | null;

  if (!result?.ok) {
    return { ok: false, error: mapRevokeError(result?.error) };
  }

  return { ok: true };
}

function mapRevokeError(code?: string): string {
  switch (code) {
    case 'FORBIDDEN':
      return 'Acesso negado.';
    case 'NOT_FOUND':
      return 'Este cliente não possui acesso ativo a este material.';
    default:
      return code ?? 'Erro ao revogar acesso.';
  }
}
