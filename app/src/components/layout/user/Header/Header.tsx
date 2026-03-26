'use client';

import {
  Burger,
  Group,
  Container,
  Text,
  Button,
  Divider,
} from '@mantine/core';
import { ColorSchemeToggle } from '@/components/common/ColorSchemeToggle/ColorSchemeToggle';
import Link from 'next/link';
import classes from './HeaderSearch.module.css';
import { HeaderProps } from '@/interfaces/components.interface';



const links = [
  { link: '/movie-screenings', label: 'Cartelera' },
  { link: '/movies', label: 'Películas' },
];

export function Header({ opened, onToggle }: HeaderProps) {
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

          {/* Navegación Principal (Solo Desktop) */}
          <Group ml={30} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>

        <Group>
          {/* Sección de Acceso */}
          <Group gap="sm">
            <Button
              component={Link}
              href="/login"
              variant="subtle"
              color="gray"
              size="sm"
              visibleFrom="sm" // Oculto en móviles para ahorrar espacio
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
              visibleFrom="sm" // Oculto en móviles para ahorrar espacio
            >
              Registrarse
            </Button>

            <Divider orientation="vertical" h={20} visibleFrom="sm" />

            <ColorSchemeToggle />
          </Group>
        </Group>
      </Container>
    </header>
  );
}
