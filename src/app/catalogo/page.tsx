import CatalogContent from '@/components/CatalogContent';
import { fetchActiveProducts } from '@/lib/products-server';

export const dynamic = 'force-dynamic';

export default async function CatalogoPage() {
  const products = await fetchActiveProducts();
  return <CatalogContent products={products} />;
}
