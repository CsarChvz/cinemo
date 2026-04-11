import { z } from 'zod';

export const BookingRequestSchema = z.object({
  userId: z.number().int(),
  functionId: z.number().int(),
  seatStatusIds: z
    .array(z.number().int())
    .min(1, 'Debes seleccionar al menos un asiento'),
});

export const BookingResponseSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  functionId: z.number().int(),
  status: z.string(),
  totalPrice: z.number(),
  createdAt: z.string(),
  seatStatusIds: z.array(z.number().int()).nullable(), 
});

export type BookingRequest = z.infer<typeof BookingRequestSchema>;
export type BookingResponse = z.infer<typeof BookingResponseSchema>;
