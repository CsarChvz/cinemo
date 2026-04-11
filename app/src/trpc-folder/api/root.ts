import { authRouter } from './routers/auth';
import { bookingRouter } from './routers/booking';
import { cinemaRouter } from './routers/cinema';
import { movieRouter } from './routers/movie';
import { movieScreeningRouter } from './routers/movie-screening';
import { municipalityRouter } from './routers/municipality';
import { postRouter } from './routers/post';
import { roomRouter } from './routers/room';
import { seatRouter } from './routers/seat';
import { stateRouter } from './routers/state';
import { ticketRouter } from './routers/ticket';
import { createCallerFactory, createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  movie: movieRouter,
  state: stateRouter,
  municipality: municipalityRouter,
  cinema: cinemaRouter,
  room: roomRouter,
  movieScreening: movieScreeningRouter,
  auth: authRouter,
  seat: seatRouter,
  booking: bookingRouter,
  ticket: ticketRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
