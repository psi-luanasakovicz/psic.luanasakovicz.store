import Link from 'next/link';
import { Layers, Sparkles } from 'lucide-react';
import {
  getFeaturedInteractiveApp,
} from '@/lib/interactive-apps';

export default function InteractiveAppPromo() {
  const app = getFeaturedInteractiveApp();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#EEF5F2] via-[#FBF0F3] to-[#EEF5F2] border border-[#C8DDD4] rounded-[2.5rem] p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8A8B8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#88B7A5]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 relative z-10 max-w-xl text-left">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#527A6B] bg-[#FBF0F3] px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A8B8]" />
            {app.badge}
          </span>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#88B7A5]">
            {app.title}
          </h2>
          <p className="text-sm text-[#527A6B]/85 leading-relaxed">{app.description}</p>
          <p className="text-xs text-[#527A6B]/70">
            Experimente a demo gratuita ou adquira o material para usar sem limites na sua Área do
            Cliente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0">
          <a
            href={app.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#E8A8B8]/60 hover:bg-[#FBF0F3] text-[#527A6B] px-6 py-3.5 rounded-full font-semibold transition-all text-sm text-center"
          >
            Experimentar demo
          </a>
          <Link
            href={`/materiais/${app.slug}`}
            className="bg-[#88B7A5] hover:bg-[#72A190] text-white px-6 py-3.5 rounded-full font-semibold transition-all text-sm text-center inline-flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Ver no catálogo
          </Link>
        </div>
      </div>

      <p className="text-[10px] text-[#527A6B]/55 text-center mt-3">
        Acesso completo ao app após a compra, na Área do Cliente.
      </p>
    </section>
  );
}
