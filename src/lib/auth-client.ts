import { createClient } from '@/lib/supabase/client';
import type { ProfileRow, PurchaseRow, ProductRow, LicenseRow } from '@/types/database';
import type { Purchase } from '@/types/purchase';
import type { ClinicalLicense } from '@/types/license';
import { EMPTY_USER, type User } from '@/types/user';

export type PurchaseWithProduct = PurchaseRow & {
  products: ProductRow | null;
};

export function mapProfileToUser(profile: ProfileRow | null, isLoggedIn: boolean): User {
  if (!profile || !isLoggedIn) {
    return EMPTY_USER;
  }

  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    crp: profile.crp,
    role: profile.role,
    memberSince: profile.created_at
      ? new Date(profile.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : undefined,
    isLoggedIn: true,
    isAdmin: profile.role === 'admin',
  };
}

export async function fetchProfileByUserId(userId: string): Promise<ProfileRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Erro ao buscar profile:', error.message);
    return null;
  }

  return data;
}

export async function fetchUserPurchases(userId: string): Promise<PurchaseWithProduct[]> {
  const supabase = createClient();

  const { data: purchases, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar compras:', error.message);
    return [];
  }

  if (!purchases?.length) {
    return [];
  }

  const productIds = [...new Set(purchases.map((p) => p.product_id))];
  const { data: products } = await supabase.from('products').select('*').in('id', productIds);
  const productMap = new Map((products ?? []).map((p) => [p.id, p]));

  return purchases.map((purchase) => ({
    ...purchase,
    products: productMap.get(purchase.product_id) ?? null,
  }));
}

export async function fetchUserLicenses(userId: string): Promise<LicenseRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar licenças:', error.message);
    return [];
  }

  return data ?? [];
}

export function mapPurchaseRow(row: PurchaseWithProduct): Purchase {
  const productTitle = row.products?.title ?? 'Material';
  const date = new Date(row.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const statusMap: Record<string, Purchase['status']> = {
    approved: 'Pago',
    pending: 'Pendente',
    refunded: 'Reembolsado',
  };

  return {
    id: row.id,
    productId: row.product_id,
    productTitle,
    amount: Number(row.amount),
    date,
    status: statusMap[row.status] ?? 'Pendente',
  };
}

export function mapLicenseRow(row: LicenseRow): ClinicalLicense {
  return {
    id: row.id,
    holderName: '',
    crp: '',
    status: row.status === 'active' ? 'Ativa' : 'Inativa',
    description: '',
    licenseCode: row.license_code,
    productId: row.product_id,
  };
}

export async function userOwnsProduct(userId: string, productId: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .eq('status', 'approved')
    .maybeSingle();

  if (error) {
    console.error('Erro ao verificar compra:', error.message);
    return false;
  }

  return Boolean(data);
}
