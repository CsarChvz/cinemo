import { AdminShellLayout } from '@/components/layout/admin/AdminLayout/AdminLayout';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShellLayout>{children}</AdminShellLayout>;
}
