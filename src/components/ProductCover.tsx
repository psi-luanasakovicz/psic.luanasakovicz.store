'use client';

import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import ImageLightbox from '@/components/ImageLightbox';
import type { Product } from '@/types/product';

interface ProductCoverProps {
  product: Product;
  className?: string;
  children?: React.ReactNode;
  overlay?: 'light' | 'strong';
  expandable?: boolean;
}

export default function ProductCover({
  product,
  className = '',
  children,
  overlay = 'light',
  expandable = false,
}: ProductCoverProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const canExpand = expandable && Boolean(product.coverImageUrl);

  if (product.coverImageUrl) {
    const overlayClass =
      overlay === 'strong'
        ? 'bg-gradient-to-t from-[#88B7A5]/85 via-[#88B7A5]/35 to-[#88B7A5]/10'
        : 'bg-gradient-to-t from-[#88B7A5]/50 via-transparent to-transparent';

    return (
      <>
        <div
          className={`relative overflow-hidden ${canExpand ? 'group cursor-zoom-in' : ''} ${className}`}
          role={canExpand ? 'button' : undefined}
          tabIndex={canExpand ? 0 : undefined}
          aria-label={canExpand ? `Ver capa: ${product.title}` : undefined}
          onClick={canExpand ? () => setLightboxOpen(true) : undefined}
          onKeyDown={
            canExpand
              ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setLightboxOpen(true);
                  }
                }
              : undefined
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.coverImageUrl}
            alt={`Capa: ${product.title}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${overlayClass}`} />
          {canExpand && (
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="inline-flex items-center gap-1.5 bg-white/90 text-[#527A6B] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                <ZoomIn className="w-3.5 h-3.5" />
                Ampliar
              </span>
            </div>
          )}
          {children ? (
            <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
              {children}
            </div>
          ) : null}
        </div>

        {canExpand && (
          <ImageLightbox
            src={product.coverImageUrl}
            alt={`Capa: ${product.title}`}
            open={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className={`bg-gradient-to-br ${product.imageColor} ${className}`}>{children}</div>
  );
}
