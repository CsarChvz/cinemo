'use client';

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
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import {
  MovieClasification,
  MovieGenre,
  Movie,
} from '@/interfaces/movie.interface';

// 1. Definición de la Interface de Props
interface NuevaPeliculaFormProps {
  /** Datos iniciales para el modo edición. Si no se pasan, el form inicia vacío */
  initialValues?: Partial<Movie>;
  /** Flag para saber si estamos editando o creando */
  isEditing?: boolean;
  /** Función que se ejecuta al enviar el formulario con éxito */
  onSubmit?: (values: Movie) => void;
  /** Si es true, todos los campos se bloquean */
  readOnly?: boolean;
}

export function NuevaPeliculaForm({
  initialValues,
  isEditing = false,
  onSubmit,
  readOnly = false,
}: NuevaPeliculaFormProps) {
  // 2. Configuración del formulario con tipos
  const form = useForm<Movie>({
    // Usamos initialValues si existen, sino ponemos defaults seguros
    initialValues: {
      title: initialValues?.title || '',
      posterUrl: initialValues?.posterUrl || '',
      genre: initialValues?.genre || MovieGenre.ACCION, // Un default del enum
      duration: initialValues?.duration || '',
      description: initialValues?.description || '',
      director: initialValues?.director || '',
      producer: initialValues?.producer || '',
      clasification: initialValues?.clasification || MovieClasification.A,
      releaseYear: initialValues?.releaseYear || new Date().getFullYear(),
    },

    validate: {
      title: (v) => (v.length < 1 ? 'El título es requerido' : null),
      posterUrl: (v) =>
        v.length < 1 ? 'La URL del poster es requerida' : null,
      genre: (v) => (!v ? 'Selecciona un género' : null),
      clasification: (v) => (!v ? 'Selecciona la clasificación' : null),
    },
  });

  const handleFormSubmit = (values: Movie) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      console.log(
        `${isEditing ? 'Actualizando' : 'Creando'} película:`,
        values
      );
    }
  };

  return (
    <Paper p={40} radius="xl" withBorder>
      <Stack gap="xl">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>
              {isEditing ? 'Editar Película' : 'Registrar Película'}
            </Title>
            <Text c="dimmed" size="sm">
              {isEditing
                ? 'Modifica la información de la cinta seleccionada'
                : 'Añade un nuevo estreno a la cartelera de Cinemo'}
            </Text>
          </Stack>
          <Button
            component={Link}
            href="/admin/movies"
            variant="subtle"
            color="gray"
            leftSection={<IconArrowLeft size={16} />}
          >
            Volver
          </Button>
        </Group>

        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack gap="md">
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Título de la película"
                placeholder="Ej. Inception"
                required
                disabled={readOnly}
                {...form.getInputProps('title')}
              />
              <TextInput
                label="URL del Poster"
                placeholder="https://imagen.com/poster.jpg"
                required
                disabled={readOnly}
                {...form.getInputProps('posterUrl')}
              />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 3 }}>
              <Select
                label="Género"
                placeholder="Selecciona"
                disabled={readOnly}
                data={Object.values(MovieGenre)}
                {...form.getInputProps('genre')}
              />
              <Select
                label="Clasificación"
                placeholder="Selecciona"
                disabled={readOnly}
                data={Object.values(MovieClasification)}
                {...form.getInputProps('clasification')}
              />
              <TextInput
                label="Duración"
                placeholder="Ej. 120 min"
                disabled={readOnly}
                {...form.getInputProps('duration')}
              />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 3 }}>
              <TextInput
                label="Director"
                placeholder="Nombre del director"
                disabled={readOnly}
                {...form.getInputProps('director')}
              />
              <TextInput
                label="Productor"
                placeholder="Casa productora"
                disabled={readOnly}
                {...form.getInputProps('producer')}
              />
              <NumberInput
                label="Año de estreno"
                disabled={readOnly}
                {...form.getInputProps('releaseYear')}
              />
            </SimpleGrid>

            <Textarea
              label="Sinopsis / Descripción"
              placeholder="Escribe un breve resumen de la película..."
              minRows={3}
              disabled={readOnly}
              {...form.getInputProps('description')}
            />

            {!readOnly && (
              <Button
                type="submit"
                fullWidth
                size="md"
                mt="xl"
                variant="gradient"
                gradient={{ from: 'blue.6', to: 'cyan.6' }}
                leftSection={<IconDeviceFloppy size={20} />}
              >
                {isEditing ? 'Actualizar Película' : 'Guardar Película'}
              </Button>
            )}
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}
