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
import { auth } from '@/app/auth';

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
      const session = await auth();
      const token = session?.accessToken;
      // Usamos z.any() en la respuesta para evitar choques con el backend
      await apiClient('/movies', z.any(), {
        method: 'POST',
        body: input,
        token: token,
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
      const session = await auth();
      const token = session?.accessToken;
      return await apiClient(`/movies/${input.id}`, z.any(), {
        method: 'PATCH',
        body: input.data,
        token: token,
      });
    }),

  /**
   * Elimina una película por ID
   * DELETE /movies/{id}
   */
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      return await apiClient(`/movies/${input.id}`, z.any(), {
        method: 'DELETE',
        token: token,
      });
    }),
});
