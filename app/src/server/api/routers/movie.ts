import { env } from '@/env';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { MovieListSchema } from '@/schemas/movie';

export const movieRouter = createTRPCRouter({
  getAllMovies: publicProcedure.query(async () => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/movie`, {
        method: 'GET',
        // headers: {
        //   // Si tu API de Java requiere la Key, pásala aquí:
        //   Authorization: `Bearer ${env.API_KEY}`,
        //   'Content-Type': 'application/json',
        // },
      });

      if (!response.ok) {
        throw new TRPCError({
          code: 'BAD_GATEWAY',
          message: 'La API de Cinemo no respondió correctamente',
        });
      }

      const data = await response.json();

      // Validamos que los datos coincidan con lo que esperamos
      return MovieListSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'El formato de la API de películas ha cambiado',
          cause: error,
        });
      }

      // Re-lanzamos errores que ya son de tRPC
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error desconocido al obtener películas',
      });
    }
  }),
});
