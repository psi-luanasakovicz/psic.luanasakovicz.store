import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const BUCKET = 'product-covers';
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function extensionFor(file: File): string {
  const fromName = file.name.split('.').pop()?.toLowerCase();
  if (fromName && ['jpg', 'jpeg', 'png', 'webp'].includes(fromName)) {
    return fromName === 'jpeg' ? 'jpg' : fromName;
  }

  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'jpg';
}

export function validateCoverImage(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return 'Formato inválido. Use JPG, PNG ou WebP.';
  }

  if (file.size > MAX_BYTES) {
    return 'Imagem muito grande. O máximo é 5 MB.';
  }

  return null;
}

export async function uploadProductCover(
  supabase: SupabaseClient<Database>,
  file: File,
  slug: string,
): Promise<{ url: string | null; error: string | null }> {
  const validationError = validateCoverImage(file);
  if (validationError) {
    return { url: null, error: validationError };
  }

  const ext = extensionFor(file);
  const path = `${slug}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    return { url: null, error: error.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
