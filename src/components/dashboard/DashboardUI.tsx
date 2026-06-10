import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export const dashboardInputClass =
  'w-full bg-white border border-[#C8DDD4]/70 rounded-xl px-4 py-2.5 text-sm text-[#527A6B] outline-none transition-colors focus:border-[#88B7A5] focus:ring-2 focus:ring-[#88B7A5]/15';

export const dashboardLabelClass =
  'block text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/70 mb-1.5';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-[#F8FAF9]">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#88B7A5]/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#E8A8B8]/10 blur-3xl" />
      </div>
      <div className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {children}
      </div>
    </div>
  );
}

interface DashboardHeroProps {
  badge: string;
  badgeDotClass?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
}

export function DashboardHero({
  badge,
  badgeDotClass = 'bg-emerald-500',
  title,
  description,
  actions,
  aside,
}: DashboardHeroProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-[#C8DDD4]/60 rounded-[2rem] shadow-sm shadow-[#88B7A5]/5 p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
      <div className="space-y-4 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${badgeDotClass}`} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#527A6B]/75">
            {badge}
          </span>
        </div>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#527A6B] leading-tight">
          {title}
        </h1>
        <p className="text-sm text-[#527A6B]/80 leading-relaxed">{description}</p>
        {actions ? <div className="flex flex-wrap gap-3 pt-1">{actions}</div> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

interface DashboardStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  accent?: 'green' | 'rose' | 'neutral';
}

const statAccent = {
  green: 'bg-[#88B7A5]/10 text-[#527A6B]',
  rose: 'bg-[#FBF0F3] text-[#527A6B]',
  neutral: 'bg-[#EEF5F2] text-[#527A6B]',
};

export function DashboardStatCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = 'neutral',
}: DashboardStatCardProps) {
  return (
    <div className="bg-white border border-[#C8DDD4]/60 rounded-2xl p-6 shadow-sm text-left hover:shadow-md hover:border-[#88B7A5]/30 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/60">
            {label}
          </p>
          <p className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#527A6B]">{value}</p>
          {hint ? <p className="text-xs text-[#527A6B]/65">{hint}</p> : null}
        </div>
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${statAccent[accent]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

interface DashboardPanelProps {
  children: ReactNode;
  className?: string;
}

export function DashboardPanel({ children, className = '' }: DashboardPanelProps) {
  return (
    <div
      className={`bg-white border border-[#C8DDD4]/60 rounded-[2rem] shadow-sm text-left ${className}`}
    >
      {children}
    </div>
  );
}

interface DashboardSectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function DashboardSectionHeader({ title, subtitle, action }: DashboardSectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#C8DDD4]/40 px-6 sm:px-8 py-5">
      <div className="space-y-1">
        <h2 className="font-serif-brand text-xl font-bold text-[#527A6B]">{title}</h2>
        {subtitle ? <p className="text-xs text-[#527A6B]/70">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

interface DashboardEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function DashboardEmptyState({
  icon: Icon,
  title,
  description,
  action,
}: DashboardEmptyStateProps) {
  return (
    <div className="text-center py-16 px-6 space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-[#EEF5F2] border border-[#C8DDD4]/50 flex items-center justify-center mx-auto text-[#88B7A5]">
        <Icon className="w-7 h-7" />
      </div>
      <div className="space-y-2 max-w-sm mx-auto">
        <p className="font-serif-brand text-xl font-bold text-[#527A6B]">{title}</p>
        <p className="text-sm text-[#527A6B]/70 leading-relaxed">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function DashboardPrimaryButton({
  children,
  className = '',
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={`bg-[#88B7A5] hover:bg-[#72A190] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm transition-all inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function DashboardSecondaryLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`border border-[#C8DDD4] hover:bg-[#EEF5F2] text-[#527A6B] text-sm font-semibold px-5 py-2.5 rounded-full transition-all inline-flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </Link>
  );
}
