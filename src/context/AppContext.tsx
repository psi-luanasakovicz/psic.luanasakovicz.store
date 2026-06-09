'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchProfileByUserId,
  fetchUserLicenses,
  fetchUserPurchases,
  mapProfileToUser,
  mapPurchaseRow,
} from '@/lib/auth-client';
import { createClient } from '@/lib/supabase/client';
import { mapProductRow } from '@/lib/mappers/product';
import { slugifyTitle } from '@/data/products';
import { mapProductToInsert } from '@/lib/mappers/product';
import { buildFormatFromForm, deliveryFormsToDeliveryFiles, parseContentsText } from '@/lib/product-form';
import { processDeliveryFilesForSave } from '@/lib/product-files';
import { fetchProductById } from '@/lib/products-client';
import { uploadProductCover } from '@/lib/product-covers';
import { translateAuthError } from '@/lib/auth-errors';
import {
  CHECKOUT_UNAVAILABLE_MESSAGE,
  isSimulatedCheckoutEnabled,
} from '@/lib/checkout-config';
import { simulatePurchase } from '@/lib/purchases';
import type { Json } from '@/types/database';
import type { NewProductForm, Product } from '@/types/product';
import type { Purchase } from '@/types/purchase';
import type { ClinicalLicense } from '@/types/license';
import { EMPTY_USER, type User } from '@/types/user';

interface AppContextValue {
  user: User;
  authLoading: boolean;
  purchasedProductIds: string[];
  purchasedProducts: Product[];
  purchases: Purchase[];
  licenses: ClinicalLicense[];
  toastMessage: string;
  showToast: (msg: string) => void;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (data: {
    name: string;
    email: string;
    crp: string;
    password: string;
  }) => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  buyProduct: (product: Product) => Promise<void>;
  addProduct: (form: NewProductForm) => Promise<void>;
  updateProduct: (id: string, form: NewProductForm) => Promise<void>;
  setProductActive: (id: string, isActive: boolean) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  hasPurchased: (productId: string) => boolean;
  updateUserProfile: (data: { name: string; crp: string }) => Promise<{ error: string | null }>;
}

const AppContext = createContext<AppContextValue | null>(null);

