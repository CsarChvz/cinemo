import { z } from 'zod';

// 1. Esquema base para el Estado (el objeto anidado)
export const StateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  code: z.string(),
});

// 2. Esquema principal para el Municipio
export const MunicipalitySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  state: StateSchema, // Anidamos el esquema del estado aquí
});

// 3. Esquema para la lista (el array que recibes como respuesta)
export const MunicipalityListSchema = z.array(MunicipalitySchema);

// 4. Esquema para CREAR un municipio
// Nota: Normalmente para crear no envías el objeto state completo,
// sino solo el ID del estado al que pertenece.
export const CreateMunicipalitySchema = z.object({
  name: z.string().min(1, 'El nombre del municipio es requerido'),
  stateId: z.number().int({ message: 'Debes seleccionar un estado válido' }),
});

// 5. Inferencia de tipos para usar en tus componentes y hooks de React
export type State = z.infer<typeof StateSchema>;
export type Municipality = z.infer<typeof MunicipalitySchema>;
export type CreateMunicipality = z.infer<typeof CreateMunicipalitySchema>;
