import {
  CreateMovieScreeningSchema,
  MovieScreeningListSchema,
  MovieScreeningSchema,
} from '@/schemas/movie-screening';
import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { auth } from '@/app/auth';

export const movieScreeningRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await apiClient('/movie-screenings', MovieScreeningListSchema);
  }),

  search: publicProcedure
    .input(
      z
        .object({
          movieId: z.number().int().positive().optional(),
          stateId: z.number().int().positive().optional(),
          municipalityId: z.number().int().positive().optional(),
          cinemaId: z.number().int().positive().optional(),
        })
        .optional() // Todo el objeto es opcional
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams();

      if (input?.movieId) params.append('movieId', input.movieId.toString());
      if (input?.stateId) params.append('stateId', input.stateId.toString());
      if (input?.municipalityId)
        params.append('municipalityId', input.municipalityId.toString());
      if (input?.cinemaId) params.append('cinemaId', input.cinemaId.toString());

      const queryString = params.toString() ? `?${params.toString()}` : '';

      return await apiClient(
        `/movie-screenings/search${queryString}`,
        MovieScreeningListSchema
      );
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
      const session = await auth();
      const token = session?.accessToken;
      await apiClient('/movie-screenings', z.any(), {
        method: 'POST',
        body: input,
        token: token,
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
      const session = await auth();
      const token = session?.accessToken;
      return await apiClient(
        `/movie-screenings/${input.id}`,
        MovieScreeningSchema,
        {
          method: 'PATCH', // O 'PUT'
          body: input.data,
          token: token,
        }
      );
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      return await apiClient(`/movie-screenings/${input.id}`, z.any(), {
        method: 'DELETE',
        token: token,
      });
    }),
});
