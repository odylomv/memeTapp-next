// src/server/trpc/router/index.ts
import { t } from '../trpc';
import { authRouter } from './auth';
import { userRouter } from './user';

export const appRouter = t.router({
  user: userRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
