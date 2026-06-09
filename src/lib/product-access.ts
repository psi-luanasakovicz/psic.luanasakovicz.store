import { notFound, redirect } from 'next/navigation';
import { getInteractiveApp } from '@/lib/interactive-apps';
import { fetchProductBySlug } from '@/lib/products-server';
import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/types/product';

export async function requireAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return { supabase, user };
}

export async function requirePurchasedProduct(slug: string): Promise<{
  product: Product;
  userId: string;
}> {
  const { supabase, user } = await requireAuthenticatedUser();

  const product = await fetchProductBySlug(slug, { includeInactive: true });
  if (!product) {
    notFound();
  }

  const { data: purchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', product.id)
    .eq('status', 'approved')
    .maybeSingle();

  if (!purchase) {
    notFound();
  }

  return { product, userId: user.id };
}

export async function requirePurchasedInteractiveApp(slug: string) {
  const app = getInteractiveApp(slug);
  if (!app) {
    notFound();
  }

  const { product } = await requirePurchasedProduct(slug);
  return { app, product };
}
