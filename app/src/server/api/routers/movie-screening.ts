import {
  CreateMovieScreeningSchema,
  MovieScreeningListSchema,
  MovieScreeningSchema,
} from '@/schemas/movie-screening';
import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const movieScreeningRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await apiClient('/movie-screenings', MovieScreeningListSchema);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const data = await apiClient(
        `/movie-screenings/${input.id}`,
        MovieScreeningSchema.nullable()
      );
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Función con ID ${input.id} no encontrada`,
        });
      }
      return data;
    }),

  create: publicProcedure
    .input(CreateMovieScreeningSchema)
    .mutation(async ({ input }) => {
      await apiClient('/movie-screenings', MovieScreeningSchema, {
        method: 'POST',
        body: input,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        data: CreateMovieScreeningSchema,
      })
    )
    .mutation(async ({ input }) => {
      return await apiClient(
        `/movie-screenings/${input.id}`,
        MovieScreeningSchema,
        {
          method: 'PATCH', // O 'PUT'
          body: input.data,
        }
      );
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      return await apiClient(`/movie-screenings/${input.id}`, z.any(), {
        method: 'DELETE',
      });
    }),
});
