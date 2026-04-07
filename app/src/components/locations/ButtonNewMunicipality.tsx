'use client';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export function ButtonNewMunicipality() {
  return (
    <Button
      component={Link}
      href="/admin/locations/municipalities/create"
      leftSection={<IconPlus size={18} />}
      variant="filled"
      color="indigo" // Opcional, para mantener consistencia con el de estados
    >
      Nuevo Municipio
    </Button>
  );
}
