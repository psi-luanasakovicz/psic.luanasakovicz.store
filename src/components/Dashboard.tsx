'use client';

import Link from 'next/link';
import { BookOpen, Layers, Plus, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getInteractiveApp, getInteractiveAppLibraryPath } from '@/lib/interactive-apps';

export default function Dashboard() {
  const { user, purchasedProducts, purchases, licenses } = useApp();
  const primaryLicense = licenses[0];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="bg-[#EEF5F2] rounded-[2rem] border border-[#C8DDD4] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/80">
              Ambiente do Psicólogo
            </span>
          </div>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">Olá, {user.name}!</h1>
          <p className="text-xs text-[#527A6B]/80">
            Bem-vindo ao seu consultório digital. Aqui estão organizados os materiais adquiridos
            para a sua prática diária.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/materiais"
            className="bg-[#88B7A5] hover:bg-[#72A190] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm transition-all flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Material</span>
          </Link>
          <Link
            href="/perfil"
            className="border border-[#C8DDD4] hover:bg-[#C8DDD4]/40 text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
          >
            Meus Dados
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#C8DDD4]/40 pb-2">
            <h3 className="font-serif-brand text-xl font-bold">Seus Recursos Ativos</h3>
            <span className="text-xs text-[#527A6B]/70 font-semibold">
              {purchasedProducts.length} Materiais
            </span>
          </div>

          {purchasedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {purchasedProducts.map((p) => {
                const interactiveApp = getInteractiveApp(p.slug);

                return (
                <div
                  key={p.id}
                  className="bg-[#EEF5F2] border border-[#C8DDD4] rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4 text-left">
                    <div className="flex justify-between items-start">
                      <span className="bg-[#F8FAF9] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-[#527A6B]">
                        {p.category}
                      </span>
                      <span className="text-[10px] text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded-full">
                        Ativo
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif-brand font-bold text-base leading-snug">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-[#527A6B]/75 line-clamp-2">{p.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F8FAF9]/50 border-t border-[#C8DDD4]/50 flex gap-2">
                    {interactiveApp ? (
                      <>
                        <Link
                          href={getInteractiveAppLibraryPath(p.slug)}
                          className="flex-1 bg-[#E8A8B8] hover:bg-[#D892A5] text-white text-[11px] font-bold py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1.5"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Baralho App</span>
                        </Link>
                        <Link
                          href={`/biblioteca/${p.slug}`}
                          className="flex-1 bg-[#88B7A5] hover:bg-[#72A190] text-white text-[11px] font-bold py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Material</span>
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/biblioteca/${p.slug}`}
                        className="flex-1 bg-[#88B7A5] hover:bg-[#72A190] text-white text-[11px] font-bold py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Abrir e Baixar</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#EEF5F2] rounded-2xl border border-[#C8DDD4] space-y-4">
              <BookOpen className="w-8 h-8 text-[#527A6B]/60 mx-auto" />
              <p className="font-serif-brand text-lg font-bold">Nenhum recurso adquirido</p>
              <p className="text-xs text-[#527A6B]/70 max-w-xs mx-auto">
                Explore nosso catálogo boutique e adquira materiais para iniciar o preenchimento.
              </p>
              <Link
                href="/materiais"
                className="inline-block bg-[#88B7A5] text-white px-5 py-2.5 rounded-full text-xs font-semibold"
              >
                Ver Catálogo
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#EEF5F2] rounded-2xl border border-[#C8DDD4] p-6 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#527A6B]" />
              <h3 className="font-serif-brand font-bold text-sm">Sua Licença de Uso</h3>
            </div>
            <p className="text-xs text-[#527A6B]/80 leading-relaxed">
              Sua conta está registrada com a licença de uso individual clínica para{' '}
              <strong>{user.name}</strong> ({user.crp}). Os materiais podem ser expostos aos seus
              pacientes em atendimentos, adaptados para impressão física e preenchimento local.
            </p>
            {primaryLicense?.licenseCode && (
              <div className="text-[10px] text-[#527A6B]/60 pt-2 border-t border-[#C8DDD4]/40">
                ID de Registro:{' '}
                <span className="font-mono">{primaryLicense.licenseCode}</span>
              </div>
            )}
          </div>

          <div className="bg-[#EEF5F2] rounded-2xl border border-[#C8DDD4] p-6 space-y-4 text-left">
            <h3 className="font-serif-brand font-bold text-sm">Histórico de Faturas</h3>

            {purchases.length > 0 ? (
              <div className="space-y-3">
                {purchases.map((purchase, index) => (
                  <div
                    key={purchase.id}
                    className={`flex justify-between items-center text-xs p-2.5 bg-[#F8FAF9] rounded-xl ${index > 0 ? 'opacity-75' : ''}`}
                  >
                    <div>
                      <p className="font-semibold">{purchase.productTitle}</p>
                      <p className="text-[10px] text-[#527A6B]/60">{purchase.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">R$ {purchase.amount.toFixed(2)}</p>
                      <span className="text-[9px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">
                        {purchase.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#527A6B]/70">Nenhuma compra registrada ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
