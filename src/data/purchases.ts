import type { Purchase } from '@/types/purchase';

export const mockPurchases: Purchase[] = [
  {
    id: 'inv-001',
    productId: '1',
    productTitle: 'E-book: Ansiedade TCC',
    amount: 47.9,
    date: '09 de Junho, 2026',
    status: 'Pago',
  },
  {
    id: 'inv-002',
    productId: '2',
    productTitle: 'Baralho Emoções (Simulação)',
    amount: 32.9,
    date: '22 de Janeiro, 2026',
    status: 'Pago',
  },
];
