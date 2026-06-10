import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import { fetchProductBySlug } from '@/lib/products-server';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
