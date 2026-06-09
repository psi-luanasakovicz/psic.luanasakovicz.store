import AuthGuard from '@/components/AuthGuard';
import Dashboard from '@/components/Dashboard';

export default function BibliotecaPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
