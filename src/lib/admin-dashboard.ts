import { createClient } from '@/lib/supabase/client';

export interface AdminRecentPurchase {
  id: string;
  amount: number;
  createdAt: string;
  userName: string;
  userEmail: string;
  productTitle: string;
}

export interface AdminClientAccess {
  purchaseId: string;
  productId: string;
  productTitle: string;
  amount: number;
  createdAt: string;
}

export interface AdminClientRow {
  id: string;
  name: string;
  email: string;
  crp: string;
  role: string;
  createdAt: string;
  accesses: AdminClientAccess[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export async function fetchRecentPurchases(limit = 12): Promise<AdminRecentPurchase[]> {
  const supabase = createClient();

  const { data: purchases, error } = await supabase
    .from('purchases')
    .select('id, amount, created_at, user_id, product_id')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error || !purchases?.length) {
    if (error) console.error('Erro ao buscar vendas recentes:', error.message);
    return [];
  }

  const userIds = [...new Set(purchases.map((row) => row.user_id))];
  const productIds = [...new Set(purchases.map((row) => row.product_id))];

  const [{ data: profiles }, { data: products }] = await Promise.all([
    supabase.from('profiles').select('id, name, email').in('id', userIds),
    supabase.from('products').select('id, title').in('id', productIds),
  ]);

  const profileMap = new Map((profiles ?? []).map((row) => [row.id, row]));
  const productMap = new Map((products ?? []).map((row) => [row.id, row.title]));

  return purchases.map((row) => {
    const profile = profileMap.get(row.user_id);
    return {
      id: row.id,
      amount: Number(row.amount),
      createdAt: formatDate(row.created_at),
      userName: profile?.name || 'Sem nome',
      userEmail: profile?.email || '—',
      productTitle: productMap.get(row.product_id) ?? 'Material',
    };
  });
}

export async function fetchAdminClients(limit = 40): Promise<AdminClientRow[]> {
  const supabase = createClient();

  const [{ data: profiles, error: profilesError }, { data: purchases, error: purchasesError }] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('id, name, email, crp, role, created_at')
        .order('created_at', { ascending: false })
        .limit(limit),
      supabase
        .from('purchases')
        .select('id, user_id, product_id, amount, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false }),
    ]);

  if (profilesError) {
    console.error('Erro ao buscar clientes:', profilesError.message);
    return [];
  }

  if (purchasesError) {
    console.error('Erro ao buscar acessos:', purchasesError.message);
  }

  const productIds = [...new Set((purchases ?? []).map((row) => row.product_id))];
  const { data: products } = productIds.length
    ? await supabase.from('products').select('id, title').in('id', productIds)
    : { data: [] };

  const productMap = new Map((products ?? []).map((row) => [row.id, row.title]));
  const accessesByUser = new Map<string, AdminClientAccess[]>();

  for (const purchase of purchases ?? []) {
    const list = accessesByUser.get(purchase.user_id) ?? [];
    list.push({
      purchaseId: purchase.id,
      productId: purchase.product_id,
      productTitle: productMap.get(purchase.product_id) ?? 'Material',
      amount: Number(purchase.amount),
      createdAt: formatDate(purchase.created_at),
    });
    accessesByUser.set(purchase.user_id, list);
  }

  return (profiles ?? [])
    .filter((profile) => profile.role !== 'admin')
    .map((profile) => ({
      id: profile.id,
      name: profile.name,
      email: profile.email,
      crp: profile.crp,
      role: profile.role,
      createdAt: formatDate(profile.created_at),
      accesses: accessesByUser.get(profile.id) ?? [],
    }));
}

export interface ProductSalesInsight {
  id: string;
  title: string;
  sales: number;
  price: number;
  isActive: boolean;
}

export function buildProductInsights(
  products: { id: string; title: string; sales: number; price: number; isActive?: boolean }[],
): ProductSalesInsight[] {
  return [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5)
    .map((product) => ({
      id: product.id,
      title: product.title,
      sales: product.sales,
      price: product.price,
      isActive: product.isActive !== false,
    }));
}
