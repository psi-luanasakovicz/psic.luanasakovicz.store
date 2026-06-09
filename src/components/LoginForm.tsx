'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { theme } from '@/lib/theme';

export default function LoginForm() {
  const { login, resetPassword, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [formError, setFormError] = useState('');

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-6">
      <div className="bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <span className="w-12 h-12 rounded-full bg-[#8A645D]/10 flex items-center justify-center text-[#8A645D] mx-auto">
            <Lock className="w-5 h-5" />
          </span>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">Acesse sua Conta</h1>
          <p className="text-xs text-[#8A645D]/80">
            Para acessar sua biblioteca exclusiva de recursos digitais.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setFormError('');
            const form = e.currentTarget;
            const email = (form.elements.namedItem('email') as HTMLInputElement).value;
            const password = (form.elements.namedItem('password') as HTMLInputElement).value;
            const result = await login(email, password);
            if (result.error) {
              setFormError(result.error);
              showToast(result.error);
            }
            setLoading(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">
              Senha
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
            />
          </div>

          {formError && (
            <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 leading-relaxed">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8A645D] hover:bg-[#76514B] disabled:opacity-60 text-white py-3 rounded-full text-xs font-semibold shadow-sm transition-all"
          >
            {loading ? 'Entrando...' : 'Confirmar Login'}
          </button>
        </form>

        <div className="text-center pt-2 space-y-2">
          <button
            type="button"
            disabled={resetLoading}
            onClick={async () => {
              const email = prompt('Informe seu e-mail para recuperação de senha:');
              if (!email) return;
              setResetLoading(true);
              const result = await resetPassword(email);
              if (result.error) {
                showToast(result.error);
              } else {
                showToast('Enviamos um link de recuperação para o seu e-mail.');
              }
              setResetLoading(false);
            }}
            className="text-xs underline text-[#8A645D]/80 hover:text-[#8A645D] block w-full"
          >
            {resetLoading ? 'Enviando...' : 'Esqueci minha senha'}
          </button>
          <Link
            href="/cadastro"
            className="text-xs underline text-[#8A645D]/80 hover:text-[#8A645D]"
          >
            Não tem conta? Crie uma agora.
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-[#8A645D]/60">
        <p>Precisa de suporte com suas compras?</p>
        <p className="font-semibold underline cursor-pointer mt-1">{theme.contact.email}</p>
      </div>
    </div>
  );
}
