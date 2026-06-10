export function getMercadoPagoAccessToken(): string | null {
  return process.env.MERCADOPAGO_ACCESS_TOKEN?.trim() || null;
}

export function isMercadoPagoCheckoutEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_ENABLE_MERCADOPAGO_CHECKOUT;

  if (flag === 'false') return false;
  if (flag === 'true') return Boolean(getMercadoPagoAccessToken());

  return Boolean(getMercadoPagoAccessToken());
}

export function getSiteBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return 'http://localhost:3000';
}
