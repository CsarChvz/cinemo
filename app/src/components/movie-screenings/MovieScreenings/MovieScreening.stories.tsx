import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider } from '@mantine/core';
import MovieScreening from './MovieScreenings';
import {
  Movie,
  MovieGenre,
  MovieClasification,
} from '@/interfaces/movie.interface';

const meta: Meta<typeof MovieScreening> = {
  title: 'Components/Movie Screenings/MovieScreening',
  component: MovieScreening,
  decorators: [
    (Story) => (
      <MantineProvider>
        <div
          style={{
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
          }}
        >
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MovieScreening>;

// Mock alineado a tu interfaz Movie
const mockMovie: Movie = {
  id: 1,
  title: 'Interstellar',
  posterUrl:
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
  genre: MovieGenre.CIENCIA_FICCION,
  duration: '169 min',
  description:
    'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.',
  director: 'Christopher Nolan',
  producer: 'Emma Thomas',
  clasification: MovieClasification.B,
  releaseYear: 2014,
};

// 1. Estado inicial: Sin cine seleccionado
export const SinSeleccion: Story = {
  args: {
    movie: mockMovie,
  },
};

// 2. Estado con cine seleccionado
export const ConCineSeleccionado: Story = {
  args: {
    movie: mockMovie,
    cinema: 'Cinépolis Gran Plaza',
  },
};

// 3. Vista móvil
export const VistaMobile: Story = {
  args: {
    movie: mockMovie,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
