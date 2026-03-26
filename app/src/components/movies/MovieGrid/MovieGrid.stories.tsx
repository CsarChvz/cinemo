import type { Meta, StoryObj } from '@storybook/react';
import { MovieGrid } from './MovieGrid';
import { MantineProvider, Container } from '@mantine/core';
import {
  MovieGenre,
  MovieClasification,
  Movie,
} from '@/interfaces/movie.interface';

const meta: Meta<typeof MovieGrid> = {
  title: 'Components/Movies/MovieGrid',
  component: MovieGrid,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Container size="xl" py="xl">
          <Story />
        </Container>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MovieGrid>;

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Interstellar',
    posterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    genre: MovieGenre.CIENCIA_FICCION,
    duration: '169 min',
    description: 'Exploración espacial y viajes en el tiempo.',
    clasification: MovieClasification.B,
    director: 'Christopher Nolan',
    producer: 'Emma Thomas',
    releaseYear: 2014,
  },
  {
    id: 2,
    title: 'Spider-Man: Across the Spider-Verse',
    posterUrl:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800',
    genre: MovieGenre.ANIMACION,
    duration: '140 min',
    description: 'Miles Morales a través del multiverso.',
    clasification: MovieClasification.A,
    director: 'Joaquim Dos Santos',
    producer: 'Amy Pascal',
    releaseYear: 2023,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    posterUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    genre: MovieGenre.ACCION,
    duration: '152 min',
    description: 'Batman contra el Joker en Gotham.',
    clasification: MovieClasification.B,
    director: 'Christopher Nolan',
    producer: 'Charles Roven',
    releaseYear: 2008,
  },
];

// 1. Vista de Usuario (Catálogo estándar)
export const UserView: Story = {
  args: {
    movies: mockMovies,
    adminView: false,
  },
};

// 2. Vista de Administrador (Panel de control)
export const AdminView: Story = {
  args: {
    movies: mockMovies,
    adminView: true,
    handleDelete: (id) => console.log('Borrando película:', id),
    handleToggleStatus: (id) => console.log('Cambiando estado:', id),
  },
};

// 3. Estado Vacío (Sin resultados de búsqueda)
export const SinResultados: Story = {
  args: {
    movies: [],
    adminView: false,
  },
};

// 4. Vista Tablet (Breakpoint md)
export const TabletView: Story = {
  args: {
    movies: mockMovies,
    adminView: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
