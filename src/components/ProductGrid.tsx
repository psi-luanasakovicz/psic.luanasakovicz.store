import type { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  variant?: 'featured' | 'catalog';
  columns?: 'home' | 'catalog';
}

export default function ProductGrid({
  products,
  variant = 'featured',
  columns = 'home',
}: ProductGridProps) {
  const gridClass =
    columns === 'catalog'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
