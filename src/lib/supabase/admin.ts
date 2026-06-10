import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { getSupabaseEnv } from './env';

export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY é obrigatória para webhooks e operações server-side do checkout.',
    );
  }

  const { url } = getSupabaseEnv();

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
