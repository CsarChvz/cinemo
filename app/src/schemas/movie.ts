import { z } from 'zod';

// 1. Enums intactos
export enum MovieGenre {
  ACCION = 'Accion',
  AVENTURAS = 'Aventuras',
  CIENCIA_FICCION = 'Ciencia Ficcion',
  COMEDIA = 'Comedia',
  DRAMA = 'Drama',
  THRILLER = 'Thriller',
  SUSPENSO = 'Suspenso',
  TERROR = 'Terror',
  ROMANCE = 'Romance',
  ANIMACION = 'Animacion',
}

export enum MovieClassification {
  AA = 'AA', // Niños menores de 7 años
  A = 'A', // Todo público
  B = 'B', // 12 años en adelante
  B15 = 'B15', // 15 años en adelante
  C = 'C', // Adultos (18+)
  D = 'D', // Adultos (Contenido extremo)
}

export const MovieSchema = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  posterUrl: z.string(),
  genre: z.enum(MovieGenre),
  durationMin: z.number().int(),
  description: z.string(),
  director: z.string(),
  producer: z.string(),
  classification: z.enum(MovieClassification),
  releaseYear: z.number().int(),
  isActive: z.boolean(),
});

export const MovieListSchema = z.array(MovieSchema);

export const CreateMovieSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  posterUrl: z.url('Ingresa una URL válida para el póster'),
  genre: z.enum(MovieGenre, 'Seleccione un genero valido'),
  durationMin: z
    .number()
    .int()
    .positive('La duración debe ser mayor a 0 minutos'),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  director: z.string().min(1, 'El nombre del director es requerido'),
  producer: z.string().min(1, 'El nombre del productor es requerido'),
  classification: z.enum(
    MovieClassification,
    'Seleccione una clasificación valida'
  ),
  releaseYear: z
    .number()
    .int()
    .min(1888, 'Año inválido')
    .max(
      new Date().getFullYear() + 5,
      'El año de estreno no puede ser tan lejano'
    ),
  isActive: z.boolean().default(true),
});

export type Movie = z.infer<typeof MovieSchema>;
export type CreateMovie = z.infer<typeof CreateMovieSchema>;
