import { z } from 'zod';

export const StateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  code: z.string(),
});

export const MunicipalitySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  state: StateSchema,
});

export const MunicipalityListSchema = z.array(MunicipalitySchema);


export const CreateMunicipalitySchema = z.object({
  name: z.string().min(1, 'El nombre del municipio es requerido'),
  stateId: z.number().int({ message: 'Debes seleccionar un estado válido' }),
});

// 5. Inferencia de tipos para usar en tus componentes y hooks de React
export type State = z.infer<typeof StateSchema>;
export type Municipality = z.infer<typeof MunicipalitySchema>;
export type CreateMunicipality = z.infer<typeof CreateMunicipalitySchema>;
