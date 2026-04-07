'use client';

import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export function BackButtonRooms() {
  return (
    <Button
      component={Link}
      href="/admin/locations/rooms"
      variant="subtle"
      color="gray"
      leftSection={<IconArrowLeft size={16} />}
      w="fit-content"
    >
      Volver a la lista
    </Button>
  );
}
