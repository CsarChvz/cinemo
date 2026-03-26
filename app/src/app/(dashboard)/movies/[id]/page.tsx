'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Grid,
  GridCol,
  Image,
  Badge,
  Title,
  Text,
  Group,
  Stack,
  Button,
  ActionIcon,
  Paper,
  Divider,
  rem,
  SimpleGrid,
  Box,
  Center,
} from '@mantine/core';
import {
  IconClock,
  IconArrowLeft,
  IconHeart,
  IconCalendar,
  IconUser,
  IconMovie,
  IconMapPin,
} from '@tabler/icons-react';

// Componentes de la Guía de Programación
import { LocationSidebar } from '@/components/program_guide/LocationSidebar';
import { ProgramGuideContent } from '@/components/program_guide/ProgramGuideContent';
import {
  MovieGenre,
  MovieClasification,
  Movie,
} from '@/interfaces/movie.interface';
import { useEffect, useState } from 'react';
import { ImplementationDevTools } from '@/components/common/ImplementationDevTools/ImplementationDevTools';
import { MovieNotFound } from '@/components/movies/MovieNotFound/MovieNotFound';
import { DetailsOfMovie } from '@/components/movies/DetailsOfMovie/DetailsOfMovie';
import MovieScreening from '@/components/program_guide/MovieScreenings/MovieScreenings';
import { DUMMY_MOVIES } from '@/data/MoviesDummy';


export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const cine = searchParams.get('cine');
  const movie = DUMMY_MOVIES.find((m) => m.id === Number(params.id));

  const [isManual, setIsManual] = useState(false);

  // Cargar estado inicial del LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('manual-implementation');
    if (saved !== null) setIsManual(JSON.parse(saved));
  }, []);

  if (!movie) {
    return <MovieNotFound router={router} />;
  }

  return (
    <Container size="xl" py="xl">
      <ImplementationDevTools isManual={isManual} onChange={setIsManual} />

      {/* 1. Header de Navegación */}
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => router.push('/movies')}
        mb="xl"
        color="gray"
      >
        Volver al catálogo
      </Button>
      <DetailsOfMovie movie={movie} />

      {/* 3. Sección de Funciones (Separada) */}
      <MovieScreening movie={movie} cinema={cine ?? ''} />
    </Container>
  );
}
