import type { Meta, StoryObj } from '@storybook/react';
import { ScreeningDetailContent } from './ScreeningDetailContent';
import { MantineProvider, Container } from '@mantine/core';
import { MovieGenre, MovieClasification } from '@/interfaces/movie.interface';
// Asegúrate de tener esta interfaz o cámbiala por la ruta correcta
import { MovieScreening } from '@/interfaces/movie_screening.interface';

const meta: Meta<typeof ScreeningDetailContent> = {
  title: 'Components/Movie Screenings/ScreeningDetailContent',
  component: ScreeningDetailContent,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Container size="lg" py="xl">
          <Story />
        </Container>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScreeningDetailContent>;

const mockScreening: MovieScreening = {
  id: 5520,
  movie: {
    id: 1,
    title: 'Interstellar',
    posterUrl: '',
    genre: MovieGenre.CIENCIA_FICCION,
    duration: '169 min',
    description: '',
    director: 'Christopher Nolan',
    producer: '',
    clasification: MovieClasification.B,
    releaseYear: 2014,
  },
  status: 'Activa',
  start: new Date(2026, 2, 26, 18, 30), // 26 de Marzo, 2026 6:30 PM
  end: new Date(2026, 2, 26, 21, 20),
  cinema: 'Cinépolis Gran Plaza',
  municipality: 'Guadalajara, Jalisco',
  location: 'Sala 04 - IMAX',
  total_capacity: 150,
  tickets_remaining: 45,
  state: 'Jalisco',
};

// 1. Estado normal (Buena disponibilidad)
export const Default: Story = {
  args: {
    screening: mockScreening,
  },
};

// 2. Estado Crítico (Pocos asientos - Texto en Rojo)
export const PocosAsientos: Story = {
  args: {
    screening: {
      ...mockScreening,
      tickets_remaining: 12,
      status: 'Activa',
    },
  },
};

// 3. Función Llena (Ocupación 100%)
export const SalaLlena: Story = {
  args: {
    screening: {
      ...mockScreening,
      tickets_remaining: 0,
      status: 'Finalizada',
    },
  },
};
