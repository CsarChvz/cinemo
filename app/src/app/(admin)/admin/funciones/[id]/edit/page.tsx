'use client';

import { MovieScreeningForm } from '@/components/movie-screenings/MovieScreeningForm/MovieScreeningForm';
import { Button, Container, Stack, Center, Loader } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditarFuncionPage() {
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de fetch a tu API para obtener los datos de la función
    setTimeout(() => {
      setInitialData({
        peliculaId: 'Interstellar',
        estadoId: 'Jalisco',
        municipioId: 'Zapopan',
        cineId: 'Andares',
        salaId: 'VIP',
        // Simulamos que la función es mañana a las 8:00 PM
        horario: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (values: any) => {
    console.log(`Enviando a la API para ACTUALIZAR función ${id}:`, values);
    // Aquí harías tu fetch PUT o PATCH a /api/screenings/{id}
  };

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

        {loading ? (
          <Center h={300}>
            <Loader color="blue" />
          </Center>
        ) : (
          <MovieScreeningForm
            initialValues={initialData}
            onSubmit={handleSubmit}
            isEditing // Le pasamos la bandera para que cambie los textos
          />
        )}
      </Stack>
    </Container>
  );
}
