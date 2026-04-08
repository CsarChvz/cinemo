// components/locations/ButtonNewCinema.tsx
'use client';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export function ButtonNewCinema() {
  return (
    <Button
      component={Link}
      href="/admin/locations/cinemas/create"
      leftSection={<IconPlus size={18} />}
      variant="filled"
      color="violet" // Mantenemos el color violeta que tenías
    >
      Nuevo Cine
    </Button>
  );
}
