import Library from '@/components/Library';
import { requirePurchasedProduct } from '@/lib/product-access';

export const dynamic = 'force-dynamic';

interface LibraryReaderPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LibraryReaderPage({ params }: LibraryReaderPageProps) {
  const { slug } = await params;
  const { product } = await requirePurchasedProduct(slug);
  return <Library product={product} />;
}
