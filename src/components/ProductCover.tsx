import type { Product } from '@/types/product';

interface ProductCoverProps {
  product: Product;
  className?: string;
  children?: React.ReactNode;
  overlay?: 'light' | 'strong';
}

export default function ProductCover({
  product,
  className = '',
  children,
  overlay = 'light',
}: ProductCoverProps) {
  if (product.coverImageUrl) {
    const overlayClass =
      overlay === 'strong'
        ? 'bg-gradient-to-t from-[#8A645D]/85 via-[#8A645D]/35 to-[#8A645D]/10'
        : 'bg-gradient-to-t from-[#8A645D]/50 via-transparent to-transparent';

    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.coverImageUrl}
          alt={`Capa: ${product.title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
        {children ? (
          <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br ${product.imageColor} ${className}`}>{children}</div>
  );
}
