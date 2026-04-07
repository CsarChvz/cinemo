import type { Meta, StoryObj } from '@storybook/react';
import { MovieCard } from './MovieCard';
import { Movie, MovieGenre, MovieClassification } from '@/schemas/movie';
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
    // Eliminamos los controles de genre y classification planos
    // porque ahora viven dentro del objeto 'movie'
  },
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

// Objeto base para cumplir con la interfaz completa de la base de datos
const baseMovie: Movie = {
  id: 0,
  title: 'Título por defecto',
  posterUrl: '',
  genre: MovieGenre.ACCION,
  durationMin: 120,
  description: 'Descripción genérica',
  director: 'Director genérico',
  producer: 'Productora genérica',
  classification: MovieClassification.B,
  releaseYear: 2023,
  isActive: true,
};

export const Default: Story = {
  args: {
    // 🔥 Empaquetamos las propiedades dentro del objeto "movie"
    movie: {
      ...baseMovie,
      id: 1,
      title: 'Interstellar',
      posterUrl:
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
      genre: MovieGenre.CIENCIA_FICCION,
      classification: MovieClassification.B,
      durationMin: 169,
      description:
        'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.',
    },
  },
};

export const MarvelMovie: Story = {
  args: {
    movie: {
      ...baseMovie,
      id: 2,
      title: 'Spider-Man: No Way Home',
      posterUrl:
        'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop',
      genre: MovieGenre.ACCION,
      classification: MovieClassification.B,
      durationMin: 148,
      description:
        'Tras descubrirse la identidad de Spider-Man, Peter pide ayuda al Doctor Strange para restaurar su secreto, pero algo sale mal.',
    },
  },
};

export const ShortDescription: Story = {
  args: {
    movie: {
      ...baseMovie,
      id: 3,
      title: 'Up',
      // Agregué un póster de prueba para que no se vea el fallback en esta historia
      posterUrl:
        'https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=800',
      genre: MovieGenre.AVENTURAS,
      classification: MovieClassification.AA,
      durationMin: 97,
      description: 'Un anciano viaja a Sudamérica en su casa flotante.',
    },
  },
};
