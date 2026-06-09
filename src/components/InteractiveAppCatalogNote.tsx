import { Layers } from 'lucide-react';
import type { InteractiveApp } from '@/lib/interactive-apps';

interface InteractiveAppCatalogNoteProps {
  app: InteractiveApp;
}

export default function InteractiveAppCatalogNote({ app }: InteractiveAppCatalogNoteProps) {
  return (
    <div className="bg-gradient-to-r from-[#88B7A5]/10 to-[#FBF0F3] border border-[#C8DDD4] rounded-2xl p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E8A8B8]/25 flex items-center justify-center text-[#527A6B] flex-shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#527A6B]/80">
            {app.badge}
          </span>
          <h3 className="font-serif-brand font-bold text-base text-[#88B7A5]">{app.title}</h3>
          <p className="text-xs text-[#527A6B]/85 leading-relaxed">{app.description}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={app.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 border border-[#E8A8B8]/60 hover:bg-[#FBF0F3] text-[#527A6B] px-5 py-3 rounded-full font-semibold transition-all text-xs text-center"
        >
          Experimentar demo gratuita
        </a>
        <p className="flex-1 text-[10px] text-[#527A6B]/65 flex items-center justify-center text-center px-2">
          Após a compra, o app completo fica disponível na Área do Cliente.
        </p>
      </div>
    </div>
  );
}
