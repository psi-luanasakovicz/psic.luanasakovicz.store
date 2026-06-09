import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { formatTherapistCount, type PublicStats } from '@/lib/public-stats';

interface HeroSectionProps {
  stats: PublicStats;
}

export default function HeroSection({ stats }: HeroSectionProps) {
  const therapistLabel = formatTherapistCount(stats.activeTherapists);
  const materialsLabel =
    stats.activeMaterials > 0 ? String(stats.activeMaterials) : 'Vários';

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl space-y-6">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#527A6B]/90 bg-[#FBF0F3] px-3.5 py-1.5 rounded-full">
          Consultório Digital & Recursos
        </span>
        <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-bold text-[#88B7A5] leading-tight">
          Recursos que guiam, acolhem e{' '}
          <span className="italic font-normal font-serif-brand text-[#E8A8B8]">transformam</span>.
        </h1>
        <p className="text-[#527A6B]/80 text-base sm:text-lg max-w-xl leading-relaxed">
          Materiais terapêuticos e ferramentas clínicas baseados em evidência científica, criados
          para estruturar sessões de psicologia de forma lúdica, empática e altamente profissional.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/materiais"
            className="bg-[#88B7A5] hover:bg-[#72A190] text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-[#88B7A5]/10 hover:shadow-[#88B7A5]/20 transform hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explorar Materiais</span>
          </Link>
          <a
            href="#benefits"
            className="border border-[#E8A8B8]/60 hover:bg-[#FBF0F3] px-8 py-4 rounded-full font-semibold transition-all text-sm text-[#527A6B]"
          >
            Conhecer Proposta
          </a>
        </div>

        <div className="pt-8 border-t border-[#C8DDD4]/40 grid grid-cols-3 gap-4">
          <div>
            <p className="font-serif-brand text-2xl font-bold">100%</p>
            <p className="text-xs text-[#527A6B]/75">Embasamento Clínico</p>
          </div>
          <div>
            <p className="font-serif-brand text-2xl font-bold">
              {stats.activeTherapists > 0 ? therapistLabel : '—'}
            </p>
            <p className="text-xs text-[#527A6B]/75">
              {stats.activeTherapists === 1 ? 'Terapeuta' : 'Terapeutas na plataforma'}
            </p>
          </div>
          <div>
            <p className="font-serif-brand text-2xl font-bold">{materialsLabel}</p>
            <p className="text-xs text-[#527A6B]/75">Materiais disponíveis</p>
          </div>
        </div>
      </div>
    </section>
  );
}
