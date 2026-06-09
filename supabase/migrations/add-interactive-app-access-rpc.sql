-- Verifica compra aprovada para apps interativos (chamada pela API pública de validação de token)
CREATE OR REPLACE FUNCTION public.verify_interactive_app_access(
  p_user_id UUID,
  p_product_slug TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.purchases pu
    INNER JOIN public.products pr ON pr.id = pu.product_id
    WHERE pu.user_id = p_user_id
      AND pr.slug = p_product_slug
      AND pu.status = 'approved'
  );
$$;

GRANT EXECUTE ON FUNCTION public.verify_interactive_app_access(UUID, TEXT) TO anon, authenticated;
