import { createClient } from '@/lib/supabase/client';

export interface AdminStats {
  totalRevenue: number;
  monthRevenue: number;
  totalSales: number;
  averageRating: number;
  activeClients: number;
}

export const emptyAdminStats: AdminStats = {
  totalRevenue: 0,
  monthRevenue: 0,
  totalSales: 0,
  averageRating: 0,
  activeClients: 0,
};

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function startOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const supabase = createClient();

  const [purchasesResult, productsResult] = await Promise.all([
    supabase
      .from('purchases')
      .select('amount, created_at, user_id')
      .eq('status', 'approved'),
    supabase.from('products').select('rating, sales'),
  ]);

  if (purchasesResult.error) {
    console.error('Erro ao buscar estatísticas (compras):', purchasesResult.error.message);
  }

  if (productsResult.error) {
    console.error('Erro ao buscar estatísticas (produtos):', productsResult.error.message);
  }

  const purchases = purchasesResult.data ?? [];
  const products = productsResult.data ?? [];
  const monthStart = startOfCurrentMonth();

  let totalRevenue = 0;
  let monthRevenue = 0;
  const clientIds = new Set<string>();

  for (const purchase of purchases) {
    const amount = Number(purchase.amount);
    totalRevenue += amount;
    clientIds.add(purchase.user_id);

    if (new Date(purchase.created_at) >= monthStart) {
      monthRevenue += amount;
    }
  }

  let weightedRating = 0;
  let ratingWeight = 0;

  for (const product of products) {
    const sales = Number(product.sales) || 0;
    const rating = Number(product.rating) || 0;

    if (sales > 0) {
      weightedRating += rating * sales;
      ratingWeight += sales;
    }
  }

  const averageRating =
    ratingWeight > 0
      ? weightedRating / ratingWeight
      : products.length > 0
        ? products.reduce((sum, product) => sum + Number(product.rating), 0) / products.length
        : 0;

  return {
    totalRevenue,
    monthRevenue,
    totalSales: purchases.length,
    averageRating,
    activeClients: clientIds.size,
  };
}
