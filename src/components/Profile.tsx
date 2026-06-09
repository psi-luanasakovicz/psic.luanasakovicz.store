'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Profile() {
  const { user, logout, showToast, updateUserProfile } = useApp();
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [crp, setCrp] = useState(user.crp);
  const [saving, setSaving] = useState(false);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto space-y-6">
      <div className="bg-[#EEF5F2] border border-[#C8DDD4] rounded-[2.5rem] p-8 space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#88B7A5]/10 flex items-center justify-center text-[#527A6B] mx-auto border-2 border-[#C8DDD4]">
            <User className="w-8 h-8" />
          </div>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">Seu Perfil</h1>
          <p className="text-xs text-[#527A6B]/80">Seus dados cadastrais e registro profissional.</p>
        </div>

        <div className="space-y-4 text-left text-xs">
          <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#C8DDD4]/60 space-y-1">
            <label className="text-[10px] text-[#527A6B]/50 block uppercase">Nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent font-semibold text-sm text-[#527A6B] focus:outline-none"
            />
          </div>

          <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#C8DDD4]/60 space-y-1">
            <span className="text-[10px] text-[#527A6B]/50 block uppercase">E-mail Comercial</span>
            <span className="font-semibold text-sm">{user.email}</span>
          </div>

          <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#C8DDD4]/60 space-y-1">
            <label className="text-[10px] text-[#527A6B]/50 block uppercase">
              Registro Profissional
            </label>
            <input
              value={crp}
              onChange={(e) => setCrp(e.target.value)}
              className="w-full bg-transparent font-semibold text-sm text-[#527A6B] focus:outline-none"
            />
          </div>

          <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#C8DDD4]/60 space-y-1">
            <span className="text-[10px] text-[#527A6B]/50 block uppercase">Status da Conta</span>
            <span className="font-semibold text-sm text-green-700">Licença Clínica Ativa</span>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="button"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              const result = await updateUserProfile({ name, crp });
              if (result.error) {
                showToast(result.error);
              } else {
                showToast('As alterações no perfil foram salvas com sucesso.');
                router.push('/biblioteca');
              }
              setSaving(false);
            }}
            className="flex-1 bg-[#88B7A5] hover:bg-[#72A190] disabled:opacity-60 text-white py-3 rounded-full text-xs font-semibold transition-all text-center"
          >
            {saving ? 'Salvando...' : 'Salvar Dados'}
          </button>
          <button
            type="button"
            onClick={logout}
            className="flex-1 border border-[#C8DDD4] hover:bg-red-50 hover:text-red-700 text-[#527A6B] py-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair da Conta</span>
          </button>
        </div>
      </div>
    </div>
  );
}
