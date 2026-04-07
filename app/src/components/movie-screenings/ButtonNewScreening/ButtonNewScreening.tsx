// components/movie-screenings/ButtonNewScreening.tsx
'use client';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export function ButtonNewScreening() {
  return (
    <Button
      component={Link}
      href="/admin/movie-screenings/create"
      leftSection={<IconPlus size={18} />}
      variant="filled"
    >
      Nueva Función
    </Button>
  );
}
