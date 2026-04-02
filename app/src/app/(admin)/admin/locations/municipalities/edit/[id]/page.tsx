'use client';

import { Button, Container, Stack, Loader, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  MunicipalityForm,
  MunicipalityFormValues,
} from '@/components/locations/MunicipalityForm';

export default function EditMunicipalityPage() {
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<MunicipalityFormValues | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch a tu API para obtener los datos actuales del municipio
    setTimeout(() => {
      setInitialData({
        id: id,
        name: 'Zapopan', // Dato simulado
        stateId: '1', // Dato simulado
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (values: MunicipalityFormValues) => {
    console.log(`Enviando a la API para ACTUALIZAR ID ${id}:`, values);
    // Aquí harías tu fetch PUT/PATCH /api/municipalities/{id}
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Button
          component={Link}
          href="/admin/locations/municipalities"
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          w="fit-content"
        >
          Volver a la lista
        </Button>

        {loading ? (
          <Center h={200}>
            <Loader color="blue" />
          </Center>
        ) : (
          <MunicipalityForm
            initialValues={initialData!}
            onSubmit={handleSubmit}
            isEditing
          />
        )}
      </Stack>
    </Container>
  );
}
