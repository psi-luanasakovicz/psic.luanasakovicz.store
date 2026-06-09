'use client';

import { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { deliveryFileIcon } from '@/lib/delivery-files';
import { downloadDeliveryFile } from '@/lib/protected-download';
import { DELIVERY_FILE_TYPE_LABELS, type DeliveryFile } from '@/types/product';

interface ProductDownloadsProps {
  productId: string;
  files: DeliveryFile[];
  compact?: boolean;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}

export default function ProductDownloads({
  productId,
  files,
  compact = false,
  onError,
  onSuccess,
}: ProductDownloadsProps) {
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  if (files.length === 0) {
    return null;
  }

  const handleDownload = async (file: DeliveryFile) => {
    const key = file.storagePath ?? file.url ?? file.label;
    setLoadingPath(key);

    const result = await downloadDeliveryFile(productId, file);

    setLoadingPath(null);

    if (result.error) {
      onError?.(result.error);
    } else {
      onSuccess?.(`Download de "${file.label}" iniciado.`);
    }
  };

  return (
    <div
      className={`bg-[#EEF5F2]/30 border border-[#C8DDD4]/40 rounded-2xl ${compact ? 'p-4 space-y-2' : 'p-6 space-y-3'}`}
    >
      <h3 className="font-serif-brand font-bold text-sm">Arquivos para download</h3>
      <div className="space-y-2">
        {files.map((file, index) => {
          const key = file.storagePath ?? file.url ?? `${file.label}-${index}`;
          const isLoading = loadingPath === key;

          return (
            <div
              key={key}
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
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleDownload(file)}
                className="flex items-center gap-1 text-[10px] font-semibold text-[#527A6B] hover:underline flex-shrink-0 disabled:opacity-60"
              >
                {file.type === 'link' ? (
                  <ExternalLink className="w-3 h-3" />
                ) : (
                  <Download className="w-3 h-3" />
                )}
                {isLoading ? 'Abrindo...' : 'Baixar'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
