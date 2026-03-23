import type { Meta, StoryObj } from '@storybook/nextjs';
import { Center } from '@mantine/core';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from './RegisterForm';

const meta: Meta<typeof RegisterForm> = {
  title: 'Components/Auth/Forms/RegisterForm',
  component: RegisterForm,
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
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /crear cuenta/i });
    await userEvent.click(loginButton);
  },
};
