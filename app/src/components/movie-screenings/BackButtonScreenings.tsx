// components/movie-screenings/BackButtonScreenings.tsx
'use client';

import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export function BackButtonScreenings() {
  return (
    <Button
      component={Link}
      href="/admin/movie-screenings"
      variant="subtle"
      color="gray"
      leftSection={<IconArrowLeft size={16} />}
      w="fit-content"
    >
      Volver a la lista
    </Button>
  );
}
