// routers/movie.ts
import {
  CreateMovieSchema, // Asegúrate de tener este esquema en tu archivo
  MovieListSchema,
  MovieSchema,
} from '@/schemas/movie';
import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const movieRouter = createTRPCRouter({
  /**
   * Obtiene todas las películas desde el backend
   * GET /movies
   */
  getAll: publicProcedure.query(async () => {
    return await apiClient('/movies', MovieListSchema);
  }),

  /**
   * Obtiene una película por su ID
   * GET /movies/{id}
   */
  getById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const data = await apiClient(
        `/movies/${input.id}`,
        MovieSchema.nullable()
      );

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Película con ID ${input.id} no encontrada`,
        });
      }
      return data;
    }),

  /**
   * Crea una nueva película
   * POST /movies
   */
  create: publicProcedure
    .input(CreateMovieSchema)
    .mutation(async ({ input }) => {
      // Usamos z.any() en la respuesta para evitar choques con el backend
      await apiClient('/movies', z.any(), {
        method: 'POST',
        body: input,
      });
    }),

  /**
   * Actualiza una película existente por ID
   * PUT /movies/{id}
   */
  update: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        data: CreateMovieSchema,
      })
    )
    .mutation(async ({ input }) => {
      return await apiClient(`/movies/${input.id}`, z.any(), {
        method: 'PUT', // Usamos PUT como descubrimos con las funciones
        body: input.data,
      });
    }),

  /**
   * Elimina una película por ID
   * DELETE /movies/{id}
   */
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      return await apiClient(`/movies/${input.id}`, z.any(), {
        method: 'DELETE',
      });
    }),
});
