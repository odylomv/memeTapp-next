import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string().nullish() }).nullish()).query(({ input }) => {
    return {
      greeting: `Hello ${input?.text ?? 'world'}`,
    };
  }),
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
