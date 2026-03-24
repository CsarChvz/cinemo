import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ImplementationDevTools } from './ImplementationDevTools';
import { MantineProvider, Text } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const meta: Meta<typeof ImplementationDevTools> = {
  title: 'Components/Common/ImplementationDevTools',
  component: ImplementationDevTools,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Notifications />
        <div style={{ height: '300px' }}>
          <Text size="sm" c="dimmed">
            Presiona Ctrl + M o usa el botón para cambiar el modo. Arrastra
            desde el grip izquierdo.
          </Text>
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImplementationDevTools>;

export const Default: Story = {
  render: () => {
    const [isManual, setIsManual] = useState(false);
    return (
      <ImplementationDevTools isManual={isManual} onChange={setIsManual} />
    );
  },
};

export const ManualMode: Story = {
  render: () => {
    const [isManual, setIsManual] = useState(true);
    return (
      <ImplementationDevTools isManual={isManual} onChange={setIsManual} />
    );
  },
};

export const AutoMode: Story = {
  render: () => {
    const [isManual, setIsManual] = useState(false);
    return (
      <ImplementationDevTools isManual={isManual} onChange={setIsManual} />
    );
  },
};

