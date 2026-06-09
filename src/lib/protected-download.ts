import type { DeliveryFile } from '@/types/product';

export async function downloadDeliveryFile(
  productId: string,
  file: DeliveryFile,
): Promise<{ error: string | null }> {
  if (file.type === 'link' && file.url) {
    window.open(file.url, '_blank', 'noopener,noreferrer');
    return { error: null };
  }

  if (file.storagePath) {
    const params = new URLSearchParams({
      productId,
      path: file.storagePath,
    });

    const response = await fetch(`/api/files/download?${params.toString()}`);
    const payload = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !payload.url) {
      return { error: payload.error ?? 'Não foi possível gerar o download.' };
    }

    window.open(payload.url, '_blank', 'noopener,noreferrer');
    return { error: null };
  }

  if (file.url) {
    window.open(file.url, '_blank', 'noopener,noreferrer');
    return { error: null };
  }

  return { error: 'Arquivo não disponível para download.' };
}
