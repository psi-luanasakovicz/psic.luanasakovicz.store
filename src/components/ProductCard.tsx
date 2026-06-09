import Link from 'next/link';
import { BookOpen, Check, ChevronRight, Sparkles } from 'lucide-react';
import ProductCover from '@/components/ProductCover';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  variant?: 'featured' | 'catalog';
}

export default function ProductCard({ product, variant = 'featured' }: ProductCardProps) {
  if (variant === 'catalog') {
    return (
      <div className="bg-[#ECE9E8] border border-[#D4C6C2]/60 rounded-[2rem] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
        <ProductCover
          product={product}
          className="h-40 p-6 flex flex-col justify-between relative"
        >
          <span className="bg-[#F3F1F0] text-[#8A645D] text-[10px] font-bold px-3 py-1 rounded-full uppercase self-start">
            {product.category}
          </span>
          <div className="text-left">
            <span className="bg-white/40 text-xs px-2.5 py-1 rounded-full text-[#8A645D] font-medium backdrop-blur-sm">
              {product.pages}
            </span>
          </div>
        </ProductCover>

        <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
          <div className="space-y-2 text-left">
            <h3 className="font-serif-brand text-xl font-bold leading-tight">{product.title}</h3>
            <p className="text-xs text-[#8A645D]/80 line-clamp-3">{product.description}</p>
          </div>

          <div className="space-y-1 text-xs text-[#8A645D]/70 pt-2">
            <p className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 flex-shrink-0" /> {product.format}
            </p>
            {product.bonus && (
              <p className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" /> {product.bonus}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-[#D4C6C2]/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#8A645D]/50 block uppercase">Valor Comercial</span>
              <span className="font-serif-brand text-lg font-bold">
                R$ {product.price.toFixed(2)}
              </span>
            </div>
            <Link
              href={`/materiais/${product.slug}`}
              className="bg-[#8A645D] hover:bg-[#76514B] text-[#F3F1F0] text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1"
            >
              <span>Detalhes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ECE9E8] border border-[#D4C6C2]/60 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-[#8A645D]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <ProductCover
        product={product}
        className="h-48 relative p-6 flex flex-col justify-between border-b border-[#D4C6C2]/40"
      >
        <div className="flex justify-between items-start">
          <span className="bg-[#F3F1F0] text-[#8A645D] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
          {product.badge && (
            <span className="bg-[#8A645D] text-white text-[9px] px-2 py-0.5 rounded-full font-medium">
              {product.badge}
            </span>
          )}
        </div>

        <div className="space-y-1 text-left">
          {!product.coverImageUrl && (
            <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#8A645D] shadow-sm mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
          )}
          <p className="text-xs text-[#8A645D]/70 font-semibold">{product.pages}</p>
        </div>
      </ProductCover>

      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif-brand text-lg font-bold leading-snug hover:text-[#76514B] transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-[#8A645D]/80 line-clamp-2">{product.subtitle}</p>
        </div>

        <div className="pt-4 border-t border-[#D4C6C2]/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#8A645D]/60 block uppercase">Valor</span>
            <span className="font-serif-brand text-lg font-bold">R$ {product.price.toFixed(2)}</span>
          </div>
          <Link
            href={`/materiais/${product.slug}`}
            className="bg-[#8A645D] hover:bg-[#76514B] text-[#F3F1F0] text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1"
          >
            <span>Saiba Mais</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
