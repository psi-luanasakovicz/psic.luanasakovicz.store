import InteractiveAppFrame from '@/components/InteractiveAppFrame';
import { buildInteractiveAppEmbedUrl } from '@/lib/interactive-app-token';
import { requirePurchasedInteractiveApp } from '@/lib/product-access';

export const dynamic = 'force-dynamic';

interface InteractiveAppPageProps {
  params: Promise<{ slug: string }>;
}

export default async function InteractiveAppPage({ params }: InteractiveAppPageProps) {
  const { slug } = await params;
  const { app, product, userId } = await requirePurchasedInteractiveApp(slug);
  const embedUrl = buildInteractiveAppEmbedUrl(app.appUrl, userId, slug);

  return <InteractiveAppFrame app={app} product={product} embedUrl={embedUrl} />;
}
