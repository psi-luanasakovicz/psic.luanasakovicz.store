'use client';

import { useState } from 'react';
import { Check, Search, ShieldCheck, UserCheck } from 'lucide-react';
import {
  dashboardInputClass,
  DashboardPanel,
  DashboardSectionHeader,
} from '@/components/dashboard/DashboardUI';
import {
  fetchApprovedProductIdsForUser,
  searchProfilesByEmail,
  type AdminProfileResult,
} from '@/lib/admin-users';
import { grantProductAccessToUser } from '@/lib/grant-product-access';
import type { Product } from '@/types/product';

interface AdminAccessGrantProps {
  products: Product[];
  onGranted: () => Promise<void>;
  showToast: (message: string) => void;
}

export default function AdminAccessGrant({ products, onGranted, showToast }: AdminAccessGrantProps) {
  const [emailQuery, setEmailQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AdminProfileResult[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminProfileResult | null>(null);
  const [ownedProductIds, setOwnedProductIds] = useState<string[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [granting, setGranting] = useState(false);

  const handleSearch = async () => {
    if (emailQuery.trim().length < 3) {
      showToast('Digite pelo menos 3 caracteres do e-mail.');
      return;
    }

    setSearching(true);
    const results = await searchProfilesByEmail(emailQuery);
    setSearchResults(results);
    setSelectedUser(null);
    setOwnedProductIds([]);
    setSelectedProductIds([]);
    setSearching(false);

    if (results.length === 0) {
      showToast('Nenhuma conta encontrada com este e-mail.');
    }
  };

  const selectUser = async (profile: AdminProfileResult) => {
    setSelectedUser(profile);
    setSearchResults([]);
    setSelectedProductIds([]);

    const owned = await fetchApprovedProductIdsForUser(profile.id);
    setOwnedProductIds(owned);
  };

  const toggleProduct = (productId: string) => {
    if (ownedProductIds.includes(productId)) return;

    setSelectedProductIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const handleGrant = async () => {
    if (!selectedUser) {
      showToast('Selecione uma conta primeiro.');
      return;
    }

    if (selectedProductIds.length === 0) {
      showToast('Selecione ao menos um material para liberar.');
      return;
    }

    setGranting(true);
    let successCount = 0;

    for (const productId of selectedProductIds) {
      const result = await grantProductAccessToUser(selectedUser.id, productId);
      if (result.ok) {
        successCount += 1;
      } else {
        const product = products.find((item) => item.id === productId);
        showToast(
          result.error
            ? `${product?.title ?? 'Material'}: ${result.error}`
            : 'Erro ao liberar acesso.',
        );
      }
    }

    if (successCount > 0) {
      showToast(
        successCount === 1
          ? `Acesso liberado para ${selectedUser.name || selectedUser.email}.`
          : `${successCount} materiais liberados para ${selectedUser.name || selectedUser.email}.`,
      );
      const owned = await fetchApprovedProductIdsForUser(selectedUser.id);
      setOwnedProductIds(owned);
      setSelectedProductIds([]);
      await onGranted();
    }

    setGranting(false);
  };

  const availableProducts = products.filter((product) => !ownedProductIds.includes(product.id));

  return (
    <DashboardPanel className="overflow-hidden">
      <DashboardSectionHeader
        title="Liberar acesso manual"
        subtitle="Conceda materiais sem compra — cortesia, brinde ou teste. O acesso aparece na Área do Cliente na hora."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={emailQuery}
            onChange={(event) => setEmailQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                void handleSearch();
              }
            }}
            placeholder="E-mail da conta (ex.: cliente@email.com)"
            className={`${dashboardInputClass} py-3`}
          />
          <button
            type="button"
            onClick={() => void handleSearch()}
            disabled={searching}
            className="bg-[#88B7A5] hover:bg-[#72A190] disabled:opacity-60 text-white px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            {searching ? 'Buscando...' : 'Buscar conta'}
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/70">
              Resultados
            </p>
            {searchResults.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => void selectUser(profile)}
                className="w-full text-left bg-[#F8FAF9] border border-[#C8DDD4]/60 hover:border-[#88B7A5] rounded-xl px-4 py-3 transition-colors"
              >
                <p className="font-semibold text-sm text-[#527A6B]">{profile.name || 'Sem nome'}</p>
                <p className="text-xs text-[#527A6B]/75">{profile.email}</p>
                {profile.crp ? (
                  <p className="text-[10px] text-[#527A6B]/60 mt-1">CRP {profile.crp}</p>
                ) : null}
              </button>
            ))}
          </div>
        )}

        {selectedUser && (
          <div className="space-y-5 border-t border-[#C8DDD4]/40 pt-6">
            <div className="flex items-start gap-3 bg-[#EEF5F2] border border-[#C8DDD4]/50 rounded-xl p-4">
              <div className="w-11 h-11 rounded-xl bg-[#88B7A5]/15 flex items-center justify-center text-[#527A6B]">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#527A6B]">
                  {selectedUser.name || 'Sem nome'}
                </p>
                <p className="text-xs text-[#527A6B]/75">{selectedUser.email}</p>
                {selectedUser.crp ? (
                  <p className="text-[10px] text-[#527A6B]/60 mt-1">CRP {selectedUser.crp}</p>
                ) : null}
              </div>
            </div>

            {availableProducts.length > 0 ? (
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/70">
                  Materiais disponíveis
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableProducts.map((product) => {
                    const isSelected = selectedProductIds.includes(product.id);

                    return (
                      <label
                        key={product.id}
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#FBF0F3] border-[#E8A8B8]'
                            : 'bg-white border-[#C8DDD4]/60 hover:border-[#88B7A5]/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleProduct(product.id)}
                          className="mt-1 accent-[#88B7A5]"
                        />
                        <span className="space-y-1">
                          <span className="block font-semibold text-sm text-[#527A6B]">
                            {product.title}
                          </span>
                          <span className="block text-xs text-[#527A6B]/70">
                            {product.category} • R$ {product.price.toFixed(2)}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#527A6B]/75">
                Esta conta já possui acesso a todos os materiais cadastrados.
              </p>
            )}

            {ownedProductIds.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/70">
                  Já liberados
                </p>
                <div className="flex flex-wrap gap-2">
                  {products
                    .filter((product) => ownedProductIds.includes(product.id))
                    .map((product) => (
                      <span
                        key={product.id}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full"
                      >
                        <Check className="w-3 h-3" />
                        {product.title}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {availableProducts.length > 0 && (
              <button
                type="button"
                onClick={() => void handleGrant()}
                disabled={granting || selectedProductIds.length === 0}
                className="bg-[#88B7A5] hover:bg-[#72A190] disabled:opacity-60 text-white px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                {granting
                  ? 'Liberando...'
                  : selectedProductIds.length === 1
                    ? 'Conceder acesso (sem compra)'
                    : `Conceder acesso a ${selectedProductIds.length} materiais`}
              </button>
            )}
          </div>
        )}
      </div>
    </DashboardPanel>
  );
}
