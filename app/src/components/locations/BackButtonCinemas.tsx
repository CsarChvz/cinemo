// components/locations/BackButtonCinemas.tsx
'use client';

import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export function BackButtonCinemas() {
  return (
    <Button
      component={Link}
      href="/admin/locations/cinemas"
      variant="subtle"
      color="gray"
      leftSection={<IconArrowLeft size={16} />}
      w="fit-content"
    >
      Volver a la lista
    </Button>
  );
}
