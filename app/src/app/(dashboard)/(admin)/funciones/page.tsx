import { Title, Text, Container, Paper, Group, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function FuncionesPage() {
  return (
    <Container size="xl">
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Gestión de Funciones</Title>
          <Text c="dimmed" fz="sm">
            Administra los horarios y salas de las películas proyectadas.
          </Text>
        </div>
        <Button leftSection={<IconPlus size={18} />} variant="filled">
          Nueva Función
        </Button>
      </Group>

      <Paper withBorder p="xl" radius="md">
        <Text c="dimmed" ta="center">
          No hay funciones registradas actualmente.
        </Text>
      </Paper>
    </Container>
  );
}
