import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { getMercadoPagoAccessToken } from '@/lib/mercadopago/config';

export function getMercadoPagoClient() {
  const accessToken = getMercadoPagoAccessToken();

  if (!accessToken) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN não configurado.');
  }

  return new MercadoPagoConfig({ accessToken });
}

export function getMercadoPagoPreferenceApi() {
  return new Preference(getMercadoPagoClient());
}

export function getMercadoPagoPaymentApi() {
  return new Payment(getMercadoPagoClient());
}
