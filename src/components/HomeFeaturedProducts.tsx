import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import type { Product } from '@/types/product';

interface HomeFeaturedProductsProps {
  products: Product[];
}

export default function HomeFeaturedProducts({ products }: HomeFeaturedProductsProps) {
  const featured = products.slice(0, 4);

  return (
    <section className="bg-[#ECE9E8]/40 border-y border-[#D4C6C2]/40 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80">
            Boutique de Materiais
          </span>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold">Recursos em Destaque</h2>
          <p className="text-[#8A645D]/75 max-w-lg mx-auto text-sm">
            Selecionamos ferramentas práticas, testadas e validadas em consultório para otimizar sua
            rotina terapêutica.
          </p>
        </div>

        <ProductGrid products={featured} variant="featured" columns="home" />

        <div className="text-center mt-12">
          <Link
            href="/materiais"
            className="border border-[#D4C6C2] hover:bg-[#ECE9E8] px-8 py-3.5 rounded-full font-semibold transition-all text-sm inline-flex items-center gap-2"
          >
            <span>Ver Catálogo Completo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
