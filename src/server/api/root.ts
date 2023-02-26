import { authRouter } from './routers/auth';
import { memeRouter } from './routers/meme';
import { userRouter } from './routers/user';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  meme: memeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
