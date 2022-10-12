import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
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
