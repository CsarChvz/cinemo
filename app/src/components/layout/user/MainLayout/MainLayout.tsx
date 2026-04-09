'use client';

import {
  AppShell,
  UnstyledButton,
  Stack,
  Divider,
  Button,
  Text,
  Avatar,
  Group,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession, signOut } from 'next-auth/react';
import { IconSettings, IconLogout, IconShieldLock } from '@tabler/icons-react';
import { Header } from '../Header/Header';
import Link from 'next/link';
import classes from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const links = [
  { link: '/', label: 'Inicio' },
  { link: '/movies', label: 'Películas' },
  { link: '/movie-screenings', label: 'Cartelera' },
  { link: '/cinemas', label: 'Cines' },
];

export function MainLayout({ children }: MainLayoutProps) {
  const [opened, { toggle, close }] = useDisclosure();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === 'ADMIN';

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
              onClick={close}
            >
              {item.label}
            </UnstyledButton>
          ))}

          <Divider my="sm" label="Cuenta" labelPosition="center" />

          {isLoggedIn ? (
            <Stack gap="xs">
              {/* Info del usuario */}
              <Group px="xs">
                <Avatar radius="xl" size="sm" color="blue">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Text size="sm" fw={500}>
                  {session.user?.name}
                </Text>
              </Group>

              {isAdmin && (
                <UnstyledButton
                  component={Link}
                  href="/admin"
                  className={classes.control}
                  onClick={close}
                >
                  <Group gap="xs">
                    <IconShieldLock size={16} />
                    Panel Admin
                  </Group>
                </UnstyledButton>
              )}

              {/* <UnstyledButton
                component={Link}
                href="/settings"
                className={classes.control}
                onClick={close}
              >
                <Group gap="xs">
                  <IconSettings size={16} />
                  Configuración
                </Group>
              </UnstyledButton> */}

              <Button
                variant="subtle"
                color="red"
                fullWidth
                leftSection={<IconLogout size={16} />}
                onClick={() => {
                  close();
                  signOut({ callbackUrl: '/' });
                }}
              >
                Cerrar sesión
              </Button>
            </Stack>
          ) : (
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
          )}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
