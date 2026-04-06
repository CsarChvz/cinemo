import { Container, Stack, Group, Title, Text, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { api } from '@/trpc/server';
import StatesTable from '@/components/locations/StatesTable';
import { ButtonNewState } from '@/components/locations/ButtonNewState';

/**
 * Página de Administración de Estados
 *
 * CAMBIOS REALIZADOS:
 * - ❌ Removida 'use client' → ahora es RSC (Render Server Component)
 * - ✅ Trae datos reales con tRPC: api.state.getAll()
 * - ✅ Separa lógica en componente <StatesTable />
 * - ✅ Datos validados por Zod desde el router
 *
 * VENTAJAS:
 * - Cero datos falsos (DUMMY_STATES eliminado)
 * - Type-safe end-to-end
 * - Mejor rendimiento (menos JS en cliente)
 * - SEO-friendly (contenido en servidor)
 */
export default async function StatesListPage() {
  // Trae TODOS los estados desde el backend Java
  // via tRPC → apiClient → /states
  const states = await api.state.getAll();

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Title order={2}>Catálogo de Estados</Title>
            <Text c="dimmed" fz="sm">
              Administra los estados donde tienes presencia.
            </Text>
          </Stack>
          <ButtonNewState />
        </Group>

        {/* Componente que maneja filtrado, búsqueda, paginación y tabla */}
        <StatesTable initialData={states} />
      </Stack>
    </Container>
  );
}
