import { Layers } from 'lucide-react';
import type { InteractiveApp } from '@/lib/interactive-apps';

interface InteractiveAppCatalogNoteProps {
  app: InteractiveApp;
}

export default function InteractiveAppCatalogNote({ app }: InteractiveAppCatalogNoteProps) {
  return (
    <div className="bg-gradient-to-r from-[#88B7A5]/10 to-[#FBF0F3] border border-[#C8DDD4] rounded-2xl p-6">
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
          <p className="text-[10px] text-[#527A6B]/65 pt-1">
            Após a compra, o app fica disponível na Área do Cliente.
          </p>
        </div>
      </div>
    </div>
  );
}
