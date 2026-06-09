import { createClient } from '@/lib/supabase/server';

export interface PublicStats {
  activeTherapists: number;
  totalSales: number;
  activeMaterials: number;
}

export const emptyPublicStats: PublicStats = {
  activeTherapists: 0,
  totalSales: 0,
  activeMaterials: 0,
};

async function fetchPublicStatsFallback(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<PublicStats> {
  const [materialsResult, productsResult] = await Promise.all([
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
    supabase.from('products').select('sales').eq('is_active', true),
  ]);

  const totalSales = (productsResult.data ?? []).reduce(
    (sum, product) => sum + Number(product.sales),
    0,
  );

  return {
    activeTherapists: 0,
    totalSales,
    activeMaterials: materialsResult.count ?? 0,
  };
}

export async function fetchPublicStats(): Promise<PublicStats> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('get_public_stats');

  if (!error && data) {
    const stats = data as Record<string, number>;
    return {
      activeTherapists: Number(stats.activeTherapists ?? 0),
      totalSales: Number(stats.totalSales ?? 0),
      activeMaterials: Number(stats.activeMaterials ?? 0),
    };
  }

  if (error && !error.message.includes('get_public_stats')) {
    console.error('Erro ao buscar estatísticas públicas:', error.message);
  }

  return fetchPublicStatsFallback(supabase);
}

export function formatTherapistCount(count: number): string {
  if (count <= 0) return 'Profissionais';
  if (count >= 500) return `+${Math.floor(count / 100) * 100}`;
  return String(count);
}
