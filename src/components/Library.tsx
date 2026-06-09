'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Info, Printer } from 'lucide-react';
import ProductDownloads from '@/components/ProductDownloads';
import { useApp } from '@/context/AppContext';
import { theme } from '@/lib/theme';
import type { Product } from '@/types/product';

interface LibraryProps {
  product: Product;
}

export default function Library({ product }: LibraryProps) {
  const { user, showToast } = useApp();
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4C6C2]/40 pb-6">
        <div className="space-y-1 text-left">
          <Link
            href="/biblioteca"
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-85 mb-2 text-[#8A645D]/70"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para Área do Cliente</span>
          </Link>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">{product.title}</h1>
          <p className="text-xs text-[#8A645D]/85 italic">{product.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="border border-[#D4C6C2] hover:bg-[#ECE9E8] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all self-start"
        >
          <Printer className="w-4 h-4" /> Imprimir leitura
        </button>
      </div>

      <ProductDownloads
        productId={product.id}
        files={product.deliveryFiles}
        onError={showToast}
        onSuccess={showToast}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-[#ECE9E8] border border-[#D4C6C2] rounded-3xl p-6 space-y-4">
          <h3 className="font-serif-brand font-bold text-sm tracking-wide border-b border-[#D4C6C2]/40 pb-2">
            Conteúdo Disponível
          </h3>

          <div className="space-y-2">
            {product.contents.map((sect, idx) => (
              <button
                key={sect.title}
                type="button"
                onClick={() => setActiveSection(idx)}
                className={`w-full text-left p-3.5 rounded-2xl text-xs transition-all flex items-center justify-between ${
                  activeSection === idx
                    ? 'bg-[#8A645D] text-white shadow-sm'
                    : 'bg-[#F3F1F0] hover:bg-[#F3F1F0]/70'
                }`}
              >
                <span className="font-semibold line-clamp-1">{sect.title}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-80" />
              </button>
            ))}
          </div>

          <div className="bg-[#F3F1F0] rounded-2xl p-4 text-xs space-y-2 text-[#8A645D]/80">
            <p className="font-semibold flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Dica de Uso Clínico
            </p>
            <p className="text-[11px] leading-relaxed">
              Você pode projetar esta tela diretamente do seu tablet ou notebook durante o
              atendimento online para realizar as leituras de forma interativa com o paciente.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 md:p-12 shadow-sm text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A645D]/5 rounded-full blur-2xl" />

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between items-center text-[10px] text-[#8A645D]/50 border-b border-[#D4C6C2]/40 pb-4">
              <span>Leitor Digital • Luana Sakovicz</span>
              <span className="font-mono">Ψ Licenciado para {user.name}</span>
            </div>

            <div className="space-y-4 min-h-[300px]">
              <h2 className="font-serif-brand text-2xl font-bold">
                {product.contents[activeSection]?.title || 'Selecione uma seção'}
              </h2>
              <p className="text-sm leading-relaxed text-[#8A645D]/95">
                {product.contents[activeSection]?.text || 'Nenhum conteúdo carregado para esta seção.'}
              </p>
            </div>

            <div className="border-t border-[#D4C6C2]/40 pt-4 flex items-center justify-between text-xs text-[#8A645D]/60">
              <span>
                Página {activeSection + 1} de {product.contents.length}
              </span>
              <span>{theme.contact.crp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
