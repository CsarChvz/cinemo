import type { Meta, StoryObj } from '@storybook/nextjs';
import { LoginForm } from './LoginForm';
import { Center } from '@mantine/core';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/Auth/Forms/LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => (
      <Center
        style={{
          minHeight: '100vh',
          background:
            'radial-gradient(circle at 50% -20%, #1a365d 0%, #0a0a0a 80%)',
        }}
      >
        <Story />
      </Center>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /iniciar sesión/i });
    await userEvent.click(loginButton);
  },
};
