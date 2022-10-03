// src/server/trpc/router/index.ts
import { t } from '../trpc';
import { authRouter } from './auth';
import { memeRouter } from './meme';
import { userRouter } from './user';

export const appRouter = t.router({
  auth: authRouter,
  user: userRouter,
  meme: memeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
