import { z } from 'zod';

export const StateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  code: z.string(),
});


export const StateListSchema = z.array(StateSchema);

export const CreateStateSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  code: z.string().min(2, 'El código debe tener al menos 2 caracteres'),
});
