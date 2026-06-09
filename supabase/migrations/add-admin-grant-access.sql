-- Admin libera material para uma conta (compra manual / WhatsApp)
CREATE OR REPLACE FUNCTION public.admin_grant_product_access(
  p_user_id UUID,
  p_product_id UUID,
  p_amount NUMERIC DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_purchase_id UUID;
  v_license_code TEXT;
  v_product_price NUMERIC;
  v_existing UUID;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN json_build_object('ok', false, 'error', 'FORBIDDEN');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = p_user_id) THEN
    RETURN json_build_object('ok', false, 'error', 'USER_NOT_FOUND');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.products WHERE id = p_product_id) THEN
    RETURN json_build_object('ok', false, 'error', 'PRODUCT_NOT_FOUND');
  END IF;

  SELECT id INTO v_existing
  FROM public.purchases
  WHERE user_id = p_user_id
    AND product_id = p_product_id
    AND status = 'approved'
  LIMIT 1;

  IF v_existing IS NOT NULL THEN
    RETURN json_build_object('ok', false, 'error', 'ALREADY_OWNED', 'purchase_id', v_existing);
  END IF;

  SELECT price INTO v_product_price FROM public.products WHERE id = p_product_id;

  INSERT INTO public.purchases (user_id, product_id, amount, status)
  VALUES (p_user_id, p_product_id, COALESCE(p_amount, v_product_price, 0), 'approved')
  RETURNING id INTO v_purchase_id;

  v_license_code := public.generate_license_code();

  INSERT INTO public.licenses (user_id, product_id, purchase_id, license_code, status)
  VALUES (p_user_id, p_product_id, v_purchase_id, v_license_code, 'active');

  PERFORM public.increment_product_sales(p_product_id);

  RETURN json_build_object(
    'ok', true,
    'purchase_id', v_purchase_id,
    'license_code', v_license_code
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_grant_product_access(UUID, UUID, NUMERIC) TO authenticated;
