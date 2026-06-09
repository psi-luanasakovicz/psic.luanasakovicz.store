-- Estatísticas públicas da home (execute se aparecer erro get_public_stats)
-- SQL Editor do Supabase → New query → Run

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
