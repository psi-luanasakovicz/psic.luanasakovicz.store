import type { ProductContent, Product, ProductCategory, DeliveryFile } from '@/types/product';
import type { Json, ProductRow } from '@/types/database';

function parseDeliveryFiles(value: Json | undefined): DeliveryFile[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === 'object' && item !== null && !Array.isArray(item))
    .map((item) => {
      const record = item as Record<string, unknown>;
      return {
        type: (record.type as DeliveryFile['type']) ?? 'other',
        label: String(record.label ?? ''),
        url: record.url ? String(record.url) : undefined,
        storagePath: record.storagePath ? String(record.storagePath) : undefined,
      };
    })
    .filter((f) => f.label);
}

export function mapProductRow(row: ProductRow): Product {
  const details = Array.isArray(row.details) ? (row.details as string[]) : [];
  const contents = Array.isArray(row.contents)
    ? (row.contents as unknown as ProductContent[])
    : [];

  const pagesNumber = Number(row.pages);
  const pages = Number.isNaN(pagesNumber) ? row.pages : pagesNumber;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category as ProductCategory,
    subtitle: row.subtitle,
    price: Number(row.price),
    description: row.description,
    pages,
    format: row.format,
    bonus: row.bonus,
    rating: Number(row.rating),
    sales: row.sales,
    imageColor: row.image_color,
    coverImageUrl: row.cover_image_url ?? undefined,
    badge: row.badge ?? undefined,
    details,
    contents,
    deliveryFiles: parseDeliveryFiles(row.delivery_files ?? []),
    isActive: row.is_active,
  };
}

export function mapProductToInsert(product: Omit<Product, 'id'> & { id?: string }) {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    category: product.category,
    subtitle: product.subtitle,
    price: product.price,
    description: product.description,
    pages: String(product.pages),
    format: product.format,
    bonus: product.bonus,
    rating: product.rating,
    sales: product.sales,
    image_color: product.imageColor,
    cover_image_url: product.coverImageUrl ?? null,
    badge: product.badge ?? null,
    details: product.details,
    contents: product.contents,
    delivery_files: product.deliveryFiles,
    is_active: true,
  };
}
