-- ============================================================
-- Plataforma Luana Sakovicz — Schema Supabase (Fase 2)
-- Execute este arquivo no SQL Editor do Supabase
-- ============================================================

-- Extensões
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------
-- Tipos
-- ------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('user', 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.purchase_status AS ENUM ('pending', 'approved', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.license_status AS ENUM ('active', 'inactive');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ------------------------------------------------------------
-- Tabela: profiles
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  crp TEXT NOT NULL DEFAULT '',
  role public.user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Tabela: products
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  description TEXT NOT NULL DEFAULT '',
  pages TEXT NOT NULL DEFAULT '',
  format TEXT NOT NULL DEFAULT '',
  bonus TEXT NOT NULL DEFAULT '',
  rating NUMERIC(2, 1) NOT NULL DEFAULT 5 CHECK (rating >= 0 AND rating <= 5),
  sales INTEGER NOT NULL DEFAULT 0 CHECK (sales >= 0),
  image_color TEXT NOT NULL DEFAULT 'from-[#8A645D]/10 to-[#ECE9E8]',
  badge TEXT,
  details JSONB NOT NULL DEFAULT '[]'::JSONB,
  contents JSONB NOT NULL DEFAULT '[]'::JSONB,
  delivery_files JSONB NOT NULL DEFAULT '[]'::JSONB,
  cover_image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products (is_active);

-- ------------------------------------------------------------
-- Tabela: purchases
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products (id) ON DELETE RESTRICT,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
  status public.purchase_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases (user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON public.purchases (product_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_user_product_approved
  ON public.purchases (user_id, product_id)
  WHERE status = 'approved';

-- ------------------------------------------------------------
-- Tabela: licenses
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products (id) ON DELETE RESTRICT,
  purchase_id UUID NOT NULL REFERENCES public.purchases (id) ON DELETE CASCADE,
  license_code TEXT NOT NULL UNIQUE,
  status public.license_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_licenses_user_id ON public.licenses (user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_product_id ON public.licenses (product_id);

-- ------------------------------------------------------------
-- Funções auxiliares
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, crp, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data ->> 'crp', ''),
    'user'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_license_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'LUANA-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(REPLACE(gen_random_uuid()::TEXT, '-', ''), 1, 8));
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_product_sales(p_product_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.products
  SET sales = sales + 1
  WHERE id = p_product_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_product_sales(UUID) TO authenticated;

CREATE OR REPLACE FUNCTION public.get_public_stats()
RETURNS JSON
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'activeTherapists', (
      SELECT COUNT(DISTINCT user_id)
      FROM public.purchases
      WHERE status = 'approved'
    ),
    'totalSales', (
      SELECT COUNT(*)
      FROM public.purchases
      WHERE status = 'approved'
    ),
    'activeMaterials', (
      SELECT COUNT(*)
      FROM public.products
      WHERE is_active = true
    )
  );
$$;

GRANT EXECUTE ON FUNCTION public.get_public_stats() TO anon, authenticated;

-- ------------------------------------------------------------
-- Permissões para papéis da API (anon / authenticated)
-- Sem estes GRANTs o PostgREST retorna "permission denied for table"
-- ------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;

GRANT SELECT, UPDATE ON public.profiles TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.purchases TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.licenses TO authenticated;

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- ------------------------------------------------------------
-- Triggers
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS products_set_updated_at ON public.products;
CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

-- profiles
DROP POLICY IF EXISTS "Profiles: leitura própria ou admin" ON public.profiles;
CREATE POLICY "Profiles: leitura própria ou admin"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Profiles: atualização própria" ON public.profiles;
CREATE POLICY "Profiles: atualização própria"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Profiles: admin gerencia" ON public.profiles;
CREATE POLICY "Profiles: admin gerencia"
  ON public.profiles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- products
DROP POLICY IF EXISTS "Products: leitura pública de ativos" ON public.products;
CREATE POLICY "Products: leitura pública de ativos"
  ON public.products FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Products: admin gerencia" ON public.products;
CREATE POLICY "Products: admin gerencia"
  ON public.products FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Products: admin atualiza" ON public.products;
CREATE POLICY "Products: admin atualiza"
  ON public.products FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Products: admin remove" ON public.products;
CREATE POLICY "Products: admin remove"
  ON public.products FOR DELETE
  USING (public.is_admin());

-- purchases
DROP POLICY IF EXISTS "Purchases: leitura própria ou admin" ON public.purchases;
CREATE POLICY "Purchases: leitura própria ou admin"
  ON public.purchases FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Purchases: usuário cria compra simulada" ON public.purchases;
CREATE POLICY "Purchases: usuário cria compra simulada"
  ON public.purchases FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND status IN ('pending', 'approved')
  );

DROP POLICY IF EXISTS "Purchases: admin gerencia" ON public.purchases;
CREATE POLICY "Purchases: admin gerencia"
  ON public.purchases FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Purchases: admin remove" ON public.purchases;
CREATE POLICY "Purchases: admin remove"
  ON public.purchases FOR DELETE
  USING (public.is_admin());

-- licenses
DROP POLICY IF EXISTS "Licenses: leitura própria ou admin" ON public.licenses;
CREATE POLICY "Licenses: leitura própria ou admin"
  ON public.licenses FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Licenses: usuário cria licença da própria compra" ON public.licenses;
CREATE POLICY "Licenses: usuário cria licença da própria compra"
  ON public.licenses FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1
      FROM public.purchases p
      WHERE p.id = purchase_id
        AND p.user_id = auth.uid()
        AND p.status = 'approved'
    )
  );

DROP POLICY IF EXISTS "Licenses: admin gerencia" ON public.licenses;
CREATE POLICY "Licenses: admin gerencia"
  ON public.licenses FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
