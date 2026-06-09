import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Dra. Clarice Mendes',
    role: 'Terapeuta Cognitiva e Autora',
    text: 'Fazer o download do material e ter a segurança de uma anamnese bem montada e com excelente design facilita demais o acolhimento do paciente no início de jornada.',
    stars: 5,
  },
  {
    name: 'Psic. Gabriel Ortiz',
    role: 'Clínica de Adolescentes',
    text: 'Os materiais de Luana têm um toque de empatia único. Os adolescentes se conectam com as imagens, com as perguntas e se sentem ouvidos.',
    stars: 5,
  },
  {
    name: 'Dra. Beatriz Santos',
    role: 'Psicóloga Hospitalar e Docente',
    text: 'Toda a identidade visual exala acolhimento e sofisticação. É como ter um pedacinho da sensibilidade do consultório dela no nosso próprio espaço.',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#ECE9E8]/40 border-t border-[#D4C6C2]/30 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80">
            Depoimentos reais
          </span>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold">
            O que dizem os colegas de profissão
          </h2>
          <p className="text-sm text-[#8A645D]/75 max-w-md mx-auto">
            Parcerias e conexões que se estendem através dos nossos materiais exclusivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-[#F3F1F0] p-8 rounded-3xl border border-[#D4C6C2]/50 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#8A645D]/90 italic leading-relaxed">
                  &quot;{t.text}&quot;
                </p>
              </div>
              <div className="pt-4 border-t border-[#D4C6C2]/30">
                <p className="text-xs font-bold text-[#8A645D]">{t.name}</p>
                <p className="text-[11px] text-[#8A645D]/65">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
