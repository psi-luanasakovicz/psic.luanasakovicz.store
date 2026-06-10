'use client';

import { useEffect, useState } from 'react';
import { Ban, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { DashboardPanel, DashboardSectionHeader } from '@/components/dashboard/DashboardUI';
import { fetchAdminClients, type AdminClientRow } from '@/lib/admin-dashboard';
import { formatBRL } from '@/lib/admin-stats';
import { revokeProductAccessFromUser } from '@/lib/revoke-product-access';

interface AdminClientsManagerProps {
  showToast: (message: string) => void;
  onUpdated: () => Promise<void>;
}

export default function AdminClientsManager({ showToast, onUpdated }: AdminClientsManagerProps) {
  const [clients, setClients] = useState<AdminClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [revokingKey, setRevokingKey] = useState<string | null>(null);

  const loadClients = async () => {
    setLoading(true);
    const data = await fetchAdminClients();
    setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    void loadClients();
  }, []);

  const handleRevoke = async (client: AdminClientRow, productId: string, productTitle: string) => {
    if (
      !confirm(
        `Revogar acesso de ${client.name || client.email} ao material "${productTitle}"?\n\nO cliente perderá acesso na Área do Cliente.`,
      )
    ) {
      return;
    }

    setRevokingKey(`${client.id}-${productId}`);
    const result = await revokeProductAccessFromUser(client.id, productId);

    if (result.ok) {
      showToast('Acesso revogado com sucesso.');
      await loadClients();
      await onUpdated();
    } else {
      showToast(result.error ?? 'Erro ao revogar acesso.');
    }

    setRevokingKey(null);
  };

  const clientsWithAccess = clients.filter((client) => client.accesses.length > 0);
  const clientsWithoutAccess = clients.filter((client) => client.accesses.length === 0);

  return (
    <DashboardPanel className="overflow-hidden">
      <DashboardSectionHeader
        title="Clientes cadastrados"
        subtitle="Veja quem possui acesso e revogue materiais quando necessário"
        action={
          <span className="text-xs font-semibold text-[#527A6B]/70 bg-[#EEF5F2] px-3 py-1.5 rounded-full">
            {clients.length} {clients.length === 1 ? 'conta' : 'contas'}
          </span>
        }
      />

      <div className="p-6 sm:p-8 space-y-6">
        {loading ? (
          <p className="text-sm text-[#527A6B]/70 text-center py-8">Carregando clientes...</p>
        ) : clients.length === 0 ? (
          <p className="text-sm text-[#527A6B]/70 text-center py-8">Nenhum cliente cadastrado.</p>
        ) : (
          <>
            {clientsWithAccess.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/65">
                  Com materiais liberados
                </p>
                {clientsWithAccess.map((client) => {
                  const isExpanded = expandedId === client.id;

                  return (
                    <div
                      key={client.id}
                      className="border border-[#C8DDD4]/50 rounded-xl overflow-hidden bg-[#F8FAF9]"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : client.id)}
                        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-[#EEF5F2]/80 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-[#527A6B] truncate">
                            {client.name || 'Sem nome'}
                          </p>
                          <p className="text-xs text-[#527A6B]/70 truncate">{client.email}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            {client.accesses.length}{' '}
                            {client.accesses.length === 1 ? 'material' : 'materiais'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#527A6B]/60" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#527A6B]/60" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-[#C8DDD4]/40 p-4 space-y-2 bg-white">
                          {client.crp ? (
                            <p className="text-xs text-[#527A6B]/65 mb-3">CRP {client.crp}</p>
                          ) : null}
                          {client.accesses.map((access) => (
                            <div
                              key={access.purchaseId}
                              className="flex items-center justify-between gap-3 p-3 rounded-lg border border-[#C8DDD4]/40"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-[#527A6B] truncate">
                                  {access.productTitle}
                                </p>
                                <p className="text-[10px] text-[#527A6B]/60">
                                  {access.createdAt} · {formatBRL(access.amount)}
                                </p>
                              </div>
                              <button
                                type="button"
                                disabled={revokingKey === `${client.id}-${access.productId}`}
                                onClick={() =>
                                  void handleRevoke(client, access.productId, access.productTitle)
                                }
                                className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-60 px-2.5 py-1.5 rounded-lg transition-colors shrink-0"
                              >
                                <Ban className="w-3 h-3" />
                                Revogar
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {clientsWithoutAccess.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/65">
                  Sem materiais
                </p>
                <div className="rounded-xl border border-[#C8DDD4]/40 divide-y divide-[#C8DDD4]/30 overflow-hidden">
                  {clientsWithoutAccess.slice(0, 8).map((client) => (
                    <div
                      key={client.id}
                      className="flex items-center justify-between gap-3 px-4 py-3 bg-white text-sm"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-[#527A6B] truncate">
                          {client.name || 'Sem nome'}
                        </p>
                        <p className="text-xs text-[#527A6B]/65 truncate">{client.email}</p>
                      </div>
                      <span className="text-[10px] text-[#527A6B]/50 shrink-0">{client.createdAt}</span>
                    </div>
                  ))}
                </div>
                {clientsWithoutAccess.length > 8 && (
                  <p className="text-xs text-[#527A6B]/55 text-center">
                    + {clientsWithoutAccess.length - 8} contas sem materiais
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {!loading && clients.length > 0 && (
          <p className="text-xs text-[#527A6B]/55 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            Use a seção acima para liberar acesso manual a novos materiais.
          </p>
        )}
      </div>
    </DashboardPanel>
  );
}
