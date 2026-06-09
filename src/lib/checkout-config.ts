export const CHECKOUT_UNAVAILABLE_MESSAGE =
  'Pagamento online em breve. Entre em contato pelo WhatsApp para adquirir este material.';

/** Compra simulada: ativa em dev; em produção só com NEXT_PUBLIC_ENABLE_SIMULATED_CHECKOUT=true */
export function isSimulatedCheckoutEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_ENABLE_SIMULATED_CHECKOUT;

  if (flag === 'true') return true;
  if (flag === 'false') return false;

  return process.env.NODE_ENV === 'development';
}
