'use client';

import { AppShell, Burger, Group, Text, NavLink, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconMovie,
  IconCalendarStats,
  IconDashboard,
  IconLogout,
} from '@tabler/icons-react';
import Link from 'next/link';
import { AdminHeader } from '../AdminHeader/AdminHeader';

export function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* Header del Panel de Control */}
      <AppShell.Header>
        <AdminHeader opened={opened} onToggle={toggle }  />
      </AppShell.Header>

      {/* Barra Lateral de Operaciones */}
      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <NavLink
            component={Link}
            href="/admin"
            label="Dashboard"
            leftSection={<IconDashboard size={20} />}
          />
          <NavLink
            label="Películas"
            leftSection={<IconMovie size={20} />}
            childrenOffset={28}
          >
            <NavLink component={Link} href="/admin/movies" label="Ver todas" />
            <NavLink
              component={Link}
              href="/admin/movies/nueva"
              label="Agregar nueva"
            />
          </NavLink>
          <NavLink
            component={Link}
            href="/admin/funciones"
            label="Funciones"
            leftSection={<IconCalendarStats size={20} />}
          />
        </Stack>

        {/* Botón de Salida al final del Navbar */}
        <Stack mt="auto">
          <NavLink
            component={Link}
            href="/"
            label="Salir a Cartelera"
            leftSection={<IconLogout size={20} />}
            variant="subtle"
            color="red"
          />
        </Stack>
      </AppShell.Navbar>

      {/* Contenido de las páginas de admin */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
