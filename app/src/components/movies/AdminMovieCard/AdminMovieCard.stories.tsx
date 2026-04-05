import type { Meta, StoryObj } from '@storybook/react';
import { AdminMovieCard } from './AdminMovieCard';
import { MantineProvider, SimpleGrid, Container } from '@mantine/core';

const meta: Meta<typeof AdminMovieCard> = {
  title: 'Components/Movies/Admin/AdminMovieCard',
  component: AdminMovieCard,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Container size="xs" py="xl">
          {/* Usamos un Grid para ver cómo se comporta en su contenedor real */}
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Story />
          </SimpleGrid>
        </Container>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdminMovieCard>;

export const Activa: Story = {
  args: {
    id: 1,
    title: 'Spider-Man: Across the Spider-Verse',
    posterUrl:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800',
    isActive: true,
    onDelete: (id) => console.log('Eliminar ID:', id),
    onToggleStatus: (id) => console.log('Cambiar estado ID:', id),
  },
};

export const Inactiva: Story = {
  args: {
    id: 2,
    title: 'The Dark Knight',
    posterUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    isActive: false,
  },
};

export const SinImagen: Story = {
  args: {
    id: 3,
    title: 'Película sin Poster',
    posterUrl: '',
    isActive: true,
  },
};

export const TituloLargo: Story = {
  args: {
    id: 4,
    title:
      'El Señor de los Anillos: El Retorno del Rey - Edición Extendida con Comentarios del Director',
    posterUrl:
      'https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=800',
    isActive: true,
  },
};
