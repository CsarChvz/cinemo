import {
  CreateCinemaSchema,
  CinemaListSchema,
  CinemaSchema,
  CinemaSimpleListSchema,
} from '@/schemas/cinema'; 
import { apiClient } from '../api-client';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { auth } from '@/app/auth';

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
   * Obtiene todos los cines desde el backend de Java por el municipio
   * GET /cinemas/by
   */

  getByMunicipalityId: publicProcedure
    .input(z.object({ municipalityId: z.number().int().positive() }))
    .query(async ({ input }) => {
      const data = await apiClient(
        `/cinemas/by-municipality/${input.municipalityId}`,
        CinemaSimpleListSchema
      );

      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Cine con ID ${input.municipalityId} no encontrado`,
        });
      }
      return data;
    }),

  /**
   * Obtiene los cines más cercanos a una ubicación geográfica
   * GET /cinemas/nearby?lat=...&lng=...&radius=...
   */
  getNearby: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lng: z.number(),
        radius: z.number().default(30),
      })
    )
    .query(async ({ input }) => {
      // Construimos los query params para la URL
      const queryParams = new URLSearchParams({
        lat: input.lat.toString(),
        lng: input.lng.toString(),
        radius: input.radius.toString(),
      });

      // Llamamos a tu endpoint de Java /api/v1/cinemas/nearby
      // Usamos z.array(z.any()) o un esquema específico si ya lo tienes
      const data = await apiClient(
        `/cinemas/nearby?${queryParams.toString()}`,
        z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            latitude: z.number(),
            longitude: z.number(),
            distance: z.number(),
          })
        )
      );

      return data;
    }),

  /**
   * Crea un nuevo cine enviando name, address y municipalityId en el body
   * POST /cinemas
   */
  create: publicProcedure
    .input(CreateCinemaSchema)
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      await apiClient('/cinemas', CinemaSchema, {
        method: 'POST',
        body: input,
        token: token, // Aquí pasamos el body { name, address, municipalityId }
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
      const session = await auth();
      const token = session?.accessToken;
      return await apiClient(`/cinemas/${input.id}`, CinemaSchema, {
        method: 'PATCH', // O 'PUT', dependiendo de tu backend en Java
        body: input.data, // El body actualizado
        token: token,
      });
    }),

  /**
   * Elimina un cine por ID
   * DELETE /cinemas/{id}
   */
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      const session = await auth();
      const token = session?.accessToken;
      return await apiClient(`/cinemas/${input.id}`, z.any(), {
        method: 'DELETE',
        token: token,
      });
    }),
});
