'use client'; // <-- ¡La clave está aquí!

import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export function BackButton() {
  return (
    <Button
      component={Link}
      href="/movies"
      variant="subtle"
      leftSection={<IconArrowLeft size={16} />}
      mb="xl"
      color="gray"
    >
      Volver al catálogo
    </Button>
  );
}
