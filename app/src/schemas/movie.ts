import { z } from 'zod';

// 1. Mantienes tus Enums intactos (corrigiendo 'classification' para estandarizar en inglés)
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

// 2. Creas tu esquema Zod usando z. para enlazar los enums de TypeScript
export const MovieSchema = z.object({
  id: z.number().optional(), // Lo dejamos opcional como en tu interfaz original
  title: z.string(),
  posterUrl: z.string(),
  genre: z.enum(MovieGenre),
  durationMin: z.number(), // Nos quedamos con el número, es mejor para la base de datos
  description: z.string(),
  director: z.string(),
  producer: z.string(),
  classification: z.enum(MovieClassification),
  releaseYear: z.number(),
  isActive: z.boolean(),
});

export const MovieListSchema = z.array(MovieSchema);

// 3. ¡La Magia! Infieres el tipo de TypeScript directamente del esquema
export type Movie = z.infer<typeof MovieSchema>;
