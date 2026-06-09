import { redirect } from 'next/navigation';
import { buildInteractiveAppEmbedUrl } from '@/lib/interactive-app-token';
import { requirePurchasedInteractiveApp } from '@/lib/product-access';

export const dynamic = 'force-dynamic';

interface InteractiveAppPageProps {
  params: Promise<{ slug: string }>;
}

export default async function InteractiveAppPage({ params }: InteractiveAppPageProps) {
  const { slug } = await params;
  const { app, userId } = await requirePurchasedInteractiveApp(slug);
  const embedUrl = buildInteractiveAppEmbedUrl(app.appUrl, userId, slug);

  redirect(embedUrl);
}
