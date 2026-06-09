import { NextResponse } from 'next/server';
import { verifyInteractiveAppToken } from '@/lib/interactive-app-token';
import { createClient } from '@/lib/supabase/server';

const ALLOWED_ORIGINS = [
  'https://baralho-terapeutico.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
];

function corsHeaders(origin: string | null): HeadersInit {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    };
  }

  return {};
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request.headers.get('origin')),
  });
}

export async function GET(request: Request) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  const token = new URL(request.url).searchParams.get('token');
  if (!token) {
    return NextResponse.json({ valid: false, error: 'Token ausente.' }, { status: 400, headers });
  }

  let payload;
  try {
    payload = verifyInteractiveAppToken(token);
  } catch {
    return NextResponse.json(
      { valid: false, error: 'Serviço de acesso indisponível.' },
      { status: 503, headers },
    );
  }

  if (!payload) {
    return NextResponse.json({ valid: false, error: 'Token inválido ou expirado.' }, { status: 401, headers });
  }

  const supabase = await createClient();
  const { data: hasAccess, error } = await supabase.rpc('verify_interactive_app_access', {
    p_user_id: payload.sub,
    p_product_slug: payload.slug,
  });

  if (error) {
    console.error('Erro ao verificar acesso ao app interativo:', error.message);
    return NextResponse.json(
      { valid: false, error: 'Erro ao validar acesso.' },
      { status: 500, headers },
    );
  }

  if (!hasAccess) {
    return NextResponse.json({ valid: false, error: 'Compra não encontrada.' }, { status: 403, headers });
  }

  return NextResponse.json({ valid: true, slug: payload.slug }, { headers });
}
