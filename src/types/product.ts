export type ProductCategory =
  | 'Adultos'
  | 'Crianças'
  | 'Adolescentes'
  | 'Gestão Clínica';

export type DeliveryFileType = 'pdf' | 'docx' | 'link' | 'audio' | 'zip' | 'other';

export interface DeliveryFile {
  type: DeliveryFileType;
  label: string;
  url?: string;
  storagePath?: string;
}

export interface DeliveryFileForm {
  type: DeliveryFileType;
  label: string;
  url?: string;
  storagePath?: string;
  localFile?: File | null;
}

export interface ProductContent {
  title: string;
  text: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  subtitle: string;
  price: number;
  description: string;
  pages: string | number;
  format: string;
  bonus: string;
  rating: number;
  sales: number;
  imageColor: string;
  coverImageUrl?: string;
  badge?: string;
  details: string[];
  contents: ProductContent[];
  deliveryFiles: DeliveryFile[];
  isActive?: boolean;
}

export interface NewProductForm {
  title: string;
  category: ProductCategory;
  subtitle: string;
  price: string;
  description: string;
  pages: string;
  format: string;
  bonus: string;
  badge: string;
  details: string;
  contents: string;
  deliveryFiles: DeliveryFileForm[];
  coverImage: File | null;
  existingCoverUrl?: string | null;
  removeCover?: boolean;
}

export const DELIVERY_FILE_TYPES: { value: DeliveryFileType; label: string }[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'docx', label: 'Word (DOCX)' },
  { value: 'link', label: 'Link externo' },
  { value: 'audio', label: 'Áudio (MP3/WAV)' },
  { value: 'zip', label: 'Arquivo ZIP' },
  { value: 'other', label: 'Outro formato' },
];

export const DELIVERY_FILE_TYPE_LABELS: Record<DeliveryFileType, string> = {
  pdf: 'PDF',
  docx: 'Word (DOCX)',
  link: 'Link',
  audio: 'Áudio',
  zip: 'ZIP',
  other: 'Arquivo',
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Adultos',
  'Crianças',
  'Adolescentes',
  'Gestão Clínica',
];

export const FILTER_CATEGORIES = ['Todos', ...PRODUCT_CATEGORIES] as const;
export type FilterCategory = (typeof FILTER_CATEGORIES)[number];
