import { createClient } from '@/lib/supabase/client';
import { mapProductRow } from '@/lib/mappers/product';
import type { Product } from '@/types/product';

export async function fetchAllProductsAdmin(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar produtos (admin):', error.message);
    return [];
  }

  return (data ?? []).map(mapProductRow);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle();

  if (error || !data) {
    if (error) console.error('Erro ao buscar produto:', error.message);
    return null;
  }

  return mapProductRow(data);
}
