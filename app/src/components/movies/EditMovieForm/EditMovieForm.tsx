// components/movies/EditMovieForm.tsx
'use client';

import { api } from '@/trpc-folder/trpc-adaptadores/react';
import { Movie, MovieGenre, MovieClassification } from '@/schemas/movie';
import {
  TextInput,
  Button,
  Paper,
  Stack,
  SimpleGrid,
  Select,
  NumberInput,
  Textarea,
  Switch,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

// Usamos la misma interfaz de valores que el formulario de creación
export interface EditMovieFormValues {
  title: string;
  posterUrl: string;
  genre: string;
  durationMin: number;
  description: string;
  director: string;
  producer: string;
  classification: string;
  releaseYear: number;
  isActive: boolean;
}

interface EditMovieFormProps {
  movie: Movie;
}

export function EditMovieForm({ movie }: EditMovieFormProps) {
  const router = useRouter();

  // 1. Inicializamos el formulario con los datos de la base de datos
  const form = useForm<EditMovieFormValues>({
    initialValues: {
      title: movie.title,
      posterUrl: movie.posterUrl,
      genre: movie.genre,
      durationMin: movie.durationMin,
      description: movie.description,
      director: movie.director,
      producer: movie.producer,
      classification: movie.classification,
      releaseYear: movie.releaseYear,
      isActive: movie.isActive,
    },
    validate: {
      title: (v) => (v.trim().length < 1 ? 'El título es requerido' : null),
      posterUrl: (v) =>
        v.trim().length < 1 ? 'La URL del poster es requerida' : null,
      genre: (v) => (!v ? 'Selecciona un género' : null),
      classification: (v) => (!v ? 'Selecciona la clasificación' : null),
      durationMin: (v) => (v <= 0 ? 'La duración debe ser mayor a 0' : null),
      director: (v) =>
        v.trim().length < 1 ? 'El director es requerido' : null,
      producer: (v) =>
        v.trim().length < 1 ? 'El productor es requerido' : null,
    },
  });

  // 2. Mutación de tRPC para ACTUALIZAR la película
  const editMovie = api.movie.update.useMutation({
    onSuccess: () => {
      router.push('/admin/movies');
      router.refresh(); // Refrescamos para asegurar que la lista muestre los cambios
    },
    onError: (error) => {
      console.error('Error al actualizar la película:', error.message);
      alert(`Ocurrió un error: ${error.message}`);
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <form
        onSubmit={form.onSubmit((values) => {
          // 3. Ejecutamos la mutación pasando el ID y los valores actualizados
          editMovie.mutate({
            id: movie.id!, // Pasamos el ID de la película que estamos editando
            data: {
              title: values.title,
              posterUrl: values.posterUrl,
              genre: values.genre as MovieGenre,
              classification: values.classification as MovieClassification,
              durationMin: values.durationMin,
              description: values.description,
              director: values.director,
              producer: values.producer,
              releaseYear: values.releaseYear,
              isActive: values.isActive,
            },
          });
        })}
      >
        <Stack gap="md">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Título de la película"
              placeholder="Ej. Inception"
              withAsterisk
              {...form.getInputProps('title')}
            />
            <TextInput
              label="URL del Poster"
              placeholder="https://imagen.com/poster.jpg"
              withAsterisk
              {...form.getInputProps('posterUrl')}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Select
              label="Género"
              placeholder="Selecciona"
              withAsterisk
              searchable
              data={Object.values(MovieGenre)}
              {...form.getInputProps('genre')}
            />
            <Select
              label="Clasificación"
              placeholder="Selecciona"
              withAsterisk
              data={Object.values(MovieClassification)}
              {...form.getInputProps('classification')}
            />
            <NumberInput
              label="Duración (minutos)"
              placeholder="Ej. 120"
              withAsterisk
              min={1}
              {...form.getInputProps('durationMin')}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <TextInput
              label="Director"
              placeholder="Nombre del director"
              withAsterisk
              {...form.getInputProps('director')}
            />
            <TextInput
              label="Productor"
              placeholder="Casa productora"
              withAsterisk
              {...form.getInputProps('producer')}
            />
            <NumberInput
              label="Año de estreno"
              withAsterisk
              {...form.getInputProps('releaseYear')}
            />
          </SimpleGrid>

          <Textarea
            label="Sinopsis / Descripción"
            placeholder="Escribe un breve resumen de la película..."
            minRows={3}
            withAsterisk
            {...form.getInputProps('description')}
          />

          <Switch
            label="Película Activa (Visible en la cartelera)"
            mt="sm"
            {...form.getInputProps('isActive', { type: 'checkbox' })}
          />

          <Button
            type="submit"
            fullWidth
            size="md"
            mt="xl"
            variant="gradient"
            gradient={{ from: 'blue.6', to: 'cyan.6' }}
            leftSection={<IconDeviceFloppy size={20} />}
            loading={editMovie.isPending} // Spinner automático durante el guardado
          >
            Actualizar Película
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
