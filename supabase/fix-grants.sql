-- ============================================================
-- Correção: permission denied for table products
-- Execute no SQL Editor do Supabase (projeto lkgyfehlblarkwplldhb)
-- ============================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- products: leitura pública do catálogo
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;

-- profiles
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

-- purchases e licenses
GRANT SELECT, INSERT ON public.purchases TO authenticated;
GRANT UPDATE, DELETE ON public.purchases TO authenticated;

GRANT SELECT, INSERT ON public.licenses TO authenticated;
GRANT UPDATE, DELETE ON public.licenses TO authenticated;

-- funções usadas em políticas RLS e compras
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_product_sales(UUID) TO authenticated;
