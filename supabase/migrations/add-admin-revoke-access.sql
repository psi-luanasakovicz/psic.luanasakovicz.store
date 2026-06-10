-- Admin revoga acesso a material (compra/liberação manual)
CREATE OR REPLACE FUNCTION public.admin_revoke_product_access(
  p_user_id UUID,
  p_product_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_purchase_id UUID;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN json_build_object('ok', false, 'error', 'FORBIDDEN');
  END IF;

  SELECT id INTO v_purchase_id
  FROM public.purchases
  WHERE user_id = p_user_id
    AND product_id = p_product_id
    AND status = 'approved'
  LIMIT 1;

  IF v_purchase_id IS NULL THEN
    RETURN json_build_object('ok', false, 'error', 'NOT_FOUND');
  END IF;

  UPDATE public.purchases
  SET status = 'refunded'
  WHERE id = v_purchase_id;

  UPDATE public.licenses
  SET status = 'inactive'
  WHERE purchase_id = v_purchase_id;

  RETURN json_build_object('ok', true, 'purchase_id', v_purchase_id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_revoke_product_access(UUID, UUID) TO authenticated;
