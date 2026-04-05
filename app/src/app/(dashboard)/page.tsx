import { Stack } from '@mantine/core';
import { Metadata } from 'next';
import { FeaturedMoviesSection } from '@/components/Welcome/FeaturedMoviesSection';
import { CtaSection } from '@/components/Welcome/CtaSection';
import { HeroSection } from '@/components/Welcome/HeroSection';
import { api, HydrateClient } from '@/trpc/server';

// 1. Añadimos Metadata nativa de Next.js para SEO
export const metadata: Metadata = {
  title: 'Cinemo | Tu cine, tu momento',
  description:
    'Descubre los estrenos más esperados, reserva tus asientos favoritos y vive la magia de la gran pantalla.',
};

// 3. El componente principal es asíncrono (RSC)
export default async function HomePage() {
  const movies = await api.movie.getAllMovies();
  return (
    <HydrateClient>
      <Stack gap={0}>
        <HeroSection />
        <FeaturedMoviesSection movies={movies} />
        <CtaSection />
      </Stack>
    </HydrateClient>
  );
}
