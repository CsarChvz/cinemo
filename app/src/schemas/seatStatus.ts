import { z } from 'zod';

export const SeatStatusResponseSchema = z.object({
  seatId: z.number().int(),
  status: z.enum(['AVAILABLE', 'RESERVED_TEMP', 'OCCUPIED']),
});

export const SeatStatusListSchema = z.array(SeatStatusResponseSchema);

export const SelectSeatInputSchema = z.object({
  movieScreeningId: z.coerce.number().int(),
  seatId: z.coerce.number().int(),
  userId: z.coerce.number().int(), 
});
export const UndoSeatInputSchema = z.object({
  movieScreeningId: z.number().int(),
  userId: z.number().int(),
});

export const WaitlistInputSchema = z.object({
  movieScreeningId: z.number().int(),
  seatId: z.number().int(),
  userId: z.number().int(),
});

export const WaitlistResponseSchema = z.object({
  position: z.number().int(),
  totalInQueue: z.number().int(),
  message: z.string(),
});

export type SeatStatusResponse = z.infer<typeof SeatStatusResponseSchema>;
export type SelectSeatInput = z.infer<typeof SelectSeatInputSchema>;
export type UndoSeatInput = z.infer<typeof UndoSeatInputSchema>;
export type WaitlistInput = z.infer<typeof WaitlistInputSchema>;
export type WaitlistResponse = z.infer<typeof WaitlistResponseSchema>;
