import type { DeliveryFile, DeliveryFileForm, DeliveryFileType } from '@/types/product';
import { DELIVERY_FILE_TYPE_LABELS } from '@/types/product';

export function createEmptyDeliveryFile(): DeliveryFileForm {
  return { type: 'pdf', label: '', url: '', localFile: null };
}

export function buildFormatSummary(files: DeliveryFile[]): string {
  const labels = files
    .filter((f) => f.label.trim())
    .map((f) => {
      const typeLabel = DELIVERY_FILE_TYPE_LABELS[f.type];
      return f.label.trim() ? `${typeLabel}: ${f.label.trim()}` : typeLabel;
    });

  if (labels.length === 0) {
    return '';
  }

  return labels.join(' • ');
}

export function sanitizeDeliveryFiles(files: DeliveryFile[]): DeliveryFile[] {
  return files
    .filter((f) => f.label.trim() || f.url?.trim() || f.storagePath?.trim())
    .map((f) => ({
      type: f.type,
      label: f.label.trim() || DELIVERY_FILE_TYPE_LABELS[f.type],
      url: f.url?.trim() || undefined,
      storagePath: f.storagePath?.trim() || undefined,
    }));
}

export function deliveryFileIcon(type: DeliveryFileType): string {
  const icons: Record<DeliveryFileType, string> = {
    pdf: '📄',
    docx: '📝',
    link: '🔗',
    audio: '🎧',
    zip: '📦',
    other: '📎',
  };
  return icons[type];
}
