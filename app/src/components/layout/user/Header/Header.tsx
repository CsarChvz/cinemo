'use client';

import {
  Burger,
  Group,
  Container,
  Text,
  Button,
  Divider,
  Avatar,
  Menu,
  UnstyledButton,
} from '@mantine/core';
import {
  IconSettings,
  IconLogout,
  IconChevronDown,
  IconShieldLock,
} from '@tabler/icons-react';
import { ColorSchemeToggle } from '@/components/common/ColorSchemeToggle/ColorSchemeToggle';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import classes from './HeaderSearch.module.css';

interface HeaderProps {
  opened: boolean;
  onToggle: () => void;
}

const links = [
  { link: '/movie-screenings', label: 'Cartelera' },
  { link: '/movies', label: 'Películas' },
  { link: '/cinemas', label: 'Cines' },
];

export function Header({ opened, onToggle }: HeaderProps) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === 'ADMIN';

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Group>
          <Burger
            opened={opened}
            onClick={onToggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />

          <Link
            href="/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text
              fw={900}
              fz="xl"
              style={{ letterSpacing: '1px' }}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
            >
              CINEMO
            </Text>
          </Link>

          <Group ml={30} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>

        <Group>
          <Group gap="sm">
            {isLoggedIn ? (
              // --- Usuario logueado: Avatar + Menu ---
              <Menu shadow="md" width={200} position="bottom-end" withArrow>
                <Menu.Target>
                  <UnstyledButton>
                    <Group gap="xs">
                      <Avatar
                        radius="xl"
                        size="sm"
                        color="blue"
                        visibleFrom="sm"
                      >
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <IconChevronDown size={14} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>{session.user?.name}</Menu.Label>

                  {isAdmin && (
                    <Menu.Item
                      leftSection={<IconShieldLock size={14} />}
                      component={Link}
                      href="/admin"
                    >
                      Panel Admin
                    </Menu.Item>
                  )}

                  {/* <Menu.Item
                    leftSection={<IconSettings size={14} />}
                    component={Link}
                    href="/settings"
                  >
                    Configuración
                  </Menu.Item> */}

                  <Menu.Divider />

                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={14} />}
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Cerrar sesión
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              // --- No logueado: botones originales ---
              <>
                <Button
                  component={Link}
                  href="/login"
                  variant="subtle"
                  color="gray"
                  size="sm"
                  visibleFrom="sm"
                >
                  Iniciar sesión
                </Button>

                <Button
                  component={Link}
                  href="/register"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  size="sm"
                  radius="md"
                  visibleFrom="sm"
                >
                  Registrarse
                </Button>
              </>
            )}

            <Divider orientation="vertical" h={20} visibleFrom="sm" />
            <ColorSchemeToggle />
          </Group>
        </Group>
      </Container>
    </header>
  );
}
