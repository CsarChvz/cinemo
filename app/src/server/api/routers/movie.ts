import { env } from '@/env';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { MovieListSchema, MovieSchema } from '@/schemas/movie';

/**
 * Helper para hacer fetch a la API externa
 * Centraliza la lógica de comunicación con el backend de Java
 */
async function fetchFromMovieAPI<T>(
  endpoint: string,
  schema: z.ZodSchema<T>
): Promise<T> {
  const url = `${env.NEXT_PUBLIC_API_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Descomenta si tu API requiere autenticación:
      // Authorization: `Bearer ${env.API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new TRPCError({
      code: response.status === 404 ? 'NOT_FOUND' : 'BAD_GATEWAY',
      message: `La API respondió con status ${response.status}`,
    });
  }

  const data = await response.json();

  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'El formato de la respuesta de la API no es válido',
        cause: error,
      });
    }
    throw error;
  }
}
export const movieRouter = createTRPCRouter({
  /**
   * Obtiene todas las películas disponibles
   * @returns Lista de películas validadas
   */
  getAllMovies: publicProcedure.query(async () => {
    try {
      return await fetchFromMovieAPI('/movie', MovieListSchema);
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error desconocido al obtener películas',
      });
    }
  }),

  /**
   * Obtiene una película específica por ID
   * @param id - ID de la película
   * @returns Datos de la película validados
   */
  getMovieById: publicProcedure
    .input(z.number().int().positive('El ID debe ser un número positivo'))
    .query(async ({ input }) => {
      try {
        return await fetchFromMovieAPI(`/movie/${input}`, MovieSchema);
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Error al obtener la película con ID ${input}`,
        });
      }
    }),
});
