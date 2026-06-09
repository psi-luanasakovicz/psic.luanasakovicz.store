import type { PurchaseStatus as DbPurchaseStatus } from '@/types/database';

export type PurchaseStatus = 'Pago' | 'Pendente' | 'Reembolsado';

export interface Purchase {
  id: string;
  productId: string;
  productTitle: string;
  amount: number;
  date: string;
  status: PurchaseStatus;
}

export const PURCHASE_STATUS_DB: Record<PurchaseStatus, DbPurchaseStatus> = {
  Pago: 'approved',
  Pendente: 'pending',
  Reembolsado: 'refunded',
};

export const PURCHASE_STATUS_LABEL: Record<DbPurchaseStatus, PurchaseStatus> = {
  approved: 'Pago',
  pending: 'Pendente',
  refunded: 'Reembolsado',
};
