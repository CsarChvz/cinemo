import { Box } from '@mantine/core';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      component="main"
      py="md"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--mantine-color-gray-0)',
      }}
    >
      {/* Aquí podrías agregar un Sidebar o un Nav específico de Admin */}
      {children}
    </Box>
  );
}
