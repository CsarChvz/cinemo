import type { Meta, StoryObj } from '@storybook/nextjs';
import { PasswordInput } from './PasswordInput';
import { Center, Box } from '@mantine/core';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Auth/Fields/PasswordInput',
  component: PasswordInput,
  decorators: [
    (Story) => (
      <Box p="xl" bg="#0a0a0a" style={{ minHeight: '200px' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {},
};

export const WithError: Story = {
  args: {
    error: 'La contraseña debe tener al menos 6 caracteres',
    value: '123',
  },
};
