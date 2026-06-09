import { createClient } from '@/lib/supabase/client';

export interface AdminProfileResult {
  id: string;
  name: string;
  email: string;
  crp: string;
  role: string;
}

export async function searchProfilesByEmail(query: string): Promise<AdminProfileResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) {
    return [];
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, crp, role')
    .ilike('email', `%${trimmed}%`)
    .order('email')
    .limit(8);

  if (error) {
    console.error('Erro ao buscar perfis:', error.message);
    return [];
  }

  return data ?? [];
}

export async function fetchApprovedProductIdsForUser(userId: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('purchases')
    .select('product_id')
    .eq('user_id', userId)
    .eq('status', 'approved');

  if (error) {
    console.error('Erro ao buscar compras do usuário:', error.message);
    return [];
  }

  return (data ?? []).map((row) => row.product_id);
}
