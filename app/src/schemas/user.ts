// schemas/user.ts
import { z } from 'zod';

export const JSONPlaceholderUserSchema = z.object({
  id: z.number(), // Nota: JSONPlaceholder usa números para los IDs
  name: z.string(),
  username: z.string(),
  email: z.email(),
});

export type ExternalUser = z.infer<typeof JSONPlaceholderUserSchema>;
