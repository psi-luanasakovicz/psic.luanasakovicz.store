import Link from 'next/link';
import { ChevronRight, Heart, Printer, ShieldCheck, ShoppingBag } from 'lucide-react';
import FAQ from '@/components/FAQ';
import HeroSection from '@/components/HeroSection';
import HomeFeaturedProducts from '@/components/HomeFeaturedProducts';
import Testimonials from '@/components/Testimonials';
import { fetchActiveProducts } from '@/lib/products-server';
import { emptyPublicStats, fetchPublicStats } from '@/lib/public-stats';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [products, stats] = await Promise.all([fetchActiveProducts(), fetchPublicStats()]);

  return (
    <div>
      <HeroSection stats={stats ?? emptyPublicStats} />

      <HomeFeaturedProducts products={products} />

      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#527A6B]/80 bg-[#FBF0F3] px-3.5 py-1.5 rounded-full">
              Diferenciais
            </span>
            <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold leading-tight text-[#88B7A5]">
              Materiais pensados com cuidado para elevar o nível da sua prática.
            </h2>
            <p className="text-sm text-[#527A6B]/85 leading-relaxed">
              A prática clínica de psicologia exige recursos que combinem rigor científico com uma
              linguagem clara e uma apresentação impecável. Meus materiais são projetados para atuar
              como facilitadores da aliança terapêutica.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#88B7A5]/10 flex items-center justify-center text-[#527A6B] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-brand font-semibold text-base">
                    Rigor Científico e Ético
                  </h4>
                  <p className="text-xs text-[#527A6B]/75 mt-1">
                    Materiais totalmente respaldados pela TCC e de acordo com o Código de Ética do
                    CFP.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#88B7A5]/10 flex items-center justify-center text-[#527A6B] flex-shrink-0">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-brand font-semibold text-base">
                    Pronto para Imprimir ou Preencher
                  </h4>
                  <p className="text-xs text-[#527A6B]/75 mt-1">
                    Ficheiros organizados para impressão de excelência em alta definição e versões
                    interativas em PDF.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#E8A8B8]/20 flex items-center justify-center text-[#527A6B] flex-shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-brand font-semibold text-base">
                    Design Acolhedor e Sensível
                  </h4>
                  <p className="text-xs text-[#527A6B]/75 mt-1">
                    Identidade estética pensada para não intimidar o paciente, promovendo
                    bem-estar emocional.
                  </p>
                </div>
              </div>
            </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />

      <section className="bg-[#88B7A5] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-semibold bg-white/15 px-3 py-1 rounded-full">
            Explore Hoje Mesmo
          </span>
          <h2 className="font-serif-brand text-3xl sm:text-5xl font-semibold leading-tight">
            Eleve a experiência do seu consultório e encante seus pacientes.
          </h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Ofereça recursos visuais elegantes, cientificamente embasados e acolhedores nas suas
            sessões.
          </p>
          <div className="pt-4">
            <Link
              href="/catalogo"
              className="bg-[#FBF0F3] text-[#527A6B] hover:bg-white font-bold px-8 py-4 rounded-full transition-all text-sm inline-flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Acessar nossa Boutique de Materiais</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
