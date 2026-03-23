'use client';

import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
} from '@mantine/core';
import { Sun, Moon } from 'lucide-react';
import cx from 'clsx';
import classes from './ColorSchemeToggle.module.css'; // Opcional para animaciones

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  // useComputedColorScheme ayuda a saber el esquema real (incluso si está en 'auto')
  // El segundo parámetro 'light' es el valor por defecto para el SSR
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
        }
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
        radius="md"
      >
        {computedColorScheme === 'light' ? (
          <Moon
            size={20}
            strokeWidth={1.5}
            color="var(--mantine-color-blue-6)"
          />
        ) : (
          <Sun
            size={20}
            strokeWidth={1.5}
            color="var(--mantine-color-yellow-4)"
          />
        )}
      </ActionIcon>
    </Group>
  );
}
