export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'user' | 'admin';
export type PurchaseStatus = 'pending' | 'approved' | 'refunded';
export type LicenseStatus = 'active' | 'inactive';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          crp: string;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string;
          email?: string;
          crp?: string;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          crp?: string;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          subtitle: string;
          price: number;
          description: string;
          pages: string;
          format: string;
          bonus: string;
          rating: number;
          sales: number;
          image_color: string;
          badge: string | null;
          details: Json;
          contents: Json;
          delivery_files?: Json;
          cover_image_url?: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category: string;
          subtitle?: string;
          price: number;
          description?: string;
          pages?: string;
          format?: string;
          bonus?: string;
          rating?: number;
          sales?: number;
          image_color?: string;
          badge?: string | null;
          details?: Json;
          contents?: Json;
          delivery_files?: Json;
          cover_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category?: string;
          subtitle?: string;
          price?: number;
          description?: string;
          pages?: string;
          format?: string;
          bonus?: string;
          rating?: number;
          sales?: number;
          image_color?: string;
          badge?: string | null;
          details?: Json;
          contents?: Json;
          delivery_files?: Json;
          cover_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      purchases: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          amount: number;
          status: PurchaseStatus;
          payment_reference: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          amount: number;
          status?: PurchaseStatus;
          payment_reference?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          amount?: number;
          status?: PurchaseStatus;
          payment_reference?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      licenses: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          purchase_id: string;
          license_code: string;
          status: LicenseStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          purchase_id: string;
          license_code: string;
          status?: LicenseStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          purchase_id?: string;
          license_code?: string;
          status?: LicenseStatus;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      generate_license_code: { Args: Record<string, never>; Returns: string };
      increment_product_sales: { Args: { p_product_id: string }; Returns: undefined };
      get_public_stats: { Args: Record<string, never>; Returns: Json };
      verify_interactive_app_access: {
        Args: { p_user_id: string; p_product_slug: string };
        Returns: boolean;
      };
      admin_grant_product_access: {
        Args: { p_user_id: string; p_product_id: string; p_amount: number | null };
        Returns: Json;
      };
      admin_revoke_product_access: {
        Args: { p_user_id: string; p_product_id: string };
        Returns: Json;
      };
      approve_purchase_payment: {
        Args: { p_purchase_id: string; p_payment_reference: string | null };
        Returns: Json;
      };
    };
    Enums: {
      user_role: UserRole;
      purchase_status: PurchaseStatus;
      license_status: LicenseStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProductRow = Database['public']['Tables']['products']['Row'];
export type PurchaseRow = Database['public']['Tables']['purchases']['Row'];
export type LicenseRow = Database['public']['Tables']['licenses']['Row'];

export type LicenseWithProduct = LicenseRow & {
  products: ProductRow | null;
};
