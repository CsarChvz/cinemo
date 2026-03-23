import type { Meta, StoryObj } from '@storybook/react';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import {
  MantineProvider,
  useMantineColorScheme,
  Button,
  Group,
} from '@mantine/core';

const meta: Meta<typeof ColorSchemeToggle> = {
  title: 'Components/Common/ColorSchemeToggle',
  component: ColorSchemeToggle,
  decorators: [
    (Story) => (
      <MantineProvider>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ColorSchemeToggle>;

export const Default: Story = {};

export const WithContext: Story = {
  render: () => {
    return (
      <Group justify="center" dir="column">
        <Text size="sm" c="dimmed">
          Prueba el cambio de tema:
        </Text>
        <ColorSchemeToggle />
      </Group>
    );
  },
};

import { Text } from '@mantine/core';
