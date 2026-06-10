-- Mercado Pago: referência do pagamento + aprovação via webhook
ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS payment_reference TEXT;

CREATE INDEX IF NOT EXISTS idx_purchases_payment_reference
  ON public.purchases (payment_reference)
  WHERE payment_reference IS NOT NULL;

CREATE OR REPLACE FUNCTION public.approve_purchase_payment(
  p_purchase_id UUID,
  p_payment_reference TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_purchase public.purchases%ROWTYPE;
BEGIN
  SELECT *
  INTO v_purchase
  FROM public.purchases
  WHERE id = p_purchase_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'purchase_not_found');
  END IF;

  IF v_purchase.status = 'approved' THEN
    RETURN jsonb_build_object('ok', true, 'already_approved', true);
  END IF;

  UPDATE public.purchases
  SET
    status = 'approved',
    payment_reference = COALESCE(p_payment_reference, payment_reference)
  WHERE id = p_purchase_id;

  IF NOT EXISTS (
    SELECT 1
    FROM public.licenses
    WHERE purchase_id = p_purchase_id
  ) THEN
    INSERT INTO public.licenses (user_id, product_id, purchase_id, license_code, status)
    VALUES (
      v_purchase.user_id,
      v_purchase.product_id,
      p_purchase_id,
      public.generate_license_code(),
      'active'
    );
  END IF;

  PERFORM public.increment_product_sales(v_purchase.product_id);

  RETURN jsonb_build_object('ok', true);
END;
$$;

REVOKE ALL ON FUNCTION public.approve_purchase_payment(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.approve_purchase_payment(UUID, TEXT) TO service_role;
