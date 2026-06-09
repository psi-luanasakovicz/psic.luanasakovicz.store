'use client';

import Link from 'next/link';
import { ArrowLeft, Check, MessageCircle, ShoppingBag, Star } from 'lucide-react';
import DeliveryFilesList from '@/components/DeliveryFilesList';
import ProductCover from '@/components/ProductCover';
import { useApp } from '@/context/AppContext';
import {
  CHECKOUT_UNAVAILABLE_MESSAGE,
  isSimulatedCheckoutEnabled,
} from '@/lib/checkout-config';
import { theme } from '@/lib/theme';
import type { Product } from '@/types/product';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { buyProduct } = useApp();
  const simulatedCheckoutEnabled = isSimulatedCheckoutEnabled();
  const whatsappUrl = `${theme.contact.social.whatsapp}?text=${encodeURIComponent(
    `Olá! Gostaria de adquirir o material "${product.title}".`,
  )}`;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <Link
        href="/materiais"
        className="inline-flex items-center gap-2 text-xs font-semibold hover:opacity-85"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para o catálogo</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <ProductCover
            product={product}
            overlay="strong"
            className="aspect-[4/3] sm:aspect-video rounded-[2.5rem] border-2 border-[#D4C6C2] shadow-md p-8 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm ${
                    product.coverImageUrl
                      ? 'bg-white/90 text-[#8A645D]'
                      : 'bg-[#F3F1F0] text-[#8A645D]'
                  }`}
                >
                  {product.category}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    product.coverImageUrl
                      ? 'bg-white/80 backdrop-blur-sm text-[#8A645D]'
                      : 'bg-white/60 backdrop-blur-sm text-[#8A645D]'
                  }`}
                >
                  Ψ
                </div>
              </div>

              <div className="space-y-2 text-left">
                <h2
                  className={`font-serif-brand text-2xl sm:text-3xl font-bold tracking-tight ${
                    product.coverImageUrl ? 'text-white drop-shadow-sm' : ''
                  }`}
                >
                  {product.title}
                </h2>
                <p
                  className={`text-xs italic ${
                    product.coverImageUrl ? 'text-white/90' : 'text-[#8A645D]/80'
                  }`}
                >
                  {product.subtitle}
                </p>
              </div>

              <div
                className={`flex items-center justify-between text-xs font-medium ${
                  product.coverImageUrl ? 'text-white/90' : 'text-[#8A645D]/80'
                }`}
              >
                <span className="bg-white/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {product.pages}
                </span>
                <span className="bg-white/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {product.format}
                </span>
              </div>
            </div>
          </ProductCover>

          <div className="bg-[#ECE9E8] rounded-2xl border border-[#D4C6C2] p-6 space-y-4">
            <h4 className="font-serif-brand font-bold text-sm">Garantias & Processo de Compra</h4>
            <ul className="text-xs text-[#8A645D]/80 space-y-2.5">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>
                  <strong>Download Instantâneo:</strong> Acesso direto após validação bancária ou
                  pix.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>
                  <strong>Licença de uso Clínico:</strong> Use em formato digital ou impresso sem
                  limites de pacientes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>
                  <strong>Atualizações Vitalícias:</strong> Receba correções estéticas ou de
                  conteúdo sem pagar a mais.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80 bg-[#ECE9E8] px-3.5 py-1.5 rounded-full inline-block">
              Ficha Técnica e Detalhes
            </span>
            <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold">{product.title}</h1>
            <p className="text-sm font-semibold italic text-[#8A645D]/80">{product.subtitle}</p>
          </div>

          <div className="flex items-center gap-3 py-2">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-[#8A645D]/80">
              ({product.sales} terapeutas já adquiriram)
            </span>
          </div>

          <p className="text-sm text-[#8A645D]/95 leading-relaxed">{product.description}</p>

          <div className="space-y-3 bg-[#ECE9E8]/30 border border-[#D4C6C2]/40 rounded-2xl p-6">
            <h3 className="font-serif-brand font-bold text-sm">O que está incluído no arquivo:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.details.map((detail) => (
                <div key={detail} className="flex gap-2 items-start text-xs text-[#8A645D]/90">
                  <div className="w-1.5 h-1.5 bg-[#8A645D] rounded-full mt-1.5 flex-shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <DeliveryFilesList files={product.deliveryFiles} />

          <div className="grid grid-cols-3 gap-4 border-y border-[#D4C6C2]/40 py-4 text-xs">
            <div>
              <span className="text-[#8A645D]/60 block uppercase">Páginas/Cartas</span>
              <span className="font-semibold">{product.pages}</span>
            </div>
            <div>
              <span className="text-[#8A645D]/60 block uppercase">Formato</span>
              <span className="font-semibold">{product.format}</span>
            </div>
            <div>
              <span className="text-[#8A645D]/60 block uppercase">Bônus Exclusivo</span>
              <span className="font-semibold text-[#8A645D]">{product.bonus}</span>
            </div>
          </div>

          <div className="bg-[#ECE9E8] rounded-[2rem] border border-[#D4C6C2] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs text-[#8A645D]/75 uppercase">Valor de Investimento</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif-brand text-3xl font-bold">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="text-xs text-[#8A645D]/60">Pagamento Único</span>
              </div>
            </div>

            {simulatedCheckoutEnabled ? (
              <button
                type="button"
                onClick={() => buyProduct(product)}
                className="bg-[#8A645D] hover:bg-[#76514B] text-white px-8 py-4 rounded-full font-bold shadow-md transform hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adquirir Acesso Imediato</span>
              </button>
            ) : (
              <div className="space-y-3 max-w-xs sm:max-w-sm">
                <p className="text-sm text-[#8A645D]/90 leading-relaxed">
                  {CHECKOUT_UNAVAILABLE_MESSAGE}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#8A645D] hover:bg-[#76514B] text-white px-8 py-4 rounded-full font-bold shadow-md transform hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
