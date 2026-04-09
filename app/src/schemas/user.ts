// schemas/user.ts
import { z } from 'zod';

export const JSONPlaceholderUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.email(),
  role: z.string(),
});

export type ExternalUser = z.infer<typeof JSONPlaceholderUserSchema>;

export type User = z.infer<typeof JSONPlaceholderUserSchema>;