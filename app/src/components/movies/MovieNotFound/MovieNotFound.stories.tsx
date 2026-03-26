import type { Meta, StoryObj } from '@storybook/react';
import { MovieNotFound } from './MovieNotFound';
import { MantineProvider } from '@mantine/core';

const meta: Meta<typeof MovieNotFound> = {
  title: 'Components/Movies/Errors/MovieNotFound',
  component: MovieNotFound,
  decorators: [
    (Story) => (
      <MantineProvider>
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MovieNotFound>;

export const Default: Story = {
  args: {
    // Simulamos el router de Next.js
    router: {
      push: (url: string) => {
        console.log(`Navegando a: ${url}`);
        alert(`Redirigiendo a ${url}`);
      },
    } as any,
  },
};
