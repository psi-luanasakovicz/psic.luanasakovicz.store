import { ExternalLink, FileText } from 'lucide-react';
import { deliveryFileIcon } from '@/lib/delivery-files';
import { DELIVERY_FILE_TYPE_LABELS, type DeliveryFile } from '@/types/product';

interface DeliveryFilesListProps {
  files: DeliveryFile[];
  compact?: boolean;
}

export default function DeliveryFilesList({ files, compact = false }: DeliveryFilesListProps) {
  if (files.length === 0) return null;

  return (
    <div
      className={`bg-[#EEF5F2]/30 border border-[#C8DDD4]/40 rounded-2xl ${compact ? 'p-4 space-y-2' : 'p-6 space-y-3'}`}
    >
      <h3 className="font-serif-brand font-bold text-sm">Arquivos e formatos inclusos</h3>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.type}-${file.label}-${index}`}
            className="flex items-start gap-3 bg-[#F8FAF9]/80 border border-[#C8DDD4]/50 rounded-xl p-3"
          >
            <span className="text-lg leading-none mt-0.5" aria-hidden>
              {deliveryFileIcon(file.type)}
            </span>
            <div className="flex-grow min-w-0">
              <p className="text-xs font-semibold text-[#527A6B]">{file.label}</p>
              <p className="text-[10px] text-[#527A6B]/65 uppercase tracking-wide">
                {DELIVERY_FILE_TYPE_LABELS[file.type]}
              </p>
            </div>
            {file.url ? (
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] font-semibold text-[#527A6B] hover:underline flex-shrink-0"
              >
                <ExternalLink className="w-3 h-3" />
                Abrir
              </a>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-[#527A6B]/50 flex-shrink-0">
                <FileText className="w-3 h-3" />
                Após compra
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
