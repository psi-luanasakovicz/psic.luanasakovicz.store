'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  KeyRound,
  LogOut,
  Mail,
  Package,
  Receipt,
  Settings,
  ShieldCheck,
  ShoppingBag,
  User,
} from 'lucide-react';
import {
  DashboardHero,
  DashboardPanel,
  DashboardPrimaryButton,
  DashboardSectionHeader,
  DashboardShell,
  DashboardStatCard,
  dashboardInputClass,
  dashboardLabelClass,
} from '@/components/dashboard/DashboardUI';
import { useApp } from '@/context/AppContext';
import { formatBRL } from '@/lib/admin-stats';

type ProfileTab = 'data' | 'security' | 'account';

const profileTabs: { id: ProfileTab; label: string; icon: typeof User }[] = [
  { id: 'data', label: 'Dados pessoais', icon: User },
  { id: 'security', label: 'Segurança', icon: KeyRound },
  { id: 'account', label: 'Minha conta', icon: ShieldCheck },
];

export default function Profile() {
  const {
    user,
    logout,
    showToast,
    updateUserProfile,
    updatePassword,
    resetPassword,
    purchasedProducts,
    purchases,
    licenses,
  } = useApp();

  const [activeTab, setActiveTab] = useState<ProfileTab>('data');
  const [name, setName] = useState(user.name);
  const [crp, setCrp] = useState(user.crp);
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  const primaryLicense = licenses[0];
  const recentPurchases = purchases.slice(0, 4);
  const hasProfileChanges = name.trim() !== user.name || crp.trim() !== user.crp;

  const initials = useMemo(() => {
    const parts = (user.name || user.email).trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (parts[0]?.slice(0, 2) ?? 'PS').toUpperCase();
  }, [user.name, user.email]);

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      showToast('Informe seu nome completo.');
      return;
    }

    setSaving(true);
    const result = await updateUserProfile({ name: name.trim(), crp: crp.trim() });
    if (result.error) {
      showToast(result.error);
    } else {
      showToast('Perfil atualizado com sucesso.');
    }
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      showToast('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('As senhas não coincidem.');
      return;
    }

    setChangingPassword(true);
    const result = await updatePassword(newPassword);
    if (result.error) {
      showToast(result.error);
    } else {
      showToast('Senha alterada com sucesso.');
      setNewPassword('');
      setConfirmPassword('');
    }
    setChangingPassword(false);
  };

  const handleSendResetEmail = async () => {
    if (!user.email) {
      showToast('E-mail não encontrado na conta.');
      return;
    }

    setSendingReset(true);
    const result = await resetPassword(user.email);
    if (result.error) {
      showToast(result.error);
    } else {
      showToast('Enviamos um link de redefinição para o seu e-mail.');
    }
    setSendingReset(false);
  };

  return (
    <DashboardShell>
      <DashboardHero
        badge="Configurações"
        badgeDotClass="bg-[#88B7A5]"
        title="Seu perfil profissional"
        description="Gerencie seus dados cadastrais, segurança da conta e acompanhe o resumo da sua biblioteca clínica."
        aside={
          <div className="bg-[#EEF5F2] border border-[#C8DDD4]/50 rounded-2xl px-5 py-4 min-w-[220px] text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#88B7A5]/15 border border-[#C8DDD4]/60 flex items-center justify-center text-sm font-bold text-[#527A6B]">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#527A6B] truncate">
                  {user.name || 'Profissional'}
                </p>
                <p className="text-xs text-[#527A6B]/70 truncate">{user.email}</p>
              </div>
            </div>
            {user.memberSince ? (
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/55">
                Membro desde {user.memberSince}
              </p>
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
              ? '1 recurso na biblioteca'
              : `${purchasedProducts.length} recursos na biblioteca`
          }
          accent="green"
        />
        <DashboardStatCard
          icon={Receipt}
          label="Aquisições"
          value={String(purchases.length)}
          hint={purchases.length > 0 ? 'Histórico na aba Minha conta' : 'Nenhuma compra ainda'}
          accent="neutral"
        />
        <DashboardStatCard
          icon={ShieldCheck}
          label="Licença clínica"
          value={primaryLicense?.status ?? 'Sem licença'}
          hint={
            primaryLicense?.licenseCode
              ? `Código ${primaryLicense.licenseCode}`
              : 'Vinculada aos materiais adquiridos'
          }
          accent="rose"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {profileTabs.map(({ id, label, icon: Icon }) => (
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
      </div>

      {activeTab === 'data' && (
        <DashboardPanel>
          <DashboardSectionHeader
            title="Dados cadastrais"
            subtitle="Nome e registro profissional usados na licença e nos materiais"
          />
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <label htmlFor="profile-name" className={dashboardLabelClass}>
                Nome completo
              </label>
              <input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={dashboardInputClass}
                placeholder="Seu nome profissional"
              />
            </div>

            <div>
              <label htmlFor="profile-crp" className={dashboardLabelClass}>
                Registro profissional (CRP)
              </label>
              <input
                id="profile-crp"
                value={crp}
                onChange={(e) => setCrp(e.target.value)}
                className={dashboardInputClass}
                placeholder="Ex.: CRP 08/00000"
              />
            </div>

            <div>
              <span className={dashboardLabelClass}>E-mail comercial</span>
              <div className="flex items-center gap-3 bg-[#F8FAF9] border border-[#C8DDD4]/60 rounded-xl px-4 py-3">
                <Mail className="w-4 h-4 text-[#527A6B]/50 shrink-0" />
                <span className="text-sm font-medium text-[#527A6B]">{user.email}</span>
              </div>
              <p className="text-xs text-[#527A6B]/60 mt-2">
                O e-mail de login não pode ser alterado aqui. Use a aba Segurança para recuperar
                acesso.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <DashboardPrimaryButton
                disabled={saving || !hasProfileChanges}
                onClick={handleSaveProfile}
              >
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </DashboardPrimaryButton>
              {hasProfileChanges ? (
                <button
                  type="button"
                  onClick={() => {
                    setName(user.name);
                    setCrp(user.crp);
                  }}
                  className="text-sm font-semibold text-[#527A6B]/70 hover:text-[#527A6B] px-4 py-2.5"
                >
                  Descartar
                </button>
              ) : null}
            </div>
          </div>
        </DashboardPanel>
      )}

      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardPanel>
            <DashboardSectionHeader
              title="Alterar senha"
              subtitle="Defina uma nova senha para acessar sua conta"
            />
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <label htmlFor="new-password" className={dashboardLabelClass}>
                  Nova senha
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={dashboardInputClass}
                  autoComplete="new-password"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className={dashboardLabelClass}>
                  Confirmar nova senha
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={dashboardInputClass}
                  autoComplete="new-password"
                  placeholder="Repita a nova senha"
                />
              </div>
              <DashboardPrimaryButton
                disabled={changingPassword || !newPassword || !confirmPassword}
                onClick={handleChangePassword}
              >
                {changingPassword ? 'Atualizando...' : 'Atualizar senha'}
              </DashboardPrimaryButton>
            </div>
          </DashboardPanel>

          <DashboardPanel>
            <DashboardSectionHeader
              title="Recuperar acesso"
              subtitle="Receba um link de redefinição no seu e-mail"
            />
            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm text-[#527A6B]/75 leading-relaxed">
                Se preferir redefinir a senha por e-mail, enviaremos um link seguro para{' '}
                <span className="font-semibold text-[#527A6B]">{user.email}</span>.
              </p>
              <button
                type="button"
                disabled={sendingReset}
                onClick={handleSendResetEmail}
                className="w-full border border-[#C8DDD4] hover:bg-[#EEF5F2] disabled:opacity-60 text-[#527A6B] text-sm font-semibold px-5 py-3 rounded-full transition-all inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {sendingReset ? 'Enviando...' : 'Enviar link por e-mail'}
              </button>
            </div>
          </DashboardPanel>
        </div>
      )}

      {activeTab === 'account' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardPanel className="lg:col-span-2 overflow-hidden">
            <DashboardSectionHeader
              title="Histórico de aquisições"
              subtitle="Suas compras e liberações recentes"
            />
            <div className="p-6 sm:p-8">
              {recentPurchases.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <p className="text-sm text-[#527A6B]/70">Nenhuma aquisição registrada ainda.</p>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#88B7A5] hover:text-[#72A190]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Explorar catálogo
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentPurchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F8FAF9] border border-[#C8DDD4]/40"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#527A6B] truncate">
                          {purchase.productTitle}
                        </p>
                        <p className="text-xs text-[#527A6B]/65">
                          {purchase.date} · {purchase.status}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#527A6B] shrink-0">
                        {formatBRL(purchase.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DashboardPanel>

          <div className="space-y-6">
            <DashboardPanel>
              <DashboardSectionHeader title="Atalhos" subtitle="Acesso rápido à plataforma" />
              <div className="p-4 sm:p-5 space-y-2">
                {[
                  { href: '/biblioteca', label: 'Minha Área', icon: BookOpen },
                  { href: '/catalogo', label: 'Catálogo', icon: ShoppingBag },
                  ...(user.isAdmin
                    ? [{ href: '/admin', label: 'Painel Administrativo', icon: Settings }]
                    : []),
                ].map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#C8DDD4]/50 hover:border-[#88B7A5]/40 hover:bg-[#F8FAF9] transition-all group"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#527A6B]">
                      <Icon className="w-4 h-4 text-[#88B7A5]" />
                      {label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#527A6B]/40 group-hover:text-[#527A6B]/70" />
                  </Link>
                ))}
              </div>
            </DashboardPanel>

            <DashboardPanel>
              <DashboardSectionHeader title="Sessão" subtitle="Encerrar acesso neste dispositivo" />
              <div className="p-4 sm:p-5">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full border border-red-200 hover:bg-red-50 text-red-700 text-sm font-semibold px-5 py-3 rounded-full transition-all inline-flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair da conta
                </button>
              </div>
            </DashboardPanel>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
