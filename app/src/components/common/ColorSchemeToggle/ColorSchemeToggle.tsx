'use client';

import { useEffect, useState } from 'react';
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
  Skeleton,
} from '@mantine/core';
import { Sun, Moon } from 'lucide-react';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Group justify="center">
        <Skeleton height={44} width={44} radius="md" />
      </Group>
    );
  }

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
