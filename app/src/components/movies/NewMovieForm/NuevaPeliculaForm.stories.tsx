import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, Container } from '@mantine/core';
import { MovieForm } from './NewMovieForm';

const meta: Meta<typeof MovieForm> = {
  title: 'Components/Movies/Admin/MovieForm',
  component: MovieForm,
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
type Story = StoryObj<typeof MovieForm>;

// 1. Estado de Registro (Nuevo - Formulario en blanco)
export const Registrar: Story = {
  args: {
    isEditing: false,
  },
};

// 2. Estado de Edición Visual
// (Como este componente ya no recibe initialValues, solo cambiará el título y el botón)
export const EditarVisual: Story = {
  args: {
    isEditing: true,
  },
};

// 3. Validación de Errores (Formulario vacío intentando enviar)
export const ValidacionErrores: Story = {
  args: {
    isEditing: false,
  },
  play: async ({ canvasElement }: any) => {
    // Simulamos un clic en el botón de guardar para disparar las validaciones rojas de Zod/Mantine
    const submitBtn = canvasElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    if (submitBtn) submitBtn.click();
  },
};
