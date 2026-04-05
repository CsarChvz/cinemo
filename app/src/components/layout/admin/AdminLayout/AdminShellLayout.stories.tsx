import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, Text, Card } from '@mantine/core';
import { AdminShellLayout } from './AdminLayout';

const meta: Meta<typeof AdminShellLayout> = {
  title: 'Components/Common/Admin/AdminShellLayout',

  component: AdminShellLayout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdminShellLayout>;

const DummyContent = () => (
  <Card withBorder shadow="sm" radius="md">
    <Text fw={500} size="lg" mb="xs">
      Contenido del Dashboard
    </Text>
    <Text size="sm" c="dimmed">
      Aquí es donde irían tus tablas, gráficas o formularios de administración.
    </Text>
  </Card>
);

export const Default: Story = {
  args: {
    children: <DummyContent />,
  },
};

export const MobileView: Story = {
  args: {
    children: <DummyContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
