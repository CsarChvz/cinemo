import type { Meta, StoryObj } from '@storybook/nextjs';
import { MainLayout } from './MainLayout';
import { Text, Title } from '@mantine/core';

const meta: Meta<typeof MainLayout> = {
  title: 'Components/MainLayout/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <Title order={1}>Cartelera Principal</Title>
        <Text mt="md">
          Aquí es donde aparecerán todas tus películas de Cinemo.
        </Text>
        <div
          style={{
            height: '1000px',
            marginTop: '20px',
            background: '#f0f0f0',
            padding: '20px',
          }}
        >
          Simulación de scroll para probar el Header fijo...
        </div>
      </div>
    ),
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    children: (
      <div style={{ padding: '10px' }}>
        <Title order={2}>Vista Móvil</Title>
        <Text size="sm">
          Prueba el botón Burger arriba a la izquierda para abrir los filtros.
        </Text>
      </div>
    ),
  },
};

export const ShortContent: Story = {
  args: {
    children: (
      <div
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Text c="dimmed">No hay películas para mostrar en este momento.</Text>
      </div>
    ),
  },
};
