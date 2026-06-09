'use client';

import Link from 'next/link';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import type { InteractiveApp } from '@/lib/interactive-apps';
import type { Product } from '@/types/product';

interface InteractiveAppFrameProps {
  app: InteractiveApp;
  product: Product;
}

export default function InteractiveAppFrame({ app, product }: InteractiveAppFrameProps) {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col bg-[#F8FAF9]">
      <div className="border-b border-[#C8DDD4]/40 bg-[#F8FAF9]/95 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1 text-left">
          <Link
            href={`/biblioteca/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#527A6B]/70 hover:text-[#527A6B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao material
          </Link>
          <h1 className="font-serif-brand text-lg sm:text-xl font-bold text-[#88B7A5]">
            {app.title}
          </h1>
          <p className="text-[11px] text-[#527A6B]/70">{product.title}</p>
        </div>

        <a
          href={app.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 border border-[#C8DDD4] hover:bg-[#EEF5F2] text-xs font-semibold px-4 py-2 rounded-full transition-all self-start sm:self-auto"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          Abrir em nova aba
        </a>
      </div>

      <iframe
        src={app.appUrl}
        title={app.title}
        className="flex-1 w-full min-h-[70vh] border-0 bg-white"
        allow="fullscreen"
      />
    </div>
  );
}
