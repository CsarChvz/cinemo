import type { Meta, StoryObj } from '@storybook/react';
import { InfoSection } from './InfoSection';
import { MantineProvider, Text, Badge, Group, Stack } from '@mantine/core';
import {
  IconCalendarEvent,
  IconArmchair,
  IconMovie,
  IconInfoCircle,
} from '@tabler/icons-react';

const meta: Meta<typeof InfoSection> = {
  title: 'Components/Movie Screenings/InfoSection',
  component: InfoSection,
  decorators: [
    (Story) => (
      <MantineProvider>
        <div style={{ maxWidth: '400px', padding: '2rem' }}>
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InfoSection>;

// Ejemplo básico con texto
export const Default: Story = {
  args: {
    icon: IconCalendarEvent,
    title: 'Fecha y Hora',
    children: (
      <Text size="sm">
        Sábado 24 de Julio, 2025 <br />
        <b>18:30 hrs</b>
      </Text>
    ),
  },
};

// Ejemplo con Badge o elementos de Mantine como children
export const ConEstado: Story = {
  args: {
    icon: IconArmchair,
    color: 'teal',
    title: 'Disponibilidad de Asientos',
    children: (
      <Group gap="xs">
        <Badge color="green" variant="light">
          45 Libres
        </Badge>
        <Text size="xs" c="dimmed">
          de 100 totales
        </Text>
      </Group>
    ),
  },
};

// Ejemplo con otro color y contenido variado
export const PeliculaDetalle: Story = {
  args: {
    icon: IconMovie,
    color: 'orange',
    title: 'Detalles de la Cinta',
    children: (
      <Stack gap={4}>
        <Text size="sm">
          <b>Director:</b> Christopher Nolan
        </Text>
        <Text size="sm">
          <b>Duración:</b> 180 min
        </Text>
      </Stack>
    ),
  },
};