const emptyNewProduct: NewProductForm = {
  title: '',
  category: 'Adultos',
  subtitle: '',
  price: '',
  description: '',
  pages: '',
  format: '',
  bonus: '',
  badge: '',
  details: '',
  contents: '',
  deliveryFiles: [],
  coverImage: null,
  existingCoverUrl: null,
  removeCover: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User>(EMPTY_USER);
  const [authLoading, setAuthLoading] = useState(true);
  const [purchasedProductIds, setPurchasedProductIds] = useState<string[]>([]);
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [licenses, setLicenses] = useState<ClinicalLicense[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  }, []);

  const loadUserData = useCallback(
    async (userId: string) => {
      const profile = await fetchProfileByUserId(userId);
      setUser(mapProfileToUser(profile, true));

      const purchaseRows = await fetchUserPurchases(userId);
      setPurchases(purchaseRows.map(mapPurchaseRow));
      setPurchasedProductIds(purchaseRows.map((p) => p.product_id));
      setPurchasedProducts(
        purchaseRows
          .filter((row) => row.products)
          .map((row) => mapProductRow(row.products!)),
      );

      const licenseRows = await fetchUserLicenses(userId);
      setLicenses(
        licenseRows.map((l) => ({
          id: l.id,
          holderName: profile?.name ?? '',
          crp: profile?.crp ?? '',
          status: l.status === 'active' ? 'Ativa' : 'Inativa',
          description: '',
          licenseCode: l.license_code,
          productId: l.product_id,
        })),
      );
    },
    [],
  );

  const clearUserData = useCallback(() => {
    setUser(EMPTY_USER);
    setPurchasedProductIds([]);
    setPurchasedProducts([]);
    setPurchases([]);
    setLicenses([]);
  }, []);

  const refreshUserData = useCallback(async () => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      await loadUserData(authUser.id);
    } else {
      clearUserData();
    }
  }, [supabase, loadUserData, clearUserData]);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await loadUserData(session.user.id);
      } else {
        clearUserData();
      }

      setAuthLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await loadUserData(session.user.id);
      } else {
        clearUserData();
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadUserData, clearUserData]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        return { error: translateAuthError(error) };
      }

      showToast('Login efetuado com sucesso! Seja bem-vinda de volta.');
      router.push('/biblioteca');
      router.refresh();
      return { error: null };
    },
    [supabase, router, showToast],
  );

  const register = useCallback(
    async (data: { name: string; email: string; crp: string; password: string }) => {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            crp: data.crp || 'Psicólogo(a)',
          },
        },
      });

      if (error) {
        return { error: translateAuthError(error) };
      }

      if (signUpData.user && !signUpData.session) {
        showToast('Cadastro realizado! Verifique seu e-mail para confirmar a conta.');
        router.push('/login');
        return { error: null };
      }

      showToast('Seu cadastro foi criado e você já está conectada!');
      router.push('/biblioteca');
      router.refresh();
      return { error: null };
    },
    [supabase, router, showToast],
  );

  const resetPassword = useCallback(
    async (email: string) => {
      const redirectTo = `${window.location.origin}/login`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

      if (error) {
        return { error: translateAuthError(error) };
      }

      return { error: null };
    },
    [supabase],
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    clearUserData();
    showToast('Sessão encerrada com sucesso.');
    router.push('/');
    router.refresh();
  }, [supabase, clearUserData, router, showToast]);

  const buyProduct = useCallback(
    async (product: Product) => {
      if (!user.isLoggedIn || !user.id) {
        showToast('Por favor, faça login ou cadastre-se para adquirir os materiais.');
        router.push('/login');
        return;
      }

      if (purchasedProductIds.includes(product.id)) {
        showToast('Você já possui este material! Acesse-o na sua Área do Cliente.');
        router.push('/biblioteca');
        return;
      }

      if (!isSimulatedCheckoutEnabled()) {
        showToast(CHECKOUT_UNAVAILABLE_MESSAGE);
        return;
      }

      const result = await simulatePurchase(user.id, product.id, product.price);

      if (result.error === 'CHECKOUT_DISABLED') {
        showToast(CHECKOUT_UNAVAILABLE_MESSAGE);
        return;
      }

      if (result.error === 'ALREADY_OWNED') {
        showToast('Você já possui este material! Acesse-o na sua Área do Cliente.');
        router.push('/biblioteca');
        return;
      }

      if (result.error) {
        showToast(`Erro ao processar compra: ${result.error}`);
        return;
      }

      await refreshUserData();
      showToast(
        `Parabéns! O material "${product.title}" foi adicionado à sua biblioteca com sucesso.`,
      );
      router.push('/biblioteca');
      router.refresh();
    },
    [user, purchasedProductIds, router, showToast, refreshUserData],
  );

  const addProduct = useCallback(
    async (form: NewProductForm) => {
      if (!user.isAdmin) {
        showToast('Acesso negado. Apenas administradores podem publicar materiais.');
        return;
      }

      if (!form.title || !form.price) {
        showToast('Por favor, preencha pelo menos o título e o preço do material.');
        return;
      }

      const slug = slugifyTitle(form.title);

      const deliveryResult = await processDeliveryFilesForSave(supabase, form.deliveryFiles, slug);
      if (deliveryResult.error) {
        showToast(deliveryResult.error);
        return;
      }

      const deliveryFiles = deliveryFormsToDeliveryFiles(deliveryResult.files);

      let coverImageUrl: string | undefined;
      if (form.coverImage) {
        const upload = await uploadProductCover(supabase, form.coverImage, slug);
        if (upload.error) {
          showToast(`Erro ao enviar capa: ${upload.error}`);
          return;
        }
        coverImageUrl = upload.url ?? undefined;
      }

      const productData = mapProductToInsert({
        slug,
        title: form.title,
        category: form.category,
        subtitle: form.subtitle || 'Recurso prático de psicologia.',
        price: parseFloat(form.price),
        description:
          form.description ||
          'Material clínico desenvolvido com ética e embasamento científico para psicólogos e pacientes.',
        pages: form.pages || 'Disponível após compra',
        format: buildFormatFromForm(form, deliveryFiles),
        bonus: form.bonus || 'Incluso material extra reflexivo',
        rating: 5,
        sales: 0,
        imageColor: 'from-[#8A645D]/10 to-[#ECE9E8]',
        coverImageUrl,
        badge: form.badge || 'Novo Lançamento',
        details: form.details
          ? form.details.split('\n').filter(Boolean)
          : ['Material terapêutico exclusivo', 'Fácil aplicação clínica'],
        contents: parseContentsText(form.contents),
        deliveryFiles,
      });

      const { error } = await supabase.from('products').insert({
        ...productData,
        details: productData.details as unknown as Json,
        contents: productData.contents as unknown as Json,
        delivery_files: productData.delivery_files as unknown as Json,
        cover_image_url: productData.cover_image_url,
      });

      if (error) {
        showToast(`Erro ao publicar material: ${error.message}`);
        return;
      }

      showToast('Novo recurso adicionado ao catálogo com sucesso!');
      router.push('/materiais');
      router.refresh();
    },
    [user.isAdmin, supabase, router, showToast],
  );

  const updateProduct = useCallback(
    async (id: string, form: NewProductForm) => {
      if (!user.isAdmin) {
        showToast('Acesso negado.');
        return;
      }

      if (!form.title || !form.price) {
        showToast('Por favor, preencha pelo menos o título e o preço do material.');
        return;
      }

      const existing = await fetchProductById(id);
      if (!existing) {
        showToast('Material não encontrado.');
        return;
      }

      const slug = existing.slug;

      const deliveryResult = await processDeliveryFilesForSave(supabase, form.deliveryFiles, slug);
      if (deliveryResult.error) {
        showToast(deliveryResult.error);
        return;
      }

      const deliveryFiles = deliveryFormsToDeliveryFiles(deliveryResult.files);

      let coverImageUrl: string | null | undefined = form.removeCover
        ? null
        : (form.existingCoverUrl ?? existing.coverImageUrl ?? null);

      if (form.coverImage) {
        const upload = await uploadProductCover(supabase, form.coverImage, slug);
        if (upload.error) {
          showToast(`Erro ao enviar capa: ${upload.error}`);
          return;
        }
        coverImageUrl = upload.url ?? null;
      }

      const { error } = await supabase
        .from('products')
        .update({
          title: form.title,
          category: form.category,
          subtitle: form.subtitle || existing.subtitle,
          price: parseFloat(form.price),
          description: form.description || existing.description,
          pages: form.pages || String(existing.pages),
          format: buildFormatFromForm(form, deliveryFiles),
          bonus: form.bonus || existing.bonus,
          badge: form.badge || null,
          details: (form.details
            ? form.details.split('\n').filter(Boolean)
            : existing.details) as unknown as Json,
          contents: parseContentsText(form.contents || '') as unknown as Json,
          delivery_files: deliveryFiles as unknown as Json,
          cover_image_url: coverImageUrl,
        })
        .eq('id', id);

      if (error) {
        showToast(`Erro ao atualizar material: ${error.message}`);
        return;
      }

      showToast('Material atualizado com sucesso!');
      router.refresh();
    },
    [user.isAdmin, supabase, showToast, router],
  );

  const setProductActive = useCallback(
    async (id: string, isActive: boolean) => {
      if (!user.isAdmin) {
        showToast('Acesso negado.');
        return;
      }

      const { error } = await supabase.from('products').update({ is_active: isActive }).eq('id', id);

      if (error) {
        showToast(
          `Erro ao ${isActive ? 'ativar' : 'desativar'} material: ${error.message}`,
        );
        return;
      }

      showToast(isActive ? 'Material reativado no catálogo.' : 'Material desativado do catálogo.');
      router.refresh();
    },
    [user.isAdmin, supabase, showToast, router],
  );

  const removeProduct = useCallback(
    async (id: string) => {
      if (!user.isAdmin) {
        showToast('Acesso negado.');
        return;
      }

      const { count, error: countError } = await supabase
        .from('purchases')
        .select('id', { count: 'exact', head: true })
        .eq('product_id', id);

      if (countError) {
        showToast(`Erro ao verificar compras: ${countError.message}`);
        return;
      }

      if ((count ?? 0) > 0) {
        showToast(
          'Não é possível excluir: este material possui compras registradas. Desative-o no catálogo.',
        );
        return;
      }

      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) {
        showToast(`Erro ao excluir material: ${error.message}`);
        return;
      }

      showToast('Material excluído permanentemente.');
      router.refresh();
    },
    [user.isAdmin, supabase, showToast, router],
  );

  const hasPurchased = useCallback(
    (productId: string) => purchasedProductIds.includes(productId),
    [purchasedProductIds],
  );

  const updateUserProfile = useCallback(
    async (data: { name: string; crp: string }) => {
      if (!user.id) {
        return { error: 'Usuário não autenticado.' };
      }

      const { error } = await supabase
        .from('profiles')
        .update({ name: data.name, crp: data.crp })
        .eq('id', user.id);

      if (error) {
        return { error: error.message };
      }

      await refreshUserData();
      return { error: null };
    },
    [user.id, supabase, refreshUserData],
  );

  const value = useMemo(
    () => ({
      user,
      authLoading,
      purchasedProductIds,
      purchasedProducts,
      purchases,
      licenses,
      toastMessage,
      showToast,
      login,
      register,
      resetPassword,
      logout,
      refreshUserData,
      buyProduct,
      addProduct,
      updateProduct,
      setProductActive,
      removeProduct,
      hasPurchased,
      updateUserProfile,
    }),
    [
      user,
      authLoading,
      purchasedProductIds,
      purchasedProducts,
      purchases,
      licenses,
      toastMessage,
      showToast,
      login,
      register,
      resetPassword,
      logout,
      refreshUserData,
      buyProduct,
      addProduct,
      updateProduct,
      setProductActive,
      removeProduct,
      hasPurchased,
      updateUserProfile,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
}

export { emptyNewProduct };
