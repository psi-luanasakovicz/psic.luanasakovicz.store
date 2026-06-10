'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  DollarSign,
  ExternalLink,
  LayoutDashboard,
  Package,
  Pencil,
  Plus,
  Power,
  PowerOff,
  ShoppingCart,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import DeliveryFilesEditor from '@/components/DeliveryFilesEditor';
import CoverImageField from '@/components/CoverImageField';
import AdminAccessGrant from '@/components/AdminAccessGrant';
import AdminClientsManager from '@/components/AdminClientsManager';
import AdminOverviewPanels from '@/components/AdminOverviewPanels';
import {
  dashboardInputClass,
  dashboardLabelClass,
  DashboardHero,
  DashboardPanel,
  DashboardSectionHeader,
  DashboardShell,
  DashboardStatCard,
} from '@/components/dashboard/DashboardUI';
import { emptyNewProduct, useApp } from '@/context/AppContext';
import { emptyAdminStats, fetchAdminStats, formatBRL, type AdminStats } from '@/lib/admin-stats';
import {
  buildProductInsights,
  fetchRecentPurchases,
  type AdminRecentPurchase,
  type ProductSalesInsight,
} from '@/lib/admin-dashboard';
import { productToForm } from '@/lib/product-form';
import { fetchAllProductsAdmin } from '@/lib/products-client';
import { INITIAL_CATALOG_COUNT } from '@/lib/seed-products';
import type { NewProductForm, Product } from '@/types/product';

type AdminTab = 'overview' | 'catalog' | 'clients';

const adminTabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Visão geral', icon: LayoutDashboard },
  { id: 'catalog', label: 'Produtos', icon: Package },
  { id: 'clients', label: 'Clientes', icon: Users },
];

