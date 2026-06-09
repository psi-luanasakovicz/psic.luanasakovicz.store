'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#527A6B]/80 backdrop-blur-sm"
        aria-label="Fechar visualização"
        onClick={onClose}
      />

      <div className="relative z-10 max-w-5xl w-full max-h-[90vh] flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#F8FAF9]/90 hover:bg-white text-[#527A6B] rounded-full p-2 shadow-lg transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full max-h-[calc(90vh-3rem)] object-contain rounded-2xl border-2 border-[#C8DDD4] shadow-2xl bg-[#F8FAF9]"
        />
      </div>
    </div>
  );
}
