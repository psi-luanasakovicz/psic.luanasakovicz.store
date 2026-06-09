import InteractiveAppFrame from '@/components/InteractiveAppFrame';
import { requirePurchasedInteractiveApp } from '@/lib/product-access';

export const dynamic = 'force-dynamic';

interface InteractiveAppPageProps {
  params: Promise<{ slug: string }>;
}

export default async function InteractiveAppPage({ params }: InteractiveAppPageProps) {
  const { slug } = await params;
  const { app, product } = await requirePurchasedInteractiveApp(slug);

  return <InteractiveAppFrame app={app} product={product} />;
}
