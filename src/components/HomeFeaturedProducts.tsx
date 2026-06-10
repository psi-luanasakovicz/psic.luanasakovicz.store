import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { hasInteractiveApp } from '@/lib/interactive-apps';
import type { Product } from '@/types/product';

interface HomeFeaturedProductsProps {
  products: Product[];
}

export default function HomeFeaturedProducts({ products }: HomeFeaturedProductsProps) {
  const featured = [...products]
    .sort((a, b) => {
      if (hasInteractiveApp(a.slug)) return -1;
      if (hasInteractiveApp(b.slug)) return 1;
      return 0;
    })
    .slice(0, 4);

  return (
    <section className="bg-[#EEF5F2]/40 border-y border-[#C8DDD4]/40 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#527A6B]/80">
            Boutique de Materiais
          </span>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold">Recursos em Destaque</h2>
          <p className="text-[#527A6B]/75 max-w-lg mx-auto text-sm">
            Selecionamos ferramentas práticas, testadas e validadas em consultório para otimizar sua
            rotina terapêutica.
          </p>
        </div>

        <ProductGrid products={featured} variant="featured" columns="home" />

        <div className="text-center mt-12">
          <Link
            href="/catalogo"
            className="border border-[#C8DDD4] hover:bg-[#EEF5F2] px-8 py-3.5 rounded-full font-semibold transition-all text-sm inline-flex items-center gap-2"
          >
            <span>Ver Catálogo Completo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
