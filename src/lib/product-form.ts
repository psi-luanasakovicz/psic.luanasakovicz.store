import type { DeliveryFile, NewProductForm, Product, ProductContent } from '@/types/product';
import { buildFormatSummary, sanitizeDeliveryFiles } from '@/lib/delivery-files';

export function productToForm(product: Product): NewProductForm {
  return {
    title: product.title,
    category: product.category,
    subtitle: product.subtitle,
    price: String(product.price),
    description: product.description,
    pages: String(product.pages),
    format: product.format,
    bonus: product.bonus,
    badge: product.badge ?? '',
    details: product.details.join('\n'),
    contents: product.contents
      .map((section) => `${section.title}\n${section.text}`)
      .join('\n\n'),
    deliveryFiles: product.deliveryFiles.map((file) => ({
      type: file.type,
      label: file.label,
      url: file.url ?? '',
      storagePath: file.storagePath,
      localFile: null,
    })),
    coverImage: null,
    existingCoverUrl: product.coverImageUrl ?? null,
    removeCover: false,
  };
}

export function parseContentsText(text: string): ProductContent[] {
  const blocks = text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return [
      {
        title: 'Introdução e Guia',
        text: 'Instruções fundamentadas na psicologia clínica...',
      },
    ];
  }

  return blocks.map((block) => {
    const lines = block.split('\n');
    const title = lines[0]?.trim() || 'Seção';
    const textContent = lines.slice(1).join('\n').trim() || block;
    return { title, text: textContent };
  });
}

export function deliveryFormsToDeliveryFiles(forms: NewProductForm['deliveryFiles']): DeliveryFile[] {
  return sanitizeDeliveryFiles(
    forms.map((file) => ({
      type: file.type,
      label: file.label,
      url: file.url,
      storagePath: file.storagePath,
    })),
  );
}

export function buildFormatFromForm(
  form: NewProductForm,
  deliveryFiles: DeliveryFile[],
): string {
  return form.format.trim() || buildFormatSummary(deliveryFiles) || 'PDF de Alta Definição';
}
