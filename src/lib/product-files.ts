import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { DeliveryFileForm, DeliveryFileType } from '@/types/product';

const BUCKET = 'product-files';
const MAX_BYTES = 50 * 1024 * 1024;

const MIME_BY_TYPE: Partial<Record<DeliveryFileType, string[]>> = {
  pdf: ['application/pdf'],
  docx: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
  ],
  audio: ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'],
  zip: ['application/zip', 'application/x-zip-compressed'],
};

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-');
}

export function validateDeliveryUpload(file: File, type: DeliveryFileType): string | null {
  if (type === 'link') {
    return 'Links não usam upload de arquivo.';
  }

  if (file.size > MAX_BYTES) {
    return 'Arquivo muito grande. O máximo é 50 MB.';
  }

  const allowed = MIME_BY_TYPE[type];
  if (allowed && !allowed.includes(file.type) && type !== 'other') {
    return `Formato inválido para ${type.toUpperCase()}.`;
  }

  return null;
}

export async function uploadDeliveryFile(
  supabase: SupabaseClient<Database>,
  file: File,
  productSlug: string,
  type: DeliveryFileType,
): Promise<{ storagePath: string | null; error: string | null }> {
  const validationError = validateDeliveryUpload(file, type);
  if (validationError) {
    return { storagePath: null, error: validationError };
  }

  const safeName = sanitizeFilename(file.name);
  const storagePath = `${productSlug}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });

  if (error) {
    return { storagePath: null, error: error.message };
  }

  return { storagePath, error: null };
}

export async function processDeliveryFilesForSave(
  supabase: SupabaseClient<Database>,
  files: DeliveryFileForm[],
  productSlug: string,
): Promise<{ files: DeliveryFileForm[]; error: string | null }> {
  const processed: DeliveryFileForm[] = [];

  for (const file of files) {
    if (!file.label.trim() && !file.url?.trim() && !file.storagePath && !file.localFile) {
      continue;
    }

    if (file.type === 'link') {
      if (!file.url?.trim()) {
        return { files: [], error: 'Informe a URL para todos os itens do tipo Link externo.' };
      }
      processed.push({
        type: file.type,
        label: file.label,
        url: file.url.trim(),
        storagePath: undefined,
        localFile: null,
      });
      continue;
    }

    if (file.localFile) {
      const upload = await uploadDeliveryFile(
        supabase,
        file.localFile,
        productSlug,
        file.type,
      );
      if (upload.error) {
        return { files: [], error: upload.error };
      }
      processed.push({
        type: file.type,
        label: file.label,
        storagePath: upload.storagePath ?? undefined,
        url: undefined,
        localFile: null,
      });
      continue;
    }

    if (file.storagePath || file.url?.trim()) {
      processed.push({
        type: file.type,
        label: file.label,
        storagePath: file.storagePath,
        url: file.url?.trim() || undefined,
        localFile: null,
      });
    }
  }

  return { files: processed, error: null };
}
