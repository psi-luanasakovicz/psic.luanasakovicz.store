'use client';

import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  Layers,
  Package,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  User,
} from 'lucide-react';
import {
  DashboardEmptyState,
  DashboardHero,
  DashboardPanel,
  DashboardSectionHeader,
  DashboardShell,
  DashboardStatCard,
  DashboardSecondaryLink,
} from '@/components/dashboard/DashboardUI';
import { useApp } from '@/context/AppContext';
import { getInteractiveApp, getInteractiveAppLibraryPath } from '@/lib/interactive-apps';

export default function Dashboard() {
  const { user, purchasedProducts, purchases, licenses } = useApp();
  const primaryLicense = licenses[0];

  return (
    <DashboardShell>
      <DashboardHero
        badge="Minha Área"
        title={`Olá, ${user.name || 'profissional'}.`}
        description="Seu consultório digital reúne materiais licenciados, downloads protegidos e ferramentas interativas prontas para a prática clínica."
        actions={
          <>
            <Link
              href="/catalogo"
              className="bg-[#88B7A5] hover:bg-[#72A190] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm transition-all inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Explorar catálogo
            </Link>
            <DashboardSecondaryLink href="/perfil">
              <User className="w-4 h-4" />
              Meus dados
            </DashboardSecondaryLink>
          </>
        }
        aside={
          <div className="bg-[#EEF5F2] border border-[#C8DDD4]/50 rounded-2xl px-5 py-4 min-w-[200px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/60 mb-1">
              Conta ativa
            </p>
            <p className="text-sm font-semibold text-[#527A6B] truncate">{user.email}</p>
            {user.crp ? (
              <p className="text-xs text-[#527A6B]/70 mt-1">{user.crp}</p>
            ) : null}
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardStatCard
          icon={Package}
          label="Materiais ativos"
          value={String(purchasedProducts.length)}
          hint={
            purchasedProducts.length === 1
              ? '1 recurso disponível'
              : `${purchasedProducts.length} recursos disponíveis`
          }
          accent="green"
        />
        <DashboardStatCard
          icon={Receipt}
          label="Aquisições"
          value={String(purchases.length)}
          hint={purchases.length > 0 ? 'Histórico na barra lateral' : 'Nenhuma compra ainda'}
          accent="neutral"
        />
        <DashboardStatCard
          icon={ShieldCheck}
          label="Licença clínica"
          value={primaryLicense ? 'Ativa' : '—'}
          hint={primaryLicense?.licenseCode ? primaryLicense.licenseCode : 'Gerada ao adquirir'}
          accent="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <DashboardPanel className="lg:col-span-8 overflow-hidden">
          <DashboardSectionHeader
            title="Biblioteca de materiais"
            subtitle="Acesse conteúdos, downloads e apps interativos licenciados para sua conta."
            action={
              <span className="text-xs font-semibold text-[#527A6B]/70 bg-[#EEF5F2] px-3 py-1.5 rounded-full">
                {purchasedProducts.length}{' '}
                {purchasedProducts.length === 1 ? 'item' : 'itens'}
              </span>
            }
          />

          {purchasedProducts.length > 0 ? (
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {purchasedProducts.map((product) => {
                const interactiveApp = getInteractiveApp(product.slug);

                return (
                  <article
                    key={product.id}
                    className="group bg-[#F8FAF9] border border-[#C8DDD4]/50 rounded-2xl overflow-hidden hover:border-[#88B7A5]/40 hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="relative h-36 overflow-hidden bg-[#EEF5F2]">
                      {product.coverImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.coverImageUrl}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${product.imageColor} flex items-center justify-center`}
                        >
                          <BookOpen className="w-10 h-10 text-[#527A6B]/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#527A6B]/50 to-transparent" />
                      <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider bg-white/90 text-[#527A6B] px-2.5 py-1 rounded-full">
                        {product.category}
                      </span>
                      <span className="absolute top-3 right-3 text-[9px] font-bold bg-emerald-500/90 text-white px-2 py-0.5 rounded-full">
                        Ativo
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1 gap-4">
                      <div className="space-y-1.5">
                        <h3 className="font-serif-brand font-bold text-base text-[#527A6B] leading-snug line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-xs text-[#527A6B]/70 line-clamp-2">{product.subtitle}</p>
                      </div>

                      <div className="mt-auto flex flex-col gap-2">
                        <Link
                          href={`/biblioteca/${product.slug}`}
                          className="w-full bg-[#88B7A5] hover:bg-[#72A190] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Abrir material
                          <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />
                        </Link>
                        {interactiveApp ? (
                          <Link
                            href={getInteractiveAppLibraryPath(product.slug)}
                            className="w-full bg-white border border-[#E8A8B8]/60 hover:bg-[#FBF0F3] text-[#527A6B] text-xs font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                          >
                            <Layers className="w-3.5 h-3.5 text-[#E8A8B8]" />
                            {interactiveApp.title}
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <DashboardEmptyState
              icon={BookOpen}
              title="Nenhum material na sua biblioteca"
              description="Explore o catálogo e adquira recursos clínicos para começar a usar sua área exclusiva."
              action={
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 bg-[#88B7A5] hover:bg-[#72A190] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Ver catálogo
                </Link>
              }
            />
          )}
        </DashboardPanel>

        <div className="lg:col-span-4 space-y-6">
          <DashboardPanel className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#88B7A5]/10 flex items-center justify-center text-[#527A6B]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-brand font-bold text-base text-[#527A6B]">
                  Licença de uso
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-[#527A6B]/60">
                  Uso clínico individual
                </p>
              </div>
            </div>
            <p className="text-sm text-[#527A6B]/80 leading-relaxed">
              Os materiais podem ser utilizados em atendimentos, impressos ou adaptados conforme sua
              prática, em nome de <strong>{user.name}</strong>.
            </p>
            {primaryLicense?.licenseCode ? (
              <div className="bg-[#EEF5F2] rounded-xl px-4 py-3 border border-[#C8DDD4]/40">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/55 mb-1">
                  Código de registro
                </p>
                <p className="font-mono text-xs text-[#527A6B] break-all">
                  {primaryLicense.licenseCode}
                </p>
              </div>
            ) : null}
          </DashboardPanel>

          <DashboardPanel className="overflow-hidden">
            <DashboardSectionHeader title="Histórico" subtitle="Suas aquisições registradas" />
            <div className="p-6 sm:p-7">
              {purchases.length > 0 ? (
                <div className="space-y-3">
                  {purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex justify-between items-start gap-3 p-4 bg-[#F8FAF9] rounded-xl border border-[#C8DDD4]/40"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-[#527A6B] truncate">
                          {purchase.productTitle}
                        </p>
                        <p className="text-xs text-[#527A6B]/60 mt-0.5">{purchase.date}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-sm text-[#527A6B]">
                          R$ {purchase.amount.toFixed(2)}
                        </p>
                        <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          {purchase.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#527A6B]/70 text-center py-4">
                  Nenhuma aquisição registrada ainda.
                </p>
              )}
            </div>
          </DashboardPanel>
        </div>
      </div>
    </DashboardShell>
  );
}
