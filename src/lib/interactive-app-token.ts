import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_TTL_SECONDS = 2 * 60 * 60;

export interface InteractiveAppTokenPayload {
  sub: string;
  slug: string;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.INTERACTIVE_APP_SECRET;
  if (!secret) {
    throw new Error(
      'INTERACTIVE_APP_SECRET não configurado. Defina a variável no .env.local e na Vercel.',
    );
  }
  return secret;
}

function signPayload(payloadB64: string): string {
  return createHmac('sha256', getSecret()).update(payloadB64).digest('base64url');
}

export function createInteractiveAppToken(userId: string, slug: string): string {
  const payload: InteractiveAppTokenPayload = {
    sub: userId,
    slug,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${payloadB64}.${signPayload(payloadB64)}`;
}

export function verifyInteractiveAppToken(token: string): InteractiveAppTokenPayload | null {
  const [payloadB64, signature] = token.split('.');
  if (!payloadB64 || !signature) {
    return null;
  }

  const expected = signPayload(payloadB64);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (sigBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(sigBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8'),
    ) as InteractiveAppTokenPayload;

    if (!payload.sub || !payload.slug || typeof payload.exp !== 'number') {
      return null;
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function buildInteractiveAppEmbedUrl(appUrl: string, userId: string, slug: string): string {
  const token = createInteractiveAppToken(userId, slug);
  const url = new URL(appUrl);
  url.searchParams.set('token', token);
  return url.toString();
}
