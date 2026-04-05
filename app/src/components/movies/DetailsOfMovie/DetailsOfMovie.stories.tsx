import type { Meta, StoryObj } from '@storybook/react';
import { DetailsOfMovie } from './DetailsOfMovie';
import { MantineProvider, Container } from '@mantine/core';
import { Movie, MovieClassification, MovieGenre } from '@/schemas/movie';


const meta: Meta<typeof DetailsOfMovie> = {
  title: 'Components/Movies/DetailsOfMovie',
  component: DetailsOfMovie,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Container size="lg" py={40}>
          <Story />
        </Container>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DetailsOfMovie>;

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  posterUrl:
    'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80',
  genre: MovieGenre.CIENCIA_FICCION,
  durationMin: 158,
  description:
    'Dom Cobb es un ladrón experto, el mejor en el peligroso arte de la extracción, robando secretos valiosos de lo profundo del subconsciente durante el estado de sueño, cuando la mente es más vulnerable. La habilidad de Cobb lo ha convertido en un jugador codiciado en este nuevo mundo de espionaje corporativo.',
  director: 'Christopher Nolan',
  producer: 'Emma Thomas',
  classification: MovieClassification.B,
  releaseYear: 2010,
  isActive: true,
};

// 1. Vista de Escritorio (Desktop)
export const Desktop: Story = {
  args: {
    movie: mockMovie,
  },
};

// 2. Con descripción muy corta
export const InfoCorta: Story = {
  args: {
    movie: {
      ...mockMovie,
      title: 'Toy Story',
      genre: MovieGenre.ANIMACION,
      description: 'Los juguetes de un niño cobran vida cuando él no está.',
      classification: MovieClassification.AA,
      releaseYear: 1995,
      posterUrl:
        'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800',
    },
  },
};

// 3. Vista Móvil
export const Mobile: Story = {
  args: {
    movie: mockMovie,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
