'use client';

import { AppShell, Stack, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconMovie,
  IconCalendarStats,
  IconDashboard,
  IconLogout,
  IconMap,
  IconMap2,
  IconMapPin,
  IconBuildingStore,
  IconArmchair,
} from '@tabler/icons-react';
import Link from 'next/link';
import { AdminHeader } from '../AdminHeader/AdminHeader';

export function AdminShellLayout({ children }: { children: React.ReactNode }) {
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
        <AdminHeader opened={opened} onToggle={toggle} />
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

          {/* Sección de Películas */}
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

          {/* NUEVA SECCIÓN: Ubicaciones y Complejos */}
          <NavLink
            label="Ubicaciones y Cines"
            leftSection={<IconMap size={20} />}
            childrenOffset={28}
          >
            <NavLink
              component={Link}
              href="/admin/locations/states"
              label="Estados"
              leftSection={<IconMap2 size={16} stroke={1.5} />}
            />
            <NavLink
              component={Link}
              href="/admin/locations/municipalities"
              label="Municipios"
              leftSection={<IconMapPin size={16} stroke={1.5} />}
            />
            <NavLink
              component={Link}
              href="/admin/locations/cinemas"
              label="Complejos (Cines)"
              leftSection={<IconBuildingStore size={16} stroke={1.5} />}
            />

            <NavLink
              component={Link}
              href="/admin/locations/rooms"
              label="Salas (Aforos)"
              leftSection={<IconArmchair size={16} stroke={1.5} />}
            />
          </NavLink>
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
