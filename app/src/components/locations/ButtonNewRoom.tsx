// components/locations/ButtonNewRoom.tsx
'use client';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export function ButtonNewRoom() {
  return (
    <Button
      component={Link}
      href="/admin/locations/rooms/create"
      leftSection={<IconPlus size={18} />}
      variant="filled"
      color="teal"
    >
      Nueva Sala
    </Button>
  );
}
