'use client';

// 1. Importaciones actualizadas con el nuevo esquema de Zod
import { Movie, MovieGenre, MovieClassification } from '@/schemas/movie';
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
  Switch,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy, IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

// 2. Definición de la Interface de Props
interface NuevaPeliculaFormProps {
  initialValues?: Partial<Movie>;
  isEditing?: boolean;
  onSubmit?: (values: Movie) => void;
  readOnly?: boolean;
}

export function NuevaPeliculaForm({
  initialValues,
  isEditing = false,
  onSubmit,
  readOnly = false,
}: NuevaPeliculaFormProps) {
  // 3. Configuración del formulario con tipos
  const form = useForm<Movie>({
    initialValues: {
      title: initialValues?.title || '',
      posterUrl: initialValues?.posterUrl || '',
      genre: initialValues?.genre || MovieGenre.ACCION,
      durationMin: initialValues?.durationMin || 120, // Cambiado a número (ej. 120 min)
      description: initialValues?.description || '',
      director: initialValues?.director || '',
      producer: initialValues?.producer || '',
      classification: initialValues?.classification || MovieClassification.A, // Corregido a doble 's'
      releaseYear: initialValues?.releaseYear || new Date().getFullYear(),
      isActive: initialValues?.isActive ?? true, // Añadido porque Zod lo requiere
    },

    validate: {
      title: (v) => (v.length < 1 ? 'El título es requerido' : null),
      posterUrl: (v) =>
        v.length < 1 ? 'La URL del poster es requerida' : null,
      genre: (v) => (!v ? 'Selecciona un género' : null),
      classification: (v) => (!v ? 'Selecciona la clasificación' : null),
      durationMin: (v) => (v <= 0 ? 'La duración debe ser mayor a 0' : null), // Nueva validación
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
                data={Object.values(MovieClassification)} // Corregido
                {...form.getInputProps('classification')} // Corregido
              />
              {/* Cambiado a NumberInput para respetar Zod */}
              <NumberInput
                label="Duración (minutos)"
                placeholder="Ej. 120"
                disabled={readOnly}
                {...form.getInputProps('durationMin')} // Corregido
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

            {/* Nuevo campo Switch para manejar el boolean isActive de Zod */}
            <Switch
              label="Película Activa (Visible en el catálogo)"
              mt="sm"
              disabled={readOnly}
              {...form.getInputProps('isActive', { type: 'checkbox' })}
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
