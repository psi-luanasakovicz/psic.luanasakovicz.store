'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'Como recebo os materiais após o pagamento?',
    a: 'Imediatamente após a confirmação do pagamento, os arquivos estarão disponíveis para visualização e download em alta resolução diretamente na sua "Área do Cliente" nesta plataforma. Um e-mail com as instruções também será enviado automaticamente.',
  },
  {
    q: 'Posso usar os recursos com quantos pacientes quiser?',
    a: 'Sim. A aquisição concede a licença pessoal e de uso clínico ilimitado para você aplicar com seus próprios pacientes durante as sessões. É proibida, contudo, a revenda, partilha ou distribuição comercial dos ficheiros.',
  },
  {
    q: 'Os materiais estão atualizados e corrigidos?',
    a: 'Sempre. Mantemos um padrão rigoroso de qualidade. Quando há atualizações normativas ou melhorias estéticas nos e-books e manuais, disponibilizamos as novas versões sem qualquer custo adicional para quem já adquiriu.',
  },
  {
    q: 'Vocês realizam reembolsos?',
    a: 'Por se tratar de produtos digitais com entrega imediata, oferecemos garantia incondicional de 7 dias. Caso entenda que o material não se adequa à sua clínica, basta entrar em contato para estorno imediato.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80">
          Suporte e Dúvidas
        </span>
        <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold">Perguntas Frequentes</h2>
        <p className="text-sm text-[#8A645D]/75">
          Esclareça suas principais dúvidas sobre o uso e licenciamento dos nossos materiais
          digitais.
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_ITEMS.map((faq, idx) => (
          <div
            key={faq.q}
            className="bg-[#ECE9E8] rounded-2xl border border-[#D4C6C2]/60 overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left p-6 flex justify-between items-center font-serif-brand font-bold text-[#8A645D] hover:opacity-90 focus:outline-none"
            >
              <span className="pr-4">{faq.q}</span>
              <span className="transform transition-transform duration-300 text-[#8A645D]/60 text-xl font-normal">
                {openIndex === idx ? '−' : '+'}
              </span>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 text-xs sm:text-sm text-[#8A645D]/80 leading-relaxed border-t border-[#D4C6C2]/30 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
