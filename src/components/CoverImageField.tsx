'use client';

import { useEffect, useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface CoverImageFieldProps {
  file: File | null;
  existingUrl?: string | null;
  removeCover?: boolean;
  onChange: (file: File | null) => void;
  onRemoveExisting?: () => void;
  onRestoreExisting?: () => void;
}

export default function CoverImageField({
  file,
  existingUrl,
  removeCover = false,
  onChange,
  onRemoveExisting,
  onRestoreExisting,
}: CoverImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const displayUrl = preview ?? (!removeCover ? existingUrl : null);

  const handleFile = (selected: File | null) => {
    onChange(selected);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-semibold uppercase tracking-wide">Foto de capa</label>
      <p className="text-[10px] text-[#8A645D]/70 leading-relaxed">
        JPG, PNG ou WebP. Recomendado proporção vertical ou quadrada, até 5 MB.
      </p>

      {displayUrl ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#D4C6C2] bg-[#F3F1F0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={displayUrl} alt="Prévia da capa" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={() => {
              if (file) {
                handleFile(null);
              } else if (existingUrl && onRemoveExisting) {
                onRemoveExisting();
              }
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-red-700 hover:bg-white shadow-sm"
            title="Remover capa"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full border border-dashed border-[#D4C6C2] rounded-xl py-8 text-[#8A645D]/70 hover:bg-[#F3F1F0] transition-all flex flex-col items-center gap-2"
        >
          <ImagePlus className="w-6 h-6" />
          <span>Selecionar imagem de capa</span>
        </button>
      )}

      <div className="flex flex-wrap gap-3">
        {displayUrl && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-[10px] font-semibold text-[#8A645D] underline"
          >
            Trocar imagem
          </button>
        )}
        {removeCover && existingUrl && onRestoreExisting && (
          <button
            type="button"
            onClick={onRestoreExisting}
            className="text-[10px] font-semibold text-[#8A645D] underline"
          >
            Restaurar capa atual
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
