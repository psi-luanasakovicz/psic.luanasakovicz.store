export function getMercadoPagoAccessToken(): string | null {
  return process.env.MERCADOPAGO_ACCESS_TOKEN?.trim() || null;
}

export function isMercadoPagoTestMode(): boolean {
  const token = getMercadoPagoAccessToken();
  return Boolean(token?.startsWith('TEST-'));
}

export function getMercadoPagoCheckoutUrl(preference: {
  init_point?: string;
  sandbox_init_point?: string;
}): string | null {
  if (isMercadoPagoTestMode()) {
    return preference.sandbox_init_point || preference.init_point || null;
  }

  return preference.init_point || preference.sandbox_init_point || null;
}

export function isMercadoPagoCheckoutEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_ENABLE_MERCADOPAGO_CHECKOUT;

  if (flag === 'false') return false;

  // Token só existe no servidor — no browser usamos a flag pública para exibir o botão.
  if (typeof window !== 'undefined') {
    return flag === 'true';
  }

  const hasToken = Boolean(getMercadoPagoAccessToken());
  if (flag === 'true') return hasToken;

  return hasToken;
}

export function getSiteBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return 'http://localhost:3000';
}
