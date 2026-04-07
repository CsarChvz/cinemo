import {
  CreateCinemaSchema,
  CinemaListSchema,
  CinemaSchema,
} from '@/schemas/cinema'; 
import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const cinemaRouter = createTRPCRouter({
  /**
   * Obtiene todos los cines desde el backend de Java
   * GET /cinemas
   */
  getAll: publicProcedure.query(async () => {
    return await apiClient('/cinemas', CinemaListSchema);
  }),

  /**
   * Obtiene un cine por su ID
   * GET /cinemas/{id}
   */
  getById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const data = await apiClient(
        `/cinemas/${input.id}`,
        CinemaSchema.nullable()
      );

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Cine con ID ${input.id} no encontrado`,
        });
      }
      return data;
    }),

  /**
   * Crea un nuevo cine enviando name, address y municipalityId en el body
   * POST /cinemas
   */
  create: publicProcedure
    .input(CreateCinemaSchema)
    .mutation(async ({ input }) => {
      await apiClient('/cinemas', CinemaSchema, {
        method: 'POST',
        body: input, // Aquí pasamos el body { name, address, municipalityId }
      });
    }),

  /**
   * Actualiza un cine existente por ID
   * PATCH /cinemas/{id}
   */
  update: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        data: CreateCinemaSchema,
      })
    )
    .mutation(async ({ input }) => {
      return await apiClient(`/cinemas/${input.id}`, CinemaSchema, {
        method: 'PATCH', // O 'PUT', dependiendo de tu backend en Java
        body: input.data, // El body actualizado
      });
    }),

  /**
   * Elimina un cine por ID
   * DELETE /cinemas/{id}
   */
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      return await apiClient(`/cinemas/${input.id}`, z.any(), {
        method: 'DELETE',
      });
    }),
});
