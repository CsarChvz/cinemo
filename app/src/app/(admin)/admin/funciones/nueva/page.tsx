'use client';

import {
  Container,
  Paper,
  Stack,
  Title,
  Text,
  Select,
  Button,
  Group,
  SimpleGrid,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates'; // Requiere: bun add @mantine/dates dayjs
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import Link from 'next/link';

export default function NuevaFuncionPage() {
  const form = useForm({
    initialValues: {
      peliculaId: '',
      estadoId: '',
      municipioId: '',
      cineId: '',
      salaId: '',
      horario: null as Date | null,
      precio: 85,
    },
  });

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Button
          component={Link}
          href="/admin/funciones"
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          w="fit-content"
        >
          Volver a lista
        </Button>

        <Paper p={40} radius="xl" withBorder>
          <Title order={2} mb="xs">
            Crear Nueva Función
          </Title>
          <Text c="dimmed" mb="xl" size="sm">
            Asigna una película a una sala y horario específico.
          </Text>

          <form onSubmit={form.onSubmit((v) => console.log(v))}>
            <Stack gap="md">
              {/* Selección de Película */}
              <Select
                label="Seleccionar Película"
                placeholder="Busca la película..."
                searchable
                data={['Interstellar', 'Inception', 'Spider-Man']}
                {...form.getInputProps('peliculaId')}
              />

              {/* Filtro Jerárquico de Ubicación */}
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Select
                  label="Estado"
                  placeholder="Ej. Jalisco"
                  data={['Jalisco', 'CDMX']}
                  {...form.getInputProps('estadoId')}
                />
                <Select
                  label="Municipio"
                  placeholder="Ej. Zapopan"
                  data={['Zapopan', 'Guadalajara']}
                  {...form.getInputProps('municipioId')}
                />
              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Select
                  label="Cine"
                  placeholder="Selecciona el complejo"
                  data={['Gran Plaza', 'Andares']}
                  {...form.getInputProps('cineId')}
                />
                <Select
                  label="Sala"
                  placeholder="Selecciona sala disponible"
                  data={['Sala 01', 'Sala 02', 'VIP']}
                  {...form.getInputProps('salaId')}
                />
              </SimpleGrid>

              {/* Fecha y Hora */}
              <DateTimePicker
                label="Fecha y Hora de la función"
                placeholder="Selecciona el momento exacto"
                {...form.getInputProps('horario')}
              />

              <Button
                type="submit"
                size="md"
                mt="xl"
                fullWidth
                leftSection={<IconDeviceFloppy size={20} />}
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                Publicar Función
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}
