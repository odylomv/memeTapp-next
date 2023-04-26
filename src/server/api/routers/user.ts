import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    return {
      user: await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      }),
    };
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
