-- Adiciona suporte a tipos de arquivo (PDF, Word, links, etc.)
-- Execute no SQL Editor do Supabase se o schema já foi aplicado antes.

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS delivery_files JSONB NOT NULL DEFAULT '[]'::JSONB;

COMMENT ON COLUMN public.products.delivery_files IS
  'Lista de arquivos/links entregues: [{ type, label, url? }]';
