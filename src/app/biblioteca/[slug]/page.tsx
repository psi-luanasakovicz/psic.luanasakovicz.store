import { notFound, redirect } from 'next/navigation';
import Library from '@/components/Library';
import { fetchProductBySlug } from '@/lib/products-server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface LibraryReaderPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LibraryReaderPage({ params }: LibraryReaderPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

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

  return <Library product={product} />;
}
