-- Capa do produto + bucket de storage
-- Execute no SQL Editor do Supabase se o schema já foi aplicado antes.

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

COMMENT ON COLUMN public.products.cover_image_url IS
  'URL pública da imagem de capa no Supabase Storage';

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-covers', 'product-covers', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

DROP POLICY IF EXISTS "Capas: leitura pública" ON storage.objects;
CREATE POLICY "Capas: leitura pública"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-covers');

DROP POLICY IF EXISTS "Capas: admin upload" ON storage.objects;
CREATE POLICY "Capas: admin upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-covers' AND public.is_admin());

DROP POLICY IF EXISTS "Capas: admin atualiza" ON storage.objects;
CREATE POLICY "Capas: admin atualiza"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-covers' AND public.is_admin())
  WITH CHECK (bucket_id = 'product-covers' AND public.is_admin());

DROP POLICY IF EXISTS "Capas: admin remove" ON storage.objects;
CREATE POLICY "Capas: admin remove"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-covers' AND public.is_admin());
