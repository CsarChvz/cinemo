import type { Meta, StoryObj } from '@storybook/react';
import { ScreeningDetailContent } from './ScreeningDetailContent';
import { MantineProvider, Container } from '@mantine/core';
import { MovieClassification, MovieGenre } from '@/schemas/movie';
import { MovieScreening } from '@/schemas/movie-screening';

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

// 🔥 Mock actualizado a la estructura anidada y camelCase real
const mockScreening: MovieScreening = {
  id: 5520,
  movie: {
    id: 1,
    title: 'Interstellar',
    posterUrl: '',
    genre: MovieGenre.CIENCIA_FICCION,
    durationMin: 169,
    description: '',
    director: 'Christopher Nolan',
    producer: '',
    classification: MovieClassification.B,
    releaseYear: 2014,
    isActive: false,
  },
  status: 'Activo', // Ajustado a 'Activo' según lo que vimos en el componente original
  start: new Date(2026, 2, 26, 18, 30).toISOString(), // 26 de Marzo, 2026 6:30 PM
  end: new Date(2026, 2, 26, 21, 20).toISOString(),
  totalCapacity: 150,
  ticketsRemaining: 45,
  // 🔥 Recreamos la jerarquía relacional de la BD
  room: {
    id: 1,
    name: 'Sala 04',
    capacity: 150,
    roomType: 'IMAX',
    cinema: {
      id: 1,
      name: 'Cinépolis Gran Plaza',
      address: 'Av. Vallarta 3959',
      municipality: {
        id: 1,
        name: 'Guadalajara',
        state: {
          id: 1,
          name: 'Jalisco',
          code: 'JAL',
        },
      },
      latitude: 0,
      longitude: 0,
    },
    isActive: true,
    columnsPerRow: 0,
  },
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
      ticketsRemaining: 12, // 🔥 Cambiado a camelCase
      status: 'Activo',
    },
  },
};

// 3. Función Llena (Ocupación 100%)
export const SalaLlena: Story = {
  args: {
    screening: {
      ...mockScreening,
      ticketsRemaining: 0, // 🔥 Cambiado a camelCase
      status: 'Finalizada',
    },
  },
};
