'use client';

import { Search } from 'lucide-react';
import { FILTER_CATEGORIES, type FilterCategory } from '@/types/product';

interface CatalogFiltersProps {
  filterCategory: FilterCategory;
  searchQuery: string;
  onFilterChange: (category: FilterCategory) => void;
  onSearchChange: (query: string) => void;
}

export default function CatalogFilters({
  filterCategory,
  searchQuery,
  onFilterChange,
  onSearchChange,
}: CatalogFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-[#D4C6C2]/40">
      <div className="flex flex-wrap gap-2">
        {FILTER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onFilterChange(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filterCategory === cat
                ? 'bg-[#8A645D] text-white'
                : 'bg-[#ECE9E8] text-[#8A645D]/80 hover:bg-[#D4C6C2]/40 border border-[#D4C6C2]/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative max-w-xs w-full">
        <Search className="w-4 h-4 text-[#8A645D]/60 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Pesquisar materiais..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#ECE9E8] border border-[#D4C6C2] rounded-full pl-10 pr-4 py-2 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]/80 transition-colors placeholder-[#8A645D]/50"
        />
      </div>
    </div>
  );
}
