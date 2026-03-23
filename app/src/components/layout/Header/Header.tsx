'use client';

import { Autocomplete, Burger, Group, Container } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ColorSchemeToggle } from '@/components/common/ColorSchemeToggle/ColorSchemeToggle';
import classes from './HeaderSearch.module.css';

// Definimos qué necesita el Header para funcionar
interface HeaderProps {
  opened: boolean; 
  onToggle: () => void;
}

const links = [
  { link: '/cartelera', label: 'Cartelera' },
  { link: '/estrenos', label: 'Estrenos' },
  { link: '/favoritos', label: 'Mis Favoritos' },
];

export function Header({ opened, onToggle }: HeaderProps) {
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        // Aquí después pondrás el ruteo de Next.js
        console.log(`Navegando a ${link.label}`);
      }}
    >
      {link.label}
    </a>
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
          {/* Aquí pondrás tu logo de Cinemo */}
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>CINEMO</div>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>

          <Autocomplete
            className={classes.search}
            placeholder="Buscar película..."
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={['Batman', 'Inception', 'Avengers', 'Titanic']}
            visibleFrom="xs"
          />

          <ColorSchemeToggle />
        </Group>
      </Container>
    </header>
  );
}
