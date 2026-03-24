'use client';

import {
  AppShell,
  UnstyledButton,
  Stack,
  Divider,
  Button,
  Group,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../Header/Header';
import Link from 'next/link';
import classes from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Mismas rutas que definimos en el Header
const links = [
  { link: '/', label: 'Inicio' },
  { link: '/program-guide', label: 'Cartelera' },
  { link: '/movies', label: 'Películas' },
];

export function MainLayout({ children }: MainLayoutProps) {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Header opened={opened} onToggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar py="md" px="md">
        <Stack gap="sm">
          <Text size="xs" fw={700} c="dimmed" tt="uppercase" pl="xs">
            Navegación
          </Text>

          {links.map((item) => (
            <UnstyledButton
              key={item.label}
              component={Link}
              href={item.link}
              className={classes.control}
              onClick={close} // Cerramos el menú al hacer clic
            >
              {item.label}
            </UnstyledButton>
          ))}

          <Divider my="sm" label="Cuenta" labelPosition="center" />

          {/* Botones de Autenticación para Móvil */}
          <Stack gap="xs">
            <Button
              variant="subtle"
              fullWidth
              component={Link}
              href="/login"
              onClick={close}
            >
              Iniciar sesión
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              fullWidth
              radius="md"
              component={Link}
              href="/register"
              onClick={close}
            >
              Registrarse
            </Button>
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
