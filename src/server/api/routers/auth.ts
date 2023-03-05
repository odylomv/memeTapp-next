import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  getAuth: publicProcedure.query(({ ctx }) => {
    return ctx.auth;
  }),
  getAuthedUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({ where: { id: ctx.auth.userId } });
  }),
});
