// components/screenings/ScreeningDetail/InfoSection.tsx
import { Stack, Group, ThemeIcon, Text, Box, rem } from '@mantine/core';
import { IconProps } from '@tabler/icons-react';

interface InfoSectionProps {
  icon: React.FC<IconProps>;
  color?: string;
  title: string;
  children: React.ReactNode;
}

export function InfoSection({
  icon: Icon,
  color = 'blue',
  title,
  children,
}: InfoSectionProps) {
  return (
    <Stack gap="md">
      <Group gap="sm">
        <ThemeIcon variant="light" color={color} size="lg" radius="md">
          <Icon size={20} />
        </ThemeIcon>
        <Text fw={700}>{title}</Text>
      </Group>
      <Box pl={rem(40)}>{children}</Box>
    </Stack>
  );
}
