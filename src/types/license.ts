import type { LicenseStatus as DbLicenseStatus } from '@/types/database';

export type LicenseUiStatus = 'Ativa' | 'Inativa';

export interface ClinicalLicense {
  id: string;
  holderName: string;
  crp: string;
  status: LicenseUiStatus;
  description: string;
  licenseCode?: string;
  productId?: string;
}

export const LICENSE_STATUS_DB: Record<LicenseUiStatus, DbLicenseStatus> = {
  Ativa: 'active',
  Inativa: 'inactive',
};

export const LICENSE_STATUS_LABEL: Record<DbLicenseStatus, LicenseUiStatus> = {
  active: 'Ativa',
  inactive: 'Inativa',
};
