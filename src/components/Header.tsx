'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Settings, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const { user, authLoading } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#F3F1F0]/90 backdrop-blur-md border-b border-[#D4C6C2]/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group shrink-0">
          <Image
            src="/logo-horizontal.png"
            alt="Luana Sakovicz — Psicóloga | CRP 08/48498"
            width={380}
            height={143}
            priority
            className="h-14 sm:h-16 w-auto group-hover:opacity-85 transition-opacity"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className={`hover:text-[#76514B] transition-colors ${isActive(pathname, '/') && pathname === '/' ? 'border-b-2 border-[#8A645D] pb-1' : ''}`}
          >
            Início
          </Link>
          <Link
            href="/materiais"
            className={`hover:text-[#76514B] transition-colors ${isActive(pathname, '/materiais') ? 'border-b-2 border-[#8A645D] pb-1' : ''}`}
          >
            Materiais
          </Link>
          {user.isLoggedIn && (
            <Link
              href="/biblioteca"
              className={`hover:text-[#76514B] transition-colors ${isActive(pathname, '/biblioteca') ? 'border-b-2 border-[#8A645D] pb-1' : ''}`}
            >
              Minha Área
            </Link>
          )}
          {user.isLoggedIn && user.isAdmin && (
            <Link
              href="/admin"
              className={`hover:text-[#76514B] flex items-center gap-1 transition-colors ${isActive(pathname, '/admin') ? 'border-b-2 border-[#8A645D] pb-1' : ''}`}
            >
              <Settings className="w-4 h-4" /> Painel Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {authLoading ? (
            <span className="text-xs text-[#8A645D]/60">...</span>
          ) : user.isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/perfil"
                className="hidden sm:flex items-center gap-2 bg-[#ECE9E8] border border-[#D4C6C2] px-3 py-1.5 rounded-full text-xs hover:bg-[#D4C6C2]/40 transition-all text-[#8A645D]"
              >
                <User className="w-3.5 h-3.5" />
                <span>{user.name.split(' ')[0] || 'Conta'}</span>
              </Link>
              <Link
                href="/biblioteca"
                className="bg-[#8A645D] hover:bg-[#76514B] text-[#F3F1F0] px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Área do Cliente</span>
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-[#8A645D] hover:bg-[#76514B] text-[#F3F1F0] px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5" />
              <span>Acessar Conta</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
