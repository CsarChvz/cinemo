// components/movies/MovieForm.tsx
'use client';

import { api } from '@/trpc-folder/trpc-adaptadores/react';
import { MovieGenre, MovieClassification } from '@/schemas/movie';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
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

export interface MovieFormValues {
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

interface MovieFormProps {
  isEditing?: boolean;
}

export function MovieForm({ isEditing = false }: MovieFormProps) {
  const router = useRouter();

  const form = useForm<MovieFormValues>({
    initialValues: {
      title: '',
      posterUrl: '',
      genre: '',
      durationMin: 120,
      description: '',
      director: '',
      producer: '',
      classification: '',
      releaseYear: new Date().getFullYear(),
      isActive: true,
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

  const createMovie = api.movie.create.useMutation({
    onSuccess: () => {
      router.push('/admin/movies');
    },
    onError: (error) => {
      console.error('Error al guardar la película:', error.message);
      alert(`Ocurrió un error: ${error.message}`);
    },
  });

  return (
    <Paper p={40} radius="xl" withBorder shadow="md">
      <Stack gap={5} mb="xl">
        <Title order={2}>
          {isEditing ? 'Editar Película' : 'Registrar Nueva Película'}
        </Title>
        <Text c="dimmed" size="sm">
          {isEditing
            ? 'Modifica la información de la cinta seleccionada.'
            : 'Añade un nuevo estreno a la cartelera de Cinemo.'}
        </Text>
      </Stack>

      <form
        onSubmit={form.onSubmit((values) => {
          createMovie.mutate({
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
            loading={createMovie.isPending} // Spinner automático durante el guardado
          >
            {isEditing ? 'Actualizar Película' : 'Guardar Película'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
