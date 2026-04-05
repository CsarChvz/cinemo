import type { Meta, StoryObj } from '@storybook/react';
import { MovieSummaryCard } from './MovieSummaryCard';
import { MantineProvider, Container } from '@mantine/core';
import {
  MovieGenre,
  MovieClasification,
  Movie,
} from '@/interfaces/movie.interface';

const meta: Meta<typeof MovieSummaryCard> = {
  title: 'Components/Movie Screenings/MovieSummaryCard',
  component: MovieSummaryCard,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Container size="sm" py="xl">
          <Story />
        </Container>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MovieSummaryCard>;

const mockMovie: Movie = {
  id: 101,
  title: 'Spider-Man: Across the Spider-Verse',
  posterUrl:
    'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800',
  genre: MovieGenre.ANIMACION,
  duration: '140 min',
  description: 'Miles Morales se lanza a través del Multiverso...',
  director: 'Joaquim Dos Santos',
  producer: 'Amy Pascal',
  clasification: MovieClasification.A,
  releaseYear: 2023,
};

// 1. Vista estándar con botón de acción
export const ConAccion: Story = {
  args: {
    movie: mockMovie,
    onViewFullDetails: () => alert('Navegando a la ficha completa...'),
  },
};

// 2. Solo información (Sin botón)
export const SoloInfo: Story = {
  args: {
    movie: {
      ...mockMovie,
      title: 'The Batman',
      genre: MovieGenre.ACCION,
      clasification: MovieClasification.B,
      duration: '176 min',
    },
  },
};

// 3. Caso borde: Película sin año de estreno (para probar el condicional)
export const SinAnio: Story = {
  args: {
    movie: {
      ...mockMovie,
      releaseYear: 0,
    },
    onViewFullDetails: () => {},
  },
};
