import type { Meta, StoryObj } from '@storybook/react';
import { MovieScreeningForm } from './MovieScreeningForm';
import { MantineProvider } from '@mantine/core';
import '@mantine/dates/styles.css'; // ¡Ojo aquí! Necesario para el DateTimePicker

const meta: Meta<typeof MovieScreeningForm> = {
  title: 'Components/Movie Screenings/MovieScreeningForm',
  component: MovieScreeningForm,
  decorators: [
    (Story) => (
      <MantineProvider>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MovieScreeningForm>;

// Estado inicial limpio para crear
export const Crear: Story = {
  args: {
    onSubmit: (values) => {
      console.log('Formulario enviado:', values);
      alert('Función creada (ver consola)');
    },
  },
};

// Estado con valores iniciales (Modo Edición)
export const Editar: Story = {
  args: {
    onSubmit: (values) => console.log('Editado:', values),
    initialValues: {
      peliculaId: 'Interstellar',
      estadoId: 'Jalisco',
      municipioId: 'Zapopan',
      cineId: 'Andares',
      salaId: 'VIP',
      horario: new Date(2026, 2, 26, 18, 30), // 26 de Marzo, 2026
    },
  },
};
