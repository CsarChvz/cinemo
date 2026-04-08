'use client';

import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface BackButtonProps {
  href: string;
  label?: string;
  color?: string;
  icon?: ReactNode;
}

export function BackButton({
  href,
  label = 'Volver a la lista',
  color = 'gray',
  icon = <IconArrowLeft size={16} />,
}: BackButtonProps) {
  return (
    <Button
      component={Link}
      href={href}
      variant="subtle"
      color={color}
      leftSection={icon}
      w="fit-content"
    >
      {label}
    </Button>
  );
}
