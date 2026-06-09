'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Pencil, Power, PowerOff, Trash2, X } from 'lucide-react';
import DeliveryFilesEditor from '@/components/DeliveryFilesEditor';
import CoverImageField from '@/components/CoverImageField';
import { emptyNewProduct, useApp } from '@/context/AppContext';
import { emptyAdminStats, fetchAdminStats, formatBRL, type AdminStats } from '@/lib/admin-stats';
import { productToForm } from '@/lib/product-form';
import { fetchAllProductsAdmin } from '@/lib/products-client';
import { INITIAL_CATALOG_COUNT } from '@/lib/seed-products';
import type { NewProductForm, Product } from '@/types/product';

export default function AdminPanel() {
  const { user, addProduct, updateProduct, setProductActive, removeProduct, seedInitialCatalog } =
    useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<AdminStats>(emptyAdminStats);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewProductForm>(emptyNewProduct);

  const loadDashboard = async () => {
    setLoading(true);
    setStatsLoading(true);

    const [productsData, statsData] = await Promise.all([
      fetchAllProductsAdmin(),
      fetchAdminStats(),
    ]);

    setProducts(productsData);
    setStats(statsData);
    setLoading(false);
    setStatsLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyNewProduct);
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm(productToForm(product));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="bg-[#EEF5F2] rounded-[2rem] border border-[#C8DDD4] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/80">
              Portal do Administrador
            </span>
          </div>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">
            Gestão da Loja de Materiais
          </h1>
          <p className="text-xs text-[#527A6B]/80">
            Cadastre novos recursos terapêuticos, acompanhe vendas e controle a biblioteca.
          </p>
        </div>

        <div className="text-xs text-[#527A6B]/75 bg-[#F8FAF9] px-4 py-3 rounded-2xl border border-[#C8DDD4]/60">
          Acessado por: <strong>{user.name || 'Psic. Luana Sakovicz'}</strong>
        </div>
      </div>

      {!loading && products.length === 0 && (
        <div className="bg-[#FBF0F3] border border-[#E8A8B8]/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <p className="font-serif-brand font-bold text-[#88B7A5]">Catálogo vazio</p>
            <p className="text-xs text-[#527A6B]/85">
              Nenhum material está publicado no Supabase. Importe os {INITIAL_CATALOG_COUNT}{' '}
              materiais iniciais (inclui o Baralho de Emoções com app interativo).
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
            className="bg-[#88B7A5] hover:bg-[#72A190] disabled:opacity-60 text-white px-6 py-3 rounded-full text-xs font-bold transition-all shrink-0"
          >
            {seeding ? 'Publicando...' : `Importar ${INITIAL_CATALOG_COUNT} materiais`}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#EEF5F2] p-6 rounded-2xl border border-[#C8DDD4] text-left">
          <span className="text-xs text-[#527A6B]/60 uppercase font-semibold">Total Faturado</span>
          <p className="font-serif-brand text-2xl font-bold mt-1">
            {statsLoading ? '—' : formatBRL(stats.totalRevenue)}
          </p>
          <span className="text-[10px] text-green-700 font-semibold">
            {statsLoading ? 'Carregando...' : `Este mês: ${formatBRL(stats.monthRevenue)}`}
          </span>
        </div>
        <div className="bg-[#EEF5F2] p-6 rounded-2xl border border-[#C8DDD4] text-left">
          <span className="text-xs text-[#527A6B]/60 uppercase font-semibold">
            Vendas Totais
          </span>
          <p className="font-serif-brand text-2xl font-bold mt-1">
            {statsLoading
              ? '—'
              : `${stats.totalSales} ${stats.totalSales === 1 ? 'venda' : 'vendas'}`}
          </p>
          <span className="text-[10px] text-[#527A6B]/70">
            {statsLoading
              ? 'Carregando...'
              : stats.averageRating > 0
                ? `Média de ${stats.averageRating.toFixed(1)} estrelas`
                : 'Sem avaliações ainda'}
          </span>
        </div>
        <div className="bg-[#EEF5F2] p-6 rounded-2xl border border-[#C8DDD4] text-left">
          <span className="text-xs text-[#527A6B]/60 uppercase font-semibold">
            Clientes Ativos
          </span>
          <p className="font-serif-brand text-2xl font-bold mt-1">
            {statsLoading
              ? '—'
              : `${stats.activeClients} ${stats.activeClients === 1 ? 'Terapeuta' : 'Terapeutas'}`}
          </p>
          <span className="text-[10px] text-[#527A6B]/70">Com compra aprovada</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        <div className="lg:col-span-7 bg-[#EEF5F2] border border-[#C8DDD4] rounded-[2.5rem] p-8 space-y-6">
          <div className="border-b border-[#C8DDD4]/40 pb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif-brand font-bold text-lg">
                {editingId ? 'Editar Material Clínico' : 'Adicionar Novo Material Clínico'}
              </h3>
              <p className="text-xs text-[#527A6B]/75">
                {editingId
                  ? 'Atualize dados, capa, arquivos e conteúdo do material selecionado.'
                  : 'Preencha os dados abaixo para publicar o recurso na boutique digital imediatamente.'}
              </p>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="p-2 rounded-xl border border-[#C8DDD4] hover:bg-[#F8FAF9] text-[#527A6B]"
                title="Cancelar edição"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 uppercase tracking-wide">
                  Título Principal
                </label>
                <input
                  type="text"
                  placeholder="Ex: Baralho do Diálogo Socrático"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl px-4 py-2.5 text-[#527A6B]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 uppercase tracking-wide">
                  Subtítulo Explicativo
                </label>
                <input
                  type="text"
                  placeholder="Ex: 30 cartas para questionamento cognitivo."
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl px-4 py-2.5 text-[#527A6B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1 uppercase tracking-wide">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="39.90"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl px-4 py-2.5 text-[#527A6B]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 uppercase tracking-wide">
                  Categoria
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as NewProductForm['category'],
                    })
                  }
                  className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl px-4 py-2.5 text-[#527A6B]"
                >
                  <option value="Crianças">Crianças</option>
                  <option value="Adolescentes">Adolescentes</option>
                  <option value="Adultos">Adultos</option>
                  <option value="Gestão Clínica">Gestão Clínica</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1 uppercase tracking-wide">
                  Etiqueta/Selo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Recomendado"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl px-4 py-2.5 text-[#527A6B]"
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1 uppercase tracking-wide">
                  Páginas/Cartas
                </label>
                <input
                  type="text"
                  placeholder="Ex: 50 páginas"
                  value={form.pages}
                  onChange={(e) => setForm({ ...form, pages: e.target.value })}
                  className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl px-4 py-2.5 text-[#527A6B]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 uppercase tracking-wide">Formato</label>
                <input
                  type="text"
                  placeholder="Ex: PDF Imprimível"
                  value={form.format}
                  onChange={(e) => setForm({ ...form, format: e.target.value })}
                  className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl px-4 py-2.5 text-[#527A6B]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 uppercase tracking-wide">
                  Bônus Incluso
                </label>
                <input
                  type="text"
                  placeholder="Ex: Folhas extras"
                  value={form.bonus}
                  onChange={(e) => setForm({ ...form, bonus: e.target.value })}
                  className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl px-4 py-2.5 text-[#527A6B]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 uppercase tracking-wide">
                Descrição Completa
              </label>
              <textarea
                placeholder="Descreva minuciosamente o valor clínico e os temas contemplados pelo recurso..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl p-4 text-[#527A6B] h-24 resize-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 uppercase tracking-wide">
                O que está incluído no arquivo (um por linha)
              </label>
              <textarea
                placeholder={'Modelo adaptado interativo\nAbordagem com embasamento\nGuia prático para impressão'}
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl p-4 text-[#527A6B] h-20 resize-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 uppercase tracking-wide">
                Conteúdo do leitor (seções)
              </label>
              <textarea
                placeholder={'Título da seção\nTexto da seção...\n\nOutra seção\nMais texto...'}
                value={form.contents}
                onChange={(e) => setForm({ ...form, contents: e.target.value })}
                className="w-full bg-[#F8FAF9] border border-[#C8DDD4] rounded-xl p-4 text-[#527A6B] h-24 resize-none"
              />
              <p className="text-[10px] text-[#527A6B]/60 mt-1">
                Separe seções com linha em branco. A primeira linha de cada bloco é o título.
              </p>
            </div>

            <DeliveryFilesEditor
              files={form.deliveryFiles}
              onChange={(deliveryFiles) => setForm({ ...form, deliveryFiles })}
            />

            <button
              type="submit"
              className="w-full bg-[#88B7A5] hover:bg-[#72A190] text-white py-3.5 rounded-full font-bold shadow-md transition-all text-center"
            >
              {editingId ? 'Salvar Alterações' : 'Publicar Recurso Digital'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-[#EEF5F2] border border-[#C8DDD4] rounded-[2.5rem] p-8 space-y-6">
          <h3 className="font-serif-brand font-bold text-lg border-b border-[#C8DDD4]/40 pb-2">
            Controle do Acervo ({products.length})
          </h3>

          {loading ? (
            <p className="text-xs text-[#527A6B]/70">Carregando produtos...</p>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl border flex justify-between items-center text-xs ${
                    p.isActive === false
                      ? 'bg-[#EEF5F2]/80 border-[#C8DDD4]/40 opacity-75'
                      : 'bg-[#F8FAF9] border-[#C8DDD4]/60'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="font-bold font-serif-brand">{p.title}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] text-[#527A6B]/70">
                      <span>{p.category}</span>
                      <span>•</span>
                      <span className="font-semibold text-[#527A6B]">R$ {p.price.toFixed(2)}</span>
                      {p.isActive === false && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-amber-700">Inativo</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className={`p-1.5 rounded-lg ${
                        editingId === p.id
                          ? 'bg-[#88B7A5] text-white'
                          : 'bg-[#88B7A5]/10 hover:bg-[#88B7A5]/20 text-[#527A6B]'
                      }`}
                      title="Editar material"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    {p.isActive !== false && (
                      <Link
                        href={`/materiais/${p.slug}`}
                        className="p-1.5 bg-[#88B7A5]/10 hover:bg-[#88B7A5]/20 rounded-lg text-[#527A6B]"
                        title="Visualizar"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {p.isActive === false ? (
                      <button
                        type="button"
                        onClick={async () => {
                          await setProductActive(p.id, true);
                          await loadDashboard();
                        }}
                        className="p-1.5 bg-green-100 hover:bg-green-200 rounded-lg text-green-800"
                        title="Ativar no catálogo"
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          if (
                            confirm(
                              `Desativar "${p.title}"?\n\nO material sairá do catálogo, mas quem já comprou mantém o acesso.`,
                            )
                          ) {
                            await setProductActive(p.id, false);
                            await loadDashboard();
                          }
                        }}
                        className="p-1.5 bg-amber-100 hover:bg-amber-200 rounded-lg text-amber-800"
                        title="Desativar do catálogo"
                      >
                        <PowerOff className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={async () => {
                        if (
                          confirm(
                            `Excluir permanentemente "${p.title}"?\n\nSó é possível se não houver compras registradas.`,
                          )
                        ) {
                          await removeProduct(p.id);
                          await loadDashboard();
                        }
                      }}
                      className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-red-700"
                      title="Excluir permanentemente"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
