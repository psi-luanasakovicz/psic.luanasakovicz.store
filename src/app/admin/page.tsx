import AdminGuard from '@/components/AdminGuard';
import AdminPanel from '@/components/AdminPanel';

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminPanel />
    </AdminGuard>
  );
}
