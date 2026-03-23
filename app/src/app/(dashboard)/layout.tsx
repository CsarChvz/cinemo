import { MainLayout } from '@/components/layout/MainLayout/MainLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* Aquí es donde vive el MainLayout. 
       Cualquier página dentro de la carpeta (dashboard) 
       tendrá automáticamente el Header y Navbar.
    */
    <MainLayout>{children}</MainLayout>
  );
}
