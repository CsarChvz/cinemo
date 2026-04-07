import { z } from 'zod';
import { MunicipalitySchema } from './municipality'; // Ajusta la ruta si es necesario


export const CinemaSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(), 
  municipality: MunicipalitySchema,
});

export const CinemaListSchema = z.array(CinemaSchema);

export const CreateCinemaSchema = z.object({
  name: z.string().min(1, 'El nombre del cine es requerido'),
  address: z.string().min(5, 'La dirección es muy corta'),
  municipalityId: z
    .number()
    .int({ message: 'Debes seleccionar un municipio válido' }),
});

// 4. Inferencia de tipos para React
export type Cinema = z.infer<typeof CinemaSchema>;
export type CreateCinema = z.infer<typeof CreateCinemaSchema>;
