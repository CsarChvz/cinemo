import type { Meta, StoryObj } from '@storybook/react';
import { MovieCard } from './MovieCard';
import { MovieGenre, MovieClasification } from '@/interfaces/movie.interface';
import { MantineProvider } from '@mantine/core';

const meta: Meta<typeof MovieCard> = {
  title: 'Components/Movies/MovieCard',
  component: MovieCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MantineProvider>
        <div style={{ maxWidth: '350px' }}>
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
  argTypes: {
    onViewDetails: { action: 'onViewDetails clicked' },
    // Esto ayuda a que en Storybook aparezca un selector para los Enums
    genre: {
      control: 'select',
      options: Object.values(MovieGenre),
    },
    clasification: {
      control: 'select',
      options: Object.values(MovieClasification),
    },
  },
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {
  args: {
    id: 1,
    title: 'Interstellar',
    posterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    genre: MovieGenre.CIENCIA_FICCION,
    clasification: MovieClasification.B,
    duration: '169 min',
    description:
      'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.',
  },
};

export const MarvelMovie: Story = {
  args: {
    id: 2,
    title: 'Spider-Man: No Way Home',
    posterUrl:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop',
    genre: MovieGenre.ACCION,
    clasification: MovieClasification.B,
    duration: '148 min',
    description:
      'Tras descubrirse la identidad de Spider-Man, Peter pide ayuda al Doctor Strange para restaurar su secreto, pero algo sale mal.',
  },
};

export const ShortDescription: Story = {
  args: {
    ...Default.args,
    id: 3,
    title: 'Up',
    genre: MovieGenre.AVENTURAS,
    clasification: MovieClasification.AA,
    duration: '96 min',
    description: 'Un anciano viaja a Sudamérica en su casa flotante.',
  },
};
