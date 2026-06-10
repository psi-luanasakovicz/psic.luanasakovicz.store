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
    <footer className="bg-[#88B7A5] text-[#F8FAF9]/90 border-t border-[#C8DDD4]/20 pt-8 pb-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-left">
        <div className="sm:col-span-2 lg:col-span-1 space-y-2">
          <h3 className="font-serif-brand text-lg font-bold tracking-wide">
            Psic. Luana Sakovicz
          </h3>
          <p className="text-[11px] text-[#F8FAF9]/80 leading-relaxed max-w-xs">
            Psicóloga (TCC) · {theme.contact.crp} · Campo Largo (PR) e online.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#F8FAF9]/75">
            Explorar
          </h4>
          <ul className="text-xs space-y-1.5">
            <li>
              <Link href="/" className="hover:underline text-[#F8FAF9]/85">
                Início
              </Link>
            </li>
            <li>
              <Link href="/catalogo" className="hover:underline text-[#F8FAF9]/85">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/biblioteca" className="hover:underline text-[#F8FAF9]/85">
                Área do Cliente
              </Link>
            </li>
            {user.isLoggedIn && user.isAdmin && (
              <li>
                <Link href="/admin" className="hover:underline text-[#F8FAF9]/85">
                  Painel Admin
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="space-y-2 sm:col-span-2 lg:col-span-2">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#F8FAF9]/75">
            Contacto
          </h4>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-6 gap-y-2 text-xs">
            <a
              href={`mailto:${theme.contact.email}`}
              className="inline-flex items-center gap-1.5 hover:underline text-[#F8FAF9]/90"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              {theme.contact.email}
            </a>
            <a
              href={theme.contact.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline text-[#F8FAF9]/90"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              {theme.contact.phone}
            </a>
            <div className="flex gap-2 sm:ml-auto">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F8FAF9]/15 hover:bg-[#F8FAF9]/25 text-[10px] px-2.5 py-1 rounded-full transition-all"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-[#C8DDD4]/20 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-[#F8FAF9]/65">
        <p>© 2026 Luana Sakovicz</p>
        <p>Materiais clínicos para profissionais de saúde mental</p>
      </div>
    </footer>
  );
}
