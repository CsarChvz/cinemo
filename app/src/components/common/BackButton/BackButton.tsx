'use client';

import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label?: string;
}

export function BackButton({ href, label = 'Volver a la lista' }: BackButtonProps) {
  return (
    <Button
      component={Link}
      href={href}
      variant="subtle"
      color="gray"
      leftSection={<IconArrowLeft size={16} />}
      w="fit-content"
    >
      {label}
    </Button>
  );
}
