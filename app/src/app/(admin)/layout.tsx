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

export default function AdminLayout({
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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text fw={900} size="xl" c="blue.6" style={{ letterSpacing: '1px' }}>
            CINEMO{' '}
            <Text span fw={300} c="dimmed">
              ADMIN
            </Text>
          </Text>
        </Group>
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
            <NavLink
              component={Link}
              href="/admin/peliculas"
              label="Ver todas"
            />
            <NavLink
              component={Link}
              href="/admin/peliculas/nueva"
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
