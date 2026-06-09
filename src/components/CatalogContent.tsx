'use client';

import { useMemo, useState } from 'react';
import { Info } from 'lucide-react';
import CatalogFilters from '@/components/CatalogFilters';
import ProductGrid from '@/components/ProductGrid';
import type { FilterCategory, Product } from '@/types/product';

interface CatalogContentProps {
  products: Product[];
}

export default function CatalogContent({ products }: CatalogContentProps) {
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(
    () =>
      products.filter((p) => {
        const matchesCategory = filterCategory === 'Todos' || p.category === filterCategory;
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [products, filterCategory, searchQuery],
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="text-center md:text-left space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80 bg-[#ECE9E8] px-3 py-1 rounded-full inline-block">
          Galeria Exclusiva
        </span>
        <h1 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold">
          Catálogo de Recursos
        </h1>
        <p className="text-sm text-[#8A645D]/85 max-w-xl">
          Navegue pelas ferramentas de intervenção e materiais de apoio criados para enriquecer o
          trabalho clínico em cada fase do desenvolvimento.
        </p>
      </div>

      <CatalogFilters
        filterCategory={filterCategory}
        searchQuery={searchQuery}
        onFilterChange={setFilterCategory}
        onSearchChange={setSearchQuery}
      />

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} variant="catalog" columns="catalog" />
      ) : (
        <div className="text-center py-16 bg-[#ECE9E8] rounded-2xl border border-[#D4C6C2] max-w-md mx-auto space-y-4">
          <Info className="w-8 h-8 text-[#8A645D]/60 mx-auto" />
          <p className="font-serif-brand text-lg font-bold">Nenhum recurso encontrado</p>
          <p className="text-xs text-[#8A645D]/70">
            Tente ajustar seus filtros ou termos de pesquisa.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('Todos');
              setSearchQuery('');
            }}
            className="bg-[#8A645D] text-white px-4 py-2 rounded-full text-xs font-semibold"
          >
            Ver Todos
          </button>
        </div>
      )}
    </div>
  );
}