export default function AdminPanel() {
  const { user, addProduct, updateProduct, setProductActive, removeProduct, seedInitialCatalog, showToast } =
    useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<AdminStats>(emptyAdminStats);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<NewProductForm>(emptyNewProduct);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [recentPurchases, setRecentPurchases] = useState<AdminRecentPurchase[]>([]);
  const [topProducts, setTopProducts] = useState<ProductSalesInsight[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  const loadDashboard = async () => {
    setLoading(true);
    setStatsLoading(true);

    const [productsData, statsData, purchasesData] = await Promise.all([
      fetchAllProductsAdmin(),
      fetchAdminStats(),
      fetchRecentPurchases(),
    ]);

    setProducts(productsData);
    setStats(statsData);
    setRecentPurchases(purchasesData);
    setTopProducts(buildProductInsights(productsData));
    setLoading(false);
    setStatsLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setIsCreating(false);
    setForm(emptyNewProduct);
  };

  const startCreate = () => {
    setActiveTab('catalog');
    setEditingId(null);
    setIsCreating(true);
    setForm(emptyNewProduct);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const startEdit = (product: Product) => {
    setActiveTab('catalog');
    setIsCreating(false);
    setEditingId(product.id);
    setForm(productToForm(product));
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const showForm = editingId !== null || isCreating;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      await updateProduct(editingId, form);
    } else {
      await addProduct(form);
    }
    resetForm();
    await loadDashboard();
  };

  return (
    <DashboardShell>
      <DashboardHero
        badge="Painel Administrativo"
        badgeDotClass="bg-amber-500"
        title="Gestão da boutique clínica"
        description="Publique materiais, acompanhe métricas de vendas e gerencie o acesso dos profissionais à plataforma."
        aside={
          <div className="bg-[#EEF5F2] border border-[#C8DDD4]/50 rounded-2xl px-5 py-4 min-w-[220px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/60 mb-1">
              Sessão admin
            </p>
            <p className="text-sm font-semibold text-[#527A6B]">
              {user.name || 'Psic. Luana Sakovicz'}
            </p>
            <p className="text-xs text-[#527A6B]/70 mt-1 truncate">{user.email}</p>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        {adminTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === id
                ? 'bg-[#88B7A5] text-white shadow-sm'
                : 'bg-white border border-[#C8DDD4]/60 text-[#527A6B] hover:border-[#88B7A5]/40'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
        <Link
          href="/catalogo"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-[#C8DDD4]/60 text-[#527A6B] hover:bg-white transition-all ml-auto"
        >
          <ExternalLink className="w-4 h-4" />
          Ver loja
        </Link>
      </div>

      {activeTab === 'overview' && (
        <>
      {!loading && products.length === 0 && (
        <div className="bg-[#FBF0F3]/80 border border-[#E8A8B8]/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left shadow-sm">
          <div className="space-y-2">
            <p className="font-serif-brand font-bold text-lg text-[#527A6B]">Catálogo vazio</p>
            <p className="text-sm text-[#527A6B]/80 max-w-xl">
              Nenhum material publicado. Importe os {INITIAL_CATALOG_COUNT} materiais iniciais para
              começar — inclui o Baralho de Emoções com app interativo.
            </p>
          </div>
          <button
            type="button"
            disabled={seeding}
            onClick={async () => {
              setSeeding(true);
              const result = await seedInitialCatalog();
              if (!result.error) {
                await loadDashboard();
              }
              setSeeding(false);
            }}
            className="bg-[#88B7A5] hover:bg-[#72A190] disabled:opacity-60 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shrink-0 shadow-sm"
          >
            {seeding ? 'Publicando...' : `Importar ${INITIAL_CATALOG_COUNT} materiais`}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardStatCard
          icon={DollarSign}
          label="Total faturado"
          value={statsLoading ? '—' : formatBRL(stats.totalRevenue)}
          hint={statsLoading ? 'Carregando...' : `Este mês: ${formatBRL(stats.monthRevenue)}`}
          accent="green"
        />
        <DashboardStatCard
          icon={ShoppingCart}
          label="Vendas totais"
          value={
            statsLoading
              ? '—'
              : `${stats.totalSales} ${stats.totalSales === 1 ? 'venda' : 'vendas'}`
          }
          hint={
            statsLoading
              ? 'Carregando...'
              : stats.averageRating > 0
                ? `Média ${stats.averageRating.toFixed(1)} estrelas`
                : 'Sem avaliações ainda'
          }
          accent="neutral"
        />
        <DashboardStatCard
          icon={Users}
          label="Clientes ativos"
          value={
            statsLoading
              ? '—'
              : `${stats.activeClients} ${stats.activeClients === 1 ? 'terapeuta' : 'terapeutas'}`
          }
          hint="Com compra ou acesso liberado"
          accent="rose"
        />
      </div>

      <AdminOverviewPanels
        recentPurchases={recentPurchases}
        topProducts={topProducts}
        loading={statsLoading}
      />
        </>
      )}

      {activeTab === 'clients' && (
        <div className="space-y-6">
          <AdminAccessGrant products={products} onGranted={loadDashboard} showToast={showToast} />
          <AdminClientsManager showToast={showToast} onUpdated={loadDashboard} />
        </div>
      )}

      {activeTab === 'catalog' && (
      <div className="space-y-8">
        {showForm && (
          <div ref={formRef}>
          <DashboardPanel className="overflow-hidden">
            <DashboardSectionHeader
              title={editingId ? 'Editar material' : 'Novo material'}
              subtitle={
                editingId
                  ? 'Atualize dados, capa, arquivos e conteúdo do material selecionado.'
                  : 'Preencha os campos para publicar na boutique digital.'
              }
              action={
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C8DDD4] hover:bg-[#EEF5F2] text-[#527A6B] text-xs font-semibold shrink-0 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Voltar ao acervo
                </button>
              }
            />

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={dashboardLabelClass}>Título principal</label>
                  <input
                    type="text"
                    placeholder="Ex: Baralho do Diálogo Socrático"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className={dashboardInputClass}
                  />
                </div>
                <div>
                  <label className={dashboardLabelClass}>Subtítulo</label>
                  <input
                    type="text"
                    placeholder="Ex: 30 cartas para questionamento cognitivo."
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    className={dashboardInputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={dashboardLabelClass}>Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="39.90"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    className={dashboardInputClass}
                  />
                </div>
                <div>
                  <label className={dashboardLabelClass}>Categoria</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as NewProductForm['category'],
                      })
                    }
                    className={dashboardInputClass}
                  >
                    <option value="Crianças">Crianças</option>
                    <option value="Adolescentes">Adolescentes</option>
                    <option value="Adultos">Adultos</option>
                    <option value="Gestão Clínica">Gestão Clínica</option>
                  </select>
                </div>
                <div>
                  <label className={dashboardLabelClass}>Etiqueta / selo</label>
                  <input
                    type="text"
                    placeholder="Ex: Recomendado"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className={dashboardInputClass}
                  />
                </div>
              </div>

              <CoverImageField
                file={form.coverImage}
                existingUrl={form.existingCoverUrl}
                removeCover={form.removeCover}
                onChange={(coverImage) => setForm({ ...form, coverImage, removeCover: false })}
                onRemoveExisting={() => setForm({ ...form, removeCover: true, coverImage: null })}
                onRestoreExisting={() => setForm({ ...form, removeCover: false })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={dashboardLabelClass}>Páginas / cartas</label>
                  <input
                    type="text"
                    placeholder="Ex: 50 páginas"
                    value={form.pages}
                    onChange={(e) => setForm({ ...form, pages: e.target.value })}
                    className={dashboardInputClass}
                  />
                </div>
                <div>
                  <label className={dashboardLabelClass}>Formato</label>
                  <input
                    type="text"
                    placeholder="Ex: PDF imprimível"
                    value={form.format}
                    onChange={(e) => setForm({ ...form, format: e.target.value })}
                    className={dashboardInputClass}
                  />
                </div>
                <div>
                  <label className={dashboardLabelClass}>Bônus incluso</label>
                  <input
                    type="text"
                    placeholder="Ex: Folhas extras"
                    value={form.bonus}
                    onChange={(e) => setForm({ ...form, bonus: e.target.value })}
                    className={dashboardInputClass}
                  />
                </div>
              </div>

              <div>
                <label className={dashboardLabelClass}>Descrição completa</label>
                <textarea
                  placeholder="Descreva o valor clínico e os temas contemplados..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`${dashboardInputClass} h-28 resize-none py-3`}
                />
              </div>

              <div>
                <label className={dashboardLabelClass}>Itens inclusos (um por linha)</label>
                <textarea
                  placeholder={'Modelo adaptado interativo\nAbordagem com embasamento\nGuia para impressão'}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className={`${dashboardInputClass} h-24 resize-none py-3`}
                />
              </div>

              <div>
                <label className={dashboardLabelClass}>Conteúdo do leitor (seções)</label>
                <textarea
                  placeholder={'Título da seção\nTexto...\n\nOutra seção\nMais texto...'}
                  value={form.contents}
                  onChange={(e) => setForm({ ...form, contents: e.target.value })}
                  className={`${dashboardInputClass} h-28 resize-none py-3`}
                />
                <p className="text-xs text-[#527A6B]/55 mt-1.5">
                  Separe seções com linha em branco. A primeira linha de cada bloco é o título.
                </p>
              </div>

              <DeliveryFilesEditor
                files={form.deliveryFiles}
                onChange={(deliveryFiles) => setForm({ ...form, deliveryFiles })}
              />

              <button
                type="submit"
                className="w-full bg-[#88B7A5] hover:bg-[#72A190] text-white py-3.5 rounded-full font-semibold shadow-sm transition-all text-center text-sm"
              >
                {editingId ? 'Salvar alterações' : 'Publicar material'}
              </button>
            </form>
          </DashboardPanel>
          </div>
        )}

        {!showForm && (
          <DashboardPanel className="overflow-hidden">
            <DashboardSectionHeader
              title="Acervo de materiais"
              subtitle={`${products.length} ${products.length === 1 ? 'item cadastrado' : 'itens cadastrados'}`}
              action={
                <button
                  type="button"
                  onClick={startCreate}
                  className="inline-flex items-center justify-center gap-2 bg-[#88B7A5] hover:bg-[#72A190] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all shrink-0 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar material
                </button>
              }
            />

            <div className="p-6 sm:p-8">
              {loading ? (
                <p className="text-sm text-[#527A6B]/70 py-8 text-center">Carregando produtos...</p>
              ) : products.length === 0 ? (
                <p className="text-sm text-[#527A6B]/70 py-8 text-center">
                  Nenhum material cadastrado.
                </p>
              ) : (
                <>
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-[#C8DDD4]/50">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="bg-[#EEF5F2] text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/65">
                          <th className="px-5 py-3.5">Material</th>
                          <th className="px-5 py-3.5">Categoria</th>
                          <th className="px-5 py-3.5">Preço</th>
                          <th className="px-5 py-3.5">Status</th>
                          <th className="px-5 py-3.5 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C8DDD4]/40">
                        {products.map((product) => (
                          <tr
                            key={product.id}
                            className={`bg-white hover:bg-[#F8FAF9]/80 transition-colors ${
                              product.isActive === false ? 'opacity-70' : ''
                            }`}
                          >
                            <td className="px-5 py-4">
                              <p className="font-serif-brand font-bold text-[#527A6B]">
                                {product.title}
                              </p>
                            </td>
                            <td className="px-5 py-4 text-[#527A6B]/75">{product.category}</td>
                            <td className="px-5 py-4 font-semibold text-[#527A6B]">
                              R$ {product.price.toFixed(2)}
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                                  product.isActive === false
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {product.isActive === false ? 'Inativo' : 'Ativo'}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => startEdit(product)}
                                  className="p-2 rounded-lg bg-[#88B7A5]/10 hover:bg-[#88B7A5]/20 text-[#527A6B] transition-colors"
                                  title="Editar"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                {product.isActive !== false && (
                                  <Link
                                    href={`/catalogo/${product.slug}`}
                                    className="p-2 rounded-lg bg-[#EEF5F2] hover:bg-[#C8DDD4]/40 text-[#527A6B] transition-colors"
                                    title="Visualizar"
                                  >
                                    <BookOpen className="w-4 h-4" />
                                  </Link>
                                )}
                                {product.isActive === false ? (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      await setProductActive(product.id, true);
                                      await loadDashboard();
                                    }}
                                    className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                                    title="Ativar"
                                  >
                                    <Power className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      if (
                                        confirm(
                                          `Desativar "${product.title}"?\n\nQuem já possui acesso mantém o material.`,
                                        )
                                      ) {
                                        await setProductActive(product.id, false);
                                        await loadDashboard();
                                      }
                                    }}
                                    className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                                    title="Desativar"
                                  >
                                    <PowerOff className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={async () => {
                                    if (
                                      confirm(
                                        `Excluir "${product.title}"?\n\nSó é possível sem compras registradas.`,
                                      )
                                    ) {
                                      await removeProduct(product.id);
                                      await loadDashboard();
                                    }
                                  }}
                                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="md:hidden space-y-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 rounded-xl border border-[#C8DDD4]/50 bg-[#F8FAF9] space-y-3"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <p className="font-serif-brand font-bold text-[#527A6B]">
                              {product.title}
                            </p>
                            <p className="text-xs text-[#527A6B]/70 mt-1">
                              {product.category} • R$ {product.price.toFixed(2)}
                            </p>
                          </div>
                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                              product.isActive === false
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {product.isActive === false ? 'Inativo' : 'Ativo'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(product)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#88B7A5]/10 text-[#527A6B]"
                          >
                            Editar
                          </button>
                          {product.isActive !== false && (
                            <Link
                              href={`/catalogo/${product.slug}`}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#EEF5F2] text-[#527A6B]"
                            >
                              Ver
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </DashboardPanel>
        )}
      </div>
      )}
    </DashboardShell>
  );
}
