import { createClient } from '@/lib/supabase/server';
import { mapProductRow } from '@/lib/mappers/product';
import type { Product } from '@/types/product';

export async function fetchActiveProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar produtos:', error.message);
    return [];
  }

  return (data ?? []).map(mapProductRow);
}

export async function fetchProductBySlug(
  slug: string,
  options?: { includeInactive?: boolean },
): Promise<Product | null> {
  const supabase = await createClient();
  let query = supabase.from('products').select('*').eq('slug', slug);

  if (!options?.includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    if (error) console.error('Erro ao buscar produto:', error.message);
    return null;
  }

  return mapProductRow(data);
}
