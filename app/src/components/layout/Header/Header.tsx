'use client';

import { Autocomplete, Burger, Group, Container, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ColorSchemeToggle } from '@/components/common/ColorSchemeToggle/ColorSchemeToggle';
import Link from 'next/link'; // 1. Importamos Link
import classes from './HeaderSearch.module.css';

interface HeaderProps {
  opened: boolean;
  onToggle: () => void;
}

const links = [
  { link: '/program-guide', label: 'Cartelera' },
  { link: '/movies', label: 'Peliculas' },
];

export function Header({ opened, onToggle }: HeaderProps) {
  const items = links.map((link) => (
    <Link // 2. Usamos Link en lugar de <a> para los items
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group>
          <Burger
            opened={opened}
            onClick={onToggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />

          {/* 3. Logo de Cinemo con Link a la raíz '/' */}
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
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>

          <ColorSchemeToggle />
        </Group>
      </Container>
    </header>
  );
}
