import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Faça login para baixar este arquivo.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const storagePath = searchParams.get('path');

  if (!productId || !storagePath) {
    return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  const isAdmin = profile?.role === 'admin';

  if (!isAdmin) {
    const { data: purchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .eq('status', 'approved')
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Você não possui acesso a este material.' }, { status: 403 });
    }
  }

  const { data, error } = await supabase.storage
    .from('product-files')
    .createSignedUrl(storagePath, 120);

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { error: error?.message ?? 'Erro ao gerar link de download.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: data.signedUrl });
}
