'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function RegisterForm() {
  const { register, showToast } = useApp();
  const [loading, setLoading] = useState(false);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-6">
      <div className="bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <span className="w-12 h-12 rounded-full bg-[#8A645D]/10 flex items-center justify-center text-[#8A645D] mx-auto">
            <User className="w-5 h-5" />
          </span>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">Crie seu Cadastro</h1>
          <p className="text-xs text-[#8A645D]/80">
            Para salvar seus materiais e acessar onde preferir.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const form = e.currentTarget;
            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
            const email = (form.elements.namedItem('email') as HTMLInputElement).value;
            const crp = (form.elements.namedItem('crp') as HTMLInputElement).value;
            const password = (form.elements.namedItem('password') as HTMLInputElement).value;
            const result = await register({ name, email, crp, password });
            if (result.error) {
              showToast(result.error);
            }
            setLoading(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">
              Nome Completo
            </label>
            <input
              name="name"
              type="text"
              placeholder="Ex: Dra. Juliana Reis"
              required
              className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">
              E-mail Comercial
            </label>
            <input
              name="email"
              type="email"
              placeholder="exemplo@email.com"
              required
              className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">
              CRP (Opcional)
            </label>
            <input
              name="crp"
              type="text"
              placeholder="Ex: CRP 08/29103"
              className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">
              Crie uma Senha
            </label>
            <input
              name="password"
              type="password"
              minLength={6}
              required
              className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
            />
          </div>

          <div className="text-[10px] text-[#8A645D]/70 space-y-1">
            <p>✓ Concordo com os Termos de Uso e Licenciamento Clínico.</p>
            <p>✓ Meus dados estão protegidos sob a LGPD.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8A645D] hover:bg-[#76514B] disabled:opacity-60 text-white py-3 rounded-full text-xs font-semibold shadow-sm transition-all"
          >
            {loading ? 'Cadastrando...' : 'Registrar e Conectar'}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/login" className="text-xs underline text-[#8A645D]/80 hover:text-[#8A645D]">
            Já tem uma conta? Faça Login.
          </Link>
        </div>
      </div>
    </div>
  );
}
