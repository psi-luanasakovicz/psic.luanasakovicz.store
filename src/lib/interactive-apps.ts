export interface InteractiveApp {
  slug: string;
  title: string;
  description: string;
  /** URL do app — acesso completo na biblioteca (compradores) */
  appUrl: string;
  /** URL pública para preview no catálogo */
  demoUrl: string;
  badge: string;
}

const BARALHO_APP: InteractiveApp = {
  slug: 'baralho-emocoes-criancas',
  title: 'Baralho Terapêutico Digital',
  description:
    'Tire cartas em tempo real durante a sessão. Ideal para consultório presencial ou online.',
  appUrl: 'https://baralho-terapeutico.vercel.app/',
  demoUrl: 'https://baralho-terapeutico.vercel.app/',
  badge: 'App Interativo',
};

export const INTERACTIVE_APPS: Record<string, InteractiveApp> = {
  [BARALHO_APP.slug]: BARALHO_APP,
};

export function getInteractiveApp(slug: string): InteractiveApp | null {
  return INTERACTIVE_APPS[slug] ?? null;
}

export function hasInteractiveApp(slug: string): boolean {
  return slug in INTERACTIVE_APPS;
}

export function getFeaturedInteractiveApp(): InteractiveApp {
  return BARALHO_APP;
}

/** Rota interna protegida — só quem comprou acessa o app embarcado */
export function getInteractiveAppLibraryPath(slug: string): string {
  return `/biblioteca/${slug}/app`;
}
