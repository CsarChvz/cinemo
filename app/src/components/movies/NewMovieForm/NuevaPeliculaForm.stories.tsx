import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, Container } from '@mantine/core';
import { MovieGenre, MovieClassification } from '@/schemas/movie';
import { NuevaPeliculaForm } from './NewMovieForm';

const meta: Meta<typeof NuevaPeliculaForm> = {
  title: 'Components/Movies/Admin/NuevaPeliculaForm',
  component: NuevaPeliculaForm,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Container size="md" py="xl">
          <Story />
        </Container>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NuevaPeliculaForm>;

// 1. Estado de Registro (Nuevo)
export const Registrar: Story = {
  args: {
    isEditing: false,
    onSubmit: (values) => {
      console.log('Creando película:', values);
      alert('Película registrada con éxito');
    },
  },
};

// 2. Estado de Edición (Con datos previos)
export const Editar: Story = {
  args: {
    isEditing: true,
    initialValues: {
      title: 'Interstellar',
      posterUrl:
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
      genre: MovieGenre.CIENCIA_FICCION,
      durationMin: 169,
      description:
        'Un equipo de exploradores viaja a través de un agujero de gusano...',
      director: 'Christopher Nolan',
      producer: 'Syncopy Inc.',
      classification: MovieClassification.B,
      releaseYear: 2014,
    },
    onSubmit: (values) => console.log('Actualizando datos:', values),
  },
};

// 3. Estado de Solo Lectura (ReadOnly)
export const SoloLectura: Story = {
  args: {
    readOnly: true,
    initialValues: {
      title: 'Spider-Man: No Way Home',
      posterUrl:
        'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800',
      genre: MovieGenre.ACCION,
      durationMin: 158,
      description: 'Peter Parker busca la ayuda del Doctor Strange...',
      director: 'Jon Watts',
      producer: 'Marvel Studios',
      classification: MovieClassification.B,
      releaseYear: 2021,
    },
  },
};

// 4. Validación de Errores (Formulario vacío intentando enviar)
export const ValidacionErrores: Story = {
  args: {
    ...Registrar.args,
  },
  play: async ({ canvasElement }) => {
    // Esto es opcional, pero ayuda a ver cómo lucen los errores al disparar el submit
    const submitBtn = canvasElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    if (submitBtn) submitBtn.click();
  },
};
