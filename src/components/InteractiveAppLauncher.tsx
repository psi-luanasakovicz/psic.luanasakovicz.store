import Link from 'next/link';
import { ExternalLink, Layers } from 'lucide-react';
import type { InteractiveApp } from '@/lib/interactive-apps';
import { getInteractiveAppLibraryPath } from '@/lib/interactive-apps';

interface InteractiveAppLauncherProps {
  app: InteractiveApp;
}

export default function InteractiveAppLauncher({ app }: InteractiveAppLauncherProps) {
  const libraryPath = getInteractiveAppLibraryPath(app.slug);

  return (
    <div className="bg-gradient-to-r from-[#88B7A5]/10 via-[#FBF0F3] to-[#E8A8B8]/10 border border-[#C8DDD4] rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-2 text-left">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#527A6B] bg-[#FBF0F3] px-2.5 py-1 rounded-full">
          <Layers className="w-3.5 h-3.5 text-[#88B7A5]" />
          {app.badge}
        </span>
        <h2 className="font-serif-brand text-xl font-bold text-[#88B7A5]">{app.title}</h2>
        <p className="text-sm text-[#527A6B]/85 max-w-lg">{app.description}</p>
        <p className="text-[11px] text-[#527A6B]/65">
          Licenciado para uso clínico. Abra em tela cheia durante o atendimento.
        </p>
      </div>

      <Link
        href={libraryPath}
        className="bg-[#88B7A5] hover:bg-[#72A190] text-white px-8 py-4 rounded-full font-bold shadow-md transition-all text-sm inline-flex items-center justify-center gap-2 shrink-0"
      >
        <ExternalLink className="w-4 h-4" />
        Abrir baralho interativo
      </Link>
    </div>
  );
}
