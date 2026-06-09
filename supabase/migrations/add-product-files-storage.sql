-- Bucket privado para PDFs/Word e função de estatísticas públicas

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-files', 'product-files', false)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

DROP POLICY IF EXISTS "Arquivos: admin upload" ON storage.objects;
CREATE POLICY "Arquivos: admin upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-files' AND public.is_admin());

DROP POLICY IF EXISTS "Arquivos: admin atualiza" ON storage.objects;
CREATE POLICY "Arquivos: admin atualiza"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-files' AND public.is_admin())
  WITH CHECK (bucket_id = 'product-files' AND public.is_admin());

DROP POLICY IF EXISTS "Arquivos: admin remove" ON storage.objects;
CREATE POLICY "Arquivos: admin remove"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-files' AND public.is_admin());

DROP POLICY IF EXISTS "Arquivos: download com compra" ON storage.objects;
CREATE POLICY "Arquivos: download com compra"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'product-files'
    AND (
      public.is_admin()
      OR EXISTS (
        SELECT 1
        FROM public.purchases pu
        JOIN public.products pr ON pr.id = pu.product_id
        WHERE pu.user_id = auth.uid()
          AND pu.status = 'approved'
          AND (storage.foldername(name))[1] = pr.slug
      )
    )
  );

CREATE OR REPLACE FUNCTION public.get_public_stats()
RETURNS JSON
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'activeTherapists', (
      SELECT COUNT(DISTINCT user_id)
      FROM public.purchases
      WHERE status = 'approved'
    ),
    'totalSales', (
      SELECT COUNT(*)
      FROM public.purchases
      WHERE status = 'approved'
    ),
    'activeMaterials', (
      SELECT COUNT(*)
      FROM public.products
      WHERE is_active = true
    )
  );
$$;

GRANT EXECUTE ON FUNCTION public.get_public_stats() TO anon, authenticated;
