'use client';

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { theme } from '@/lib/theme';

const socialLinks = [
  { label: 'Instagram', href: theme.contact.social.instagram },
  { label: 'LinkedIn', href: theme.contact.social.linkedin },
  { label: 'WhatsApp', href: theme.contact.social.whatsapp },
] as const;

export default function Footer() {
  const { user } = useApp();

  return (
    <footer className="bg-[#88B7A5] text-[#F8FAF9]/90 border-t border-[#C8DDD4]/20 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-serif-brand text-2xl font-bold tracking-wide">
            Psic. Luana Sakovicz
          </h3>
          <p className="text-xs text-[#F8FAF9]/85 max-w-sm leading-relaxed">
            Psicóloga com atuação clínica sob a abordagem Cognitivo-Comportamental (TCC).
            Oferecendo atendimento humanizado, sensível e ferramentas que potencializam o
            processo de autoconhecimento.
          </p>
          <div className="text-[11px] text-[#F8FAF9]/70 space-y-1">
            <p>Registro: {theme.contact.crp}</p>
            <p>Atendimento presencial em Campo Largo (PR) e online para todo o Brasil.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-serif-brand font-bold text-sm uppercase tracking-wider">
            Explorar
          </h4>
          <ul className="text-xs space-y-2.5">
            <li>
              <Link href="/" className="hover:underline text-[#F8FAF9]/80">
                Início
              </Link>
            </li>
            <li>
              <Link href="/materiais" className="hover:underline text-[#F8FAF9]/80">
                Boutique de Materiais
              </Link>
            </li>
            <li>
              <Link href="/biblioteca" className="hover:underline text-[#F8FAF9]/80">
                Área do Cliente
              </Link>
            </li>
            {user.isLoggedIn && user.isAdmin && (
              <li>
                <Link href="/admin" className="hover:underline text-[#F8FAF9]/80">
                  Painel Administrativo
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-serif-brand font-bold text-sm uppercase tracking-wider">
            Contacto Direto
          </h4>
          <div className="text-xs space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a
                href={`mailto:${theme.contact.email}`}
                className="hover:underline text-[#F8FAF9]/90"
              >
                {theme.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <a
                href={theme.contact.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-[#F8FAF9]/90"
              >
                {theme.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F8FAF9]/15 hover:bg-[#F8FAF9]/25 text-xs px-3 py-1.5 rounded-full transition-all"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#C8DDD4]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#F8FAF9]/70">
        <p>© 2026 Luana Sakovicz. Todos os direitos reservados.</p>
        <p>Feito com carinho para o desenvolvimento profissional em saúde mental.</p>
      </div>
    </footer>
  );
}
