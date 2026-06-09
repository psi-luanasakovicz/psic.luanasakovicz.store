import Link from 'next/link';
import { BookOpen, Check, ChevronRight, Layers, Sparkles } from 'lucide-react';
import ProductCover from '@/components/ProductCover';
import { getInteractiveApp } from '@/lib/interactive-apps';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  variant?: 'featured' | 'catalog';
}

export default function ProductCard({ product, variant = 'featured' }: ProductCardProps) {
  const interactiveApp = getInteractiveApp(product.slug);

  if (variant === 'catalog') {
    return (
      <div className="bg-[#EEF5F2] border border-[#C8DDD4]/60 rounded-[2rem] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
        <ProductCover
          product={product}
          className="h-40 p-6 flex flex-col justify-between relative"
        >
          <span className="bg-[#F8FAF9] text-[#527A6B] text-[10px] font-bold px-3 py-1 rounded-full uppercase self-start">
            {product.category}
          </span>
          <div className="text-left">
            <span className="bg-white/40 text-xs px-2.5 py-1 rounded-full text-[#527A6B] font-medium backdrop-blur-sm">
              {product.pages}
            </span>
          </div>
        </ProductCover>

        <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
          <div className="space-y-2 text-left">
            <div className="flex items-start gap-2 flex-wrap">
              <h3 className="font-serif-brand text-xl font-bold leading-tight">{product.title}</h3>
              {interactiveApp && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-[#FBF0F3] text-[#527A6B] px-2 py-0.5 rounded-full">
                  <Layers className="w-3 h-3" />
                  {interactiveApp.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-[#527A6B]/80 line-clamp-3">{product.description}</p>
          </div>

          <div className="space-y-1 text-xs text-[#527A6B]/70 pt-2">
            <p className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 flex-shrink-0" /> {product.format}
            </p>
            {product.bonus && (
              <p className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" /> {product.bonus}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-[#C8DDD4]/40 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#527A6B]/50 block uppercase">Valor Comercial</span>
                <span className="font-serif-brand text-lg font-bold">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
              <Link
                href={`/materiais/${product.slug}`}
                className="bg-[#88B7A5] hover:bg-[#72A190] text-[#F8FAF9] text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1"
              >
                <span>Detalhes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {interactiveApp && (
              <a
                href={interactiveApp.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold text-[#527A6B]/80 hover:text-[#88B7A5] text-center transition-colors"
              >
                Experimentar demo do baralho →
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EEF5F2] border border-[#C8DDD4]/60 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-[#88B7A5]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <ProductCover
        product={product}
        className="h-48 relative p-6 flex flex-col justify-between border-b border-[#C8DDD4]/40"
      >
        <div className="flex justify-between items-start">
          <span className="bg-[#F8FAF9] text-[#527A6B] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
          {product.badge && (
            <span className="bg-[#88B7A5] text-white text-[9px] px-2 py-0.5 rounded-full font-medium">
              {product.badge}
            </span>
          )}
          {interactiveApp && (
            <span className="bg-[#E8A8B8] text-white text-[9px] px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {interactiveApp.badge}
            </span>
          )}
        </div>

        <div className="space-y-1 text-left">
          {!product.coverImageUrl && (
            <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#527A6B] shadow-sm mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
          )}
          <p className="text-xs text-[#527A6B]/70 font-semibold">{product.pages}</p>
        </div>
      </ProductCover>

      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif-brand text-lg font-bold leading-snug hover:text-[#72A190] transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-[#527A6B]/80 line-clamp-2">{product.subtitle}</p>
        </div>

        <div className="pt-4 border-t border-[#C8DDD4]/40 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#527A6B]/60 block uppercase">Valor</span>
              <span className="font-serif-brand text-lg font-bold">R$ {product.price.toFixed(2)}</span>
            </div>
            <Link
              href={`/materiais/${product.slug}`}
              className="bg-[#88B7A5] hover:bg-[#72A190] text-[#F8FAF9] text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1"
            >
              <span>Saiba Mais</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {interactiveApp && (
            <a
              href={interactiveApp.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[10px] font-semibold text-[#527A6B]/75 hover:text-[#88B7A5] transition-colors"
            >
              Demo do baralho interativo →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
