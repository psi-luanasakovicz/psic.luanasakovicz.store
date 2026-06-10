'use client';

import { TrendingUp } from 'lucide-react';
import { DashboardPanel, DashboardSectionHeader } from '@/components/dashboard/DashboardUI';
import { formatBRL } from '@/lib/admin-stats';
import type { AdminRecentPurchase, ProductSalesInsight } from '@/lib/admin-dashboard';

interface AdminOverviewPanelsProps {
  recentPurchases: AdminRecentPurchase[];
  topProducts: ProductSalesInsight[];
  loading: boolean;
}

export default function AdminOverviewPanels({
  recentPurchases,
  topProducts,
  loading,
}: AdminOverviewPanelsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DashboardPanel className="overflow-hidden">
        <DashboardSectionHeader
          title="Vendas recentes"
          subtitle="Últimas aquisições e liberações aprovadas"
        />
        <div className="p-6 sm:p-8">
          {loading ? (
            <p className="text-sm text-[#527A6B]/70 text-center py-6">Carregando...</p>
          ) : recentPurchases.length === 0 ? (
            <p className="text-sm text-[#527A6B]/70 text-center py-6">Nenhuma venda registrada.</p>
          ) : (
            <div className="space-y-2">
              {recentPurchases.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#F8FAF9] border border-[#C8DDD4]/40"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#527A6B] truncate">
                      {sale.productTitle}
                    </p>
                    <p className="text-xs text-[#527A6B]/70 truncate">
                      {sale.userName} · {sale.userEmail}
                    </p>
                    <p className="text-[10px] text-[#527A6B]/55 mt-0.5">{sale.createdAt}</p>
                  </div>
                  <p className="text-sm font-bold text-[#527A6B] shrink-0">
                    {formatBRL(sale.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DashboardPanel>

      <DashboardPanel className="overflow-hidden">
        <DashboardSectionHeader
          title="Materiais mais vendidos"
          subtitle="Ranking por quantidade de vendas"
        />
        <div className="p-6 sm:p-8">
          {loading ? (
            <p className="text-sm text-[#527A6B]/70 text-center py-6">Carregando...</p>
          ) : topProducts.length === 0 ? (
            <p className="text-sm text-[#527A6B]/70 text-center py-6">Nenhum material no acervo.</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAF9] border border-[#C8DDD4]/40"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#88B7A5]/10 flex items-center justify-center text-xs font-bold text-[#527A6B] shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#527A6B] truncate">{product.title}</p>
                    <p className="text-xs text-[#527A6B]/65">
                      {product.sales} {product.sales === 1 ? 'venda' : 'vendas'} ·{' '}
                      {formatBRL(product.price)}
                      {!product.isActive && ' · Inativo'}
                    </p>
                  </div>
                  <TrendingUp className="w-4 h-4 text-[#88B7A5] shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </DashboardPanel>
    </div>
  );
}
